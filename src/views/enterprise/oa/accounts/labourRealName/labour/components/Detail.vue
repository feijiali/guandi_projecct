<template>
  <n-dialog
    ref="dialog"
    :diaTit="'劳务人员详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoItem
            :lable_width="90"
            :width="'24%'"
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
            :isPic="item.isPic"
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
      default: () => ({ content_list: [{}] }),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "工程项目", key: "organ" },
        { name: "工区", key: "organ_area" },
        { name: "人员姓名", key: "account_name" },
        {
          name: "人员性别",
          key: "account_sex",
        },
        { name: "身份证号", key: "account_id_card" },
        {
          name: "工种",
          key: "account_job",
        },
        { name: "联系电话", key: "account" },
        {
          name: "进场时间",
          key: "worker_enter_time",
          fun: (val) => {
            return this.$utils.parseDate2Str(val + "000", "YYYY-MM-DD");
          },
        },
        { name: "劳务单位", key: "worker_labour" },
        { name: "班组名称", key: "team" },
        {
          name: "人员状态",
          key: "account_status",
          fun: (val) => {
            return ["在场", "离场"][val - 1];
          },
        },
        { name: "基本工资", key: "worker_salary" },
        {
          name: "工资是否发放",
          key: "worker_public",
          fun: (val) => {
            return ["是", "否"][val - 1];
          },
        },
        {
          name: "人员头像",
          key: "url",
          isPic: true,
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
  },
};
</script>

<style lang="scss" scoped></style>
