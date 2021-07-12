<template>
  <div class="w-100 h-100 position-relative">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'设备保养预警'" />
    </div>
    <div class="container-handle" style="height: calc(100% - 106px)">
      <div class="top-select-box">
        <div class="">
          <div class="d-inline-block">
            <label class="text-secondary">{{ subject_label }}：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val, 1)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
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
          <div class="d-inline-block ml-2">
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
          <!-- <br /> -->
          <div class="d-inline-block ml-2">
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
            :btnText="'导出'"
            v-permission="['MaintenanceWarning-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportApproachMaintenanceWarn',
                listQuery,
                '维养管理预警'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table flex-fill"
        :data="tableData"
        @row-click="rowclick"
        height="calc(100% - 110px)"
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
        <el-table-column label="设备类型">
          <span slot-scope="{ row }">{{
            ["", "普通设备", "特种设备"][row.approach_equip_type]
          }}</span>
        </el-table-column>
        <el-table-column label="设备名称-编号">
          <span slot-scope="{ row }"
            >{{ row.approach_name }}-{{ row.approach_no }}</span
          >
        </el-table-column>
        <el-table-column label="保养状态">
          <span
            slot-scope="{ row }"
            class="status-btn"
            :style="{
              backgroundColor:
                row.approach_maintenance_warn_state == 1
                  ? ' #FFF4DE'
                  : '#DEE9FF',
              color:
                row.approach_maintenance_warn_state == 1
                  ? '#FF8F2A'
                  : '#3377FF',
            }"
            >{{
              row.approach_maintenance_warn_state == 1 ? "待保养" : "已保养"
            }}</span
          >
        </el-table-column>
        <el-table-column label="上次保养人">
          <div slot-scope="{ row }">
            <span v-if="row.approach_maintenance_account">{{
              row.approach_maintenance_account
            }}</span>
            <span v-else>- -</span>
          </div>
        </el-table-column>
        <el-table-column label="上次保养时间" width="220">
          <div slot-scope="{ row }">
            <span v-if="row.approach_maintenance_start_date"
              >{{ row.approach_maintenance_start_date }}~{{
                row.approach_maintenance_end_date
              }}</span
            >
            <span v-else>- -</span>
          </div>
        </el-table-column>
        <el-table-column label="累计保养次数">
          <span slot-scope="{ row }"
            >{{ row.approach_maintenance_count }}次</span
          >
        </el-table-column>
        <el-table-column label="累计保养金额(元)" width="160">
          <div slot-scope="{ row }">
            <span>{{
              (
                Number(row.approach_maintenance_money) +
                Number(row.approach_maintenance_other_money)
              ).toFixed(2)
            }}</span>
          </div>
        </el-table-column>
        <el-table-column label="保养预警时间" prop="">
          <span slot-scope="{ row }">{{ row.maintenance_warn_date }}</span>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="{ row }">
            <span
              v-permission="['ApproachMaintenance-upload']"
              @click.stop="handleAdd(row.approach_id, row)"
              class="status-btn"
              :style="{
                backgroundColor:
                  row.approach_maintenance_warn_state == 1
                    ? ' #DEE9FF'
                    : '#E9E8EF',
                color:
                  row.approach_maintenance_warn_state == 1
                    ? '#3377FF'
                    : '#8e95a7',
              }"
              >去保养</span
            >
            <!-- <i
              v-permission="['MaterialStock-delete']"
              @click.stop="deleteFun(false, scope.row, 'material_stock_id', 'DelMaterialStock')"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              ></i> -->
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

export default {
  mixins: [confirm, table],
  data() {
    return {
      postURL: "QueryApproachMaintenanceWarning", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      infoData1: {},
      dateRange: [],
      ApproachName: [],
    };
  },
  computed: {
    ...mapGetters({
      treeData: "subject_list",
      subject_label: "subject_label",
    }),
  },
  async created() {
    this.getList();
    this.QueryApproachName();
  },
  methods: {
    handleAdd(id, row) {
      if (row.approach_maintenance_warn_state == 2) {
        return;
      }
      this.linkTo("enterprise_material_device_operation_management_handle", {
        related_id: id,
      });
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.listQuery.approach_name = "";
      this.QueryApproachName();
      this.refreshData();
    },
    //查询设备名称
    async QueryApproachName() {
      let res = await api.QueryApproachName({
        organ_ids: String(this.listQuery.organ_node),
        approach_equip_type: this.listQuery.approach_equip_type,
      });
      this.ApproachName = res.result;
    },
    changeName() {
      this.QueryApproachName();
      this.refreshData();
    },
    async rowclick(row) {
      this.linkTo("enterprise_material_device_operation_management_info", {
        id: row.approach_id,
        showEdit: true,
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.warn_date_start = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.warn_date_end = this.dateRange ? this.dateRange[1] : "";
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
.warning {
  left: 10px;
  bottom: 10px;
}
</style>
