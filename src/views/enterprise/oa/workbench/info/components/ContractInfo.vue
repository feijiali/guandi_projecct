<template>
  <div class="w-100 position-relative h-100">
    <n-scroll>
      <nInfoItem
        :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
        :data="{
          name: item.name,
          value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
          unit: item.unit,
        }"
        :isShowItem="item.isShowItem ? item.isShowItem() : true"
        :lable_width="100"
        :width="'30%'"
        :islong="item.islong"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />

      <nInfoItem
        v-if="infoData.revise_info_undo_reason"
        :data="{
          name: '撤销原因',
          value: infoData.revise_info_undo_reason,
        }"
        :lable_width="90"
        :islong="true"
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
        { name: "所属机构", islong: false, key: "organ_area" },
        {
          name: "申请日期",
          islong: false,
          key: "contract_approval_sub_time",
          fun: (val) => {
            return val ? val.split(" ")[0] : "";
          },
        },
        {
          name: "合同类型",
          islong: false,
          key: "contract_approval_type",
          fun: (val) => {
            return ["业主合同", "班组合同"][val - 1];
          },
        },
        { name: "合同名称", islong: false, key: "contract_approval_name" },
        { name: "合同编号", islong: false, key: "contract_approval_number" },
        { name: "合同分类", islong: false, key: "contract_approval_type_str" },
        {
          name: "甲方单位",
          islong: false,
          key: "contract_approval_department",
        },
        {
          name: "甲方负责人",
          islong: false,
          key: "contract_approval_department_linkman",
        },
        {
          name: "甲方联系方式",
          islong: false,
          key: "contract_approval_department_mobile",
        },
        { name: "乙方单位", islong: false, key: "contract_approval_supplier" },
        {
          name: "乙方负责人",
          islong: false,
          key: "contract_approval_supplier_linkman",
        },
        {
          name: "乙方联系方式",
          islong: false,
          key: "contract_approval_supplier_mobile",
        },
        { name: "第三方", islong: false, key: "contract_approval_thread" },
        {
          name: "里程",
          islong: false,
          key: "contract_approval_meter",
          unit: "公里",
        },
        {
          name: "合同总价/单价",
          islong: false,
          key: "contract_approval_money",
          unit: "元",
        },
        {
          name: "预计合同总价/单价",
          islong: false,
          key: "contract_approval_present_money",
          unit: "元",
        },
        {
          name: "合同工期",
          islong: false,
          key: "contract_approval_finish_time",
        },
        {
          name: "所属A合同",
          islong: false,
          key: "contract_approval_parent_name",
          isShowItem: () => {
            return this.infoData.contract_approval_type == 1 ? false : true;
          },
        },
        { name: "经办人", islong: false, key: "contract_approval_due_person" },
        { name: "签订日期", islong: false, key: "contract_approval_time" },
        {
          name: "合同版本及总份数",
          islong: false,
          key: "contract_approval_version",
        },

        { name: "发起人意见", islong: true, key: "contract_approval_advice" },
      ],
      infoData: { file_list: [], pic_list: [] },
      isCancel: false, //是否是销假详情
      isUseMoney: 0, //用款申请详情
    };
  },

  mounted() {},
  methods: {
    async queryOAMoneyApproval() {
      let res = await api.queryOAMoneyApproval({
        page: -2,
        page_size: 1,
        money_approval_union_id: this.infoData.contract_approval_id,
        money_approval_union_module: "OAContractApproval",
      });
      this.isUseMoney = res.total_count;
    },
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOAContractApproval({
        contract_approval_id: id,
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
        // 查询用款申请
        await this.queryOAMoneyApproval();
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
