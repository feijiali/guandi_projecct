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
            <tbody>
              <tr>
                <td
                  class="text-center"
                  :rowspan="info.self_job_contents.length + 1"
                >
                  个人工作写实
                </td>
                <td class="p-2">
                  完成主要工作情况(写明完成项目、时间、质量和效果等)
                </td>
              </tr>
              <template v-for="(item, i) in info.self_job_contents">
                <tr :key="i + 'a'">
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
                      <div
                        class="table-wt"
                        v-html="item.assessor_content"
                      ></div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="自我评价" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <tbody>
              <tr>
                <td class="text-left" style="width: 200px">
                  <div
                    class="p-2"
                    v-if="info.self_content"
                    v-html="info.self_content.assessor_content"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考核明细" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <thead>
              <tr>
                <th></th>
                <th class="text-left p-2">考核指标具体描述及评分标准</th>
                <th>满分</th>
                <template v-for="(item, index) in info.score">
                  <th :key="index + 'b'" v-if="item.score_type != 1">
                    {{ item.reviewer_account_name }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <template v-for="(items, indexs) in evaluationArr1">
                <tr :key="indexs + 'c'">
                  <td
                    class="text-center"
                    v-if="indexs == 0"
                    :rowspan="evaluationArr1.length"
                  >
                    定量指标（{{ items.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ indexs + 1 }}、</div>
                      <div
                        class="table-wt"
                        v-html="items.evaluation_desc"
                      ></div>
                    </div>
                  </td>
                  <td class="text-center">{{ items.evaluation_score }}</td>
                  <template v-for="(item, index) in info.score">
                    <td
                      class="text-center"
                      :key="index + 'c'"
                      v-if="item.score_type != 1 && info.score.length"
                    >
                      <span v-if="item.score_info.length && item.arr1.length">
                        {{ item.arr1[indexs].assessor_score }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-for="(items, indexs) in evaluationArr2">
                <tr :key="indexs + 'd'">
                  <td
                    class="text-center"
                    v-if="indexs == 0"
                    :rowspan="evaluationArr2.length"
                  >
                    定性指标（{{ items.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ indexs + 1 }}、</div>
                      <div
                        class="table-wt"
                        v-html="items.evaluation_desc"
                      ></div>
                    </div>
                  </td>
                  <td class="text-center">{{ items.evaluation_score }}</td>
                  <template v-for="(item, index) in info.score">
                    <td
                      class="text-center"
                      :key="index + 'e'"
                      v-if="item.score_type != 1 && info.score.length"
                    >
                      <span v-if="item.score_info.length && item.arr2.length">
                        {{ item.arr2[indexs].assessor_score }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-for="(items, indexs) in evaluationArr3">
                <tr :key="indexs + 'j'">
                  <td
                    class="text-center"
                    v-if="indexs == 0"
                    :rowspan="evaluationArr3.length"
                  >
                    上级评分（{{ items.evaluation_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ indexs + 1 }}、</div>
                      <div
                        class="table-wt"
                        v-html="items.evaluation_desc"
                      ></div>
                    </div>
                  </td>
                  <td class="text-center">{{ items.evaluation_score }}</td>
                  <template v-for="(item, index) in info.score">
                    <td
                      class="text-center"
                      :key="index + 'e'"
                      v-if="item.score_type != 1"
                    >
                      <span v-if="item.score_info.length && item.arr3.length">
                        {{ item.arr3[indexs].assessor_score }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </template>
                </tr>
              </template>
              <tr>
                <td class="text-center">总分</td>
                <td></td>
                <td class="text-center">100</td>
                <template v-for="(item, index) in info.score">
                  <td
                    class="text-center"
                    :key="index + 'f'"
                    v-if="item.score_type != 1"
                  >
                    <span
                      v-if="
                        item.score_info.length && index != info.score.length - 1
                      "
                    >
                      {{ item.total_score }}
                    </span>
                    <span v-else-if="index == info.score.length - 1">
                      {{ info.assessor_avg_score }}
                    </span>
                    <span v-else>--</span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考评描述" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" borderColor="#dcdfe6">
            <template v-for="(item, index) in info.score">
              <tr
                :key="index + 'g'"
                v-if="
                  item.score_type != 1 &&
                  index != info.score.length - 1 &&
                  item.reviewer_contents.length
                "
              >
                <td>
                  <div
                    class="table-w"
                    v-for="(items, indexs) in item.reviewer_contents"
                    :key="indexs + 'h'"
                  >
                    <div class="table-wt dis-flex">
                      <span>{{ item.reviewer_account_name }}：</span
                      ><span class="flex text-left">{{
                        items.assessor_content
                      }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </n-scroll>
    </div>
  </div>
</template>


<script>
import api from "@/api/enterprise/oa/account/performance";
import { hasPermissionArr } from "@/plugins/permission_tools.js";

export default {
  data() {
    return {
      title: "考核详情",
      account_id: this.$store.getters.account_id,
      info: {
        self_job_contents: [],
        score: [],
        level_list: [],
        evaluation: [],
      },
      assessor_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      evaluationArr1: [], // 定量
      evaluationArr2: [], // 定性
      evaluationArr3: [], // 上级
    };
  },
  created() {},
  mounted() {
    this.queryPerformanceAssessor();
  },
  methods: {
    hasPermissionArr: hasPermissionArr,
    async queryPerformanceAssessor() {
      let res = await api.queryPerformanceAssessor({
        assessor_id: this.assessor_id,
      });
      this.info = res.result[0];
      let evaluationList = this.info.evaluation;
      let scoreList = this.info.score;
      this.title = this.info.assessor_name + "的考核详情";
      this.evaluationArr1 = evaluationList.filter(
        (item) => item.evaluation_type == 1
      );
      this.evaluationArr2 = evaluationList.filter(
        (item) => item.evaluation_type == 2
      );
      this.evaluationArr3 = evaluationList.filter(
        (item) => item.evaluation_type == 3
      );
      scoreList.forEach((item, index) => {
        let arr1 = [],
          arr2 = [],
          arr3 = [];
        if (item.score_info.length) {
          item.score_info.forEach((items) => {
            evaluationList.forEach((itemobj) => {
              if (
                itemobj.evaluation_id ==
                  items.assessor_score_evaluation_id_union &&
                itemobj.evaluation_type == 1
              ) {
                // 定量
                arr1.push(items);
              } else if (
                itemobj.evaluation_id ==
                  items.assessor_score_evaluation_id_union &&
                itemobj.evaluation_type == 2
              ) {
                // 定性
                arr2.push(items);
              } else if (
                itemobj.evaluation_id ==
                  items.assessor_score_evaluation_id_union &&
                itemobj.evaluation_type == 3
              ) {
                // 上级
                arr3.push(items);
              }
            });
          });
        }
        // let ration_ids=  this.ration.map(item=>item.assessor_score_evaluation_id_union)
        // let qualitative_ids=  this.qualitative.map(item=>item.assessor_score_evaluation_id_union)
        // let superiorRating_ids=  this.superiorRating.map(item=>item.assessor_score_evaluation_id_union)
        // arr1 = arr1.sort((acc,next)=>{
        //   return ration_ids.infdexOf(acc.assessor_score_evaluation_id_union) - ration_ids.infdexOf(next.assessor_score_evaluation_id_union)
        // })
        // arr2 = arr2.sort((acc,next)=>{
        //   return ration_ids.infdexOf(acc.assessor_score_evaluation_id_union) - ration_ids.infdexOf(next.assessor_score_evaluation_id_union)
        // })
        // arr3 = arr3.sort((acc,next)=>{
        //   return ration_ids.infdexOf(acc.assessor_score_evaluation_id_union) - ration_ids.infdexOf(next.assessor_score_evaluation_id_union)
        // })
        this.$set(this.info.score[index], "arr1", arr1);
        this.$set(this.info.score[index], "arr2", arr2);
        this.$set(this.info.score[index], "arr3", arr3);
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
