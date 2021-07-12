<template>
  <div class="container-all">
    <div class="container-div"
         style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-flex align-items-center">
            <div class="d-inline-block">
              <n-search ref="serch"
                        :isInput="true"
                        :placeholder="'请输入工程名称搜索'"
                        @searchFun="searchFun"></n-search>
            </div>
            <div class="d-inline-block ml-2">
              <label class="text-secondary">月份：</label>
              <el-date-picker @change="refresh"
                              class="el-date-editor-m"
                              :clearable="false"
                              :editable="false"
                              v-model="listQuery.search_time"
                              format="yyyy-MM"
                              value-format="yyyy-MM"
                              type="month"
                              placeholder="请选择"></el-date-picker>
            </div>
          </div>
        </div>
        <div>
          <!-- colorBtn="orange" -->
          <n-button class="ml-2"
                    :btnText="'批量删除'"
                    v-show="role == 2 || role == 3"
                    @buttonClick="
              deleteFun(
                true,
                '',
                'project_linkage_id',
                'delProjectInfoProjectLinkage',
                '',
                '',
                delSet()
              )
            ">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash mr-1"></i>
            </template>
          </n-button>
          <!-- v-show="ordinary"     -->
          <n-button class="ml-2"
                    :btnText="'新增'"
                    v-show="role == 2"
                    @buttonClick="
              $router.linkTo('enterprise_engineering_monthReport_handle')
            ">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <!-- v-show="!ordinary" -->
          <n-button v-show="role != 2"
                    class="ml-2"
                    :btnText="'规则设置'"
                    @buttonClick="
              $router.linkTo('enterprise_engineering_monthReport_addProject', {
                monthReport_month: $utils.formatDate(listQuery.search_time),
              })
            ">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>

          <n-button v-show="role == 3"
                    class="ml-2"
                    :btnText="'发布'"
                    @buttonClick="releaseBtn(null, 1)">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button :btnText="'导出'"
                    v-show="role != 2"
                    class="ml-2"
                    @buttonClick="exportPro">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <!-- :data="leader?tableData.filter(item => item.linkage_project_state == 1):tableData" -->
      <el-table v-if="isSome"
                :header-cell-style="getRowClass"
                :data="tableData"
                class="cursor-p-table"
                style="width: 100%"
                height="calc(100% - 90px)"
                @selection-change="handleSelectionChange"
                @row-click="rowClick"><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="序号"
                         align="center">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="审批状态"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            <span :style="colorStateArr[scope.row.linkage_approve_total_state]">
              {{ linkageStateArr[scope.row.linkage_approve_total_state] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="工程名称"
                         prop="linkage_project_name"
                         align="center"
                         min-width="120px"></el-table-column>
        <el-table-column v-for="(label, index) in rule_columns.filter((item) => item.checked)"
                         :key="`${label.name}--${index}`"
                         :label="label.name"
                         align="center">
          <template v-for="(rule, i) in rule_column_info[label.num].filter(
              (item) => item.checked
            )">
            <el-table-column v-if="rule.children"
                             :key="`${rule.name}-${i}`"
                             :label="rule.name"
                             align="center">
              <el-table-column v-for="(ruleSub, j) in rule.children.filter(
                  (item) => item.checked
                )"
                               :label="ruleSub.name"
                               :min-width="ruleSub.minWidth"
                               :key="`${ruleSub.name}-${i}-${j}`"
                               :prop="ruleSub.key"
                               width="200"
                               align="center">
                <template slot-scope="scope">
                  <span v-if="ruleSub.isTemp">
                    {{
                      scope.row[ruleSub.key]
                        ? ruleSub.labelArry[scope.row[ruleSub.key]]
                        : ""
                    }}
                  </span>
                  <span v-else>
                    {{ scope.row[ruleSub.key] }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column v-else
                             :key="`${rule.name}-${i}`"
                             :label="rule.name"
                             :min-width="rule.minWidth"
                             align="center"
                             width="200"
                             :prop="rule.key">
              <template slot-scope="scope">
                <span v-if="rule.isTemp">
                  {{
                    scope.row[rule.key]
                      ? rule.labelArry[scope.row[rule.key]]
                      : ""
                  }}
                </span>
                <span v-else>
                  {{ scope.row[rule.key] }}
                </span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column label="备注"
                         min-width="145px"
                         align="center"
                         prop="project_linkage_remark">
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right"
                         align="center"
                         width="120"
                         v-if="role != 5">
          <template slot-scope="scope">
            <div v-show="role == 3"
                 class="d-inline cursor-p"
                 @click.stop="releaseBtn(scope.row, 2)">
              <span v-show="
                  scope.row.linkage_project_state == 2 &&
                  scope.row.linkage_approve_total_state == 2
                "
                    class="attendance-btn cursor-p">发布</span>
              <span v-show="scope.row.linkage_project_state != 2"
                    class="attendance-btn cursor-p">撤销</span>
            </div>
            <i v-show="
                (role == 2 &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.new_linkage_approve_state.length) ||
                (role == 4 &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.new_linkage_approve_state2.length) ||
                (scope.row.project_linkage_create_account_id_un ==
                  Number($store.getters.account_id) &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.new_linkage_approve_state.length) ||
                (role == 2 &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.linkage_approve_total_state == 0) ||
                (role == 4 &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.linkage_approve_total_state == 0) ||
                (scope.row.project_linkage_create_account_id_un ==
                  Number($store.getters.account_id) &&
                  scope.row.linkage_project_state == 2 &&
                  scope.row.linkage_approve_total_state == 0)
              "
               @click.stop="handleAdd(scope.row)"
               class="iconfont btn-btn_list_edit edit-icon-btn"></i>
            <i v-show="
                (role == 2 || role == 3) && scope.row.linkage_project_state == 2
              "
               @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'project_linkage_id',
                  'delProjectInfoProjectLinkage'
                )
              "
               class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"></i>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         fixed="right"
                         width="120"
                         align="center">
          <template slot-scope="scope">
            <span class="status-btn"
                  :style="
                scope.row.linkage_project_state == 2
                  ? 'background-color: #E7E7FC; color:#3B3BEC'
                  : 'background-color: #E2E8EE; color:#B5BCC8'
              ">{{
                scope.row.linkage_project_state == 2 ? "待发布" : "已发布"
              }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background
                   class="text-right bg-secondary"
                   layout="prev, pager, next"
                   :page-size="listQuery.page_size"
                   @current-change="getList"
                   :current-page.sync="currentPage"
                   :total="totalcount"></el-pagination>
  </div>
</template>

<script>
import table from "@/mixins/table";
import api from "@/api/index";
import dayjs from "dayjs";
import confirm from "@/mixins/confirm";
const date = dayjs();
import businessList from "./column/business";
import engineeringList from "./column/engineering";
import financeList from "./column/finance";
import qualityList from "./column/quality";
import riskList from "./column/risk";
export default {
  mixins: [table, confirm],
  data () {
    return {
      isShow: this.$route.meta.isProject,
      activeIn: 0,
      postURL: "queryProjectInfoProjectLinkageList",
      linkageStateArr: ["待审批", "正在审批", "审批通过"],
      colorStateArr: ["color:#FC4545", "color:#FF8D25", "color:#2ED026"],
      listQuery: {
        page: 0,
        page_size: 20,
        search_time: this.getPrevMonth(date.format("YYYY-MM")),
        rule_line_account_id_un: Number(this.$store.getters.account_id),
      }, //筛选条件
      rule_columns: [
        { num: 0, name: "商务管理中心", checked: true },
        { num: 1, name: "工程管理中心", checked: true },
        { num: 2, name: "财务管理中心", checked: true },
        { num: 3, name: "质量安全管理中心", checked: true },
        { num: 4, name: "风控管理中心", checked: true },
      ],
      rule_column_info: [
        businessList,
        engineeringList,
        financeList,
        qualityList,
        riskList,
      ],
      getListBool: false,
      selectionDeleteArr: [],
      tableArr: [],
      isSome: false,
      role: Number(this.$store.state.user.account_project_role), //0:无,1:普通用户,2:项目人员,3:管理人员,4:风控中心人员 5:领导
      editRole: false,
    };
  },
  async activated () {
    this.tableSelectList = [];
    this.isSome = false;
    await this.setHead();
    setTimeout(() => {
      this.isSome = true;
      this.$nextTick(() => {
        this.getList();
      });
    }, 20);
  },
  async created () {
    if (this.isShow) {
      this.isSome = false;
      await this.setHead();
      setTimeout(() => {
        this.isSome = true;
        this.$nextTick(() => {
          this.getList();
        });
      }, 20);
    }
    localStorage.setItem(
      "monthReport_month",
      this.$utils.formatDate(this.listQuery.search_time)
    );
  },
  methods: {
    async getList () {
      if (!this.postURL) {
        return;
      }
      this.listQuery.linkage_project_state = this.role == 5 ? 1 : null;
      this.listQuery.project_linkage_create_account_id_un =
        this.role == 2 ? Number(this.$store.getters.account_id) : null;
      this.listQuery.page =
        this.listQuery.page == -1 ? -1 : this.currentPage - 1;
      this.listLoading = true;
      let data = await api[this.postURL]({
        ...this.listQuerys,
        ...this.listQuery,
      });

      data.result.push(this.totalUp(data.result));
      this.tableData = data.result;
      this.tableData.forEach((item) => {
        item.new_linkage_approve_state = item.approach_list.filter(
          (lit) => lit.linkage_approve_state == 1
        );
        item.new_linkage_approve_state2 = item.approach_list.filter(
          (lit) =>
            lit.linkage_approve_state == 1 && lit.linkage_approve_type == 5
        );
      });
      this.totalcount = data.total_count;
      this.listLoading = false;
      document.getElementsByClassName("el-table__body-wrapper")[0]
        ? (document.getElementsByClassName(
          "el-table__body-wrapper"
        )[0].scrollTop = 0)
        : (document.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0].scrollTop = 0);
      // 避免表格合计不显示的问题
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout();
      });
    },
    //导出
    exportPro () {
      if (this.tableSelectList.length) {
        let releaseArr = this.tableSelectList[this.listQuery.page]
          .map((item) => {
            return item.project_linkage_id;
          })
          .join(",");
        let list = this.$utils.cloneObj(this.listQuery);
        list.project_linkage_ids = releaseArr;
        this.$utils.handleExport(
          "exportProjectInfoProjectLinkage",
          list,
          "项目联动",
          true
        );
      } else {
        let list = this.$utils.cloneObj(this.listQuery);
        this.$utils.handleExport(
          "exportProjectInfoProjectLinkage",
          list,
          "项目联动",
          true
        );
      }
    },
    //获取上个月
    getPrevMonth (date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      // var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2;
      return t2;
    },
    //颜色定义
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      //商务管理中心
      let node1 = businessList.find((item) => {
        let flag = item.name == row[columnIndex].label;
        if (flag) {
          return flag;
        } else if (item.children) {
          return !!item.children.find((itm) => {
            return itm.name == row[columnIndex].label;
          });
        }
        return false;
      });
      //工程管理中心
      let node2 = engineeringList.find((item) => {
        let flag = item.name == row[columnIndex].label;
        if (flag) {
          return flag;
        } else if (item.children) {
          return !!item.children.find((itm) => {
            return itm.name == row[columnIndex].label;
          });
        }
        return false;
      });
      // 财务管理中心
      let node3 = financeList.find((item) => {
        let flag = item.name == row[columnIndex].label;
        if (flag) {
          return flag;
        } else if (item.children) {
          return !!item.children.find((itm) => {
            return itm.name == row[columnIndex].label;
          });
        }
        return false;
      });
      // 质量管理中心
      let node4 = qualityList.find((item) => {
        let flag = item.name == row[columnIndex].label;
        if (flag) {
          return flag;
        } else if (item.children) {
          return !!item.children.find((itm) => {
            return itm.name == row[columnIndex].label;
          });
        }
        return false;
      });
      //风控管理中心
      let node5 = riskList.find((item) => {
        let flag = item.name == row[columnIndex].label;
        if (flag) {
          return flag;
        } else if (item.children) {
          return !!item.children.find((itm) => {
            return itm.name == row[columnIndex].label;
          });
        }
        return false;
      });
      let year = this.listQuery.search_time.split("-")[0] - 1;
      if (!!node1 || row[columnIndex].label == "商务管理中心") {
        return "background: #E7E7FC!important";
      }
      if (
        !!node2 ||
        row[columnIndex].label == "工程管理中心" ||
        row[columnIndex].label ==
        "截至" + year + "年12月累计审批完成产值（万元）" ||
        row[columnIndex].label ==
        this.listQuery.search_time.split("-")[0] + "年度审批完成产值（万元）"
      ) {
        return "background: #FFF1E5!important";
      }
      if (!!node3 || row[columnIndex].label == "财务管理中心") {
        return "background: #E7F9E6!important";
      }
      if (!!node4 || row[columnIndex].label == "质量安全管理中心") {
        return "background: #FEEAEA!important";
      }
      if (!!node5 || row[columnIndex].label == "风控管理中心") {
        return "background: #F1EAFE!important";
      }
    },
    //删除判断是否已发布
    delSet () {
      let selecList = this.selectionArr.filter(
        (item) => item.linkage_project_state != 2
      );
      if (selecList.length) {
        this.$tip({
          isTip: true,
          message: "您勾选有已发布数据",
        });
        return true;
      }
    },
    async setHead () {
      let res = await api.queryProjectLinkageRuleColumn({
        rule_column_account_id_un: Number(this.$store.getters.account_id),
      });
      this.rule_column_info = res.result[0]
        ? JSON.parse(res.result[0].rule_column_info)
        : this.rule_column_info;
      let year = this.listQuery.search_time.split("-")[0] - 1;
      // for (let i = 0; i < this.rule_column_info[1].length; i++) {
      //   if (
      //     this.rule_column_info[1][i].name ==
      //     "截至去年12月累计审批完成产值（万元）"
      //   ) {
      //     this.rule_column_info[1][i].name =
      //       "截至" + year + "年12月累计审批完成产值（万元）";
      //   }
      //   if (this.rule_column_info[1][i].name == "本年度审批完成产值（万元）") {
      //     this.rule_column_info[1][i].name =
      //       this.listQuery.search_time.split("-")[0] +
      //       "年度审批完成产值（万元）";
      //   }
      // }
      this.rule_column_info[1][4].name =
        "截至" + year + "年12月累计审批完成产值（万元）";
      this.rule_column_info[1][5].name =
        this.listQuery.search_time.split("-")[0] + "年度审批完成产值（万元）";
      this.rule_columns.forEach((item) => {
        item.checked = this.checkTree(this.rule_column_info[item.num]);
      });
    },
    checkTree (tree) {
      for (let i = 0; i < tree.length; i++) {
        let item = tree[i];
        if (item.checked) {
          return true;
        }
        if (item.children && item.children.length) {
          if (this.checkTree(item.children)) {
            return true;
          }
        }
      }
      return false;
    },
    refresh () {
      localStorage.setItem(
        "monthReport_month",
        this.$utils.formatDate(this.listQuery.search_time)
      );
      this.setHead();
      this.refreshData();
    },
    // 搜索关键词
    searchFun (val) {
      this.listQuery.search = val;
      this.refreshData();
    },
    //发表、撤销
    releaseBtn (row, type) {
      if (type == 2) {
        this.confirm(
          "",
          "",
          "",
          row.linkage_project_state == 2 ? "确认发布？" : "确认撤销？"
        )
          .then(async () => {
            let data = await api.updateProjectInfoProjectLinkageState({
              project_linkage_ids: row.project_linkage_id + "",
              linkage_project_state: row.linkage_project_state == 2 ? 1 : 2,
            });
            this.getList();
          })
          .catch(() => { });
      } else {
        let selectionArr = this.tableSelectList.flat();
        if (selectionArr.length > 0) {
          let releaseArr = selectionArr
            .filter(
              (item) =>
                item.linkage_project_state == 2 &&
                item.linkage_approve_total_state == 2
            )
            .map((item) => {
              return item.project_linkage_id;
            })
            .join(",");
          if (!releaseArr) {
            this.$tip({
              isTip: true,
              message: "数据已发布或未通过审批！",
            });
            return;
          }
          this.confirm("", "", "", "确认发布？")
            .then(async () => {
              let data = await api.updateProjectInfoProjectLinkageState({
                project_linkage_ids: releaseArr,
                linkage_project_state: 1,
              });
              this.getList();
            })
            .catch(() => { });
        } else {
          this.$tip({
            isTip: true,
            message: `请勾选要发布的项`,
          });
        }
      }
    },
    handleAdd (row) {
      this.$router.linkTo("enterprise_engineering_monthReport_handle", {
        id: row.project_linkage_id,
      });
    },
    rowClick (row) {
      this.$router.linkTo("enterprise_engineering_monthReport_detail", {
        id: row.project_linkage_id,
      });
    },
    /*
      * @Autor: 段家兴
      * @Date: 2021-07-05 10:32
      * @add: 添加合计功能
      */
    totalUp (result) {
      var tmp = {};
      result.forEach((resItem) => {
        var dataObj = [businessList, engineeringList, financeList, qualityList, riskList]
        dataObj.forEach((obj) => {
          obj.forEach((item) => {
            if (item.isall) {

              tmp[item.key] = this.$utils.accAdd((tmp[item.key] != null ? tmp[item.key] : 0), resItem[item.key], false)
            }
            if (item.children)
              item.children.forEach((childItem) => {

                if (childItem.isall) {


                  tmp[childItem.key] = this.$utils.accAdd((tmp[childItem.key] != null ? tmp[childItem.key] : 0), resItem[childItem.key], false)
                }
              })
          })
        })


      })
      tmp['linkage_project_name'] = "合计"
      tmp["approach_list"] = []
      return tmp;
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table__fixed-right {
  max-height: calc(100% - 10px) !important;
  z-index: 98 !important;
}
.attendance-btn {
  text-align: center;
  font-size: 14px;
  color: #4f44f1;
}
</style>
