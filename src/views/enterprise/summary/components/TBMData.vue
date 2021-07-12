<!--
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:27
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:01:29
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="d-flex">
        <span class="font-weight-bold font-16">产值统计</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/万元</span>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="linkTo('enterprise_engineering_scheduleManagement_figure_plan')"
      >
        <span class="info-link">详情</span>
      </div>
    </div>
    <div class="chart-item-box">
      <vbarColor
        :catagetryNum="8"
        :textArr="textArr"
        :dataList="data"
        :id="'home_2'"
        :barWidth="'12px'"
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
      textArr: ["合同总价", "计划产值", "开累产值"],
      data: {
        data: [],
        color: [
          ["#5AA7FF", "#5A60FD"],
          ["#5AA7FF", "#5A60FD"],
          ["#5AA7FF", "#5A60FD"],
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "QuantitiesChapterPlanValue",
      });
    },
    async getData() {
      let data = await api.queryProjectInfoPlanScheduleList({
        organ_node: this.$organ_id_en_or_pro(this),
        query_type: 3,
      });
      let list = data.result[0];
      if (list) {
        this.data.data.push(
          Number(list.project_total_value).toFixed(2),
          list.plan_schedule_plan_value.toFixed(2),
          list.plan_schedule_finish_value.toFixed(2)
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
