<template>
  <div>
    <nInfoTitle :title="'基本信息'" />
    <nInfoItem
      :lable_width="90"
      :class="[index == 0 ? 'mt-2' : '']"
      :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
      :data="{
        name: item.name,
        value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
        unit: item.unit,
      }"
      :islong="item.islong ? true : false"
      v-for="(item, index) in dataInfoList1"
      :key="index + 'a'"
    />
    <div class="ml-2">
      <span class="grey2">星级评价：</span>
      <el-rate
        class="d-inline-block"
        disabled
        v-model="infoData.supply_unit_assess"
        :text-color="infoData.supply_unit_assess > 2 ? '#3dc913' : 'red'"
        show-text
        :colors="colors"
      ></el-rate>
    </div>
    <nInfoTitle :title="'其他信息'" class="mt-1" />
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
      v-for="(item, index) in dataInfoList2"
      :key="index + 'b'"
    />
    <nInfoTitle
      :title="'附件信息'"
      class="mt-1 mb-1"
      v-if="infoData.pic_list.length || infoData.file_list.length"
    />
    <nPicInfo :picList="infoData.pic_list" />
    <nFileInfo :fileList="infoData.file_list" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ["不合格", "不合格", " 合格", "合格", "合格"],
      colors: ["#FD5571", "#3dc913", "#3dc913"],
      dataInfoList1: [
        { name: "供应商名称", key: "supply_unit" },
        { name: "联系人", key: "supply_unit_contractor" },
        {
          name: "供应商类型",
          key: "supply_unit_type",
          fun: val => {
            return { 100: "材料", 200: "设备", 300: "其他" }[val];
          },
        },
        { name: "联系方式", key: "supply_unit_contractor_tel" },
        { name: "经营类型", key: "supply_unit_run_type" },
        { name: "具体地址", key: "location", islong: true },
        { name: "经营内容", key: "business_name", islong: true },
        { name: "评价内容", key: "supply_unit_assess_content", islong: true },
      ],
      dataInfoList2: [
        { name: "法定代表人", key: "supply_unit_legal" },
        { name: "公司网址", key: "supply_unit_web_addr" },
        { name: "纳税人识别号", key: "supply_unit_taxpayer" },
        { name: "注册资本", key: "supply_unit_capital", unit: "万元" },
        { name: "开户银行", key: "supply_unit_bank_name" },
        { name: "公司传真", key: "supply_unit_fax" },
        { name: "开会银行账号", key: "supply_unit_bank_num" },
        { name: "提交人", key: "account_name" },
        { name: "备注", key: "supply_unit_remark", islong: true },
        { name: "提交时间", key: "supply_unit_sub_time" },
      ],
    };
  },
  props: {
    infoData: {
      type: Object,
      default: () => ({ pic_list: [], file_list: [] }),
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.detail-label {
  width: 80px;
}
.pic-box {
  width: 24%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(51, 119, 255, 0.1) 3px 18px 16px 0px;
  margin-right: 10px;
}
</style>
