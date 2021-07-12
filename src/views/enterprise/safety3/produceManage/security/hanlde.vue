<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择上传人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.drill_account_id_union"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <el-select
              v-model="ruleform.drill_organ_id_union"
              placeholder="请选择"
            >
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="文件类型：">
            <el-select v-model="ruleform.drill_file_type" placeholder="请选择">
              <el-option label="演练图片" :value="1"></el-option>
              <el-option label="演练视频" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="文件名称：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.drill_file_name"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="上传人："
          >
            <el-input
              class="el-input-person"
              placeholder="请选择"
              v-model="account_name"
              readonly
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              v-model="ruleform.drill_remark"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="ruleform.drill_file_type == 2"
            class="form-item-long"
            label="附件视频："
          >
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item
            v-if="ruleform.drill_file_type == 1"
            class="form-item-long"
            label="附件图片："
          >
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
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
      ruleform: {
        drill_id: null,
        drill_organ_id_union: null,
        drill_video: "",
        drill_pic: "",
        drill_file_name: "",
        drill_file_type: 1,
        drill_remark: "",
        drill_account_id_union: null,
      },
      title: "",
      account_name: "",
      organArr: [],
      formValidation: [
        {
          must: [
            "drill_file_name",
            "drill_account_id_union",
            "drill_file_type",
            "drill_organ_id_union",
          ],
          tip: [
            "请输入文件名称",
            "请选择上传人",
            "请选择文件类型",
            "请选择工程项目",
          ],
        },
      ],
      drill_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    if (this.drill_id) {
      this.title = "编辑安全演练";
      await this.querySafeDrill();
    } else {
      this.title = "新增安全演练";
      this.account_name = this.$store.getters.userName;
      this.ruleform.drill_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
  },
  methods: {
    // 查询项目下的工区
    async queryType() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.organArr = res.result;
    },
    // 点击选择上传人
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    async choosePersonFun(data) {
      this.ruleform.drill_account_id_union = data;
      let { result } = await this.queryAccount();
      this.account_name = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount() {
      let data = await api.queryAccount({
        account_id: this.ruleform.drill_account_id_union,
      });
      return data;
    },
    async querySafeDrill() {
      let data = await api.querySafeDrill({
        drill_id: this.drill_id,
      });
      let info = data.result[0];
      const json = [
        "drill_id",
        "drill_organ_id_union",
        "drill_file_name",
        "drill_account_id_union",
        "drill_file_type",
        "drill_remark",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, data.result[0]);
      this.account_name = info.account_name;
      this.$nextTick(() => {
        if (info.drill_file_type == 1) {
          this.$refs.pic_upload.setPicList(info.pic_list);
        }
        if (info.drill_file_type == 2) {
          this.$refs.video_upload.setVideoList(info.video_list);
        }
      });
    },
    getSelectValue(node) {
      this.ruleform.drill_organ_id_union = null;
      this.ruleform.drill_organ_id_union = node.node.organ_id;
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let file_obj = { uploadFileModule: "SafeDrill" };
        if (this.$refs.pic_upload) {
          this.ruleform.drill_pic = await this.$refs.pic_upload.submitFun(
            false,
            file_obj
          );
        }
        if (this.$refs.video_upload) {
          this.ruleform.drill_video = await this.$refs.video_upload.submitFun(
            false,
            file_obj
          );
        }
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${this.drill_id ? "updateSafeDrill" : "uploadSafeDrill"}`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.admin-config-box {
  .label-l {
    width: 85px;
  }
}
</style>
