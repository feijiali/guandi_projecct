<template>
  <n-nodata
    v-if="isSeriesEmpty"
  ></n-nodata>
  <chart-pie v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from "lodash";
import ChartPie from "./echart_pie.vue";

export default {
  name: "EchartPie",
  components: { ChartPie },
  props: ChartPie.props,
  computed: {
    isSeriesEmpty() {
      return (
        isEmpty(this.seriesData) || this.seriesData.every(item => !item.value)
      );
    }
  }
};
</script>