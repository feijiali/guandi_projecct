<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择经办人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :section="ruleforms.contract_approval_organ_id_union"
          :personID="ruleforms.contract_approval_due_person_id"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.contract_approval_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同名称：">
        <el-input
          v-model="ruleforms.contract_approval_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同编号：">
        <el-input
          v-model="ruleforms.contract_approval_number"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同类型：">
        <el-select
          @change="chooseContractType"
          filterable
          allow-create
          v-model="ruleforms.contract_approval_type"
          placeholder="请输入或选择"
        >
          <el-option
            v-for="(item, index) in approvalTypeArr"
            :key="index"
            :label="item.name"
            :value="item.val"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="form-item-long-small must" label="合同分类：">
        <!-- 业主合同 -->
        <template v-if="ruleforms.contract_approval_type == 1">
          <el-input
            value="A"
            readonly
            style="width: 80px !important"
          ></el-input>
          <div
            class="stake-no-input d-inline-block ml-1"
            style="width: calc(100% - 90px)"
          >
            <el-input
              @change="changeTypeStr"
              v-model="contract_approval_type_str"
              placeholder="请输入"
            ></el-input>
          </div>
        </template>
        <!-- 班组合同 -->
        <template v-if="ruleforms.contract_approval_type == 2">
          <el-select
            filterable
            v-model="ruleforms.contract_approval_type_str"
            placeholder="请输入或选择"
          >
            <el-option
              v-for="(item, index) in teamTypeArr"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="合同版本及总份数：">
        <el-input
          v-model="ruleforms.contract_approval_version"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同甲方：">
        <el-input
          v-model="ruleforms.contract_approval_department"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="甲方负责人：">
        <el-input
          v-model="ruleforms.contract_approval_department_linkman"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="甲方联系方式：">
        <el-input
          v-model="ruleforms.contract_approval_department_mobile"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同乙方：">
        <el-input
          v-model="ruleforms.contract_approval_supplier"
          placeholder="请输入"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item-long-small must" label="乙方负责人：">
        <el-input
          v-model="ruleforms.contract_approval_supplier_linkman"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="乙方联系方式：">
        <el-input
          v-model="ruleforms.contract_approval_supplier_mobile"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="第三方：">
        <el-input
          v-model="ruleforms.contract_approval_thread"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="里程：">
        <num-input
          :isString="true"
          v-model="ruleforms.contract_approval_meter"
          :fixedNum="2"
          unit="公里"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="合同总价/单价：">
        <num-input
          :isString="true"
          v-model="ruleforms.contract_approval_money"
          placeholder="请输入"
          :fixedNum="2"
          :unit="'元'"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="预计合同总价/单价：">
        <num-input
          :isString="true"
          v-model="ruleforms.contract_approval_present_money"
          placeholder="请输入"
          :fixedNum="2"
          :unit="'元'"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="合同工期：">
        <el-input
          v-model="ruleforms.contract_approval_finish_time"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <template v-if="ruleforms.contract_approval_type == 2">
        <el-form-item class="form-item-long-small" label="所属A合同：">
          <el-select
            filterable
            v-model="ruleforms.contract_approval_parent"
            placeholder="请输入或选择"
          >
            <el-option
              v-for="(item, index) in contractApprovalHistoryArr"
              :key="index"
              :label="item.contract_approval_type_str"
              :value="item.contract_approval_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item class="form-item-long-small" label="签订日期：">
        <el-date-picker
          :clearable="false"
          ref="datePicker"
          v-model="ruleforms.contract_approval_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block"
        label="经办人："
      >
        <el-input
          class="el-input-person"
          placeholder="请选择"
          v-model="ruleforms.contract_approval_due_person"
          readonly
        ></el-input>
        <div
          class="d-inline-block add-circle-btn ml-1"
          @click="showTargerAddLayer"
        >
          +
        </div>
      </el-form-item>
      <el-form-item class="form-item-long" label="发起人意见：">
        <el-input
          v-model="ruleforms.contract_approval_advice"
          type="textarea"
          placeholder="请输入"
          rows="4"
          cols="4"
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
import dayjs from "dayjs";
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
      ruleforms: {
        contract_approval_id: null,
        contract_approval_parent: null,
        contract_approval_revise_id_union: null,
        contract_approval_organ_id_union: null,
        contract_approval_type: 1,
        contract_approval_type_str: "",
        contract_approval_name: "",
        contract_approval_number: "",
        contract_approval_version: "",
        contract_approval_department: "",
        contract_approval_department_linkman: "",
        contract_approval_department_mobile: "",
        contract_approval_supplier: "广东冠迪建设有限公司",
        contract_approval_supplier_linkman: "",
        contract_approval_supplier_mobile: "",
        contract_approval_thread: "",
        contract_approval_meter: "",
        contract_approval_money: "",
        contract_approval_present_money: "",
        contract_approval_finish_time: "",
        contract_approval_due_person_id: null,
        contract_approval_due_person: "",
        contract_approval_advice: "",
        contract_approval_pics: "",
        contract_approval_files: "",
        contract_approval_time: dayjs().format("YYYY-MM-DD"),
        contract_approval_sub_time: dayjs().format("YYYY-MM-DD"),
        contract_approval_money: null,
      },
      rules: {
        contract_approval_organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        contract_approval_name: [
          {
            required: true,
            message: "请输入合同名称",
          },
        ],
        contract_approval_number: [
          {
            required: true,
            message: "请输入合同编号",
          },
        ],
        contract_approval_type: [
          {
            required: true,
            message: "请选择合同类型",
          },
        ],
        // contract_approval_type_str: [
        //   {
        //     required: true,
        //     message: "请输入/选择合同分类",
        //   },
        // ],
        contract_approval_department: [
          {
            required: true,
            message: "请输入合同甲方",
          },
        ],
        contract_approval_department_linkman: [
          {
            required: true,
            message: "请输入甲方负责人",
          },
        ],
        contract_approval_department_mobile: [
          {
            required: true,
            message: "请输入甲方联系方式",
          },
        ],
        contract_approval_supplier: [
          {
            required: true,
            message: "请输入合同乙方",
          },
        ],
        contract_approval_supplier_linkman: [
          {
            required: true,
            message: "请输入乙方负责人",
          },
        ],
        contract_approval_supplier_mobile: [
          {
            required: true,
            message: "请输入乙方联系方式",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
      },
      contract_approval_type_str: "", //业主合同类型的合同分类
      approvalTypeArr: [
        { name: "业主合同", val: 1 },
        { name: "班组合同", val: 2 },
      ], //合同类型数组
      contractApprovalHistoryArr: [], //合同分类
      // 班组合同分类
      teamTypeArr: [
        "B1",
        "B2",
        "B3",
        "C1",
        "C2",
        "C3",
        "D1",
        "D2",
        "D3",
        "E1",
        "E2",
        "E3",
        "E4",
      ],
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    if (!this.editID) {
      this.ruleforms.contract_approval_due_person_id = Number(
        this.$store.getters.account_id
      );
      this.ruleforms.contract_approval_due_person =
        this.$store.getters.userName;
    } else {
      await this.queryOAContractApproval();
    }
    // 查询合同分类历史输入
    this.QueryOAContractApprovalHistory();
  },
  methods: {
    async queryOAContractApproval() {
      let { result } = await api.queryOAContractApproval({
        contract_approval_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },

    infoReFun(info) {
      this.contract_approval_type_str =
        info.contract_approval_type_str.substring(1);
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
        this.$refs.file_upload.setFileList(info.file_list);
      }
    },
    // 输入合同分类判断是否有重复的
    changeTypeStr(val) {
      if (
        this.contractApprovalHistoryArr.findIndex(
          (item) => item.contract_approval_type_str == "A" + val
        ) > -1
      ) {
        this.$tip({
          isTip: true,
          message: "此合同分类已有，请重新输入！",
        });
        this.contract_approval_type_str = "";
        return true;
      }
      // this.ruleforms.contract_approval_type_str = val;
    },
    // 查询合同类型历史输入
    async QueryOAContractApprovalHistory() {
      let { result } = await api.QueryOAContractApprovalHistory({
        organ_node: this.ruleforms.contract_approval_organ_id_union || 0,
      });
      this.contractApprovalHistoryArr = result;
    },
    // 点击选择审批人
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    chooseContractType(val) {
      this.ruleforms.contract_approval_type_str = "";
      this.contract_approval_type_str = "";
      this.ruleforms.contract_approval_parent = null;

      this.ruleforms.contract_approval_department = "";
      this.ruleforms.contract_approval_supplier = "";
      this.ruleforms[
        val == 2 ? "contract_approval_department" : "contract_approval_supplier"
      ] = "广东冠迪建设有限公司";
    },
    //选择经办人
    async choosePersonFun(data) {
      this.ruleforms.contract_approval_due_person_id = data;
      let { result } = await this.queryAccount(
        this.ruleforms.contract_approval_due_person_id
      );
      this.ruleforms.contract_approval_due_person = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(id) {
      let data = await api.queryAccount({
        account_id: id,
      });
      return data;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.contract_approval_parent = null;
      this.ruleforms.contract_approval_organ_id_union = node.tag;
      this.$emit("organNodeFun", node.tag);
      // 查询合同分类历史输入
      this.QueryOAContractApprovalHistory();
    },
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (this.ruleforms.contract_approval_type == 2) {
        this.$set(this.rules, "contract_approval_type_str", [
          {
            required: true,
            message: "请输入/选择合同分类",
          },
        ]);
      } else {
        delete this.rules.contract_approval_type_str;
      }
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      this.ruleforms.contract_approval_type_str =
        this.ruleforms.contract_approval_type == 1
          ? "A" + this.contract_approval_type_str
          : this.ruleforms.contract_approval_type_str;

      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.contract_approval_pics = picsjson.file;
      this.ruleforms.contract_approval_files = filejson.file;
      if (!isSave) {
        this.ruleforms.contract_approval_pics_json = picsjson.file_json;
        this.ruleforms.contract_approval_files_json = filejson.file_json;
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
      this.isAdd && (subdata.contract_approval_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateOAContractApproval"
            : "uploadOAContractApproval"
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

<style lang="scss" scoped>
</style>
