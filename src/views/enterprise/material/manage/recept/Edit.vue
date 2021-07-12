<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="编辑材料收发存信息" />
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
              <el-form-item
                class="form-item-long-small must"
                label="月份选择："
              >
              </el-form-item>
              <el-date-picker
                :clearable="false"
                class="w-100"
                v-model="info.material_standing_book_date"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择月份"
              ></el-date-picker>
            </div>
            <div class="form-item-wrapper">
              <el-form-item
                class="form-item-long-small must"
                label="材料名称："
              >
              </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="info.material_standing_book_name"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="规格型号："> </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="info.material_standing_book_spec"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="form-item-long-small must" label="单位：">
              </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="info.material_standing_book_unit"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper"></div>
          </div>

          <hr
            style="
              border: none;
              border-top: 1px solid #e2e8ee;
              margin-bottom: 16px;
            "
          />

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <Count :config="calcConfig.lastRemain" :data="info"></Count>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <Count
                :config="calcConfig.currentInput"
                @inputChange="handleInput"
                :data="info"
              ></Count>
            </div>
            <div class="form-item-wrapper">
              <Count
                :config="calcConfig.currentOutput"
                @inputChange="handleInput"
                :data="info"
              ></Count>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <Count :config="calcConfig.totalInput" :data="info"></Count>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <Count :config="calcConfig.totalOutput" :data="info"></Count>
            </div>
            <div class="form-item-wrapper">
              <Count :config="calcConfig.currentRemain" :data="info"></Count>
            </div>
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
import Count from "./components/Count";
import { calcConfig } from "@/constants/material.js";
import { editMixin } from "@/mixins/material.js";

export default {
  mixins: [editMixin],
  data() {
    return {
      rulesKey: "RECEPT_EDIT_RULES",
      unFormatList: ["material_standing_book_date"],
      updateURL: "UpdateMaterialStandingBook",
      calcConfig: JSON.parse(JSON.stringify(calcConfig)),
    };
  },
  components: { Count },

  methods: {
    handleInput(val) {
      // count
      if (
        this.info.material_standing_book_receive_num !== "" &&
        this.info.material_standing_book_out_num !== ""
      ) {
        this.info.material_standing_book_month_num = parseFloat(
          this.info.material_standing_book_receive_num -
            this.info.material_standing_book_out_num
        );
      }
      // money
      if (
        this.info.material_standing_book_receive_money !== "" &&
        this.info.material_standing_book_out_money !== ""
      ) {
        this.info.material_standing_book_month_money = parseFloat(
          this.info.material_standing_book_receive_money -
            this.info.material_standing_book_out_money
        );
      }
    },
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
