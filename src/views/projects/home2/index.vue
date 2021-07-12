<!--
 * @Autor: 邓易
 * @Date: 2021-03-24 11:22:06
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-24 15:41:55
-->
<template>
  <div class="w-100 h-100 d-flex justify-content-between align-items-center">
    <div
      class="home-left-contain h-100 flex-column d-flex justify-content-between align-items-center"
    >
      <div class="flex-fill w-100 bg-white rounded-1 mb-1">
        <!-- 产值统计 -->
        <product-total></product-total>
      </div>
      <div class="flex-fill w-100 bg-white rounded-1 mb-1">
        <!-- 实际与计划对比-->
        <actual-plan></actual-plan>
        <!-- <person-total></person-total> -->
      </div>
      <!-- 图片轮播 -->
      <div class="flex-fill w-100 bg-white rounded-1">
        <pic-total @linkTo="linkTo"></pic-total>
      </div>
    </div>
    <div
      class="home-mid-contain flex-fill h-100 flex-column d-flex justify-content-between align-items-center ml-1"
    >
      <div
        class="w-100 bg-white rounded-1 mb-1 home-mid-map flex-fill-2 overflow-hidden"
      >
        <!-- 项目概况——地图 -->
        <home-map></home-map>
      </div>
      <div
        class="flex-fill w-100 rounded-1 home-mid-bottom d-flex justify-content-between bg-white"
      >
        <!-- 日常巡检与整改次数统计 -->
        <dynamic-total @linkTo="linkTo"></dynamic-total>
      </div>
    </div>
    <div
      class="home-right-contain h-100 flex-column ml-1 d-flex justify-content-between align-items-center"
    >
      <div class="w-100 rounded-1 mb-1 bg-white" style="height: 30%">
        <!-- 人员统计 -->
        <person-total></person-total>
      </div>
      <div class="flex-fill w-100 bg-white rounded-1 mb-1">
        <!-- 视频监控 -->
        <video-total @linkTo="linkTo" class="overflow-hidden"></video-total>
      </div>
      <div class="flex-fill w-100 bg-white rounded-1">
        <!-- 教育培训次数统计 -->
        <education-tring
          @linkTo="linkTo"
          class="overflow-hidden"
        ></education-tring>
      </div>
    </div>
  </div>
</template>
<script>
import HomeMap from "./components/HomeMap"; //产值统计
import ProductTotal from "./components/ProductTotal"; //产值统计
import PersonTotal from "./components/PersonTotal"; //人员统计
import VideoTotal from "./components/VideoTotal"; //视频监控
import SafeTotal from "./components/SafeTotal"; //安全预警
import DynamicTotal from "./components/DynamicTotal"; //项目动态
import PicTotal from "./components/PicTotal"; //图片轮播
import QualityTotal from "./components/QualityTotal"; //质量预警
import EducationTring from "./components/EducationTring"; //教育培训
import ActualPlan from "./components/ActualPlan"; //实际与计划对比

import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  components: {
    HomeMap,
    ProductTotal,
    PersonTotal,
    VideoTotal,
    SafeTotal,
    DynamicTotal,
    PicTotal,
    QualityTotal,
    EducationTring,
    ActualPlan,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    linkTo(data) {
      if (hasPermissionArr([data.permission])) {
        this.$router.linkTo(data.name);
      } else {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限查看",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-left-contain,
.home-right-contain {
  width: 25%;
}
.home-dynamic {
  width: 60%;
}
</style>
