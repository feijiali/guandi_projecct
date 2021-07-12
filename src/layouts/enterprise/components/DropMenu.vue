<template>
  <el-dropdown class="userDd mr-2 cursor-p">
    <div class="userDrop d-flex-cen">
      <i
        class="iconfont btn-icon_topbar_menu text-hover-primary news-icon d-inline-block"
      ></i>
    </div>
    <el-dropdown-menu solt="dropdown" class="header-el-dropdown">
      <el-dropdown-item v-for="(item, index) in menusDropArr" :key="index">
        <p
          v-if="hasPermissionArr([item.permission])"
          @click="menusDropFun(item)"
          @mouseover="mouseoverFun(index)"
          class="dropdown-menu-item"
          :class="{
            'dropdown-menu-item-active': dropActive == index,
          }"
        >
          <i :class="[item.icon]" class="iconfont vertical-middle"></i>
          {{ item.name }}
        </p>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  data() {
    return {
      menusDropArr: [
        {
          name: "组织架构",
          permission: "Organ",
          icon: "btn-icon_topbar_group",
          link: "enterprise_organization",
        },
        {
          name: "权限配置",
          permission: "Authority",
          icon: "btn-icon_topbar_permission",
          link: "enterprise_authority",
        },
        {
          name: "审批配置",
          permission: "ApproveProcess",
          icon: "btn-icon_topbar_attence",
          link: "enterprise_approval",
        },
        {
          name: "消息配置",
          permission: "MessageMsgConfig",
          icon: "btn-icon_topbar_message",
          link: "enterprise_messageConfig",
        },
        {
          name: "周设置",
          permission: "WeekManageSetUp",
          icon: "btn-icon_topbar_message",
          link: "enterprise_weeksetting",
        },
      ],
      dropActive: 0, //输入移入的下标
    };
  },
  methods: {
    hasPermissionArr,
    mouseoverFun(ind) {
      this.dropActive = ind;
    },
    // 点击下拉框列表
    menusDropFun(item) {
      this.$router.linkTo(item.link);
    },
  },
};
</script>

<style lang="scss" scoped>
.news-icon {
  background-color: $color-5;
  border-radius: 100%;
  font-size: 20px !important;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: rgba(51, 119, 255, 0.2);
}
.header-el-dropdown {
  .dropdown-menu-icon {
    margin-right: 5px;
  }
  .dropdown-menu-item-active {
    color: $main;
    .iconfont {
      color: $main;
    }
  }
}
</style>