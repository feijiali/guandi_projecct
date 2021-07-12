<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择入党介绍人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.pd_progress_introduce_account_id_un"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'确认发展对象'" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="所属机构：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              v-model="pd_organ_id_un"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="申请人：">
            <el-select
              @change="chooseDevelopFun"
              v-model="ruleform.personnel_develop_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in introduceArr"
                :key="item.personnel_develop_id"
                :label="item.account_name"
                :value="item.personnel_develop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="入党介绍人：">
            <el-input
              class="el-input-person"
              readonly
              placeholder="请选择"
              v-model="ruleform.account_name"
            >
            </el-input>
            <div
              class="d-inline-block add-circle-btn ml-2"
              @click="showTargerAddLayer"
            >
              +
            </div>
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
import isformscorll from "@/mixins/isformscorll";
import upload from "@/mixins/upload";

import confirm from "@/mixins/confirm";
export default {
  mixins: [isformscorll, confirm, upload],
  data() {
    return {
      title: "",
      ruleform: {
        personnel_develop_id: null,
        pd_file: "",
        pd_pic: "",
        pd_states: 5,
        pd_progress_introduce_account_id_un: null,
      },
      pd_organ_id_un: null, //所属机构
      rules: {
        personnel_develop_id: [
          {
            required: true,
            message: "请选择申请人",
          },
        ],
        pd_progress_introduce_account_id_un: [
          {
            required: true,
            message: "请选择入党介绍人",
          },
        ],
      },
      introduceArr: [], //申请人
    };
  },
  mounted() {
    // 获取入党积极分子
    this.queryUnionPartyPersonnelDevelop();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 选择了人员姓名后点击确认
    async choosePersonFun(data) {
      this.ruleform.pd_progress_introduce_account_id_un = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.$set(this.ruleform, "account_name", result[0].account_name);
      this.$refs.dialog.cancel();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    async queryUnionPartyPersonnelDevelop() {
      let res = await api.queryUnionPartyPersonnelDevelop({
        page: -1,
        pd_states: 4,
        pd_states_start: 2,
        pd_states_end: 4,
        organ_node: this.pd_organ_id_un,
      });
      this.introduceArr = res.result;
    },
    dialogClose() {
      this.$refs.singlechoose.choosePersonID =
        this.ruleform.pd_progress_introduce_account_id_un;
    },
    // 选择申请人
    chooseDevelopFun(val) {
      let ind = this.introduceArr.findIndex(
        (item) => item.personnel_develop_id == val
      );
      this.$refs.pic_upload.setPicList(this.introduceArr[ind].pic_list);
      this.$refs.file_upload.setFileList(this.introduceArr[ind].file_list);
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.pd_organ_id_un = node.tag;
      // 获取入党积极分子
      this.queryUnionPartyPersonnelDevelop();
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.pd_organ_id_un) {
        this.$tip({
          isTip: true,
          message: "请选择所属机构",
        });
        return;
      }
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
    width: 110px;
  }
}
</style>
