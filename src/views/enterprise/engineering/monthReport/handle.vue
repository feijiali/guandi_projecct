<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <n-dialog
      ref="contract"
      :diaTit="'选择商务管理审批人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoosecontract"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.contract_approve_account_id_un"
          @choosePersonFun="choosePersonFuncontract"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="project"
      :diaTit="'选择工程管理审批人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechooseproject"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.project_approve_account_id_un"
          @choosePersonFun="choosePersonFunproject"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="finance"
      :diaTit="'选择财务管理审批人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoosefinance"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.finance_approve_account_id_un"
          @choosePersonFun="choosePersonFunfinance"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="security"
      :diaTit="'选择质量安全管理审批人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoosesecurity"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.security_approve_account_id_un"
          @choosePersonFun="choosePersonFunsecurity"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="risk"
      :diaTit="'选择风控管理审批人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechooserisk"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.risk_approve_account_id_un"
          @choosePersonFun="choosePersonFunrisk"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 flex-fill">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <div class="bg-white rounded-1 p-2">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >项目基础信息</span
            >
            <el-form-item class="form-item-long-small must" label="工程名称：">
              <el-select
                filterable
                :disabled="project_linkage_id ? true : false"
                v-model="ruleform.linkage_project_name"
                placeholder="请选择或输入"
                value-key="organ_id"
                @change="selectproject"
              >
                <el-option
                  v-for="item in proNameArr"
                  :key="item.organ_id"
                  :label="item.organ"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="所属月份：">
              <el-date-picker
                :picker-options="billPickerOptions"
                class="el-date-editor-m"
                :disabled="project_linkage_id ? true : false"
                :clearable="false"
                :editable="false"
                v-model="ruleform.linkage_project_date"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div
            class="bg-white rounded-1 p-2 mt-1"
            v-show="
              project_linkage_id && info.linkage_approve_total_state == 1
                ? contractArr[0].linkage_approve_state == 1 && role != 4
                : role != 4
            "
          >
            <span class="font-20 font-weight-bold mb-1 d-block"
              >商务管理中心</span
            >
            <el-form-item
              class="form-item-long d-inline-block must"
              label="审批人："
            >
              <el-input class="el-input-person"
                placeholder="请选择"
                v-model="account_contract"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddbusiness"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="签订日期：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.project_linkage_sign_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="合同编号：">
              <el-input
                placeholder="请输入"
                v-model="ruleform.project_linkage_sign_no"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="总包/分包：">
              <el-radio-group
                v-model="ruleform.project_linkage_type"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">总包</el-radio>
                <el-radio :label="2">分包</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="发包单位：">
              <el-input
                class="input-m"
                v-model="ruleform.project_linkage_unit"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="工程所在地：">
              <el-input
                class="input-m"
                v-model="ruleform.project_linkage_address"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="工程质量要求：">
              <el-input
                v-model="ruleform.project_linkage_quality"
                type="textarea"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="项目负责人员：">
              <el-input
                class="input-m"
                v-model="ruleform.project_linkage_charge_account"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="项目经办人员：">
              <el-input
                class="input-m"
                v-model="ruleform.project_linkage_handling_account"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="经营专员：">
              <el-input
                class="input-m"
                v-model="ruleform.project_linkage_commissioner"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">合同总金额(万元)：</span>
              <num-input
                v-model="ruleform.project_linkage_total_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">合同约定付款(%)：</span>
              <num-input
                v-model="ruleform.project_linkage_contract_per"
                :fixedNum="2"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">合同约定进度比例(%)：</span>
              <num-input
                @change="getPrice"
                v-model="ruleform.project_linkage_contracting_per"
                :fixedNum="2"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">合同约定完工比例(%)：</span>
              <num-input
                v-model="ruleform.project_linkage_contracted_per"
                :fixedNum="2"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="合同开工时间：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.project_linkage_contract_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="合同完工时间：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.project_linkage_contract_finish_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div
            class="bg-white rounded-1 p-2 mt-1"
            v-show="
              project_linkage_id && info.linkage_approve_total_state == 1
                ? projectArr[0].linkage_approve_state == 1 && role != 4
                : role != 4
            "
          >
            <span class="font-20 font-weight-bold mb-1 d-block"
              >工程管理中心</span
            >
            <el-form-item
              class="form-item-long d-inline-block must"
              label="审批人："
            >
              <el-input class="el-input-person"
                placeholder="请选择"
                v-model="account_project"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddproject"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="实际开工时间：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.project_linkage_operation_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="实际完工时间：">
              <el-date-picker
                :clearable="false"
                v-model="ruleform.project_linkage_operation_end_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="项目状态：">
              <el-radio-group
                v-model="ruleform.project_linkage_project_state"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">完工</el-radio>
                <el-radio :label="2">在建</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="监理季度评价：">
              <el-radio-group
                v-model="ruleform.project_linkage_evaluate"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">一般</el-radio>
                <el-radio :label="4">差</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="业主季度评价：">
              <el-radio-group
                v-model="ruleform.project_linkage_people_evaluate"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">一般</el-radio>
                <el-radio :label="4">差</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">截至上年累计审批完成产值(万元)：</span>
              <num-input
                :negative="true"
                @change="getPrice"
                v-model="ruleform.project_linkage_approve_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">本月审批完成产值(万元)：</span>
              <num-input
                :negative="true"
                @change="getPrice"
                v-model="ruleform.project_linkage_month_approve_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">本年度审批完成产值(万元)：</span>
              <num-input
                :negative="true"
                @change="getPrice"
                v-model="ruleform.project_linkage_year_approve_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">累计审批完成产值(万元)：</span>
              <num-input
                :negative="true"
                disabled
                placeholder="自动计算"
                v-model="ruleform.project_linkage_total_approve_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">未确认产值(万元)：</span>
              <num-input
                :negative="true"
                v-model="ruleform.project_linkage_unconfirmed_worth"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">工程款当月应收(万元)：</span>
              <num-input
                :negative="true"
                disabled
                placeholder="自动计算"
                v-model="ruleform.project_linkage_month_worth"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">工程款当月已收(万元)：</span>
              <num-input
                :negative="true"
                v-model="ruleform.project_linkage_month_worthed"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">工程款累计应收(万元)：</span>
              <num-input
                :negative="true"
                disabled
                placeholder="自动计算"
                v-model="ruleform.project_linkage_total_worth"
                :fixedNum="4"
                unit="万元"
                @change="getAllprice6"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">工程款累计已收(万元)：</span>
              <num-input
                :negative="true"
                @change="getAllprice6"
                v-model="ruleform.project_linkage_total_worthed"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">工程款累计应收未收(万元)：</span>
              <num-input
                :negative="true"
                disabled
                v-model="ruleform.project_linkage_worth"
                :fixedNum="4"
                unit="万元"
                placeholder="自动计算"
              ></num-input>
            </el-form-item>
            <div class="border-top pt-1">
              <span class="font-20 font-weight-bold mb-1 d-block grey2"
                >本月申请支付金额</span
              >
              <el-form-item class="form-item-long-small">
                <span class="title-length">劳务、专业分包(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice1"
                  v-model="ruleform.project_linkage_month_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—主材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice1"
                  v-model="ruleform.project_linkage_month_material_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—辅材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice1"
                  v-model="ruleform.project_linkage_month_materials_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="机械(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice1"
                  v-model="ruleform.project_linkage_month_equip_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="其它(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice1"
                  v-model="ruleform.project_linkage_month_other_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="合计(万元)：">
                <num-input
                  :negative="true"
                  disabled
                  placeholder="自动计算"
                  v-model="ruleform.project_linkage_month_total_pay"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <span class="font-20 font-weight-bold mb-1 d-block grey2"
                >累计申请支付金额</span
              >
              <el-form-item class="form-item-long-small">
                <span class="title-length">劳务、专业分包(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice2"
                  v-model="ruleform.project_linkage_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—主材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice2"
                  v-model="ruleform.project_linkage_material_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—辅材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice2"
                  v-model="ruleform.project_linkage_materials_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="机械(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice2"
                  v-model="ruleform.project_linkage_equip_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="其它(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice2"
                  v-model="ruleform.project_linkage_other_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="合计(万元)：">
                <num-input
                  :negative="true"
                  disabled
                  placeholder="自动计算"
                  v-model="ruleform.project_linkage_total_payed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <span class="font-20 font-weight-bold mb-1 d-block grey2"
                >应付未收支付金额</span
              >
              <el-form-item class="form-item-long-small">
                <span class="title-length">劳务、专业分包(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—主材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_material_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">材料—辅材(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_materials_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="机械(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_equip_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="其它(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_other_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item
                class="form-item-long-small"
                label="保留金等暂扣款："
              >
                <num-input
                  :negative="true"
                  @change="getAllprice3"
                  v-model="ruleform.project_linkage_withhold_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="合计(万元)：">
                <num-input
                  :negative="true"
                  disabled
                  placeholder="自动计算"
                  v-model="ruleform.project_linkage_total_paying"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
            </div>
          </div>

          <div
            class="bg-white rounded-1 p-2 mt-1"
            v-show="
              project_linkage_id && info.linkage_approve_total_state == 1
                ? financeArr[0].linkage_approve_state == 1 && role != 4
                : role != 4
            "
          >
            <span class="font-20 font-weight-bold mb-1 d-block"
              >财务管理中心</span
            >
            <el-form-item
              class="form-item-long d-inline-block must"
              label="审批人："
            >
              <el-input class="el-input-person"
                placeholder="请选择"
                v-model="account_finance"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddfinance"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">累计开发票金额(万元)：</span>
              <num-input
                :negative="true"
                v-model="ruleform.project_linkage_billing"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">借款余额(万元)：</span>
              <num-input
                :negative="true"
                v-model="ruleform.project_linkage_finance_loan"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <div class="border-top pt-1">
              <span class="font-20 font-weight-bold mb-1 d-block grey2"
                >累计应交（应扣）费用</span
              >
              <el-form-item class="form-item-long-small" label="税费(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice4"
                  v-model="ruleform.project_linkage_finance_taxed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="管理费(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice4"
                  v-model="ruleform.project_linkage_finance_managed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">其它指标数(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice4"
                  v-model="ruleform.project_linkage_finance_othered"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">风险保证金和保函保证金(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice4"
                  v-model="ruleform.project_linkage_finance_moneyed"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="小计(万元)：">
                <num-input
                  :negative="true"
                  disabled
                  placeholder="自动计算"
                  v-model="ruleform.project_linkage_finance_totaled"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <span class="font-20 font-weight-bold mb-1 d-block grey2"
                >累计应交未交（应扣未扣）费用</span
              >
              <el-form-item class="form-item-long-small" label="税费(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice5"
                  v-model="ruleform.project_linkage_finance_tax"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="管理费(万元)：">
                <num-input
                  :negative="true"
                  @change="getAllprice5"
                  v-model="ruleform.project_linkage_finance_manage"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">其它指标数(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice5"
                  v-model="ruleform.project_linkage_finance_other"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small">
                <span class="title-length">风险保证金和保函保证金(万元)：</span>
                <num-input
                  :negative="true"
                  @change="getAllprice5"
                  v-model="ruleform.project_linkage_finance_money"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
              <el-form-item class="form-item-long-small" label="小计(万元)：">
                <num-input
                  :negative="true"
                  disabled
                  placeholder="自动计算"
                  v-model="ruleform.project_linkage_finance_total"
                  :fixedNum="4"
                  unit="万元"
                ></num-input>
              </el-form-item>
            </div>
          </div>

          <div
            class="bg-white rounded-1 p-2 mt-1"
            v-show="
              project_linkage_id && info.linkage_approve_total_state == 1
                ? riskArr[0].linkage_approve_state == 1 && role != 4
                : role != 4
            "
          >
            <span class="font-20 font-weight-bold mb-1 d-block"
              >质量安全管理中心</span
            >
            <el-form-item
              class="form-item-long d-inline-block must"
              label="审批人："
            >
              <el-input class="el-input-person"
                placeholder="请选择"
                v-model="account_security"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddsecurity"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="质量评价：">
              <el-radio-group
                v-model="ruleform.project_linkage_quality_level"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">优</el-radio>
                <el-radio :label="2">良</el-radio>
                <el-radio :label="3">合格</el-radio>
                <el-radio :label="4">差</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="安全评价：">
              <el-radio-group
                v-model="ruleform.project_linkage_security_level"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">优</el-radio>
                <el-radio :label="2">良</el-radio>
                <el-radio :label="3">合格</el-radio>
                <el-radio :label="4">差</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="创优计划：">
              <el-radio-group
                v-model="ruleform.project_linkage_excellence"
                class="el-radio-group-home vertical-top"
              >
                <el-radio :label="1">有</el-radio>
                <el-radio :label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div
            v-show="
              project_linkage_id && info.linkage_approve_total_state == 1
                ? securityArr[0].linkage_approve_state == 1
                : true
            "
            v-for="(item, index) in ruleform.risk_info"
            :key="index"
            class="bg-white rounded-1 p-2 mt-1"
          >
            <span class="font-20 font-weight-bold mb-1 d-block"
              >风控管理中心</span
            >
            <el-form-item
              class="form-item-long d-inline-block must"
              label="审批人："
            >
              <el-input class="el-input-person"
                placeholder="请选择"
                v-model="account_risk"
                readonly
              ></el-input>
              <div
                class="d-inline-block add-circle-btn ml-1"
                @click="showTargerAddrisk"
              >
                +
              </div>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">案件累计发生数量(个)：</span>
              <num-input
                :negative="true"
                v-model="item.project_risk_num"
                :fixedNum="0"
                unit="个"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">案件诉讼金额(万元)：</span>
              <num-input
                :negative="true"
                v-model="item.project_risk_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">案件当月发生数量(个)：</span>
              <num-input
                :negative="true"
                v-model="item.project_risk_month_num"
                :fixedNum="0"
                unit="个"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">案件当月诉讼金额(万元)：</span>
              <num-input
                :negative="true"
                v-model="item.project_risk_month_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <el-form-item class="form-item-long-small">
              <span class="title-length">投诉金额(万元)：</span>
              <num-input
                :negative="true"
                v-model="item.project_risk_litigation_money"
                :fixedNum="4"
                unit="万元"
              ></num-input>
            </el-form-item>
            <br />
            <el-form-item class="form-item-long-small" label="诉讼内容：">
              <el-input
                v-model="item.project_risk_complaint"
                type="textarea"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long-small" label="处理情况：">
              <el-input
                v-model="item.project_risk_dispose"
                type="textarea"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </el-form-item>
          </div>

          <div class="bg-white rounded-1 p-2 mt-1">
            <span class="font-20 font-weight-bold mb-1 d-block">备注</span>
            <el-form-item class="form-item-long" label="备注内容：">
              <el-input
                style="width: 50%"
                v-model="ruleform.project_linkage_remark"
                type="textarea"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </el-form-item>
          </div>
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
import dayjs from "dayjs";
const date = dayjs();
export default {
  mixins: [confirm],
  data() {
    return {
      proNameArr: this.$store.getters.organProject,
      title: "",
      account_contract: "", //商务审批人
      account_project: "", //工程审批人
      account_finance: "", //财务审批人
      account_security: "", //质量审批人
      account_risk: "", //风控审批人
      ruleform: {
        // project_linkage_worth: "",
        linkage_project_name: "",
        linkage_project_id_un: null,
        linkage_project_date: this.getPrevMonth(date.format("YYYY-MM")),
        risk_info: [{}],
      },
      info: {},
      billPickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7;
        },
      },
      rules: {
        linkage_project_name: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        contract_approve_account_id_un: [
          {
            required: true,
            message: "请选择商务管理审批人",
          },
        ],
        project_approve_account_id_un: [
          {
            required: true,
            message: "请选择工程管理审批人",
          },
        ],
        finance_approve_account_id_un: [
          {
            required: true,
            message: "请选择财务管理审批人",
          },
        ],
        security_approve_account_id_un: [
          {
            required: true,
            message: "请选择质量安全管理审批人",
          },
        ],
        risk_approve_account_id_un: [
          {
            required: true,
            message: "请选择风控管理审批人",
          },
        ],
      },
      // isManagementthis:
      //   this.$route.query.isManagementthis && this.$route.query.isManagementthis, //是否为风控管理人员
      project_linkage_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //
      role: this.$store.state.user.account_project_role, //0:无,1:普通用户,2:项目人员,3:管理人员,4:风控中心人员 5:领导
      contractArr: [], //商务审批人员
      projectArr: [], //工程审批人员
      financeArr: [], //财务审批人员
      riskArr: [], //质量审批人员
      securityArr: [], //风控审批人员
    };
  },
  async created() {
    // this.queryProjectInfoProjectName();
    if (this.project_linkage_id) {
      this.title = "修改项目联动";
      this.project_linkage_id && (await this.queryProjectInfoProjectLinkage());
    } else {
      this.title = "新增项目联动";
    }
  },
  methods: {
    //获取上个月
    getPrevMonth(date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      // var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      // var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      // if (day2 > days2) {
      //     day2 = days2;
      // }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2;
      return t2;
    },
    //选择项目
    selectproject(data) {
      this.ruleform.linkage_project_name = data.organ;
      this.ruleform.linkage_project_id_un = data.organ_id;
    },
    //选择商务审批人
    showTargerAddbusiness() {
      this.$refs.contract.show();
    },
    async choosePersonFuncontract(data) {
      this.ruleform.contract_approve_account_id_un = data;
      let { result } = await this.queryAccount(
        this.ruleform.contract_approve_account_id_un
      );
      this.account_contract = result[0].account_name;
      this.$refs.contract.cancel();
    },
    //选择工程审批人
    showTargerAddproject() {
      this.$refs.project.show();
    },
    async choosePersonFunproject(data) {
      this.ruleform.project_approve_account_id_un = data;
      let { result } = await this.queryAccount(
        this.ruleform.project_approve_account_id_un
      );
      this.account_project = result[0].account_name;
      this.$refs.project.cancel();
    },
    //选择财务审批人
    showTargerAddfinance() {
      this.$refs.finance.show();
    },
    async choosePersonFunfinance(data) {
      this.ruleform.finance_approve_account_id_un = data;
      let { result } = await this.queryAccount(
        this.ruleform.finance_approve_account_id_un
      );
      this.account_finance = result[0].account_name;
      this.$refs.finance.cancel();
    },
    //选择质量审批人
    showTargerAddsecurity() {
      this.$refs.security.show();
    },
    async choosePersonFunsecurity(data) {
      this.ruleform.security_approve_account_id_un = data;
      let { result } = await this.queryAccount(
        this.ruleform.security_approve_account_id_un
      );
      this.account_security = result[0].account_name;
      this.$refs.security.cancel();
    },
    //选择风控审批人
    showTargerAddrisk() {
      this.$refs.risk.show();
    },
    async choosePersonFunrisk(data) {
      this.ruleform.risk_approve_account_id_un = data;
      let { result } = await this.queryAccount(
        this.ruleform.risk_approve_account_id_un
      );
      this.account_risk = result[0].account_name;
      this.$refs.risk.cancel();
    },
    // 查询人员
    async queryAccount(id) {
      let data = await api.queryAccount({
        account_id: id,
      });
      return data;
    },
    // async queryProjectInfoProjectName() {
    //   let data = await api.queryOrgan({
    //     organ_type: 30,
    //     organ_node: this.$organ_id_en_or_pro(this),
    //     project_classify: 0,
    //   });
    //   // this.projectListSelect = result;
    //   // this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    //   // this.getList();
    //   // let data = await api.queryProjectInfoProjectName({});
    //   this.proNameArr = data.result;
    // },
    //编辑回填
    async queryProjectInfoProjectLinkage() {
      let data = await api.queryProjectInfoProjectLinkage({
        project_linkage_id: this.project_linkage_id,
      });
      this.info = data.result[0];
      this.ruleform = this.info;
      let contractArr = [];
      let projectArr = [];
      let financeArr = [];
      let riskArr = [];
      let securityArr = [];
      for (let i = 0; i < this.info.approve_info.length; i++) {
        if (this.info.approve_info[i].linkage_approve_type == 1) {
          contractArr.push(this.info.approve_info[i]);
        }
        if (this.info.approve_info[i].linkage_approve_type == 2) {
          projectArr.push(this.info.approve_info[i]);
        }
        if (this.info.approve_info[i].linkage_approve_type == 3) {
          financeArr.push(this.info.approve_info[i]);
        }
        if (this.info.approve_info[i].linkage_approve_type == 4) {
          riskArr.push(this.info.approve_info[i]);
        }
        if (this.info.approve_info[i].linkage_approve_type == 5) {
          securityArr.push(this.info.approve_info[i]);
        }
      }
      this.account_contract = contractArr[0].account_name; //商务审批人
      this.account_project = projectArr[0].account_name; //工程审批人
      this.account_finance = financeArr[0].account_name; //财务审批人
      this.account_security = riskArr[0].account_name; //质量审批人
      this.account_risk = securityArr[0].account_name; //风控审批人
      if (this.role == 4) {
        this.ruleform.contract_approve_account_id_un = 0;
        this.ruleform.project_approve_account_id_un = 0;
        this.ruleform.finance_approve_account_id_un = 0;
        this.ruleform.security_approve_account_id_un = 0;
        this.ruleform.risk_approve_account_id_un =
          securityArr[0].linkage_approve_account_id_un;
      } else {
        contractArr[0].linkage_approve_state == 2
          ? (this.ruleform.contract_approve_account_id_un = 0)
          : (this.ruleform.contract_approve_account_id_un =
              contractArr[0].linkage_approve_account_id_un);
        projectArr[0].linkage_approve_state == 2
          ? (this.ruleform.project_approve_account_id_un = 0)
          : (this.ruleform.project_approve_account_id_un =
              projectArr[0].linkage_approve_account_id_un);
        financeArr[0].linkage_approve_state == 2
          ? (this.ruleform.finance_approve_account_id_un = 0)
          : (this.ruleform.finance_approve_account_id_un =
              financeArr[0].linkage_approve_account_id_un);
        riskArr[0].linkage_approve_state == 2
          ? (this.ruleform.security_approve_account_id_un = 0)
          : (this.ruleform.security_approve_account_id_un =
              riskArr[0].linkage_approve_account_id_un);
        securityArr[0].linkage_approve_state == 2
          ? (this.ruleform.risk_approve_account_id_un = 0)
          : (this.ruleform.risk_approve_account_id_un =
              securityArr[0].linkage_approve_account_id_un);
      }
      this.contractArr = contractArr;
      this.projectArr = projectArr;
      this.financeArr = financeArr;
      this.riskArr = riskArr;
      this.securityArr = securityArr;
    },
    getPrice() {
      //计算累计审批完成产值
      this.ruleform.project_linkage_total_approve_money =
        this.ruleform.project_linkage_approve_money +
        this.ruleform.project_linkage_year_approve_money;
      //计算工程款当月应收
      this.ruleform.project_linkage_month_worth =
        (this.ruleform.project_linkage_contracting_per *
          this.ruleform.project_linkage_month_approve_money) /
        100;
      //计算工程款累计应收
      this.ruleform.project_linkage_total_worth =
        (this.ruleform.project_linkage_contracting_per *
          this.ruleform.project_linkage_total_approve_money) /
        100;
      this.getAllprice6();
    },
    //计算本月申请支付金额合计
    getAllprice1() {
      this.ruleform.project_linkage_month_total_pay =
        (this.ruleform.project_linkage_month_pay
          ? this.ruleform.project_linkage_month_pay
          : 0) +
        (this.ruleform.project_linkage_month_material_pay
          ? this.ruleform.project_linkage_month_material_pay
          : 0) +
        (this.ruleform.project_linkage_month_materials_pay
          ? this.ruleform.project_linkage_month_materials_pay
          : 0) +
        (this.ruleform.project_linkage_month_equip_pay
          ? this.ruleform.project_linkage_month_equip_pay
          : 0) +
        (this.ruleform.project_linkage_month_other_pay
          ? this.ruleform.project_linkage_month_other_pay
          : 0);
    },
    //计算累计申请支付金额合计
    getAllprice2() {
      this.ruleform.project_linkage_total_payed =
        (this.ruleform.project_linkage_payed
          ? this.ruleform.project_linkage_payed
          : 0) +
        (this.ruleform.project_linkage_material_payed
          ? this.ruleform.project_linkage_material_payed
          : 0) +
        (this.ruleform.project_linkage_materials_payed
          ? this.ruleform.project_linkage_materials_payed
          : 0) +
        (this.ruleform.project_linkage_equip_payed
          ? this.ruleform.project_linkage_equip_payed
          : 0) +
        (this.ruleform.project_linkage_other_payed
          ? this.ruleform.project_linkage_other_payed
          : 0);
    },
    //计算应付未收支付金额合计
    getAllprice3() {
      this.ruleform.project_linkage_total_paying =
        (this.ruleform.project_linkage_paying
          ? this.ruleform.project_linkage_paying
          : 0) +
        (this.ruleform.project_linkage_material_paying
          ? this.ruleform.project_linkage_material_paying
          : 0) +
        (this.ruleform.project_linkage_materials_paying
          ? this.ruleform.project_linkage_materials_paying
          : 0) +
        (this.ruleform.project_linkage_equip_paying
          ? this.ruleform.project_linkage_equip_paying
          : 0) +
        (this.ruleform.project_linkage_other_paying
          ? this.ruleform.project_linkage_other_paying
          : 0) +
        (this.ruleform.project_linkage_withhold_paying
          ? this.ruleform.project_linkage_withhold_paying
          : 0);
    },
    //计算累计应交（应扣）费用合计
    getAllprice4() {
      this.ruleform.project_linkage_finance_totaled =
        (this.ruleform.project_linkage_finance_taxed
          ? this.ruleform.project_linkage_finance_taxed
          : 0) +
        (this.ruleform.project_linkage_finance_managed
          ? this.ruleform.project_linkage_finance_managed
          : 0) +
        (this.ruleform.project_linkage_finance_othered
          ? this.ruleform.project_linkage_finance_othered
          : 0) +
        (this.ruleform.project_linkage_finance_moneyed
          ? this.ruleform.project_linkage_finance_moneyed
          : 0);
    },
    //计算累计应交未交（应扣未扣）费用合计
    getAllprice5() {
      this.ruleform.project_linkage_finance_total =
        (this.ruleform.project_linkage_finance_tax
          ? this.ruleform.project_linkage_finance_tax
          : 0) +
        (this.ruleform.project_linkage_finance_manage
          ? this.ruleform.project_linkage_finance_manage
          : 0) +
        (this.ruleform.project_linkage_finance_other
          ? this.ruleform.project_linkage_finance_other
          : 0) +
        (this.ruleform.project_linkage_finance_money
          ? this.ruleform.project_linkage_finance_money
          : 0);
    },
    //计算工程款累计应收未收
    getAllprice6() {
      this.ruleform.project_linkage_worth =
        (this.ruleform.project_linkage_total_worth
          ? this.ruleform.project_linkage_total_worth
          : 0) -
        (this.ruleform.project_linkage_total_worthed
          ? this.ruleform.project_linkage_total_worthed
          : 0);
    },
    async submitFun() {
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        this.submitAllData();
      }
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      subdata.project_linkage_sign_no
        ? (subdata.project_linkage_sign_no =
            subdata.project_linkage_sign_no + "")
        : "";
      subdata.project_linkage_contract_per =
        subdata.project_linkage_contract_per
          ? subdata.project_linkage_contract_per + ""
          : "";
      subdata.project_linkage_contracting_per =
        subdata.project_linkage_contracting_per
          ? subdata.project_linkage_contracting_per + ""
          : "";
      subdata.project_linkage_contracted_per =
        subdata.project_linkage_contracted_per
          ? subdata.project_linkage_contracted_per + ""
          : "";
      let res = await api[
        `${
          this.project_linkage_id
            ? "updateProjectInfoProjectLinkage"
            : "uploadProjectInfoProjectLinkage"
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
.el-button--small.is-circle {
  padding: 5px;
}
.person-list {
  padding: 10px 0;
}
.person-list-item {
  padding: 5px 10px;
}
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #5a5efd;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}
.el-button--info,
.el-button--info:focus,
.el-button--info:hover {
  background-color: #8a8ba6;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}

.shift-setting-item {
  min-height: 200px;
  width: 50%;
  background-color: #f7f7ff;
  border-radius: 10px;
  .shift-setting-item-left {
    background-color: #f7f7ff;
  }
  .shift-setting-item-right {
    background-color: #eaebff;
    padding: 14px;
  }
  .shift-setting-item-left-title {
    background-color: #eaebff;
    width: 40px;
    letter-spacing: 6px;
    text-align: center;
    color: $main;
    line-height: 24px;
    font-size: 16px;
    border-radius: 10px 0 0 10px;
  }
}
.label-l {
  width: 100px;
  text-align: right;
}
.title-length {
  font-size: 16px;
  color: #8e95a7;
}
</style>
