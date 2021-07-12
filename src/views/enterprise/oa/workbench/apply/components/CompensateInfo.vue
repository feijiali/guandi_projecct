<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'选择姓名'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleforms.subsidy_account_id_union"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.subsidy_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="姓名：">
        <el-input
          class="el-input-person"
          readonly
          placeholder="请选择"
          v-model="ruleforms.subsidy_name"
        >
        </el-input>
        <div
          class="d-inline-block add-circle-btn ml-2"
          @click="showTargerAddLayer"
        >
          +
        </div>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="联系方式：">
        <el-input
          readonly
          class="input-m"
          v-model="ruleforms.subsidy_tel"
          placeholder="自动获取/请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="性别：">
        <el-select
          v-model="ruleforms.subsidy_sex"
          placeholder="自动获取/请输入"
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="发放时间：">
        <el-date-picker
          :clearable="false"
          v-model="ruleforms.subsidy_send_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="身份证号：">
        <el-input
          @blur="identifyFun"
          class="input-m"
          v-model="ruleforms.subsidy_identify"
          placeholder="自动获取/请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="年龄：">
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.subsidy_age"
          :fixedNum="0"
          unit="岁"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="发放方式：">
        <el-select v-model="ruleforms.subsidy_send_type" placeholder="请选择">
          <el-option
            v-for="(item, index) in subsidy_send_type_arr"
            :key="index"
            :label="item"
            :value="index + 1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="上次补偿日期：">
        <el-date-picker
          class="el-date-editor-m"
          :clearable="false"
          v-model="ruleforms.subsidy_last_compensation_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="补偿类型：">
        <el-select
          v-model="ruleforms.subsidy_compensation_type"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in subsidy_compensation_type_arr"
            :key="index"
            :label="item"
            :value="index + 1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small must"
        label="个人负担费用(元)："
      >
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.subsidy_self_amount"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="报销比例：">
        <el-input
          class="input-m"
          v-model="ruleforms.subsidy_proportion"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="补偿金额(元)：">
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.subsidy_send_amount"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="核定金额(元)：">
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.subsidy_verify_amount"
          :fixedNum="2"
          unit="元"
        ></num-input>
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
      ruleforms: {
        subsidy_id: null,
        subsidy_approve_revise_id_un: null,
        subsidy_organ_id_union: null,
        subsidy_hard_level: null,
        subsidy_account_id_union: null, //姓名id
        subsidy_name: "",
        subsidy_job: "",
        subsidy_age: "",
        subsidy_last_compensation_time: "",
        subsidy_tel: "",
        subsidy_sex: null,
        subsidy_age: "",
        subsidy_send_time: this.$utils.getCurrentTime(),
        subsidy_identify: "",
        subsidy_type: 4,
        subsidy_send_type: 1,
        subsidy_send_amount: "",
        subsidy_proportion: "",
        subsidy_verify_amount: "",
        subsidy_self_amount: "",
        subsidy_compensation_type: 0,
        organ_node: this.$organ_id_en_or_pro(this),
        subsidy_sub_time: this.$utils.getCurrentTime(),
      },
      rules: {
        subsidy_organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        subsidy_account_id_union: [
          {
            required: true,
            message: "请选择姓名",
          },
        ],
        subsidy_tel: [
          {
            required: true,
            message: "请填写联系电话",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
        subsidy_send_type: [
          {
            required: true,
            message: "请选择发放方式",
          },
        ],
        subsidy_compensation_type: [
          {
            required: true,
            message: "请选择补偿类型",
          },
        ],
        subsidy_self_amount: [
          {
            required: true,
            message: "请输入个人负担费用(元)",
          },
        ],
        subsidy_proportion: [
          {
            required: true,
            message: "请输入报销比例",
          },
        ],
        subsidy_send_amount: [
          {
            required: true,
            message: "请输入补偿金额(元)",
          },
        ],
        subsidy_verify_amount: [
          {
            required: true,
            message: "请输入核定金额(元)",
          },
        ],
      },
      subsidy_send_type_arr: ["打卡", "现金"],
      subsidy_condolences_type_arr: ["一般", "重症"],
      subsidy_compensation_type_arr: ["大病补偿", "伤残补偿", "死亡补偿"],
      hardtypeBox: [
        { type: "特困职工", id: 1 },
        { type: "重困职工", id: 2 },
        { type: "一般困难职工", id: 3 },
      ],
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    if (!this.editID) {
      // 默认登录者
      this.$set(
        this.ruleforms,
        "subsidy_account_id_union",
        Number(this.$store.getters.account_id)
      );
      this.ruleforms.subsidy_name = this.$store.getters.userName;
      this.ruleforms.subsidy_tel = this.$store.getters.account_tel;
      this.ruleforms.subsidy_sex = this.$store.getters.account_sex;
      this.ruleforms.subsidy_identify = this.$store.getters.account_id_card;

      this.ruleforms.subsidy_organ_id_union = Number(
        this.$store.getters.user_organ_id
      );
      this.ruleforms.subsidy_job = this.$store.getters.account_job;
    } else {
      this.queryUnionPartySubsidy();
    }
  },
  methods: {
    async queryUnionPartySubsidy() {
      let { result } = await api.queryUnionPartySubsidy({
        subsidy_id: this.editID,
        subsidy_type: 4,
      });
      let info = result[0];
      this.infoReFun(info);
    },

    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
        this.$refs.file_upload.setFileList(info.file_list);
      }
    },
    // 选择了人员姓名后点击确认
    async choosePersonFun(data) {
      this.ruleforms.subsidy_account_id_union = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.ruleforms.subsidy_name = result[0].account_name;
      this.ruleforms.subsidy_tel = result[0].account;
      this.ruleforms.subsidy_sex = result[0].account_sex;
      this.ruleforms.subsidy_identify = result[0].account_id_card;
      this.ruleforms.subsidy_organ_id_union = result[0].organ_id_union;
      this.ruleforms.subsidy_job = result[0].account_job;
      this.$refs.dialog.cancel();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.subsidy_organ_id_union = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    // 输入身份证号后失去焦点
    identifyFun(val) {
      let pattern =
        /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/; //负浮点数
      if (!pattern.test(this.ruleforms.subsidy_identify)) {
        this.$tip({
          isTip: true,
          message: "身份证号格式错误",
        });
        return true;
      }
    },
    // 确认提交
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "UnionPartyHardWorker" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.subsidy_pic = picsjson.file;
      this.ruleforms.subsidy_file = filejson.file;
      if (!isSave) {
        this.ruleforms.subsidy_pic_json = picsjson.file_json;
        this.ruleforms.subsidy_file_json = filejson.file_json;
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
      this.ruleforms.subsidy_send_amount_ch = this.$utils.numberParseChina(
        this.ruleforms.subsidy_send_amount
      );
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.subsidy_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateUnionPartySubsidy"
            : "uploadUnionPartySubsidy"
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
