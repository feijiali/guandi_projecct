<template>
  <n-dialog
    ref="dialog"
    :diaTit="'项目信息详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoItem
            :class="[index == 0 ? 'mt-2' : '']"
            :lable_width="96"
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
        { name: "项目名称", key: "project" },
        { name: "负责人", key: "project_principal" },
        { name: "项目简称", key: "project_simple" },
        {
          name: "总造价",
          key: "project_total_value",
          fun: (val) => {
            return `${val ? val + "万元" : ""}`;
          },
        },
        { name: "联系电话", key: "project_tel" },
        { name: "隶属机构", key: "project_subordinate" },
        {
          name: "项目工期",
          key: "project_start",
          fun: (val) => {
            return `${this.infoData.project_start} - ${this.infoData.project_end}`;
          },
        },
        {
          name: "项目类别",
          key: "project_type",
        },
        { name: "项目地址", key: "project_pos" },
        // { name: "项目状态", key: "enter_date" },
        {
          name: "项目状态",
          key: "project_state",
          fun: (val) => {
            return ["", "在建项目", "完工项目", "停工项目"][val];
          },
        },
        { name: "经度", key: "project_lng" },
        { name: "纬度", key: "project_lat" },
        { name: "项目简介", key: "project_desc", islong: true },
      ],
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
  },
};
</script>

<style lang="scss" scoped></style>
