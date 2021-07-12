<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" />
    <div class="container-div clear">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">工程项目：</label>
            <el-select
              v-model="listQuery.organ_node"
              @change="change"
              placeholder="请选择"
            >
              <el-option
                label="全部"
                v-if="!isShow"
                :value="this.$organ_id_en_or_pro(this)"
              ></el-option>
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
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
          <n-search
            class="ml-2"
            ref="serch"
            :isInput="true"
            :placeholder="'请输入关键字搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            class="ml-1"
            v-if="isShow"
            :btnText="'批量删除'"
            v-permission="['SafeAnnualPlan-delete']"
            @buttonClick="
              deleteFun(true, '', 'annual_plan_id', 'delSafeAnnualPlan')
            "
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'新增'"
            v-if="isShow"
            v-permission="['SafeAnnualPlan-upload']"
            @buttonClick="
              $router.linkTo('enterprise_safety3_produceManage_plan_Handleplan')
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
        <el-table-column
          type="selection"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          label="工程项目"
          align="center"
          prop="organ"
        ></el-table-column>
        <el-table-column
          label="安全计划名称"
          align="center"
          prop="annual_plan_name"
        ></el-table-column>
        <el-table-column
          label="上传人"
          align="center"
          prop="account_name"
        ></el-table-column>
        <el-table-column
          label="关联对象"
          align="center"
          prop="related_organ_name"
        ></el-table-column>
        <el-table-column
          label="上传时间"
          align="center"
          prop="annual_plan_sub_time"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="80" v-if="isShow">
          <template slot-scope="scope">
            <i
              class="iconfont btn-btn_list_edit edit-icon-btn"
              v-permission="['SafeAnnualPlan-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_safety3_produceManage_plan_Handleplan',
                  {
                    id: scope.row.annual_plan_id,
                  }
                )
              "
            ></i>
            <i
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              v-permission="['SafeAnnualPlan-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'annual_plan_id',
                  'delSafeAnnualPlan'
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
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      infoData: { file_list: [], pic_list: [] },
      postURL: "querySafeAnnualPlanList", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: "",
        end_time: "",
      },
      dateRange: [],
      tableData: [],
      deleData: {}, //删除的id
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {},
  methods: {
    change(val) {
      this.listQuery.organ_node = val;
      this.currentPage = 1;
      this.getList();
    },
    refreshData() {
      this.listQuery.start_time = this.dateRange[0];
      this.listQuery.end_time = this.dateRange[1];
      this.currentPage = 1;
      this.getList();
    },
    async rowclick(row) {
      let res = await api.querySafeAnnualPlan({
        annual_plan_id: row.annual_plan_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
    },
  },
};
</script>

<style lang="scss"></style>
