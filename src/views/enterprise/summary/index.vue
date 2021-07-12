<!--
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:27
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-22 17:54:00
-->
<template>
  <div class="h-100 position-relative summary-box p">
    <div
      class="position-absolute pos-left d-flex justify-content-between flex-column"
    >
      <div class="bg-white rounded-1 flex-fill">
        <!-- 市场扩展 -->
        <vBusiness @linkTo="linkTo" />
      </div>
      <div class="bg-white rounded-1 flex-fill mt-1">
        <!-- 产值统计 -->
        <vTBMData @linkTo="linkTo" />
      </div>
      <div class="bg-white rounded-1 flex-fill mt-1">
        <!-- 人员统计 -->
        <vPersonCount @linkTo="linkTo" />
      </div>
    </div>
    <div class="position-absolute pos-center bg-white rounded-1">
      <vSumMap />
    </div>
    <div
      class="position-absolute pos-right d-flex justify-content-between flex-column"
    >
      <div class="bg-white rounded-1 flex-fill">
        <!-- 工程进度 -->
        <vEngineering @linkTo="linkTo" />
      </div>
      <div class="bg-white rounded-1 flex-fill mt-1">
        <!-- 项目统计 -->
        <vProjectCount />
      </div>
      <div class="bg-white rounded-1 flex-fill mt-1">
        <!-- 设备统计 -->
        <vDeviceCount @linkTo="linkTo" />
      </div>
    </div>
  </div>
</template>

<script>
import vSumMap from "./components/SumMap";
import vBusiness from "./components/Business";
import vTBMData from "./components/TBMData";
import vPersonCount from "./components/PersonCount";
import vDeviceCount from "./components/DeviceCount";
import vProjectCount from "./components/ProjectCount";
import vEngineering from "./components/engineering";
import api from "@/api/index";
import { hasPermissionArr } from "@/plugins/permission_tools.js";

export default {
  components: {
    vSumMap,
    vBusiness,
    vTBMData,
    vPersonCount,
    vDeviceCount,
    vProjectCount,
    vEngineering,
  },
  async beforeRouteLeave(to, from, next) {
    if (to.path === "/login") {
      next();
    } else {
      await this.$store.dispatch("user/GetPermissionList", { id: "" });
      next();
    }
  },
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
.summary-box {
  background-color: $greybg;
}
.pos-left,
.pos-right {
  width: 400px;
  top: 8px;
  bottom: 8px;
}
.pos-center {
  width: calc(100% - 840px);
  left: 420px;
  top: 8px;
  bottom: 8px;
}
.pos-left {
  left: 10px;
}
.pos-right {
  right: 10px;
}
</style>
