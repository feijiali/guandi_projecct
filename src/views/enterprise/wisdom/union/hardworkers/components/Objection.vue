<template>
  <n-dialog
    ref="dialog"
    :diaTit="'填写提出异议说明'"
    :diaWidth="'40%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-input
            style="min-width: 400px"
            v-model="ruleform.publicity_reason"
            type="textarea"
            placeholder="请输入异议原因"
            rows="4"
          ></el-input>
          <nFileUpload class="mt-2" ref="file_upload" :length="4" />
        </el-form>
        <div class="d-flex justify-content-end">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="sureRaise"
          ></n-button>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleform: {
        publicity_account_id_un: 0,
        publicity_assess_id_un: 0,
        publicity_reason: "", //工会管理公示-异议说明
        publicity_assess_type: 1, //1：困难职工 2:金秋助学
      },
    };
  },
  methods: {
    //   提出异议
    raiseObjection(row) {
      this.ruleform.publicity_reason = "";
      this.ruleform.publicity_account_id_un = row.hard_worker_sub_account_id;
      this.ruleform.publicity_assess_id_un = row.hard_worker_id;
      this.ruleform.publicity_assess_type = 1;
      this.$nextTick(() => {
        this.$refs.dialog.show();
      });
    },
    //提出异议确认
    async sureRaise() {
      if (!this.ruleform.publicity_reason) {
        this.$tip({
          isTip: true,
          message: "请输入异议原因",
        });
        return;
      }
      let file_obj = { uploadFileModule: "UnionPartyPublicity" };
      this.ruleform.publicity_supplement_file =
        await this.$refs.file_upload.submitFun(false, file_obj);
      await api.uploadUnionPartyPublicity(this.ruleform);
      this.$refs.dialog.cancel();
      this.$parent.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>