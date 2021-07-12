<template>
  <div class="container-all">
    <Detail
      v-if="infoData.quality_tech_confess_theme"
      ref="detailDialog"
      :infoData="infoData"
    />
    <div class="container-div">
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
            <span class="grey2">选择时间：</span>
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
          <n-search
            class="d-inline-block ml-2"
            ref="serch"
            :isInput="true"
            :placeholder="'输入主题进行搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['QualityQualityTechConfess-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'quality_tech_confess_id',
                'delQualityQualityTechConfess'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-if="isShow"
            v-permission="['QualityQualityTechConfess-upload']"
            class="ml-1"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_quality_technology_handle')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        ref="table"
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 100px)"
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
          label="主题"
          prop="quality_tech_confess_theme"
        ></el-table-column>
        <el-table-column
          label="交底时间"
          prop="quality_tech_confess_time"
        ></el-table-column>
        <el-table-column label="交底人" prop="account_list">
          <template slot-scope="scope">
            <span
              class="disi pd15"
              v-for="(item, index) in scope.row.account_list"
              :key="index"
              >{{
                item.tech_account_name +
                (index != scope.row.account_list.length - 1 ? "，" : "")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="被交底班组" prop="to_organ_list">
          <template slot-scope="scope">
            <span
              class="disi pd15"
              v-for="(item, index) in scope.row.to_organ_list"
              :key="index"
              >{{
                item.tech_organ_name +
                (index != scope.row.to_organ_list.length - 1 ? "，" : "")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" v-if="isShow">
          <template slot-scope="scope">
            <i
              v-permission="['QualityQualityTechConfess-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo('enterprise_quality_technology_handle', {
                  id: scope.row.quality_tech_confess_id,
                })
              "
            ></i>
            <i
              v-permission="['QualityQualityTechConfess-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'quality_tech_confess_id',
                  'delQualityQualityTechConfess'
                )
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
import Detail from "./components/Detail";
import { mapGetters } from "vuex";
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryQualityQualityTechConfess",
      dateRange: [], //日期范围
      isShow: this.$route.meta.isProject,
      listQuery: {
        start_time: "",
        end_time: "",
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      allProject: "", //全部项目
      infoData: {
        video_list: [],
        pic_list: [],
        file_list: [],
      }, //详情
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
      this.getList();
    },
    rowclick(row) {
      this.infoData = row;
      this.$nextTick(() => {
        this.$refs.detailDialog.show();
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
