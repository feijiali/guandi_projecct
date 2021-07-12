<template>
  <div>
    <div>
      <div
        class="float-left item-box"
        v-for="item in sliceList"
        :key="item.days"
      >
        <div v-if="!fage">
          <!-- <img
            v-if="item.ok"
            src="@/assets/images/icon_person_attence_green.png"
            alt=""
          />
          <img
            v-if="!item.ok"
            src="@/assets/images/icon_person_attence_red.png"
            alt=""
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { months } from "moment";
export default {
  name: "vTbody",
  props: {
    Daypage: {
      type: Number,
      default: 1
    },
    firstpagecount: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    fage: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sliceList: []
    };
  },
  watch: {
    Daypage: function() {
      this.changeDay();
    },
    list: {
      handler: function() {
        this.changeDay();
      },
      deep: true
    }
  },
  mounted() {
    this.changeDay();
  },
  methods: {
    changeDay() {
      let list = JSON.parse(JSON.stringify(this.list));
      if (this.Daypage == 1) {
        let start = 0;
        let end = this.firstpagecount;
        this.sliceList = list.splice(start, end);
      } else {
        let start = this.firstpagecount;
        this.sliceList = list.splice((this.Daypage - 1) * start, start);
      }
    },
    handleChange(val, i) {
      let list = JSON.parse(JSON.stringify(this.list));
      let ind = i + (this.Daypage - 1) * this.firstpagecount;
      list[ind].is_edit = !list[ind].is_edit;
      if (val == 1) {
        list[ind].ok = true;
      } else {
        list[ind].ok = false;
      }
      this.$emit("update:list", list);
    }
  }
};
</script>
<style lang="scss" scoped>
.item-box {
  width: 60px;
  text-align: center;
  img {
    width: 14px;
    height: 14px;
  }
}
</style>
