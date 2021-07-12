<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-16 10:28:11
-->
<template>
  <div class="position-relative h-100 w-100" style="padding-top: 0;">
    <div class="container-div-s position-relative">
      <ul class="sub-nav-ul position-absolute nav-box" v-if="$route.meta.level || $route.meta.prolevel">
        <li
          v-for="(item, index) of navs"
          @click="handelSwitchChange(index, item)"
          :key="index"
          class="sub-nav-li-item"
          :class="[$route.name == item.path ? 'active' : '']"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="position-absolute w-100 h-100">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIn: 0,
      navs: [
        { name: "自有设备", path: "enterprise_material_device_operation_statistical_own" },
        { name: "租赁设备", path: "enterprise_material_device_operation_statistical_rental" },
      ],
    };
  },
  created() {
    if (this.$route.meta.isProject) {
      this.navs.forEach(item => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
  },
  methods: {
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      this.$router.linkTo(item.path);
    },
  },
};
</script>
<style lang="scss" scoped>

.container-div-s {
  width: 100%;
  height: 100%;
}
</style>
