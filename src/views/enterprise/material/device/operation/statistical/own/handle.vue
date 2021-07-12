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
              class="el-radio-group-home vertical-top"
              @change="changeType"
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
              v-if="!apply_id"
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
              v-model="ruleform.approach_index"
              placeholder="请选择"
              @change="getSpec"
            >
              <el-option
                v-for="(item, i) in appplyArr"
                :key="item.apply_detail_id"
                :label="`${item.apply_detail_name}(${item.apply_detail_spec})`"
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
          <el-form-item class="form-item-long-small" label="设备厂家：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.approach_factory"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="(item, index) in HistoryFactory"
                :key="index"
                :label="item"
                :value="item"
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
              placeholder="请选择"
              readonly
              class="el-input-person"
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
          <el-form-item class="form-item-long-small must" label="设备编号：">
            <el-input
              placeholder="请输入唯一设备编号"
              v-model="ruleform.approach_no"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small"
            label="设备识别号码/出厂编码："
          >
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.approach_imei"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="设备地址：">
            <el-input
              placeholder="请选择"
              class="el-input-person"
              readonly
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

          <el-form-item class="form-item-long-small" label="出厂日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_manufacture_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="使用功率：">
            <num-input
              unit="HZ"
              :isString="true"
              v-model="ruleform.approach_power"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="购买时间：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.approach_buy_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="购买原值：">
            <num-input
              :readonly="readonly"
              unit="元"
              :isString="true"
              v-model="ruleform.approach_money"
              @change="getCompute"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="供方单位：">
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
          <el-form-item class="form-item-long-small" label="我方单位：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val, 2)"
              :treeData="treeData1"
              :Isvalue="true"
              :value="ruleform.approach_initiate_organ_id_un"
            />
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="开始折旧时间："
          >
            <el-date-picker
              :readonly="readonly"
              :clearable="false"
              v-model="ruleform.approach_depreciation_date"
              @change="computeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="折旧月：">
            <num-input
              :readonly="readonly"
              unit="月"
              v-model="ruleform.approach_depreciation_total_month"
              @change="getCompute"
            ></num-input>
          </el-form-item>
          <br />
          <el-form-item
            class="form-item-long-small1 must quarter"
            label="预计净残值："
          >
            <div
              class="lineheight"
              v-if="ruleform.approach_depreciation_residual"
            >
              {{ ruleform.approach_depreciation_residual }}元
            </div>
            <div class="lineheight grey2" v-else>自动计算</div>
          </el-form-item>
          <el-form-item
            class="form-item-long-small1 must quarter"
            label="本月折旧金额："
          >
            <div
              class="lineheight"
              v-if="ruleform.approach_depreciation_month_res"
            >
              {{ ruleform.approach_depreciation_month_res }}元
            </div>
            <div class="lineheight grey2" v-else>自动计算</div>
          </el-form-item>
          <el-form-item
            class="form-item-long-small1 must quarter"
            label="累计折旧金额："
          >
            <div
              class="lineheight"
              v-if="ruleform.approach_depreciation_total_res"
            >
              {{ ruleform.approach_depreciation_total_res }}元
            </div>
            <div class="lineheight grey2" v-else>自动计算</div>
          </el-form-item>
          <el-form-item
            class="form-item-long-small1 must quarter"
            label="净值："
          >
            <div class="lineheight" v-if="ruleform.approach_depreciation_money">
              {{ ruleform.approach_depreciation_money }}元
            </div>
            <div class="lineheight grey2" v-else>自动计算</div>
          </el-form-item>
          <el-form-item class="form-item-long must" label="附件照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <el-form-item class="form-item-long-small" label="备注：">
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
      title: "新增自有设备信息",
      edit_id: null, //编辑的id
      readonly: false,
      supplier: [],
      apply_id: null, //购置单进场判断
      appplyArr: [],
      HistoryArr: [],
      HistoryName: [],
      HistoryFactory: [],
      HistoryBound: [],
      HistorySpec: [],
      personListAll: [], //查询所有人
      ruleform: {
        approach_id: null,
        approach_type: 1,
        approach_equip_type: 1,
        approach_index: null,
        approach_is_allocation: 0,
        approach_organ_id_un: null,
        approach_state: null,
        approach_charge_account_id_un: null,
        approach_start_time: this.$utils.getCurrentTime(),
        approach_maintain_time: null,
        approach_remark: null,
        approach_supply_unit_id_un: null,
        approach_initiate_organ_id_un: null,
        approach_imei: null,
        approach_no: null,
        approach_lat: null,
        approach_lng: null,
        approach_location: null,
        approach_name: null,
        approach_brand: null,
        approach_factory: null,
        approach_spec: null,
        account_name: null,
        approach_buy_date: null,
        approach_manufacture_date: null,
        approach_power: null,
        approach_money: null,
        approach_depreciation_date: this.$utils.getCurrentTime(),
        approach_depreciation_total_month: null,
        approach_depreciation_month: 0,
        approach_depreciation_total_month: null,
        approach_depreciation_total_month: null,
        approach_depreciation_residual: null,
        approach_depreciation_money: null,
        approach_depreciation_month_res: null,
        approach_depreciation_total_res: null,
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
        approach_no: [
          {
            required: true,
            message: "请填写设备编号",
          },
        ],
        approach_maintain_time: [
          {
            required: true,
            message: "请选择下次保养时间",
          },
        ],
        approach_lat: [
          {
            required: true,
            message: "请选择设备地址",
          },
        ],
        approach_money: [
          {
            required: true,
            message: "请填写购买原值",
          },
        ],
        approach_depreciation_total_month: [
          {
            required: true,
            message: "请填写折旧月",
          },
        ],
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
    treeData1() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    await this.QuerySupplier();
    if (this.$route.query.id) {
      this.title = "编辑自有设备信息";
      this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
      this.readonly = true;
      await this.QueryApproach();
    }
    //自制单关联
    if (this.$route.query.made_id) {
      let made_id = parseInt(this.$route.query.made_id);
      await this.QuerySelfMade(made_id);
    }
    //购置单关联
    if (this.$route.query.apply_id) {
      this.apply_id = parseInt(this.$route.query.apply_id);
      await this.QueryApply(this.apply_id);
    }
  },
  methods: {
    //获取品牌厂家
    changeName(val) {
      let obj = this.HistoryArr.find((item) => item.approach_name == val);
      this.ruleform.approach_factory = obj.approach_factory;
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
      this.HistoryFactory = result.map((item) => item.approach_factory);
      this.HistoryBound = result.map((item) => item.approach_brand);
      this.HistorySpec = result.map((item) => item.approach_spec);
      this.HistoryName = this.unique(this.HistoryName);
      this.HistoryFactory = this.unique(this.HistoryFactory).filter(
        (item) => item
      );
      this.HistoryBound = this.unique(this.HistoryBound).filter((item) => item);
      this.HistorySpec = this.unique(this.HistorySpec).filter((item) => item);
    },
    //去重
    unique(arr) {
      return Array.from(new Set(arr));
    },
    //计算折旧月
    computeDate(val) {
      let differ = (new Date() - new Date(val)) / 1000 / 60 / 60 / 24;
      this.ruleform.approach_depreciation_month = Math.round(differ / 30);
      this.getCompute();
    },
    //金额相关计算
    getCompute() {
      if (
        this.ruleform.approach_money &&
        this.ruleform.approach_depreciation_total_month
      ) {
        this.ruleform.approach_depreciation_residual = (
          this.ruleform.approach_money * 0.05
        ).toFixed(2);
        let month_res = (
          (this.ruleform.approach_money * 0.95) /
          this.ruleform.approach_depreciation_total_month
        ).toFixed(2);
        this.ruleform.approach_depreciation_month_res = month_res;
        let total_res = (
          month_res * this.ruleform.approach_depreciation_month
        ).toFixed(2);
        this.ruleform.approach_depreciation_total_res = total_res;
        let depreciation_money = (
          this.ruleform.approach_money - total_res
        ).toFixed(2);
        this.ruleform.approach_depreciation_money =
          depreciation_money > 0 ? depreciation_money : "0.00";
      }
    },
    //购置单关联
    async QueryApply(id) {
      let res = await api.QueryApply({
        apply_id: id,
      });
      let info = res.result[0];
      this.ruleform.approach_equip_type = info.apply_type;
      this.ruleform.approach_organ_id_un = info.apply_organ_id_un;
      this.ruleform.approach_supply_unit_id_un = info.apply_supply_unit_id_un;
      this.appplyArr = info.apply_details;
      this.ruleform.approach_index = 0;
      this.getSpec(0);
    },
    //获取规格型号
    getSpec(val) {
      this.ruleform.approach_name = this.appplyArr[val].apply_detail_name;
      this.ruleform.approach_brand = this.appplyArr[val].apply_detail_bound;
      this.ruleform.approach_spec = this.appplyArr[val].apply_detail_spec;
    },
    // 自制单关联
    async QuerySelfMade(id) {
      let res = await api.QuerySelfMade({
        self_made_id: id,
      });
      let info = res.result[0];
      this.ruleform.approach_organ_id_un = info.self_made_organ_id_un;
      this.ruleform.approach_name = info.self_made_name;
      this.ruleform.approach_spec = info.self_made_spec;
      this.ruleform.approach_no = info.self_made_imei;
      this.ruleform.approach_money = info.self_made_money;
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
    getSelectValue(node, type) {
      if (type == 1) {
        this.ruleform.approach_organ_id_un = node.tag;
        this.ruleform.approach_name = "";
        this.ruleform.approach_brand = "";
        this.ruleform.approach_factory = "";
        this.ruleform.approach_spec = "";
        this.QueryHistoryName();
      } else {
        this.ruleform.approach_initiate_organ_id_un = node.tag;
      }
    },
    changeType() {
      this.ruleform.approach_name = "";
      this.ruleform.approach_brand = "";
      this.ruleform.approach_factory = "";
      this.ruleform.approach_spec = "";
      this.QueryHistoryName();
    },
    //获取供应商
    async QuerySupplier() {
      let res = await api.queryMaterialManagementSupplyUnitList({
        organ_node: this.$organ_id_en_or_pro(this),
        supply_unit_type: 200,
      });
      this.supplier = res.result;
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
      this.ruleform.approach_supply_unit_id_un = info.approach_supply_unit_id_un
        ? approach_supply_unit_id_un
        : null;
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
      await api[`${this.edit_id ? "UpdateApproach" : "UploadApproach"}`](
        subdata
      );
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
.form-item-long-small1 {
  width: 24%;
}
.lineheight {
  line-height: 40px;
}
</style>
