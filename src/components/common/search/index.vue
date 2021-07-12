<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-22 17:32:08
-->
<template>
  <div class="search-box position-relative">
    <el-input
      :placeholder="placeholder"
      v-model="searchObj"
      @keyup.enter.native="searchFun(searchObj)"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchFun(searchObj)"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 200,
    },
    placeholder: {
      type: String,
      default: "请输入关键词搜索",
    },
    isInput: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchObj: "",
    };
  },
  methods: {
    // 普通搜索框
    searchFun(val) {
      this.$emit("searchFun", val);
    },
  },
};
</script>

<style scoped lang="scss">
.search-box {
  display: inline-block;
  ::v-deep .el-input {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    border: 1px solid $color-3 !important;
  }
  ::v-deep .el-input-group__prepend {
    position: relative !important;
    right: 0;
    top: 0;
    border: 1px solid $color-3 !important;
    padding: 0 10px !important;
    background-color: $greybg !important;
  }
  .el-input-group--prepend {
    ::v-deep .el-input__inner {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  ::v-deep .el-input-group__append {
    position: relative !important;
    right: 0;
    top: 0;
    border: 1px solid $color-3 !important;
    border-left: none !important;
    padding: 0 10px !important;
    background-color: $greybg !important;
  }
  .el-input-group--append {
    ::v-deep .el-input__inner {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}
</style>
