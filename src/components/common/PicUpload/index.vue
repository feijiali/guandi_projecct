<!--
 * @Autor: 邓易
 * @Date: 2020-10-20 09:22:17
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-02 15:11:22
-->
<template>
  <el-upload
    :class="[picList.length == length ? 'delete-upload-icon' : '']"
    style="width: 100%"
    :on-exceed="(f1, f2) => handleExceed(f1, f2, length)"
    :before-upload="(f1) => beforeAvatarUpload(f1, 'pic')"
    class="avatar-uploader el-upload-box d-inline-block vertical-top"
    list-type="picture-card"
    ref="uploadPic"
    :file-list="picList"
    :show-file-list="true"
    :limit="length"
    action="xxxx"
    :auto-upload="false"
    :multiple="multiple"
    :on-change="(f, fs) => fileChange(f, fs, 'picList', 'img')"
    :on-remove="(f, fs) => fileRemove(f, fs, 'picList')"
    accept=".png, .jpeg, .jpg"
  >
    <div
      v-show="picList.length < length"
      class="file-box-show file-box-show-img"
    ></div>
  </el-upload>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 4,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      picList: [],
    };
  },
  methods: {
    async submitFun(bool, obj) {
      await this.$utils.uploadFile.call(this, ["picList"], obj);
      // 拼装上传参数
      let picListArr = [],
        file_jsonArr = [],
        urlArr = [];
      for (let value of this.picList) {
        picListArr.push(value.file_name);
        file_jsonArr.push(value.file_json);
        urlArr.push(value.url);
      }
      if (bool) {
        return {
          file: picListArr.join(),
          file_json: JSON.stringify(file_jsonArr),
          urls: urlArr.join(),
        };
      } else {
        return picListArr.join();
      }
    },
    // 设置图片列表
    setPicList(picList) {
      this.picList = [];
      this.$utils.renderFile(picList, this.picList, "pic");
    },
    fileChange(file, fileList, name, type) {
      var fileArr =
        fileList.length > this.length ? fileList.slice(0, 4) : fileList;
      this[name] = fileArr;
      this.$emit("fileChange", fileList);
    },
    fileRemove(file, fileList, name) {
      this[name] = fileList;
      this.$emit("fileRemove", fileList);
    },
    //文件超过时触发
    handleExceed(file, fileList, num, type) {
      this.$tip({
        isTip: true,
        message: `不能超过${num}个`,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
