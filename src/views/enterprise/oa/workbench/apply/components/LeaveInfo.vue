<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms" :inline="false">
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="人员姓名："
      >
        <el-input readonly :value="ruleforms.account_name"></el-input>
      </el-form-item>

      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="请假类型："
      >
        <el-select
          v-model="ruleforms.leave_type"
          @change="chooseApplyType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in applyType"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="请假时间：">
        <el-date-picker
          @change="chooseDate"
          class="el-date-picker-range-box"
          v-model="leave_times"
          type="datetimerange"
          range-separator="-"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="must form-item-long-small" label="请假事由：">
        <el-input
          v-model="ruleforms.leave_reason"
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
        leave_id: null,
        leave_revise_id_union: null,
        leave_type: null,
        leave_reason: "",
        leave_start_time: "",
        leave_end_time: "",
        leave_start_date: "",
        leave_end_date: "",
        leave_pic: "",
      },
      leave_times: ["", ""],
      applyType: [
        { type: "事假", id: 1 },
        { type: "病假", id: 2 },
        { type: "婚假", id: 3 },
        { type: "产假", id: 4 },
        { type: "工伤假", id: 5 },
        { type: "䘮假", id: 6 },
        { type: "公假", id: 7 },
        { type: "年休假", id: 8 },
        { type: "其他", id: 9 },
      ],
      rules: {
        leave_type: [
          {
            required: true,
            message: "请选择请假类型",
          },
        ],
        leave_start_time: [
          {
            required: true,
            message: "请选择请假开始时间",
          },
        ],
        leave_end_time: [
          {
            required: true,
            message: "请选择请假结束时间",
          },
        ],
        leave_reason: [
          {
            required: true,
            message: "请输入请假事由",
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
      this.ruleforms.leave_sub_account_id_union = Number(
        this.$store.getters.account_id
      );
    } else {
      this.queryOALeave();
      // await this.queryStaffPunchLeave();
    }
  },
  methods: {
    // 请假时长不能超过5天
    chooseDate(val) {
      let days = this.minutesCha(val[0], val[1]);
      if (days < 30) {
        this.$tip({
          isTip: true,
          message: "请假时长需大于半小时 ！",
        });
        this.leave_times = ["", ""];
        return;
      }
      if (days > 5 * 24 * 60) {
        this.$tip({
          isTip: true,
          message: "请假时间不得超过5天 ！",
        });
        this.leave_times = ["", ""];
        return;
      }
    },
    minutesCha(begin, end) {
      //定义两个变量time1,time2分别保存开始和结束时间
      let time1 = begin;
      let time2 = end;
      //判断开始时间是否大于结束日期
      if (time1 > time2) {
        alert("开始时间不能大于结束时间！");
        return false;
      }

      //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
      let begin1 = time1.substr(0, 10).split("-");
      let end1 = time2.substr(0, 10).split("-");

      //将拆分的数组重新组合，并实例成化新的日期对象
      let date1 = new Date(begin1[1] + -+begin1[2] + -+begin1[0]);
      let date2 = new Date(end1[1] + -+end1[2] + -+end1[0]);

      //得到两个日期之间的差值m，以分钟为单位
      //Math.abs(date2-date1)计算出以毫秒为单位的差值
      //Math.abs(date2-date1)/1000得到以秒为单位的差值
      //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
      let m = parseInt(Math.abs(date2 - date1) / 1000 / 60);

      //小时数和分钟数相加得到总的分钟数
      //time1.substr(11,2)截取字符串得到时间的小时数
      //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
      let min1 =
        parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
      let min2 =
        parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));

      //两个分钟数相减得到时间部分的差值，以分钟为单位
      let n = min2 - min1;

      //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
      let minutes = m + n;
      // 返回 分钟差
      return minutes;
    },
    // 选择请假类型
    chooseApplyType(val) {
      this.$emit("chooseApplyType", val);
    },

    async queryOALeave() {
      let data = await api.queryOALeave({
        leave_id: this.editID,
      });
      this.editData = data.result[0];
      this.infoReFun(this.editData);
    },

    infoReFun(info) {
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.ruleforms.account_name = info.sub_account_name;
      this.$set(
        this.leave_times,
        0,
        info.leave_start_date + " " + info.leave_start_time
      );
      this.$set(
        this.leave_times,
        1,
        info.leave_end_date + " " + info.leave_end_time
      );
      console.log(this.leave_times);
      // 编辑式渲染图片
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
      } else {
        this.$nextTick(() => {
          this.$refs.pic_upload.setPicList(pic_list);
        });
      }
    },
    async queryStaffPunchLeave() {
      let data = await api.queryStaffPunchLeave({
        leave_id: this.editID,
      });
      this.editData = data.result[0];
      for (let key in this.ruleforms) {
        this.ruleforms[key] = this.editData[key];
      }
      // 编辑式渲染图片
      let pic_list = [];
      // this.$utils.renderFile(info.pic_list, pic_list, "pic");
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(pic_list);
      } else {
        this.$nextTick(() => {
          this.$refs.pic_upload.setPicList(pic_list);
        });
      }
    },
    async submitFun(isSave) {
      this.ruleforms.leave_start_time = this.leave_times[0].split(" ")[1];
      this.ruleforms.leave_start_date = this.leave_times[0].split(" ")[0];
      this.ruleforms.leave_end_time = this.leave_times[1].split(" ")[1];
      this.ruleforms.leave_end_date = this.leave_times[1].split(" ")[0];
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.ruleforms.leave_pic = picsjson.file;
      if (!isSave) {
        this.ruleforms.leave_pic_json = picsjson.file_json;
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
      this.isAdd && (subdata.leave_id = 0);
      await api[
        `${this.editID && !this.isAdd ? "updateOALeave" : "uploadOALeave"}`
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
