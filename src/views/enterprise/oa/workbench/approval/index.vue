<template>
  <div class="w-100 h-100 table-list-wrap">
    <v-sign ref="sign"></v-sign>
    <n-dialog
      ref="dialog"
      :diaTit="'选择下步节点'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="wall">
          <div class="ml-1">
            <el-form class="el-form-box" inline :model="ruleform">
              <!-- <div class="clear" v-if="ruleform.next_approve_level">
                <el-form-item class="lt mt-2">
                  <span class="grey2 disi label-l must">下步节点：</span>
                  <el-input
                    readonly
                    class="input-m"
                    v-model="ruleform.next_approve_level.revise_info_now_name"
                    placeholder="请选择"
                  ></el-input>
                </el-form-item>
              </div> -->
              <div
                class="clear mt-2"
                v-if="
                  ruleform.next_approve_level &&
                  ruleform.next_approve_level.revise_account_review_type != 3
                "
              >
                <el-form-item class="lt mt-2">
                  <span class="grey2 disi label-l must">下步处理人：</span>
                  <el-select
                    v-model="revise_account_review_account_ids"
                    v-if="
                      ruleform.next_approve_level.revise_account_review_type ==
                      2
                    "
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in nextHandlerList"
                      :key="index"
                      :label="item.account_name"
                      :value="item.account_id"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="revise_account_review_account_id"
                    v-else-if="
                      ruleform.next_approve_level.revise_account_review_type ==
                      1
                    "
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in nextHandlerList"
                      :key="index"
                      :label="item.account_name"
                      :value="item.account_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
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
        </n-scroll>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <el-form class="el-form-box" ref="ruleforms">
          <!-- <el-form-item
            class="form-item-long must form-item-long-height"
            label="单据名称："
          >
            <span>{{ ruleform.revise_info_title }}</span>
          </el-form-item> -->
          <el-form-item class="form-item-long must" label="是否通过：">
            <el-radio-group v-model="ruleform.revise_record_state">
              <el-radio-button :label="4">是</el-radio-button>
              <el-radio-button :label="6">否</el-radio-button>
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
              v-model="ruleform.revise_record_remark"
              type="textarea"
              placeholder="请输入"
              rows="4"
            ></el-input>
          </el-form-item>
          <template v-if="isNext && ruleform.revise_record_state == 4">
            <!-- <div class="clear" v-if="ruleform.next_approve_level">
              <el-form-item class="form-item-long must" label="下步节点：">
                <el-input
                  readonly
                  class="input-m"
                  v-model="ruleform.next_approve_level.revise_info_now_name"
                  placeholder="请选择"
                ></el-input>
              </el-form-item>
            </div> -->
            <div
              class="clear mt-2"
              v-if="
                ruleform.next_approve_level &&
                ruleform.next_approve_level.revise_account_review_type != 3
              "
            >
              <el-form-item class="form-item-long must" label="下步处理人：">
                <el-select
                  v-model="revise_account_review_account_ids"
                  v-if="
                    ruleform.next_approve_level.revise_account_review_type == 2
                  "
                  multiple
                  collapse-tags
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in nextHandlerList"
                    :key="index"
                    :label="item.account_name"
                    :value="item.account_id"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="revise_account_review_account_id"
                  v-else-if="
                    ruleform.next_approve_level.revise_account_review_type == 1
                  "
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in nextHandlerList"
                    :key="index"
                    :label="item.account_name"
                    :value="item.account_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </template>
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
      titleArr: this.GLOBAL.titleArr,
      type: this.$route.query.types,
      t: Number(this.$route.query.t),
      title: "",
      revise_info_id: Number(this.Base64.decode(this.$route.query.id)),
      infoData: {},
      ruleform: {
        revise_info_id: Number(this.Base64.decode(this.$route.query.id)), //审批信息中间表id
        revise_record_state: null, //审批记录表-审批结果
        revise_record_name: "", //审批记录表-节点名称
        revise_record_content: "", //审批记录表-操作描述-(可不传，作为审批流程列表上的字段)
        revise_record_sign_pic: "", //审批记录表-审批签名图片
        revise_record_remark: "", //审批记录表-备注
        revise_record_to_account_ids: "", //审批记录表-相关人员id集合
        next_approve_level: {
          revise_info_now_level: 0, //审批信息中间表-当前层级
          revise_info_now_name: "", //审批信息中间表-当前节点
          revise_info_now_time: "", //审批信息中间表-到达当前层级的时间
          revise_account_review_account_ids: "", //审批信息中间表-审批人员关联
          revise_account_review_type: 0, //审批信息中间表-审批类型：1 单人审批(多个指定人) 2：多人审批 3:公示(隐藏类型) 4：公示后的单人审批（单个自定人）
        },
        ext_data: "", //特殊的参数，可能是json or 字符串
      },
      rules: {
        revise_record_state: [
          {
            required: true,
            message: "请选择是否通过",
          },
        ],
        revise_record_sign_pic: [
          {
            required: true,
            message: "请上传审批签名",
          },
        ],
      },
      revise_account_review_account_ids: [], //下步处理人(多人)
      revise_account_review_account_id: null, //下步处理人(单人)
      isNext: true, //是否提交给下一个人
      nextHandlerList: [], //下步处理人数组
      isShowCode: false, //是否显示困难编号
      revise_info_accessory_id: null, //主表ID
    };
  },
  created() {
    this.getApprovalInfo(); //查询审批信息
    this.title =
      this.titleArr.find((item) => item.key == this.type).name + "审批";
  },
  methods: {
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    async getApprovalInfo() {
      let res = await api.queryApproveReviseInfo({
        revise_info_id: this.revise_info_id,
      });
      this.revise_info_accessory_id = res.result[0].revise_info_accessory_id;
      // this.isShowCode =res.result[0].revise_info_total_level ==res.result[0].revise_info_now_level? true: false;
      // 若当前流程的审批人只有一个那么要显示下步节点
      res.result[0].account_list.length == 1
        ? (this.isNext = true)
        : (this.isNext = false);
      this.ruleform.revise_info_title = res.result[0].revise_info_title; //渲染流程名称
      this.ruleform.revise_record_name = res.result[0].revise_info_now_name; //当前节点名称
      if (res.result[0].account_list.length == 1) {
        this.isNext = true; //若当前流程的审批人只有一个那么要显示下步节点
        // 查询对应申请类型审批流程
        this.queryApproveProcess(
          res.result[0].revise_info_process_id_union,
          res.result[0].revise_info_now_level
        );
      } else {
        this.isNext = false;
      }
    },
    // 查询对应申请类型审批流程
    async queryApproveProcess(process_id, level) {
      let res = await api.queryApproveProcess({
        process_id: process_id,
      });
      let process_list = res.result[0].process_list;
      let ind = process_list.findIndex((item) => item.process_level == level);
      //如果当前流程处于最后一个流程，则不用显示下步节点等
      if (ind == process_list.length - 1) {
        this.isNext = false;
      } else {
        this.$set(this.ruleform, "next_approve_level", {});
        this.isNext = true;
        this.$set(
          this.ruleform.next_approve_level,
          "revise_info_now_level",
          process_list[ind + 1].process_level
        );
        this.$set(
          this.ruleform.next_approve_level,
          "revise_info_now_name",
          process_list[ind + 1].process_detail_name
        );
        this.$set(
          this.ruleform.next_approve_level,
          "revise_account_review_type",
          process_list[ind + 1].process_detail_type
        );
        this.nextHandlerList = process_list[ind + 1].account_list.filter(
          (item) => item.account_status != 2
        );
      }
      if (this.ruleform.next_approve_level.revise_account_review_type == 1) {
        //1、若为单人审批；自动获取第一个配置的审批人，可选择配置的其他备选人；
        this.revise_account_review_account_id = Number(
          this.nextHandlerList[0].account_id
        );
      } else if (
        this.ruleform.next_approve_level.revise_account_review_type == 2
      ) {
        //2、若为多人审批；自动获取全部的配置的人，可删除不需要审批的人；可多选其他审批人
        let account_ids = this.nextHandlerList.map((item) => item.account_id);
        this.revise_account_review_account_ids = account_ids;
      }
      this.ruleform.next_approve_level.revise_account_review_account_ids =
        this.ruleform.next_approve_level.revise_account_review_type == 1
          ? String(this.revise_account_review_account_id)
          : this.revise_account_review_account_ids.join(",");
    },
    submitFun() {
      this.ruleform.next_approve_level.revise_account_review_account_ids =
        this.ruleform.next_approve_level.revise_account_review_type == 1
          ? String(this.revise_account_review_account_id)
          : this.revise_account_review_account_ids.join(",");
      this.ruleform.revise_record_sign_pic =
        this.$store.getters.account_sign_name || "";
      if (
        this.isNext &&
        this.ruleform.revise_record_state == 4 &&
        !this.ruleform.next_approve_level.revise_account_review_account_ids
      ) {
        this.$tip({
          isTip: true,
          message: "请选择下步处理人",
        });
        return;
      }
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      // if (
      //   this.ruleform.revise_record_state == 6 &&
      //   !this.ruleform.revise_record_remark
      // ) {
      //   this.$tip({
      //     isTip: true,
      //     message: "请填写审批意见",
      //   });
      //   return;
      // }
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.uploadApproveReviseInfo(subdata);
      if (res.state == 20) {
        //表示两个人同事提交，并且自己处于最后一个审批人，此时需要选择下级审批人
        this.getApprovalInfo();
        this.$refs.dialog.show();
      } else {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.replaceTo(
              this.isShow
                ? "project_oa_workbench_commission"
                : "enterprise_oa_workbench_commission",
              { t: this.t }
            );
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
