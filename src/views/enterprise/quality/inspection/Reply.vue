<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form
          ref="ruleform"
          v-if="type == 1"
          class="el-form-box"
          :model="ruleform"
        >
          <el-form-item
            class="form-item-long d-inline-block must"
            label="整改人："
          >
            <el-input
              placeholder="请选择"
              v-model="account_name"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="整改日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.rec_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long must" label="回复内容：">
            <el-input
              v-model="ruleform.rec_reply"
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
        </el-form>
        <el-form
          ref="ruleform"
          class="el-form-box"
          v-if="type == 2"
          :model="ruleform2"
        >
          <el-form-item
            class="form-item-long d-inline-block must"
            label="复检人："
          >
            <el-input
              placeholder="请选择"
              v-model="account_name"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="复检日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform2.return_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long must" label="复检内容：">
            <el-input
              v-model="ruleform2.return_reply"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item label="复检结果：" class="form-item-long-small must">
            <el-radio-group class="radio-box" v-model="ruleform2.pass">
              <el-radio :label="1">复检通过</el-radio>
              <el-radio :label="2">复检不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload2" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload2" :length="4" />
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
        daily_inspection_id: null,
        rec_time: this.$utils.getCurrentTime(),
        rec_video: "",
        rec_pic: "",
        rec_union: null,
        rec_reply: "",
        update_safe_type: 1,
      },
      ruleform2: {
        daily_inspection_id: null,
        update_safe_type: 2,
        return_time: this.$utils.getCurrentTime(),
        return_video: "",
        return_pic: "",
        return_union: null,
        return_reply: "",
        pass: null,
      },
      title: "",
      account_name: "",

      type: this.$route.query.type,
      daily_inspection_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },

  async mounted() {
    if (this.type == 1) {
      this.title = "日常巡检整改回复";
      this.account_name = this.$store.getters.userName;
      this.ruleform.rec_union = Number(this.$store.getters.account_id);
    } else {
      this.title = "日常巡检复检回复";
      this.account_name = this.$store.getters.userName;
      this.ruleform2.return_union = Number(this.$store.getters.account_id);
    }
  },
  methods: {
    // 确认提交
    async submitFun() {
      if (this.type == 1) {
        // 先判断是否填写必填信息
        if (this.ruleform.rec_union == null) {
          this.$tip({
            isTip: true,
            message: "请选择整改人",
          });
          return;
        }
        if (this.ruleform.rec_time == "") {
          this.$tip({
            isTip: true,
            message: "请选择整改日期",
          });
          return;
        }
        if (this.ruleform.rec_reply == "") {
          this.$tip({
            isTip: true,
            message: "请输入回复内容",
          });
          return;
        }
        this.ruleform.daily_inspection_id = this.daily_inspection_id;
        let file_obj = { uploadFileModule: "(QuantityDailyInspection" };
        this.ruleform.rec_pic = await this.$refs.pic_upload.submitFun(
          false,
          file_obj
        );
        this.ruleform.rec_video = await this.$refs.video_upload.submitFun(
          false,
          file_obj
        );
        this.submitAllData();
      } else {
        // 先判断是否填写必填信息
        if (this.ruleform2.return_union == null) {
          this.$tip({
            isTip: true,
            message: "请选择复检人",
          });
          return;
        }
        if (this.ruleform2.return_time == "") {
          this.$tip({
            isTip: true,
            message: "请选择复检日期",
          });
          return;
        }
        if (this.ruleform2.return_reply == "") {
          this.$tip({
            isTip: true,
            message: "请输入复检内容",
          });
          return;
        }
        if (this.ruleform2.pass == null) {
          this.$tip({
            isTip: true,
            message: "请选择复检结果",
          });
          return;
        }
        this.ruleform2.daily_inspection_id = this.daily_inspection_id;
        let file_obj = { uploadFileModule: "(QuantityDailyInspection" };
        this.ruleform2.return_pic = await this.$refs.pic_upload2.submitFun(
          false,
          file_obj
        );
        this.ruleform2.return_video = await this.$refs.video_upload2.submitFun(
          false,
          file_obj
        );
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      if (this.type == 1) {
        let subdata = { ...this.ruleform };
        let res = await api[`${"updateQuantityDailyInspection"}`](subdata);
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
      } else {
        let subdata2 = { ...this.ruleform2 };
        let res = await api[`${"updateQuantityDailyInspection"}`](subdata2);
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
      }
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
