<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 09:16:37
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-03 15:38:33
-->
<!--
 * @Autor: 邓易
 * @Date: 2020-11-04 17:39:12
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-03 11:48:03
-->
<template>
  <div class="w-100 h-100 submenu_layout d-flex flex-column">
    <ul
      class="rounded-1 nav-bar d-flex position-relative"
      v-if="
        ($route.meta.keepAlive || $route.meta.notKeepAlive) &&
        $route.meta.level == 4
      "
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
    <div
      class="flex-fill"
      :class="{ 'rounded-1': keep_flag, 'w-100': keep_no_flag }"
      :style="{ height: view_4_height }"
    >
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
      // return meta.keepAlive && !meta.notKeepAlive && meta.level == 4 ? true : false;
      //修改以下是因为在level为4的时候，还有子级列表需要设置keepAlive为true,加了&& meta.level == 4 这个条件就不能进入缓存组件
      return meta.keepAlive && !meta.notKeepAlive ? true : false;
    },
    keep_no_flag() {
      let meta = this.$route.meta;
      // return !(meta.keepAlive && meta.level == 4) || (meta.notKeepAlive && meta.level == 4) ? true : false;
      return !meta.keepAlive || (meta.notKeepAlive && meta.level == 4)
        ? true
        : false;
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
      this.linkTo(this.$route.matched[3]);
      // this.$router.go(-1);
    },
    setMenu() {
      let route_sub = this.$route.matched.find(
        (item) => item.meta && item.meta.level == 4
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
  // padding: 8px;
}
.back-img {
  z-index: 999;
  width: 30px;
  height: 30px;
}
</style>
