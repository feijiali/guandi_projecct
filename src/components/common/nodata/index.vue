<template>
  <div class="nodata-box d-flex-cen">
    <div class="text-center">
      <img :src="icon" :width="imgW" />
      <div class="text-secondary mt-1">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nodata",
  props: {
    icon: {
      type: String,
      require: true,
      default: require("@/assets/images/bg_default_data.png"),
    },
    text: {
      type: String,
      require: true,
      default: "真是不巧，暂时没有数据呢~",
    },
    imgW: {
      type: String,
      require: true,
      default: "80px",
    },
    imgH: {
      type: String,
      default: "95px",
    },
  },
};
</script>
<style scoped lang="scss">
.nodata-box {
  // margin-top: 30px;
}
</style>
