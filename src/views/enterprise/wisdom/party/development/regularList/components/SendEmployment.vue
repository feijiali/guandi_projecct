<template>
  <n-dialog
    ref="dialog"
    :diaTit="'下发转正通知单'"
    :diaWidth="'50%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="mt-2 mr-2">
          <p class="f18 text-center fwb black lets1">预备党员转正通知书</p>
          <div class="d-flex justify-content-between notice-box mt-2">
            <div>
              <div-editable
                style="min-width: 60px"
                v-model="ruleform.pd_official_company"
              ></div-editable
              >党支部：
            </div>
            <div>
              [
              <div-editable v-model="ruleform.num1"></div-editable>] 第
              <div-editable v-model="ruleform.num2"></div-editable>号
            </div>
          </div>
          <div style="line-height: 30px" class="mt-1">
            <span style="text-indent: 35px" class="d-inline-block"
              >经县直机关工委</span
            >
            <div-editable v-model="form.year1"></div-editable>年
            <div-editable v-model="form.month1"></div-editable>月
            <div-editable v-model="form.day1"></div-editable>
            日会议研究，同意{{
              infoData.account_name
            }}同志按期转为中共正式党员，党龄从
            <div-editable v-model="form.year2"></div-editable>年
            <div-editable v-model="form.month2"></div-editable>月
            <div-editable v-model="form.day2"></div-editable>日起计算。
          </div>
          <div class="mt-1" style="text-indent: 35px">特此通知。</div>
          <div class="text-right mt-1">
            <div class="d-inline-block">
              {{ form.year3 }}年{{ form.month3 }}月{{ form.day3 }}日
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-08 mt-2">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import DivEditable from "./DivEditable";

export default {
  components: {
    DivEditable,
  },
  data() {
    return {
      ruleform: {},
      form: {
        year1: "",
        month1: "",
        day1: "",
        year2: "",
        month2: "",
        day2: "",
        year3: new Date().getFullYear(),
        month3: new Date().getMonth() + 1,
        day3: new Date().getDate(),
      }, //时间参数
      infoData: {},
    };
  },
  methods: {
    sendFile(row) {
      this.infoData = row;
      this.$refs.dialog.show();
    },
    // 确认提交（下发转正通知单）
    async submitFun() {
      if (!this.ruleform.pd_official_company) {
        this.$tip({
          isTip: true,
          message: "请输入公司名称",
        });
        return;
      }
      if (!this.ruleform.num1 || !this.ruleform.num2) {
        this.$tip({
          isTip: true,
          message: "请输入字号",
        });
        return;
      }
      if (!this.form.year1 || !this.form.month1 || !this.form.day1) {
        this.$tip({
          isTip: true,
          message: "请输入会议研究时间",
        });
        return;
      }
      if (!this.form.year2 || !this.form.month2 || !this.form.day2) {
        this.$tip({
          isTip: true,
          message: "请输入党龄开始时间",
        });
        return;
      }
      let subdata = {};
      subdata.personnel_develop_id = this.infoData.personnel_develop_id;
      subdata.pd_states = 10;
      subdata.pd_official_company = this.ruleform.pd_official_company;
      subdata.pd_official_number = `[${this.ruleform.num1}]第${this.ruleform.num2}号`;
      subdata.pd_official_meeting_time = `${this.form.year1}-${
        this.form.month1 > 10 ? this.form.month1 : "0" + this.form.month1
      }-${this.form.day1 > 10 ? this.form.day1 : "0" + this.form.day1}`;
      subdata.pd_official_start_time = `${this.form.year2}-${
        this.form.month2 > 10 ? this.form.month2 : "0" + this.form.month2
      }-${this.form.day2 > 10 ? this.form.day2 : "0" + this.form.day2}`;
      subdata.pd_file = this.infoData.pd_file;
      subdata.pd_pic = this.infoData.pd_pic;
      let res = await api.updateUnionPartyPersonnelDevelopStates(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          this.$parent.refreshData();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>