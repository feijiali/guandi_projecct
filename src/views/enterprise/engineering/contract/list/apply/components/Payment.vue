<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="工程项目：">
        <el-select
          @change="chooseOrgan"
          :disabled="from == 1 ? true : false"
          v-model="ruleforms.organ_id_un"
          placeholder="请选择"
        >
          <el-option
            :label="item.organ"
            :value="item.organ_id"
            v-for="item in projectListSelect"
            :key="item.organ_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="合同名称：">
        <template v-if="from == 1">
          <el-input
            readonly
            v-model="ruleforms.contract_name"
            placeholder="请输入"
          ></el-input>
        </template>
        <template v-if="from == 2">
          <el-select
            @change="chooseContract"
            filterable
            v-model="ruleforms.engineering_pay_contract_id_un"
            placeholder="请输入或选择"
          >
            <el-option
              v-for="(item, index) in contractArr"
              :key="index"
              :label="item.contract_approval_name"
              :value="item.contract_approval_id"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="合同编号：">
        <el-input
          readonly
          v-model="ruleforms.contract_number"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="编制日期：">
        <el-date-picker
          :clearable="false"
          ref="datePicker"
          v-model="ruleforms.engineering_pay_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="收款单位：">
        <el-input
          readonly
          v-model="ruleforms.engineering_pay_receive_unit"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="合同总价(元)：">
        <num-input
          :negative="true"
          :isInputChange="true"
          @emitInput="changeContractMoney"
          :fixedNum="2"
          :isString="true"
          v-model="ruleforms.engineering_pay_contract_money"
          placeholder="请输入"
        >
        </num-input>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="付款单编号：">
        <el-input
          v-model="ruleforms.engineering_pay_no"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="开户银行：">
        <el-select
          filterable
          allow-create
          v-model="ruleforms.engineering_pay_bank"
          placeholder="请输入或选择"
        >
          <el-option
            v-for="(item, index) in payBankArr"
            :key="index"
            :label="item.engineering_pay_bank"
            :value="item.engineering_pay_bank"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="银行账号：">
        <el-input
          v-model="ruleforms.engineering_pay_bank_num"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <table class="table-origin">
        <tr>
          <td>序号</td>
          <td>
            结算项目
            <div @click="addBlock(1)" class="d-inline-block add-circle-btn">
              +
            </div>
          </td>
          <td>本期(元)</td>
          <td colspan="3">累计(元)</td>
          <td colspan="2">
            支付项目
            <div @click="addBlock(2)" class="d-inline-block add-circle-btn">
              +
            </div>
          </td>
          <td colspan="3">本期(元)</td>
          <td colspan="2">累计(元)</td>
        </tr>
        <template v-for="(item, index) in list">
          <tr :key="index">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <template v-if="item.number == 1 && item.isSettlement">
                <el-select
                  @change="(val) => chooseEngineeringName(val, 1, index)"
                  class="short-input"
                  ref="select"
                  v-model="item.engineering_pay_project_money"
                  placeholder="请输入/选择"
                  filterable
                  allow-create
                >
                  <el-option
                    v-for="(itms, inds) in historyArr1"
                    :key="inds"
                    :label="itms.engineering_pay_detail_name"
                    :value="itms.engineering_pay_detail_name"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>
                {{ item.engineering_pay_project_money }}
              </template>
              <div
                v-if="item.number == 1 && index > 0 && item.isSettlement"
                @click="removeBlock(index, 1)"
                class="d-inline-block add-circle-btn position-absolute"
              >
                -
              </div>
            </td>
            <td>
              <template
                v-if="
                  (item.number == 1 || item.number == 2 || item.number == 3) &&
                  item.isSettlement
                "
              >
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="
                    (val) =>
                      calFun(
                        'engineering_pay_project_benqi',
                        index,
                        'engineering_pay_project_leiji'
                      )
                  "
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="item.engineering_pay_project_benqi"
                  placeholder="请输入"
                >
                </num-input>
              </template>
              <template v-else-if="item.number == 6 && item.isSettlement">{{
                item.engineering_pay_project_benqi
              }}</template>
              <template v-else> </template>
            </td>
            <td colspan="3">
              <template
                v-if="
                  (item.number == 1 || item.number == 2 || item.number == 3) &&
                  item.isSettlement
                "
              >
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="(val) => calFun('engineering_pay_project_leiji')"
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="item.engineering_pay_project_leiji"
                  placeholder="自动计算/请输入"
                >
                </num-input>
              </template>
              <template v-else-if="item.number == 6 && item.isSettlement">{{
                item.engineering_pay_project_leiji
              }}</template>
              <template v-else> </template>
            </td>
            <td colspan="2">
              <template v-if="item.number == 1 && item.isPay">
                <el-select
                  @change="(val) => chooseEngineeringName(val, 2, index)"
                  class="short-input"
                  ref="select"
                  v-model="item.engineering_pay_money"
                  placeholder="请输入/选择"
                  filterable
                  allow-create
                >
                  <el-option
                    v-for="(itms, inds) in historyArr2"
                    :key="inds"
                    :label="itms.engineering_pay_detail_name"
                    :value="itms.engineering_pay_detail_name"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>
                {{ item.engineering_pay_money }}
              </template>
              <div
                v-if="item.number == 1 && index > 0 && item.isPay"
                @click="removeBlock(index, 2)"
                class="d-inline-block add-circle-btn position-absolute"
              >
                -
              </div>
            </td>
            <td colspan="3">
              <template
                v-if="
                  (item.number == 1 ||
                    item.number == 2 ||
                    item.number == 3 ||
                    item.number == 4 ||
                    item.number == 5) &&
                  item.isPay
                "
              >
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="
                    (val) =>
                      calFun(
                        'engineering_pay_benqi',
                        index,
                        'engineering_pay_leiji'
                      )
                  "
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="item.engineering_pay_benqi"
                  placeholder="请输入"
                >
                </num-input>
              </template>
              <template v-else>{{ item.engineering_pay_benqi }}</template>
            </td>
            <td colspan="2">
              <template
                v-if="
                  (item.number == 1 ||
                    item.number == 2 ||
                    item.number == 3 ||
                    item.number == 4 ||
                    item.number == 5) &&
                  item.isPay
                "
              >
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="(val) => calFun('engineering_pay_leiji')"
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="item.engineering_pay_leiji"
                  placeholder="自动计算/请输入"
                >
                </num-input>
              </template>
              <template v-else>{{ item.engineering_pay_leiji }}</template>
            </td>
          </tr>
        </template>
        <tr>
          <td>{{ list.length + 1 }}</td>
          <td rowspan="3">本期实付金额(元)</td>
          <td>人民币小写</td>
          <td colspan="10">
            <num-input
              :negative="true"
              :isInputChange="true"
              @emitInput="moneyCapitalizationFun"
              :fixedNum="2"
              :isString="true"
              class="short-input"
              v-model="ruleforms.engineering_pay_total_money"
              placeholder="请输入"
            >
            </num-input>
          </td>
        </tr>
        <tr>
          <td>{{ list.length + 2 }}</td>
          <td rowspan="2">人民币大写</td>
          <td>仟</td>
          <td>佰</td>
          <td>拾</td>
          <td>万</td>
          <td>仟</td>
          <td>佰</td>
          <td>拾</td>
          <td>元</td>
          <td>角</td>
          <td>分</td>
        </tr>
        <tr>
          <td style="width: 80px">{{ list.length + 3 }}</td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 8
                ? numberParseChina(numberIntegerArr[0])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 7
                ? numberParseChina(numberIntegerArr[1])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 6
                ? numberParseChina(numberIntegerArr[2])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 5
                ? numberParseChina(numberIntegerArr[3])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 4
                ? numberParseChina(numberIntegerArr[4])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 3
                ? numberParseChina(numberIntegerArr[5])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 2
                ? numberParseChina(numberIntegerArr[6])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{
              String(Number(numberIntegerArr)).length >= 1
                ? numberParseChina(numberIntegerArr[7])
                : ""
            }}
          </td>
          <td style="width: 80px">
            {{ numberParseChina(numberPointArr[0]) }}
          </td>
          <td style="width: 80px">
            {{ numberParseChina(numberPointArr[1]) }}
          </td>
        </tr>
        <tr>
          <td>{{ list.length + 4 }}</td>
          <td>至本期未累计应付未付金额</td>
          <td colspan="11">
            {{ ruleforms.engineering_pay_money_need }}
          </td>
        </tr>
      </table>
      <el-form-item class="form-item-long mt-2" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import dayjs from "dayjs";
import measurement from "@/mixins/measurement.js";
export default {
  mixins: [measurement],
  data() {
    return {
      ruleformstable: {},
      ruleforms: {
        engineering_pay_id: 0,
        engineering_pay_revise_info_id_un: null,
        engineering_pay_contract_id_un: null,
        engineering_pay_date: dayjs().format("YYYY-MM-DD"),
        engineering_pay_contract_money: "0.00",
        engineering_pay_receive_unit: "",
        engineering_pay_no: "",
        engineering_pay_bank: "",
        engineering_pay_bank_num: "",
        engineering_pay_file: "",
        engineering_pay_file_json: "",
        engineering_pay_pic: "",
        engineering_pay_pic_json: "",
        engineering_pay_project_money: "0.00",
        engineering_pay_money: "0.00",
        engineering_pay_total_money: "0.00",
        engineering_pay_money_need: "",
        engineering_pay_revise_info_id_un: 0,
        contract_approval_name: "",
        contract_approval_type_str: "",
        contract_approval_due_person: "",
      },

      rules: {
        engineering_pay_date: [
          {
            required: true,
            message: "请选择编制日期",
          },
        ],
        engineering_pay_receive_unit: [
          {
            required: true,
            message: "请选择收款单位",
          },
        ],
        engineering_pay_bank: [
          {
            required: true,
            message: "请输入/选择开户银行",
          },
        ],
      },
      // 工程扣款情况
      list: [
        {
          number: 1,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          engineering_pay_detail_type: true,
          isSettlement: true,
          isPay: true,
        },
        {
          number: 2,
          engineering_pay_project_money: "合同款价",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "工程款",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 3,
          engineering_pay_project_money: "变更款价",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "扣质保金",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",

          isSettlement: true,
          isPay: true,
        },
        {
          number: 4,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "代扣税金",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 5,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "其他扣款",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 6,
          engineering_pay_project_money: "结算小计",
          engineering_pay_project_benqi: "0.00",
          engineering_pay_project_leiji: "0.00",
          engineering_pay_money: "支付小计",
          engineering_pay_benqi: "0.00",
          engineering_pay_leiji: "0.00",
          isSettlement: true,
          isPay: true,
        },
      ],
      contractArr: [], //通过审批的合同名称
      payBankArr: [], //开户银行
      from: Number(this.$route.query.from), //1-来自合同台账 2-来自班组计量
      infoData: {},
      historyArr1: [], //结算项目历史记录
      historyArr2: [], //支付项目历史记录
      numberPointArr: [],
      numberIntegerArr: [],
      engineering_pay_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //计量合同付款id
      contract_id_un: parseInt(this.$route.query.contract_id), //合同id
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async mounted() {
    if (this.engineering_pay_id) {
      //编辑
      this.QueryProjectReportEngineeringPay();
    }
    if (this.contract_id_un) {
      await this.QueryProjectReportEngineeringPayed();
      // 查询合同详情
      this.queryOAContractApproval();
    } else {
      // 查询通过审批的合同
      this.queryOAContractApprovalList();
    }
    this.QueryProjectReportHistoryBank();
  },
  methods: {
    async QueryProjectReportEngineeringPay() {
      let { result } = await api.QueryProjectReportEngineeringPay({
        engineering_pay_id: this.engineering_pay_id,
      });
      let info = result[0];
      this.infoReFun(info);
    },
    async infoReFun(info) {
      this.contract_id_un = info.engineering_pay_contract_id_un;
      await this.QueryProjectReportEngineeringPayed();
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.ruleforms.organ_id_un = info.contract_approval_organ_id_union;
      this.chooseContract(this.ruleforms.engineering_pay_contract_id_un);
      console.log(info.pic_list, info.file_list);
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      this.ruleforms.file_list = info.file_list;
      this.ruleforms.pic_list = info.pic_list;
    },
    chooseOrgan(val) {
      this.ruleforms.contract_name = "";
      this.ruleforms.engineering_pay_contract_id_un = null;
      this.queryOAContractApprovalList();
    },
    // 查询历史付款银行
    async QueryProjectReportHistoryBank() {
      let { result } = await api.QueryProjectReportHistoryBank({
        page: -1,
      });
      this.payBankArr = result;
    },
    // 查询通过审批的合同
    async queryOAContractApprovalList() {
      let { result } = await api.queryOAContractApprovalList({
        revise_info_state: 3,
        organ_node: this.ruleforms.organ_id_un || "",
      });
      this.contractArr = result;
    },
    async QueryProjectReportEngineeringPayed() {
      let { result } = await api.QueryProjectReportEngineeringPayed({
        engineering_pay_contract_id_un: this.contract_id_un,
      });
      this.infoData = result[0] || {};

      if (result[0]) {
        let historyArr1 = result[0].list.filter(
          (item, index) => item.engineering_pay_detail_type == 1 && index != len
        );
        let historyArr2 = result[0].list.filter(
          (item, index) => item.engineering_pay_detail_type == 2 && index != len
        );
        let len = result[0].list.length - 1;
        this.historyArr1 = historyArr1.filter(
          (item) =>
            item.engineering_pay_detail_name != "合同款价" &&
            item.engineering_pay_detail_name != "变更款价"
        );
        this.historyArr2 = historyArr2.filter(
          (item) =>
            item.engineering_pay_detail_name != "工程款" &&
            item.engineering_pay_detail_name != "扣质保金" &&
            item.engineering_pay_detail_name != "代扣税金" &&
            item.engineering_pay_detail_name != "其他扣款"
        );
        historyArr1.forEach((item, index) => {
          let i = this.list.findIndex(
            (items) =>
              items.engineering_pay_project_money ==
              item.engineering_pay_detail_name
          );
          if (i != -1) {
            this.list[i].engineering_pay_project_leiji =
              item.engineering_pay_detail_money;
            this.list[i].engineering_pay_project_leiji_old =
              this.list[i].engineering_pay_project_leiji;
          }
        });
        historyArr2.forEach((item, index) => {
          let i = this.list.findIndex(
            (items) =>
              items.engineering_pay_money == item.engineering_pay_detail_name
          );
          if (i != -1) {
            this.list[i].engineering_pay_leiji =
              item.engineering_pay_detail_money;
            this.list[i].engineering_pay_leiji_old =
              this.list[i].engineering_pay_leiji;
          }
        });
      }
    },
    // 修改合同总价
    changeContractMoney() {
      this.calFun("engineering_pay_leiji");
    },
    // 结算小计 计算和
    calFun(name, ind, name2) {
      let totalNum = 0;
      if (ind || ind === 0) {
        // 输入本期自动计算累计=本期+上一次的累计金额
        this.list[ind][name2] = String(
          (
            Number(this.list[ind][name]) +
            Number(this.list[ind][name2 + "_old"])
          ).toFixed(2)
        );
      }

      this.list.forEach((item, index) => {
        if (index != this.list.length - 1) {
          totalNum += item[name] ? Number(item[name]) : 0;
        } else {
          this.list[this.list.length - 1][name] = String(totalNum.toFixed(2));
          if (name == "engineering_pay_benqi") {
            this.ruleforms.engineering_pay_money =
              this.list[this.list.length - 1][name];
            this.ruleforms.engineering_pay_total_money =
              this.list[this.list.length - 1][name];
            this.moneyCapitalizationFun();
          } else if (name == "engineering_pay_project_benqi") {
            this.ruleforms.engineering_pay_project_money =
              this.list[this.list.length - 1][name];
          } else if (name == "engineering_pay_leiji") {
            this.ruleforms.engineering_pay_money_need = (
              this.ruleforms.engineering_pay_contract_money -
              this.list[this.list.length - 1][name]
            ).toFixed(2);
          }
        }
      });
    },
    // 数字转化成中文大写
    moneyCapitalizationFun() {
      this.ruleforms.engineering_pay_total_money =
        this.ruleforms.engineering_pay_total_money || "0.00";
      let numArr = String(this.ruleforms.engineering_pay_total_money).split(
        "."
      );
      this.numberPointArr = numArr[1] ? numArr[1] : ["00"];
      // ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
      this.numberIntegerArr = numArr[0].padStart(8, "0");
    },
    async queryOAContractApproval() {
      let { result } = await api.queryOAContractApproval({
        contract_approval_id: this.contract_id_un,
      });
      let json = {
        contract_approval_id: "engineering_pay_contract_id_un",
        contract_approval_organ_id_union: "organ_id_un",
        contract_approval_name: "contract_name",
        contract_approval_number: "contract_number",
        contract_approval_supplier: "engineering_pay_receive_unit",
        engineering_pay_contract_money: "contract_approval_money",
        contract_approval_type_str: "contract_approval_type_str",
        contract_approval_due_person: "contract_approval_due_person",
      };
      for (var key in json) {
        this.$set(
          this.ruleforms,
          json[key],
          result[0][key],
          result[0].contract_approval_money
        );
      }
      this.ruleforms.engineering_pay_contract_money =
        this.infoData.engineering_pay_contract_money ||
        result[0].contract_approval_money;
      this.calFun("engineering_pay_leiji");
    },
    // 选择合同名称
    chooseContract(val) {
      this.contract_id_un = val;
      let json = this.contractArr.filter(
        (item) => item.contract_approval_id == val
      );
      this.ruleforms.contract_number = json[0].contract_approval_number;
      this.ruleforms.engineering_pay_contract_money =
        json[0].contract_approval_money;
      this.ruleforms.engineering_pay_receive_unit =
        json[0].contract_approval_supplier;

      this.list = [
        {
          number: 1,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          engineering_pay_detail_type: true,
          isSettlement: true,
          isPay: true,
        },
        {
          number: 2,
          engineering_pay_project_money: "合同款价",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "工程款",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 3,
          engineering_pay_project_money: "变更款价",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "扣质保金",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",

          isSettlement: true,
          isPay: true,
        },
        {
          number: 4,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "代扣税金",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 5,
          engineering_pay_project_money: "",
          engineering_pay_project_benqi: "",
          engineering_pay_project_leiji: "",
          engineering_pay_project_leiji_old: "",
          engineering_pay_money: "其他扣款",
          engineering_pay_benqi: "",
          engineering_pay_leiji: "",
          engineering_pay_leiji_old: "",
          isSettlement: true,
          isPay: true,
        },
        {
          number: 6,
          engineering_pay_project_money: "结算小计",
          engineering_pay_project_benqi: "0.00",
          engineering_pay_project_leiji: "0.00",
          engineering_pay_money: "支付小计",
          engineering_pay_benqi: "0.00",
          engineering_pay_leiji: "0.00",
          isSettlement: true,
          isPay: true,
        },
      ];
      this.QueryProjectReportEngineeringPayed();
    },
    // 选择工程或费用名称
    /**
     * type:1-结算项目；2-支付项目
     */
    chooseEngineeringName(val, type, ind) {
      type == 1 && (this.list[ind].engineering_pay_project_benqi = "");
      type == 2 && (this.list[ind].engineering_pay_benqi = "");
      if (type == 1) {
        let i = this.historyArr1.findIndex(
          (item) => item.engineering_pay_detail_name == val
        );
        if (i != -1) {
          this.list[ind].engineering_pay_project_leiji = String(
            (
              Number(this.list[ind].engineering_pay_project_benqi) +
              Number(this.historyArr1[i].engineering_pay_detail_money)
            ).toFixed(2)
          );
          this.list[ind].engineering_pay_project_leiji_old =
            this.list[ind].engineering_pay_project_leiji;
        }
      } else {
        let i = this.historyArr2.findIndex(
          (item) => item.engineering_pay_detail_name == val
        );
        if (i != -1) {
          this.list[ind].engineering_pay_leiji = String(
            (
              Number(this.list[ind].engineering_pay_benqi) +
              Number(this.historyArr2[i].engineering_pay_detail_money)
            ).toFixed(2)
          );
          this.list[i].engineering_pay_leiji_old =
            this.list[ind].engineering_pay_leiji;
        }
      }
    },
    numberParseChina(money) {
      //汉字的数字
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      );
      return money ? cnNums[money] : "";
    },
    addBlock(ind) {
      // ind-1:结算项目；2-支付项目
      let json = {
        number: 1,
        engineering_pay_project_money: "",
        engineering_pay_project_benqi: "",
        engineering_pay_project_leiji: "",
        engineering_pay_project_leiji_old: "",
        engineering_pay_money: "",
        engineering_pay_benqi: "",
        engineering_pay_leiji: "",
        engineering_pay_leiji_old: "",
        isPay: ind == 1 ? false : true, //是否是添加到支付项目
        isSettlement: ind == 1 ? true : false, //是否是添加到支付项目
      };
      this.list.splice(1, 0, json);
    },
    // 移除添加项
    removeBlock(ind, type) {
      if (type == 1) {
        this.list.splice(ind, 1);
      } else {
        this.list.splice(ind, 1);
      }
    },
    async submitFun(isSave) {
      // 先判断是否填写必填信息
      if (!isSave) {
        // 先判断是否填写必填信息
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }

      let file_obj = { uploadFileModule: "ProjectReportEngineeringPay" };

      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.engineering_pay_pic = picsjson.file;
      this.ruleforms.engineering_pay_file = filejson.file;
      if (!isSave) {
        this.ruleforms.engineering_pay_pic_json = picsjson.file_json;
        this.ruleforms.engineering_pay_file_json = filejson.file_json;
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

      let settlementArr = this.list.filter(
        (item) => item.engineering_pay_project_money
      );
      let payArr = this.list.filter((item) => item.engineering_pay_money);
      let arr1 = [],
        arr2 = [];
      settlementArr.forEach((item, index) => {
        arr1.push({
          engineering_pay_detail_type: 1,
          engineering_pay_detail_name: item.engineering_pay_project_money,
          engineering_pay_detail_money:
            item.engineering_pay_project_benqi || "0.00",
          engineering_pay_detail_total_money:
            item.engineering_pay_project_leiji || "0.00",
        });
      });
      payArr.forEach((item, index) => {
        arr2.push({
          engineering_pay_detail_type: 2,
          engineering_pay_detail_name: item.engineering_pay_money,
          engineering_pay_detail_money: item.engineering_pay_benqi || "0.00",
          engineering_pay_detail_total_money:
            item.engineering_pay_leiji || "0.00",
        });
      });
      this.ruleforms.list = [...arr1, ...arr2];
      this.ruleforms.list = this.ruleforms.list.filter(
        (item) =>
          item.engineering_pay_detail_name != "支付小计" &&
          item.engineering_pay_detail_name != "结算小计"
      );
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };

      this.isAdd && (subdata.engineering_pay_id = 0);
      await api[
        `${
          this.engineering_pay_id && !this.isAdd
            ? "UpdateProjectReportEngineeringPay"
            : "UploadProjectReportEngineeringPay"
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
  },
};
</script>

<style lang="scss" scoped>
.add-circle-btn {
  width: 25px;
  height: 25px;
  line-height: 3px;
  padding: 9px 3px;
}
table.table-origin {
  td {
    padding: 2px 10px;
    height: 35px;
  }
}
.short-input {
  ::v-deep .el-input {
    width: 110px !important;
  }
}

.short-input {
  ::v-deep .el-input .el-input__icon {
    line-height: 30px !important;
  }
  ::v-deep .el-input-group__append {
    right: 4px !important;
    top: 4px !important;
  }
}
.short-input,
.short-input-small {
  width: 100px !important;
  .short-input .el-input,
  .short-input-small .el-input {
    width: 100px !important;
    ::v-deep .el-input__inner {
      padding: 0 5px !important;
      border: none !important;
      height: 30px;
      line-height: 30px;
      background-color: transparent !important;
    }
  }
  ::v-deep .el-input__inner {
    padding: 0 5px !important;
    border: none !important;
    height: 30px;
    line-height: 30px;
    background-color: transparent !important;
  }
}

.short-input-small {
  width: 80px !important;
  ::v-deep .el-input {
    width: 80px !important;
  }
  ::v-deep .el-input .el-input__icon {
    line-height: 30px !important;
  }
  ::v-deep .el-input-group__append {
    right: 0 !important;
    top: 4px !important;
  }
}

.el-form-box .el-date-editor.el-input {
  ::v-deep .el-input__inner {
    padding-right: 5px !important;
  }
}
</style>
