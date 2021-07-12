<template>
  <n-dialog
    ref="dialogTwo"
    :diaTit="'导入困难职工档案信息'"
    :diaWidth="'40%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-dialog
        ref="dialogPerson"
        :diaTit="'选择人员'"
        :diaWidth="'700px'"
        class="stretch-dialog person-dialog"
      >
        <template slot="diaSlot">
          <n-choose-person
            ref="singlechoose"
            class="single-choose-person"
            :isSingle="true"
            :personID="ruleform.account_id"
            @choosePersonFun="choosePersonFun"
          ></n-choose-person>
        </template>
      </n-dialog>
      <n-scroll :native="false" class="w-100">
        <div class="mb-2">
          <span>困难职工档案模板</span>
          <a
            class="ml-2"
            :href="GLOBAL.baseurl + '/MOULD/hardWorkImport.xlsx'"
            download="困难职工档案模板.xlsx"
          >
            <n-button
              :btnText="'下载模板'"
              :width="'150px'"
              :colorBtn="'blue'"
            ></n-button>
          </a>
        </div>
        <el-form ref="ruleform" class="el-form-box">
          <!-- <el-form-item class="form-item-long must" label="导入日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item> -->
          <el-form-item class="form-item-long must" label="选择人员：">
            <el-input
              class="el-input-person"
              readonly
              v-model="ruleform.account_name"
              placeholder="请选择"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer"
            >
              +
            </div>
          </el-form-item>
        </el-form>
        <el-upload
          class="mt-3 mb-2"
          :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
          :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
          ref="uploadFile"
          :file-list="fileList"
          action="xxxx"
          :auto-upload="false"
          :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
          :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
          accept=".xls, .xlsx"
        >
          <nStatusButton
            v-show="fileList.length < 1"
            :changeColor="'#3377FF'"
            :btnText="'导入困难职工信息'"
          />
        </el-upload>
        <div class="d-flex justify-content-end">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import upload from "@/mixins/upload";
export default {
  props: {
    type: {
      type: Number,
      default: null,
      required: true,
    },
  },
  mixins: [upload],
  data() {
    return {
      personListAll: [], // 查询所有人
      ruleform: {
        account_id: null,
        account_organ_id_un: null,
        hard_worker_hard_type: this.type,
      },
    };
  },
  methods: {
    show() {
      this.fileList = [];
      this.ruleform = {
        account_id: null,
        file_name: "",
        account_organ_id_un: null,
        hard_worker_hard_type: this.type,
      };
      this.$refs.dialogTwo.show();
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialogPerson.show();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data) {
      this.ruleform.account_id = data;

      await this.queryAccount({ account_ids: String(data) });
      let person = this.personListAll.filter((item) => {
        return data == item.account_id;
      });
      this.ruleform.account_organ_id_un = person[0].organ_id;
      this.$set(this.ruleform, "account_name", person[0].account_name);
      this.$refs.dialogPerson.cancel();
    },
    // 查询人员
    async queryAccount(obj) {
      let data = await api.queryAccount(obj);
      this.personListAll = data.result;
    },
    // 提交
    async submitFun() {
      if (!this.ruleform.account_id) {
        this.$tip({
          isTip: true,
          message: "请选择人员",
        });
        return;
      }
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请导入困难职工信息表",
        });
        return;
      }
      await this.$utils.uploadFile.call(this, ["fileList"], {
        uploadFileModule: "UnionPartyPublicity",
      });
      let fileListArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
      }
      this.ruleform.file_name = fileListArr.join(",");
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.importUnionPartyHardWorker(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialogTwo.cancel();
          this.$parent.getList();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>