<!--
 * @Autor: 邓易
 * @Date: 2020-10-20 10:02:33
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-17 10:16:59
-->
<template>
  <div v-if="picList && picList[0]" class="detail-item mt-1 detail-item-long">
    <span class="detail-label" :style="{ width: label_width + 'px' }">{{
      title
    }}</span>
    <span>：</span>

    <div class="detail-value flex-fill vertical-top text-left">
      <viewer :images="picList" class="lookPic">
        <img
          :src="item.url"
          v-for="(item, index) in picList"
          :key="index + 'image'"
          class="layer-info-img"
        />
      </viewer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    picList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "附件图片",
    },
    label_width: {
      type: Number,
      default: 70,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.detail-item {
  color: $color-2;
  display: inline-flex;
  // line-height: 12px;
  // margin-bottom: 5px;
  .detail-label {
    width: 70px;
    display: inline-block;
    // text-align: justify;
    vertical-align: top;
    &::after {
      display: inline-block;
      width: 100%;
      content: "";
      height: 0;
    }
  }
}
.detail-item-long {
  width: 100%;
  .detail-value {
    line-height: 20px;
  }
}
</style>
