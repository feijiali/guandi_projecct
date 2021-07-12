<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'发票汇总'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="rounded-1 bg-white d-flex position-relative px-1 pt-1">
        <div
          class="statistics-box-item d-flex align-items-center"
          style="width: 17%"
          v-for="(item, index) in statisticsArr"
          :key="index"
        >
          <div class="ml-1">
            <span class="font-15">{{ item.name }}</span>
            <div class="d-inline-block">
              <span class="langdon-font text-hover-primary font-22">{{
                totalCounts[item.key] || 0
              }}</span>
              <span class="font-14 font-weight-normal">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top-select-box bg-white" style="border-radius: 10px 10px 0 0">
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
                  'exportOAInvoiceShareSummary',
                  'invoice_share_id',
                  tableSelectList.length ? {} : listQuery,
                  '发票共享汇总表'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 220px)"
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
        <!-- <el-table-column
          label="申请日期"
          prop="invoice_share_sub_time"
        >
        <template slot-scope="scope">
          {{scope.row.invoice_share_sub_time.split(' ')[0]}}
        </template></el-table-column> -->
        <el-table-column label="所属机构" prop="organ_area"></el-table-column>
        <el-table-column
          label="申请人"
          prop="provider_account_name"
        ></el-table-column>
        <el-table-column
          label="共享发票次数"
          prop="share_time"
        ></el-table-column>
        <el-table-column label="发票张数" prop="share_num"></el-table-column>
        <el-table-column
          label="发票总金额(元)"
          prop="share_amount"
        ></el-table-column>
        <el-table-column
          label="获得总积分"
          prop="share_points"
        ></el-table-column>
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
      postURL: "queryOAInvoiceShareSummary", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        revise_info_state: 3, //审批通过
        start_time: 0,
        end_time: 0,
        revise_info_sub_account_id_union: 0,
      },
      statisticsArr: [
        { name: "发票总数", key: "share_num", unit: "张" },
        { name: "发票总金额", key: "share_amount", unit: "元" },
      ],
      totalCounts: {}, //统计
      dateRange: [],
      getListBool: false,
    };
  },
  activated() {
    // 查询统计
    this.queryOAInvoiceShareSummary();
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
    async queryOAInvoiceShareSummary() {
      let res = await api.queryOAInvoiceShareSummary({
        query_type: 1,
        start_time: this.listQuery.start_time,
        end_time: this.listQuery.end_time,
        organ_node: this.listQuery.organ_node,
        revise_info_state: 3,
        revise_info_sub_account_id_union: hasPermissionArr([
          "OAInvoiceShare-query",
        ])
          ? 0
          : Number(this.$store.getters.account_id),
      });
      this.totalCounts = res.result[0] ? res.result[0] : {};
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      // 查询统计
      this.queryOAInvoiceShareSummary();
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
