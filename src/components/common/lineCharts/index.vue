<template>
  <div class="line_container">
    <div class="line_box" :id="chartid"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      //图表的唯一标识
      type: String,
      default: "",
    },
    charts: {
      type: Object,
    },
    isInit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initFlag: true,
      chartid: "chart_" + this.id,
      myChart: "",
      option: {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var res =
              "<div><p>时间：" + params[0].data.time
                ? params[0].data.time
                : params[0].name + "</p></div>";
            for (var i = 0; i < params.length; i++) {
              res +=
                "<p>" +
                params[i].data.name +
                "：" +
                params[i].data.value +
                "</p><p>状态：" +
                params[i].data.status +
                "</p>";
            }
            return res;
          },
        },
        xAxis: {
          boundaryGap: false,
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#131d35",
            },
          },
          axisLine: {
            lineStyle: {
              color: "red",
              width: 2,
            },
          },
          splitLine: {
            show: false,
            // lineStyle: {
            //   color: "#c8cedb",
            //   type: "dashed"
            // }
          },
        },
        dataZoom: [
          {
            show: true,
            height: 20,
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        yAxis: {
          type: "value",
          min: 0,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#8899ac",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#c8cedb",
              type: "dashed",
            },
          },
        },
        grid: {
          top: "6%",
          left: "",
          right: "30px",
          bottom: "10%",
          containLabel: true,
        },
        series: [],
      },
    };
  },
  watch: {
    charts: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  mounted() {
    if (!this.isInit) {
      this.myChart = this.$echarts.init(document.getElementById(this.chartid));
      this.initChart();
    }
  },
  methods: {
    // clickChartEvent() {
    //   this.myChart.on("click", "series.line", () => {
    //     this.$emit("mychart");
    //   });
    // },
    initChart() {
      if (!this.myChart) {
        this.myChart = this.$echarts.init(
          document.getElementById(this.chartid)
        );
      }
      if (this.charts.value.length > 0) {
        let arr = JSON.parse(JSON.stringify(this.charts.value));
        let result = arr.sort((a, b) => {
          return b[1].value - a[1].value;
        });
        this.option.yAxis.max = result[0][1].value * 2;
      } else {
        this.option.yAxis.max = this.charts.max;
      }
      var color = this.charts.color;
      var lineY = [];
      var dateList = this.charts.value.map(function (item) {
        return item[0];
      });
      var valueList = this.charts.value.map(function (item) {
        return item[1];
      });
      for (var i = 0; i < this.charts.names.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data = {
          name: this.charts.names[i],
          type: "line",
          color: color[0] + ")",
          smooth: true,
          // showSymbol: false,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[0] + ", .7)",
                  },
                  {
                    offset: 1,
                    color: color[0] + ", 0)",
                  },
                ],
                false
              ),
            },
          },
          symbol: "emptyCircle",
          symbolSize: 5,
          data: valueList,
        };
        lineY.push(data);
      }
      this.option.xAxis.data = dateList;
      lineY[0].markLine = {
        silent: true,
        lineStyle: {
          width: 1,
          color: "#ff5458",
        },
        symbol: ["none", "none"],
        data: [
          {
            yAxis: this.charts.minAlarmLine,
          },
          {
            yAxis: this.charts.maxAlarmLine,
          },
        ],
      };
      this.option.series = lineY;
      this.myChart.setOption(this.option);
      if (this.initFlag) {
        this.resizefun = () => {
          this.myChart.resize();
        };
        window.addEventListener("resize", this.resizefun);
        this.initFlag = false;
      }
      // this.clickChartEvent();
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
};
</script>

<style scoped lang="scss">
.line_container {
  width: 100%;
  height: 88%;
  border-radius: 20px;
  .line_box {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
</style>
