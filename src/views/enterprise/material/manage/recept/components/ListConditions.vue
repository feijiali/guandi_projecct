<template>
  <div class="top-select-box-no-width">
    <div>
      <div class="d-inline-block">
        <n-search
          ref="serch"
          :isInput="true"
          :width="260"
          placeholder="输入材料名称/规格型号搜索"
          @searchFun="searchFun"
        ></n-search>
      </div>
      <div class="d-inline-block ml-2" v-if="!isProject">
        <label class="text-secondary">工程项目：</label>
        <el-select
          @change="handleProjectChange"
          v-model="conditions.organ_node"
          placeholder="请选择"
        >
          <el-option key="0" label="全部" :value="allId"></el-option>
          <el-option
            v-for="item in projectList"
            :key="item.organ_id"
            :label="item.organ"
            :value="item.organ_id"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">月份：</span>
        <el-date-picker
          :clearable="false"
          v-model="conditions.material_standing_book_date"
          format="yyyy-MM"
          @change="handleMonthChange"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <div
        class="d-inline-block"
        v-permission="['MaterialStandingBook-upload']"
      >
        <n-button :btnText="'导入'" @buttonClick="handleImport">
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_nav_import mr-1"></i>
          </template>
        </n-button>
      </div>
      <div
        class="d-inline-block ml-2"
        v-permission="['MaterialStandingBook-export']"
      >
        <n-button :btnText="'导出'" @buttonClick="handleExport">
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_nav_export mr-1"></i>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>
<script>
import { conditionMixin } from "@/mixins/material.js";

export default {
  mixins: [conditionMixin],
  data() {
    return {
      conditions: {
        search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        material_standing_book_date: this.$utils.getCurrentTime(
          "",
          "",
          "month"
        ),
      },
    };
  },

  methods: {
    handleProjectChange(val) {
      this.conditions.organ_node = val;
      this.changeConditions();
    },
    searchFun(val) {
      this.conditions.search = val;
      this.changeConditions();
    },
  },
};
</script>
