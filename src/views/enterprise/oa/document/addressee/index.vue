<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 10:02:08
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
        <n-search :isInput="true" :placeholder="'请输入关键字搜索'" @searchFun="searchFun"></n-search>
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
          <label class="text-secondary mr-1">处理状态：</label>
          <el-select v-model="listQuery.query_do" placeholder="请选择" @change="refreshData">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="未处理" :value="2"></el-option>
            <el-option label="已处理" :value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <n-button class="ml-2" :btnText="'导出'" colorBtn="orange" @buttonClick="exportFun">
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
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      ><template slot="empty">
        <span>真是不巧，暂时没有数据呢~</span>
      </template>
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column prop="index" label="序号" width="80">
        <template slot-scope="scope">
          <label>{{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}</label>
        </template>
      </el-table-column>
      <el-table-column label="发文字号" prop="receive_num" width="200"></el-table-column>
      <el-table-column label="标题" prop="receive_title"> </el-table-column>
      <el-table-column label="主送" :show-overflow-tooltip="true">
        <span slot-scope="{ row }">{{ row.main_list && row.main_list.map(item => item.account_name).join() }}</span>
      </el-table-column>
      <el-table-column label="抄送" :show-overflow-tooltip="true">
        <span slot-scope="{ row }">{{ row.copy_list && row.copy_list.map(item => item.account_name).join() }}</span>
      </el-table-column>
      <el-table-column label="提交日期" width="140">
        <span slot-scope="{ row }">{{ row.receive_time && $utils.formatDate(row.receive_time) }}</span>
      </el-table-column>
      <el-table-column label="处理状态" width="120">
        <span
          slot-scope="{ row }"
          class="status-btn"
          :style="{
            backgroundColor: row.receive_file_id_un != 0 ? ' #E2E8EE' : '#E7E7FC',
            color: row.receive_file_id_un != 0 ? '#8E95A7' : '#1213E9',
          }"
          >{{ row.receive_file_id_un != 0 ? "已处理" : "未处理" }}</span
        >
      </el-table-column>
      <el-table-column label="处理回复人数" width="140" prop="receive_resolve_c">
        <span
          slot-scope="{ row }"
          :style="{
            color: row.receive_file_id_un != 0 ? '#8E95A7' : '#1213E9',
          }"
          @click.stop="linkTo('enterprise_oa_document_monitor_reply_detail', { id: row.receive_file_id })"
          >{{ row.receive_resolve_c }}</span
        >
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="{ row }">
          <span v-if="row.receive_file_id_un == 0" class="main font-14" @click.stop="reply(row)">处理回复</span>
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
        query_type: 5,
      },
      dateRange: [],
      tableData: [],
      sectionIds: [],
    };
  },
  created() {
    if (this.$route.meta.isProject) {
      this.navs.forEach(item => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
  },
  methods: {
    // 导出
    exportFun() {
      if (this.sectionIds.length > 0) {
        let receive_file_ids = this.sectionIds.map(item => item.receive_file_id);
        this.listQuery.receive_file_ids = receive_file_ids.join(",");
      } else {
        this.listQuery.receive_file_ids = "";
      }
      this.$utils.handleExport("ExportReceiveReceiveFile", this.listQuery, "我的收文");
    },
    handleSelectionChange(val) {
      this.sectionIds = val;
    },
    tableRowClassName({ row }) {
      if (row.receive_file_id_un != 0) {
        return "noread-row";
      } else {
        return "";
      }
    },
    reply(row) {
      this.linkTo("enterprise_oa_document_addressee_reply", {
        id: row.receive_file_id,
        send_name: row.creat_name.account_name,
        receive_id: row.receive_create,
      });
    },
    rowclick(row) {
      this.linkTo("enterprise_oa_document_addressee_info", {
        id: row.receive_file_id,
        send_name: row.creat_name.account_name,
        receive_id: row.receive_create,
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
