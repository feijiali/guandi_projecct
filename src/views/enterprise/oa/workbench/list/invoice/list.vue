<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'发票共享'" />
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
            <label class="text-secondary">发票种类：</label>
            <el-select
              v-model="listQuery.invoice_share_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                :label="item"
                :value="index + 1"
                v-for="(item, index) in invoice_share_type_arr"
                :key="index"
              ></el-option>
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
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block">
            <n-button
              v-permission="['OAInvoiceShare-upload']"
              :btnText="'草稿箱'"
              class="mr-2"
              @buttonClick="
                $router.linkTo('enterprise_oa_workbench_draft', {
                  name: 'OAInvoiceShare',
                })
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
              </template>
            </n-button>
            <n-button
              v-permission="['OAInvoiceShare-export']"
              :btnText="'批量导出'"
              @buttonClick="
                handleExportFromSelected(
                  'exportOAInvoiceShareDetail',
                  'invoice_share_id',
                  tableSelectList.length ? {} : listQuery,
                  '发票共享表'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
            <n-button
              class="ml-2"
              :btnText="'发票汇总'"
              @buttonClick="$router.linkTo('enterprise_oa_invoice_total', {})"
            >
            </n-button>
            <n-button
              class="ml-2"
              v-permission="['OAInvoiceShare-delete']"
              :btnText="'批量删除'"
              @buttonClick="
                deleteFun(true, '', 'invoice_share_id', 'delOAInvoiceShare')
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
              </template>
            </n-button>
            <n-button
              v-permission="['OAInvoiceShare-upload']"
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
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="申请日期" prop="invoice_share_sub_time">
          <template slot-scope="scope">
            {{ scope.row.invoice_share_sub_time.split(" ")[0] }}
          </template></el-table-column
        >
        <el-table-column label="所属机构" prop="organ_area"></el-table-column>
        <el-table-column
          label="发票种类"
          prop="invoice_share_type_string"
        ></el-table-column>
        <el-table-column
          label="发票张数(张)"
          prop="invoice_share_num"
        ></el-table-column>
        <el-table-column
          label="发票金额(元)"
          prop="invoice_share_amount"
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['OAInvoiceShare-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'invoice_share_id',
                  'delOAInvoiceShare'
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
      postURL: "queryOAInvoiceShare", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        revise_info_state: 0,
        invoice_share_type: 0, //发票种类
        start_time: 0,
        end_time: 0,
        revise_info_sub_account_id_union: 0,
      },
      invoice_share_type_arr: [
        "餐费",
        "差旅费/滴滴发票",
        "电子产品",
        "家用电器/家具",
        "加油/过路/维修/保养",
        "生活用品/食品",
        "培训费/书籍",
        "装修费用",
        "办公费/网费",
      ],
      dateRange: [],
      keyID: "invoice_share_id",
      getListBool: false,
    };
  },
  activated() {
    if (hasPermissionArr(["OAInvoiceShare-query"])) {
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
      this.$router.linkTo("enterprise_oa_workbench_info", {
        // process_id: row.revise_info_process_id_union,
        t: 4,
        types: "OAInvoiceShare",
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
