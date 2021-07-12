<template>
  <n-dialog
    ref="dialog"
    :diaTit="'日常巡检详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <div @click="doPrint()" class="print-btn position-absolute cursor-p">
        <img src="@/assets/images/btn_view_print.png" />
      </div>
      <n-scroll>
        <div class="px-1">
          <nInfoTitle title="巡检内容" />
          <nInfoItem
            :class="[index == 0 ? 'mt-2' : '']"
            :lable_width="item.lable_width ? item.lable_width : 70"
            :colorString="
              item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
            "
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
          <nPicInfo :picList="infoData.daily_inspection_pic_list" />
          <nVideoInfo :videoList="infoData.daily_inspection_video_list" />
          <nInfoTitle
            v-if="
              [3, 4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
            "
            title="整改内容"
          />
          <div
            v-if="
              [3, 4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
            "
            class="mt-1 layer-border position-relative"
          >
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
              :key="index"
            />
            <n-button
              v-if="
                infoData.daily_inspection_status == 3 &&
                infoData.account_name_rec == this.$store.getters.userName
              "
              class="position-absolute"
              style="right: 10px; bottom: 10px"
              :btnText="'整改回复'"
              @buttonClick="
                $router.linkTo('enterprise_safety3_produceManage_plan_Reply', {
                  id: infoData.daily_inspection_id,
                  type: 1,
                })
              "
            >
            </n-button>
          </div>
          <nInfoTitle
            v-if="[4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1"
            class="mt-1"
            title="整改详情"
          />
          <div
            v-if="[4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1"
            class="mt-1 layer-border position-relative"
          >
            <div>整改回复</div>
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
              v-for="(item, index) in dataInfoList3"
              :key="index"
            />
            <n-button
              v-if="
                infoData.daily_inspection_status == 5 &&
                infoData.account_name_return == this.$store.getters.userName
              "
              class="position-absolute"
              style="right: 10px; bottom: 10px"
              :btnText="'复检回复'"
              @buttonClick="
                $router.linkTo('enterprise_safety3_produceManage_plan_Reply', {
                  id: infoData.daily_inspection_id,
                  type: 2,
                })
              "
            >
            </n-button>
          </div>
          <nPicInfo :picList="infoData.rec_pic_list" />
          <nVideoInfo :videoList="infoData.rec_video_list" />
          <div
            v-if="[6, 7].indexOf(infoData.daily_inspection_status) != -1"
            class="mt-1 layer-border"
          >
            <div>复检回复</div>
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
              v-for="(item, index) in dataInfoList4"
              :key="index"
            />
            <nPicInfo :picList="infoData.return_pic_list" />
            <nVideoInfo :videoList="infoData.return_video_list" />
          </div>
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
      default: () => ({ pic_list: [], video_list: [], content_list: [{}] }),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "所属机构", key: "organ" },
        { name: "巡检主题", key: "daily_inspection_title" },
        {
          name: "隐患类型",
          key: "trouble_type",
          fun: (val) => {
            return ["", "无", "一般隐患", "较大隐患", "重大隐患"][val];
          },
        },
        {
          name: "单位工程",
          key: "inspection_project_type",
          fun: (val) => {
            return ["", "隧道", "桥梁", "其他"][val];
          },
        },
        { name: "工程名称", key: "inspection_project_name" },
        {
          name: "里程桩号",
          mileage(value) {
            return (
              value["inspection_project_pile_prefix"] +
              value["inspection_project_pile"]
            );
          },
        },
        {
          name: "巡检地点",
          key: "daily_inspection_position",
        },
        {
          name: "发起日期",
          key: "daily_inspection_submit_time",
        },
        {
          name: "巡检日期",
          key: "daily_inspection_date",
        },
        {
          name: "验收结果",
          key: "daily_inspection_result",
          fun: (val) => {
            return ["", "通过", "口头警告", "排查整改"][val];
          },
        },
        { name: "发起人", key: "account_name" },
        { name: "巡检人", key: "account_name_check" },
        {
          name: "是否为风险源",
          key: "daily_inspection_danger_area",
          lable_width: 97,
          fun: (val) => {
            return ["", "是", "否"][val];
          },
        },
        { name: "抄送人", key: "account_name_copy" },

        {
          name: "巡检内容",
          key: "daily_inspection_content",
          islong: true,
        },
        { name: "巡检备注", key: "daily_inspection_remark", islong: true },
      ],
      dataInfoList2: [
        { name: "整改人", key: "account_name_rec" },
        { name: "整改时间", key: "rec_time" },
        { name: "复检人", key: "account_name_return" },
        { name: "完成时间", key: "daily_inspection_limit" },
        { name: "抄送人", key: "account_name_copy" },
        { name: "整改要求", key: "rec_require", islong: true },
      ],
      dataInfoList3: [
        { name: "整改人", key: "account_name_rec" },
        { name: "整改时间", key: "rec_reply_time" },
        { name: "回复内容", key: "rec_reply", islong: true },
      ],
      dataInfoList4: [
        { name: "复检人", key: "account_name_return" },
        { name: "复检时间", key: "return_time" },
        { name: "回复内容", key: "return_reply" },
        {
          name: "复检结果",
          key: "daily_inspection_status",
          fun: (val) => {
            return ["", "", "", "", "", "", "复检通过", "复检不通过"][val];
          },
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
    // 打印
    doPrint() {
      this.$emit("doPrint");
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
