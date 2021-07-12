<!--
 * @Autor: 邓易
 * @Date: 2020-10-29 15:17:00
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 17:34:20
-->
<template>
  <el-input
    :style="{ width: width }"
    :readonly="readonly"
    class="input-m"
    v-model="inputValue"
    :placeholder="placeholder"
    @blur="changeInput"
    @input="limitInput"
    :disabled="disabled"
  >
    <template slot="append" v-if="unit">{{ unit }}</template>
  </el-input>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    unit: {
      type: String,
      default: "",
    },
    isString: {
      type: Boolean,
      default: false,
    },
    allowNeg: {
      type: Boolean,
      default: false,
    },
    fixedNum: {
      type: Number,
      default: 2,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 220,
    },
    maxNum: {
      type: Number,
      default: null,
    },
    //是否需要负数符号
    negative: {
      type: Boolean,
      default: false,
    },
    isInputChange: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "modelValue",
    event: "emitInput",
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.limitInput(String(newVal));
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    limitInput(val) {
      if (val > this.maxNum && this.maxNum > 0) {
        this.inputValue = this.maxNum;
        return;
      }
      let t = val.charAt(0);
      this.negative
        ? (val = val.replace(/[^\d.-]/g, ""))
        : (val = val.replace(/[^\d.]/g, ""));
      val = val.replace(/^\./g, ""); //验证第一个字符是数字
      val = val.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
      val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      let rule = new RegExp(
        "^(\\-)*(\\d+)\\.(\\d{0," + this.fixedNum + "}).*$"
      );
      val = val.replace(rule, "$1$2.$3"); //只能输入两个小数
      // val = val.replace(/^(\-)*(\d+)\.(\d{0,2}).*$/, "$1$2.$3"); //只能输入两个小数
      if (t == "-" && this.allowNeg) {
        val = "-" + val;
      }
      this.inputValue = val;
      if (this.isInputChange) {
        let val = this.isString
          ? Number(this.inputValue).toFixed(2)
          : Number(this.inputValue);
        // Number(val) && this.$emit("emitInput", this.inputValue);
        this.$emit("emitInput", this.inputValue);
      }
    },
    changeInput() {
      if (this.inputValue) {
        let val = this.isString
          ? Number(this.inputValue).toFixed(2)
          : Number(this.inputValue);
        // if (!this.isInputChange) {
        this.$emit("emitInput", val);
        this.$emit("change", val);
        // }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-box {
  display: inline-block;
  ::v-deep .el-input {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    border: 1px solid $color-3 !important;
  }
  ::v-deep .el-input-group__prepend {
    position: relative !important;
    right: 0;
    top: 0;
    border: 1px solid $color-3 !important;
    padding: 0 10px !important;
    background-color: $greybg !important;
  }
  .el-input-group--prepend {
    ::v-deep .el-input__inner {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  ::v-deep .el-input-group__append {
    position: relative !important;
    right: 0;
    top: 0;
    border: 1px solid $color-3 !important;
    border-left: none !important;
    padding: 0 10px !important;
    background-color: $greybg !important;
  }
  .el-input-group--append {
    ::v-deep .el-input__inner {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}
</style>
