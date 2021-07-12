<template>
  <n-dialog
    ref="dialog"
    :diaTit="title + '详情'"
    :diaWidth="'40%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <div class="w-100">
        <div class="w-100 content-arc" style="height: 600px">
          <n-scroll>
            <p class="font-20 text-center w-100">
              {{ infoData.faction_manage_title }}
            </p>
            <p class="mt-1 text-center w-100">
              <span>{{ infoData.faction_manage_release_time }}</span>
              <span class="ml-2">{{ infoData.account_name }}</span>
              <span class="ml-2">{{ infoData.faction_manage_source }}</span>
            </p>
            <div
              class="mt-1 p content-arc"
              style="border-top: 10px solid rgb(240, 245, 251)"
            >
              <div v-html="infoData.faction_manage_content"></div>
            </div>
            <nPicInfo :picList="infoData.pic_list" />
            <nFileInfo :fileList="infoData.file_list" />
            <nVideoInfo :videoList="infoData.video_list" />
          </n-scroll>
        </div>
      </div>
    </template>
  </n-dialog>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({ content_list: [{}] }),
      required: false,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    cancel() {
      this.$refs.dialog.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.content-arc ::v-deep img {
  max-width: 100%;
}
</style>