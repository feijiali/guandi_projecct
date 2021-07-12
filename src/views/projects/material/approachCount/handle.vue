<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="入库单号：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.approach_count_serial"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工区：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.approach_count_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="材料名称：">
            <el-select
              v-model="ruleform.approach_count_material_info_id_union"
              placeholder="请选择"
              @change="materialChange"
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
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="规格型号：">
            <el-input
              placeholder=""
              readonly
              class="input-m is-disabled"
              v-model="specification"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="单位：">
            <el-input
              placeholder=""
              readonly
              class="input-m is-disabled"
              v-model="unit"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="入库日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_count_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="入库数量：">
            <num-input v-model="ruleform.approach_count_num"></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="供应商：">
            <el-select
              v-model="ruleform.approach_count_supply_unit_id_union"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in supplyList"
                :key="i"
                :label="item.supply_unit"
                :value="item.supply_unit_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="!isNaN(examine_id)"
            class="form-item-long-small must"
            label="材料是否合格："
          >
            <el-select
              v-model="ruleform.approach_count_qualified"
              placeholder="请选择"
            >
              <el-option :value="1" label="合格"></el-option>
              <el-option :value="2" label="不合格"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long must" label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.approach_count_remark"
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
import api from "@/api/index";
import confirm from "@/mixins/confirm";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "新增进场统计",
      ruleform: {
        approach_count: "",
        approach_count_organ_id_union: null,
        approach_count_material_info_id_union: null,
        approach_count_supply_unit_id_union: null,
        approach_count_serial: "",
        approach_count_qualified: 1,
        approach_count_time: "",
        approach_count_num: null,
        approach_count_file: "",
        approach_count_file_pic: "",
        approach_count_remark: "",
      },
      specification: "",
      unit: "",
      rules: {
        approach_count_serial: [
          {
            required: true,
            message: "请填写入库单号",
          },
        ],
        approach_count_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        approach_count_material_info_id_union: [
          {
            required: true,
            message: "请选择材料",
          },
        ],
        approach_count_time: [
          {
            required: true,
            message: "请选择入库时间",
          },
        ],
        approach_count_num: [
          {
            required: true,
            message: "请填写入库数量",
          },
        ],
        approach_count_supply_unit_id_union: [
          {
            required: true,
            message: "请选择供应商",
          },
        ],
      },
      examine_id: 0, //编辑的id
      MaterialList: [],
      supplyList: [],
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },

  async created() {
    await this.getsupplyList();
    if (this.$route.query.id) {
      this.examine_id = parseInt(this.Base64.decode(this.$route.query.id));
      this.title = "编辑进场统计";
      this.getInformation();
    }
  },
  methods: {
    selectFun() {
      this.$refs.datePicker.handleClose();
    },
    // 获取供应商选择列表
    async getsupplyList() {
      let res = await api.QueryMaterialManagementSupplyUnit_TJSTC({
        page: -1,
      });
      this.supplyList = res.result;
    },
    // 获取材料选择列表
    async getSelectList() {
      this.specification = "";
      this.unit = "";
      this.MaterialList = [];
      this.approach_count_material_info_id_union = null;
      if (this.ruleform.approach_count_organ_id_union == 0) {
        return;
      }
      let res1 = await api.queryMaterialManagementMaterialInformation({
        page: -1,
        material_info_organ_id_union:
          this.ruleform.approach_count_organ_id_union,
      });
      this.MaterialList = res1.result;
    },
    // 获取材料选择列表
    materialChange(organId) {
      let mater = this.MaterialList.find(
        (item) => item.material_information_id == organId
      );
      if (!mater) {
        this.specification = "";
        this.unit = "";
        return;
      }
      this.specification = mater.material_information_specification;
      this.unit = mater.material_information_Unit;
    },
    async getInformation() {
      let res = await api.queryMaterialManagementApproachCount({
        approach_count_ids: "" + this.examine_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      await this.getSelectList();
      this.materialChange(info.approach_count_material_info_id_union);
    },
    // 确认提交
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = {
        uploadFileModule: "MaterialManagementApproachCount_TJSTC",
      };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.approach_count_file_pic = picsjson.file;
      this.ruleform.approach_count_file = filejson.file;
      this.submitAllData();
    },
    async submitAllData() {
      if (!this.examine_id) {
        await api.uploadMaterialManagementApproachCount({
          ...this.ruleform,
        });
      } else {
        await api.updateMaterialManagementApproachCount({
          ...this.ruleform,
          approach_count_id: this.examine_id,
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
    getSelectValue(node) {
      this.ruleform.approach_count_organ_id_union = node.tag;
      this.ruleform.approach_count_material_info_id_union = null;
      this.specification = "";
      this.unit = "";
      this.getSelectList();
    },
  },
};
</script>

<style lang="scss" scoped>
.label-l {
  width: 110px;
}
</style>
