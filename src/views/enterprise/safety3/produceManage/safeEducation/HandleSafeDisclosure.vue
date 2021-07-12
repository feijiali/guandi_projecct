<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择接收人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="false"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="所属工区：">
            <el-select v-model="ruleform.organ_id_union" placeholder="请选择">
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底名称：">
            <el-input
              class="input-m"
              v-model="ruleform.communicate_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底类型：">
            <el-select
              v-model="ruleform.communicate_type"
              placeholder="请选择/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="item in typeArr"
                :key="item.communicate_type"
                :label="item.communicate_type"
                :value="item.communicate_type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.communicate_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long must" label="接收人：">
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
          <el-form-item class="form-item-long must" label="交底内容：">
            <el-input
              v-model="ruleform.communicate_content"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="4" />
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
export default {
  mixins: [confirm],
  data() {
    return {
      ruleform: {
        communicate_id: null,
        organ_id_union: null,
        communicate_time: this.$utils.getCurrentTime(),
        communicate_video: "",
        communicate_pic: "",
        communicate_file: "",
        communicate_name: "",
        communicate_type: "",
        communicate_target: "",
        communicate_content: "",
      },
      title: "",
      organArr: [],
      typeArr: [],
      personIDsArr: [],
      personList: [],
      formValidation: [
        {
          must: [
            "communicate_name",
            "communicate_time",
            "communicate_type",
            "communicate_target",
            "organ_id_union",
            "communicate_content",
          ],
          tip: [
            "请输入交底名称",
            "请选择交底时间",
            "请选择交底类型",
            "请选择接收人",
            "请选择所属工区",
            "请输入交底内容",
          ],
        },
      ],
      communicate_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    if (this.communicate_id) {
      this.title = "编辑安全交底";
      await this.querySafeCommunicate();
    } else {
      this.title = "新增安全交底";
    }
    this.querySafeCommunicateType();
  },
  methods: {
    // 查询项目下的工区
    async queryType() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.organArr = res.result;
    },
    // 点击选择考核对象
    addPersons() {
      this.$refs.dialog.show();
      if (this.$refs.singlechoose) {
        this.$refs.singlechoose.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose.setSelectPerson(this.personList);
        });
      }
    },
    // 删除人员
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      let arr = nodes.map((item) => item.account_id);
      this.personIDsArr = this.communicate_id ? [arr] : arr;
      this.personList = [...nodes];
      this.$refs.dialog.cancel();
    },
    dialogClose() {
      this.$refs.singlechoose.choosePersonIDsArr = this.personIDsArr;
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    async querySafeCommunicateType() {
      let data = await api.querySafeCommunicateType({});
      this.typeArr = data.result;
    },
    async querySafeCommunicate() {
      let data = await api.querySafeCommunicate({
        communicate_id: this.communicate_id,
      });
      let info = data.result[0];
      const json = [
        "communicate_id",
        "organ_id_union",
        "communicate_name",
        "communicate_time",
        "communicate_type",
        "communicate_target",
        "communicate_content",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, data.result[0]);
      this.personIDsArr = info.communicate_target.split(",").map(Number);
      this.personList = info.parter_list;
      // await this.queryAccount(this.personIDsArr);
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.video_upload.setVideoList(info.video_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    // 确认提交
    async submitFun() {
      this.ruleform.communicate_target = this.personIDsArr.length
        ? this.personIDsArr.join(",")
        : "";
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let file_obj = { uploadFileModule: "SafeCommunicate" };
        this.ruleform.communicate_pic = await this.$refs.pic_upload.submitFun(
          false,
          file_obj
        );
        this.ruleform.communicate_video =
          await this.$refs.video_upload.submitFun(false, file_obj);
        this.ruleform.communicate_file = await this.$refs.file_upload.submitFun(
          false,
          file_obj
        );
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${
          this.communicate_id
            ? "updateSafeCommunicate"
            : "uploadSafeCommunicate"
        }`
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

<style scoped lang="scss">
.admin-config-box {
  .label-l {
    width: 85px;
  }
}
</style>
