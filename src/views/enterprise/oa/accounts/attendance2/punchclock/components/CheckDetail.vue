<template>
  <div>
    <nInfoTitle class="mb-2" title="人员信息" />
    <nInfoItem
      :lable_width="90"
      :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
      :data="{
        name: item.name,
        value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
        unit: item.unit,
      }"
      :islong="item.islong ? true : false"
      v-for="(item, index) in dataInfoList"
      :key="index + 'a'"
    />
    <nInfoTitle class="mb-2" title="全天考勤状态" />
    <template v-if="infoData.attendance_info.length == 2">
      <div
        class="
          position-relative
          check-info-wrapper
          d-flex
          justify-content-start
          align-items-center
          rounded-1
        "
        v-for="(item, index) of infoData.attendance_info"
        :key="index + 'b'"
      >
        <div class="position-absolute text-white pr-2 f-18 d-flex-cen time">
          <span class="w-100 text-center">{{ ["上", "下"][index] }}</span>
          <span class="w-100 text-center">{{
            infoData.attendance_info.length == 1 ? "班" : "午"
          }}</span>
        </div>
        <template v-for="(i, ind) in 2">
          <div class="h-100 w-100 info" :key="ind">
            <p class="letter-s-1 main position-relative layer-title-blue mb-1">
              {{ ["上班", "下班"][ind] }}
              <span></span>
            </p>
            <p class="detail-item w-50">
              <span class="detail-label">打卡状态</span>
              <span>：</span>
              <span class="detail-value">{{
                attendStatus[
                  item[["attendance_in_state", "attendance_out_state"][ind]]
                ]
              }}</span>
            </p>
            <p class="detail-item w-50">
              <span class="detail-label">打卡时间</span>
              <span>：</span>
              <span
                class="detail-value"
                v-if="item.attendance_in_time || item.attendance_out_time"
                >{{
                  item[["attendance_in_time", "attendance_out_time"][ind]]
                }}</span
              >
              <span class="detail-value" v-else>暂无</span>
            </p>
            <p class="detail-item detail-item-long">
              <span class="detail-label">打卡地点</span>
              <span>：</span>
              <span class="detail-value detail-value-long">{{
                item[["attendance_in_location", "attendance_out_location"][ind]]
                  ? item[
                      ["attendance_in_location", "attendance_out_location"][ind]
                    ]
                  : "暂无"
              }}</span>
            </p>
            <!-- <p class="detail-item">
            <span class="detail-label">备注</span>
            <span>：</span>
            <span class="detail-value">{{item.app_attend_bak?item.app_attend_bak:"暂无"}}</span>
          </p> -->
            <div class="detail-item d-flex justify-content-start check-photo">
              <span class="detail-label">图片</span>
              <span>：</span>
              <p
                class="flex-fill d-flex justify-content-start flex-wrap"
                v-if="item[['attendance_in_pic', 'attendance_out_pic'][ind]]"
              >
                <viewer
                  :images="item[['in_pic_list', 'out_pic_list'][ind]]"
                  class="lookPic"
                >
                  <img
                    class="layer-info-img"
                    :src="pic.url"
                    v-for="(pic, ides) of item[
                      ['in_pic_list', 'out_pic_list'][ind]
                    ]"
                    :key="ides + 'c'"
                  />
                </viewer>
              </p>
              <span class="detail-value" v-else>暂无</span>
            </div>
          </div>
        </template>
      </div>
    </template>

    <template v-if="infoData.attendance_info.length == 1">
      <div
        class="
          position-relative
          check-info-wrapper
          d-flex
          justify-content-start
          align-items-center
          rounded-1
        "
        v-for="(item, index) of 2"
        :key="index + 'b'"
      >
        <div class="position-absolute text-white pr-2 f-18 d-flex-cen time">
          <span class="w-100 text-center">{{ ["上", "下"][index] }}</span>
          <span class="w-100 text-center">班</span>
        </div>
        <div class="h-100 w-100 info">
          <p class="detail-item w-50">
            <span class="detail-label">打卡状态</span>
            <span>：</span>
            <span class="detail-value">{{
              attendStatus[
                infoData.attendance_info[0][
                  ["attendance_in_state", "attendance_out_state"][index]
                ]
              ]
            }}</span>
          </p>
          <p class="detail-item w-50">
            <span class="detail-label">打卡时间</span>
            <span>：</span>
            <span
              class="detail-value"
              v-if="
                infoData.attendance_info[0].attendance_in_time ||
                infoData.attendance_info[0].attendance_out_time
              "
              >{{
                infoData.attendance_info[0][
                  ["attendance_in_time", "attendance_out_time"][index]
                ]
              }}</span
            >
            <span class="detail-value" v-else>暂无</span>
          </p>
          <p class="detail-item detail-item-long">
            <span class="detail-label">打卡地点</span>
            <span>：</span>
            <span class="detail-value detail-value-long">{{
              infoData.attendance_info[0][
                ["attendance_in_location", "attendance_out_location"][index]
              ]
                ? infoData.attendance_info[0][
                    ["attendance_in_location", "attendance_out_location"][index]
                  ]
                : "暂无"
            }}</span>
          </p>
          <div class="detail-item d-flex justify-content-start check-photo">
            <span class="detail-label">图片</span>
            <span>：</span>
            <p
              class="flex-fill d-flex justify-content-start flexwrap"
              v-if="
                infoData.attendance_info[0][
                  ['attendance_in_pic', 'attendance_out_pic'][index]
                ]
              "
            >
              <viewer
                :images="
                  infoData.attendance_info[0][
                    ['in_pic_list', 'out_pic_list'][index]
                  ]
                "
                class="lookPic"
              >
                <img
                  class="layer-info-img"
                  :src="pic.url"
                  v-for="(pic, ides) of infoData.attendance_info[0][
                    ['in_pic_list', 'out_pic_list'][index]
                  ]"
                  :key="ides + 'c'"
                />
              </viewer>
            </p>
            <span class="detail-value" v-else>暂无</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "CheckDetail",
  props: {
    infoData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataInfoList: [
        {
          name: "人员姓名",
          key: "account_name",
        },
        {
          name: "部门",
          key: "organ",
        },
        {
          name: "联系方式",
          key: "account",
        },
        {
          name: "职务",
          key: "account_job",
        },
      ],
      attendStatus: [
        "未打卡",
        "已打卡",
        "请假",
        "迟到",
        "早退",
        "异常",
        "旷工",
      ],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.check-info-wrapper {
  // height: 340px;
  margin: 20px 0;
  .time {
    top: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 60px;
    flex-direction: column;
    flex-wrap: wrap;
    border-radius: 20px 0 0 20px;
    background: linear-gradient(to bottom, #67b6fd, #5a5efd);
  }
  .info {
    min-height: 200px;
    border-radius: 20px;
    padding: 20px;
    margin-left: 40px;
    background: $lightgrey;
    .check-photo {
      align-items: flex-start;
      img {
        height: 130px;
        width: 200px;
        // &:not(:first-child) {
        //   margin-left: 10px;
        // }
      }
    }
  }
}
</style>
