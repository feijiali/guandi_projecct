<template>
  <div class="d-flex nav-menu">
    <div class="mr-2 cursor-p font-20 text-hover-primary">
      <i
        :class="app.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="
          () => {
            this.app.changeCollapse();
          }
        "
      ></i>
    </div>
    <div
      class="cursor-p position-relative ml-6 font-14 nav-menu-item"
      :class="{
        'nav-menu-item-active': selectedKeys[0] && selectedKeys[0] == item.path,
      }"
      v-for="item in menuData"
      :key="item.path"
      @click="linkTo(item)"
    >
      {{ item.meta.title }}
      <span
        src="@/assets/images/enterprise/icon_homepage_topmenu_selected.png"
        class="position-absolute choose-icon"
        :class="{ active: selectedKeys[0] && selectedKeys[0] == item.path }"
      ></span>
    </div>
  </div>
</template>

<script>
import { hasPermissionArr } from "@/plugins/permission_tools.js";
import api from "@/api";
import setSubject from "@/mixins/setSubject";
import setOrganProject from "@/mixins/setOrganProject";
import setOrganTreedata from "@/mixins/setOrganTreedata";
export default {
  mixins: [setSubject, setOrganProject, setOrganTreedata],
  inject: ["app"],
  data() {
    this.selectedKeysMap = {};
    return {
      isCollapse: false,
      selectedKeys: [],
      openKeysMap: {},
      menuData: [],
    };
  },
  watch: {
    $route: {
      handler: function () {
        this.setSelectRoute();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.queryOrganTree();
    await this.getSubjectData(); //获取该项目下的项目信息（树形结构）
    await this.getOrganProjectData(); //获取该节点下的项目
    this.$store.commit("app/SET_SUBJECT_LABEL", "工程项目");
    await this.$store.dispatch("user/GetPermissionList", { id: "" });
    const menuData = this.getMenuData(this.$router.options.routes);
    this.menuData = menuData;
    // 存储获取到的菜单
    this.$store.dispatch("permission/SET_MENU_DATA", menuData);
    this.setSelectRoute();
  },
  methods: {
    setSelectRoute() {
      // 获取当前的一级菜单的名字
      let menuArr = this.$route.matched.filter(
        (item) => item.meta && item.meta.level == 1
      );
      if (menuArr[0]) {
        this.selectedKeys = this.selectedKeysMap[menuArr[0].path]
          ? this.selectedKeysMap[menuArr[0].path]
          : [];
      } else {
        this.selectedKeys = [];
        if (this.$route.meta && this.$route.meta.notmenu) {
        } else {
          this.linkTo(this.menuData[0]);
        }
      }
    },
    // 可以在这里加入权限的判断
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach((item) => {
        if (item.meta && item.meta.level) {
          // 如果没有配置权限或者登录者有这个权限
          if (
            !item.meta.permission ||
            (item.meta.permission && hasPermissionArr(item.meta.permission))
          ) {
            this.openKeysMap[item.path] = parentKeys;
            this.selectedKeysMap[item.path] = [selectedKey || item.path];
            const newItem = { ...item };
            delete newItem.children;
            if (item.children) {
              // 递归路由
              newItem.children = this.getMenuData(item.children, [
                ...parentKeys,
                item.path,
              ]);
            }
            menuData.push(newItem);
          } else if (item.children) {
            let children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
            if (children.length > 0) {
              this.openKeysMap[item.path] = parentKeys;
              this.selectedKeysMap[item.path] = [selectedKey || item.path];
              const newItem = { ...item };
              delete newItem.children;
              if (item.children) {
                // 递归路由
                newItem.children = this.getMenuData(item.children, [
                  ...parentKeys,
                  item.path,
                ]);
              }
              menuData.push(newItem);
            }
          }
        } else if (item.children) {
          // 递归路由
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    },
    linkTo(item) {
      this.selectedKeys = this.selectedKeysMap[item.path];
      if (item.children && item.children.length) {
        this.$router.linkTo(item.children[0].name);
      } else {
        this.$router.linkTo(item.name);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nav-menu {
  position: relative;
  padding: 0 0 0 20px;
  line-height: 40px;
  height: 40px;
  color: $color-1;
  box-shadow: 0px 0px 0px 0px #cbd0dc;
  z-index: 50;
  .nav-menu-item {
    color: $color-1;
  }
  .nav-menu-item-active {
    color: $main;
    font-weight: bolder;
    font-size: 20px;
  }
  .choose-icon {
    visibility: hidden;
  }
  .active {
    visibility: visible;
    width: 24px;
    height: 4px;
    bottom: 0;
    left: calc(50% - 12px);
    background-color: $main;
    border-radius: 20px;
  }
}
</style>
