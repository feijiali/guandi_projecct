<template>
  <div
    class="sort-item bg-white rounded-1 d-flex cursor-p"
    @click="linkTo(item)"
  >
    <div class="sort-item-left h-100 mr-1">
      <div class="sort-item_top h-100">
        <!-- <span v-if="item.basic_state == 2">
          {{ item.ranking }}
        </span>
        <span v-else> -- </span> -->
        <div class="sort-item_top_img_box mb-1" v-if="item.ranking < 4">
          <img
            v-if="item.ranking != 0"
            class="w-100 h-100"
            :src="
              require('@/assets/images/guandi/icon_billbord_top' +
                item.ranking +
                '.png')
            "
          /><img
            v-else
            class="w-100 h-100"
            src="@/assets/images/guandi/icon_billbord_rank.png"
          />
        </div>
        <div class="sort-item_top_img_box mb-1 position-relative" v-else>
          <img
            class="w-100 h-100 position-absolute"
            style="left: 0; top: 0; z-index: 5"
            src="@/assets/images/guandi/icon_billbord_rank.png"
          />
          <span class="text-score">51</span>
        </div>
        <span
          v-if="item.basic_state == 2"
          class="font-weight-bold font-20 d-block"
        >
          {{
            hasPermissionArr(["PerformanceBasic-seeall"]) ||
            item.basic_principal_account_id_union == account_id
              ? item.basic_avg_score
              : "**"
          }}
        </span>
        <span v-else class="font-20 d-block">--</span>
        <span class="text-secondary d-block">平均分</span>
      </div>
    </div>
    <div class="sort-item-right flex-fill table-list-wrap">
      <div class="depart-div border-bottom px-1 mb-1 text-left pb-1">
        <p class="font-14 text-overflow-ellipsis">
          {{ item.organ }} （{{ item.basic_total_num }}人）
        </p>
      </div>
      <div class="sort-item_centent table-list-wrap" v-if="item.assessor_list">
        <template v-for="(i, ind) in item.assessor_list.slice(0, 3)">
          <div
            :key="ind"
            class="d-flex justify-content-between align-items-center mb-3"
          >
            <div class="d-inline-flex align-items-center">
              <template v-if="item.assessor_list[ind]">
                <img
                  v-if="
                    item.assessor_list[ind].ranking != 0 &&
                    item.basic_state != 2
                  "
                  style="width: 20px"
                  :src="
                    [
                      require('@/assets/images/guandi/icon_billboard_red.png'),
                      require('@/assets/images/guandi/icon_billboard_yellow.png'),
                      require('@/assets/images/guandi/icon_billboard_blue.png'),
                    ][item.assessor_list[ind].ranking - 1]
                  "
                />
                <img
                  v-else-if="item.basic_state == 2"
                  style="width: 20px"
                  :src="
                    [
                      require('@/assets/images/guandi/icon_billboard_red.png'),
                      require('@/assets/images/guandi/icon_billboard_yellow.png'),
                      require('@/assets/images/guandi/icon_billboard_blue.png'),
                    ][item.assessor_list[ind].ranking - 1]
                  "
                />
                <span v-else> -- </span>
              </template>
              <div class="rank-img flex-fill text-center d-flex-cen ml-2">
                <img
                  class="mr-1"
                  v-if="item.assessor_list[ind]"
                  :src="
                    item.assessor_list[ind].assessor_pic
                      ? item.assessor_list[ind].pic_url
                      : avatorDefault
                  "
                />
                <div>
                  {{ item.assessor_list[ind].assessor_name }}
                </div>
              </div>
            </div>
            <div
              v-if="item.assessor_list[ind]"
              class="text-right d-flex justify-content-between align-items-center"
            >
              <div class="score-item">
                <span v-if="item.assessor_list[ind].assessor_is_assess == 1">
                  {{
                    hasPermissionArr(["PerformanceBasic-seeall"]) ||
                    item.assessor_list[ind].assessor_account_id_union ==
                      account_id ||
                    item.basic_principal_account_id_union == account_id
                      ? item.assessor_list[ind].assessor_avg_score
                      : "**"
                  }}分
                </span>
                <span
                  v-else-if="
                    item.assessor_list[ind].assessor_is_assess != 1 &&
                    item.basic_state == 2
                  "
                >
                  {{
                    hasPermissionArr(["PerformanceBasic-seeall"]) ||
                    item.assessor_list[ind].assessor_account_id_union ==
                      account_id ||
                    item.basic_principal_account_id_union == account_id
                      ? item.assessor_list[ind].assessor_avg_score
                      : "**"
                  }}分
                </span>
                <span v-else class="f22"> -- </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { hasPermissionArr } from "@/plugins/permission_tools.js";

export default {
  props: {
    sort: {
      type: [Number, String],
      default: "1",
    },
    item: {
      type: Object,
    },
  },
  data() {
    return {
      avatorDefault: require("@/assets/images/bg_mine_grey.png"),
      account_id: this.$store.getters.account_id,
    };
  },
  methods: {
    hasPermissionArr: hasPermissionArr,
    linkTo(item) {
      this.$emit("rowclickTo", item);
    },
  },
};
</script>

<style scoped lang="scss">
.text-score {
  font-size: 28px;
  color: #4b5670;
  text-shadow: 0px 3px 5px rgba(142, 149, 167, 0.5);
  position: relative;
  z-index: 30;
}
.sort-item {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 16px;
}
.sort-item_top_img_box {
  width: 65px;
  height: 61px;
  line-height: 60px;
}
.rank-img {
  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
}

.sort-item_centent {
  height: 150px;
}
</style>
