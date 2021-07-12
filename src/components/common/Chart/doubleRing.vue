<template>
  <!-- 采用highchart实现圆角的环形图 支持单环和双环 -->
  <div class="highcharts_container text-center" :id="chartsid"></div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge.js";
HighchartsMore(Highcharts);
SolidGauge(Highcharts);
export default {
  data() {
    return {
      chartsid: "highChart_" + this.id,
      myChart: "",
      dataRing: [
        {
          name: "外环",
          borderColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, "#55e7e7"],
              [1, "#4ADAE8"],
            ],
          },
          data: [
            {
              radius: "100%",
              innerRadius: "100%",
            },
          ],
        },
        {
          name: "内环",
          borderColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, "#67b6fd"],
              [1, "#5a5efd"],
            ],
          },
          data: [
            {
              radius: "75%",
              innerRadius: "75%",
            },
          ],
        },
      ],
      panTrack: [
        {
          // Track for 外环
          outerRadius: "110%",
          innerRadius: "89%",
          backgroundColor: "#E5EDF7",
          borderWidth: 0,
        },
        {
          // 内环轨道 for 内环
          outerRadius: "87%",
          innerRadius: "63%",
          backgroundColor: "#E5EDF7",
          borderWidth: 0,
        },
      ],
      options: {
        chart: {
          type: "solidgauge",
          backgroundColor: "rgba(0,0,0,0)",
        },
        credits: {
          enabled: false,
        },
        title: {
          floating: true,
          align: "center",
          verticalAlign: "middle",
          useHTML: true,
          style: {
            textAlign: "center",
            fontSize: this.fontSize,
            color: this.titleColor,
          },
        },
        tooltip: {
          borderWidth: 0,
          backgroundColor: "none",
          shadow: false,
          style: {
            fontSize: "16px",
          },
        },
        pane: {
          startAngle: 360,
          endAngle: 0,
          center: ["50%", "48%"],
          background: [],
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
        },
        plotOptions: {
          solidgauge: {
            center: ["50%", "85%"],
            enableMouseTracking: false,
            borderWidth: "7%",
            dataLabels: {
              enabled: false,
            },
            linecap: "round",
            stickyTracking: false,
          },
        },
        series: [],
      },
    };
  },
  props: {
    id: {
      type: String,
      default: "0",
    },
    title: "",
    fontSize: {
      type: String,
      default: "0.6rem",
    },
    titleSize: {
      type: String,
      default: "0.6rem",
    },
    titleColor: {
      type: String,
      default: "#131d35",
    },
    dataList: {
      type: Object,
      default: null,
    },
    initFlag: {
      //是否挂载时就加载图表
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dataList: {
      handler: function () {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    if (!this.initFlag) {
      this.updateChart();
    }
  },
  methods: {
    initChart() {
      let pane = [];
      let series = [];
      for (let i = 0; i < this.dataList.data.length; i++) {
        pane.push(this.panTrack[i]);
        series.push({});
      }
      this.options.series = series;
      this.options.pane.background = pane;
      this.myChart = new Highcharts.chart(this.chartsid, this.options);
    },
    updateChart() {
      if (!this.myChart) {
        this.initChart();
      }
      var data = this.$utils.cloneObj(this.dataList.data);
      var color = this.dataList.color;
      var k = 0;
      let text =
        '<span style="font-size: ' +
        this.titleSize +
        "; color: " +
        this.titleColor +
        '">' +
        this.title +
        "</span>" +
        "<br><span style='font-weight: bold;'>" +
        this.dataList.showValue +
        "<span>";
      for (let i = 0; i < data.length; i++) {
        var obj = this.$utils.cloneObj(this.dataRing[i]);
        obj.data[0].y = data[i];
        obj.borderColor.stops = [
          [0, color[k]],
          [1, color[k + 1]],
        ];
        k += 2;
        this.myChart.series[i].update(obj);
      }
      this.myChart.title.update({ text: text });
    },
  },
};
</script>
<style lang="scss" scoped>
.highcharts_container {
  width: 100%;
  height: 100%;
}
</style>
