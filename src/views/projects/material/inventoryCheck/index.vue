<template>
  <div class="container-all">
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">日期：</span>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div>
          <n-button
            btnText="导入"
            @buttonClick="uploadfile"
            v-permission="['MaterialManagementInventoryCheck_TJSTC-import']"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['MaterialManagementInventoryCheck_TJSTC-export']"
            :btnText="'导出'"
            class="ml-2"
            @buttonClick="
              $utils.handleExport(
                'exportMaterialManagementInventoryCheck',
                listQuery,
                '库存统计'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'新增'"
            v-permission="['MaterialManagementInventoryCheck_TJSTC-upload']"
            @buttonClick="handleUpdate"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
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
        <el-table-column label="工区" prop="organ"></el-table-column>
        <el-table-column
          label="盘点时间"
          prop="inventory_check_time"
        ></el-table-column>
        <el-table-column
          label="盘点主题"
          prop="inventory_check_title"
        ></el-table-column>
        <el-table-column
          label="施工队"
          prop="inventory_check_construction_team"
        ></el-table-column>
        <el-table-column
          label="明细条目"
          prop="inventory_check_quantity"
        ></el-table-column>
        <el-table-column
          label="料场主管"
          prop="inventory_check_supervisor"
        ></el-table-column>
        <el-table-column
          label="参加盘点人员"
          prop="inventory_check_participants"
        ></el-table-column>
        <el-table-column
          label="备注"
          prop="inventory_check_remark"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['MaterialManagementInventoryCheck_TJSTC-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
            ></i>
          </template>
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
export default {
  name: "",
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryMaterialManagementInventoryCheck",
      listQuery: {
        inventory_info_start: "",
        inventory_info_end: "",
        organ_node: this.$organ_id_en_or_pro(this),
        page_size: 20,
      },
      dateRange: [],
    };
  },
  methods: {
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.inventory_info_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.inventory_info_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
    rowclick(row) {
      this.linkTo("project_material1_inventoryCheck_info", {
        id: row.inventory_check_id,
      });
    },
    uploadfile() {
      this.linkTo("project_material1_inventoryCheck_handle", { type: "file" });
    },
    handleUpdate(row) {
      if (!row) {
        this.linkTo("project_material1_inventoryCheck_handle");
        return;
      }
      this.linkTo("project_material1_inventoryCheck_handle", {
        id: row.inventory_check_id,
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss">
.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
</style>
