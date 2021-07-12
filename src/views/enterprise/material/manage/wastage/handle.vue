<template>
  <handle-layout
    :title="title"
    :modules_union="modules_union"
    :list="list"
    :headers="headers"
    :importApi="importApi"
    :downLoadApi="downLoadApi"
    @selectChange="chooseEngineeringName"
    @inputChange="calFun"
  ></handle-layout>
</template>

<script>
import handleLayout from "../../layouts/handleLayout";
export default {
  components: {
    handleLayout,
  },
  data() {
    return {
      title: "新增主要材料损耗",
      modules_union: "ProjectReportEngineeringMain",
      list: [],
      headers: [
        { key: "id", name: "序号", width: 40, placeholder: "请输入", type: 1 },
        {
          key: "name",
          name: "材料名称及工程部位",
          width: 120,
          placeholder: "搜索/选择/请输入",
          type: 2,
          historyArr: [],
        },
        {
          key: "unit",
          name: "单位",
          width: 80,
          placeholder: "自动获取/请输入",
          type: 1,
        },
        {
          key: "num",
          name: "图纸数量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "allnum",
          name: "累计完成设计量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "allreal",
          name: "累计完成实际量",
          width: 80,
          placeholder: "自动获取/请输入",
        },
        {
          key: "a",
          name: "累计盈亏(盈-亏+)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "b",
          name: "累计损耗率(%)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        { key: "c", name: "本期施工设计量", placeholder: "请输入" },
        { key: "d", name: "本期施工实际量", placeholder: "请输入" },
        {
          key: "e",
          name: "本期盈亏(盈-亏+)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "f",
          name: "本期损耗率(%)",
          width: 80,
          placeholder: "自动计算/请输入",
        },
        {
          key: "remark",
          name: "备注(损耗分析)",
          placeholder: "请输入",
          type: 1,
        },
      ],
      importApi: {
        permission: [],
        url: "",
      },
      downLoadApi: {
        url: "",
        name: "",
      },
    };
  },
  methods: {
    //选择材料名称
    chooseEngineeringName(key, value, index) {
      this.list[index].allnum = 1.0;
      this.list[index].allreal = 2.0;
      profitCalc(this.list[index]);
    },
    calFun(key, value, index) {
      (key == "allnum" || key == "allreal") &&
        this.cumulativeCalc(this.list[index]);
      (key == "c" || key == "d") && this.theIssueCalc(this.list[index]);
    },
    //累计计算
    cumulativeCalc(item) {
      const { profit, loss } = this.profitCalc(item, "allnum", "allreal");
      item["a"] = profit;
      item["b"] = loss;
    },
    //本期计算
    theIssueCalc(item) {
      const { profit, loss } = this.profitCalc(item, "c", "d");
      item["e"] = profit;
      item["f"] = loss;
    },
    profitCalc(item, key1, key2) {
      if (item[key1] && item[key2]) {
        var tmp = this.$utils.accAdd(item[key2], -item[key1]);
        return { profit: tmp, loss: tmp / item[key2] };
      }
      return { profit: "", loss: "" };
    },
  },
};
</script>
