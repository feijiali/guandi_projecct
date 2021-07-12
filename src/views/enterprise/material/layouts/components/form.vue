<template>
  <div class="w-100">
    <el-form class="el-form-box"
             ref="ruleforms">
      <el-form-item class="form-item-long-small must"
                    label="工程项目：">
        <el-select v-model="ruleforms.organ_id_un"
                   placeholder="请选择">
          <el-option :label="item.organ"
                     :value="item.organ_id"
                     v-for="item in organProject"
                     :key="item.organ_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must"
                    label="月份："
                    v-if="dataType==0">
        <el-date-picker @change="refresh"
                        class="el-date-editor-m"
                        :clearable="false"
                        :editable="false"
                        v-model="ruleforms.search_time"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="请选择"></el-date-picker>

      </el-form-item>
      <el-form-item class="form-item-long-small must"
                    label="日期："
                    v-if="dataType==1">
        <el-date-picker @change="refresh"
                        class="el-date-editor-m"
                        v-model="ruleforms.search_time"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small"></el-form-item>
      <el-form-item class="form-item-long-small">
        <a :href="GLOBAL.baseurl + downLoadApi.url"
           :download="downLoadApi.name+'.xlsx'">
          <n-button :btnText="'下载模板'"
                    :width="'120px'"
                    :colorBtn="'blue'"></n-button>
        </a>
        <el-upload v-permission="importApi.permission"
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
                   :ref="'newupload'">
          <n-button :btnText="'导入数据'"
                    :width="'120px'"
                    :colorBtn="'blue'"></n-button>
        </el-upload>
      </el-form-item>
      <material-table v-model="list"
                      :headers="headers"
                      @selectChange="(key, value, index)=>$emit('selectChange',key, value, index)"
                      @inputChange="(key, value, index)=>$emit('inputChange',key, value, index)"></material-table>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";

import MaterialTable from "@/components/common/MaterialTable";
import { mapGetters } from 'vuex';
export default {

  components: {
    MaterialTable
  },
  props: {
    list: {
      defalut: () => []
    },
    headers: {
      default: () => []
    },
    importApi: {
      defalut: () => {
        return {
          permission: [],
          url: ""
        }
      }
    },
    downLoadApi: {
      defalut: () => {
        return {
          url: "",
          name: ""
        }
      }
    },
    dataType: {
      defalut: 0
    }
  },
  data () {
    return {

      ruleforms: {
        search_time: this.$utils.parseDate2Str(new Date(), "YYYY-MM-DD"),
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

      fileList: [],
    };
  },
  computed: {
    ...mapGetters(["organProject"])

  },
  mounted () {

  },
  methods: {

    refresh () {



    },
    // 文件状态改变时的钩子
    fileChange (file, fileList) {
      let that = this;
      that.fileList = [file];
    },
    httprequest () {
      let that = this;
      that.importData.uploadFile = that.fileList[0].raw;
      that
        .uploadFile([], that.importData, importApi.url)
        .then((res) => {
          that.rebackTable(res.result);
        });
    },
    async submitFun () {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
        return;
      }

      this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData (data) {
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
