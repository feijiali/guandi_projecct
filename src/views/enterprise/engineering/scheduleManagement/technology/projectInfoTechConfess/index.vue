<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" />
    <div class="container-div">
      <div class="top-select-box">
        <div class="d-flex align-items-center">
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
              v-model="listQuery.organ_node"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option v-if="!isShow" :value="allProject" :label="'全部'"
                >全部</el-option
              >
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
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
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div>
          <n-button
            class="ml-2"
            :btnText="'批量删除'"
            v-permission="['ProjectInfoTechConfess-delete']"
            @buttonClick="
              deleteFun(
                true,
                '',
                'tech_confess_id',
                'delProjectInfoTechConfess'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'新增'"
            v-permission="['ProjectInfoTechConfess-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_scheduleManagement_technology_projectInfoTechConfess_handle'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>

          <n-button
            v-permission="['ProjectInfoTechConfess-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportProjectInfoTechConfess',
                listQuery,
                '技术交底表'
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
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 80px)"
        @selection-change="handleSelectionChange"
        @row-click="backfillEditData"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" label="序号" width="60">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="工程项目" prop="organ"></el-table-column>
        <el-table-column
          label="编号"
          prop="tech_confess_serial"
        ></el-table-column>
        <el-table-column
          label="工程名称"
          prop="tech_confess_engine_name"
        ></el-table-column>
        <el-table-column
          label="施工单位"
          prop="tech_confess_construct"
        ></el-table-column>
        <el-table-column
          label="编制人"
          prop="pre_account_name"
        ></el-table-column>
        <el-table-column
          label="复核人"
          prop="review_account_name"
        ></el-table-column>
        <el-table-column
          label="技术负责人"
          prop="response_account_name"
        ></el-table-column>
        <el-table-column
          label="交底内容"
          prop="tech_confess_desc"
        ></el-table-column>
        <el-table-column
          label="交底日期"
          prop="tech_confess_time"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-show="listQuery.group_type !== 1"
              v-permission="['ProjectInfoTechConfess-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_engineering_scheduleManagement_technology_projectInfoTechConfess_handle',
                  {
                    id: scope.row.tech_confess_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['ProjectInfoTechConfess-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'tech_confess_id',
                  'delProjectInfoTechConfess'
                )
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
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryProjectInfoTechConfessList",
      isShow: this.$route.meta.isProject,
      ruleform: {},
      listQuery: {
        page: 0,
        page_size: 20,
        project_classify: 0, //自营项目
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: "",
        end_time: "",
      }, //筛选条件
      allProject: "", //全部项目
      dateRange: [],
      infoData: { file_list: [] },
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
    };
  },
  mounted() {
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
    backfillEditData(row) {
      this.$refs.detailDialog.show();
      this.queryProjectInfoTechConfess(row.tech_confess_id);
    },
    async queryProjectInfoTechConfess(tech_confess_id) {
      let data = await api.queryProjectInfoTechConfess({
        tech_confess_id: tech_confess_id,
      });
      this.infoData = data.result[0];
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 打印
    doPrint() {
      var windows = this.print(document.getElementById("print").innerHTML);
    },
    print(content) {
      var myWindow = window.open("", "打印");
      var style = `<style type='text/css'>
                        @page{size:auto;margin:0}
                        td{padding:10px 0;text-align:center;}
                        </style>`;
      myWindow.document.write(content + style);
      myWindow.focus();
      myWindow.document.close(); //关闭document的输出流, 显示选定的数据
      setTimeout(() => {
        myWindow.print(); //打印当前窗口
      }, 100);
      return myWindow;
    },
  },
};
</script>

<style lang="scss" scoped>
.table td {
  padding: 10px;
  text-align: center;
}
</style>
