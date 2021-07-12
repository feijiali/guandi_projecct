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
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                v-if="!isShow"
                label="全部"
                :value="allProject"
              ></el-option>
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
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
            <n-search
              ref="serch"
              :isInput="true"
              class="search-box-des"
              :placeholder="'请输入合同名称/经办人搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
         
          <n-button
            class="ml-2"
            v-permission="['ProjectReportEngineeringPay-export']"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'ExportProjectReportEngineeringPayInfo',
                'contract_approval_id',
                tableSelectList.length ? {} : listQuery,
                '计量合同付款表'
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
                t: 2,
                from: 2,
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
          label="更新日期"
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
          prop="organ"
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
        <el-table-column align="center" label="付款期次" prop="pay_count">
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
        <el-table-column
          align="center"
          label="剩余未付金额(元)"
          prop="engineering_pay_total_money_need"
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
                  'contract_approval_id',
                  'delOAContractApproval'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn"
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
      postURL: "QueryProjectReportPayInfo",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        contract_approval_type: 2,
      },
      allProject: "", //全部项目
      dateRange: [], //日期范围
      teamTypeArr: [
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
      allProject: "", //全部项目
      getListBool: false,
      projectListSelect: [], //工程项目
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
    this.getOrganProjectData();
    this.getList();
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.getOrganProjectData();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.listQuery.project_classify,
      });
      this.projectListSelect = result;
      this.allProject = this.projectListSelect.length
        ? this.projectListSelect.map((item) => item.organ_id).join(",")
        : "";
      this.listQuery.organ_node = this.isShow
        ? Number(this.allProject)
        : this.allProject;
      this.listQuery.organ_node ? this.refreshData() : (this.tableData = []);
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
    },
    rowclick(row) {
      this.$router.linkTo("enterprise_engineering_metering_measurement_list", {
        contract_id_un: row.contract_approval_id,
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
