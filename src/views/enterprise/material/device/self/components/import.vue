<template>
  <n-scroll :native="false" class="w-100">
    <div class="mb-2 d-flex align-items-center">
      <p>设备台账表模版下载：</p>
      <a :href="GLOBAL.baseurl + downLoadURL" download="设备台账表模版.xlsx">
        <n-button
          :btnText="'下载模板'"
          :width="'150px'"
          :colorBtn="'blue'"
        ></n-button>
      </a>
    </div>

    <el-form ref="ruleform" class="el-form-box">
      <el-form-item class="must position-relative" label="工程项目：">
        <el-select
          @change="handleProjectChange"
          v-model="params.tab_exam_organ_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectList"
            :key="item.organ_id"
            :label="item.organ"
            :value="item.organ_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="must position-relative" label="填报部门：">
        <el-select v-model="params.tab_exam_depart_name" placeholder="请选择">
          <el-option
            v-for="item in partmentList"
            :key="item.organ_id"
            :label="item.organ"
            :value="item.organ"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="must position-relative" label="导入日期：">
        <el-date-picker
          :clearable="false"
          v-model="params.tab_exam_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          :picker-options="pickerOptions"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <el-upload
      class="mt-1-6 mb-2"
      :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
      :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
      ref="uploadFile"
      :file-list="fileList"
      action="xxxx"
      :auto-upload="false"
      :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
      :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
      accept=".xls, .xlsx, .doc, .docx"
    >
      <nStatusButton
        v-show="fileList.length < 1"
        :changeColor="'#3377FF'"
        :btnText="'导入台账表'"
      />
    </el-upload>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="handleSubmit"
      ></n-button>
    </div>
  </n-scroll>
</template>
<script>
import upload from "@/mixins/upload";
import { importMixin } from "@/mixins/device.js";

export default {
  mixins: [upload, importMixin],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      downLoadURL: "/MOULD/StandingBookEquipment_import.xlsx",
      submitRUL: "ImportEquipmentStandingBook",
      rulesKey: "SELF_IMPORT_RULES",
      params: {
        tab_exam_date: this.$utils.getCurrentTime("", "", ""),
        tab_exam_organ_id: this.$store.state.material.selectProjectId,
        tab_exam_depart_name: "",
      },
    };
  },
};
</script>
