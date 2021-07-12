<template>
  <div class="container-all">
    <n-dialog ref="detailDialog" :diaWidth="'30%'">
      <template slot="diaSlot">
        <div class="text-center">
          <n-button
            :btnText="'本周'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="thisWeek"
            v-show="info.current_week_state == 0"
          ></n-button>
          <div class="grey-button" v-show="info.current_week_state == 1">
            本周已上报
          </div>
          <n-button
            class="ml-4"
            :btnText="'下周'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="nextWeek"
            v-show="info.next_week_state == 0"
          ></n-button>
          <div class="grey-button ml-4" v-show="info.next_week_state == 1">
            下周已上报
          </div>
        </div>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <n-search
            ref="serch"
            class="ml-2 mr-2 search-box"
            :isInput="true"
            :placeholder="'请输入人员姓名'"
            @searchFun="searchFun"
          ></n-search>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">上报状态：</label>
            <el-select
              v-model="listQuery.plan_week_approve_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="已上报" :value="1"></el-option>
              <el-option label="未上报" :value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['OAPlanWeek-upload']"
            :btnText="'计划上报'"
            @buttonClick="openDialog"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 130px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column align="center" label="日期">
          <template slot-scope="scope">
            <p class="font-14 font-weight-bold text-hover-primary">
              第&nbsp;{{ scope.row.plan_week_week_sort }}&nbsp;周
            </p>
            <p class="mt-1">
              <span>{{ scope.row.plan_week_monday_date | formatDate }}</span
              >&nbsp;至&nbsp;<span>{{
                scope.row.plan_week_sunday_date | formatDate
              }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="责任人"
          prop="plan_week_account_name"
        >
          <template slot-scope="scope">
            <div class="d-flex align-items-center">
              <viewer
                :images="[scope.row.oa_plan_week_account_pic]"
                class="lookPic d-inline-block"
              >
                <img
                  style="width: 40px; height: 40px"
                  class="rounded-circle cursor-p rounded-circle mr-1"
                  :src="item"
                  v-for="(item, index) in [
                    scope.row.oa_plan_week_account_pic
                      ? scope.row.oa_plan_week_account_pic
                      : require('@/assets/images/bg_mine_grey.png'),
                  ]"
                  :key="index + 'image'"
                />
              </viewer>
              {{ scope.row.plan_week_account_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="工作内容" align="left" min-width="500">
          <template slot-scope="scope">
            <p
              class="text-left"
              v-html="$utils.dataFormatter(scope.row.plan_week_cur_work_info)"
            ></p>
            <div class="w-100 text-left mt-1">
              <viewer
                :images="scope.row.pic_list"
                class="lookPic d-inline-block"
              >
                <img
                  style="height: 70px; margin-right: 10px; margin-bottom: 0"
                  :src="item.url"
                  alt
                  v-for="(item, index) in scope.row.pic_list"
                  :key="index + 'image'"
                  class="layer-info-img"
                />
              </viewer>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :style="{
                backgroundColor:
                  backgroundColorArr[scope.row.plan_week_approve_state],
                color: colorArr[scope.row.plan_week_approve_state],
              }"
              >{{ reviseStateArr[scope.row.plan_week_approve_state] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <i
              v-permission="['OAPlanWeek-update']"
              v-show="
                scope.row.plan_week_sunday_date > nowTime &&
                scope.row.plan_week_account_id_union == uinID
              "
              @click="
                linkTo('enterprise_oa_workbench_weekPlan_handle', {
                  id: scope.row.plan_week_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryOAPlanWeek",
      listQuery: {
        page: 0,
        page_size: 20,
        plan_week_monday_date: 0,
        plan_week_sunday_date: 0,
        organ_node: this.$organ_id_en_or_pro(this),
        plan_week_account_name: this.$store.getters.userName,
        plan_week_account_id_union: 0,
      },
      dateRange: [], //日期范围
      nowTime: this.$utils.parseDate2Str(new Date(), "YYYYMMDD"), //当前时间
      uinID: this.$store.state.user.account_id, //登录者ID
      reviseStateArr: ["", "已上报", "未上报"],
      colorArr: ["", "#84d945", "#3377FF"],
      backgroundColorArr: ["", "#E4FBD8", "#EAF1FF"],
      info: {},
      account_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //
      getListBool: false,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  created() {
    this.tableData = [];
  },
  async activated() {
    if (hasPermissionArr(["OAPlanWeek-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.plan_week_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.plan_week_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
    this.account_id = this.$route.query.id
      ? parseInt(this.Base64.decode(this.$route.query.id))
      : null;
    if (this.account_id) {
      await this.queryAccountRole();
    } else {
      this.listQuery.plan_week_account_name = this.$store.getters.userName;
      this.$refs.serch.searchObj = this.$store.getters.userName;
      this.refreshData();
    }
  },
  methods: {
    async queryAccountRole() {
      let res = await api.queryAccountRole({ account_id: this.account_id });
      this.listQuery.plan_week_account_name = res.result[0].account_name;
      this.$refs.serch.searchObj = res.result[0].account_name;
      this.getList();
    },
    searchFun(val) {
      this.listQuery.plan_week_account_name = val;
      this.refreshData();
    },
    async QueryOAPlanWeekState() {
      let res = await api.QueryOAPlanWeekState({});
      this.info = res.result[0];
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.plan_week_monday_date = parseInt(this.dateRange[0]);
        this.listQuery.plan_week_sunday_date = parseInt(this.dateRange[1]);
      } else {
        this.listQuery.plan_week_monday_date = 0;
        this.listQuery.plan_week_sunday_date = 0;
      }
      this.currentPage = 1;
      this.getList();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 计划上报
    openDialog() {
      this.$refs.detailDialog.show();
      this.QueryOAPlanWeekState();
    },
    thisWeek() {
      this.$refs.detailDialog.cancel();
      this.$router.linkTo("enterprise_oa_workbench_weekPlan_handle", {
        day: 0,
      });
    },
    nextWeek() {
      this.$refs.detailDialog.cancel();
      this.$router.linkTo("enterprise_oa_workbench_weekPlan_handle");
    },
  },
};
</script>
<style lang="scss" scoped>
.grey-button {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 0 50px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  color: #fff;
  background: #d9dadc;
}
</style>
