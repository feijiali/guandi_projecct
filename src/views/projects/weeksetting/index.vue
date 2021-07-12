<template>
  <div class="container-all">
    <div class="container-div">
      <div class="top-select-box">
        <div class="flex-fill">
          <div class="d-inline-block">
            <label class="text-secondary">月份：</label>
            <el-date-picker
              :clearable="false"
              v-model="month"
              format="yyyy-MM"
              value-format="yyyyMM"
              type="month"
              @change="chooseMonth"
              placeholder="请选择"
            ></el-date-picker>
          </div>
        </div>
        <div v-permission="['WeekManageSetUp-upload']">
          <n-button
            :btnText="'新增'"
            @buttonClick="$router.linkTo('enterprise_weeksetting_handle')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table flex-fill"
        :data="tableData"
        style="width: 100%"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="月份" prop="set_up_month"></el-table-column>
        <el-table-column label="第几周" prop="set_up_num"></el-table-column>
        <el-table-column label="时间跨度">
          <template slot-scope="scope">
            <label>{{
              scope.row.set_up_start + "-" + scope.row.set_up_end
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['WeekManageSetUp-update']"
              @click.stop="
                $router.linkTo('enterprise_weeksetting_handle', {
                  id: scope.row.set_up_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['WeekManageSetUp-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'set_up_id', 'delWeekManageSetUp')
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
      postURL: "queryWeekManageSetUpList",
      listQuery: {
        set_up_month_int: 0,
        page: 0,
        page_size: 20,
      },
      month: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    chooseMonth(val) {
      this.listQuery.set_up_month_int = Number(val);
      this.refreshData();
    },
  },
};
</script>

<style></style>
