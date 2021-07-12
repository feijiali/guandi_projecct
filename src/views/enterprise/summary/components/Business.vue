<!--
 * @Autor: 邓易
 * @Date: 2021-03-23 11:01:32
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 14:29:09
-->
<template>
  <div class="position-relative h-100">
    <div class="chart_title d-flex linheight">
      <div class="d-flex">
        <span class="font-weight-bold font-16">市场扩展</span>
        <span class="ml-05 font-12 ml-1 mt-05">单位/个</span>
      </div>
      <div class="ml-auto cursor-p" @click="linkTo('enterprise_business')">
        <span class="info-link"> 详情 </span>
      </div>
    </div>
    <!-- <div class="f13" style="margin: 6px 10px; color: #fd5571">任务完成率{{ finishRatio }}%</div> -->
    <div class="chart-item-box">
      <vbarColor
        :catagetryNum="8"
        :textArr="textArr"
        :dataList="data"
        :id="'home_1'"
        :barWidth="'30px'"
        :direction="true"
      ></vbarColor>
    </div>
  </div>
</template>

<script>
import vbarColor from "@/components/common/Chart/barColor";
import qs from "qs";
import axios from "axios";
export default {
  components: {
    vbarColor,
  },
  data() {
    return {
      finishRatio: 0,
      account_tel: 0,
      textArr: ["立项项目 ", "投标申请", "投标保证金", "中标通知书"],
      data: {
        data: [],
        color: [
          ["#5AA7FF", "#5A60FD"],
          ["#3BE68B", "#1CB6B3"],
          ["#F76EB3", "#EC2358"],
          ["#F76EB3", "#EC2358"],
        ],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "ManageSystemManageSystem",
      });
    },
    async getData() {
      axios
        // https://cninct.com/sj/taskList/getTaskBusinessGmoonThree?mobile=${this.$store.getters.account_tel} 正式环境
        // http://www.cninct.com/AI/taskList/getTaskBusinessGmoonThree?mobile=${this.$store.getters.account_tel} 测试环境
        .get(
          `https://cninct.com/sj/taskList/getTaskBusinessGmoonThree?mobile=${this.$store.getters.account_tel}`,
          {
            params: {},
          }
        )
        .then((res) => {
          if (!res.data.ext) {
            return;
          }
          let data = res.data.ext.data;
          this.data.data.push(
            data.createCount,
            data.tenderApplyCount,
            data.tenderMarginCount,
            data.bidAdviceCount
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-item-box {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 62px;
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
