<template>
  <div class="nav-bar d-flex mb-1">
    <p class="nav-item d-flex align-items-center">
      <i
        @click="backFun"
        class="iconfont btn-btn_arrow_left text-white font-24 back_icon d-inline-block cursor-p"
      ></i>
    </p>
    <div class="d-flex fd" style="width: calc(100% - 60px)">
      <div
        :class="{
          border_left: i == 0,
          border_right: i == 3,
          bg_primary: name == item.name,
        }"
        class="box w-100 justify-content-between align-items-center d-flex position-relative bg-white"
        v-for="(item, i) in stepsData"
        :key="i"
      >
        <div
          class="d-flex"
          :class="{
            'border-box': i != 3,
            'checked-box': name == item.name && i != 3,
          }"
        >
          <div
            class="yuan text-center font-weight-bold no-checked"
            :class="{ checked: name == item.name }"
          >
            {{ i + 1 }}
          </div>
          <div
            class="font-14 ml-1"
            :class="{ 'text-white': name == item.name }"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepsData: {
      type: Array,
    },
    selfControl: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    $route() {
      this.name = this.$route.name;
    },
  },
  created() {
    this.name = this.$route.name;
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    backFun() {
      // 有时可能不是跳转上一个路由，需要监听点击事件实现自定义操作
      if (this.selfControl) {
        this.$emit("back");
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nav-item {
  padding: 10px 15px;
  font-size: 16px;
  color: #5a5efd;
  font-weight: 700;
}
.back_icon {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 100%;
  background: $linear-c;
}
.box {
  height: 50px;
  padding-left: 100px;
  .yuan {
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
    border-radius: 20px;
  }
  .checked {
    background-color: white !important;
    color: $main !important;
  }
  .no-checked {
    background-color: #e7eaf1;
    color: $color-2;
  }
  .border-box::before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 100%;
    z-index: 9;
    top: 0px;
    border-top: solid 25px transparent;
    border-left: solid 25px $color-2; /* 黑色大三角形 */
    border-bottom: solid 25px transparent;
  }
  .border-box::after {
    content: "";
    z-index: 9;
    width: 0;
    height: 0;
    position: absolute;
    left: 100%;
    top: 1px;
    border-top: solid 24px transparent;
    border-left: solid 24px white; /* 白色小三角形 */
    border-bottom: solid 24px transparent;
  }
  .checked-box::after {
    z-index: 9;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 100%;
    top: 0px;
    border-top: solid 25px transparent;
    border-left: solid 25px $main; /* 白色小三角形 */
    border-bottom: solid 25px transparent;
  }
}
.border_left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.bg_primary {
  background: $main !important;
}
.border_right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
