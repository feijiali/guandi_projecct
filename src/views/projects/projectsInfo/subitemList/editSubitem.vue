<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small" label="项目细目号：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.proj_detail_diff_item"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="清单子目号：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.proj_detail_diff_num"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="工程或费用名称：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.proj_detail_diff_name"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单位：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.proj_detail_diff_unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="清单数量：">
            <el-input-number
              v-model="ruleform.proj_detail_diff_number"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设计数量1：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.proj_detail_diff_number1"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设计数量2：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.proj_detail_diff_number2"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单价(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.proj_detail_diff_price"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="合价(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.proj_detail_diff_money"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              class="el-textarea-box-long"
              :autosize="{ minRows: 4 }"
              type="textarea"
              placeholder="请输入"
              v-model="ruleform.proj_detail_diff_text"
            ></el-input>
          </el-form-item>
        </el-form>
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
import api from "@/api/index";
import confirm from "@/mixins/confirm";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      info: {},
      ruleform: {
        proj_detail_diff_item: "",
        proj_detail_diff_num: "",
        proj_detail_diff_name: "",
        proj_detail_diff_unit: "",
        proj_detail_diff_number: "",
        proj_detail_diff_number1: "",
        proj_detail_diff_number2: "",
        proj_detail_diff_price: "",
        proj_detail_diff_money: "",
        proj_detail_diff_text: "",
        proj_detail_diff_range: "",
      },
      proj_detail_diff_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)),
    };
  },
  async created() {
    this.title = "编辑分项清单数据";
    this.queryInfo();
  },
  methods: {
    async queryInfo() {
      let res = await api.QueryProjDetailListProjDetailDiffList({
        proj_detail_diff_id: this.proj_detail_diff_id,
      });
      this.info = res.result[0];
      for (let val in this.ruleform) {
        this.ruleform[val] = this.info[val];
      }
    },
    async submitFun() {
      let name = "UpdateProjDetailListProjDetailDiff";
      this.ruleform.proj_detail_diff_number = String(
        this.ruleform.proj_detail_diff_number
      );
      this.ruleform.proj_detail_diff_number1 = String(
        this.ruleform.proj_detail_diff_number1
      );
      this.ruleform.proj_detail_diff_number2 = String(
        this.ruleform.proj_detail_diff_number2
      );
      this.ruleform.proj_detail_diff_price = String(
        this.ruleform.proj_detail_diff_price
      );
      this.ruleform.proj_detail_diff_money = String(
        this.ruleform.proj_detail_diff_money
      );
      let subdata = { ...this.info, ...this.ruleform };
      await api[name](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
