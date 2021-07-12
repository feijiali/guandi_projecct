<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择交底人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="personID"
          @choosePersonFun="choosePersonFun"
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
            <el-select
              @change="selectOrgan"
              v-model="ruleform.quality_tech_confess_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="主题：">
            <el-input
              v-model="ruleform.quality_tech_confess_theme"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="交底时间：">
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              v-model="ruleform.quality_tech_confess_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="交底人："
          >
            <el-input
              class="el-input-person"
              placeholder="请选择"
              v-model="approval_name"
              readonly
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="被交底班组：">
            <el-select
              multiple
              collapse-tags
              v-model="ruleform.quality_tech_confess_to_organ_ids"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamList"
                :key="item.tech_organ_id"
                :label="item.tech_organ_name"
                :value="item.tech_organ_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long d-inline-block must"
            label="交底内容："
          >
            <el-input
              v-model="ruleform.quality_tech_confess_content"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文件：">
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
        quality_tech_confess_time: this.$utils.parseDate2Str(
          new Date(),
          "YYYY-MM-DD HH:mm"
        ),
        quality_tech_confess_id: null,
        quality_tech_confess_organ_id_un: null,
        quality_tech_confess_theme: "",
        quality_tech_confess_account_ids: "",
        quality_tech_confess_account_text: "",
        quality_tech_confess_to_organ_ids: "",
        quality_tech_confess_to_organ_text: "",
        quality_tech_confess_content: "",
        quality_tech_confess_pic: "",
        quality_tech_confess_pic_json: "",
        quality_tech_confess_video: "",
        quality_tech_confess_video_json: "",
        quality_tech_confess_file: "",
        quality_tech_confess_file_json: "",
        quality_tech_confess_sub_time: "",
        quality_tech_confess_sub_account_id_un: null,
        join_account_list: [
          {
            tech_account_id: null,
            tech_account_name: "",
            tech_account_job: "",
          },
        ],
        to_organ_list: [
          {
            tech_organ_id: null,
            tech_organ_name: "",
          },
        ],
      },
      title: "新增技术交底",
      organArr: [], //工区数组
      formValidation: [
        {
          must: [
            "quality_tech_confess_organ_id_un",
            "quality_tech_confess_theme",
            "quality_tech_confess_time",
            "quality_tech_confess_account_ids",
            "quality_tech_confess_content",
          ],
          tip: [
            "请选择工区",
            "请输入主题",
            "请选择交底时间",
            "请选择交底人",
            "请输入交底内容",
          ],
        },
      ],
      personID: null,
      approval_name: "", //审批人名字
      personListJson: [], //交底人信心json集
      teamList: [], //班组列表
      quality_tech_confess_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    this.quality_tech_confess_id && this.queryQualityQualityTechConfess();
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
    // 点击选择审批人
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    //选择巡检人
    async choosePersonFun(data) {
      this.personID = data;
      this.ruleform.quality_tech_confess_account_ids = data + "";
      let { result } = await this.queryAccount(data);
      this.approval_name = result[0].account_name;
      this.personListJson = [];
      this.personListJson = result.map((item) => {
        return {
          tech_account_id: result[0].account_id,
          tech_account_name: result[0].account_name,
          tech_account_job: result[0].account_job,
        };
      });
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(id) {
      let data = await api.queryAccount({
        account_id: id,
      });
      return data;
    },
    async queryQualityQualityTechConfess() {
      let data = await api.queryQualityQualityTechConfess({
        quality_tech_confess_id: this.quality_tech_confess_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      if (info.quality_tech_confess_to_organ_ids) {
        this.ruleform.quality_tech_confess_to_organ_ids =
          info.quality_tech_confess_to_organ_ids.split(",").map(Number);
      }
      this.selectOrgan(info.quality_tech_confess_organ_id_un, true);
      this.approval_name = info.account_list[0].tech_account_name;
      let { result } = await this.queryAccount(
        Number(this.ruleform.quality_tech_confess_account_ids)
      );
      this.personID = Number(info.quality_tech_confess_account_ids);
      this.personListJson = result.map((item) => {
        return {
          tech_account_id: item.account_id,
          tech_account_name: item.account_name,
          tech_account_job: item.account_job,
        };
      });
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.video_upload.setVideoList(info.video_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    //选择标段
    async selectOrgan(val, bool) {
      !bool && (this.ruleform.quality_tech_confess_to_organ_ids = "");
      let data = await api.queryOrganAccountCountTree({ organ_node: val });
      let arr = data.result[0].leaves.map((item) => {
        return item.node;
      });
      this.teamList = arr
        .filter((item) => {
          return item.organ_type == 70;
        })
        .map((item) => {
          return {
            tech_organ_id: item.organ_id,
            tech_organ_name: item.organ,
          };
        });
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (this.ruleform.quality_tech_confess_to_organ_ids.length < 1) {
          this.$tip({
            isTip: true,
            message: "请选择被交底班组",
          });
          return;
        }
        let file_obj = { uploadFileModule: "QualityQualityTechConfess" };
        let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
        let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
        let videojson = await this.$refs.video_upload.submitFun(true, file_obj);
        this.ruleform.quality_tech_confess_pic = picsjson.file;
        this.ruleform.quality_tech_confess_file = filejson.file;
        this.ruleform.quality_tech_confess_video = videojson.file;
        this.ruleform.quality_tech_confess_pic_json = picsjson.file_json;
        this.ruleform.quality_tech_confess_file_json = filejson.file_json;
        this.ruleform.quality_tech_confess_video_json = videojson.file_json;
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let subArr = []; //班组JSON合集
      for (
        let i = 0, len = this.ruleform.quality_tech_confess_to_organ_ids.length;
        i < len;
        i++
      ) {
        for (let j = 0, len2 = this.teamList.length; j < len2; j++) {
          if (
            this.ruleform.quality_tech_confess_to_organ_ids[i] ==
            this.teamList[j].tech_organ_id
          ) {
            subArr.push(this.teamList[j]);
            break;
          }
        }
      }
      subdata.join_account_list = this.personListJson;
      subdata.quality_tech_confess_to_organ_ids =
        subdata.quality_tech_confess_to_organ_ids.join();
      subdata.to_organ_list = subArr;
      let res = await api[
        `${
          this.quality_tech_confess_id
            ? "updateQualityQualityTechConfess"
            : "uploadQualityQualityTechConfess"
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
