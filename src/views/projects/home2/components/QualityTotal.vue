<template>
  <div class="position-relative h-100 cursor-p">
    <div class="chart_title d-flex align-items-center justify-content-between">
      <span class="font-20">进度对比</span>
      <div class="ml-1 float-right">
        <span class="legend_normal legendgreen1"></span>
        <span class="mr-1 font-12">计划</span>
        <span class="legend_normal legendgreen2"></span>
        <span class="mr-1 font-12">进度</span>
      </div>
      <div class="ml-auto cursor-p" @click="linkTo('project_arena_progress')">
        <span class="info-link"> 详情 </span>
      </div>
    </div>
    <div class="chart-item d-flex">
      <div class="flex-fill">
        <n-DoubleRing
          class="ring-box"
          :id="'investment_2'"
          :title="'隧道'"
          :dataList="dataList[0]"
        ></n-DoubleRing>
        <div class="pl-2">
          <p class="font-15">
            计划<span class="blue ml-1">{{ list[0][0] }}</span>
          </p>
          <p class="font-15">
            进度<span class="main ml-1">{{ list[0][1] }}</span>
          </p>
        </div>
      </div>
      <div class="flex-fill">
        <n-DoubleRing
          class="ring-box"
          :id="'investment_1'"
          :title="'桥梁'"
          :dataList="dataList[1]"
        ></n-DoubleRing>
        <div class="pl-2">
          <p class="font-15">
            计划<span class="blue ml-1">{{ list[1][0] }}</span>
          </p>
          <p class="font-15">
            进度<span class="main ml-1">{{ list[1][1] }}</span>
          </p>
        </div>
      </div>
      <div class="flex-fill">
        <n-DoubleRing
          class="ring-box"
          :id="'investment_3'"
          :title="'其他'"
          :dataList="dataList[2]"
        ></n-DoubleRing>
        <div class="pl-2">
          <p class="font-15">
            计划<span class="blue ml-1">{{ list[2][0] }}</span>
          </p>
          <p class="font-15">
            进度<span class="main ml-1">{{ list[2][1] }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vbarColor from "@/components/common/Chart/barColor";
import api from "@/api/index";
export default {
  components: {
    vbarColor,
  },
  data() {
    return {
      dataList: [
        {
          data: [100, 0],
          color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
          showValue: "0%",
        },
        {
          data: [100, 0],
          color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
          showValue: "0%",
        },
        {
          data: [100, 0],
          color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
          showValue: "0%",
        },
      ],
      list: [[], [], []],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name:
          "enterprise_engineering_scheduleManagement_figureManagement_figure_tunnelFigure",
        permission: "ProgressSummary",
      });
    },
    async getData() {
      let data = await api.queryUnitUnionProcess({
        organ_node: this.$organ_id_en_or_pro(this),
        object: 1,
      });
      let list = data.result,
        dataList = [
          {
            data: [0, 0],
            color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
            showValue: "0%",
          },
          {
            data: [0, 0],
            color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
            showValue: "0%",
          },
          {
            data: [0, 0],
            color: ["#55e7e7", "#4ADAE8", "#67b6fd", "#5a5efd"],
            showValue: "0%",
          },
        ];

      let precent = "0%";
      for (let i = 0; i < list.length; i++) {
        if (list[i].plan == 0) {
          precent = 0;
        } else {
          precent = ((list[i].real * 100) / list[i].plan).toFixed(2) * 1;
        }
        dataList[list[i].types - 1].data = [100, precent];
        dataList[list[i].types - 1].showValue = precent + "%";
        this.list[i].push(list[i].plan, list[i].real);
      }
      this.dataList = dataList;
    },
    changeDate(val) {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.chart_title {
  padding: 16px 16px 0;
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
  background: $blue;
}
.legendgreen2 {
  background: $main;
}
.pane-content {
  height: 66px;
  width: 100%;
  .pane-item {
    height: 33px;
    width: 108px;
    .pane-label {
      text-align: center;
      width: 38px;
    }
    .text1 {
      width: calc(100% - 38px);
    }
  }
}
.ring-box {
  height: 65%;
}
</style>
