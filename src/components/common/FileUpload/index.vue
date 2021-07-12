<template>
  <div class="d-inline-block vertical-top" style="width: 100%">
    <div
      class="detail-value vertical-top clear d-inline-block"
      v-if="fileList.length != 0"
    >
      <div
        class="d-inline-block layer-info-file mr-2 mb-1 position-relative"
        v-for="(item, index) in fileList"
        :key="index + 'files'"
      >
        <img
          class="vertical-middle mr-1"
          style="height: 50px"
          src="@/assets/images/icon_input_file_show.png"
        />
        <div class="d-inline-block layer-info-file-right">
          <p class="black">{{ item.name }}</p>
          <p class="grey2">
            <span class="disb">{{ $utils.getFileType(item.name) }}文件</span>
            <span class="disb mt-05">
              {{ $utils.renderSize(item.size) }}
            </span>
          </p>
        </div>
        <div
          class="upload-video-item-delete d-flex-cen"
          @click="deleteFile(fileList, index)"
        >
          <i class="el-icon-delete text-white font-20"></i>
        </div>
      </div>
    </div>
    <el-upload
      :class="[fileList.length == length ? 'delete-upload-icon' : '']"
      :on-exceed="(f1, f2) => handleExceed(f1, f2, length)"
      :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
      class="avatar-uploader el-upload-box d-inline-block vertical-top"
      list-type="text"
      ref="uploadFile"
      :file-list="fileList"
      :show-file-list="false"
      :limit="length"
      action="xxxx"
      :auto-upload="false"
      :multiple="true"
      :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
      :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
    >
      <div
        v-show="fileList.length != length"
        class="file-box-show file-box-show-file"
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
      fileList: [],
    };
  },
  methods: {
    async submitFun(bool, obj) {
      await this.$utils.uploadFile.call(this, ["fileList"], obj);
      // 拼装上传参数
      let fileListArr = [],
        file_jsonArr = [],
        urlArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
        file_jsonArr.push(value.file_json);
        urlArr.push(value.url);
      }
      if (bool) {
        return {
          file: fileListArr.join(),
          file_json: JSON.stringify(file_jsonArr),
          urls: urlArr.join(),
        };
      } else {
        return fileListArr.join();
      }
    },
    // 设置文件列表
    setFileList(fileList) {
      this.fileList = [];
      this.$utils.renderFile(fileList, this.fileList, "file");
    },
    fileChange(file, fileList, name, type) {
      var fileArr = fileList;
      this[name] = fileArr;
    },
    fileRemove(file, fileList, name) {
      this[name] = fileList;
    },
    //文件超过时触发
    handleExceed(file, fileList, num, type) {
      this.$tip({
        isTip: true,
        message: `不能超过${num}个`,
      });
    },
    deleteFile(fileList, ind) {
      fileList.splice(ind, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-video-item-delete {
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin-right: 10px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
}
.upload-down {
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
}
.layer-info-file:hover .upload-down,
.layer-info-file:hover .upload-video-item-delete {
  opacity: 1;
}
</style>
