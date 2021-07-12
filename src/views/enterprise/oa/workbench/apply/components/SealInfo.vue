<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.stamp_approval_organ_id_union"
        />
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="文件份数：">
        <num-input
          placeholder="请输入"
          v-model="ruleforms.stamp_approval_count"
          :fixedNum="0"
          unit="份"
        ></num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="印章种类：">
        <el-select
          v-model="ruleforms.stamp_approval_stamp_type"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in sealArr"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="文件名称：">
        <el-input
          v-model="ruleforms.stamp_approval_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item class="form-item-long-small must" label="用章部门：">
        <el-select v-model="ruleforms.stamp_approval_use_department" placeholder="请选择">
          <el-option v-for="(item, index) in departmentArr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="form-item-long-small must" label="文件类型：">
        <el-input
          v-model="ruleforms.stamp_approval_file_type"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="使用人：">
        <el-input
          v-model="ruleforms.stamp_approval_user_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="使用日期：">
        <el-date-picker
          :clearable="false"
          v-model="ruleforms.stamp_approval_use_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="用章公司：">
        <el-select
          v-model="ruleforms.stamp_approval_use_company"
          allow-create
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in companyArr"
            :key="index"
            :label="item.oa_company"
            :value="item.oa_company"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long must" label="用章事由：">
        <el-input
          v-model="ruleforms.stamp_approval_reason"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
import dayjs from "dayjs";
export default {
  mixins: [upload],
  props: {
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      sealArr: ["公章", "财务章", "法人私章", "发票章", "其他"],
      departmentArr: [
        "工程部",
        "财务部",
        "质检部",
        "安全部",
        "物资部",
        "合同计量部",
        "办公室",
        "其他人员",
      ],
      companyArr: [], //用章公司
      ruleforms: {
        stamp_approval_id: 0,
        revise_info_process_id_union: null,
        stamp_approval_name: "",
        stamp_approval_project_name: "",
        stamp_approval_count: 0,
        stamp_approval_use_company: "",
        stamp_approval_reason: "",
        stamp_approval_file_type: "",
        stamp_approval_stamp_type: "",
        stamp_approval_use_department: "",
        stamp_approval_use_date: "",
        stamp_approval_file: "",
        stamp_approval_file_json: "",
        stamp_approval_pic: "",
        stamp_approval_pic_json: "",
        stamp_approval_user_name: "",
        stamp_approval_organ_id_union: null,
        stamp_approval_process_type: "",
        stamp_approval_process_type_department: "",
        stamp_approval_sub_time: this.$utils.getCurrentTime(),
      },
      rules: {
        stamp_approval_organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        stamp_approval_count: [
          {
            required: true,
            message: "请输入文件份数",
          },
        ],
        stamp_approval_stamp_type: [
          {
            required: true,
            message: "请选择印章种类",
          },
        ],
        stamp_approval_name: [
          {
            required: true,
            message: "请输入文件名称",
          },
        ],
        // stamp_approval_use_department: [
        //   {
        //     required: true,
        //     message: "请选择用章部门",
        //   },
        // ],
        stamp_approval_file_type: [
          {
            required: true,
            message: "请输入文件类型",
          },
        ],
        stamp_approval_user_name: [
          {
            required: true,
            message: "请输入使用人",
          },
        ],
        stamp_approval_use_date: [
          {
            required: true,
            message: "请选择使用日期",
          },
        ],
        stamp_approval_use_company: [
          {
            required: true,
            message: "请选择用章公司",
          },
        ],
        stamp_approval_reason: [
          {
            required: true,
            message: "请输入用章事由",
          },
        ],
      },
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    if (this.editID) {
      await this.queryOAStampApproval();
    }
    // 查询用章公司
    this.queryOAOACompany();
  },
  methods: {
    async queryOAStampApproval() {
      let { result } = await api.queryOAStampApproval({
        stamp_approval_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },
    infoReFun(info) {
      info.stamp_approval_use_date = dayjs(
        String(info.stamp_approval_use_date)
      ).format("YYYY-MM-DD");
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
        this.$refs.file_upload.setFileList(info.file_list);
      }
    },
    // 查询用章公司
    async queryOAOACompany() {
      let { result } = await api.queryOAOACompany({
        oa_company_module: "OAStampApproval",
        page: -1,
      });
      this.companyArr = result;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.stamp_approval_organ_id_union = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.stamp_approval_pic = picsjson.file;
      this.ruleforms.stamp_approval_file = filejson.file;
      if (!isSave) {
        this.ruleforms.stamp_approval_pic_json = picsjson.file_json;
        this.ruleforms.stamp_approval_file_json = filejson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }

        if (filejson.file) {
          let file_json = JSON.parse(filejson.file_json);
          let urls_file = filejson.urls.split(",");
          let file_list = urls_file.map((item, index) => {
            return {
              ...file_json[index],
              file_json: file_json[index],
              url: item,
            };
          });
          this.ruleforms.file_list = file_list;
        } else {
          this.ruleforms.file_list = [];
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      // subdata.stamp_approval_use_company = subdata.stamp_approval_use_company.join(
      //   ","
      // );
      subdata.stamp_approval_use_date = Number(
        subdata.stamp_approval_use_date.replace(/-/g, "")
      );
      this.isAdd && (subdata.stamp_approval_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateOAStampApproval"
            : "uploadOAStampApproval"
        }`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
