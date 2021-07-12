<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-22 15:01:00
-->
<template>
  <div class="nav-bar d-flex">
    <div class="">
      <!-- <img src="@/assets/images/btn_detail_return.png" @click="backFun" class="cursor-p" /> -->
      <i
        @click="backFun"
        class="iconfont btn-btn_arrow_left text-white font-24 back_icon d-inline-block cursor-p"
      ></i>
      <span class="ml-1 font-14 text-primary">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    selfControl: {
      type: Boolean,
      required: false,
      default: false,
    },
    isback: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    backFun() {
      // 有时可能不是跳转上一个路由，需要监听点击事件实现自定义操作
      if (this.selfControl) {
        this.$emit("back");
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nav-bar {
  min-height: 35px;
  .nav-item {
    padding: 0px;
    font-size: 16px;
    color: #5a5efd;
    font-weight: 700;
  }
  .back_icon {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    background: $main;
    box-shadow: 0 0 6px $main;
  }
}
</style>
