<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div class="d-flex align-items-center">
          <div class="justify-content-start d-inline-flex align-items-center">
            <ul class="sub-nav-ul">
              <li
                v-for="(item, index) of 4"
                @click="handelSwitchChange(index)"
                :key="index"
                class="sub-nav-li-item"
                :class="[activeIn == index ? 'active' : '']"
              >
                {{ navs[index] }}
              </li>
            </ul>
          </div>
          <div class="d-inline-block ml-2" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="listQuery.project_classify"
              @change="chooseProjectClassify"
              placeholder="请选择"
            >
              <el-option
                :value="item.val"
                :label="item.name"
                v-for="(item, index) in projectClassifyArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                v-if="!isShow"
                label="全部"
                :value="allProject"
              ></el-option>
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2" v-if="activeIn == 3">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="changeDate"
              class="el-date-editor-m"
              :clearable="false"
              :editable="false"
              v-model="select_time"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="activeIn == 1">
            <label class="text-secondary">月份：</label>
            <el-date-picker
              @change="changeMonth"
              class="el-date-editor-m"
              :clearable="false"
              :editable="false"
              v-model="select_month"
              format="yyyy-MM"
              value-format="yyyyMM"
              type="month"
              placeholder="请选择"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="activeIn == 2">
            <label class="text-secondary">周次：</label>
            <el-select
              class="el-select-long week-el-select-long"
              v-model="select_week"
              placeholder="请选择"
              @change="changeWeek"
            >
              <el-option
                v-for="item in weekArr"
                :key="item.set_up_sub_time_int"
                :label="
                  '第' +
                  item.set_up_num +
                  '周' +
                  '，' +
                  item.set_up_start +
                  '-' +
                  item.set_up_end
                "
                :value="item.set_up_start_int + '-' + item.set_up_end_int"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- <div>
          <n-button class="ml-2" :btnText="'导入'">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button :btnText="'导出'" class="ml-2" @buttonClick="$utils.handleExport('exportOAAttend', listQuery)">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div> -->
      </div>
      <!-- :span-method="objectSpanMethod" -->
      <el-table :data="tableList" style="width: 100%" height="calc(100% - 85px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="organ_area"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          min-width="175px"
          label="子单位工程"
          prop="unit_project"
        ></el-table-column>
        <el-table-column label="填方（m³）">
          <el-table-column
            :label="activeIn == 0 ? '总计' : '计划'"
            :prop="activeIn == 0 ? 'unit_project_fill' : 'detail_1.plan_amount'"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_1.temp_fact_total_amount"
          >
          </el-table-column>
          <el-table-column
            label="未完成"
            prop="detail_1.temp_surplus_total_amount"
          >
            <template slot-scope="scope">
              <span>{{
                0 > scope.row.detail_1.temp_surplus_total_amount
                  ? 0
                  : scope.row.detail_1.temp_surplus_total_amount
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成率" prop="detail_1.road_process_rate">
          </el-table-column>
        </el-table-column>
        <el-table-column label="挖方（m³）">
          <el-table-column
            :label="activeIn == 0 ? '总计' : '计划'"
            :prop="activeIn == 0 ? 'unit_project_dig' : 'detail_2.plan_amount'"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_2.temp_fact_total_amount"
          >
          </el-table-column>
          <el-table-column
            label="未完成"
            prop="detail_2.temp_surplus_total_amount"
          >
            <template slot-scope="scope">
              <span>{{
                0 > scope.row.detail_2.temp_surplus_total_amount
                  ? 0
                  : scope.row.detail_2.temp_surplus_total_amount
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成率" prop="detail_2.road_process_rate">
          </el-table-column>
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
import dayjs from "dayjs";
import { mapGetters } from "vuex";
const date = dayjs();
export default {
  mixins: [table],
  data() {
    return {
      activeIn: 0,
      isShow: this.$route.meta.isProject,
      navs: ["累计", "月", "周", "天"],
      postURL: "roadProgressUnit",
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        // start_time: parseInt(this.$utils.parseDate2Str(this.$utils.fun_date(-1),"YYYYMMDD")),
        // end_time: parseInt(this.$utils.parseDate2Str(this.$utils.fun_date(-1),"YYYYMMDD")),
        project_classify: 0, //自营项目
        page: 0,
        page_size: 20,
      }, //筛选条件
      select_time: this.$utils.parseDate2Str(
        this.$utils.fun_date(-1),
        "YYYYMMDD"
      ), // 日
      allProject: "", //全部项目
      select_month: date.format("YYYYMM"),
      select_week: null,
      weekArr: [{}], //周
      infoData: {},
      spanArr: [],
      tableList: [],
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
    };
  },
  mounted() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.listQuery.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    this.getOrganProjectData();
    this.getList();
  },

  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.getOrganProjectData();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.listQuery.project_classify,
      });
      this.projectListSelect = result;
      this.allProject = this.projectListSelect.length
        ? this.projectListSelect.map((item) => item.organ_id).join(",")
        : "";
      this.listQuery.organ_node = this.isShow
        ? Number(this.allProject)
        : this.allProject;
      this.listQuery.organ_node ? this.refreshData() : (this.tableData = []);
    },
    changeDate() {
      this.listQuery.start_time = parseInt(this.select_time);
      this.listQuery.end_time = parseInt(this.select_time);
      this.refreshData();
    },
    changeWeek() {
      let select_week = this.select_week.split("-");
      // 周->第一天
      this.listQuery.start_time = parseInt(select_week[0]);
      // 周->最后天
      this.listQuery.end_time = parseInt(select_week[1]);
      this.refreshData();
    },
    async changeMonth() {
      if (this.activeIn == 2) {
        this.select_week = null;
        this.listQuery.start_time = 0;
        this.listQuery.end_time = 0;
        // 获取周
        await this.getWeeks();
      } else {
        // 获取月天数
        let days = dayjs(this.select_month + "01").daysInMonth();
        // 月->第一天
        this.listQuery.start_time = parseInt(this.select_month + "01");
        // 月->最后天
        this.listQuery.end_time = parseInt(this.select_month + "" + days);
      }
      this.refreshData();
    },
    async getWeeks() {
      let { result } = await api.queryWeekManageSetUpList({
        set_up_month_int: parseInt(this.select_month),
      });
      this.weekArr = result;
      // 设置默认选中第一周
      if (result[0]) {
        this.select_week =
          result[0].set_up_start_int + "-" + result[0].set_up_end_int;
        this.listQuery.start_time = result[0].set_up_start_int;
        this.listQuery.end_time = result[0].set_up_end_int;
      }
    },
    // 切换 累计 月 周 天
    handelSwitchChange(ind) {
      this.activeIn = ind;
      if (ind == 0) {
        this.listQuery = {
          organ_node: this.listQuery.organ_node,
          page: 0,
          page_size: 20,
        };
        this.refreshData();
      } else if (ind == 1) {
        this.select_month = date.format("YYYYMM");
        this.changeMonth();
      } else if (ind == 2) {
        this.select_month = date.format("YYYYMM");
        this.changeMonth();
      } else {
        this.select_time = date.format("YYYYMMDD");
        this.changeDate();
      }
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 处理数据
    detailInitialFun(arr) {
      arr.forEach((item) => {
        for (let i = 0, len = item.road_process_list.length; i < len; i++) {
          item[`detail_${item.road_process_list[i].m_p_d_build_type}`] =
            item.road_process_list[i];
        }
      });
      return arr;
    },
  },
};
</script>

<style scoped lang="scss"></style>
