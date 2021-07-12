<template>
  <el-form ref="ruleform" class="el-form-box" :model="ruleform">
    <!-- <el-form-item class="form-item-long-small d-inline-block must" label="单据名称：">
      <el-input
        disabled
        v-model="ruleform.new_approve_request.approve_revise_info_title"
        placeholder="请输入"
      ></el-input>
    </el-form-item> -->

    <el-form-item
      class="form-item-long-small d-inline-block must"
      label="审批流程："
    >
      <el-select
        @change="(val) => chooseProcess(val)"
        ref="select"
        v-model="ruleform.new_approve_request.revise_info_process_id_union"
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in process_list"
          :key="index"
          :label="item.process_name"
          :value="item.process_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item class="form-item-long-small must" label="下步节点：">
      <el-input readonly v-model="ruleform.new_approve_request.revise_info_now_name" placeholder="请选择"></el-input>
    </el-form-item> -->

    <el-form-item
      class="form-item-long-small must"
      v-if="
        ruleform.new_approve_request.revise_account_review_type == 2 ||
        ruleform.new_approve_request.revise_account_review_type == 5
      "
      label="下步处理人："
    >
      <el-select
        :key="'a'"
        :disabled="
          ruleform.new_approve_request.revise_account_review_type == 5
            ? true
            : false
        "
        v-model="revise_account_review_account_ids"
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
    </el-form-item>

    <el-form-item
      class="form-item-long-small must"
      v-if="
        ruleform.new_approve_request.revise_account_review_type == 1 ||
        ruleform.new_approve_request.revise_account_review_type == 4
      "
      label="下步处理人："
    >
      <el-select
        :key="'b'"
        :disabled="
          ruleform.new_approve_request.revise_account_review_type == 4
            ? true
            : false
        "
        v-model="revise_account_review_account_id"
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

    <el-form-item class="form-item-long must" label="电子签名：">
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
          <div class="reSign position-absolute" @click="signatureFun">重签</div>
          <viewer
            :images="[$store.getters.account_sign]"
            class="lookPic d-inline-block"
          >
            <img
              style="height: 70px; margin-bottom: 0"
              :src="item"
              alt
              v-for="(item, index) in [$store.getters.account_sign]"
              :key="index + 'image'"
              class="layer-info-img"
            />
          </viewer>
        </div>
        <template v-if="!$store.getters.account_sign"> 设置签名 </template>
      </div>
    </el-form-item>
    <v-sign ref="sign"></v-sign>
  </el-form>
</template>

<script>
import api from "@/api/index";
import vSign from "@/components/common/Sign";
export default {
  props: {
    revise_info_union: {
      type: Number,
      default: 0,
    },
    titleName: {
      type: String,
      default: "",
    },
    modules_union: {
      type: String,
      default: "",
    },
    type: {
      type: Number,
      default: 0,
    },
    labelWidth: {
      type: String,
      default: "110px",
    },
    organ_node: {
      type: String,
      default: "",
    },
  },
  components: {
    vSign,
  },
  data() {
    return {
      ruleform: {
        new_approve_request: {
          revise_info_process_id_union: this.revise_info_union || null, //审批信息中间表-审批流程id
          approve_revise_info_title: "", //审批信息中间表-标题
          revise_info_now_level: null, //审批信息中间表-当前层级
          revise_info_now_name: "", //审批信息中间表-当前节点名字
          revise_account_review_account_ids: "", //审批信息中间表-审批人员关联
          revise_account_review_type: 1, //审批信息中间表-审批类型：1 单人审批(多个指定人) 2：多人审批 3:公示(隐藏类型) 4：单人审批（单个自定人）--（选择了下步节点后自动带出的）
          revise_record_sign_pic: "", //审批记录表-审批签名图片
        },
      },
      rules: {
        revise_record_sign_pic: [
          {
            required: true,
            message: "请上传审批签名",
          },
        ],
        approve_revise_info_title: [
          {
            required: true,
            message: "请输入单据名称",
          },
        ],
        revise_info_process_id_union: [
          {
            required: true,
            message: "请选择审批流程",
          },
        ],
      },
      revise_account_review_account_ids: [], //下步处理人(多人)
      revise_account_review_account_id: null, //下步处理人(单人)
      nextList: [], //下步节点数组
      nextHandlerList: [], //下步处理人数组
      isLast: false, //当前登录者是否处于最后一个层级
      process_list: [], //审批流程
    };
  },
  watch: {
    organ_node: {
      handler: function () {
        this.queryApproveProcess();
      },
      deep: true,
    },
  },
  async created() {
    this.ruleform.new_approve_request.approve_revise_info_title =
      this.titleName;
    // 查询对应申请类型审批流程
    await this.queryApproveProcess();
    if (this.revise_info_union) {
      this.chooseProcess(this.revise_info_union);
    }
  },
  methods: {
    // 表单回填
    renderRuleForm(info) {
      const json = [
        "revise_info_process_id_union",
        "revise_info_now_name",
        "revise_account_review_account_ids",
        "revise_info_now_level",
        "revise_account_review_type",
        "revise_record_sign_pic",
      ];
      this.$utils.renderRuleForm(
        this,
        json,
        this.ruleform.new_approve_request,
        info
      );
      // 查询对应申请类型审批流程
      if (
        info.revise_account_review_type == 1 ||
        info.revise_account_review_type == 4
      ) {
        this.revise_account_review_account_id = Number(
          info.revise_account_review_account_ids
        );
      } else if (
        info.revise_account_review_type == 2 ||
        info.revise_account_review_type == 5
      ) {
        this.revise_account_review_account_ids =
          info.revise_account_review_account_ids.split(",").map(Number);
      }
      this.chooseProcess(info.revise_info_process_id_union, true);
    },
    // 选择审批流程
    chooseProcess(val, bool) {
      this.revise_account_review_account_ids = [];
      this.revise_account_review_account_id = null;
      this.revise_account_review_account_id = null;
      this.nextHandlerList = [];

      let ind = this.process_list.findIndex((item) => item.process_id == val);
      this.nextList = this.process_list[ind].process_list;
      this.ruleform.new_approve_request.revise_info_now_name = "";
      let ind2 = -1;
      // 若当前登录者也是审批人，则跳过当前层级
      ind2 = this.nextList.findIndex((item, index) => {
        const arr = item.process_detail_account_ids.split(",").map(Number);
        if (arr.indexOf(Number(this.$store.getters.account_id)) != -1) {
          return true;
        }
      });

      // if (ind2 == this.nextList.length - 1) {
      //   // 说明当前人员已经处于最后一个审批流程，此时则只需要传level，其余字段可不传
      //   this.isLast = true
      //   ind2 == -1
      //     ? (this.ruleform.new_approve_request.revise_info_now_level = this.nextList[0].process_level)
      //     : (this.ruleform.new_approve_request.revise_info_now_level =
      //         this.nextList[ind2].process_level + 1)
      // } else {
      if (ind2 == -1) {
        // 如果登录者不在流程里面,则默认取第一个流程的值
        this.ruleform.new_approve_request.revise_info_now_name =
          this.nextList[0].process_detail_name;
        this.ruleform.new_approve_request.revise_info_now_level =
          this.nextList[0].process_level;
        this.nextHandlerList = this.nextList[0].account_list.filter(
          (item) => item.account_status != 2
        );
        this.ruleform.new_approve_request.revise_account_review_type =
          this.nextList[0].process_detail_type;
      } else {
        // 如果登录者在流程里面,且是最后一个层级,则不能跳过此层级，但是要调过之前的层级
        if (ind2 == this.nextList.length - 1) {
          // 说明当前人员已经处于最后一个审批流程，此时则只需要传level，其余字段可不传
          this.isLast = true;
          this.ruleform.new_approve_request.revise_info_now_name =
            this.nextList[ind2].process_detail_name;
          this.ruleform.new_approve_request.revise_info_now_level =
            this.nextList[ind2].process_level;

          this.nextHandlerList = this.nextList[ind2].account_list.filter(
            (item) => item.account_status != 2
          );
          this.ruleform.new_approve_request.revise_account_review_type =
            this.nextList[ind2].process_detail_type;
        } else {
          // 如果登录者在流程里面,则获取当前除了她自己的下步处理人
          this.ruleform.new_approve_request.revise_info_now_name =
            this.nextList[ind2 + 1].process_detail_name;
          this.ruleform.new_approve_request.revise_info_now_level =
            this.nextList[ind2 + 1].process_level;

          this.nextHandlerList = this.nextList[ind2 + 1].account_list.filter(
            (item) => item.account_status != 2
          );
          this.ruleform.new_approve_request.revise_account_review_type =
            this.nextList[ind2 + 1].process_detail_type;
        }
      }
      // 看默认的人是否在下步处理人数组里面，在的话就默认这里面的人；不在的话就默认下步处理人
      let isDefaultPerson = this.nextHandlerList.findIndex(
        (item) =>
          item.account_id == this.nextList[0].process_detail_default_account_ids
      );
      if (this.ruleform.new_approve_request.revise_account_review_type == 1) {
        //1、若为单人审批；自动获取第一个配置的审批人，可选择配置的其他备选人；
        this.revise_account_review_account_id =
          isDefaultPerson == -1
            ? Number(this.nextHandlerList[0].account_id)
            : Number(this.nextList[0].process_detail_default_account_ids);
      } else if (
        this.ruleform.new_approve_request.revise_account_review_type == 2
      ) {
        //2、若为多人审批；自动获取全部的配置的人，可删除不需要审批的人；可多选其他审批人
        let account_ids = this.nextHandlerList.map((item) => item.account_id);
        this.revise_account_review_account_ids = bool
          ? this.ruleform.new_approve_request.revise_account_review_account_ids
              .split(",")
              .map(Number)
          : isDefaultPerson == -1
          ? account_ids
          : this.nextList[0].process_detail_default_account_ids
              .split(",")
              .map(Number);
      }
      // }
    },
    async queryApproveProcess() {
      let res = await api.queryApproveProcess({
        process_state: 1,
        page: -1,
        belong_query: this.$store.getters.account_range_type,
        process_modules_union: this.modules_union,
        organ_node: this.organ_node,
      });
      if (res.result[0]) {
        this.process_list = res.result;
        this.ruleform.new_approve_request.revise_info_process_id_union = this
          .process_list[0]
          ? this.process_list[0].process_id
          : 0;
        this.chooseProcess(this.process_list[0].process_id);
      } else {
        this.ruleform.new_approve_request.revise_info_process_id_union = null;
        this.nextHandlerList = [];
        this.revise_account_review_account_id = null;
        this.revise_account_review_account_ids = "";
        this.process_list = [];
        this.$tip({
          isTip: true,
          message: "请设置对应的审批流程！",
        });
        return;
      }
    },
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    submitFun() {
      this.ruleform.new_approve_request.revise_record_sign_pic =
        this.$store.getters.account_sign_name || "";
      this.ruleform.new_approve_request.approve_revise_info_title =
        this.titleName;
      // 先判断是否填写必填信息
      if (
        !this.$utils.ruleFormPro(
          this,
          this.rules,
          this.ruleform.new_approve_request
        )
      ) {
        return;
      }

      if (
        !this.isLast &&
        !this.revise_account_review_account_ids.length &&
        !this.revise_account_review_account_id
      ) {
        this.$tip({
          isTip: true,
          message: "请选择下步处理人！",
        });
        return;
      }
      this.ruleform.new_approve_request.revise_account_review_account_ids =
        this.ruleform.new_approve_request.revise_account_review_type == 1
          ? String(this.revise_account_review_account_id)
          : this.revise_account_review_account_ids.join(",");
      this.$emit("submitAllDataApproval", this.ruleform);
    },
  },
};
</script>

<style scoped lang="scss"></style>
