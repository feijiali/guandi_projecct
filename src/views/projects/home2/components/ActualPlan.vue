<!--
 * @Autor: 邓易
 * @Date: 2021-03-24 15:04:06
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:04:37
-->
<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title top-select-box">
      <div class="flex-fill d-flex">
        <div>
          <div class="font-weight-bold font-16">实际与计划对比</div>
        </div>
        <div class="ml-1">
          <span class="legend_normal legendgreen1"></span>
          <span class="mr-1 font-12">计划量</span>
          <span class="legend_normal legendgreen2"></span>
          <span class="mr-1 font-12">实际量</span>
        </div>
      </div>
    </div>
    <n-BarChart
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :colUnit="'次'"
      :minInterval="1"
      :id="'lq_4'"
      :catagetryNum="12"
      :barWidth="'20'"
    ></n-BarChart>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      textArr: ["隧道", "桥梁", "路基"],
      data: [
        {
          data: [100, 201, 300],
          color: ["#67b6fd", "#5a5efd"],
          name: "计划量",
        },
        {
          data: [200, 150, 350],
          color: ["#3BE68B", "#1CB6B3"],
          name: "实际量",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let data = await api.queryUnitUnionProcess({
        organ_node: this.$organ_id_en_or_pro(this),
        object: 1,
      });
      let list = data.result;
      let plan = [],
        actrul = [];
      list.forEach((item) => {
        plan.push(item.plan.toFixed(2));
        actrul.push(item.real.toFixed(2));
      });
      this.$set(this.data[0], "data", plan);
      this.$set(this.data[1], "data", actrul);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart_title {
  padding: 10px 10px 0;
}
.chart-item {
  left: 10px;
  right: 10px;
  position: absolute !important;
  top: 53px;
  padding: 10px;
  bottom: 0;
}
.legend_normal {
  margin-right: 7px;
}
@media screen and (max-width: 1600px) {
  .legend_normal {
    margin: 0;
  }
  .chart_title {
    .mr-1 {
      margin: 0;
    }
  }
}
.legendgreen1 {
  background: linear-gradient(to bottom, #67b6fd, #5a5efd);
}
.legendgreen2 {
  background: linear-gradient(to bottom, #3be68b, #1cb6b3);
}
</style>
