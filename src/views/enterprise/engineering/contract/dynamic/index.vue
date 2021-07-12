<template>
  <div class="w-100 h-100 clear">
    <div class="content-info-box h-100 position-relative d-flex">
      <div
        v-if="!isShow"
        class="content-info-box-left bg-white rounded-1 h-100position-relative d-flex flex-column top-select-box"
        style="display: block !important; border-radius: 10px !important"
      >
        <div class="text-secondary mt-1 font-14 px-2">
          <img
            class="tip-icon vertical-middle mr-1"
            src="@/assets/images/icon_personal_tips.png"
          />温馨提示：单击选中树状结构，右侧展示对应项目合同动态管理
        </div>
        <div class="person-tree-box position-absolute pb-2 mt-1">
          <n-scroll>
            <n-tree
              class="pr-2 mt-2"
              style="padding-bottom: 30px"
              :highlight-current="false"
              :treeData="treeData"
              @leftClick="leftClick"
              ref="treeNode"
              :expandAll="true"
            ></n-tree>
          </n-scroll>
        </div>
      </div>
      <div class="content-info-box-right rounded-1 h-100 bg-white flex-fill">
        <div class="top-select-box mt-1 bg-white" style="padding: 10px">
          <div>
            <n-search
              ref="serch"
              class="search-box"
              :isInput="true"
              :placeholder="'请输入合同名称/班组名称/供应商名称/班组负责人搜索'"
              @searchFun="searchFun"
            ></n-search>
            <div class="d-inline-block ml-2">
              <label class="text-secondary">月份：</label>
              <el-date-picker
                @change="chooseMonth"
                class="el-date-editor-m"
                :clearable="false"
                :editable="false"
                v-model="query_month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
              ></el-date-picker>
            </div>
          </div>
          <div>
            <n-button
              v-permission="['OAContractApprovalDynamic-export']"
              class="ml-2"
              :btnText="'导出'"
              @buttonClick="
                $utils.handleExport(
                  'ExportProjectReportInfo',
                  listQuery,
                  '合同动态表'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
        <el-table
          class="cursor-p-table"
          :data="tableDatas"
          border
          :summary-method="getSummaries"
          show-summary
          ref="table"
          style="width: 100%"
          height="calc(100% - 145px)"
          ><template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column
            prop="contract_approval_type_str"
            align="left"
            label="序号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="合同编号"
            prop="contract_approval_number"
          >
          </el-table-column>
          <el-table-column
            label="合同名称"
            align="center"
            prop="contract_approval_name"
          >
          </el-table-column>
          <el-table-column
            label="班组（供应商）名称"
            align="center"
            prop="contract_approval_supplier"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="contract_approval_supplier_mobile"
            label="班组负责人/联系电话"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="施工内容/到场人数"
            prop="engineering_result_nowmonth_money"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="合同总价（元）"
            prop="contract_approval_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="累计计量金额（元）"
            prop="report_total_money"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="扣减金额（元）"
            prop="deduction_total_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="扣除支付比例"
            prop="deduction_rate"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="质保金（元）"
            prop="warranty_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="应付计量金额（元）"
            prop="report_need_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="本月支付（元）"
            prop="engineering_pay_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="已支付（元）"
            prop="payed_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="应付未付（元）"
            prop="need_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="最终结算金额（元）"
            prop="report_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="欠款（元）"
            prop="arrears_money"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="备注"
            prop="contract_approval_advice"
          >
          </el-table-column>
        </el-table>
        <p class="main mt-1 pl-1">
          统计说明：按月份统计，从上月的25日到本月的25日为一个统计期数
        </p>
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
  </div>
</template>
<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import table from "@/mixins/table";
export default {
  mixins: [confirm, table],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "QueryProjectReportInfo", //表格请求接口
      treeData: [], //人员组织架构数据
      project1: [], //自营项目
      project2: [], //合作项目
      tableDatas: [],
      listQuery: {
        page: 0,
        page_size: 20,
        search: "",
        start_time: this.getPreMonthFun(
          this.$utils.getCurrentTime("", "", "month")
        ),
        end_time: this.$utils.getCurrentTime("", "", "month") + "-25",
      },
      query_month: this.$utils.getCurrentTime("", "", "month"),
      totalArrB: {}, //合同分类小计-B
      totalArrC: {}, //合同分类小计-C
      totalArrD: {}, //合同分类小计-D
      totalArrE: {}, //合同分类小计-E

      getListBool: false,
    };
  },
  watch: {
    tableData() {
      // if (this.tableData[0]) {
      let tableDataB, tableDataC, tableDataD, tableDataE;
      tableDataB = this.tableData.filter((item) =>
        item.contract_approval_type_str.includes("B")
      );
      tableDataB = tableDataB.length ? tableDataB : [];
      tableDataC = this.tableData.filter((item) =>
        item.contract_approval_type_str.includes("C")
      );
      tableDataC = tableDataC.length ? tableDataC : [];
      tableDataD = this.tableData.filter((item) =>
        item.contract_approval_type_str.includes("D")
      );
      tableDataD = tableDataD.length ? tableDataD : [];
      tableDataE = this.tableData.filter((item) =>
        item.contract_approval_type_str.includes("E")
      );
      tableDataE = tableDataE.length ? tableDataE : [];
      let arr = [];
      let arrB = [{ contract_approval_type_str: "B类合同" }, ...tableDataB],
        arrC = [{ contract_approval_type_str: "C类合同" }, ...tableDataC],
        arrD = [{ contract_approval_type_str: "D类合同" }, ...tableDataD],
        arrE = [{ contract_approval_type_str: "E类合同" }, ...tableDataE];
      arr = [
        ...arrB,
        this.totalArrB,
        ...arrC,
        this.totalArrC,
        ...arrD,
        this.totalArrD,
        ...arrE,
        this.totalArrE,
      ];
      this.tableDatas = arr;
      // } else {
      // this.tableDatas = [];
      // }
    },
    deep: true,
  },
  async activated() {
    await this.getOrganProjectData();
    await this.getTreeData();
  },
  methods: {
    async QueryProjectReportInfoTotal(type) {
      let { result } = await api.QueryProjectReportInfoTotal({
        ...this.listQuery,
        type_search: type,
      });
      this["totalArr" + type] = {
        ...result[0],
        contract_approval_type_str: "小计",
      };
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.QueryOrganProjectTree({
        organ_type_node: "30",
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.project1 = result.filter((item) => item.node.project_classify == 1);
      this.project2 = result.filter((item) => item.node.project_classify == 2);
    },
    // 获取组织架构
    async getTreeData() {
      let { result } = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
        noOrganNodes: true,
      });

      let d = result[0];
      let arr = [];
      arr[0] = {
        tag: 1,
        leaves: [
          {
            tag: 0,
            leaves: this.project2,
            node: {
              organ: "合作项目",
              organ_id: 0,
            },
          },
          {
            tag: 2,
            leaves: this.project1,
            node: {
              organ: "自营项目",
              organ_id: 2,
            },
          },
        ],
        node: {
          organ: d.node.organ,
          organ_id: d.node.organ_id,
        },
      };
      this.treeData = arr;
      if (this.project2[0]) {
      }
      if (!this.isShow) {
        this.$nextTick(() => {
          this.$refs.treeNode.defaultExpandedKeys = [
            this.project2[0] ? this.project2[0].tag : this.project1[0].tag,
          ];
          this.$refs.treeNode.$refs.tree.setCurrentKey(
            this.project2[0] ? this.project2[0].tag : this.project1[0].tag
          );
        });
      }

      this.listQuery.organ_id = this.project2[0]
        ? this.project2[0].tag
        : this.project1[0].tag;
      // 查询合同动态管理分类小计
      await this.QueryProjectReportInfoTotal("B");
      await this.QueryProjectReportInfoTotal("C");
      await this.QueryProjectReportInfoTotal("D");
      await this.QueryProjectReportInfoTotal("E");
      await this.getList();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if ((index > 5 && index < 12) || (index > 12 && index < 17)) {
          const values = data.filter(
            (item, ind) => item.contract_approval_type_str == "小计"
          );
          const values2 = values.map((item) =>
            item[column.property] ? Number(item[column.property]) : 0
          );
          if (!values2.every((value) => isNaN(value))) {
            sums[index] = values2.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index];
          }
        }
      });
      return sums;
    },
    // 选择月份
    chooseMonth(val) {
      this.listQuery.start_time = this.getPreMonthFun(val);
      this.listQuery.end_time = val + "-25";
      this.refreshData();
    },
    getPreMonthFun(val) {
      let month = Number(val.split("-")[1]);
      let premonth = month == 1 ? 12 : month - 1;
      let year = val.split("-")[0];
      return (
        (month == 1 ? year - 1 : year) +
        "-" +
        (premonth < 10 ? "0" + premonth : premonth) +
        "-25"
      );
    },
    //单击左侧组织架构
    leftClick(obj) {
      if (obj.item.node.organ_type == 30) {
        this.$refs.serch.searchObj = "";
        this.listQuery.search = "";
        this.listQuery.organ_id = obj.item.tag;
        this.refreshData();
      } else {
        this.tableDatas = [];
      }
    },
    async refreshData() {
      this.currentPage = 1;
      // 查询合同动态管理分类小计
      await this.QueryProjectReportInfoTotal("B");
      await this.QueryProjectReportInfoTotal("C");
      await this.QueryProjectReportInfoTotal("D");
      await this.QueryProjectReportInfoTotal("E");
      this.getList();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
    },
  },
};
</script>
<style scoped lang="scss">
table.table-origin {
  td {
    padding: 2px 10px;
    height: 35px;
  }
}
.top-select-box {
  border-radius: 10px 10px 0 0 !important;
  padding: 0;
}

.person-tree-box {
  top: 30px;
  right: 0;
  left: 10px;
  bottom: 0;
}
.content-info-box {
  .content-info-box-left {
    width: 300px;
  }

  .content-info-box-right {
    margin-left: 10px;
  }
}
</style>
