<!--
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:27
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:01:17
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="d-flex">
        <span class="font-weight-bold font-16">项目统计</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/个</span>
      </div>
      <!-- <div class="ml-auto cursor-p" @click="$router.linkTo('enterprise_engineering_competition_outputVal')">
        <span class="info-link"> 详情 </span>
      </div> -->
    </div>
    <div class="chart-item-box pt-1">
      <vbarColor
        :textArr="textArr"
        :dataList="data"
        :minInterval="1"
        :id="'home_5'"
        :barWidth="'18px'"
        :direction="true"
      ></vbarColor>
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
      textArr: ["全部项目", "已建项目", "在建项目", "停工项目"],
      data: {
        data: [],
        color: [
          ["#67b6fd", "#5a5efd"],
          ["#3BE68B", "#1CB6B3"],
          ["#F76EB3", "#EC2358"],
          ["#fdb855", "#fdb850"],
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let data = await api.queryProjectInfoProjectSummary({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      let list = data.result[0];
      if (list) {
        this.data.data.push(
          list.total,
          list.finished,
          list.building,
          list.stop
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-item-box {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 40px;
  bottom: 10px;
}
.chart_title {
  padding: 10px 10px 0;
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
