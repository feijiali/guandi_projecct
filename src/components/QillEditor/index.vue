<template>
  <div class="editor">
    <el-upload
      ref="upload"
      class="upload"
      style="display: none"
      action="#"
      accept=".jpeg,.jpg,.png,.gif"
      :auto-upload="false"
      :multiple="false"
      :file-list="fileList"
      :show-file-list="false"
      :on-change="handleFileChange"
    >
    </el-upload>
    <QuillEditor ref="QuillEditor" v-model="content" :options="editorOption" />
  </div>
</template>

<script>
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],
  ["image"],
];
export default {
  name: "",
  props: {
    word: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      content: this.word,
      fileList: [],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: (value) => {
                if (value && this.fileList.length == 0) {
                  document.querySelector(".upload input").click();
                }
              },
            },
          },
        },
      },
    };
  },
  watch: {
    word() {
      this.content = this.word;
    },
  },
  components: {
    QuillEditor: quillEditor,
  },
  methods: {
    handleFileChange(file, fileList) {
      this.fileList = fileList;
      // 上传图片
      let file_obj = { uploadFileModule: "EditorFile" };
      this.$utils.uploadFile
        .call(this, ["fileList"], file_obj)
        .then(() => {
          let quill = this.$refs.QuillEditor.quill;
          let length = quill.getSelection().index;
          quill.insertEmbed(length, "image", this.fileList[0].url);
          quill.setSelection(length + 1);
          // 只能单张选择
          this.fileList = [];
        })
        .catch((e) => {});
    },
  },
};
</script>

<style scoped lang="scss">
.editor {
  height: 100%;

  ::v-deep .quill-editor {
    width: 100%;
    height: 100%;
    p {
      // line-height: 0.4 !important;
    }
    span {
      font-size: 15px;
      line-height: 28px !important;
    }
    .ql-toolbar {
      background: #e2e8eb;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: start;
    }
    .ql-snow {
      // border: none;
    }
    .ql-toolbar.ql-snow .ql-formats {
      margin-right: 6px;
    }
    .ql-snow .ql-picker.ql-header {
      width: 64px;
    }
    .ql-snow .ql-picker.ql-size {
      width: 64px;
    }
  }
  .ql-container.ql-snow {
    height: 335px !important;
    overflow-y: auto;
    img {
      margin-left: 10px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
