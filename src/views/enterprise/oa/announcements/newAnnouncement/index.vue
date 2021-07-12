<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-10 09:23:22
-->
<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-03 10:35:30
-->
<template>
  <div class="position-relative h-100 w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择公告范围'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="chooseperson"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="position-absolute left-box rounded-1 bg-white px-2 py-1 h-100">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long2" label="发布人：">
            <span class="font-14">{{ account_name }}</span>
          </el-form-item>
          <el-form-item
            class="form-item-long2 mt-1 must"
            label="公告标题："
          ></el-form-item>
          <el-input
            placeholder="请输入"
            class="w-100"
            v-model="ruleform.oa_public_title"
          >
          </el-input>
          <el-form-item
            class="form-item-long2 mt-1 must"
            label="公告类别："
          ></el-form-item>
          <!-- <el-input placeholder="请输入或选择" class="w-100" v-model="ruleform.oa_public_type">
            </el-input> -->
          <el-select
            filterable
            allow-create
            v-model="ruleform.oa_public_type"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) of announcementType"
              :key="index"
              :label="item.oa_public_type"
              :value="item.oa_public_type"
            ></el-option>
          </el-select>
          <!-- class="iconfont btn-btn_detail_plus_01 add-btn " -->
          <el-form-item
            class="form-item-long2 mt-1 must"
            label="公告范围："
          ></el-form-item>
          <nAddItemContent @addFun="addPersons" style="width: 100%">
            <template slot="content-add">
              <div
                class="content-item"
                v-for="(item, index) in personList"
                :key="index"
              >
                <span
                  >{{ item.account_name }}【{{ item.account_job }}】{{
                    item.account
                  }}</span
                >
                <i
                  class="iconfont btn-btn_detail_minus_02 font-20"
                  @click="reduceFun(index, item)"
                ></i>
              </div>
            </template>
          </nAddItemContent>
          <el-form-item
            class="form-item-long2 mt-1 must"
            label="发布时间："
          ></el-form-item>
          <el-date-picker
            style="width: 100%"
            :clearable="false"
            ref="datePicker"
            class="el-date-editor-m"
            v-model="ruleform.oa_public_time"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMdd HHmmss"
            type="datetime"
            placeholder="请选择"
          ></el-date-picker>
          <el-form-item
            class="form-item-long2 mt-1 must"
            label="显示效果："
          ></el-form-item>
          <el-radio-group
            v-model="ruleform.oa_public_hide"
            class="el-radio-form"
          >
            <el-radio :label="1">在工作台显示</el-radio>
            <el-radio :label="2">在工作台隐藏</el-radio>
          </el-radio-group>
        </el-form>
        <n-button
          class="mb-1 mt-1"
          :btnText="'上传附件'"
          v-permission="['Applyment-upload']"
          @buttonClick="uploadFile"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_list_upload mr-1"></i>
          </template>
        </n-button>
        <n-new-file-upload ref="fileUpload" file-module="OaOaPublic" />
      </n-scroll>
    </div>
    <div class="position-absolute right-box rounded-1 bg-white p-1">
      <dynamic-editor ref="qill" :word="content" style="height: 90%" />
      <div class="d-flex justify-content-end mt-4">
        <n-button
          :btnText="'预览'"
          :width="'150px'"
          :colorBtn="'grey'"
          @buttonClick="submitFun(1)"
        ></n-button>
        <n-button
          v-permission="['OaPublic-upload']"
          class="ml-2"
          :btnText="'发布'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFun(2)"
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
  data() {
    return {
      account_name: "", //发布人名字
      ruleform: {
        oa_public_time: "",
      },
      content: "", //正文内容
      announcementType: [], //公告类型
      personIDsArr: [],
      personList: [],
      oa_public_id: this.$route.query.id
        ? parseInt(this.Base64.decode(this.$route.query.id))
        : "",
      rules: {
        oa_public_title: [
          {
            required: true,
            message: `请输入公告标题`,
          },
        ],
        oa_public_type: [
          {
            required: true,
            message: `请选择公告类别`,
          },
        ],
        oa_public_time: [
          {
            required: true,
            message: `请选择发布时间`,
          },
        ],
        oa_public_hide: [
          {
            required: true,
            message: `请选择显示效果`,
          },
        ],
      },
      fileList: [],
    };
  },
  //修改界面点击发布时清空表单数据
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.ruleform = {};
      this.personIDsArr = [];
      this.personList = [];
      this.content = "";
      this.$refs.fileUpload.setFileList([]);
      this.oa_public_id = null;
    }
  },
  created() {
    // 默认登录者
    this.account_name = this.$store.state.user.userName;
    this.ruleform.oa_public_create_id = Number(
      this.$store.state.user.account_id
    );
    this.oa_public_id && this.queryOaOaPublic();
    this.queryOaOaPublicType();
  },
  async mounted() {
    this.$route.query.filelist &&
      this.$refs.fileUpload.setFileList(this.$route.query.filelist);
    // sessionStorage.getItem("addLog") &&
    if (sessionStorage.getItem("addLog")) {
      this.ruleform = JSON.parse(sessionStorage.getItem("addLog"));
      this.$set(
        this.ruleform,
        "oa_public_time",
        this.ruleform.oa_public_time +
          "" +
          " " +
          this.ruleform.oa_public_hour_str
      );
      this.ruleform.file_list &&
        this.$refs.fileUpload.setFileList(this.ruleform.file_list);
      this.personIDsArr = this.ruleform.oa_public_range.split(",").map(Number);
      await this.queryAccount(this.personIDsArr);
      this.content = this.ruleform.oa_public_text;
    }
  },
  methods: {
    //编辑回填
    async queryOaOaPublic() {
      let data = await api.queryOaOaPublic({
        oa_public_id: this.oa_public_id,
      });
      // let info = data.result[0];
      if (this.oa_public_id) {
        // const json = [
        //   "oa_public_id",
        //   "oa_public_title",
        //   "oa_public_type",
        //   "oa_public_hide",
        // ];
        // this.$utils.renderRuleForm(this, json, this.ruleform, info);
        let { oa_public_time, ...info } = data.result[0];
        this.ruleform = info;
        // 编辑式渲染图片
        this.$refs.fileUpload.setFileList(info.file_list);
        this.personIDsArr = this.ruleform.oa_public_range
          .split(",")
          .map(Number);
        await this.queryAccount(this.personIDsArr);
        this.content = info.oa_public_text;
        this.$set(
          this.ruleform,
          "oa_public_time",
          data.result[0].oa_public_time +
            "" +
            " " +
            data.result[0].oa_public_hour_str
        );
      }
    },
    //查询公告类型
    async queryOaOaPublicType() {
      let data = await api.queryOaOaPublicType();
      this.announcementType = data.result;
    },
    //关闭弹窗
    dialogClose() {
      this.$refs.chooseperson.choosePersonIDsArr = this.personIDsArr;
    },
    // 添加人员的弹窗
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
    choosePersonFun(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.personList = [...nodes];
      this.$refs.dialog.cancel();
    },
    // 提交
    async submitFun(type) {
      // 先判断是否填写必填信息
      this.$set(this.ruleform, "oa_public_text", this.$refs.qill.content);
      this.ruleform.oa_public_range = this.personIDsArr.join();
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (!this.ruleform.oa_public_range) {
        this.$tip({
          isTip: true,
          message: "请选择公告范围",
        });
        return;
      }
      if (!this.ruleform.oa_public_text) {
        this.$tip({
          isTip: true,
          message: "请输入发布内容",
        });
        return;
      }
      this.submitAllData(type);
    },
    async submitAllData(type) {
      let subdata = this.$utils.cloneObj({ ...this.ruleform });
      let time = subdata.oa_public_time;
      subdata.oa_public_time = parseInt(time.split(" ")[0]);
      subdata.oa_public_hour_str = time.split(" ")[1];
      this.oa_public_id ? (subdata.update_type = 2) : "";
      let filejson = this.$refs.fileUpload.getFileObj();
      subdata.oa_public_file = filejson.file;
      subdata.oa_public_file_json = filejson.file_json;
      if (type == 1) {
        //预览
        subdata.account_name = this.$store.state.user.userName;
        sessionStorage.setItem("addLog", JSON.stringify(subdata));
        this.$router.linkTo("enterprise_oa_announcementDetails");
        return;
      }
      await api[
        `${this.oa_public_id ? "updateOaOaPublic" : "uploadOaOaPublic"}`
      ](subdata);
      this.$bus.$emit("refresh", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$bus.$emit("toList");
          this.$router.linkTo("enterprise_oa_allAnnouncement");
          // this.$router.go(-1);
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
.el-form-box {
  ::v-deep .el-input {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    border: 1px solid $color-3 !important;
  }
}
.add-img {
  width: 20px;
  margin-top: 10px;
  margin-right: 6px;
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
