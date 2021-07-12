<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-30 17:49:32
-->
<template>
  <div class="layer-title-blue position-relative mb-1">
    {{ title }}
    <span></span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
// 详情里面的子标题
.layer-title-blue {
  color: white;
  min-width: 130px;
  max-width: 180px;
  height: 38px;
  line-height: 36px;
  background: linear-gradient(to right, #3377ff, #fff);
  background: linear-gradient(
    to right,
    #3377ff 0%,
    #8db6fe 36.67%,
    #d1ecfe 63.33%,
    #e2f5ff 70%,
    #effaff 80.67%,
    #fafeff 88.67%
  );
  padding: 0 25px 0 15px;
  border-radius: 20px;
  font-size: 16px;
  letter-spacing: 1px;
  z-index: 1;
}
</style>
