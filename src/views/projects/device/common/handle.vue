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
          <nInfoTitle title="基础信息" />
          <el-form-item class="form-item-long must mt-1" label="所属工区：">
            <!-- <el-select
                v-model="ruleform.device_organ_id_union"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in treeData"
                  :key="item.organ_id"
                  :label="item.organ"
                  :value="item.organ_id"
                >
                </el-option>
            </el-select> -->
            <el-select
              v-model="ruleform.device_organ_id_union"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备编号：">
            <el-input
              class="input-m"
              v-model="ruleform.device_serial"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备名称：">
            <el-input
              class="input-m"
              v-model="ruleform.device_name"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="生产厂家：">
            <el-input
              class="input-m"
              v-model="ruleform.device_manufacturer"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备型号：">
            <el-input
              class="input-m"
              v-model="ruleform.device_model"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="进场时间：">
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              class="el-date-editor-m"
              v-model="ruleform.device_in_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="出场时间："
            v-if="device_id"
          >
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              class="el-date-editor-m"
              v-model="ruleform.device_out_date"
              @change="chooseOutDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" v-else>
          </el-form-item>
          <div v-if="$route.query.device_type == 2">
            <el-form-item
              class="form-item-long-small must"
              label="设备标定时间："
            >
              <el-date-picker
                :clearable="false"
                ref="datePicker"
                class="el-date-editor-m"
                v-model="ruleform.device_calibration_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <!-- <nInfoTitle :title="'日偏差值'" class="mb-2" /> -->
            <el-form-item class="form-item-long-mini" label="证书到期时间：">
              <el-date-picker
                :clearable="false"
                ref="datePicker"
                class="el-date-editor-m"
                v-model="ruleform.device_expired_date"
                @change="chooseOutDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item class="form-item-long" label="铭牌照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <!-- <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" />
          </el-form-item> -->
          <nInfoTitle title="操作人信息" />
          <el-form-item class="form-item-long mt-1" label="">
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
          <div v-if="$route.query.device_type == 1">
            <nInfoTitle title="检养信息" />
            <el-form-item
              class="form-item-long-small must mt-1"
              label="检养时间："
            >
              <el-date-picker
                :readonly="device_id ? true : false"
                :clearable="false"
                ref="datePicker"
                class="el-date-editor-m"
                v-model="ruleform.maintain_check_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="device_id ? '' : '请选择'"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="检养人：">
              <el-input
                class="input-m"
                :readonly="device_id ? true : false"
                v-model="ruleform.maintain_checker"
                :placeholder="device_id ? '' : '请选择'"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item-long-small must"
              label="下次检养时间："
            >
              <el-date-picker
                :readonly="device_id ? true : false"
                :clearable="false"
                ref="datePicker"
                class="el-date-editor-m"
                v-model="ruleform.device_next_check_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="device_id ? '' : '请选择'"
                @change="chooseCheckDate"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item
            class="form-item-long must"
            label="检养内容："
            v-if="$route.query.device_type == 1"
          >
            <el-input
              style="width: 600px"
              :readonly="device_id ? true : false"
              type="textarea"
              :placeholder="device_id ? '' : '请选择'"
              rows="4"
              class="el-textarea-box"
              v-model="ruleform.maintain_check_content"
            ></el-input>
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
      title:
        this.$route.query.device_type == 1 ? "新增普通设备" : "新增特种设备",
      ruleform: {},
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      picList: [], //图片文件
      formValidation: [
        {
          must:
            this.$route.query.device_type == 2
              ? [
                  "device_organ_id_union",
                  "device_serial",
                  "device_name",
                  "device_manufacturer",
                  "device_model",
                  "device_in_date",
                  "device_calibration_date",
                  "device_expired_date",
                ]
              : [
                  "device_organ_id_union",
                  "device_serial",
                  "device_name",
                  "device_manufacturer",
                  "device_model",
                  "device_in_date",
                ],
          tip:
            this.$route.query.device_type == 2
              ? [
                  "请选择所属工区",
                  "请输入设备编号",
                  "请输入设备名称",
                  "请输入生产厂家",
                  "请输入设备型号",
                  "请选择进场时间",
                  "请选择设备标定时间",
                  "请选择证书到期时间",
                ]
              : [
                  "请选择所属工区",
                  "请输入设备编号",
                  "请输入设备名称",
                  "请输入生产厂家",
                  "请输入设备型号",
                  "请选择进场时间",
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
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {
    this.device_id && this.queryEquipmentDevice();
  },
  methods: {
    //   选择出场时间
    chooseOutDate(val) {
      //判断时间范围是否合理
      if (
        !this.$utils.timeDiff(
          this.ruleform.device_in_date,
          this.ruleform.device_out_date
        )
      ) {
        this.ruleform.device_out_date = "";
        this.$tip({
          isTip: true,
          message: "出场时间须大于进场时间",
        });
        return;
      }
    },
    chooseCheckDate(val) {
      //判断时间范围是否合理
      if (
        !this.$utils.timeDiff(
          this.ruleform.maintain_check_time,
          this.ruleform.device_next_check_time
        )
      ) {
        this.ruleform.device_next_check_time = "";
        this.$tip({
          isTip: true,
          message: "下次检养时间须大于检养时间",
        });
        return;
      }
    },
    dialogClose() {
      this.$refs.singlechoose.choosePersonIDsArr = this.personIDsArr;
    },
    async queryEquipmentDevice() {
      let data = await api.queryEquipmentDevice({
        device_id: this.device_id,
      });
      let info = data.result[0];
      const json = [
        "device_organ_id_union",
        "device_id",
        "device_serial",
        "device_name",
        "device_manufacturer",
        "device_model",
        "device_in_date",
        "device_out_date",
        "maintain_check_time",
        "maintain_checker",
        "device_next_check_time",
        "device_calibration_date",
        "device_expired_date",
        "maintain_check_content",
        "device_maintain_id_union",
      ];
      json.forEach((item) => {
        this.$set(this.ruleform, item, info[item]);
      });
      info.device_pic_list &&
        this.$refs.pic_upload.setPicList(info.device_pic_list);
      this.personIDsArr = data.result[0].operator.split(",").map(Number);
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
        this.ruleform.operator = this.personIDsArr.join(",");
        this.ruleform.device_type = parseInt(this.$route.query.device_type);
        if (this.ruleform.operator == "") {
          this.$tip({
            isTip: true,
            message: "请选择操作人",
          });
          return;
        }
        if (
          this.$route.query.device_type == 1 &&
          !this.device_id &&
          !this.ruleform.device_next_check_time
        ) {
          this.$tip({
            isTip: true,
            message: "请选择下次检养时间",
          });
          return;
        }
        let file_obj = { uploadFileModule: "SafeEducation" };
        let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
        this.ruleform.device_pic = picsjson.file;
        // this.ruleform.device_pic_json = picsjson.file_json;
        if (!this.ruleform.device_pic) {
          this.$tip({
            isTip: true,
            message: "请上传铭牌照片",
          });
          return;
        }
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      let res = await api[
        `${this.device_id ? "updateEquipmentDevice" : "uploadEquipmentDevice"}`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    fileChange(file, fileList, name, type) {
      this[name] = fileList;
    },
    fileRemove(file, fileList, name) {
      this[name] = fileList;
    },
    //文件超过时触发
    handleExceed(file, fileList, num, type) {
      this.$tip({
        isTip: true,
        message: `上传${type}不能超过${num}个`,
      });
    },
    deleteFile(fileList, ind) {
      fileList.splice(ind, 1);
    },
    // 点击取消按钮返回上一级
    backRouter() {
      this.confirm("", "", "确认退出当前操作？").then(async () => {
        this.$router.go(-1);
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
