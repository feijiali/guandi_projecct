<template>
  <div class="h-100 w-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <nInfoTitle class="mb-2" title="考核明细" />
        <div v-if="info" class="layer-table-box">
          <table border="1" cellspacing="0" bordercolor="#dcdfe6">
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
                <tr :key="i">
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
        <div
          v-if="info && info.self_content"
          class="border1 p-1"
          v-html="info.self_content.assessor_content"
        ></div>
        <nInfoTitle class="mt-2 mb-2" title="考核明细" />
        <div v-if="info" class="layer-table-box">
          <table border="1" cellspacing="0" bordercolor="#dcdfe6">
            <thead>
              <tr>
                <th></th>
                <th class="text-left p-2">考核指标具体描述及评分标准</th>
                <th>满分</th>
                <template v-for="(item, index) in info.score">
                  <th
                    :key="index + 'b'"
                    v-if="item.score_type == 2 && item.score_info.length != 0"
                  >
                    {{ item.reviewer_account_name }}
                  </th>
                </template>
                <th>打分</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(items, i) in ration">
                <tr :key="i + 'a'">
                  <td
                    v-if="i == 0"
                    class="text-center"
                    :rowspan="ration.length"
                  >
                    定量指标（{{ items.assessor_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
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
                      v-if="
                        item.score_type == 2 &&
                        info.score.length &&
                        item.score_info.length != 0
                      "
                    >
                      <span v-if="item.score_info.length && item.arr1.length"
                        >**</span
                      >
                      <span v-else>--</span>
                    </td>
                  </template>
                  <td class="text-center" style="width: 80px">
                    <el-input-number
                      :disabled="loginPersonType == 1 ? false : true"
                      :precision="0"
                      v-model="items.assessor_score"
                      controls-position="right"
                      :min="0"
                      :max="items.evaluation_score"
                    ></el-input-number>
                  </td>
                </tr>
              </template>
              <template v-for="(items, i) in qualitative">
                <tr :key="i + 'b'">
                  <td
                    v-if="i == 0"
                    class="text-center"
                    :rowspan="qualitative.length"
                  >
                    定性指标（{{ items.assessor_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
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
                      v-if="
                        item.score_type == 2 &&
                        info.score.length &&
                        item.score_info.length != 0
                      "
                    >
                      <!-- {{ item.arr2[i].assessor_score }} -->
                      <span v-if="item.score_info.length && item.arr2.length"
                        >**</span
                      >
                      <span v-else>--</span>
                    </td>
                  </template>
                  <td class="text-center" style="width: 80px">
                    <el-input-number
                      :disabled="loginPersonType == 2 ? false : true"
                      :precision="0"
                      v-model="items.assessor_score"
                      controls-position="right"
                      :min="0"
                      :max="items.evaluation_score"
                    ></el-input-number>
                  </td>
                </tr>
              </template>
              <template v-for="(items, i) in superiorRating">
                <tr :key="i + 'c'">
                  <td
                    v-if="i == 0"
                    class="text-center"
                    :rowspan="superiorRating.length"
                  >
                    上级评分（{{ items.assessor_weight }}%）
                  </td>
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
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
                      v-if="
                        item.score_type == 2 &&
                        info.score.length &&
                        item.score_info.length != 0
                      "
                    >
                      <!-- {{ item.arr3[i].assessor_score }} -->
                      <span v-if="item.score_info.length && item.arr3.length"
                        >**</span
                      >
                      <span v-else>--</span>
                    </td>
                  </template>
                  <td class="text-center" style="width: 80px">
                    <el-input-number
                      :disabled="loginPersonType == 3 ? false : true"
                      :precision="0"
                      v-model="items.assessor_score"
                      controls-position="right"
                      :min="0"
                      :max="items.evaluation_score"
                    ></el-input-number>
                  </td>
                </tr>
              </template>
              <tr>
                <td class="text-center">满分</td>
                <td>
                  <div class="table-w"></div>
                </td>
                <td class="text-center">100</td>
                <template v-for="(item, index) in info.score">
                  <th
                    :key="index + 'b'"
                    v-if="item.score_type == 2 && item.score_info.length != 0"
                  >
                    <!-- {{ item.total_score }} -->
                    <span>**</span>
                  </th>
                </template>
                <td class="text-center" style="padding-right: 34px">
                  {{ score_sum }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="考评描述" />
        <div v-if="info">
          <div class="layer-table-box">
            <table border="1" cellspacing="0" bordercolor="#dcdfe6">
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
                        <span>{{ item.reviewer_account_name }}：</span>
                        <span
                          class="flex text-left"
                          v-html="items.assessor_content"
                        >
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </table>
          </div>
        </div>
        <div class="mt-1">
          <el-input
            style="width: 100%"
            v-model="ruleform.content.assessor_content"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
          />
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
import throttle from "@/mixins/throttle";
import { Loading } from "element-ui";
export default {
  mixins: [confirm, throttle],
  data() {
    return {
      title: "",
      ruleform: {
        assessor_id: 0,
        assessor_evaluation_type: 2,
        score_info: [],
        content: {
          assessor_content_id: 0,
          assessor_content_assessor_id_union: 0,
          assessor_content_basic_id_union: 0,
          assessor_content_type: 0,
          assessor_content: "",
          assessor_content_account_id_union: 0,
        },
      },
      info: null,
      ration: [],
      superiorRating: [], // 上级评分
      qualitative: [],
      loading: null,
      loginPersonType: null, //登录者的类型
      reviewer_id_un: null,
      assessor_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  computed: {
    score_sum() {
      let scoreArr = [
        ...this.ration,
        ...this.qualitative,
        ...this.superiorRating,
      ];
      return scoreArr
        .reduce((acc, next) => {
          return (
            acc +
            (isNaN(Number(next.assessor_score))
              ? 0
              : Number(next.assessor_score))
          );
        }, 0)
        .toFixed(2);
    },
  },

  async mounted() {
    this.ruleform.assessor_id = this.assessor_id;
    this.loading = Loading.service({
      text: "拼命加载中",
    });
    await this.queryPerformanceAssessor();
  },
  methods: {
    // 查询考核信息
    async queryPerformanceAssessor() {
      let res = await api.queryPerformanceAssessor({
        assessor_id: this.ruleform.assessor_id,
      });
      if (this.loading) {
        this.loading.close();
      }
      this.info = res.result[0];
      if (!this.info) {
        return;
      }
      this.title = "考评" + this.info.assessor_name;

      let scoreList = this.info.score;
      let evaluationList = this.info.evaluation;
      let loginPersonType;
      for (let i = 0; i < scoreList.length; i++) {
        if (
          scoreList[i].reviewer_account_id_union ==
            this.$store.getters.account_id &&
          !scoreList[i].score_info.length
        ) {
          loginPersonType = scoreList[i].reviewer_type;
          this.loginPersonType = loginPersonType;
          this.reviewer_id_un = scoreList[i].reviewer_id;
          break;
        }
      }
      this.ration = this.info.evaluation
        .filter(
          (item) =>
            item.evaluation_type == 1 &&
            (loginPersonType == 1 ||
              loginPersonType == 3 ||
              loginPersonType == 2)
        )
        .map((item) => ({
          assessor_score_id: 0,
          assessor_score_reviewer_id_un: this.reviewer_id_un,
          assessor_weight: item.evaluation_weight,
          assessor_score_assess_id_union: 0,
          assessor_score_basic_id_union: 0,
          assessor_score_evaluation_id_union: item.evaluation_id,
          evaluation_desc: item.evaluation_desc,
          evaluation_score: item.evaluation_score,
          assessor_score_type: 2,
          assessor_score_account_id_union: 0,
          assessor_score: undefined,
        }));
      this.qualitative = this.info.evaluation
        .filter(
          (item) =>
            item.evaluation_type == 2 &&
            (loginPersonType == 2 || loginPersonType == 3)
        )
        .map((item) => ({
          assessor_score_id: 0,
          assessor_score_reviewer_id_un: this.reviewer_id_un,
          assessor_weight: item.evaluation_weight,
          assessor_score_assess_id_union: 0,
          assessor_score_basic_id_union: 0,
          assessor_score_evaluation_id_union: item.evaluation_id,
          evaluation_desc: item.evaluation_desc,
          evaluation_score: item.evaluation_score,
          assessor_score_type: 2,
          assessor_score_account_id_union: 0,
          assessor_score: undefined,
        }));
      this.superiorRating = this.info.evaluation
        .filter((item) => item.evaluation_type == 3 && loginPersonType == 3)
        .map((item) => ({
          assessor_score_id: 0,
          assessor_score_reviewer_id_un: this.reviewer_id_un,
          assessor_weight: item.evaluation_weight,
          assessor_score_assess_id_union: 0,
          assessor_score_basic_id_union: 0,
          assessor_score_evaluation_id_union: item.evaluation_id,
          evaluation_desc: item.evaluation_desc,
          evaluation_score: item.evaluation_score,
          assessor_score_type: 3,
          assessor_score_account_id_union: 0,
          assessor_score: undefined,
        }));
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
                itemobj.evaluation_type == 1 &&
                (loginPersonType == 1 ||
                  loginPersonType == 3 ||
                  loginPersonType == 2)
              ) {
                // 定量
                arr1.push(items);
              } else if (
                itemobj.evaluation_id ==
                  items.assessor_score_evaluation_id_union &&
                itemobj.evaluation_type == 2 &&
                (loginPersonType == 3 || loginPersonType == 2)
              ) {
                // 定性
                arr2.push(items);
              } else if (
                itemobj.evaluation_id ==
                  items.assessor_score_evaluation_id_union &&
                itemobj.evaluation_type == 3 &&
                loginPersonType == 3
              ) {
                // 上级
                arr3.push(items);
              }
            });
          });
        }
        this.$set(this.info.score[index], "arr1", arr1);
        this.$set(this.info.score[index], "arr2", arr2);
        this.$set(this.info.score[index], "arr3", arr3);
      });
    },
    submitFun() {
      this.throttle();
      let ind1 = this.ration.findIndex(
        (item) => item.assessor_score == undefined
      );
      if (ind1 != -1 && this.ration.length > 0 && this.loginPersonType == 1) {
        this.$tip({
          isTip: true,
          message: `请填写第${ind1 + 1}条定量指标`,
        });
        return;
      }
      let ind2 = this.qualitative.findIndex((item) => {
        return item.assessor_score == undefined;
      });
      if (
        ind2 != -1 &&
        this.qualitative.length > 0 &&
        this.loginPersonType == 2
      ) {
        this.$tip({
          isTip: true,
          message: `请填写第${ind2 + 1}条定性指标`,
        });
        return;
      }
      let ind3 = this.superiorRating.findIndex((item) => {
        return item.assessor_score == undefined;
      });
      if (
        ind3 != -1 &&
        this.superiorRating.length > 0 &&
        this.loginPersonType == 3
      ) {
        this.$tip({
          isTip: true,
          message: `请填写第${ind3 + 1}条上级评分`,
        });
        return;
      }
      if (this.ruleform.content.assessor_content == "") {
        this.$tip({
          isTip: true,
          message: "请填写考评描述",
        });
        return;
      }
      this.ruleform.content.assessor_content_reviewer_id_un = this.reviewer_id_un;
      if (this.loginPersonType == 1) {
        this.ruleform.score_info = [...this.ration];
      } else if (this.loginPersonType == 2) {
        this.ruleform.score_info = [...this.qualitative];
      } else if (this.loginPersonType == 3) {
        this.ruleform.score_info = [...this.superiorRating];
      }
      api.uploadPerformanceAssessorEvaluation(this.ruleform).then(() => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$store.dispatch(
              "app/set_read",
              Number(this.$store.getters.account_id)
            );
            this.$router.go(-1);
          },
        });
      });
    },
    removelist(ind) {
      this.ruleform.list.splice(ind, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--small.is-circle {
  padding: 5px;
}
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #5a5efd;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}
.el-button--info,
.el-button--info:focus,
.el-button--info:hover {
  background-color: #8a8ba6;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}
</style>
