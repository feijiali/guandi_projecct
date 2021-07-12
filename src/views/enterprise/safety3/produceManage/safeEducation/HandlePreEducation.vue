<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="教育主题：">
            <el-input
              class="input-m"
              v-model="ruleform.education_theme"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="所属工区：">
            <el-select v-model="ruleform.organ_id_union" placeholder="请选择">
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="教育日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.education_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long must" label="教育内容：">
            <el-input
              v-model="ruleform.education_content"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="教育对象：">
            <el-input
              v-model="ruleform.education_target"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
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
        education_id: null,
        organ_id_union: null,
        education_time: this.$utils.getCurrentTime(),
        education_video: "",
        education_pic: "",
        education_file: "",
        education_theme: "",
        education_content: "",
        education_target: "",
      },
      title: "",
      organArr: [],
      formValidation: [
        {
          must: [
            "organ_id_union",
            "education_time",
            "education_theme",
            "education_content",
            "education_target",
          ],
          tip: [
            "请选择所属工区",
            "请选择教育时间",
            "请输入教育主题",
            "请输入教育内容",
            "请输入教育对象",
          ],
        },
      ],
      education_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    if (this.education_id) {
      this.title = "编辑班前教育";
      await this.querySafeEducation();
    } else {
      this.title = "新增班前教育";
    }
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
    async querySafeEducation() {
      let data = await api.querySafeEducation({
        education_id: this.education_id,
      });
      let info = data.result[0];
      const json = [
        "education_id",
        "organ_id_union",
        "education_time",
        "education_theme",
        "education_content",
        "education_target",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, data.result[0]);
      // 递归查找当前节点
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.video_upload.setVideoList(info.video_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let file_obj = { uploadFileModule: "SafeEducation" };
        this.ruleform.education_pic = await this.$refs.pic_upload.submitFun(
          false,
          file_obj
        );
        this.ruleform.education_video = await this.$refs.video_upload.submitFun(
          false,
          file_obj
        );
        this.ruleform.education_file = await this.$refs.file_upload.submitFun(
          false,
          file_obj
        );
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${this.education_id ? "updateSafeEducation" : "uploadSafeEducation"}`
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
