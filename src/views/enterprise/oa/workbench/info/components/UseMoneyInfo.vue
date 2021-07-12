<template>
  <div class="w-100 h-100">
    <n-scroll>
      <template v-for="(item, index) in dataInfoList">
        <nInfoItem
          v-if="item.show ? item.show() : true"
          :colorString="item.colorString"
          :data="{
            name: item.fun_name ? item.fun_name() : item.name,
            value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
            unit: item.unit,
          }"
          :lable_width="90"
          :width="'30%'"
          :islong="item.islong"
          :key="index"
        />
      </template>
      <nPicInfo :picList="infoData.pic_list" />
      <template v-for="(pay, i) in infoData.pay_list">
        <NormalCard
          style="padding-right: 150px"
          :key="'card-' + i"
          class="mt-1"
          width="80%"
          :title="'第 ' + (i + 1) + ' 笔用款'"
        >
          <template
            v-for="(item, index) in infoData.money_approval_type == 3
              ? cardInfoList2
              : cardInfoList"
          >
            <nInfoItem
              v-if="item.show ? item.show() : true"
              :data="{
                name: item.fun_name ? item.fun_name() : item.name,
                value: item.fun ? item.fun(pay[item.key]) : pay[item.key],
                unit: item.unit,
              }"
              :lable_width="100"
              :width="'50%'"
              :islong="item.islong"
              :key="'card-' + i + '-' + index"
            />
          </template>
        </NormalCard>
      </template>

      <nInfoItem
        v-if="infoData.money_approval_pay_remark"
        class="mt-1"
        :data="{
          name: '备注',
          value: infoData.money_approval_pay_remark,
        }"
        :lable_width="90"
        :islong="true"
      />
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
import NormalCard from "@comp/NormalCard";
export default {
  components: {
    NormalCard,
  },
  data() {
    const money_approval_belong = {
      1: "财务",
      2: "物资",
      3: "工程",
      4: "公司",
    };
    const money_approval_type = {
      1: "付款申请",
      2: "资金共享",
      3: "资金计划",
    };
    const money_approval_pay_type = {
      1: "转账",
      2: "现金",
      3: "其他",
    };
    const pay_name = {
      1: "付款金额",
      2: "共享金额",
      3: "付款金额",
    };
    const pay_now_money_name = {
      1: "本次支付金额",
      2: "共享金额",
      3: "计划支付金额",
    };
    return {
      dataInfoList: [
        { name: "所属机构", islong: false, key: "organ_area" },
        {
          name: "申请日期",
          islong: false,
          key: "money_approval_sub_time",
          fun: (val) => {
            return val ? val.split(" ")[0] : "";
          },
        },
        {
          name: "申请类型",
          islong: false,
          key: "money_approval_type",
          fun: (val) => {
            return money_approval_type[val];
          },
        },
        {
          name: "支付时间",
          islong: false,
          key: "money_approval_pay_time",
        },
        {
          fun_name: () => {
            return this.infoData.money_approval_type == 2
              ? "共享金额"
              : "付款金额";
          },
          islong: false,
          colorString: "text-hover-primary font-weight-bolder",
          unit: "元",
          key: "money_approval_amount",
        },
        {
          name: "模板类型",
          islong: false,
          key: "money_approval_belong",
          fun: (val) => {
            return money_approval_belong[val];
          },
        },
        {
          name: "是否工费",
          islong: false,
          show: () => {
            return this.infoData.money_approval_belong == 1;
          },
          key: "money_approval_is_labor",
          fun: (val) => {
            return val == 1 ? "是" : "否";
          },
        },
        {
          fun_name: () => {
            return this.infoData.money_approval_type == 1
              ? "付款公司"
              : "付款单位";
          },
          islong: false,
          key: "money_approval_pay_company",
        },
        {
          name: "负责人",
          show: () => {
            return this.infoData.money_approval_type == 1;
          },
          islong: false,
          key: "money_approval_principal",
        },
        {
          fun_name: () => {
            return this.infoData.money_approval_type == 2
              ? "共享事由"
              : "付款事由";
          },
          islong: true,
          key: "money_approval_cause",
        },
        { name: "备注", islong: true, key: "money_approval_remark" },
      ],
      cardInfoList: [
        { name: "收款人", islong: false, key: "money_approval_pay_receive" },
        {
          name: "收款账户",
          islong: false,
          key: "money_approval_pay_account_num",
        },
        { name: "开户行", islong: false, key: "money_approval_pay_bank" },

        {
          fun_name: () => {
            return pay_now_money_name[this.infoData.money_approval_type];
          },
          islong: false,
          lable_width: 100,
          unit: "元",
          key: "money_approval_pay_now_money",
        },
        {
          name: "已支付金额",
          show: () => {
            return (
              this.infoData.money_approval_belong == 2 &&
              this.infoData.money_approval_type == 1
            );
          },
          islong: false,
          unit: "元",
          key: "money_approval_pay_paid",
        },
        {
          name: "未支付金额",
          show: () => {
            return (
              this.infoData.money_approval_belong == 2 &&
              this.infoData.money_approval_type == 1
            );
          },
          islong: false,
          unit: "元",
          key: "money_approval_pay_remain",
        },
        {
          fun_name: () => {
            return this.infoData.money_approval_type == 2
              ? "共享方式"
              : "付款方式";
          },
          islong: false,
          key: "money_approval_pay_type",
          fun: (val) => {
            return money_approval_pay_type[val];
          },
        },
        {
          name: "备注",
          show: () => {
            return (
              this.infoData.money_approval_type == 3 ||
              (this.infoData.money_approval_type == 1 &&
                (this.infoData.money_approval_belong == 1 ||
                  this.infoData.money_approval_belong == 3 ||
                  this.infoData.money_approval_belong == 4))
            );
          },
          islong: false,
          key: "money_approval_pay_remark",
        },
      ],
      cardInfoList2: [
        { name: "付款事项", islong: false, key: "money_approval_pay_title" },
        {
          name: "收款方",
          islong: false,
          key: "money_approval_pay_receive",
        },
        {
          name: "计划支付金额",
          islong: false,
          unit: "元",
          key: "money_approval_pay_now_money",
        },
        {
          name: "付款方式",
          islong: false,
          key: "money_approval_pay_type",
          fun: (val) => {
            return money_approval_pay_type[val];
          },
        },
        {
          name: "备注",
          islong: false,
          key: "money_approval_pay_remark",
        },
      ],
      infoData: { pay_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOAMoneyApproval({
        money_approval_id: id,
      });
      if (!result[0]) {
        this.$tip({
          isTip: true,
          message: "该数据已被删除！",
        });
        setTimeout(() => {
          this.$router.linkTo("enterprise_oa_workbench_commission", {
            t: 1,
          });
        }, 1000);
      } else {
        this.infoData = result[0];
        if (
          this.infoData.money_approval_type == 1 &&
          (this.infoData.money_approval_belong == 2 ||
            this.infoData.money_approval_belong == 3)
        ) {
          this.dataInfoList.push(
            {
              name: "合同编号",
              islong: false,
              key: "contract_approval",
              fun: (val) => {
                return this.infoData.contract_approval.contract_approval_number;
              },
            },
            {
              name: "合同名称",
              islong: false,
              key: "contract_approval",
              fun: (val) => {
                return this.infoData.contract_approval.contract_approval_name;
              },
            }
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
</style>
