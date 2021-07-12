<template>
  <ul
    class="d-flex  align-items-center justify-content-between h-100 day-check"
  >
    <li
      class="page-btn h-100 d-flex  align-items-center justify-content-center"
    ></li>
    <li
      class="status-icon flex-fill d-flex  align-items-center justify-content-center"
      v-for="(item, index) in attendList"
      :key="index + 'a'"
    >
      <template v-if="item.leave_morning_status == 2 && item.leave_afternoon_status == 2"
      >
        <img
          src="@/assets/images/icon_oa_attendance_fourth.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="item.leave_morning_status == 2 && item.leave_afternoon_status == 1"
      >
        <img
          src="@/assets/images/icon_oa_attendance_second.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="item.leave_morning_status == 1 && item.leave_afternoon_status == 2"
      >
        <img
          src="@/assets/images/icon_oa_attendance_first.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="item.leave_morning_status == 1 && item.leave_afternoon_status == 1"
      >
        <img
          src="@/assets/images/icon_oa_attendance_third.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="(item.leave_morning_status == 1) || item.leave_afternoon_status == 0"
      >
        <img
          src="@/assets/images/icon_oa_attendance_first.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="(item.leave_morning_status == 2) || item.leave_afternoon_status == 0"
      >
        <img
          src="@/assets/images/icon_oa_attendance_fourth.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="(item.leave_morning_status == 0) || item.leave_afternoon_status == 1"
      >
        <img
          src="@/assets/images/icon_oa_attendance_second.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
      <template v-else-if="(item.leave_morning_status == 0) || item.leave_afternoon_status == 2"
      >
        <img
          src="@/assets/images/icon_oa_attendance_fourth.png"
          alt=""
          @click="handleClick(index, item.leave_morning_status, item)"
          :key="index + 'b'"
        />
      </template>
    </li>
    <li
      class="no-data status-icon flex-fill d-flex-cen"
      v-for="(item, index) of fillBoxCount"
      :key="index + 'h'"
    ></li>
    <li class="page-btn h-100 d-flex-cen"></li>
  </ul>
</template>

<script>
export default {
  name: "",
  props: {
    attendlist: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    firstpagecount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      fillBoxCount: 0,
      attendList: [] //出勤数组  0:未出勤1:出勤2:请假
    };
  },
  watch: {
    page: {
      immediate: true,
      handler() {
        this.handleListChange();
      }
    },
    attendlist() {
      this.handleListChange();
    }
  },
  methods: {
    handleListChange() {
      let day = new Date().getDate(),
        month = new Date().getMonth() + 1,
        month2 = this.attendlist[0]?new Date(this.attendlist[0].leave_date).getMonth() + 1:month;
      let flag = month == month2;
      let start = 0,
        end = 0;
      if (this.page == 1) {
        start = 0;
        end = this.firstpagecount < day ? this.firstpagecount : day;
        if (!flag) {
          end = this.firstpagecount;
        }
        this.attendList = this.attendlist.slice(start, end);
        this.fillBoxCount = this.firstpagecount - this.attendList.length;
      } else {
        var d = new Date(new Date(this.attendlist[0]?this.attendlist[0].leave_date:day).getFullYear(),month2,0);
        start = this.firstpagecount;
        end = day;
        if (!flag) {
          end = this.attendlist.length;
        }
        this.attendList = this.attendlist.slice(start, end);
        this.fillBoxCount =d.getDate() - this.attendList.length - this.firstpagecount;
      }
    },
    handleClick(index, state, item) {
      if (state == 0) {
        this.$tip({
          isTip: true,
          message: "无该日出勤信息"
        });
        return;
      }
      this.$emit("icon-click", item);
    }
  }
};
</script>

<style scoped lang="scss">
.day-check {
  .page-btn {
    width: 40px;
  }
  .status-icon {
    flex-direction: column;
    img {
      width: 25px;
    }
  }
}
</style>
