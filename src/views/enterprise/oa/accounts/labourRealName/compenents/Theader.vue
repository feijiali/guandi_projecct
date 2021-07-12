<template>
  <div>
    <div class="position-relative">
      <div v-if="this.page != 1" class="position-absolute left-btn mr-1">
        <!-- <img
          class="cursor-p"
          @click.stop="handlePageButtonClick(1)"
          src="@/assets/images/btn_personal_date_arrowleft_selected.png"
          alt=""
        /> -->
      </div>
      <div
        class="float-left item-box cursor-p"
        v-for="(item, i) in titleDays"
        :key="i + 'a'"
        :title="app.listDate[item - 1]"
      >
        {{ app.listDate[item - 1].split("-")[2] }}
      </div>
      <div v-if="show" class="position-absolute right-btn">
        <!-- <img
          class="cursor-p"
          @click.stop="handlePageButtonClick(2)"
          src="@/assets/images/btn_personal_date_arrowright_selected.png"
          alt=""
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['app'],
  name: "vTheader",
  props: {
    Daypage: {
      type: Number,
      default: 1
    },
    firstpagecount: {
      type: Number,
      required: true,
      default: 16
    }
  },
  data() {
    return {
      days: [],
      titleDays: [],
      page: 1
    };
  },
  mounted() {
    this.initDayList();
    this.changeDay();
  },
  watch: {
    'app.monthDays': {
      immediate:true,
      deep:true,
      handler:function () {
        this.initDayList();
        this.changeDay();
      }
    }
  },
  computed: {
    show() {
      return this.page * this.firstpagecount < this.app.monthDays;
    }
  },
  methods: {
    changeDay() {
      let days = JSON.parse(JSON.stringify(this.days));
      this.titleDays = [];
      if (this.page == 1) {
        let start = 0;
        let end = this.firstpagecount;
        this.titleDays = days.splice(start, end);
      } else {
        let start = this.firstpagecount;
        this.titleDays = days.splice((this.page - 1) * start, start);
      }
    },
    initDayList() {
      let days = this.app.monthDays;
      this.days = [];
      for (var i = 0; i < days; i++) {
        this.days.push(i + 1);
      }
    },
    handlePageButtonClick(type) {
      this.page = type;
      this.changeDay();
      if (type == 1) {
        this.$emit("update:Daypage", 1);
      } else {
        if (this.Daypage * this.firstpagecount < this.app.monthDays) {
          this.$emit("update:Daypage", this.Daypage + 1);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.item-box {
  width: 60px;
  text-align: center;
}
.left-btn {
  z-index: 9999;
  left: -10px;
}
.right-btn {
  z-index: 9999;
  right: 20px;
}
</style>
