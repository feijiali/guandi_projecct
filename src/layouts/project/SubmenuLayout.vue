<!--
 * @Autor: 邓易
 * @Date: 2020-11-18 09:03:23
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-03 11:52:21
-->
<template>
  <div class="w-100 h-100 submenu_layout d-flex flex-column">
    <ul
      class="rounded-1 nav-bar d-flex"
      v-if="$route.meta.keepAlive && $route.meta.prolevel == 3"
    >
      <img
        v-if="$route.meta.showBack"
        src="@/assets/images/btn_detail_return.png"
        @click="backFun"
        class="back-img cursor-p"
      />
      <li
        :class="[select_router_path == item.path ? 'active' : '']"
        class="nav-item cursor-p"
        v-for="item in menuData"
        :key="item.path"
        @click="linkTo(item)"
      >
        {{ item.meta.title }}
      </li>
    </ul>
    <div class="flex-fill" :style="{ height: view_4_height }">
      <keep-alive>
        <router-view v-if="keep_flag"></router-view>
      </keep-alive>
      <router-view v-if="keep_no_flag"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_router_path: "",
    };
  },
  computed: {
    menuData() {
      return this.$store.getters.submenuData;
    },
    keep_flag() {
      let meta = this.$route.meta;
      return meta.keepAlive ? true : false;
    },
    keep_no_flag() {
      let meta = this.$route.meta;
      return !meta.keepAlive;
    },
    view_4_height() {
      let notKeepAlive = this.$route.meta.notKeepAlive;
      // return notKeepAlive ? "calc(100% - 62px)" : this.keep_flag ? "calc(100% - 31px)" : "100%";
      // return "100%";
    },
  },
  watch: {
    $route(val, oldval) {
      this.setMenu();
    },
  },
  created() {
    this.setMenu();
  },
  methods: {
    backFun() {
      this.linkTo(this.$route.matched[2]);
    },
    setMenu() {
      let route_sub = this.$route.matched.find(
        (item) => item.meta && item.meta.prolevel == 3
      );
      this.select_router_path = route_sub ? route_sub.path : "";
    },
    linkTo(item) {
      this.$router.linkTo(item.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.submenu_layout {
  // padding: 8px 8px 0 8px;
}
.back-img {
  z-index: 999;
  width: 30px;
  height: 30px;
}
</style>
