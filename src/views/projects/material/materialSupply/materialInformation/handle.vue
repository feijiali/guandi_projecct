<template>
  <div class="w-100 h-100">
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
              :value="ruleform.material_info_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long must" label="材料名称：">
            <el-select
              @change="getspecArr"
              class="el-select"
              ref="select"
              v-model="ruleform.material_information_name"
              filterable
              allow-create
              default-first-option
              placeholder="选择或输入"
            >
              <el-option
                v-for="(item, index) in nameArr"
                :key="index"
                :label="item.material_information_name"
                :value="item.material_information_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long must" label="材料规格：">
            <el-select
              class="el-select"
              ref="select"
              v-model="ruleform.material_information_specification"
              filterable
              allow-create
              default-first-option
              placeholder="选择或输入"
            >
              <el-option
                v-for="(item, index) in specArr"
                :key="index"
                :label="item.material_information_specification"
                :value="item.material_information_specification"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long must" label="材料单位：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.material_information_Unit"
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
      title: "新增原材料",
      ruleform: {
        material_info_organ_id_union: null,
        material_information_name: "",
        material_information_specification: "",
        material_information_Unit: "",
        material_information_submit_time: null,
      },
      defaultProps: {
        value: "tag",
        children: "leaves",
        label: "organ",
      },
      specArr: [],
      nameArr: [],
      rules: {
        material_info_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        material_information_name: [
          {
            required: true,
            message: "请填写材料名称",
          },
        ],
        material_information_Unit: [
          {
            required: true,
            message: "请填写材料单位",
          },
        ],
        material_information_specification: [
          {
            required: true,
            message: "请填写材料规格",
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
  async created() {
    await this.getnameArr();
    if (this.$route.query.id) {
      this.examine_id = parseInt(this.Base64.decode(this.$route.query.id));
      this.title = "编辑原材料";
      this.getInformation();
    }
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.material_info_organ_id_union = node.tag;
    },
    // 获取材料名称
    async getnameArr() {
      let res = await api.queryMaterialManagementMaterialInformationNameSelect({
        page: -1,
      });
      this.nameArr = res.result;
    },
    // 获取材料规格
    async getspecArr() {
      let res = await api.queryMaterialManagementMaterialInformationSpecSelect({
        material_information_name: this.ruleform.material_information_name,
        page: -1,
      });
      this.specArr = res.result;
    },
    async getInformation() {
      let res = await api.queryMaterialManagementMaterialInformation({
        material_information_ids: "" + this.examine_id,
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
        await api.updateMaterialManagementMaterialInformation({
          ...this.ruleform,
          material_information_id: this.examine_id,
        });
      } else {
        await api.uploadMaterialManagementMaterialInformation({
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
    backRouter() {
      this.confirm("", "", "确认退出当前操作？").then(async () => {
        this.$router.go(-1);
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
