<template>
  <div class="h-100 w-100 table-list-wrap">
    <n-dialog
      ref="dialog1"
      :diaTit="'负责人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :section="$store.getters.organID"
          :personID="ruleform.approach_charge_account_id_un"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <v-map ref="dialog2" @getAddress="getAddress" />
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long must" label="设备类型：">
            <el-radio-group
              v-model="ruleform.approach_equip_type"
              @change="changeType"
              class="el-radio-group-home vertical-top"
            >
              <el-radio :label="1">普通设备</el-radio>
              <el-radio :label="2">特种设备</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val, 1)"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.approach_organ_id_un"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备名称：">
            <el-select
              v-if="!lease_id"
              filterable
              allow-create
              v-model="ruleform.approach_name"
              @change="changeName"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, index) in HistoryName"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              v-else
              v-model="ruleform.lease_index"
              placeholder="请选择"
              @change="getSpec"
            >
              <el-option
                v-for="(item, i) in LeaseArr"
                :key="item.lease_detail_id"
                :label="`${item.lease_detail_name}(${item.lease_detail_spec})`"
                :value="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设备品牌：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.approach_brand"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, index) in HistoryBound"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="租赁单位：">
            <el-select
              filterable
              v-model="ruleform.approach_supply_unit_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in supplier"
                :key="item.supply_unit_id"
                :label="item.supply_unit"
                :value="item.supply_unit_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设备型号：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.approach_spec"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, index) in HistorySpec"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="负责人：">
            <el-input
              placeholder="请输入"
              class="el-input-person"
              readonly
              v-model="ruleform.account_name"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-2"
              @click.stop="showTargerAddLayer(1)"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="进场时间：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_start_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="下次保养时间："
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_maintain_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="设备编号：">
            <el-input
              placeholder="请输入唯一设备编号"
              v-model="ruleform.approach_no"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备地址：">
            <el-input
              placeholder="请选择"
              readonly
              class="el-input-person"
              v-model="ruleform.approach_location"
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-2"
              @click.stop="showTargerAddLayer(2)"
            >
              +
            </div>
          </el-form-item>
          <br />

          <el-form-item class="form-item-long must" label="租用方式：">
            <el-select
              :disabled="readonly"
              v-model="ruleform.approach_lease_type"
              placeholder="请选择"
              @change="changeType"
            >
              <el-option label="日" :value="1"></el-option>
              <el-option label="月" :value="2"></el-option>
              <el-option label="季" :value="3"></el-option>
              <el-option label="年" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long must" label="租用时间段：">
            <el-date-picker
              v-if="
                ruleform.approach_lease_type == 1 ||
                ruleform.approach_lease_type == 2
              "
              @change="getTime"
              class="el-date-picker-range-box"
              v-model="dateRange"
              :type="
                ['', 'daterange', 'monthrange'][ruleform.approach_lease_type]
              "
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div v-if="ruleform.approach_lease_type == 3">
              <el-select
                @change="getMoney"
                :disabled="readonly"
                v-model="ruleform.approach_lease_start_date"
                placeholder="请选择"
              >
                <el-option
                  label="第一季度"
                  :value="year + '-01-01'"
                ></el-option>
                <el-option
                  label="第二季度"
                  :value="year + '-04-01'"
                ></el-option>
                <el-option
                  label="第三季度"
                  :value="year + '-07-01'"
                ></el-option>
                <el-option
                  label="第四季度"
                  :value="year + '-10-01'"
                ></el-option>
              </el-select>
              <span class="mx-2">-</span>
              <el-select
                @change="getMoney"
                :disabled="readonly"
                v-model="ruleform.approach_lease_end_date"
                placeholder="请选择"
              >
                <el-option
                  label="第一季度"
                  :value="year + '-03-31'"
                ></el-option>
                <el-option
                  label="第二季度"
                  :value="year + '-06-30'"
                ></el-option>
                <el-option
                  label="第三季度"
                  :value="year + '-09-30'"
                ></el-option>
                <el-option
                  label="第四季度"
                  :value="year + '-12-31'"
                ></el-option>
              </el-select>
            </div>
            <div v-if="ruleform.approach_lease_type == 4">
              <el-date-picker
                :readonly="readonly"
                v-model="ruleform.approach_lease_start_date"
                @change="getMoney"
                type="year"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              <span class="mx-1">-</span>
              <el-date-picker
                :readonly="readonly"
                v-model="ruleform.approach_lease_end_date"
                @change="getMoney"
                type="year"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="form-item-long must" label="租用单价：">
            <num-input
              unit="元"
              :isString="true"
              :readonly="readonly"
              v-model="ruleform.approach_lease_price"
              @change="getMoney"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="租用总金额：">
            <div class="lineheight">{{ ruleform.approach_lease_money }}元</div>
          </el-form-item>
          <el-form-item class="form-item-long must" label="附件照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              v-model="ruleform.approach_remark"
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
import vMap from "./components/Map";
import confirm from "@/mixins/confirm";
export default {
  components: {
    vMap,
  },
  mixins: [confirm],
  data() {
    return {
      title: "新增租赁设备信息",
      edit_id: null, //编辑的id
      dateRange: [],
      personListAll: [], //查询所有人
      supplier: [],
      LeaseArr: [],
      HistoryArr: [],
      HistoryName: [],
      HistoryBound: [],
      HistorySpec: [],
      lease_id: null,
      readonly: false,
      year: this.$utils.getCurrentTime("", "year"),
      ruleform: {
        approach_id: null,
        approach_type: 2,
        approach_equip_type: 1,
        approach_is_allocation: 0,
        approach_organ_id_un: null,
        lease_index: null,
        approach_lease_num: null,
        approach_state: null,
        approach_charge_account_id_un: null,
        approach_start_time: this.$utils.getCurrentTime(),
        approach_maintain_time: null,
        approach_remark: null,
        account_name: null,
        approach_no: null,
        approach_lat: null,
        approach_lng: null,
        approach_location: null,
        approach_name: null,
        approach_brand: null,
        approach_supply_unit_id_un: null,
        approach_spec: null,
        approach_lease_type: 1,
        approach_lease_start_date: null,
        approach_lease_end_date: null,
        approach_lease_price: null,
        approach_lease_money: "0.00",
      },
      rules: {
        approach_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        approach_name: [
          {
            required: true,
            message: "请填写设备名称",
          },
        ],
        approach_charge_account_id_un: [
          {
            required: true,
            message: "请选择负责人",
          },
        ],
        approach_maintain_time: [
          {
            required: true,
            message: "请选择下次保养时间",
          },
        ],
        approach_location: [
          {
            required: true,
            message: "请选择设备地址",
          },
        ],
        approach_lease_price: [
          {
            required: true,
            message: "请填写租用单价",
          },
        ],
        approach_lease_start_date: [
          {
            required: true,
            message: "请选择租用时间",
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
    this.QuerySupplier();
    if (this.$route.query.id) {
      this.title = "编辑租赁设备信息";
      this.readonly = true;
      this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
      await this.QueryApproach();
    }
    //租赁单关联
    if (this.$route.query.lease_id) {
      this.lease_id = parseInt(this.$route.query.lease_id);
      await this.QueryLease(this.lease_id);
    }
  },
  methods: {
    changeName(val) {
      let obj = this.HistoryArr.find((item) => item.approach_name == val);
      this.ruleform.approach_brand = obj.approach_brand;
      this.ruleform.approach_spec = obj.approach_spec;
    },
    //获取历史输入
    async QueryHistoryName() {
      let { result } = await api.QueryApproachHistoryInfo({
        organ_node: this.ruleform.approach_organ_id_un,
        approach_type: 1,
        approach_equip_type: this.ruleform.approach_equip_type,
      });
      this.HistoryArr = result;
      this.HistoryName = result.map((item) => item.approach_name);
      this.HistoryBound = result.map((item) => item.approach_brand);
      this.HistorySpec = result.map((item) => item.approach_spec);
      this.HistoryName = this.unique(this.HistoryName);
      this.HistoryBound = this.unique(this.HistoryBound).filter((item) => item);
      this.HistorySpec = this.unique(this.HistorySpec).filter((item) => item);
      this.HistoryBound = this.unique(this.HistoryBound).filter((item) => item);
    },
    //去重
    unique(arr) {
      return Array.from(new Set(arr));
    },
    //获取供应商
    async QuerySupplier() {
      let res = await api.queryMaterialManagementSupplyUnitList({
        organ_node: this.$organ_id_en_or_pro(this),
        supply_unit_type: 200,
      });
      this.supplier = res.result;
    },
    //计算总价
    getMoney() {
      if (
        this.ruleform.approach_lease_start_date &&
        this.ruleform.approach_lease_end_date &&
        this.ruleform.approach_lease_price
      ) {
        let startTime = new Date(this.ruleform.approach_lease_start_date);
        let endTime = new Date(this.ruleform.approach_lease_end_date);
        let howDay = (endTime - startTime) / 1000 / 60 / 60 / 24; //计算多少天
        //根据方式计算金额
        let num = [0, 1, 30, 90, 365][this.ruleform.approach_lease_type];
        this.ruleform.approach_lease_num = Math.round(howDay / num);
        this.ruleform.approach_lease_money = (
          this.ruleform.approach_lease_price * this.ruleform.approach_lease_num
        ).toFixed(2);
      }
    },
    //改变租用方式清空
    changeType() {
      this.ruleform.approach_lease_start_date = null;
      this.ruleform.approach_lease_end_date = null;
      this.ruleform.approach_lease_price = "";
      this.ruleform.approach_lease_money = "";
      this.dateRange = [];
    },
    //获取时间
    getTime() {
      this.ruleform.approach_lease_start_date = this.dateRange[0];
      this.ruleform.approach_lease_end_date = this.dateRange[1];
      this.getMoney();
    },
    //购置单关联
    async QueryLease(id) {
      let res = await api.QueryLease({
        lease_id: id,
      });
      let info = res.result[0];
      this.ruleform.approach_equip_type = info.lease_type;
      this.ruleform.approach_organ_id_un = info.lease_organ_id_un;
      this.LeaseArr = info.lease_details;
      this.ruleform.lease_index = 0;
      this.getSpec(0);
    },
    //获取规格型号
    getSpec(val) {
      this.ruleform.approach_name = this.LeaseArr[val].lease_detail_name;
      this.ruleform.approach_brand = this.LeaseArr[val].lease_detail_bound;
      this.ruleform.approach_spec = this.LeaseArr[val].lease_detail_spec;
    },
    getAddress(data) {
      Object.assign(this.ruleform, data);
    },
    // 点击选择考核对象
    showTargerAddLayer(type) {
      this.$refs["dialog" + type].show();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data) {
      this.ruleform.approach_charge_account_id_un = data;
      await this.queryAccount({ account_ids: String(data) });
      this.$refs.dialog1.cancel();
      let person = this.personListAll.filter((item) => {
        return data == item.account_id;
      });
      this.$set(this.ruleform, "account_name", person[0].account_name);
    },
    // 查询人员
    async queryAccount(obj) {
      let data = await api.queryAccount(obj);
      this.personListAll = data.result;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.approach_organ_id_un = node.tag;
      this.ruleform.approach_name = "";
      this.ruleform.approach_brand = "";
      this.ruleform.approach_spec = "";
      this.QueryHistoryName();
    },
    changeType() {
      this.ruleform.approach_name = "";
      this.ruleform.approach_brand = "";
      this.ruleform.approach_spec = "";
      this.QueryHistoryName();
    },
    async QueryApproach() {
      let res = await api.QueryApproach({
        approach_id: this.edit_id,
      });
      let info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.QueryHistoryName();

      this.$set(this.dateRange, 0, info.approach_lease_start_date);
      this.$set(this.dateRange, 1, info.approach_lease_end_date);
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.$refs.pic_upload.picList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请上传图片",
        });
        return;
      }
      let startTime = new Date(this.ruleform.approach_lease_start_date);
      let endTime = new Date(this.ruleform.approach_lease_end_date);
      if (startTime - endTime > 0) {
        this.$tip({
          isTip: true,
          message: "开始日期不能大于结束日期",
        });
        return;
      }
      let file_obj = { uploadFileModule: "Approach" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.approach_pic = picsjson.file;
      this.ruleform.approach_file = filejson.file;
      this.ruleform.approach_pic_json = picsjson.file_json;
      this.ruleform.approach_file_json = filejson.file_json;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${this.edit_id ? "UpdateApproach" : "UploadApproach"}`
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
.lineheight {
  line-height: 40px;
}
// 拾取经纬度
</style>
