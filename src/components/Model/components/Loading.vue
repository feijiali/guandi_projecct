<template>
  <div class="load_cover position-absolute">
    <img src="../images/loading_web.gif" alt class="load_logo" />
    <div class="loading_box"></div>
    <div
      class="load_text text-black font-weight-bold position-absolute text-center"
    >
      <div class="font-20">GIS初始化中...</div>
      <div class="font-20">{{ widthset }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    widthset: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped lang="scss">
.load_cover {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  top: 0;
  // background: #fff;
  background-image: linear-gradient(45deg, #f7f8fa, #e6e7ed);
  z-index: 99;
}
.load_logo {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.load_text {
  top: calc(50% + 30px);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
}
</style>
