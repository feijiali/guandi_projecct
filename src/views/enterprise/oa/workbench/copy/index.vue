<template>
  <div class="w-100 h-100 table-list-wrap">
    <v-sign ref="sign"></v-sign>
    <n-dialog
      ref="dialog"
      :diaTit="'选择接收人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="chooseperson"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <el-form class="el-form-box" ref="ruleforms">
          <el-form-item
            class="form-item-long must form-item-long-height"
            label="单据名称："
          >
            <span>{{ revise_info_title }}</span>
          </el-form-item>
          <el-form-item class="form-item-long must" label="接收人员：">
            <nAddItemContent @addFun="addPersons">
              <template slot="content-add">
                <div
                  class="content-item"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  <span>{{ item.account_name }}【{{ item.account_job }}】</span>
                  <i
                    class="iconfont btn-btn_detail_minus_02 font-20"
                    @click="reduceFun(index, item)"
                  ></i>
                </div>
              </template>
            </nAddItemContent>
          </el-form-item>
          <el-form-item class="form-item-long must" label="抄送签名：">
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
          <el-form-item class="form-item-long-small" label="抄送原因：">
            <el-input
              v-model="ruleform.revise_record_remark"
              type="textarea"
              placeholder="请输入"
              rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-center">
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
      titleArr: this.GLOBAL.titleArr,
      type: this.$route.query.types,
      title: "",
      revise_info_id: Number(this.Base64.decode(this.$route.query.id)),
      personList: [],
      personIDsArr: [],
      infoData: {},
      revise_info_title: "", //单据名称
      ruleform: {
        revise_info_id: Number(this.Base64.decode(this.$route.query.id)), //审批信息中间表id
        revise_record_state: null, //审批记录表-审批结果
        revise_record_name: "", //审批记录表-节点名称
        revise_record_content: "", //审批记录表-操作描述-(可不传，作为审批流程列表上的字段)
        revise_record_sign_pic: "", //审批记录表-审批签名图片
        revise_record_remark: "", //审批记录表-备注
        revise_record_to_account_ids: "", //审批记录表-相关人员id集合
      },
      rules: {
        account_ids: [
          {
            required: true,
            message: "请选择接收人",
          },
        ],

        revise_record_sign_pic: [
          {
            required: true,
            message: "请上传审批签名",
          },
        ],
      },
    };
  },
  created() {
    this.getApprovalInfo(); //查询审批信息
    this.title =
      this.titleArr.find((item) => item.key == this.type).name + "抄送";
  },
  methods: {
    // 点击➕展示人员选择弹框
    addPersons() {
      this.$refs.dialog.show();
      if (this.$refs.chooseperson) {
        this.$refs.chooseperson.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.chooseperson.setSelectPerson(this.personList);
        });
      }
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    // 删除人员
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.personList = [...nodes];
      this.$refs.dialog.cancel();
    },
    dialogClose() {
      this.$refs.chooseperson.choosePersonIDsArr = this.personIDsArr;
    },
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    async getApprovalInfo() {
      let res = await api.queryApproveReviseInfo({
        revise_info_id: this.revise_info_id,
      });
      this.revise_info_title = res.result[0].revise_info_title; //渲染流程名称
    },
    submitFun() {
      this.ruleform.revise_record_sign_pic =
        this.$store.getters.account_sign_name || "";
      this.ruleform.account_ids = this.personIDsArr.join(",");
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.copyApproveReviseInfo(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
          // this.$router.linkTo("enterprise_oa_workbench");
        },
      });
    },
  },
};
</script>
