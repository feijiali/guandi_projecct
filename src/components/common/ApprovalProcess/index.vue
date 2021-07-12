<template>
  <div class="d-flex p-2">
    <span class="text-secondary">{{ title }}审批流程:</span>
    <div
      class="approval-process-box d-inline-block flex-fill ml-1"
      style="overflow: visible"
    >
      <div
        class="approval-process-item clear position-relative"
        v-for="(item, index) in reviseArr"
        :key="index"
      >
        <div class="process-item-l float-left mr-1 position-relative">
          <span
            class="position-absolute status-btn-s"
            :style="{
              backgroundColor:
                GLOBAL.backgroundColorArr2[item.revise_record_state],
              color: GLOBAL.colorArr2[item.revise_record_state],
            }"
            >{{
              item.revise_record_state == -1
                ? "待审批"
                : revise_record_state_arr[item.revise_record_state]
            }}</span
          >
          <img
            :src="
              item.sub_account_pic
                ? item.sub_account_pic_url
                : require('@/assets/images/bg_mine_grey.png')
            "
          />
          <span class="dash-line" v-if="index != reviseArr.length - 1"></span>
        </div>
        <div class="process-item-r float-left position-relative">
          <div
            class="text-secondary d-inline-block d-flex align-items-center position-relative text-right w-100"
            style="height: 25px; line-height: 25px"
          >
            <span>{{ item.revise_record_time }}</span>
          </div>
          <div
            class="mb-1 text-secondary position-relative bg-secondary p-1 rounded"
          >
            <p class="detail-item" v-if="index == 0">
              <span class="detail-labels">{{ item.revise_record_name }}：</span>
              <span class="detail-value flex-fill text-primary"
                >{{ item.sub_account_name }}【{{
                  item.sub_account_job
                }}】发起一条申请</span
              >
            </p>
            <template v-else>
              <!-- :style="{lineHeight:item.revise_record_state ==-1?0:'12px'}" -->
              <div
                class="detail-item w-100"
                v-if="item.revise_record_state != 7"
              >
                <span class="detail-labels"
                  >{{
                    item.revise_record_state == 3
                      ? "撤销人"
                      : item.revise_record_name
                  }}：</span
                >
                <span class="detail-value flex-fill text-primary"
                  >{{ item.sub_account_name }}【{{
                    item.sub_account_job
                  }}】</span
                >
              </div>
              <div class="detail-item w-100" v-else>
                <span class="detail-labels">抄送给：</span>
                <p
                  class="detail-value text-primary"
                  style="width: calc(100% - 160px)"
                >
                  <span
                    class="d-inline-block"
                    style="margin-bottom: 8px"
                    v-for="(itm, ind) in item.account_list"
                    :key="ind + 'w'"
                    >{{ itm.account_name }}【{{ itm.account_job }}】{{
                      ind != item.account_list.length - 1 ? ", " : ""
                    }}</span
                  >
                </p>
              </div>
              <p
                class="detail-item w-100"
                v-if="item.revise_record_state != -1"
              >
                <span class="detail-labels"
                  >{{
                    item.revise_record_state == 3
                      ? "撤销原因"
                      : item.revise_record_state == 7
                      ? "抄送意见"
                      : types == "Applyment" &&
                        (item.revise_record_state == 13 ||
                          item.revise_record_state == 14)
                      ? "拒绝材料"
                      : "审批意见"
                  }}：</span
                >
                <span
                  class="detail-value flex-fill text-primary line-height-20"
                  >{{ item.revise_record_remark }}</span
                >
              </p>
            </template>
            <viewer
              :images="[item.sign_url]"
              class="lookPic text-right"
              v-if="item.sign_url && item.revise_record_state != -1"
            >
              <div>
                <img
                  :src="item"
                  v-for="(item, index) in [item.sign_url]"
                  :key="index + 'image'"
                  class="layer-info-img h-100"
                  style="margin: 0px"
                />
              </div>
            </viewer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [
        require("@/assets/images/enterprise/icon_process_detail_waiting.png"),
        require("@/assets/images/enterprise/icon_process_detail_agree.png"),
        require("@/assets/images/enterprise/icon_process_detail_refuse.png"),
      ],
      revise_record_state_arr: this.GLOBAL.revise_record_state_arr,
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
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.detail-item {
  // margin-bottom: 10px;
  // .detail-labels{width: 85px;}
}
.approval-process-box {
  vertical-align: top;
  border-radius: 5px;
  .approval-process-item {
    min-height: 120px;
    display: flex;
    margin-right: 40px;
  }
  .process-item-l {
    // width: 40px;
    img {
      width: 52px;
      height: 52px;
      border-radius: 100%;
    }
  }
  .process-item-r {
    flex: 1;
    vertical-align: text-bottom;
    margin-left: 30px;
  }
  .dash-line {
    width: 1px;
    position: absolute;
    bottom: 0;
    top: 52px;
    border-left: 2px solid #e4e7ed;
    left: 25px;
  }
  .status-btn-s {
    display: inline-block;
    border-radius: 5px;
    padding: 6px 0;
    top: 52px;
    left: -14px;
    width: 80px;
    text-align: center;
    z-index: 40;
    color: #ff8f2a;
    background-color: #fff4de;
  }
}
</style>
