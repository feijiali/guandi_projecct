<template>
  <div class="container-all">
    <div
      class="position-absolute d-flex-cen lets2 title"
      style="right: 10px; top: -55px"
    >
      <div
        class="statistics-box-item d-flex align-items-center cursor-p ml-1"
        v-for="(item, index) in statisticsArr"
        :key="index"
      >
        <div class="ml-1">
          <span class="font-15">{{ item.label }}</span>
          <span
            class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
          >
            {{ personCount[item.key] }} </span
          ><span class="font-14 font-weight-normal">人</span>
        </div>
      </div>
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectValue="handleFilterChange"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">考核类型：</label>
            <el-select v-model="listQuery.basic_type" @change="basicTypeChange">
              <el-option :value="1" label="年度考核"></el-option>
              <el-option :value="2" label="季度考核"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">年份：</label>
            <el-date-picker
              format="yyyy"
              value-format="yyyy"
              @change="refreshData"
              v-model="listQuery.basic_year"
              type="year"
              placeholder="选择年份"
            >
            </el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="listQuery.basic_type == 2">
            <label class="text-secondary">季度：</label>
            <el-select v-model="listQuery.basic_quarter" @change="refreshData">
              <el-option :value="1" label="第一季度"></el-option>
              <el-option :value="2" label="第二季度"></el-option>
              <el-option :value="3" label="第三季度"></el-option>
              <el-option :value="4" label="第四季度"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">是否完成考评：</label>
            <el-select
              v-model="listQuery.assessor_is_assess"
              @change="changePage(1)"
            >
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="已完成"></el-option>
              <el-option :value="2" label="未完成"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">考核等级：</label>
            <el-select
              v-model="listQuery.assessor_level"
              @change="changePage(1)"
            >
              <el-option value="" label="全部"></el-option>
              <el-option value="A" label="A"></el-option>
              <el-option value="B" label="B"></el-option>
              <el-option value="C" label="C"></el-option>
              <el-option value="D" label="D"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['PerformanceBasic-seeall']"
            :btnText="'导出'"
            class="ml-2"
            @buttonClick="handleExport"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="100%"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="考核等级">
          <template slot-scope="scope">
            <div>
              <img
                v-if="levelIcon[scope.row.assessor_level]"
                :src="levelIcon[scope.row.assessor_level]"
                alt
                srcset
              />
              <span v-else class="f22"> -- </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <div class="avatar">
              <viewer
                :images="[
                  scope.row.pic_url ? scope.row.pic_url : avatorDefault,
                ]"
                class="lookPic"
              >
                <img
                  class="cusp"
                  :src="pic"
                  v-for="(pic, ides) of [
                    scope.row.pic_url ? scope.row.pic_url : avatorDefault,
                  ]"
                  :key="ides + 'c'"
                />
              </viewer>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="assessor_name"></el-table-column>
        <el-table-column label="部门" prop="organ"></el-table-column>
        <el-table-column label="职务" prop="assessor_job"></el-table-column>
        <el-table-column
          label="考核截至日期"
          prop="basic_end_time"
          width="160"
        ></el-table-column>
        <el-table-column label="考核类型" prop="basic_type">
          <template slot-scope="scope">
            {{ ["", "年度", "季度"][scope.row.basic_type] }}
          </template>
        </el-table-column>
        <el-table-column
          label="考核周期"
          prop="performance_basic_type_cycle"
        ></el-table-column>
        <el-table-column
          label="考核负责人"
          prop="performance_basic_principal"
        ></el-table-column>
        <el-table-column
          label="是否完成自我考评"
          prop="assessor_is_self_assess"
        >
          <template slot-scope="scope">
            {{ ["", "是", "否"][scope.row.assessor_is_self_assess] }}
          </template>
        </el-table-column>
        <el-table-column label="综合得分" prop="assessor_avg_score">
          <template slot-scope="scope">
            <span v-if="scope.row.assessor_is_assess == 1">
              {{
                hasPermissionArr(["PerformanceBasic-seeall"]) ||
                scope.row.assessor_account_id_union == account_id ||
                scope.row.basic_principal_account_id_union == account_id
                  ? scope.row.assessor_avg_score
                  : "**"
              }}
            </span>
            <span
              v-else-if="
                scope.row.assessor_is_assess != 1 && scope.row.basic_state == 2
              "
            >
              {{
                hasPermissionArr(["PerformanceBasic-seeall"]) ||
                scope.row.assessor_account_id_union == account_id ||
                scope.row.basic_principal_account_id_union == account_id
                  ? scope.row.assessor_avg_score
                  : "**"
              }}
            </span>
            <span v-else class="f22"> -- </span>
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
import api from "@/api/enterprise/oa/account/performance";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import { levelIcon } from "@/constants/imgIcon";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      levelIcon,
      account_id: this.$store.getters.account_id,
      tableData: [],
      currentPage: 1,
      postURL: "queryPerformanceAssessorList",
      avatorDefault: require("@/assets/images/bg_mine_grey.png"),
      statisticsArr: [
        {
          label: "参加考核",
          key: "all",
        },
        {
          label: "已完成",
          key: "assessed",
        },
        {
          label: "未完成",
          key: "disAssess",
        },
      ],
      listQuery: {
        basic_year: this.$utils.getCurrentTime("", "year"),
        basic_quarter: 1,
        page_size: 20,
        page: 0,
        basic_type: 1,
        organ_node: this.$organ_id_en_or_pro(this),
        assessor_is_assess: 0, //1-是 2-否 是否完成考评
        assessor_level: "", //考核等级
        order_by: 1, //1-按分数排序 2-默认
        basic_id: parseInt(this.$route.query.id),
      },
      personCount: {
        all: 0,
        assessed: 0,
        disAssess: 0,
      },
      getListBool: false,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async activated() {
    let res = await api.queryPerformanceBasicList({
      page: 0,
      page_size: 1,
      order_by: 2,
      organ_node: this.$organ_id_en_or_pro(this),
      basic_id: parseInt(this.$route.query.id),
    });
    let data = res.result;
    if (data.length) {
      this.listQuery.basic_type = data[0].basic_type;
      this.listQuery.basic_quarter = data[0].basic_quarter;
      this.listQuery.basic_year = data[0].basic_year;
    }
    this.refreshData();
    this.queryConut();
  },
  methods: {
    hasPermissionArr: hasPermissionArr,
    basicTypeChange() {
      this.listQuery.basic_quarter = this.listQuery.basic_type == 1 ? 0 : 1;
      this.refreshData();
    },
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.currentPage = 1;
      this.getList();
    },
    // 导出
    handleExport() {
      if (!this.listQuery.basic_type) {
        this.$tip({
          isTip: true,
          message: "请选择考核类型!",
        });
        return;
      }
      if (
        (this.listQuery.basic_type == 1 && !this.listQuery.basic_year) ||
        (this.listQuery.basic_type == 2 && this.listQuery.basic_quarter == 0)
      ) {
        this.$tip({
          isTip: true,
          message: `请选择${this.listQuery.basic_type == 2 ? "季度" : "年份"}!`,
        });
        return;
      }
      this.$utils.handleExport(
        "exportFilesPerformanceAssessor",
        this.listQuery,
        "智能考核表"
      );
    },
    async queryConut() {
      let res1 = await api.queryPerformanceAssessorList({
        ...this.listQuery,
        page: -2,
        assessor_is_assess: 1,
      });
      this.personCount.assessed = res1.total_count;
      let res2 = await api.queryPerformanceAssessorList({
        ...this.listQuery,
        page: -2,
        assessor_is_assess: 2,
      });
      this.personCount.disAssess = res2.total_count;
      this.personCount.all =
        this.personCount.assessed + this.personCount.disAssess;
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.queryConut();
      this.getList();
    },
    rowclick(row) {
      if (
        !hasPermissionArr(["PerformanceBasic-seeall"]) &&
        this.account_id != row.assessor_account_id_union
      ) {
        return;
      }
      this.$router.linkTo("enterprise_oa_account_performance_sort_info", {
        id: row.assessor_id,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
}
</style>
