<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="工程项目：">
        <el-select v-model="ruleforms.organ_id_un" placeholder="请选择">
          <el-option
            :label="item.organ"
            :value="item.organ_id"
            v-for="item in organProject"
            :key="item.organ_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="月份：">
        <el-date-picker
          @change="refresh"
          class="el-date-editor-m"
          :clearable="false"
          :editable="false"
          v-model="ruleforms.search_time"
          format="yyyy-MM"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small"></el-form-item>
      <el-form-item class="form-item-long-small">
        <a :href="GLOBAL.baseurl + downLoadURL" download="合同计量模版.xlsx">
          <n-button
            :btnText="'下载模板'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </a>
        <el-upload
          v-permission="['ProjectReportEngineeringMain-upload']"
          class="
            upload
            download-item
            position-relative
            useMoney-upload
            d-inline-block
            ml-2
          "
          action="xxxx"
          :show-file-list="false"
          :multiple="false"
          name="UploadFile"
          :http-request="httprequest"
          :on-change="fileChange"
          :file-list="fileList"
          :auto-upload="true"
          accept=".xls, .xlsx"
          :ref="'newupload'"
        >
          <n-button
            :btnText="'导入数据'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </el-upload>
      </el-form-item>
      <material-table
        v-model="list"
        :headers="headers"
        @selectChange="chooseEngineeringName"
        @inputChange="calFun"
      ></material-table>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";

import MaterialTable from "@/components/common/MaterialTable";
import { mapGetters } from "vuex";
export default {
  components: {
    MaterialTable,
  },
  props: {
    iframe: {
      default: () => {
        return {
          src: "",
          key: "",
        };
      },
    },
    addApi: {
      default: () => {
        return {
          url: "",
        };
      },
    },
    exportApi: {
      default: () => {
        return {
          permission: [],
          url: "",
          query: {},
          name: "",
        };
      },
    },
    queryApi: {
      default: () => {
        return {
          placeholder: "请输入",
        };
      },
    },
  },
  data() {
    return {
      list: [],
      headers: [
        { key: "id", name: "序号", width: 40, placeholder: "请输入", type: 1 },
        {
          key: "name",
          name: "材料名称及工程部位",
          width: 120,
          placeholder: "搜索/选择/请输入",
          type: 2,
          historyArr: [],
        },
        {
          key: "unit",
          name: "单位",
          width: 80,
          placeholder: "自动获取/请输入",
          type: 1,
        },
        {
          key: "num",
          name: "图纸数量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "allnum",
          name: "累计完成设计量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "allreal",
          name: "累计完成实际量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "a",
          name: "累计盈亏(盈-亏+)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "b",
          name: "累计损耗率(%)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        { key: "c", name: "本期施工设计量", placeholder: "请输入" },
        { key: "d", name: "本期施工实际量", placeholder: "请输入" },
        {
          key: "e",
          name: "本期盈亏(盈-亏+)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "f",
          name: "本期损耗率(%)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "remark",
          name: "备注(损耗分析)",
          placeholder: "请输入",
          type: 1,
        },
      ],
      ruleforms: {
        search_time: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
        organ_id_un: this.$route.query.organ_node,
      },
      rules: {
        organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        search_time: [
          {
            required: true,
            message: "请选择月份",
          },
        ],
      },
      downLoadURL: "",
      fileList: [],
    };
  },
  computed: {
    ...mapGetters(["organProject"]),
  },
  mounted() {},
  methods: {
    //选择材料名称
    chooseEngineeringName(key, value, index) {
      this.list[index].allnum = 1.0;
      this.list[index].allreal = 2.0;
      profitCalc(this.list[index]);
    },
    calFun(key, value, index) {
      (key == "allnum" || key == "allreal") &&
        this.cumulativeCalc(this.list[index]);
      (key == "c" || key == "d") && this.theIssueCalc(this.list[index]);
    },
    //累计计算
    cumulativeCalc(item) {
      const { profit, loss } = this.profitCalc(item, "allnum", "allreal");
      item["a"] = profit;
      item["b"] = loss;
    },
    //本期计算
    theIssueCalc(item) {
      const { profit, loss } = this.profitCalc(item, "c", "d");
      item["e"] = profit;
      item["f"] = loss;
    },
    profitCalc(item, key1, key2) {
      if (item[key1] && item[key2]) {
        var tmp = this.$utils.accAdd(item[key2], -item[key1]);
        return { profit: tmp, loss: tmp / item[key2] };
      }
      return { profit: "", loss: "" };
    },
    refresh() {
      this.refreshData();
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      let that = this;
      that.fileList = [file];
    },
    httprequest() {
      let that = this;
      that.importData.uploadFile = that.fileList[0].raw;
      that
        .uploadFile([], that.importData, "ImportProjectReportEngineeringMain")
        .then((res) => {
          that.rebackTable(res.result);
        });
    },
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
        return;
      }

      this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };

      // await api[
      //   `${this.engineering_pay_id && !this.isAdd
      //     ? "UpdateProjectReportEngineeringPay"
      //     : "UploadProjectReportEngineeringPay"
      //   }`
      // ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-box .el-date-editor.el-input {
  ::v-deep .el-input__inner {
    padding-right: 5px !important;
  }
}
</style>
