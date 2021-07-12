<template>
  <div class="container-all">
    <n-dialog
      ref="import"
      :diaTit="'导入材料收发存汇总表'"
      :diaWidth="'500px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <FileImport @complete="handleImported"></FileImport>
      </template>
    </n-dialog>

    <div class="container-div">
      <ListConditions
        ref="conditions"
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
  name: "MaterialRecept",
  mixins: [table, confirm, listMixin],
  components: { ListConditions, List, FileImport },
  data() {
    return {
      postURL: "QueryMaterialStandingBookList", //表格请求接口
      exportURL: "ExportMaterialStandingBook", // 导出接口
      exportFilename: "材料收发存汇总表",
      editRouteName: "enterprise_material2_manage_recept_edit", // 编辑页面的路由名称
      listQuery: {
        page: 0,
        page_size: 20,
        search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        material_standing_book_date: this.$utils.getCurrentTime(
          "",
          "",
          "month"
        ),
      },
    };
  },
};
</script>
