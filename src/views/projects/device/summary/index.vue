<template>
  <div class="content-info-box clear h-100 clear">
    <div
      class="content-info-box-left br-1 float-left h-100 position-relative d-flex justify-content-between align-items-center flex-column"
    >
      <div
        class="rounded-1 bg-white br-1 device-pt-box w-100 p-1 position-relative cursor-p"
        @dblclick="linkTo('EquipmentTower', 3)"
      >
        <div
          class="chart_title d-flex justify-content-between align-items-center mb-1"
        >
          <span class="text-dark font-14 font-weight-bolder">塔吊检测报警</span>
          <div class="d-inline-block br-1 time-choose-single-box" @click.stop>
            <span>日期：</span>
            <div class="d-inline-block br-1 time-choose-range-box mr-2">
              <el-date-picker
                :clearable="false"
                style="width: 180px"
                v-model="year"
                type="year"
                value-format="yyyy"
                @change="changeYear"
                placeholder="请选择"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <n-BarChart
          class="chart-item"
          :barWidth="'20px'"
          :catagetryNum="20"
          :textArr="textArrPT3"
          :dataList="[dataPT3]"
          :colUnit="'次'"
          :leftTobox="'20%'"
          :id="'equipment_3'"
          :direction="true"
        ></n-BarChart>
      </div>
      <div
        class="rounded-1 bg-white br-1 device-pt-box w-100 p-1 position-relative cursor-p"
        style="margintop: 12px"
        @dblclick="linkTo('EquipmentDeeppit', 4)"
      >
        <div
          class="chart_title d-flex justify-content-between align-items-center mb-1"
        >
          <span class="text-dark font-14 font-weight-bolder"
            >深基坑监测告警</span
          >
          <div class="d-inline-block br-1 time-choose-single-box" @click.stop>
            <span>日期：</span>
            <div class="d-inline-block br-1 time-choose-range-box mr-2">
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
        </div>
        <n-BarChart
          class="chart-item"
          :barWidth="'20px'"
          :catagetryNum="20"
          :textArr="textArrPT2"
          :dataList="[dataPT2]"
          :colUnit="'次'"
          :leftTobox="'20%'"
          :id="'equipment_4'"
          :direction="true"
        ></n-BarChart>
      </div>
    </div>
    <div
      class="content-info-box-right float-right h-100 position-relative d-flex justify-content-between align-items-center flex-column"
    >
      <div
        class="rounded-1 bg-white br-1 device-tz-box w-100 p-1 position-relative cursor-p"
        @dblclick="linkTo('EquipmentCommon', 1)"
      >
        <div
          class="chart_title d-flex justify-content-between align-items-center mb-1"
        >
          <span class="text-dark font-14 font-weight-bolder">普通设备汇总</span>
        </div>
        <n-BarChart
          class="chart-item"
          :barWidth="'20px'"
          :catagetryNum="20"
          :textArr="textArrPT"
          :dataList="[dataPT]"
          :colUnit="'个'"
          :leftTobox="'20%'"
          :id="'equipment_1'"
          :direction="true"
        ></n-BarChart>
      </div>
      <div
        class="rounded-1 bg-white br-1 device-tz-box w-100 p-1 position-relative cursor-p"
        @dblclick="linkTo('EquipmentSpecial', 2)"
      >
        <div
          class="chart_title d-flex justify-content-between align-items-center mb-1"
        >
          <span class="text-dark font-14 font-weight-bolder">特种设备汇总</span>
        </div>
        <n-BarChart
          class="chart-item"
          :direction="true"
          :catagetryNum="20"
          :barWidth="'20px'"
          :textArr="textArrTZ"
          :dataList="[dataTZ]"
          :colUnit="'个'"
          :leftTobox="'10%'"
          :id="'equipment_2'"
        ></n-BarChart>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  data() {
    return {
      dateRange: [], //日期范围
      year: this.$utils.getCurrentTime("", "year"),
      textArrPT: [],
      textArrPT2: ["静力水准", "土压力盒", "倾角计"],
      textArrPT3: [],
      textArrTZ: [],
      dataPT: {
        data: [],
        color: ["#67b6fd", "#5a5efd"],
      },
      dataPT2: {
        data: [],
        color: ["#ff89c1", "#f73e68"],
      },
      dataPT3: {
        data: [],
        color: ["#ff89c1", "#f73e68"],
      },
      dataTZ: {
        data: [],
        color: ["#67b6fd", "#5a5efd"],
      },
      deeppitParam: {
        organ_node: this.$organ_id_en_or_pro(this),
      },
    };
  },
  created() {
    this.queryEquipmentDeviceSummary(1);
    this.queryEquipmentDeviceSummary(2);
    this.queryEquipmentFoundationDitchStatAll(this.deeppitParam);
    this.queryEquipmentTcWeightUnionTCSummary();
  },
  methods: {
    linkTo(name, t) {
      switch (t) {
        case 1:
          if (!hasPermissionArr(["EquipmentDevice_TJSTC"])) {
            return;
          }
        case 2:
          if (!hasPermissionArr(["EquipmentDevice_TJSTC"])) {
            return;
          }
        case 3:
          if (!hasPermissionArr(["EquipmentTowerCrance_TJSTC"])) {
            return;
          }
        case 4:
          if (!hasPermissionArr(["EquipmentFoundationDitch_TJSTC"])) {
            return;
          }
      }
      this.$router.linkTo(name, {
        device_type: t,
      });
    },
    async queryEquipmentDeviceSummary(t) {
      let data = await api.queryEquipmentDeviceSummary({
        device_type: t, //设备类型：1普通设备 2：特种设备
        organ_node: this.$organ_id_en_or_pro(this),
      });
      let list = data.result;
      let arr = [];
      t == 1 && (this.textArrPT = []);
      t == 2 && (this.textArrTZ = []);
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].equipment_device_count);
        t == 1
          ? this.textArrPT.push(list[i].device_name)
          : this.textArrTZ.push(list[i].device_name);
      }
      t == 1
        ? this.$set(this.dataPT, "data", arr)
        : this.$set(this.dataTZ, "data", arr);
    },
    //塔吊筛选年
    changeYear() {
      this.queryEquipmentTcWeightUnionTCSummary();
    },
    //查询基坑统计告警总数
    async queryEquipmentFoundationDitchStatAll(param) {
      let data = await api.queryEquipmentFoundationDitchStatAll(param);
      let list = data.result;
      let a = 0;
      let dataA = [];
      list.forEach((item) => {
        item.state_list = item.state_list.filter((ele) => ele.alarm_state != 1);
        item.state_list.forEach((el) => {
          a = a + el.foundation_ditch_state_counts;
        });
        dataA.push(a);
        a = 0;
      });
      this.$set(this.dataPT2, "data", dataA);
    },
    //查询塔吊年统计
    async queryEquipmentTcWeightUnionTCSummary() {
      this.textArrPT3 = [];
      let data = await api.queryEquipmentTcWeightUnionTCSummary({
        query_type: 1,
        year: this.year,
      });
      let list = data.result;
      let dataA = [];
      list.forEach((item) => {
        this.textArrPT3.push(item.seq + "月");
        dataA.push(item.num);
      });
      this.$set(this.dataPT3, "data", dataA);
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
      } else {
        this.deeppitParam.sample_time_ts_start = "";
        this.deeppitParam.sample_time_ts_end = "";
      }
      this.currentPage = 1;
      this.queryEquipmentFoundationDitchStatAll(this.deeppitParam);
    },
  },
};
</script>

<style scoped lang="scss">
.content-info-box {
  .content-info-box-left {
    padding: 10px 0 10px 10px;
    width: 54%;
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
      margin-top: 20px;
    }
  }

  .content-info-box-right {
    padding: 10px 10px 10px 0px;
    width: 45.2%;
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
    }
  }

  .device-pt-box {
    height: 49.2%;
  }
  .device-tz-box {
    height: 49.2%;
  }
}
</style>
