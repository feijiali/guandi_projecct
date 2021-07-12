<template>
  <div class="h-100 w-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <nInfoTitle class="mb-2" title="考核明细" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <thead>
              <tr>
                <th></th>
                <th class="text-left p-2">考核指标具体描述及评分标准</th>
                <th>分值</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, i) in ration">
                <tr :key="i + 'c'">
                  <td
                    class="text-center table-left"
                    v-if="i == 0"
                    :rowspan="ration.length"
                  >
                    定量指标（{{ item.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
                      <div class="table-wt" v-html="item.evaluation_desc"></div>
                    </div>
                  </td>
                  <td class="text-center">{{ item.evaluation_score }}</td>
                </tr>
              </template>
              <template v-for="(item, i) in qualitative">
                <tr :key="i + 'd'">
                  <td
                    class="text-center table-left"
                    v-if="i == 0"
                    :rowspan="qualitative.length"
                  >
                    定性指标（{{ item.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
                      <div class="table-wt" v-html="item.evaluation_desc"></div>
                    </div>
                  </td>
                  <td class="text-center">{{ item.evaluation_score }}</td>
                </tr>
              </template>
              <template v-for="(item, i) in superiorRating">
                <tr :key="i + 'j'">
                  <td
                    class="text-center table-left"
                    v-if="i == 0"
                    :rowspan="superiorRating.length"
                  >
                    上级评分（{{ item.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
                      <div class="table-wt" v-html="item.evaluation_desc"></div>
                    </div>
                  </td>
                  <td class="text-center">{{ item.evaluation_score }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考核基础信息" />

        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <tbody>
              <tr>
                <td class="text-center table-left">考核类型</td>
                <td class="text-left p-2">
                  {{ ["", "年度考核", "季度考核"][info.basic_type] }}
                </td>
              </tr>
              <tr>
                <td class="text-center table-left">考核时间</td>
                <td class="text-left p-2">
                  {{ info.basic_year }}年
                  {{
                    ["", "第一季度", "第二季度", "第三季度", "第四季度"][
                      info.basic_quarter
                    ]
                  }}
                </td>
              </tr>
              <tr>
                <td class="text-center table-left">考核有效期</td>
                <td class="text-left p-2">
                  {{ info.basic_end_time }}
                </td>
              </tr>
              <tr>
                <td class="text-center table-left">考核范围</td>
                <td class="text-left p-2">
                  {{ info.organ }}
                </td>
              </tr>
              <tr v-if="account_list.length > 0">
                <td class="text-center table-left">
                  <span title="不参与的考核人员">其他选择</span>
                </td>
                <td class="text-left p-2">
                  {{ account_list.join("、") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考核人信息" />

        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <tbody>
              <tr>
                <td class="text-center table-left">考核责任人</td>
                <td class="text-left p-2">
                  {{ info.principal_account_name }}
                </td>
              </tr>
              <tr v-if="reviewer1.length > 0">
                <td class="text-center table-left">直属上级</td>
                <td class="text-left p-2">
                  {{ reviewer1.join("、") }}
                </td>
              </tr>
              <tr v-if="reviewer2.length > 0">
                <td class="text-center table-left">考核组</td>
                <td class="text-left p-2">
                  {{ reviewer2.join("、") }}
                </td>
              </tr>
              <tr v-if="reviewer3.length > 0">
                <td class="text-center table-left">上级领导</td>
                <td class="text-left p-2">
                  {{ reviewer3.join("、") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考评规则" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <tbody>
              <template v-for="(item, i) in info.rank_rules">
                <tr :key="i">
                  <td class="text-center table-left">
                    {{ item.rank_rules_level }}
                  </td>
                  <td class="text-left p-2">
                    {{ item.rank_rules_min }}分 ~ {{ item.rank_rules_max }}分
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </n-scroll>
    </div>
  </div>
</template>

<script>
import api from "@/api/enterprise/oa/account/performance";
export default {
  data() {
    return {
      title: "考核规则详情",
      info: {},
      ration: [], // 定量指标
      qualitative: [], // 定性指标
      superiorRating: [], // 上级评分
      reviewer1: [], // 直属领导
      reviewer2: [], // 考核组
      reviewer3: [], // 上级领导
      account_list: [], // 不参与考核的人员
      basic_id:this.$route.query.id &&parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async created() {
    await this.queryPerformanceBasicList();
  },
  methods: {
    queryPerformanceBasicList() {
      return api
        .queryPerformanceBasicInfo({
          basic_id: this.basic_id,
        })
        .then((res) => {
          this.info = res.result[0];
          this.ration = this.info.evaluation.filter(
            (item) => item.evaluation_type == 1
          );
          this.qualitative = this.info.evaluation.filter(
            (item) => item.evaluation_type == 2
          );
          this.superiorRating = this.info.evaluation.filter(
            (item) => item.evaluation_type == 3
          );
          this.reviewer1 = this.info.reviewer
            .filter((item) => item.reviewer_type == 1)
            .map((item) => {
              return `${item.reviewer_account_name}（权重${item.reviewer_weights}%）`;
            });
          this.reviewer2 = this.info.reviewer
            .filter((item) => item.reviewer_type == 2)
            .map((item) => {
              return `${item.reviewer_account_name}（权重${item.reviewer_weights}%）`;
            });
          this.reviewer3 = this.info.reviewer
            .filter((item) => item.reviewer_type == 3)
            .map((item) => {
              return `${item.reviewer_account_name}（权重${item.reviewer_weights}%）`;
            });
          this.account_list = this.info.not_join_account_list.map(
            (item) => item.account_name
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-left {
  width: 160px;
}
</style>
