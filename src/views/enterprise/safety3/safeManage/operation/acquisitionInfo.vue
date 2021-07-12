<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title + '漏电保护器详情数据'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="align-items-center d-inline-flex">
            <span class="grey2">日期：</span>
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
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="运行时间"
          prop="leakage_protect_realtime_sub_date"
        ></el-table-column>
        <el-table-column label="电压数据(V)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .voltage
              }}V
            </label>
          </template>
        </el-table-column>

        <el-table-column label="电流数据(A)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .current
              }}V
            </label>
          </template>
        </el-table-column>

        <el-table-column label="频率(HZ)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .frequency
              }}HZ
            </label>
          </template>
        </el-table-column>

        <el-table-column label="有功功率(W)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .active_power
              }}W
            </label>
          </template>
        </el-table-column>

        <el-table-column label="无功功率(Var)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .active_power
              }}Var
            </label>
          </template>
        </el-table-column>

        <el-table-column label="功率因素">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .power_factor
              }}
            </label>
          </template>
        </el-table-column>

        <el-table-column label="漏电电流(mA)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .leakage_current
              }}mA
            </label>
          </template>
        </el-table-column>

        <el-table-column label="温度数据(℃)">
          <template slot-scope="scope">
            <label>
              {{
                scope.row[types[scope.row.leakage_protect_realtime_type]]
                  .temperature
              }}℃
            </label>
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="account_name" width="100">
          <template slot-scope="scope">
            <i
              v-permission="['IoTLeakageProtect-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'leakage_protect_realtime_id',
                  'delIoTLeakageProtectRealtime'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
            ></i>
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
import table from "@/mixins/table";
import api from "@/api/index";
import confirm from "@/mixins/confirm";
export default {
  mixins: [confirm, table],
  data() {
    return {
      postURL: "queryIoTLeakageProtectRealtime", //表格请求接口
      listQuery: {
        start_time: "",
        end_time: "",
        leakage_protect_id: 0,
        page: 0,
        page_size: 20,
      },
      dateRange: [],
      types: ["", "circuit_220", "circuit_380"],
      getListBool: false,
      title: "",
    };
  },
  created() {
    this.listQuery.leakage_protect_id = Number(
      this.$route.query.leakage_protect_id
    );
    this.title = this.$route.query.name ? this.$route.query.name : "";
    this.getList();
  },
  methods: {
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.changePage(1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
