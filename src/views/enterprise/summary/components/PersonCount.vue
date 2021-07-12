<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="font-weight-bold font-16">人员汇总</div>
      <div class="ml-05 font-12 ml-2" style="margin-top: -5px">
        <p class="font-12 d-inline-block">
          管理人员<span class="font-20 main">{{ personTotal.staff_count }}</span
          >人
        </p>
        <p class="font-12 d-inline-block ml-1">
          劳务人员<span class="font-20 orange">{{
            personTotal.worker_count
          }}</span
          >人
        </p>
      </div>
      <div
        class="ml-auto cursor-p"
        @click="linkTo('enterprise_oa_account_personInfo')"
      >
        <span class="info-link">详情</span>
      </div>
    </div>
    <div class="chart-item-box pt-1">
      <n-LineChart
        :smooth="true"
        :textArr="textArr"
        :dataList="data"
        :catagetryNum="12"
        :id="'home_3'"
      ></n-LineChart>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      textArr: [],
      data: [
        {
          data: [],
          color: "#3377ff",
        },
        {
          data: [],
          color: "#fdb855",
        },
      ],
      personTotal: {}, //人员统计
    };
  },
  created() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", { name: name, permission: "Account" });
    },
    async getData() {
      let data = await api.queryAccountStat({
        organ_node: this.$organ_id_en_or_pro(this),
        advice: 2,
      });
      let list = data.result[0].List;
      this.personTotal = data.result[0];
      let xdata = [],
        ydata1 = [],
        ydata2 = [];
      for (let i = 0; i < list.length; i++) {
        let month = list[i].month.split("-")[1];
        xdata.push(Number(month) + "月");
        ydata1.push(list[i].staff_count);
        ydata2.push(list[i].worker_count);
      }
      this.$set(this.data[0], "data", ydata1);
      this.$set(this.data[1], "data", ydata2);
      this.$set(this, "textArr", xdata);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  background: linear-gradient(to bottom, #f15b5d, #f15b5dcc);
}
.legendgreen2 {
  background: linear-gradient(to bottom, #fe964e, #fe964ecc);
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
