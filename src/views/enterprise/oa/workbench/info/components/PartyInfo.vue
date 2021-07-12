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
        { name: "所属机构", key: "organ_area_name" },
        { name: "申请名称", key: "pd_title" },
        { name: "申请人", key: "account_name" },
        { name: "申请时间", key: "pd_sub_time" },
        { name: "提交人", key: "sub_account_name" },
        { name: "备注", key: "pd_remark", islong: true },
      ],
      infoData: { file_list: [], pic_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: id,
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
