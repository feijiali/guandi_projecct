<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 10:16:52
-->
<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-04 10:23:42
-->
<template>
  <div class="bg-white w-100 h-100 rounded-1 p-1">
    <div class="d-flex justify-content-between">
      <div>
        <n-search
          :isInput="true"
          :placeholder="'请输入关键字搜索'"
          @searchFun="searchFun"
        ></n-search>
        <div class="d-inline-block ml-2">
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
          </el-select>
        </div>
      </div>
      <div>
        <n-button
          class="ml-2"
          :btnText="'导出'"
          colorBtn="orange"
          @buttonClick="exportFun"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_nav_export mr-1"></i>
          </template>
        </n-button>
      </div>
    </div>
    <el-table
      class="cursor-p-table mt-1"
      :data="tableData"
      height="calc(100% - 100px)"
      @row-click="rowclick"
      @selection-change="handleSelectionChange"
      ><template slot="empty">
        <span>真是不巧，暂时没有数据呢~</span>
      </template>
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column prop="index" label="序号" width="80">
        <template slot-scope="scope">
          <label>{{
            (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
          }}</label>
        </template>
      </el-table-column>
      <el-table-column
        label="发文字号"
        prop="receive_num"
        width="200"
      ></el-table-column>
      <el-table-column label="标题" prop="receive_title"> </el-table-column>
      <el-table-column label="主送" :show-overflow-tooltip="true">
        <span slot-scope="{ row }">{{
          row.main_list && row.main_list.map((item) => item.account_name).join()
        }}</span>
      </el-table-column>
      <el-table-column label="抄送" :show-overflow-tooltip="true">
        <span slot-scope="{ row }">{{
          row.copy_list && row.copy_list.map((item) => item.account_name).join()
        }}</span>
      </el-table-column>
      <el-table-column label="提交日期" width="140">
        <span slot-scope="{ row }">{{
          row.receive_time && $utils.formatDate(row.receive_time)
        }}</span>
      </el-table-column>
      <el-table-column label="审批状态" width="120">
        <template slot-scope="{ row }">
          <span
            class="status-btn"
            :style="{
              backgroundColor: GLOBAL.backgroundColorArr[row.revise_info_state],
              color: GLOBAL.colorArr[row.revise_info_state],
            }"
            >{{ GLOBAL.reviseStateArr[row.revise_info_state] }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="{ row }">
          <span class="main font-14" @click.stop="approval(row)">立即审批</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="text-right"
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryReceiveReceiveFileList",
      listQuery: {
        page: 0,
        page_size: 20,
        query_type: 3,
      },
      dateRange: [],
      tableData: [],
      sectionIds: [],
    };
  },
  created() {
    if (this.$route.meta.isProject) {
      this.navs.forEach((item) => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
  },
  methods: {
    // 导出
    exportFun() {
      if (this.sectionIds.length > 0) {
        let receive_file_ids = this.sectionIds.map(
          (item) => item.receive_file_id
        );
        this.listQuery.receive_file_ids = receive_file_ids.join(",");
      } else {
        this.listQuery.receive_file_ids = "";
      }
      this.$utils.handleExport(
        "ExportReceiveReceiveFile",
        this.listQuery,
        "待办发文"
      );
    },
    handleSelectionChange(val) {
      this.sectionIds = val;
    },
    approval(row) {
      this.linkTo("enterprise_oa_workbench_approval", {
        t: 1,
        types: "ReceiveReceiveFile",
        id: row.revise_info_id,
      });
    },
    rowclick(row) {
      this.linkTo("enterprise_oa_document_commission_info", {
        id: row.receive_file_id,
      });
    },
    searchFun(val) {
      this.listQuery.search_key = val;
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start = this.dateRange ? Number(this.dateRange[0]) : null;
      this.listQuery.end = this.dateRange ? Number(this.dateRange[1]) : null;
      this.currentPage = 1;
      this.getList();
    },
    refresh() {
      this.$bus.$emit("refresh_document", "");
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-div-s {
  width: 100%;
  height: 100%;
}
</style>
