<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="智能排优" />
    </div>
    <div class="d-flex position-absolute" style="right: 10px">
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
            {{ personCount[item.key]
            }}<span class="font-14 font-weight-normal">人</span>
          </span>
        </div>
      </div>
    </div>

    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">考核类型：</label>
            <el-select
              :disabled="true"
              v-model="listQuery.basic_type"
              @change="basicTypeChange"
            >
              <el-option :value="1" label="年度考核"></el-option>
              <el-option :value="2" label="季度考核"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">年份：</label>
            <el-date-picker
              :disabled="true"
              format="yyyy"
              value-format="yyyy"
              @change="refreshData"
              v-model="listQuery.basic_year"
              type="year"
              placeholder="选择年份"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="listQuery.basic_type == 2">
            <label class="text-secondary">季度：</label>
            <el-select
              :disabled="true"
              v-model="listQuery.basic_quarter"
              @change="refreshData"
            >
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
              <el-option value label="全部"></el-option>
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
            @buttonClick="
              $utils.handleExport(
                'exportFilesPerformanceAssessor',
                listQuery,
                '智能排优表'
              )
            "
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
        height="calc(100% - 80px)"
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
        <el-table-column label="考核等级" prop="project">
          <template slot-scope="scope">
            <div>
              <img
                v-if="levelIcon[scope.row.assessor_level]"
                :src="levelIcon[scope.row.assessor_level]"
                alt
                srcset
              />
              <span v-else class="f22">--</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="assessor_pic">
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.pic_url || avatorDefault" />
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
          <template slot-scope="scope">{{
            ["", "年度", "季度"][scope.row.basic_type]
          }}</template>
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
          <template slot-scope="scope">{{
            ["", "是", "否"][scope.row.assessor_is_self_assess]
          }}</template>
        </el-table-column>
        <el-table-column label="综合得分" prop="assessor_avg_score">
          <template slot-scope="scope">
            <span v-if="scope.row.assessor_is_assess == 1">{{
              hasPermissionArr(["PerformanceBasic-seeall"]) ||
              scope.row.assessor_account_id_union == account_id ||
              scope.row.basic_principal_account_id_union == account_id
                ? scope.row.assessor_avg_score
                : "**"
            }}</span>
            <span
              v-else-if="
                scope.row.assessor_is_assess != 1 && scope.row.basic_state == 2
              "
              >{{
                hasPermissionArr(["PerformanceBasic-seeall"]) ||
                scope.row.assessor_account_id_union == account_id ||
                scope.row.basic_principal_account_id_union == account_id
                  ? scope.row.assessor_avg_score
                  : "**"
              }}</span
            >
            <span v-else class="f22">--</span>
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
      postURL: "queryPerformanceAssessorList",
      account_id: this.$store.getters.account_id,
      levelIcon,
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
      avatorDefault: require("@/assets/images/bg_mine_grey.png"),
      listQuery: {
        basic_id:
          this.$route.query.id &&
          parseInt(this.Base64.decode(this.$route.query.id)),
        basic_year: this.$route.query.basic_year,
        basic_quarter: parseInt(this.$route.query.basic_quarter),
        page_size: 20,
        page: 0,
        // organ_node: this.$organ_id_en_or_pro(this),
        basic_type: parseInt(this.$route.query.basic_type),
        assessor_is_assess: 0, //1-是 2-否 是否完成考评
        assessor_level: "", //考核等级
        order_by: 1, //1-按分数排序 2-默认
      },
      personCount: {
        all: 0,
        assessed: 0,
        disAssess: 0,
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  created() {
    this.queryConut();
    this.getList();
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
