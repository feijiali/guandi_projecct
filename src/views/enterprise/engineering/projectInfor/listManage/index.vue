<template>
  <div class="w-100 h-100 clear">
    <div class="content-info-box h-100 position-relative">
      <div
        class="
          content-info-box-left
          bg-white
          rounded-1
          h-100
          py-2
          position-relative
          d-flex
          flex-column
        "
      >
        <div style="height: calc(100% - 60px)">
          <n-tree
            class="pr-2 mt-2"
            style="padding-bottom: 30px"
            :highlight-current="false"
            :treeData="treeData"
            @leftClick="leftClick"
            ref="treeNode"
            :defaultProps="defaultProps"
            :expandAll="true"
          ></n-tree>
        </div>
      </div>
      <div class="content-info-box-right rounded-1 h-100 table-list-wrap">
        <div
          class="p-1 d-flex justify-content-between bg-white rounded-1 mb-1"
          v-if="!$route.name.includes('handle')"
        >
          <ul class="sub-nav-ul clear">
            <li
              v-for="(item, index) in navs"
              :key="index"
              class="sub-nav-li-item"
              :class="{ active: $route.name.includes(item.active) }"
              @click="linkTo(item.link, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="w-100 flex-fill rounded-1">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import { hasPermissionArr } from "@/plugins/permission_tools";

export default {
  mixins: [confirm],
  data() {
    return {
      treeData: [], //人员组织架构数据
      project1: [], //自营项目
      project2: [], //合作项目
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      navs: [
        {
          name: "工程清单表",
          link: "enterprise_engineering_projectInfor_listManage_projectList",
          active: "engineering_projectInfor_listManage_projectList",
          permission: "ProjDetailListProjDetailMain",
        },
        {
          name: "拆分清单",
          link: "enterprise_engineering_projectInfor_listManage_splitList",
          active: "engineering_projectInfor_listManage_splitList",
          permission: "ProjDetailListProjDetailSplit",
        },
        {
          name: "分项清单",
          link: "enterprise_engineering_projectInfor_listManage_subitemList",
          active: "engineering_projectInfor_listManage_subitemList",
          permission: "ProjDetailListProjDetailDiff",
        },
      ],
      active: 0,
    };
  },
  async created() {
    await this.getOrganProjectData();
    // 获取人员组织架构图
    await this.getTreeData();
    this.navs = this.navs.filter((item) => {
      return hasPermissionArr([item.permission]);
    });
    if (this.$route.name === "enterprise_engineering_projectInfor_listManage") {
      this.linkTo(this.navs[0].link, 0);
    }
  },
  methods: {
    linkTo(name, index) {
      this.active = index;
      let item = this.$refs.treeNode.$refs.tree.getCurrentNode();
      this.$router.linkTo(name, { id: item.tag });
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.QueryOrganProjectTree({
        organ_type_node: "30",
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.project1 = result.filter((item) => item.node.project_classify == 1);
      this.project2 = result.filter((item) => item.node.project_classify == 2);
    },
    // 获取组织架构
    async getTreeData() {
      let { result } = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
        noOrganNodes: true,
      });

      let d = result[0];
      let arr = [];
      arr[0] = {
        tag: 1,
        leaves: [
          {
            tag: 0,
            leaves: this.project2,
            node: {
              organ: "合作项目",
              organ_id: 0,
            },
          },
          {
            tag: 2,
            leaves: this.project1,
            node: {
              organ: "自营项目",
              organ_id: 2,
            },
          },
        ],
        node: {
          organ: d.node.organ,
          organ_id: d.node.organ_id,
        },
      };
      this.treeData = arr;
      if (this.project2[0]) {
      }
      this.$nextTick(() => {
        this.$refs.treeNode.defaultExpandedKeys = [
          this.project2[0] ? this.project2[0].tag : this.project1[0].tag,
        ];
        this.$refs.treeNode.$refs.tree.setCurrentKey(
          this.project2[0] ? this.project2[0].tag : this.project1[0].tag
        );
      });
      this.$bus.$emit(
        "select_list",
        this.project2[0] ? this.project2[0] : this.project1[0]
      );
    },
    //单击左侧组织架构
    leftClick(obj) {
      // if (obj.item.tag != 0 && obj.item.tag != 1 && obj.item.tag != 2) {
      this.$bus.$emit("select_list", obj.item);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 300px;
  }

  .content-info-box-right {
    position: absolute;
    left: 308px;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
