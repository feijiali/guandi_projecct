<template>
  <n-dialog
    ref="dialog"
    :diaTit="'技术交底详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoItem
            :class="[index == 0 ? 'mt-2' : '']"
            :lable_width="item.lable_width ? item.lable_width : 70"
            :colorString="
              item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
            "
            :data="{
              name: item.name,
              value: item.fun
                ? item.fun(infoData[item.key])
                : infoData[item.key],
              unit: item.unit,
            }"
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList"
            :key="index"
          />
          <nPicInfo :picList="infoData.pic_list" />
          <nVideoInfo :videoList="infoData.video_list" />
          <nFileInfo :fileList="infoData.file_list" />
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({ pic_list: [], video_list: [], content_list: [{}] }),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "所属工区", key: "organ" },
        { name: "主题", key: "quality_tech_confess_theme" },
        {
          name: "交底时间",
          key: "quality_tech_confess_time",
        },
        {
          name: "交底人",
          key: "account_list",
          fun: (val) => {
            let arr = val.map((item) => item.tech_account_name);
            return arr.join(",");
          },
        },
        {
          name: "被交底班组",
          key: "to_organ_list",
          fun: (val) => {
            let arr = val.map((item) => item.tech_organ_name);
            return arr.join(",");
          },
        },
        {
          name: "交底内容",
          key: "quality_tech_confess_content",
          islong: true,
        },
      ],
    };
  },
  created() {},
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

<style lang="scss" scoped>
// .layer-title-blue {
//   color: #557dfd;
//   font-size: 15px;
//   font-weight: bold;
//   letter-spacing: 1px;
//   padding-left: 5px;
// }
.layer-border {
  border: 2px dashed #557dfd;
  padding: 10px;
}
</style>
