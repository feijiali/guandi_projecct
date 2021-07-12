<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="$route.query.type ? '确认正式党员' : '确认积极分子'" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small" label="申请人：">
            <el-input
              :readonly="true"
              class="input-m"
              v-model="ruleform.account_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="提交人：">
            <el-input
              :readonly="true"
              class="input-m"
              v-model="$store.state.user.userName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long must"
            :label="
              $route.query.type ? '是否为正式党员' : '是否为积极分子' + '：'
            "
          >
            <el-radio-group v-model="ruleform.pd_states">
              <el-radio :label="$route.query.type ? 9 : 4">{{
                $route.query.type ? "正式党员" : "积极分子"
              }}</el-radio>
              <el-radio :label="$route.query.type ? 8 : 3">{{
                $route.query.type ? "非正式党员" : "非积极分子"
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="9" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="9" />
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
import upload from "@/mixins/upload";

export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      ruleform: {
        pd_states: this.$route.query.type ? 9 : 4,
      },
      rules: {
        pd_states: [
          {
            required: true,
            message: "请确认积极分子",
          },
        ],
      },
      editData: {}, //编辑人员的数据
      personnel_develop_id: parseInt(this.Base64.decode(this.$route.query.id)), //
    };
  },
  async mounted() {
    this.personnel_develop_id && this.queryUnionPartyPersonnelDevelop();
  },
  methods: {
    async queryUnionPartyPersonnelDevelop() {
      let res = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: this.personnel_develop_id,
      });
      const json = [
        "personnel_develop_id",
        "pd_account_id_un",
        "account_name",
        "pd_activists_account_id_un",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, res.result[0]);
      this.$refs.pic_upload.setPicList(res.result[0].pic_list);
      this.$refs.file_upload.setFileList(res.result[0].file_list);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = { uploadFileModule: "UnionPartyPersonnelDevelop" };
      this.ruleform.pd_pic = await this.$refs.pic_upload.submitFun(
        false,
        file_obj
      );
      this.ruleform.pd_file = await this.$refs.file_upload.submitFun(
        false,
        file_obj
      );
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      let res = await api.updateUnionPartyPersonnelDevelopStates(subdata);
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

<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }
  .label-l {
    width: 80px;
  }
}
</style>
