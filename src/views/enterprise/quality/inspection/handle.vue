<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择巡检人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.daily_inspection_account_id_union"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog2"
      :diaTit="'选择抄送人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose2"
          class="single-choose-person"
          :isSingle="false"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog3"
      :diaTit="'选择整改人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose3"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.rec_union"
          @choosePersonFun="choosePersonFun3"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog4"
      :diaTit="'选择复检人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose4"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.return_union"
          @choosePersonFun="choosePersonFun4"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工区：">
            <el-select
              v-model="ruleform.organ_id_union"
              @change="changeOrganId"
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
          <el-form-item class="form-item-long-small must" label="单位工程：">
            <el-select
              v-model="ruleform.inspection_project_type"
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
              ruleform.inspection_project_type == 1 && ruleform.organ_id_union
            "
            label="工程名称："
          >
            <el-select
              @focus="focusFun"
              v-model="ruleform.inspection_project_name"
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
              ruleform.inspection_project_type == 2 && ruleform.organ_id_union
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
              ruleform.organ_id_union &&
              (ruleform.inspection_project_type == 1 ||
                ruleform.inspection_project_type == 2)
            "
          >
            <el-form-item class="form-item-long-small must" label="桩号范围：">
              <span>{{ Mileage ? Mileage : "系统返回" }}</span>
            </el-form-item>
            <el-form-item
              class="form-item-long-small d-inline-block must"
              v-if="
                ruleform.inspection_project_type == 1 ||
                ruleform.inspection_project_type == 2
              "
              label="里程桩号："
            >
              <el-input
                style="width: 80px !important"
                placeholder="系统返回"
                readonly
                v-model="ruleform.inspection_project_pile_prefix"
              ></el-input>
              <div
                class="stake-no-input d-inline-block ml-1"
                style="width: calc(100% - 90px)"
              >
                <el-input
                  placeholder="请输入"
                  class="input-m"
                  v-model="ruleform.inspection_project_pile"
                ></el-input>
              </div>
            </el-form-item>
          </template>

          <el-form-item class="form-item-long-small must" label="巡检主题：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.daily_inspection_title"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="巡检日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.daily_inspection_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="隐患类型：">
            <el-select v-model="ruleform.trouble_type" placeholder="请选择">
              <el-option label="无" :value="1"></el-option>
              <el-option label="一般隐患" :value="2"></el-option>
              <el-option label="较大隐患" :value="3"></el-option>
              <el-option label="重大隐患" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="巡检地点："
          >
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.daily_inspection_position"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="巡检人："
          >
            <el-input
              class="el-input-person"
              placeholder="请选择"
              v-model="account_name"
              readonly
            ></el-input>
            <div
              class="d-inline-block add-circle-btn ml-1"
              @click="showTargerAddLayer"
            >
              +
            </div>
          </el-form-item>
          <el-form-item class="form-item-long must" label="巡检内容：">
            <el-input
              v-model="ruleform.daily_inspection_content"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="巡检备注：">
            <el-input
              v-model="ruleform.daily_inspection_remark"
              type="textarea"
              placeholder="请输入"
              rows="6"
              class="el-textarea-box-long"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否为风险源："
            class="form-item-long-small must"
          >
            <el-radio-group
              class="radio-box"
              v-model="ruleform.daily_inspection_danger_area"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="巡检结果："
            class="form-item-long d-inline-block must"
          >
            <el-radio-group
              class="radio-box"
              v-model="ruleform.daily_inspection_result"
              @change="changeRuslt"
            >
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">口头警告</el-radio>
              <el-radio :label="3">排查整改</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            class="form-item-long"
            :class="{
              must:
                ruleform.daily_inspection_result == 2 ||
                ruleform.daily_inspection_result == 3,
            }"
            label="抄送人："
          >
            <nAddItemContent @addFun="addPersons">
              <template slot="content-add">
                <div
                  class="content-item"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  <span>{{ item.account_name }}</span>
                  <i
                    class="iconfont btn-btn_detail_minus_02 font-20"
                    @click="reduceFun(index, item)"
                  ></i>
                </div>
              </template>
            </nAddItemContent>
          </el-form-item>
          <div v-if="ruleform.daily_inspection_result == 3">
            <el-form-item class="form-item-long-small must" label="整改人：">
              <el-input
                class="el-input-person"
                placeholder="请选择"
                v-model="account_name2"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddLayer2"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="整改日期：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.rec_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="整改要求：">
              <el-input
                placeholder="请输入"
                class="input-m"
                v-model="ruleform.rec_require"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="复检人：">
              <el-input
                class="el-input-person"
                placeholder="请选择"
                v-model="account_name3"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddLayer3"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small must" label="完成日期：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.daily_inspection_limit"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
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
      Mileage: "", //选择的桩号范围
      ruleform: {
        // daily_inspection_id: null, //巡检ID
        organ_id_union: null,
        pro_organ_id_union: Number(this.$organ_id_en_or_pro(this)),
        daily_inspection_title: "",
        daily_inspection_date: this.$utils.getCurrentTime(),
        inspection_project_type: null,
        inspection_project_name: "",
        inspection_project_pile_prefix: "",
        inspection_project_pile: "",
        trouble_type: null,
        daily_inspection_account_id_union: null,
        daily_inspection_position: "",
        daily_inspection_content: "",
        daily_inspection_remark: "",
        daily_inspection_danger_area: 1,
        daily_inspection_result: 1,
        copy_union: "",
        rec_union: null,
        return_union: null,
        rec_time: "",
        rec_require: "",
        daily_inspection_limit: "",
        daily_inspection_video: "",
        daily_inspection_pic: "",
      },
      title: "新增质量巡检",
      account_name: "", //巡检人
      account_name2: "", //整改人
      account_name3: "", //复检人
      TunnelArr: [], //隧道数组
      BridgeArr: [], //桥梁数组
      personIDsArr: [],
      personList: [],
      organArr: [], //工区数组
      formValidation: [
        {
          must: [
            "organ_id_union",
            "daily_inspection_title",
            "daily_inspection_date",
            "inspection_project_type",
            "trouble_type",
            "daily_inspection_account_id_union",
            "daily_inspection_position",
            "daily_inspection_content",
            "daily_inspection_danger_area",
            "daily_inspection_result",
          ],
          tip: [
            "请选择工区",
            "请输入巡检主题",
            "请选择巡检日期",
            "请选择单位工程",
            "请选择隐患类型",
            "请选择巡检人",
            "请输入巡检地点",
            "请输入巡检内容",
            "请选择风险源",
            "请选择巡检结果",
          ],
        },
      ],
      type: this.$route.query.type, //编辑的id
    };
  },
  async mounted() {
    await this.queryType();
    if (this.type == 1) {
      await this.queryQuantityDailyInspection();
    } else {
      this.account_name = this.$store.getters.userName;
      this.ruleform.daily_inspection_account_id_union = Number(
        this.$store.getters.account_id
      );
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
    //切换巡检结果情况输入数据
    changeRuslt() {
      this.personIDsArr = [];
      this.personList = [];
      this.account_name2 = "";
      this.account_name3 = "";
      this.ruleform.copy_union = "";
      this.ruleform.rec_union = null;
      this.ruleform.return_union = null;
      this.ruleform.rec_time = "";
      this.ruleform.rec_require = "";
      this.ruleform.daily_inspection_limit = "";
    },
    // 点击选择抄送人
    addPersons() {
      this.$refs.dialog2.show();
      if (this.$refs.singlechoose2) {
        this.$refs.singlechoose2.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose2.setSelectPerson(this.personList);
        });
      }
    },
    // 删除抄送人
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      let arr = nodes.map((item) => item.account_id);
      this.personIDsArr = this.daily_inspection_id ? [arr] : arr;
      this.personList = [...nodes];
      this.$refs.dialog2.cancel();
    },
    dialogClose() {
      this.$refs.singlechoose2.choosePersonIDsArr = this.personIDsArr;
    },
    //查询隧道
    async queryTunnelUnitAndSubUnit() {
      let data = await api.queryTunnelUnitAndSubUnit({
        page: -1,
        organ_node: this.ruleform.organ_id_union,
      });
      this.TunnelArr = data.result;
    },
    async queryBridgeSubUnit() {
      let data = await api.queryBridgeSubUnit({
        page: -1,
        organ_node: this.ruleform.organ_id_union,
      });
      this.BridgeArr = data.result;
    },
    // 选择所属工区
    async changeOrganId(val) {
      this.Mileage = "";
      this.ruleform.inspection_project_name = "";
      this.ruleform.inspection_project_pile_prefix = "";
      this.ruleform.inspection_project_pile = "";
      this.ruleform.inspection_project_type == 1 &&
        (await this.queryTunnelUnitAndSubUnit());
      this.ruleform.inspection_project_type == 2 &&
        (await this.queryBridgeSubUnit());
    },
    //选择单位工程筛选隧道名称或者桥梁名称
    async changeProj(val) {
      this.ruleform.inspection_project_type = val;
      this.Mileage = "";
      this.ruleform.inspection_project_name = "";
      this.ruleform.inspection_project_pile_prefix = "";
      this.ruleform.inspection_project_pile = "";
      val == 1 && (await this.queryTunnelUnitAndSubUnit());
      val == 2 && (await this.queryBridgeSubUnit());
    },
    // 获得焦点
    focusFun() {
      if (!this.ruleform.organ_id_union) {
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
      this.Mileage =
        this.TunnelArr[ind].unit_proj_pile_prefix +
        this.TunnelArr[ind].unit_proj_pile_start_string +
        "—" +
        this.TunnelArr[ind].unit_proj_pile_prefix +
        this.TunnelArr[ind].unit_proj_pile_end_string;
      this.ruleform.inspection_project_pile_prefix =
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
    // 点击选择巡检人
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 点击选择整改人
    showTargerAddLayer2() {
      this.$refs.dialog3.show();
    },
    // 点击选择复检人
    showTargerAddLayer3() {
      this.$refs.dialog4.show();
    },
    //选择巡检人
    async choosePersonFun(data) {
      this.ruleform.daily_inspection_account_id_union = data;
      let { result } = await this.queryAccount(
        this.ruleform.daily_inspection_account_id_union
      );
      this.account_name = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    //选择整改人
    async choosePersonFun3(data) {
      this.ruleform.rec_union = data;
      let { result } = await this.queryAccount(this.ruleform.rec_union);
      this.account_name2 = result[0].account_name;
      this.$refs.dialog3.cancel();
    },
    //选择复检人
    async choosePersonFun4(data) {
      this.ruleform.return_union = data;
      let { result } = await this.queryAccount(this.ruleform.return_union);
      this.account_name3 = result[0].account_name;
      this.$refs.dialog4.cancel();
    },
    // 查询人员
    async queryAccount(id) {
      let data = await api.queryAccount({
        account_id: id,
      });
      return data;
    },
    // 编辑查询对应抄送人
    async queryAccount2(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    async queryQuantityDailyInspection() {
      let data = await api.queryQuantityDailyInspection({
        page: 0,
        page_size: 1,
        daily_inspection_status: 0,
        organ_node: this.$organ_id_en_or_pro(this),
        account_id_union: Number(this.$store.getters.account_id),
        order_type: 1,
      });
      if (!data.result.length) {
        this.$tip({
          isTip: true,
          message: "无填写记录，请重新填写！",
        });
        this.account_name = this.$store.getters.userName;
        this.ruleform.daily_inspection_account_id_union = Number(
          this.$store.getters.account_id
        );
        return;
      }
      let data2 = await api.queryQuantityDailyInspection({
        daily_inspection_id: data.result[0].daily_inspection_id,
      });
      let info = data2.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.ruleform.inspection_project_type == 1 &&
        (await this.queryTunnelUnitAndSubUnit());
      this.ruleform.inspection_project_type == 2 &&
        (await this.queryBridgeSubUnit());
      this.ruleform.inspection_project_type == 1 &&
        this.changeTunnel(this.ruleform.inspection_project_name);
      this.ruleform.inspection_project_type == 2 &&
        this.changeBridge(this.ruleform.inspection_project_name);
      this.account_name = info.account_name_check;
      this.account_name2 = info.account_name_rec;
      this.account_name3 = info.account_name_return;
      this.personIDsArr = info.copy_union.split(",").map(Number);
      await this.queryAccount2(this.personIDsArr);
      if (info.daily_inspection_video) {
        let videoList = [];
        info.daily_inspection_video.split(",").map((items) => {
          videoList.push({
            url: info.server + items,
            file_name: items,
          });
        });
        this.$refs.video_upload.setVideoList(videoList);
      }
      if (info.daily_inspection_pic) {
        let picList = [];
        info.daily_inspection_pic.split(",").map((items) => {
          picList.push({
            url: info.server + items,
            file_name: items,
          });
        });
        this.$refs.pic_upload.setPicList(picList);
      }
    },
    // 确认提交
    async submitFun() {
      this.ruleform.copy_union = this.personIDsArr.length
        ? this.personIDsArr.join(",")
        : "";
      if (
        this.ruleform.inspection_project_type == 1 ||
        this.ruleform.inspection_project_type == 2
      ) {
        if (this.ruleform.inspection_project_name == "") {
          this.$tip({
            isTip: true,
            message: "请选择工程名称",
          });
          return;
        }
        if (
          this.ruleform.inspection_project_pile_prefix == "" &&
          this.ruleform.inspection_project_pile == ""
        ) {
          this.$tip({
            isTip: true,
            message: "请输入里程桩号",
          });
          return;
        }
      }
      if (this.ruleform.daily_inspection_result == 2) {
        if (this.ruleform.copy_union == "") {
          this.$tip({
            isTip: true,
            message: "请选择抄送人",
          });
          return;
        }
      }
      if (this.ruleform.daily_inspection_result == 3) {
        if (this.ruleform.copy_union == "") {
          this.$tip({
            isTip: true,
            message: "请选择抄送人",
          });
          return;
        }
        if (this.ruleform.rec_union == null) {
          this.$tip({
            isTip: true,
            message: "请选择整改人",
          });
          return;
        }
        if (this.ruleform.rec_time == "") {
          this.$tip({
            isTip: true,
            message: "请选择整改日期",
          });
          return;
        }
        if (this.ruleform.rec_require == "") {
          this.$tip({
            isTip: true,
            message: "请输入整改要求",
          });
          return;
        }

        if (this.ruleform.return_union == null) {
          this.$tip({
            isTip: true,
            message: "请选择复检人",
          });
          return;
        }
        if (this.ruleform.daily_inspection_limit == "") {
          this.$tip({
            isTip: true,
            message: "请选择完成日期",
          });
          return;
        }
      }
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let file_obj = { uploadFileModule: "QuantityDailyInspection" };
        this.ruleform.daily_inspection_pic =
          await this.$refs.pic_upload.submitFun(false, file_obj);
        this.ruleform.daily_inspection_video =
          await this.$refs.video_upload.submitFun(false, file_obj);
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api[
        `${
          this.daily_inspection_id
            ? "updateQuantityDailyInspection"
            : "uploadQuantityDailyInspection"
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
