<template>
  <div class="container-all position-relative">
    <div
      class="statistics-box-item d-flex align-items-center cursor-p position-absolute"
      style="top: -55px; left: 370px"
    >
      <div
        class="ml-1"
        v-for="(item, index) in totalcountArr"
        :key="index"
        @click="changeSatus(index)"
      >
        <span class="font-15">{{ item.name }}</span>
        <span
          class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
        >
          {{ totalcounts[item.key]
          }}<span class="font-14 font-weight-normal">人</span>
        </span>
      </div>
    </div>
    <n-dialog
      ref="dialog"
      :diaTit="'导入劳务人员信息'"
      :diaWidth="'32%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>劳务人员模板</p>
            <a
              :href="GLOBAL.baseurl + '/MOULD/StaffWorker_import.xlsx'"
              download="人员模板.xlsx"
            >
              <n-button
                class="mt-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :limit="1"
            :multiple="false"
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
              :btnText="'导入劳务人员'"
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
    <div class="container-div">
      <div class="top-select-box">
        <!-- 入场等级筛选 -->
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
              v-model="listQuery.organ_id_union"
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
          <div class="d-inline-block ml-2">
            <label class="text-secondary">劳务单位：</label>
            <el-select
              v-model="listQuery.worker_labour"
              placeholder="请选择"
              @change="chooselabour"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="item in labourData1"
                :key="item.worker_labour"
                :label="item.worker_labour"
                :value="item.worker_labour"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block mt-1 ml-2">
            <label class="text-secondary">班组：</label>
            <el-select
              v-model="listQuery.worker_team_id_un"
              placeholder="请选择"
              @change="search"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="item in teamDataList"
                :key="item.team_id"
                :label="item.team"
                :value="item.team_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange1"
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
            v-permission="['StaffWorker-upload']"
            :btnText="'导入'"
            v-if="isShow"
            @buttonClick="exportFun"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['StaffWorker-upload']"
            v-if="isShow"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_oa_account_labourRealName_handleLabour'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['StaffWorker-export']"
            :btnText="'导出'"
            class="ml-2"
            @buttonClick="
              $utils.handleExport(
                'ExportStaffWorker',
                listQuery,
                '人员入场登记表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <div style="height: calc(100% - 100px)">
        <labourTable :tableDatas="tableData" :currentPages="currentPage" />
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
import labourTable from "../compenents/labourTable";
export default {
  components: { labourTable },
  mixins: [table, upload],
  data() {
    return {
      month: this.$utils.getCurrentTime("", "", "month"),
      isShow: this.$route.meta.isProject,
      countOutOfDate: 0,
      totalcountArr: [
        { name: "劳务人员", key: "worker_total" },
        { name: "在场人员", key: "worker_on" },
      ],
      totalcounts: { worker_total: 0, worker_on: 0 },
      postURL: "QueryStaffWorker",
      listQuery: {
        //入场登记参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this), //工程项目
        organ_id_union: 0, //工区
        worker_team_id_un: 0, //班组
        worker_labour: "", //劳务单位
        worker_status: 0, //在场人员
        worker_enter_time_start: 0,
        worker_enter_time_end: 0,
      },
      dateRange1: [], //劳务人员时间选择
      work_areas: [],
      teamDataList: [], //劳务人员筛选班组
      labourData1: [], //劳务工人的劳务公司
      total: { number1: 0 },
      fileList: [],
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  activated() {
    // 查询工区
    this.queryOrganArea();
    // 入场登记劳务工人统计
    this.QueryStaffWorkerStat();
    // 查询劳务单位
    this.QueryStaffWorkerLabour();
  },
  methods: {
    // 切换状态
    changeSatus(ind) {
      this.listQuery.worker_status = ind;
      this.currentPage = 1;
      this.getList();
    },
    // 查询项目下的项目
    async QueryStaffWorkerStat() {
      let res = await api.QueryStaffWorkerStat({
        ...this.listQuery,
      });
      this.totalcounts = res.result[0];
    },
    // 查询项目下的项目
    async queryOrganArea() {
      let res = await api.queryOrgan({
        organ_node: this.listQuery.organ_node,
        organ_type: 50,
      });
      this.work_areas = res.result;
    },
    //   点击导入
    exportFun() {
      this.fileList = [];
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入劳务人员表",
        });
        return;
      }
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      this.uploadFile([this.fileList[0].raw], {}, "ImportStaffWorker").then(
        (res) => {
          this.$tip({
            isTip: false,
            closeTime: 1000,
            func: () => {
              this.$refs.dialog.cancel();
              this.currentPage = 1;
              this.getList();
            },
          });
        }
      );
    },
    // 劳务人员筛选劳务单位
    chooselabour(val) {
      this.listQuery.worker_team_id_un = 0;
      // 查询班组-入场登记
      this.QueryStaffTeam();
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.worker_enter_time_start = this.dateRange1
        ? Number(this.dateRange1[0])
        : null;
      this.listQuery.worker_enter_time_end = this.dateRange1
        ? Number(this.dateRange1[1])
        : null;
      this.currentPage = 1;
      this.QueryStaffWorkerStat();
      this.getList();
    },
    // 树形下拉选择
    chooseProject(val) {
      this.listQuery.worker_labour = "";
      this.listQuery.team = "";
      this.listQuery.organ_id_union = 0;
      // 查询该项目下的工区
      this.queryOrganArea();
      this.refreshData();
    },
    // 选择工区
    chooseSection(val) {
      this.listQuery.worker_labour = "";
      // 查询劳务单位
      this.QueryStaffWorkerLabour();
      // 查询班组-入场登记
      this.QueryStaffTeam();
      this.refreshData();
    },
    //查询班组
    async QueryStaffTeam() {
      let data = await api.QueryStaffTeam({
        team_labour: this.listQuery.worker_labour,
        team_work_organ_id_union: this.listQuery.organ_id_union,
        organ_node: this.listQuery.organ_node,
      });
      this.teamDataList = data.result;
    },
    // 询劳务工人的劳务公司
    async QueryStaffWorkerLabour() {
      let data = await api.QueryStaffWorkerLabour({
        organ_node: this.listQuery.organ_node,
        organ_id_union: this.listQuery.organ_id_union,
      });
      this.labourData1 = data.result.filter((item) => item.worker_labour);
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
