<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog1"
      :diaTit="'选择编制人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose1"
          class="single-choose-person"
          :isSingle="true"
          :section="organ_id"
          :personID="personID1"
          @choosePersonFun="(val) => choosePersonFun(val, 1)"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog2"
      :diaTit="'选择复核人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose2"
          class="single-choose-person"
          :isSingle="true"
          :section="organ_id"
          :personID="personID2"
          @choosePersonFun="(val) => choosePersonFun(val, 2)"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog3"
      :diaTit="'选择技术负责人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose3"
          class="single-choose-person"
          :isSingle="true"
          :section="organ_id"
          :personID="personID3"
          @choosePersonFun="(val) => choosePersonFun(val, 3)"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog4"
      :diaTit="'选择参与人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose4"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <el-select
              v-model="ruleform.tech_confess_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="编号：">
            <el-input
              class="input-m"
              v-model="ruleform.tech_confess_serial"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="施工单位：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.tech_confess_construct"
              placeholder="请选择/输入"
            >
              <!-- <el-option
                label="中铁十八局集团（隧道工程）有限公司"
                value="中铁十八局集团（隧道工程）有限公司"
              ></el-option> -->
              <el-option
                v-for="(item, i) in selectArr1"
                :key="i"
                :label="item.tech_confess_construct"
                :value="item.tech_confess_construct"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工程名称：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.tech_confess_engine_name"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, i) in selectArr2"
                :key="i"
                :label="item.tech_confess_engine_name"
                :value="item.tech_confess_engine_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底内容：">
            <el-input
              class="input-m"
              v-model="ruleform.tech_confess_desc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底日期：">
            <el-date-picker
              class="el-date-editor-m"
              :clearable="false"
              v-model="ruleform.tech_confess_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="编制人：">
            <el-input
              class="el-input-person"
              readonly
              v-model="ruleform.tech_confess_pre_account_name"
              placeholder="请选择"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer(1)"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="复核人：">
            <el-input
              readonly
              class="el-input-person"
              v-model="ruleform.tech_confess_review_account_name"
              placeholder="请选择"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer(2)"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="技术负责人：">
            <el-input
              readonly
              class="el-input-person"
              v-model="ruleform.tech_confess_response_account_name"
              placeholder="请选择"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer(3)"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long must d-flex" label="交底内容：">
            <div
              ref="content"
              contenteditable="true"
              class="border p-2 d-flex vertical-top rounded contenteditable-div"
              v-html="ruleform.tech_confess_content"
            ></div>
          </el-form-item>
          <el-form-item class="form-item-long" label="上传附件：">
            <nFileUpload ref="file_upload" />
          </el-form-item>
          <el-form-item class="form-item-long" label="参与人：">
            <nAddItemContent @addFun="addPersons">
              <template slot="content-add">
                <div
                  class="content-item"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  <span>{{ item.account_name }}【{{ item.account_job }}】</span>
                  <i
                    class="iconfont btn-btn_detail_minus_02 font-20"
                    @click="reduceFun(index, item)"
                  ></i>
                </div>
              </template>
            </nAddItemContent>
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";

export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      ruleform: {
        tech_confess_organ_id_un: null,
        tech_confess_serial: "",
        tech_confess_construct: "",
        tech_confess_engine_name: "",
        tech_confess_desc: "",
        tech_confess_time: this.$utils.getCurrentTime(),
        tech_confess_pre_account_name: "",
        tech_confess_review_account_name: "",
        tech_confess_response_account_name: "",
        tech_confess_pre_account_id_un: null,
        tech_confess_review_account_id_un: null,
        tech_confess_response_account_id_un: null,
        tech_confess_content: `一、交底范围<br/>
明确到单位工程（分部分项）+工区+里程段+具体内容。<br/>
二、工程概况<br/>
1、现场情况说明<br/>
2、施工内容，主要工程量（附表）<br/>
三、施工准备（所需人、机、料等可附表格，简单明了）<br/>
1、场地准备：施工前场地需具备的条件；<br/>
2、人员组织：劳务班组人员、技术员、质检员、安全员、材料员（物资设备）、试验员、测量员等，明确各自责任；<br/>
3、材料准备：施工涉及到的所有材料；<br/>
4、机具准备：施工涉及到的所有机具；<br/>
5、其它<br/>
四、工艺流程<br/>
1、施工工艺流程（附图）<br/>
2、施工内容及要求<br/>
按流程图简单描叙各施工内容，通俗易懂（面向劳务班组人员）。<br/>
五、质量标准及要求:<br/>
1、主控项目及控制标准<br/>
2、一般项目及控制标准<br/>
六、安全环保措施<br/>
1、安全施工措施及注意事项<br/>
2、环保措施及注意事项<br/>
七、相关图纸、联系单及施工图等<br/>
1、相关图纸、联系单等<br/>
2、涉及的施工图（附图）`,
        tech_confess_join_account_ids: "",
      },
      selectArr1: [], //施工单位/工
      selectArr2: [], //程名称
      rules: {
        tech_confess_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        tech_confess_serial: [
          {
            required: true,
            message: "请选择编号",
          },
        ],
        tech_confess_construct: [
          {
            required: true,
            message: "请选择施工单位",
          },
        ],
        tech_confess_engine_name: [
          {
            required: true,
            message: "请选择工程名称",
          },
        ],
        tech_confess_desc: [
          {
            required: true,
            message: "请输入交底内容",
          },
        ],
        tech_confess_time: [
          {
            required: true,
            message: "请选择交底日期",
          },
        ],
        tech_confess_pre_account_name: [
          {
            required: true,
            message: "请选择编制人",
          },
        ],
        tech_confess_review_account_name: [
          {
            required: true,
            message: "请选择复核人",
          },
        ],
        tech_confess_response_account_name: [
          {
            required: true,
            message: "请选择技术负责人",
          },
        ],
        tech_confess_content: [
          {
            required: true,
            message: "请输入交底内容",
          },
        ],
      },
      tech_confess_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      fileList: [],
      organ_id: this.$organ_id_en_or_pro(this),
      personID1: 0, //编制人ID
      personID2: 0, //复核人ID
      personID3: 0, //技术负责人ID
      personList: [],
      personIDsArr: [],
      projectListSelect: [], //工程项目
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },

  mounted() {
    this.getOrganProjectData();
    let date = new Date();
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let months = month.toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours().toString().padStart(2, "0");
    let minu = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    let tech_confess_serial_str = `${year}${months}${day}${hour}${minu}${second}`;
    this.ruleform.tech_confess_serial = tech_confess_serial_str;
    //   获取施工单位/工程名称
    this.queryProjectInfoTechConfessSelect(1);
    this.queryProjectInfoTechConfessSelect(2);
  },
  async created() {
    if (this.tech_confess_id) {
      this.title = "编辑技术交底";
      await this.queryProjectInfoTechConfess();
    } else {
      this.title = "新增技术交底";
      this.ruleform.outbound_pick_account_id_un =
        // 默认登录者
        this.$set(
          this.ruleform,
          "tech_confess_pre_account_name",
          this.$store.state.user.userName
        );
      this.personID1 = Number(this.$store.state.user.account_id);
      this.ruleform.tech_confess_pre_account_id_un = this.personID1;
    }
  },
  methods: {
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : 0,
      });
      this.projectListSelect = result;
    },
    //    获取施工单位/工程名称
    async queryProjectInfoTechConfessSelect(t) {
      let res = await api.queryProjectInfoTechConfessSelect({ query_type: t });
      this["selectArr" + t] = res.result;
    },
    dialogClose(ind) {
      this.$refs["singlechoose" + ind].choosePersonIDsArr = this.personIDsArr;
    },
    // 点击➕展示人员选择弹框
    addPersons() {
      this.$refs.dialog4.show();
      if (this.$refs.chooseperson4) {
        this.$refs.singlechoose4.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose4.setSelectPerson(this.personList);
        });
      }
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    // 删除人员
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.personList = [...nodes];
      this.$refs.dialog4.cancel();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data, type) {
      this["personID" + type] = data;
      this.ruleform[
        [
          "",
          "tech_confess_pre_account_id_un",
          "tech_confess_review_account_id_un",
          "tech_confess_response_account_id_un",
        ][type]
      ] = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.$refs["dialog" + type].cancel();
      this.$set(
        this.ruleform,
        [
          "",
          "tech_confess_pre_account_name",
          "tech_confess_review_account_name",
          "tech_confess_response_account_name",
        ][type],
        result[0].account_name
      );
    },
    // 点击选择考核对象
    showTargerAddLayer(t) {
      this.$refs["dialog" + t].show();
    },

    // 树形下拉选择
    getSelectValue(node) {
      this.organ_id = node.node.organ_id;
      this.ruleform.tech_confess_organ_id_un = node.node.organ_id;
      this.personID1 = Number(this.$store.state.user.account_id);
      this.personID2 = null;
      this.personID3 = null;
      this.personIDsArr = [];
      this.personArr = [];
      this.$set(
        this.ruleform,
        "tech_confess_pre_account_name",
        this.$store.state.user.userName
      );
      this.$set(this.ruleform, "tech_confess_review_account_name", "");
      this.$set(this.ruleform, "tech_confess_response_account_name", "");

      this.$set(
        this.ruleform,
        "tech_confess_pre_account_id_un",
        this.personID1
      );
      this.$set(this.ruleform, "tech_confess_review_account_id_un", null);
      this.$set(this.ruleform, "tech_confess_response_account_id_un", null);

      this.$set(this.ruleform, "tech_confess_join_account_ids", "");
    },
    async queryProjectInfoTechConfess() {
      let data = await api.queryProjectInfoTechConfess({
        tech_confess_id: this.tech_confess_id,
      });
      let info = data.result[0];
      if (this.tech_confess_id) {
        const json = [
          "tech_confess_id",
          "tech_confess_organ_id_un",
          "tech_confess_serial",
          "tech_confess_construct",
          "tech_confess_engine_name",
          "tech_confess_desc",
          "tech_confess_time",
          "tech_confess_pre_account_id_un",
          "tech_confess_review_account_id_un",
          "tech_confess_response_account_id_un",
          "tech_confess_content",
          "tech_confess_join_account_ids",
        ];
        this.personID1 = info.tech_confess_pre_account_id_un;
        this.personID2 = info.tech_confess_review_account_id_un;
        this.personID3 = info.tech_confess_response_account_id_un;
        this.ruleform.tech_confess_pre_account_name = info.pre_account_name;
        this.ruleform.tech_confess_review_account_name =
          info.review_account_name;
        this.ruleform.tech_confess_response_account_name =
          info.response_account_name;
        this.$utils.renderRuleForm(this, json, this.ruleform, info);
        // 编辑式渲染图片
        this.$refs.file_upload.setFileList(info.file_list);
        this.personIDsArr = this.ruleform.tech_confess_join_account_ids
          .split(",")
          .map(Number);
        await this.queryAccount(this.personIDsArr);

        this.$utils.renderFile(info.file_list, this.fileList, "file");
        this.organ_id = this.ruleform.tech_confess_organ_id_un;
      }
    },
    // 确认提交
    async submitFun() {
      this.ruleform.tech_confess_join_account_ids = this.personIDsArr.join(",");
      this.ruleform.tech_confess_content = this.$refs.content.innerHTML;
      this.ruleform.tech_confess_content =
        this.ruleform.tech_confess_content == "<br>"
          ? ""
          : this.ruleform.tech_confess_content;
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let filejson = await this.$refs.file_upload.submitFun(true, {
        uploadFileModule: "ProjectInfoTechConfess",
      });
      this.ruleform.tech_confess_file = filejson.file;
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        this.tech_confess_id
          ? "updateProjectInfoTechConfess"
          : "uploadProjectInfoTechConfess"
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--small.is-circle {
  padding: 5px;
}
.person-list {
  padding: 10px 0;
}
.person-list-item {
  padding: 5px 10px;
}
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #5a5efd;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}
.el-button--info,
.el-button--info:focus,
.el-button--info:hover {
  background-color: #8a8ba6;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}

.admin-config-box {
  .lt {
    width: 30%;
  }

  .label-l {
    width: 110px;
  }
}
</style>
