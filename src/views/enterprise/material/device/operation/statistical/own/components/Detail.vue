<template>
  <div class="noborder">
    <el-drawer
      :visible="visible"
      :with-header="false"
      :modal="false"
      :custom-class="$route.meta.isProject ? 'project-detail' : 'enterprise-detail'"
    >
      <div class="rounded-1 bg-secondary">
        <nBackTop
          :title="`自有设备${infoData.approach_state == 6 ? '报废' : '进场'}信息`"
          :selfControl="true"
          @back="close"
        />
      </div>
      <div
        class="p-2 rounded-1 bg-white position-relative"
        :class="$route.meta.isProject ? 'project-height' : 'enterprise-height'"
      >
        <n-scroll>
          <div class="px-1">
            <div
              class=" position-absolute"
              style="right:20px"
              v-if="
                (infoData.approach_allocation_id_un || infoData.approach_state == 9 || infoData.approach_state == 7) &&
                  !record
              "
            >
              <n-button class="ml-2" :btnText="'调拨记录'" @buttonClick="QueryRecord"> </n-button>
            </div>
            <template v-if="record">
              <div class="d-flex ml-3">
                <div
                  class="mr-2 cursor-p"
                  :class="{ 'text-hover-primary': i == index }"
                  v-for="(item, index) in recordArr"
                  :key="index"
                  @click="switchRecord(index)"
                >
                  第{{ recordArr.length - index }}次调拨
                </div>
              </div>
              <nInfoItem
                :lable_width="100"
                :class="[index == 0 ? 'mt-2' : '']"
                :colorString="item.Colorfun ? item.Colorfun(recordInfo[item.key]) : ''"
                :data="{
                  name: item.name,
                  value: item.fun ? item.fun(recordInfo[item.key]) : recordInfo[item.key],
                  unit: item.unit,
                }"
                :islong="item.islong ? true : false"
                v-for="(item, index) in dataInfoList4"
                :key="index + 'a'"
              />
              <nPicInfo :picList="recordInfo.pic_list" />
              <nFileInfo :fileList="recordInfo.file_list" />
              <nInfoTitle :title="'设备折旧信息'" />
              <nInfoItem
                :class="[index == 0 ? 'mt-2' : '']"
                :lable_width="100"
                :colorString="item.Colorfun ? item.Colorfun(recordInfo[item.key]) : ''"
                :data="{
                  name: item.name,
                  value: item.fun ? item.fun(recordInfo[item.key]) : recordInfo[item.key],
                  unit: item.unit,
                }"
                :islong="item.islong ? true : false"
                v-for="(item, index) in dataInfoList5"
                :key="index + 'f'"
              />
            </template>
            <template v-else>
              <nInfoTitle :title="'基本信息'" />
              <nInfoItem
                :lable_width="100"
                :class="[index == 0 ? 'mt-2' : '']"
                :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
                :data="{
                  name: item.name,
                  value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
                  unit: item.unit,
                }"
                :islong="item.islong ? true : false"
                v-for="(item, index) in dataInfoList"
                :key="index + 'a'"
              />
              <div class="position-relative">
                <div class="position-absolute  person-box">
                  <el-popover placement="right" width="260" trigger="hover" @show="show" :open-delay="100">
                    <div class="mt-1 pl-1">
                      <div class="text-hover-primary mb-1">历史负责人：</div>
                      <div v-if="chargeArr.length">
                        <div class="mb-1" v-for="item in chargeArr" :key="item.approach_charge_id">
                          <div class="font-14">负责人：{{ item.account_name }}</div>
                          <div class="font-14 mt-05">
                            管理时间：{{ item.approach_charge_start_date }}~{{ item.approach_charge_end_date }}
                          </div>
                        </div>
                      </div>
                      <div class="w-100 text-center" v-else>- -</div>
                    </div>
                    <span slot="reference" class="text-hover-primary cursor-p">
                      当前负责人：{{ infoData.account_name }}</span
                    >
                  </el-popover>
                </div>
                <nInfoTitle :title="'设备进场信息'" />
                <nInfoItem
                  :lable_width="100"
                  :class="[index == 0 ? 'mt-2' : '']"
                  :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
                  :data="{
                    name: item.name,
                    value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
                    unit: item.unit,
                  }"
                  :islong="item.islong ? true : false"
                  v-for="(item, index) in dataInfoList1"
                  :key="index + 'b'"
                />
              </div>
              <nPicInfo :picList="infoData.pic_list" />
              <nFileInfo :fileList="infoData.file_list" />
              <nInfoTitle :title="'设备折旧信息'" />
              <template v-if="infoData.approach_is_allocation == 1">
                <nInfoItem
                  :class="[index == 0 ? 'mt-2' : '']"
                  :lable_width="100"
                  :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
                  :data="{
                    name: item.name,
                    value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
                    unit: item.unit,
                  }"
                  :islong="item.islong ? true : false"
                  v-for="(item, index) in dataInfoList3"
                  :key="index + 'd'"
                />
              </template>
              <nInfoItem
                :class="[index == 0 ? 'mt-2' : '']"
                :lable_width="100"
                :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
                :data="{
                  name: item.name,
                  value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
                  unit: item.unit,
                }"
                :islong="item.islong ? true : false"
                v-for="(item, index) in dataInfoList2"
                :key="index + 'c'"
              />
              <template v-if="infoData.approach_state == 6">
                <nInfoTitle :title="'设备报废信息'" />
                <nInfoItem
                  :class="[index == 0 ? 'mt-2' : '']"
                  :lable_width="100"
                  :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
                  :data="{
                    name: item.name,
                    value: item.fun ? item.fun(infoData) : infoData[item.key],
                    unit: item.unit,
                  }"
                  :islong="item.islong ? true : false"
                  v-for="(item, index) in dataInfoList6"
                  :key="index + 'h'"
                />
              </template>
            </template>
          </div>
        </n-scroll>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/index";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    infoData: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  data() {
    return {
      chargeArr: [],
      record: false,
      recordArr: ["第一次调拨", "第二次调拨"],
      recordInfo: ["第一次调拨", "第二次调拨"],
      i: 0,
      dataInfoList: [
        { name: "设备名称", key: "approach_name" },
        {
          name: "设备类型",
          key: "approach_equip_type",
          fun: val => {
            return ["", "普通设备", "特种设备"][val];
          },
        },
        { name: "设备识别码", key: "approach_imei" },
        { name: "设备型号", key: "approach_spec" },
        { name: "设备品牌", key: "approach_brand" },
        { name: "设备厂家", key: "approach_factory" },
        { name: "出厂日期", key: "approach_manufacture_date" },
        { name: "使用功率", key: "approach_power", unit: "HZ" },
        { name: "购买原值", key: "approach_money" },
        { name: "购买时间", key: "approach_buy_date" },
        { name: "供方单位", key: "supply_unit" },
        { name: "我方单位", key: "own_organ_area" },
      ],
      dataInfoList1: [
        { name: "工程项目", key: "organ_area" },
        {
          name: "进场时间",
          key: "approach_start_time",
        },
        { name: "设备地址", key: "approach_location" },
        { name: "设备编号", key: "approach_no" },
        { name: "下次维养时间", key: "approach_maintain_time" },
        { name: "备注", key: "approach_remark" },
      ],
      dataInfoList2: [
        { name: "开始折旧时间", key: "approach_depreciation_date" },
        {
          name: "折旧月",
          key: "approach_depreciation_total_month",
          unit: "个月",
        },
        { name: "预计净残值", key: "approach_depreciation_residual", unit: "元" },
        { name: "本月折旧金额", key: "approach_depreciation_month_res", unit: "元" },
        { name: "累计折旧金额", key: "approach_depreciation_total_res", unit: "元" },
        { name: "净值", key: "approach_depreciation_money", unit: "元" },
      ],
      dataInfoList3: [
        { name: "进场金额", key: "approach_depreciation_fact_money", unit: "元" },
        {
          name: "原已折旧时间",
          key: "approach_depreciation_month",
          unit: "个月",
        },
      ],
      dataInfoList4: [
        { name: "调出项目", key: "organ_area_out" },
        {
          name: "调出日期",
          key: "allocation_detail_date",
        },
        { name: "设备识别码", key: "approach_imei" },
        { name: "调入项目", key: "organ_area" },
        { name: "进场日期", key: "approach_start_time" },
        { name: "原服役地", key: "approach_location_out" },
        { name: "设备编码", key: "approach_no" },
        { name: "下次维养时间", key: "approach_maintain_time" },
        { name: "设备地址", key: "approach_location" },
        { name: "设备负责人", key: "account_name" },
        { name: "备注", key: "approach_remark", islong: true },
      ],
      dataInfoList5: [
        { name: "进场金额", key: "approach_depreciation_fact_money" },
        {
          name: "原已折旧时间",
          key: "approach_depreciation_history_month",
          unit: "个月",
        },
        {
          name: "购买原值",
          key: "approach_money",
          unit: "元",
        },
        {
          name: "购买日期",
          key: "approach_start_time",
        },
        { name: "开始折旧时间", key: "approach_depreciation_date" },
        {
          name: "当前折旧月",
          key: "approach_depreciation_month",
          unit: "个月",
        },
        { name: "预计净残值", key: "approach_depreciation_residual", unit: "元" },
        { name: "本月折旧金额", key: "approach_depreciation_month_res", unit: "元" },
        { name: "累计折旧金额", key: "approach_depreciation_total_res", unit: "元" },
        { name: "净值", key: "approach_depreciation_money", unit: "元" },
      ],
      dataInfoList6: [
        { name: "进场金额", key: "approach_scrap_original_money", unit: "元" },
        {
          name: "已提折旧",
          key: "approach_scrap_depreciation_money",
          unit: "元",
        },
        {
          name: "已用年限",
          key: "approach_scrap_depreciation_month",
          unit: "个月",
        },
        {
          name: "残值",
          key: "approach_scrap_residual",
          unit: "元",
        },
        { name: "处理金额", key: "approach_scrap_treat_money", unit: "元" },
        {
          name: "收购对象",
          key: "approach_scrap_treat_name",
        },
        { name: "联系方式", key: "approach_scrap_treat_phone" },
        { name: "报废简要说明", key: "approach_scrap_explain", islong: true },
        { name: "处理方式", key: "approach_scrap_treat_type", islong: true },
      ],
    };
  },
  methods: {
    //历史人开启时
    async show() {
      let { result } = await api.QueryApproachChargeAccount({
        approach_charge_approach_id_un: this.infoData.approach_id,
      });
      this.chargeArr = result;
    },
    async QueryRecord() {
      let { result } = await api.QueryApproachAllocationRecord({
        approach_id: this.infoData.approach_id,
        approach_state: this.infoData.approach_state,
      });
      this.recordArr = result;
      this.recordInfo = result[0];
      this.record = true;
    },
    switchRecord(index) {
      this.recordInfo = this.recordArr[index];
      this.i = index;
    },
    close() {
      this.record = false;
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.noborder ::v-deep :focus {
  outline: 0;
}
.person-box {
  right: 270px;
  top: 10px;
}
</style>
