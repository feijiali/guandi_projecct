<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 14:17:16
-->
<template>
  <div
    class="position-relative h-100 w-100 d-flex flex-column bg-white rounded-1 p-2"
  >
    <n-scroll>
      <nBackTop title="处理回复情况" />
      <div class="d-flex-cen" v-if="info.length == 0" style="height: 90%">
        <n-nodata class="nodata"></n-nodata>
      </div>
      <div v-else>
        <div
          class="rounded-1 detail_with p-16 mt-1"
          v-for="item in info"
          :key="item.receive_file_id_un"
        >
          <p class="mb-2 text-secondary">{{ item.resolve_time }}</p>
          <div class="mb-2 detail_flex">
            <p class="detail_lable">处理人：</p>
            <p>{{ item.account_name }}</p>
          </div>
          <div class="mb-2 detail_flex">
            <p class="detail_lable">处理内容：</p>
            <p>{{ item.resolve_result }}</p>
          </div>
          <div class="mb-2 detail_flex">
            <nPicInfo
              :title="'附件图片'"
              :picList="item.pic_list"
              v-if="item.pic_list.length > 0"
            />
          </div>
          <div class="mb-2 detail_flex">
            <nFileInfo
              :title="'附件文稿'"
              :fileList="item.file_list"
              v-if="item.file_list.length > 0"
            />
          </div>
        </div>
      </div>
    </n-scroll>
  </div>
</template>
<script>
export default {
  data() {
    return {
      edit_id: 0,
      info: [],
    };
  },
  created() {
    // 默认登录者
    this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.QueryReceiveFileReceiveReply(this.edit_id);
  },
  methods: {
    async QueryReceiveFileReceiveReply(id) {
      let { result } = await api.QueryReceiveFileReceiveReply({
        receive_file_id_un: id,
      });
      this.info = result;
    },
  },
};
</script>
<style lang="scss" scoped>
.detail_with {
  width: 70%;
  border: solid 1px $color-3;
  .detail_lable {
    color: $color-2;
    width: 82px;
    text-align: right;
  }
  .detail_flex {
    display: flex;
  }
  .detail_img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .file_img {
    width: 50px;
  }
}
</style>
