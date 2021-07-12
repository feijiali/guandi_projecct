<template>
  <div class="top-select-box-no-width">
    <div>
      <div class="d-inline-block">
        <n-search
          ref="serch"
          :isInput="true"
          :width="260"
          placeholder="输入关键词搜索"
          @searchFun="searchFun"
        ></n-search>
      </div>
      <div class="d-inline-block ml-2" v-if="!this.isProject">
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
        <label class="text-secondary">填报部门：</label>
        <el-select
          @change="handlePartmentChange"
          v-model="conditions.equipment_standing_book_depart"
          placeholder="请选择"
        >
          <el-option key="0" label="全部" :value="''"></el-option>
          <el-option
            v-for="item in partmentList"
            :key="item.equipment_standing_book_depart"
            :label="item.equipment_standing_book_depart"
            :value="item.equipment_standing_book_depart"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">日期：</span>
        <el-date-picker
          @change="chooseDate"
          class="el-date-picker-range-box"
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          format="yyyy-MM-dd"
          :editable="false"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <div>
      <div
        class="d-inline-block"
        v-permission="['EquipmentStandingBook-upload']"
      >
        <n-button :btnText="'导入'" @buttonClick="handleImport">
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_nav_import mr-1"></i>
          </template>
        </n-button>
      </div>
      <div
        class="d-inline-block ml-2"
        v-permission="['EquipmentStandingBook-export']"
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
import { conditionMixin } from "@/mixins/device.js";

export default {
  mixins: [conditionMixin],
  data() {
    return {
      partmentKey: "equipment_standing_book_depart",
      partmentApiName: "QueryEquipmentStandingBookDepart",
      conditions: {
        search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        equipment_standing_book_depart: "",
        start_time: "",
        end_time: "",
        page: 0,
        page_size: 20,
      },
    };
  },
};
</script>
