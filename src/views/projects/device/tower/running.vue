<template>
  <div class="container-all">
    <div class="ml-2 rounded-1 bg-secondary">
      <nBackTop title="运行数据采集" />
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">当前状态：</span>
            <el-select
              v-model="listQuery.tc_alarm_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="预警" :value="2"></el-option>
              <el-option label="报警" :value="3"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">设备名称：</span>
            <el-select
              v-model="listQuery.tc_imei"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, index) in deviceArr"
                :key="index"
                :label="item.hardware + '(' + item.hardware_imei + ')'"
                :value="item.hardware_imei"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">采集日期：</label>
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
            :btnText="'导出'"
            class="ml-2"
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
        height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="编号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="采集时间"
          prop="tc_time"
          min-width="85px"
        ></el-table-column>
        <el-table-column label="高度（m）" prop="tc_height"></el-table-column>
        <el-table-column label="幅度（m）" prop="tc_range"></el-table-column>
        <el-table-column label="吊重（t）" prop="tc_hoisting"></el-table-column>
        <el-table-column label="回转（°）" prop="tc_turn"></el-table-column>
        <el-table-column
          label="安全吊重（t）"
          prop="tc_safe_hoisting"
        ></el-table-column>
        <el-table-column
          label="力矩"
          prop="tc_moment_of_force"
        ></el-table-column>
        <el-table-column label="力矩百分比" prop="tc_percent"></el-table-column>
        <el-table-column label="风级" prop="tc_wind"></el-table-column>
        <el-table-column label="司机" prop="tc_driver"></el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span :class="colorArr[scope.row.tc_alarm_type]">{{
              alarmArr[scope.row.tc_alarm_type]
            }}</span>
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
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryEquipmentTowerCrance",
      dateRange: [
        this.$utils.fun_date(-30).replace(/-/g, ""),
        this.$utils.getCurrentTime("", "", "day").replace(/-/g, ""),
      ],
      listQuery: {
        tc_imei: this.$route.query.dev_name,
        page: 0,
        page_size: 20,
        tc_alarm_type: 0,
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: Number(this.$utils.fun_date(-30).replace(/-/g, "")),
        end_time: Number(
          this.$utils.getCurrentTime("", "", "day").replace(/-/g, "")
        ),
      }, //筛选条件
      deviceArr: [], //设备名称
      colorArr: ["", "", "orange", "red"], //报警颜色
      alarmArr: ["", "正常", "预警", "报警"], //报警状态
    };
  },
  created() {
    this.getList();
    this.queryEquipmentName();
  },
  methods: {
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = this.dateRange
          ? Number(this.dateRange[0])
          : "";
        this.listQuery.end_time = this.dateRange
          ? Number(this.dateRange[1])
          : "";
      } else {
        this.listQuery.start_time = "";
        this.listQuery.end_time = "";
      }
      this.currentPage = 1;
      this.getList();
    },
    //查询设备名称和imei
    async queryEquipmentName() {
      let data = await api.queryEquipmentHardware({
        organ_node: this.$organ_id_en_or_pro(this),
        hardware_type: 2,
      });
      this.deviceArr = data.result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
