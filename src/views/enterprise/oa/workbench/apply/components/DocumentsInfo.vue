<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择文件可见权限'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="chooseperson"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.internal_document_organ_id_un"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="文件名称：">
        <el-input
          v-model="ruleforms.internal_document_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="备注：">
        <el-input
          type="textarea"
          placeholder="请输入"
          rows="6"
          class="el-textarea-box"
          v-model="ruleforms.internal_document_remark"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="文件可见权限：">
        <nAddItemContent @addFun="addPersons">
          <template slot="content-add">
            <div
              class="content-item"
              v-for="(item, index) in personList"
              :key="index"
            >
              <span>{{ item.account_name }}【{{ item.account_job }}】</span>
              <i
                class="iconfont btn-btn_detail_minus_02 font-20"
                @click="reduceFun(index, item)"
              ></i>
            </div>
          </template>
        </nAddItemContent>
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
        internal_document_id: null,
        internal_document_revise_info_id_un: null,
        internal_document_organ_id_un: null,
        internal_document_name: "",
        internal_document_remark: "",
        internal_document_approve: "", //流程审批人员的id集合
        internal_document_range: "", //文件可见权限人员的id集合
        internal_document_pic: "",
        internal_document_pic_json: "",
        internal_document_file: "",
        internal_document_file_json: "",
        internal_document_create_time: this.$utils.getCurrentTime(),
      },
      projectType: [], //项目类型
      schemeType: ["全线", "一般", "重大"],
      rules: {
        internal_document_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        internal_document_name: [
          {
            required: true,
            message: "请输入文件名称",
          },
        ],
      },
      personList: [],
      personIDsArr: [],
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
      this.ruleforms.internal_document_organ_id_un =
        this.$store.getters.user_organ_id;
    } else {
      this.QueryOAInternalDocument();
    }
    // 选择审批流程的时候取出选中的流程里面的所有审批人
    this.$bus.$on("chooseProcessFun", (list) => {
      let accountsArr = [];
      list.forEach((item) => {
        let account_list = item.account_list;
        account_list.forEach((items) => {
          accountsArr.push(items.account_id);
        });
      });
      this.ruleforms.internal_document_approve = accountsArr.join(",");
    });
  },
  methods: {
    async QueryOAInternalDocument() {
      let { result } = await api.QueryOAInternalDocument({
        internal_document_id: this.editID,
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
    // 点击➕展示人员选择弹框
    addPersons() {
      this.$refs.dialog.show();
      if (this.$refs.chooseperson) {
        this.$refs.chooseperson.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.chooseperson.setSelectPerson(this.personList);
        });
      }
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    // 删除人员
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.personList = [...nodes];
      this.$refs.dialog.cancel();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.internal_document_organ_id_un = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    // 确认提交
    async submitFun(isSave) {
      this.ruleforms.internal_document_range = this.personIDsArr.join(",");
      let file_obj = { uploadFileModule: "OAScheme" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.internal_document_file = filejson.file;
      this.ruleforms.internal_document_pic = picsjson.file;
      if (!isSave) {
        this.ruleforms.internal_document_file_json = filejson.file_json;
        this.ruleforms.internal_document_pic_json = picsjson.file_json;
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
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
        if (
          !this.ruleforms.internal_document_pic &&
          !this.ruleforms.internal_document_file
        ) {
          this.$tip({
            isTip: true,
            message: "附件图片和文档二选一上传",
          });
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
      this.isAdd && (subdata.internal_document_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "UpdateOAInternalDocument"
            : "UploadOAInternalDocument"
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
