<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-04-02 14:29:23
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
    <div class="position-absolute left-box rounded-1 bg-white py-1">
      <n-scroll>
        <div class="px-2 h-100">
          <el-form ref="ruleform" class="el-form-box1" :model="ruleform">
            <div v-if="isTitle">
              <nBackTop :title="title" />
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long" label="发件人：">
                <span class="font-14">{{ ruleform.send_name }}</span>
              </el-form-item>
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long must" label="收件人：">
                <div class="cursor-p" @click="showTargerAddLayer('receive')">
                  <i class="iconfont btn-btn_detail_plus_01 add-btn mr-1"></i>
                  <span class="main font-weight-bold">选择内部人员</span>
                </div>
              </el-form-item>
              <InputChecked
                ref="email_receive"
                v-model="ruleform.email_receive_email"
                key-str="email_receive"
                :PersonList="email_receive_list"
                @DeletPerson="deletPerson"
                @checkEmail="checkEmail"
              ></InputChecked>
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long" label="抄送人：">
                <div class="cursor-p" @click="showTargerAddLayer('copy')">
                  <i class="iconfont btn-btn_detail_plus_01 add-btn mr-1"></i>
                  <span class="main font-weight-bold">选择内部人员</span>
                </div>
              </el-form-item>
              <InputChecked
                ref="email_copy"
                v-model="ruleform.email_copy_email"
                key-str="email_copy"
                :PersonList="email_copy_list"
                @DeletPerson="deletPerson"
                @checkEmail="checkEmail"
              ></InputChecked>
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long pd" label="密送人：">
                <div class="cursor-p" @click="showTargerAddLayer('secret')">
                  <i class="iconfont btn-btn_detail_plus_01 add-btn mr-1"></i>
                  <span class="main font-weight-bold">选择内部人员</span>
                </div>
              </el-form-item>
              <InputChecked
                ref="email_secret"
                v-model="ruleform.email_secret_email"
                key-str="email_secret"
                :PersonList="email_secret_list"
                @DeletPerson="deletPerson"
                @checkEmail="checkEmail"
              ></InputChecked>
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long" label="主题：">
              </el-form-item>
              <el-input
                placeholder="请输入邮件主题（不填则显示无主题）"
                class="w-100"
                v-model="ruleform.email_title"
              ></el-input>
            </div>
            <div class="pd mt-1-6">
              <el-form-item class="form-item-long" label="其他操作：">
              </el-form-item>
              <el-checkbox-group
                v-model="ruleform.email_control"
                class="el-radio-form"
              >
                <el-checkbox :label="1"
                  >紧急
                  <i class="iconfont btn-icon_lightning text-hover-danger"></i
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
          <n-button
            class="mt-1-6"
            :btnText="'上传附件'"
            @buttonClick="uploadFile"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_upload mr-1"></i>
            </template>
          </n-button>
          <n-new-file-upload ref="fileUpload" file-module="OaEmail" />
        </div>
      </n-scroll>
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
import InputChecked from "./components/input_checked";
export default {
  components: {
    DynamicEditor,
    InputChecked,
  },
  props: {
    isTitle: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "回复",
    },
    typeCate: {
      type: Number, //值为1代表是回复进来的，值为2代表是编辑进来   值为3代表是转发进来  值为4代表是草稿箱详情进来
      default: 0,
    },
  },
  data() {
    return {
      email_receive_list: [],
      email_secret_list: [],
      email_copy_list: [],
      edit_id: 0,
      personIDsArr: [],
      key_type: "",
      content: "",
      // content:
      //   '<p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><span style="color: rgb(187, 187, 187);"> 四川隧唐科技有限公司</span></p><p><span style="color: rgb(187, 187, 187);"> 地址：四川省成都市武侯区武兴一路大地世纪 邮箱：00000 </span></p><p><span style="color: rgb(187, 187, 187);"> 电话：404-852-9696 邮件：cinct@qq.com </span></p>',
      ruleform: {
        oa_email_account: 0,
        send_name: "",
        email_title: null,
        oa_email_text: null,
        email_receive_account_id_un: "",
        email_receive_email: "",
        email_copy_account_id_un: "",
        email_copy_email: "",
        email_secret_account_id_un: "",
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
  async created() {
    if (this.$route.query.id) {
      this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
      await this.QueryOaEmail(this.edit_id);
    }
    if (this.typeCate == 1) {
      //回复，收件人默认发件人
      // 默认登录者
      // this.ruleform.send_name = this.infoData.send_name;
      // this.ruleform.oa_email_account = Number(
      //   this.$store.state.user.account_id
      // );
    } else {
      // 默认登录者
      this.ruleform.send_name = this.$store.state.user.userName;
      this.ruleform.oa_email_account = Number(
        this.$store.state.user.account_id
      );
    }
  },
  mounted() {
    this.$route.query.filelist &&
      this.$refs.fileUpload.setFileList(this.$route.query.filelist);
  },
  methods: {
    // 删除人员
    deletPerson(type, index) {
      this[type + "_list"].splice(index, 1);
      let new_accound_id_arr = this[type + "_list"]
        .map((item) => item.account_id)
        .filter((item) => item);
      this.ruleform[type] = this[type + "_list"]
        .map((item) => item.account_email)
        .filter((item) => item);
      if (new_accound_id_arr.length > 0) {
        this.ruleform[type + "_account_id_un"] = new_accound_id_arr
          .filter((item) => item)
          .join(",");
      } else {
        this.ruleform[type + "_account_id_un"] = "";
      }
    },
    async QueryOaEmail(id) {
      let { result } = await api.QueryOaEmail({ email_id_un: id });
      let info = result[0];
      this.infoData = info;
      this.ruleform = { ...info };
      let keyArr1 = ["receive", "copy", "secret"];
      keyArr1.forEach((key) => {
        if (key == "receive" || this.typeCate == 2 || this.typeCate == 4) {
          this["email_" + key + "_list"] = info[key + "_list"];
          if (info["email_" + key + "_email"].length > 0) {
            let email_list = info["email_" + key + "_email"].split(",");
            email_list.forEach((item) => {
              this["email_" + key + "_list"].push({
                account_name: item,
                type: 1,
              });
            });
          }
        }
        this.$set(this.ruleform, ["email_" + key + "_email"], "");
      });
      // 回复
      if (this.typeCate == 1) {
        this.ruleform.email_receive = [this.infoData.send_email];
        this.ruleform.email_receive_account_id_un = String(
          this.infoData.oa_email_account
        );
        this.email_receive_list = [
          {
            account_email: this.infoData.send_email,
            account_id: this.infoData.oa_email_account,
            account_name: this.infoData.send_name,
          },
        ];
      }
      let receive_arr = info.receive_list
        .map((item) => item.account_name)
        .join(",");
      let str = `<p ><span style="color:#BBBBBB;">———————— 原始邮件 ————</span></p><p ><span style="color:#BBBBBB;">发件人：${info.send_name}</span></p><p ><span style="color:#BBBBBB;">发送时间：${info.oa_email_time}</span></p><p ><span style="color:#BBBBBB;">收件人：${receive_arr}</span></p><p ><span style="color:#BBBBBB;">主题：${info.email_title}</span></p>`;
      this.content = str + info.oa_email_text;
      this.ruleform.email_title = info.email_title;
      this.ruleform.email_control = info.email_control.split(",").map(Number);
      this.ruleform.send_name = this.$store.state.user.userName;
      this.$refs.fileUpload.setFileList(this.ruleform.file_list);
    },
    // 点击选择考核对象
    showTargerAddLayer(type) {
      this.key_type = "email_" + type;
      this.$refs.dialog.show();
      if (this.$refs.singlechoose) {
        this.$refs.singlechoose.setSelectPerson(
          this[this.key_type + "_list"].filter((item) => item.type != 1)
        );
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose.setSelectPerson(
            this[this.key_type + "_list"].filter((item) => item.type != 1)
          );
        });
      }
      this.rebackPerson();
    },
    async rebackPerson() {
      let account_ids = this[this.key_type + "_list"].filter(
        (item) => item.account_id
      );
      this.personIDsArr = account_ids.map((item) => item.account_id);
      await this.queryAccount(this.personIDsArr);
    },
    // 选择人员确认
    async choosePersonFun(nodes) {
      this.personIDsArr = nodes
        .filter((item) => item.account_id)
        .map((item) => item.account_id);
      this.ruleform[this.key_type + "_account_id_un"] =
        this.personIDsArr.join(",");
      let key_type_list = [];
      nodes.forEach((item) => {
        key_type_list.push({
          account_name: item.account_name,
          account_email: item.account_email,
          account_id: item.account_id,
        });
      });
      let new_list = this[this.key_type + "_list"].filter((item) => item.type);

      if (new_list.length > 0) {
        new_list.forEach((item) => {
          key_type_list.push({
            account_name: item.account_name,
            account_email: item.account_email,
            type: item.type,
          });
        });
      }
      this[this.key_type + "_list"] = key_type_list;
      this.ruleform[this.key_type] = [
        ...nodes.map((item) => item.account_email).filter((item) => item),
      ];
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      return data.result;
    },
    //1发送，2草稿
    async submitFun(type) {
      let subdata = { ...this.ruleform };
      //只要邮箱并且去重
      let keyArr1 = ["email_receive", "email_copy", "email_secret"];
      keyArr1.forEach((key) => {
        let list = this[key + "_list"].filter((item) => item.type == 1);
        subdata[key + "_email"] = list
          .map((item) => item.account_name)
          .join(",");
      });
      if (
        !subdata.email_receive_account_id_un &&
        !subdata.email_receive_email
      ) {
        this.$tip({
          isTip: true,
          message: "请选择收件人",
        });
        return;
      }
      subdata.oa_email_text = this.$refs.qill.content;
      if (type == 2) {
        subdata.email_type = 1;
      }
      let filejson = this.$refs.fileUpload.getFileObj();
      subdata.oa_email_file = filejson.file;
      subdata.oa_email_file_json = filejson.file_json;
      subdata.email_control = subdata.email_control.join(",");
      if (this.typeCate) {
        subdata.email_id =
          this.typeCate == 3 || this.typeCate == 2 || this.typeCate == 1
            ? 0
            : this.edit_id;
        if (type == 1) {
          //点击的是“发送”
          if (this.typeCate == 4) {
            //来自草稿箱的发送
            subdata.source_draft = 1;
          } else {
            subdata.source_draft = 0;
          }
        } else {
          if (this.typeCate == 1 || this.typeCate == 3) {
            //回复-存为草稿
            subdata.source_draft = 0;
          } else {
            subdata.email_id = this.edit_id;
            //点击的是“存为草稿”
            subdata.source_draft = 1;
          }
        }
      }
      await api.UploadOaEmail(subdata);
      this.$bus.$emit("refresh_email", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          if (type === 1) {
            this.$router.linkTo("enterprise_oa_email_sented");
          } else {
            this.$router.linkTo("enterprise_oa_email_drafts");
          }
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    //校验邮箱
    checkEmail(val, key2, key3) {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (val) {
        if (!reg.test(val)) {
          this.$tip({
            isTip: true,
            message: "请输入正确的邮箱账号",
          });
          this.$refs[key3].modelText = "";
          return;
        } else {
          let newBoll = this[key2]
            .map((item) => item.account_email)
            .filter((ints) => ints == val);
          if (newBoll.length == 0) {
            this[key2].push({ account_name: val, account_email: val, type: 1 });
          } else {
            this.$tip({
              isTip: true,
              message: "不要重复提交邮箱账号",
            });
          }
          this.$refs[key3].modelText = "";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form-box1::v-deep {
  .el-form-item__label {
    line-height: 20px !important;
  }
}
.email_box {
  border: solid 1px $color-3;
  border-radius: 5px;
}
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
    margin-bottom: 6px !important;
  }
  .el-input__inner {
    // padding-left: 0;
    padding-right: 10px;
  }
  .el-input {
    width: 100%;
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
