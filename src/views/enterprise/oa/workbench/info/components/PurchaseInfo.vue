<template>
  <div class="w-100 h-100">
    <n-scroll>
      <nInfoItem
        :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
        :data="{
          name: item.fun_name ? item.fun_name() : item.name,
          value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
          unit: item.unit,
        }"
        :lable_width="90"
        :width="'30%'"
        :islong="item.islong"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />
      <nPicInfo :picList="infoData.pic_list" />
      <nFileInfo :fileList="infoData.file_list" />
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      dataInfoList: [
        { name: "所属机构", islong: false, key: "organ" },
        // { name: "项目名称", islong:false, key: "project_simple" },
        { name: "材料名称", islong: false, key: "purchase_approval_name" },
        { name: "申请数量", islong: false, key: "purchase_approval_num" },
        { name: "材料型号", islong: false, key: "purchase_approval_spec" },
        { name: "材料单位", islong: false, key: "purchase_approval_unit" },
        {
          name: "合同签订单位",
          islong: false,
          key: "purchase_approval_sign_company",
        },
        {
          name: "项目建议结算方式",
          islong: false,
          key: "purchase_approval_settlement",
        },
        {
          name: "总价",
          islong: false,
          key: "purchase_approval_total_amount",
          unit: "元",
        },
        { name: "进场日期", islong: false, key: "purchase_approval_in_time" },
        {
          name: "项目预算单价",
          islong: false,
          key: "purchase_approval_price",
          unit: "元",
        },
        { name: "采购用途", islong: true, key: "purchase_approval_use_for" },
        { name: "具体说明", islong: true, key: "purchase_approval_remark" },
      ],
      infoData: { file_list: [], pic_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOAPurchaseApproval({
        purchase_approval_id: id,
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
