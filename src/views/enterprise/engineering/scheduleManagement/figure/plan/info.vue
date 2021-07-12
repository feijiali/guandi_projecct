<template>
  <div class="container-all">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-flex align-items-center">
            <div class="d-inline-block">
              <el-radio-group
                @change="changeType"
                v-model="listQuery.group_type"
                class="vtt"
                style="vertical-align: text-top"
              >
                <el-radio class="f16" :label="1">章节汇总台账</el-radio>
                <el-radio class="f16" :label="2">章节上报台账</el-radio>
              </el-radio-group>
            </div>
            <div
              class="d-inline-block ml-2"
              v-show="listQuery.group_type !== 1"
            >
              <span class="grey2">章节类型：</span>
              <el-select
                class="input-m"
                @change="refreshData"
                v-model="listQuery.plan_schedule_type"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in chapterBox"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="d-inline-block ml-2">
              <span class="grey2">月份选择：</span>
              <el-date-picker
                class="el-date-picker-range-box"
                @change="refreshData"
                v-model="dateRange"
                type="monthrange"
                format="yyyy-MM"
                value-format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div>
          <n-button
            v-show="listQuery.group_type !== 1"
            v-permission="['QuantitiesChapterPlanValue-upload']"
            :btnText="'上报'"
            @buttonClick="handleAdd"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-show="listQuery.group_type !== 1"
            v-permission="['QuantitiesChapterPlanValue-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'plan_schedule_id',
                'delProjectInfoPlanSchedule'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            v-permission="['QuantitiesChapterPlanValue-export']"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportProjectInfoPlanSchedule',
                listQuery,
                listQuery.group_type == 1 ? '章节汇总表' : '章节上报台账表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <!-- :span-method="objectSpanMethod" -->
      <el-table
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 85px)"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <!-- <el-table-column label="序号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column> -->
        <el-table-column prop="index" label="序号" width="60">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="工程项目" prop="organ"></el-table-column>
        <el-table-column
          label="章节类型"
          prop="plan_schedule_type_string"
        ></el-table-column>
        <el-table-column
          label="计划产值（万元）"
          prop="plan_schedule_plan_value"
        ></el-table-column>
        <el-table-column
          label="实际产值（万元）"
          prop="plan_schedule_finish_value"
        ></el-table-column>
        <el-table-column
          label="上报月份"
          prop="plan_schedule_month"
        ></el-table-column>
        <el-table-column
          label="操作"
          prop="account_name"
          header-align="center"
          width="160px"
          v-if="listQuery.group_type !== 1"
        >
          <template slot-scope="scope">
            <i
              v-permission="['QuantitiesChapterPlanValue-update']"
              @click.stop="handleAdd(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
            ></i>
            <i
              v-permission="['QuantitiesChapterPlanValue-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'plan_schedule_id',
                  'delProjectInfoPlanSchedule'
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
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryProjectInfoPlanSchedule",
      deleData: {},
      listQuery: {
        group_type: 1,
        query_type: 2,
        organ_id: Number(this.$route.query.organ_id),
        page: 0,
        page_size: 20,
        // organ_node: this.$organ_id_en_or_pro(this)
      }, //筛选条件
      dateRange: [],
      title: "计划进度详情",
      chapterBox: [
        { type: "全部", id: 0 },
        { type: "第100章", id: 100 },
        { type: "第200章", id: 200 },
        { type: "第300章", id: 300 },
        { type: "第400章", id: 400 },
        { type: "第500章", id: 500 },
        { type: "第600章", id: 600 },
        { type: "第700章", id: 700 },
      ],
      infoData: { pic_list: [], video_list: [] }, //详情
    };
  },
  methods: {
    changeType(val) {
      this.listQuery.plan_schedule_type = 0;
      this.listQuery.month_start_time = "";
      this.listQuery.month_end_time = "";
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.month_start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.month_end_time = this.dateRange ? this.dateRange[1] : "";
      this.listQuery.group_type == 1
        ? (this.currentPage = 0)
        : (this.currentPage = 1);
      this.currentPage = 1;
      this.getList();
    },
    //   新增和修改
    handleAdd(row) {
      let query = row
        ? { plan_schedule_id: row.plan_schedule_id }
        : { id: this.listQuery.organ_id };
      this.$router.linkTo(
        "enterprise_engineering_scheduleManagement_figure_plan_reportPlan",
        query
      );
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style scoped lang="scss"></style>
