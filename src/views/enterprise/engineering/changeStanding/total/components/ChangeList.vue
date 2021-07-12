<template>
  <div class="actount_right h-100 pl-1 flex-fill">
    <div class="change-wrap">
      <template v-for="i in 4">
        <div :key="i" class="rounded-1 change-item bg-white d-flex flex-column">
          <template v-if="i < 3">
            <div class="pt-1 px-2 d-flex justify-content-between">
              <div class="mb-1 black font-18 font-weight-bolder">
                {{ nameArr[i - 1] }}
              </div>
              <div>
                共
                <span class="pink2 font-26 langdon-font mt-1">{{
                  i == 1 ? totalCount : totalMoney
                }}</span>
              </div>
            </div>
            <!-- :style="{ width: index == 4 ? '100%' : '' }" -->
            <div class="d-flex flex-wrap change-standing-box">
              <div
                class="change-standing-box-item mb-2"
                v-for="(item, index) in list[i - 1]"
                :key="index"
              >
                <p class="text-secondary">{{ item.name }}</p>

                <p class="font-26 langdon-font mt-1">
                  {{ item[i == 1 ? "summary_count" : "money"] }}
                </p>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="change-item-bottom d-flex justify-content-between pt-1 align-items-center px-2"
              v-for="(item, index) in i == 3 ? nameArr2 : nameArr3"
              :key="index + 'b'"
            >
              <div
                class="d-flex flex-column align-content-center mb-3 mt-1 w-50"
              >
                <p class="text-secondary">{{ item }}</p>
                <p class="mt-1">
                  <span
                    :style="{ color: ['#3ad332', '#ff8f28', '#3536ec'][index] }"
                    class="font-26 langdon-font"
                    >{{
                      list[i == 3 ? 0 : 1][index][
                        i == 3 ? "summary_count" : "money"
                      ]
                    }}</span
                  >
                </p>
              </div>
              <div
                class="d-flex flex-column align-content-center mb-3 mt-1"
                style="width: 30%"
              >
                <p class="text-secondary">{{ nameArr4[index] }}</p>
                <p class="mt-1">
                  <span
                    :style="{ color: ['#3ad332', '#ff8f28', '#3536ec'][index] }"
                    class="font-26 langdon-font"
                    >{{
                      i == 3 ? listPie1[index + 1] : listPie2[index + 1]
                    }}</span
                  >
                  %
                </p>
              </div>
            </div>
            <!-- <div
              class="change-item-bottom d-flex justify-content-between pt-1 align-items-center px-2"
              v-for="(item, index) in i == 3 ? nameArr2 : nameArr3"
              :key="index + 'b'"
            >
              <div class="d-flex flex-column align-content-center mt-5">
                <p class="text-secondary">{{ item.name }}</p>
                <p
                  :style="{ color: ['#3ad332', '#ff8f28', '#3536ec'][index] }"
                  class="font-22 font-weight-bolder"
                >
                  {{
                    list[i == 3 ? 0 : 1][index][
                      i == 3 ? "summary_count" : "parameter_money"
                    ]
                  }}
                </p>
                <p
                  class="font-18 font-weight-bolder"
                  :style="{ color: ['#3ad332', '#ff8f28', '#3536ec'][index] }"
                ></p>
              </div>
              <div
                style="width: 50%; height: 110px"
                class="d-flex flex-column align-content-center"
              >
                <n-FullPie
                  v-if="list[0] || list[1]"
                  class="w-100 h-100"
                  :top="'65%'"
                  :dataList="i == 3 ? listPie1[index + 1] : listPie2[index + 1]"
                  :leftTobox="'20%'"
                  :id="'fullPie_' + index + (i == 3 ? 's' : 'm')"
                  ref="fullPie"
                  :labelUnit="''"
                  :position="'outside'"
                  :colors="colors[index + 1]"
                  :fontSize="14"
                  :propsLabel="propsLabel"
                ></n-FullPie>
              </div>
            </div> -->
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    moneyArr: {
      type: Array,
      defalut: () => [],
    },
    countArr: {
      type: Array,
      defalut: () => [],
    },
    textName: {
      type: Array,
      defalut: () => ["未上报", "已上报已批复", "已上报未批复"],
    },
  },
  watch: {
    countArr: {
      handler() {
        if (this.countArr.length) {
          this.counFun();
        } else {
          this.totalCount = 0;
          this.list[0].forEach((item) => {
            item.summary_count = 0;
          });
          this.listPie1 = {
            1: 0,
            2: 0,
            3: 0,
          };
        }
      },
      deep: true,
      immediate: true,
    },
    moneyArr: {
      handler() {
        if (this.moneyArr.length) {
          this.moneyFun();
        } else {
          this.totalMoney = "0.00";

          this.list[1].forEach((item) => {
            item.money = "0.00";
          });
          this.listPie2 = {
            1: "0.00",
            2: "0.00",
            3: "0.00",
          };
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      totalCount: 0,
      totalMoney: 0,
      propsLabel: {
        formatter: (params) => {
          return params.name + "\n" + params.data.value + "%";
        },
      },
      listPie1: {},
      listPie2: {},

      colors: {
        1: [
          ["#3ad332", "#3ad332"],
          ["#DFFFDE", "#DFFFDE"],
        ],
        2: [
          ["#ff8f28", "#ff8f28"],
          ["#FFEEDE", "#FFEEDE"],
        ],
        3: [
          ["#3536ec", "#3536ec"],
          ["#DEE4FF", "#DEE4FF"],
        ],
      },
      nameArr: ["总设计变更(个)", "总设计变更金额(元)"],
      nameArr2: ["已批复数量(个)", "已上报数量(个)", "未上报数量(个)"],
      nameArr3: ["已批复金额(元)", "已上报金额(元)", "未上报金额(元)"],
      nameArr4: ["已批复率", "已上报率", "未上报率"],
      list: [
        [
          { name: "已上报已批复", summary_count: 0.0 },
          { name: "已上报未批复", summary_count: 0.0 },
          { name: "未上报", summary_count: 0.0 },
          { name: "已通过审批", summary_count: 0.0 },
          { name: "正在审批", summary_count: 0.0 },
          { name: "未通过审批", summary_count: 0.0 },
          { name: "已撤销审批", summary_count: 0.0 },
        ],
        [
          { name: "已上报已批复", money: 0.0 },
          { name: "已上报未批复", money: 0.0 },
          { name: "未上报", money: 0.0 },
          { name: "预计可批复金额", money: 0.0 },
          { name: "暂定计量金额", money: 0.0 },
          { name: "已通过审批金额", money: 0.0 },
          { name: "正在审批金额", money: 0.0 },
          { name: "未通过审批金额", money: 0.0 },
          { name: "已撤销金额", money: 0.0 },
        ],
      ],
    };
  },
  methods: {
    counFun() {
      // 统计批复状态
      let arr1 = this.parameterStatusFun(this.countArr, "summary_count");
      // 统计审批状态
      let arr2 = this.reviseStatusFun(this.countArr, "summary_count");
      this.$set(this.list, 0, [...arr1, ...arr2]);
      let totalCount = (
        Number(this.list[0][0].summary_count) +
        Number(this.list[0][1].summary_count) +
        Number(this.list[0][2].summary_count)
      ).toFixed(2);
      this.listPie1 = {
        1: this.list[0][0].summary_count
          ? ((this.list[0][0].summary_count * 100) / totalCount).toFixed(2) * 1
          : 0,
        2: this.list[0][1].summary_count
          ? ((this.list[0][1].summary_count * 100) / totalCount).toFixed(2) * 1
          : 0,
        3: this.list[0][2].summary_count
          ? ((this.list[0][2].summary_count * 100) / totalCount).toFixed(2) * 1
          : 0,
      };
    },
    moneyFun() {
      // 统计批复状态
      let arr1 = this.parameterStatusFun(this.moneyArr, "parameter_info_money");
      // 统计审批状态
      let arr2 = this.reviseStatusFun(this.moneyArr, "parameter_money");
      this.$set(this.list, 1, [...arr1, ...arr2]);

      let totalMoney = (
        Math.abs(Number(this.list[1][0].money)) +
        Math.abs(Number(this.list[1][1].money)) +
        Math.abs(Number(this.list[1][2].money))
      ).toFixed(2);
      this.listPie2 = {
        1:
          this.list[1][0].money == "0.00"
            ? "0.00"
            : Math.abs(
                ((this.list[1][0].money * 100) / totalMoney).toFixed(2) * 1
              ),
        2:
          this.list[1][1].money == "0.00"
            ? "0.00"
            : Math.abs(
                ((this.list[1][1].money * 100) / totalMoney).toFixed(2) * 1
              ),
        3:
          this.list[1][2].money == "0.00"
            ? "0.00"
            : Math.abs(
                ((this.list[1][2].money * 100) / totalMoney).toFixed(2) * 1
              ),
      };
    },
    // 统计批复状态
    parameterStatusFun(list, name) {
      let listNew = [];
      list = list.filter((item) => {
        return item.parameter_info_type && item.parameter_info_type != 0;
      });
      list.forEach((item) => {
        if (name == "parameter_info_money") {
          item.money = item.parameter_info_money
            ? item.parameter_info_money
            : "0.00";
        }
        item.name = ["", "未上报", "已上报未批复", "已上报已批复"][
          item.parameter_info_type
        ];
      });
      let has = list.map((itm) => itm.parameter_info_type);
      let arr = [3, 2, 1]
        .filter((items) => has.indexOf(items) == -1)
        .map((itm) => {
          return {
            name: ["", "未上报", "已上报未批复", "已上报已批复"][itm],
            parameter_info_type: itm,
            [name == "parameter_info_money" ? "money" : name]:
              name == "parameter_info_money" ? "0.00" : 0,
          };
        });
      listNew = [...list, ...arr];
      listNew = listNew.sort(
        (a, b) => b.parameter_info_type - a.parameter_info_type
      );
      return listNew;
    },
    // 统计审批状态
    reviseStatusFun(list, name) {
      let listNew = [];
      let arrAll = []; //审批状态数组
      // 过滤已审批通过状态的数据
      let successArr = list.filter((itm) => itm.revise_info_state == 3);
      // 计算已审批通过状态的和
      let successTotal = successArr.reduce((acc, next) => {
        return Number(acc + Number(next[name]));
      }, 0);
      // 计算预计可批复金额和暂定计量金额的和
      if (name == "parameter_money") {
        let parameterInfoEstimateMoneyTotal = successArr.reduce((acc, next) => {
          return (
            Number(acc) + Number(next.parameter_info_estimate_money)
          ).toFixed(2);
        }, 0);
        let parameterInfoReportMoneyTotal = successArr.reduce((acc, next) => {
          return (
            Number(acc) + Number(next.parameter_info_report_money)
          ).toFixed(2);
        }, 0);
        arrAll.push(
          {
            name: "预计可批复金额",
            [name == "parameter_money"
              ? "money"
              : name]: parameterInfoEstimateMoneyTotal,
          },
          {
            name: "暂定计量金额",
            [name == "parameter_money"
              ? "money"
              : name]: parameterInfoReportMoneyTotal,
          }
        );
      }
      arrAll.push({
        name: "已通过审批",
        [name == "parameter_money" ? "money" : name]:
          name == "parameter_money" ? successTotal.toFixed(2) : successTotal,
      });
      list = list.filter((item) => {
        return (
          item.revise_info_state == 2 ||
          item.revise_info_state == 4 ||
          item.revise_info_state == 5
        );
      });
      list.forEach((item) => {
        item[name == "parameter_money" ? "money" : "summary_count"] = item[
          name == "parameter_money" ? "parameter_money" : "summary_count"
        ]
          ? item[
              name == "parameter_money" ? "parameter_money" : "summary_count"
            ]
          : name == "parameter_money"
          ? "0.00"
          : 0;
        item.name = [
          "",
          "",
          "正在审批",
          "已通过审批",
          "未通过审批",
          "已撤销审批",
        ][item.revise_info_state];
      });
      let has = list.map((itm) => itm.revise_info_state);
      let arr = [2, 4, 5]
        .filter((items) => has.indexOf(items) == -1)
        .map((itm) => {
          return {
            name: [
              "",
              "",
              "正在审批",
              "已通过审批",
              "未通过审批",
              "已撤销审批",
            ][itm],
            [name == "parameter_money" ? "money" : name]:
              name == "parameter_money" ? "0.00" : 0,
          };
        });
      listNew = [...list, ...arr];
      arrAll = [...arrAll, ...listNew];
      // 计算右上角的统计
      totalArr = [...arrAll];
      let totalArr =
        name == "parameter_money" ? [...totalArr.splice(2, 6)] : [...totalArr];
      this[
        name == "summary_count" ? "totalCount" : "totalMoney"
      ] = totalArr.reduce((acc, next) => {
        return (
          Number(acc) + Number(next[name == "summary_count" ? name : "money"])
        ).toFixed(2);
      }, 0);

      return arrAll;
    },
  },
};
</script>

<style lang="scss" scoped>
.change-wrap {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
.change-standing-box-item {
  width: 33%;
  text-align: left;
  padding: 20px 15px;
}
</style>
