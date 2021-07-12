<template>
  <div class="w-100 h-100">
    <div
      class="el-tree-popover shadow"
      ref="popover"
      v-if="btnIsShow.isAdd || btnIsShow.isEdit || btnIsShow.isDel"
      v-show="visible"
      :style="popover"
    >
      <div
        class="home-right-item-btn"
        @click="handleFun(1)"
        v-if="btnIsShow.isAdd"
      >
        <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
        <span>新增子集</span>
      </div>
      <div
        class="home-right-item-btn mt-1"
        @click="handleFun(2)"
        v-if="btnIsShow.isEdit"
      >
        <i class="iconfont btn-btn_list_edit mr-1"></i>
        <span>修改名称</span>
      </div>
      <div
        class="home-right-item-btn mt-1"
        @click="handleFun(3)"
        v-if="btnIsShow.isDel"
      >
        <i class="iconfont btn-btn_list_trash mr-1"></i>
        <span>删除</span>
      </div>
    </div>
    <n-scroll>
      <el-tree
        class="single-tree"
        empty-text="暂无数据"
        :props="defaultProps"
        ref="tree"
        :data="treeData"
        :node-key="defaultProps.value"
        :expand-on-click-node="false"
        @node-click="leftClick"
        @node-contextmenu="rightClick"
        :default-expanded-keys="defaultExpandedKeys"
        :default-expand-all="expandAll"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
        :current-node-key="defaultNodeKey"
      >
        <div class="tree-node d-inline-block" slot-scope="{ data }">
          <span>{{ data.node[defaultProps.label] }}</span>
          <slot v-bind:node="data.node"></slot>
        </div>
      </el-tree>
    </n-scroll>
  </div>
</template>

<script>
import { Tree } from "element-ui";
export default {
  components: {
    ElTree: Tree,
  },
  props: {
    expandAll: {
      type: Boolean,
      default: false,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    // 配置项
    defaultProps: {
      type: Object,
      default: () => ({
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      }),
    },
    defaultNodeKey: {
      type: [Number, String],
      default: 0,
    },
    propsLeft: {
      type: Number,
      default: 10,
    },
    btnIsShow: {
      type: Object,
      default: () => ({ isAdd: true, isEdit: true, isDel: true }),
    },
    isRightClick: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    treeData: {
      handler: function () {
        this.defaultExpandedKeys = !this.nodeExpandArr.length
          ? [this.treeData[0] && this.treeData[0].tag]
          : this.nodeExpandArr;
      },
      // handler: function () {
      //   this.defaultExpandedKeys = !this.nodeExpandArr.length
      //     ? [this.treeData[0] && this.treeData[0].tag]
      //     : this.nodeExpandArr;
      // },
      deep: true,
    },
  },
  data() {
    return {
      defaultExpandedKeys: [], //默认勾选的节点的 key 的数组
      nodeExpandArr: [],
      visible: false,
      popover: {
        top: "0px",
        right: "0px",
        left: "0px",
        zIndex: "1000",
        position: "fixed",
      },
      eles: null,
      rightItem: {}, //右击时选中的条目
    };
  },
  mounted() {
    let func = () => {
      this.visible = false;
    };
    document.body.addEventListener("click", func);
    this.$on("hook:beforeDestroy", () => {
      document.body.removeEventListener("click", func);
    });
  },
  methods: {
    // 鼠标左击事件
    leftClick(item, value, element) {
      this.visible = false;
      this.$refs.tree.setCurrentKey(item.tag); // 设置默认选中
      this.$emit("leftClick", {
        item,
        value,
        element,
      });
    },
    // 鼠标右击事件
    rightClick(event, item, node, element) {
      if (this.isRightClick) {
        this.rightItem = item;
        this.$emit("rightClick", {
          event,
          item,
          node,
          element,
        });
        setTimeout(() => {
          let eles = document.querySelectorAll(".el-tree-popover");
          if (eles.length) {
            for (let i = 0; i < eles.length; i++) {
              eles[i].style.display = "none";
            }
            /* 菜单定位基于鼠标点击位置 */
            let left = event.clientX + this.propsLeft;
            if (left > window.innerWidth - 100) {
              left = event.clientX - 150;
            }
            let top = event.clientY - 75;
            if (top > window.innerHeight - 100) {
              top = event.clientY - 150;
            }
            this.popover.left = left + "px";
            this.popover.top = top + "px";
            this.popover.right = "30px";
            this.$refs.popover.style.display = "block";
            this.visible = true;
          }
        });
      }
    },
    /**
     * 以下两个方法是为了解决操作节点后重新请求数据节点状态回到初始状态的问题
     */
    // 展开节点
    nodeExpand(data, node, ele) {
      this.$set(ele, "expanded", true);
      if (node.expanded) {
        this.nodeExpandArr.push(data.tag);
        this.nodeExpandArr = this.$utils.unique(this.nodeExpandArr);
      }
    },
    // 收起节点
    nodeCollapse(data, node, ele) {
      if (this.nodeExpandArr.length > 0) {
        for (var i = 0; i < this.nodeExpandArr.length; i++) {
          if (this.nodeExpandArr[i] == data.tag) {
            this.nodeExpandArr.splice(i, 1);
            this.$set(ele, "expanded", false);
          }
        }
      }
    },
    // 新增/编辑/删除子集
    handleFun(t) {
      this.visible = false;
      this.$emit("handleFun", { ...this.rightItem, type: t });
    },
  },
};
</script>

<style scoped lang="scss">
.home-right-item-btn {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    color: $main !important;
  }
}
::v-deep .el-popover {
  padding: 0 !important;
}

.el-tree-popover {
  width: 120px;
  padding: 11px;
  background: #fff;
}
</style>
