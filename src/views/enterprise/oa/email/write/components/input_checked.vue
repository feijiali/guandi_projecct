<!--
 * @Autor: 邓易
 * @Date: 2021-03-31 16:39:04
 * @LastEditors: 邓易
 * @LastEditTime: 2021-04-02 11:19:39
-->
<template>
  <div class="email_box">
    <el-input placeholder="或输入邮箱" v-model="modelText" @change="checkEmail">
      <span
        class="main cursor-m font-weight-bold cursor-p"
        slot="suffix"
        @click.stop="checkEmail"
        >添加</span
      >
    </el-input>
    <div class="pt-1 ml-1 mr-1 checked_box" v-if="PersonList.length > 0">
      <div
        class="person-box mr-05 mb-1 font-14"
        v-for="(item, index) in PersonList"
        :key="index + KeyStr"
      >
        <i
          @click="deletPerson(index)"
          class="iconfont btn-btn_detail_minus_02 font-20"
        ></i>
        <span>{{ item.account_name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
  },
  props: {
    modelValue: {
      required: true,
    },
    KeyStr: {
      type: String,
      required: true,
      default: "",
    },
    PersonList: {
      type: Array,
      required: true,
      default: () => [],
    },
    organizeName: {
      type: String,
      default: "",
    },
  },
  data() {
    return { modelText: "" };
  },
  mounted() {},
  methods: {
    deletPerson(index) {
      this.$emit("DeletPerson", this.KeyStr, index);
    },
    checkEmail() {
      this.$emit(
        "checkEmail",
        this.modelText,
        `${this.KeyStr}_list`,
        `${this.KeyStr}`
      );
    },
  },
};
</script>
<style scoped lang="scss">
.person-box {
  position: relative;
  display: inline-block;
  padding: 2px 30px 2px 10px;
  color: $color-1;
  margin-top: 0;
  margin-right: 10px;
  background: #eff1f5;
  border-radius: 20px;
  i {
    position: absolute;
    top: 2px;
    right: 5px;
    cursor: pointer;
    color: #8e95a7;
  }
}
.checked_box {
  border-top: solid 1px $color-3;
}
</style>
