<template>
  <ul class="d-flex align-items-center justify-content-between h-100 day-check">
    <li class="page-btn h-100 d-flex-cen"></li>
    <li
      class="status-icon flex-fill d-flex-cen"
      v-for="(item, index) in attendList"
      :key="index + 'a'"
    >
      <!-- 2次打卡规则 -->
      <template v-if="item.attendance_info.length == 1">
        <img
          :src="attendStatusImg[item.attendance_info[0].attendance_in_state]"
          alt=""
          @click="
            handleClick(
              index,
              item.attendance_info[0].attendance_in_state,
              item
            )
          "
          :key="index + 'b'"
        />
        <img
          :src="attendStatusImg[item.attendance_info[0].attendance_out_state]"
          class="mt-1"
          alt=""
          @click="
            handleClick(
              index,
              item.attendance_info[0].attendance_out_state,
              item
            )
          "
          :key="index + 'c'"
        />
      </template>
      <!-- 4次打卡规则 -->
      <template v-if="item.attendance_info.length == 2">
        <img
          :src="attendStatusImg[item.attendance_info[0].attendance_in_state]"
          alt=""
          @click="
            handleClick(
              index,
              item.attendance_info[0].attendance_in_state,
              item
            )
          "
          :key="index + 'd'"
        />
        <img
          :src="attendStatusImg[item.attendance_info[0].attendance_out_state]"
          class="mt-1"
          alt=""
          @click="
            handleClick(
              index,
              item.attendance_info[0].attendance_out_state,
              item
            )
          "
          :key="index + 'e'"
        />
        <img
          :src="attendStatusImg[item.attendance_info[1].attendance_in_state]"
          class="mt-1"
          alt=""
          @click="
            handleClick(index, item.attendance_info[1].attendance_in_stat, item)
          "
          :key="index + 'f'"
        />
        <img
          :src="attendStatusImg[item.attendance_info[1].attendance_out_state]"
          class="mt-1"
          alt=""
          @click="
            handleClick(
              index,
              item.attendance_info[1].attendance_out_state,
              item
            )
          "
          :key="index + 'g'"
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
import global from "@/plugins/global_varible.js";
export default {
  name: "",
  props: {
    attendlist: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    firstpagecount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      fillBoxCount: 0,
      attendStatusImg: this.GLOBAL.attendStatusImg2,
      attendList: [],
    };
  },
  watch: {
    page: {
      immediate: true,
      handler() {
        this.handleListChange();
      },
    },
    attendlist() {
      this.handleListChange();
    },
  },
  methods: {
    handleListChange() {
      let day = new Date().getDate(),
        month = new Date().getMonth() + 1,
        month2 = new Date(this.attendlist[0].day_time).getMonth() + 1;
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
        var d = new Date(
          new Date(this.attendlist[0].day_time).getFullYear(),
          month2,
          0
        );
        start = this.firstpagecount;
        end = day;
        if (!flag) {
          end = this.attendlist.length;
        }
        this.attendList = this.attendlist.slice(start, end);
        this.fillBoxCount =
          d.getDate() - this.attendList.length - this.firstpagecount;
      }
    },
    handleClick(index, state, item) {
      if (state == 0) {
        this.$tip({
          isTip: true,
          message: "无该日出勤信息",
        });
        return;
      }
      this.$emit("icon-click", item);
    },
  },
};
</script>

<style scoped lang="scss">
.day-check {
  li {
    img {
      cursor: pointer;
    }
  }
  .page-btn {
    width: 40px;
    background-color: transparent !important;
  }
  .status-icon {
    flex-direction: column;
    img {
      width: 25px;
    }
  }
}
</style>
