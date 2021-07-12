<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-04-01 14:54:47
-->
<template>
  <div class="position-relative h-100 w-100">
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
    <div class="position-absolute left-box rounded-1 bg-white px-2 py-1">
      <div>
        <nBackTop :title="title" />
      </div>
      <el-form ref="ruleform" class="el-form-box" :model="ruleform">
        <div class="pd">
          <el-form-item class="form-item-long" label="发件人：">
            <span class="font-14">{{ ruleform.account_name }}</span>
          </el-form-item>
        </div>
        <div class="pd mb-1">
          <el-form-item class="form-item-long must" label="收件人：">
          </el-form-item>
          <el-input
            placeholder="请输入邮箱或从组织架构添加人员"
            class="w-100"
            v-model="ruleform.email_receive_email"
          >
            <i
              @click="showTargerAddLayer('receive')"
              slot="suffix"
              class="iconfont btn-btn_detail_plus_01 add-btn"
            ></i>
          </el-input>
        </div>
        <div class="pd mb-1">
          <el-form-item class="form-item-long" label="抄送人："> </el-form-item>
          <el-input
            placeholder="请输入邮箱或从组织架构添加人员"
            class="w-100"
            v-model="ruleform.email_copy_email"
          >
            <i
              @click="showTargerAddLayer('copy')"
              slot="suffix"
              class="iconfont btn-btn_detail_plus_01 add-btn"
            ></i
          ></el-input>
        </div>
        <div class="pd mb-1">
          <el-form-item class="form-item-long pd" label="密送人：">
          </el-form-item>
          <el-input
            placeholder="请输入邮箱或从组织架构添加人员"
            class="w-100"
            v-model="ruleform.email_secret_email"
          >
            <i
              @click="showTargerAddLayer('secret')"
              slot="suffix"
              class="iconfont btn-btn_detail_plus_01 add-btn"
            ></i
          ></el-input>
        </div>
        <div class="pd mb-1">
          <el-form-item class="form-item-long" label="主题："> </el-form-item>
          <el-input
            placeholder="请输入邮件主题（不填则显示无主题）"
            class="w-100"
            v-model="ruleform.email_title"
          ></el-input>
        </div>
        <div class="pd mb-1">
          <el-form-item class="form-item-long" label="其他操作：">
          </el-form-item>
          <el-checkbox-group
            v-model="ruleform.email_control"
            class="el-radio-form"
          >
            <el-checkbox label="1"
              >紧急 <i class="iconfont btn-icon_lightning text-hover-danger"></i
            ></el-checkbox>
            <el-checkbox label="2"
              >重要 <i class="iconfont btn-icon_notice text-warning"></i
            ></el-checkbox>
            <el-checkbox label="3"
              >需要回执
              <i class="iconfont btn-icon_leftbar_notice text-success"></i
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
      <n-button class="mb-1" :btnText="'上传附件'" @buttonClick="uploadFile">
        <template v-slot:button-slot>
          <i class="iconfont btn-btn_list_upload mr-1"></i>
        </template>
      </n-button>
      <n-new-file-upload ref="fileUpload" file-module="OaEmail" />
    </div>
    <div class="position-absolute right-box rounded-1 bg-white p-1">
      <dynamic-editor ref="qill" :word="content" style="height: 90%" />
      <div class="d-flex justify-content-end mt-4">
        <n-button
          :btnText="'存为草稿'"
          :width="'150px'"
          :colorBtn="'grey'"
          @buttonClick="submitFun(2)"
        ></n-button>
        <n-button
          class="ml-2"
          :btnText="'发送'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFun(1)"
        ></n-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import DynamicEditor from "@/components/QillEditor";
export default {
  components: {
    DynamicEditor,
  },
  props: {
    title: {
      type: String,
      default: "回复",
    },
  },
  data() {
    return {
      personListAll: [],
      personIDsArr: [],
      personList: [],
      key_type: "",
      content: "",
      ruleform: {
        oa_email_account: 0,
        account_name: "",
        email_title: null,
        oa_email_text: null,
        email_receive_account_id_un: [],
        email_receive_email: "",
        email_copy_account_id_un: [],
        email_copy_email: "",
        email_secret_account_id_un: [],
        email_secret_email: "",
        email_control: [],
        email_receive: [],
        email_copy: [],
        email_secret: [],
      },
      rules: {
        email_receive_email: [
          {
            required: true,
            message: `请输入或选择收件人`,
          },
        ],
      },
    };
  },
  created() {
    // 默认登录者
    this.ruleform.account_name = this.$store.state.user.userName;
    this.ruleform.oa_email_account = Number(this.$store.state.user.account_id);
    this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.QueryOaEmail(this.edit_id);
  },
  methods: {
    async QueryOaEmail(id) {
      let { result } = await api.QueryOaEmail({ email_id_un: id });
      let info = result[0];
      this.ruleform.email_receive_email = info.send_name;
      this.ruleform.email_control = info.email_control
        ? info.email_control.split(",")
        : [];
      this.ruleform.email_title = info.email_title;
      this.ruleform.email_receive_account_id_un = [info.oa_email_account];
      this.ruleform.email_receive_email = info.receive_list
        .map((item) => item.account_name)
        .join(",");
      this.ruleform.email_copy_email = info.copy_list
        .map((item) => item.account_name)
        .join(",");
      this.ruleform.email_secret_email = info.secret_list
        .map((item) => item.account_name)
        .join(",");
      let receive_arr = info.receive_list
        .map((item) => item.account_name)
        .join(",");
      let str = `<p ><span style="color:#BBBBBB;">———————— 原始邮件 ————</span></p><p ><span style="color:#BBBBBB;">发件人：${info.send_name}</span></p><p ><span style="color:#BBBBBB;">发送时间：${info.oa_email_time}</span></p><p ><span style="color:#BBBBBB;">收件人：${receive_arr}</span></p><p ><span style="color:#BBBBBB;">主题：${info.email_title}</span></p>`;
      this.content = str + info.oa_email_text;
      this.$refs.fileUpload.setFileList(info.file_list);
      //查询收件人邮箱
      await this.queryAccount();
      let obj = this.personListAll.find(
        (item) => item.account_id == info.oa_email_account
      );
      // this.ruleform.email_receive.push(obj.account_email);
    },
    // 点击选择考核对象
    showTargerAddLayer(type) {
      this.key_type = "email_" + type;
      this.personIDsArr = this.ruleform[this.key_type + "_account_id_un"];
      this.$refs.dialog.show();
    },
    // 选择人员确认
    async choosePersonFun(node) {
      let data = node.map((item) => {
        return item.account_id;
      });
      this.ruleform[this.key_type + "_account_id_un"] = data;
      !this.personListAll.length && (await this.queryAccount());
      let arr = data.map((id) => {
        return this.personListAll.find((item) => item.account_id == id);
      });
      let nameArr = arr.map((item) => item.account_name);
      this.ruleform[this.key_type] = arr
        .map((item) => item.account_email)
        .filter((item) => item);
      let str = this.isEmail(this.ruleform[this.key_type + "_email"]);
      this.ruleform[this.key_type + "_email"] = str
        ? str + "," + nameArr.join()
        : nameArr.join();
      this.$refs.dialog.cancel();
    },
    //筛选出邮箱
    isEmail(str) {
      let arr = str.split(",");
      let sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
      arr = arr.filter((item) => {
        if (sReg.test(item)) {
          return true;
        }
      });
      return arr.join();
    },
    async queryAccount() {
      let data = await api.queryAccount({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.personListAll = data.result;
    },
    //1发送，2草稿
    async submitFun(type) {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let subdata = { ...this.ruleform };
      let keyArr = [
        "email_receive_account_id_un",
        "email_copy_account_id_un",
        "email_secret_account_id_un",
        "email_control",
      ];
      keyArr.forEach((key) => (subdata[key] = subdata[key].join()));
      //只要邮箱并且去重
      let keyArr1 = ["email_receive", "email_copy", "email_secret"];
      keyArr1.forEach((key) => {
        subdata[key + "_email"] = this.isEmail(subdata[key + "_email"]);

        subdata[key].forEach(
          (item) =>
            (subdata[key + "_email"] = subdata[key + "_email"].replace(
              item,
              ""
            ))
        );
      });
      subdata.oa_email_text = this.$refs.qill.content;
      if (type == 2) {
        subdata.email_type = 1;
      }
      let filejson = this.$refs.fileUpload.getFileObj();
      subdata.oa_email_file = filejson.file;
      subdata.oa_email_file_json = filejson.file_json;
      subdata.source_draft = 1;
      subdata.email_id = this.edit_id;
      await api.UploadOaEmail(subdata);
      this.$bus.$emit("refresh_email", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          if (type == 2) {
            this.$router.linkTo("enterprise_oa_email_drafts");
          } else {
            this.$router.linkTo("enterprise_oa_email_sented");
          }
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
  },
};
</script>
<style lang="scss" scoped>
.add-btn {
  color: white;
  background: $main;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.pd ::v-deep {
  .el-input__suffix {
    top: 9px;
    right: 10px;
  }
  .el-form-item {
    margin-bottom: 8px !important;
  }
}

.left-box {
  width: 34%;
  top: 0px;
  bottom: 0px;
  left: 0px;
}
.right-box {
  width: 65.4%;
  top: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
