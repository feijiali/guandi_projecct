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
        :lable_width="140"
        :width="'30%'"
        :islong="item.islong"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />
      <nPicInfo :picList="infoData.pic_list" />
      <nFileInfo :showTitle="true" :fileList="infoData.file_list" />
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      dataInfoList: [
        { name: "所属机构", key: "organ_area_name" },
        { name: "姓名", key: "account_name" },
        { name: "性别", key: "hard_worker_sex" },
        { name: "职务", key: "hard_worker_job" },
        { name: "身份证号", key: "hard_worker_identify", ismission: true },
        { name: "年龄", key: "hard_worker_age", unit: "岁" },
        { name: "民族", key: "hard_worker_nation" },
        { name: "政治面貌", key: "hard_worker_political_string" },
        { name: "婚姻状况", key: "hard_worker_marriage_string" },
        { name: "健康状况", key: "hard_worker_health_string" },
        { name: "联系方式", key: "hard_worker_tel", ismission: true },
        {
          name: "困难职工申请类别",
          key: "hard_worker_hard_type",
          fun: (val) => {
            return ["", "特困职工", "重困职工", "一般困难职工"][val];
          },
        },
        { name: "本人月均收入(元)", key: "hard_worker_income" },
        { name: "家庭年度总收入(元)", key: "hard_worker_home_in_come" },
        { name: "家庭人口数(人)", key: "hard_worker_home_num" },
        { name: "家庭人均年收入(元)", key: "hard_worker_home_avg_in_come" },
        {
          name: "是否纳入地方低保",
          key: "hard_worker_is_low_insurance",
          fun: (val) => {
            return ["", "是", "否"][val];
          },
        },
        {
          name: "是否持有工会会员",
          key: "hard_worker_is_membership",
          fun: (val) => {
            return ["", "是", "否"][val];
          },
        },
        {
          name: "是否有住房",
          key: "hard_worker_have_house",
          fun: (val) => {
            return ["", "是", "否"][val];
          },
        },
        { name: "住房建筑面积(㎡)", key: "hard_worker_house_area" },
        { name: "困难职工银行卡号", key: "hard_worker_bank_num" },
        { name: "银行卡开户行", key: "hard_worker_bank" },
        { name: "家庭住址", key: "hard_worker_home_location", islong: true },
        { name: "致困原因", key: "hard_worker_reason", islong: true },
        { name: "已接收帮扶情况", key: "hard_worker_help_desc", islong: true },
        {
          name: "获得公司及以上荣誉情况",
          key: "hard_worker_honor_desc",
          islong: true,
        },
      ],
      infoData: { file_list: [], pic_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryUnionPartyHardWorker({
        hard_worker_id: id,
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
