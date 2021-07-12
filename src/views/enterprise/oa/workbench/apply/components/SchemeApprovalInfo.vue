<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.scheme_organ_id_un"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="项目类型：">
        <el-select
          allow-create
          filterable
          default-first-option
          v-model="ruleforms.scheme_project_type"
          placeholder="请选择/输入"
        >
          <el-option
            :label="item.scheme_project_type"
            :value="item.scheme_project_type"
            v-for="(item, index) in projectType"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="项目总工：">
        <el-input
          v-model="ruleforms.scheme_project_account_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="方案类型：">
        <el-select v-model="ruleforms.scheme_type" placeholder="请选择">
          <el-option
            :label="item"
            :value="index + 1"
            v-for="(item, index) in schemeType"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long must" label="方案名称：">
        <el-input
          style="width: 50%"
          class="input-m"
          v-model="ruleforms.scheme_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="方案说明：">
        <el-input
          type="textarea"
          placeholder="请输入"
          rows="6"
          class="el-textarea-box-long"
          v-model="ruleforms.scheme_intro"
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
        scheme_id: null,
        scheme_revise_info_id_un: null,
        scheme_organ_id_un: null,
        scheme_project_account_name: "",
        scheme_project_type: "",
        scheme_type: null,
        scheme_name: "",
        scheme_intro: "",
        scheme_pic: "",
        scheme_pic_json: "",
        scheme_file: "",
        scheme_file_json: "",
        scheme_create_time: this.$utils.getCurrentTime(),
      },
      projectType: [], //项目类型
      schemeType: ["全线", "一般", "重大"],
      rules: {
        scheme_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        scheme_project_type: [
          {
            required: true,
            message: "请选择/输入项目类型",
          },
        ],
        scheme_project_account_name: [
          {
            required: true,
            message: "请输入项目总工",
          },
        ],
        scheme_type: [
          {
            required: true,
            message: "请选择方案类型",
          },
        ],
        scheme_name: [
          {
            required: true,
            message: "请输入方案名称",
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
      this.ruleforms.scheme_organ_id_un = this.$store.getters.user_organ_id;
    } else {
      this.QueryOAScheme();
    }
    // 查询方案项目类型
    this.QueryOASchemeProjectType();
  },
  methods: {
    async QueryOAScheme() {
      let { result } = await api.QueryOAScheme({
        scheme_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },
    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
        this.$refs.file_upload.setFileList(info.file_list);
      }
    },
    // 查询项目类型
    async QueryOASchemeProjectType() {
      let { result } = await api.QueryOASchemeProjectType({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.projectType = result;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.scheme_organ_id_un = node.tag;
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
      let file_obj = { uploadFileModule: "OAScheme" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.scheme_pic = picsjson.file;
      this.ruleforms.scheme_file = filejson.file;
      if (!isSave) {
        this.ruleforms.scheme_pic_json = picsjson.file_json;
        this.ruleforms.scheme_file_json = filejson.file_json;
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
      this.isAdd && (subdata.scheme_id = 0);
      await api[
        `${this.editID && !this.isAdd ? "UpdateOAScheme" : "UploadOAScheme"}`
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
