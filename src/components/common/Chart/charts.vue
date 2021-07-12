<template>
  <!-- 普通柱状图的公共组件 -->
  <div class="w-100 h-100 position-relative">
    <div :id="chartid" class="w-100 h-100"></div>
    <n-nodata v-if="dataList[0].data.length == 0" class="no_bg position-absolute"></n-nodata>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      chartid: 'chart_' + this.id,
      resizeFun: '',
      initFlag: true,
      option: {
        tooltip: {
          trigger: 'axis',
          ...this.tooltip
        },
        barWidth: '30px',
        itemStyle: {
          barBorderRadius: 6
        },
        grid: {
          top: '4%',
          left: '7%',
          right: '2%',
          bottom: '8%'
        },
        xAxis: [
          {
            type: 'category',
            data: this.textArr
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: 'dataMax'
          }
        ],
        series: []
      }
    };
  },
  props: {
    id: {
      //图表的唯一标识
      type: Number,
      default: 1
    },
    interval: {
      //图表的唯一标识
      type: Number,
      default: 0
    },
    optionProps: {
      type: Object,
      default: () => ({})
    },
    tooltip: {
      type: Object,
      default: () => ({})
    },
    textArr: Array, //文本显示的内容
    dataList: {
      type: Array,
      default: () => []
    } //数据内容
  },
  mounted() {
    this.initChart();
  },
  watch: {
    dataList: {
      handler: function() {
        if (this.myChart) {
          this.myChart.clear();
          this.initChart();
        }
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById(this.chartid));
      this.setChart();
    },
    setChart() {
      let arr = [];
      this.dataList.forEach(item => {
        let optionProps = this.optionProps[item.type] ? this.optionProps[item.type] : {};
        let obj = { itemStyle: { normal: {} }, areaStyle: {}, ...optionProps };
        obj.type = item.type;
        obj.data = item.data;
        obj.name = item.name;
        if (item.lineColor) {
          obj.smooth = 0.5;
          obj.color = item.lineColor;
          obj.areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: item.color[0]
            },
            {
              offset: 1,
              color: item.color[1]
            }
          ]);
        } else {
          obj.smooth = 0.5;
          obj.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: item.color[0]
            },
            {
              offset: 1,
              color: item.color[1]
            }
          ]);
        }
        arr.push(obj);
      });
      this.option.series = this.$utils.cloneObj(arr);
      this.option.xAxis[0].data = this.textArr;
      if (this.interval > 0) {
        this.option.yAxis[0].interval = this.interval < 1 ? 1 : this.interval;
      }
      this.myChart.setOption(this.option);
      this.myChart.resize();
      if (this.initFlag) {
        this.resizeFun = () => {
          this.myChart.resize();
        };
        window.addEventListener('resize', this.resizeFun);
        this.initFlag = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizefun);
    this.resizefun = null;
  }
};
</script>

<style lang="scss" scoped>
.no_bg {
  bottom: 0px;
  top: -20px;
  left: 0px;
  right: 0px;
  z-index: 99;
  background: white;
}
</style>
