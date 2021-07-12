<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'用款申请'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">所属机构：</span>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">日期：</span>
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
            <label class="text-secondary">用款类型：</label>
            <el-select
              v-model="listQuery.money_approval_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="付款申请" :value="1"></el-option>
              <el-option label="资金共享" :value="2"></el-option>
              <el-option label="资金计划" :value="3"></el-option>
            </el-select>
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
              <!-- <el-option label="审批通过已付款" :value="6"></el-option>
              <el-option label="审批通过未付款" :value="7"></el-option> -->
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['OAMoneyApproval-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'OAMoneyApproval',
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OAMoneyApproval-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'money_approval_id', 'delOAMoneyApproval')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            v-permission="['OAMoneyApproval-export']"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'exportOAMoneyApprovalWithPay',
                'money_approval_id',
                tableSelectList.length ? {} : listQuery,
                '用款申请表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OAMoneyApproval-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_apply', {
                t: $route.query.t,
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
        height="calc(100% - 80px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="申请日期" prop="money_approval_sub_time">
          <template slot-scope="scope">
            {{ scope.row.money_approval_sub_time.split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="所属机构" prop="organ_area"></el-table-column>
        <el-table-column label="用款类型" prop="purchase_approval_name">
          <template slot-scope="scope">
            {{
              ["付款申请", "资金共享", "资金计划"][
                scope.row.money_approval_type - 1
              ]
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="用款事由"
          prop="money_approval_cause"
        ></el-table-column>
        <el-table-column
          label="负责人"
          prop="money_approval_principal"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="sub_account_name"
        ></el-table-column>
        <el-table-column label="审批状态" width="200">
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
        <!-- <el-table-column label="付款状态" width="200">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :class="[scope.row.money_approval_state == 3 ? 'main' : 'pink2']"
              >{{
                ["", "", "未付款", "已付款"][
                  scope.row.revise_info_state == 5
                    ? 0
                    : scope.row.money_approval_state
                ]
              }}</span
            >
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['OAMoneyApproval-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'money_approval_id',
                  'delOAMoneyApproval'
                )
              "
              class="
                iconfont
                btn-btn_list_trash
                trash-icon-btn
                ml-2
                table-trash-icon
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryOAMoneyApprovalList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        oa_money_approval_belong: 0, //模板类型
        money_approval_type: 0, //申请类型 1：付款 2：资金共享 3：资金计划
        money_approval_state: 0, //是否付款
        revise_info_state: 0,
        start_time: 0,
        end_time: 0,
        revise_info_sub_account_id_union: 0,
      },
      revise_info_state: 0,
      contract_id: Number(this.$route.query.contract_id),
      dateRange: [],
      infoData: {},
      editId: 0,
      keyID: "money_approval_id",
      getListBool: false,
    };
  },
  activated() {
    this.contract_id = Number(this.$route.query.contract_id);
    if (hasPermissionArr(["OAMoneyApproval-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.revise_info_sub_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.revise_info_sub_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
    if (this.contract_id) {
      //说明查询关联了合同的用款申请
      this.listQuery.money_approval_union_id = this.contract_id;
      this.listQuery.money_approval_union_module = "OAContractApproval";
    } else {
      //说明查询关联了合同的用款申请
      this.listQuery.money_approval_union_id = 0;
      this.listQuery.money_approval_union_module = "";
    }
    this.getList();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 批量导出
    handleExport(name) {
      //批量删除
      let money_approval_ids = [];
      if (this.selectionArr.length > 0) {
        this.selectionArr.forEach((ele) => {
          money_approval_ids.push(ele.money_approval_id);
        });
        this.confirm("", "", "是否确认导出？").then(() => {
          this.$utils.handleExport(
            name,
            { money_approval_ids: money_approval_ids.join(",") },
            "用款申请表"
          );
        });
      } else {
        this.$utils.handleExport(name, this.listQuery, "用款申请表");
      }
    },
    // 选择状态
    chooseStausFun(val) {
      if (val == 6 || val == 7) {
        //表示是筛选已付款/未付款
        this.listQuery.money_approval_state = val == 6 ? 3 : 2;
        this.listQuery.revise_info_state = 3;
      } else {
        this.listQuery.revise_info_state = val;
        this.listQuery.money_approval_state = 0;
      }
      this.refreshData();
    },
    rowclick(row) {
      this.$router.linkTo("enterprise_oa_workbench_info", {
        // process_id: row.revise_info_process_id_union,
        t: 4,
        types: "OAMoneyApproval",
        id: row.revise_info_accessory_id,
        // info_id: row.revise_info_id
      });
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = parseInt(this.dateRange[0]);
        this.listQuery.end_time = parseInt(this.dateRange[1]);
      } else {
        this.listQuery.start_time = 0;
        this.listQuery.end_time = 0;
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
