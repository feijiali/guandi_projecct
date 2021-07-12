<template>
  <div class="container-all">
    <n-dialog
      ref="import"
      :diaTit="'导入成本测算表'"
      :diaWidth="'600px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot"
        ><FileImport @complete="handleImported"></FileImport
      ></template>
    </n-dialog>
    <n-dialog
      ref="dialog"
      :diaTit="'成本测算表修改记录'"
      :diaWidth="'900px'"
      class="stretch-dialog2"
    >
      <template slot="diaSlot">
        <el-table :data="tableData3" style="width: 100%" height="600px">
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column
            min-width="100"
            label="用户"
            align="center"
            prop="account_name"
          >
          </el-table-column>
          <el-table-column
            min-width="100"
            label="时间"
            align="center"
            prop="cost_info_log_time"
          >
          </el-table-column>
          <el-table-column
            label="修改内容"
            min-width="100"
            align="center"
            prop="cost_info_title"
          ></el-table-column>
          <el-table-column
            label="修改前数据"
            min-width="100"
            align="center"
            prop="cost_info_content"
          ></el-table-column>
        </el-table>
        <el-pagination
          background
          class="text-right bg-secondary"
          layout="prev, pager, next"
          :page-size="listQuery2.page_size"
          @current-change="getList2"
          :current-page.sync="currentPage"
          :total="totalcount"
        ></el-pagination>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="project_classify"
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
              v-model="listQuery.organ_node"
              @change="changeorgan"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">月份：</span>
            <el-date-picker
              :clearable="false"
              @change="changedate"
              style="width: 140px"
              class="el-date-editor-m"
              v-model="listQuery.cost_info_date"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            />
          </div>
        </div>
        <div>
          <n-button :btnText="'修改记录'" @buttonClick="costmodify"></n-button>
          <n-button
            class="ml-1"
            :btnText="'导入'"
            v-permission="['CostEstimationCostInfo-upload']"
            @buttonClick="handleImport"
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'导出'"
            v-permission="['CostEstimationCostInfo-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportCostEstimationCostInfo',
                listQuery,
                '成本测算表'
              )
            "
          ></n-button>
        </div>
      </div>
      <div class="h-100 d-flex">
        <el-table
          :data="tableData"
          style="width: 50%"
          height="calc(100% - 30px)"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column label="收入汇总" align="center">
            <el-table-column
              min-width="100"
              label="章节"
              align="center"
              prop="cost_info_name"
            >
            </el-table-column>
            <el-table-column
              min-width="100"
              label="项目名称"
              align="center"
              prop="cost_info_title"
            >
            </el-table-column>
            <el-table-column
              label="本月金额(元)"
              min-width="100"
              align="center"
              prop="cost_info_month_money"
            >
              <template slot-scope="scope">
                <div class="flexcen" v-if="scope.row.editmoney == false">
                  <span>{{ scope.row.cost_info_month_money }}</span>
                  <i
                    class="ml-05 iconfont btn-btn_list_edit edit-icon-btn"
                    v-permission="['CostEstimationCostInfo-update']"
                    @click.stop="Editmoney(scope.row)"
                  ></i>
                </div>
                <div class="flexcen" v-if="scope.row.editmoney == true">
                  <num-input
                    style="width: 80px"
                    v-model="scope.row.cost_info_month_money"
                    :fixedNum="2"
                  ></num-input>
                  <span
                    class="text-hover-primary ml-1 cursor-p"
                    @click.stop="UpdateCost(scope.row)"
                    >确定</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="本年金额(元)"
              min-width="100"
              align="center"
              prop="year_cost_info_month_money"
            ></el-table-column>
            <el-table-column
              label="累计金额(元)"
              min-width="100"
              align="center"
              prop="total_cost_info_month_money"
            ></el-table-column>
            <el-table-column
              label="完成比例(%)"
              min-width="100"
              align="center"
              prop="cost_info_rate"
            ></el-table-column>
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData2"
          style="width: 50%"
          height="calc(100% - 30px)"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column label="成本汇总" align="center">
            <el-table-column
              min-width="100"
              label="项目名称"
              align="center"
              prop="cost_info_title"
            >
            </el-table-column>
            <el-table-column
              label="本月金额(元)"
              min-width="100"
              align="center"
              prop="cost_info_month_money"
            >
              <template slot-scope="scope">
                <div class="flexcen" v-if="scope.row.editmoney == false">
                  <span>{{ scope.row.cost_info_month_money }}</span>
                  <i
                    class="ml-05 iconfont btn-btn_list_edit edit-icon-btn"
                    v-permission="['CostEstimationCostInfo-update']"
                    @click.stop="Editmoney(scope.row)"
                  ></i>
                </div>
                <div class="flexcen" v-if="scope.row.editmoney == true">
                  <num-input
                    style="width: 80px"
                    v-model="scope.row.cost_info_month_money"
                    :fixedNum="2"
                  ></num-input>
                  <span
                    class="text-hover-primary ml-1 cursor-p"
                    @click.stop="UpdateCost2(scope.row)"
                    >确定</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="本年金额(元)"
              min-width="100"
              align="center"
              prop="year_cost_info_month_money"
            ></el-table-column>
            <el-table-column
              label="累计金额(元)"
              min-width="100"
              align="center"
              prop="total_cost_info_month_money"
            ></el-table-column>
            <el-table-column
              label="完成比例(%)"
              min-width="100"
              align="center"
              prop="cost_info_rate"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="备注"
              align="center"
              prop="cost_info_remark"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import FileImport from "./components/Import";
import { listMixin } from "@/mixins/material.js";

export default {
  mixins: [confirm, listMixin],
  components: { FileImport },
  data() {
    return {
      isShow: this.$route.meta.isProject,
      tableData: [],
      tableData2: [],
      tableData3: [],
      currentPage: 1,
      totalcount: 0,
      listQuery: {
        page: 0,
        organ_node: null,
        cost_info_date: this.$utils.getCurrentTime("", "", "month"),
      },
      project_classify: 0, //自营项目
      listQuery2: {
        page: 0,
        page_size: 10,
      },
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
      cost_info_history_month_money: "",
    };
  },
  async created() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.project_classifyry = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    await this.getOrganProjectData();
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.listQuery.organ_node = this.$organ_id_en_or_pro(this);
      this.getOrganProjectData();
      // this.getList();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.project_classify,
      });
      this.projectListSelect = result;
      this.listQuery.organ_node = this.projectListSelect[0].organ_id;
      this.getList();
    },
    async getList() {
      let tableData = [];
      let tableData2 = [];
      let data = await api.QueryCostEstimationCostInfoList(this.listQuery);
      let datas = data.result;
      if (datas.length && datas[0].cost_info_id == 0) {
        this.tableData = [];
        this.tableData2 = [];
      } else {
        for (let i = 0; i < datas.length; i++) {
          datas[i].editmoney = false;
          if (datas[i].cost_info_type == 1) {
            tableData.push(datas[i]);
          } else {
            tableData2.push(datas[i]);
          }
        }
        this.tableData = tableData;
        this.tableData2 = tableData2;
      }
    },
    changeorgan(val) {
      this.listQuery.organ_node = val;
      this.getList();
    },
    changedate(val) {
      this.listQuery.cost_info_date = val;
      this.getList();
    },
    Editmoney(data) {
      this.$set(data, "editmoney", true);
      this.cost_info_history_month_money = data.cost_info_month_money;
    },
    async UpdateCost(data) {
      let cost_rate =
        String(
          (
            (Number(data.cost_info_month_money) /
              (Number(data.year_cost_info_month_money) +
                Number(data.cost_info_month_money) -
                Number(this.cost_info_history_month_money))) *
            100
          ).toFixed(2)
        ) + "%";
      let res = await api.UpdateCostEstimationCostInfo({
        cost_info_id: data.cost_info_id,
        cost_info_type: 1,
        cost_info_name: data.cost_info_name,
        cost_info_title: data.cost_info_title,
        cost_info_account_id_un: data.cost_info_account_id_un,
        cost_info_rate: cost_rate,
        cost_info_order: data.cost_info_order,
        cost_info_remark: data.cost_info_remark,
        cost_info_date: data.cost_info_date,
        cost_info_organ_id_un: Number(this.listQuery.organ_node),
        cost_info_month_money: String(data.cost_info_month_money),
        cost_info_history_month_money: this.cost_info_history_month_money,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getList();
        },
      });
    },
    async UpdateCost2(data) {
      let cost_rate =
        String(
          (
            (Number(data.cost_info_month_money) /
              (Number(data.year_cost_info_month_money) +
                Number(data.cost_info_month_money) -
                Number(this.cost_info_history_month_money))) *
            100
          ).toFixed(2)
        ) + "%";
      let res = await api.UpdateCostEstimationCostInfo({
        cost_info_id: data.cost_info_id,
        cost_info_type: 2,
        cost_info_name: data.cost_info_name,
        cost_info_title: data.cost_info_title,
        cost_info_account_id_un: data.cost_info_account_id_un,
        cost_info_rate: cost_rate,
        cost_info_order: data.cost_info_order,
        cost_info_remark: data.cost_info_remark,
        cost_info_date: data.cost_info_date,
        cost_info_organ_id_un: Number(this.listQuery.organ_node),
        cost_info_month_money: String(data.cost_info_month_money),
        cost_info_history_month_money: this.cost_info_history_month_money,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getList();
        },
      });
    },
    handleImport() {
      this.$refs.import.show();
    },
    costmodify() {
      this.$refs.dialog.show();
      this.getList2();
    },
    async getList2() {
      this.tableData3 = [];
      this.listQuery2.page =
        this.listQuery2.page == -1 ? -1 : this.currentPage - 1;
      this.listQuery2.organ_node = this.listQuery.organ_node;
      let data = await api.QueryCostEstimationCostInfoLogList(this.listQuery2);
      this.tableData3 = data.result;
      this.totalcount = data.total_count;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>