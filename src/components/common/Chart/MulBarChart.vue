<template>
  <div class="h-100">
    <n-nodata v-if="dataList && dataList.length == 0"></n-nodata>
    <div v-if="dataList && dataList.length != 0" :id="id" class="w-100 h-100 cursor-p"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    init: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true,
      default: "houseStatistics"
    },
    labelUnit: {
      type: String,
      required: false,
      default: ""
    },
    barWidth: {
      type: String,
      required: false,
      default: "15%"
    },
    dataList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      initFlag: true,
      myChart: null,
      options: {
        title: {
          text: this.title,
          x: "left",
          top: 10,
          left: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}" + this.labelUnit,
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "4%",
          top: 40,
          right: "4%",
          bottom: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
              color: "#707070"
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#4D4D4D"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#707070"
              }
            },
            data: []
          }
        ],
        yAxis: {
          type: "value",
          name: "单位 / " + this.labelUnit,
          nameGap: 15,
          nameTextStyle: {
            fontSize: 12,
            color: "#909298"
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#909298"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "统计",
            type: "bar",
            barWidth: this.barWidth,
            data: []
          }
        ]
      }
    };
  },
  watch: {
    dataList: {
      handler: function() {
        if (this.myChart&&this.dataList && this.dataList.length != 0) {
          this.setChart();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (this.dataList && this.dataList.length != 0) {
        this.myChart = echarts.init(document.getElementById(this.id));
        this.setChart();
        this.initFlag = false;
      }
    },
    setChart() {
      let series = [];
      let xData = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let serie = {
          name: this.dataList[i].name,
          value: this.dataList[i].value,
          itemStyle: {
            barBorderRadius: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: this.dataList[i].color[0]
              },
              {
                offset: 1,
                color: this.dataList[i].color[1]
              }
            ])
          }
        };
        xData.push(this.dataList[i].name);
        series.push(serie);
      }
      this.options.xAxis[0].data = xData;
      this.options.series[0].data = series;
      this.myChart.setOption(this.options);
      this.myChart.resize();
      if (this.initFlag) {
        let resizeFun = () => {
          this.myChart.resize();
        };
        window.addEventListener("resize", resizeFun);
        this.initFlag = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
