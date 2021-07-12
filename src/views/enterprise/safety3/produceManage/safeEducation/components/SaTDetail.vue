<template>
  <n-dialog
    ref="dialog"
    :diaTit="'安全考核详情'"
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
        { name: "所属工区", key: "organ" },
        { name: "考核类型", key: "examine_type" },
        { name: "考核主题", key: "examine_name" },
        { name: "考核日期", key: "examine_content" },
        {
          name: "考核对象",
          key: "parters",
        },
        { name: "考核内容", key: "examine_content", islong: true },
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
