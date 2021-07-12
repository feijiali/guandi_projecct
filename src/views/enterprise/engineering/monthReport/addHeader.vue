<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" :selfControl="true" @back="goback" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2 pr-2">
      <n-scroll>
        <div class="justify-content-start d-inline-flex align-items-center">
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
        <div class="clear">
          <div class="float-left" style="width: 360px">
            <h2>商务管理中心</h2>
            <RulesTable
              ref="rulesTable1"
              class="border"
              :list="rule_column_info1[0]"
            />
          </div>
          <div class="float-left mx-1" style="width: 400px">
            <h2>工程管理中心</h2>
            <RulesTable
              ref="rulesTable2"
              class="border"
              :list="rule_column_info1[1]"
            />
          </div>
          <div class="float-left" style="width: 300px">
            <h2>财务管理中心</h2>
            <RulesTable
              ref="rulesTable3"
              class="border"
              :list="rule_column_info1[2]"
            />
          </div>
          <div class="float-left mx-1" style="width: 360px">
            <h2>质量管理中心</h2>
            <RulesTable
              ref="rulesTable4"
              class="border"
              :list="rule_column_info1[3]"
            />
            <h2>风控管理中心</h2>
            <RulesTable
              ref="rulesTable5"
              class="border"
              :list="rule_column_info1[4]"
            />
          </div>
        </div>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import RulesTable from "@/components/RulesTable/RulesTable";
import businessList from "./column/business";
import engineeringList from "./column/engineering";
import financeList from "./column/finance";
import qualityList from "./column/quality";
import riskList from "./column/risk";
export default {
  mixins: [confirm],
  components: {
    RulesTable,
  },
  data() {
    return {
      title: "设置项目联动管理列表展示规则",
      ruleform: {
        column_project_linkage_id_un: 0,
        rule_column_account_id_un: Number(this.$store.getters.account_id),
        rule_column_info: "",
      },
      rules: {
        linkage_project_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
      },
      navs: ["添加工程项目", "添加表头管理"],
      rule_column_info1: [
        businessList,
        engineeringList,
        financeList,
        qualityList,
        riskList,
      ],
      riskList,
      activeIn: 1,
    };
  },
  async created() {
    let res = await api.queryProjectLinkageRuleColumn({
      rule_column_account_id_un: Number(this.$store.getters.account_id),
    });
    this.rule_column_info1 = res.result[0]
      ? JSON.parse(res.result[0].rule_column_info)
      : this.rule_column_info1;
      this.rule_column_info1[1][4].name =
        "截至去年12月累计审批完成产值（万元）";
      this.rule_column_info1[1][5].name =
        "本年度审批完成产值（万元）";
  },
  methods: {
    goback() {
      this.$router.linkTo("enterprise_engineering_monthReport");
    },
    // 切换 全部 已读 未读
    handelSwitchChange(ind) {
      // this.activeIn = ind;
      this.$router.linkTo("enterprise_engineering_monthReport_addProject");
    },
    async submitFun() {
      this.ruleform.rule_column_info = JSON.stringify(this.rule_column_info1);
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      await api.uploadProjectLinkageRuleColumn(this.ruleform);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.linkTo("enterprise_engineering_monthReport");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
