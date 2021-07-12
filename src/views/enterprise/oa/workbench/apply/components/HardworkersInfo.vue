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
          :personID="ruleforms.hard_worker_account_id_union"
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
          :value="ruleforms.hard_worker_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="政治面貌：">
        <el-select
          v-model="ruleforms.hard_worker_political"
          placeholder="请选择"
        >
          <el-option
            v-for="item in politicsBox"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="本人月均收入：">
        <num-input
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.hard_worker_income"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="姓名："
      >
        <el-input
          class="el-input-person"
          readonly
          placeholder="请选择"
          v-model="ruleforms.hard_worker_name"
        >
        </el-input>
        <div
          class="d-inline-block add-circle-btn ml-2"
          @click="showTargerAddLayer"
        >
          +
        </div>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="婚姻状况："
      >
        <el-select
          v-model="ruleforms.hard_worker_marriage"
          placeholder="请选择"
        >
          <el-option
            v-for="item in marriageBox"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="家庭年度总收入："
      >
        <num-input
          @change="avgCome"
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.hard_worker_home_in_come"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="性别："
      >
        <el-select
          class="input-m"
          v-model="ruleforms.hard_worker_sex"
          placeholder="自动获取/请选择"
        >
          <el-option
            v-for="item in sexBox"
            :key="item.id"
            :label="item.sex"
            :value="item.sex"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="健康状况："
      >
        <el-select v-model="ruleforms.hard_worker_health" placeholder="请选择">
          <!-- multiple -->
          <el-option
            v-for="item in healthBox"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="家庭人口数："
      >
        <num-input
          @change="avgCome"
          placeholder="请输入"
          v-model="ruleforms.hard_worker_home_num"
          :fixedNum="0"
          unit="人"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="年龄："
      >
        <num-input
          placeholder="请输入"
          v-model="ruleforms.hard_worker_age"
          :fixedNum="0"
          unit="岁"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="联系方式："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_tel"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="家庭人均年收入："
      >
        <num-input
          :disabled="true"
          :isString="true"
          placeholder="请输入"
          v-model="ruleforms.hard_worker_home_avg_in_come"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="民族："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_nation"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="家庭住址："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_home_location"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="职务："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_job"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="职工银行卡号："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_bank_num"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block"
        label="银行卡开户行："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_bank"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="身份证号："
      >
        <el-input
          class="input-m"
          v-model="ruleforms.hard_worker_identify"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="困难职工申请类别："
      >
        <el-select
          v-model="ruleforms.hard_worker_hard_type"
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
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="是否持有工会会员："
      >
        <el-radio-group
          v-model="ruleforms.hard_worker_is_membership"
          class="el-radio-group-home vtt"
        >
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="是否纳入地方低保："
      >
        <el-radio-group
          v-model="ruleforms.hard_worker_is_low_insurance"
          class="el-radio-group-home vtt"
        >
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="是否有住房："
      >
        <el-radio-group
          v-model="ruleforms.hard_worker_have_house"
          class="el-radio-group-home vtt"
        >
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
        <div class="position-absolute" style="left: 120px; top: -10px">
          <num-input
            v-if="ruleforms.hard_worker_have_house == 1"
            v-model="ruleforms.hard_worker_house_area"
            :fixedNum="2"
            :isString="true"
            unit="㎡"
          ></num-input>
        </div>
      </el-form-item>
      <el-form-item class="form-item-long must" label="致困原因：">
        <el-input
          v-model="ruleforms.hard_worker_reason"
          type="textarea"
          placeholder="请输入"
          rows="4"
          class="el-textarea-box"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long must" label="已接收帮扶情况：">
        <el-input
          v-model="ruleforms.hard_worker_help_desc"
          type="textarea"
          placeholder="请输入"
          rows="4"
          class="el-textarea-box"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="获得公司及以上荣誉情况：">
        <el-input
          v-model="ruleforms.hard_worker_honor_desc"
          type="textarea"
          placeholder="请输入"
          rows="4"
          class="el-textarea-box"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long">
        <p class="main text-left linheight">
          温馨提示：下方附件添加分为3类，包括：①困难职工本人身份证、银行卡及家庭成员身份证、户口本复印件；②工资收入证明；③医院诊断证明、住院病历首页及医保报销结算单复印件
        </p>
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
        hard_worker_id: null,
        hard_worker_revise_info_id_union: null,
        hard_worker_organ_id_union: "",
        hard_worker_age: null, //年龄
        hard_worker_account_id_union: "", //姓名id
        hard_worker_hard_type: null,
        hard_worker_name: "", //姓名
        hard_worker_sex: "", //性别
        hard_worker_nation: "", //民族
        hard_worker_job: "", //职务
        hard_worker_identify: "", // 身份证
        hard_worker_political: "", //政治面貌
        hard_worker_marriage: "", //婚姻状况
        hard_worker_health: "", //健康状况
        hard_worker_is_low_insurance: "", //地方低保
        hard_worker_tel: "", //联系方式
        hard_worker_home_location: "", //家庭住址
        hard_worker_reason: "", //致困原因
        hard_worker_is_membership: "", // 有无工会会员
        hard_worker_income: "", //本人月均收入
        hard_worker_home_in_come: "", //家庭年收入
        hard_worker_home_num: null, //家庭人口数
        hard_worker_home_avg_in_come: "", //家庭人均年收入
        hard_worker_have_house: "", //是否有住房
        hard_worker_help_desc: "", //帮扶情况
        hard_worker_house_area: "", //建筑面积
        hard_worker_honor_desc: "", //公司荣誉
        hard_worker_bank_num: "", //银行卡号
        hard_worker_bank: "", //开户行
        hard_worker_pic: "",
        hard_worker_file: "",
        hard_worker_sub_time: this.$utils.getCurrentTime(),
      },
      rules: {
        hard_worker_organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        hard_worker_name: [
          {
            required: true,
            message: "请选择姓名",
          },
        ],
        hard_worker_sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        hard_worker_age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        hard_worker_nation: [
          {
            required: true,
            message: "请输入民族",
          },
        ],
        hard_worker_hard_type: [
          {
            required: true,
            message: "请选择困难职工申请类别",
          },
        ],
        hard_worker_political: [
          {
            required: true,
            message: "请选择政治面貌",
          },
        ],
        hard_worker_marriage: [
          {
            required: true,
            message: "请选择婚姻状况",
          },
        ],
        hard_worker_health: [
          {
            required: true,
            message: "请选择健康状况",
          },
        ],
        hard_worker_tel: [
          {
            required: true,
            message: "请输入联系方式",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
        hard_worker_home_location: [
          {
            required: true,
            message: "请输入家庭住址",
          },
        ],
        hard_worker_income: [
          {
            required: true,
            message: "请输入本人月均收入",
          },
        ],
        hard_worker_home_in_come: [
          {
            required: true,
            message: "请输入家庭年均总收入",
          },
        ],
        hard_worker_home_num: [
          {
            required: true,
            message: "请输入家庭人口数",
          },
        ],
        hard_worker_home_avg_in_come: [
          {
            required: true,
            message: "请输入家庭人均年收入",
          },
        ],
        hard_worker_job: [
          {
            required: true,
            message: "请输入职务",
          },
        ],
        hard_worker_bank_num: [
          {
            required: true,
            message: "请输入职工银行卡号",
          },
        ],
        hard_worker_identify: [
          {
            required: true,
            message: "请输入身份证号",
          },
          {
            pattern:
              /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
            message: "身份证号格式错误",
          },
        ],
        hard_worker_is_membership: [
          {
            required: true,
            message: "请选择是否持有工会会员",
          },
        ],
        hard_worker_is_low_insurance: [
          {
            required: true,
            message: "请选择是否纳入地方低保",
          },
        ],

        hard_worker_have_house: [
          {
            required: true,
            message: "请选择是否有住房",
          },
        ],
        hard_worker_reason: [
          {
            required: true,
            message: "请输入致困原因",
          },
        ],
        hard_worker_help_desc: [
          {
            required: true,
            message: "请输入已接收帮扶情况",
          },
        ],
      },
      // 性别
      sexBox: [
        { sex: "男", id: "1" },
        { sex: "女", id: "2" },
      ],
      // 政治面貌
      politicsBox: [
        { type: "中共党员", id: 1 },
        { type: "中共预备党员", id: 2 },
        { type: "共青团员", id: 3 },
        { type: "普通居民", id: 13 },
      ],
      // 婚姻状况
      marriageBox: [
        { type: "未婚", id: 1 },
        { type: "已婚", id: 2 },
        { type: "丧偶", id: 3 },
        { type: "离婚", id: 4 },
      ],
      // 健康状况
      healthBox: [
        { type: "健康", id: 1 },
        { type: "亚健康", id: 2 },
        { type: "疾病", id: 3 },
      ],
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
      this.ruleforms.hard_worker_account_id_union = Number(
        this.$store.getters.account_id
      );
      this.$set(
        this.ruleforms,
        "hard_worker_name",
        this.$store.getters.userName
      );
      this.$set(
        this.ruleforms,
        "hard_worker_job",
        this.$store.getters.account_job
      );
      this.$set(
        this.ruleforms,
        "hard_worker_tel",
        this.$store.getters.account_tel
      );
      this.$set(
        this.ruleforms,
        "hard_worker_sex",
        this.$store.getters.account_sex
      );
      this.ruleforms.hard_worker_organ_id_union =
        this.$store.getters.user_organ_id;
    } else {
      this.queryUnionPartyHardWorker();
    }
  },
  methods: {
    async queryUnionPartyHardWorker() {
      let { result } = await api.queryUnionPartyHardWorker({
        hard_worker_id: this.editID,
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
      this.ruleforms.hard_worker_account_id_union = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.ruleforms.hard_worker_name = result[0].account_name;
      this.ruleforms.hard_worker_job = result[0].account_job;
      this.ruleforms.hard_worker_tel = result[0].account;
      this.ruleforms.hard_worker_sex = result[0].account_sex;
      this.$refs.dialog.cancel();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.hard_worker_organ_id_union = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    //失焦事件（计算家庭人均收入）
    avgCome() {
      if (
        this.ruleforms.hard_worker_home_in_come &&
        this.ruleforms.hard_worker_home_num
      ) {
        this.ruleforms.hard_worker_home_avg_in_come = (
          this.ruleforms.hard_worker_home_in_come /
          this.ruleforms.hard_worker_home_num
        ).toFixed(2);
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
      if (this.ruleforms.hard_worker_have_house == 1) {
        if (!this.ruleforms.hard_worker_house_area) {
          this.$tip({
            isTip: true,
            message: "请输入住房面积",
          });
          return;
        }
      }
      if (this.ruleforms.hard_worker_have_house == 0) {
        this.ruleforms.hard_worker_house_area = "";
      }
      let file_obj = { uploadFileModule: "UnionPartyHardWorker" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.hard_worker_pic = picsjson.file;
      this.ruleforms.hard_worker_file = filejson.file;
      if (!isSave) {
        this.ruleforms.hard_worker_pic_json = picsjson.file_json;
        this.ruleforms.hard_worker_file_json = filejson.file_json;
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
      this.isAdd && (subdata.hard_worker_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateUnionPartyHardWorker"
            : "uploadUnionPartyHardWorker"
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
