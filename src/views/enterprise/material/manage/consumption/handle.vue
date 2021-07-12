<template>

  <handle-layout :title="title"
                 :modules_union="modules_union"
                 :list="list"
                 :headers="headers"
                 :importApi="importApi"
                 :downLoadApi="downLoadApi"
                 @selectChange="chooseEngineeringName"
                 @inputChange="calFun"></handle-layout>
</template>

<script>
import handleLayout from "../../layouts/handleLayout"
export default {

  components: {
    handleLayout
  },
  data () {
    return {
      title: "新增工程材料用量",
      modules_union: "ProjectReportEngineeringMain",
      list: [],
      headers: [
        { key: "id", name: "序号", width: 40, placeholder: "请输入", isauto: true },
        { key: "name", name: "材料名称", width: 120, placeholder: "搜索/选择/请输入", type: 2, historyArr: [] },
        { key: "unit", name: "单位", width: 80, placeholder: "自动获取/请输入", type: 1 },
        { key: "num", name: "图纸数量", placeholder: "自动获取/请输入" },
        { key: "allnum", name: "累计完成数量", placeholder: "自动获取/请输入" },
        { key: "allreal", name: "本期完成数量", placeholder: "请输入" },
        { key: "a", name: "剩余数量", placeholder: "自动计算/请输入" },
        { key: "b", name: "完成百分比(%)", width: 80, placeholder: "自动计算/请输入" },
        { key: "remark", name: "备注", placeholder: "请输入", type: 1 }
      ],
      importApi: {
        permission: [],
        url: ""
      },
      downLoadApi: {
        url: "",
        name: ""
      }
    };
  },
  methods: {
    //选择材料名称
    chooseEngineeringName (key, value, index) {

      this.list[index].num = 3.00
      this.list[index].allnum = 2.00
      this.profitCalc(this.list[index])
    },
    calFun (key, value, index) {

      (key == "allnum" || key == 'num') && this.profitCalc(this.list[index])

    },
    profitCalc (item) {
      if (item["allnum"] && item['num']) {
        item["a"] = this.$utils.accAdd(item['num'], -item["allnum"])
        item["b"] = item["allnum"] / item['num']
      }
    },
  }
};
</script>
