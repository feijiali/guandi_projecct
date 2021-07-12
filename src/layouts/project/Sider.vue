<template>
  <div>
    <el-menu
      :unique-opened="true"
      class="el-menu-vertical-sider"
      :default-active="select_router_path"
      :collapse="app.isCollapse"
    >
      <template v-for="item in menuData2">
        <el-submenu
          v-if="
            item.children && item.children.length > 0 && !item.meta.noChildren
          "
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <!-- <span class="menu_before"></span> -->
            <i :class="item.meta.icon" style="font-size: 22px"></i>
            <span :title="item.meta.title" class="el-submenu-title">{{
              item.meta.title
            }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.path"
            :index="subitem.path"
            @click="linkTo(subitem)"
          >
            {{ subitem.meta.title }}
            <!-- <span class="menu_before"></span> -->
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          @click="linkTo(item)"
          v-else
          :key="item.path"
          :index="item.path"
        >
          <!-- <span class="menu_before"></span> -->
          <i :class="item.meta.icon" style="font-size: 22px"></i>
          <span
            slot="title"
            class="el-submenu-title"
            :title="item.meta.title"
            >{{ item.meta.title }}</span
          >
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import api from "@api/index";
export default {
  inject: ["app"],
  data() {
    return {
      router_name: "",
      select_router_path: "",

      selectedKeys: [],
      openKeysMap: {},
    };
  },
  async mounted() {
    this.setMenu();
  },
  watch: {
    $route(val, oldval) {
      this.setMenu();
    },
  },
  computed: {
    menuData() {
      return this.$store.getters.menuData;
    },
    menuData2() {
      return this.$store.getters.menuData;
    },
  },
  methods: {
    setMenu() {
      let route = this.$route.matched.find(
        (item) => item.meta && item.meta.prolevel == 1
      );
      let route_sub = this.$route.matched.find(
        (item) => item.meta && item.meta.prolevel == 2
      );
      let router_edit = this.$route.matched.find(
        (item) => item.meta && item.meta.select_path
      );
      if (router_edit && router_edit.meta.select_path && route) {
        // 新增和编辑或其他进入的页面
        this.select_router_path = router_edit.meta.select_path;
        let submenu = this.menuData.filter((item) => item.name == route.name);
        if (submenu[0] && submenu[0].children && route_sub) {
          let treemenu = submenu[0].children.filter(
            (item) => item.name == route_sub.name
          );
          if (treemenu[0] && treemenu[0].children) {
            this.$store.dispatch(
              "permission/SET_SUB_MENU_DATA",
              treemenu[0].children
            );
          } else {
            this.$store.dispatch(
              "permission/SET_SUB_MENU_DATA",
              submenu[0].children
            );
          }
        }
        return;
      } else if (route_sub && route_sub.path) {
        // 二级页面
        this.select_router_path = route_sub.path;
      } else if (route && route.path) {
        this.select_router_path = route.path;
      } else {
        this.select_router_path = "";
      }
      // 没有子菜单的页面
      if (this.menuData.length && (!route_sub || !route)) {
        let arr = this.menuData.filter((item) => item.name == this.router_name);
        if (arr[0] && arr[0].children) {
          let submenu = arr[0].children;
          if (submenu[0] && submenu[0].children) {
            let treemenu = submenu[0].children;
            if (treemenu[0] && treemenu[0].children) {
              // 跳转到四级（伪？）
              this.linkTo(
                route_sub
                  ? treemenu.find((item) => item.name == route_sub.name)
                  : treemenu[0]
              );
            } else {
              // 跳转到三级（伪？）
              this.linkTo(
                route
                  ? submenu.find((item) => item.name == route.name)
                  : submenu[0]
              );
            }
          }
        }
      }
    },
    linkTo(item) {
      let menuArr = [];
      if (item.children && item.children.length > 0) {
        menuArr = item.children;
        this.$store.dispatch("permision/SET_SUB_MENU_DATA", menuArr);
        if (item.redirect) {
          this.$router.linkTo(item.redirect.name);
        } else {
          this.$router.linkTo(item.children[0].name);
        }
      } else {
        this.$router.linkTo(item.name);
        this.$store.dispatch("permission/SET_SUB_MENU_DATA", menuArr);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none !important;
  background-color: $greybg !important;
  padding-left: 8px !important;
}

.el-menu-vertical-sider {
  .el-icon-arrow-down {
    display: none !important;
  }
  .el-menu-item {
    height: 45px !important;
    line-height: 45px !important;
    text-align: left;
    padding-left: 10px !important;
    color: $color-2 !important;
    margin-top: 10px;
    border-radius: 5px;
    .menu_before {
      position: absolute;
      display: inline-block;
      left: 0;
      width: 5px;
      height: 100%;
      background: transparent;
    }
    i {
      color: $color-2;
      margin-right: 10px;
    }
  }
  .el-submenu.is-active .el-submenu__title {
    border-bottom: none !important;
  }
  .el-menu-item.is-active,
  .el-menu-item.is-active:focus,
  .el-menu-item:hover {
    background: $main;
    color: white !important;
    .menu_before {
      background: $main;
    }
    .iconfont {
      color: white !important;
    }
  }
  .el-menu-item:hover {
    background: rgba(51, 119, 255, 0.6) !important;
  }

  .el-submenu {
    i {
      color: $color-2 !important;
      padding-left: 5px !important;
      margin-right: 10px;
    }

    .el-submenu__title {
      color: $color-2 !important;
      padding-left: 5px !important;
    }
    .el-submenu__title:hover {
      background: rgba(51, 119, 255, 0.6) !important;
      .iconfont,
      span {
        color: white !important;
      }
    }
    text-align: left;
    .el-menu-item {
      padding-left: 35px !important;
    }
  }
}
.el-menu--collapse {
  &.el-menu-vertical-sider {
    .el-menu-item {
      padding-left: 10px !important;
    }
    .el-submenu {
      .el-submenu__title {
        padding-left: 17px !important;
      }
    }
  }
}
.el-menu--vertical {
  .el-menu--popup {
    background: $main;
  }
}
</style>
