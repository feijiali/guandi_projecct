<!--
 * @Author: 郭海林
 * @Date: 2020-06-23 10:56:32
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:05:58
 * @FilePath: \中铁18局\src\views\enterprise\summary\components\engineering.vue
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="d-flex">
        <span class="font-weight-bold font-16">工程进度</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/m³</span>
      </div>
      <div class="ml-1">
        <span class="legend_normal legendgreen1"></span>
        <span class="mr-1 font-12">计划</span>
        <span class="legend_normal legendgreen2"></span>
        <span class="mr-1 font-12">进度</span>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="
          linkTo(
            'enterprise_engineering_scheduleManagement_figureManagement_figure_tunnelFigure'
          )
        "
      >
        <span class="info-link">详情</span>
      </div>
    </div>
    <div class="chart-item disf pl-1 pr-1 mt-2">
      <div
        class="flexfull"
        v-for="(item, index) in dataList"
        :key="idArr[index]"
      >
        <n-DoubleRing
          class=""
          :id="idArr[index]"
          :title="titleArr[index]"
          :dataList="item"
        ></n-DoubleRing>
      </div>
    </div>
    <div
      class="chart-item d-flex pl-1 pr-1 justify-content-between"
      style="height: 20%"
    >
      <div
        class="flex-fill d-flex justify-content-center"
        v-for="(item, index) in list"
        :key="idArr[index]"
      >
        <div>
          <p class="font-15">
            计划<span class="blue ml-1">{{
              $utils.bigNumberTransform(item.plan.toFixed(2))
            }}</span>
          </p>
          <p class="font-15">
            进度<span class="main ml-1">{{
              $utils.bigNumberTransform(item.real.toFixed(2))
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleArr: ["隧道", "桥梁", "路基"],
      idArr: ["investment_1", "investment_2", "investment_3"],
      list: [],
      dataList: [
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
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "ProgressSummary",
      });
    },
    async getData() {
      let data = await api.queryUnitUnionProcess({
        organ_node: this.$organ_id_en_or_pro(this),
        object: 1,
      });
      this.list = data.result;
      let list = data.result;
      let precent;
      for (let i = 0; i < list.length; i++) {
        if (list[i].plan == 0) {
          precent = 0;
        } else {
          precent = ((list[i].real * 100) / list[i].plan).toFixed(1) * 1;
        }
        this.dataList[list[i].types - 1].data = [100, precent];
        this.dataList[list[i].types - 1].showValue = precent + "%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.disf {
  display: flex;
}
.chart-item {
  position: initial !important;
  height: calc(70% - 42px);
  // width: 100%;
}
.flexfull {
  flex: 1;
}
.chart-item-box {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 30px;
  bottom: 10px;
}
.chart_title {
  padding: 10px 10px 0;
}
.legendgreen1 {
  background: linear-gradient(to bottom, #55e7e7, #4adae8);
}
.legendgreen2 {
  background: linear-gradient(to bottom, #67b6fd, #5a5efd);
}
.info-link {
  &::before {
    background: url("./../../../../assets/images/enterprise/icon_next.png");
  }
  &:active,
  &:hover {
    &::before {
      background: url("./../../../../assets/images/enterprise/icon_next_pre.png");
    }
  }
}
</style>
