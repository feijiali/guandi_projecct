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
      <el-table-column label="加班时间" prop="overtime_start_time">
        <template slot-scope="scope">
          {{ scope.row.overtime_start_time }} 至
          {{ scope.row.overtime_end_time }}
        </template>
      </el-table-column>
      <el-table-column
        label="时长(小时)"
        prop="overtime_time"
      ></el-table-column>
      <el-table-column label="备注" prop="overtime_desc"></el-table-column>
      <el-table-column label="操作" header-align="center" width="80">
        <template slot-scope="scope">
          <i
            @click.stop="
              $router.linkTo('enterprise_oa_workbench_apply', {
                draft_id: scope.row.draft_id,
                t: 3,
              })
            "
            class="iconfont btn-btn_list_edit edit-icon-btn"
          ></i>
          <i
            v-permission="['OAOvertime-delete']"
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
      postURL: "QueryDraftList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        draft_module: this.$route.query.name,
        draft_account_id_un: Number(this.$store.getters.account_id),
      },
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
        types: "OAOvertime",
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
