<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog1"
      :diaTit="'选择审批人员'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.approval_account_id_union"
          @choosePersonFun="
            (val) => choosePersonFun(val, 1, 'approval_account_id_union')
          "
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog2"
      :diaTit="'选择记录人员'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.account_id_union"
          @choosePersonFun="
            (val) => choosePersonFun(val, 2, 'account_id_union')
          "
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
              v-model="ruleform.position_organ_id_union"
              placeholder="请选择"
              @change="changeOrganId"
            >
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="单位工程：">
            <el-select
              v-model="ruleform.process_inspection_project_type"
              @change="changeProj"
              placeholder="请选择"
            >
              <el-option label="隧道" :value="1"></el-option>
              <el-option label="桥梁" :value="2"></el-option>
              <el-option label="其他" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            v-if="
              ruleform.process_inspection_project_type == 1 &&
              ruleform.position_organ_id_union
            "
            label="工程名称："
          >
            <el-select
              v-model="ruleform.process_inspection_project_name"
              @change="changeTunnel"
              placeholder="请选择"
            >
              <el-option
                v-for="item in TunnelArr"
                :key="item.unit_proj_id"
                :label="item.unit_proj_name"
                :value="item.unit_proj_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            v-if="
              ruleform.process_inspection_project_type == 2 &&
              ruleform.position_organ_id_union
            "
            label="工程名称："
          >
            <el-select
              @focus="focusFun"
              v-model="ruleform.inspection_project_name"
              @change="changeBridge"
              placeholder="请选择"
            >
              <el-option
                v-for="item in BridgeArr"
                :key="item.sub_unit_id"
                :label="item.sub_unit_name"
                :value="item.sub_unit_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <template
            v-if="
              ruleform.position_organ_id_union &&
              (ruleform.process_inspection_project_type == 1 ||
                ruleform.process_inspection_project_type == 2)
            "
          >
            <el-form-item class="form-item-long-small must" label="桩号范围：">
              <span>{{
                ruleform.process_inspection_project_pile_range
                  ? ruleform.process_inspection_project_pile_range
                  : "系统返回"
              }}</span>
            </el-form-item>
            <el-form-item
              class="form-item-long-small d-inline-block must"
              v-if="
                ruleform.process_inspection_project_type == 1 ||
                ruleform.process_inspection_project_type == 2
              "
              label="里程桩号："
            >
              <el-input
                style="width: 80px !important"
                placeholder="系统返回"
                readonly
                v-model="ruleform.process_inspection_project_prefix"
              ></el-input>
              <div
                class="stake-no-input d-inline-block ml-1"
                style="width: calc(100% - 90px)"
              >
                <el-input
                  placeholder="请输入"
                  class="input-m"
                  v-model="ruleform.process_inspection_project_pile"
                ></el-input>
              </div>
            </el-form-item>
          </template>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="检查时间："
          >
            <el-date-picker
              :clearable="false"
              ref="datePicker"
              class="el-date-editor-m"
              v-model="ruleform.process_inspection_check_time"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              type="datetime"
              placeholder="请选择"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long d-inline-block must"
            label="检查描述："
          >
            <el-input
              class="input-m"
              v-model="ruleform.process_inspection_content"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="所在位置："
          >
            <el-input
              class="input-m"
              v-model="ruleform.process_inspection_submit_location"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="备注：">
            <el-input
              v-model="ruleform.process_inspection_remark"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long must" label="质量情况：">
            <el-radio-group v-model="ruleform.process_inspection_state">
              <el-radio :label="1">质量合格</el-radio>
              <el-radio :label="2">质量不合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long must" label="是否为隐蔽工程：">
            <el-radio-group
              v-model="ruleform.process_inspection_is_hide"
              class="el-radio-group-home vtt"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="审批人："
          >
            <el-input
              class="el-input-person"
              placeholder="请选择"
              v-model="approval_name"
              readonly
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer(1)"
            >
              +
            </div>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block"
            label="记录人："
          >
            <el-input
              placeholder="请选择"
              v-model="approval_name2"
              readonly
            ></el-input>
            <!-- <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer(2)"
            >
              +
            </div> -->
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
        process_inspection_check_time: this.$utils.parseDate2Str(
          new Date(),
          "YYYY-MM-DD HH:mm"
        ),
        process_inspection_id: null,
        process_inspection_project_pile: "",
        process_inspection_project_type: null,
        process_inspection_project_id: null,
        process_inspection_project_name: "",
        process_inspection_project_pile_range: "",
        process_inspection_project_pile: "",
        process_inspection_project_prefix: "",
        process_inspection_content: "",
        position_organ_id_union: null,
        process_inspection_state: 1,
        process_inspection_is_hide: 1,
        process_inspection_remark: "",
        process_inspection_pic: "",
        approval_account_id_union: null,
        process_inspection_submit_location: "",
      },
      title: "新增隐蔽工程验收",
      TunnelArr: [], //隧道数组
      BridgeArr: [], //桥梁数组
      organArr: [], //工区数组
      formValidation: [
        {
          must: [
            "position_organ_id_union",
            "process_inspection_project_type",
            "process_inspection_content",
            "process_inspection_submit_location",
            "process_inspection_state",
            "process_inspection_is_hide",
            "approval_account_id_union",
          ],
          tip: [
            "请选择所属工区",
            "请选择单位工程",
            "请输入检查描述",
            "请输入所在位置",
            "请选择质量情况",
            "请选择是否为隐蔽工程",
            "请选择审批人",
          ],
        },
      ],
      approval_name: "", //审批人名字
      approval_name2: "", //记录人名字
      type: this.$route.query.type, //编辑的id
      process_inspection_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    this.process_inspection_id && this.queryQualityProcessInspectionInfo();
    this.process_inspection_id && (this.title = "编辑隐蔽工程验收");
    if (this.type == 1) {
      await this.queryQualityProcessInspectionInfo();
    } else {
      // this.approval_name = this.$store.getters.userName;
      // this.ruleform.approval_account_id_union = Number(
      //   this.$store.getters.account_id
      // );
      this.approval_name2 = this.$store.getters.userName;
      this.ruleform.account_id_union = Number(this.$store.getters.account_id);
    }
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
    //查询隧道
    async queryTunnelUnitAndSubUnit() {
      let data = await api.queryTunnelUnitAndSubUnit({
        page: -1,
        organ_node: this.ruleform.position_organ_id_union,
      });
      this.TunnelArr = data.result;
    },
    async queryBridgeSubUnit() {
      let data = await api.queryBridgeSubUnit({
        page: -1,
        organ_node: this.ruleform.position_organ_id_union,
      });
      this.BridgeArr = data.result;
    },
    // 选择所属工区
    async changeOrganId(val) {
      this.ruleform.process_inspection_project_pile = "";
      this.ruleform.process_inspection_project_name = "";
      this.ruleform.process_inspection_project_prefix = "";
      this.ruleform.process_inspection_project_pile_range = "";
      this.ruleform.process_inspection_project_type == 1 &&
        (await this.queryTunnelUnitAndSubUnit());
      this.ruleform.process_inspection_project_type == 2 &&
        (await this.queryBridgeSubUnit());
    },
    //选择单位工程筛选隧道名称或者桥梁名称
    async changeProj(val) {
      this.ruleform.process_inspection_project_type = val;
      this.ruleform.process_inspection_project_pile = "";
      this.ruleform.process_inspection_project_name = "";
      this.ruleform.process_inspection_project_prefix = "";
      this.ruleform.process_inspection_project_pile_range = "";

      val == 1 && (await this.queryTunnelUnitAndSubUnit());
      val == 2 && (await this.queryBridgeSubUnit());
    },
    // 获得焦点
    focusFun() {
      if (!this.ruleform.position_organ_id_union) {
        this.$tip({
          isTip: true,
          message: "请先选择工区！",
        });
        return;
      }
    },
    //获取隧道的桩号范围
    async changeTunnel(data) {
      let ind = this.TunnelArr.findIndex((item) => item.unit_proj_name == data);
      this.ruleform.process_inspection_project_pile_range =
        this.TunnelArr[ind].unit_proj_pile_prefix +
        this.TunnelArr[ind].unit_proj_pile_start_string +
        "—" +
        this.TunnelArr[ind].unit_proj_pile_prefix +
        this.TunnelArr[ind].unit_proj_pile_end_string;
      this.ruleform.process_inspection_project_prefix =
        this.TunnelArr[ind].unit_proj_pile_prefix;
    },
    //获取桥梁的桩号范围
    async changeBridge(data) {
      let ind = this.BridgeArr.findIndex((item) => item.sub_unit_name == data);
      this.Mileage =
        this.BridgeArr[ind].unit_proj_pile_prefix +
        this.BridgeArr[ind].unit_proj_pile_start_string +
        "—" +
        this.BridgeArr[ind].unit_proj_pile_prefix +
        this.BridgeArr[ind].unit_proj_pile_end_string;
      this.ruleform.inspection_project_pile_prefix =
        this.BridgeArr[ind].unit_proj_pile_prefix;
    },
    // 点击选择审批人
    showTargerAddLayer(t) {
      this.$refs["dialog" + t].show();
    },
    //选择巡检人
    async choosePersonFun(data, t, name) {
      this.ruleform[name] = data;
      let { result } = await this.queryAccount(this.ruleform[name]);
      this[t == 1 ? "approval_name" : "approval_name2"] =
        result[0].account_name;
      this.$refs["dialog" + t].cancel();
    },
    // 查询人员
    async queryAccount(id) {
      let data = await api.queryAccount({
        account_id: id,
      });
      return data;
    },
    async queryQualityProcessInspectionInfo() {
      let params = {};
      if (this.type == 1) {
        params = {
          organ_node: this.$organ_id_en_or_pro(this),
          account_id_union: Number(this.$store.getters.account_id),
          page: 0,
          page_size: 1,
        };
      } else {
        params = {
          process_inspection_ids: this.process_inspection_id + "",
        };
      }
      let data = await api.queryQualityProcessInspectionInfo(params);
      if (!data.result.length) {
        this.$tip({
          isTip: true,
          message: "无填写记录，请重新填写！",
        });
        this.approval_name2 = this.$store.getters.userName;
        this.ruleform.account_id_union = Number(this.$store.getters.account_id);
        return;
      }
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.ruleform.process_inspection_project_type == 1 &&
        (await this.queryTunnelUnitAndSubUnit());
      this.ruleform.process_inspection_project_type == 2 &&
        (await this.queryBridgeSubUnit());
      this.ruleform.process_inspection_project_type == 1 &&
        this.changeTunnel(this.ruleform.process_inspection_project_name);
      this.ruleform.process_inspection_project_type == 2 &&
        this.changeBridge(this.ruleform.process_inspection_project_name);
      this.approval_name = info.daily_inspection_approval_account_name;
      this.$refs.pic_upload.setPicList(info.pic_list);
    },
    // 确认提交
    async submitFun() {
      if (
        this.ruleform.process_inspection_project_type == 1 ||
        this.ruleform.process_inspection_project_type == 2
      ) {
        if (this.ruleform.process_inspection_project_name == "") {
          this.$tip({
            isTip: true,
            message: "请选择工程名称",
          });
          return;
        }
        if (
          this.ruleform.process_inspection_project_prefix == "" ||
          this.ruleform.process_inspection_project_pile == ""
        ) {
          this.$tip({
            isTip: true,
            message: "请输入里程桩号",
          });
          return;
        }
      }
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let file_obj = { uploadFileModule: "QualityProcessInspection" };
        let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
        this.ruleform.process_inspection_pic = picsjson.file;
        this.ruleform.process_inspection_pic_json = picsjson.file_json;
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${
          this.process_inspection_id
            ? "updateQualityProcessInspection"
            : "uploadQualityProcessInspection"
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
