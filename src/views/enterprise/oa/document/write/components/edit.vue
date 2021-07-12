<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 15:06:45
-->
<template>
  <div class="position-relative h-100 w-100">
    <n-dialog ref="submit_dialog" :diaTit="'提交审批'" :diaWidth="'60%'">
      <template slot="diaSlot">
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          ref="approval_form"
          :titleName="titleName"
          :modules_union="'ReceiveReceiveFile'"
        ></v-approval-form>
        <div class="w-100 d-flex justify-content-center mt-5">
          <n-button
            :btnText="'确认发布'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="$refs.approval_form.submitFun()"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <n-dialog ref="approval_dialog" :diaTit="'审批流程'" :diaWidth="'60%'">
      <template slot="diaSlot">
        <div class="d-flex-cen approval_img">
          <img src="@/assets/images/enterprise/approval_process.png" />
        </div>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog"
      :diaTit="'选择人员'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          :isSingle="false"
          ref="singlechoose"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog1"
      :diaTit="'选择人员'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose1"
          class="single-choose-person"
          :isSingle="true"
          :section="$store.getters.organID"
          :personID="ruleform.receive_check"
          @choosePersonFun="choosePersonFun1"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="position-absolute left-box rounded-1 bg-white px-2 py-1">
      <div style="display: none"><div id="print"></div></div>
      <el-form
        ref="ruleform"
        id="ruleform1"
        class="el-form-box1"
        :model="ruleform"
      >
        <table class="table-box1" border="1">
          <thead>
            <tr>
              <td colspan="2">
                <div
                  class="font-20 text-hover-danger font-weight-bold text-center"
                >
                  广东冠迪建设有限公司文件
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long must" label="发文字号：">
                  <el-input
                    class="w-100"
                    placeholder="请输入"
                    v-model="ruleform.receive_num"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item class="form-item-long must" label="缓急：">
                  <el-select
                    class="w-100"
                    v-model="ruleform.receive_urgent"
                    placeholder="请选择"
                  >
                    <el-option label="特急公文(特急)" :value="1"></el-option>
                    <el-option label="紧急公文(急件)" :value="2"></el-option>
                    <el-option label="常规公文(平件)" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <el-form-item class="form-item-long must" label="密级：">
                  <el-select
                    class="w-100"
                    v-model="ruleform.receive_secret"
                    placeholder="请选择"
                  >
                    <el-option label="普通" :value="4"></el-option>
                    <el-option label="绝密" :value="1"></el-option>
                    <el-option label="机密" :value="2"></el-option>
                    <el-option label="秘密" :value="3"></el-option>
                    <el-option label="此件不公开" :value="5"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long" label="签发：">
                  <person-checked
                    key-str="sign"
                    @showDalog="showTargerAddLayer('sign')"
                    :PersonList="sign_list"
                    @DeletPerson="deletPerson"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long" label="会签：">
                  <person-checked
                    key-str="hq"
                    @showDalog="showTargerAddLayer('hq')"
                    :PersonList="hq_list"
                    @DeletPerson="deletPerson"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long must" label="主送：">
                  <person-checked
                    key-str="main"
                    @showDalog="showTargerAddLayer('main')"
                    :PersonList="main_list"
                    @DeletPerson="deletPerson"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long" label="抄送：">
                  <person-checked
                    key-str="copy"
                    @showDalog="showTargerAddLayer('copy')"
                    :PersonList="copy_list"
                    @DeletPerson="deletPerson"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item class="form-item-long" label="拟稿单位：">
                  <el-input
                    readonly
                    placeholder="请输入"
                    v-model="ruleform.organ_name"
                  ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item class="form-item-long" label="拟稿人：">
                  <el-input
                    readonly
                    class="w-100"
                    placeholder="请输入"
                    v-model="ruleform.account_name"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item class="form-item-long" label="份数：">
                  <num-input
                    :fixedNum="0"
                    v-model="ruleform.receive_c"
                  ></num-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item class="form-item-long" label="印刷：">
                  <el-input
                    class="w-100"
                    placeholder="请输入"
                    v-model="ruleform.receive_print"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long" label="校对：">
                  <person-checked
                    key-str="check"
                    @showDalog="showTargerAddLayer('check')"
                    :PersonList="check_list"
                    @DeletPerson="deletPerson"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item class="form-item-long must" label="标题：">
                  <el-input
                    class="w-100"
                    placeholder="请输入"
                    v-model="ruleform.receive_title"
                  >
                  </el-input>
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
        <el-form-item class="form-item-long mt-1 file-node" label="附件：">
          <div class="cursor-p" @click="uploadFile">
            <i class="iconfont btn-btn_list_upload mr-05 text-hover-danger"></i>
            <span class="text-hover-danger">上传附件</span>
          </div>
        </el-form-item>
        <n-new-file-upload
          ref="fileUpload"
          class="file-node"
          file-module="ReceiveReceiveFile"
        />
      </el-form>
    </div>
    <div class="position-absolute right-box rounded-1 bg-white p-1">
      <dynamic-editor
        ref="qill"
        id="quill1"
        :word="content"
        style="height: 90%"
      />
      <div class="d-flex justify-content-between mt-4">
        <!-- <div> -->
        <n-button
          :colorBtn="'green'"
          :btnText="'打印'"
          :width="'150px'"
          @buttonClick="printFun"
        ></n-button>
        <n-button
          :btnText="'审批流程'"
          :width="'150px'"
          :colorBtn="'orange'"
          @buttonClick="$refs.approval_dialog.show()"
        ></n-button>
        <!-- </div>
        <div> -->
        <n-button
          v-if="!isEdit && !isEditShow"
          :btnText="'保存'"
          :width="'150px'"
          :colorBtn="'grey'"
          @buttonClick="submitFun({ ...ruleform }, true)"
        ></n-button>
        <n-button
          :btnText="'提交审批'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="showDialog"
        ></n-button>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import DynamicEditor from "@/components/QillEditor";
import vApprovalForm from "@/components/common/ApprovalForm";
import PersonChecked from "./PersonChecked";
import { printFun } from "@/plugins/print/printFun";
export default {
  components: {
    DynamicEditor,
    vApprovalForm,
    PersonChecked,
  },
  // editType 2代表草稿箱跳转进来的  1代表从发文拟稿跳转进来 3代表从我的发文编辑进来
  props: ["isEdit", "editType"],
  data() {
    return {
      printFun,
      edit_id: null,
      titleName: `${this.$store.getters.userName}_发文申请`, //单据名称
      printObj: {
        id: "#print",
        popTitle: "盘点单明细", //打印标题
      },
      key_type: "",
      personIDsArr: [],
      main_list: [],
      copy_list: [],
      sign_list: [],
      hq_list: [],
      check_list: [],
      content: "",
      infoData: {},
      ruleform: {
        receive_file_id: null,
        account_name: null,
        organ_name: null,
        receive_num: null,
        receive_urgent: null,
        receive_secret: null,
        receive_sign: "",
        receive_hq: "",
        receive_main: "",
        receive_copy: "",
        organ_id_un: null,
        receive_create: null,
        receive_print: null,
        receive_c: null,
        receive_check: null,
        receive_title: null,
      },
      rules: {
        receive_num: [
          {
            required: true,
            message: `请输入发文字号`,
          },
        ],
        receive_urgent: [
          {
            required: true,
            message: `请选择缓急`,
          },
        ],
        receive_secret: [
          {
            required: true,
            message: `请选择密级`,
          },
        ],
        receive_main: [
          {
            required: true,
            message: `请选择主送`,
          },
        ],
        receive_title: [
          {
            required: true,
            message: `请输入主题`,
          },
        ],
        receive_content: [
          {
            required: true,
            message: `请输入正文`,
          },
        ],
      },
      isEditShow: this.$route.query.isEditShow || false,
    };
  },
  async created() {
    // 默认登录者
    if (this.$route.query.id) {
      this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
      await this.QueryReceiveFile(this.edit_id);
    }
    this.ruleform.account_name = this.$store.state.user.userName;
    this.ruleform.organ_name = this.$store.getters.rootOrganName;
    this.ruleform.receive_create = Number(this.$store.state.user.account_id);
    this.ruleform.organ_id_un = Number(this.$store.getters.user_organ_id);
  },
  methods: {
    async QueryReceiveFile(id) {
      let { result } = await api.QueryReceiveReceiveFile({
        receive_file_id: id,
      });
      let info = result[0];
      this.infoData = info;
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      let keyArr = ["main", "copy", "hq", "sign"];
      keyArr.forEach((key) => {
        this[key + "_list"] = info[key + "_list"];
        // this.ruleform["receive_" + key] = info["receive_" + key]
        //   ? info["receive_" + key].split(",").map(Number)
        //   : info["receive_" + key];
        this.ruleform["receive_" + key] = info["receive_" + key];
      });
      this.ruleform.receive_urgent =
        this.ruleform.receive_urgent == 0 ? null : this.ruleform.receive_urgent;
      this.ruleform.receive_secret =
        this.ruleform.receive_secret == 0 ? null : this.ruleform.receive_secret;
      this.ruleform.receive_c =
        this.ruleform.receive_c == 0 ? null : this.ruleform.receive_c;
      this.check_list = info.receive_check ? [info.check_name] : [];
      this.content = info.receive_content;
      this.$refs.fileUpload.setFileList(info.file_list);
    },
    // 删除人员
    deletPerson(type, index, data) {
      this.personIDsArr = this.ruleform["receive_" + type]
        .split(",")
        .map(Number);
      this[type + "_list"].splice(index, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
      this.ruleform["receive_" + type] = this.personIDsArr.join(",");
    },
    // 点击选择考核对象
    showTargerAddLayer(type) {
      this.key_type = type;
      if (type == "check") {
        this.$refs.dialog1.show();
      } else {
        this.$refs.dialog.show();
        if (this.$refs.singlechoose) {
          this.$refs.singlechoose.setSelectPerson(this[type + "_list"]);
        } else {
          this.$nextTick(() => {
            this.$refs.singlechoose.setSelectPerson(this[type + "_list"]);
          });
        }
        this.rebackPerson(type);
      }
    },
    async rebackPerson(type) {
      let account_ids = this[type + "_list"].filter((item) => item.account_id);
      this.personIDsArr = account_ids.map((item) => item.account_id);
      await this.queryAccount(this.personIDsArr);
    },
    // 选择人员确认1
    async choosePersonFun1(data) {
      this.ruleform["receive_" + this.key_type] = data;
      let result = await this.queryAccount([data]);
      this[this.key_type + "_list"] = result;
      this.$refs.dialog1.cancel();
    },
    // 选择人员确认
    async choosePersonFun(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.ruleform["receive_" + this.key_type] = this.personIDsArr.join(",");
      this[this.key_type + "_list"] = [...nodes];
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      return data.result;
    },
    async submitFun(subdata, bool) {
      let filejson = this.$refs.fileUpload.getFileObj();
      // let keyArr = ["receive_hq", "receive_sign", "receive_main", "receive_copy"];
      // keyArr.forEach(item => (subdata[item] = subdata[item] && subdata[item].join()));
      let url = this.edit_id
        ? "UpdateReceiveReceiveFile"
        : "UploadReceiveReceiveFile";
      subdata = { ...this.infoData, ...subdata };
      subdata.receive_file = filejson.file;
      subdata.receive_file_json = filejson.file_json;
      subdata.receive_content = this.$refs.qill.content;
      if (subdata.new_approve_request) {
        subdata.receive_approve_id_un = this.infoData.receive_approve_id_un;
      }
      await api[url](subdata);
      this.$bus.$emit("refresh_document", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          if (this.editType == 2) {
            this.$router.linkTo("enterprise_oa_document_draft");
          } else if (this.editType == 1) {
            if (bool) {
              this.$router.linkTo("enterprise_oa_document_draft");
            } else {
              this.$router.linkTo("enterprise_oa_document_myPost");
            }
          } else if (this.editType == 3) {
            this.$router.linkTo("enterprise_oa_document_myPost");
          }
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      this.$router.linkTo(item.path);
    },
    showDialog() {
      this.ruleform.receive_content = this.$refs.qill.content;
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (!this.edit_id) {
        this.$refs.submit_dialog.show();
      } else {
        //若是编辑，则直接提交接口，不需要显示审批弹框
        this.submitAllDataApproval();
      }
    },
    // 审批提交
    async submitAllDataApproval(form) {
      let subdata = {
        ...form,
        ...this.ruleform,
      };

      this.submitFun(subdata, false);
    },
  },
};
</script>
<style lang="scss" scoped>
.approval_img {
  height: 400px;
}
::v-deep .form-item-long .el-input {
  width: 100%;
}
//自定义表格
.table-box1 {
  width: 100%;
  table-layout: fixed;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border-color: #fc3e3e;
  border-collapse: collapse;
  tr,
  td {
    border: 1px solid #fc3e3e;
    padding-left: 6px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
    vertical-align: middle !important;
    display: inline-flex !important;
    align-items: center;
  }
}
.el-form-box1 ::v-deep {
  .el-form-item__label {
    color: #fc3e3e;
    text-align-last: justify;
    width: 96px !important;
    line-height: 20px !important;
    font-size: 16px;
  }
  .el-input__inner {
    border: none;
  }
}
.add-img {
  width: 20px;
  margin-top: 10px;
  margin-right: 6px;
}
.left-box {
  width: 49.4%;
  top: 0px;
  bottom: 0px;
  left: 0px;
}
.right-box {
  width: 50%;
  top: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
