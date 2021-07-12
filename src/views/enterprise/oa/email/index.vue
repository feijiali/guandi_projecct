<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-22 14:52:30
-->
<template>
  <div class="position-relative h-100 w-100">
    <div class="position-absolute left-box rounded-1 bg-white">
      <ul class="p-1">
        <li
          v-for="(item, index) of navs"
          @click="handelSwitchChange(index, item)"
          :key="index"
          class="font-14 no-active cursor-p"
          :class="[$route.name.indexOf(item.path) != -1 ? 'active' : '']"
        >
          <span>{{ item.name }}</span>
          <span v-if="item.hasOwnProperty('num')" class="ml-05"
            >({{ item.num }})</span
          >
        </li>
      </ul>
    </div>
    <div class="position-absolute right-box">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      activeIn: 0,
      navs: [
        { name: "写邮件", path: "enterprise_oa_email_write" },
        { name: "收件箱", path: "enterprise_oa_email_inbox", num: 0 },
        { name: "已发送", path: "enterprise_oa_email_sented", num: 0 },
        { name: "星标件", path: "enterprise_oa_email_stars", num: 0 },
        { name: "草稿箱", path: "enterprise_oa_email_drafts", num: 0 },
        { name: "垃圾箱", path: "enterprise_oa_email_dustbin", num: 0 },
      ],
    };
  },
  created() {
    if (this.$route.meta.isProject) {
      this.navs.forEach((item) => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
    this.getNum();
  },

  mounted() {
    this.$bus.$on("refresh_email", () => {
      this.getNum();
    });
  },
  methods: {
    async getNum() {
      let { result } = await api.QueryOaEmailStat({});
      this.navs[1].num = result[0].receive_count;
      this.navs[2].num = result[0].send_count;
      this.navs[3].num = result[0].star_count;
      this.navs[4].num = result[0].draft_count;
      this.navs[5].num = result[0].rubbish_count;
    },
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      this.$router.linkTo(item.path);
    },
  },
  beforeDestroy() {
    this.$bus.$off("refresh_email");
  },
};
</script>
<style lang="scss" scoped>
.no-active {
  padding: 8px;
  border-radius: 4px;
}
.active {
  color: $main;
  background: #f1f0f5;
}
.left-box {
  width: 250px;
  top: 16px;
  bottom: 16px;
  left: 0px;
}
.right-box {
  top: 16px;
  bottom: 16px;
  left: 260px;
  right: 10px;
}
</style>
