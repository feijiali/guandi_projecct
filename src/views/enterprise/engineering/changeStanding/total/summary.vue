<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'变更情况统计'" />
    </div>
    <div
      class="rounded-1 flex-fill clear content-info-box position-relative d-flex"
    >
      <div
        v-if="!isShow"
        class="content-info-box-left bg-white rounded-1 h-100position-relative d-flex flex-column top-select-box"
        style="display: block !important; border-radius: 10px !important"
      >
        <div class="text-secondary mt-1 font-14 px-2">
          <img
            class="tip-icon vertical-middle mr-1"
            src="@/assets/images/icon_personal_tips.png"
          />温馨提示：单击选中树状结构，右侧展示对应项目变更统计
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
      <div
        class="content-info-box-right rounded-1 h-100 bg-white p-1 flex-fill"
      >
        <div class="top-select-box mt-1 bg-white">
          <div>
            <div class="d-inline-block">
              <n-search
                ref="serch"
                class="search-box"
                :isInput="true"
                :placeholder="'请输入变更上报名称搜索'"
                @searchFun="searchFun"
              ></n-search>
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
          </div>
          <div>
            <n-button
              v-permission="['ChangeParameterParameterSummary-export']"
              class="ml-2"
              :btnText="'导出'"
              @buttonClick="
                $utils.handleExport(
                  'ExportChangeParameterParameterSummaryTotal',
                  listQuery,
                  organ_name + '变更情况统计表'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
            <n-button class="ml-2" :btnText="'打印'" @buttonClick="printFuns()">
            </n-button>
          </div>
        </div>
        <div
          class="p-inf-main text-center w-100 mt-2"
          style="height: calc(100% - 110px)"
        >
          <n-scroll>
            <template v-if="tableData.length">
              <div id="print">
                <h2 class="text-center font-22 font-weight-bold mb-1">
                  {{ organ_name }}变更情况统计表
                </h2>
                <p class="text-left mb-1">单位：元</p>
                <table class="table-origin">
                  <tr>
                    <td>变更类型</td>
                    <td>序号</td>
                    <td style="width: 130px">变更上报名称</td>
                    <td style="width: 110px">上报时间</td>
                    <td>变更增减金额</td>
                    <td>项目上报金额</td>
                    <td>预计可批复金额</td>
                    <td>监理批复金额</td>
                    <td>业主项目公司批复金额</td>
                    <td>上级单位批复金额</td>
                    <td>目前审批情况</td>
                    <td>变更依据</td>
                    <td>主要变更内容</td>
                    <td>暂定计量金额</td>
                    <td style="width: 80px">备注</td>
                  </tr>
                  <template v-for="(item, index) in ['A', 'B', 'C']">
                    <tr
                      v-for="(itm, ind) in tableDatas[item]"
                      :key="index + item + ind"
                    >
                      <td
                        v-if="ind == 0"
                        :rowspan="tableDatas[item].length"
                        style="width: 100px"
                      >
                        {{
                          [
                            "(三)未上报",
                            "(二)已上报未批复",
                            "(一)已上报已批复",
                          ][itm.parameter_info_type - 1]
                        }}
                      </td>
                      <td :colspan="itm.isTotal ? 2 : 1">
                        <span v-if="!itm.isTotal">{{ ind + 1 }}</span>
                        <span v-else>小计</span>
                      </td>
                      <td style="width: 130px" v-if="!itm.isTotal">
                        {{ itm.parameter_info_name }}
                      </td>
                      <td>
                        {{
                          itm.parameter_info_time
                            ? itm.parameter_info_time.split(" ")[0]
                            : ""
                        }}
                      </td>
                      <td>
                        <span v-if="itm.parameter_money">
                          {{ itm.parameter_money }}
                        </span>
                      </td>
                      <td>{{ itm.parameter_info_money }}</td>
                      <td>{{ itm.parameter_info_estimate_money }}</td>
                      <td>{{ itm.parameter_info_supervisor_money }}</td>
                      <td>{{ itm.parameter_info_owner_money }}</td>
                      <td>{{ itm.parameter_info_superior_money }}</td>
                      <td>
                        {{
                          ["未上报", "已上报未批复", "已上报已批复"][
                            itm.parameter_info_type - 1
                          ]
                        }}
                      </td>
                      <td>{{ itm.parameter_info_basis }}</td>
                      <td>{{ itm.parameter_info_content }}</td>
                      <td>{{ itm.parameter_info_report_money }}</td>
                      <td style="width: 80px">
                        {{ itm.parameter_info_remark }}
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </template>
            <template v-else>
              <n-nodata class="nodata" style="padding-top: 20%"></n-nodata>
            </template>
          </n-scroll>
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
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import table from "@/mixins/table";
import print from "@/plugins/print/printarea";
export default {
  mixins: [confirm, table],
  data() {
    return {
      printObj: {
        id: "#print",
        popTitle: "变更情况统计", //打印标题
      },
      isShow: this.$route.meta.isProject,
      tableDatas: [],
      postURL: "QueryChangeParameterParameterSummaryTotal", //表格请求接口
      treeData: [], //人员组织架构数据
      project1: [], //自营项目
      project2: [], //合作项目
      dateRange: [],
      listQuery: {
        page: 0,
        page_size: 20,
        parameter_info_name: "",
        organ_node: null,
        parameter_info_start_time: "",
        parameter_info_end_time: "",
      },
      organ_name: "", //左侧选中的工程项目名称
      getListBool: false,
      tableDataA: [], //已上报已批复
      tableDataB: [], //已上报未批复
      tableDataC: [], //未上报
      totalArr1: {}, //未上报
      totalArr2: {}, //已上报未批复
      totalArr3: {}, //已上报已批复
    };
  },
  watch: {
    tableData() {
      // 已上报已批复
      this.tableDataA = this.tableData.filter(
        (item) => item.parameter_info_type == 3
      );
      this.tableDataA = this.tableDataA.length
        ? [...this.tableDataA, this.totalArr3]
        : [{ parameter_info_type: 3 }, this.totalArr3];
      // 已上报未批复
      this.tableDataB = this.tableData.filter(
        (item) => item.parameter_info_type == 2
      );
      this.tableDataB = this.tableDataB.length
        ? [...this.tableDataB, this.totalArr2]
        : [{ parameter_info_type: 2 }, this.totalArr2];
      // 未上报
      this.tableDataC = this.tableData.filter(
        (item) => item.parameter_info_type == 1
      );
      this.tableDataC = this.tableDataC.length
        ? [...this.tableDataC, this.totalArr1]
        : [{ parameter_info_type: 1 }, this.totalArr1];
      this.tableDatas = {
        A: this.tableDataA,
        B: this.tableDataB,
        C: this.tableDataC,
      };
    },
    deep: true,
  },
  async mounted() {
    await this.getOrganProjectData();
    await this.getTreeData();
    // 查询计量期数
  },
  methods: {
    printFuns() {
      //点击打印
      new print({
        ids: "print", // * 局部打印必传入id
        standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
        extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
        extraCss: "", // 额外的css连接，多个逗号分开
        popTitle: "", // title的标题
        endCallback() {},
      });
    },
    async QueryChangeParameterParameterSummaryTotalSum(type) {
      let { result } = await api.QueryChangeParameterParameterSummaryTotalSum({
        ...this.listQuery,
        parameter_info_type: type,
      });
      this["totalArr" + type] = {
        ...result[0],
        isTotal: true,
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

      this.listQuery.organ_node = this.project2[0]
        ? this.project2[0].tag
        : this.project1[0].tag;
      this.organ_name = this.project2[0]
        ? this.project2[0].node.organ
        : this.project1[0].node.organ;
      // 变更情况统计小计
      await this.QueryChangeParameterParameterSummaryTotalSum(1);
      await this.QueryChangeParameterParameterSummaryTotalSum(2);
      await this.QueryChangeParameterParameterSummaryTotalSum(3);
      await this.getList();
    },
    //单击左侧组织架构
    leftClick(obj) {
      if (obj.item.node.organ_type == 30) {
        this.$refs.serch.searchObj = "";
        this.listQuery.parameter_info_name = "";
        this.listQuery.organ_node = obj.item.tag;
        this.refreshData();
        this.organ_name = obj.item.node.organ;
      }
    },
    // 筛选条件后重新请求数据
    async refreshData() {
      if (this.dateRange) {
        this.listQuery.parameter_info_start_time = this.dateRange[0];
        this.listQuery.parameter_info_end_time = this.dateRange[1];
      } else {
        this.listQuery.parameter_info_start_time = "";
        this.listQuery.parameter_info_end_time = "";
      }
      this.currentPage = 1;
      await this.QueryChangeParameterParameterSummaryTotalSum(1);
      await this.QueryChangeParameterParameterSummaryTotalSum(2);
      await this.QueryChangeParameterParameterSummaryTotalSum(3);
      this.getList();
    },
    searchFun(val) {
      this.listQuery.parameter_info_name = val;
      this.refreshData();
    },
  },
};
</script>
<style scoped lang="scss">
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
