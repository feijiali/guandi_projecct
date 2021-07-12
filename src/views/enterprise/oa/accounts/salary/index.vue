<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'导入项目工资台账'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>工资表模板</p>
            <n-button
              class="mt-2"
              :btnText="'下载模板'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="
                $utils.handleExport('exportOAAttendanceWage', {}, '工资表模板')
              "
            ></n-button>
          </div>
          <!-- <div class="justify-content-between d-flex   align-items-center">
            <div class="w-100">
              <span class="grey2">所属机构：</span>
              <n-treeselect
                ref="treeselect"
                @getSelectNode="val => getSelectValue(val, 1)"
                :treeData="treeData2"
                :Isvalue="true"
                :value="ruleform.attendance_wage_organ_id_union"
              />
            </div>
          </div> -->
          <div class="justify-content-between d-flex align-items-center mt-2">
            <div class="justify-content-start d-flex align-items-center w-100">
              <span class="grey2">选择月份：</span>
              <div class="disi rounded-1 time-choose-single-box">
                <el-date-picker
                  :clearable="false"
                  v-model="ruleform.attendance_wage_month"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  type="month"
                  @change="refreshData"
                  placeholder="请选择"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="'导入工资表'"
            />
          </el-upload>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div" style="background-color: transparent">
      <div class="rounded-1 bg-white p-2 d-flex position-relative mb-1">
        <div
          class="statistics-box-item d-flex align-items-center cursor-p mr-2"
          v-for="(item, index) in statisticsArr"
          :key="index"
        >
          <div class="ml-1">
            <span class="font-15">{{ item.name }}</span>
            <div class="d-inline-block mt-05 ml-1">
              <span
                class="langdon-font text-hover-primary font-22 font-weight-bold"
                >{{ totalCounts[item.key] || 0 }}</span
              >
              <span class="font-14 font-weight-normal">元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top-select-box bg-white" style="border-radius: 10px 10px 0 0">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">日期：</span>
            <el-date-picker
              :clearable="false"
              v-model="listQuery.attendance_wage_month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              @change="refreshData"
              :picker-options="pickerOptions"
              placeholder="请选择"
            >
            </el-date-picker>
          </div>

          <div class="d-inline-block ml-2">
            <span class="grey2">职位状态：</span>
            <el-select
              v-model="listQuery.account_status"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in statusArr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
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
          <!-- <div class="d-inline-block ml-2">
            <div
              class="statistics-box-item d-flex align-items-center cursor-p"
              v-for="(item, index) in statisticsArr"
              :key="index"
            >
              <div class="rounded-1 bg-secondary p-16">
                <img :src="item.icon" style="width: 32px" />
              </div>
              <div class="ml-1">
                <p class="font-15">{{ item.name }}</p>
                <p class="text-hover-primary font-24 font-weight-bold mt-05">
                  {{ totalCounts[item.key] || 0
                  }}<span class="font-14 font-weight-normal">元</span>
                </p>
              </div>
            </div>
          </div> -->
        </div>
        <div>
          <n-button
            v-permission="['OAAttendanceWage-import']"
            class="ml-2"
            :btnText="'导入'"
            @buttonClick="importFun"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 220px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          label="所属机构"
          prop="organ"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="姓名" prop="account_name"></el-table-column>
        <el-table-column label="职位" prop="account_job"></el-table-column>
        <el-table-column label="职位状态" prop="staff_status">
          <template slot-scope="scope">
            {{ ["", "在职", "离职", "实习", "试用"][scope.row.account_status] }}
          </template>
        </el-table-column>
        <el-table-column
          label="出勤天数"
          prop="attendance_wage_attendance_day"
        ></el-table-column>
        <el-table-column
          label="岗位工资"
          prop="account_basic_wage"
        ></el-table-column>
        <el-table-column
          label="职称补贴"
          prop="attendance_wage_subsidy_job"
        ></el-table-column>
        <el-table-column
          label="注册资格"
          prop="attendance_wage_subsidy_rank"
        ></el-table-column>
        <el-table-column
          label="工龄工资"
          prop="attendance_wage_basic_year"
        ></el-table-column>
        <el-table-column
          label="测量津贴"
          prop="attendance_wage_subsidy_measure"
        ></el-table-column>
        <el-table-column
          label="生活费"
          prop="attendance_wage_live"
        ></el-table-column>
        <el-table-column
          label="社保个人"
          prop="attendance_wage_deduct"
        ></el-table-column>
        <el-table-column
          label="社保公司"
          prop="attendance_wage_deduct_company"
        ></el-table-column
        ><el-table-column
          label="其他补贴"
          prop="attendance_wage_subsidy_other"
        ></el-table-column>
        <el-table-column
          label="应发工资"
          prop="attendance_wage_shall_payment"
        ></el-table-column
        ><el-table-column
          label="已发工资"
          prop="attendance_wage_real_payment"
        ></el-table-column
        ><el-table-column
          label="欠发工资"
          prop="attendance_wage_arrears"
        ></el-table-column>
        <el-table-column
          label="备注"
          prop="attendance_wage_remark"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['OAAttendanceWage-update']"
              @click.stop="
                $router.linkTo('enterprise_oa_account_salary_handle', {
                  id: scope.row.attendance_wage_id,
                  month: listQuery.attendance_wage_month,
                  account_id: scope.row.account_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
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
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      postURL: "queryOAAttendanceWage", //表格请求接口
      isShow: this.$route.meta.isProject,
      statusArr: ["在职", "离职", "实习", "试用"],
      statisticsArr: [
        {
          name: "公司社保累计",
          key: "attendance_wage_deduct_company_sum",
          icon: require("@/assets/images/icon_oa_salary_security.png"),
        },
        {
          name: "累计应发工资",
          key: "attendance_wage_shall_payment_sum",
          icon: require("@/assets/images/icon_oa_salary_beissued.png"),
        },
        {
          name: "已发工资",
          key: "attendance_wage_real_payment_sum",
          icon: require("@/assets/images/icon_oa_salary_issued.png"),
        },
        {
          name: "欠发工资",
          key: "attendance_wage_arrears_sum",
          icon: require("@/assets/images/icon_oa_salary_underpaid.png"),
        },
      ],
      totalCounts: {}, //考勤工资统计
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        // account_status: 1,
        organ_node: this.$organ_id_en_or_pro(this),
        attendance_wage_month: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
        account_id: 0,
      },
      ruleform: {
        attendance_wage_month: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
      },
      // 不能选择超过今天的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      getListBool: false,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
    treeData2() {
      return this.$store.getters.subject;
    },
  },
  activated() {
    // 查询统计
    this.queryOAAttendanceWageCount();
    if (hasPermissionArr(["OAAttendanceWage-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.account_id = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.account_id = Number(this.$store.getters.account_id);
    }
    this.getList();
  },
  methods: {
    // 请求表格数据
    async getList() {
      if (!this.postURL) {
        return;
      }
      this.listQuery.page =
        this.listQuery.page == -1 ? -1 : this.currentPage - 1;
      this.listLoading = true;
      let data = await api[this.postURL]({
        ...this.listQuerys,
        ...this.listQuery,
      });
      this.tableData = data.result;
      this.tableData.forEach((data) => {
        data.attendance_wage_shall_payment = data.attendance_wage_shall_payment.toFixed(
          2
        );
        data.attendance_wage_real_payment = data.attendance_wage_real_payment.toFixed(
          2
        );
      });
      this.totalcount = data.total_count;
      this.listLoading = false;
      document.getElementsByClassName("el-table__body-wrapper")[0]
        ? (document.getElementsByClassName(
            "el-table__body-wrapper"
          )[0].scrollTop = 0)
        : (document.getElementsByClassName(
            "el-scrollbar__wrap"
          )[0].scrollTop = 0);

      // 避免表格合计不显示的问题
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout();
      });
    },
    // 查询统计
    async queryOAAttendanceWageCount() {
      let data = await api.queryOAAttendanceWageCount({
        account_status: this.listQuery.account_status,
        attendance_wage_month: this.listQuery.attendance_wage_month,
        organ_node: this.listQuery.organ_node,
      });
      this.totalCounts = data.result[0] || {};
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    refreshData() {
      this.currentPage = 1;
      this.getList();
      this.queryOAAttendanceWageCount();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
    },
    //   点击导入
    importFun() {
      this.fileList = [];
      this.ruleform.attendance_wage_month = this.$utils.getCurrentTime(
        "",
        "",
        "month"
      );
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      // if (!this.ruleform.attendance_wage_organ_id_union) {
      //   this.$tip({
      //     isTip: true,
      //     message: "请选择工程项目",
      //   });
      //   return;
      // }
      if (!this.ruleform.attendance_wage_month) {
        this.$tip({
          isTip: true,
          message: "请选择导入的日期",
        });
        return;
      }
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入工资表",
        });
        return;
      }
      await this.$utils.uploadFile.call(this, ["fileList"], {
        uploadFileModule: "OAAttendanceWage",
      });
      let fileListArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
      }
      this.ruleform.file_name = fileListArr.join(",");
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let res = await api.importOAAttendanceWage(this.ruleform);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          this.refreshData();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.special-btn {
  padding: 4px 10px;
  background-color: #557dfd;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  font-size: 14px;
}
</style>
