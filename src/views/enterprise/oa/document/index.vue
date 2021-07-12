<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-26 09:58:21
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
export default {
  data() {
    return {
      activeIn: 0,
      navs: [
        { name: "发文拟稿", path: "enterprise_oa_document_write" },
        { name: "草稿箱", path: "enterprise_oa_document_draft", num: 0 },
        { name: "我的发文", path: "enterprise_oa_document_myPost", num: 0 },
        { name: "待办发文", path: "enterprise_oa_document_commission", num: 0 },
        { name: "已办发文", path: "enterprise_oa_document_done", num: 0 },
        { name: "我的收文", path: "enterprise_oa_document_addressee", num: 0 },
        { name: "公文监控", path: "enterprise_oa_document_monitor", num: 0 },
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
    this.$bus.$on("refresh_document", () => {
      this.getNum();
    });
  },
  methods: {
    async getNum() {
      let { result } = await api.QueryReceiveReceiveFileStat({});
      result.forEach((item) => {
        this.navs[item.stat_type].num = item.count;
      });
    },
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      this.$router.linkTo(item.path);
    },
  },
  beforeDestroy() {
    this.$bus.$off("refresh_document");
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
  top: 0;
  bottom: 0;
  left: 0px;
}
.right-box {
  top: 0;
  bottom: 0;
  left: 260px;
  right: 10px;
}
</style>
