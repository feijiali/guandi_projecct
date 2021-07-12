<template>
  <div class="container-all">
    <div class="container-div-s">
      <div class="top-select-box">
        <div class="">
          <div class="d-inline-block">
            <label class="text-secondary">{{ subject_label }}：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">设备类型：</label>
            <el-select
              v-model="listQuery.approach_equip_type"
              placeholder="请选择"
              @change="changeName"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="普通设备" :value="1"></el-option>
              <el-option label="特种设备" :value="2"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">维养类型：</label>
            <el-select
              v-model="listQuery.approach_maintenance_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="保养" :value="1"></el-option>
              <el-option label="维修" :value="2"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">设备名称：</label>
            <el-select
              filterable
              v-model="listQuery.approach_name"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in ApproachName"
                :key="item.approach_name"
                :label="item.approach_name"
                :value="item.approach_name"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-1">
            <label class="text-secondary">日期：</label>
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
            :btnText="'新增'"
            v-permission="['ApproachMaintenance-upload']"
            @buttonClick="handleAdd"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            :btnText="'导出'"
            class="ml-2"
            v-permission="['ApproachMaintenance-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportApproachMaintenance',
                listQuery,
                '维养管理'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            :btnText="'预警'"
            class="ml-2"
            v-permission="['MaintenanceWarning-query']"
            @buttonClick="
              linkTo('enterprise_material_device_operation_management_warning')
            "
          >
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 110px)"
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
        <el-table-column label="工程项目" prop="organ_area"></el-table-column>
        <el-table-column label="维养类型">
          <span slot-scope="{ row }">{{
            ["", "保养", "维修"][row.approach_maintenance_type]
          }}</span>
        </el-table-column>
        <el-table-column label="设备类型">
          <span slot-scope="{ row }">{{
            ["", "普通设备", "特种设备"][row.approach_equip_type]
          }}</span>
        </el-table-column>
        <el-table-column
          label="设备名称"
          prop="approach_name"
        ></el-table-column>
        <el-table-column
          label="维养内容"
          :show-overflow-tooltip="true"
          prop="approach_maintenance_content"
        >
        </el-table-column>
        <el-table-column
          label="维养人"
          prop="approach_maintenance_account"
        ></el-table-column>
        <el-table-column
          label="维养金额(元)"
          prop="approach_maintenance_money"
        ></el-table-column>
        <el-table-column label="维养天数">
          <span slot-scope="{ row }">{{ row | getDay }}天</span>
        </el-table-column>
        <el-table-column label="维养时间" width="220">
          <span slot-scope="{ row }"
            >{{ row.approach_maintenance_start_date }}~{{
              row.approach_maintenance_end_date
            }}</span
          >
        </el-table-column>
        <el-table-column label="操作" header-align="center" width="140">
          <template slot-scope="scope">
            <i
              v-permission="['ApproachMaintenance-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="handleAdd(scope.row.approach_maintenance_id)"
            ></i>
            <i
              v-permission="['ApproachMaintenance-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'approach_maintenance_id',
                  'DelApproachMaintenance'
                )
              "
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
import { mapGetters } from "vuex";
import { stateArr, colorArr, bgColorArr } from "@/constants/deviceState";

export default {
  filters: {
    getDay(row) {
      let difference =
        new Date(row.approach_maintenance_end_date) -
        new Date(row.approach_maintenance_start_date);
      return difference / 1000 / 60 / 60 / 24;
    },
  },
  mixins: [table, confirm],
  data() {
    return {
      stateArr: stateArr,
      colorArr: colorArr,
      bgColorArr: bgColorArr,
      postURL: "QueryApproachMaintenanceList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        contract_type: 0, //1拌合站,2钢材,3其它材料
        contract_apply_account_id_un: 0, //提交人
        organ_node: this.$organ_id_en_or_pro(this),
      },
      ApproachName: [],
      dateRange: [],
    };
  },
  computed: {
    ...mapGetters({
      treeData: "subject_list",
      subject_label: "subject_label",
    }),
  },
  activated() {
    this.QueryApproachName();
  },
  methods: {
    handleAdd(id) {
      this.linkTo("enterprise_material_device_operation_management_handle", {
        id: id,
      });
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.listQuery.approach_name = "";
      this.QueryApproachName();
      this.refreshData();
    },
    async rowclick(row) {
      this.linkTo("enterprise_material_device_operation_management_info", {
        id: row.approach_id,
      });
    },
    //查询设备名称
    async QueryApproachName() {
      let res = await api.QueryApproachMaintenanceApproachName({
        organ_node: this.listQuery.organ_node,
        approach_equip_type: this.listQuery.approach_equip_type,
      });
      this.ApproachName = res.result;
    },
    changeName() {
      this.QueryApproachName();
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.maintenance_date_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.maintenance_date_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.more:hover {
  color: $main;
}
.pay-box {
  height: 40px;
  line-height: 40px;
  &:hover {
    background: $main;
    color: white;
  }
}
</style>
