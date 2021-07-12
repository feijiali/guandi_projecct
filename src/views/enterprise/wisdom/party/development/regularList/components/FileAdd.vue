<template>
  <n-dialog
    ref="dialog"
    :diaTit="'补充资料'"
    :diaWidth="'40%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="9" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="9" />
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end mb-08">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import upload from "@/mixins/upload";
export default {
  mixins: [upload],
  data() {
    return {
      ruleform: {},
      infoData: {},
    };
  },
  methods: {
    // 点击补充资料
    async addFile(row) {
      this.$refs.dialog.show();
      await this.queryUnionPartyPersonnelDevelop(row);
      this.$refs.pic_upload.setPicList(this.infoData.pic_list);
      this.$refs.file_upload.setFileList(this.infoData.file_list);
      this.ruleform.personnel_develop_id = row.personnel_develop_id;
    },
    async queryUnionPartyPersonnelDevelop(row) {
      let res = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: row.personnel_develop_id,
      });
      this.infoData = res.result[0];
    },
    // 确认提交
    async submitFun() {
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
      let res = await api.uploadUnionPartyPersonnelDevelopFile(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>