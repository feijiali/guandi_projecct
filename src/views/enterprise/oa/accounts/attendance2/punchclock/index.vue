<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-inline-flex">
            <div
              class="statistics-box-item d-flex align-items-center cursor-p"
              v-for="(item, index) in statisticsArr"
              :key="index"
            >
              <div class="ml-1">
                <span class="font-15">{{ item.label }}</span>
                <span
                  class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
                >
                  {{ statistics[item.key] }} </span
                ><span class="font-14 font-weight-normal">人</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['OALeave']"
            :btnText="'请假表'"
            @buttonClick="
              $router.linkTo('enterprise_oa_account_attendance_leave')
            "
          >
          </n-button>
          <n-button
            v-permission="['StaffPunchBasic']"
            class="ml-1"
            :btnText="'考勤设置'"
            @buttonClick="
              $router.linkTo('enterprise_oa_accounts_attendance2_configurelist')
            "
          >
          </n-button>
          <!-- <n-button
            v-permission="['StaffPunchAttendance-export']"
            :btnText="'导出'"
            class="ml-1"
            @buttonClick="
              $utils.handleExport(
                'exportFilesStaffPunchAttendance',
                listQuery,
                '人员打卡表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button> -->
          <n-button
            class="ml-1"
            :btnText="'出勤表'"
            @buttonClick="
              $router.linkTo('enterprise_oa_accounts_attendance2_outattendance')
            "
          >
          </n-button>
        </div>
      </div>
      <div
        class="mb-1 top-select-box align-items-center"
        style="margin-top: -20px; padding: 0"
      >
        <div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              :clearable="false"
              v-model="listQuery.query_day"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              @change="refreshData"
              :picker-options="pickerOptions"
              placeholder="请选择"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-5">
            <label class="text-secondary">打卡规则：</label>
            <el-radio-group
              @change="refreshData"
              v-model="listQuery.basic_type"
              class="vtt"
              style="vertical-align: text-top"
            >
              <el-radio :label="2">两次</el-radio>
              <el-radio :label="4">四次</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 300px)"
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
        <template v-if="listQuery.basic_type == 4">
          <el-table-column key="1" label="上午打卡班次" align="center">
            <el-table-column
              align="center"
              prop="name"
              :label="class_list[0] ? class_list[0].class_in_time : '上班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100 d-flex-cen">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_in_time
                    "
                    >{{
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_in_time &&
                      scope.row.attendance_info[0].attendance_in_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][
                        scope.row.attendance_info[0] &&
                          scope.row.attendance_info[0].attendance_in_state
                      ]
                    "
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              :label="class_list[0] ? class_list[0].class_out_time : '下班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_out_time
                    "
                    >{{
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_out_time &&
                      scope.row.attendance_info[0].attendance_out_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][scope.row.attendance_info[0].attendance_out_state]
                    "
                  />
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column key="2" label="下午打卡班次" align="center">
            <el-table-column
              prop="name"
              align="center"
              :label="class_list[1] ? class_list[1].class_in_time : '上班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[1] &&
                      scope.row.attendance_info[1].attendance_in_time
                    "
                    >{{
                      scope.row.attendance_info[1] &&
                      scope.row.attendance_info[1].attendance_in_time &&
                      scope.row.attendance_info[1].attendance_in_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][
                        scope.row.attendance_info[1] &&
                          scope.row.attendance_info[1].attendance_in_state
                      ]
                    "
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              :label="class_list[1] ? class_list[1].class_out_time : '下班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[1] &&
                      scope.row.attendance_info[1].attendance_out_time
                    "
                    >{{
                      scope.row.attendance_info[1] &&
                      scope.row.attendance_info[1].attendance_out_time &&
                      scope.row.attendance_info[1].attendance_out_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][
                        scope.row.attendance_info[1] &&
                          scope.row.attendance_info[1].attendance_out_state
                      ]
                    "
                  />
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
        <template v-if="listQuery.basic_type == 2">
          <el-table-column key="4" label="上班打卡" align="center">
            <el-table-column
              prop="name"
              align="center"
              :label="class_list[0] ? class_list[0].class_in_time : '上班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_in_time
                    "
                    >{{
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_in_time &&
                      scope.row.attendance_info[0].attendance_in_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][
                        scope.row.attendance_info[0] &&
                          scope.row.attendance_info[0].attendance_in_state
                      ]
                    "
                  />
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column key="3" label="下班打卡" align="center">
            <el-table-column
              align="center"
              prop="name"
              :label="class_list[0] ? class_list[0].class_out_time : '下班'"
              width="220"
            >
              <template slot-scope="scope">
                <div class="w-100">
                  <span
                    class="w-50 d-inline-block"
                    v-if="
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_out_time
                    "
                    >{{
                      scope.row.attendance_info[0] &&
                      scope.row.attendance_info[0].attendance_out_time &&
                      scope.row.attendance_info[0].attendance_out_time.split(
                        " "
                      )[1]
                    }}</span
                  >
                  <nStatusButton
                    :changeColor="'#fd5571'"
                    :btnText="
                      [
                        '未打卡',
                        '已打卡',
                        '请假',
                        '迟到',
                        '早退',
                        '异常',
                        '旷工',
                      ][
                        scope.row.attendance_info[0] &&
                          scope.row.attendance_info[0].attendance_out_state
                      ]
                    "
                  />
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
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
      postURL: "queryStaffPunchAttendance",
      deleData: {},
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        query_day: this.$utils.getCurrentTime(),
        organ_node: 0,
        basic_type: 2,
        // basic_sub_account_id_union:
        //   this.$store.getters.account_character_type > 10
        //     ? null
        //     : Number(this.$store.getters.account_id),
      },
      statisticsArr: [
        {
          label: "应到岗",
          key: "total_num",
        },
        {
          label: "已打卡",
          key: "attendance_num",
        },
        {
          label: "未打卡",
          key: "not_attendance_num",
        },
        {
          label: "异常",
          key: "abnormal_num",
        },
      ],
      // 不能选择超过今天的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      statistics: {
        account_count: 0,
        attend_count: 0,
        left_count: 0,
      },
      class_list: [], //打卡班次
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  activated() {
    this.listQuery.organ_node = this.treeData[0].tag;
    // 查询此部门考勤配置
    this.queryStaffPunchBasic(this.listQuery.organ_node);
    this.queryStaffPunchAttendanceStates();
  },
  methods: {
    linkTo(name) {
      this.$router.linkTo(name);
    },
    async queryStaffPunchAttendanceStates(data) {
      let requestData = {
        query_day: this.listQuery.query_day,
        organ_node: this.listQuery.organ_node,
        basic_type: this.listQuery.basic_type,
      };
      let res = await api.queryStaffPunchAttendanceStates(requestData);
      this.statistics = res.result[0];
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
      this.queryStaffPunchAttendanceStates();
    },
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      // 查询此部门考勤配置
      this.queryStaffPunchBasic(node.tag);
      this.queryStaffPunchAttendanceStates();
    },
    // 查询此部门考勤配置
    async queryStaffPunchBasic(data) {
      let res = await api.queryStaffPunchBasic({ organ_id: Number(data) });
      res.result[0] && (this.listQuery.basic_type = res.result[0].basic_type);
      this.class_list = res.result[0] ? res.result[0].class_list : [];
      this.refreshData();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
