<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-18 14:52:03
-->
<template>
  <div
    class="detail-item"
    :style="{ width: islong ? '100%' : width }"
    v-if="isShowItem"
  >
    <span class="detail-label" :style="{ width: lable_width + 'px' }">{{
      data.name
    }}</span
    >：
    <span class="detail-value flex-fill text-primary">
      <template v-if="isPic">
        <div class="rounded-circle personinfo-header">
          <viewer
            :images="[
              data.value
                ? data.value
                : require('@/assets/images/bg_mine_grey.png'),
            ]"
            class="lookPic w-100 h-100"
          >
            <img
              class="w-100 cursor-p rounded-circle h-100"
              :src="pic"
              v-for="(pic, ides) of [
                data.value
                  ? data.value
                  : require('@/assets/images/bg_mine_grey.png'),
              ]"
              :key="ides + 'c'"
            />
          </viewer>
        </div>
      </template>
      <template v-else>
        <template v-if="islong">
          <span
            class="line-height-20"
            :style="{ color: colorString }"
            v-html="$utils.dataFormatter(data.value)"
          ></span>
        </template>
        <template v-else>
          <span :style="{ color: colorString }">{{ data.value }}</span>
        </template>
        <span v-if="data.unit && data.value">{{ data.unit }}</span>
      </template>
    </span>
    <slot name="appenddiv"></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    colorString: {
      type: String,
      default: "",
    },
    islong: {
      type: Boolean,
      default: false,
    },
    isShowItem: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "32%",
    },
    lable_width: {
      type: Number,
      default: 80,
    },
    isPic: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.personinfo-header {
  width: 80px;
  height: 80px;
  border: 2px solid white;
}
// 详情列表
.detail-item {
  color: $color-2;
  display: inline-flex;
  // line-height: 12px;
  // margin-bottom: 5px;
  .detail-label {
    display: inline-block;
    text-align: justify;
    vertical-align: top;
    text-align: right;
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
