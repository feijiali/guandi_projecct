<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.purchase_approval_organ_id_un"
        />
      </el-form-item>
      <!-- <el-form-item class="form-item-long-small must" label="项目名称：">
        <el-select
          v-model="ruleforms.purchase_approval_project_id_un"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in project_list"
            :key="index"
            :label="item.project_simple"
            :value="item.project_id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="form-item-long-small must" label="材料名称：">
        <el-input
          v-model="ruleforms.purchase_approval_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="数量：">
        <num-input
          @change="totalCalFun"
          placeholder="请输入"
          v-model="ruleforms.purchase_approval_num"
          :fixedNum="2"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="型号单位：">
        <el-input
          v-model="ruleforms.purchase_approval_spec"
          placeholder="请输入型号"
          style="width: 150px !important"
        ></el-input>
        <el-input
          class="ml-1"
          v-model="ruleforms.purchase_approval_unit"
          placeholder="请输入单位"
          style="width: 100px !important"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item-long-small must" label="合同签订单位：">
        <el-select
          v-model="ruleforms.purchase_approval_sign_company"
          placeholder="请选择/输入"
          filterable
          allow-create
        >
          <el-option
            v-for="(item, index) in companyArr"
            :key="index"
            :label="item.oa_company"
            :value="item.oa_company"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small must"
        label="项目建议结算方式："
      >
        <el-input
          v-model="ruleforms.purchase_approval_settlement"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="进场日期：">
        <el-date-picker
          :clearable="false"
          v-model="ruleforms.purchase_approval_in_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="项目预算单价：">
        <num-input
          @change="totalCalFun"
          placeholder="请输入"
          v-model="ruleforms.purchase_approval_price"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="总价：">
        <el-input
          placeholder="待系统计算"
          readonly
          v-model="ruleforms.purchase_approval_total_amount"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="具体说明：">
        <el-input
          v-model="ruleforms.purchase_approval_remark"
          type="textarea"
          placeholder="请输入"
          rows="4"
          class="el-textarea-box"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="采购用途：">
        <el-input
          v-model="ruleforms.purchase_approval_use_for"
          type="textarea"
          placeholder="请输入"
          rows="4"
          class="el-textarea-box"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
export default {
  mixins: ["upload"],
  props: {
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      project_list: [], //项目名称
      companyArr: [], //供应商单位
      ruleforms: {
        purchase_approval_id: 0,
        purchase_approval_revise_id_un: null,
        purchase_approval_organ_id_un: null,
        purchase_approval_project_id_un: null,
        purchase_approval_name: "",
        purchase_approval_spec: "",
        purchase_approval_unit: "",
        purchase_approval_num: null,
        purchase_approval_use_for: "",
        purchase_approval_in_time: "",
        purchase_approval_in_time_int: null,
        purchase_approval_settlement: "",
        purchase_approval_price: null,
        purchase_approval_total_amount: null,
        purchase_approval_sign_company: "",
        purchase_approval_supply_unit_id_un: null,
        purchase_approval_remark: "",
        purchase_approval_pic: "",
        purchase_approval_file: "",
        purchase_approval_sub_account_id_un: null,
        purchase_approval_revise_id_un: null,
        purchase_approval_sub_time: this.$utils.getCurrentTime(),
      },
      rules: {
        purchase_approval_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        // purchase_approval_project_id_un: [
        //   {
        //     required: true,
        //     message: "请选择项目名称",
        //   },
        // ],
        purchase_approval_name: [
          {
            required: true,
            message: "请输入材料名称",
          },
        ],
        purchase_approval_num: [
          {
            required: true,
            message: "请输入数量",
          },
        ],
        purchase_approval_spec: [
          {
            required: true,
            message: "请输入型号",
          },
        ],
        purchase_approval_unit: [
          {
            required: true,
            message: "请输入单位",
          },
        ],
        purchase_approval_sign_company: [
          {
            required: true,
            message: "请选择合同签订单位",
          },
        ],
        purchase_approval_settlement: [
          {
            required: true,
            message: "请输入项目建议结算方式",
          },
        ],
        purchase_approval_in_time: [
          {
            required: true,
            message: "请选择进场日期",
          },
        ],
        purchase_approval_price: [
          {
            required: true,
            message: "请输入项目预算单价",
          },
        ],
        purchase_approval_remark: [
          {
            required: true,
            message: "请输入具体说明",
          },
        ],
        purchase_approval_use_for: [
          {
            required: true,
            message: "请输入采购用途",
          },
        ],
        purchase_approval_total_amount: [
          {
            required: true,
            message: "请输入总价",
          },
        ],
        purchase_approval_total_amount: [
          {
            required: true,
            message: "请输入总价",
          },
        ],
      },
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
    treeData2() {
      return this.$store.getters.subject;
    },
  },
  async mounted() {
    if (this.editID) {
      this.queryOAPurchaseApproval();
    }
    // 查询项目名称
    this.queryProject();
    // 查询OA公司合集-列表
    this.queryOAOACompany();
  },

  methods: {
    async queryOAPurchaseApproval() {
      let { result } = await api.queryOAPurchaseApproval({
        purchase_approval_id: this.editID,
      });
      let info = result[0];

      this.infoReFun(info);
    },
    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      this.ruleforms.file_list = info.file_list;
      this.ruleforms.pic_list = info.pic_list;
    },
    async queryOAOACompany() {
      let res = await api.queryOAOACompany({
        oa_company_module: "OAPurchaseApproval",
        page: -1,
      });
      this.companyArr = res.result;
    },
    async queryProject() {
      let res = await api.queryProjectInfoProject({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.project_list = res.result;
    },
    // 输入单价计算总价
    totalCalFun(val) {
      if (
        this.ruleforms.purchase_approval_price &&
        this.ruleforms.purchase_approval_num
      ) {
        this.ruleforms.purchase_approval_total_amount = Number(
          (
            this.ruleforms.purchase_approval_price *
            this.ruleforms.purchase_approval_num
          ).toFixed(2)
        );
      } else {
        this.ruleforms.purchase_approval_total_amount = 0;
      }
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.purchase_approval_organ_id_un = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    // 树形下拉选择
    getSelectValues(node) {
      this.ruleforms.purchase_approval_project_id_un = node.tag;
    },
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.purchase_approval_pic = picsjson.file;
      this.ruleforms.purchase_approval_file = filejson.file;
      if (!isSave) {
        this.ruleforms.purchase_approval_pic_json = picsjson.file_json;
        this.ruleforms.purchase_approval_file_json = filejson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }

        if (filejson.file) {
          let file_json = JSON.parse(filejson.file_json);
          let urls_file = filejson.urls.split(",");
          let file_list = urls_file.map((item, index) => {
            return {
              ...file_json[index],
              file_json: file_json[index],
              url: item,
            };
          });
          this.ruleforms.file_list = file_list;
        } else {
          this.ruleforms.file_list = [];
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.purchase_approval_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateOAPurchaseApproval"
            : "uploadOAPurchaseApproval"
        }`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
