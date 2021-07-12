<template>
  <div
   @click="buttonClick"
    class="status-button-btn"
    :class="[changeColor=='#D6DAE4'?'cursor-not':'cursor-p']"
    :style="changeStyle"
    @mouseenter="changeColor!='#D6DAE4'&&itemHover"
    @mouseleave="changeColor!='#D6DAE4'&&removeHover"
  >
    <slot name="button-slot"></slot>
    <span>{{ btnText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    changeColor: {
      type: String,
      default() {
        return "#dc5d48";
      }
    },
    btnText: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isHover: false
    };
  },
  computed: {
    //计算属性改变颜色核心
    //过程：如果按钮被点击了，则为用户传入的颜色，否则在判断鼠标是否移入改变了isHover，移入则变色，否则为默认值
    changeStyle() {
      return {
        color: !this.isHover ? this.changeColor : "#fff",
        borderColor: !this.isHover ? this.changeColor : this.changeColor,
        backgroundColor:!this.isHover ? 'transparent' : this.changeColor,
      };
    }
  },
  methods: {
    buttonClick() {
      this.$emit("buttonClick");
    },
    // 鼠标移入
    itemHover() {
      this.isHover = true;
    },
    // 鼠标移出
    removeHover() {
      this.isHover = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.status-button-btn {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 0 20px;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
}
</style>