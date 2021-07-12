<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="人员姓名：">
            <el-input
              :disabled="true"
              class="input-m"
              v-model="ruleform.attendance_wage_account_name"
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="累计出勤天数："
          >
            <num-input
              :disabled="true"
              placeholder="自动获取"
              v-model="ruleform.attendance_wage_attendance_day"
              :fixedNum="1"
              unit="天"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="岗位工资：">
            <num-input
              placeholder="自动获取"
              v-model="ruleform.account_basic_wage"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工龄：">
            <el-input
              :disabled="true"
              class="input-m"
              v-model="ruleform.attendance_wage_year"
              placeholder="自动获取"
              ><template slot="append">年</template></el-input
            >
          </el-form-item>
          <el-form-item class="form-item-long-small" label="职位补贴：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_subsidy_job"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="注册资格：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_subsidy_rank"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="工龄工资：">
            <num-input
              :disabled="true"
              placeholder="自动计算"
              v-model="ruleform.attendance_wage_basic_year"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="测量津贴：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_subsidy_measure"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>

          <el-form-item class="form-item-long-small" label="生活费：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_live"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="个人社保：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_deduct"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="公司社保：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_deduct_company"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="其他补贴：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_subsidy_other"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="应发工资：">
            <num-input
              placeholder="自动计算"
              v-model="shall_payment"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="已发工资：">
            <num-input
              placeholder="请输入"
              v-model="ruleform.attendance_wage_real_payment"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="欠发工资：">
            <num-input
              placeholder="自动计算"
              v-model="wage_arrears"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="备注：">
            <el-input
              class="input-m"
              v-model="ruleform.attendance_wage_remark"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-height"
            label="天工资："
          >
            <span class="text-hover-primary">{{ wage_basic_day }}元</span>
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
import upload from "@/mixins/upload";
import dayjs from "dayjs";
export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      statusArr: ["在职", "实习", "试用", "离职"],
      printDataArr: ["小学", "初中", "高中", "大专", "本科", "硕士", "博士"],
      rangeTypeArr: ["项目", "总部"], //角色数组
      organCompanyArr: [], //社保公司
      ruleform: {
        attendance_wage_id: 0,
        attendance_wage_account_id_union: 0,
        attendance_wage_year: "",
        attendance_wage_month: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
        attendance_wage_attendance_day: 0,
        account_basic_wage: 0, //岗位工资
        attendance_wage_sub_account_id_union: 0,
        attendance_wage_sub_time: "",
        attendance_wage_remark: "",
        attendance_wage_subsidy_rank: 0,
        attendance_wage_subsidy_job: 0,
        attendance_wage_basic_year: 0,
        attendance_wage_basic_day: 0,
        attendance_wage_live: 0,
        attendance_wage_subsidy_measure: 0,
        attendance_wage_subsidy_other: 0,
        attendance_wage_real_payment: 0,
        attendance_wage_shall_payment: 0,
        attendance_wage_arrears: 0,
        attendance_wage_deduct: 0,
        attendance_wage_deduct_company: 0,
      },
      roleArr: [], //角色权限名称数组

      rules: {
        // attendance_wage_account_name: [
        //   {
        //     required: true,
        //     message: "请输入人员姓名",
        //   },
        // ],
        attendance_wage_attendance_day: [
          {
            required: true,
            message: "请输入累计出勤天数",
          },
        ],
        account_basic_wage: [
          {
            required: true,
            message: "请输入岗位工资",
          },
        ],
        // attendance_wage_year: [
        //   {
        //     required: true,
        //     message: "请输入工龄",
        //   },
        // ],
      },
      month: this.$route.query.month,
      account_id: parseInt(this.$route.query.account_id),
      attendance_wage_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  computed: {
    extraMoney() {
      return (
        (this.ruleform.attendance_wage_subsidy_job
          ? this.ruleform.attendance_wage_subsidy_job
          : 0) +
        (this.ruleform.attendance_wage_subsidy_rank
          ? this.ruleform.attendance_wage_subsidy_rank
          : 0) +
        (this.ruleform.attendance_wage_live
          ? this.ruleform.attendance_wage_live
          : 0) +
        (this.ruleform.attendance_wage_subsidy_measure
          ? this.ruleform.attendance_wage_subsidy_measure
          : 0) +
        (this.ruleform.attendance_wage_subsidy_other
          ? this.ruleform.attendance_wage_subsidy_other
          : 0) +
        (this.ruleform.attendance_wage_basic_year
          ? this.ruleform.attendance_wage_basic_year
          : 0)
      );
    },
    shall_payment() {
      // 应发工资计算  应发工资 =附加工资+岗位工资÷月天数×出勤天数-社保个人
      return (
        this.extraMoney +
        ((this.ruleform.account_basic_wage
          ? this.ruleform.account_basic_wage
          : 0) /
          dayjs(this.month).daysInMonth()) *
          (this.ruleform.attendance_wage_attendance_day
            ? this.ruleform.attendance_wage_attendance_day
            : 0) -
        (this.ruleform.attendance_wage_deduct
          ? this.ruleform.attendance_wage_deduct
          : 0)
      );
    },
    wage_basic_day() {
      // 天工资计算 （附加工资+岗位工资÷月天数×出勤天数+公司社保）÷月天数；天工资会用于计算人工每天的成本
      return (
        (this.extraMoney +
          ((this.ruleform.account_basic_wage
            ? this.ruleform.account_basic_wage
            : 0) /
            dayjs(this.month).daysInMonth()) *
            (this.ruleform.attendance_wage_attendance_day
              ? this.ruleform.attendance_wage_attendance_day
              : 0) +
          (this.ruleform.attendance_wage_deduct_company
            ? this.ruleform.attendance_wage_deduct_company
            : 0)) /
        dayjs(this.month).daysInMonth()
      ).toFixed(2);
    },
    wage_arrears() {
      // 欠发工资计算 欠发工资=应发工资-已发工资
      let arrrars = parseFloat(
        this.shall_payment - this.ruleform.attendance_wage_real_payment
      );
      return arrrars >= 0 ? arrrars : 0;
    },
  },
  async mounted() {
    this.ruleform.attendance_wage_account_name = this.$store.getters.userName;
    this.ruleform.attendance_wage_account_id_union = Number(
      this.$store.getters.account_id
    );
    if (this.account_id) {
      this.title = "编辑考勤工资";
      await this.queryOAAttendanceWageInner();
    } else {
      this.title = "新增考勤工资";
      await this.queryAccountRole();
    }
  },
  methods: {
    // 查询考勤工资编辑内容
    async queryOAAttendanceWageInner() {
      let data = await api.queryOAAttendanceWageInner({
        account_id: this.account_id,
        attendance_wage_month: this.month,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.ruleform.attendance_wage_account_name = info.account_name;
      this.ruleform.attendance_wage_account_id_union = info.account_id;
      this.ruleform.attendance_wage_month =
        this.ruleform.attendance_wage_month || this.month;
    },
    // 查询人员详情
    async queryAccountRole() {
      let data = await api.queryAccountDetails({
        account_id: this.account_id,
      });
      let info = data.result[0];
      this.ruleform.attendance_wage_account_id_union = info.account_id || 0;
      this.ruleform.account_basic_wage = info.account_basic_wage;
      this.ruleform.attendance_wage_year =
        String(info.account_service_length) || "0";
      this.ruleform.attendance_wage_account_name = info.account_name;
      this.ruleform.attendance_wage_basic_year =
        this.ruleform.attendance_wage_year * 20;

      let res = await api.queryOAAttendMonth({
        account_id: this.account_id,
        leave_date: this.month,
      });
      if (res.result[0]) {
        this.ruleform.attendance_wage_attendance_day = Number(
          res.result[0].attend_days
        );
      }
    },
    // 查询详情
    async queryOAAttendanceWage() {
      let data = await api.queryOAAttendanceWage({
        attendance_wage_id: this.attendance_wage_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.ruleform.attendance_wage_account_name = info.account_name;
      this.ruleform.attendance_wage_account_id_union = info.account_id;
    },
    aotuCalculation() {
      this.ruleform.attendance_wage_shall_payment = this.shall_payment;
      this.ruleform.attendance_wage_basic_day = Number(this.wage_basic_day);
      // 欠发工资计算 欠发工资=应发工资-已发工资
      this.ruleform.attendance_wage_arrears = this.wage_arrears;
    },
    // 确认提交
    async submitFun() {
      this.aotuCalculation();
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      let res = await api[
        `${
          this.attendance_wage_id
            ? "updateOAAttendanceWage"
            : "uploadOAAttendanceWage"
        }`
      ](subdata);
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
