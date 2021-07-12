<template>
  <n-dialog
    ref="dialog"
    :diaTit="'班前教育详情'"
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
          <nVideoInfo :videoList="infoData.video_list" />
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
        {
          name: "所属工区",
          key: "organ",
        },
        { name: "教育主题", key: "education_theme" },
        { name: "上传人", key: "account_name" },
        { name: "教育日期", key: "education_time" },
        {
          name: "教育对象",
          key: "education_target",
        },
        { name: "教育内容", key: "education_content", islong: true },
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
