<template>
  <div
    class="common-choose-box d-flex align-items-center justify-content-between"
  >
    <n-search
      class="disi"
      :isInput="true"
      :placeholder="'请输入关键词'"
      @searchFun="searchFun"
    ></n-search>
    <div>
      <div class="el-button-add" icon="el-icon-plus">批量删除</div>
      <div class="el-button-add mgl20" @click="handleAddClick">
        <img
          style="width: 12px"
          src="../@/assets/images/icon_windows_structure_delete_selected.png"
          class="vtm mgr5"
        />
        新增
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicOperate",
  methods: {
    handleAddClick() {
      this.$router.linkTo("ProjectDynamicAdd");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
