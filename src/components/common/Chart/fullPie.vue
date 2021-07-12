<template>
  <!-- 实心圆饼图的公共组件 -->
  <div class="line_chart position-relative">
    <n-nodata
      v-if="dataList.length == 0"
      class="no-data position-absolute"
    ></n-nodata>
    <div v-if="dataList.length != 0" class="chart-item" :id="chartid"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartid: "chart_" + this.id,
      myChart: "",
      option: {
        radius: "100%",
        grid: {
          containLabel: true,
          top: "20%",
          left: this.leftTobox,
        },
        tooltip: {
          formatter: (params) => {
            return params.name + ":" + params.data.value;
          },
        },
        series: [
          {
            // name: '姓名',
            type: "pie",
            center: ["50%", this.top],
            radius: ["35%", "60%"],
            label: {
              position: this.position,
              formatter: (params) => {
                return params.percent.toFixed(2) + "%";
              },
              // formatter: '{' + this.showType + '}' + this.labelUnit,
              fontSize: this.fontSize,
              textBorderWidth: 0,
              ...this.propsLabel,
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
    labelUnit: {
      // 饼图中间的文本单位，默认是%,
      type: String,
      default: "%",
    },
    position: {
      //饼图中间的文本显示值类型，默认是百分比， 也可以是数值
      type: String,
      default: "outside",
    },
    showType: {
      //饼图中间的文本显示值类型，默认是百分比， 也可以是数值
      type: String,
      default: "d",
    },
    top: {
      type: String,
      default: "50%",
    },
    leftTobox: {
      //图表离盒子左侧的距离
      type: String,
      default: "8%",
    },
    topToBox: {
      type: String,
      default: "5%",
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    colors: {
      type: Array,
      default: [],
    },
    textArr: Array, //文本显示的内容
    dataList: {
      type: Array,
      default: () => [],
    }, //数据内容
    title: {
      type: Object,
      default: null,
    },
    propsLabel: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    dataList: {
      handler: function () {
        if (this.myChart) {
          this.myChart.clear();
          this.initChart();
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.init) {
      this.initChart();
    }
  },
  methods: {
    initChart(initFlag) {
      this.myChart = echarts.init(document.getElementById(this.chartid));
      this.setChart();
    },
    setChart() {
      var data = [];
      for (let i = 0; i < this.dataList.length; i++) {
        var obj = {
          value: this.dataList[i].val,
          name: this.dataList[i].name,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: this.colors[i][1], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: this.colors[i][0], // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        };
        data.push(obj);
      }
      if (this.title) {
        this.option.title = {
          text: this.title.text,
          bottom: "0",
          x: "center",
        };
      }
      this.option.series[0].data = data;
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
    getMax(arr) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        let itemArr = arr[i].data.sort();
        result.push(itemArr[itemArr.length - 1]);
      }
      return result.sort()[result.length - 1];
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
};
</script>

<style lang="scss" scoped>
.line_chart {
  .chart-item {
    width: 100%;
    height: 100%;
  }
  .no-data {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
