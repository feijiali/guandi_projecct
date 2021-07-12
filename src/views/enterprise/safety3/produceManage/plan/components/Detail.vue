<template>
  <n-dialog
    ref="dialog"
    :diaTit="'年度计划详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <template v-for="(item, index) in dataInfoList">
            <nInfoItem
              :class="[index == 0 ? 'mt-2' : '']"
              :lable_width="item.lable_width ? item.lable_width : 70"
              :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
              :data="{
                name: item.name,
                value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
                unit: item.unit,
              }"
              :islong="item.islong ? true : false"
              :key="index"
            />
          </template>
          <nPicInfo :picList="infoData.pic_list" />
          <nFileInfo :fileList="infoData.file_list" />
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import api from "@/api/index";
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "工程项目", key: "organ" },
        { name: "年度计划名称", key: "annual_plan_name", lable_width: 100 },
        { name: "关联对象", key: "related_organ_name" },
        { name: "上传人", key: "account_name" },
        { name: "上传时间", key: "annual_plan_sub_time" },
        { name: "备注", key: "annual_plan_remark", islong: true },
      ],
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    cancel() {
      this.$refs.dialog.cancel();
    },
  },
};
</script>

<style lang="scss" scoped></style>
