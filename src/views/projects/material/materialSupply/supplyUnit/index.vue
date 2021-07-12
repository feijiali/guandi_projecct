<template>
  <div class="container-all">
    <div class="container-div-s">
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
          <div class="d-inline-block  ml-2">
            <span class="grey2">供应商：</span>
            <el-select v-model="listQuery.supply_unit_ids" placeholder="请选择" @change="refreshData">
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, i) in selectList"
                :key="i"
                :label="item.supply_unit"
                :value="item.supply_unit_id + ''"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block ml-2">
            <n-button
              :btnText="'导出'"
              v-permission="['MaterialManagementSupplyUnit_TJSTC-export']"
              @buttonClick="$utils.handleExport('exportMaterialManagementSupplyUnit', listQuery, '供应商信息')"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
          </div>
          <div class="d-inline-block ml-2">
            <n-button :btnText="'新增'" v-permission="['MaterialManagementSupplyUnit_TJSTC-upload']" @buttonClick="handleUpdate">
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;" height="calc(100% - 80px)"><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}</label>
          </template>
        </el-table-column>
        <el-table-column label="工区" prop="organ"></el-table-column>
        <el-table-column label="供应商" prop="supply_unit"></el-table-column>
        <el-table-column label="增值税率%" prop="supply_unit_tax"></el-table-column>
        <el-table-column label="备注" prop="supply_unit_remark"></el-table-column>
        <el-table-column label="添加日期" prop="supply_unit_submit_time"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
              v-permission="['MaterialManagementSupplyUnit_TJSTC-update']"
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
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  name: "",
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryMaterialManagementSupplyUnit_TJSTC",
      listQuery: {
        supply_unit_start: "",
        supply_unit_end: "",
        supply_unit_ids: "",
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 20,
      },
      MaterialList: [],
      selectList: [],
      dateRange: [],
    };
  },
  mounted() {
    this.getSelectList();
  },

  methods: {
    async getSelectList() {
      let res = await api.QueryMaterialManagementSupplyUnit_TJSTC({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.selectList = res.result;
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.supply_unit_start = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.supply_unit_end = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    handleUpdate(row) {
      if (!row) {
        this.linkTo("project_material1_materialSupply_supplyUnit_handle");
        return;
      }
      this.linkTo("project_material1_materialSupply_supplyUnit_handle", { id: row.supply_unit_id });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-title-abso {
  position: absolute;
  top: 0px;
  height: 80px;
  padding: 20px 10px;
  left: 260px;
  right: 0;
}
</style>
