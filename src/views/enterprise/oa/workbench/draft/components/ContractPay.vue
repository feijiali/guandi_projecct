<template>
  <div class="rounded-1 bg-white flex-fill">
    <div class="top-select-box">
      <div>
        <div class="d-inline-block">
          <label class="text-secondary">日期：</label>
          <el-date-picker
            @change="refreshData"
            class="el-date-picker-range-box"
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <el-table
      class="cursor-p-table"
      :data="tableDatas"
      ref="table"
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
      <el-table-column label="合同名称" align="center" prop="contract_name">
      </el-table-column>
      <el-table-column
        label="收款单位"
        align="center"
        prop="engineering_pay_receive_unit"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="付款单编号"
        prop="engineering_pay_no"
      ></el-table-column>
      <el-table-column
        align="center"
        label="合同分类"
        prop="contract_approval_type_str"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="经办人"
        prop="contract_approval_due_person"
      >
      </el-table-column>
      <el-table-column label="操作" header-align="center" width="80">
        <template slot-scope="scope">
          <i
            @click.stop="
              $router.linkTo('enterprise_engineering_metering_payment', {
                draft_id: scope.row.draft_id,
                t: 2,
                from: 1,
              })
            "
            class="iconfont btn-btn_list_edit edit-icon-btn"
          ></i>
          <i
            v-permission="['ProjectReportEngineeringPay-delete']"
            @click.stop="deleteFun(false, scope.row, 'draft_id', 'DelDraft')"
            class="
              iconfont
              btn-btn_list_trash
              trash-icon-btn
              ml-2
              table-trash-icon
            "
          ></i>
        </template>
      </el-table-column>
    </el-table>
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
import confirm from "@/mixins/confirm";
import table from "@/mixins/table";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryDraftList",
      listQuery: {
        page: 0,
        page_size: 20,
        draft_module: this.$route.query.name,
        draft_account_id_un: Number(this.$store.getters.account_id),
      },
      dateRange: [],
      tableDatas: [], //日期
      teamTypeArr: [
        "A",
        "B1",
        "B2",
        "B3",
        "C1",
        "C2",
        "C3",
        "D1",
        "D2",
        "D3",
        "E1",
        "E2",
        "E3",
        "E4",
      ],
      dateRange: [],
      tableDatas: [],
      contract_id_un: parseInt(this.$route.query.contract_id_un), //合同ID
    };
  },
  watch: {
    tableData() {
      this.tableDatas = [];
      this.tableData.forEach((item) => {
        let draft_content = JSON.parse(item.draft_content);
        this.tableDatas.push({ ...draft_content, draft_id: item.draft_id });
      });
    },
    deep: true,
  },
  methods: {
    // 点击详情跳转
    rowclick(row) {
      // 如果是请假
      this.$router.linkTo("enterprise_oa_workbench_info", {
        t: 4,
        types: "OAPurchaseApproval",
        isDraft: true,
        id: row.draft_id,
      });
    },

    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.date_start = this.dateRange[0];
        this.listQuery.date_end = this.dateRange[1];
      } else {
        this.listQuery.date_start = "";
        this.listQuery.date_end = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
</style>
