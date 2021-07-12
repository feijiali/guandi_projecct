<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'合同付款明细'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
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
              <el-option label="已撤销" :value="5"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['ProjectReportEngineeringPay-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'ProjectReportEngineeringPay',
                contract_id_un: contract_id_un,
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ProjectReportEngineeringPay-export']"
            class="ml-2"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'ExportProjectReportEngineeringPay',
                'engineering_pay_id',
                tableSelectList.length ? {} : listQuery,
                '计量合同付款详情表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ProjectReportEngineeringPay-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_engineering_metering_payment', {
                contract_id: $route.query.contract_id_un,
                t: 2,
                from: 1,
              })
            "
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
        ref="table"
        style="width: 100%"
        height="calc(100% - 85px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="申请日期"
          prop="contract_approval_time"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.contract_approval_sub_time.split(" ")[0]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="合同名称"
          align="center"
          prop="contract_approval_name"
        >
        </el-table-column>
        <el-table-column
          label="收款单位"
          align="center"
          prop="engineering_pay_receive_unit"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="付款单编号"
          prop="engineering_pay_no"
        ></el-table-column>
        <el-table-column
          align="center"
          label="合同分类"
          prop="contract_approval_type_str"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="经办人"
          prop="contract_approval_due_person"
        >
        </el-table-column>
        <el-table-column align="center" label="审批状态" width="100">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :style="{
                backgroundColor:
                  GLOBAL.backgroundColorArr[scope.row.revise_info_state],
                color: GLOBAL.colorArr[scope.row.revise_info_state],
              }"
              >{{ GLOBAL.reviseStateArr[scope.row.revise_info_state] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="结算金额(元)"
          prop="engineering_pay_project_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="支付金额(元)"
          prop="engineering_pay_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="本期实付金额(元)"
          prop="engineering_pay_total_money"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i
              v-permission="['ProjectReportEngineeringPay-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'engineering_pay_id',
                  'DelProjectReportEngineeringPay'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2"
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryProjectReportEngineeringPayList",
      listQuery: {
        page: 0,
        page_size: 20,
        engineering_pay_start_date: "",
        engineering_pay_end_date: "",
        engineering_pay_contract_id_un: parseInt(
          this.$route.query.contract_id_un
        ),
        revise_info_sub_account_id_union: 0,
      },
      dateRange: [], //日期
      teamTypeArr: [
        "A",
        "B1",
        "B2",
        "B3",
        "C1",
        "C2",
        "C3",
        "D1",
        "D2",
        "D3",
        "E1",
        "E2",
        "E3",
        "E4",
      ],
      keyID: "engineering_pay_id",
      getListBool: false,
      contract_id_un: parseInt(this.$route.query.contract_id_un), //合同ID
    };
  },
  activated() {
    this.listQuery.engineering_pay_contract_id_un = parseInt(
      this.$route.query.contract_id_un
    );
    if (hasPermissionArr(["OAContractApproval-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.revise_info_sub_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.revise_info_sub_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
    this.getList();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    rowclick(row) {
      this.$router.linkTo("enterprise_engineering_metering_measurement_info", {
        engineering_pay_id: row.revise_info_accessory_id,
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.engineering_pay_start_date = this.dateRange[0];
        this.listQuery.engineering_pay_end_date = this.dateRange[1];
      } else {
        this.listQuery.engineering_pay_start_date = "";
        this.listQuery.engineering_pay_end_date = "";
      }
      this.currentPage = 1;
      this.getList();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }

  .label-l {
    width: 110px;
  }
}
.grey-button {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 0 50px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  color: #fff;
  background: #d9dadc;
}
</style>
