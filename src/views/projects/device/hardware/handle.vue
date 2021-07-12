<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择人员'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <div class="layer-title-blue2 position-relative mb-1 z-index-2">
            基础信息<span></span>
          </div>
          <el-form-item class="form-item-long-mini must" label="设备类型：">
            <el-select v-model="ruleform.hardware_type" placeholder="请选择">
              <el-option label="深基坑" :value="1"></el-option>
              <el-option label="塔吊" :value="2"></el-option>
              <el-option label="烟感" :value="3"></el-option>
              <el-option label="环境" :value="4"></el-option>
              <el-option label="人脸闸机" :value="5"></el-option>
              <el-option label="用电" :value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="设备名称：">
            <el-input
              class="input-m"
              v-model="ruleform.hardware"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="设备识别码：">
            <el-input
              class="input-m"
              v-model="ruleform.hardware_imei"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="所在位置：">
            <el-input
              class="input-m"
              v-model="ruleform.hardware_location"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="设备型号：">
            <el-input
              class="input-m"
              v-model="ruleform.hardware_version"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="进场时间：">
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              class="el-date-editor-m"
              v-model="ruleform.hardware_entrance"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-mini must" label="生产厂家：">
            <el-input
              class="input-m"
              v-model="ruleform.hardware_produce_unit"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="铭牌照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <!-- <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" />
          </el-form-item> -->
          <div class="layer-title-blue2 position-relative mb-1 z-index-2">
            设备负责人信息<span></span>
          </div>
          <el-form-item class="form-item-long" label="">
            <div class="person-choose-box position-relative">
              <el-scrollbar class="person-choose-main position-relative">
                <div
                  class="person-choose-item"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  {{ item.account_name }} 【{{ item.account_job }}】<br />{{
                    item.account
                  }}<img
                    @click="reducePerson(index, item)"
                    class="reduce-img"
                    src="../../../../assets/images/btn_input_decrease.png"
                  />
                </div>
              </el-scrollbar>
              <div
                class="
                  person-choose-main-r
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <img
                  @click="addPersons"
                  class="cursor-p"
                  src="../../../../assets/images/btn_safe_add.png"
                  alt
                />
              </div>
            </div>
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
      title: "新增硬件设备信息",
      ruleform: {},
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      picList: [], //图片文件
      formValidation: [
        {
          must: [
            "hardware_type",
            "hardware",
            "hardware_imei",
            "hardware_location",
            "hardware_version",
            "hardware_entrance",
            "hardware_produce_unit",
          ],
          tip: [
            "请输入设备类型",
            "请输入设备名称",
            "请输入设备识别码",
            "请输入所在位置",
            "请输入设备型号",
            "请选择进场时间",
            "请输入生产厂家",
          ],
        },
      ],
      device_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      add_img: require("./../../../../assets/images/btn_safe_add.png"),
      reduce_img: require("./../../../../assets/images/btn_safe_delete.png"),
      personListAll: [],
      personIDsArr: [],
      personList: [],
    };
  },
  mounted() {
    this.device_id && this.queryEquipmentHardware();
  },
  methods: {
    dialogClose() {
      this.$refs.singlechoose.choosePersonIDsArr = this.personIDsArr;
    },
    async queryEquipmentHardware() {
      let data = await api.queryEquipmentHardware({
        hardware_id: this.device_id,
      });
      let info = data.result[0];
      const json = [
        "hardware",
        "hardware_type",
        "hardware_version",
        "hardware_entrance",
        "hardware_imei",
        "hardware_location",
        "hardware_produce_unit",
      ];
      json.forEach((item) => {
        this.$set(this.ruleform, item, info[item]);
      });
      info.hardware_pics_list &&
        this.$refs.pic_upload.setPicList(info.hardware_pics_list);
      // this.$utils.renderRuleForm(this, json, this.ruleform, data.result[0]);
      // this.$utils.renderFile(info.hardware_pics_list, this.picList, "pic");
      this.personIDsArr = data.result[0].hardware_controller
        .split(",")
        .map(Number);
      // this.personIDsArr = [info.hardware_controller];
      !this.personListAll.length && (await this.queryAccount());
      let arr = this.personIDsArr.map((id) => {
        return this.personListAll.find((item) => item.account_id == id);
      });
      this.personList = arr.filter((item) => item);
    },
    // 添加人员的弹窗
    addPersons() {
      this.$refs.dialog.show();
    },
    // 查询人员
    async queryAccount(obj) {
      let data = await api.queryAccount({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.personListAll = data.result;
    },
    // 删除人员
    reducePerson(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    // 选择人员确认
    async choosePersonFun(node) {
      let data = node.map((item) => {
        return item.account_id;
      });
      this.personIDsArr = data;
      !this.personListAll.length && (await this.queryAccount());
      let arr = this.personIDsArr.map((id) => {
        return this.personListAll.find((item) => item.account_id == id);
      });
      this.personList = arr.filter((item) => item);
      this.$refs.dialog.cancel();
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        // if (!this.picList.length) {
        //   this.$tip({
        //     isTip: true,
        //     message: "请上传铭牌照片"
        //   });
        //   return;
        // }
        this.ruleform.hardware_controller = this.personIDsArr.join(",");
        // this.ruleform.device_type = parseInt(this.$route.query.device_type);
        if (this.ruleform.hardware_controller == "") {
          this.$tip({
            isTip: true,
            message: "请选择设备负责人",
          });
          return;
        }
        let file_obj = { uploadFileModule: "SafeEducation" };
        let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
        this.ruleform.hardware_pics = picsjson.file;
        // await this.$utils.uploadFile.call(this, ["picList"]);
        // 拼装上传参数
        // let picListArr = [];
        // for (let value of this.picList) {
        //   picListArr.push(value.file_name);
        // }
        // this.ruleform.hardware_pics = picListArr.join(",");
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      this.device_id ? (subdata.hardware_id = this.device_id) : "";
      let res = await api[
        `${
          this.device_id ? "updateEquipmentHardware" : "uploadEquipmentHardware"
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

<style lang="scss" scoped>
.v-map {
  width: 100%;
  height: 360px;
}
.form-item-long-small {
  width: 33%;
}
</style>
