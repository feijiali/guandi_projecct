<template>
  <div class="container-all">
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">月份：</label>
            <el-date-picker
              :clearable="false"
              v-model="listQuery.leave_date"
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
            <span class="grey2">部门：</span>
            <n-treeselect
              ref="treeselect"
              @getSelectValue="handleFilterChange"
              :defaultProps="defaultProps"
              v-if="treeData"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <n-search
              ref="serch"
              class="search-box"
              :isInput="true"
              :placeholder="'请输入姓名搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
          <div class="d-inline-block ml-2">
            <div class="d-inline-block">
              <img
                style="width: 22px"
                src="@/assets/images/icon_oa_attendance_third.png"
                class="vertical-middle mr-1"
              />已出勤
            </div>
            <div class="d-inline-block ml-2">
              <img
                style="width: 22px"
                src="@/assets/images/icon_oa_attendance_fourth.png"
                class="vertical-middle mr-1"
              />未出勤
            </div>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['OAAttend-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport('exportOAAttend', listQuery, '人员考勤表')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OALeave']"
            class="ml-2"
            :btnText="'请假表'"
            @buttonClick="
              $router.linkTo('enterprise_oa_account_attendance_leave')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="calc(100% - 80px)"
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
          width="160"
          prop="account_name"
        ></el-table-column>
        <el-table-column
          label="部门"
          width="100"
          prop="organ"
        ></el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <check-list-table-title
              ref="tabletitle"
              @page-change="handleTitlePageChange"
              :firstpagecount="firstPageCount"
              :pagemonth="listQuery.leave_date"
            />
          </template>
          <template slot-scope="scope">
            <check-list-table-body
              :page="page"
              :firstpagecount="firstPageCount"
              @icon-click="handleIconClick"
              :attendlist="scope.row.date_list"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="出勤天数"
          width="80"
          prop="attend_days"
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
import global from "@/plugins/global_varible.js";
import CheckListTableTitle from "./components/CheckListTableTitle.vue";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  components: {
    CheckListTableTitle,
    CheckDetail: () => import("./components/CheckDetail"),
    CheckListTableBody: () => import("./components/CheckListTableBody"),
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryOAAttendMonth",
      isShow: this.$route.meta.isProject,
      pickerOptions: {
        // 不能选择超过今天的时间
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      defaultProps: {
        value: "tag",
        children: "leaves",
        label: "organ",
      },
      listQuery: {
        //筛选条件
        page: 0,
        page_size: 20,
        account_name_search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        leave_date: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
        account_id: 0,
      },
      page: 1, //表格中考勤当前在多少页
      firstPageCount: 16, //第一页显示的考勤信息数量
      iconIndex: 0, //点击的是哪一天的图标
      hasCheckInfo: false, //当天有无考勤信息
      infoData: {}, //详情信息
      day_time: "", //点击详情的日期
      treeData: null,
      getListBool: false,
    };
  },
  async activated() {
    await this.getTreeData();
    if (hasPermissionArr(["OAAttend-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.account_id = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.account_id = Number(this.$store.getters.account_id);
    }
    this.getList();
  },
  methods: {
    async getTreeData() {
      let { result } = await api.queryOrganTree({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_type_node: "30,20",
      });
      this.treeData = result;
    },
    searchFun(val) {
      this.listQuery.account_name_search = val;
      this.refreshData();
    },
    // 切换是否关联字节点
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.getList();
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
    handleTitlePageChange(page) {
      this.page = page;
    },
    // 点击考勤项
    handleIconClick(item) {
      this.day_time = item.day_time;
      this.hasCheckInfo = true;
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
