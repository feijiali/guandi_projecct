<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div class="d-flex align-items-center">
          <div class="justify-content-start d-inline-flex align-items-center">
            <ul class="sub-nav-ul">
              <li
                v-for="(item, index) of 4"
                @click="handelSwitchChange(index)"
                :key="index"
                class="sub-nav-li-item"
                :class="[activeIn == index ? 'active' : '']"
              >
                {{ navs[index] }}
              </li>
            </ul>
          </div>
          <div class="d-inline-block ml-2" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="listQuery.project_classify"
              @change="chooseProjectClassify"
              placeholder="请选择"
            >
              <el-option
                :value="item.val"
                :label="item.name"
                v-for="(item, index) in projectClassifyArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                v-if="!isShow"
                label="全部"
                :value="allProject"
              ></el-option>
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2" v-if="activeIn == 3">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="changeDate"
              class="el-date-editor-m"
              :clearable="false"
              :editable="false"
              v-model="select_time"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="activeIn == 1">
            <label class="text-secondary">月份：</label>
            <el-date-picker
              @change="changeMonth"
              class="el-date-editor-m"
              :clearable="false"
              :editable="false"
              v-model="select_month"
              format="yyyy-MM"
              value-format="yyyyMM"
              type="month"
              placeholder="请选择"
            ></el-date-picker>
          </div>

          <div class="d-inline-block ml-2" v-if="activeIn == 2">
            <label class="text-secondary">周次：</label>
            <el-select
              class="el-select-long week-el-select-long"
              v-model="select_week"
              placeholder="请选择"
              @change="changeWeek"
            >
              <el-option
                v-for="item in weekArr"
                :key="item.set_up_sub_time_int"
                :label="
                  '第' +
                  item.set_up_num +
                  '周' +
                  '，' +
                  item.set_up_start +
                  '-' +
                  item.set_up_end
                "
                :value="item.set_up_start_int + '-' + item.set_up_end_int"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- :span-method="objectSpanMethod" -->
      <el-table :data="tableList" style="width: 100%" height="calc(100% - 85px)"
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
        <el-table-column
          label="项目名称"
          prop="organ"
          min-width="140px"
        ></el-table-column>
        <el-table-column
          min-width="165px"
          label="子单位工程"
          prop="unit_proj_name"
        ></el-table-column>
        <el-table-column
          min-width="100px"
          label="长度（m）"
          prop="unit_proj_pile_length"
        ></el-table-column>
        <el-table-column label="开挖">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_-1.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_-1.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_-1.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_-1.ration">
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="上台阶左侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_3.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_3.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_3.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_3.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="上台阶右侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_4.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_4.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_4.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_4.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="中台阶">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_5.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_5.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_5.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_5.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="中台阶左侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_6.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_6.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_6.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_6.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="中台阶右侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_7.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_7.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_7.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_7.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="下台阶">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_8.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_8.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_8.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_8.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="下台阶左侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_9.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_9.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_9.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_9.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="下台阶右侧">
          <el-table-column v-if="activeIn != 0" label="计划" prop="detail_10.plan_length">
          </el-table-column>
          <el-table-column label="实际完成" min-width="90px" prop="detail_10.build_length">
          </el-table-column>
          <el-table-column label="未完成" prop="detail_10.not_number">
          </el-table-column>
          <el-table-column label="完成率"  prop="detail_10.ration">
          </el-table-column>
        </el-table-column> -->
        <el-table-column label="二衬">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_11.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_11.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_11.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_11.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="仰拱">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_12.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_12.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_12.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_12.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="回填">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_13.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_13.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_13.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_13.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="整平层">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_14.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_14.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_14.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_14.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="中央排水沟">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_15.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_15.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_15.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_15.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="电缆沟">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_16.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_16.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_16.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_16.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="初支">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_17.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_17.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_17.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_17.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="防水层">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_20.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_20.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_20.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_20.ration">
          </el-table-column>
        </el-table-column>
        <el-table-column label="路面">
          <el-table-column
            v-if="activeIn != 0"
            label="计划"
            prop="detail_21.plan_length"
          >
          </el-table-column>
          <el-table-column
            label="实际完成"
            min-width="90px"
            prop="detail_21.build_length"
          >
          </el-table-column>
          <el-table-column label="未完成" prop="detail_21.not_number">
          </el-table-column>
          <el-table-column label="完成率" prop="detail_21.ration">
          </el-table-column>
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
import api from "@/api/index";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
const date = dayjs();
export default {
  mixins: [table],
  data() {
    return {
      activeIn: 0,
      isShow: this.$route.meta.isProject,
      navs: ["累计", "月", "周", "天"],
      postURL: "tunnelProgressUnit",
      allProject: "", //全部项目
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        // start_time: parseInt(this.$utils.parseDate2Str(this.$utils.fun_date(-1),"YYYYMMDD")),
        // end_time: parseInt(this.$utils.parseDate2Str(this.$utils.fun_date(-1),"YYYYMMDD")),
        project_classify: 0,
        page: 0,
        page_size: 20,
      }, //筛选条件
      select_time: this.$utils.parseDate2Str(
        this.$utils.fun_date(-1),
        "YYYYMMDD"
      ), // 日
      select_month: date.format("YYYYMM"),
      select_week: null,
      weekArr: [{}], //周
      infoData: {},
      spanArr: [],
      tableList: [],
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
    };
  },
  mounted() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.listQuery.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    this.getOrganProjectData();
    this.getList();
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      this.getOrganProjectData();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.listQuery.project_classify,
      });
      this.projectListSelect = result;
      this.allProject = this.projectListSelect.length
        ? this.projectListSelect.map((item) => item.organ_id).join(",")
        : "";
      this.listQuery.organ_node = this.isShow
        ? Number(this.allProject)
        : this.allProject;
      this.listQuery.organ_node ? this.refreshData() : (this.tableData = []);
    },
    changeDate() {
      this.listQuery.start_time = parseInt(this.select_time);
      this.listQuery.end_time = parseInt(this.select_time);
      this.refreshData();
    },
    changeWeek() {
      let select_week = this.select_week.split("-");
      // 周->第一天
      this.listQuery.start_time = parseInt(select_week[0]);
      // 周->最后天
      this.listQuery.end_time = parseInt(select_week[1]);
      this.refreshData();
    },
    async changeMonth() {
      if (this.activeIn == 2) {
        this.select_week = null;
        this.listQuery.start_time = 0;
        this.listQuery.end_time = 0;
        // 获取周
        await this.getWeeks();
      } else {
        // 获取月天数
        let days = dayjs(this.select_month + "01").daysInMonth();
        // 月->第一天
        this.listQuery.start_time = parseInt(this.select_month + "01");
        // 月->最后天
        this.listQuery.end_time = parseInt(this.select_month + "" + days);
      }
      this.refreshData();
    },
    async getWeeks() {
      let { result } = await api.queryWeekManageSetUpList({
        set_up_month_int: parseInt(this.select_month),
      });
      this.weekArr = result;
      // 设置默认选中第一周
      if (result[0]) {
        this.select_week =
          result[0].set_up_start_int + "-" + result[0].set_up_end_int;
        this.listQuery.start_time = result[0].set_up_start_int;
        this.listQuery.end_time = result[0].set_up_end_int;
      }
    },
    // 切换 累计 月 周 天
    handelSwitchChange(ind) {
      this.activeIn = ind;
      if (ind == 0) {
        this.listQuery = {
          organ_node: this.listQuery.organ_node,
          page: 0,
          page_size: 20,
        };
        this.refreshData();
      } else if (ind == 1) {
        this.select_month = date.format("YYYYMM");
        this.changeMonth();
      } else if (ind == 2) {
        this.select_month = date.format("YYYYMM");
        this.changeMonth();
      } else {
        this.select_time = date.format("YYYYMMDD");
        this.changeDate();
      }
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 处理数据
    detailInitialFun(arr) {
      arr.forEach((item) => {
        for (let i = 0, len = item.scheme.length; i < len; i++) {
          item[`detail_${item.scheme[i].build_part}`] = item.scheme[i];
          item[`detail_${item.scheme[i].build_part}`].not_number =
            item[`detail_${item.scheme[i].build_part}`].build_length >
            item[`detail_${item.scheme[i].build_part}`].plan_length
              ? "0.00"
              : (
                  item[`detail_${item.scheme[i].build_part}`].plan_length -
                  item[`detail_${item.scheme[i].build_part}`].build_length
                ).toFixed(2);
        }
      });
      return arr;
    },
  },
};
</script>

<style scoped lang="scss"></style>
