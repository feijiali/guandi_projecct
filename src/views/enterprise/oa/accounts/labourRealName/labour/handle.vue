<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工 区：">
            <el-select
              @change="chooseProject"
              v-model="ruleform.organ_id_union"
              placeholder="请选择工区"
            >
              <el-option
                v-for="item in work_areas"
                :key="item.organ_id"
                :value="item.organ_id"
                :label="
                  item.organ_parent_node_name
                    .split(',')
                    .slice(1, item.organ_parent_node_name.split(',').length)
                    .join('/')
                "
              >
                {{
                  item.organ_parent_node_name
                    .split(",")
                    .slice(1, item.organ_parent_node_name.split(",").length)
                    .join("/")
                }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="劳务单位：">
            <el-select
              v-model="ruleform.worker_labour"
              placeholder="请选择/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="item in labourData"
                :key="item.worker_labour"
                :label="item.worker_labour"
                :value="item.worker_labour"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="班组名称：">
            <el-select
              v-model="ruleform.worker_team_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamData"
                :key="item.team_id"
                :label="item.team"
                :value="item.team_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="人员姓名：">
            <el-input
              class="input-m"
              v-model="ruleform.account_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="人员性别：">
            <el-select v-model="ruleform.account_sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="身份证号：">
            <el-input
              class="input-m"
              v-model="ruleform.account_id_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="工种：">
            <el-select
              v-model="ruleform.account_job"
              placeholder="请选择/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="item in workerArr"
                :key="item.account_job"
                :label="item.account_job"
                :value="item.account_job"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="联系电话：">
            <el-input
              class="input-m"
              v-model="ruleform.account"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must position-relative"
            label="进场时间："
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.worker_enter_time"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="form-item-long-small must" label="人员状态：">
            <el-select v-model="ruleform.account_status" placeholder="请选择">
              <el-option
                v-for="(item, index) in statusArr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <template v-if="ruleform.account_status == 2">
            <el-form-item class="form-item-long-small" label="离场时间：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.worker_leave_time"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </template>
          <el-form-item class="form-item-long-small" label="基本工资：">
            <num-input
              :fixedNum="2"
              unit="元"
              :isString="true"
              v-model="ruleform.worker_salary"
              placeholder="请输入"
            >
            </num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="是否需要登录：">
            <el-radio-group
              v-model="ruleform.account_is_need_login"
              class="el-radio-group-home vertical-top"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="工资是否公司发放：">
            <el-radio-group
              v-model="ruleform.worker_public"
              class="el-radio-group-home vertical-top"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="上传头像：">
            <nPicUpload ref="pic_upload1" :length="1" :multiple="false" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload2" :length="3" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="3" />
          </el-form-item>
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
import upload from "@/mixins/upload";
export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      isShow: this.$route.meta.isProject,
      statusArr: ["在场", "离场"],
      teamData: [], //班组
      labourData: [], //劳务单位
      workerArr: [], //工种
      ruleform: {
        worker_id: null,
        worker_account_id_un: null,
        worker_labour: "",
        worker_team_id_un: null,
        worker_enter_time: null,
        worker_leave_time: this.$utils.parseDate2Str(new Date(), "YYYYMMDD"),
        worker_salary: "",
        worker_public: null,
        organ_id_union: null,
        account_name: "",
        account_sex: "",
        account_id_card: "",
        account_job: "",
        account: "",
        account_status: 1,
        account_is_need_login: null,
        account_pic: "",
        account_files_pic: "",
        account_files_pic_json: "",
        account_files: "",
        account_files_json: "",
      },
      rules: {
        organ_id_union: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        account_name: [
          {
            required: true,
            message: "请输入人员姓名",
          },
        ],
        account_sex: [
          {
            required: true,
            message: "请输入人员性别",
          },
        ],
        account_id_card: [
          {
            required: true,
            message: "请输入身份证号",
          },
          {
            pattern:
              /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
            message: "身份证号格式错误",
          },
        ],
        // account_job: [
        //   {
        //     required: true,
        //     message: "请选择/输入工种",
        //   },
        // ],
        account: [
          {
            required: true,
            message: "请输入联系电话",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
        worker_enter_time: [
          {
            required: true,
            message: "请选择进场时间",
          },
        ],
        worker_labour: [
          {
            required: true,
            message: "请选择/输入劳务单位",
          },
        ],
        worker_team_id_un: [
          {
            required: true,
            message: "请选择班组名称",
          },
        ],
        account_status: [
          {
            required: true,
            message: "请选择人员状态",
          },
        ],
      },
      work_areas: [], //工区
      worker_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    // 查询工程项目
    this.queryOrgan();
    // 查询劳务工人工种
    this.queryStaffWorkerJob();
    if (this.worker_id) {
      this.title = "编辑劳务人员";
      await this.QueryStaffWorker();
    } else {
      this.title = "新增劳务人员";
    }
  },
  methods: {
    // 查询项目下的项目
    async queryOrgan() {
      let res = await api.queryOrgan({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_type: 50,
      });
      this.work_areas = res.result;
    },
    //查询班组
    async QueryStaffTeam() {
      let data = await api.QueryStaffTeam({
        team_work_organ_id_union: this.ruleform.organ_id_union,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.teamData = data.result;
    },
    // 查询工种
    async queryStaffWorkerJob() {
      this.ruleform.account_job = "";
      let data = await api.queryStaffWorkerJob({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_id_union: this.ruleform.organ_id_union,
      });
      this.workerArr = data.result;
    },
    //查询劳务单位
    async QueryLabour() {
      let data = await api.QueryStaffWorkerLabour({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_id_union: this.ruleform.organ_id_union,
      });
      this.labourData = data.result;
    },
    // // 选择工程项目
    chooseProject(val) {
      this.ruleform.worker_team_id_un = null;
      this.ruleform.worker_labour = "";
      this.ruleform.account_job = "";
      // 查询劳务单位
      this.QueryLabour();
      // 查询班组
      this.QueryStaffTeam();
      // 查询劳务工人工种
      this.queryStaffWorkerJob();
    },
    // 查询劳务人员详情
    async QueryStaffWorker() {
      let data = await api.QueryStaffWorker({
        worker_id: this.worker_id,
      });
      let info = data.result[0];
      info.worker_leave_time = info.worker_leave_time
        ? "" + info.worker_leave_time
        : this.$utils.parseDate2Str(new Date(), "YYYYMMDD");
      info.worker_enter_time = info.worker_enter_time
        ? "" + info.worker_enter_time
        : this.$utils.parseDate2Str(new Date(), "YYYYMMDD");
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.$refs.pic_upload2.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      if (info.url) {
        this.$refs.pic_upload1.setPicList([
          {
            url: info.url,
            file_name: info.account_pic,
          },
        ]);
      }
      // 查询劳务单位
      this.QueryLabour();
      // 查询班组
      this.QueryStaffTeam(null, true);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = { uploadFileModule: "StaffWorker" };
      this.ruleform.account_pic = await this.$refs.pic_upload1.submitFun(
        false,
        file_obj
      );
      let picsjson = await this.$refs.pic_upload2.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.account_files_pic = picsjson.file;
      this.ruleform.account_files = filejson.file;
      this.ruleform.account_files_pic_json = picsjson.file_json;
      this.ruleform.account_files_json = filejson.file_json;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      subdata.worker_enter_time = Number(subdata.worker_enter_time);
      subdata.worker_leave_time =
        this.ruleform.account_status == 2
          ? Number(subdata.worker_leave_time)
          : 0;
      let res = await api[
        `${this.worker_id ? "UpdateStaffWorker" : "UploadStaffWorker"}`
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
