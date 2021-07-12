<template>
  <ul class="d-flex justify-content-start align-items-center h-100 day-check">
    <li class="page-btn h-100 d-flex-cen" v-if="page == 1">
      <img
        src="@/assets/images/btn_personal_date_arrowleft_normal.png"
        class="arrow"
      />
    </li>
    <li
      class="page-btn h-100 d-flex-cen"
      v-else
      @click="handlePageButtonClick(1)"
    >
      <img
        src="@/assets/images/btn_personal_date_arrowleft_selected.png"
        class="arrow"
      />
    </li>
    <li class="flex-fill" v-for="(item, index) in titleDays" :key="index">
      {{ item }}
    </li>
    <li class="page-btn h-100 d-flex-cen" v-if="page == 2">
      <img
        src="@/assets/images/btn_personal_date_arrowright_normal.png"
        class="arrow"
      />
    </li>
    <li
      class="d-flex-cen h-100 page-btn"
      v-else
      @click="handlePageButtonClick(2)"
    >
      <img
        src="@/assets/images/btn_personal_date_arrowright_selected.png"
        class="arrow"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "CheckListTableTitle",
  props: {
    firstpagecount: {
      type: Number,
      required: true,
      default: 16
    },
    pagemonth: {
      type: String
    }
  },
  data() {
    return {
      days: [],
      page: 1
    };
  },
  computed: {
    titleDays() {
      if (this.page == 1) {
        let start = 0;
        let end = this.firstpagecount;
        return this.days.slice(start, end);
      } else {
        let start = this.firstpagecount;
        return this.days.slice(start);
      }
    }
  },
  mounted() {
    this.initDayList();
  },
  watch: {
    pagemonth: {
      handler: function(val,oldval) {
        this.initDayList(val);
      },
      deep:true
    }
  },
  methods: {
    initDayList(date) {
      this.days = []
      let days = this.$utils.getDayNum(date);
      for (var i = 0; i < days; i++) {
        this.days.push(i + 1);
      }
    },
    handlePageButtonClick(type) {
      this.page = type;
      this.$emit("page-change", type);
    }
  }
};
</script>

<style scoped lang="scss">
.day-check {
  .page-btn {
    width: 40px;
    background-color: transparent !important;
  }
}
</style>
