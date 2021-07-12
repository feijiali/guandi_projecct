<template>
  <div class="w-100 h-100">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div style="height: calc(100% - 90px)" class="p-2 rounded-1 bg-white">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <el-select
              v-model="ruleform.plan_schedule_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="选择月份：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.plan_schedule_month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <div class="clear mgt40" v-for="(item, index) in subArr" :key="index">
            <el-form-item class="form-item-long-small must" label="章节类型：">
              <el-select
                class="input-m"
                v-model="item.plan_schedule_type"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in chapterBox"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="计划产值：">
              <num-input
                :negative="true"
                v-model="item.plan_schedule_plan_value"
                :fixedNum="2"
                unit="万元"
                placeholder="请输入"
              ></num-input>
              <!-- <el-input
                class="input-m input-append"
                v-model="item.plan_schedule_plan_value"
                placeholder="请输入"
              >
                <span slot="append">万元</span>
              </el-input> -->
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="实际产值：">
              <!-- <el-input
                class="input-m input-append"
                v-model="item.plan_schedule_finish_value"
                placeholder="请输入"
              >
                <span slot="append">万元</span>
              </el-input> -->
              <num-input
                :negative="true"
                v-model="item.plan_schedule_finish_value"
                :fixedNum="2"
                unit="万元"
                placeholder="请输入"
              ></num-input>
              <div
                v-if="!$route.query.plan_schedule_id && index == 0"
                class="d-inline-block add-circle-btn ml-1"
                @click="addParam"
              >
                +
              </div>
              <div
                v-if="subArr.length > 1 && index > 0"
                class="d-inline-block add-circle-btn ml-1"
                @click="removeParam(index)"
              >
                -
              </div>
            </el-form-item>
          </div>
        </el-form>
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
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        plan_schedule_month: "",
        plan_schedule_organ_id_un: "",
      },
      subArr: [
        {
          plan_schedule_id: 0,
          plan_schedule_organ_id_un: "",
          plan_schedule_month: "",
          plan_schedule_sub_account_id_un: this.$store.getters.account_id,
          plan_schedule_sub_time: "",
          plan_schedule_type: "",
          plan_schedule_plan_value: "",
          plan_schedule_finish_value: "",
        },
      ],
      chapterBox: [
        { type: "第100章", id: 100 },
        { type: "第200章", id: 200 },
        { type: "第300章", id: 300 },
        { type: "第400章", id: 400 },
        { type: "第500章", id: 500 },
        { type: "第600章", id: 600 },
        { type: "第700章", id: 700 },
      ],
      formValidation: [
        {
          must: ["plan_schedule_organ_id_un", "plan_schedule_month"],
          tip: ["请选择工程项目", "请选择月份"],
        },
      ],
      editData: [],
      projectListSelect: [], //工程项目
      stop: false,
    };
  },

  computed: {
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
  },
  async created() {
    this.getOrganProjectData();
    if (this.$route.query.plan_schedule_id) {
      this.title = "修改计划进度";

      this.queryProjectInfoPlanScheduleList();
    } else {
      this.title = "上报计划进度";
      this.ruleform.plan_schedule_organ_id_un = parseInt(
        this.Base64.decode(this.$route.query.id)
      );
    }
  },
  methods: {
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : 0,
      });
      this.projectListSelect = result;
    },
    //添加
    addParam() {
      this.subArr.push({
        plan_schedule_id: 0,
        plan_schedule_organ_id_un: "",
        plan_schedule_month: "",
        plan_schedule_sub_account_id_un: this.$store.getters.account_id,
        plan_schedule_sub_time: "",
        plan_schedule_type: "",
        plan_schedule_plan_value: "",
        plan_schedule_finish_value: "",
      });
    },
    //移除
    removeParam(index) {
      this.subArr.splice(index, 1);
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.plan_schedule_organ_id_un = node.node.organ_id;
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      this.subArr.forEach((item) => {
        item.plan_schedule_organ_id_un =
          this.ruleform.plan_schedule_organ_id_un;
        item.plan_schedule_month = this.ruleform.plan_schedule_month;
        item.plan_schedule_sub_time = this.getNowFormatDate;
        item.plan_schedule_sub_account_id_un = Number(
          item.plan_schedule_sub_account_id_un
        );
        item.plan_schedule_plan_value = item.plan_schedule_plan_value * 1.0;
        item.plan_schedule_finish_value = item.plan_schedule_finish_value * 1.0;
      });
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (this.$route.query.plan_schedule_id) {
          if (!this.subArr[0].plan_schedule_type) {
            this.$tip({
              isTip: true,
              message: "请选择章节类型！",
            });
            return;
          }
          if (!this.subArr[0].plan_schedule_plan_value) {
            this.$tip({
              isTip: true,
              message: "请输入计划产值！",
            });
            return;
          }
          if (!this.subArr[0].plan_schedule_finish_value) {
            this.$tip({
              isTip: true,
              message: "请输入实际产值！",
            });
            return;
          }
        }
        if (!this.$route.query.plan_schedule_id) {
          for (let i = 0, len = this.subArr.length; i < len; i++) {
            if (!this.subArr[i].plan_schedule_type) {
              this.$tip({
                isTip: true,
                message: "请选择章节类型！",
              });
              return;
            }
            if (!this.subArr[i].plan_schedule_plan_value) {
              this.$tip({
                isTip: true,
                message: "请输入计划产值！",
              });
              return;
            }
            if (!this.subArr[i].plan_schedule_finish_value) {
              this.$tip({
                isTip: true,
                message: "请输入实际产值！",
              });
              return;
            }
          }
        }
        this.submitAllData();
      }
    },
    async submitAllData() {
      if (!this.$route.query.plan_schedule_id) {
        let res = await api.uploadProjectInfoPlanSchedule(this.subArr);
      } else {
        this.subArr[0].plan_schedule_id = Number(
          this.$route.query.plan_schedule_id
        );
        let res = await api.updateProjectInfoPlanSchedule(this.subArr[0]);
      }
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    async queryProjectInfoPlanScheduleList() {
      let data = await api.queryProjectInfoPlanScheduleList({
        plan_schedule_id: Number(this.$route.query.plan_schedule_id),
      });
      this.editData = data.result[0];
      const json = ["plan_schedule_month", "plan_schedule_organ_id_un"];
      const json2 = [
        "plan_schedule_id",
        "plan_schedule_type",
        "plan_schedule_plan_value",
        "plan_schedule_finish_value",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, this.editData);
      this.$utils.renderRuleForm(this, json2, this.subArr[0], this.editData);
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont.iconfont-add {
  font-size: 26px !important;
}
.inspection-content {
  display: inline-block;
  width: 500px;
  vertical-align: text-top;
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
