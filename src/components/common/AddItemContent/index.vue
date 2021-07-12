<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-10-20 15:53:09
-->
<template>
  <div
    @click="choosePersonClick"
    class="add-item-content position-relative"
    :style="{ width: width, height: height, backgroundColor: backgroundColor }"
  >
    <n-scroll class="content-main-l position-relative">
      <slot name="content-add"></slot>
    </n-scroll>
    <div
      v-if="isShow"
      class="
        content-main-r
        d-flex
        align-items-center
        justify-content-center
        flex-column
      "
    >
      <div
        class="d-inline-block add-circle-btn"
        @click="addFun"
        v-if="isAdd || isReduce"
      >
        +
      </div>
      <!-- <i class="iconfont btn-btn_detail_plus_02 font-24 cursor-p text-hover-primary" @click="addFun" v-if="isAdd"></i> -->
      <div
        class="d-inline-block add-circle-btn mt-2"
        @click="reduce"
        v-if="!isAdd"
      >
        -
      </div>
      <!-- <i
        class="iconfont btn-btn_detail_minus_02 font-24 cursor-p text-hover-primary"
        @click="reduce"
        v-else
      ></i> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "200px",
    },
    backgroundColor: {
      type: String,
      default: "#eef2fc",
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
    isReduce: {
      type: Boolean,
      default: false,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isApproval: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //   点击➕展示选择弹框
    addFun() {
      this.$emit("addFun");
    },
    //   点击➖展示选择弹框
    reduce() {
      this.$emit("reduce");
    },
    choosePersonClick() {
      this.isApproval && this.$emit("choosePersonClick");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-item-content {
  border-radius: 8px;
  vertical-align: text-top;
  padding: 15px;
  .content-main-l {
    width: calc(100% - 32px) !important;
  }
  .content-main-r {
    position: absolute;
    width: 50px;
    right: 0;
    height: 100%;
    top: 0;
    border-radius: 0 8px 8px;
    background-color: #dde4f5;
    i {
      font-size: 28px !important;
    }
  }
}
</style>
