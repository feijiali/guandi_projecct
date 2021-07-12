<template>
  <div class="progress" :style="{ height: height + 'px' }">
    <div
      class="progress-bar"
      :style="{ width: percentage + '%', background: color }"
    >
      <span
        class="mx-1"
        style="min-width:62px;display: block;"
        :style="{ lineHeight: height + 'px' }"
        >{{ percentage + '%' }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['percentage', 'color', 'height'],
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.progress {
  background: rgba(159, 163, 187, 0.8);
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  width: 100%;
  .progress-bar {
    position: absolute;
    height: 100%;
    left: 0;
    border-radius: 20px;
    color: #fff;
    text-align: right;
    transition: all 0.3;
  }
}
</style>
