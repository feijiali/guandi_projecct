<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title top-select-box">
      <div class="flex-fill d-flex">
        <div>
          <div class="font-20 d-inline-block">安全管理</div>
          <div class="ml-1 font-12 d-inline-block">
            <span class="grey2 font-12">单位/</span>次
          </div>
        </div>
      </div>
      <div class="disi border1 bdr10 time-choose-single-box" @click.stop>
        <el-date-picker
          :clearable="false"
          ref="datePicker"
          v-model="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          style="width: 120px !important"
          type="month"
          placeholder="请选择"
          @change="changeDate"
        ></el-date-picker>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="linkTo('project_safety3_safeManage_total')"
      >
        <span class="info-link"> 详情 </span>
      </div>
    </div>
    <!-- <n-BarChart
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :id="'home_10'"
      :barWidth="'10px'"
      :direction="true"
      :borderRadius="6"
      :catagetryNum="6"
    ></n-BarChart> -->
    <vbarColor
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :minInterval="1"
      :id="'home_10'"
      :barWidth="'18px'"
      :direction="true"
    ></vbarColor>
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
      month: this.$utils.parseDate2Str(new Date(), "YYYY-MM"),
      textArr: ["班前教育", "日常巡检", "安全整改", "漏电预警", "违章抓拍"],
      data: {
        data: [0, 0, 0, 0, 0],
        color: [
          ["#5AA7FF", "#5A60FD"],
          ["#3BE68B", "#1CB6B3"],
          ["#F76EB3", "#EC2358"],
          ["#F76EB3", "#EC2358"],
          ["#F76EB3", "#EC2358"],
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getData();
    });
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "SafeTotal",
      });
    },
    async getData() {
      let data = await api.querySafeOrganStatBi({
        organ_node: this.$organ_id_en_or_pro(this),
        safe_stat_month: this.month,
      });
      let list = data.result[0];
      this.data.data = [
        list ? list.education_counts : 0,
        list ? list.daily_inspection_counts : 0,
        list ? list.safe_rectify_counts : 0,
        list ? list.leakage_counts : 0,
        list ? list.smart_capture_counts : 0,
      ];
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
  background: $main;
}
.legendgreen2 {
  background: $orange;
}
</style>
