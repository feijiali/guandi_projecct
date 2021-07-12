<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="编辑自有设备信息" />
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
                v-model="deviceInfo.organ"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="项目部："> </el-form-item>
              <el-input
                class="input-m w-100"
                disabled
                v-model="deviceInfo.equipment_standing_book_depart"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="日期："> </el-form-item>
              <el-date-picker
                :clearable="false"
                class="w-100"
                disabled
                v-model="deviceInfo.equipment_standing_book_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="资产编号："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_standing_book_no"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="资产名称："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_standing_book_name"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="型号规格："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_standing_book_spec"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="生产能力："> </el-form-item>
              <el-select
                class="w-100"
                filterable
                allow-create
                v-model="deviceInfo.equipment_standing_book_level"
                placeholder="请输入/选择"
              >
                <el-option
                  v-for="(item, index) in bookLevelArr"
                  :key="index"
                  :label="item.equipment_standing_book_level"
                  :value="item.equipment_standing_book_level"
                ></el-option>
              </el-select>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="生产厂家："> </el-form-item>
              <el-select
                class="w-100"
                filterable
                allow-create
                v-model="deviceInfo.equipment_standing_book_factor"
                placeholder="请输入/选择"
              >
                <el-option
                  v-for="(item, index) in factorArr"
                  :key="index"
                  :label="item.equipment_standing_book_factor"
                  :value="item.equipment_standing_book_factor"
                ></el-option>
              </el-select>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="出厂编号："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_standing_book_factor_no"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="购置年限："> </el-form-item>
              <el-select
                class="w-100"
                filterable
                allow-create
                v-model="deviceInfo.equipment_standing_book_year"
                placeholder="请输入/选择"
              >
                <el-option
                  v-for="(item, index) in bookYearArr"
                  :key="index"
                  :label="item.equipment_standing_book_year"
                  :value="item.equipment_standing_book_year"
                ></el-option>
              </el-select>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="停放地点："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_standing_book_addr"
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
import { editMixin } from "@/mixins/device.js";

export default {
  mixins: [editMixin],
  data() {
    return {
      updateURL: "UpdateEquipmentStandingBook",
      rulesKey: "SELF_EDIT_RULES",
      bookLevelArr: [], //生产能力
      factorArr: [], //生产厂家
      bookYearArr: [], //购置年限
    };
  },
  mounted() {
    this.QueryEquipmentStandingBookFactory();
    this.QueryEquipmentStandingBookLevel();
    this.QueryEquipmentStandingBookYear();
  },
  methods: {
    async QueryEquipmentStandingBookFactory() {
      let { result } = await api.QueryEquipmentStandingBookFactory({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.factorArr = result;
    },
    async QueryEquipmentStandingBookLevel() {
      let { result } = await api.QueryEquipmentStandingBookLevel({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.bookLevelArr = result;
    },
    async QueryEquipmentStandingBookYear() {
      let { result } = await api.QueryEquipmentStandingBookYear({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.bookYearArr = result;
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
.el-select.w-100 {
  ::v-deep .el-input {
    width: 100%;
  }
}
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
