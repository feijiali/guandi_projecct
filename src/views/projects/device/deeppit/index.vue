<template>
  <div class="container-all">
    <div class="flex-fill">
      <div class="content-info-box clear h-100">
        <div
          class="content-info-box-left bg-white rounded-1 float-left flex-fill mr-1 ml-1"
          style="height: calc(100% - 50px)"
        >
          <!-- <EquipmentMap /> -->
          <div class="d-flex justify-content-start align-items-center ml-2">
            <span class="grey2">日期：</span>
            <div class="d-inline-block time-choose-range-box">
              <el-date-picker
                @change="refreshData"
                class="el-date-picker-range-box"
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
          <div
            class="content-info-box-left-main bg-white rounded-1 float-left h-100 flex-fill d-flex"
          >
            <div class="chart-box">
              <div
                class="bg-white rounded-1 device-pt-box w-100 p-1 position-relative cursor-p"
                @dblclick="linkTo('project_device1_deeppit_main', 1, 24)"
              >
                <div
                  class="chart_title d-flex justify-content-between align-items-center mb-1"
                >
                  <span class="text-dark font-14 font-weight-bold"
                    >静力水准报警/预警统计</span
                  >
                  <!-- <div>
                  <span class="legend_normal legendgreen-1"><b>Z</b></span>
                  <span class="mr-1">预警</span>
                  <span class="legend_normal legendgreen-2"><b>Z</b></span>
                  <span class="mr-1">报警</span>
                  <span class="legend_normal legendgreen-3"><b>Z</b></span>
                  <span class="mr-1">控制</span>
                </div> -->
                </div>
                <n-LineChart
                  class="chart-item"
                  :rotate="'62'"
                  :smooth="true"
                  :textArr="textArr1"
                  :dataList="data1"
                  :colUnit="'次'"
                  :id="'lq_1'"
                ></n-LineChart>
              </div>
            </div>
            <div class="chart-box">
              <div
                class="bg-white rounded-1 device-pt-box w-100 p-1 position-relative cursor-p"
                @dblclick="linkTo('project_device1_deeppit_main', 3, 75)"
              >
                <div
                  class="chart_title d-flex justify-content-between align-items-center mb-1"
                >
                  <span class="text-dark font-14 font-weight-bold"
                    >土压力盒报警/预警统计</span
                  >
                  <!-- <div>
                  <span class="legend_normal legendgreen-1"><b>Z</b></span>
                  <span class="mr-1">预警</span>
                  <span class="legend_normal legendgreen-2"><b>Z</b></span>
                  <span class="mr-1">报警</span>
                  <span class="legend_normal legendgreen-3"><b>Z</b></span>
                  <span class="mr-1">控制</span>
                </div> -->
                </div>
                <n-LineChart
                  class="chart-item"
                  :rotate="'62'"
                  :smooth="true"
                  :textArr="textArr2"
                  :dataList="data2"
                  :colUnit="'次'"
                  :id="'lq_3'"
                ></n-LineChart>
              </div>
            </div>
            <div class="chart-box">
              <div
                class="bg-white rounded-1 device-pt-box w-100 p-1 position-relative cursor-p"
                @dblclick="linkTo('project_device1_deeppit_main', 5, 352)"
              >
                <div
                  class="chart_title d-flex justify-content-between align-items-center mb-1"
                >
                  <span class="text-dark font-14 font-weight-bold"
                    >倾角计报警/预警统计</span
                  >
                  <!-- <div>
                  <span class="legend_normal legendgreen-1"><b>Z</b></span>
                  <span class="mr-1">预警</span>
                  <span class="legend_normal legendgreen-2"><b>Z</b></span>
                  <span class="mr-1">报警</span>
                  <span class="legend_normal legendgreen-3"><b>Z</b></span>
                  <span class="mr-1">控制</span>
                </div> -->
                </div>
                <n-LineChart
                  class="chart-item"
                  :rotate="'62'"
                  :smooth="true"
                  :textArr="textArr3"
                  :dataList="data3"
                  :colUnit="'次'"
                  :id="'lq_5'"
                ></n-LineChart>
              </div>
            </div>
          </div>
        </div>
        <div
          class="content-info-box-right flot-right position-relative d-flex justify-content-between align-items-center flex-column"
          style="height: calc(100% - 10px)"
        >
          <div
            class="bg-white rounded-1 device-tz-box w-100 p-2 position-relative"
          >
            <!-- <h3>设备名称</h3> -->
            <el-scrollbar style="height: 100%" :native="false" class="w-100">
              <div class="point-list">
                <div
                  class="cursor-p mt-2"
                  :class="colorId == index + 1 ? 'device_type' : ''"
                  @click="chooseIt(item)"
                  v-for="(item, index) in datalist"
                  :key="index"
                >
                  {{ item.point_name }}
                </div>
              </div>
            </el-scrollbar>
            <div class="btn-deep cursor-p" @click="intoDeeppit">
              进入深基坑系统
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import EquipmentMap from "./components/EquipmentMap.vue";
export default {
  data() {
    return {
      colorId: 1,
      dateRange: [
        this.$utils.fun_date(-7).replace(/-/g, ""),
        this.$utils.getCurrentTime("", "", "day").replace(/-/g, ""),
      ], //日期范围
      datalist: [], //设备列表
      listQuery: {},
      textArr1: [],
      textArr2: [],
      textArr3: [],
      data1: [
        {
          data: [],
          color: "#5D71FD",
          areaColor: ["#CDD4FE", "#fff"],
          name: "预警",
        },
        {
          data: [],
          color: "#ff9024",
          areaColor: ["#ff9024", "#fff"],
          name: "控制",
        },
        {
          data: [],
          color: "#F72C6B",
          areaColor: ["#fe93b9", "#fff"],
          name: "报警",
        },
      ],
      data2: [
        {
          data: [],
          color: "#5D71FD",
          areaColor: ["#CDD4FE", "#fff"],
          name: "预警",
        },
        {
          data: [],
          color: "#ff9024",
          areaColor: ["#ff9024", "#fff"],
          name: "控制",
        },
        {
          data: [],
          color: "#F72C6B",
          areaColor: ["#fe93b9", "#fff"],
          name: "报警",
        },
      ],
      data3: [
        {
          data: [],
          color: "#5D71FD",
          areaColor: ["#CDD4FE", "#fff"],
          name: "预警",
        },
        {
          data: [],
          color: "#ff9024",
          areaColor: ["#ff9024", "#fff"],
          name: "控制",
        },
        {
          data: [],
          color: "#F72C6B",
          areaColor: ["#fe93b9", "#fff"],
          name: "报警",
        },
      ],
      deeppitParam: {
        organ_node: this.$organ_id_en_or_pro(this),
        sample_time_ts_start: Number(
          this.$utils.fun_date(-7).replace(/-/g, "")
        ),
        sample_time_ts_end: Number(
          this.$utils.getCurrentTime("", "", "day").replace(/-/g, "")
        ),
      },
      defaultPoint: null,
    };
  },
  components: {
    EquipmentMap,
  },
  created() {
    this.queryEquipmentName();
  },
  methods: {
    //选择设备名称
    chooseIt(item) {
      this.colorId = item.id;
      this.deeppitParam.dev_id = item.hardware_imei;
      this.queryEquipmentFoundationDitchStat(this.deeppitParam);
    },
    linkTo(name, t, type) {
      this.$router.linkTo(name, {
        deeppit_type: t,
        dev_type: type,
      });
    },
    //设备名称
    async queryEquipmentName() {
      let data = await api.queryEquipmentHardware({
        organ_node: this.$organ_id_en_or_pro(this),
        hardware_type: 1,
      });
      this.datalist = data.result.map((item, index) => {
        return {
          point_name: item.hardware,
          id: index + 1,
          hardware_imei: item.hardware_imei,
        };
      });
      if (this.datalist.length) {
        this.deeppitParam.dev_id = this.datalist[0].hardware_imei;
      }
      this.queryEquipmentFoundationDitchStat(this.deeppitParam);
    },
    //查询基坑预警报警统计（按日期统计返回）
    async queryEquipmentFoundationDitchStat(val) {
      let data = await api.queryEquipmentFoundationDitchStat(val);
      let list = data.result;
      this.addData(0, list);
      this.addData(1, list);
      this.addData(2, list);
    },
    addData(num, list) {
      let a = 0;
      let dataA = [];
      let dataB = [];
      let dataC = [];
      let textArrlist = [];
      list[num].date_list.forEach((item) => {
        a += item.state_list[1].foundation_ditch_state_counts;
        dataA.push(a);
        a = 0;
      });
      list[num].date_list.forEach((item) => {
        a += item.state_list[2].foundation_ditch_state_counts;
        dataB.push(a);
        a = 0;
      });
      list[num].date_list.forEach((item) => {
        a += item.state_list[3].foundation_ditch_state_counts;
        dataC.push(a);
        a = 0;
      });
      list[0].date_list.forEach((item) => {
        textArrlist.push(
          (item.sample_time_ts + "").slice(0, 4) +
            "-" +
            (item.sample_time_ts + "").slice(4, 6) +
            "-" +
            (item.sample_time_ts + "").slice(6)
        );
      });
      if (num == 0) {
        this.$set(this.data1[0], "data", dataA);
        this.$set(this.data1[1], "data", dataC);
        this.$set(this.data1[2], "data", dataB);
        this.textArr1 = textArrlist;
      } else if (num == 1) {
        this.$set(this.data2[0], "data", dataA);
        this.$set(this.data2[1], "data", dataC);
        this.$set(this.data2[2], "data", dataB);
        this.textArr2 = textArrlist;
      } else {
        this.$set(this.data3[0], "data", dataA);
        this.$set(this.data3[1], "data", dataC);
        this.$set(this.data3[2], "data", dataB);
        this.textArr3 = textArrlist;
      }
    },
    intoDeeppit() {
      window.open("https://dev.cninct.com/TJSTC_DEV/web/deeppit.html");
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.deeppitParam.sample_time_ts_start = this.dateRange
          ? Number(this.dateRange[0])
          : "";
        this.deeppitParam.sample_time_ts_end = this.dateRange
          ? Number(this.dateRange[1])
          : "";
        this.currentPage = 1;
        this.queryEquipmentFoundationDitchStat(this.deeppitParam);
      } else {
        this.deeppitParam.sample_time_ts_start = 0;
        this.deeppitParam.sample_time_ts_end = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.content-info-box {
  .content-info-box-left {
    padding-top: 10px;
    width: 88.5%;
    .chart-box {
      width: 35%;
    }
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
    }
  }
  .content-info-box-left-main {
    padding-top: 10px;
    width: 100%;
  }

  .content-info-box-right {
    width: 10%;
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
    }
    // .point-list {
    //   height: 100%;
    //   overflow: auto;
    // }
  }

  .device-pt-box {
    height: 45%;
  }
  .device-tz-box {
    height: 100%;
    .device_type {
      color: white;
      background-color: #557dfd;
      padding: 6px;
      border-radius: 10px;
    }
    .btn-deep {
      position: absolute;
      bottom: 0;
      width: 100%;
      right: 0%;
      background: linear-gradient(to right, #67b6fd, #5a5efd);
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      text-align: center;
      height: 38px;
      padding-top: 10px;
      color: white;
    }
  }
  .legendgreen-1 {
    color: #5a5efc;
    padding-bottom: 20px;
    transform: rotate(110deg);
  }
  .legendgreen-2 {
    color: #f73e68;
    padding-bottom: 20px;
    transform: rotate(110deg);
  }
  .legendgreen-3 {
    color: #ff9024;
    padding-bottom: 20px;
    transform: rotate(110deg);
  }
}
</style>
