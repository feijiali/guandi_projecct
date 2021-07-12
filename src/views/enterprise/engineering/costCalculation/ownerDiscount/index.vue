<template>
  <div class="container-all">
    <n-dialog
      ref="import"
      :diaTit="'导入业主扣回表'"
      :diaWidth="'500px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <FileImport @complete="handleImported"></FileImport>
      </template>
    </n-dialog>

    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="project_classify"
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
              @change="changeorgan"
              placeholder="请选择"
            >
              <!-- <el-option
                label="全部"
                v-if="!isShow"
                :value="this.$organ_id_en_or_pro(this)"
              ></el-option> -->
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">月份：</span>
            <el-date-picker
              :clearable="false"
              style="width: 140px"
              class="el-date-editor-m"
              @change="changedate"
              v-model="listQuery.rebate_date"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            />
          </div>
        </div>
        <div>
          <n-button :btnText="'导入'" v-permission="['CostEstimationRebate-import']" @buttonClick="handleImport"></n-button>
          <n-button
            class="ml-1"
            :btnText="'导出'"
            v-permission="['CostEstimationRebate-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportCostEstimationRebate',
                listQuery,
                '业主扣回表'
              )
            "
          >
          </n-button>
        </div>
      </div>
      <el-table
        :tree-props="{ children: 'sub_unit_proj_list' }"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="子目号" align="center" prop="rebate_no">
        </el-table-column>
        <el-table-column
          label="子目名称"
          align="center"
          prop="rebate_name"
        ></el-table-column>
        <el-table-column
          label="单位"
          align="center"
          prop="rebate_unit"
        ></el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="rebate_num"
        ></el-table-column>
        <el-table-column
          label="合同总价(元)"
          align="center"
          prop="rebate_total_money"
        ></el-table-column>
        <el-table-column
          label="扣回费用(元)"
          align="center"
          prop="rebate_money"
        ></el-table-column>
        <el-table-column
          label="招标文件条款"
          align="center"
          prop="rebate_clause"
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
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import FileImport from "./components/Import";
import { listMixin } from "@/mixins/material.js";

export default {
  mixins: [table, confirm, listMixin],
  components: { FileImport },
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "QueryCostEstimationRebateList", //表格请求接口
      tableData: [],
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: null,
        rebate_date: this.$utils.getCurrentTime("", "", "month"),
      },
      project_classify: 0, //自营项目
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
      getListBool: false,
    };
  },
  created() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    this.getOrganProjectData();
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.listQuery.organ_node = this.$organ_id_en_or_pro(this);
      this.getOrganProjectData();
      //
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.project_classify,
      });
      this.projectListSelect = result;
      this.listQuery.organ_node = this.projectListSelect[0].organ_id;
      this.getList();
    },
    handleImport() {
      this.$refs.import.show();
    },
    changeorgan(val) {
      this.listQuery.organ_node = val;
      this.currentPage = 1;
      this.getList();
    },
    changedate(val) {
      this.listQuery.rebate_date = val;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>
