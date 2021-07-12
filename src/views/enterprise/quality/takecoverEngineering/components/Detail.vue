<template>
  <n-dialog
    ref="dialog"
    :diaTit="'隐蔽工程验收详情'"
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
            :isShowItem="item.isShowItem ? item.isShowItem() : true"
            :data="{
              name: item.name,
              value: item.mileage
                ? item.mileage(infoData)
                : item.fun
                ? item.fun(infoData[item.key])
                : infoData[item.key],
              unit: item.unit,
            }"
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList"
            :key="index"
          />
          <nPicInfo :picList="infoData.pic_list" />
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
        { name: "所在位置", key: "process_inspection_submit_location" },
        {
          name: "单位工程",
          key: "process_inspection_project_type",
          fun: (val) => {
            return ["", "隧道", "桥梁", "其他"][val];
          },
        },
        {
          name: "工程名称",
          key: "process_inspection_project_name",
          isShowItem: () => {
            return this.infoData.process_inspection_project_type == 3
              ? false
              : true;
          },
        },
        {
          name: "里程桩号",
          mileage(value) {
            return (
              value["process_inspection_project_prefix"] +
              value["process_inspection_project_pile_range"]
            );
          },
          isShowItem: () => {
            return this.infoData.process_inspection_project_type == 3
              ? false
              : true;
          },
        },
        {
          name: "检查描述",
          key: "process_inspection_content",
        },
        {
          name: "检查时间",
          key: "process_inspection_check_time",
        },
        {
          name: "是否是隐蔽工程",
          key: "process_inspection_is_hide",
          fun: (val) => {
            return val == 1 ? "是" : "否";
          },
        },
        {
          name: "记录人",
          key: "daily_inspection_approval_account_name",
        },
        {
          name: "验收结果",
          key: "process_inspection_state",
          fun: (val) => {
            return val == 1 ? "质量合格" : val == 2 ? "质量不合格" : "暂无";
          },
        },
        {
          name: "审批状态",
          key: "process_inspection_approval_state",
          fun: (val) => {
            return ["待审批", "审批通过", "审批不通过"][val - 1];
          },
        },
        {
          name: "审批备注",
          key: "process_inspection_approval_remark",
          islong: true,
          isShowItem: () => {
            return this.infoData.process_inspection_approval_remark
              ? true
              : false;
          },
        },

        { name: "备注", key: "process_inspection_remark", islong: true },
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
