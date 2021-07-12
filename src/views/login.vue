<template>
  <div
    class="login-container position-fixed top-0 left-0 right-0 bottom-0 d-flex-cen"
  >
    <div class="loginbg w-100 h-100 clear">
      <img src="@/assets/images/bg_login.png" alt />
    </div>
    <div class="login-box-text-hover-primary w-100 h-100">
      <div class="logo_box d-flex-cen">
        <img class="logo_img" src="@assets/images/login_logo.png" />
      </div>
      <div class="login_content_box position-relative" v-show="isCodeModel">
        <div class="login_title_box">
          <img
            class="down-img position-absolute cursor-p"
            src="@assets/images/btn_login_code.png"
            @click="switchFun"
          />
          <p class="login_title">登录账号</p>
          <p class="mr-1">
            扫码下载APP<i class="iconfont btn-btn_arrow_right ml-05"></i>
          </p>
        </div>
        <div
          class="account-wrapper pl-1 pr-1 bg-white d-flex align-items-center mt-4"
        >
          <i class="iconfont btn-icon_leftbar_people vertical-middle"></i>
          <el-input
            autocomplete="off"
            type="text"
            placeholder="请输入手机号"
            v-model.trim="account"
            class="flex-fill font-16"
          ></el-input>
        </div>
        <div
          class="account-wrapper mt-2 pl-1 pr-1 bg-white d-flex justify-content-between"
        >
          <div class="d-flex align-items-center code_inp">
            <i class="iconfont btn-icon_topbar_password vertical-middle"></i>
            <el-input
              style="width: 240px !important"
              placeholder="请输入验证码"
              type="text"
              v-model.trim="sms_code"
              class="flex-fill font-16"
            >
            </el-input>
          </div>
          <div
            class="code d-flex align-items-center cursor-p"
            @click="!disabled && getCode()"
          >
            <div class="text-hover-primary px-2">{{ btnTitle }}</div>
          </div>
        </div>
        <!-- <div class="switch_box mt-3">
          <el-switch v-model="remember"></el-switch>
          <p class="font-14 ml-05">记住登录状态</p>
        </div> -->
        <el-button class="login-button" type="primary" @click="loginFun"
          >登录</el-button
        >
      </div>
      <div class="login_content_box position-relative" v-show="!isCodeModel">
        <div class="flexcen">
          <img
            class="down-img position-absolute cursor-p"
            src="@assets/images/btn_login_account.png"
            @click="switchFun"
          />
          <p class="mr-4">扫码下载APP</p>
        </div>
        <div class="flexcen">
          <img
            src="https://build.cninct.com/GUANDI/appDown/qrcode.png"
            class="login-code-img mt-4 mb-4"
          />
        </div>
        <div class="login-code-title flex-column flexcen">
          <p>打开手机微信或QQ</p>
          <P class="mt-05">扫码下载手机客户端</P>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { Base64 } from "js-base64";
import { Loading } from "element-ui";

export default {
  props: {},
  data() {
    return {
      account: "", //账号
      sms_code: "", //密码
      remember: true,
      isShowTip: true, //是否显示扫码下载APP
      isCodeModel: true, //当前是否是扫码界面
      isShowTipTop: true, //顶部浏览器提示
      isShow: false, //密码是否可见
      btnTitle: "获取验证码",
      disabled: false, //是否可点击
      loading: false,
    };
  },
  mounted() {
    // if (APIUtility.SendCommand && window.bim_model) {
    //   APIUtility.SendCommand(APIUtility.APICommand.CaptureAllKeyboardInput, '0', this);
    // }
    // this.getCookie();
  },
  created() {
    let that = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.loginFun(); // 登录方法名
        return false;
      }
    };
    this.$on("hook:beforeDestroy", () => {
      document.onkeypress = null;
    });
  },

  methods: {
    inputFun() {},
    // 倒计时
    validateBtn() {
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "获取验证码";
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    // 点击发送验证码
    async getCode() {
      if (this.validatePhone()) {
        let { result } = await api.getLoginSmsCode({
          account: this.account,
          verify: 0, //是否校验电话号码:1需要校验
        });
        this.validateBtn(); //倒计时
        this.$tip({
          isTip: true,
          message: "验证码发送成功",
        });
        return;
      }
    },
    // 点击切换扫码界面
    switchFun() {
      this.isCodeModel = !this.isCodeModel;
    },
    validatePhone() {
      if (!this.account) {
        this.$tip({
          isTip: true,
          message: "请输入手机号",
        });
        return false;
      }
      if (!this.$utils.vailPhone(this.account)) {
        this.$tip({
          isTip: true,
          message: "请输入有效的电话号码",
        });
        this.account = "";
        return false;
      }
      return true;
    },
    async loginFun() {
      let params = {
        account: this.account,
        sms_code: this.sms_code,
      };
      // let params = {
      //   account: this.account,
      //   account_password: this.$utils.calcuMD5(this.sms_code),
      // };

      this.validatePhone();
      if (!this.sms_code) {
        this.$tip({
          isTip: true,
          message: "请输入验证码",
        });
        return;
      }
      try {
        // 登录
        this.loading = Loading.service({
          text: "正在登录中...",
        });
        let res = await this.$store.dispatch("user/_login", params);
        if (this.loading) {
          this.loading.close();
        }
        // 设置用户签名
        this.$store.dispatch(
          "user/set_account_sign",
          res.result[0].account_sign_url
        );
        this.$store.dispatch(
          "user/set_account_sign_name",
          res.result[0].account_sign
        );
        // 保存用户角色
        this.$store.dispatch(
          "user/set_account_characer_type",
          res.result[0].account_character_type
        );
        // 保存用户应用范围
        this.$store.dispatch(
          "user/set_account_range_type",
          res.result[0].account_range_type
        );
        // // 设置cookie
        // this.setCookie({
        //   account: Base64.encode(this.account),
        //   sms_code: Base64.encode(this.sms_code),
        //   time: Date.now() + 1000 * 60 * 60 * 24 * 7,
        //   remember: this.remember,
        // });
        // 获取用户所在节点信息
        await this.queryAccountToOrgan();

        // 获取进入系统
        // await this.getSubjectData();
        await this.enterSystem(res);
      } catch (error) {
        if (this.loading) {
          this.loading.close();
        }
        this.$tip({
          isTip: true,
          message: error.message,
        });
      }
    },
    // 获取到根节点id
    async queryAccountToOrgan() {
      let data = await api.queryAccountToOrgan({});
      this.$store.dispatch(
        "app/set_rootorganName",
        data.result[0] ? data.result[0].organ : ""
      );
      this.$store.dispatch(
        "app/set_rootorganid",
        data.result[0] ? data.result[0].organ_id : 0
      );
      this.$store.dispatch(
        "app/set_organid",
        data.result[0] ? data.result[0].organ_id : 0
      );
    },
    // 查询此人是否有权限进入项目级
    async enterSystem(res) {
      let data = await api.queryAccountProject({
        organ_id: res.result[0].organ_id,
      });
      await this.$store.dispatch("user/GetPermissionList", {
        id: data.result[0] ? data.result[0].organ_id : "",
      });
      //返回了值表示此人是项目级人员
      if (data.result[0]) {
        // 获取项目id
        this.$store.dispatch("app/set_organid", data.result[0].organ_id);
        this.$store.dispatch("app/set_rootorganid", data.result[0].organ_id);
        this.$store.dispatch(
          "app/set_login_organ_type",
          data.result[0].organ_type
        );
        this.$store.dispatch(
          "app/set_organ_rns_id",
          data.result[0].organ_rns_id
        );
        this.$store.dispatch("user/set_user_project", 1);
        this.$store.dispatch("app/set_project_id", data.result[0].project_id);
        this.$store.dispatch("app/set_project_name", data.result[0].project);
        this.$store.dispatch(
          "app/set_project_logo",
          data.result[0].project_logo_list[0]
            ? data.result[0].project_logo_list[0].url
            : ""
        );
        this.$store.dispatch(
          "app/set_project_classify",
          data.result[0].project_classify
        );
        if (!data.result[0].project) {
          this.$tip({
            isTip: true,
            message: "抱歉,您当前所在的组织架构没有关联项目!",
          });
          return;
        }
        if (!data.result[0].organ_id) {
          this.$tip({
            isTip: true,
            message: "抱歉,您当前所在的项目没有关联组织架构!",
          });
          return;
        }
        // this.$router.replace({ name: 'project_summary' });
        // 若是项目级，则进入项目级首页
        if (this.$store.getters.permissionList.length) {
          this.$router.replace({ name: "project_summary" });
        } else {
          this.$store.dispatch("user/loginOut");
          this.$tip({
            isTip: true,
            message: "抱歉,您没有权限进入,请联系管理员为您分配权限!",
          });
          return;
        }
        // if (this.$route.query.redirect) {
        //   this.$router.linkTo(this.$route.query.redirect);
        // } else {
        //   if (this.$store.getters.permissionList.length) {
        //     this.$router.replace({ name: 'project_summary' });
        //   } else {
        //     this.$store.dispatch('user/loginOut');
        //     this.$tip({
        //       isTip: true,
        //       message: '抱歉,您没有权限进入,请联系管理员为您分配权限!'
        //     });
        //     return;
        //   }
        // }
        return;
      } else {
        //否则是企业级人员
        this.$store.dispatch("user/set_user_enterprise", 1);
        // this.$router.replace({ name: "enterprise_summary" });
        if (this.$store.getters.permissionList.length) {
          this.$router.replace({ name: "enterprise_summary" });
        } else {
          this.$store.dispatch("user/loginOut");
          this.$tip({
            isTip: true,
            message: "抱歉,您没有权限进入,请联系管理员为您分配权限!",
          });
          return;
        }
        // if (this.$route.query.redirect) {
        //   this.$router.linkTo(this.$route.query.redirect);
        // } else {
        //   this.$store.dispatch("user/set_user_enterprise", 1);
        //   if (this.$store.getters.permissionList.length) {
        //     this.$router.replace({ name: "enterprise_summary" });
        //   } else {
        //     this.$store.dispatch("user/loginOut");
        //     this.$tip({
        //       isTip: true,
        //       message: "抱歉,您没有权限进入,请联系管理员为您分配权限!",
        //     });
        //     return;
        //   }
        // }
      }
    },
    //设置cookie
    // setCookie(info) {
    //   let name = Base64.encode("account_pwd");
    //   localStorage.setItem(name, Base64.encode(JSON.stringify(info)));
    // },

    //读取cookie
    // getCookie() {
    //   let name = Base64.encode("account_pwd");
    //   let info = localStorage.getItem(name);
    //   if (info) {
    //     info = JSON.parse(Base64.decode(info));
    //     if (Date.now() < info.time) {
    //       this.account = Base64.decode(info.account);
    //       this.this.sms_code = Base64.decode(info.this.sms_code);
    //       this.remember = info.remember;
    //     }
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url("../assets/images/bg_login.png");
  .logo_box {
    height: 200px;
    .logo_img {
      width: 600px;
    }
  }
  .loginbg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    img {
      float: left;
      width: 100%;
      height: 100%;
    }
  }
  .login-box-text-hover-primary {
    .login-left-img {
      left: 8%;
      top: 15%;
      width: 800px;
    }
    .login_content_box {
      margin: auto;
      padding: 30px;
      border-radius: 8px;
      width: 400px;
      height: 45%;
      background-color: rgba(255, 255, 255, 0.6);
      top: 80px;
      // transition: top linear 0.5s;
      .login_title_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .login_title {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .down-img {
        top: 0;
        right: 0;
        width: 60px;
      }
      .code {
        position: relative;
        ::after {
          content: "";
          display: block;
          width: 1px;
          height: 14px;
          background: $color-3;
          position: absolute;
          top: 50%;
          margin-top: -7px;
          left: 0;
        }
      }
      .code_inp {
        width: 62%;
      }
      .login-button {
        width: 100%;
        border-radius: 100px;
        margin-top: 70px;
        border-color: transparent;
      }
      .switch_box {
        display: flex;
      }
      .account-wrapper {
        border-radius: 10px;
        border: solid 1px $greybg;
        opacity: 1;
      }
      ::v-deep .iconfont {
        font-size: 20px;
      }
      ::v-deep .el-input__suffix {
        right: 25px !important;
        top: 10px !important;
      }
      ::v-deep .el-input__inner:focus {
        outline: none;
        // border-color: $main !important;
      }
      ::v-deep .el-input__inner {
        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        font-size: 16px;
        color: $color-1;
      }
    }

    // 扫码界面
    .login-box-code {
      // visibility: hidden;
      // top: 65%;
      // z-index: -2;
    }
    .login-box-code-show {
      // visibility: visible;
      // top: 24%;
      // z-index: 20;
    }
    .login-code-img {
      width: 180px;
      height: 180px;
    }
    .login-code-title {
      color: $color-2;
      letter-spacing: 1px;
    }
  }
}
</style>
