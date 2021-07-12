<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title top-select-box">
      <div class="flex-fill">
        <div class="font-20" @click="linkTo">日常巡检统计与整改次数统计</div>
        <div class="ml-1 d-flex justify-content-between align-items-center">
          <div class="ml-1 font-12">
            <span class="grey2 font-12">单位/</span>次
          </div>
          <div>
            <span class="legend_normal legendgreenA"></span>
            <span class="mr-2 font-12">日常巡检</span>
            <span class="legend_normal legendgreenC"></span>
            <span class="mr-2 font-12">巡检通过</span>
            <span class="legend_normal legendgreenB"></span>
            <span class="mr-2 font-12">整改中</span>
          </div>
        </div>
      </div>
    </div>
    <n-BarChart
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :colUnit="'次'"
      :minInterval="1"
      :id="'lq_4'"
      :catagetryNum="12"
      :barWidth="'20%'"
    ></n-BarChart>
  </div>
</template>

<script>
import api from "@/api/index";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  props: {
    listquery: {
      type: Object,
      default: { organ_node: null, year: "" },
    },
    permission: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      textArr: [],
      data: [
        { data: [], color: ["#3437EC", "#3437EC"], name: "日常巡检" },
        { data: [], color: ["#3BD330", "#3BD330"], name: "巡检通过" },
        { data: [], color: ["#FF8F2A", "#FF8F2A"], name: "整改中" },
      ],
    };
  },
  watch: {
    listquery: {
      handler() {
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    linkTo() {
      if (hasPermissionArr(this.permission)) {
        this.$router.linkTo("enterprise_safety3_produceManage_inspection");
      } else {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限查看",
        });
      }
    },
    async getData() {
      let data = await api.querySafeInspectionRectificationStat({
        organ_node: this.listquery.organ_node,
        daily_inspection_date: this.listquery.year,
      });
      let list = data.result;
      let xdata = [];
      let Inspection = [];
      let adopt = [];
      let noadopt = [];
      for (let i = 0; i < list.length; i++) {
        xdata.push(list[i].inspection_month + "月");
        Inspection.push(list[i].inspection_count);
        adopt.push(list[i].inspection_adopt_count);
        noadopt.push(list[i].inspecting_count);
      }
      var datachart = this.$utils.cloneObj(this.data);
      datachart[0].data = Inspection;
      datachart[1].data = adopt;
      datachart[2].data = noadopt;
      this.$set(this, "data", datachart);
      this.$set(this, "textArr", xdata);
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
  top: 65px;
  padding: 10px;
  bottom: 5px;
}
.legendgreenA {
  background: #3437ec;
}
.legendgreenB {
  background: #ff8f2a;
}
.legendgreenC {
  background: #3bd330;
}
</style>
