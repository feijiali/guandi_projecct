<!--
 * @Autor: 邓易
 * @Date: 2020-10-20 10:02:33
 * @LastEditors: 邓易
 * @LastEditTime: 2020-10-20 14:14:47
-->
<template>
  <div
    v-if="videoList && videoList[0]"
    class="detail-item mt-1 detail-item-long d-inline-flex"
  >
    <span class="detail-label" style="width: 70px">附件视频</span>
    <span>：</span>
    <div class="detail-value flex-fill vertical-top text-left">
      <n-video
        v-for="item in videoList"
        :key="item.url"
        class="video_tag"
        :src="item.url"
      ></n-video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.detail-item {
  width: 100% !important;
  color: $color-2;
  display: inline-flex;
  // line-height: 12px;
  // margin-bottom: 5px;
  .detail-label {
    display: inline-block;
    text-align: justify;
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
