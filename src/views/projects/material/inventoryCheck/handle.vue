<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="盘点主题：">
            <el-input
              v-model="ruleform.inventory_check_title"
              placeholder="请输入"
              class="input-m"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工区：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.inventory_check_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="施工队：">
            <el-input
              v-model="ruleform.inventory_check_construction_team"
              placeholder="请输入"
              class="input-m"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="盘点时间：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.inventory_check_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="明细条目："
            v-if="type != 'file'"
          >
            {{ ruleform.inventory_detail.length }}
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small must" label="材料主管：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.inventory_check_supervisor"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="参加人员：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.inventory_check_participants"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.inventory_check_remark"
            ></el-input>
          </el-form-item>

          <div
            class="text-hover-primary position-relative mb-1"
            v-if="type != 'file'"
          >
            盘点明细
            <div class="position-absolute add-mx">
              <img
                @click.stop="addDetail()"
                src="@/assets/images/btn_safe_add.png"
              />
            </div>
          </div>
          <div v-if="type != 'file'">
            <el-card
              v-for="(item, i) in ruleform.inventory_detail"
              :key="i"
              class="box-card mb-2 position-relative"
            >
              <el-form-item
                class="form-item-long-small must"
                label="物资名称："
              >
                <el-input
                  v-model="item.inventory_details_name"
                  placeholder="请输入"
                  class="input-m"
                ></el-input>
              </el-form-item>
              <el-form-item class="form-item-long-small must" label="原材料：">
                <el-select
                  v-model="item.inventory_details_material_info_id_union"
                  placeholder="请选择"
                  @change="materialChange(i)"
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
              <el-form-item
                class="form-item-long-small must"
                label="规格型号："
              >
                <el-input
                  readonly="readonly"
                  v-model="unitSpec[i].spec"
                  placeholder
                  class="input-m is-disabled"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="form-item-long-small must"
                label="计量单位："
              >
                <el-input
                  readonly="readonly"
                  v-model="unitSpec[i].unit"
                  placeholder
                  class="input-m is-disabled"
                ></el-input>
              </el-form-item>
              <el-form-item class="form-item-long-small must" label="数量：">
                <num-input
                  v-model="item.inventory_details_quantity"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="半成品：">
                <el-input
                  v-model="item.inventory_details_semi"
                  placeholder="请输入"
                  class="input-m"
                ></el-input>
              </el-form-item>

              <el-form-item class="form-item-long-small" label="存放地点：">
                <el-input
                  v-model="item.inventory_details_location"
                  placeholder="请输入"
                  class="input-m"
                ></el-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="说明：">
                <el-input
                  v-model="item.inventory_details_remark"
                  placeholder="请输入"
                  class="input-m"
                ></el-input>
              </el-form-item>
              <div class="detail-btn-box position-absolute">
                <img
                  class="detail-btn cursor-p position-absolute"
                  src="@/assets/images/btn_input_decrease.png"
                  alt
                  @click.stop="removeDetail(i)"
                />
              </div>
            </el-card>
          </div>
          <el-form-item
            class="form-item-long must"
            label="导入明细文件："
            v-if="type == 'file'"
          >
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
      title: "新增库存统计",
      ruleform: {
        account_id_union: 0,
        inventory_check_submit_time: "",
        inventory_check_title: "",
        inventory_check_organ_id_union: null,
        inventory_check_construction_team: "",
        inventory_check_quantity: 0,
        inventory_check_supervisor: "",
        inventory_check_time: "",
        inventory_check_participants: "",
        inventory_check_remark: "",
        inventory_detail: [],
      },
      rules: {
        inventory_check_title: [
          {
            required: true,
            message: "请填写盘点主题",
          },
        ],
        inventory_check_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        inventory_check_construction_team: [
          {
            required: true,
            message: "请填写施工队",
          },
        ],
        inventory_check_supervisor: [
          {
            required: true,
            message: "请填写材料主管",
          },
        ],
        inventory_check_time: [
          {
            required: true,
            message: "请选择盘点时间",
          },
        ],
        inventory_check_participants: [
          {
            required: true,
            message: "请填写参加人员",
          },
        ],
        inventory_detail: {
          validator: this.checkdetail,
        },
      },
      examine_id: 0, //编辑的id
      MaterialList: [],
      unitSpec: [],
      redetail: [],
      type: "",
      isDisabled: false,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  async created() {
    this.type = this.$route.query.type;
    if (this.$route.query.id) {
      this.examine_id = parseInt(this.Base64.decode(this.$route.query.id));
      this.title = "编辑库存统计";
      this.getInformation();
    }
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.inventory_check_organ_id_union = node.tag;
      this.getSelectList();
    },
    checkdetail(rule, detail, callback) {
      for (let i = 0; i < detail.length; i++) {
        let str = `第${i + 1}个盘点明细的`;
        if (detail[i].inventory_details_name == "") {
          return callback(new Error(`请填写${str}物资名称`));
        }
        if (detail[i].inventory_details_quantity == "") {
          return callback(new Error(`请填写${str}数量`));
        }
        if (
          detail[i].inventory_details_quantity &&
          !/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(
            detail[i].inventory_details_quantity
          )
        ) {
          return callback(new Error(`${str}数量长度仅限两位小数`));
        }
        if (detail[i].inventory_details_location == "") {
          return callback(new Error(`请填写${str}存放地点`));
        }
      }
    },
    // 添加明细
    addDetail() {
      let data = {
        inventory_details_id: 0,
        inventory_details_check_id_union: 0,
        inventory_details_material_info_id_union: null,
        inventory_details_name: "",
        inventory_details_quantity: "",
        inventory_details_semi: "",
        inventory_details_location: "",
        inventory_details_remark: "",
        action: 1,
      };
      this.ruleform.inventory_detail.push(data);
      this.unitSpec.push({
        unit: "",
        spec: "",
      });
    },
    // 删除明细
    removeDetail(ind) {
      if (
        !isNaN(this.examine_id) &&
        this.ruleform.inventory_detail[ind].inventory_details_id != 0
      ) {
        this.ruleform.inventory_detail[ind].action = 3;
        this.redetail.push(this.ruleform.inventory_detail[ind]);
      }
      this.ruleform.inventory_detail.splice(ind, 1);
      this.unitSpec.splice(ind, 1);
    },
    // 获取详情
    async getInformation() {
      let res = await api.queryMaterialManagementInventoryCheckInfo({
        inventory_check_ids: "" + this.examine_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }

      info.inventory_detail.forEach(() => {
        this.unitSpec.push({
          unit: "",
          spec: "",
        });
      });
      await this.SelectListinfo();
      for (let i = 0; i < this.ruleform.inventory_detail.length; i++) {
        this.ruleform.inventory_detail[i].action = 2;
        this.materialChange(i);
      }
    },
    // 确认提交
    async submitFun() {
      this.ruleform.inventory_check_quantity =
        this.ruleform.inventory_detail.length;
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.type == "file") {
        if (this.$refs.file_upload.fileList.length <= 0) {
          this.$tip({
            isTip: true,
            message: "请选择导入的盘点明细文件文件",
          });
          return;
        }
        if (this.isDisabled) {
          return;
        }
        this.isDisabled = true;
        let file_obj = {
          uploadFileModule: "MaterialManagementInventoryCheck_TJSTC",
        };
        let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
        this.ruleform.file_name = filejson.file;
        await api.importMaterialManagementInventoryCheck({
          ...this.ruleform,
        });
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
        setTimeout(() => {
          this.isDisabled = false;
        }, 300);
        return;
      }
      if (this.examine_id) {
        await api.updateMaterialManagementInventoryCheck({
          ...this.ruleform,
          inventory_check_id: this.examine_id,
        });
      } else {
        await api.uploadMaterialManagementInventoryCheck({
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
    // 获取材料选择列表
    async getSelectList() {
      this.MaterialList = [];
      this.ruleform.inventory_detail.forEach((item) => {
        item.inventory_details_material_info_id_union = null;
      });
      this.unitSpec.forEach((item) => {
        item.unit = "";
        item.spec = "";
      });
      this.SelectListinfo();
    },
    async SelectListinfo() {
      if (this.ruleform.approach_count_organ_id_union == 0) {
        return;
      }
      let res1 = await api.queryMaterialManagementMaterialInformation({
        page: -1,
        ...this.organSelect,
      });
      this.MaterialList = res1.result;
    },
    materialChange(ind) {
      let mater = this.MaterialList.find((item) => {
        let det = this.ruleform.inventory_detail[ind];
        return (
          item.material_information_id ==
          det.inventory_details_material_info_id_union
        );
      });
      if (mater) {
        this.unitSpec[ind].unit = mater.material_information_Unit;
        this.unitSpec[ind].spec = mater.material_information_specification;
        this.ruleform.inventory_detail[ind].inventory_details_check_id_union =
          mater.inventory_details_check_id_union;
      } else {
        this.unitSpec[ind].unit = "";
        this.unitSpec[ind].spec = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.label-l {
  width: 110px;
}

.box-card {
  width: 80%;
}

.detail-btn {
  width: 28px;
  left: 10px;
  top: 44%;
  vertical-align: middle;
}

.detail-btn-box {
  position: absolute;
  width: 50px;
  right: 0;
  height: 100%;
  top: 0;
  border-radius: 0 8px 8px;
  background-color: #d5e2fc;
}

.add-mx {
  top: -3px;
  left: 76px;
}
</style>
