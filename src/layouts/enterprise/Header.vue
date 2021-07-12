<template>
  <div class="h-100">
    <!-- 顶部 -->
    <vHeaderMain
      class="d-flex flex-nowrap justify-content-between align-items-center"
      style="height: 40px"
    />
    <!-- 菜单区域 -->
    <vHeaderMenu class="" />
  </div>
</template>

<script>
import vHeaderMain from "./HeaderMain";
import vHeaderMenu from "./HeaderMenu";

export default {
  components: {
    vHeaderMain,
    vHeaderMenu,
  },
};
</script>

<style lang="scss" scoped>
</style>
