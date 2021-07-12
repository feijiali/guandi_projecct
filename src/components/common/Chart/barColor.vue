<template>
  <!-- 普通柱状图的公共组件 -->
  <div class="bar_chart">
    <div :class="['chart-item']" :id="chartid"></div>
    <n-nodata v-if="dataList.data.length == 0" class="nodata"></n-nodata>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartid: "chart_" + this.id,
      myChart: "",
      shadow: {
        // type: "bar",
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0.05)",
            barBorderRadius: 8,
          },
        },
        tooltip: {
          show: true,
        },
        barGap: "-100%",
        barWidth: this.barWidth,
        animation: false,
      },
      line: {
        type: "line",
        smooth: true,
        color: "#55e7e7",
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
      splitLine: {
        show: true,
        lineStyle: {
          color: "#c8cedb",
          type: "dashed",
        },
      },
      barOption: {
        barWidth: this.barWidth,
        itemStyle: {
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: this.borderRadius,
          },
        },
        // barCategoryGap: this.barGap,
        type: "bar",
        smooth: true,
      },
      textLabelStyle: {
        axisLabel: {
          show: true,
          textStyle: {
            color: "#131d35",
          },
          interval: 0,
          rotate: this.direction ? 0 : 0, //倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
        },
        axisLine: {
          lineStyle: {
            color: "#8899ac",
          },
        },
      },
      valueLabeStyle: {
        axisLabel: {
          show: true,
          textStyle: {
            color: "#8899ac",
          },
          // interval: 0, //0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
          rotate: this.direction ? 0 : 0, //倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      option: {
        color: this.dataList.color,
        grid: {
          left: "2%",
          top: "5%",
          bottom: this.direction ? "0%" : "5%",
          right: this.direction ? "2%" : "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          data: this.textArr,
        },
        yAxis: {
          min: "0",
          max: "dataMax",
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
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
        series: [
          {
            type: "bar",
            barWidth: this.barWidth,
            data: this.dataList.data,
            name: this.dataList.name,
            // color:this.dataList.color,
            itemStyle: {
              normal: {
                barBorderRadius: this.borderRadius,
                color: params => {
                  if (Array.isArray(this.dataList.color)) {
                    var index = params.dataIndex;
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: this.dataList.color[index][0],
                      },
                      {
                        offset: 1,
                        color: this.dataList.color[index][1],
                      },
                    ]);
                  } else {
                    return this.dataList.color;
                  }
                },
              },
            },
          },
        ],
      },
      resizeFun: "",
      initFlag: true,
    };
  },
  props: {
    init: {
      type: Boolean,
      default: true,
    },
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
    // 柱形图圆角
    borderRadius: {
      type: Number,
      default: 5,
    },
    barWidth: {
      //柱条宽度
      type: String,
      default: "35%",
    },
    fullBar: {
      //是否需要柱条背景色
      type: Boolean,
      default: false,
    },
    direction: true, //柱状图的方向，默认为纵向
    colUnit: "", //纵轴单位，没有就不显示
    textArr: Array, //文本显示的内容
    dataList: {
      type: Object,
      default: () => ({}),
    }, //数据内容
    mixLine: false, //是否需要添加线条和柱状条一起展示
    minInterval: 0,
    catagetryNum: {
      type: Number,
      default: 5,
    },
  },
  mounted() {
    if (this.init) {
      this.initChart();
    }
  },
  watch: {
    dataList: {
      handler: function() {
        if (this.myChart) {
          this.myChart.clear();
          this.initChart();
        }
      },
      deep: true,
    },
  },
  methods: {
    initChart(initFlag) {
      this.myChart = echarts.init(document.getElementById(this.chartid));
      this.setChart();
    },
    setChart() {
      let colorDirection = [0, 1];
      this.$set(this.option, "xAxis", []);
      this.$set(this.option, "yAxis", []);

      // this.option.dataZoom[0].show = this.textArr.length > this.catagetryNum;
      if (this.textArr.length > this.catagetryNum) {
        this.option.dataZoom[0].end = (this.catagetryNum * 100) / this.textArr.length;
      } else {
        this.option.dataZoom[0].end = 100;
      }
      if (this.direction === false) {
        this.option.yAxis.data = this.textArr;
        this.option.xAxis.type = "value";
        this.option.yAxis.type = "category";
        this.option.xAxis.splitLine = this.splitLine;
        this.option.yAxis = this.$utils.jsonCombine(this.option.yAxis, this.textLabelStyle, {});
        this.option.xAxis = this.$utils.jsonCombine(this.option.xAxis, this.valueLabeStyle, {});
        colorDirection = [1, 0];
      } else {
        this.option.xAxis.data = this.textArr;
        this.option.yAxis.splitLine = this.splitLine;
        this.option.yAxis = this.$utils.jsonCombine(this.option.yAxis, this.valueLabeStyle, {});
        this.option.xAxis = this.$utils.jsonCombine(this.option.xAxis, this.textLabelStyle, {});
      }
      this.option.yAxis.minInterval = this.minInterval;
      this.option.series[0].data = this.dataList.data;
      if (this.fullBar && arr.length >= 1) {
        var obj = this.$utils.cloneObj(this.shadow);
        let data = this.$utils.cloneObj(arr[0].data);
        var max = data.sort((a, b) => {
          return b - a;
        })[0];
        obj.data = new Array(arr[0].data.length).fill(max);
        obj.barWidth = this.barWidth;
        arr.unshift(obj);
      }
      // this.option.series = this.$utils.cloneObj(arr);
      // if (this.mixLine) {
      //   this.line.data = this.dataList[0].data;
      //   this.option.series.unshift(this.line);
      // }

      this.myChart.setOption(this.option);
      this.myChart.resize();
      if (this.initFlag) {
        this.resizeFun = () => {
          this.myChart.resize();
        };
        window.addEventListener("resize", this.resizeFun);
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
.bar_chart {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .chart-item {
    width: 100%;
    height: 100%;
  }
}
.nodata {
  top: 0;
  left: 0;
  position: absolute;
  z-index: 22;
  width: 100%;
  height: 100%;
}
</style>
