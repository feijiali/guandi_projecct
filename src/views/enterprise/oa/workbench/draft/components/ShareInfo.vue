<template>
  <div class="rounded-1 bg-white flex-fill">
    <div class="top-select-box">
      <div>
        <div class="d-inline-block ml-2">
          <span class="grey2">日期：</span>
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
      <el-table-column label="申请日期" prop="invoice_share_sub_time">
        <template slot-scope="scope">
          {{ scope.row.invoice_share_sub_time.split(" ")[0] }}
        </template></el-table-column
      >
      <!-- <el-table-column label="所属机构" prop="organ_area"></el-table-column> -->
      <el-table-column label="发票种类" prop="invoice_share_type"
        ><template slot-scope="scope">
          {{ invoice_share_type_arr[scope.row.invoice_share_type - 1] }}
        </template></el-table-column
      >
      <el-table-column
        label="发票张数(张)"
        prop="invoice_share_num"
      ></el-table-column>
      <el-table-column
        label="发票金额(元)"
        prop="invoice_share_amount"
      ></el-table-column>
      <el-table-column label="操作" header-align="center" width="80">
        <template slot-scope="scope">
          <i
            @click.stop="
              $router.linkTo('enterprise_oa_workbench_apply', {
                draft_id: scope.row.draft_id,
                t: 9,
              })
            "
            class="iconfont btn-btn_list_edit edit-icon-btn"
          ></i>
          <i
            v-permission="['OAInvoiceShare-delete']"
            @click.stop="
              deleteFun(false, scope.row, 'invoice_share_id', 'DelDraft')
            "
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
      postURL: "QueryDraftList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        draft_module: this.$route.query.name,
        draft_account_id_un: Number(this.$store.getters.account_id),
      },
      invoice_share_type_arr: [
        "餐费",
        "差旅费/滴滴发票",
        "电子产品",
        "家用电器/家具",
        "加油/过路/维修/保养",
        "生活用品/食品",
        "培训费/书籍",
        "装修费用",
        "办公费/网费",
      ],
      dateRange: [],
      tableDatas: [],
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
        types: "OAInvoiceShare",
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
