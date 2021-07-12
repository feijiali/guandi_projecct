<template>
  <!-- 折线图的公共组件 -->
  <div class="line_chart position-relative">
    <p v-if="colUnit" class="grey2 font-12">单位&nbsp;/&nbsp;{{ colUnit }}</p>
    <div class="chart-item" :id="chartid"></div>

    <n-nodata
      v-if="dataList[0].data.length == 0 && markLineData[0].yAxis == 0"
      class="nodata-box"
    ></n-nodata>
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
      markLine: {
        label: {
          show: true,
          normal: {
            position: "insideEndTop",
          },
        },
        lineStyle: {
          color: "red",
        },
        data: [],
      },
      markArea: {
        type: "line",
        animation: false,
        lineStyle: {
          width: 1,
        },
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
          left: "2%",
          top: "10%",
          bottom: "6%",
          right: "5%",
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
            type: "inside",
            disabled: this.textArr.length < 5,
            realtime: true,
            start: 0,
            end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            let res = "";
            for (var i = 0; i < params.length; i++) {
              res +=
                "<p>时间：" +
                params[i].data.time +
                "</p><p>" +
                params[i].name +
                "：" +
                params[i].data.value +
                "</p><p>状态：" +
                ["正常", "低报警", "高报警"][params[i].data.type] +
                "</p>";
            }
            return res;
          },
          axisPointer: {
            type: "shadow",
          },
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
    markLineData: {
      //阈值设置
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById(this.chartid));
    // this.initChart();
  },
  watch: {
    dataList: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      let arr = [];
      this.$set(this.option.xAxis, "data", this.textArr);
      var dataList = this.$utils.cloneObj(this.dataList);
      this.option.dataZoom[0].disabled = this.textArr.length < 30;
      if (this.textArr.length > 30) {
        let percent = Math.floor((30 * 100) / dataList[0].data.length);
        this.option.dataZoom[0].start = 100 - percent;
        this.option.dataZoom[0].end = 100;
      } else {
        this.option.dataZoom[0].start = 0;
        this.option.dataZoom[0].end = 100;
      }
      this.showNegative ? "" : (this.option.yAxis.min = 0);
      let numData = dataList
        .map((item) => item.data.map((item) => item.value))
        .join()
        .split(",")
        .map(Number);
      let maxData = Math.max(...numData, this.markLineData[0].yAxis);
      let limit = 10 ** Math.floor(Math.log10(Number(maxData))) / 2;
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

      // 设置高低报警线
      if (this.markLineData.length) {
        let markLine = this.$utils.cloneObj(this.markLine);
        markLine.data = this.markLineData;
        arr[0].markLine = markLine;
        let num =
          maxData > Number(this.markLineData[0].yAxis)
            ? maxData
            : Number(this.markLineData[0].yAxis);
        this.$set(this.option.yAxis, "max", num + limit);
      }
      if (this.markAreaData) {
        var markArea = this.$utils.cloneObj(this.markArea);
        markArea.markArea.itemStyle.normal.color = new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: this.markAreaData.color[0],
            },
            {
              offset: 1,
              color: this.markAreaData.color[1],
            },
          ]
        );
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
.nodata-box {
  left: 0;
  right: 0;
  top: 40px;
  z-index: 300;
  background: white;
  position: absolute;
  bottom: 10px;
}
.line_chart {
  .chart-item {
    position: absolute;
    width: 100%;
    height: calc(100% - 20px);
  }
}
</style>
