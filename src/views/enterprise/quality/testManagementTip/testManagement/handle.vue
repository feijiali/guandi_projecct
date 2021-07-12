<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long must" label="所属工区：">
            <el-select
              v-model="ruleform.test_control_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long must" label="文件名称：">
            <el-input
              :disabled="disable"
              v-model="ruleform.test_control_file_name"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="上传时间：">
            <el-date-picker
              :disabled="disable"
              :clearable="false"
              ref="datePicker"
              v-model="ruleform.test_control_upload_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long d-inline-block must">
            <el-checkbox
              :disabled="disable"
              :true-label="1"
              :false-label="0"
              v-model="ruleform.test_control_is_temperature"
              >勾选为600℃天文件</el-checkbox
            >
          </el-form-item>
          <el-form-item class="form-item-long d-inline-block" label="备注：">
            <el-input
              :disabled="disable"
              v-model="ruleform.test_control_remark"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文件：">
            <nFileUpload ref="file_upload" :length="4" />
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
export default {
  mixins: [confirm],
  data() {
    return {
      ruleform: {
        test_control_id: null,
        test_control_organ_id_un: null,
        test_control_file_name: "",
        test_control_upload_time: this.$utils.parseDate2Str(
          new Date(),
          "YYYY-MM-DD HH:mm"
        ),
        quality_test_control_type: 1,
        test_control_upload_time_int: null,
        test_control_remark: "",
        test_control_file: "",
        test_control_file_json: "",
        test_control_pic: "",
        test_control_pic_json: "",
        test_control_video: "",
        test_control_video_json: "",
        test_control_sub_account_id_un: null,
        test_control_sub_time: "",
      },
      title: "新增试块数据上传",
      organArr: [], //工区数组
      disable: this.$route.query.test_control_is_temperature ? true : false,
      formValidation: [
        {
          must: [
            "test_control_organ_id_un",
            "test_control_file_name",
            "test_control_upload_time",
          ],
          tip: ["请选择工区", "请输入文件名称", "请选择上传时间"],
        },
      ],
      //禁止选择当天之后日期
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() > new Date() * 1 + 600 * 1000;
        },
      },
      is600: false,
      test_control_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    this.test_control_id && this.queryQualityTestControlList();
  },
  methods: {
    // 查询项目下的工区
    async queryType() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.organArr = res.result;
    },
    //编辑回填
    async queryQualityTestControlList() {
      let data = await api.queryQualityTestControlList({
        test_control_id: this.test_control_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.video_upload.setVideoList(info.video_list);
      this.$refs.file_upload.setFileList(info.file_list);
      this.ruleform.test_control_is_temperature == 1
        ? (this.is600 = true)
        : (this.is600 = false);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (this.fileList.length == 0) {
          this.$tip({
            isTip: true,
            message: "请上传文件",
          });
          return;
        }
        let file_obj = { uploadFileModule: "QualityTestControl" };
        let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
        let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
        let videojson = await this.$refs.video_upload.submitFun(true, file_obj);
        this.ruleform.test_control_pic = picsjson.file;
        this.ruleform.test_control_file = filejson.file;
        this.ruleform.test_control_video = videojson.file;
        this.ruleform.test_control_pic_json = picsjson.file_json;
        this.ruleform.test_control_file_json = filejson.file_json;
        this.ruleform.test_control_video_json = videojson.file_json;
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let time = new Date().toLocaleTimeString("chinese", { hour12: false });
      let subdata = { ...this.ruleform };
      subdata.test_control_upload_time =
        subdata.test_control_upload_time.slice(0, 10) + "\xa0" + time;
      let res = await api[
        `${
          this.test_control_id
            ? this.is600
              ? "updateQualityTestControlFile"
              : "updateQualityTestControl"
            : "uploadQualityTestControl"
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

<style scoped lang="scss">
.admin-config-box {
  .label-l {
    width: 85px;
  }
}
</style>
