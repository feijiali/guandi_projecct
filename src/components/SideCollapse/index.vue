<template>
  <div class="sideCollapse" id="domColapse">
    <i
      :class="app.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="() => {this.app.changeCollapse();}"
    ></i>
  </div>
</template>
<style lang="scss" scoped>
.sideCollapse i {
  font-size: 18px;
  color: $main;
  font-weight: 100;
  cursor: pointer;
}
</style>
<script>
export default {
  inject: ["app"],
  computed: {
  },
  methods: {
  }
};
</script>

