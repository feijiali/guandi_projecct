<template>
  <div class="h-100 w-100 bg-secondary table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="bg-white rounded-1 flex-fill px-1 py-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long must" label="选择月份：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.set_up_month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择月份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long must" label="第几周：">
            <num-input v-model="ruleform.set_up_num" :fixedNum="0"></num-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="起止日期：">
            <el-date-picker
              style="width: 360px"
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
            ></el-date-picker>
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
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        set_up_id: null,
        set_up_month: "",
        set_up_month_int: null,
        set_up_num: null,
        set_up_start: "",
        set_up_start_int: null,
        set_up_end: "",
        set_up_end_int: null,
        set_up_sub_account_id_un: null,
        set_up_sub_time: "",
        set_up_sub_time_int: null,
      },
      time: [],
      rules: {
        set_up_month: [
          {
            required: true,
            message: "请选择月份",
          },
        ],
        set_up_num: [
          {
            required: true,
            message: "请输入第几周",
          },
        ],
        set_up_start: [
          {
            required: true,
            message: "请选择开始日期",
          },
        ],
        set_up_end: [
          {
            required: true,
            message: "请选择结束日期",
          },
        ],
      },
      set_up_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)),
    };
  },
  mounted() {
    if (this.set_up_id) {
      this.title = "编辑周设置";
      this.queryWeekManageSetUpList();
    } else {
      this.title = "新增周设置";
    }
  },
  methods: {
    //时间改变触发函数
    changeTime(val) {
      this.ruleform.set_up_start = this.time ? this.time[0] : "";
      this.ruleform.set_up_end = this.time ? this.time[1] : "";
    },
    async queryWeekManageSetUpList() {
      let res = await api.queryWeekManageSetUpList({
        set_up_id: this.set_up_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.time = [this.ruleform.set_up_start, this.ruleform.set_up_end];
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.ruleform.set_up_num == 0) {
        this.$tip({
          isTip: true,
          message: "周数设置要大于0",
        });
        return false;
      }
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      await api[
        this.set_up_id ? "updateWeekManageSetUp" : "uploadWeekManageSetUp"
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
