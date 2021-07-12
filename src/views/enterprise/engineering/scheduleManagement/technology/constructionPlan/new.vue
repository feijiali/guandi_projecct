
<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择参与人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="chooseperson"
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
              v-model="ruleform.technology_organ_id_un"
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
          <el-form-item class="form-item-long-small must" label="台账类型：">
            <el-select
              class="input-m"
              v-model="ruleform.technology_type"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in technologyTypeBox"
                :key="index + 'a'"
                :label="item.type"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="方案主题：">
            <el-input
              class="input-m"
              v-model="ruleform.technology_title"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="参与单位：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="
                (val) => getSelectValue(val, 'technology_join_organ_id_un')
              "
              :treeData="treeData2"
              :Isvalue="true"
              :value="ruleform.technology_join_organ_id_un"
            />
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
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              v-model="ruleform.technology_remark"
              type="textarea"
              placeholder="请输入"
              rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" />
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
        technology_id: null,
        technology_organ_id_un: null,
        technology_type: null,
        technology_title: "",
        technology_join_organ_id_un: null,
        technology_join_account_ids: "",
        technology_remark: "",
        technology_file: "",
        technology_sub_account_id_un: null,
        technology_sub_time: "",
      },
      // 性别
      technologyTypeBox: [
        { type: "工作方案", id: 1 },
        { type: "施工方案", id: 2 },
        { type: "技术方案", id: 3 },
        { type: "其他", id: 4 },
      ],
      rules: {
        technology_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        technology_type: [
          {
            required: true,
            message: "请选择台账类型",
          },
        ],
        technology_title: [
          {
            required: true,
            message: "请输入主题",
          },
        ],
        technology_join_organ_id_un: [
          {
            required: true,
            message: "请选择参与单位",
          },
        ],
      },
      personList: [],
      personIDsArr: [],
      isSet: this.$route.query.isSet, //判断是否为重新发起
      technology_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //
      projectListSelect: [], //工程项目
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
    treeData2() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    this.getOrganProjectData();
    if (this.technology_id) {
      this.title = "修改施工方案";
      await this.queryProjectInfoTechnology();
    } else {
      this.title = "新增施工方案";
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
    // 树形下拉选择
    getSelectValue(node, name) {
      this.ruleform[name] = node.node.organ_id;
    },
    async queryProjectInfoTechnology() {
      let data = await api.queryProjectInfoTechnology({
        technology_id: this.technology_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      // 编辑式渲染图片
      this.$refs.file_upload.setFileList(info.file_list);
      this.personIDsArr = this.ruleform.technology_join_account_ids
        .split(",")
        .map(Number);
      await this.queryAccount(this.personIDsArr);
    },
    async uploadUnionPartyHardWorker() {
      let data = await api.uploadUnionPartyHardWorker(this.ruleform);
      this.$router.go(-1);
    },
    async updateUnionPartyHardWorker() {
      let data = await api.updateUnionPartyHardWorker(this.ruleform);
      this.$router.go(-1);
    },
    // 点击➕展示人员选择弹框
    addPersons() {
      this.$refs.dialog.show();
      if (this.$refs.chooseperson) {
        this.$refs.chooseperson.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.chooseperson.setSelectPerson(this.personList);
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
      this.$refs.dialog.cancel();
    },
    async submitFun() {
      this.ruleform.technology_join_account_ids = this.personIDsArr.join(",");
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        let file_obj = { uploadFileModule: "Account" };
        this.ruleform.technology_file = await this.$refs.file_upload.submitFun(
          false,
          file_obj
        );
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      subdata.technology_type = Number(subdata.technology_type);
      let res = await api[
        `${
          this.technology_id
            ? "updateProjectInfoTechnology"
            : "uploadProjectInfoTechnology"
        }`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
          // this.getList()
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

.shift-setting-item {
  min-height: 200px;
  width: 50%;
  background-color: #f7f7ff;
  border-radius: 10px;
  .shift-setting-item-left {
    background-color: #f7f7ff;
  }
  .shift-setting-item-right {
    background-color: #eaebff;
    padding: 14px;
  }
  .shift-setting-item-left-title {
    background-color: #eaebff;
    width: 40px;
    letter-spacing: 6px;
    text-align: center;
    color: $main;
    line-height: 24px;
    font-size: 16px;
    border-radius: 10px 0 0 10px;
  }
}
.label-l {
  width: 100px;
  text-align: right;
}
</style>
