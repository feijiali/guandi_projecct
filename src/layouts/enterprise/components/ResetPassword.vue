<template>
  <n-dialog
    ref="dialog"
    :diaTit="'修改密码'"
    :diaWidth="'20%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <el-form ref="ruleform" class="el-form-box" :model="ruleform">
            <el-form-item class="form-item-long" label="旧密码：">
              <el-input
                placeholder="请输入"
                v-model="ruleform.account_password"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long" label="新密码：">
              <el-input
                placeholder="请输入"
                v-model="ruleform.password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="d-flex justify-content-center">
            <n-button
              class="mt-5 ml-3"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleform: {},
      formValidation: [
        {
          must: ["account_password", "password"],
          tip: ["请输入旧密码", "请输入新密码"],
        },
      ],
    };
  },
  methods: {
    submitFun() {
      let subdata = {};
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let pwdRegex =
          /^.*(?=.{12,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[$~!@#${'$'}%\[^&*()_+{}\]|:<>;'?,-./=]).*$/;
        if (this.ruleform.password) {
          if (/[\u4E00-\u9FA5]/g.test(this.ruleform.password)) {
            this.$tip({
              isTip: true,
              message: "不能输入汉字",
            });
            this.ruleform.password = "";
            return;
          } else {
            if (pwdRegex.test(this.ruleform.password)) {
            } else {
              this.$tip({
                isTip: true,
                message: "密码至少12位，必须包含字母、数字和特殊符号！",
              });
              this.ruleform.password = "";
              return;
            }
          }
        }
        subdata.password = this.$utils.calcuMD5(this.ruleform.password);
        subdata.account_password = this.$utils.calcuMD5(
          this.ruleform.account_password
        );
        this.updatePassword(subdata);
      }
    },
    //修改密码
    async updatePassword(data) {
      let res = await api.updatePassword(data);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          // 退出重新登录
          setTimeout(() => {
            this.$store.dispatch("user/loginOut");
            this.$router.linkTo("login");
          }, 1000);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
