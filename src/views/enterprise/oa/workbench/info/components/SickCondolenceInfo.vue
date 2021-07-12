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
        :lable_width="100"
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
        { name: "所属机构", key: "organ" },
        { name: "家庭成员姓名", key: "subsidy_family_members" },
        { name: "职工姓名", key: "subsidy_name" },
        { name: "住院者姓名", key: "subsidy_hospitalization" },
        {
          name: "慰问项目",
          key: "subsidy_condolences_type",
          fun: (val) => {
            return ["", "一般", "重症"][val];
          },
        },
        {
          name: "性别",
          key: "subsidy_sex",
        },
        { name: "慰问金额", key: "subsidy_send_amount", unit: "元" },
        { name: "慰问金额", key: "subsidy_send_amount_ch" },
        { name: "联系电话", key: "subsidy_tel" },
        { name: "职务", key: "subsidy_job" },

        { name: "身份证号", key: "subsidy_identify" },
        {
          name: "发放方式",
          key: "subsidy_send_type",
          fun: (val) => {
            return ["", "打卡", "现金"][val];
          },
        },
        { name: "住院原因", key: "subsidy_hospital_reason", isolong: true },
        { name: "发放时间", key: "subsidy_send_time", isolong: true },
      ],
      infoData: { file_list: [], pic_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryUnionPartySubsidy({
        subsidy_id: id,
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
