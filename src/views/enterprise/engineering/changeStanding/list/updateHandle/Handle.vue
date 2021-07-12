<template>
  <el-form class="el-form-box" ref="ruleforms">
    <div class="bg-white rounded-1 px-2 pt-1 pb-2 mt-1">
      <div class="font-20 font-weight-bold mb-1 d-block">原设计情况</div>
      <el-form-item class="form-item-long-small must" label="工程项目：">
        <el-input readonly v-model="info.organ" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="变更上报名称：">
        <el-input
          v-model="ruleforms.parameter_info_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="变更会议纪要：">
        <el-input
          v-model="ruleforms.parameter_info_meeting"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="服务函/设计函：">
        <el-input
          v-model="ruleforms.parameter_info_service_letter"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="项目上报金额：">
        <num-input
          :negative="true"
          :fixedNum="2"
          :isString="true"
          unit="元"
          v-model="ruleforms.parameter_info_money"
          placeholder="自动获取/请输入"
        >
        </num-input>
      </el-form-item>

      <el-form-item class="form-item-long-small" label="预计可批复金额：">
        <num-input
          :negative="true"
          :fixedNum="2"
          :isString="true"
          unit="元"
          v-model="ruleforms.parameter_info_estimate_money"
          placeholder="自动获取/请输入"
        >
        </num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="变更依据：">
        <el-input
          v-model="ruleforms.parameter_info_basis"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="主要变更内容：">
        <el-input
          v-model="ruleforms.parameter_info_content"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </div>
    <div class="bg-white rounded-1 px-2 pt-1 pb-2 mt-1">
      <div class="font-20 font-weight-bold mb-1 d-block">变更情况</div>
      <el-form-item class="form-item-long-small must" label="变更类型：">
        <el-select v-model="ruleforms.parameter_info_type" placeholder="请选择">
          <el-option label="已上报已批复" :value="3"></el-option>
          <el-option label="已上报未批复" :value="2"></el-option>
          <el-option label="未上报" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <table class="table-origin mb-2">
        <tr>
          <td colspan="2">承包人</td>
          <td colspan="2">监理</td>
          <td colspan="2">业主</td>
          <td colspan="2">上级单位</td>
          <td colspan="2">设计</td>
        </tr>
        <tr>
          <td>
            <el-select
              class="short-input"
              v-model="ruleforms.parameter_info_contractor_type"
              placeholder="请选择"
            >
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </td>
          <td>
            <num-input
              :negative="true"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              unit="元"
              v-model="ruleforms.parameter_info_contractor_money"
              placeholder="请输入批复金额"
            >
            </num-input>
          </td>
          <td>
            <el-select
              class="short-input"
              v-model="ruleforms.parameter_info_supervisor_type"
              placeholder="请选择"
            >
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </td>
          <td>
            <num-input
              :negative="true"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              unit="元"
              v-model="ruleforms.parameter_info_supervisor_money"
              placeholder="请输入批复金额"
            >
            </num-input>
          </td>
          <td>
            <el-select
              class="short-input"
              v-model="ruleforms.parameter_info_owner_type"
              placeholder="请选择"
            >
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </td>
          <td>
            <num-input
              :negative="true"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              unit="元"
              v-model="ruleforms.parameter_info_owner_money"
              placeholder="请输入批复金额"
            >
            </num-input>
          </td>
          <td>
            <el-select
              class="short-input"
              v-model="ruleforms.parameter_info_superior_type"
              placeholder="请选择"
            >
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </td>
          <td>
            <num-input
              :negative="true"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              unit="元"
              v-model="ruleforms.parameter_info_superior_money"
              placeholder="请输入批复金额"
            >
            </num-input>
          </td>
          <td>
            <el-select
              class="short-input"
              v-model="ruleforms.parameter_info_design_type"
              placeholder="请选择"
            >
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </td>
          <td>
            <num-input
              :negative="true"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              unit="元"
              v-model="ruleforms.parameter_info_design_money"
              placeholder="请输入批复金额"
            >
            </num-input>
          </td>
        </tr>
      </table>
      <el-form-item class="form-item-long-small" label="暂定计量金额：">
        <num-input
          :negative="true"
          :fixedNum="2"
          :isString="true"
          unit="元"
          v-model="ruleforms.parameter_info_report_money"
          placeholder="请输入"
        >
        </num-input>
      </el-form-item>

      <el-form-item
        class="form-item-long-small"
        label="业主是否完成变更计量支付："
      >
        <el-input
          v-model="ruleforms.parameter_info_owner_finished"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small"
        label="公司是否完成变更计量支付："
      >
        <el-input
          v-model="ruleforms.parameter_info_company_finished"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="备注：">
        <el-input
          v-model="ruleforms.parameter_info_remark"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
    </div>
    <div
      class="bg-white rounded-1 px-2 pt-1 pb-2 mt-1"
      v-for="(item, index) in picArr"
      :key="index + 'a'"
    >
      <div class="font-20 font-weight-bold mb-1 d-block">{{ item.name }}</div>
      <nPicUpload :ref="'pic_upload' + index" :length="9" />
    </div>
    <div
      class="bg-white rounded-1 px-2 pt-1 pb-2 mt-1"
      v-for="(item, index) in fileArr"
      :key="index + 'b'"
    >
      <div class="font-20 font-weight-bold mb-1 d-block">{{ item.name }}</div>
      <nFileUpload :ref="'file_upload' + index" :length="9" />
    </div>
  </el-form>
</template>

<script>
import upload from "@/mixins/upload";
export default {
  mixins: [upload],
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ruleforms: {
        parameter_info_type: null,
        parameter_info_parameter_id_un: null,
        parameter_info_name: "",
        parameter_info_meeting: "",
        parameter_info_service_letter: "",
        parameter_info_money: "",
        parameter_info_estimate_money: "",
        parameter_info_basis: "",
        parameter_info_content: "",
        parameter_info_contractor_type: null,
        parameter_info_contractor_money: "",
        parameter_info_supervisor_type: null,
        parameter_info_supervisor_money: "",
        parameter_info_owner_type: null,
        parameter_info_owner_money: "",
        parameter_info_superior_type: null,
        parameter_info_superior_money: "",
        parameter_info_design_type: null,
        parameter_info_design_money: "",
        parameter_info_report_money: "",
        parameter_info_owner_finished: "",
        parameter_info_company_finished: "",
        parameter_info_remark: "",
        parameter_info_before_file: "",
        parameter_info_before_file_json: "",
        parameter_info_file: "",
        parameter_info_file_json: "",
        parameter_info_after_file: "",
        parameter_info_after_file_json: "",
        parameter_info_project_file: "",
        parameter_info_project_file_json: "",
        parameter_info_four_file: "",
        parameter_info_four_file_json: "",
        parameter_info_other_file: "",
        parameter_info_other_file_json: "",
      },
      picArr: [
        { name: "施工前图片", type: "parameter_info_before_file" },
        { name: "施工中图片", type: "parameter_info_file" },
        { name: "完工后图片", type: "parameter_info_after_file" },
      ],
      fileArr: [
        { name: "工程资料", type: "parameter_info_project_file" },
        { name: "四方联测资料", type: "parameter_info_four_file" },
        { name: "其他资料", type: "parameter_info_other_file" },
      ],
    };
  },
  watch: {
    info: {
      handler: function () {
        for (var key in this.info) {
          if (typeof this.info[key] == "number") {
            this.info[key] = this.info[key] == 0 ? null : this.info[key];
          }
        }
        const json = [
          "parameter_info_type",
          "parameter_info_parameter_id_un",
          "parameter_info_name",
          "parameter_info_meeting",
          "parameter_info_service_letter",
          "parameter_info_money",
          "parameter_info_estimate_money",
          "parameter_info_basis",
          "parameter_info_content",
          "parameter_info_contractor_type",
          "parameter_info_contractor_money",
          "parameter_info_supervisor_type",
          "parameter_info_supervisor_money",
          "parameter_info_owner_type",
          "parameter_info_owner_money",
          "parameter_info_superior_type",
          "parameter_info_superior_money",
          "parameter_info_design_type",
          "parameter_info_design_money",
          "parameter_info_report_money",
          "parameter_info_owner_finished",
          "parameter_info_company_finished",
          "parameter_info_remark",
        ];
        this.$utils.renderRuleForm(this, json, this.ruleforms, this.info);
        this.ruleforms.parameter_info_estimate_money =
          this.ruleforms.parameter_info_estimate_money ||
          this.info.parameter_money;
        this.ruleforms.parameter_info_money =
          this.ruleforms.parameter_info_money || this.info.parameter_money;
        this.ruleforms.parameter_info_parameter_id_un = this.info.parameter_id;
        //   图片上传
        for (let j = 0; j < this.picArr.length; j++) {
          let name = "pic_upload" + j;
          this.info[this.picArr[j].type + "_list"] &&
            this.$refs[name][0].setPicList(
              this.info[this.picArr[j].type + "_list"]
            );
        }

        //   文件上传
        for (let j = 0; j < this.fileArr.length; j++) {
          let name = "file_upload" + j;
          this.info[this.fileArr[j].type + "_list"] &&
            this.$refs[name][0].setFileList(
              this.info[this.fileArr[j].type + "_list"]
            );
        }
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    async submitFun() {
      if (!this.ruleforms.parameter_info_type) {
        this.$tip({
          isTip: true,
          message: "请选择变更类型",
        });
        return;
      }
      let file_obj = { uploadFileModule: "ChangeParameterParameterInfo" };
      //   图片上传
      for (let j = 0; j < this.picArr.length; j++) {
        let name = "pic_upload" + j;
        let picsjson = await this.$refs[name][0].submitFun(true, file_obj);
        this.ruleforms[this.picArr[j].type] = picsjson.file;
        this.ruleforms[this.picArr[j].type + "_json"] = picsjson.file_json;
      }

      //   文件上传
      for (let j = 0; j < this.fileArr.length; j++) {
        let name = "file_upload" + j;
        let picsjson = await this.$refs[name][0].submitFun(true, file_obj);
        this.ruleforms[this.fileArr[j].type] = picsjson.file;
        this.ruleforms[this.fileArr[j].type + "_json"] = picsjson.file_json;
      }
      for (var key in this.ruleforms) {
        if (key.includes("_money")) {
          this.ruleforms[key] = this.ruleforms[key]
            ? this.ruleforms[key]
            : "0.00";
        }
      }
      this.$emit("submitAllData", this.ruleforms);
    },
  },
};
</script>

<style lang="scss" scoped>
table.table-origin {
  td {
    padding: 2px 10px;
    height: 35px;
  }
}
.short-input {
  ::v-deep .el-input {
    width: 120px !important;
  }
}

.short-input {
  ::v-deep .el-input .el-input__icon {
    line-height: 30px !important;
  }
  ::v-deep .el-input-group__append {
    right: 4px !important;
    top: 4px !important;
  }
}
.short-input,
.short-input-small {
  width: 120px !important;
  .short-input .el-input,
  .short-input-small .el-input {
    width: 120px !important;
    ::v-deep .el-input__inner {
      padding: 0 5px !important;
      border: none !important;
      height: 30px;
      line-height: 30px;
      background-color: transparent !important;
    }
  }
  ::v-deep .el-input__inner {
    padding: 0 5px !important;
    border: none !important;
    height: 30px;
    line-height: 30px;
    background-color: transparent !important;
  }
}
</style>
