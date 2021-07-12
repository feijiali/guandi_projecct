<template>
  <div class="h-100 bg-white rounded-1 p-1" style="width: 450px">
    <div class="chart_title">
      <span class="black font-18 font-weight-bolder">变更批复率(%)</span>
    </div>
    <div class="total-box text-center position-relative mgt20">
      <n-FullPie
        v-if="list[0]"
        class="h-100 w-100"
        :dataList="list"
        :leftTobox="'20%'"
        :id="'home_3'"
        ref="fullPie"
        :labelUnit="''"
        :position="'outside'"
        :colors="colors"
        :fontSize="14"
        :propsLabel="propsLabel"
      ></n-FullPie>
    </div>
    <div
      class="mt-3 text-left"
      v-if="datalist && datalist.project_money && datalist.project_money.length"
    >
      <div
        class="mb-1"
        v-for="(item, index) in legendExample"
        :key="index + 'lq_8'"
      >
        <i :class="[item.className, 'legend_radius']"></i>
        <span class="mr-2">{{ item.label }}</span>
        <span
          style="left: 5px"
          class="text-hover-primary font-24 position-relative"
          v-if="
            datalist.project_money[item.index]
              .change_history_project_money_all < 0
          "
          >-</span
        >
        <span
          class="font-24 langdon-font"
          :style="{ color: ['#3536ec', '#ff8f28', '#3ad332'][index] }"
          >{{
            Math.abs(
              datalist.project_money[item.index]
                .change_history_project_money_all
            )
          }}</span
        ><span class="ml-1">元</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      defalut: () => [],
    },
    colors: {
      type: Array,
      defalut: () => [],
    },
    datalist: {
      type: Object,
      defalut: () => ({}),
    },
    textName: {
      type: Array,
      defalut: () => ["未上报", "已上报未批复", "已上报已批复"],
    },
  }, //数据内容
  data() {
    return {
      propsLabel: {
        formatter: (params) => {
          return params.name + "\n" + params.data.value + "%";
        },
      },
      legendExample: [
        { className: "legendgreen1", label: this.textName[0], index: 0 },
        {
          className: "legendgreen2",
          label: this.textName[1],
          index: 1,
        },
        {
          className: "legendgreen3",
          label: this.textName[2],
          index: 2,
        },
      ],
    };
  },
  methods: {
    tofixed2(num) {
      num = num * 1;
      let numStr = num + "";
      let lex = numStr.split(".")[1];
      if (lex && lex.length > 2) {
        return num.toFixed(2);
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$legendgreen1: #3536ec;
$legendgreen2: #ff8f28;
$legendgreen3: #3ad332;

.total-box {
  width: 100%;
  height: 50%;
}
.legend_radius {
  display: inline-block;
  width: 8px;
  height: 8px;
  vertical-align: middle;
  border-radius: 100%;
  margin-right: 10px;
}
.legendgreen1 {
  background: $legendgreen1;
}
.legendgreen2 {
  background: $legendgreen2;
}
.legendgreen3 {
  background: $legendgreen3;
}
</style>
