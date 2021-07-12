<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <MaterialForm
          ref="rulforms"
          :editID="editID"
          :list="list"
          :headers="headers"
          :importApi="importApi"
          :dataType="dataType"
          :downLoadApi="downLoadApi"
          @selectChange="
            (key, value, index) => $emit('selectChange', key, value, index)
          "
          @inputChange="
            (key, value, index) => $emit('inputChange', key, value, index)
          "
          @submitAllData="submitAllData"
        ></MaterialForm>
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          ref="approval_form"
          :modules_union="modules_union"
          :type="1"
          :titleName="titleName"
        ></v-approval-form>
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

import MaterialForm from "./components/form";

import vSign from "@/components/common/Sign";
import vApprovalForm from "@/components/common/ApprovalForm";

export default {
  mixins: [confirm],
  components: {
    MaterialForm,
    vSign,
    vApprovalForm,
  },
  props: {
    list: {
      defalut: () => [],
    },
    headers: {
      default: () => [],
    },
    importApi: {
      defalut: () => {
        return {
          permission: [],
          url: "",
        };
      },
    },
    downLoadApi: {
      defalut: () => {
        return {
          url: "",
          name: "",
        };
      },
    },
    title: {
      defalut: "",
    },
    modules_union: {
      defalut: "",
    },
    dataType: {
      defalut: 0,
    },
  },
  data() {
    return {
      titleName: `${this.$store.getters.userName}_${this.title}`, //单据名称
      editID:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //
    };
  },

  methods: {
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      this.$refs["rulforms"].submitFun();
    },
    async submitAllData() {
      this.$refs.approval_form.submitFun();
    },
    // 审批提交
    submitAllDataApproval(form) {
      this.$refs["rulforms"].submitAllData(form);
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
