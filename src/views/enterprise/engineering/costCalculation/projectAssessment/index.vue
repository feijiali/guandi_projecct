<template>
  <div class="container-all">
    <n-dialog
      ref="import"
      :diaTit="'导入项目考核表'"
      :diaWidth="'500px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <FileImport @complete="handleImported"></FileImport>
      </template>
    </n-dialog>

    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">月份：</span>
            <el-date-picker
              style="width: 140px"
              :clearable="false"
              class="el-date-editor-m"
              @change="changedate"
              v-model="listQuery.project_assessment_date"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            />
          </div>
        </div>
        <div>
          <n-button
            class="ml-1"
            :btnText="'导入'"
            @buttonClick="handleImport"
            v-permission="['CostEstimationProjectAssessment-upload']"
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'导出'"
            v-permission="['CostEstimationProjectAssessment-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportCostEstimationProjectAssessment',
                listQuery,
                '项目考核表'
              )
            "
          ></n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          label="项目名称"
          align="center"
          width="160"
          prop="organ"
        >
        </el-table-column>
        <el-table-column
          label="合同价格(万)"
          align="center"
          width="200"
          prop="project_assessment_contract_money"
        ></el-table-column>
        <el-table-column
          label="变更后合同总价(万)"
          width="200"
          align="center"
          prop="project_assessment_change_contract_money"
        ></el-table-column>
        <el-table-column label="产值收入(万)" align="center">
          <el-table-column
            label="当月"
            min-width="100"
            align="center"
            prop="project_assessment_output_month"
          ></el-table-column>
          <el-table-column
            label="开累"
            min-width="100"
            align="center"
            prop="project_assessment_output_total"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="已计量产值(万)" align="center">
          <el-table-column
            label="当月"
            min-width="100"
            align="center"
            prop="project_assessment_report_output_month"
          ></el-table-column>
          <el-table-column
            label="开累"
            min-width="100"
            align="center"
            prop="project_assessment_report_output_total"
          ></el-table-column> </el-table-column
        ><el-table-column label="收入(万)" align="center">
          <el-table-column
            label="当月"
            min-width="100"
            align="center"
            prop="project_assessment_income_month"
          ></el-table-column>
          <el-table-column
            label="开累"
            min-width="100"
            prop="project_assessment_income_total"
            align="center"
          ></el-table-column> </el-table-column
        ><el-table-column label="成本(万)" align="center">
          <el-table-column
            label="当月"
            min-width="100"
            align="center"
            prop="project_assessment_cost_month"
          ></el-table-column>
          <el-table-column
            label="开累"
            min-width="100"
            align="center"
            prop="project_assessment_cost_total"
          ></el-table-column> </el-table-column
        ><el-table-column label="效益(万)" align="center">
          <el-table-column
            label="当月"
            min-width="100"
            align="center"
            prop="project_assessment_benefit_month"
          ></el-table-column>
          <el-table-column
            label="开累"
            min-width="100"
            align="center"
            prop="project_assessment_benefit_total"
          ></el-table-column>
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
import confirm from "@/mixins/confirm";
import FileImport from "./components/Import";
import { listMixin } from "@/mixins/material.js";

export default {
  mixins: [table, confirm, listMixin],
  components: { FileImport },
  data() {
    return {
      postURL: "QueryCostEstimationProjectAssessmentList", //表格请求接口
      tableData: [],
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        project_assessment_date: this.$utils.getCurrentTime("", "", "month"),
      },
    };
  },
  methods: {
    changedate(val) {
      this.listQuery.cost_info_date = val;
      this.getList();
    },
    handleImport() {
      this.$refs.import.show();
    },
  },
};
</script>
