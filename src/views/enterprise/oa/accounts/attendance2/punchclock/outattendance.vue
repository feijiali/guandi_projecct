<template>
  <div class="w-100 h-100 table-list-wrap">
    <!-- 打卡详情 -->
    <n-dialog ref="dialog" :diaTit="'人员考勤详情'" :diaWidth="'50%'">
      <template slot="diaSlot">
        <CheckDetail :infoData="infoData" />
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop title="出勤表" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">月份：</label>
            <el-date-picker
              :clearable="false"
              v-model="listQuery.query_month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              @change="(val) => refreshData(val, 'month')"
              :picker-options="pickerOptions"
              placeholder="请选择"
            >
            </el-date-picker>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">打卡规则：</label>
            <el-radio-group
              @change="refreshData"
              v-model="listQuery.basic_type"
              style="vertical-align: text-top"
            >
              <el-radio :label="2">两次</el-radio>
              <el-radio :label="4">四次</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div>
          <div
            class="person-total-box d-inline-flex justify-content-between align-items-center"
          >
            <div class="justify-content-between align-items-center">
              <img :src="attendStatusImg[0]" class="vertical-middle" />未打卡
            </div>
            <div class="ml-1 justify-content-between align-items-center">
              <img :src="attendStatusImg[1]" class="vertical-middle" />正常打卡
            </div>
            <div class="ml-1 justify-content-between align-items-center">
              <img :src="attendStatusImg[2]" class="vertical-middle" />请假
            </div>
            <div class="ml-1 justify-content-between align-items-center">
              <img :src="attendStatusImg[3]" class="vertical-middle" />迟到
            </div>
            <div class="ml-1 justify-content-between align-items-center">
              <img :src="attendStatusImg[4]" class="vertical-middle" />早退
            </div>
            <div class="ml-1 justify-content-between align-items-center">
              <img :src="attendStatusImg[5]" class="vertical-middle" />异常
            </div>
            <div
              class="ml-1 d-inline-flex justify-content-between align-items-center"
            >
              <img :src="attendStatusImg[6]" class="vertical-middle" />旷工
            </div>
          </div>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        height="calc(100% - 80px)"
        @row-click="showCheckDetail"
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
          label="姓名"
          width="80"
          prop="account_name"
        ></el-table-column>
        <el-table-column
          label="部门"
          width="120"
          prop="organ"
        ></el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <check-list-table-title
              ref="tabletitle"
              @page-change="handleTitlePageChange"
              :firstpagecount="firstPageCount"
              :pagemonth="listQuery.query_month"
            />
          </template>
          <template slot-scope="scope">
            <check-list-table-body
              :page="page"
              :firstpagecount="firstPageCount"
              @icon-click="handleIconClick"
              :attendlist="scope.row.month_attendance_info"
          /></template>
        </el-table-column>
        <el-table-column
          label="出勤天数"
          width="100"
          prop="total_attendance_day"
        ></el-table-column>
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
import CheckListTableTitle from "./components/CheckListTableTitle.vue";
export default {
  components: {
    CheckListTableTitle,
    CheckDetail: () => import("./components/CheckDetail"),
    CheckListTableBody: () => import("./components/CheckListTableBody"),
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryStaffPunchAttendanceMonth",
      title: "出勤表",
      pickerOptions: {
        // 不能选择超过今天的时间
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      attendStatusImg: this.GLOBAL.attendStatusImg2,
      listQuery: {
        //筛选条件
        page: 0,
        page_size: 20,
        basic_type: 4,
        organ_node: this.$organ_id_en_or_pro(this),
        query_month: this.$utils.getCurrentTime("", "", "month"),
      },
      page: 1, //表格中考勤当前在多少页
      firstPageCount: 16, //第一页显示的考勤信息数量
      iconIndex: 0, //点击的是哪一天的图标
      hasCheckInfo: false, //当天有无考勤信息
      infoData: {}, //详情信息
      day_time: "", //点击详情的日期
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    // 查询此部门考勤配置
    this.queryStaffPunchBasic(this.listQuery.organ_node);
  },
  methods: {
    //组织机构下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData(val, t) {
      if (t) {
        //改变月份
        this.$refs.tabletitle.initDayList(val);
      }
      this.currentPage = 1;
      this.getList();
    },
    // 切换是否关联字节点
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      // 查询此部门考勤配置
      this.queryStaffPunchBasic(data);
    },
    // 查询此部门考勤配置
    async queryStaffPunchBasic(data) {
      let res = await api.queryStaffPunchBasic({ organ_id: Number(data) });
      res.result[0] && (this.listQuery.basic_type = res.result[0].basic_type);
      this.refreshData();
    },
    handleTitlePageChange(page) {
      this.page = page;
    },
    // 点击考勤项
    handleIconClick(item) {
      this.day_time = item.day_time;
      this.hasCheckInfo = true;
    },
    showCheckDetail(row) {
      // 查询该人员打卡详情
      this.hasCheckInfo &&
        this.queryStaffPunchAttendance(
          row.account_id,
          this.day_time,
          row.basic_type
        );
    },
    async queryStaffPunchAttendance(account_id, query_day, basic_type) {
      let res = await api.queryStaffPunchAttendance({
        account_id: account_id,
        query_day: query_day,
        basic_type: basic_type,
      });
      this.infoData = res.result[0];
      this.hasCheckInfo && this.$refs.dialog.show();
      this.hasCheckInfo = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cusp-table {
  ::v-deep .el-table__header-wrapper .el-table__header {
    th {
      padding: 0;
      .cell {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
.person-total-box {
  font-size: 13px;
  img {
    width: 20px;
    margin-right: 10px;
  }
}
.attendance {
  border: 2px solid $main;
  color: $main;
}
.pink-attendance {
  border: 2px solid $pink2;
  color: $pink2;
}
</style>
