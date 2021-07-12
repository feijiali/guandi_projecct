<template>
  <div class="content-info-box position-relative h-100">
    <div class="content-info-box-left bg-white rounded-1 p-1">
      <div class="grey2">
        <n-button
          class="ml-2"
          :btnText="'新建文件夹'"
          colorBtn="blue"
          v-permission="['InformationResources-upload']"
          @buttonClick="newHolder"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
          </template>
        </n-button>
      </div>
      <div class="person-tree-box">
        <n-scroll>
          <n-tree
            :organize="true"
            :highlight-current="false"
            :treeData="treeData"
            :defaultProps="defaultProps"
            ref="treeNode"
            @leftClick="leftClick"
            :defaultExpandedKeys="defaultExpandedKeySingle"
            :defaultNodeKey="defaultNodeKey"
          ></n-tree>
        </n-scroll>
      </div>
    </div>
    <div class="content-info-box-right rounded-1">
      <keep-alive>
        <router-view v-if="$route.meta.needAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.needAlive"></router-view>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "information_resources_name",
      },
      defaultExpandedKeySingle: [], // 默认展开的单选树节点的 key 的数组
      defaultNodeKey: 0, // 当前选中的节点
      treeData: [], // 人员组织架构数据
      itemNode: {}, // 当前左侧组织架构中的节点对象
    };
  },
  created() {
    // 获取材料树
    this.queryInformationResourcesTree();
  },
  activated() {},
  mounted() {
    this.$bus.$on("changeTag", this.queryInformationResourcesTree);
    this.$bus.$on("Tag", this.tagFun);
  },
  beforeDestroy() {
    this.$bus.$off("changeTag");
    this.$bus.$off("Tag");
  },
  methods: {
    tagFun(val) {
      this.$refs.treeNode.$refs.tree.setCurrentKey(val.tag);
      this.itemNode = val;
    },
    // 获取材料树
    async queryInformationResourcesTree() {
      const data = await api.queryInformationResourcesTree({
        material_type: 10,
      });
      this.treeData = data.result;
      // 重新拿到数据后设置当前选中的节点
      // JSON.stringify(this.itemNode) == "{}" && (this.itemNode = data.result[0]);
      // if (data.result[0]) {
      //   this.$nextTick(() => {
      //     JSON.stringify(this.itemNode) == "{}"
      //       ? this.$refs.treeNode.$refs.tree.setCurrentKey(data.result[0].tag)
      //       : this.$refs.treeNode.$refs.tree.setCurrentKey(this.itemNode.tag);
      //   });
      //   // 获取展开的节点数组(若没有点击过【初始进来】则执行expandedKeysData方法取第二层级的节点；否则就拿存的展开的节点数组
      //   this.defaultExpandedKeySingle = this.$refs.treeNode.nodeExpandArr.length
      //     ? this.$refs.treeNode.nodeExpandArr
      //     : this.expandedKeysData();
      //   // this.listQuery.material_node = this.itemNode.tag;
      // }
    },
    // 处理树形数据默认展开节点
    expandedKeysData() {
      if (this.treeData.length === 1) {
        return [this.treeData[0].tag];
      }
    },
    // 单击左侧组织架构
    async leftClick(obj) {
      const userId = this.$store.state.user.account_id;
      const { item } = obj;
      const controlPermission =
        item.node.information_resources_full_contro == "*"
          ? true
          : item.node.information_resources_full_contro
              .split(",")
              .findIndex((item) => item == userId) != -1;
      const accessPermission =
        item.node.information_resources_access_contro == "*"
          ? true
          : item.node.information_resources_access_contro
              .split(",")
              .findIndex((item) => item == userId) != -1;
      const modifyPermission =
        item.node.information_resources_update_contro == "*"
          ? true
          : item.node.information_resources_update_contro
              .split(",")
              .findIndex((item) => item == userId) != -1;
      if (!controlPermission && !accessPermission && !modifyPermission) {
        this.$tip({
          isTip: true,
          message: "您没有权限查看",
        });
        this.$bus.$emit("refreshList");
        this.itemNode = {};
        return;
      }
      this.itemNode = item;
      //  this.fileAccess = (row.controlPermission || row.modifyPermission)?true:false;
      this.$bus.$emit("refreshList", {
        tag: item.tag,
        fileAccess: !!(controlPermission || modifyPermission),
        fileDel: controlPermission,
      });
      // this.$router.linkTo("enterprise_oa_infoResources_informationList", {
      //   id: item.tag,
      // });
    },
    newHolder() {
      this.$router.linkTo(
        "enterprise_oa_infoResources_newHolder",
        this.itemNode.tag
          ? {
              pid: this.itemNode.tag,
              tagName: this.itemNode.node.information_resources_name,
            }
          : ""
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.person-tree-box {
  margin-top: 10px;
  height: calc(100% - 80px);
  width: 257px;
}
.notice:hover {
  color: #3377ff;
  background: #f1f0f5;
}
.active {
  color: #3377ff;
  background: #f1f0f5;
}
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0px;
    top: 0px;
    width: 300px;
    .grey2 {
      line-height: 22px;
    }

    .tip-icon {
      width: 15px;
    }
  }
  .content-info-box-right {
    position: absolute;
    left: 314px;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
