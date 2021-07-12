<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box h-100" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="标题：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.news_title"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="来源：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.news_from"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="发布时间：">
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              class="el-date-editor-m"
              v-model="ruleform.news_time"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="发布人：">
            {{ userName }}
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="类型：">
            <el-radio-group
              v-model="ruleform.news_type"
              class="el-radio-group-home vtt"
              @change="handleNewsTypeChange"
            >
              <el-radio :label="1">链接</el-radio>
              <el-radio :label="2">文本</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="链接地址：">
            <el-input
              placeholder="请输入"
              class="flex input-m"
              v-model="ruleform.news"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文档：">
            <nFileUpload ref="file_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="文本内容：">
            <DynamicEditor class="flex" ref="qill" :word="content" />
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
import project from "@/plugins/project";
import upload from "@/mixins/upload";

import { mapGetters } from "vuex";
export default {
  mixins: [confirm, upload],
  components: {
    DynamicEditor: () => import("@/components/QillEditor/index"), // 富文本编辑器
  },
  data() {
    return {
      title: "",
      ruleform: {
        news_organ_id_un: this.$organ_id_en_or_pro(this),
      },
      fileList: [],
      content: "",
    };
  },
  computed: {
    ...mapGetters(["userName"]),
  },
  created() {
    this.initRuleform();
  },
  methods: {
    // 初始化表单内容
    initRuleform() {
      let id = parseInt(this.$route.query.id);
      if (id) {
        this.title = "编辑项目动态";

        // 编辑获取信息
        let requestData = {
          news_id: id,
        };
        api.queryArticleNews(requestData).then((res) => {
          this.ruleform = {
            ...res.result[0],
            news_organ_id_un: this.$organ_id_en_or_pro(this),
          };
          if (this.ruleform.news_type === 2) {
            // 富文本内容
            this.content = this.ruleform.news;
          }
          // 附件文档
          if (this.ruleform.news_files) {
            let fileNameList = this.ruleform.news_files.split(",");
            for (let i = 0; i < this.ruleform.file_list.length; i++) {
              this.fileList.push({
                name: this.ruleform.file_list[i].org_name,
                file_name: fileNameList[i],
                url: this.ruleform.file_list[i].url,
                size: this.ruleform.file_list[i].file_size,
              });
            }
          }
        });
      } else {
        this.title = "新增项目动态";
        // 新增获取当前时间
        let currentTime = this.$utils.getCurrentTime("", "", "", "sf", "m");
        this.$set(this.ruleform, "news_time", currentTime);
        this.$set(this.ruleform, "news_type", 1);
      }
    },
    checkInfo() {
      let formValidation = [
        {
          must: ["news_title", "news_from", "news_time"],
          tip: ["请输入标题", "请输入来源", "请选择发布时间"],
        },
      ];

      if (this.$utils.ruleFormTip(this, formValidation, this.ruleform)) {
        // 获取富文本内容或者文件名
        if (this.ruleform.news_type === 2) {
          // 文本上传
          if (!this.$refs.qill.content && this.fileList.length === 0) {
            this.$tip({
              isTip: true,
              message: "请输入文本或上传附件",
            });
            return Promise.reject();
          }
          this.$set(this.ruleform, "news", this.$refs.qill.content);
        } else {
          // 附件上传
          if (!this.ruleform.news) {
            this.$tip({
              isTip: true,
              message: "请输入链接地址",
            });
            return Promise.reject();
          }
        }
        // 文件上传
        return this.$utils.uploadFile.call(this, ["fileList"]).then(() => {
          let fileNames = [];
          for (let value of this.fileList) {
            fileNames.push(value.file_name);
          }
          this.$set(this.ruleform, "news_files", fileNames.join(","));
        });
      } else {
        return Promise.reject();
      }
    },
    async submit() {
      let keys = [
        "news_title",
        "news_from",
        "news_type",
        "news",
        "news_files",
        "news_time",
      ];
      this.ruleform.news_id && keys.push("news_id"); // 编辑加上id
      let apiName = this.ruleform.news_id
        ? "updateArticleNews"
        : "uploadArticleNews"; // 根据是否有id调用编辑和新增接口
      const requestData = JSON.parse(JSON.stringify(this.ruleform, keys)); //获得发送的参数
      requestData.news_organ_id_un = this.$organ_id_en_or_pro(this);
      let res = await api[apiName](requestData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    async submitFun() {
      await this.checkInfo();
      this.submit();
    },
    handleNewsTypeChange() {
      this.$set(this.ruleform, "news", "");
      this.fileList = [];
    },
    selectFun() {
      this.$refs.datePicker.handleClose();
    },
  },
};
</script>

<style scoped lang="scss">
.left,
.right {
  width: 48%;
}
.label {
  width: 100px;
}
</style>
