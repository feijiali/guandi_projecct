<template>
  <n-dialog
    ref="dialog"
    :diaTit="'困难职工详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <nInfoTitle :title="'基本信息'" class="mb-2" />
        <!-- 困难职工 -->
        <hardworkers ref="hardworkers"></hardworkers>
        <template v-if="!$route.fullPath.includes('confirm')">
          <nInfoTitle :title="'其他说明'" />
          <template v-if="!infoData.objectionNo">
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
            <nFileInfo :fileList="infoData.file_list" />
          </template>
          <template v-if="infoData.hard_worker_publicity_remark">
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
              v-for="(item, index) in dataInfoList2"
              :key="index + 's'"
            />
          </template>
        </template>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import hardworkers from "@/views/enterprise/oa/workbench/info/components/HardworkersInfo";
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({ pic_list: [{}], file_list: [] }),
      required: false,
    },
  },
  components: {
    hardworkers,
  },
  data() {
    return {
      dataInfoList: [
        {
          name: "异议情况",
          key: "hard_worker_hard_state",
          fun: (val) => {
            return "存在异议";
          },
        },
        { name: "提出人", key: "sub_account_name" },
        {
          name: "提出日期",
          key: "publicity_sub_time",
        },
        {
          name: "异议说明",
          key: "publicity_reason",
          islong: true,
        },
      ],
      dataInfoList2: [
        {
          name: "处理说明",
          key: "hard_worker_publicity_remark",
          islong: true,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>