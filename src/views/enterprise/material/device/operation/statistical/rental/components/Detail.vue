<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:54
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-06 09:33:48
-->
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
          :title="`租赁设备${infoData.approach_state == 11 ? '退场' : '进场'}信息`"
          :selfControl="true"
          @back="close"
        />
      </div>
      <div :class="$route.meta.isProject ? 'project-height' : 'enterprise-height'" class="p-2 rounded-1 bg-white">
        <n-scroll>
          <div class="px-1">
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
              :key="index + 'c'"
            />
            <div class="position-relative">
              <div class="position-absolute  person-box">
                <el-popover placement="right" width="260" trigger="hover" @show="show">
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
            <nInfoTitle :title="'设备租用信息'" />
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
              v-for="(item, index) in dataInfoList2"
              :key="index + 'a'"
            />
            <template v-if="infoData.approach_state == 11">
              <nInfoTitle :title="'设备结算信息'" />
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
                v-for="(item, index) in dataInfoList3"
                :key="index + 'e'"
              />
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
      dataInfoList: [
        { name: "工程项目", key: "organ_area" },
        {
          name: "设备类型",
          key: "approach_equip_type",
          fun: val => {
            return ["", "普通设备", "特种设备"][val];
          },
        },
        { name: "设备名称", key: "approach_name" },
        { name: "设备型号", key: "approach_spec" },
        { name: "租赁单位", key: "supply_unit" },
        { name: "设备品牌", key: "approach_brand" },
      ],
      dataInfoList1: [
        { name: "设备编号", key: "approach_no" },
        {
          name: "进场时间",
          key: "approach_start_time",
        },
        { name: "设备地址", key: "approach_location" },
        { name: "下次维养时间", key: "approach_maintain_time" },
        { name: "备注", key: "approach_remark" },
      ],
      dataInfoList2: [
        {
          name: "租用方式",
          fun: val => {
            return ["", "日", "月", "季", "年"][val.approach_lease_type] + "租";
          },
        },
        {
          name: "租用单价",
          key: "approach_lease_price",
          unit: "元",
        },
        {
          name: "租用时间段",
          fun: val => {
            return `${val.approach_lease_start_date}~${val.approach_lease_end_date}`;
          },
        },
        { name: "租用总金额", key: "approach_lease_money", unit: "元" },
      ],
      dataInfoList3: [
        {
          name: "租用方式",
          fun: val => {
            return ["", "日", "月", "季", "年"][val.approach_exeunt_type] + "租";
          },
        },
        {
          name: "结算时长",
          fun: val => {
            return val.approach_exeunt_date_num + ["", "日", "个月", "个季度", "年"][val.approach_exeunt_type];
          },
        },
        {
          name: "租用单价",
          fun: val => {
            return val.approach_exeunt_price + ["", "元/日", "元/月", "元/季", "元/年"][val.approach_exeunt_type];
          },
        },
        { name: "结算金额", key: "approach_exeunt_money", unit: "元" },
        { name: "已付租金", key: "approach_exeunt_payment_money", unit: "元" },
        { name: "累计欠款租金", key: "approach_exeunt_lack_money", unit: "元" },
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
    close() {
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
