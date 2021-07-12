<template>
  <div class="h-100 position-relative table-list-wrap">
    <div
      class="
        p-1
        d-flex
        justify-content-between
        position-relative
        bg-white
        rounded-1
        mb-1
      "
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
          name: "班前教育",
          link: "enterprise_safety3_produceManage_safeEducation_preEducation",
          active: "safety3_produceManage_safeEducation_preEducation",
          permission: "SafeEducation",
        },
        {
          name: "安全考核",
          link: "enterprise_safety3_produceManage_safeEducation_SafeTest",
          active: "safety3_produceManage_safeEducation_SafeTest",
          permission: "SafeExamine",
        },
        {
          name: "安全交底",
          link: "enterprise_safety3_produceManage_safeEducation_SafeDisclosure",
          active: "safety3_produceManage_safeEducation_SafeDisclosure",
          permission: "SafeCommunicate",
        },
      ],
      active: 0,
    };
  },
  created() {
    this.navs = this.navs.filter((item) => {
      return hasPermissionArr([item.permission]);
    });
    if (
      this.$route.name === "enterprise_safety3_produceManage_safeEducation" ||
      this.$route.name === "project_safety3_produceManage_safeEducation"
    ) {
      this.linkTo(this.navs[0].link, 0);
    }
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
