<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="人员姓名："
      >
        <el-input disabled v-model="ruleforms.account_name"></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="销假时间：">
        <el-date-picker
          @change="chooseDate"
          class="el-date-picker-range-box"
          v-model="leave_times"
          type="datetimerange"
          range-separator="-"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long must" label="销假原因：">
        <el-input
          v-model="ruleforms.leave_cancel"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" />
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
        account_name: "",
        leave_cancel_id: 0,
        leave_cancel: "",
        leave_cancel_pic: "",
        leave_cancel_pic_json: "",
        leave_cancel_start_date: "",
        leave_cancel_start_time: "",
        leave_cancel_end_date: "",
        leave_cancel_end_time: "",
        leave_cancel_revise_id_union: 0,
        leave_id_union: this.editID,
      },
      leave_times: ["", ""],
      leaveInfo: {},
      rules: {
        leave_cancel_start_time: [
          {
            required: true,
            message: "请选择销假开始时间",
          },
        ],
        leave_cancel_end_time: [
          {
            required: true,
            message: "请选择销假结束时间",
          },
        ],
        leave_cancel: [
          {
            required: true,
            message: "请输入销假原因",
          },
        ],
      },
      leave_cancel_id: parseInt(this.$route.query.cancel_id), //编辑id
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    if (this.leave_cancel_id) {
      this.queryOALeaveCancel();
    } else {
      //   查询请假详情
      this.queryOALeave();
    }
  },
  methods: {
    chooseDate() {
      //判断时间范围是否合理
      if (
        !this.$utils.timeDiff(
          this.leaveInfo.leave_start_date +
            " " +
            this.leaveInfo.leave_start_time,
          this.leave_times[0]
        )
      ) {
        this.leave_times = ["", ""];
        this.$tip({
          isTip: true,
          message: "销假时间必须在请假时间范围内",
        });
        return;
      }
      if (
        !this.$utils.timeDiff(
          this.leave_times[1],
          this.leaveInfo.leave_end_date + " " + this.leaveInfo.leave_end_time
        )
      ) {
        this.leave_times = ["", ""];
        this.$tip({
          isTip: true,
          message: "销假时间必须在请假时间范围内",
        });
        return;
      }
    },
    async queryOALeaveCancel() {
      let { result } = await api.queryOALeaveCancel({
        leave_cancel_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },
    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.$set(
        this.leave_times,
        0,
        info.leave_cancel_start_date + " " + info.leave_cancel_start_time
      );
      this.$set(
        this.leave_times,
        1,
        info.leave_cancel_end_date + " " + info.leave_cancel_end_time
      );
      this.ruleforms.account_name = info.sub_account_name;
      console.log(info);
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.cancel_pic_list);
      }
    },
    //   查询请假
    async queryOALeave() {
      let { result } = await api.queryOALeave({ leave_id: this.editID });
      this.leaveInfo = result[0];
      this.ruleforms.account_name = result[0].sub_account_name;
    },
    async submitFun(isSave) {
      this.ruleforms.leave_cancel_start_time =
        this.leave_times[0].split(" ")[1];
      this.ruleforms.leave_cancel_start_date =
        this.leave_times[0].split(" ")[0];
      this.ruleforms.leave_cancel_end_time = this.leave_times[1].split(" ")[1];
      this.ruleforms.leave_cancel_end_date = this.leave_times[1].split(" ")[0];
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.ruleforms.leave_cancel_pic = picsjson.file;
      if (!isSave) {
        this.ruleforms.leave_cancel_pic_json = picsjson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
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
      let res = await api[
        `${this.editID ? "uploadOALeaveCancel" : "updateOALeaveCancel"}`
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
