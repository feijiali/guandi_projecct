<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-16 10:51:15
-->
<template>
  <div class="position-relative h-100 w-100 rounded-1 bg-white p-1">
    <v-sign ref="sign"></v-sign>
    <div>
      <nBackTop title="撤销公文" />
    </div>
    <el-form
      ref="ruleform"
      class="el-form-box"
      :model="ruleform"
      style="height: calc(100% - 80px)"
    >
      <h2>{{ ruleform.title }}</h2>
      <el-form-item class="form-item-long mt-1" label="撤销原因：">
        <el-input
          v-model="ruleform.revise_info_undo_reason"
          type="textarea"
          class="el-textarea-box-long"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long must" label="撤销签名：">
        <div
          @click="!$store.getters.account_sign && signatureFun()"
          class="
            border
            d-flex-cen
            rounded
            text-secondary
            cursor-p
            position-relative
          "
          style="width: 260px; height: 100px"
        >
          <div @click.stop v-if="$store.getters.account_sign">
            <div class="reSign position-absolute" @click="signatureFun">
              重签
            </div>
            <viewer
              :images="[$store.getters.account_sign]"
              class="lookPic d-inline-block"
            >
              <img
                style="height: 70px; margin-right: 0; margin-bottom: 0"
                :src="item"
                alt
                v-for="(item, index) in [$store.getters.account_sign]"
                :key="index + 'image'"
                class="layer-info-img"
              />
            </viewer>
          </div>
          <template v-if="!$store.getters.account_sign"> 设置签名 </template>
        </div>
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-end">
      <n-button
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import vSign from "@/components/common/Sign";
export default {
  components: {
    vSign,
  },
  data() {
    return {
      ruleform: {
        title: "",
        revise_info_id: null,
        revise_info_undo_reason: "",
        revise_record_sign_pic: this.$store.getters.account_sign_name,
      },
    };
  },
  created() {
    this.ruleform.revise_info_id = Number(this.$route.query.reverse_id);
    this.ruleform.title = this.$route.query.title;
  },
  methods: {
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    async submitFun() {
      this.ruleform.revise_record_sign_pic =
        this.$store.getters.account_sign_name || "";
      await api.undoApproveReviseInfo(this.ruleform);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },

    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped></style>
