<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 09:16:45
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 11:00:53
-->
<template>
  <div class="w-100 position-relative px-1" style="height: 40px">
    <div class="h-100 d-flex align-items-center scroll_over">
      <template>
        <div
          class="person-box mr-05 font-14"
          v-for="(item, index) in PersonList"
          :key="index + KeyStr"
        >
          <i
            @click="deletPerson(index, item)"
            class="iconfont btn-btn_detail_minus_02 font-20"
          ></i>
          <span>{{ item.account_name }}</span>
        </div>
      </template>
    </div>
    <i
      @click="showTargerAddLayer()"
      class="iconfont btn-btn_detail_plus_01 add-btn position-absolute"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
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
    return {};
  },
  mounted() {},
  methods: {
    deletPerson(index, data) {
      this.$emit("DeletPerson", this.KeyStr, index, data);
    },
    showTargerAddLayer() {
      // this.$emit("showDalog", this.KeyStr);
      this.$emit("showDalog");
    },
  },
};
</script>

<style scoped lang="scss">
.scroll_over {
  white-space: nowrap;
  overflow: scroll;
  width: 94%;
}
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
.add-btn {
  color: white;
  background: $main;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 18px;
  cursor: pointer;
  right: 10px;
  top: 10px;
}
</style>
