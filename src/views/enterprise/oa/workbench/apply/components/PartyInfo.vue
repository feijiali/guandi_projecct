<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择申请人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleforms.pd_account_id_un"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="所属机构："
      >
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.pd_organ_id_un"
      /></el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="申请人："
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
      <el-form-item class="form-item-long-small must" label="申请名称：">
        <el-input
          class="input-m"
          v-model="ruleforms.pd_title"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="提交人：">
        <el-input
          readonly
          class="input-m"
          v-model="$store.getters.userName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="备注：">
        <el-input
          type="textarea"
          placeholder="请输入"
          rows="6"
          class="el-textarea-box"
          v-model="ruleforms.pd_remark"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
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
        account_name: "",
        personnel_develop_id: null,
        pd_revise_info_id_un: null,
        pd_organ_id_un: null,
        pd_account_id_un: null,
        pd_title: "",
        pd_remark: "",
        pd_file: "",
        pd_pic: "",
        pd_sub_time: this.$utils.getCurrentTime(),
      },
      rules: {
        pd_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        pd_title: [
          {
            required: true,
            message: "请输入申请名称",
          },
        ],
        pd_account_id_un: [
          {
            required: true,
            message: "请选择申请人",
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
      this.ruleforms.pd_organ_id_un = this.$store.getters.user_organ_id;
      // 默认登录者
      this.ruleforms.account_name = this.$store.getters.userName;
      this.ruleforms.pd_account_id_un = Number(this.$store.getters.account_id);
    } else {
      await this.queryUnionPartyPersonnelDevelop();
    }
  },
  methods: {
    async queryUnionPartyPersonnelDevelop() {
      let { result } = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: this.editID,
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
        this.$refs.file_upload.setFileList(info.file_list);
      }
    },
    // 选择了人员姓名后点击确认
    async choosePersonFun(data) {
      this.ruleforms.pd_account_id_un = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.ruleforms.account_name = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.pd_organ_id_un = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    // 确认提交
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "UnionPartyPersonnelDevelop" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.pd_pic = picsjson.file;
      this.ruleforms.pd_file = filejson.file;
      if (!isSave) {
        this.ruleforms.pd_pic_json = picsjson.file_json;
        this.ruleforms.pd_file_json = filejson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }

        if (filejson.file) {
          let file_json = JSON.parse(filejson.file_json);
          let urls_file = filejson.urls.split(",");
          let file_list = urls_file.map((item, index) => {
            return {
              ...file_json[index],
              file_json: file_json[index],
              url: item,
            };
          });
          this.ruleforms.file_list = file_list;
        } else {
          this.ruleforms.file_list = [];
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.personnel_develop_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateUnionPartyPersonnelDevelop"
            : "uploadUnionPartyPersonnelDevelop"
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
