<!--
 * @Autor: 邓易
 * @Date: 2020-11-09 11:17:51
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-23 14:46:59
-->
<template>
  <div class="w-100" style="padding: 0 10px">
    <!-- 左边logo区域 -->
    <vHeaderMainLeft />
    <div
      class="d-flex flex-nowrap justify-content-between align-items-center h-100 header-dr"
    >
      <!-- 用户头像姓名 -->
      <vAvatar />
      <!-- 功能下拉区域 -->
      <vDropMenu />
      <!-- 未读消息图标 -->
      <vNewsBadge />
      <!-- 分割线区域 -->
      <div class="distcell">
        <el-divider class="header-divider" direction="vertical"></el-divider>
      </div>
      <!-- 天气温度等区域 -->
      <vWeather />
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { Divider } from "element-ui";
import vHeaderMainLeft from "./HeaderMainLeft";
import vAvatar from "./components/Avatar";
import vDropMenu from "./components/DropMenu";
import vNewsBadge from "./components/NewsBadge";
import vWeather from "./components/Weather";
import setOrganTreedata from "@/mixins/setOrganTreedata";
export default {
  mixins: [setOrganTreedata],
  components: {
    vAvatar,
    vDropMenu,
    vNewsBadge,
    vWeather,
    vHeaderMainLeft,
    ElDivider: Divider,
  },
  data() {
    return {};
  },
  mounted() {
    // this.queryOrganTree();
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
