<!--
 * @Autor: 邓易
 * @Date: 2021-01-19 09:06:28
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 14:46:23
-->
<template>
  <div
    class="h-100 position-relative home-video overflow-hidden"
    @click="linkTo('project_safety3_safeManage_video')"
  >
    <router-link
      v-if="accessToken && video"
      tag="span"
      :to="{ name: 'project_safety3_safeManage_video' }"
      class="notice-right position-absolute cursor-p text-white rounded-1"
      style="
        right: 10px;
        top: 20px;
        padding: 4px 10px;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
      "
      >更多 →</router-link
    >
    <div class="h-100 position-relative" style="z-index: 1">
      <EZUIKitVideoItem
        v-if="accessToken && video"
        ref="VideoItem1"
        :v_key="1"
        :grid="1"
        :authToken="accessToken"
        :item="video"
      />
      <n-nodata v-if="!video" class="nodata nodata_box"></n-nodata>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
import EZUIKitVideoItem from "@/components/EZUIKitVideo/item";
export default {
  components: {
    EZUIKitVideoItem,
  },
  data() {
    return {
      accessToken: "",
      video: null,
    };
  },
  async mounted() {
    await this.queryYsyToken();
    this.queryYsyVideo();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "Video",
      });
    },
    async queryYsyToken() {
      let data = await api.queryYsyToken({});
      if (data.result.length) {
        this.accessToken = data.result[0].token;
      } else {
        this.$tip({
          isTip: true,
          message: "没有获取到token！",
        });
      }
    },
    async queryYsyVideo() {
      let data = await api.queryYsyVideoList({
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 1,
      });
      this.video = data.result[0];
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  position: relative;
  z-index: 30;
}
.nodata_box {
  height: 90%;
}
</style>
