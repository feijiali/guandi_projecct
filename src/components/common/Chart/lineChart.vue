<template>
  <!-- 折线图的公共组件 -->
  <div class="chart-box-wrap">
    <n-nodata class="nodata" v-if="dataList[0] && dataList[0].data.length == 0"></n-nodata>
    <div class="chart-item1" :id="chartid"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      initFlag: true,
      chartid: "chart_" + this.id,
      myChart: "",
      markArea: {
        type: "line",
        animation: false,
        lineStyle: {
          width: 1,
        },
        markArea: {
          itemStyle: {
            //全局的
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fff",
                },
                {
                  offset: 1,
                  color: "#000",
                },
              ]),
            },
          },
          silent: true,
          data: [
            [
              {
                yAxis: "200",
              },
              {
                yAxis: "850",
              },
            ],
          ],
        },
      },
      line: {
        type: "line",
        smooth: this.smooth,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#55e7e7",
              },
              {
                offset: 1,
                color: "#fff",
              },
            ]),
          },
        },
      },
      option: {
        legend: {
          selectedMode: false, //不可点击
          data: this.legend,
          left: "right",
          top: "top",
        },
        grid: {
          left: "1%",
          top: "10%",
          bottom: "0%",
          right: "6%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#131d35",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#8899ac",
            },
          },
          // data:  this.textArr
        },
        yAxis: {
          max: "dataMax",
          type: "value",
          minInterval: this.minInterval,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#8899ac",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
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
        dataZoom: [
          {
            show: false,
            start: 0,
            end: 100,
            disabled: false,
          },
          {
            type: "inside",
            show: false,
            // height: 15,
            // start: 0,
            // end: 60
          },
        ],
        tooltip: {
          trigger: "axis",
          //   axisPointer: {
          //     type: "shadow"
          //   }
        },
        series: [],
      },
      resizefun: "",
    };
  },
  props: {
    id: {
      //图表的唯一标识
      type: String,
      default: "",
    },
    leftTobox: {
      //图表离盒子左侧的距离
      type: String,
      default: "8%",
    },
    showNegative: {
      type: Boolean,
      default: false,
    }, //线条是否平滑
    smooth: {
      type: Boolean,
      default: true,
    }, //线条是否平滑
    colUnit: "", //纵轴单位，没有就不显示
    textArr: Array, //文本显示的内容
    dataList: Array, //数据内容
    legend: Array,
    markAreaData: {
      //阈值设置
      type: Object,
      default: null,
    },
    minInterval: 0,
    catagetryNum: {
      type: Number,
      default: 5,
    },
  },
  mounted() {
    if (this.dataList[0] && this.dataList[0].data.length != 0) {
      this.myChart = echarts.init(document.getElementById(this.chartid));
      this.initChart();
    }
  },
  watch: {
    dataList: {
      handler: function() {
        // if (this.dataList[0] && this.dataList[0].data.length != 0) {
        this.myChart = echarts.init(document.getElementById(this.chartid));
        this.initChart();
        // }
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      let arr = [];
      this.$set(this.option.xAxis, "data", this.textArr);
      var dataList = this.$utils.cloneObj(this.dataList);
      if (this.textArr.length > this.catagetryNum) {
        this.option.dataZoom[0].end = (this.catagetryNum * 100) / this.textArr.length;
      } else {
        this.option.dataZoom[0].end = 100;
      }
      this.showNegative ? "" : (this.option.yAxis.min = 0);
      for (let i = 0; i < dataList.length; i++) {
        var obj = this.$utils.cloneObj(this.line);
        obj.data = dataList[i].data;
        obj.color = dataList[i].color;
        obj.name = dataList[i].name;
        // 设置区域颜色
        if (dataList[i].areaColor) {
          obj.areaStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: dataList[i].areaColor[0],
            },
            {
              offset: 1,
              color: dataList[i].areaColor[1],
            },
          ]);
        } else {
          delete obj.areaStyle;
        }
        arr.push(obj);
      }
      if (this.markAreaData) {
        var markArea = this.$utils.cloneObj(this.markArea);
        markArea.markArea.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: this.markAreaData.color[0],
          },
          {
            offset: 1,
            color: this.markAreaData.color[1],
          },
        ]);
        if (this.markAreaData.max) {
          markArea.markArea.data = [
            [
              {
                yAxis: this.markAreaData.min,
              },
              {
                yAxis: this.markAreaData.max,
              },
            ],
          ];
        } else {
          var datacopy = this.$utils.cloneObj(dataList);
          markArea.markArea.data = [
            [
              {
                yAxis: this.markAreaData.min,
              },
              {
                yAxis: this.$utils.getMax(datacopy),
              },
            ],
          ];
        }
        arr.unshift(markArea);
      }
      this.$set(this.option, "series", this.$utils.cloneObj(arr));
      this.myChart.setOption(this.option, true);
      var that = this;
      if (this.initFlag) {
        this.resizefun = () => {
          this.myChart.resize();
        };
        window.addEventListener("resize", this.resizefun);
        this.initFlag = false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
};
</script>

<style lang="scss" scoped>
.chart-box-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.chart-item1 {
  width: 100%;
  height: 100%;
}
.nodata {
  position: absolute;
  z-index: 22;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
