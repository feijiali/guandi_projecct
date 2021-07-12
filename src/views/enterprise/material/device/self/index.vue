<template>
  <div class="container-all">
    <n-dialog
      ref="code"
      :hideHeader="true"
      :destroyOnClose="true"
      :showTitle="false"
      :diaTit="dialogTitle"
      :diaWidth="'481px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <CodeInfo :data="infoData" @close="$refs.code.cancel()"></CodeInfo>
      </template>
    </n-dialog>

    <n-dialog
      ref="import"
      :destroyOnClose="true"
      :diaTit="dialogTitle"
      :diaWidth="'500px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <FileImport
          ref="fileImport"
          v-bind="listQuery"
          @complete="handleImported"
        ></FileImport>
      </template>
    </n-dialog>

    <div class="container-div">
      <ListConditions
        ref="conditions"
        @import="$refs.import.show()"
        @export="handleExport"
        @change="handleConChange"
      ></ListConditions>
      <list
        :tableData="tableData"
        :currentPage="currentPage"
        :pageSize="listQuery.page_size"
        @show-code="showCode"
        @edit="handleEdit"
        @delete="handleDelete"
      ></list>
    </div>

    <div
      class="page-wrapper bg-white d-flex justify-content-between align-items-center"
    >
      <div class="total d-flex justify-content-between align-items-center ml-1">
        <span class="flex-fill text-center">合计</span>
        <span class="flex-fill text-center">{{ this.totalcount }}台</span>
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
  </div>
</template>

<script>
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import ListConditions from "./components/ListConditions";
import list from "./components/table";
import FileImport from "./components/import";
import CodeInfo from "./components/CodeInfo";
import { listMixin } from "@/mixins/device.js";

export default {
  name: "material-recept",
  mixins: [table, confirm, listMixin],
  components: { ListConditions, list, FileImport, CodeInfo },
  data() {
    return {
      dialogTitle: "导入自有设备台账表",
      exportFileName: "自有设备台账",
      postURL: "QueryEquipmentStandingBookList", //表格请求接口
      exportURL: "ExportEquipmentStandingBook",
      editRouteName: "enterprise_material2_device_self_edit",
      listQuery: {
        search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        equipment_standing_book_depart: "",
        start_time: "",
        end_time: "",
        page: 0,
        page_size: 20,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  .total {
    width: 332px;
    height: 30px;
    background: #e7e7fc;
  }
}
</style>
