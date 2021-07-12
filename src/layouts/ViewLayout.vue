<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:51
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-17 11:04:52
-->
<template>
  <div class="w-100 h-100 view_layout">
    <keep-alive>
      <router-view v-if="$route.meta.needAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.needAlive"></router-view>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss">
.view_layout {
  .n-scroll__wrap {
    margin-bottom: 0 !important;
  }
}
</style>
