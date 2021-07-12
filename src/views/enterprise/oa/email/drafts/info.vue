<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-17 15:12:56
-->

<template>
  <div class="position-relative h-100 w-100">
    <n-dialog
      ref="dialog"
      :diaTit="diaTit"
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
    <div class="position-absolute left-box rounded-1 bg-white p-1">
      <div>
        <nBackTop title="草稿详情" />
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
            <el-checkbox :label="1"
              >紧急 <i class="iconfont btn-icon_lightning text-hover-danger"></i
            ></el-checkbox>
            <el-checkbox :label="2"
              >重要 <i class="iconfont btn-icon_notice text-warning"></i
            ></el-checkbox>
            <el-checkbox :label="3"
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
import api from "@/api";
import DynamicEditor from "@/components/QillEditor";
import { keys } from "highcharts";
export default {
  components: {
    DynamicEditor,
  },
  data() {
    return {
      edit_id: 0,
      personListAll: [],
      personIDsArr: [],
      personList: [],
      key_type: "",
      content:
        '<p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><span style="color: rgb(187, 187, 187);"> 四川隧唐科技有限公司</span></p><p><span style="color: rgb(187, 187, 187);"> 地址：四川省成都市武侯区武兴一路大地世纪 邮箱：00000 </span></p><p><span style="color: rgb(187, 187, 187);"> 电话：404-852-9696 邮件：cinct@qq.com </span></p>',
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
        email_control: null,
        email_receive: [],
        email_copy: [],
        email_secret: [],
      },
      diaTit: "",
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
    this.ruleform.account_name = this.$store.state.user.userName;
    this.ruleform.oa_email_account = Number(this.$store.state.user.account_id);
    this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.QueryOaEmail(this.edit_id);
    // 默认登录者
  },
  methods: {
    async QueryOaEmail(id) {
      let { result } = await api.QueryOaEmail({ email_id_un: id });
      let info = result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      let keys = ["receive", "copy", "secret"];
      keys.forEach((key) => {
        this.ruleform["email_" + key + "_account_id_un"] = info[
          "email_" + key + "_account_id_un"
        ]
          .split(",")
          .map(Number);
        let str = info[key + "_list"].map((item) => item.account_name).join();
        if (str && this.ruleform["email_" + key + "_email"]) {
          this.ruleform["email_" + key + "_email"] =
            this.ruleform["email_" + key + "_email"] + "," + str;
        } else if (str) {
          this.ruleform["email_" + key + "_email"] = str;
        }
      });
      this.ruleform.email_control = info.email_control.split(",").map(Number);
      this.content = info.oa_email_text;
      this.$refs.fileUpload.setFileList(info.file_list);
    },
    // 点击选择考核对象
    showTargerAddLayer(type) {
      type == "receive"
        ? (this.diaTit = "请选择收件人")
        : type == "copy"
        ? (this.diaTit = "请选择抄送人")
        : (this.diaTit = "请选择密送人");
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
      subdata.source_draft = 1;
      subdata.email_id = this.edit_id;
      if (type == 2) {
        subdata.email_type = 1;
      }
      let filejson = this.$refs.fileUpload.getFileObj();
      subdata.oa_email_file = filejson.file;
      subdata.oa_email_file_json = filejson.file_json;
      await api.UploadOaEmail(subdata);
      this.$bus.$emit("refresh_email", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.linkTo("enterprise_oa_email_sented");
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
