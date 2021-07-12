<!--
 * @Autor: 邓易
 * @Date: 2021-03-24 14:23:54
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:04:29
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div>
        <span class="font-weight-bold font-16">教育培训次数统计</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/次</span>
      </div>
      <div class="ml-1">
        <span class="legend_normal legendgreen1"></span>
        <span class="mr-1 font-12">安全教育</span>
        <span class="legend_normal legendgreen3"></span>
        <span class="mr-1 font-12">安全考核</span>
        <span class="legend_normal legendgreen5"></span>
        <span class="mr-1 font-12">安全交底</span>
      </div>
    </div>
    <div
      class="ml-auto cursor-p float-right mt-05"
      @click="
        linkTo('project_safety3_produceManage_safeEducation_preEducation')
      "
    >
      <span class="info-link"> 详情 </span>
    </div>
    <div class="chart-item-box">
      <n-FullPie
        class="h-100 w-100"
        :dataList="data"
        :leftTobox="'20%'"
        :id="'home_3'"
        ref="fullPie"
        :labelUnit="''"
        :position="'inner'"
        :colors="colors"
        :fontSize="14"
        :propsLabel="propsLabel"
      ></n-FullPie>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      colors: [
        ["#67b6fd", "#5a5efd"],
        ["#1ad910", "#1CB6B3"],
        ["#F76EB3", "#EC2358"],
      ],
      propsLabel: {
        formatter: (params) => {
          return params.value + "次";
        },
      },
      data: [
        {
          name: "班前教育",
          val: 0,
        },
        {
          name: "安全交底",
          val: 0,
        },
        {
          name: "安全考核",
          val: 0,
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
        permission: ["SafeEducation", "SafeExamine", "SafeCommunicate"],
      });
    },
    async getData() {
      let data = await api.querySafeStat({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      let list = data.result;
      if (list.length > 0) {
        list.forEach((ele) => {
          if (ele.education_type.indexOf("Education") != -1) {
            this.$set(this.data[0], "val", ele.safe_counts);
          } else if (ele.education_type.indexOf("Communicate") != -1) {
            this.$set(this.data[1], "val", ele.safe_counts);
          } else {
            this.$set(this.data[2], "val", ele.safe_counts);
          }
        });
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
  top: 70px;
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
