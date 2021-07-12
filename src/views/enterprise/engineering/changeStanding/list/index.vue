<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-white flex-fill">
      <div class="rounded-1 bg-white d-flex position-relative px-1 pt-1">
        <div
          class="statistics-box-item d-flex align-items-center"
          style="width: 17%"
          v-for="(item, index) in statisticsArr"
          :key="index"
        >
          <div class="ml-1">
            <span class="font-15">{{ item.name }}：</span>
            <div class="d-inline-block">
              <span
                style="left: 5px"
                class="text-hover-primary font-24 position-relative"
                v-if="totalCounts[item.key] < 0"
                >-</span
              >
              <span class="langdon-font text-hover-primary font-24">
                {{ Math.abs(totalCounts[item.key]) }}
              </span>
              <span class="font-14 font-weight-normal">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top-select-box bg-white" style="border-radius: 10px 10px 0 0">
        <div>
          <div class="d-inline-block" v-if="!isShow">
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
          <div class="d-inline-block" :class="[isShow ? '' : 'ml-2']">
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
          <div class="d-inline-block ml-2">
            <label class="text-secondary">日期：</label>
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
          <div class="d-inline-block ml-2">
            <label class="text-secondary">审批状态：</label>
            <el-select
              v-model="listQuery.revise_info_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正在审批" :value="2"></el-option>
              <el-option label="已通过" :value="3"></el-option>
              <el-option label="未通过" :value="4"></el-option>
              <el-option label="已撤销" :value="5"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['ChangeParameterParameter-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'ChangeParameterParameter',
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            v-permission="['ChangeParameterParameter-export']"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'ExportChangeParameterParameter',
                'parameter_id',
                tableSelectList.length ? {} : listQuery,
                '台账申请表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ChangeParameterParameter-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_handle',
                {
                  t: 6,
                }
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 120px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="申请日期"
          prop="parameter_create_time"
          ><template slot-scope="scope">
            {{ scope.row.parameter_create_time.split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="工程项目"
          prop="organ"
        ></el-table-column>

        <el-table-column
          label="合同段"
          align="center"
          prop="parameter_contract_period"
        >
        </el-table-column>
        <el-table-column
          label="变更编号"
          align="center"
          prop="parameter_no"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="桩号"
          align="center"
          prop="parameter_pile_no"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="金额增减(元)"
          prop="parameter_money"
        >
          <template slot-scope="scope">
            {{ scope.row.parameter_money }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请人" prop="account_name">
        </el-table-column>
        <el-table-column align="center" label="审批状态" width="100">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :style="{
                backgroundColor:
                  GLOBAL.backgroundColorArr[scope.row.revise_info_state],
                color: GLOBAL.colorArr[scope.row.revise_info_state],
              }"
              >{{ GLOBAL.reviseStateArr[scope.row.revise_info_state] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="变更状态">
          <template slot-scope="scope">
            <template
              v-if="
                scope.row.revise_info_state == 3 &&
                scope.row.parameter_info_type != 0
              "
            >
              <span
                :style="{
                  color: colorArr[scope.row.parameter_info_type - 1],
                }"
                >{{
                  parameterInfoTypeArr[scope.row.parameter_info_type - 1]
                }}</span
              >
            </template>
            <template v-else> -- </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <div
              @click.stop
              class="d-inline-block"
              v-permission="['ChangeParameterParameterInfo-upload']"
            >
              <nStatusButton
                @buttonClick="
                  scope.row.revise_info_state == 3 &&
                    $router.linkTo(
                      'enterprise_engineering_changeStanding_list_update_updateHandle',
                      { id: scope.row.parameter_id }
                    )
                "
                :changeColor="
                  scope.row.revise_info_state == 3 ? '#fd5571' : '#D6DAE4'
                "
                :btnText="'更新状态'"
              />
            </div>
            <i
              v-permission="['ChangeParameterParameter-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'parameter_id',
                  'DelChangeParameterParameter',
                  () => {
                    QueryChangeParameterParameterMoney();
                  }
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2"
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";

export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryChangeParameterParameterList",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        parameter_start_time: "",
        parameter_end_time: "",
      },
      allProject: "", //全部项目
      dateRange: [], //日期范围
      keyID: "contract_approval_id",
      getListBool: false,
      statisticsArr: [
        {
          name: "项目总造价",
          key: "project_total_value",
          unit: "元",
        },
        {
          name: "所有正变更金额",
          key: "parameter_detail_change_money_positive",
          unit: "元",
        },
        {
          name: "所有负变更金额",
          key: "parameter_detail_change_money_negative",
          unit: "元",
        },
        {
          name: "项目变更总额",
          key: "parameter_detail_change_money_total",
          unit: "元",
        },
      ],
      parameterInfoTypeArr: ["未上报", "已上报未批复", "已上报已批复"],
      colorArr: ["#ff8f28", "#3536ec", "#3ad332"],
      totalCounts: {
        project_total_value: 0,
        parameter_detail_change_money_positive: 0,
        parameter_detail_change_money_negative: 0,
        parameter_detail_change_money_total: 0,
      }, //统计
      treeData: [],
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
      getListBool: false,
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
  },
  activated() {
    this.getList();
    this.QueryChangeParameterParameterMoney();
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
      if (this.listQuery.organ_node) {
        this.refreshData();
      } else {
        this.tableData = [];
        this.totalCounts.project_total_value = 0;
        this.totalCounts.parameter_detail_change_money_positive = 0;
        this.totalCounts.parameter_detail_change_money_negative = 0;
        this.totalCounts.parameter_detail_change_money_total = 0;
      }
    },
    async QueryChangeParameterParameterMoney() {
      let { result } = await api.QueryChangeParameterParameterMoney({
        ...this.listQuery,
        page: -1,
      });
      let a = result.filter((item) => item.parameter_detail_state == 1);
      a = a[0] ? a[0].parameter_detail_change_money : 0;
      let b = result.filter((item) => item.parameter_detail_state == 2);
      b = b[0] ? b[0].parameter_detail_change_money : 0;
      this.totalCounts.project_total_value = result[0]
        ? (result[0].project_total_value * 10000).toFixed(2)
        : 0;
      this.totalCounts.parameter_detail_change_money_positive = a;
      this.totalCounts.parameter_detail_change_money_negative = b;
      this.totalCounts.parameter_detail_change_money_total = (
        Number(a) + Number(b)
      ).toFixed(2);
    },
    rowclick(row) {
      this.$router.linkTo("enterprise_engineering_changeStanding_list_info", {
        t: 4,
        types: "ChangeParameterParameter",
        id: row.revise_info_accessory_id,
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.parameter_start_time = this.dateRange[0];
        this.listQuery.parameter_end_time = this.dateRange[1];
      } else {
        this.listQuery.parameter_start_time = "";
        this.listQuery.parameter_end_time = "";
      }
      this.currentPage = 1;
      this.getList();
      // 查询台账金额统计
      this.QueryChangeParameterParameterMoney();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>