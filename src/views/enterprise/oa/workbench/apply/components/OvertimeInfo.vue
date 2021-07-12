<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="人员姓名："
      >
        <el-input readonly v-model="ruleforms.account_name"></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="加班时间：">
        <el-date-picker
          class="el-date-picker-range-box"
          v-model="overtimes"
          type="datetimerange"
          range-separator="-"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="时长(小时)："
      >
        <el-input
          placeholder="请输入"
          v-model="ruleforms.overtime_time"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="备注：">
        <el-input
          v-model="ruleforms.overtime_desc"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small w-100" label="附件图片：">
        <nPicUpload ref="pic_upload" style="width: 100%" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
export default {
  mixins: ["upload"],
  props: {
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ruleforms: {
        overtime_id: null,
        overtime_revise_info_id_un: null,
        overtime_account_id_un: null,
        overtime_desc: "",
        overtime_pic: "",
        overtime_pic_json: "",
        overtime_start_time: "",
        overtime_end_time: "",
        overtime_time: "",
        account_name: "",
      },
      overtimes: ["", ""],
      rules: {
        overtime_start_time: [
          {
            required: true,
            message: "请选择加班开始时间",
          },
        ],
        overtime_end_time: [
          {
            required: true,
            message: "请选择加班结束时间",
          },
        ],
        overtime_time: [
          {
            required: true,
            message: "请输入加班时长",
          },
        ],
      },
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    if (!this.editID) {
      // 默认登录者
      this.$set(this.ruleforms, "account_name", this.$store.getters.userName);
      this.ruleforms.overtime_account_id_un = Number(
        this.$store.getters.account_id
      );
    } else {
      this.queryOAOvertime();
    }
  },
  methods: {
    async queryOAOvertime() {
      let { result } = await api.QueryOAOvertime({ overtime_id: this.editID });
      let info = result[0];
      this.infoReFun(info);
    },
    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.$set(this.overtimes, 0, info.overtime_start_time);
      this.$set(this.overtimes, 1, info.overtime_end_time);
      // 编辑
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
      }
    },
    async submitFun(isSave) {
      this.ruleforms.overtime_start_time = this.overtimes[0];
      this.ruleforms.overtime_end_time = this.overtimes[1];
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "OAOvertime" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.ruleforms.overtime_pic = picsjson.file;
      if (!isSave) {
        this.ruleforms.overtime_pic_json = picsjson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls = picsjson.urls.split(",");
          let pic_list = urls.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.overtime_id = 0);
      await api[
        `${
          this.editID && !this.isAdd ? "UpdateOAOvertime" : "UploadOAOvertime"
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
