<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title top-select-box">
      <div class="flex-fill">
        <div class="font-20" @click="linkTo">用电预警次数统计</div>
        <div class="ml-1 font-12">
          <span class="grey2 font-12">单位/</span>次
        </div>
      </div>
    </div>
    <n-BarChart
      class="chart-item"
      :textArr="textArr"
      :dataList="[data]"
      :colUnit="'次'"
      ref="lq_1"
      :id="'lq_1'"
      :barWidth="'30%'"
      :catagetryNum="12"
      :minInterval="1"
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
      year: this.$utils.parseDate2Str(new Date(), "YYYY"),
      textArr: [],
      data: { data: [], color: ["#3377ff", "#3377ff"] },
      organ_node: null,
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
        this.$router.linkTo("enterprise_safety3_safeManage_operation");
      } else {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限查看",
        });
      }
    },
    async getData() {
      let data = await api.queryEquipmentElecMonitorSummary_TJSTC({
        organ_node: this.listquery.organ_node,
        year: this.listquery.year,
        query_type: 1,
      });
      let list = data.result;
      let xdata = [],
        ydata = [];
      for (let i = 0; i < list.length; i++) {
        xdata.push(list[i].seq + "月");
        ydata.push(list[i].num);
      }
      this.$set(this.data, "data", ydata);
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
  top: 53px;
  padding: 10px;
  bottom: 0;
}
</style>
