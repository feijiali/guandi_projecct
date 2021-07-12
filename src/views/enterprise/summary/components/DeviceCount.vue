<!--
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:27
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 15:01:02
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="d-flex">
        <span class="font-weight-bold font-16">设备统计</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/台</span>
      </div>
      <div class="ml-1">
        <span class="legend_normal legendgreen1"></span>
        <span class="mr-1 font-12">自有</span>
        <span class="legend_normal legendgreen2"></span>
        <span class="mr-1 font-12">租赁</span>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="linkTo('enterprise_material2_device_self')"
      >
        <span class="info-link"> 详情 </span>
      </div>
    </div>
    <div class="chart-item-box pt-1">
      <n-BarChart
        class="chart-item"
        :textArr="textArr"
        :dataList="data"
        :id="'home_6'"
        :direction="true"
        :borderRadius="4"
        :catagetryNum="6"
        :rotate="true"
        :minInterval="1"
        :barWidth="'15'"
      ></n-BarChart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textArr: [],
      data: [
        {
          data: [],
          color: ["#d0e3fe", "#84adff"],
        },
        {
          data: [],
          color: ["#67b6fd", "#5a5efd"],
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
        permission: "EquipmentStandingBook",
      });
    },
    async getData() {
      let data = await api.QueryEquipmentStat({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      let list = data.result;
      if (list) {
        list.slice(0, 6).forEach((ele, ind) => {
          this.textArr.push(ele.organ);
          this.data[0].data.push(ele.count_book);
          this.data[1].data.push(ele.count_stand);
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
  position: absolute !important;
  top: 40px;
  bottom: 10px;
}
.chart_title {
  padding: 10px 10px 0;
}
.legendgreen1 {
  background: linear-gradient(to bottom, #67b6fd, #5a5efd);
}
.legendgreen2 {
  background: linear-gradient(to bottom, #d0e3fe, #84adff);
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
