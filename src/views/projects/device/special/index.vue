<template>
  <div class="container-all">
    <Detail ref="detail" :infoData="infoData" />
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">当前状态：</span>
            <el-select
              v-model="listQuery.ca_status"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="逾期预警" :value="2"></el-option>
              <el-option label="证书逾期" :value="3"></el-option>
            </el-select>
          </div>
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
          <n-search
            ref="serch"
            class="ml-2 mr-2 search-box"
            :isInput="true"
            :placeholder="'搜索设备名称'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['EquipmentImportExport_TJSTC-update']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportEquipmentSpecDevice',
                listQuery,
                '特种设备信息'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['EquipmentDevice_TJSTC-update']"
            :btnText="'新增'"
            class="ml-2"
            @buttonClick="handleUpdate"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        @row-click="lookInfo"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          label="设备编号"
          prop="device_serial"
        ></el-table-column>
        <el-table-column label="设备名称" prop="device_name"></el-table-column>
        <el-table-column
          label="厂家"
          prop="device_manufacturer"
        ></el-table-column>
        <el-table-column label="设备型号" prop="device_model"></el-table-column>
        <el-table-column
          label="进场时间"
          prop="device_in_date"
        ></el-table-column>
        <el-table-column
          label="设备标定时间"
          prop="device_calibration_date"
        ></el-table-column>
        <el-table-column
          label="证书到期时间"
          prop="device_expired_date"
        ></el-table-column>
        <el-table-column label="操作人" prop="daily_inspection_account_name">
          <template slot-scope="scope">
            <span
              class="d-inline-block"
              v-for="(item, index) in scope.row.operator_list"
              :key="index"
              >{{
                item.account_name +
                (index != scope.row.operator_list.length - 1 ? "，" : "")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="general_device_state">
          <template slot-scope="scope">
            <span
              :class="[
                scope.row.spec_device_state == '证书逾期预警'
                  ? 'orange'
                  : scope.row.spec_device_state == '正常'
                  ? ''
                  : 'pink',
              ]"
              >{{
                scope.row.spec_device_state == "证书逾期预警"
                  ? "逾期预警"
                  : scope.row.spec_device_state
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="是否出场" prop="daily_inspection_account_name">
          <template slot-scope="scope">
            <span
              class="d-inline-block"
              v-if="
                scope.row.device_out_date &&
                $utils.timeDiff(
                  scope.row.device_out_date,
                  $utils.getCurrentTime(),
                  false
                )
              "
              >已出场</span
            >
            <span class="d-inline-block text-secondary-2" v-else>未出场</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['EquipmentDevice_TJSTC-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['EquipmentDevice_TJSTC-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'device_id', 'delEquipmentDevice')
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
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
import Detail from "./components/Detail";
export default {
  mixins: [table, confirm],
  components: {
    Detail,
  },
  data() {
    return {
      postURL: "queryEquipmentDevice",
      dateRange: [], //日期范围
      deleData: {},
      listQuery: {
        page: 0,
        page_size: 20,
        device_type: 2, //普通设备
        device_date_start: "",
        device_date_end: "",
        ca_status: 0, //检养状态：0：全部 1：正常 2：逾期
        device_name: "",
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      infoData: {}, //详情
    };
  },
  methods: {
    // 搜索关键词
    searchFun(val) {
      this.listQuery.device_name = val;
      this.refreshData();
    },
    //查看营业执照图片详情
    lookInfo(row) {
      this.infoData = row;
      this.$refs.detail.show();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.device_date_start = this.dateRange
          ? this.dateRange[0]
          : "";
        this.listQuery.device_date_end = this.dateRange
          ? this.dateRange[1]
          : "";
      } else {
        this.listQuery.device_date_start = "";
        this.listQuery.device_date_end = "";
      }
      this.currentPage = 1;
      this.getList();
    },
    // 编辑
    handleUpdate(row) {
      this.$router.linkTo(
        "project_device1_common_handle",
        row
          ? {
              id: row.device_id,
              device_type: 2,
            }
          : {
              device_type: 2,
            }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
