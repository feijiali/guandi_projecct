<template>
  <div
    class="button-btn cursor-p"
    :class="{
      'blue-btn': colorBtn == 'blue',
      'pink-btn': colorBtn == 'pink',
      'white-btn': colorBtn == 'white',
      'grey-btn': colorBtn == 'grey',
      'green-btn': colorBtn == 'green',
      'orange-btn': colorBtn == 'orange',
      'purple-btn': colorBtn == 'purple',
    }"
    :style="{ width: width }"
    @click="buttonClick"
  >
    <slot name="button-slot"></slot>
    <span>{{ btnText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      default: "确认提交",
    },
    width: {
      type: String,
      default: "",
    },
    colorBtn: {
      type: String,
      default: "white",
    },
    // 节流的时间
    throttleTime: {
      type: Number,
      default: 1, // 1s
    },
  },
  data() {
    return {
      throttle: false,
    };
  },
  methods: {
    // 设置 1s
    buttonClick() {
      if (this.throttle) {
        return;
      }
      this.throttle = true;
      this.$emit("buttonClick");
      setTimeout(() => {
        this.throttle = false;
      }, this.throttleTime * 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.button-btn {
  display: inline-block;
  // min-width: 155px;
  text-align: center;
  font-size: 12px;
  padding: 0 30px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
.blue-btn,
.pink-btn,
.green-btn,
.purple-btn,
.orange-btn {
  background-color: $main;
  color: white;
  box-shadow: 5px 5px 20px $color-2;
  position: relative;
  z-index: 0;
  &::before {
    content: ""; /*单引号双引号都可以，但必须是英文*/
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.1); /*下划线颜色*/
    position: absolute;
    border-radius: 5px;
    opacity: 0;
    top: 0;
    left: 0;
    z-index: -10;
    transition: all 0.3s; /*css动画效果，0.8秒完成*/
  }
  &:hover {
    &::before {
      top: -6px;
      left: -5px;
      z-index: 1;
      opacity: 1;
    }
  }
}
.pink-btn {
  background-color: $pink2;
}
.green-btn {
  background-color: #18cc0e;
}
.purple-btn {
  background-color: #7636fc;
}
.orange-btn {
  background-color: #ff7b02;
}
.white-btn {
  background-color: white;
  color: $color-1;
  box-shadow: 5px 5px 20px $color-3;
  &:hover {
    background-color: $main;
    color: white;
    box-shadow: 5px 5px 20px $color-2;
  }
}
.grey-btn {
  background-color: $color-2;
  color: white;
  box-shadow: 5px 5px 20px $color-2;
  position: relative;
  &::before {
    content: ""; /*单引号双引号都可以，但必须是英文*/
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.1); /*下划线颜色*/
    position: absolute;
    border-radius: 5px;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.3s; /*css动画效果，0.8秒完成*/
  }
  &:hover {
    &::before {
      top: -6px;
      left: -5px;
      z-index: 1;
    }
  }
}
</style>
