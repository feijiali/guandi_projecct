<template>
  <div class="container-all position-relative">
    <div class="position-absolute" style="top: -60px; right: 10px">
      <n-button
        v-permission="['StaffWorker-export']"
        :btnText="'导出'"
        class="ml-2"
        @buttonClick="
          $utils.handleExport('ExportStaffTeam', listQuery, '班组维护表')
        "
      >
        <template v-slot:button-slot>
          <i class="iconfont btn-btn_nav_export mr-1"></i>
        </template>
      </n-button>
    </div>
    <div
      class="statistics-box-item d-flex align-items-center cursor-p position-absolute"
      style="top: -55px; left: 370px"
    >
      <div class="ml-1">
        <span class="font-15">工班总数</span>
        <span
          class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
        >
          {{ totalcount }}<span class="font-14 font-weight-normal"></span>
        </span>
      </div>
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <!-- 班组维护筛选 -->
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="chooseProject"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                label="全部"
                v-if="!isShow"
                :value="this.$organ_id_en_or_pro(this)"
              ></el-option>
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">选择工区：</label>
            <el-select
              @change="chooseSection"
              v-model="listQuery.team_work_organ_id_union"
              placeholder="请选择工区"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="item in work_areas"
                :key="item.organ_id"
                :value="item.organ_id"
                :label="
                  item.organ_parent_node_name
                    .split(',')
                    .slice(1, item.organ_parent_node_name.split(',').length)
                    .join('/')
                "
              >
                {{
                  item.organ_parent_node_name
                    .split(",")
                    .slice(1, item.organ_parent_node_name.split(",").length)
                    .join("/")
                }}
              </el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">劳务单位：</label>
            <el-select
              v-model="listQuery.team_labour"
              placeholder="请选择"
              @change="chooselabour"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="item in labourData"
                :key="item.team_labour"
                :label="item.team_labour"
                :value="item.team_labour"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">班组：</label>
            <el-select
              v-model="listQuery.team"
              placeholder="请选择"
              @change="search"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="item in teamData"
                :key="item.team"
                :label="item.team"
                :value="item.team"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange2"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <!-- <div class="d-inline-block ml-1">
            <label class="text-secondary">是否比选：</label>
            <el-select
              class="short-selelect"
              style="width: 80px !important"
              v-model="listQuery.team_source"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="是" :value="2"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </div> -->
          <!-- <div class="d-inline-block ml-1">
            <label class="text-secondary">状态：</label>
            <el-select
              class="short-selelect"
              style="width: 80px !important"
              v-model="listQuery.status"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="在场" :value="2"></el-option>
              <el-option label="离场" :value="1"></el-option>
            </el-select>
          </div> -->
        </div>
        <div>
          <n-button
            v-permission="['StaffWorker-upload']"
            v-if="isShow"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_account_labourRealName_handleTeam')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <div style="height: calc(100% - 100px)">
        <teamTable :tableDatas="tableData" :currentPages="currentPage" />
      </div>
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
import upload from "@/mixins/upload";
import api from "@/api/index";
import teamTable from "../compenents/teamTable";
export default {
  components: { teamTable },
  mixins: [table, upload],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      activeIn: 0,
      countOutOfDate: 0,
      postURL: "QueryStaffTeam",
      listQuery: {
        //班组维护参数
        page: 0,
        page_size: 20,
        team_source: 1, //是否比选
        team_work_organ_id_union: null, //工区
        organ_node: this.$organ_id_en_or_pro(this), //工程项目
        team: "", //班组
        team_labour: "", //劳务单位
        team_time_start: 0,
        team_time_end: 0,
      },
      dateRange2: [], //班组时间选择
      work_areas: [],
      teamData: [], //班组
      labourData: [], //劳务单位
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  activated() {
    // 查询工区
    this.queryOrganArea();
    // 查询劳务单位
    this.QueryLabour();
  },
  methods: {
    // 查询项目下的项目
    async queryOrganArea() {
      let res = await api.queryOrgan({
        organ_node: this.listQuery.organ_node,
        organ_type: 50,
      });
      this.work_areas = res.result;
    },
    // 劳务人员筛选劳务单位
    chooselabour(val) {
      this.listQuery.team = "";
      // 查询班组
      this.QueryStaffTeamName();
      this.getList();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.team_time_start = this.dateRange2
        ? Number(this.dateRange2[0])
        : null;
      this.listQuery.team_time_end = this.dateRange2
        ? Number(this.dateRange2[1])
        : null;
      this.currentPage = 1;
      this.getList();
    },
    // 树形下拉选择
    chooseProject(val) {
      this.listQuery.team_labour = "";
      this.listQuery.team = "";
      this.listQuery.team_work_organ_id_union = 0;
      // 查询该项目下的工区
      this.queryOrganArea();
      this.refreshData();
    },
    // 选择工区
    chooseSection(val) {
      this.listQuery.team_labour = "";
      this.listQuery.team = "";
      // 查询劳务单位
      this.QueryLabour();
      // 查询班组
      this.QueryStaffTeamName();
      this.refreshData();
    },
    //查询班组
    async QueryStaffTeamName() {
      let data = await api.QueryStaffTeamName({
        team_labour: this.listQuery.team_labour,
        team_work_organ_id_union: this.listQuery.team_work_organ_id_union,
        organ_node: this.listQuery.organ_node,
      });
      this.teamData = data.result;
    },
    //查询劳务单位
    async QueryLabour() {
      let data = await api.QueryStaffTeamLabour({
        organ_node: this.listQuery.organ_node,
        team_work_organ_id_union: this.listQuery.team_work_organ_id_union,
      });
      this.labourData = data.result;
    },
  },
};
</script>

<style scoped lang="scss">
.personinfo-top-count {
  text-align: center;
  border-radius: 4px;
  padding: 10px 0;
  width: 150px;
  color: white;
  font-size: 13px;
}
.short-selelect {
  ::v-deep .el-input {
    width: 100% !important;
  }
}
</style>
