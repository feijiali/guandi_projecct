<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'预备党员补齐资料'" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long" label="选择类目：">
            <el-checkbox-group
              class="checkbox-group-box flex-fillvertical-top assta"
              v-model="pd_prepare_table"
            >
              <div
                v-for="(item, i) in prepareTableArr"
                :key="i"
                class="active-box d-inline-block"
              >
                <el-checkbox :label="item.val">{{ item.name }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <nFileInfo :fileList="file_list_arr" :title="'已有文稿'" />
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="30" />
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
        personnel_develop_id: parseInt(
          this.Base64.decode(this.$route.query.id)
        ),
        pd_states: 6, //预备党员-资料已补全
      },
      prepareTableArr: [
        { name: "入党申请书", val: 128 },
        { name: "谈话记录表", val: 64 },
        { name: "党支部委员会会议记录", val: 32 },
        { name: "党支部党员大会会议记录", val: 16 },
        { name: "政治审查相关资料", val: 8 },
        { name: "入党积极分子培养考察表", val: 4 },
        { name: "入党志愿书", val: 2 },
        { name: "批准预党员转正通知书", val: 1 },
      ], //类目数组
      pd_prepare_table: [], //要上传的类目
      personnel_develop_id: parseInt(this.Base64.decode(this.$route.query.id)), //
      file_list_arr: [],
      infoData: {},
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    this.personnel_develop_id && (await this.queryUnionPartyPersonnelDevelop());
  },
  methods: {
    async queryUnionPartyPersonnelDevelop() {
      let res = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: this.personnel_develop_id,
      });
      if (res.result[0]) {
        this.file_list_arr = res.result[0].file_list;
        this.ruleform.pd_pic = res.result[0].pd_pic;
        this.infoData = res.result[0];
        this.$refs.file_upload.setFileList(res.result[0].file_list);
        var num = parseInt(res.result[0].pd_prepare_table, 2);
        !res.result[0].pd_prepare_table && (this.pd_prepare_table = []);
      }
      this.prepareTableArr.forEach((item) => {
        (item.val & num) != 0 && this.pd_prepare_table.push(item.val);
      });
    },
    // 确认提交
    async submitFun() {
      let file_obj = { uploadFileModule: "UnionPartyPersonnelDevelop" };
      this.ruleform.pd_file = await this.$refs.file_upload.submitFun(
        false,
        file_obj
      );
      if (this.pd_prepare_table.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择类目",
        });
        return;
      }
      if (this.ruleform.pd_file == "") {
        this.$tip({
          isTip: true,
          message: "请选择文稿",
        });
        return;
      }
      let number;
      this.pd_prepare_table.forEach((item, index) => {
        number = number | item;
      });
      this.ruleform.pd_prepare_table = number.toString(2);
      var num = 100;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      subdata.pd_account_id_un = this.personID;
      let res = await api.updateUnionPartyPersonnelDevelopStates(subdata);
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
.admin-config-box {
  ::v-deep .label-l {
    width: 80px;
  }
  .el-checkbox__label {
    color: $color-1;
  }
}
.active-box {
  width: 25%;
  margin-bottom: 10px;
}
</style>
