<template>
  <div class="flex-column w-100 h-100 d-flex">
    <n-dialog :diaTit="dialogTitle" ref="dialog" class="dialog-box">
      <template slot="diaSlot">
        <div class="add-select px-2">
          <el-form ref="form" class="el-form-box">
            <el-form-item class="form-item-long must" label="项目名称：">
              <el-input
                type="text"
                v-model="form.project"
                class="input-m"
                placeholder="请输入"
                style="width: 360px"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long must" label="起止日期：">
              <el-date-picker
                @change="chooseDate"
                v-model="form.project_start"
                type="date"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                style="width: 150px"
              >
              </el-date-picker>
              至
              <el-date-picker
                @change="chooseDate"
                v-model="form.project_end"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                style="width: 150px"
              >
              </el-date-picker>
              <!-- <el-date-picker
                style="width: 360px"
                v-model="time"
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeTime"
              ></el-date-picker> -->
            </el-form-item>
            <el-form-item class="form-item-long must" label="项目描述：">
              <el-input
                type="textarea"
                class="el-textarea-box-long"
                rows="8"
                v-model="form.project_desc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="mt-3"
              :btnText="btntext"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </div>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-white w-100 h-100">
      <div class="lable-box">
        <div class="left-box" v-if="info.project != ''">
          <div class="flex-fill">
            <span class="grey2">项目名称：</span>
            <span>{{ info.project }}</span>
          </div>
          <div class="flex-fill">
            <span class="grey2">开工日期：</span>
            <span>{{ info.project_start }}</span>
          </div>
          <div class="flex-fill">
            <span class="grey2">完工日期：</span>
            <span>{{ info.project_end }}</span>
          </div>
        </div>
        <div class="right-box mt-1">
          <n-button
            class="ml-2"
            :btnText="'编辑'"
            v-permission="['ProjectInfoProject-update']"
            @buttonClick="handelEdit(2)"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-if="!isShow"
            class="ml-2"
            :btnText="'新增'"
            v-permission="['ProjectInfoProject-upload']"
            @buttonClick="handelEdit(1)"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <div
        class="content mt-4 p-2"
        v-html="info.project_desc.replace(/\n/g, '<p/>')"
      ></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  props: {},
  data() {
    return {
      isShow: this.$route.meta.isProject,
      flag: false,
      userinfo: {},
      info: {
        project: "",
        project_start: "",
        project_end: "",
        project_desc: "",
      },
      dialogTitle: "",
      btntext: "",
      form: {
        organ_id_union: this.$organ_id_en_or_pro(this),
        project: "",
        project_start: "",
        project_end: "",
        project_desc: "",
      },
    };
  },
  created() {
    this.getProjectInfo();
  },
  methods: {
    // 选择日期判断
    chooseDate() {
      let startTime = new Date(this.form.project_start);
      let endTime = new Date(this.form.project_end);
      if (startTime - endTime > 0) {
        this.$tip({
          isTip: true,
          message: "开始日期不能大于结束日期",
        });
        return;
      }
    },
    handelEdit(num) {
      if (num == 1) {
        this.dialogTitle = "新增项目描述";
        this.btntext = "确认新增";
        this.form = {
          organ_id_union: this.$organ_id_en_or_pro(this),
          project: "",
          project_start: "",
          project_end: "",
          project_desc: "",
        };
      } else {
        this.dialogTitle = "修改项目描述";
        this.btntext = "确认修改";
        this.form = { ...this.info };
      }
      this.$refs.dialog.show();
    },
    //新增项目信息
    submitFun() {
      var url = this.form.project_id
        ? "updateProjectInfoProject"
        : "uploadProjectInfoProject";
      if (this.form.project == "") {
        this.$tip({
          isTip: true,
          message: `请输入项目名称`,
        });
        return;
      }
      if (this.form.project_start && this.form.project_end) {
      } else {
        this.$tip({
          isTip: true,
          message: `请选择项目开工日期和完工日期`,
        });
        return;
      }
      if (this.form.project_desc == "") {
        this.$tip({
          isTip: true,
          message: `请输入项目描述`,
        });
        return;
      }
      this.submitAllData(url);
    },
    //提交请求函数
    async submitAllData(url) {
      if (this.flag) {
        return;
      }
      this.flag = true;
      await api[url](this.form);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getProjectInfo();
          this.$refs.dialog.cancel();
          this.flag = false;
        },
      });
    },
    //获取项目信息
    async getProjectInfo() {
      let res = await api.queryProjectInfoProject({
        page: -1,
        organ_id_union: this.$organ_id_en_or_pro(this),
      });
      let result = res.result;
      if (result.length > 0) {
        this.info = result[0];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.lable-box {
  display: flex;
  justify-content: space-between;
  .left-box {
    padding: 20px;
    font-size: 16px;
    display: flex;
    width: 80%;
  }
}
.content {
  line-height: 30px;
  text-indent: 32px;
  overflow: auto;
  font-size: 16px;
  max-height: 600px;
}
</style>
