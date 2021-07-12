<template>
  <div class="w-100">
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
        <el-select
          :disabled="true"
          @change="choosePerson"
          v-model="ruleforms.subsidy_account_id_union"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in personArr"
            :key="index"
            :label="item.account_name"
            :value="item.hard_worker_account_id_union"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="困难等级：">
        <el-select
          :disabled="true"
          v-model="ruleforms.subsidy_hard_level"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hardtypeBox"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="联系方式：">
        <el-input
          readonly
          class="input-m"
          v-model="ruleforms.subsidy_tel"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="性别：">
        <el-select
          :disabled="true"
          v-model="ruleforms.subsidy_sex"
          placeholder="请选择"
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
          :readonly="true"
          class="input-m"
          v-model="ruleforms.subsidy_identify"
          placeholder="自动获取/请输入"
        ></el-input>
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
      <el-form-item class="form-item-long-small must" label="职工子女姓名：">
        <el-input
          class="input-m"
          v-model="ruleforms.subsidy_child_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="子女性别：">
        <el-select v-model="ruleforms.subsidy_child_sex" placeholder="请选择">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="子女身份证号：">
        <el-input
          class="input-m"
          v-model="ruleforms.subsidy_child_identify"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="就读年级：">
        <el-input
          class="input-m"
          v-model="ruleforms.subsidy_child_class"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="帮扶金额：">
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.subsidy_send_amount"
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
        subsidy_send_time: this.$utils.getCurrentTime(),
        subsidy_identify: "",
        subsidy_type: 2,
        subsidy_send_type: 1,
        subsidy_send_amount: "",
        subsidy_child_name: "",
        subsidy_child_sex: "",
        subsidy_child_identify: "",
        subsidy_child_class: "",
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
        subsidy_child_name: [
          {
            required: true,
            message: "请输入职工子女姓名",
          },
        ],
        subsidy_child_sex: [
          {
            required: true,
            message: "请选择子女性别",
          },
        ],
        subsidy_child_identify: [
          {
            required: true,
            message: "请输入子女身份证号码",
          },
          {
            pattern:
              /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
            message: "身份证号格式错误",
          },
        ],
        subsidy_child_class: [
          {
            required: true,
            message: "请输入就读年级",
          },
        ],
        subsidy_send_amount: [
          {
            required: true,
            message: "请输入帮扶金额",
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
      personArr: [], //当前的困难职工
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    // 查询满足确定的困难职工
    await this.queryUnionPartyHardWorkerList();
    if (!this.editID) {
      // 默认登录者
      this.$set(
        this.ruleforms,
        "subsidy_account_id_union",
        Number(this.$store.getters.account_id)
      );
      this.ruleforms.subsidy_name = this.$store.getters.userName;
      this.ruleforms.subsidy_identify = this.$store.getters.account_id_card;
      this.renderRule(this.$store.getters.account_id);
    } else {
      this.queryUnionPartySubsidy();
    }
  },
  methods: {
    async queryUnionPartySubsidy() {
      let { result } = await api.queryUnionPartySubsidy({
        subsidy_id: this.editID,
        subsidy_type: 2,
      });
      let info = result[0];
      this.infoReFun(info);
    },

    infoReFun(info) {
      if (info) {
        // 编辑式渲染图片
        for (let key in this.ruleforms) {
          this.ruleforms[key] = info[key];
        }
        if (this.$refs.pic_upload) {
          this.$refs.pic_upload.setPicList(info.pic_list);
          this.$refs.file_upload.setFileList(info.file_list);
        }
      }
    },
    // 选择人员
    choosePerson(val) {
      this.renderRule(val);
    },
    async queryUnionPartyHardWorkerList() {
      let res = await api.queryUnionPartyHardWorkerList({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this),
        revise_info_state: 3,
      });
      this.personArr = res.result;
    },
    // 选择了人员后信息回填
    renderRule(val) {
      let ind = this.personArr.findIndex(
        (item) => item.hard_worker_account_id_union == val
      );
      this.ruleforms.subsidy_identify =
        this.personArr[ind].hard_worker_identify;
      this.ruleforms.subsidy_sex = this.personArr[ind].hard_worker_sex;
      this.ruleforms.subsidy_hard_level =
        this.personArr[ind].hard_worker_hard_type;
      this.ruleforms.subsidy_tel = this.personArr[ind].hard_worker_tel;
      this.ruleforms.subsidy_organ_id_union =
        this.personArr[ind].hard_worker_organ_id_union;
      this.ruleforms.subsidy_job = this.personArr[ind].hard_worker_job;
      this.ruleforms.subsidy_age = String(this.personArr[ind].hard_worker_age);
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.subsidy_organ_id_union = node.tag;
      this.$emit("organNodeFun", node.tag);
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
