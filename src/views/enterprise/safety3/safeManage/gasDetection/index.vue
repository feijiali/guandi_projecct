<template>
  <div class="h-100 flexsta flex-column">
    <div class="d-flex align-items-center justify-content-between w-100">
      <div>
        <div class="d-inline-block">
          <label class="text-secondary">工程项目：</label>
          <el-select
            v-model="listQuery.organ_node"
            @change="change"
            placeholder="请选择"
          >
            <el-option
              v-for="item in projectListSelect"
              :key="item.organ_id"
              :label="item.organ"
              :value="item.organ_id"
            ></el-option>
          </el-select>
        </div>
        <div class="d-inline-block">
          <span class="text-secondary ml-2">工区：</span>
          <el-select
            v-model="organ_id_union"
            placeholder="请选择"
            @change="changeOrganIdUnion"
          >
            <el-option
              v-for="item in organArr"
              :key="item.organ_id"
              :label="item.organ"
              :value="item.organ_id"
            ></el-option>
          </el-select>
        </div>
        <div class="d-inline-block ml-2">
          <span class="grey2">日期：</span>
          <el-date-picker
            v-if="!isMonth"
            :clearable="false"
            v-model="listQuery.update_time"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            @change="refreshData"
            placeholder="请选择"
          >
          </el-date-picker>
          <el-date-picker
            v-if="isMonth"
            :clearable="false"
            v-model="listQuery.update_time"
            :picker-options="pickerOptions"
            format="yyyy-MM"
            value-format="yyyy-MM"
            type="month"
            @change="refreshData"
            placeholder="请选择"
          >
          </el-date-picker>
        </div>
        <div class="btn-box ml-2" @click="switchMonthOrDay">
          <span>{{ !isMonth ? "查看月累计" : "查看日累计" }}</span>
        </div>
      </div>
      <div class="flexsta">
        <div class="gas-headbox">高报警次数：{{ high }}</div>
        <div class="gas-headbox ml-2">低报警次数：{{ low }}</div>
      </div>
    </div>
    <div class="flexfull mt-1 w-100 flexsta">
      <div class="flexfull flexsta flex-column h-100">
        <div class="flexsta flexfull w-100">
          <div
            class="rounded-1 flexsta position-relative flex-column h-100 p-2 wtbg flexfull cusp"
          >
            <div class="font-20 w-100">甲烷</div>
            <n-LineChart
              :fontSize="14"
              :markLineData="markLineData1"
              class="chart-item"
              :textArr="textArr1"
              :dataList="data1"
              :colUnit="'%VOL'"
              :id="'lq_11'"
            ></n-LineChart>
          </div>
          <div
            class="rounded-1 flexsta position-relative flex-column h-100 p-2 wtbg flexfull cusp ml-1"
          >
            <div class="font-20 w-100">氧气</div>
            <n-LineChart
              :fontSize="14"
              :markLineData="markLineData3"
              class="chart-item"
              :textArr="textArr3"
              :dataList="data3"
              :colUnit="'%VOL'"
              :id="'lq_33'"
            ></n-LineChart>
          </div>
        </div>
        <div class="flexsta mt-1 flexfull w-100">
          <div
            class="rounded-1 flexsta position-relative flex-column h-100 p-2 wtbg flexfull cusp"
          >
            <div class="font-20 w-100">一氧化碳</div>
            <n-LineChart
              :fontSize="14"
              :markLineData="markLineData2"
              class="chart-item"
              :textArr="textArr2"
              :dataList="data2"
              :colUnit="'PPM'"
              :id="'lq_22'"
            ></n-LineChart>
          </div>
          <div
            class="rounded-1 flexsta position-relative flex-column h-100 p-2 wtbg flexfull cusp ml-1"
          >
            <div class="font-20 w-100">硫化氢</div>
            <n-LineChart
              :fontSize="14"
              :markLineData="markLineData4"
              class="chart-item"
              :textArr="textArr4"
              :dataList="data4"
              :colUnit="'PPM'"
              :id="'lq_44'"
            ></n-LineChart>
          </div>
        </div>
      </div>
      <div class="p-2 h-100 rounded-1 wtbg ml-2" v-if="!isMonth">
        <div class="font-14 font-weight-bold">实时数据</div>
        <div class="mt-2">
          <div>甲烷 (%VOL)</div>
          <div
            class="font-weight-bold mt-05 font-14"
            :style="{ color: colorArr[dataInTime.typech4] }"
          >
            {{ dataInTime.ch4 }}
          </div>
        </div>
        <div class="mt-2">
          <div>氧气 (%VOL)</div>
          <div
            class="font-weight-bold mt-05 font-14"
            :style="{ color: colorArr[dataInTime.typeo2] }"
          >
            {{ dataInTime.o2 }}
          </div>
        </div>
        <div class="mt-2">
          <div>一氧化碳 (PPM)</div>
          <div
            class="font-weight-bold mt-05 font-14"
            :style="{ color: colorArr[dataInTime.typeco] }"
          >
            {{ dataInTime.co }}
          </div>
        </div>
        <div class="mt-2">
          <div>硫化氢 (PPM)</div>
          <div class="font-weight-bold mt-05 font-14">
            {{ dataInTime.h2s }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import chart from "./components/Chart";

export default {
  components: {
    nLineChart: chart,
  },
  data() {
    return {
      apiName: "queryGasDetectSensorRecord",
      isMonth: false, //判断日累计还是月累计
      listQuery: {
        organ_id_union: null,
        update_time: this.$utils.getCurrentTime("", "", ""),
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      textArr1: [],
      textArr2: [],
      textArr3: [],
      textArr4: [],
      data1: [
        { data: [], color: "#ff9b21", areaColor: ["#ff9b21", "#ff9b21"] },
      ],
      data2: [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ],
      data3: [
        { data: [], color: "#f73e68", areaColor: ["#F15B5D", "#F15B5Dcc"] },
      ],
      data4: [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ],
      markLineData1: [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ],
      markLineData2: [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ],
      markLineData3: [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ],
      markLineData4: [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dataInTime: {
        ch4: 0,
        o2: 0,
        co: 0,
        h2s: 0,
      },
      // chartConfig: JSON.parse(JSON.stringify(CHART_CONFIG)),
      // typeKeys: [],
      organArr: [], //单元工程
      high: 0, //高报警
      low: 0, //低报警
      colorArr: ["", "#F9F209", "#F90909", "#F9F209", "#F90909"],
      getListBool: false,
      organ_id_union: null,
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async created() {
    this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    await this.queryType();
    this.listQuery.organ_id_union = this.listQuery.organ_id_union
      ? this.listQuery.organ_id_union
      : this.projectListSelect[0].organ_id;
    this.getData();
  },
  methods: {
    async change(val) {
      this.listQuery.organ_node = val;
      await this.queryType();
      this.getData();
    },
    // 切换工区
    changeOrganIdUnion(val) {
      this.listQuery.organ_id_union = val;
      this.getData();
    },
    // 查询项目下的工区
    async queryType() {
      this.organ_id_union = null;
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.listQuery.organ_node,
      });
      this.organArr = res.result;
      this.listQuery.organ_id_union = this.organArr[0]
        ? this.organArr[0].organ_id
        : this.listQuery.organ_node;
    },
    refreshData() {
      this.textArr1 = [];
      this.textArr2 = [];
      this.textArr3 = [];
      this.textArr4 = [];
      this.data1 = [
        { data: [], color: "#ff9b21", areaColor: ["#ff9b21", "#ff9b21"] },
      ];
      this.data2 = [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ];
      this.data3 = [
        { data: [], color: "#f73e68", areaColor: ["#F15B5D", "#F15B5Dcc"] },
      ];
      this.data4 = [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ];
      this.markLineData1 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData2 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData3 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData4 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.currentPage = 1;
      this.getData();
    },
    switchMonthOrDay() {
      this.textArr1 = [];
      this.textArr2 = [];
      this.textArr3 = [];
      this.textArr4 = [];
      this.data1 = [
        { data: [], color: "#ff9b21", areaColor: ["#ff9b21", "#ff9b21"] },
      ];
      this.data2 = [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ];
      this.data3 = [
        { data: [], color: "#f73e68", areaColor: ["#F15B5D", "#F15B5Dcc"] },
      ];
      this.data4 = [
        { data: [], color: "#6579ff", areaColor: ["#6579ff", "#6579ff"] },
      ];
      this.markLineData1 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData2 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData3 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.markLineData4 = [
        {
          name: "高报警",
          xAxis: 0,
          yAxis: 0,
        },
        {
          name: "低报警",
          xAxis: 0,
          yAxis: 0,
        },
      ];
      this.isMonth = !this.isMonth;
      this.apiName = !this.isMonth
        ? "queryGasDetectSensorRecord"
        : "queryGasDetectSensorRecordDuration";
      this.listQuery.update_time = !this.isMonth
        ? this.$utils.getCurrentTime("", "", "")
        : this.$utils.getCurrentTime("", "", "month");
      this.getData();
    },
    async getData() {
      this.high = 0;
      this.low = 0;
      api[this.apiName]({
        organ_id_union: this.listQuery.organ_id_union,
        update_time: this.listQuery.update_time,
        sensor_name: "甲烷",
      }).then((data) => {
        this.dataInTime.ch4 = 0;
        let ch4hight = 0;
        let ch4low = 0;
        if (data.result[0]) {
          let list = data.result[0].symbols_list
            ? data.result[0].symbols_list
            : [];
          let xdata = [],
            ydata = [];
          if (!this.isMonth) {
            this.dataInTime.ch4 = data.result[0].last_sensor_value;
            this.dataInTime.typech4 = parseInt(data.result[0].alarm_type);
          }
          ch4hight = data.result[0].high;
          ch4low = data.result[0].low;
          this.high += ch4hight;
          this.low += ch4low;
          this.markLineData1 = [
            {
              name: "高报警",
              xAxis: 0,
              yAxis: data.result[0].high_alarm,
            },
            {
              name: "低报警",
              xAxis: 0,
              yAxis: data.result[0].low_alarm,
            },
          ];
          list.forEach((item) => {
            const time = this[this.isMonth ? "convertTime2" : "convertTime1"](
              item.update_time
            );
            let t = time.split(" ")[0];
            const timeList = item.update_time.split(" ")[1].split(":");
            let times = `${timeList[0]}:${timeList[1]}`;
            !this.isMonth ? xdata.push(t) : xdata.push(t);
            ydata.push({
              value: item.sensor_value,
              type: item.alarm_type,
              name: "甲烷",
              time: times,
            });
          });
          this.$set(this, "textArr1", xdata);
          this.$set(this.data1[0], "data", ydata);
        }
      });

      api[this.apiName]({
        organ_id_union: this.listQuery.organ_id_union,
        update_time: this.listQuery.update_time,
        sensor_name: "一氧化碳",
      }).then((data2) => {
        this.dataInTime.co = 0;
        let cohight = 0;
        let colow = 0;
        if (data2.result[0]) {
          let list = data2.result[0].symbols_list
            ? data2.result[0].symbols_list
            : [];
          let xdata2 = [],
            ydata2 = [];
          if (!this.isMonth) {
            this.dataInTime.co = data2.result[0].last_sensor_value;
            this.dataInTime.typeco = parseInt(data2.result[0].alarm_type);
          }
          cohight = data2.result[0].high;
          colow = data2.result[0].low;
          this.high += cohight;
          this.low += colow;
          this.markLineData2 = [
            {
              name: "高报警",
              xAxis: 0,
              yAxis: data2.result[0].high_alarm,
            },
            {
              name: "低报警",
              xAxis: 0,
              yAxis: data2.result[0].low_alarm,
            },
          ];
          list.forEach((item) => {
            const time = this[this.isMonth ? "convertTime2" : "convertTime1"](
              item.update_time
            );
            let t = time.split(" ")[0];
            const timeList = item.update_time.split(" ")[1].split(":");
            let times = `${timeList[0]}:${timeList[1]}`;
            !this.isMonth ? xdata2.push(t) : xdata2.push(t);
            ydata2.push({
              value: item.sensor_value,
              type: item.alarm_type,
              name: "一氧化碳",
              time: times,
            });
          });
          this.$set(this, "textArr2", xdata2);
          this.$set(this.data2[0], "data", ydata2);
        }
      });

      await api[this.apiName]({
        organ_id_union: this.listQuery.organ_id_union,
        update_time: this.listQuery.update_time,
        sensor_name: "氧气",
      }).then((data3) => {
        this.dataInTime.o2 = 0;
        let o2hight = 0;
        let o2low = 0;
        if (data3.result[0]) {
          let list = data3.result[0].symbols_list
            ? data3.result[0].symbols_list
            : [];
          let xdata3 = [],
            ydata3 = [];
          if (!this.isMonth) {
            this.dataInTime.o2 = data3.result[0].last_sensor_value;
            this.dataInTime.typeo2 = parseInt(data3.result[0].alarm_type);
          }
          o2hight = data3.result[0].high;
          o2low = data3.result[0].low;
          this.high += o2hight;
          this.low += o2low;
          this.markLineData3 = [
            {
              name: "高报警",
              xAxis: 0,
              yAxis: data3.result[0].high_alarm,
            },
            {
              name: "低报警",
              xAxis: 0,
              yAxis: data3.result[0].low_alarm,
            },
          ];
          list.forEach((item) => {
            const time = this[this.isMonth ? "convertTime2" : "convertTime1"](
              item.update_time
            );
            let t = time.split(" ")[0];
            const timeList = item.update_time.split(" ")[1].split(":");
            let times = `${timeList[0]}:${timeList[1]}`;
            !this.isMonth ? xdata3.push(t) : xdata3.push(t);
            ydata3.push({
              value: item.sensor_value,
              type: item.alarm_type,
              name: "氧气",
              time: times,
            });
          });
          this.$set(this, "textArr3", xdata3);
          this.$set(this.data3[0], "data", ydata3);
        }
      });

      api[this.apiName]({
        organ_id_union: this.listQuery.organ_id_union,
        update_time: this.listQuery.update_time,
        sensor_name: "硫化氢",
      }).then((data4) => {
        this.dataInTime.h2s = 0;
        let h2shight = 0;
        let h2slow = 0;
        if (data4.result[0]) {
          let list = data4.result[0].symbols_list
            ? data4.result[0].symbols_list
            : [];
          let xdata4 = [],
            ydata4 = [];
          if (!this.isMonth) {
            this.dataInTime.h2s = data4.result[0].last_sensor_value;
            this.dataInTime.typeh2s = parseInt(data4.result[0].alarm_type);
          }
          h2shight = data4.result[0].high;
          h2slow = data4.result[0].low;
          this.high += h2shight;
          this.low += h2slow;
          this.markLineData4 = [
            {
              name: "高报警",
              xAxis: 0,
              yAxis: data4.result[0].high_alarm,
            },
            {
              name: "低报警",
              xAxis: 0,
              yAxis: data4.result[0].low_alarm,
            },
          ];
          list.forEach((item) => {
            const time = this[this.isMonth ? "convertTime2" : "convertTime1"](
              item.update_time
            );
            let t = time.split(" ")[0];
            const timeList = item.update_time.split(" ")[1].split(":");
            let times = `${timeList[0]}:${timeList[1]}`;
            !this.isMonth ? xdata4.push(t) : xdata4.push(t);
            ydata4.push({
              value: item.sensor_value,
              type: item.alarm_type,
              name: "硫化氢",
              time: times,
            });
          });
          this.$set(this, "textArr4", xdata4);
          this.$set(this.data4[0], "data", ydata4);
        }
      });

      // this.high = ch4hight + cohight + o2hight + h2shight;
      // this.low = ch4low + colow + o2low + h2slow;
    },
    convertTime1(date) {
      const timeList = date.split(" ")[1].split(":");
      return `${timeList[0]}:${timeList[1]}`;
    },
    convertTime2(date) {
      const timeList = date.split("-");
      return `${timeList[1]}-${timeList[2]}`;
    },
  },
};
</script>

<style scoped lang="scss">
.chart-item {
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100% - 20px);
}
.flexfull {
  flex: 1;
}
.btn-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 0 20px;
  height: 41px;
  border: 1px solid $main;
  color: $main;
  line-height: 36px;
  cursor: pointer;
}
.gas-headbox {
  background-color: $main;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
</style>
