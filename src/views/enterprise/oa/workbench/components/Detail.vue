<template>
  <n-dialog
    ref="dialog"
    :diaTit="'制度发布详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="d-flex justify-content-between">
          <div class="d-inline-block flex-fill">
            <nInfoItem
              :lable_width="70"
              :class="[index == 0 ? 'mt-2' : '']"
              :colorString="
                item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
              "
              :data="{
                name: item.name,
                value: item.fun
                  ? item.fun(infoData[item.key])
                  : infoData[item.key],
                unit: item.unit,
              }"
              :islong="item.islong ? true : false"
              v-for="(item, index) in dataInfoList"
              :key="index"
            />
            <nPicInfo :picList="infoData.pic_list" />
            <nFileInfo
              :isDownLoad="isDownLoad"
              @downLoadFun="downLoadFun"
              :fileList="infoData.file_list"
            />

            <div class="w-100" v-if="commentsArr.length">
              <div class="detail-item mt-2 w-100">
                <span class="detail-label">全部评论：</span>
                <div class="detail-value flex-fill text-primary line-height-20">
                  <div
                    v-for="(item, index) in commentsArr"
                    :key="index + 'a'"
                    class="comment-item d-flex justify-content-between p-1 border-bottom"
                  >
                    <div class="d-flex align-items-center flex-fill mr-5">
                      <img
                        class="rounded-circle"
                        :src="
                          item.account_pic &&
                          item.account_pic.split('pmai_dir/')[1]
                            ? item.account_pic
                            : require('@/assets/images/bg_mine_grey.png')
                        "
                        style="width: 45px; height: 45px"
                      />
                      <div class="ml-05">
                        <p class="grey2">{{ item.account_name }}</p>
                        <p class="mt-1" style="line-height: 18px">
                          {{ item.system_release_comment }}
                        </p>
                      </div>
                    </div>
                    <div class="grey2" style="width: 170px">
                      {{ item.system_release_comment_time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline-block" style="width: 400px">
            <div class="detail-item mt-2">
              <span class="detail-label">浏览记录：</span>
              <div class="detail-value flex-fill text-primary">
                <div
                  class="clear mb-2"
                  v-for="(item, index) in reviewArr"
                  :key="index + 'b'"
                >
                  <span class="float-left">{{ item.account_name }}</span>
                  <div class="float-right ml-2">
                    下载<span class="grey2">{{
                      item.system_release_count_download_count
                    }}</span
                    >次，浏览<span class="grey2">{{
                      item.system_release_count_browse_count
                    }}</span
                    >次
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import { approvalIcon } from "@/constants/approvalIcon";
import api from "@/api/index";
import vApprovalProcess from "@/components/common/ApprovalProcess";

export default {
  components: {
    vApprovalProcess,
  },
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
      required: false,
    },
    id: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      approvalIcon: approvalIcon,
      commentsArr: [], //评论
      reviewArr: [], //浏览记录
      dataInfoList: [
        { name: "制度来源", key: "organ_parent_node_name" },
        { name: "发布人", key: "account_name" },
        { name: "制度类型", key: "system_release_type" },
        { name: "查看人", key: "account_names", islong: true },
        { name: "发布日期", key: "system_release_time" },
        { name: "制度主题", key: "system_release", islong: true },
        { name: "制度概要", key: "system_release_remark", islong: true },
      ],
      isDownLoad: true, //是否展示下载按钮
    };
  },
  watch: {
    id: {
      deep: true,
      async handler() {
        // 查询制度发布详情
        await this.queryOASystemReleaseComment();
        // 查询制度发布统计
        await this.queryOASystemReleaseCount();
      },
    },
  },
  async created() {},
  methods: {
    // 下载文件
    async downLoadFun() {
      let res = await api.updateOASystemReleaseDownLoadCount({
        system_release_id: this.id,
      });
      this.queryOASystemReleaseCount();
    },
    show() {
      this.$refs.dialog.show();
      this.queryOASystemReleaseCount();
    },
    async queryOASystemReleaseComment() {
      let res = await api.queryOASystemReleaseComment({
        system_release_id_union: this.id,
      });
      this.commentsArr = res.result;
    },
    async queryOASystemReleaseCount() {
      let res = await api.queryOASystemReleaseCount({
        system_release_id_union: this.id,
      });
      this.reviewArr = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.type-img {
  right: 20px;
  top: 0px;
}
</style>
