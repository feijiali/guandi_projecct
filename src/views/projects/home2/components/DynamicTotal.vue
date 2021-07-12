<!--
 * @Autor: 邓易
 * @Date: 2021-03-24 11:39:59
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:02:08
-->
<template>
  <div class="position-relative w-100">
    <div class="chart_title d-flex justify-content-between align-items-center">
      <div>
        <span class="font-weight-bold font-16">日常巡检与整改次数统计</span>
        <div class="ml-1 font-12">
          <span class="grey2 font-12">单位/次</span>
        </div>
      </div>
      <div class="ml-1">
        <span class="legend_normal legendgreen1"></span>
        <span class="mr-1 font-12">日常巡检</span>
        <span class="legend_normal legendgreen2"></span>
        <span class="mr-1 font-12">巡检通过</span>
        <span class="legend_normal legendgreen3"></span>
        <span class="mr-1 font-12">整改中</span>
      </div>
      <div class="disi border1 bdr10 time-choose-single-box" @click.stop>
        <el-date-picker
          style="width: 100px"
          :clearable="false"
          class="home-date-box"
          ref="datePicker"
          v-model="mixing_rank_year"
          format="yyyy"
          value-format="yyyy"
          type="year"
          placeholder="请选择"
          @change="getData"
        ></el-date-picker>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="linkTo('project_safety3_produceManage_inspection')"
      >
        <span class="info-link"> 详情 </span>
      </div>
    </div>
    <n-BarChart
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :colUnit="'次'"
      :minInterval="1"
      :id="'lq_1'"
      :catagetryNum="12"
      :barWidth="'10'"
    ></n-BarChart>
  </div>
</template>

<script>
import api from "@/api/index";
import charts from "@/components/common/Chart/charts";
export default {
  components: {
    charts,
  },
  data() {
    return {
      mixing_rank_year: this.$utils.parseDate2Str(new Date(), "YYYY"),
      textArr: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      data: [
        {
          data: [],
          color: ["#67b6fd", "#5a5efd"],
        },
        {
          data: [],
          color: ["#1ad910", "#1CB6B3"],
        },
        {
          data: [],
          color: ["#F76EB3", "#EC2358"],
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "SafeDailyInspection",
      });
    },
    async getData() {
      let data = await api.querySafeInspectionRectificationStat({
        organ_node: this.$organ_id_en_or_pro(this),
        daily_inspection_date: this.mixing_rank_year,
      });
      let list = data.result;
      if (list.length > 0) {
        list.forEach((ele) => {
          if (ele.inspection_count) {
            this.data[0].data.push(ele.inspection_count);
          }
          if (ele.inspection_adopt_count) {
            this.data[1].data.push(ele.inspection_adopt_count);
          }
          if (ele.inspecting_count) {
            this.data[2].data.push(ele.inspecting_count);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-item {
  left: 0;
  right: 0;
  position: absolute !important;
  top: 43px;
  bottom: 0;
  padding: 10px;
  height: auto !important;
}
.chart_title {
  padding: 10px 10px 0;
}
.legendgreen1 {
  background: linear-gradient(to bottom, #67b6fd, #5a5efd);
}
.legendgreen2 {
  background: linear-gradient(to bottom, #3be68b, #1cb6b3);
}
.legendgreen3 {
  background: linear-gradient(to bottom, #f76eb3, #ec2358);
}
</style>
