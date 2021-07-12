<template>
  <div
    class="distcell header-message cursor-p"
    @click="$router.linkTo('enterprise_enternews')"
  >
    <el-badge :is-dot="true" :hidden="$store.getters.isNoRead">
      <i
        size="small"
        type="primary"
        class="iconfont btn-icon_topbar_msg font-24 text-hover-primary d-inline-block"
      ></i>
    </el-badge>
  </div>
</template>

<script>
import { Badge } from "element-ui";

export default {
  components: {
    ElBadge: Badge
  },
  mounted() {
    // 查询个人消息
    this.queryMessageMsg();
  },
  methods: {
    queryMessageMsg() {
      this.$store.dispatch(
        "app/set_read",
        Number(this.$store.getters.account_id)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.header-message {
  width: 90px;
  .iconfont {
    font-size: 18px !important;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    line-height: 25px;
  text-align:  center;
    background-color: rgba(51, 119, 255, 0.2);
  }
}
</style>