<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择人员姓名'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleforms.mobilize_account_id_union"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="人员姓名："
      >
        <el-input
          class="el-input-person"
          readonly
          placeholder="请选择"
          v-model="ruleforms.account_name"
        >
        </el-input>
        <div
          class="d-inline-block add-circle-btn ml-2"
          @click="showTargerAddLayer"
        >
          +
        </div>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="调出单位：">
        <n-treeselect
          ref="treeselect2"
          @getSelectNode="
            (val) => getSelectValue(val, 'mobilize_before_organ_id_union')
          "
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.mobilize_before_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="调入单位：">
        <n-treeselect
          :organTypeFilter="[60]"
          ref="treeselect"
          @getSelectNode="
            (val) => getSelectValue(val, 'mobilize_after_organ_id_union')
          "
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.mobilize_after_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="调入职位：">
        <el-input
          class="input-m"
          v-model="ruleforms.mobilize_after_job"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="调离日期：">
        <el-date-picker
          v-model="ruleforms.mobilize_time"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择调离日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long must" label="调岗原因：">
        <el-input
          type="textarea"
          placeholder="请输入"
          rows="6"
          class="el-textarea-box"
          v-model="ruleforms.mobilize_reason"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  mixins: ["upload"],
  props: {
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ruleforms: {
        mobilize_id: null,
        mobilize_revise_info_id_union: null,
        mobilize_account_id_union: null,
        before_organ_name: "",
        after_organ_name: "",
        mobilize_before_organ_id_union: null,
        mobilize_after_organ_id_union: null,
        mobilize_after_job: "",
        mobilize_reason: "",
        mobilize_sub_account_id_union: Number(this.$store.getters.account_id),
        mobilize_time: "",
        account_name: "",
      },
      rules: {
        mobilize_account_id_union: [
          {
            required: true,
            message: "请选择调动人员",
          },
        ],
        mobilize_before_organ_id_union: [
          {
            required: true,
            message: "请选择调出单位",
          },
        ],
        mobilize_after_organ_id_union: [
          {
            required: true,
            message: "请选择调入单位",
          },
        ],
        mobilize_after_job: [
          {
            required: true,
            message: "请输入调入职位",
          },
        ],
        mobilize_time: [
          {
            required: true,
            message: "请选择调离日期",
          },
        ],
        mobilize_reason: [
          {
            required: true,
            message: "请输入调岗原因",
          },
        ],
      },
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    if (!this.editID) {
      this.title = "调动申请新增";
      // 默认登录者
      this.ruleforms.account_name = this.$store.getters.userName;
      this.ruleforms.mobilize_account_id_union = Number(
        this.$store.getters.account_id
      );
      this.ruleforms.mobilize_before_organ_id_union =
        this.$store.getters.user_organ_id;
      this.ruleforms.before_organ_name = this.$store.getters.user_organ_name;
    } else {
      this.title = "调动申请编辑";
      this.queryStaffMobilize();
    }
  },
  methods: {
    async queryStaffMobilize() {
      let { result } = await api.queryStaffMobilize({
        mobilize_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },

    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.ruleforms.account_name = info.account_name;
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
      }
    },
    // 选择了人员姓名后点击确认
    async choosePersonFun(data) {
      this.ruleforms.mobilize_before_organ_id_union = null;
      //查询此人的调出申请信息
      this.$refs.treeselect2.valueTitle = "";
      this.ruleforms.mobilize_account_id_union = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.ruleforms.account_name = result[0].account_name;
      this.ruleforms.mobilize_before_organ_id_union = result[0].organ_id_union;
      this.$refs.dialog.cancel();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 树形下拉选择
    getSelectValue(node, name) {
      this.ruleforms[name] = node.tag;
      name == "mobilize_before_organ_id_union"
        ? (this.ruleforms.before_organ_name = node.node.organ)
        : (this.ruleforms.after_organ_name = node.node.organ);
    },
    // 确认提交
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.mobilize_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateStaffMobilize"
            : "uploadStaffMobilize"
        }`
      ](subdata);
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

<style lang="scss" scoped></style>
