<!--
 * @Autor: 邓易
 * @Date: 2021-03-29 18:29:53
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 14:16:56
-->
<template>
  <div class="d-flex align-items-center">
    <img
      :src="
        isShow
          ? $store.getters.projectLogoUrl
          : require('@/assets/images/icon_nav_logo.png')
      "
      alt=""
      class="mr-1 logo-img vertical-middle"
    />
    <!-- <img src="@/assets/images/icon_homepage_font.png" class="logo-title" alt=""> -->
    <span class="logo-title font-weight-bold">{{
      !isShow
        ? "冠迪建设智慧管理云平台"
        : $store.state.app.projectName + "管理云平台"
    }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: this.$route.meta.isProject,
    };
  },
  mounted() {
    // 设置地址栏的图标
    var link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = this.isShow
      ? this.$store.getters.projectLogoUrl
      : require("@/assets/images/favicon.png");
    document.getElementsByTagName("head")[0].appendChild(link);
  },
};
</script>

<style lang="scss" scoped>
.logo-img {
  width: 40px;
}
.logo-title {
  font-size: 28px;
  letter-spacing: 3px;
  font-style: italic;
}
</style>
