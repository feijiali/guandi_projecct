<template>
  <div class="h-100 w-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.approach_organ_id_un"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="维养类型：">
            <el-select
              v-model="ruleform.approach_maintenance_type"
              placeholder="请选择"
            >
              <el-option label="保养" :value="1"></el-option>
              <el-option label="维修" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small must" label="设备类型：">
            <el-select
              v-model="ruleform.approach_equip_type"
              placeholder="请选择"
              @change="QueryApproach"
            >
              <el-option label="普通设备" :value="1"></el-option>
              <el-option label="特种设备" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备名称：">
            <el-select
              v-model="ruleform.maintenance_approach_id_un"
              placeholder="请选择"
              @change="chengeEquip"
            >
              <el-option
                v-for="(item, index) in equipData"
                :key="index"
                :label="`${item.approach_name}-${item.approach_spec}`"
                :value="item.approach_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="规格型号：">
            <el-input
              readonly
              class="input-m"
              v-model="ruleform.approach_spec"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设备品牌：">
            <el-input
              readonly
              class="input-m"
              v-model="ruleform.approach_brand"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设备编号：">
            <el-input
              readonly
              class="input-m"
              v-model="ruleform.approach_no"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="维养内容：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.approach_maintenance_content"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="维养人：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.approach_maintenance_account"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, index) in HistoryName"
                :key="index"
                :label="item.approach_maintenance_account"
                :value="item.approach_maintenance_account"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="维养费用：">
            <num-input
              unit="元"
              :isString="true"
              v-model="ruleform.approach_maintenance_money"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="其他消耗费用：">
            <num-input
              unit="元"
              :isString="true"
              v-model="ruleform.approach_maintenance_other_money"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="维养日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_maintenance_start_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="结束维养日期："
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_maintenance_end_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            v-if="ruleform.approach_maintenance_type == 1"
            class="form-item-long-small must"
            label="下次保养时间："
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_maintenance_last_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long" label="附件照片：">
            <nPicUpload ref="pic_upload" />
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

export default {
  mixins: [confirm],
  data() {
    return {
      title: "新增设备维养",
      edit_id: null, //编辑的id
      equipData: [],
      HistoryName: [],
      ruleform: {
        approach_maintenance_id: null,
        approach_organ_id_un: null,
        approach_equip_type: null,
        approach_start_time: null,
        approach_maintenance_type: null,
        maintenance_approach_id_un: null,
        approach_spec: null,
        approach_no: null,
        approach_brand: null,
        approach_maintenance_money: null,
        approach_maintenance_other_money: null,
        approach_maintenance_content: null,
        approach_maintenance_account: null,
        approach_maintenance_last_date: null,
        approach_maintenance_start_date: null,
        approach_maintenance_end_date: null,
      },
      rules: {
        approach_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        approach_maintenance_type: [
          {
            required: true,
            message: "请选择维养类型",
          },
        ],
        approach_equip_type: [
          {
            required: true,
            message: "请选择设备类型",
          },
        ],
        maintenance_approach_id_un: [
          {
            required: true,
            message: "请选择设备名称",
          },
        ],
        approach_maintenance_content: [
          {
            required: true,
            message: "请填写维养内容",
          },
        ],
        approach_maintenance_account: [
          {
            required: true,
            message: "请填写维养人",
          },
        ],
        approach_maintenance_money: [
          {
            required: true,
            message: "请填写维养费用",
          },
        ],
        approach_maintenance_start_date: [
          {
            required: true,
            message: "请选择维养日期",
          },
        ],
        approach_maintenance_end_date: [
          {
            required: true,
            message: "请选择结束维养日期",
          },
        ],
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  async created() {
    if (this.$route.query.id) {
      this.title = "编辑设备维养";
      this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
      await this.QueryDesc();
    }
    //关联进来
    if (this.$route.query.related_id) {
      this.ruleform.approach_maintenance_type = 1;
      this.QueryApproachRe(Number(this.$route.query.related_id));
    }
  },
  methods: {
    //获取历史输入
    async QueryHistoryName(val) {
      let { result } = await api.QueryApproachMaintenanceAccountName({
        organ_node: val,
      });
      this.HistoryName = result;
    },
    async QueryApproachRe(id) {
      let res = await api.QueryApproach({
        approach_id: id,
      });
      let info = res.result[0];
      this.ruleform.approach_organ_id_un = info.approach_organ_id_un;
      this.ruleform.approach_equip_type = info.approach_equip_type;
      await this.QueryApproach();
      this.ruleform.maintenance_approach_id_un = id;
      this.chengeEquip(id);
    },
    async QueryDesc() {
      let res = await api.QueryApproachMaintenanceDesc({
        approach_maintenance_id: this.edit_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      await this.QueryApproach();
      this.QueryHistoryName();
      this.ruleform.maintenance_approach_id_un =
        info.maintenance_approach_id_un;
      this.chengeEquip(info.maintenance_approach_id_un);
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    //获取型号规格
    chengeEquip(val) {
      let obj = this.equipData.find((item) => item.approach_id == val);
      let keyArr = ["approach_spec", "approach_no", "approach_brand"];
      keyArr.forEach((key) => (this.ruleform[key] = obj[key]));
      this.ruleform.approach_maintenance_history_date =
        obj.approach_maintain_time;
      this.ruleform.approach_start_time = obj.approach_start_time;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.approach_organ_id_un = node.tag;
      this.QueryHistoryName(node.tag);
      this.ruleform.approach_maintenance_account = "";
      this.QueryApproach();
    },
    //查询设备
    async QueryApproach() {
      if (
        this.ruleform.approach_organ_id_un &&
        this.ruleform.approach_equip_type
      ) {
        let { result } = await api.QueryApproachList({
          organ_node: this.ruleform.approach_organ_id_un,
          approach_equip_type: this.ruleform.approach_equip_type,
        });
        if (this.$route.query.related_id) {
          this.equipData = result;
        } else {
          let state = [6, 7, 9, 11, 12];
          this.equipData = result.filter(
            (item) => state.indexOf(item.approach_state) == -1
          );
        }

        this.ruleform.maintenance_approach_id_un = null;
        this.ruleform.approach_spec = null;
        this.ruleform.approach_brand = null;
        this.ruleform.approach_no = null;
      }
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (
        new Date(this.ruleform.approach_maintenance_start_date) <
        new Date(this.ruleform.approach_start_time)
      ) {
        this.$tip({
          isTip: true,
          message: "维养日期必须大于进场日期",
        });
        return;
      }
      if (
        new Date(this.ruleform.approach_maintenance_start_date) >
        new Date(this.ruleform.approach_maintenance_end_date)
      ) {
        this.$tip({
          isTip: true,
          message: "维养日期不能大于结束维养日期",
        });
        return;
      }
      if (this.ruleform.approach_maintenance_type == 1) {
        if (!this.ruleform.approach_maintenance_last_date) {
          this.$tip({
            isTip: true,
            message: "请选择下次保养时间!",
          });
          return;
        }
        if (
          new Date(this.ruleform.approach_maintenance_end_date) >
          new Date(this.ruleform.approach_maintenance_last_date)
        ) {
          this.$tip({
            isTip: true,
            message: "结束维养日期不能大于下次保养时间",
          });
          return;
        }
      }

      let file_obj = { uploadFileModule: "ApproachMaintenance" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.approach_maintenance_pic = picsjson.file;
      this.ruleform.approach_maintenance_file = filejson.file;
      this.ruleform.approach_maintenance_pic_json = picsjson.file_json;
      this.ruleform.approach_maintenance_file_json = filejson.file_json;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      await api[
        `${
          this.edit_id
            ? "UpdateApproachMaintenance"
            : "UploadApproachMaintenance"
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
// 拾取经纬度
.lnglat-dialog {
  .lonlat-text {
    min-width: 140px;
    height: 40px;
  }
  .v-map {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    position: relative;
    #lnglat {
      min-height: 500px;
    }
    .map-box {
      bottom: 20px;
      right: calc(50% - 80px);
      z-index: 999;
      .map-text {
        width: 190px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .ant-modal-body {
    padding-right: 0;
    padding-left: 0;
  }
}
.v-map {
  width: 100%;
  height: 400px;
}
</style>
