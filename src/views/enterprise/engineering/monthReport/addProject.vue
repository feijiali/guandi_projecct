<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" :selfControl="true" @back="goback" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2 pr-2">
      <div style="height: calc(100% - 40px);">
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
          <div class="d-flex justify-content-between">
            <div style="width:400px">
              <RulesTable
                ref="rulesTable1"
                title="工程项目"
                :propLable="propLable"
                class="border"
                :list="tableData.slice(0, 18)"
              />
            </div>
            <div style="width:400px" v-if="tableData.length > 18">
              <RulesTable
                ref="rulesTable2"
                title="工程项目"
                :propLable="propLable"
                class="border"
                :list="tableData.slice(18, 36)"
              />
            </div>
            <div style="width:400px" v-if="tableData.length > 36">
              <RulesTable
                ref="rulesTable3"
                title="工程项目"
                :propLable="propLable"
                class="border"
                :list="tableData.slice(36, 54)"
              />
            </div>
          </div>
        </n-scroll>
      </div>
      <el-pagination
        background
        class="text-left bg-secondary"
        layout="prev, pager, next"
        :page-size="54"
        :current-page.sync="currentPage"
        :total="list.length"
      ></el-pagination>
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
import api from '@/api/index';
import confirm from '@/mixins/confirm';
import RulesTable from '@/components/RulesTable/RulesTable';
import dayjs from 'dayjs';
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  components: {
    RulesTable
  },
  mixins: [confirm],
  data() {
    return {
      title: '设置项目联动管理列表展示规则',
      ruleform: {
        line_list: [],
        account_id: Number(this.$store.getters.account_id)
      },
      list: [],
      currentPage: 1,
      propLable: {
        name: 'linkage_project_name',
        checked: 'checked',
        children: 'children'
      },
      search_time:"",
      navs: ['添加工程项目', '添加表头管理'],
      activeIn: 0
    };
  },
  computed: {
    tableData() {
      return this.list.slice(
        (this.currentPage - 1) * 54,
        this.currentPage * 54
      );
    }
  },
  async created() {
    let account_id = hasPermissionArr(["ProjectInfoProjectLinkage-ordinary"])? Number(this.$store.getters.account_id): null;
    this.search_time = localStorage.getItem('monthReport_month')
      ? localStorage.getItem('monthReport_month')
      : dayjs().format('YYYY-MM');
    let { result } = await api.queryProjectLinkageRuleLineInfo({
      //领导层级只看发布
      linkage_project_state: hasPermissionArr(["ProjectInfoProjectLinkage-leader"])?1:null,
      search_time: this.search_time,
      rule_line_account_id_un: Number(this.$store.getters.account_id),
      project_linkage_create_account_id_un: account_id,
    });
    this.list = result.map(item => ({
      ...item,
      checked: item.rule_line_id == 0
    }));
  },
  methods: {
    goback() {
      this.$router.linkTo('enterprise_engineering_monthReport');
    },
    // 切换
    handelSwitchChange(ind) {
      // this.activeIn = ind;
      this.$router.linkTo('enterprise_engineering_monthReport_addHeader');
    },
    async submitFun() {
      let account_id = Number(this.$store.getters.account_id);
      this.ruleform.line_list = this.list.filter(item=>!item.checked).map(item => ({
        line_project_linkage_id_un: item.project_linkage_id,
        rule_line_account_id_un: account_id,
        search_time:this.search_time
      }));
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      await api.uploadProjectLinkageRuleLine(this.ruleform);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.goback();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
