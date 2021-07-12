<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="listQuery.project_classify"
              @change="chooseProjectClassify"
              placeholder="请选择"
            >
              <el-option
                :value="item.val"
                :label="item.name"
                v-for="(item, index) in projectClassifyArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block" :class="[isShow ? '' : 'ml-2']">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
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
              value-format="yyyyMMdd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

          <div class="d-inline-block ml-2">
            <label class="text-secondary">合同分类：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.contract_approval_type_str"
              placeholder="选择"
            >
              <el-option :value="''" label="全部"></el-option>
              <el-option
                v-for="(item, index) in teamTypeArr"
                :key="index"
                :label="item"
                :value="item"
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
          <n-button
            v-permission="['ProjectInfoContract-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'OAContractApproval',
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            v-permission="['ProjectInfoContract-export']"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'exportOAContractApproval',
                'contract_approval_id',
                tableSelectList.length ? {} : listQuery,
                '合同申请表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ProjectInfoContract-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_apply', {
                t: 6,
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
          prop="contract_approval_sub_time"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.contract_approval_sub_time.split(" ")[0]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属机构"
          prop="organ_area"
        ></el-table-column>

        <el-table-column
          label="合同名称"
          align="center"
          prop="contract_approval_name"
        >
        </el-table-column>
        <el-table-column
          label="合同编号"
          align="center"
          prop="contract_approval_number"
        >
        </el-table-column>
        <el-table-column align="center" label="合同分类">
          <template slot-scope="scope">
            <span>{{ scope.row.contract_approval_type_str }}</span>
          </template>
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
          label="合同金额(元)"
          prop="contract_approval_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="乙方"
          prop="contract_approval_supplier"
        >
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <div
              @click.stop
              class="d-inline-block"
              v-permission="['ProjectReportEngineeringMain-upload']"
            >
              <nStatusButton
                @buttonClick="
                  scope.row.revise_info_state == 3 &&
                    scope.row.contract_approval_type == 2 &&
                    scope.row.organ_type == 30 &&
                    $router.linkTo(
                      'enterprise_engineering_contract_measurement',
                      { id: scope.row.contract_approval_id, t: 1, from: 1 }
                    )
                "
                :changeColor="
                  scope.row.revise_info_state == 3 &&
                  scope.row.contract_approval_type == 2 &&
                  scope.row.organ_type == 30
                    ? '#fd5571'
                    : '#D6DAE4'
                "
                :btnText="'发起计量'"
              />
            </div>
            <div
              @click.stop
              class="d-inline-block"
              v-permission="['ProjectReportEngineeringPay-upload']"
            >
              <nStatusButton
                class="ml-2"
                @buttonClick="
                  scope.row.revise_info_state == 3 &&
                    scope.row.contract_approval_type == 2 &&
                    scope.row.organ_type == 30 &&
                    $router.linkTo('enterprise_engineering_contract_payment', {
                      contract_id: scope.row.contract_approval_id,
                      t: 2,
                      from: 1,
                    })
                "
                :changeColor="
                  scope.row.revise_info_state == 3 &&
                  scope.row.contract_approval_type == 2 &&
                  scope.row.organ_type == 30
                    ? '#3377FF'
                    : '#D6DAE4'
                "
                :btnText="'发起付款'"
              />
            </div>
            <i
              v-permission="['ProjectInfoContract-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'contract_approval_id',
                  'delOAContractApproval'
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
import { mapGetters } from "vuex";

export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryOAContractApprovalList",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        contract_approval_type_str: "", //合同类型
        organ_node: this.$organ_id_en_or_pro(this),
        revise_info_sub_account_id_union: 0,
      },
      allProject: "", //全部项目
      dateRange: [], //日期范围
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
      keyID: "contract_approval_id",
      getListBool: false,
      treeData: [],
      projectClassifyArr: [], //项目分类
    };
  },
  activated() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.listQuery.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    // if (hasPermissionArr(["OAContractApproval-query"])) {
    //   //如果勾选查看权限，则能看所有的
    //   this.listQuery.revise_info_sub_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    // } else {
    //   //如果没有勾选权限，则只能查看自己的
    //   this.listQuery.revise_info_sub_account_id_union = Number(
    //     this.$store.getters.account_id
    //   );
    // }
    this.getOrganProjectData();
  },
  computed: {
    ...mapGetters({
      subject_label: "subject_label",
    }),
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.$refs.treeselect.valueTitle = "";
      this.getOrganProjectData();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.QueryOrganProjectTree({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      if (this.listQuery.project_classify) {
        let projectArr = [];
        this.getProjectNodes(result, projectArr);
        this.treeData = projectArr.filter((item) => {
          return (
            item.node.project_classify ==
            (this.isShow
              ? Number(this.$store.getters.project_classify)
              : this.listQuery.project_classify)
          );
        });
      } else {
        this.treeData = result;
      }
      this.allProject = this.treeData.length
        ? this.treeData.map((item) => item.tag).join(",")
        : "";
      this.listQuery.organ_node = this.isShow
        ? Number(this.allProject)
        : this.allProject;
      this.listQuery.organ_node ? this.refreshData() : (this.tableData = []);
    },
    // 查找项目属性的数据
    getProjectNodes(data, projectArr) {
      data.forEach((item) => {
        if (item.node.organ_type == 30) {
          projectArr.push(item);
        } else {
          if (item.leaves && item.leaves.length > 0) {
            this.getProjectNodes(item.leaves, projectArr);
          }
        }
      });
    },
    linkTo(row) {
      if (row.contract_approval_election == 0) return;
      this.$router.linkTo("enterprise_oa_voted_info", {
        id: row.contract_approval_election,
      });
    },
    rowclick(row) {
      this.$router.linkTo("enterprise_oa_workbench_info", {
        t: 4,
        types: "OAContractApproval",
        id: row.revise_info_accessory_id,
      });
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
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
