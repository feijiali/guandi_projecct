<template>
  <div class="h-100 w-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <nInfoTitle class="mb-2" title="考核明细" />
        <div class="layer-table-box">
          <table border="1" cellspacing="0" bordercolor="#dcdfe6">
            <tbody>
              <tr>
                <td
                  class="text-center"
                  :rowspan="ruleform.self_job_contents.length + 1"
                >
                  个人工作写实
                  <div
                    class="d-inline-block add-circle-btn"
                    @click.stop="addlist"
                  >
                    +
                  </div>
                </td>
                <td class="p-2">
                  完成主要工作情况(写明完成项目、时间、质量和效果等)
                </td>
                <td class="text-center">增减项</td>
              </tr>
              <template v-for="(item, i) in ruleform.self_job_contents">
                <tr :key="i">
                  <td>
                    <div class="table-w">
                      <div class="table-wl">{{ i + 1 }}、</div>
                      <el-input
                        class="table-wt"
                        rows="1"
                        v-model="item.assessor_content"
                        type="textarea"
                      />
                      <!-- <vDivEditor class="table-wt" v-model="item.assessor_content" /> -->
                    </div>
                  </td>
                  <td class="text-center">
                    <el-button
                      v-if="i != 0"
                      size="small"
                      type="info"
                      icon="el-icon-close"
                      circle
                      @click.stop="removelist(i)"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <nInfoTitle class="mt-2 mb-2" title="自我评价" />
        <div>
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

export default {
  mixins: [confirm, throttle],
  data() {
    return {
      title: "自我考评",
      ruleform: {
        assessor_id: 0,
        assessor_evaluation_type: 1,
        self_job_contents: [
          {
            assessor_content_id: 0,
            assessor_content_assessor_id_union: 0,
            assessor_content_basic_id_union: 0,
            assessor_content_type: 1,
            assessor_content: "",
            assessor_content_account_id_union: 0,
          },
          {
            assessor_content_id: 0,
            assessor_content_assessor_id_union: 0,
            assessor_content_basic_id_union: 0,
            assessor_content_type: 1,
            assessor_content: "",
            assessor_content_account_id_union: 0,
          },
          {
            assessor_content_id: 0,
            assessor_content_assessor_id_union: 0,
            assessor_content_basic_id_union: 0,
            assessor_content_type: 1,
            assessor_content: "",
            assessor_content_account_id_union: 0,
          },
        ],
        content: {
          assessor_content_id: 0,
          assessor_content_assessor_id_union: 0,
          assessor_content_basic_id_union: 0,
          assessor_content_type: 2,
          assessor_content: "",
          assessor_content_account_id_union: 0,
        },
      },
      assessor_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  computed: {},
  async created() {
    this.ruleform.assessor_id = this.assessor_id;
    if (this.$route.query.edit) {
      this.queryPerformanceAssessor();
    }
  },
  methods: {
    async queryPerformanceAssessor() {
      let res = await api.queryPerformanceAssessor({
        assessor_id: this.ruleform.assessor_id,
      });
      this.ruleform.self_job_contents = res.result[0].self_job_contents;
      this.ruleform.content = res.result[0].self_content;
    },
    submitFun() {
      this.throttle();
      let index = this.ruleform.self_job_contents.findIndex(
        (item) => item.assessor_content == ""
      );
      if (index > -1) {
        this.$tip({
          isTip: true,
          message: `请填写第${index + 1}条工作情况`,
        });
        return;
      }
      if (this.ruleform.content.assessor_content == "") {
        this.$tip({
          isTip: true,
          message: `请填写自我评价`,
        });
        return;
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
    addlist() {
      this.ruleform.self_job_contents.push({
        assessor_content_id: 0,
        assessor_content_assessor_id_union: 0,
        assessor_content_basic_id_union: 0,
        assessor_content_type: 1,
        assessor_content: "",
        assessor_content_account_id_union: 0,
      });
    },
    removelist(ind) {
      this.ruleform.self_job_contents.splice(ind, 1);
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
