<!--
 * @Autor: 邓易
 * @Date: 2020-10-20 09:26:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 14:04:45
-->
<template>
  <div v-if="fileList.length != 0" class="detail-item mt-1 detail-item-long">
    <div v-if="showTitle">
      <span class="detail-label" :style="{ width: label_width + 'px' }">{{
        title
      }}</span>
      <span>：</span>
    </div>
    <div
      class="detail-value flex-fill vertical-top text-left"
      :class="[isFlex ? 'd-flex' : '']"
    >
      <div
        :class="[isFlex ? 'mr-2' : '']"
        class="mb-05"
        v-for="(item, index) in fileList"
        :key="index + 'files'"
      >
        <div class="d-flex w-100">
          <div style="width: 50px" class="mr-05">
            <img class="w-100" src="@/assets/images/icon_input_file_show.png" />
          </div>
          <div class="flex-fill">
            <p class="black text-overflow-ellipsis w-100 font-14">
              {{ item.org_name }}
            </p>
            <div>
              <span class="font-14 mt-05 mr-05">
                {{ $utils.renderSize(item.file_size) }}
              </span>
              <div
                class="d-inline-block main cursor-p"
                @click="preview(item.url)"
              >
                <i class="iconfont btn-btn_password_on vertical-middle"></i>
                <span class="font-12"> 预览</span>
              </div>
              <div
                class="d-inline-block main ml-1 cursor-p"
                @click="downloadFile({ url: item.url, name: item.org_name })"
              >
                <i class="iconfont btn-btn_list_download"></i>
                <span class="font-12"> 下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "附件文稿",
    },
    label_width: {
      type: Number,
      default: 70,
    },
    isFlex: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    preview(url) {
      let date = new Date();
      if (/\.(word|docx|xls|doc|xlsx)$/.test(url)) {
        window.open(
          "https://view.officeapps.live.com/op/view.aspx?src=" +
            url +
            "?" +
            date.getTime(),
          "_blank"
        );
      } else if (/\.(pdf|txt|png|jpg|gif)$/.test(url)) {
        window.open(url + "?" + date.getTime());
      } else {
        this.$tip({
          isTip: true,
          message: "该文件不支持预览",
        });
      }
    },
    // 下载文件、
    downloadFile(file) {
      if (this.$route.fullPath.includes("companySystem")) {
        this.$emit("downLoadFun");
      }
      let alink = document.createElement("a");
      alink.href = file.url;
      alink.target = "_blank";
      let urlName = file.url.split("/")[file.url.split("/").length - 1]; //文件名
      alink.download = file.name
        ? file.name.split(".")[0] + "-" + urlName
        : file.url; //图片名
      alink.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-item {
  color: $color-2;
  display: inline-flex;
  // line-height: 12px;
  // margin-bottom: 5px;
  .detail-label {
    width: 70px;
    display: inline-block;
    // text-align: justify;
    vertical-align: top;
    &::after {
      display: inline-block;
      width: 100%;
      content: "";
      height: 0;
    }
  }
}
.detail-item-long {
  width: 100%;
  .detail-value {
    line-height: 20px;
  }
}
</style>
