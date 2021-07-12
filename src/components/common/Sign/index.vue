<template>
  <n-dialog ref="signaturedialog" :diaTit="'设置签名'" :diaWidth="'50%'">
    <template slot="diaSlot">
      <div class="clear w-100 mb-2 position-relative" @click="isShow = false">
        <span
          class="position-absolute text-secondary-2"
          v-show="isShow"
          style="
            top: 50%;
            left: 50%;
            margin-left: -50px;
            margin-top: -10px;
            z-index: 200;
          "
          >请在线框内签名</span
        >
        <vSignature ref="signature" class="w-100"></vSignature>
      </div>
      <div class="d-flex justify-content-center">
        <n-button
          :btnText="'清空数据'"
          :width="'150px'"
          :colorBtn="'pink'"
          @buttonClick="overwrite"
        ></n-button>
        <n-button
          :btnText="'确认提交'"
          :width="'150px'"
          :colorBtn="'blue'"
          class="ml-2"
          @buttonClick="submitFunSignature"
        ></n-button>
      </div>
    </template>
  </n-dialog>
</template>

<script>
import vSignature from "@/components/common/Signature";
import api from "@/api/index";
export default {
  components: {
    vSignature,
  },
  data() {
    return {
      picList: [],
      isShow: true,
    };
  },
  methods: {
    // 清空
    overwrite() {
      this.$refs.signature.overwrite();
    },
    // 签名提交
    async submitFunSignature(type) {
      //提交
      // canvas判断内容是否未空
      if (this.$utils.isCanvasBlank(this.$refs.signature.$refs.canvasF)) {
        this.$tip({
          isTip: true,
          message: "您还未电子签名！",
        });
        return;
      }
      let signaturePic = this.$refs.signature.$refs.canvasF.toDataURL();
      let picFile = this.$utils.dataURLtoFile(signaturePic, "picname.png");
      this.picList = [{ raw: picFile }];
      await this.$utils.uploadFile.call(this, ["picList"], {
        uploadFileModule: "Sign",
      });
      let picListArr = [];
      let picurl = [];
      for (let value of this.picList) {
        picListArr.push(value.file_name);
        picurl.push(value.url);
      }
      let res = await api.updateSign({
        account_id: Number(this.$store.getters.account_id),
        account_sign: picListArr.join(","),
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$store.dispatch("user/set_account_sign", picurl.join(","));
          this.$store.dispatch(
            "user/set_account_sign_name",
            picListArr.join(",")
          );
          this.overwrite();
          this.$refs.signaturedialog.cancel();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
