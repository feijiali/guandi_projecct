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
export default {
  data() {
    return {
      navs: [
        {
          name: "入场登记",
          link: "enterprise_oa_account_labourRealName_labour",
          active: "oa_account_labourRealName_labour",
        },
        // {
        //   name: "考勤记录",
        //   link: "enterprise_oa_account_labourRealName_attendance",
        //   active: "oa_account_labourRealName_attendance",
        // },
        {
          name: "特殊工种",
          link: "enterprise_oa_account_labourRealName_special",
          active: "oa_account_labourRealName_special",
        },
        {
          name: "班组维护",
          link: "enterprise_oa_account_labourRealName_team",
          active: "oa_account_labourRealName_team",
        },
      ],
      active: 0,
    };
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
