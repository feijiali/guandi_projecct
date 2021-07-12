import api from "@/api/index";
export default {
    data() {
        return {

        };
    },
    mounted() {
        if (
            this.getListBool &&
            !this.$route.meta.keepAlive &&
            !this.$route.meta.needAlive &&
            !this.$route.meta.secondAlive
        ) {
            this.getList();
        }
    },
    methods: {
        toPoint(str) {
            str = str / 100;
            return str;
        },
        // 金额=计算数量*单价
        calculateFun(index, ind, name1, name2, name3, bool) {
            let val1 = this.tableList[index].list[ind][name1];//数量
            let val2 = this.tableList[index].list[ind][name2]; //单价
            let val = (val1 * val2).toFixed(2);
            this.tableList[index].list[ind][name3] = val;
            if (bool) {//说明是输入的实际完成情况的单价，此时需要计算至上月累计金额和至本月累计金额
                let val3 = this.tableList[index].list[ind].engineering_result_for_numc; //至上月累计数量
                let val4 = this.tableList[index].list[ind].engineering_result_for_nume;//至本月累计数量
                //至上月累计金额 = 至上月累计数量*单价
                this.tableList[index].list[ind].engineering_result_for_moneyc = (val2 * val3).toFixed(2);
                //至本月累计金额 = 至本月累计数量*单价
                this.tableList[index].list[ind].engineering_result_for_moneye = (val2 * val4).toFixed(2);
            }
            // 至本月累计数量=本月数量或+上月累计数量
            if (name1 == 'engineering_result_nowmonth_num' || name1 == 'engineering_result_for_numc') {
                this.tableList[index].list[ind].engineering_result_for_nume = (Number(this.tableList[index].list[ind].engineering_result_nowmonth_num) + Number(this.tableList[index].list[ind].engineering_result_for_numc)).toFixed(2);
            }
            // 不含增值税计算
            this.hasNotTaxFun(index, this.tableList[index].list, name3);
            this.proportionFun(index);
        },
        hasNotTaxFun(index, list, name) {
            // 找出isBlock为true的数据
            let arr = list.filter(item => item.number == 1);
            let sum = arr.reduce((acc, next) => {
                return Number(acc) + Number(next[name]);
            }, 0);
            this.tableList[index].list[arr.length][name] = sum.toFixed(2);
        },
        // 请输入比例,失去焦点后自动用输入的比例来计算 输入比例后自动计算=不含增值税金额合计*输入的比例
        proportionFun(index) {
            let numArr = this.tableList[index].list.filter(item => item.number == 1);
            let ind = numArr.length + 1;
            let num = this.toPoint(this.tableList[index].list[ind] && this.tableList[index].list[ind].engineering_sign_money_ratio ? this.tableList[index].list[ind].engineering_sign_money_ratio : 0);
            let nameArr = ['engineering_sign_money', 'engineering_sign_change_money', 'engineering_result_nowmonth_money', 'engineering_result_for_moneyc', 'engineering_result_for_moneye'];
            nameArr.forEach(item => {
                let val = (this.tableList[index].list[ind - 1][item] * num).toFixed(2);
                if (typeof (this.tableList[index].list[ind].engineering_sign_money_ratio) == "undefined") { //说明是导入
                    this.tableList[index].list[ind][item] = num == '0.00' ? this.tableList[index].list[ind][item] : val;
                } else {
                    this.tableList[index].list[ind][item] = num == '0.00' ? '0.00' : val;
                }


                // 计算含增值税金额
                this.hasTaxFun(index, ind, this.tableList[index].list[ind][item], this.tableList[index].list[ind - 1][item], item);
            })
        },
        // 计算含增值税金额和小计
        hasTaxFun(index, ind, val1, val2, name) {
            this.tableList[index].list[ind + 1][name] = (Number(val1) + Number(val2)).toFixed(2);
            this.tableList[index].list[ind + 2][name] = (Number(val1) + Number(val2)).toFixed(2);
            // 计算扣除领用材料下面的合计：合计=合同工程完成情况、补充合同、变更工程对应小计的合
            let nameArr = ['engineering_sign_money', 'engineering_sign_change_money', 'engineering_result_nowmonth_money', 'engineering_result_for_moneyc', 'engineering_result_for_moneye'];
            if (nameArr.indexOf(name) != -1) {
                this.totalFun(ind, name);
            }
        },
        totalFun(ind, name) {
            let totalNum = 0;
            this.tableList.forEach(item => {
                if (item.list[ind + 2]) {
                    totalNum += (item.list[ind + 2] && item.list[ind + 2][name]) ? Number(item.list[ind + 2][name]) : 0;
                }
            })
            this.tableList2[1][name] = totalNum.toFixed(2);
            if (name == 'engineering_result_nowmonth_money') {//如果是本月金额，需要对应计算本月应付计量款 = 本月金额 - 本月扣款合计
                this.topTotalFun();
            } else if (name == 'engineering_result_for_moneye') {//如果是本月累计金额，需要对应计算累计应付计量款 = 本月累计金额 - 本月累计扣款合计
                this.topTotalFun();
            }
        },
        topTotalFun() {
            let length = this.tableList3[0].list.length;
            this.ruleforms.engineering_main_pay_money = ((this.tableList2[1].engineering_result_nowmonth_money - (this.tableList3[0].list[length - 1].engineering_result_nowmonth_money ? this.tableList3[0].list[length - 1].engineering_result_nowmonth_money : 0)).toFixed(2));
            this.ruleforms.engineering_main_for_money = ((this.tableList2[1].engineering_result_for_moneye - (this.tableList3[0].list[length - 1].engineering_result_for_moneye ? this.tableList3[0].list[length - 1].engineering_result_for_moneye : 0)).toFixed(2));
        },
        // 本期、累计 计量金额构成 =人工费+材料费+机械费+其它
        meteringFun(ind) {
            let val1 = this.tableList2[ind].engineering_sign_num_price;//人工费
            let val2 = this.tableList2[ind].engineering_sign_change_num;//材料费
            let val3 = this.tableList2[ind].engineering_result_nowmonth_money;//机械费
            let val4 = this.tableList2[ind].engineering_result_for_moneyc;//其它
            if (val1 || val2 || val3 || val4) {
                let sum = Number(val1) + Number(val2) + Number(val3) + Number(val4);
                this.tableList2[ind].engineering_result_for_moneye = sum.toFixed(2);
            }
        },
        // 工程扣款情况计算
        deductionFun(index, ind, name1, name2) {
            let val1 = this.tableList3[index].list[ind][name1];
            let val2 = this.tableList3[index].list[ind][name2];
            let val = (Number(val1) + Number(val2)).toFixed(2);
            this.tableList3[index].list[ind].engineering_result_for_moneye = val;
            this.totalAllFun('engineering_result_for_moneye');
            // 计算工程扣款情况最后一行的合计
            this.totalAllFun('engineering_result_nowmonth_money');
            this.totalAllFun('engineering_result_for_moneyc');
            // 本月应付计量款
            this.topTotalFun();
            // 累计应付计量
            this.topTotalFun();
        },
        totalAllFun(name) {
            let totalNum = 0;
            let length = this.tableList3[0].list.length;
            this.tableList3[0].list.forEach((item, index) => {
                if (index != length - 1) {
                    totalNum += item[name] ? Number(item[name]) : 0;
                } else {
                    this.tableList3[0].list[length - 1][name] = totalNum.toFixed(2);
                }
            });
        },
    },
};
