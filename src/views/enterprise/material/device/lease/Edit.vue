<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="编辑租赁设备信息" />
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
                v-model="deviceInfo.equipment_lease_standing_book_depart"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="自编编号："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_no"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="设备名称："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_name"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="型号规格："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_spec"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="生产厂家："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_factor"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>
          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="出租公司："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_lease"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="价格说明："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_lease_info"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper">
              <el-form-item class="must" label="登记姓名："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_username"
                placeholder="请输入"
              ></el-input>
            </div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="登记电话："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_phone"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="状态："> </el-form-item>
              <el-input
                class="input-m w-100"
                v-model="deviceInfo.equipment_lease_standing_book_state"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="form-item-wrapper"></div>
          </div>

          <div class="line-wrapper">
            <div class="form-item-wrapper">
              <el-form-item class="must" label="起租日期："> </el-form-item>
              <el-date-picker
                :clearable="false"
                class="w-100"
                v-model="deviceInfo.equipment_lease_standing_book_start_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </div>
            <div class="form-item-wrapper ml-4 mr-4">
              <el-form-item class="must" label="终租日期："> </el-form-item>
              <el-date-picker
                :clearable="false"
                class="w-100"
                v-model="deviceInfo.equipment_lease_standing_book_end_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
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
      updateURL: "UpdateEquipmentLeaseStandingBook",
      rulesKey: "LEASE_EDIT_RULES",
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
