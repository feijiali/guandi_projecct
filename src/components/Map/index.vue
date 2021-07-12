<!--
 * @Author: 郭海林
 * @Date: 2020-06-08 14:43:03
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-16 14:12:42
 * @FilePath: \中铁18局\src\components\Map\index.vue
-->
<template>
  <div id="lnglat" class="w-100 h-100 map-view-box"></div>
</template>

<script>
import { initMap, destroyMap } from "@/plugins/mapUtils.js";
export default {
  props: {
    value: {
      type: Object,
      required: false,
    },
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.map = initMap("lnglat", this.option, this);
    this.map.setZoom(12);
    this.map.on("complete", () => {
      this.$emit("input", this.map);
      this.$emit("ready");
    });
  },
  beforeDestroy() {
    destroyMap(this.map);
    this.$emit("input", null);
  },
};
</script>

<style lang="scss">
.map-view-box {
  .amap-icon {
    overflow: initial !important;
  }
}
</style>
