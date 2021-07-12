<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
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
          </div>
        </div>
        <div>
          <div class="d-inline-block ml-2">
            <n-button
              v-permission="['scheduleManagementAbstract-export']"
              :btnText="'导出'"
              @buttonClick="
                $utils.handleExport(
                  'exportProjectInfoPlanSchedule',
                  listQuery,
                  '计划进度表'
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
      <el-table :data="tableData" style="width: 100%" height="calc(100% - 85px)"
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
          label="合同总价（万元）"
          prop="project_total_value"
        ></el-table-column>
        <el-table-column
          label="计划产值（万元）"
          prop="plan_schedule_plan_value"
        ></el-table-column>
        <el-table-column
          label="开累产值（万元）"
          prop="plan_schedule_finish_value"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              class="attendance-btn cursor-p"
              @click.stop="
                linkTo(
                  'enterprise_engineering_scheduleManagement_figure_plan_info',
                  {
                    organ_id: scope.row.organ_id,
                    id: scope.row.plan_schedule_id,
                  }
                )
              "
              >查看明细</span
            >
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
import table from "@/mixins/table";
export default {
  mixins: [table],
  data() {
    return {
      postURL: "queryProjectInfoPlanScheduleList",
      isShow: this.$route.meta.isProject,
      listQuery: {
        query_type: 1,
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: 0, //自营项目
      }, //筛选条件
      allProject: "", //全部项目
      infoData: { pic_list: [], video_list: [] }, //详情
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
    handleUpdate(row) {
      let query = row
        ? {
            id: row.hard_worker_id,
          }
        : "";
      this.$router.linkTo("enterprise_material_supplier_new", query);
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style scoped lang="scss">
.attendance-btn {
  display: inline-block;
  border-radius: 20px;
  padding: 4px 20px;
  text-align: center;
  margin-left: 10px;
  font-size: 12px;
  cursor: pointer;
  border: 2px solid #3377ff;
  color: #3377ff;
}
</style>
