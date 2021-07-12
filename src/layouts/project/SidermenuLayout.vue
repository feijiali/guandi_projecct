<template>
  <el-aside
    class="bg-primary asidetr position-relative"
    :width="app.isCollapse ? '60px' : '160px'"
  >
    <div class="text-right w-100 p-2 cursor-p position-relative">
        <i
        :class="app.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="() => {this.app.changeCollapse();}"
      ></i>
    </div>
    <n-scroll
      :native="false"
      class="position-absolute z_scrollbar z-index-2"
      style="top: 46px; bottom: 30px; position: absolute; width: 100%;height:auto !important;"
    >
      <v-sider />
    </n-scroll>
  </el-aside>
</template>

<script>
import SideCollapse from "@/components/SideCollapse";
import vSider from "./Sider";
export default {
  inject: ["app"],
  components: {
    vSider,
    SideCollapse,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 点击返回
    rebackFun() {
      // this.GLOBAL.gameInstance=null;
      this.$router.replace({ name: "enterprise_summary" });
      document.title = "企业管理云平台";
    },
  },
};
</script>

<style lang="scss" scoped>
.asidetr {
  background-color: $greybg;
  transition: width 0.5s;
  z-index: 20;
}
.el-main {
  height: 100%;
  padding: 0;
  min-width: 1400px;
}
</style>
