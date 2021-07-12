<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">部门：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-2">
            <span>异动人员:</span
            ><span class="d-inline-flex align-items-center">
              <span class="font-14 ml-1 text-hover-primary mr-05">{{
                totalcount
              }}</span>
              <span>人</span>
            </span>
          </div>
          <n-button
            v-permission="['exportFilesStaffPunchChanges-export']"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportFilesStaffPunchChanges',
                listQuery,
                '异动人员表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="calc(100% - 90px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="account_name"></el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <span>{{ $utils.hidePartOfPhoneNum(scope.row.account) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="organ"></el-table-column>
        <el-table-column label="职务" prop="account_job"></el-table-column>
        <el-table-column
          label="连续未打卡天数（天）"
          prop="not_attendance_day"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <nStatusButton
              v-permission="['StaffPunchAttendance-leave']"
              v-if="scope.row.account_status == 1"
              class="mr-2"
              @buttonClick="handleFun(scope.row)"
              :changeColor="'#fd5571'"
              :btnText="'离职'"
            />
            <span v-if="scope.row.account_status == 2" class="pink2"
              >已离职</span
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
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryStaffPunchAttendanceChanges",
      deleData: {},
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      statistics: {
        account_count: 0,
        attend_count: 0,
        left_count: 0,
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    async getCheckStatistics(data) {
      let requestData = {
        attend_date: this.listQuery.attend_date,
        organ_node: this.listQuery.organ_node,
        organ_id: this.listQuery.organ_id,
      };
      let res = await api.getCheckStatistics(requestData);
      this.statistics = res.result[0];
    },
    // 点击离职按钮
    handleFun(row) {
      this.confirm("", "", "是否对该人员做离职处理？").then(() => {
        this.deleData.account_id = row.account_id;
        this.sureDelete("resignationAccount", () => {});
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
