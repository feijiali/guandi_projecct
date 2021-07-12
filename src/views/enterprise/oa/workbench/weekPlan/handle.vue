<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long" label="图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long must" label="工作内容：">
            <el-input
              v-model="ruleform.plan_week_cur_work_info"
              type="textarea"
              placeholder="请输入"
              rows="10"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item class="form-item-long  must" label="下周计划：">
          <el-input
            v-model="ruleform.plan_week_next_work_info"
            type="textarea"
            placeholder="请输入"
            rows="10"
            class="el-textarea-box-long"
          ></el-input>
        </el-form-item> -->
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
import throttle from "@/mixins/throttle";
export default {
  mixins: [throttle],
  data() {
    return {
      title: "",
      ruleform: {
        plan_week_id: null,
        plan_week_cur_work_info: "",
        // plan_week_next_work_info: "",
        plan_week_pic_name: "",
        plan_week_pic_json: "",
        upload_plan_time: 0,
      },
      rules: {
        plan_week_cur_work_info: [
          {
            required: true,
            message: "请输入工作内容",
          },
        ],
        // plan_week_next_work_info: [
        //   {
        //     required: true,
        //     message: "请输入下周计划"
        //   }
        // ]
      },
      nextWeek: "", //上报下周目标时间
    };
  },
  async created() {
    if (this.$route.query.id) {
      this.title = "编辑每周计划";
      await this.QueryOAPlanWeek(
        parseInt(this.Base64.decode(this.$route.query.id))
      );
    } else {
      this.title = "新增每周计划";
    }
  },
  methods: {
    //编辑获取详情
    async QueryOAPlanWeek(plan_week_id) {
      let res = await api.QueryOAPlanWeek({
        plan_week_id: plan_week_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.$refs.pic_upload.setPicList(info.pic_list);
    },
    // 确认提交
    async submitFun() {
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.ruleform.plan_week_pic_name = picsjson.file;
      this.ruleform.plan_week_pic_json = picsjson.file_json;
      if (this.$route.query.id) {
        this.ruleform.plan_week_report_date =
          this.ruleform.plan_week_report_date;
      } else {
        if (this.$route.query.day == 0) {
          this.ruleform.upload_plan_time = Number(
            this.$utils.parseDate2Str(new Date(), "YYYYMMDD")
          );
        } else {
          this.ruleform.upload_plan_time = Number(
            this.$utils.parseDate2Str(this.$utils.fun_date(7), "YYYYMMDD")
          );
        }
      }
      // 先判断是否填写必填信息
      this.throttle();
      // return
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      this.submitAllData(this.ruleform);
    },
    async submitAllData(subdata) {
      await api[
        `${
          this.ruleform.plan_week_id ? "UpdateOAPlanWeek" : "UploadOAPlanWeek"
        }`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
