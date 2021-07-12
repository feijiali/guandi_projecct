<template>
  <el-select
    :disabled="isDisabled"
    ref="selectTreeBox"
    class="tree-select"
    :value="valueTitle"
    @clear="clearHandle"
    :class="'tree-select-wrap'"
    :style="{ width: width + 'px !important' }"
    :filterable="isFilter"
    :filter-method="filterMethod"
  >
    <!-- 
    :popper-append-to-body="false" -->
    <el-option value label class="options tree-select-option-wrap"></el-option>
    <div
      class="
        justify-content-end
        align-items-center
        d-flex
        pr-2
        position-absolute
      "
      style="right: 0; z-index: 20"
      v-if="showSure"
    >
      <span
        class="cursor-p text-hover-primary"
        @click="$refs.selectTreeBox.handleClose()"
        >确定</span
      >
      <span
        class="cursor-p text-hover-primary ml-4"
        @click="handleCheckAllChange()"
        >{{ checkAll ? "取消全选" : "全选" }}</span
      >
    </div>
    <el-tree
      id="tree-option"
      class="single-tree"
      :class="[showSure ? 'mt-2' : '']"
      ref="selectTree"
      :show-checkbox="showCheckbox"
      :accordion="accordion"
      :data="treeData"
      :filter-node-method="filterNode"
      :props="defaultProps"
      :check-strictly="checkStrictly"
      :node-key="defaultProps.value"
      :expand-on-click-node="false"
      :default-expanded-keys="defaultExpandedKey"
      :default-expand-all="defaultExpandAll"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    >
      <!-- <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ showNodeName ? data.node[defaultProps.partentLabel].split(',').slice(1,data.node[defaultProps.partentLabel].split(',').length).join("/"):data.node[defaultProps.label] }}</span>
            <slot v-bind:node="data.node"></slot>
        </span> -->
      <span class="tree-node" slot-scope="{ data }">
        <!-- <span>{{ data.node[defaultProps.label] }}</span> -->
        <span>{{
          showNodeName
            ? data.node[defaultProps.partentLabel]
                .split(",")
                .slice(
                  1,
                  data.node[defaultProps.partentLabel].split(",").length
                )
                .join("/")
            : data.node[defaultProps.label]
        }}</span>
        <template
          v-if="
            defaultProps.label == 'material_name' &&
            data.node.material_type == 20
          "
        >
          <span v-if="data.node.material_nick_name"
            >({{ data.node.material_nick_name.slice(0, 20) }})</span
          >
          <span
            >-{{ data.node.material_spec }}-{{ data.node.material_unit }}</span
          >
        </template>
      </span>
    </el-tree>
  </el-select>
</template>

<script>
import { Tree } from "element-ui";
export default {
  components: {
    ElTree: Tree,
  },
  name: "el-tree-select",
  props: {
    width: {
      type: Number,
      default: null,
    },
    //显示父类名
    showNodeName: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    showSure: {
      type: Boolean,
      default: false,
    },
    organTypeFilter: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 配置项
    defaultProps: {
      type: Object,
      default: () => ({
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ_area",
      }),
    },
    //是否需要筛选
    isFilter: {
      type: Boolean,
      default: false,
    },
    //筛选的节点名
    filterName: {
      type: String,
      default: "material_name",
    },
    // 选项列表数据(树形结构的对象数组)
    treeData: {
      type: Array,
      default: [],
    },
    // 初始值
    value: {
      default: null,
    },

    multiValue: {
      default: null,
    },

    // 可清空选项
    clearable: {
      type: Boolean,
      default: true,
    },

    // 自动收起
    accordion: {
      type: Boolean,
      default: false,
    },

    Isvalue: {
      type: Boolean,
      default: false,
    },
    is_pos: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      index: 0,
      valueId: null, //当前选中节点的id
      multiValueId: null,
      timer: null,
      valueTitle: "", //当前选中的节点的名字
      defaultExpandedKey: [], //默认勾选的节点的 key 的数组
      checkAll: false, //是否全选
    };
  },
  created() {
    if (this.treeData[0] && this.treeData[0].tag) {
      this.defaultExpandedKey = [this.treeData[0] && this.treeData[0].tag];
    }
    if (this.defaultProps.label == "organ_area") {
      this.defaultProps.label = "organ";
    }
    this.checkAll = false;
    this.value && (this.valueId = this.value); // 初始值
    !this.showCheckbox && this.initHandle();
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    },
    multiValue() {
      // 仅在初始化的时候使用
      if (this.multiValue) {
        this.multiValueId = this.multiValue.split(",");
        this.initMultiHandle();
        // this.timer = setInterval(this.initMultiHandle, 500);
      }
    },
  },
  methods: {
    filterMethod(val) {
      this.$refs.selectTree.filter(val);
    },
    filterNode(value, data, node) {
      if (!value) {
        return true;
      }
      let level = node.level;
      let _array = []; //这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach((item) => {
        result = result || item;
      });
      return result;
    },
    getReturnNode(node, _array, value) {
      let isPass =
        node.data &&
        node.data.node[this.filterName] &&
        (
          node.data.node[this.filterName] + node.data.node.material_nick_name
        ).indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++;
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    },
    // 初始化值
    /**
     * getNode() 根据 data 或者 key 拿到 Tree 组件中的 node
     * setCurrentKey() 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
     */
    initHandle() {
      if (this.valueId || this.valueId === 0) {
        this.$nextTick(() => {
          if (this.Isvalue) {
            let nowkey = this.$refs.selectTree.getCurrentKey();
            if (nowkey === this.valueId && this.valueTitle) {
              return;
            }
            let label = this.defaultProps.label;
            if (
              this.defaultProps.label.indexOf("organ") != -1 &&
              !this.is_pos
            ) {
              label = "organ_area";
            }
            this.valueTitle =
              this.valueId && this.$refs.selectTree.getNode(this.valueId)
                ? this.$refs.selectTree.getNode(this.valueId).data.node[label]
                : ""; // (根据选中的id来获取当前节点的name名字)初始化显示
          }
          this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
          this.defaultExpandedKey = [this.valueId]; // 设置默认展开
        });
      }
    },
    initMultiHandle() {
      if (this.valueTitle) {
        // clearInterval(this.timer);
        return;
      }
      // 设置选中title
      let title = "";
      if (this.$refs.selectTree.getNode(this.multiValueId[0])) {
        title = this.$refs.selectTree.getNode(this.multiValueId[0]).data.node[
          this.defaultProps.label
        ];
      } else {
        title = this.$refs.selectTree.getNode(this.multiValueId[1]).data.node[
          this.defaultProps.label
        ];
      }

      if (this.multiValueId.length == 1) {
        this.valueTitle = title;
      } else if (this.multiValueId.length > 1) {
        this.checkAll = true;
        this.valueTitle = `${title}等${this.multiValueId.length}个单位`;
      } else {
        this.valueTitle = "";
      }
      // 设置选中项
      this.$refs.selectTree.setCheckedKeys(this.multiValueId); // 设置默认选中
    },
    // 切换树节点选项
    handleNodeClick(node) {
      // 点击后收起下拉框
      if (!this.showCheckbox) {
        if (!this.organTypeFilter.length) {
          // 不过滤节点类型
          this.valueId = node[this.defaultProps.value];
          this.valueTitle = node.node[this.defaultProps.label];
          if (
            this.defaultProps.label == "material_name" &&
            node.node.material_type == 20
          ) {
            node.node.material_nick_name
              ? (this.valueTitle += `(${node.node.material_nick_name.slice(
                  0,
                  20
                )})`)
              : null;
            this.valueTitle += `-${node.node.material_spec}-${node.node.material_unit}`;
          }
          this.$refs.selectTreeBox.handleClose();
        } else {
          // 层级判断
          if (!this.organTypeFilter.includes(node.node.organ_type)) {
            this.$tip({
              isTip: true,
              message: "该层级无法选择!",
            });
            return;
          } else {
            this.valueId = node[this.defaultProps.value];
            this.valueTitle = node.node[this.defaultProps.label];
            this.$refs.selectTreeBox.handleClose();
          }
        }
      } else {
        this.$refs.selectTree.setCurrentKey(null);
      }
      this.$emit("getSelectValue", this.valueId);
      this.$emit("input", this.valueId + "");
      this.$emit("getSelectNode", node);

      this.defaultExpandedKey = [];
    },

    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getSelectValue", null);
    },

    handleCheckChange(data, checked, indeterminate) {
      if (!this.organTypeFilter.length) {
        // 不过滤节点类型
        const checkedNodes = this.$refs.selectTree.getCheckedNodes();
        this.$emit("check-change", {
          checkedNodes: checkedNodes,
          data: data,
          checked: checked,
        });
        // this.$emit("check-change", checkedNodes);
      } else {
        // 层级判断
        if (checked && !this.organTypeFilter.includes(data.node.organ_type)) {
          this.$tip({
            isTip: true,
            message: "该层级无法选择!",
          });
          const checkedNodes = this.$refs.selectTree.getCheckedNodes();
          let ind = checkedNodes.findIndex((item) => item.tag == data.tag);
          checkedNodes.splice(ind, 1);
          this.$refs.selectTree.setCheckedNodes(checkedNodes);
        } else {
          const checkedNodes = this.$refs.selectTree.getCheckedNodes();
          this.$emit("check-change", {
            checkedNodes: checkedNodes,
            data: data,
          });
        }
      }
    },
    // 组织架构全选
    handleCheckAllChange(val) {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        //全选
        this.$refs.selectTree.setCheckedNodes(this.treeData);
      } else {
        //取消选中
        this.$refs.selectTree.setCheckedKeys([]);
      }
    },
    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
  },
};
</script>
<style scoped lang="scss">
.top-select-box {
  .tree-select {
    // width: 180px !important;
    ::v-deep .el-input {
      width: 100% !important;
    }
  }
}

.el-select-dropdown__wrap {
  min-height: 250px !important;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  // 不加这句，不然会有滚动条样式
  // height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}

.el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree .is-current .el-tree-node__label {
  color: $main;
  font-weight: 700;
}

.el-tree .is-current .el-tree-node__children .el-tree-node__label {
  color: $color-1;
  font-weight: normal;
}
</style>
