<template>
  <n-dialog
    ref="dialog"
    :diaTit="'试块管理详情'"
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
        { name: "文件名称", key: "test_control_file_name" },
        { name: "上传时间", key: "test_control_upload_time" },
        {
          name: "上传人",
          key: "sub_account_name",
        },
        {
          name: "累计温度",
          key: "test_control_total_temperature",
          fun: (val) => {
            return infoData.test_control_is_temperature == 1 ? val + "℃" : "--";
          },
        },
        {
          name: "累计天数",
          key: "test_control_total_day",
          fun: (val) => {
            return infoData.test_control_is_temperature == 1
              ? val + "天"
              : "--";
          },
        },
        {
          name: "备注",
          key: "test_control_remark",
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
