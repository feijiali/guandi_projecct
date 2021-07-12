<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'更新变更台账'" />
    </div>
    <div class="rounded-1 flex-fill">
      <n-scroll :native="false" class="h-100 form-box">
        <Info :info="info"></Info>
        <Handle
          ref="handle"
          :info="info"
          @submitAllData="submitAllData"
        ></Handle>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import confirm from "@/mixins/confirm";

import Info from "./updateHandle/Info";
import Handle from "./updateHandle/Handle";
export default {
  mixins: [confirm],
  components: {
    Info,
    Handle,
  },
  data() {
    return {
      parameter_info_parameter_id_un:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)),
      info: {},
    };
  },
  async mounted() {
    // 查询变更申请详情
    this.QueryChangeParameterParameter();
  },
  methods: {
    async QueryChangeParameterParameter() {
      let { result } = await api.QueryChangeParameterParameter({
        parameter_id: this.parameter_info_parameter_id_un,
      });
      this.info = result[0];
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      this.$refs.handle.submitFun();
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
      };
      let res = await api.UploadChangeParameterParameterInfo(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }
}
</style>
