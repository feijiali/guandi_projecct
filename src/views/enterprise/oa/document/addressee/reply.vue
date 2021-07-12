<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-17 14:42:59
-->
<template>
  <div class="position-relative h-100 w-100 rounded-1 bg-white p-1">
    <div>
      <nBackTop title="处理回复" />
    </div>
    <el-form
      ref="ruleform"
      class="el-form-box"
      :model="ruleform"
      style="height: calc(100% - 124px)"
    >
      <el-form-item class="form-item-long must" label="发文人：">
        <el-input disabled placeholder="请输入" v-model="ruleform.send_name">
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-long must" label="处理人：">
        <el-input disabled placeholder="请输入" v-model="ruleform.account_name">
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="处理内容：">
        <el-input
          v-model="ruleform.resolve_result"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="附件照片：">
        <nPicUpload ref="pic_upload" />
      </el-form-item>
      <el-form-item class="form-item-long mt-1 file-node" label="附件文稿：">
      </el-form-item>
      <n-button class="mb-1" :btnText="'上传附件'" @buttonClick="uploadFile">
        <template v-slot:button-slot>
          <i class="iconfont btn-btn_list_upload mr-1"></i>
        </template>
      </n-button>
      <div class="w-50">
        <n-new-file-upload ref="fileUpload" class="file-node" />
      </div>
    </el-form>
    <div class="d-flex justify-content-end">
      <div class="text-right font-12 mb-2 text-bg">
        温馨提示：可直接点击"提交"快速回复
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <n-button
        :btnText="'提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleform: {
        account_name: "",
        send_name: "",
        receive_account_union: null,
        resolve_account_union: null,
        receive_file_id_un: "",
        resolve_result: "",
      },
    };
  },
  created() {
    // 默认登录者
    this.ruleform.account_name = this.$store.state.user.userName;
    this.ruleform.send_name = this.$route.query.send_name;
    this.ruleform.receive_account_union = Number(this.$route.query.receive_id);
    this.ruleform.resolve_account_union = Number(
      this.$store.state.user.account_id
    );
    this.ruleform.receive_file_id_un = parseInt(
      this.Base64.decode(this.$route.query.id)
    );
  },
  methods: {
    async submitFun() {
      let subdata = { ...this.ruleform };
      let file_obj = { uploadFileModule: "ReceiveReceiveFile" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      subdata.resolve_pic = picsjson.file;
      subdata.resolve_pic_json = picsjson.file_json;
      let filejson = this.$refs.fileUpload.getFileObj();
      subdata.resolve_file = filejson.file;
      subdata.resolve_file_json = filejson.file_json;
      await api.UploadReceiveFileReceiveReply(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
.text-bg {
  background: #feeaea;
  color: #fc3232;
  padding: 6px 14px;
  border-radius: 8px;
}
</style>
