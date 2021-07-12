<!--
 * @Autor: 邓易
 * @Date: 2021-03-08 09:05:59
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-08 11:25:56
-->
<template>
  <div class="w-100 h-100">
    <div class="h-100 d-flex">
      <div class="rounded-1 bg-white notice-left h-100 p-1">
        <div class="rounded-1" style="border-radius: 0">
          <nBackTop title="公告详情" />
        </div>
        <div style="height: 74%">
          <div class="p-1 text-center border-bottom mb-2">
            <div class="font-22 font-weight-bolder mb-1">
              {{ infoData.oa_public_title }}
            </div>
            <div>
              <span class="font-14">类别：{{ infoData.oa_public_type }}</span>
              <span class="ml-2 font-14"
                >发布人：{{ infoData.account_name }}</span
              >
              <span class="ml-2 font-14">发布时间：{{ time }}</span>
            </div>
          </div>
          <n-scroll>
            <div class="ml-2" v-html="infoData.oa_public_text"></div>
          </n-scroll>
          <div style="height: 15%">
            <n-scroll>
              <nFileInfo class="ml-2" :fileList="infoData.file_list" />
            </n-scroll>
          </div>
        </div>
      </div>
      <div class="notice-right bg-white ml-1 rounded-1 h-100">
        <n-scroll>
          <p class="ml-1 mt-1">{{ personCount }}人已浏览</p>
          <div>
            <div
              v-show="accountList.length"
              class="notice-text pl-2 mt-1 border-bottom pb-1"
              v-for="(item, index) in accountList"
              :key="index"
            >
              <img
                class="account-img"
                :src="item.account_pic"
                :onerror="defaultImg"
              />
              <p class="ml-1">{{ item.account_name }}</p>
            </div>
          </div>
        </n-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";

export default {
  data() {
    return {
      oa_public_id: this.$route.query.id
        ? parseInt(this.Base64.decode(this.$route.query.id))
        : "",
      infoData: {}, //详情
      accountList: [], //浏览人员
      personCount: 0,
      time: "",
      defaultImg:
        'this.src="' + require("@/assets/images/bg_mine_grey.png") + '"',
    };
  },
  activated() {
    this.oa_public_id && this.queryOaOaPublic();
  },
  async created() {
    this.oa_public_id && (await this.queryOaOaPublic());
    this.oa_public_id && this.queryOaOaPublicRead();
    sessionStorage.getItem("addLog") &&
      (this.infoData = JSON.parse(sessionStorage.getItem("addLog")));
    // sessionStorage.removeItem('addLog')
  },
  methods: {
    // defaultImg() {
    //   return this.src="' + require('../../assets/images/moren.png') + '"
    //   // src="@/assets/images/material/bg_detail_top_money.png"
    //   item.account_pic = "@/assets/images/material/bg_mine_grey.png"
    // },
    async queryOaOaPublic() {
      let data = await api.queryOaOaPublic({
        oa_public_id: this.oa_public_id,
      });
      this.infoData = data.result[0];
      this.time =
        (this.infoData.oa_public_time + "").slice(0, 4) +
        "-" +
        (this.infoData.oa_public_time + "").slice(4, 6) +
        "-" +
        (this.infoData.oa_public_time + "").slice(6) +
        " " +
        this.infoData.oa_public_hour_str.slice(0, 2) +
        ":" +
        this.infoData.oa_public_hour_str.slice(2, 4) +
        ":" +
        this.infoData.oa_public_hour_str.slice(4);
    },
    async queryOaOaPublicRead() {
      let data = await api.queryOaOaPublicRead({
        oa_public_id: this.oa_public_id,
      });
      this.accountList = data.result;
      this.personCount = data.total_count;
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
.account-img {
  width: 35px;
  border-radius: 50%;
  height: 35px;
}
.notice-left {
  width: 90%;
}
.notice-right {
  width: 10%;
  .notice-text {
    display: flex;
    align-items: center;
  }
}
</style>
