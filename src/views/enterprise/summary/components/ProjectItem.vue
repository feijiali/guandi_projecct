<template>
  <div
    class="bg-white rounded-1 p-1 w-100 mb-1"
    @click.stop="linkToProject(info)"
  >
    <div>
      <span class="white tag">工期</span>
      <span class="title font-14" v-if="info.project_state == 1">
        <template v-if="info.project_start">
          {{ info.project_start }}
          <span>至</span>
          {{ info.project_end }}
        </template>
        <template v-else> 计划完工 </template>
      </span>
      <span class="title font-14" v-else-if="info.project_state == 2">
        <span>完工项目</span>
      </span>
      <span class="title font-14" v-else-if="info.project_state == 3">
        <span>停工项目</span>
      </span>
    </div>
    <div class="font-weight-bold mt-05">{{ info.project }}</div>
    <div class="d-flex justify-content-start align-items-center">
      <div class="label grey2">
        <span class="disi label-txt">项目地址</span>
        <span>：</span>
      </div>
      <div
        class="flex-fill title mt-05 text-overflow-ellipsis"
        :title="info.project_pos"
      >
        {{ info.project_pos }}
      </div>
    </div>
    <div class="d-flex justify-content-start align-items-center">
      <div class="label grey2">
        <span class="disi label-txt">总造价</span>
        <span>：</span>
      </div>
      <div class="flex-fill">
        <span class="pink2 font-weight-bold">
          {{ info.project_total_value | parseFormat }}
        </span>
        <span class="title">万</span>
      </div>
    </div>
  </div>
</template>

<script>
import { parseFormatNum } from "@/plugins/utils_parse";
import api from "@/api/index";

export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  filters: {
    parseFormat(val) {
      return val ? parseFormatNum(val) : "";
    },
  },
  methods: {
    // 点击项目跳转项目级首页
    async linkToProject(item) {
      await this.queryAccountProject(item);
    },
    // 查询项目信息
    async queryAccountProject(item) {
      let data = await api.queryAccountProject({
        organ_id: item.organ_id_union,
      });
      if (data.result[0]) {
        let code = this.Base64.encode(
          JSON.stringify({
            organ_id_union: item.organ_id_union,
            project_id: item.project_id,
            project_simple: item.project_simple,
            project_logo: item.project_logo_list[0]
              ? item.project_logo_list[0].url
              : "",
            project_classify: item.project_classify,
          })
        );
        const news = this.$router.resolve({
          name: "project_summary",
          query: {
            code,
          },
        });
        let obj = window.open(news.href, "_blank");
        // obj.document.write(`<title>${data.result[0].project}</title>`)
      } else {
        // 判断图片大小
        this.$tip({
          isTip: true,
          closeTime: 3000,
          message: "该项目还未开通项目级管理平台权限！",
        });
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  padding: 0px 6px;
  display: inline-block;
  margin-right: 5px;
  position: relative;
  color: white;
  font-size: 14px;
  z-index: 1;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    z-index: -1;
    position: absolute;
    background: $main;
    display: inline-block;
    transform: skew(-10deg);
    border-radius: 5px 0 5px 0;
  }
}
.title {
  color: #616b81;
}
.label-txt {
  width: 70px;
  text-align-last: justify;
}
.d-flex justify-content-start align-items-center {
  align-items: baseline !important;
}
</style>
