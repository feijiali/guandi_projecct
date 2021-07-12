<template>
  <n-dialog
    ref="dialog"
    :diaTit="subsidy_type_arr[types] + '详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <nInfoTitle :title="'基本信息'" class="mb-2" />
        <!-- 金秋助学 -->
        <div v-if="types == 1">
          <HelpStudyInfo ref="helpStudyInfo"></HelpStudyInfo>
          <div v-if="!$route.fullPath.includes('confirm')">
            <nInfoTitle :title="'其他说明'" class="mt-2" />
            <div v-if="!infoData.objectionNo">
              <nInfoItem
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
              <nFileInfo :picList="infoData.file_list" />
            </div>
            <div v-if="infoData.subsidy_publicity_remark">
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
            </div>
          </div>
        </div>
        <div v-else-if="types == 2">
          <SickCondolenceInfo ref="SickCondolenceInfo"></SickCondolenceInfo>
        </div>
        <div v-else-if="types == 3">
          <CompensateInfo ref="CompensateInfo"></CompensateInfo>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import HelpStudyInfo from "@/views/enterprise/oa/workbench/info/components/HelpStudyInfo";
import SickCondolenceInfo from "@/views/enterprise/oa/workbench/info/components/SickCondolenceInfo";
import CompensateInfo from "@/views/enterprise/oa/workbench/info/components/CompensateInfo";
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({ pic_list: [{}], file_list: [] }),
      required: false,
    },
    types: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  components: {
    HelpStudyInfo,
    SickCondolenceInfo,
    CompensateInfo,
  },
  data() {
    return {
      subsidy_type_arr: ["困难职工", "金秋助学", "生病住院", "补偿申请"],
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
          key: "subsidy_publicity_remark",
          islong: true,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>