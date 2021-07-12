<template>
  <n-dialog
    ref="dialog"
    :diaTit="'入党积极分子详情'"
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
          <nFileInfo :fileList="infoData.file_list" :title="'已有文稿'" />
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
      default: () => ({ pic_list: [{}], file_list: [] }),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "所属机构", key: "organ_area_name" },
        { name: "申请名称", key: "pd_title" },
        {
          name: "申请人",
          key: "account_name",
        },
        {
          name: "申请时间",
          key: "pd_sub_time",
        },
        {
          name: "提交人",
          key: "sub_account_name",
        },
        {
          name: "确认状态",
          key: "pd_states",
          fun: (val) => {
            return this.$parent.pdStateArr[val];
          },
          Colorfun: (val) => {
            return this.$parent.colorArr[val];
          },
        },
        {
          name: "备注",
          key: "pd_remark",
          islong: true,
        },
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
    // 打印
    doPrint() {
      this.$emit("doPrint");
    },
  },
};
</script>

<style lang="scss" scoped></style>
