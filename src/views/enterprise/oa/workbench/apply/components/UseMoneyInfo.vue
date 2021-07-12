<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="所属机构：">
        <n-treeselect
          ref="treeselect"
          @getSelectNode="getSelectValue"
          :treeData="treeData"
          :Isvalue="true"
          :value="ruleforms.money_approval_organ_id_un"
        />
      </el-form-item>
      <el-form-item
        class="form-item-long-small must form-item-long-height"
        label="申请类型："
      >
        <el-radio-group
          v-model="ruleforms.money_approval_type"
          class="el-radio-group-home vertical-top"
        >
          <el-radio
            :label="index + 1"
            v-for="(item, index) in chooseArr1"
            :key="index + 'a'"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="支付时间：">
        <el-date-picker
          :clearable="false"
          v-model="ruleforms.money_approval_pay_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        class="form-item-long-small must"
        :label="
          ruleforms.money_approval_type == 2 ? '共享金额：' : '付款金额：'
        "
      >
        <num-input
          placeholder="请输入"
          v-model="ruleforms.money_approval_amount"
          :fixedNum="2"
          unit="元"
        ></num-input>
      </el-form-item>
      <el-form-item
        class="form-item-long-small must form-item-long-height"
        label="模板类型："
      >
        <el-radio-group
          @change="chooseApprovalBelong"
          v-model="ruleforms.money_approval_belong"
          class="el-radio-group-home vertical-top"
        >
          <el-radio
            :label="index + 1"
            v-for="(item, index) in chooseArr2"
            :key="index + 'b'"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="ruleforms.money_approval_belong == 1"
        class="form-item-long-small must form-item-long-height"
        label="是否工费："
      >
        <el-switch
          v-model="ruleforms.money_approval_is_labor"
          active-color="#5a5efd"
          inactive-color="#c0c4cc"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item
        class="form-item-long-small must"
        :label="
          ruleforms.money_approval_type == 1 ? '付款公司：' : '付款单位：'
        "
      >
        <el-select
          allow-create
          filterable
          v-model="ruleforms.money_approval_pay_company"
          placeholder="请选择/输入"
        >
          <el-option
            v-for="(item, index) in companyArr"
            :key="index"
            :label="item.oa_company"
            :value="item.oa_company"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        class="form-item-long-small must"
        :label="
          ruleforms.money_approval_type == 2 ? '共享事由：' : '付款事由：'
        "
      >
        <el-input
          v-model="ruleforms.money_approval_cause"
          placeholder="请输入"
          style="width: 380px"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="ruleforms.money_approval_type == 1"
        class="form-item-long-small must"
        label="负责人："
      >
        <el-input
          v-model="ruleforms.money_approval_principal"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="
          ruleforms.money_approval_type == 1 &&
          (ruleforms.money_approval_belong == 2 ||
            ruleforms.money_approval_belong == 3)
        "
        class="form-item-long-small d-inline-block"
        label="合同编号："
      >
        <el-select
          v-model="ruleforms.money_approval_union_id"
          @change="chooseContractType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in contractArr"
            :key="item.contract_approval_id"
            :label="item.contract_approval_number"
            :value="item.contract_approval_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="
          ruleforms.money_approval_type == 1 &&
          (ruleforms.money_approval_belong == 2 ||
            ruleforms.money_approval_belong == 3)
        "
        class="form-item-long-small"
        label="合同名称："
      >
        <el-input
          :disabled="true"
          v-model="ruleforms.contract_approval_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="
          (ruleforms.money_approval_type == 1 &&
            ruleforms.money_approval_belong == 1) ||
          ruleforms.money_approval_type == 3
        "
        class="form-item-long form-item-long-label"
        :label="`${
          ruleforms.money_approval_type == 1
            ? '用款'
            : chooseArr1[ruleforms.money_approval_type - 1]
        }申请审批表模块：`"
      >
        <div class="download-div d-flex">
          <a
            class="download download-item"
            download="用款申请审批模板.xlsx"
            :href="
              [
                GLOBAL.baseurl + '/MOULD/OAMoneyApprovalUse.xlsx',
                GLOBAL.baseurl + '/MOULD/OAMoneyApprovalShare.xlsx',
                GLOBAL.baseurl + '/MOULD/OAMoneyApprovalShare.xlsx',
              ][ruleforms.money_approval_type - 1]
            "
            ><div class="">
              <i class="iconfont btn-btn_list_download mr-05"></i>下载
            </div></a
          >
          <el-upload
            class="upload download-item position-relative useMoney-upload"
            action="xxxx"
            :multiple="false"
            name="UploadFile"
            :http-request="httprequest"
            :on-change="fileChange"
            :on-remove="fileRemove"
            :file-list="fileList"
            accept=".xls, .xlsx"
            :ref="'newupload'"
          >
            <div class="upload">
              <i class="iconfont btn-btn_list_upload mr-05"></i>导入
            </div>
          </el-upload>
        </div>
      </el-form-item>
      <div
        class="circulate-add-box mb-2"
        v-for="(item, index) in ruleforms.pay_list"
        :key="index + 'c'"
      >
        <div
          v-if="
            (ruleforms.money_approval_type == 1 &&
              (ruleforms.money_approval_belong == 1 ||
                ruleforms.money_approval_belong == 3 ||
                ruleforms.money_approval_belong == 4)) ||
            ruleforms.money_approval_type == 2 ||
            ruleforms.money_approval_type == 3
          "
          class="circulate-add-icon cursor-p"
          @click="addBlock(index)"
        >
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
          class="form-item-long-small must"
          label="付款事项："
          v-if="ruleforms.money_approval_type == 3"
        >
          <el-input
            v-model="item.money_approval_pay_title"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="form-item-long-small must"
          :label="ruleforms.money_approval_type == 3 ? '收款方：' : '收款人：'"
        >
          <el-select
            filterable
            allow-create
            v-model="item.money_approval_pay_receive"
            placeholder="请选择/输入"
            @change="(val) => chooseHistory(val, index)"
          >
            <el-option
              v-for="(item, index) in historyArr"
              :key="index + 'a'"
              :label="item.money_approval_pay_receive"
              :value="item.money_approval_pay_receive"
            >
              <span style="float: left">{{
                item.money_approval_pay_receive
              }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.money_approval_pay_account_num +
                "," +
                item.money_approval_pay_bank
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item-long-small must"
          label="收款账号："
          v-if="
            ruleforms.money_approval_type == 2 ||
            ruleforms.money_approval_type == 1
          "
        >
          <el-input
            v-model="item.money_approval_pay_account_num"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="form-item-long-small must"
          label="开户行："
          v-if="
            ruleforms.money_approval_type == 2 ||
            ruleforms.money_approval_type == 1
          "
        >
          <el-input
            v-model="item.money_approval_pay_bank"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="form-item-long-small must"
          :label="
            ['本次支付金额：', '共享金额：', '计划支付金额：'][
              ruleforms.money_approval_type - 1
            ]
          "
        >
          <num-input
            placeholder="请输入"
            v-model="item.money_approval_pay_now_money"
            :fixedNum="2"
            unit="元"
          ></num-input>
        </el-form-item>
        <template
          v-if="
            ruleforms.money_approval_type == 1 &&
            ruleforms.money_approval_belong == 2
          "
        >
          <el-form-item class="form-item-long-small must" label="已支付金额：">
            <num-input
              placeholder="请输入"
              v-model="item.money_approval_pay_paid"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="未支付金额：">
            <num-input
              placeholder="请输入"
              v-model="item.money_approval_pay_remain"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
        </template>
        <el-form-item
          class="form-item-long-small must"
          :label="
            ruleforms.money_approval_type == 2 ? '共享方式：' : '付款方式：'
          "
        >
          <el-select
            v-model="item.money_approval_pay_type"
            placeholder="请选择"
          >
            <el-option :value="1" label="转账"></el-option>
            <el-option :value="2" label="现金"></el-option>
            <el-option :value="3" label="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item-long-small"
          label="备注："
          v-if="
            ruleforms.money_approval_type == 3 ||
            (ruleforms.money_approval_type == 1 &&
              (ruleforms.money_approval_belong == 1 ||
                ruleforms.money_approval_belong == 3 ||
                ruleforms.money_approval_belong == 4))
          "
        >
          <el-input
            v-model="item.money_approval_pay_remark"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item class="form-item-long-small" label="备注：">
        <el-input
          v-model="ruleforms.money_approval_remark"
          type="textarea"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
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
      chooseArr1: ["付款申请", "资金共享", "资金计划"],
      chooseArr2: ["财务", "物资", "工程", "公司"],
      moneyStr: "付款金额",
      companyStr: "付款公司",
      reasonStr: "付款事由",
      moneyStr2: "本次支付金额",
      payStr2: "付款方式",
      fileList: [],
      companyArr: [], //付款公司
      historyArr: [], //查询用款申请付款明细（最近
      contractArr: [], //合同列表
      ruleforms: {
        money_approval_id: null,
        money_approval_revise_id_un: null,
        money_approval_organ_id_un: null,
        money_approval_union_id: null, //用款申请-关联主id
        money_approval_union_module: "OAContractApproval",
        money_approval_is_labor: 2,
        money_approval_type: 1,
        money_approval_belong:
          this.$route.query.contract_type == 1
            ? 3
            : this.$route.query.contract_type == 3
            ? 2
            : 1,
        money_approval_pay_company: "",
        money_approval_cause: "",
        money_approval_pay_time: "",
        money_approval_pay_time_int: null,
        money_approval_amount: null,
        money_approval_remark: "",
        money_approval_principal: "",
        money_approval_pic: "",
        money_approval_file: "",
        money_approval_state: null,
        money_approval_sub_account_id_un: null,
        money_approval_sub_time: this.$utils.getCurrentTime(),
        money_approval_sub_time_int: null,
        money_approval_revise_id_un: null,
        pay_list: [
          {
            money_approval_pay_id: null,
            money_approval_pay_title: "",
            money_approval_pay_money_approval_id_un: null,
            money_approval_pay_receive: "",
            money_approval_pay_account_num: "",
            money_approval_pay_bank: "",
            money_approval_pay_now_money: null,
            money_approval_pay_paid: null,
            money_approval_pay_remain: null,
            money_approval_pay_type: null,
            money_approval_pay_remark: "",
          },
        ],
      },
      rules: {},
      rules2: {},
      id: parseInt(this.$route.query.contract_approval_id),
      contract_type: parseInt(this.$route.query.contract_type),
      contractInfo: {}, //合同详情
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  watch: {
    //   申请类型切换
    "ruleforms.money_approval_type": {
      handler: function () {
        if (this.ruleforms.money_approval_type == 2) {
          this.moneyStr = "共享金额";
          this.reasonStr = "共享事由";
        } else {
          this.moneyStr = "付款金额";
          this.reasonStr = "付款事由";
        }
        if (this.ruleforms.money_approval_type == 1) {
          this.companyStr = "付款公司";
        } else {
          this.companyStr = "付款单位";
        }
      },
      deep: true,
    },
    //   流程类型切换
    "ruleforms.money_approval_belong": {
      handler: function () {
        if (this.ruleforms.money_approval_type == 2) {
          this.moneyStr2 = "共享金额";
          this.payStr2 = "共享方式";
        } else if (this.ruleforms.money_approval_type == 3) {
          this.moneyStr2 = "计划支付金额";
        } else {
          this.moneyStr2 = "本次支付金额";
        }
      },
      deep: true,
    },
  },
  async mounted() {
    if (this.id) {
      this.queryOAContractApproval(this.id);
    }

    if (this.editID) {
      await this.queryOAMoneyApproval();
    }
    // 查询合同
    // 查询付款公司公司
    this.queryOAOACompany();
    // 查询用款申请付款明细（最近）
    this.queryOAMoneyApprovalPayRecent();
  },
  methods: {
    async queryOAMoneyApproval() {
      let { result } = await api.queryOAMoneyApproval({
        money_approval_id: this.editID,
      });
      let info = result[0];

      this.infoReFun(info);
    },
    async infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      await this.queryOAContractApproval(this.id);
      this.rebackInfo(this.ruleforms.money_approval_union_id);
      if (this.$refs.pic_upload) {
        this.$refs.pic_upload.setPicList(info.pic_list);
      }
    },
    // 选择模板类型
    chooseApprovalBelong(val) {
      // 查询合同
      this.queryOAContractApproval();
    },
    // 选择合同编号
    chooseContractType(val) {
      val && this.rebackInfo(val);
    },
    // 查询合同详情
    async queryOAContractApproval(val) {
      let parms = (parms = {
        contract_approval_type:
          this.ruleforms.money_approval_belong == 3 ? 1 : 3,
        organ_node: this.ruleforms.money_approval_organ_id_un,
        revise_info_state: 3,
      });
      let { result } = await api.queryOAContractApproval(parms);
      this.contractArr = result;
      val && this.rebackInfo(val);
    },
    rebackInfo(val) {
      this.ruleforms.money_approval_union_id = null;
      this.ruleforms.contract_approval_name = "";
      if (val) {
        let info = this.contractArr.filter(
          (item) => item.contract_approval_id == val
        );
        this.ruleforms.money_approval_organ_id_un = info[0].organ_id;
        this.ruleforms.money_approval_belong =
          info[0].contract_approval_type == 1
            ? 3
            : info[0].contract_approval_type == 3
            ? 2
            : this.ruleforms.money_approval_belong;
        this.ruleforms.money_approval_union_id = info[0].contract_approval_id;
        this.ruleforms.contract_approval_name = info[0].contract_approval_name;
      }
    },
    // 选择付款人,自动带出收款账号和开户行
    chooseHistory(val, ind) {
      let i = this.historyArr.findIndex(
        (item) => item.money_approval_pay_receive == val
      );
      if (i >= 0) {
        this.ruleforms.pay_list[ind].money_approval_pay_account_num =
          this.historyArr[i].money_approval_pay_account_num;
        this.ruleforms.pay_list[ind].money_approval_pay_bank =
          this.historyArr[i].money_approval_pay_bank;
      }
    },
    // 查询用款申请付款明细（最近）
    async queryOAMoneyApprovalPayRecent() {
      let { result } = await api.queryOAMoneyApprovalPayRecent({
        money_approval_type: this.ruleforms.money_approval_type,
        money_approval_belong: this.ruleforms.money_approval_belong,
        organ_node: String(this.ruleforms.money_approval_organ_id_un),
      });
      this.historyArr = result;
    },
    // 查询用章公司
    async queryOAOACompany() {
      let { result } = await api.queryOAOACompany({
        oa_company_module: "OAMoneyApproval",
        page: -1,
      });
      this.companyArr = result;
    },
    //   新增收款人
    addBlock(ind) {
      ind == 0
        ? this.ruleforms.pay_list.push({
            money_approval_pay_id: null,
            money_approval_pay_title: "",
            money_approval_pay_money_approval_id_un: null,
            money_approval_pay_receive: "",
            money_approval_pay_account_num: "",
            money_approval_pay_bank: "",
            money_approval_pay_now_money: null,
            money_approval_pay_paid: null,
            money_approval_pay_remain: null,
            money_approval_pay_type: null,
            money_approval_pay_remark: "",
          })
        : this.ruleforms.pay_list.splice(ind, 1);
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleforms.money_approval_organ_id_un = node.tag;
      this.$emit("organNodeFun", node.tag);
      // 查询合同
      this.queryOAContractApproval();
    },
    async submitFun(isSave) {
      this.rules = {
        money_approval_organ_id_un: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        money_approval_type: [
          {
            required: true,
            message: "请选择申请类型",
          },
        ],
        money_approval_pay_time: [
          {
            required: true,
            message: "请选择支付时间",
          },
        ],
        money_approval_amount: [
          {
            required: true,
            message: `请输入${this.moneyStr}`,
          },
        ],
        money_approval_belong: [
          {
            required: true,
            message: "请选择模板类型",
          },
        ],
        money_approval_pay_company: [
          {
            required: true,
            message: `请输入${this.companyStr}`,
          },
        ],
        money_approval_cause: [
          {
            required: true,
            message: `请输入${this.reasonStr}`,
          },
        ],
        money_approval_principal: [
          {
            required: true,
            message: "请输入负责人",
          },
        ],
      };
      if (this.ruleforms.money_approval_type != 1) {
        delete this.rules.money_approval_principal;
      }
      this.rules2 = {
        money_approval_pay_receive: [
          {
            required: true,
            message: "请输入收款人",
          },
        ],
        money_approval_pay_account_num: [
          {
            required: true,
            message: "请输入收款账号",
          },
        ],
        money_approval_pay_bank: [
          {
            required: true,
            message: "请输入开户行",
          },
        ],
        money_approval_pay_now_money: [
          {
            required: true,
            message: `请输入${this.moneyStr2}`,
          },
        ],
        money_approval_pay_paid: [
          {
            required: true,
            message: "请输入已支付金额",
          },
        ],
        money_approval_pay_remain: [
          {
            required: true,
            message: "请输入未支付金额",
          },
        ],
        money_approval_pay_type: [
          {
            required: true,
            message: `请输入${this.payStr2}`,
          },
        ],
      };
      if (
        (this.ruleforms.money_approval_type == 1 &&
          this.ruleforms.money_approval_belong != 2) ||
        this.ruleforms.money_approval_type != 1
      ) {
        delete this.rules2.money_approval_pay_paid;
        delete this.rules2.money_approval_pay_remain;
      }
      if (this.ruleforms.money_approval_type == 3) {
        this.rules2 = {
          money_approval_pay_title: [
            {
              required: true,
              message: "请输入付款事项",
            },
          ],
          ...this.rules2,
        };
        delete this.rules2.money_approval_pay_account_num;
        delete this.rules2.money_approval_pay_bank;
      }
      // 先判断是否填写必填信息
      if (!isSave) {
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
        for (let j = 0; j < this.ruleforms.pay_list.length; j++) {
          if (
            !this.$utils.ruleFormPro(
              this,
              this.rules2,
              this.ruleforms.pay_list[j]
            )
          ) {
            return;
          }
        }
      }

      if (this.fileList) {
        await this.$utils.uploadFile.call(this, ["fileList"], {
          uploadFileModule: "Account",
        });
        // 拼装上传参数
        let fileListArr = [],
          file_jsonArr = [];
        for (let value of this.fileList) {
          fileListArr.push(value.file_name);
          file_jsonArr.push(value.file_json);
        }
        this.ruleforms.money_approval_file = fileListArr.join();
        this.ruleforms.money_approval_file_json = JSON.stringify(file_jsonArr);
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.money_approval_pic = picsjson.file;
      this.ruleforms.money_approval_file = filejson.file;
      if (!isSave) {
        this.ruleforms.money_approval_pic_json = picsjson.file_json;
        this.ruleforms.money_approval_file_json = filejson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }

        if (filejson.file) {
          let file_json = JSON.parse(filejson.file_json);
          let urls_file = filejson.urls.split(",");
          let file_list = urls_file.map((item, index) => {
            return {
              ...file_json[index],
              file_json: file_json[index],
              url: item,
            };
          });
          this.ruleforms.file_list = file_list;
        } else {
          this.ruleforms.file_list = [];
        }
      }
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      this.isAdd && (subdata.money_approval_id = 0);
      await api[
        `${
          this.editID && !this.isAdd
            ? "updateOAMoneyApproval"
            : "uploadOAMoneyApproval"
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
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      let that = this;
      that.fileList = [file];
      that.$utils.readWorkbookFromLocalFile(file.raw, function (result) {
        // 表格回填
        that.rebackTable(result);
      });
    },
    fileRemove(file, fileList, name) {
      this.fileList = [];
      this.ruleforms.pay_list = [
        {
          money_approval_pay_id: null,
          money_approval_pay_title: "",
          money_approval_pay_money_approval_id_un: null,
          money_approval_pay_receive: "",
          money_approval_pay_account_num: "",
          money_approval_pay_bank: "",
          money_approval_pay_now_money: null,
          money_approval_pay_paid: null,
          money_approval_pay_remain: null,
          money_approval_pay_type: null,
          money_approval_pay_remark: "",
        },
      ];
    },
    rebackTable(result) {
      let sheet1 = {
        "*收款人": "money_approval_pay_receive",
        "*收款账号": "money_approval_pay_account_num",
        "*开户行": "money_approval_pay_bank",
        "*本次支付金额(元)": "money_approval_pay_now_money",
        "*付款方式": "money_approval_pay_type",
        备注: "money_approval_pay_remark",
      };
      let sheet2 = {
        "*付款事项": "money_approval_pay_title",
        "*收款方": "money_approval_pay_receive",
        "*付款方式": "money_approval_pay_type",
        "*计划付款金额(元)": "money_approval_pay_now_money",
        备注: "money_approval_pay_remark",
      };
      let json_table_new = [];
      let isRightNum = 0;
      result.forEach((item) => {
        let json = {};
        let jsonFor = this.ruleforms.money_approval_type == 1 ? sheet1 : sheet2;
        for (let key in jsonFor) {
          if (!item[key] && key != "备注") {
            isRightNum++;
          }
          if (jsonFor[key] == "money_approval_pay_now_money") {
            json[jsonFor[key]] = item[key];
          } else if (jsonFor[key] == "money_approval_pay_type") {
            json[jsonFor[key]] =
              item[key] == "转账" ? 1 : item[key] == "现金" ? 2 : 3;
          } else {
            json[jsonFor[key]] = item[key] ? "" + item[key] : "";
          }
        }
        json_table_new.push(json);
      });
      if (isRightNum > 3) {
        this.$tip({
          isTip: true,
          message: "导入的表格模板不正确！",
        });
        this.fileList = [];
        return;
      }
      this.ruleforms.pay_list = json_table_new;
    },
    // 覆盖默认上传行为
    httprequest(file) {},
  },
};
</script>

<style lang="scss" scoped>
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
