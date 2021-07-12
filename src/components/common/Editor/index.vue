<template>
  <div class="position-absolute top-0 bottom-0 right-0 left-0">
    <el-upload
      ref="uploadimg"
      class="upload"
      style="display:none"
      action="#"
      accept=".jpeg, .jpg, .png, .gif"
      :auto-upload="false"
      :multiple="false"
      :file-list="fileList"
      :show-file-list="false"
      :on-change="handleFileChange"
    ></el-upload>
    <quill-editor class="editor h-100" ref="QuillEditor" v-model="content" :options="editorOption" />
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
const titleConfig = [
  { Choice: ".ql-bold", title: "加粗" },
  { Choice: ".ql-italic", title: "斜体" },
  { Choice: ".ql-underline", title: "下划线" },
  { Choice: ".ql-header", title: "段落格式" },
  { Choice: ".ql-strike", title: "删除线" },
  { Choice: ".ql-blockquote", title: "块引用" },
  { Choice: ".ql-code", title: "插入代码" },
  { Choice: ".ql-code-block", title: "插入代码段" },
  { Choice: ".ql-font", title: "字体" },
  { Choice: ".ql-size", title: "字体大小" },
  { Choice: '.ql-list[value="ordered"]', title: "编号列表" },
  { Choice: '.ql-list[value="bullet"]', title: "项目列表" },
  { Choice: ".ql-direction", title: "文本方向" },
  { Choice: '.ql-header[value="1"]', title: "h1" },
  { Choice: '.ql-header[value="2"]', title: "h2" },
  { Choice: ".ql-align", title: "对齐方式" },
  { Choice: ".ql-color", title: "字体颜色" },
  { Choice: ".ql-background", title: "背景颜色" },
  { Choice: ".ql-image", title: "图像" },
  { Choice: ".ql-video", title: "视频" },
  { Choice: ".ql-link", title: "添加链接" },
  { Choice: ".ql-formula", title: "插入公式" },
  { Choice: ".ql-clean", title: "清除字体格式" },
  { Choice: '.ql-script[value="sub"]', title: "下标" },
  { Choice: '.ql-script[value="super"]', title: "上标" },
  { Choice: '.ql-indent[value="-1"]', title: "向左缩进" },
  { Choice: '.ql-indent[value="+1"]', title: "向右缩进" },
  { Choice: ".ql-header .ql-picker-label", title: "标题大小" },
  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: "标题一" },
  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: "标题二" },
  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: "标题三" },
  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: "标题四" },
  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: "标题五" },
  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: "标题六" },
  { Choice: ".ql-header .ql-picker-item:last-child", title: "标准" },
  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: "小号" },
  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: "大号" },
  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: "超大号" },
  { Choice: ".ql-size .ql-picker-item:nth-child(2)", title: "标准" },
  { Choice: ".ql-align .ql-picker-item:first-child", title: "居左对齐" },
  {
    Choice: '.ql-align .ql-picker-item[data-value="center"]',
    title: "居中对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="right"]',
    title: "居右对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="justify"]',
    title: "两端对齐",
  },
];
const toolbarOptions = [
  ["bold", "italic", "underline"], // "bold", "italic", "underline", "strike"
  ["clean"],
  // ["blockquote", "code-block"],
  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"], //, "video"
];
// import { rotateImage } from "@/plugins/canvas.js";
export default {
  name: "",
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
    filemodule: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      fileList: [],
      spinning: true,
      content: this.value,
      isfirst: false,
      imgNum: 3,
      replaceCR: true,
      editorOption: {
        placeholder: "请输入文本...",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: () => {
                document.querySelector(".upload input").click();
                // this.fileclick("uploadimg");
              },
              video: () => {
                this.fileclick("uploadvedio");
              },
            },
          },
        },
      },
    };
  },
  watch: {
    content: {
      handler: function(val, old) {
        if (val == "") {
          this.replaceCR = true;
        }
        if (val && this.replaceCR) {
          let content = this.content.replace(/\n/g, "");
          content = content.replace(/\<br\>/g, "");
          content = content.replace(/\<p\>&nbsp;\<\/p\>/g, "");
          if (val !== old) {
            this.content = content;
            this.$emit("input", content);
          }
          this.$refs.QuillEditor.quill.pasteHTML(content);
          this.replaceCR = false;
        }
        this.$emit("input", this.content);
      },
      deep: true,
    },
    value(val) {
      if (this.content != val) {
        this.content = val;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.autotip();
    }, 100);
  },
  methods: {
    handleFileChange(file, fileList) {
      this.fileList = fileList;
      // 上传图片
      this.$utils.uploadFile
        .call(this, ["fileList"], this.filemodule)
        .then(res => {
          let quill = this.$refs.QuillEditor.quill;
          let length = quill.getSelection().index;
          quill.insertEmbed(length, "image", this.fileList[0].url);
          quill.setSelection(length + 1);
          // 只能单张选择
          this.fileList = [];
        })
        .catch(e => {});
    },
    autotip() {
      document.getElementsByClassName("ql-editor")[0].dataset.placeholder = "";
      for (let item of titleConfig) {
        let tip = document.querySelector(".quill-editor " + item.Choice);
        if (!tip) continue;
        tip.setAttribute("title", item.title);
      }
    },
    fileclick(name) {
      this.$refs[name].click();
    },
    // fileuploadimg(e) {
    //   const hide = this.$message.loading("文件上传中，请稍后...", 0);

    //   this.uploadFile([e.file], this.filemodule)
    //     .then(res => {
    //       hide();
    //       let quill = this.$refs.QuillEditor.quill;
    //       let length = quill.getSelection().index;
    //       quill.insertEmbed(length, "image", res.result[0].url);
    //       this.$emit("firstUpload", res.result[0]);
    //       quill.setSelection(length + 1);
    //     })
    //     .catch(() => {
    //       hide();
    //     });
    // },
    // fileuploadvideo(e) {
    //   if (e.file.size > 50 * 1024 * 1024) {
    //     this.$message.warning("视频大小不能超过" + 50 + "M", 0);
    //     return;
    //   }
    //   const hide = this.$message.loading("文件上传中，请稍后...", 0);

    //   this.uploadFile([e.file], this.filemodule)
    //     .then(res => {
    //       hide();
    //       let quill = this.$refs.QuillEditor.quill;
    //       let length = quill.getSelection().index;
    //       quill.insertEmbed(length, "video", res.result[0].url);
    //       quill.setSelection(length + 1);
    //     })
    //     .catch(() => {
    //       hide();
    //     });
    // }
  },
  components: {
    quillEditor,
  },
};
</script>

<style lang="scss">
.ql-editor {
  img {
    max-width: 300px !important;
  }
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "标准";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "小号";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "大号";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "超大号";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}

.ql-editor {
  p {
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 1.75;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 16px;
  }
}
.ql-container {
  height: calc(100% - 45px);
}
</style>
