<template>
  <div class="container-all">
    <div class="flex-fill">
      <div
        class="content-info-box clear clear m-1"
        style="height: calc(100% - 20px)"
      >
        <div class="content-info-box-left bg-white rounded-1 float-left h-100">
          <div
            class="content-info-box-left-main bg-white rounded-1 float-left h-100 d-flex"
          >
            <div class="qwe">
              <div
                class="d-inline-block rounded-1 mt-1 ml-1 time-choose-single-box"
                @click.stop
              >
                <span>设备名称：</span>
                <el-select
                  v-model="hardware"
                  placeholder="请选择"
                  @change="changeHardware"
                >
                  <el-option label="全部" :value="''"></el-option>
                  <el-option
                    v-for="(item, index) in deviceArr"
                    :key="index"
                    :label="item.hardware + '(' + item.hardware_imei + ')'"
                    :value="item.hardware_imei"
                  ></el-option>
                </el-select>
                <span class="ml-2">月份：</span>
                <div
                  class="d-inline-block rounded-1 time-choose-range-box mr-2"
                >
                  <el-date-picker
                    :clearable="false"
                    style="width: 180px"
                    v-model="month"
                    type="month"
                    value-format="yyyy-MM"
                    @change="changeMonth"
                    placeholder="请选择"
                  ></el-date-picker>
                </div>
              </div>
              <div
                class="bg-white rounded-1 device-pt-box w-100 p-1 position-relative cursor-p"
                @dblclick.stop="linkTo('project_device1_tower_running')"
              >
                <div
                  class="chart_title d-flex justify-content-between align-items-center mb-1"
                  style="height: 30px"
                >
                  <span class="text-dark font-14 font-weight-bold"
                    >运行报警统计</span
                  >
                </div>
                <n-BarChart
                  class="chart-item"
                  :barWidth="'20px'"
                  :catagetryNum="15"
                  :textArr="textArr1"
                  :dataList="[dataPT1]"
                  :colUnit="'次'"
                  :leftTobox="'20%'"
                  :id="'equipment_1'"
                  :direction="true"
                ></n-BarChart>
              </div>
              <div
                class="bg-white mt-2 rounded-1 device-pt-box w-100 p-1 position-relative cursor-p"
                @dblclick.stop="linkTo('project_device1_tower_hoisting')"
              >
                <div
                  class="chart_title d-flex justify-content-between align-items-center mb-1 chart_box"
                >
                  <span class="text-dark font-14 font-weight-bold"
                    >吊重报警统计</span
                  >
                </div>
                <n-BarChart
                  class="chart-item"
                  :barWidth="'20px'"
                  :catagetryNum="15"
                  :textArr="textArr2"
                  :dataList="[dataPT2]"
                  :colUnit="'次'"
                  :leftTobox="'20%'"
                  :id="'equipment_2'"
                  :direction="true"
                ></n-BarChart>
              </div>
            </div>
          </div>
        </div>
        <div
          class="content-info-box-right float-right h-100 position-relative d-flex justify-content-between align-items-center flex-column"
        >
          <div class="bg-white rounded-1 device-tz-box w-100 position-relative">
            <div class="common-choose-box clear mb-1 ml-4">
              <div class="float-left">
                <span class="grey2">报警类型：</span>
                <el-select
                  v-model="listQuery.union_type"
                  placeholder="请选择"
                  @change="refreshData"
                >
                  <el-option label="全部" :value="0"></el-option>
                  <el-option label="运行报警" :value="1"></el-option>
                  <el-option label="吊重报警" :value="2"></el-option>
                </el-select>
              </div>
              <div class="float-left ml-4">
                <span class="grey2">报警时间：</span>
                <div class="d-inline-block time-choose-range-box">
                  <el-date-picker
                    @change="refreshData"
                    class="el-date-picker-range-box"
                    v-model="dateRange"
                    type="daterange"
                    range-separator="-"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </div>
              <div class="float-right el-button-add-posa">
                <!-- <div @click="intoTower" class="el-button-add" icon="el-icon-plus">进入塔吊系统
              </div> -->
                <n-button
                  class=""
                  :btnText="'进入塔吊系统'"
                  :colorBtn="'blue'"
                  @buttonClick="intoTower"
                ></n-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="calc(100% - 140px)"
              ><template slot="empty">
                <span>真是不巧，暂时没有数据呢~</span>
              </template>
              <el-table-column
                label="设备名称"
                prop="hardware"
              ></el-table-column>
              <el-table-column
                label="设备编号"
                prop="hardware_imei"
              ></el-table-column>
              <el-table-column
                label="报警时间"
                prop="union_time"
              ></el-table-column>
              <el-table-column label="操作人" prop="account_list">
                <template slot-scope="scope">
                  <span
                    class="d-inline-block"
                    v-for="(item, index) in scope.row.account_list"
                    :key="index"
                    >{{
                      item.ctrl_account_name +
                      (index != scope.row.account_list.length - 1 ? "，" : "")
                    }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column label="报警类型" prop="union_type">
                <template slot-scope="scope">
                  {{ ["", "运行报警", "吊重报警"][scope.row.union_type] }}
                </template>
              </el-table-column>
              <el-table-column
                label="所在位置"
                prop="hardware_location"
              ></el-table-column>
            </el-table>
            <el-pagination
              v-show="totalcount > 0"
              background
              class="txr mt-1 mgr10"
              layout="prev, pager, next"
              :page-size="listQuery.page_size"
              @current-change="getList"
              :current-page.sync="currentPage"
              :total="totalcount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import { mapGetters } from "vuex";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryEquipmentTcWeightUnionTC",
      deleData: {},
      dateRange: [], //日期范围
      hardware: "",
      deviceArr: [],
      month: this.$utils.getCurrentTime("", "", "month"),
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: this.$utils.fun_date(-30),
        end_time: this.$utils.getCurrentTime("", "", "day"),
      }, //筛选条件
      dataPT1: {
        data: [],
        color: ["#ff89c1", "#f73e68"],
      },
      dataPT2: {
        data: [],
        color: ["#ff89c1", "#f73e68"],
      },
      textArr1: [],
      textArr2: [],
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  created() {
    this.queryEquipmentTcWeightUnionTCSummary(1);
    this.queryEquipmentTcWeightUnionTCSummary(2);
    this.queryEquipmentName();
  },
  methods: {
    changeHardware() {
      this.queryEquipmentTcWeightUnionTCSummary(1);
      this.queryEquipmentTcWeightUnionTCSummary(2);
    },
    //查询设备名称
    async queryEquipmentName() {
      let data = await api.queryEquipmentHardware({
        organ_node: this.$organ_id_en_or_pro(this),
        hardware_type: 2,
      });
      this.deviceArr = data.result;
    },
    //查询塔吊月统计
    async queryEquipmentTcWeightUnionTCSummary(t) {
      this.textArr1 = [];
      this.textArr2 = [];
      let data = await api.queryEquipmentTcWeightUnionTCSummary({
        query_type: 2,
        month: this.month,
        union_type: t,
        hardware_imei: this.hardware,
        // organ_node: this.$organ_id_en_or_pro(this)
      });
      let list = data.result;
      // list.filter(item => { return item.num != 0 })
      let dataA = [];
      if (t == 1) {
        list.forEach((item) => {
          this.textArr1.push(item.seq + "日");
          dataA.push(item.num);
        });
        this.$set(this.dataPT1, "data", dataA);
      }
      if (t == 2) {
        list.forEach((item) => {
          this.textArr2.push(item.seq + "日");
          dataA.push(item.num);
        });
        this.$set(this.dataPT2, "data", dataA);
      }
    },
    linkTo(name) {
      this.$router.linkTo(name, { dev_name: this.hardware });
    },
    intoTower() {
      window.open(
        "http://zdjd.51ejian.cn/login/loginonepoint?uid=" +
          this.account +
          "&pwd=123456"
      );
    },
    //筛选月份
    changeMonth() {
      this.queryEquipmentTcWeightUnionTCSummary(1);
      this.queryEquipmentTcWeightUnionTCSummary(2);
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
        this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      } else {
        this.listQuery.start_time = "";
        this.listQuery.end_time = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.container-all {
  padding-top: 0px;
}
.content-info-box {
  .content-info-box-left {
    height: 100%;
    width: 35.4%;
    flex: 1;
    overflow: hidden;
    .qwe {
      width: 100%;
    }
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 48px;
      bottom: 0;
    }
  }
  .content-info-box-left-main {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }

  .content-info-box-right {
    height: 100%;
    width: 64%;
    .chart-item {
      left: 10px;
      right: 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
    }
  }

  .device-pt-box {
    height: 45%;
  }
  .device-tz-box {
    height: 100%;
    .common-choose-box {
      padding-top: 10px;
    }
  }
  .legendgreen1 {
    color: blue;
    padding-bottom: 20px;
    transform: rotate(110deg);
  }
  .legendgreen2 {
    color: #f72c6b;
    padding-bottom: 20px;
    transform: rotate(110deg);
  }
}
.statistics-top-count {
  display: inline-flex;
  border-radius: 4px;
  padding: 10px 0;
  width: 165px;
}

.chart_box {
  align-items: baseline;
  .chart_box_main {
    display: flex;
    flex-direction: column;
  }
  .item_style {
    align-self: flex-end;
  }
}
.el-button-add-posa {
  position: absolute;
  bottom: 26px;
}
</style>
