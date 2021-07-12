<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="top-select-box">
      <div>
        <div class="d-flex align-items-center">
          <div class="d-inline-block" v-if="!isShow">
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
          <div class="d-inline-block" :class="[isShow ? '' : 'ml-2']">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="getDataFun"
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
          <div class="d-inline-block ml-2">
            <label class="text-secondary">选择年份：</label>
            <el-date-picker
              format="yyyy"
              value-format="yyyy"
              @change="getDataFun"
              v-model="listQuery.parameter_time"
              type="year"
              placeholder="选择年份"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div>
        <div class="d-inline-block ml-2">
          <n-button
            :btnText="'变更情况统计'"
            @buttonClick="
              $router.linkTo('enterprise_engineering_changeStanding_summary')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
    </div>
    <div class="flex-fill d-flex justify-content-center">
      <ChangeTotal
        :list="list"
        :colors="colors"
        :datalist="datalist"
        :textName="textName"
      />
      <ChangeList
        :countArr="countArr"
        :moneyArr="moneyArr"
        :textName="textName"
      />
    </div>

    <!-- <div class="flex-fill d-flex justify-content-between">
      <div class="rounded-1 bg-white mr-1 flex-fill"></div>
      <div class="rounded-1 bg-white mr-1 flex-fill"></div>
      <div class="rounded-1 bg-white mr-1 flex-fill"></div>
    </div> -->
  </div>
</template>

<script>
import api from "@/api/index";
import ChangeTotal from "./components/ChangeTotal";
import ChangeList from "./components/ChangeList";
export default {
  components: {
    ChangeTotal,
    ChangeList,
  },
  data() {
    return {
      isShow: this.$route.meta.isProject,
      list: [],
      colors: [
        ["#3536EC", "#3536EC"],
        ["#FF8F28", "#FF8F28"],
        ["#3AD332", "#3AD332"],
      ],
      allProject: "", //全部项目
      datalist: {},
      countArr: [],
      moneyArr: [],
      noData: false, //暂无数据
      textName: ["未上报", "已上报未批复", "已上报已批复"],
      listQuery: {
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this),
        parameter_time: this.$utils.parseDate2Str(new Date(), "YYYY"),
        project_classify: 0, //自营项目
      }, //筛选条件
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
    this.getDataFun();
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
      this.listQuery.organ_node ? this.getDataFun() : (this.noData = true);
    },
    getDataFun() {
      // 查询变更批复率
      this.QueryChangeParameterParameterSummary();
      // 查询变更数
      this.QueryChangeParameterParameterSummaryNum();
      // 查询变更金额
      this.QueryChangeParameterParameterSummaryMoney();
    },
    async QueryChangeParameterParameterSummaryNum() {
      let { result } = await api.QueryChangeParameterParameterSummaryNum(
        this.listQuery
      );
      this.countArr = result;
    },
    async QueryChangeParameterParameterSummaryMoney() {
      let { result } = await api.QueryChangeParameterParameterSummaryMoney(
        this.listQuery
      );
      this.moneyArr = result;
    },
    async QueryChangeParameterParameterSummary() {
      let { result } = await api.QueryChangeParameterParameterSummary(
        this.listQuery
      );
      let has = result.map((item) => item.parameter_info_type);
      let arr = [1, 2, 3]
        .filter((items) => has.indexOf(items) == -1)
        .map((itm) => {
          return {
            parameter_info_type: itm,
            parameter_info_money: "0",
          };
        });
      result = [...result, ...arr];
      result = result.sort(
        (a, b) => a.parameter_info_type - b.parameter_info_type
      );
      let total = result.reduce((acc, next) => {
        return Math.abs(acc) + Math.abs(Number(next.parameter_info_money));
      }, 0);
      let list = {
        project_money: [
          {
            change_type: "未上报",
            change_history_project_money_all: Number(
              result[0].parameter_info_money
            ).toFixed(2),
            change_history_percent: result[0]
              ? Math.abs(
                  ((result[0].parameter_info_money * 100) / total).toFixed(2) *
                    1
                )
              : 0,
          },
          {
            change_type: "已上报未批复",
            change_history_project_money_all: Number(
              result[1].parameter_info_money
            ).toFixed(2),
            change_history_percent: result[0]
              ? Math.abs(
                  ((result[1].parameter_info_money * 100) / total).toFixed(2) *
                    1
                )
              : 0,
          },
          {
            change_type: "已上报已批复",
            change_history_project_money_all: Number(
              result[2].parameter_info_money
            ).toFixed(2),
            change_history_percent: result[0]
              ? Math.abs(
                  ((result[2].parameter_info_money * 100) / total).toFixed(2) *
                    1
                )
              : 0,
          },
        ],
      };
      this.list = [
        {
          val: list.project_money[0].change_history_percent || 0,
          name: this.textName[0],
          unit: "%",
        },
        {
          val: list.project_money[1].change_history_percent || 0,
          name: this.textName[1],
          unit: "%",
        },
        {
          val: list.project_money[2].change_history_percent || 0,
          name: this.textName[2],
          unit: "%",
        },
      ];
      this.datalist = list;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
