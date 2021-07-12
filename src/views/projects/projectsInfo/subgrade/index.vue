<template>
  <div class="container-all">
    <div class="container-div">
      <div class="top-select-box">
        <div class="d-flex align-items-center"></div>
        <div>
          <n-button 
          v-permission="['RoadUnitProject-upload']"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('project_projectsInfo_subgrade_handle')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column prop="organ" label="项目工区"></el-table-column>
        <el-table-column label="单位工程" prop="unit_project"></el-table-column>
        <el-table-column
          label="填方(m³)"
          prop="unit_project_fill"
        ></el-table-column>
        <el-table-column
          label="挖方(m³)"
          prop="unit_project_dig"
        ></el-table-column>
        <el-table-column
          label="工期(月)"
          prop="unit_project_during"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i 
              v-permission="['RoadUnitProject-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo('project_projectsInfo_subgrade_handle', {
                  id: scope.row.unit_project_id,
                })
              "
            ></i>
            <i
              v-permission="['RoadUnitProject-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'unit_project_id',
                  'delRoadUnitProject'
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryRoadUnitProjectList", //表格请求接口
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        build_type: 0, //构件类型
      },
      unitData: [], //桥梁单位工程
      partArr: [], //部位类型
    };
  },
  mounted() {
    this.queryBridgeUnitProject();
  },
  methods: {
    async queryBridgeUnitProject() {
      let res = await api.queryBridgeUnitProject({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
