<template>
  <div class="top-select-box-no-width">
    <div>
      <div class="d-inline-block" v-if="!isProject">
        <label class="text-secondary">{{ subject_label }}：</label>
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
        <label class="text-secondary">填报部门：</label>
        <el-select
          @change="handlePartmentChange"
          v-model="conditions.material_money_standing_book_depart"
          placeholder="请选择"
        >
          <el-option key="0" label="全部" :value="''"></el-option>
          <el-option
            v-for="item in partmentList"
            :key="item.material_money_standing_book_depart"
            :label="item.material_money_standing_book_depart"
            :value="item.material_money_standing_book_depart"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">月份：</span>
        <el-date-picker
          :clearable="false"
          v-model="conditions.start_time"
          :picker-options="pickerOptions"
          @change="handleMonthChange"
          format="yyyy-MM"
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
      partmentList: [],
      partmentApiName: "QueryMaterialMoneyStandingBookDepart",
      conditions: {
        organ_node: this.$organ_id_en_or_pro(this),
        material_money_standing_book_depart: "",
        start_time: this.$utils.getCurrentTime("", "", "month"),
        page: 0,
        page_size: 20,
      },
    };
  },
  created() {
    this.getPartmentList();
    // this.isProject && this.getPartmentList();
  },
  methods: {
    // 获取部门
    async getPartmentList() {
      const requestData = {
        organ_node: this.conditions.organ_node,
      };

      try {
        const res = await api[this.partmentApiName](requestData);
        this.partmentList = res.result;
      } catch (error) {
        console.error(error);
      }
    },
    handleProjectChange(val) {
      this.partmentList = [];
      this.conditions.organ_node = val;
      this.conditions.material_money_standing_book_depart = "";

      if (this.conditions.organ_node !== this.allId) {
        this.getPartmentList();
      }
      this.changeConditions();
    },
    handlePartmentChange(val) {
      this.conditions.material_money_standing_book_depart = val;
      this.changeConditions();
    },
  },
};
</script>
