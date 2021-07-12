<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'预报台账'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box advan-sel">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center" v-if="projectList.length > 1">
            <div class="mr-1">
              <el-select
                style="width: 200px !important"
                placeholder="请选择"
                v-model="listQuery.predict_organ_id_un"
                @change="changePage(1)"
              >
                <el-option
                  v-for="(item, index) of projectList"
                  :key="index + 'a'"
                  :label="item.project"
                  :value="item.organ_id_union"
                ></el-option>
              </el-select>
            </div>
          </div>
          <span class="text-secondary">日期：</span>
          <el-date-picker
            @change="changeTime"
            class="el-date-picker-range-box mr-1"
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <n-search
            ref="serch"
            :isInput="true"
            :placeholder="'请输入关键字搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['TunnelGeologyPredict-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'predict_id', 'delTunnelGeologyPredict')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>

          <n-button
            v-permission="['TunnelGeologyPredict-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_engineering_advancedGeology_handle')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <!-- <n-button :btnText="'导出'" class="ml-2">
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button> -->
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 80px)"
        @selection-change="handleSelectionChange"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="子单位工程"
          prop="sub_unit_name"
        ></el-table-column>
        <el-table-column label="预报范围" prop="predict_length">
          <template slot-scope="scope">
            <span
              >{{ scope.row.sub_unit_pile_prefix
              }}{{ scope.row.predict_start }} -
              {{ scope.row.sub_unit_pile_prefix
              }}{{ scope.row.predict_end }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="预报方式"
          prop="predict_method"
        ></el-table-column>
        <el-table-column label="掌子面里程">
          <template slot-scope="scope">
            <span>
              {{ scope.row.sub_unit_pile_prefix }}
              {{ scope.row.predict_tunnel_face }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="doc_date" label="是否存在地质灾害" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.has_disaster ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预报时间" prop="predict_date"></el-table-column>
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <i
              v-show="listQuery.group_type !== 1"
              v-permission="['TunnelGeologyPredict-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_engineering_advancedGeology_handle',
                  {
                    id: scope.row.predict_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['TunnelGeologyPredict-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'predict_id',
                  'delTunnelGeologyPredict'
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryTunnelGeologyPredictList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        predict_organ_id_un: 0,
      },
      month: "",
      supplyData: [],
      tableData: [],
      projectList: [],
      getListBool: false,
      dateRange: [],
      isready: false,
    };
  },
  created() {
    this.getProjectList();
  },
  activated() {
    if (this.isready) {
      this.changePage(1);
    }
  },
  methods: {
    async getProjectList() {
      let { result } = await api.queryProjectInfoProject({
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1,
      });
      // this.projectList = result.filter(item => item.project_config_gis);

      this.projectList = result;
      // let ind = this.projectList.findIndex(
      //   item => item.organ_id_union == this.organ_node
      // );
      // 设置选中第一个
      if (this.projectList.length > 0) {
        this.listQuery.predict_organ_id_un = this.projectList[0].organ_id_union;
      }
      this.changePage(1);
      setTimeout(() => {
        this.isready = true;
      });
    },
    changeTime(time) {
      if (this.dateRange) {
        this.listQuery.predict_date_start = this.dateRange[0];
        this.listQuery.predict_date_end = this.dateRange[1];
      } else {
        this.listQuery.predict_date_start = "";
        this.listQuery.predict_date_end = "";
      }
      this.changePage(1);
    },
    async rowclick(row) {},
    searchFun(val) {
      this.listQuery.predict_search = val;
      this.changePage(1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.advan-sel {
  .el-input {
    width: 100% !important;
  }
}
</style>
