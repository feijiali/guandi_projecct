<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long must" label="工区：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.supply_unit_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long must" label="供应商：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.supply_unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="增值税率：">
            <num-input unit="%" v-model="ruleform.supply_unit_tax"> </num-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              class="el-textarea-box"
              v-model="ruleform.supply_unit_remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        btnText="确认提交"
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
      title: "新增供应商",
      ruleform: {
        supply_unit_organ_id_union: "",
        supply_unit: "",
        supply_unit_tax: "",
        supply_unit_remark: "",
        supply_unit_submit_time: "",
      },
      rules: {
        supply_unit_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        supply_unit: [
          {
            required: true,
            message: "请填写供应商",
          },
        ],
        supply_unit_tax: [
          {
            required: true,
            message: "请填写增值税率",
          },
          {
            validator(rule, value, callback) {
              if (Number(value) >= 0) {
                callback();
              } else {
                callback(new Error("增值税率不能为负数"));
              }
            },
          },
        ],
      },
      examine_id: 0, //编辑的id
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.examine_id = parseInt(this.Base64.decode(this.$route.query.id));
      this.title = "编辑供应商";
      this.getInformation();
    }
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.supply_unit_organ_id_union = node.tag;
    },
    async getInformation() {
      let res = await api.QueryMaterialManagementSupplyUnit_TJSTC({
        supply_unit_ids: "" + this.examine_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
    },
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.examine_id) {
        await api.UpdateMaterialManagementSupplyUnit_TJSTC({
          ...this.ruleform,
          supply_unit_id: this.examine_id,
        });
      } else {
        await api.UploadMaterialManagementSupplyUnit_TJSTC({
          ...this.ruleform,
        });
      }
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
.label-l {
  width: 90px;
}
</style>
