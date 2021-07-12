<template>
  <div class="count-wrapper">
    <p class="font-20">{{ config.title }}</p>
    <el-form ref="ruleform" class="el-form-box">
      <div class="line-wrapper">
        <div class="form-item-wrapper">
          <el-form-item class="must" label="数量："> </el-form-item>
          <num-input
            :readonly="countDisable"
            :isInputChange="true"
            @emitInput="inputFun"
            class="w-100"
            v-model="data[config.countKey]"
            :fixedNum="2"
            placeholder="请输入数字"
          ></num-input>
        </div>
        <div class="form-item-wrapper">
          <el-form-item class="must" label="金额(元)："> </el-form-item>
          <num-input
            :readonly="monneyDisable"
            :isInputChange="true"
            @emitInput="inputFun"
            class="w-100"
            v-model="data[config.moneyKey]"
            :fixedNum="2"
            placeholder="请输入数字"
          ></num-input>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Count",
  props: {
    config: {
      type: Object,
      require: true,
    },
    data: Object,
    countDisable: { type: Boolean, default: false },
    monneyDisable: { type: Boolean, default: false },
  },
  methods: {
    inputFun(val) {
      this.$emit("inputChange", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.count-wrapper {
  .el-form-box {
    margin-top: 8px;
  }
  .line-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .form-item-wrapper {
      display: inline-flex;
      flex: 1;
      flex-direction: column;
      &:last-child {
        margin-left: 16px;
      }
    }
  }
}
</style>
