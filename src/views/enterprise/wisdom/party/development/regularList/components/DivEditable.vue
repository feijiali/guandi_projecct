<template>
  <p
    class="div-editable"
    contenteditable="true"
    v-html="innerText"
    @input="changeText"
    @focus="isChange = false"
    @blur="blurFunc"
  ></p>
</template>

<script>
export default {
  name: "DivEditable",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      innerText: this.value,
      isChange: true,
    };
  },
  watch: {
    value() {
      if (this.isChange) {
        this.innerText = this.value;
      }
    },
  },
  methods: {
    changeText() {
      this.$emit("input", this.$el.innerHTML);
    },
    blurFunc() {
      this.isChange = true;
      this.$emit("blurFunc");
    },
  },
};
</script>

<style lang="scss">
.div-editable {
  padding: 0 8px;
  display: inline-block;
  min-width: 40px;
  height: 25px;
  outline: none;
  border-bottom: 0.5px solid black;
  color: $color-2;
  text-align: left;
}
</style>