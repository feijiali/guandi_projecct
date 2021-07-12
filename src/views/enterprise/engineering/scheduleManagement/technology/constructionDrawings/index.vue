<template>
  <div class="w-100 h-100 clear">
    <n-dialog ref="dialog" :diaTit="diaTit" :diaWidth="'50%'" :isForm="true">
      <template slot="diaSlot">
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long" label="章节名称：">
            <el-input
              class="input-m"
              v-model="ruleform.project_doc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="
              (itemNode.tag > 0 && isAdd) ||
              (!isAdd && itemNode.node && itemNode.node.url)
            "
            class="form-item-long"
            label="上传附件："
          >
            <nFileUpload ref="file_upload" :length="1" />
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end mb-08">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <div class="content-info-box h-100 position-relative">
      <div
        class="
          content-info-box-left
          bg-white
          rounded-1
          h-100
          py-2
          position-relative
          d-flex
          flex-column
          top-select-box
        "
        style="display: block !important; border-radius: 10px !important"
      >
        <n-search
          ref="serch"
          class="ml-2 mr-2 search-box"
          :isInput="true"
          :placeholder="'输入章节搜索'"
          @searchFun="searchChapterFun"
        ></n-search>
        <div class="mt-2 ml-2 mr-2" v-if="!isShow">
          <label class="text-secondary">项目分类：</label>
          <el-select
            v-model="project_classify"
            @change="chooseProjectClassify"
            placeholder="请选择"
          >
            <el-option
              :value="item.val"
              :label="item.name"
              v-for="(item, index) in projectClassifyArr"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="text-secondary mt-1 font-14 px-2" v-if="isShow">
          <img
            class="tip-icon vertical-middle mr-1"
            src="@/assets/images/icon_personal_tips.png"
          />温馨提示：单击选中树状结构，鼠标右键可对选中对象进行编辑
        </div>
        <div
          class="person-tree-box position-absolute pb-2 mt-1"
          :style="{ top: isShow ? '100px' : '160px' }"
        >
          <n-scroll>
            <n-tree
              class="pr-2 mt-2"
              style="padding-bottom: 30px"
              :highlight-current="false"
              :treeData="treeData"
              ref="treeNode"
              :defaultProps="defaultProps"
              @rightClick="rightClick"
              @leftClick="leftClick"
              @handleFun="handleFun"
              :isRightClick="isShow ? true : false"
              :btnIsShow="btnIsShow"
            ></n-tree>
          </n-scroll>
        </div>
      </div>
      <div class="content-info-box-right rounded-1 h-100 bg-white">
        <div
          class="p-inf-main text-center w-100"
          :style="{
            height: isPDF ? 'calc(100% - 10px)' : 'calc(100% - 10px)',
          }"
        >
          <div
            class="pdf w-100 h-100 position-relative p-2 text-center"
            style="overflow-y: auto"
          >
            <iframe
              v-if="PDFsrc"
              class="w-100 h-100"
              :src="PDFsrc"
              frameborder="0"
            ></iframe>
            <div v-if="PDFsrc">
              <img :src="imgSrc" class="disi" style="width: 50%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
import pdf from "vue-pdf";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  mixins: [confirm, upload],
  components: {
    pdf,
  },
  data() {
    return {
      isPDF: false,
      imgSrc: "",
      rotate: 0,
      PDFsrc: "", // pdf文件地址
      srcUrl: "",
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "project_doc",
      },
      isShow: this.$route.meta.isProject,
      btnIsShow: { isAdd: true, isEdit: true, isDel: true }, //是否展示编辑按钮
      defaultExpandedKeySingle: [], //默认展开的单选树节点的 key 的数组
      defaultNodeKey: 0, //当前选中的节点
      treeData: [], //人员组织架构数据
      itemNode: {}, //当前左侧组织架构中的节点对象
      isAdd: false, //显示新增下级弹框
      diaTit: "插入子章节", //弹框标题
      ruleform: {},
      formValidation: [
        {
          must: ["project_doc"],
          tip: ["请输入章节名称"],
        },
      ],
      flag: false,
      project_classify: 0, //自营项目
      projectClassifyArr: [], //工程项目
    };
  },
  mounted() {
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    // 获取资源共享
    this.queryProjectInfoProjectDoc();
  },
  methods: {
    // 选择项目分类
    chooseProjectClassify(val) {
      // 获取资源共享
      this.queryProjectInfoProjectDoc();
    },
    //章节搜索
    searchChapterFun(val) {
      this.queryProjectInfoProjectDoc(val);
    },
    // 获取资源共享
    async queryProjectInfoProjectDoc(val) {
      let data = await api.queryProjectInfoProjectDoc({
        organ_node: this.$organ_id_en_or_pro(this),
        project_doc_search: val,
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.project_classify, //自营项目
      });
      this.treeData = data.result;
      this.parseJson(this.treeData);
    },
    pdfLoadFun(url) {
      let that = this;
      let name = that.$utils.getFileType(url);
      const IMG_ALLOWD = ["jpeg", "jpg", "gif", "png", "bmp", "pic"]; //图片支持格
      if (IMG_ALLOWD.indexOf(name) == -1) {
        that.isPDF = true;
        that.srcUrl = url;

        if (name == "pdf" || name == "PDF") {
          that.$set(that, "PDFsrc", url);
        } else {
          that.$set(
            that,
            "PDFsrc",
            `https://view.officeapps.live.com/op/view.aspx?src=${url}?${Date.now()}`
          );
        }
      } else {
        that.isPDF = false;
        that.imgSrc = url;
      }
    },
    parseJson(jsonObj) {
      for (let i = 0; i < jsonObj.length; i++) {
        let element = jsonObj[i];
        // 1.判断是对象或者数组
        if (element.node.url) {
          // 设置默认展开项为第一个有url值的层级
          // this.defaultExpandedKeySingle.push(element.tag);
          this.pdfLoadFun(element.node.url);
          // 重新拿到数据后设置当前选中的节点
          this.$nextTick(() => {
            this.$refs.treeNode.$refs.tree.setCurrentKey(element.tag);
          });
          this.flag = true;
        } else {
          if (element.leaves.length) {
            this.parseJson(element.leaves);
          }
        }
        if (this.flag) {
          return;
        }
      }
    },
    // 鼠标右击事件
    rightClick({ event, item, node, element }) {
      this.itemNode = item;
      this.btnIsShow = {
        isAdd:
          hasPermissionArr(["ProjectInfoProjectDoc-upload"]) &&
          this.itemNode.node &&
          !this.itemNode.node.url
            ? true
            : false,
        isEdit:
          hasPermissionArr(["ProjectInfoProjectDoc-update"]) &&
          this.itemNode.tag > 0
            ? true
            : false,
        isDel:
          hasPermissionArr(["ProjectInfoProjectDoc-delete"]) &&
          this.itemNode.tag > 0 &&
          this.itemNode.leaves &&
          !this.itemNode.leaves.length
            ? true
            : false,
      };
    },
    //鼠标左击事件
    leftClick(item, value, element) {
      this.itemNode = item.item;
      if (this.itemNode.node.url) {
        this.pdfLoadFun(this.itemNode.node.url);
      }
    },
    /**
     * @param {Object} type:0——插入子集；1——编辑名称；2——删除
     */
    handleFun(item) {
      this.itemNode = item;
      if (item.type === 1 || item.type == 2) {
        this.$nextTick(() => {
          this.$refs.file_upload.fileList = [];
        });
        this.$refs.dialog.show(); //显示弹框
        this.ruleform = {};
        this.isAdd = item.type === 1 ? true : false;
        this.diaTit = item.type === 1 ? "插入子章节" : "编辑名称";
        if (item.type == 2) {
          // 数据回填
          var json = ["project_doc"];
          this.$utils.renderRuleForm(
            this,
            json,
            this.ruleform,
            this.itemNode.node
          );
          this.$nextTick(() => {
            this.$refs.file_upload.fileList = [];
            this.$refs.file_upload.setFileList([
              {
                org_name: this.itemNode.node.org_name,
                file_name: this.itemNode.node.file_name,
                file_size: this.itemNode.node.file_size,
                url: this.itemNode.node.url,
              },
            ]);
          });
        }
      } else {
        this.confirm().then(async () => {
          let data = await api.delProjectInfoProjectDoc({
            project_doc_id: this.itemNode.tag,
            project_doc_pid: this.itemNode.node.project_doc_pid,
          });
          this.renderTreeFun();
        });
      }
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (
          (this.itemNode.tag > 0 && this.isAdd) ||
          (!this.isAdd && this.itemNode.node && this.itemNode.node.url)
        ) {
          let file_obj = { uploadFileModule: "ProjectInfoProject" };
          let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
          this.ruleform.project_doc_files = filejson.file;
          if (!this.ruleform.project_doc_files) {
            this.$tip({
              isTip: true,
              message: `请上传附件`,
            });
            return;
          }
        }
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      !this.isAdd && (subdata.project_doc_id = this.itemNode.tag);
      subdata.project_doc_pid = this.isAdd
        ? this.itemNode.tag
        : this.itemNode.node.project_doc_pid;
      let res = await api[
        `${
          this.isAdd
            ? "uploadProjectInfoProjectDoc"
            : "updateProjectInfoProjectDoc"
        }`
      ](subdata);
      if (res) {
        this.$refs.dialog.cancel();
        this.$tip({
          isTip: false,
          func: () => {
            //拿到展开的节点数组和选中的节点重新绘制树形组件
            this.renderTreeFun();
          },
        });
      }
    },
    renderTreeFun() {
      this.queryProjectInfoProjectDoc();
      // 获取展开的节点数组
      this.defaultExpandedKeySingle = this.$refs.treeNode.nodeExpandArr;
    },
  },
};
</script>
<style scoped lang="scss">
.top-select-box {
  border-radius: 10px 10px 0 0 !important;
}

.person-tree-box {
  top: 160px;
  right: 0;
  left: 10px;
  bottom: 0;
}

.home-index-right-box {
  background: #fff;
  box-shadow: 0 0 20px #dae5f0;
  padding: 10px;
  width: 145px;

  .arrow {
    position: absolute;
    left: -16px;
    top: 30%;
    font-size: 26px;
    color: #fff;
    text-shadow: 0 0 20px #dae5f0;
  }

  .home-right-item-btn {
    border-radius: 5px;
    line-height: 28px;
    padding: 0 10px;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: $main;
      color: white;
    }
  }
}

.pdf > span {
  width: 100%;
  height: auto;
}
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 300px;
  }

  .content-info-box-right {
    position: absolute;
    left: 308px;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
