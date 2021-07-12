<!--
 * @Author: 郭海林
 * @Date: 2020-06-04 11:37:06
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-28 11:00:13
 * @FilePath: \项目管家AI云平台\src\components\common\TreeMulti\index.vue
-->
<template>
  <el-tree
    empty-text="暂无数据"
    :props="defaultProps"
    ref="tree"
    :data="treeData"
    :node-key="defaultProps.value"
    :default-expanded-keys="defaultExpandedKey"
    :default-expand-all="expandAll"
    show-checkbox
    :check-strictly="checkStrictly"
    :check-on-click-node="true"
    :expand-on-click-node="false"
    @check="check"
    @check-change="checkChange"
    :default-checked-keys="defaultCheckedKey"
    :filter-node-method="filterNode"
  >
    <span class="tree-node" slot-scope="{ node, data }" :title="data.node[defaultProps.label]">
      <!-- <span>{{ data[defaultProps.label] }}</span> -->
      <span>{{ data.node[defaultProps.label] }}</span>
      <slot v-bind:node="data.node"></slot>
    </span>
  </el-tree>
</template>

<script>
import { Tree } from "element-ui";
export default {
  components: {
    ElTree: Tree,
  },
  props: {
    checkStrictly: {
      type: Boolean,
      default: true,
    },
    treeData: {
      type: Array,
      default: [],
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          value: "tag", // ID字段名
          children: "leaves",
          label: "organ",
        };
      },
    },
    defaultCheckedKey: {
      type: Array,
      default() {
        return [];
      },
    },
    filterText: {
      type: String,
      default: "",
    },
    filterLable: {
      type: String,
      default: "",
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
    isExpand: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      defaultExpandedKey: null, //默认勾选的节点的 key 的数组
    };
  },
  mounted() {
    this.defaultExpandedKey = this.isExpand ? [this.treeData[0] && this.treeData[0].tag] : null;
  },
  methods: {
    //关键字过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.node[this.filterLable].indexOf(value) !== -1;
    },
    // 节点选中状态发生变化时的回调
    /**
     * @param {Object} data  传递给 data 属性的数组中该节点所对应的对象
     * @param {Object} checked  节点本身是否被选中
     * @param {Object} indeterminate 节点的子树中是否有被选中的节点
     */
    checkChange(data, data2, data3) {
      const curNode = this.$refs.tree.getNode(data);
    },
    /**
     * @param {Object} data 传递给 data 属性的数组中该节点所对应的对象
     * @param {Object} data2  树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
     * @param {Object} data   根据 data 或者 key 拿到 Tree 组件中的 node
     */
    check(data1, data2) {
      const curNode = this.$refs.tree.getNode(data1);
      this.$emit("checkFun", { data1, data2, curNode });
    },
    checkChange(data1, data2, data3) {
      // if (!this.checkStrictly) return;
      this.$emit("checkChange", { data1, data2, data3 });
    },
    clearHandle() {
      this.$emit("checkFun", null);
    },
  },
};
</script>

<style scoped></style>
