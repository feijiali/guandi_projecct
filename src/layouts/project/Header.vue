<!--
 * @Autor: 邓易
 * @Date: 2020-11-18 09:03:23
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-28 17:59:13
-->
<template>
  <div class="h-100">
    <vHeaderMain
      class="d-flex flex-nowrap justify-content-between align-items-center z-index-2 position-relative bg-secondary"
      style="height: 40px;"
    />
  </div>
</template>

<script>
import vHeaderMain from '@/layouts/enterprise/HeaderMain';

import { hasPermissionArr } from '@/plugins/permission_tools.js';
export default {
  components: {
    vHeaderMain
  },

  mounted() {
    const menuData = this.getMenuData(this.$router.options.routes);
    this.menuData = menuData;
    // 存储获取到的菜单
    this.$store.dispatch('permission/SET_MENU_DATA', menuData);
  },
  methods: {
    //获取项目

    // 可以在这里加入权限的判断
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach(item => {
        if (item.meta && item.meta.prolevel) {
          if (!item.meta.permission || (item.meta.permission && hasPermissionArr(item.meta.permission))) {
            const newItem = { ...item };
            delete newItem.children;
            if (item.children) {
              // 递归路由
              newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
            }
            menuData.push(newItem);
          } else if (item.children) {
            let children = this.getMenuData(item.children, [...parentKeys, item.path]);
            if (children.length > 0) {
              const newItem = { ...item };
              delete newItem.children;
              if (item.children) {
                // 递归路由
                newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
              }
              menuData.push(newItem);
            }
          }
        } else if (item.children) {
          // 递归路由
          menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]));
        }
      });
      return menuData;
    }
  }
};
</script>

<style lang="scss" scoped></style>
