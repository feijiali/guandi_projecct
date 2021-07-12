<template>
  <div class="silder-box" :style="{ left: isLeftFlod ? '0' : '-300px' }">
    <div class="fload_box bg_right" @click="isLeftFlod = !isLeftFlod">
      <i class="el-icon-arrow-left" v-if="isLeftFlod"></i>
      <i class="el-icon-arrow-right" v-else></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    defaultShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLeftFlod: this.defaultShow,
    };
  },
};
</script>

<style scoped lang="scss">
.silder-box {
  width: 300px;
  position: absolute;
  left: 0;
  z-index: 88;
  top: 0;
  height: 100%;
  transition: 1s all ease;
}
.fload_box {
  background-size: 100%;
  width: 35px;
  height: 96px;
  position: absolute;
  top: 50%;
  z-index: 100;
  cursor: pointer;
  color: #fff;
  line-height: 96px;
  margin-top: -48px;
  text-align: center;
}
.bg_right {
  background: url("../../images/bim_list_btn.png") no-repeat;
  right: -35px;
}
</style>
