<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="statistical-box w-100 d-flex z-index-2 position-relative">
      <div
        v-for="(item, index) in itemArr"
        :key="index"
        class="statistical-box-item cursor-p flex-fill position-relative"
        :style="{ backgroundImage: 'url(' + item.icon + ')' }"
      >
        <div
          @click="linkTo(item.linkName, item.query)"
          class="position-absolute"
          style="left: 0; right: 0; bottom: 40px; top: 0"
        >
          <div class="position-absolute statistical-box-content-box">
            <p class="statistical-box-content-title">{{ item.name }}</p>
            <p class="number-box text-overflow-ellipsis pt-1">
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-if="index == 0"
                >{{ todoList.length }}</span
              >
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-else-if="index == 1"
                >{{ applyList.length }}</span
              >
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-else-if="index == 2"
                >{{ doneList.length }}</span
              >
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-else-if="index == 3"
                >{{ readList.length }}</span
              >
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-else-if="index == 4"
                :title="receiveTotal + '封'"
                >{{ receiveTotal }}</span
              >
              <span
                class="font-32 font-weight-bold langdon-font mr-1"
                v-else-if="index == 5"
                :title="attendTotal + '天'"
                >{{ attendTotal }}</span
              >{{ index == 4 ? "封" : index == 5 ? "天" : "条" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        d-flex
        w-100
        position-relative
        z-index-1
        justify-content-between
        flex-fill
        mb-1
      "
      style="margin-top: -2%"
    >
      <div
        class="
          d-flex
          width-calc
          h-100
          flex-column
          justify-content-between
          cursor-p
        "
      >
        <div
          class="height-calc bg-white w-100 rounded-1 d-flex padding-standard"
          @click="linkTos('enterprise_oa_workbench_weekPlan')"
        >
          <div class="d-flex flex-column h-100">
            <div class="w-100">
              <p class="font-20 font-weight-bold letter-s-1">本周工作目标</p>
              <p class="text-secondary-2 mt-05 letter-s-1">
                OBJECTIVES OF THE WEEK
              </p>
            </div>
            <div style="height: calc(100% - 70px)" class="w-100 pt-1">
              <n-scroll>
                <div v-if="info.length">
                  <p class="font-weight-bold text-hover-primary text-left">
                    工作内容
                  </p>
                  <p
                    class="text-left"
                    v-html="
                      $utils.dataFormatter(info[0].plan_week_cur_work_info)
                    "
                  ></p>
                </div>
                <div v-else class="pink2">本周暂未上报计划</div>
              </n-scroll>
            </div>
          </div>
        </div>
        <div class="height-calc bg-white w-100 rounded-1 padding-standard">
          <div class="bg-white w-100 rounded-1">
            <div class="d-flex justify-content-between w-100">
              <div class="w-100">
                <p class="font-20 font-weight-bold letter-s-1">申请发起</p>
                <p class="text-secondary-2 mt-05 letter-s-1">
                  APPLICATION INITIATION
                </p>
              </div>
              <span
                class="more-btn"
                @click="$router.linkTo('enterprise_oa_workbench_applyList')"
                >更多 <i class="el-icon-arrow-right"></i
              ></span>
            </div>
          </div>
          <div class="" style="height: calc(100% - 50px)">
            <n-scroll>
              <div class="d-flex flex-wrap pt-2">
                <template v-for="(item, index) in 10">
                  <div
                    :key="index"
                    v-permission="[GLOBAL.applyArr[index].permission]"
                    class="text-center apply-item mb-2 cursor-p"
                    @click="
                      linkTo(GLOBAL.applyArr[index].linkName, {
                        t: GLOBAL.applyArr[index].type,
                        auth: GLOBAL.applyArr[index].permission,
                      })
                    "
                  >
                    <div
                      class="oa-home-apply-item"
                      :style="{
                        backgroundImage:
                          'url(' + GLOBAL.applyArr[index].src + ')',
                      }"
                    ></div>
                    <p class="text-secondary">
                      {{ GLOBAL.applyArr[index].name }}
                    </p>
                  </div>
                </template>
              </div>
            </n-scroll>
          </div>
        </div>
      </div>
      <div class="d-flex h-100 width-calc flex-column justify-content-between">
        <!-- 项目管家---公司制度 -->
        <!-- <div
          class="bigBox bg-white w-100 rounded-1 cursor-p"
          style="height: 57%"
          @click="linkToSystem('enterprise_oa_release_companySystem')"
        >
          <div class="border-bottom pt-1 pl-2 pb-1 d-flex align-items-center">
            <span class="column-line"></span>
            <span class="font-14 font-weight-bold ml-1">公司制度</span>
          </div>
          <div style="height: calc(100% - 45px)" class="w-100 p-2">
            <n-scroll>
              <div
                v-for="(item, index) in systemReleaseList"
                :key="index"
                class="w-100 d-flex justify-content-between pb-1"
              >
                <p
                  class="ml-05 text-overflow-ellipsis flex-fill pr-5"
                  @click.stop="reviseInfo(item)"
                >
                  {{ item.system_release }}
                </p>
                <p
                  class="ml-05 text-secondary d-flex justify-content-between"
                  style="width: 300px"
                >
                  <span class="w-50 text-left text-overflow-ellipsis"
                    >发布人：{{ item.account_name }}</span
                  ><span class="text-left ml-3">{{
                    item.system_release_time
                  }}</span>
                </p>
              </div>
            </n-scroll>
          </div>
        </div> -->

        <!-- 冠迪 -->
        <div
          class="height-calc bg-white w-100 rounded-1 cursor-p padding-standard"
        >
          <div @click.stop="linkToSystem()" class="w-100">
            <p class="font-20 font-weight-bold letter-s-1">通知公告</p>
            <p class="text-secondary-2 mt-05 letter-s-1">ANNOUNCEMENT</p>
          </div>
          <div style="height: calc(100% - 45px)" class="w-100 py-2">
            <n-scroll>
              <div
                @click.stop="linkToSystem(item)"
                v-for="(item, index) in systemReleaseList"
                :key="index"
                class="w-100 d-flex justify-content-between pb-1"
              >
                <p class="text-overflow-ellipsis flex-fill pr-5">
                  【{{ item.oa_public_type }}】<span class="ml-2">{{
                    item.oa_public_title
                  }}</span>
                </p>
                <p
                  class="ml-05 text-secondary d-flex justify-content-between"
                  style="width: 300px"
                >
                  <span class="w-50 text-left text-overflow-ellipsis"
                    >发布人：{{ item.account_name }}</span
                  ><span class="text-left ml-3">{{
                    (item.oa_public_time + "").slice(0, 4) +
                    "-" +
                    (item.oa_public_time + "").slice(4, 6) +
                    "-" +
                    (item.oa_public_time + "").slice(6)
                  }}</span>
                </p>
              </div>
            </n-scroll>
          </div>
        </div>
        <div class="height-calc w-100 d-flex justify-content-between">
          <div class="bg-white rounded-1 width-calc padding-standard">
            <div class="bg-white w-100 rounded-1">
              <div class="d-flex justify-content-between w-100">
                <div class="w-100">
                  <p class="font-20 font-weight-bold letter-s-1">发票共享</p>
                  <p class="text-secondary-2 mt-05 letter-s-1">
                    SHARED INVOICE
                  </p>
                </div>
                <span
                  class="more-btn cursor-p"
                  @click="$router.linkTo('enterprise_oa_invoice_total')"
                  >更多 <i class="el-icon-arrow-right"></i
                ></span>
              </div>
            </div>

            <div style="height: calc(100% - 128px)">
              <div class="d-flex justify-content-between">
                <div class="w-50">
                  <div
                    v-for="(item, index) in statisticsArr1"
                    :key="index"
                    class="mt-2"
                  >
                    <span class="font-14">{{ item.name }}</span>
                    <span class="mt-05">
                      <div class="d-inline-block">
                        <span
                          class="langdon-font text-hover-primary font-40 ml-1"
                          >{{ totalCounts[item.key] || 0 }}</span
                        >
                        <span class="font-14 font-weight-normal ml-1">{{
                          item.unit
                        }}</span>
                      </div>
                    </span>
                  </div>
                </div>
                <div class="w-50">
                  <div
                    v-for="(item, index) in statisticsArr2"
                    :key="index"
                    class="mt-2"
                  >
                    <span class="font-14">{{ item.name }}</span>
                    <span class="mt-05">
                      <span
                        class="
                          font-weight-bold font-40
                          langdon-font
                          ml-1
                          langdon-font
                        "
                        >{{ totalCounts[item.key] || 0 }}</span
                      ><span class="ml-1 font-weight-bold">{{
                        item.unit
                      }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              rounded-1
              bg-white
              position-relative
              d-flex
              justify-content-between
              width-calc
              padding-standard
            "
          >
            <img
              src="@/assets/images/guandi/bg_oa_home_07.png"
              class="position-absolute"
              style="bottom: 0; right: 0; height: 250px"
            />
            <div class="w-100 rounded-1">
              <div class="d-flex justify-content-between w-100">
                <div class="w-100">
                  <p class="font-20 font-weight-bold letter-s-1">我的考核</p>
                  <p class="text-secondary-2 mt-05 letter-s-1">MY ASSESSMENT</p>
                </div>
              </div>
              <div
                v-for="(item, index) in statisticsArr3"
                :key="index"
                class="mt-2"
              >
                <span class="font-14">{{ item.name }}</span>
                <span class="mt-05">
                  <span
                    class="
                      font-weight-bold font-40
                      langdon-font
                      ml-1
                      langdon-font
                    "
                    >{{ totalCounts[item.key] || 0 }}</span
                  ><span class="ml-1 font-weight-bold">{{ item.unit }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  data() {
    return {
      readList: [], //我的待阅
      applyList: [], //我的申请
      todoList: [], //我的待办
      doneList: [], //我的已办
      attendanceList: [], //我的考勤
      systemReleaseList: [], //通知公告
      attendTotal: 0, //我的考勤统计
      receiveTotal: 0, //我的收件箱
      totalCounts: {}, //发票共享统计
      itemArr: [
        {
          name: "我的待办",
          linkName: "enterprise_oa_workbench_commission",
          query: { t: 1 },
          icon: require("@/assets/images/guandi/bg_oa_home_01.png"),
        },
        {
          name: "我的申请",
          linkName: "enterprise_oa_workbench_commission",
          query: { t: 4 },
          icon: require("@/assets/images/guandi/bg_oa_home_02.png"),
        },
        {
          name: "我的已办",
          linkName: "enterprise_oa_workbench_commission",
          query: { t: 2 },
          icon: require("@/assets/images/guandi/bg_oa_home_03.png"),
        },
        {
          name: "我的待阅",
          linkName: "enterprise_oa_workbench_commission",
          query: { t: 3 },
          icon: require("@/assets/images/guandi/bg_oa_home_04.png"),
        },
        {
          name: "我的邮件",
          linkName: "enterprise_oa_email_inbox",
          query: { t: 4 },
          icon: require("@/assets/images/guandi/bg_oa_home_05.png"),
        },
        {
          name: "我的考勤",
          linkName: "enterprise_oa_accounts_attendance2_outattendance",
          query: { t: 5 },
          icon: require("@/assets/images/guandi/bg_oa_home_06.png"),
        },
      ],
      statisticsArr1: [
        { name: "发票总张数", key: "share_num", unit: "张" },
        { name: "发票总次数", key: "share_time", unit: "次" },
      ],
      statisticsArr2: [
        { name: "发票总金额", key: "share_amount", unit: "元" },
        { name: "发票总积分", key: "share_points", unit: "分" },
      ],
      statisticsArr3: [
        { name: "部门排名", key: "share_num", unit: "名" },
        { name: "全部排名", key: "share_time", unit: "名" },
        { name: "考核分数", key: "share_time", unit: "名" },
      ],
      dataList: {
        data: [20, 40],
        color: ["#67b6fd", "#5a5efd", "#FF4843", "#FF8B50"],
        showValue: "20%",
      },
      monDayTime: "", //本周一
      sunDayTime: "", //本周日
      info: [], //本周计划详情
      editId: 0,
      infoData: {},
    };
  },
  created() {
    //获取本周一和本周日
    this.obtainTime();
    // 查询周计划
    this.QueryOAPlanWeek();
    // 查询通知公告
    this.queryOaOaPublicList();
    // 查询考勤统计
    // this.queryOAStaffAttend();
    // 查询考勤表-某月
    this.queryStaffPunchAttendanceMonth();
    // 查询发票共享统计
    this.queryOAInvoiceShareSummary();
    // 查询我的邮件统计
    this.QueryOaEmailStat();
    // 查询审批信息
    this.queryApproveReviseInfo(
      {
        revise_account_review_account_ids: String(
          this.$store.getters.account_id
        ),
        revise_info_state: 2,
      },
      1
    ); // 我的待办
    this.queryApproveReviseInfo(
      {
        revise_account_reviewed_account_ids: String(
          this.$store.getters.account_id
        ),
      },
      2
    ); // 我的已办
    this.queryApproveReviseInfo(
      {
        revise_account_read_account_ids: String(this.$store.getters.account_id),
      },
      3
    ); // 我的待阅
    this.queryApproveReviseInfo(
      {
        revise_info_sub_account_id_union: Number(
          this.$store.getters.account_id
        ),
      },
      4
    ); // 我的申请
  },
  methods: {
    async QueryOaEmailStat() {
      let { result } = await api.QueryOaEmailStat({});
      this.receiveTotal = result[0].receive_count;
    },
    async queryApproveReviseInfo(data, t) {
      let res = await api.queryApproveReviseInfo({
        ...data,
      });
      this[["", "todoList", "doneList", "readList", "applyList"][t]] =
        res.result;
    },
    async linkTo(name, query) {
      if (name == "enterprise_oa_account_attendance") {
        //跳转我的考勤
        if (!hasPermissionArr(["StaffPunchAttendance"])) {
          this.$tip({
            isTip: true,
            message: "抱歉，您没有权限！",
          });
          return;
        }
      }
      // 以下判断是项目管家里面点击跳转到新增模块时候的权限判断，冠迪是直接跳转到列表页，所以不需要判断
      // if (name2) {
      //   //新增申请-判断权限
      //   if (!hasPermissionArr([name2 + "-upload"])) {
      //     this.$tip({
      //       isTip: true,
      //       message: "抱歉，您没有权限！",
      //     });
      //     return;
      //   }
      // }
      this.$router.linkTo(name, query ? query : null);
    },
    // 跳转通知公告
    linkToSystem(item) {
      if (!hasPermissionArr(["OaPublic"])) {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限！",
        });
        return;
      }
      this.$router.linkTo(
        "enterprise_oa_announcementDetails",
        item
          ? {
              id: item.oa_public_id,
            }
          : {}
      );
    },
    // 查看周计划
    linkTos(name) {
      if (!hasPermissionArr(["OAPlanWeek"])) {
        this.$tip({
          isTip: true,
          message: "抱歉，您没有权限！",
        });
        return;
      }
      this.$router.linkTo(name);
    },
    //查询本周计划
    async QueryOAPlanWeek() {
      let res = await api.QueryOAPlanWeek({
        plan_week_monday_date: Number(
          this.$utils.parseDate2Str(new Date(this.monDayTime), "YYYYMMDD")
        ),
        plan_week_sunday_date: Number(
          this.$utils.parseDate2Str(new Date(this.sunDayTime), "YYYYMMDD")
        ),
        plan_week_account_id_union: Number(this.$store.getters.account_id),
      });
      this.info = res.result;
    },
    //查询通知公告
    async queryOaOaPublicList() {
      if (!hasPermissionArr(["OaPublic"])) {
        return;
      }
      let res = await api.queryOaOaPublicList({
        // organ_node: this.$organ_id_en_or_pro(this),
        oa_public_hide: 1,
      });
      this.systemReleaseList = res.result;
    },
    // 查询考勤统计 -项目管家
    async queryOAStaffAttend() {
      let res = await api.queryOAStaffAttend({
        account_id: Number(this.$store.getters.account_id),
        // leave_date: this.$utils.parseDate2Str(new Date(), "YYYY-MM")
      });
      this.attendTotal =
        res.result[0] && res.result[0].attend_days
          ? Number(res.result[0].attend_days).toFixed(1)
          : 0;
    },
    // 查询考勤表-某月(冠迪)
    async queryStaffPunchAttendanceMonth() {
      let res = await api.queryStaffPunchAttendanceMonth({
        account_id: Number(this.$store.getters.account_id),
        query_month: this.$utils.getCurrentTime("", "", "month"),
      });
      this.attendTotal =
        res.result[0] && res.result[0].total_attendance_day
          ? Number(res.result[0].total_attendance_day).toFixed(1)
          : 0;
    },
    async queryOAInvoiceShareSummary() {
      let res = await api.queryOAInvoiceShareSummary({
        query_type: 1,
        organ_node: this.$organ_id_en_or_pro(this),
        invoice_share_provider: Number(this.$store.getters.account_id),
        revise_info_state: 3,
      });
      this.totalCounts = res.result[0] ? res.result[0] : {};
    },
    // 查询发票共享统计

    //获取本周一和本周日
    obtainTime() {
      let nowData = new Date();
      //获取今天的是周几
      let currentDay = nowData.getDay();
      //把currentDay == 0赋值给周日
      if (currentDay == 0) {
        currentDay = 7;
      }
      // 获取周一的时间
      this.monDayTime =
        nowData.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000;
      // 获取周日的时间
      this.sunDayTime =
        nowData.getTime() + (7 - currentDay) * 24 * 60 * 60 * 1000;
    },
  },
};
</script>

<style lang="scss" scoped>
.statistical-box {
  // height: 222px;
  div.statistical-box-item {
    position: relative;
    padding: 6% 0px;
    // width: 250px;
    border-radius: 10px;
    // padding: 15px;
    color: white;
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    background-size: 100% 100%;
    .number-box {
      width: 140px;
    }
    .statistical-box-content-box {
      width: 65%;
      position: absolute;
      right: 4px;
      top: 10%;
      .statistical-box-content-title {
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
      }
    }
  }
}
.right-image {
  background-image: url("../../../../assets/images/guandi/bg_oa_home_07.png");
  background-position: bottom;
  background-repeat: no-repeat;
}
.padding-standard {
  padding: 24px 16px;
}
.width-calc {
  width: calc((100% - 8px) / 2);
}
.height-calc {
  height: calc((100% - 8px) / 2);
}
.serial-number-span {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: white;
  font-size: 12px;
  border-radius: 3px;
  background-color: $main;
}
.apply-item {
  width: 20%;
  text-align: center;
  .oa-home-apply-item {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background-size: 100% 100%;
    img {
      width: 100%;
    }
  }
}
.more-btn {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid #cbd0dc;
  color: $color-1;
}
</style>
