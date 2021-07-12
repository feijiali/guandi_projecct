<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small" label="子目号：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.split_ls_num"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="子目名称：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.split_ls_name"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单位：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.split_ls_unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="数量：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_number"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单价(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_price"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="合价(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_money"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            class="form-item-long"
            label="扣除管理费及交公司利润等，按0.091下浮后合价："
          >
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_sum"
            ></el-input-number>
          </el-form-item>
          <div class="split-title">劳务费</div>
          <el-form-item class="form-item-long-small" label="人工费(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_person"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            class="form-item-long-small"
            label="初定分包合同价(元)："
          >
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_contract1"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="人工费合计(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_person_total"
            ></el-input-number>
          </el-form-item>
          <div class="split-title">材料费</div>
          <el-form-item class="form-item-long-small" label="材料费(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_material"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            class="form-item-long-small"
            label="初定分包合同价(元)："
          >
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_contract2"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="材料费合计(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_material_total"
            ></el-input-number>
          </el-form-item>
          <div class="split-title">机械费</div>
          <el-form-item class="form-item-long-small" label="机械费(元)：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_match"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            class="form-item-long-small"
            label="初定分包合同价(元)："
          >
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_contract3"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            class="form-item-long-small"
            label="机械费合计(元)："
          >
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              v-model="ruleform.split_ls_match_total"
            ></el-input-number>
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
        split_ls_num: "",
        split_ls_name: "",
        split_ls_unit: "",
        split_ls_number: "",
        split_ls_price: "",
        split_ls_money: "",
        split_ls_sum: "",
        split_ls_person: "",
        split_ls_contract1: "",
        split_ls_person_total: "",
        split_ls_material: "",
        split_ls_contract2: "",
        split_ls_material_total: "",
        split_ls_match: "",
        split_ls_contract3: "",
        split_ls_match_total: "",
      },
      project_id: parseInt(this.$route.query.proj_detail_split_id),
    };
  },
  async created() {
    this.title = "编辑拆分工程量数据";
    this.queryInfo();
  },
  methods: {
    async queryInfo() {
      let res = await api.QueryProjDetailListProjDetailSplitLsList({
        proj_detail_split_id_un: this.project_id,
      });
      this.info = res.result[0];
      for (let val in this.ruleform) {
        this.ruleform[val] = this.info[val];
      }
    },
    async submitFun() {
      let name = "UpdateProjDetailListProjDetailSplitLs";
      this.ruleform.split_ls_number = String(this.ruleform.split_ls_number);
      this.ruleform.split_ls_price = String(this.ruleform.split_ls_price);
      this.ruleform.split_ls_money = String(this.ruleform.split_ls_money);
      this.ruleform.split_ls_sum = String(this.ruleform.split_ls_sum);
      this.ruleform.split_ls_person = String(this.ruleform.split_ls_person);
      this.ruleform.split_ls_contract1 = String(
        this.ruleform.split_ls_contract1
      );
      this.ruleform.split_ls_person_total = String(
        this.ruleform.split_ls_person_total
      );
      this.ruleform.split_ls_material = String(this.ruleform.split_ls_material);
      this.ruleform.split_ls_contract2 = String(
        this.ruleform.split_ls_contract2
      );
      this.ruleform.split_ls_material_total = String(
        this.ruleform.split_ls_material_total
      );
      this.ruleform.split_ls_match = String(this.ruleform.split_ls_match);
      this.ruleform.split_ls_contract3 = String(
        this.ruleform.split_ls_contract3
      );
      this.ruleform.split_ls_match_total = String(
        this.ruleform.split_ls_match_total
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

<style lang="scss" scoped>
.split-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
