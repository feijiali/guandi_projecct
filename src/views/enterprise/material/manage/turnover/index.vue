<template>
  <div class="container-all">
    <n-dialog
      ref="import"
      :diaTit="'导入周转材料使用费表格'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <FileImport @complete="handleImported"></FileImport>
      </template>
    </n-dialog>

    <div class="container-div">
      <ListConditions
        ref="conditions"
        :organNode="listQuery.organ_node"
        @import="handleImport"
        @export="handleExport"
        @change="handleConChange"
      ></ListConditions>
      <List
        :data="tableData"
        @edit="handleEdit"
        @delete="handleDelete"
        :pageSize="listQuery.page_size"
        :currentPage="currentPage"
      ></List>
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
import ListConditions from "./components/ListConditions";
import List from "./components/List";
import FileImport from "./components/Import";
import { listMixin } from "@/mixins/material.js";
export default {
  name: "MaterialTurnover",
  mixins: [table, confirm, listMixin],
  components: { ListConditions, List, FileImport },
  data() {
    return {
      postURL: "QueryMaterialMoneyStandingBookList", //表格请求接口
      exportURL: "ExportMaterialMoneyStandingBook",
      exportFilename: "周转材料费用表",
      editRouteName: "enterprise_material2_manage_turnover_edit",
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        material_money_standing_book_depart: "",
        start_time: this.$utils.getCurrentTime("", "", "month"),
        page: 0,
        page_size: 20,
      },
    };
  },
};
</script>
