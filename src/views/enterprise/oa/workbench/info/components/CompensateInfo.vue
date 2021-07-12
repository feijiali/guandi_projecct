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
        { name: "上次补偿日期", key: "subsidy_last_compensation_time" },
        { name: "职工姓名", key: "subsidy_name" },
        { name: "个人负担费用", key: "subsidy_self_amount", unit: "元" },
        {
          name: "性别",
          key: "subsidy_sex",
        },
        {
          name: "补偿类型",
          key: "subsidy_compensation_type",
          fun: (val) => {
            return ["", "大病补偿", "伤残补偿", "死亡补偿"][val];
          },
        },
        { name: "年龄", key: "subsidy_age", unit: "岁" },
        { name: "报销比例", key: "subsidy_proportion" },
        { name: "联系电话", key: "subsidy_tel" },
        { name: "补偿金额", key: "subsidy_send_amount", unit: "元" },
        { name: "身份证号", key: "subsidy_identify" },
        { name: "职务", key: "subsidy_job" },
        { name: "核定金额", key: "subsidy_verify_amount", unit: "元" },
        {
          name: "发放方式",
          key: "subsidy_send_type",
          fun: (val) => {
            return ["", "打卡", "现金"][val];
          },
        },
        { name: "发放时间", key: "subsidy_send_time" },
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
