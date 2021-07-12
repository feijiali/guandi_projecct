<template>
  <div class="container-all">
    <div
      class="container-div"
      style="margin: 0; border-radius: 10px"
      :style="{ backgroundColor: activeIn == 0 ? 'transparent' : 'white' }"
    >
      <div class="top-select-box">
        <div>
          <div class="position-absolute" style="top: 20px; left: 10px">
            <div class="justify-content-start d-flex align-items-center">
              <ul class="sub-nav-ul">
                <li
                  v-for="(item, index) of 2"
                  @click="handelSwitchChange(index)"
                  :key="index"
                  class="sub-nav-li-item"
                  :class="[activeIn == index ? 'active' : '']"
                >
                  {{ navs[index] }}
                </li>
              </ul>
            </div>
          </div>
          <div class="d-inline-block" style="margin-left: 180px">
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
          <n-button
            class="ml-2"
            v-permission="['PerformanceBasic']"
            :btnText="'绩效考核表'"
            @buttonClick="
              $router.linkTo(
                'enterprise_oa_account_performance_sort_assessment'
              )
            "
          >
          </n-button>
        </div>
      </div>
      <div class="table-sort-box bg-white table-list-wrap flex-fill">
        <div class="table-content position-relative flex-fill">
          <el-scrollbar
            v-if="activeIn === 0"
            :native="false"
            class="h-100 w-100"
          >
            <el-row style="margin: 0 !important">
              <el-col
                :span="6"
                v-for="(item, index) in tableData"
                :key="index"
                style="padding: 0 !important"
              >
                <vListItem
                  @rowclickTo="rowclickTo"
                  :sort="index"
                  :item="item"
                />
              </el-col>
            </el-row>
          </el-scrollbar>
          <n-nodata
            class="el-table__empty-text position-absolute text-center"
            v-if="activeIn === 0 && tableData.length == 0"
            :text="'真是不巧，暂时没有数据呢'"
            :imgW="'130px'"
            :icon="require('@/assets/images/icon_default.png')"
          ></n-nodata>
          <div v-if="activeIn === 0" class="table-content-shadow"></div>
          <el-table
            class="cursor-p-table"
            v-if="activeIn === 1"
            :data="tableData"
            style="width: 100%"
            height="100%"
            @row-click="rowclickTo"
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
            <el-table-column label="考核类型" prop="basic_type">
              <template slot-scope="scope">
                {{ ["", "年度", "季度"][scope.row.basic_type] }}
              </template>
            </el-table-column>
            <el-table-column
              label="考核周期"
              prop="performance_basic_type_cycle"
            >
            </el-table-column>
            <el-table-column label="部门" prop="organ"></el-table-column>
            <el-table-column
              label="考核负责人"
              prop="performance_basic_principal"
            ></el-table-column>
            <el-table-column
              label="考核截至日期"
              prop="basic_end_time"
            ></el-table-column>
            <el-table-column
              label="考核人数（人）"
              prop="basic_total_num"
            ></el-table-column>
            <el-table-column label="人均得分（分）" prop="basic_avg_score">
              <template slot-scope="scope">
                <span v-if="scope.row.basic_state == 2">
                  {{
                    hasPermissionArr(["PerformanceBasic-seeall"]) ||
                    scope.row.basic_principal_account_id_union == account_id
                      ? scope.row.basic_avg_score
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
          v-if="activeIn == 1"
          class="text-right bg-secondary"
          layout="prev, pager, next"
          :page-size="listQuery.page_size"
          @current-change="getList"
          :current-page.sync="currentPage"
          :total="totalcount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/enterprise/oa/account/performance";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import vListItem from "./components/ListItem";
import { hasPermissionArr } from "@/plugins/permission_tools.js";

export default {
  mixins: [table, confirm],
  components: {
    vListItem,
  },
  data() {
    return {
      tableData: [],
      account_id: this.$store.getters.account_id,
      postURL: "queryPerformanceBasic",
      listQuery: {
        basic_year: this.$utils.getCurrentTime("", "year"),
        organ_node: this.$organ_id_en_or_pro(this),
        basic_quarter: 1,
        page_size: 20,
        page: 0,
        basic_type: 1,
        order_by: 1, //1-按分数排序 2-默认
      },
      navs: ["卡片", "列表"],
      getListBool: false,
      activeIn: 0, // 0-卡片;1-列表
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },

  async activated() {
    let res = await api.queryPerformanceBasicList({
      organ_node: this.$organ_id_en_or_pro(this),
      page: 0,
      page_size: 1,
      order_by: 2,
    });
    let data = res.result;
    if (data.length) {
      this.listQuery.basic_type = data[0].basic_type;
      this.listQuery.basic_quarter = data[0].basic_quarter;
      this.listQuery.basic_year = data[0].basic_year;
    }
    this.refreshData();
  },
  methods: {
    hasPermissionArr: hasPermissionArr,
    // 切换类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
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
      if (!this.listQuery.basic_year && !this.listQuery.basic_quarter) {
        this.$tip({
          isTip: true,
          message: `请选择${this.listQuery.basic_type == 2 ? "季度" : "年份"}!`,
        });
        return;
      }
      this.$utils.handleExport(
        "exportFilesPerformanceBasic",
        this.listQuery,
        "智能排优表"
      );
    },
    // 点击详情回填数据
    rowclickTo(row) {
      this.$router.linkTo("enterprise_oa_account_performance_sort_partsort", {
        id: row.basic_id,
        basic_year: this.listQuery.basic_year,
        basic_quarter: this.listQuery.basic_quarter,
        basic_type: this.listQuery.basic_type,
      });
    },
    basicTypeChange() {
      this.listQuery.basic_quarter = this.listQuery.basic_type == 1 ? 0 : 1;
      this.refreshData();
    },
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.currentPage = 1;
      this.getList();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.table-sort-box {
  line-height: 30px;
  background-color: transparent;
  .table-content {
    position: relative;
    .table-content-shadow {
      position: absolute;
      width: 100%;
      height: 100px;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, transparent, #eef3ff);
    }
    .el-table__empty-text {
      line-height: 20px;
      left: calc(50% - 150px);
      top: calc(50% - 90px);
    }
  }
  .table-page {
    height: 40px;
    text-align: right;
  }
}
</style>
