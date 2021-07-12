<!--
 * @Autor: 邓易
 * @Date: 2021-03-24 11:39:59
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-30 14:43:05
-->
<template>
  <div class="h-100 position-relative">
    <!-- @click="hasPermissionArr(['FilesSiteInfo']) && $router.linkTo('project_homePic')" -->
    <span
      @click="linkTo('project_homePic')"
      class="notice-right position-absolute z-index-2 cursor-p text-white rounded-1"
      v-if="imgArr.length"
      style="
        right: 10px;
        top: 20px;
        padding: 4px 10px;
        background: rgba(0, 0, 0, 0.5);
      "
      >更多 →</span
    >
    <el-carousel
      v-if="imgArr.length"
      style="height: 100%"
      class="element-el-carousel"
    >
      <el-carousel-item
        class="cursor-p"
        v-for="(item, index) in imgArr"
        :key="index"
        autoplay="false"
      >
        <viewer
          :images="[item]"
          class="lookPic h-100 text-right d-flex justify-content-center align-items-center"
        >
          <img :src="item.url" :οnerrοr="defaultImg" class="w-100" />
        </viewer>
      </el-carousel-item>
    </el-carousel>
    <n-nodata v-if="!imgArr.length" class="nodata nodata_box mt-1"></n-nodata>
  </div>
</template>

<script>
import api from "@/api/index";
import Imgdef from "@/assets/images/bg_default_data.png";
export default {
  name: "homeElement",
  data() {
    return {
      imgArr: [],
      defaultImg: `this.src=${Imgdef}`,
    };
  },
  mounted() {
    this.queryFilesSiteInfo();
  },
  methods: {
    linkTo(name) {
      this.$emit("linkTo", {
        name: name,
        permission: "FilesSiteInfo",
      });
    },
    async queryFilesSiteInfo() {
      api
        .queryFilesSiteInfo({
          organ_node: this.$organ_id_en_or_pro(this),
          page: 0,
          page_size: 5,
        })
        .then((res) => {
          this.imgArr = res.result.map((item) => item);
        });
    },
  },
};
</script>

<style lang="scss">
.el-carousel__container {
  height: 100% !important;
  .lookPic {
    background: rgba(0, 0, 0, 0.3);
  }
}
.nodata_box {
  height: 90%;
}
</style>
