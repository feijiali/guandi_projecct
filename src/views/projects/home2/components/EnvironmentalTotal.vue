<template>
  <div class="posr heiall">
    <div class="chart_title d-flex align-items-center justify-content-between">
      <span class="black f16 fwb">环保预警</span>
      <div class="disi border1 bdr10 time-choose-single-box" @click.stop>
        <el-date-picker
          :clearable="false"
          class="home-date-box"
          ref="datePicker"
          v-model="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择"
          @change="changeDate"
        ></el-date-picker>
      </div>
    </div>
    <n-LineChart
      class="chart-item"
      :smooth="true"
      :textArr="textArr"
      :dataList="data"
      :colUnit="'次'"
      :id="'lq_2'"
    ></n-LineChart>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      month: this.$utils.getCurrentTime("", "", "month"),
      textArr: [],
      data: [{ data: [], color: "#5a5efd", areaColor: ["#7BB2FD", "#fff"] }],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      //   let data = await api.querySafeDailyInspectionStat({
      //     organ_node: this.$organ_id_en_or_pro(this),
      //     daily_inspection_year: this.year
      //   });
      //   let list = data.result;
      let xdata = [],
        ydata = [];
      //补全未上报天数
      let date = new Date();
      let currentDate = date.getDate();
      let currentMonth = date.getMonth() + 1;
      if (currentMonth < 10) {
        currentMonth = "0" + currentMonth;
      }
      if (currentMonth != this.month.split("-")[1]) {
        currentDate = new Date(
          this.month.split("-")[0],
          this.month.split("-")[1],
          0
        ).getDate();
      }
      for (var i = 1; i < currentDate + 1; i++) {
        let flag = true;
        if (i < 10) {
          i = "0" + i;
        }
        xdata.push(i);
        ydata.push(i + 5);
      }
      this.$set(this.data[0], "data", ydata);
      this.$set(this, "textArr", xdata);
    },
    changeDate(val) {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-item {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 43px;
  bottom: 0;
  padding: 10px;
}
</style>
