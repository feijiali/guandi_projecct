<template>
  <div class="container-all">
   <Detail ref="detail" :infoData="infoData" />
    <div class="ml-2 rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">当前状态：</span>
            <el-select
              v-model="listQuery.alarm_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="正常" :value="1"></el-option>
              <el-option label="预警" :value="2"></el-option>
              <el-option label="报警" :value="3"></el-option>
              <el-option label="控制" :value="4"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">设备名称：</span>
            <el-select
              v-model="listQuery.hardware"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option
                v-for="(item, index) in deviceArr"
                :key="index"
                :label="item.hardware"
                :value="item.hardware"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">测点名称：</span>
            <el-select
              v-model="listQuery.point_name"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option
                v-for="(item, index) in pointArr"
                :key="index"
                :label="item.point_name"
                :value="item.point_name"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">日期：</span>
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
        <div>
          <n-button
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportEquipmentTowerCrance',
                listQuery,
                '运行数据采集表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 140px)"
      >
        <el-table-column prop="index" label="编号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" prop="hardware"></el-table-column>
        <el-table-column label="测点名称" prop="point_name"></el-table-column>
        <el-table-column label="采集时间" prop="sample_time"></el-table-column>
        <el-table-column label="记录值（kPa）" prop="data1"></el-table-column>
        <el-table-column
          label="单次变化量（kPa）"
          prop="data1_this"
        ></el-table-column>
        <el-table-column
          label="累计变化量（kPa）"
          prop="data1_total"
        ></el-table-column>
        <el-table-column
          label="变化速率（kPa/d）"
          prop="data1_rate"
        ></el-table-column>
        <el-table-column label="当前状态" prop="general_device_state">
          alarm_state
          <template slot-scope="scope">
            <span
              :class="[
                scope.row.alarm_state == 2
                  ? 'orange'
                  : scope.row.alarm_state == 3
                  ? 'red'
                  : '',
              ]"
              >{{ typeArr[scope.row.alarm_state] }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      class="text-right bg-secondary"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import Detail from "./components/Detail";
import table from "@/mixins/table";
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryEquipmentFoundationDitchInfo",
      title: "",
      deleData: {},
      listQuery: {
        dev_type: Number(this.$route.query.dev_type),
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        sample_time_ts_start: Number(
          this.$utils.fun_date(-30).replace(/-/g, "")
        ),
        sample_time_ts_end: Number(
          this.$utils.getCurrentTime("", "", "day").replace(/-/g, "")
        ),
      }, //筛选条件
      dateRange: [
        this.$utils.fun_date(-30).replace(/-/g, ""),
        this.$utils.getCurrentTime("", "", "day").replace(/-/g, ""),
      ],
      infoData: {}, //详情
      sample_time_ts_start: this.$utils.fun_date(-30),
      sample_time_ts_end: this.$utils.getCurrentTime("", "", "day"),
      typeArr: ["", "正常", "预警", "报警", "控制"], //状态
      pointArr: [], //测点名称
      deviceArr: [], //设备名称
      deeppitType: [
        "",
        "静力水准监测数据",
        "应变监测数据",
        "土压力盒监测数据",
        "深层水平位移监测数据",
        "倾角计监测数据",
        "倾斜（X&Y,角度）监测数据",
      ],
    };
  },
  created() {
    this.title = this.deeppitType[Number(this.$route.query.deeppit_type)];
    this.queryEquipmentFoundationDitchPoint();
    this.queryEquipmentName();
  },
  methods: {
    // 筛选条件后重新请求数据
    refreshData(name) {
      if (this.dateRange) {
        this.listQuery.sample_time_ts_start = this.dateRange
          ? Number(this.dateRange[0])
          : "";
        this.listQuery.sample_time_ts_end = this.dateRange
          ? Number(this.dateRange[1])
          : "";
      } else {
        this.listQuery.sample_time_ts_start = 0;
        this.listQuery.sample_time_ts_end = 0;
      }
      this.currentPage = 1;
      this.getList();
    },
    //设备名称
    async queryEquipmentName() {
      let data = await api.queryEquipmentHardware({
        organ_node: this.$organ_id_en_or_pro(this),
        hardware_type: 1,
      });
      this.deviceArr = data.result;
    },
    //测点名称
    async queryEquipmentFoundationDitchPoint() {
      let data = await api.queryEquipmentFoundationDitchPoint({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.pointArr = data.result;
    },
  },
};
</script>

<style scoped lang="scss">
.top-title-abso {
  position: absolute;
  top: -80px;
  height: 80px;
  padding: 20px 35px;
  left: 320px;
  right: 0;
}

.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
.admin-config-box {
  .label-l {
    width: 110px;
  }
}

.liable-box {
  display: flex;
}

.liable {
  .liable-item {
    width: 380px;
    height: 128px;
    background: $lightgrey;

    .liable-content {
      width: 330px;
    }

    .liable-btn {
      background-color: #d5e2fc;
      border-radius: 0 10px 10px 0;

      img {
        width: 30px;
      }

      &.liable-btn-reduce {
        background-color: #c0c4cc;
      }
    }
  }
}
</style>
