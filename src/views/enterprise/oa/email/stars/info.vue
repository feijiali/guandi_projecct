<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 16:55:13
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 10:03:00
-->
<template>
  <div class="bg-white w-100 h-100 rounded-1 px-1 py-1">
    <div>
      <nBackTop title="星标件详情" />
    </div>
    <div style="height: calc(100% - 60px)">
      <n-scroll>
        <div class="">
          <n-button
            :btnText="'转发'"
            colorBtn="purple"
            @buttonClick="handleAdd"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_share mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'删除'"
            colorBtn="orange"
            @buttonClick="changeState(1)"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'永久删除'"
            colorBtn="blue"
            @buttonClick="changeState(2)"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash mr-1"></i>
            </template>
          </n-button>
        </div>
        <div class="mb-1 mt-2">
          <h2 class="d-inline-block">{{ info.email_title }}</h2>
          <div
            class="cursor-p d-inline-block"
            @click="changeState(4)"
            v-if="info.email_star == 0"
          >
            <i class="iconfont btn-btn_save ml-1"></i>
            <span class="font-12 grey2 ml-05">星标</span>
          </div>
          <div class="cursor-p d-inline-block" @click="changeState(5)" v-else>
            <i class="iconfont btn-btn_save ml-1 text-warning"></i>
            <span class="font-12 ml-05 text-warning">取消星标</span>
          </div>
          <div class="font-14 mt-05">发件人：{{ info.send_name }}</div>
          <div class="font-14 mt-05" v-if="info.email_receive_account_id_un">
            <span>收件人：</span>
            <span>
              {{
                info.receive_list &&
                info.receive_list.map((item) => item.account_name).join() +
                  (info.email_receive_email ? "，" : "") +
                  info.email_receive_email
              }}</span
            >
          </div>
          <div class="font-14 mt-05" v-if="info.email_copy_account_id_un">
            <span>抄送人：</span>
            <span>
              {{
                info.copy_list &&
                info.copy_list.map((item) => item.account_name).join() +
                  (info.email_copy_email ? "，" : "") +
                  info.email_copy_email
              }}</span
            >
          </div>
          <div class="font-14 mt-05" v-if="info.email_secret_account_id_un">
            <span>密送人：</span>
            <span>
              {{
                info.secret_list &&
                info.secret_list.map((item) => item.account_name).join() +
                  (info.email_secret_email ? "，" : "") +
                  info.email_secret_email
              }}</span
            >
          </div>
          <div class="font-14 mt-05">发送时间：{{ info.oa_email_time }}</div>
        </div>
        <div class="border-bottom w-100 mb-1"></div>
        <div style="height: 66%">
          <n-scroll>
            <div v-html="info.oa_email_text"></div>
          </n-scroll>
        </div>
        <div class="border-bottom w-100 mt-1"></div>
        <nFileInfo :fileList="info.file_list" />
      </n-scroll>
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
      edit_id: 0,
      loss_account_id_un: 0,
      deleData: {},
      info: {},
    };
  },
  async created() {
    //登陆者id
    this.loss_account_id_un = Number(this.$store.state.user.account_id);
    this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.QueryOaEmail();
  },
  methods: {
    changeState(del_type) {
      this.confirm("", "", "是否确认操作").then(async () => {
        this.deleData.email_id = this.edit_id;
        this.deleData.del_type = del_type;
        await api.DelOaEmail(this.deleData);
        this.$bus.$emit("refresh_email", "");
        this.QueryOaEmail();
        (del_type == 1 || del_type == 2) && this.$router.go(-1);
      });
    },
    async QueryOaEmail() {
      let { result } = await api.QueryOaEmail({
        email_id_un: this.edit_id,
        email_account_id_un: this.loss_account_id_un,
      });
      this.info = result[0];
    },
    handleAdd() {
      this.linkTo("enterprise_oa_email_stars_forwarding", { id: this.edit_id });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped></style>
