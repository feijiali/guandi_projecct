<template>
  <div class="w-100 h-100 table-list-wrap">
    <v-sign ref="sign"></v-sign>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <el-form class="el-form-box" ref="ruleforms">
          <el-form-item class="form-item-long must" label="是否通过：">
            <el-radio-group v-model="ruleform.linkage_approve_state">
              <el-radio :label="2">同意</el-radio>
              <el-radio :label="1">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long must" label="审批签名：">
            <div
              @click="!$store.getters.account_sign && signatureFun()"
              class="
                border
                d-flex-cen
                rounded
                text-secondary
                cursor-p
                position-relative
              "
              style="width: 260px; height: 100px"
            >
              <div @click.stop v-if="$store.getters.account_sign">
                <div class="reSign position-absolute" @click="signatureFun">
                  重签
                </div>
                <viewer
                  :images="[$store.getters.account_sign]"
                  class="lookPic d-inline-block"
                >
                  <img
                    style="height: 70px; margin-right: 0; margin-bottom: 0"
                    :src="item"
                    alt
                    v-for="(item, index) in [$store.getters.account_sign]"
                    :key="index + 'image'"
                    class="layer-info-img"
                  />
                </viewer>
              </div>
              <template v-if="!$store.getters.account_sign">
                设置签名
              </template>
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="审批意见：">
            <el-input
              v-model="ruleform.linkage_approve_remark"
              type="textarea"
              placeholder="请输入"
              rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import vSign from "@/components/common/Sign";

export default {
  components: {
    vSign,
  },
  mixins: [confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      title: "联动月报表审批",
      //   revise_info_id: Number(this.Base64.decode(this.$route.query.id)),
      infoData: {},
      ruleform: {
        linkage_approve_id: this.$route.query.linkageid,
        linkage_approve_type: this.$route.query.type,
        approve_linkage_id_un: parseInt(
          this.Base64.decode(this.$route.query.id)
        ),
        linkage_approve_state: 2,
        linkage_approve_pic: "", //审批记录表-审批签名图片
        linkage_approve_remark: "", //审批记录表-备注
        linkage_approve_account_id_un: Number(this.$store.getters.account_id),
      },
      rules: {
        linkage_approve_state: [
          {
            required: true,
            message: "请选择是否通过",
          },
        ],
        linkage_approve_pic: [
          {
            required: true,
            message: "请上传审批签名",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    submitFun() {
      this.ruleform.linkage_approve_pic =
        this.$store.getters.account_sign || "";
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.UpdateProjectInfoProjectLinkageApprove(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
