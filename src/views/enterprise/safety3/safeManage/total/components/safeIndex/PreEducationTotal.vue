<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex justify-content-between chart_title">
      <div class="flex-fill">
        <div class="font-20" @click="linkTo">教育培训次数统计</div>
      </div>
    </div>
    <div class="ml-1 d-flex justify-content-between align-items-center">
      <div class="ml-1 font-12"><span class="grey2 font-12">单位/</span>次</div>
      <div>
        <span class="legend_normal legendgreenA"></span>
        <span class="mr-2 font-12">安全考核</span>
        <span class="legend_normal legendgreenB"></span>
        <span class="mr-2 font-12">班前教育</span>
        <span class="legend_normal legendgreenC"></span>
        <span class="mr-2 font-12">安全交底</span>
      </div>
    </div>
    <n-FullPie2
      class="h-100 w-100 chart-item"
      :dataList="data"
      :leftTobox="'20%'"
      :id="'home_1'"
      ref="fullPie"
      :labelUnit="''"
      :position="'inner'"
      :colors="colors"
      :fontSize="14"
    ></n-FullPie2>
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
      colors: [
        ["#3437EC", "#3437EC"],
        ["#FF8F2A", "#FF8F2A"],
        ["#3BD330", "#3BD330"],
      ],
      data: [
        {
          name: "",
          val: null,
        },
        {
          name: "",
          val: null,
        },
        {
          name: "",
          val: null,
        },
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
        this.$router.linkTo("enterprise_safety3_produceManage_safeEducation");
      } else {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限查看",
        });
      }
    },
    async getData() {
      let data = await api.querySafeStat({
        organ_node: this.listquery.organ_node,
        safe_stat_month: this.listquery.year,
      });
      let list = data.result;
      for (let i = 0; i < list.length; i++) {
        if (list[i].education_type == "SafeExamine") {
          this.data[0].name = "安全考核";
          this.data[0].val = list[i].safe_counts;
        }
        if (list[i].education_type == "SafeEducation") {
          this.data[1].name = "班前教育";
          this.data[1].val = list[i].safe_counts;
        }
        if (list[i].education_type == "SafeCommunicate") {
          this.data[2].name = "安全交底";
          this.data[2].val = list[i].safe_counts;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chart_title {
  padding: 16px 0 0 16px;
}
.chart-item {
  left: 10px;
  right: 10px;
  position: absolute !important;
  top: 40px;
  padding: 10px;
  bottom: 0;
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
