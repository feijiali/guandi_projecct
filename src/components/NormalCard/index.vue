<template>
  <div class="normal-card bg-secondary" :style="{width:witdh?witdh:'100%'}">
    <div class="normal-title text-white bg-primary px-3" v-if="title">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    witdh:{
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
$radius: 10px;
.normal-card {
  position: relative;
  padding:20px 20px 10px 20px;
  border-radius: $radius;
  .normal-title {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 35px;
    border-radius: 0 $radius 0 $radius;
  }
}
</style>