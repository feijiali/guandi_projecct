<template>
  <div class="d-inline-block vertical-top" style="width: calc(100% - 240px)">
    <div
      class="detail-value vertical-top clear d-inline-block"
      v-if="videoList.length != 0"
    >
      <ul v-if="videoList.length != 0" class="d-inline-block vertical-top">
        <li
          class="upload-video-item position-relative d-inline-block"
          v-for="(item, index) in videoList"
          :key="index + '1'"
        >
          <video
            width="160"
            height="90"
            :id="'video_url' + index"
            :src="item.url"
            class=""
          ></video>
          <!-- <n-video style="width:160px;height:90px;" class="video_tag" :src="item.url" /> -->
          <div
            class="upload-video-item-delete"
            @click="deleteFile(videoList, index)"
          >
            <i class="el-icon-delete text-white font-20"></i>
          </div>
        </li>
      </ul>
    </div>
    <el-upload
      class="avatar-uploader el-upload-box d-inline-block vertical-top"
      :class="[videoList.length == length ? 'delete-upload-icon' : '']"
      :on-exceed="(f1, f2) => handleExceed(f1, f2, length)"
      :before-upload="(f1) => beforeAvatarUpload(f1, 'video')"
      list-type="text"
      ref="uploadVideo"
      :file-list="videoList"
      :show-file-list="false"
      :limit="length"
      action="xxxx"
      accept=".mp4"
      :auto-upload="false"
      :multiple="true"
      :on-change="(f, fs) => fileChange(f, fs, 'videoList', 'video')"
      :on-remove="(f, fs) => fileRemove(f, fs, 'videoList')"
    >
      <div
        v-show="videoList.length != length"
        class="file-box-show file-box-show-video"
      ></div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      videoList: [],
    };
  },
  methods: {
    async submitFun(bool, name) {
      await this.$utils.uploadFile.call(this, ["videoList"], name);
      // 拼装上传参数
      let videoListArr = [],
        file_jsonArr = [],
        urlArr = [];
      for (let value of this.videoList) {
        videoListArr.push(value.file_name);
        file_jsonArr.push(value.file_json);
        urlArr.push(value.url);
      }
      if (bool) {
        return {
          file: videoListArr.join(),
          file_json: JSON.stringify(file_jsonArr),
          urls: urlArr.join(),
        };
      } else {
        return videoListArr.join();
      }
    },
    // 设置文件列表
    setVideoList(videoList) {
      this.videoList = [];
      this.$utils.renderFile(videoList, this.videoList, "video");
    },
    fileChange(file, videoList, name, type) {
      var fileArr = videoList.map((item) => ({
        ...item,
        url: item.url ? item.url : URL.createObjectURL(item.raw),
      }));
      this[name] = fileArr;
    },
    fileRemove(file, videoList, name) {
      this[name] = videoList;
    },
    //文件超过时触发
    handleExceed(file, videoList, num, type) {
      this.$tip({
        isTip: true,
        message: `不能超过${num}个`,
      });
    },
    deleteFile(videoList, ind) {
      videoList.splice(ind, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-video-item {
  width: 160px;
  height: 90px;
  margin-right: 10px;
  border-radius: 8px;
}
.upload-video-item-delete {
  cursor: pointer;
  text-align: center;
  line-height: 90px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 90px;
  margin-right: 10px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
}
.upload-video-item:hover .upload-video-item-delete,
.layer-info-file:hover .upload-video-item-delete {
  opacity: 1;
}
</style>
