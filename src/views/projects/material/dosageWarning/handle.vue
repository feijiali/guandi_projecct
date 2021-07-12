<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工区：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.usage_statistics_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="材料名称：">
            <el-select
              v-model="ruleform.usage_statistics_material_info_id_union"
              placeholder="请选择"
              @change="selmaterial"
            >
              <el-option
                v-for="(item, i) in MaterialList"
                :key="i"
                :label="
                  item.material_information_name +
                  ' (' +
                  item.material_information_specification +
                  '-' +
                  item.material_information_Unit +
                  ')'
                "
                :value="item.material_information_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="规格型号：">
            <el-input
              type="text"
              readonly="readonly"
              class="input-m is-disabled"
              v-model="spec"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="领用单位：">
            <el-select
              v-model="ruleform.usage_statistics_use_organ_id_union"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in selectOragnList"
                :key="i"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="供应商：">
            <el-select
              v-model="ruleform.usage_statistics_supply_unit_id_union"
              placeholder="请选择"
              @change="selmaterial"
            >
              <el-option
                v-for="(item, i) in companyList"
                :key="i"
                :label="item.supply_unit"
                :value="item.supply_unit_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="材料单位：">
            <el-input
              type="text"
              readonly="readonly"
              class="input-m is-disabled"
              v-model="unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="领用日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.usage_statistics_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="实际用量：">
            <num-input v-model="ruleform.usage_statistics_quantity"></num-input>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small must" label="材料总量：">
            <el-input
              type="text"
              readonly="readonly"
              class="input-m is-disabled"
              v-model="materNum"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="预警等级：">
            <div class="amount">
              <span class="grey2 disi label-l"></span>
              <div
                :class="'disi vtt levelcolor' + waringlevel.indexOf(level)"
                title=""
              >
                {{ level }}
              </div>
            </div>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long must" label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.usage_statistics_remark"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" />
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
import confirm from "@/mixins/confirm";
import api from "@/api/index";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "新增实际用量",
      ruleform: {
        usage_statistics_organ_id_union: null,
        usage_statistics_material_info_id_union: null,
        usage_statistics_use_organ_id_union: null,
        usage_statistics_time: "",
        usage_statistics_quantity: null,
        usage_statistics_waring_level: "",
        usage_statistics_file: "",
        usage_statistics_pic: "",
        usage_statistics_remark: "",
        usage_statistics_submit_time: "",
        usage_statistics_supply_unit_id_union: null,
      },
      examine_id: parseInt(this.$route.query.id), //编辑的id
      waringlevel: ["Ⅰ级", "Ⅱ级", "Ⅲ级"],
      rules: {
        usage_statistics_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        usage_statistics_material_info_id_union: [
          {
            required: true,
            message: "请选择材料",
          },
        ],
        usage_statistics_use_organ_id_union: [
          {
            required: true,
            message: "请选择领用单位",
          },
        ],
        usage_statistics_time: [
          {
            required: true,
            message: "请选择领用日期",
          },
        ],
        usage_statistics_quantity: [
          {
            required: true,
            message: "请填写实际用量",
          },
          {
            pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
            message: "实际用量为正数，且仅限两位小数",
          },
        ],
      },
      present: 0,
      companyList: [],
      spec: "",
      unit: "",
      amount: 0,
      selectOragnList: [],
      MaterialList: [],
      levelList: [],
      levelarr: ["Ⅰ级", "Ⅱ级", "Ⅲ级"],
      level1: -1,
      level2: -1,
      level3: -1,
      mater: null,
      materNum: "",
    };
  },
  async created() {
    this.examine_id = parseInt(this.$route.query.id);
    await this.getcompany();
    if (!isNaN(this.examine_id)) {
      this.title = "编辑实际用量";
      this.getinfo();
    }
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
    level() {
      if (this.ruleform.usage_statistics_organ_id_union == 0 || !this.mater) {
        return "暂无";
      } else {
        if (
          (this.level1 < 0 && this.level2 < 0 && this.level3 < 0) ||
          this.ruleform.usage_statistics_quantity == 0 ||
          this.ruleform.usage_statistics_quantity == null
        ) {
          return "暂无";
        }
        let flag = true;
        if (this.level1 >= 0) {
          flag = false;
          let pre1 =
            (this.mater.inventory_details_quantity * this.level1) / 100;
          if (pre1 <= this.ruleform.usage_statistics_quantity) {
            return "Ⅰ级";
          } else {
            flag = true;
          }
        }
        if (flag && this.level2 >= 0) {
          flag = false;
          let pre2 =
            (this.mater.inventory_details_quantity * this.level2) / 100;
          if (pre2 <= this.ruleform.usage_statistics_quantity) {
            return "Ⅱ级";
          } else {
            flag = true;
          }
        }
        if (flag && this.level3 >= 0) {
          let pre3 =
            (this.mater.inventory_details_quantity * this.level3) / 100;
          if (pre3 <= this.ruleform.usage_statistics_quantity) {
            return "Ⅲ级";
          } else {
            return "暂无";
          }
        }
      }
    },
  },
  methods: {
    async getcompany() {
      let res = await api.QueryMaterialManagementSupplyUnit_TJSTC({
        page: -1,
      });
      this.companyList = res.result;
    },
    async getinfo() {
      let res = await api.queryMaterialManagementUsageStatistics({
        usage_statistics_id: this.examine_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      await this.getsellist();
      this.selmaterial();
    },

    async getsellist() {
      // 查询班组
      let res = await api.queryOrgan({
        organ_type: 70,
        organ_node: this.ruleform.usage_statistics_organ_id_union,
        page: -1,
      });
      this.selectOragnList = res.result.filter(
        (item) => item.organ_id != this.ruleform.usage_statistics_organ_id_union
      );
      // 查询材料
      let res1 = await api.queryMaterialManagementMaterialInformation({
        page: -1,
        material_info_organ_id_union:
          this.ruleform.usage_statistics_organ_id_union,
      });
      this.MaterialList = res1.result;
      let res2 = await api.queryMaterialManagementDosageWarning({
        page: -1,
        dosage_warning_organ_id_union:
          this.ruleform.usage_statistics_organ_id_union,
      });
      this.levelList = res2.result;
      this.levelList.forEach((item) => {
        let ind = this.levelarr.indexOf(item.dosage_warning_level) + 1;
        if (ind > 0) {
          this["level" + ind] = item.dosage_warning_percent;
        }
      });
    },
    // 材料选择后获取型号
    selmaterial() {
      if (!this.ruleform.usage_statistics_material_info_id_union) {
        this.mater = null;
        this.materNum = "";
        this.spec = "";
        this.unit = "";
      }
      let mater = this.MaterialList.find(
        (item) =>
          item.material_information_id ==
          this.ruleform.usage_statistics_material_info_id_union
      );
      if (mater) {
        this.mater = mater;
        this.materNum = mater.inventory_details_quantity;
        this.spec = mater.material_information_specification;
        this.unit = mater.material_information_Unit;
        this.ruleform.usage_statistics_inventory_details_id_union =
          mater.inventory_details_id;
      } else {
        this.mater = null;
        this.materNum = "";
        this.unit = "";
        this.spec = "";
      }
    },
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = {
        uploadFileModule: "MaterialManagementDosageWarning_TJSTC",
      };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.usage_statistics_pic = picsjson.file;
      this.ruleform.usage_statistics_file = filejson.file;
      this.submitFunData();
    },

    async submitFunData() {
      this.ruleform.usage_statistics_waring_level = this.level;
      if (this.examine_id) {
        await api.updateMaterialManagementUsageStatistics({
          usage_statistics_id: this.examine_id,
          ...this.ruleform,
        });
      } else {
        await api.uploadMaterialManagementUsageStatistics({
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
    // 树形下拉选择
    async getSelectValue(node) {
      this.ruleform.usage_statistics_organ_id_union = node.tag;
      this.ruleform.usage_statistics_material_info_id_union = null;
      this.ruleform.usage_statistics_use_organ_id_union = null;
      this.selmaterial();
      await this.getsellist();
    },
  },
};
</script>

<style scoped lang="scss">
.label-l {
  width: 80px;
}

.amount {
  height: 40px !important;
  line-height: 40px !important;
}
.levelcolor0 {
  color: #ed3f76;
}

.levelcolor1 {
  color: #f89b2f;
}

.levelcolor2 {
  color: #ffd347;
}
</style>
