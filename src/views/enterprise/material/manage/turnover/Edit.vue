<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="编辑周转材料使用费信息" />
    </div>

    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll style="height: auto">
        <el-form ref="ruleform" class="el-form-box">
          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="工程项目："> </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="info.organ"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="项目部："> </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="info.material_money_standing_book_depart"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item
                class="form-item-long-small must"
                label="月份选择："
              >
              </el-form-item>
              <el-date-picker
                :clearable="false"
                class="w-100"
                v-model="info.material_money_standing_book_date"
                format="yyyy-MM"
                :picker-options="pickerOptions"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
              ></el-date-picker>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="原值(元)："> </el-form-item>
              <num-input
                class="w-100"
                :negative="true"
                v-model="info.material_money_standing_book_money"
                :fixedNum="2"
              ></num-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="本期使用费(元)：">
              </el-form-item>
              <num-input
                class="w-100"
                :negative="true"
                v-model="info.material_money_standing_book_use_money"
                :fixedNum="2"
              ></num-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="本期摊销费(元)：">
              </el-form-item>
              <num-input
                class="w-100"
                :negative="true"
                v-model="info.material_money_standing_book_amortize_money"
                :fixedNum="2"
              ></num-input>
            </div>
          </div>
          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="净值(元)："> </el-form-item>
              <num-input
                class="w-100"
                :negative="true"
                v-model="info.material_money_standing_book_worth_money"
                :fixedNum="2"
              ></num-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item label="备注："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="info.material_money_standing_book_remark"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper"></div>
          </div>
        </el-form>
      </n-scroll>
    </div>

    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'取消'"
        :width="'150px'"
        colorBtn="grey"
        @buttonClick="$router.go(-1)"
      ></n-button>
      <n-button
        class="mt-1 ml-08"
        :btnText="'确认提交'"
        :width="'150px'"
        colorBtn="blue"
        @buttonClick="handleSubmit"
      ></n-button>
    </div>
  </div>
</template>
<script>
import { editMixin } from "@/mixins/material.js";
export default {
  mixins: [editMixin],
  data() {
    return {
      rulesKey: "TURNOVER_EDIT_RULES",
      unFormatList: ["material_money_standing_book_date"],
      updateURL: "UpdateMaterialMoneyStandingBook",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
};
</script>
<style lang="scss">
.line-wrapper {
  .form-item-wrapper {
    .el-form-item {
      margin-bottom: 8px !important;
      .el-form-item__label {
        font-size: 14px !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.line-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .form-item-wrapper {
    display: inline-flex;
    flex: 1;
    flex-direction: column;
    .el-form-item__label {
      font-size: 14px;
    }
  }
}
</style>
