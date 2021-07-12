<template>
  <ul class="sub-nav-ul">
    <router-link
      tag="li"
      v-for="(item, index) of navsArr"
      @click="handelSwitchChange(index)"
      :key="index"
      class="sub-nav-li-item"
      :to="{ name: item.routeName }"
      >{{ item.label }}
    </router-link>
  </ul>
</template>

<script>
import { hasPermissionMenu } from "@/plugins/permission_tools.js";
export default {
  name: "",
  props: {
    navs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      navsArr: []
    };
  },
  computed: {},
  components: {},
  created() {
    if (!this.navs[0].permission) {
      this.navsArr = this.navs;
    } else {
      this.navsArr = hasPermissionMenu(this.navs, "permission");
    }
  },
  mounted() {},
  watch: {},
  methods: {
    handelSwitchChange(index) {
      this.$emit("switch-change", index);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
