<template>
  <div class="w-100 position-relative">
    <div class="div-use">
      <div class="div-date d-flex justify-content-between mb-1">
        <span>项目：{{ infoData.organ }}</span>
        <span>申请日期: {{ infoData.money_approval_sub_time }}</span>
        <span>申请人: {{ infoData.sub_account_name }}</span>
        <span v-if="infoData.money_approval_type == 1"
          >负责人: {{ infoData.money_approval_principal }}</span
        >
      </div>
      <div class="div-table">
        <table class="table-origin">
          <tbody>
            <tr>
              <td colspan="2">付款公司</td>
              <td class="td" colspan="7">
                {{ infoData.money_approval_pay_company }}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                {{
                  infoData.money_approval_type == 2 ? "共享事由" : "付款事由"
                }}
              </td>
              <td class="td" colspan="7">
                {{ infoData.money_approval_cause }}
              </td>
            </tr>
            <tr v-if="infoData.money_approval_belong == 1">
              <td colspan="2">是否工费</td>
              <td class="td" colspan="7">
                {{ infoData.money_approval_is_labor == 1 ? "是" : "否" }}
              </td>
            </tr>
            <tr v-if="infoData.money_approval_state == 3">
              <td colspan="2">付款日期</td>
              <td class="td" colspan="7">
                {{ infoData.money_approval_payoff_time }}
              </td>
            </tr>
            <tr>
              <td colspan="2">付款总额</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 2
                    : 1
                "
                class="td"
              >
                {{ infoData.money_approval_amount }}元
              </td>
              <td colspan="2">需支付时间</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 3
                    : 2
                "
                class="td"
              >
                {{ infoData.money_approval_pay_time }}
              </td>
            </tr>
            <tr>
              <td colspan="2">申请类型</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 2
                    : 1
                "
                class="td"
              >
                {{
                  { 1: "付款申请", 2: "资金共享", 3: "资金计划" }[
                    infoData.money_approval_type
                  ]
                }}
              </td>
              <td colspan="2">模板类型</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 3
                    : 2
                "
                class="td"
              >
                {{
                  { 1: "财务", 2: "物资", 3: "工程", 4: "公司" }[
                    infoData.money_approval_belong
                  ]
                }}
              </td>
            </tr>
            <tr
              v-if="
                infoData.money_approval_type == 1 &&
                (infoData.money_approval_belong == 2 ||
                  infoData.money_approval_belong == 3)
              "
            >
              <td colspan="2">合同编号</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 2
                    : 1
                "
                class="td"
              >
                {{ infoData.contract_approval.contract_approval_number }}
              </td>
              <td colspan="2">合同名称</td>
              <td
                :colspan="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                    ? 3
                    : 2
                "
                class="td"
              >
                {{ infoData.contract_approval.contract_approval_name }}
              </td>
            </tr>
            <tr>
              <td>序号</td>
              <td class="td">收款人</td>
              <td>收款账号</td>
              <td class="td">开户行</td>
              <td>
                {{ pay_now_money_name[infoData.money_approval_type] }}
              </td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                "
              >
                已支付金额
              </td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                "
              >
                剩余未付金额
              </td>
              <td class="td">
                {{
                  infoData.money_approval_type == 2 ? "共享方式" : "付款方式"
                }}
              </td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 3 ||
                  (infoData.money_approval_type == 1 &&
                    (infoData.money_approval_belong == 1 ||
                      infoData.money_approval_belong == 3 ||
                      infoData.money_approval_belong == 4))
                "
              >
                备注
              </td>
            </tr>
            <tr v-for="(item, index) in infoData.pay_list" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="td">{{ item.money_approval_pay_receive }}</td>
              <td>{{ item.money_approval_pay_account_num }}</td>
              <td class="td">{{ item.money_approval_pay_bank }}</td>
              <td>{{ item.money_approval_pay_now_money }}元</td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                "
              >
                {{ item.money_approval_pay_paid }}元
              </td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 1 &&
                  infoData.money_approval_belong == 2
                "
              >
                {{ item.money_approval_pay_remain }}元
              </td>
              <td class="td">
                {{ money_approval_pay_type[item.money_approval_pay_type] }}
              </td>
              <td
                class="td"
                v-if="
                  infoData.money_approval_type == 3 ||
                  (infoData.money_approval_type == 1 &&
                    (infoData.money_approval_belong == 1 ||
                      infoData.money_approval_belong == 3 ||
                      infoData.money_approval_belong == 4))
                "
              >
                {{ item.money_approval_pay_remark }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="div-date d-flex justify-content-between mt-1"
        v-if="infoData.money_approval_remark"
      >
        备注:{{ infoData.money_approval_remark }}
      </div>
      <template v-if="isFilePrint && infoData.pic_list.length">
        <div style="page-break-after: always"></div>
        <div class="d-flex justify-content-between flex-wrap">
          <div style="page-break-after: always">
            <img
              style="width: 100%"
              class="mb-1 d-block"
              v-for="(item, index) in infoData.pic_list"
              :key="index"
              :src="item.url"
            />
          </div>
        </div>
        <p style="page-break-after: always"></p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
    },
    isFilePrint: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      money_approval_belong: {
        1: "财务",
        2: "物资",
        3: "工程",
        4: "公司",
      },
      money_approval_type: {
        1: "付款申请",
        2: "资金共享",
        3: "资金计划",
      },
      money_approval_pay_type: {
        1: "转账",
        2: "现金",
        3: "其他",
      },
      pay_name: {
        1: "付款金额",
        2: "共享金额",
        3: "付款金额",
      },
      pay_now_money_name: {
        1: "本次支付金额",
        2: "共享金额",
        3: "计划支付金额",
      },
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
