<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="细目编号：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.detail_main_ls_num"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="细目名称：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.detail_main_ls_name"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单位：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.detail_main_ls_unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="数量：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              @change="getPrice"
              v-model="ruleform.detail_main_ls_number"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="单价（元）：">
            <el-input-number
              placeholder="请输入"
              class="input-m"
              controls-position="right"
              @change="getPrice"
              v-model="ruleform.detail_main_ls_price"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="金额（元）：">
            <el-input
              placeholder="自动计算"
              disabled
              class="input-m"
              v-model="ruleform.detail_main_ls_money"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="排序：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.detail_main_ls_order"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              class="el-textarea-box-long"
              :autosize="{ minRows: 4 }"
              type="textarea"
              placeholder="请输入"
              v-model="ruleform.detail_main_ls_text"
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
        detail_main_ls_num: "",
        detail_main_ls_name: "",
        detail_main_ls_unit: "",
        detail_main_ls_order: null,
        detail_main_ls_text: "",
      },
      project_id: parseInt(this.$route.query.proj_detail_main_ls_id),
      type: parseInt(this.$route.query.type),
      rules: {
        detail_main_ls_num: [
          {
            required: true,
            message: "请输入细目编号",
          },
        ],
        detail_main_ls_name: [
          {
            required: true,
            message: "请输入细目名称",
          },
        ],
        detail_main_ls_order: [
          {
            required: true,
            message: "请输入排序",
          },
        ],
      },
    };
  },
  async created() {
    if (this.project_id) {
      if (this.type == 1) {
        this.title = "添加拆分工程量数据";
      } else {
        this.title = "编辑拆分工程量数据";
      }
      this.project_id && (await this.queryInfo());
    } else {
      this.title = "新增拆分工程量数据";
      this.ruleform.proj_detail_main_id_un = parseInt(
        this.$route.query.proj_detail_main_id_un
      );
    }
  },
  methods: {
    getPrice() {
      this.ruleform.detail_main_ls_money = (
        this.ruleform.detail_main_ls_price * this.ruleform.detail_main_ls_number
      ).toFixed(2);
    },
    async queryInfo() {
      let res = await api.QueryProjDetailListProjDetailMainLsList({
        proj_detail_main_ls_id: this.project_id,
      });
      this.info = res.result[0];
      if (this.type == 1) {
        this.ruleform.detail_main_ls_order = this.info.detail_main_ls_order + 1;
        this.ruleform.proj_detail_main_ls_id = null;
      } else {
        for (let val in this.ruleform) {
          this.ruleform[val] = this.info[val];
        }
      }
    },
    submitFun() {
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        this.submitAllData();
      }
    },
    async submitAllData() {
      this.ruleform.detail_main_ls_number = String(
        this.ruleform.detail_main_ls_number
      );
      this.ruleform.detail_main_ls_price = String(
        this.ruleform.detail_main_ls_price
      );
      this.ruleform.detail_main_ls_money = String(
        this.ruleform.detail_main_ls_money
      );
      this.ruleform.detail_main_ls_order = Number(
        this.ruleform.detail_main_ls_order
      );
      let name = "UploadProjDetailListProjDetailMainLs";
      if (this.project_id && this.type != 1) {
        name = "UpdateProjDetailListProjDetailMainLs";
      }
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
