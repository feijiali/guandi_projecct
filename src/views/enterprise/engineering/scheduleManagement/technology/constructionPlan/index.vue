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
            v-permission="['ProjectInfoTechnology-delete']"
            @buttonClick="
              deleteFun(true, '', 'technology_id', 'delProjectInfoTechnology')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'新增'"
            v-permission="['ProjectInfoTechnology-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_scheduleManagement_technology_constructionPlan_new'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ProjectInfoTechnology-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportProjectInfoTechnology',
                listQuery,
                '施工方案表'
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
        @row-click="infoClick"
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
          label="台账类型"
          prop="technology_type_string"
        ></el-table-column>
        <el-table-column
          label="方案主题"
          prop="technology_title"
        ></el-table-column>
        <el-table-column
          label="上传人"
          prop="sub_account_name"
        ></el-table-column>
        <el-table-column
          label="参与单位"
          prop="join_organ_area"
        ></el-table-column>
        <el-table-column
          label="参与人员"
          :show-overflow-tooltip="true"
          prop="join_account_list_string"
        ></el-table-column>
        <el-table-column label="提交时间">
          <template slot-scope="scope">
            <span>{{ scope.row.technology_sub_time.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-show="listQuery.group_type !== 1"
              v-permission="['ProjectInfoTechnology-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_engineering_scheduleManagement_technology_constructionPlan_new',
                  {
                    id: scope.row.technology_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['ProjectInfoTechnology-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'technology_id',
                  'delProjectInfoTechnology'
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
      postURL: "queryProjectInfoTechnologyList",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: "",
        start_end: "",
        project_classify: 0, //自营项目
      }, //筛选条件
      allProject: "", //全部项目
      dateRange: [],
      typeArr: [
        { type: "质检资料", id: 1 },
        { type: "试验室资料", id: 2 },
        { type: "质量管理", id: 2 },
      ],
      infoData: { file_list: [], join_account_list: [{}] },
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
    infoClick(row) {
      this.queryProjectInfoTechnology(row.technology_id);
    },
    async queryProjectInfoTechnology(technology_id) {
      let data = await api.queryProjectInfoTechnology({
        technology_id: technology_id,
      });
      this.infoData = data.result[0];
      this.$refs.detailDialog.show();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = this.dateRange[0];
        this.listQuery.start_end = this.dateRange[1];
      } else {
        this.listQuery.start_time = "";
        this.listQuery.start_end = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
.layer-info-img {
  height: 190px;
}
.detail-item {
  width: 50%;
  .detail-label {
    min-width: 70px;
  }
}
.detail-item-two {
  width: 70px;
}
.name-span {
  background-color: #f5f7fa;
  color: $color-1;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
