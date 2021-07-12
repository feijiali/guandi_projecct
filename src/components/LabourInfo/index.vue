<template>
  <div>
    <nInfoTitle class="mb-2" title="基础信息" />
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
      v-for="(item, index) in dataInfoList"
      :key="index + 'a'"
    />
    <nInfoTitle
      class="mt-2 mb-2"
      :title="'历史业绩(' + infoData.historyAchievList.length + ')'"
      v-if="infoData.historyAchievList"
    />
    <div class="d-flex flex-wrap mb-2">
      <div
        class="pic-box mb-2"
        v-for="(item, index) in infoData.historyAchievList"
        :key="index"
      >
        <img class="rounded w-100" style="height: 140px" :src="item.imageUrl" />
        <p class="text-overflow-ellipsis mt-05">
          {{ item.project_name }}
        </p>
      </div>
    </div>
    <nInfoTitle
      class="mt-2 mb-2"
      :title="'见证人(' + infoData.witnessList.length + ')'"
      v-if="infoData.witnessList"
    />
    <div class="d-flex flex-wrap mb-2">
      <div
        class="pic-box mb-2"
        v-for="(item, index) in infoData.witnessList"
        :key="index"
      >
        <img style="width: 200px; height: 100px" :src="item.imageUrl" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ["不合格", "不合格", " 合格", "合格", "合格"],
      colors: ["#FD5571", "#3dc913", "#3dc913"],
      dataInfoList: [
        { name: "公司名称", key: "company_name" },
        {
          name: "劳务性质",
          key: "iscompany",
        },
        { name: "地区", key: "area" },
        { name: "负责人", key: "person_name" },
        { name: "负责人电话", key: "person_tel" },
        { name: "信誉评分", key: "credit_score" },
        { name: "施工范围", key: "work_range",islong:true  },
        { name: "公司简介", key: "info",islong:true },
        { name: "团队情况", key: "team",islong:true  },
      ],
    };
  },
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
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
