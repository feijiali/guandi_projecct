<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title top-select-box">
      <div class="flex-fill d-flex">
        <div>
          <div class="font-20" @click="linkTo">周界预警次数统计</div>
          <div class="ml-1 font-12">
            <span class="grey2 font-12">单位/</span>次
          </div>
        </div>
      </div>
    </div>
    <n-LineChart
      :minInterval="1"
      class="chart-item"
      :textArr="textArr"
      :dataList="data"
      :colUnit="'次'"
      :id="'lq_5'"
      :catagetryNum="12"
    ></n-LineChart>
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
      data: [{ data: [], color: "#3377ff" }],
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
        this.$router.linkTo("enterprise_safety3_safeManage_safeWeekpolice");
      } else {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限查看",
        });
      }
    },
    async getData() {
      let data = await api.querySafeSnapshotSummary({
        organ_node: this.listquery.organ_node,
        year: Number(this.listquery.year),
        query_type: 2,
        snapshot_type: 4,
      });
      let list = data.result;
      let xdata = [],
        ydata = [];
      for (let i = 0; i < list.length; i++) {
        ydata.push(list[i].num);
        xdata.push(list[i].seq + "月");
      }
      this.$set(this.data[0], "data", ydata);
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
