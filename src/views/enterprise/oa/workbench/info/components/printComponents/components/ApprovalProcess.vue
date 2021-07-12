<template>
  <div class="approval_list">
    <div
      v-for="(item, index) in reviseArr"
      :key="index"
      class="pb-1 border-bottom position-relative"
    >
      <div class="approval_item mt-2 mb-05">
        <div class="">
          <template v-if="index == 0">
            <p class="text-left w-100" style="max-width: 80%">
              {{ item.revise_record_name }}：{{ item.sub_account_name }}【{{
                item.sub_account_job
              }}】-{{
                item.revise_record_state == -1
                  ? "待审批"
                  : revise_record_state_arr[item.revise_record_state]
              }}
            </p>
          </template>
          <template v-else>
            <template v-if="item.revise_record_state != 7">
              <p class="text-left w-100" style="max-width: 80%">
                {{
                  item.revise_record_state == 3
                    ? "撤销人"
                    : item.revise_record_name
                }}：{{ item.sub_account_name }}【{{ item.sub_account_job }}】-{{
                  item.revise_record_state == -1
                    ? "待审批"
                    : revise_record_state_arr[item.revise_record_state]
                }}
              </p>
            </template>
            <template v-else>
              <div class="text-left w-100" style="max-width: 70%">
                <span>抄送给：</span
                ><span v-for="(itm, ind) in item.account_list" :key="ind + 'w'"
                  >{{ itm.account_name }}【{{ itm.account_job }}】{{
                    ind != item.account_list.length - 1 ? ", " : ""
                  }}</span
                >-{{
                  item.revise_record_state == -1
                    ? "待审批"
                    : revise_record_state_arr[item.revise_record_state]
                }}
              </div>
            </template>
          </template>
        </div>
        <!-- <div style="right:10px;top:30px;"
          class="position-absolute d-flex align-items-center flex-wrap w-100 justify-content-between"
        > -->
        <div
          style="right: 0; top: -10px; width: 160px"
          class="position-absolute position-relative d-flex align-items-center"
        >
          电子签名:
          <img
            class="signature d-inine-block ml-1"
            v-if="item.sign_url && item.revise_record_state != -1"
            :src="item.sign_url"
          />
        </div>
        <!-- </div> -->
      </div>
      <div
        class="d-flex align-items-center flex-wrap w-100 justify-content-between"
      >
        <div v-if="item.revise_record_state != -1 && item.revise_record_remark">
          <span style="width: 80px" class="text-right">{{
            resonJson[item.revise_record_state]
          }}</span
          >{{ item.revise_record_remark }}
        </div>
        <span class="flex-fill text-right mt-1">{{
          item.revise_record_time
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      revise_record_state_arr: this.GLOBAL.revise_record_state_arr,
      resonJson: {
        "-1": "",
        1: "",
        2: "",
        3: "撤销原因：",
        4: "审批意见：",
        5: "审批意见：",
        6: "退回原因：",
        7: "抄送意见：",
        8: "委托原因：",
        9: "审批意见：",
        10: "审批意见：",
        11: "审批意见：",
        12: "审批意见：",
        13: "拒绝材料：",
        14: "拒绝材料：",
      },
    };
  },
  props: {
    reviseArr: {
      type: Array,
      default: () => [],
    },
    types: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.approval_list {
  width: 97%;
  height: 300px;
  margin: 1% auto;
  .signature {
    position: relative;
    vertical-align: middle;
    width: 80px;
    height: 40px;
    left: 0px;
  }
}
</style>