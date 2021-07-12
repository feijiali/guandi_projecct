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
        {
          name: "人员姓名",
          islong: false,
          key: "account_name",
          fun: () => {
            return `${this.infoData.account_name}-${this.infoData.account_job}-${this.infoData.organ}`;
          },
        },
        { name: "出差主题", islong: false, key: "evection_name" },
        {
          name: "出差时间",
          key: "evection_start_time",
          fun: () => {
            return `${this.infoData.evection_start_time}-${this.infoData.evection_end_time}`;
          },
        },
        { name: "时长", islong: false, key: "evection_time" },
        { name: "出差事由", islong: false, key: "evection_desc", islong: true },
      ],
      infoData: { file_list: [], pic_list: [] },
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.QueryOAEvection({
        evection_id: id,
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
