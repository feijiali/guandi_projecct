<!--
 * @Autor: 邓易
 * @Date: 2020-10-20 16:01:43
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-17 11:09:33
-->
<template>
  <el-container
    class="h-100 enter-el-container"
    :class="[app.isCollapse ? 'isCollapse-container' : '']"
  >
    <el-aside
      :class="[app.isCollapse ? 'isCollapse-asidetr' : '']"
      :width="app.isCollapse ? '60px' : '160px'"
      class="bg-primary asidetr position-relative"
    >
      <n-scroll>
        <v-sider />
      </n-scroll>
    </el-aside>
    <el-main>
      <div
        v-show="isModelShow"
        class="p-1 w-100 h-100"
        :class="{ dvanced: isAdvancedGeology }"
      >
        <model
          ref="model"
          :path="path"
          :isAdvancedGeology="isAdvancedGeology"
        ></model>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.secondAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.secondAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import vSider from "./Sider";
import Model from "@/components/Model";
export default {
  inject: ["app"],
  components: {
    vSider,
    Model,
  },
  data() {
    return {
      isAdvancedGeology: false, // 超前地质预报
      path: [
        "/enterprise/engineering/bim",
        "/enterprise/engineering/advancedGeology",
      ],
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 判断是否展示模型
        if (this.path.indexOf(this.$route.fullPath) != -1) {
          this.isModelShow = true;
          if (
            this.$route.fullPath == "/enterprise/engineering/advancedGeology"
          ) {
            this.isAdvancedGeology = true;
          } else {
            this.isAdvancedGeology = false;
          }
        } else {
          this.isModelShow = false;
          this.isAdvancedGeology = false;
        }
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.dvanced {
  position: absolute;
  width: calc(100% - 500px) !important;
  right: 0;
}
.asidetr {
  background-color: $greybg;
  transition: width 0.5s;
  z-index: 40;
}
.isCollapse-asidetr,
.isCollapse-container {
  background-color: $main;
}
.el-main {
  height: 100%;
  padding: 0;
  min-width: 1255px;
}
</style>
