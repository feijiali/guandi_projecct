<template>
  <div class="w-100 my-1">
    <div v-if="fileList.length != 0">
      <div
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
              {{ item.name }}
            </p>
            <div>
              <span class="font-14 mt-05 mr-05">
                {{ $utils.renderSize(item.size) }}
              </span>
              <div class="d-inline-block" style="width: 34%">
                <el-progress
                  :percentage="progressArr[index]"
                  :stroke-width="8"
                ></el-progress>
              </div>
              <div
                class="d-inline-block trash-icon-btn"
                @click="deleteFile(fileList, index)"
              >
                <i class="iconfont btn-btn_list_trash"></i>
                <span class="font-14"> 删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-upload
      :on-exceed="(f1, f2) => handleExceed(f1, f2, length)"
      :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
      list-type="text"
      :file-list="fileList"
      :show-file-list="false"
      :limit="length"
      action="xxxx"
      :auto-upload="false"
      :multiple="false"
      :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
    >
      <div ref="fileBtn"></div>
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
    FileModule: {
      type: String,
      default: "FileUpload",
    },
  },
  data() {
    return {
      fileList: [],
      progressArr: [],
    };
  },
  methods: {
    fileSelct() {
      this.$refs.fileBtn.click();
    },
    async submitFun() {
      let file_obj = { uploadFileModule: this.FileModule };
      let len = this.progressArr.length - 1;
      await this.$utils.uploadFile.call(
        this,
        ["fileList"],
        file_obj,
        "",
        (res) => {
          let progress = parseInt((res.loaded / res.total) * 100);
          this.progressArr[len] = progress;
        }
      );
    },
    //拼装上传参数
    getFileObj() {
      let fileListArr = [],
        file_jsonArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
        file_jsonArr.push(value.file_json);
      }
      return {
        file: fileListArr.join(),
        file_json: JSON.stringify(file_jsonArr),
      };
    },
    // 设置文件列表
    setFileList(fileList) {
      this.fileList = [];
      this.progressArr = new Array(fileList.length).fill(100);
      this.$utils.renderFile(fileList, this.fileList, "file");
    },
    fileChange(file) {
      this.progressArr.push(0);
      this.fileList.push(file);
      this.submitFun();
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
