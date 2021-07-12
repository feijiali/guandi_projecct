<template>
  <div class="w-100">
    <n-dialog
      ref="dialog"
      :diaTit="'提供人选择'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleforms.invoice_share_provider"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.invoice_share_organ_id_un"
        />
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="发票种类："
      >
        <el-select v-model="ruleforms.invoice_share_type" placeholder="请选择">
          <el-option
            v-for="(item, index) in invoice_share_type_arr"
            :key="index"
            :label="item"
            :value="index + 1"
          ></el-option>
          <el-option label="其他" :value="9999"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="发票张数："
      >
        <el-input
          placeholder="待系统计算"
          readonly
          v-model="ruleforms.invoice_share_num"
        >
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="提供人："
      >
        <el-input
          class="el-input-person"
          readonly
          placeholder="请选择"
          v-model="account_name"
        >
        </el-input>
        <div
          class="d-inline-block add-circle-btn ml-2"
          @click="showTargerAddLayer"
        >
          +
        </div>
      </el-form-item>
      <el-form-item
        class="form-item-long-small d-inline-block must"
        label="发票总积分："
      >
        <el-input
          readonly
          placeholder="待系统计算"
          v-model="ruleforms.invoice_share_points"
        ></el-input>
      </el-form-item>
      <div
        class="circulate-add-box mb-2"
        v-for="(item, index) in ruleforms.detail_list"
        :key="index + 'c'"
      >
        <div class="circulate-add-icon cursor-p" @click="addBlock(index)">
          <i
            class="iconfont text-white font-24"
            :class="[
              index == 0
                ? ' btn-btn_detail_plus_01'
                : ' btn-btn_detail_minus_01',
            ]"
          ></i>
        </div>
        <el-form-item
          class="form-item-long d-inline-block must"
          label="发票类型："
        >
          <el-select
            @change="(val) => chooseShareType(val, index)"
            v-model="item.invoice_share_detail_type"
            placeholder="请选择"
          >
            <el-option
              v-for="(itm, ind) in share_detail_type_arr"
              :key="ind + 'a' + index"
              :label="itm"
              :value="ind + 1"
            ></el-option>
            <el-option label="其他" :value="9999"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item-long"
          label="发票图片："
          v-if="item.invoice_share_detail_type"
        >
          <nPicUpload
            :ref="'pic_upload' + index"
            :length="1"
            :multiple="false"
            @fileChange="
              (fileList) =>
                fileChange(fileList, item.invoice_share_detail_type, index)
            "
            @fileRemove="(fileList) => fileRemove(fileList, index)"
          />
        </el-form-item>
        <el-form-item class="form-item-long-small" label="开票日期：">
          <el-date-picker
            :clearable="false"
            v-model="item.invoice_share_detail_time"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="发票金额：">
          <num-input
            @change="(val) => invoice_share_detail_amount_change(val, index)"
            placeholder="请输入"
            v-model="item.invoice_share_detail_amount"
            :fixedNum="2"
            unit="元"
          ></num-input>
          <span class="text-hover-primary ml-1"
            >{{ item.invoice_share_detail_amount_points }}积分</span
          >
        </el-form-item>
        <el-form-item class="form-item-long-small" label="发票号码：">
          <el-input
            v-model="item.invoice_share_detail_serial"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="税率(%)：">
          <num-input
            placeholder="请输入"
            v-model="item.invoice_share_detail_tax_percent"
            :fixedNum="2"
            unit="%"
          ></num-input>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="税金：">
          <num-input
            placeholder="请输入"
            v-model="item.invoice_share_detail_tax_amount"
            :fixedNum="2"
            unit="元"
          ></num-input>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="购买方：">
          <el-input
            v-model="item.invoice_share_detail_buyer"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="销售方：">
          <el-input
            v-model="item.invoice_share_detail_seller"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item-long-small" label="发票代码：">
          <el-input
            v-model="item.invoice_share_detail_code"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
import {
  VAT_INVOICE,
  QUOTA_INVOICE,
  INVOICE,
  TRAIN_TICKET,
  TAXI_RECEIPT,
  AIR_TICKET,
  BUS_TICKET,
  TOLL_INVOICE,
  RECEIPT,
} from "@/plugins/ticket/type";
import { authToken, invoiceCheck } from "@/plugins/ticket/api";
const share_ticket_apis = [
  VAT_INVOICE,
  QUOTA_INVOICE,
  INVOICE,
  TRAIN_TICKET,
  TAXI_RECEIPT,
  AIR_TICKET,
  BUS_TICKET,
  TOLL_INVOICE,
  RECEIPT,
];
const ticket_mapping_value = {
  invoice_share_detail_time: "InvoiceDate", // 开票日期
  invoice_share_detail_amount: "TotalAmount", // 发票金额
  invoice_share_detail_code: "InvoiceCode", // 发票代码
  invoice_share_detail_serial: "InvoiceNum", // 发票号码
  invoice_share_detail_tax_percent: "CommodityTaxRate", // 税率
  invoice_share_detail_tax_amount: "CommodityTax", // 税金
  invoice_share_detail_buyer: "NoteDrawer", // 购买方
  invoice_share_detail_seller: "SellerName", // 销售方
};
import dayjs from "dayjs";
export default {
  mixins: ["upload"],
  props: {
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      invoice_share_type_arr: [
        "餐费",
        "差旅费/滴滴发票",
        "电子产品",
        "家用电器/家具",
        "加油/过路/维修/保养",
        "生活用品/食品",
        "培训费/书籍",
        "装修费用",
        "办公费/网费",
      ],
      share_detail_type_arr: [
        "增值税发票",
        "定额发票",
        "通用机打发票",
        "火车票",
        "出租车票",
        "行程单",
        "汽车票",
      ],
      account_name: "", //提供人
      ruleforms: {
        invoice_share_id: null,
        invoice_share_revise_id_un: null,
        invoice_share_organ_id_un: null,
        invoice_share_time: "",
        invoice_share_time_int: null,
        invoice_share_company: "",
        invoice_share_type: null,
        invoice_share_num: null,
        invoice_share_points: null,
        invoice_share_spec: null,
        invoice_share_amount: null,
        invoice_share_provider: null,
        invoice_share_revise_id_un: null,
        invoice_share_sub_account_id_un: null,
        invoice_share_sub_time: this.$utils.getCurrentTime(),
        invoice_share_sub_time_int: null,
        detail_list: [
          {
            invoice_share_detail_invoice_share_id_un: null,
            invoice_share_detail_time: "",
            invoice_share_detail_type: null,
            invoice_share_detail_amount: null,
            invoice_share_detail_code: "",
            invoice_share_detail_serial: "",
            invoice_share_detail_tax_percent: null,
            invoice_share_detail_tax_amount: null,
            invoice_share_detail_buyer: "",
            invoice_share_detail_seller: "",
            invoice_share_detail_provider: null,
            invoice_share_detail_pic: "",
            invoice_share_detail_pic_json: "",
          },
        ],
      },
      rules: {
        invoice_share_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        invoice_share_type: [
          {
            required: true,
            message: "请选择发票种类",
          },
        ],
        invoice_share_num: [
          {
            required: true,
            message: "请输入发票张数",
          },
        ],
        invoice_share_provider: [
          {
            required: true,
            message: "请选择提供人",
          },
        ],
      },

      rules2: {
        invoice_share_detail_type: [
          {
            required: true,
            message: "请选择发票类型",
          },
        ],
      },
      access_token: "",
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },

  async mounted() {
    if (this.editID) {
      await this.queryOAInvoiceShare();
    } else {
      this.account_name = this.$store.getters.userName;
      this.ruleforms.invoice_share_provider = Number(
        this.$store.getters.account_id
      );
    }
    await this.getAccessToken();
  },
  methods: {
    async queryOAInvoiceShare() {
      let { result } = await api.queryOAInvoiceShare({
        invoice_share_id: this.editID,
      });
      let info = result[0];
      this.infoReFun(info);
    },
    infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      //   图片上传
      let detail_list = info.detail_list;
      for (let j = 0; j < detail_list.length; j++) {
        let name = "pic_upload" + j;
        detail_list[j].pic_list.length &&
          this.$refs[name][0].setPicList(detail_list[j].pic_list);
      }
    },
    chooseShareType(val, ind) {
      let json = {
        invoice_share_detail_invoice_share_id_un: null,
        invoice_share_detail_time: "",
        invoice_share_detail_type: val,
        invoice_share_detail_amount: null,
        invoice_share_detail_code: "",
        invoice_share_detail_serial: "",
        invoice_share_detail_tax_percent: null,
        invoice_share_detail_tax_amount: null,
        invoice_share_detail_buyer: "",
        invoice_share_detail_seller: "",
        invoice_share_detail_provider: null,
        invoice_share_detail_pic: "",
        invoice_share_detail_pic_json: "",
      };
      this.$set(this.ruleforms.detail_list, ind, json);
      this.$nextTick(() => {
        this.$refs["pic_upload" + ind + ""] &&
          (this.$refs["pic_upload" + ind + ""][0].picList = []);
      });
    },
    async getAccessToken() {
      let res = await authToken();
      this.access_token = res.access_token;
    },
    // 文件状态改变时的钩子
    async fileChange(fileList, type, ind) {
      if (fileList[0]) {
        // 转换图片位base64
        let base64 = await this.$utils.imgToBase64(fileList[0].url);
        this.getTicketInfo(base64, type - 1, ind);
      }
    },
    // 取消图片选择清空内容
    fileRemove(fileList, ind) {
      this.chooseShareType(null, ind);
    },
    // 获取发票数据
    getTicketInfo(base64, type, ind) {
      invoiceCheck(
        share_ticket_apis[type],
        {
          image: base64,
        },
        this.access_token
      )
        .then((res) => {
          for (let key in ticket_mapping_value) {
            if (key == "invoice_share_detail_time") {
              let date = res[ticket_mapping_value[key]].replace(
                /^(\d{4})年(\d{2})月(\d{2})日$/,
                "$1-$2-$3"
              );
              this.$set(this.ruleforms.detail_list[ind], key, date);
            } else {
              if (typeof res[ticket_mapping_value[key]] == "object") {
                let CommodityTax = 0;
                if (ticket_mapping_value[key] == "CommodityTax") {
                  CommodityTax = Number(res[ticket_mapping_value[key]][0].word)
                    ? Number(res[ticket_mapping_value[key]][0].word)
                    : 0;
                }
                this.$set(
                  this.ruleforms.detail_list[ind],
                  key,
                  key == "invoice_share_detail_tax_percent"
                    ? parseFloat(
                        res[ticket_mapping_value[key]][0].word.replace("%", "")
                      )
                      ? parseFloat(
                          res[ticket_mapping_value[key]][0].word.replace(
                            "%",
                            ""
                          )
                        ).toFixed(2)
                      : 0
                    : ticket_mapping_value[key] == "CommodityTax"
                    ? CommodityTax
                    : res[ticket_mapping_value[key]][0].word
                );
              } else {
                this.$set(
                  this.ruleforms.detail_list[ind],
                  key,
                  res[ticket_mapping_value[key]]
                );
              }
            }
          }
          this.ruleforms.invoice_share_points =
            Number(
              this.ruleforms.invoice_share_points
                ? this.ruleforms.invoice_share_points
                : 0
            ) +
            Number(this.ruleforms.detail_list[ind].invoice_share_detail_amount);
          this.ruleforms.invoice_share_num = this.ruleforms.detail_list.length;
          this.ruleforms.invoice_share_amount =
            Number(
              this.ruleforms.invoice_share_amount
                ? this.ruleforms.invoice_share_amount
                : 0
            ) +
            Number(this.ruleforms.detail_list[ind].invoice_share_detail_amount);
          this.$set(
            this.ruleforms.detail_list[ind],
            "invoice_share_detail_amount_points",
            Number(this.ruleforms.detail_list[ind].invoice_share_detail_amount)
          );
        })
        .catch((error) => {});
    },
    //   发票金额改变后自动对应积分
    invoice_share_detail_amount_change(val, ind) {
      this.ruleforms.detail_list[ind].invoice_share_detail_amount_points = val;
      let list = this.ruleforms.detail_list;
      let res = list.reduce((acc, cur) => {
        return acc + cur.invoice_share_detail_amount_points;
      }, 0);
      this.ruleforms.invoice_share_points = res;
      this.ruleforms.invoice_share_amount = res;
    },
    // 点击选择绑定人
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data) {
      this.ruleforms.invoice_share_provider = data;
      let { result } = await api.queryAccount({ account_id: data });
      this.account_name = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    //   新增收款人
    addBlock(ind) {
      // 移除项目的时候需要减去自动计算的发票总积分和总金额
      if (ind != 0) {
        let invoice_share_points = this.ruleforms.invoice_share_points;
        this.ruleforms.invoice_share_points =
          invoice_share_points -
          (this.ruleforms.detail_list[ind].invoice_share_detail_amount_points ||
            0);
        this.ruleforms.invoice_share_amount =
          invoice_share_points -
          (this.ruleforms.detail_list[ind].invoice_share_detail_amount_points ||
            0);
        this.ruleforms.invoice_share_num =
          this.ruleforms.detail_list.length - 1;
      }
      ind == 0
        ? this.ruleforms.detail_list.push({
            invoice_share_detail_invoice_share_id_un: null,
            invoice_share_detail_time: "",
            invoice_share_detail_type: null,
            invoice_share_detail_amount: null,
            invoice_share_detail_code: "",
            invoice_share_detail_serial: "",
            invoice_share_detail_tax_percent: null,
            invoice_share_detail_tax_amount: null,
            invoice_share_detail_buyer: "",
            invoice_share_detail_seller: "",
            invoice_share_detail_provider: null,
            invoice_share_detail_pic: "",
            invoice_share_detail_pic_json: "",
          })
        : this.ruleforms.detail_list.splice(ind, 1);
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.invoice_share_organ_id_un = node.tag;
      this.$emit("organNodeFun", node.tag);
    },
    async submitFun(isSave) {
      this.ruleforms.invoice_share_num = this.ruleforms.detail_list.length;
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
        for (let j = 0; j < this.ruleforms.detail_list.length; j++) {
          if (
            !this.$utils.ruleFormPro(
              this,
              this.rules2,
              this.ruleforms.detail_list[j]
            )
          ) {
            return;
          }
        }
      }

      for (let j = 0; j < this.ruleforms.detail_list.length; j++) {
        let name = "pic_upload" + j;
        let file_obj = { uploadFileModule: "StaffTeam" };
        let picsjson = await this.$refs[name][0].submitFun(true, file_obj);
        this.$set(
          this.ruleforms.detail_list[j],
          "invoice_share_detail_pic",
          picsjson.file
        );
        this.$set(
          this.ruleforms.detail_list[j],
          "invoice_share_detail_pic_json",
          picsjson.file_json
        );
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.invoice_share_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateOAInvoiceShare"
            : "uploadOAInvoiceShare"
        }`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
    // 覆盖默认上传行为
    httprequest(file) {
      //   let fd = new FormData();
      //   fd.append("uploadFile", file.file);
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont.iconfont-add {
  font-size: 26px !important;
}
.download-div {
  .download-item {
    padding: 10px 20px;
    color: white;
  }
  .download {
    background-color: $main;
    border-radius: 5px 0 0 5px;
  }
  .upload {
    background-color: $blue;
    border-radius: 0 5px 5px 0;
  }
}
.circulate-add-box {
  position: relative;
  padding: 15px 15px 0 15px;
  border-radius: 8px;
  background-color: #eef1fb;
  .circulate-add-icon {
    background-color: $main;
    border-radius: 0 8px 0 8px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 20px;
    z-index: 20;
  }
}
// 变更台账新增
.useMoney-upload ::v-deep .el-upload-list {
  position: absolute;
  left: 90px;
  top: -10px;
}
</style>
