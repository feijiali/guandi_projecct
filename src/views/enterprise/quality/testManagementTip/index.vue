<template>
  <div class="h-100 position-relative table-list-wrap">
    <div
      class="p-1 d-flex justify-content-between position-relative bg-white rounded-1 mb-1"
      v-if="!$route.name.includes('handle')"
    >
      <ul class="sub-nav-ul clear">
        <li
          v-for="(item, index) in navs"
          :key="index"
          class="sub-nav-li-item"
          :class="{ active: $route.name.includes(item.active) }"
          @click="linkTo(item.link, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div
      class="w-100 flex-fill position-relative rounded-1 h-100"
      style="overflow: visible"
    >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  data() {
    return {
      navs: [
        {
          name: "试块管理",
          link: "enterprise_quality_testManagementTip_testManagement",
          active: "quality_testManagementTip_testManagement",
          //   permission: "TestManagement",
        },
        {
          name: "其他文件管理",
          link: "enterprise_quality_testManagementTip_otherFile",
          active: "quality_testManagementTip_otherFile",
          //   permission: "TestManagement",
        },
      ],
      active: 0,
    };
  },
  mounted() {
    // this.navs = this.navs.filter((item) => {
    //   return hasPermissionArr([item.permission]);
    // });
  },
  methods: {
    linkTo(name, index) {
      this.active = index;
      this.$router.linkTo(name);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
