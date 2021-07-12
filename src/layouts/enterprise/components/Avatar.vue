<template>
  <div class="h-100 d-flex-cen">
    <!-- 修改密码弹框 -->
    <vResetPassword ref="resetPassword" />
    <el-dropdown class="userDd mr-3 cursor-p">
      <div class="userDrop d-flex-cen">
        <el-avatar
          class="header-avatar vertical-middle mr-1"
          :src="avatar || avatorDefault"
        ></el-avatar>
        <span class="text-hover-primary ml-1">{{ userName }}</span>
      </div>
      <el-dropdown-menu solt="dropdown" class="header-el-dropdown">
        <el-dropdown-item
          v-for="(item, index) in menusDropArrPerson"
          :key="index"
        >
          <p
            @click="menusDropPersonFun(index)"
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
  </div>
</template>

<script>
import { Avatar } from "element-ui";
import { mapGetters } from "vuex";
import vResetPassword from "./ResetPassword";
import confirm from "@/mixins/confirm";

export default {
  mixins: [confirm],
  components: {
    vResetPassword,
    ElAvatar: Avatar,
  },
  computed: {
    ...mapGetters(["avatar", "userName"]),
  },
  data() {
    return {
      avatorDefault: require("@/assets/images/bg_mine_grey.png"),
      dropActive: 0, //输入移入的下标
      // 个人中心退出和修改密码
      menusDropArrPerson: [
        // {
        //   name: "修改密码",
        //   icon: "btn-icon_topbar_password",
        // },
        {
          name: "退出登录",
          icon: "btn-icon_topbar_exit",
        },
      ],
    };
  },
  methods: {
    menusDropPersonFun(ind) {
      if (ind === 0) {
        //修改密码
        // this.$refs.resetPassword.$refs.dialog.show();
        //退出登录
        this.logout();
      } else {
        //退出登录
        this.logout();
      }
    },
    // 退出登录
    logout() {
      this.confirm("", "", "是否确认退出？").then(() => {
        this.$store.dispatch("user/loginOut");
        this.$router.linkTo("login");
      });
    },
    mouseoverFun(ind) {
      this.dropActive = ind;
    },
  },
};
</script>

<style lang="scss">
.el-avatar {
  background: transparent !important;
}
.el-avatar > img {
  width: 100% !important;
  height: 100% !important;
}
</style>