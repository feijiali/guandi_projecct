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
            v-model="ruleforms.contract_id_un"
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
      <el-form-item class="form-item-long-small must" label="计量时间：">
        <el-date-picker
          :clearable="false"
          ref="datePicker"
          v-model="ruleforms.engineering_main_time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="班组名称：">
        <el-input
          readonly
          v-model="ruleforms.engineering_main_team"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small must" label="计量起止日期：">
        <el-date-picker
          @change="chooseDate"
          v-model="ruleforms.engineering_main_start_time"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          style="width: 110px"
        >
        </el-date-picker>
        至
        <el-date-picker
          @change="chooseDate"
          v-model="ruleforms.engineering_main_end_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          style="width: 110px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="form-item-long" label="编号：">
        <el-input
          v-model="ruleforms.engineering_main_number"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long-small">
        <a :href="GLOBAL.baseurl + downLoadURL" download="合同计量模版.xlsx">
          <n-button
            :btnText="'下载模板'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </a>
        <el-upload
          v-permission="['ProjectReportEngineeringMain-upload']"
          class="
            upload
            download-item
            position-relative
            useMoney-upload
            d-inline-block
            ml-2
          "
          action="xxxx"
          :show-file-list="false"
          :multiple="false"
          name="UploadFile"
          :http-request="httprequest"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :file-list="fileList"
          :auto-upload="true"
          accept=".xls, .xlsx"
          :ref="'newupload'"
        >
          <n-button
            :btnText="'导入数据'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </el-upload>
      </el-form-item>
      <el-form-item class="form-item-long-small" label="本月应付计量款：">
        <span class="main"
          >{{ ruleforms.engineering_main_pay_money }} (自动计算)</span
        >
      </el-form-item>
      <el-form-item class="form-item-long-small" label="累计应付计量款：">
        <span class="main"
          >{{ ruleforms.engineering_main_for_money }} (自动计算)</span
        >
      </el-form-item>
      <div style="height: 450px">
        <n-scroll>
          <table class="table-origin">
            <tr>
              <td rowspan="3">费用性质</td>
              <td rowspan="3">编号</td>
              <td rowspan="3">工程或费用名称</td>
              <td rowspan="3">单位</td>
              <td colspan="3" rowspan="2">签订合同情况</td>
              <td colspan="3" rowspan="2">设计变更后</td>
              <td colspan="7">实际完成情况</td>
              <td rowspan="3">备注</td>
            </tr>
            <tr>
              <td rowspan="2">单价(元)</td>
              <td colspan="2">本月</td>
              <td colspan="2">至上月累计</td>
              <td colspan="2" style="width: 300px">至本月累计</td>
            </tr>
            <tr>
              <td>数量</td>
              <td>单价(元)</td>
              <td width="100">金额(元)</td>
              <td>数量</td>
              <td>单价(元)</td>
              <td width="100">金额(元)</td>
              <td>数量</td>
              <td width="100">金额(元)</td>
              <td>数量</td>
              <td width="100">金额(元)</td>
              <td>数量</td>
              <td width="100">金额(元)</td>
            </tr>
            <!-- 表格主体区域 -->
            <template v-for="(item, index) in tableList">
              <template v-for="(itm, ind) in item.list">
                <tr
                  :key="ind + '' + index"
                  :class="[
                    itm.engineering_name == '小计' ||
                    itm.engineering_name == '合计'
                      ? 'color-tr'
                      : '',
                  ]"
                >
                  <td :rowspan="item.rowspan" v-if="ind == 0">
                    {{ itm.engineering_type_name }}
                    <div
                      @click="addBlock(index, 1)"
                      class="d-inline-block add-circle-btn"
                    >
                      +
                    </div>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      {{ ind + 1 }}
                      <div
                        v-if="ind + 1 != 1"
                        @click="removeBlock(index, ind, 1)"
                        class="d-inline-block add-circle-btn"
                      >
                        -
                      </div>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <el-select
                        @change="
                          (val) => chooseEngineeringName(val, index, ind)
                        "
                        class="short-input"
                        ref="select"
                        v-model="itm.engineering_name"
                        placeholder="请输入/选择"
                        filterable
                        allow-create
                      >
                        <el-option
                          v-for="(itms, inds) in engineeringNameArr[
                            itm.engineering_type
                          ]"
                          :key="inds"
                          :label="itms.engineering_name"
                          :value="itms.engineering_name"
                        ></el-option>
                      </el-select>
                    </template>
                    <template v-else>
                      {{ itm.engineering_name }}
                    </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <el-input
                        class="short-input"
                        v-model="itm.engineering_rmb"
                        placeholder="自动获取/输入"
                      ></el-input>
                    </template>
                    <template v-else>
                      {{ itm.engineering_rmb }}
                    </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_sign_num',
                              'engineering_sign_num_price',
                              'engineering_sign_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_num"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_sign_num',
                              'engineering_sign_num_price',
                              'engineering_sign_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_num_price"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <div style="width: 150px">
                      <template
                        v-if="
                          itm.number == 1 || itm.number == 2 || itm.number == 4
                        "
                      >
                        {{ itm.engineering_sign_money }}
                      </template>
                      <template v-else-if="itm.number == 3">
                        <num-input
                          :fixedNum="2"
                          @change="(val) => proportionFun(index, ind)"
                          unit="%"
                          :isString="true"
                          class="short-input-small"
                          v-model="itm.engineering_sign_money_ratio"
                          placeholder="输入比例"
                        >
                        </num-input>
                        = {{ itm.engineering_sign_money }}
                      </template>
                      <template v-else>
                        {{ itm.engineering_sign_money }}
                      </template>
                    </div>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_sign_change_num',
                              'engineering_sign_change_price',
                              'engineering_sign_change_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_change_num"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else></template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_sign_change_num',
                              'engineering_sign_change_price',
                              'engineering_sign_change_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_change_price"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template
                      v-if="
                        itm.number == 1 || itm.number == 2 || itm.number == 4
                      "
                      >{{ itm.engineering_sign_change_money }}
                    </template>
                    <template v-else-if="itm.number == 3">
                      <span v-if="itm.engineering_sign_change_money">{{
                        itm.engineering_sign_change_money
                      }}</span>
                      <span
                        style="width: 100px"
                        v-else
                        class="text-secondary-2 d-inline-block"
                        >获取比例</span
                      >
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_result_nowmonth_num',
                              'engineering_result_price',
                              'engineering_result_nowmonth_money',
                              true
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_price"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_result_nowmonth_num',
                              'engineering_result_price',
                              'engineering_result_nowmonth_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_nowmonth_num"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template
                      v-if="
                        itm.number == 1 || itm.number == 2 || itm.number == 4
                      "
                      >{{ itm.engineering_result_nowmonth_money }}
                    </template>
                    <template v-else-if="itm.number == 3">
                      <span v-if="itm.engineering_result_nowmonth_money">{{
                        itm.engineering_result_nowmonth_money
                      }}</span>
                      <span class="text-secondary-2" v-else>获取比例</span>
                    </template>
                    <template v-else>
                      {{ itm.engineering_result_nowmonth_money }}
                    </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_result_for_numc',
                              'engineering_result_price',
                              'engineering_result_for_moneyc'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_for_numc"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template
                      v-if="
                        itm.number == 1 || itm.number == 2 || itm.number == 4
                      "
                      >{{ itm.engineering_result_for_moneyc }}
                    </template>
                    <template v-else-if="itm.number == 3">
                      <span v-if="itm.engineering_result_for_moneyc">{{
                        itm.engineering_result_for_moneyc
                      }}</span>
                      <span class="text-secondary-2" v-else>获取比例</span>
                    </template>
                    <template v-else>
                      {{ itm.engineering_result_for_moneyc }}
                    </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 1">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            calculateFun(
                              index,
                              ind,
                              'engineering_result_for_nume',
                              'engineering_result_price',
                              'engineering_result_for_moneye'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_for_nume"
                        placeholder="自动获取/输入"
                      >
                      </num-input>
                    </template>
                    <template v-else> </template>
                  </td>
                  <td>
                    <template
                      v-if="
                        itm.number == 1 || itm.number == 2 || itm.number == 4
                      "
                      >{{ itm.engineering_result_for_moneye }}
                    </template>
                    <template v-else-if="itm.number == 3">
                      <span v-if="itm.engineering_result_for_moneye">{{
                        itm.engineering_result_for_moneye
                      }}</span>
                      <span
                        style="width: 100px"
                        class="text-secondary-2 d-inline-block"
                        v-else
                        >获取比例</span
                      >
                    </template>
                    <template v-else>
                      {{ itm.engineering_result_for_moneye }}
                    </template>
                  </td>
                  <td>
                    <el-input
                      class="short-input"
                      v-model="itm.engineering_text"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                </tr>
              </template>
            </template>
            <!-- 表格主体区域 -->
            <template v-for="(itm, ind) in tableList2">
              <tr :key="ind">
                <td colspan="3">
                  {{ itm.engineering_type_name }}
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_rmb"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else> {{ itm.engineering_rmb }} </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_sign_num"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else-if="itm.number == 2"></template>
                  <template v-else> {{ itm.engineering_sign_num }} </template>
                </td>
                <td>
                  <template v-if="itm.number == 2"> </template>
                  <template v-else>
                    <template v-if="itm.number == 5 || itm.number == 1">
                      <num-input
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_num_price"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                    <template v-else>
                      <num-input
                        :isInputChange="true"
                        @emitInput="(val) => meteringFun(ind)"
                        :negative="true"
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_num_price"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_sign_money"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else>
                    {{ itm.engineering_sign_money }}
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 2"> </template>
                  <template v-else>
                    <template v-if="itm.number == 5 || itm.number == 1">
                      <num-input
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_change_num"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                    <template v-else>
                      <num-input
                        :isInputChange="true"
                        @emitInput="(val) => meteringFun(ind)"
                        :negative="true"
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_sign_change_num"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_sign_change_price"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else> </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_sign_change_money"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else>{{
                    itm.engineering_sign_change_money
                  }}</template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_price"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else> </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_nowmonth_num"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else-if="itm.number == 2"> </template>
                  <template v-else>
                    {{ itm.engineering_result_nowmonth_num }}
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_nowmonth_money"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else-if="itm.number == 2">
                    {{ itm.engineering_result_nowmonth_money }}
                  </template>
                  <template v-else-if="itm.number == 3 || itm.number == 4">
                    <num-input
                      :negative="true"
                      :isInputChange="true"
                      @emitInput="(val) => meteringFun(ind)"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_nowmonth_money"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else>
                    <num-input
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_nowmonth_money"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_for_numc"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-if="itm.number == 2 || itm.number == 5">
                  </template>
                  <template v-else-if="itm.number == 3 || itm.number == 4">
                    {{ itm.engineering_result_for_numc }}
                  </template>
                </td>
                <td>
                  <template
                    v-if="itm.number == 1 || itm.number == 3 || itm.number == 4"
                  >
                    <template v-if="itm.number == 3 || itm.number == 4">
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="(val) => meteringFun(ind)"
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_for_moneyc"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                    <template v-else>
                      <num-input
                        :negative="true"
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_for_moneyc"
                        placeholder="请输入"
                      >
                      </num-input>
                    </template>
                  </template>
                  <template v-else-if="itm.number == 2">{{
                    itm.engineering_result_for_moneyc
                  }}</template>
                  <template v-else> </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_for_nume"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template
                    v-else-if="itm.number == 2 || itm.number == 5"
                  ></template>
                  <template v-else-if="itm.number == 3 || itm.number == 4">
                    {{ itm.engineering_result_for_nume }}
                  </template>
                </td>
                <td>
                  <template v-if="itm.number == 1">
                    <num-input
                      :negative="true"
                      :fixedNum="2"
                      :isString="true"
                      class="short-input"
                      v-model="itm.engineering_result_for_moneye"
                      placeholder="请输入"
                    >
                    </num-input>
                  </template>
                  <template v-else-if="itm.number == 2">{{
                    itm.engineering_result_for_moneye
                  }}</template>
                  <template v-else-if="itm.number == 3 || itm.number == 4">
                    {{ itm.engineering_result_for_moneye }}
                  </template>
                  <template v-else> </template>
                </td>
                <td>
                  <el-input
                    class="short-input"
                    v-model="itm.engineering_text"
                    placeholder="请输入"
                  ></el-input>
                </td>
              </tr>
            </template>

            <!-- 工程扣款情况区域 -->
            <template v-for="(item, index) in tableList3">
              <template v-for="(itm, ind) in item.list">
                <tr
                  :key="ind + '' + index + 's'"
                  :class="[
                    itm.engineering_name == '小计' ||
                    itm.engineering_name == '合计'
                      ? 'color-tr'
                      : '',
                  ]"
                >
                  <td :rowspan="item.rowspan" v-if="ind == 0">
                    {{ itm.engineering_type_name }}
                    <div
                      @click="addBlock(index, 2)"
                      class="d-inline-block add-circle-btn"
                    >
                      +
                    </div>
                  </td>
                  <td>
                    <template>
                      {{ ind + 1 }}
                      <div
                        v-if="ind + 1 > 4 && ind + 1 < item.list.length"
                        @click="removeBlock(index, ind, 2)"
                        class="d-inline-block add-circle-btn"
                      >
                        -
                      </div>
                    </template>
                  </td>
                  <td>
                    <template v-if="itm.number == 4">
                      <el-input
                        class="short-input"
                        v-model="itm.engineering_name"
                        placeholder="请输入"
                      ></el-input>
                    </template>
                    <template v-else>
                      {{ itm.engineering_name }}
                    </template>
                  </td>
                  <td>
                    {{ itm.engineering_rmb }}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <template v-if="itm.number == 5">{{
                      itm.engineering_result_nowmonth_money
                    }}</template>
                    <template v-else>
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            deductionFun(
                              index,
                              ind,
                              'engineering_result_nowmonth_money',
                              'engineering_result_for_moneyc'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_nowmonth_money"
                        placeholder="请输入"
                      >
                      </num-input
                    ></template>
                  </td>
                  <td></td>
                  <td>
                    <template v-if="itm.number == 5">{{
                      itm.engineering_result_for_moneyc
                    }}</template>
                    <template v-else>
                      <num-input
                        :negative="true"
                        :isInputChange="true"
                        @emitInput="
                          (val) =>
                            deductionFun(
                              index,
                              ind,
                              'engineering_result_for_moneyc',
                              'engineering_result_nowmonth_money'
                            )
                        "
                        :fixedNum="2"
                        :isString="true"
                        class="short-input"
                        v-model="itm.engineering_result_for_moneyc"
                        placeholder="请输入"
                      >
                      </num-input
                    ></template>
                  </td>
                  <td></td>
                  <td>
                    {{ itm.engineering_result_for_moneye }}
                  </td>
                  <td>
                    <el-input
                      class="short-input"
                      v-model="itm.engineering_text"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                </tr>
              </template>
            </template>
          </table>
        </n-scroll>
      </div>
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
import upload from "@/mixins/upload";

export default {
  mixins: [measurement, upload],
  data() {
    return {
      downLoadURL: "/MOULD/contractEngineeringExport.xlsx",
      ruleforms: {
        contract_name: "", //合同名称
        contract_number: "", //合同编号
        engineering_main_id: null,
        engineering_approve_info_id_un: null,
        organ_id_un: null,
        contract_id_un: null,
        engineering_main_time: dayjs().format("YYYY-MM-DD"),
        engineering_main_start_time: dayjs().format("YYYY-MM-DD"),
        engineering_main_end_time: dayjs().format("YYYY-MM-DD"),
        engineering_main_number: "",
        engineering_main_team: "",
        engineering_main_pay_money: "0.00",
        engineering_main_for_money: "0.00",
        engineering_main_file: "",
        engineering_main_file_json: "",
        engineering_main_pic: "",
        engineering_main_pic_json: "",
        engineering_sub_id: null,
        list: [],
      },
      fileList: [],
      rules: {
        organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        contract_id_un: [
          {
            required: true,
            message: "请输入合同名称",
          },
        ],
        engineering_main_time: [
          {
            required: true,
            message: "请选择计量时间",
          },
        ],
        engineering_main_team: [
          {
            required: true,
            message: "请选择班组名称",
          },
        ],
        engineering_main_start_time: [
          {
            required: true,
            message: "请选择计量开始日期",
          },
        ],
        engineering_main_end_time: [
          {
            required: true,
            message: "请选择计量结束日期",
          },
        ],
      },
      tableList: [
        {
          rowspan: 5,
          list: [
            {
              number: 1,
              isBlock: true,
              engineering_type_name: "合同工程完成情况",
              engineering_type: 1,
              engineering_name: "",
              engineering_rmb: "",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 2,
              engineering_type_name: "合同工程完成情况",
              engineering_type: 1,
              engineering_name: "不含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 3,
              engineering_type_name: "合同工程完成情况",
              engineering_type: 1,
              engineering_name: "增值税税金金额",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_money_ratio: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "",
              engineering_text: "",
            },
            {
              number: 4,
              engineering_type_name: "合同工程完成情况",
              engineering_type: 1,
              engineering_name: "含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 5,
              engineering_type_name: "合同工程完成情况",
              engineering_type: 1,
              engineering_name: "小计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
          ],
        },
        {
          rowspan: 5,
          list: [
            {
              number: 1,
              isBlock: true,
              engineering_type_name: "补充合同",
              engineering_type: 2,
              engineering_name: "",
              engineering_rmb: "",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 2,
              engineering_type_name: "补充合同",
              engineering_type: 2,
              engineering_name: "不含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 3,
              engineering_type_name: "补充合同",
              engineering_type: 2,
              engineering_name: "增值税税金金额",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_money_ratio: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "",
              engineering_text: "",
            },
            {
              number: 4,
              engineering_type_name: "补充合同",
              engineering_type: 2,
              engineering_name: "含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 5,
              engineering_type_name: "补充合同",
              engineering_type: 2,
              engineering_name: "小计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
          ],
        },
        {
          rowspan: 5,
          list: [
            {
              number: 1,
              isBlock: true,
              engineering_type_name: "变更工程",
              engineering_type: 3,
              engineering_name: "",
              engineering_rmb: "",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 2,
              engineering_type_name: "变更工程",
              engineering_type: 3,
              engineering_name: "不含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 3,
              engineering_type_name: "变更工程",
              engineering_type: 3,
              engineering_name: "增值税税金金额",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_money_ratio: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "",
              engineering_text: "",
            },
            {
              number: 4,
              engineering_type_name: "变更工程",
              engineering_type: 3,
              engineering_name: "含增值税金额合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 5,
              engineering_type_name: "变更工程",
              engineering_type: 3,
              engineering_name: "小计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "0.00",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "0.00",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
          ],
        },
      ],
      // 中间部分
      tableList2: [
        {
          number: 1,
          engineering_type_name: "扣除领用材料",
          engineering_type: 4,
          engineering_name: "",
          engineering_rmb: "",
          engineering_sign_num: "",
          engineering_sign_num_price: "",
          engineering_sign_money: "",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "",
          engineering_result_nowmonth_money: "",
          engineering_result_for_numc: "",
          engineering_result_for_moneyc: "",
          engineering_result_for_nume: "",
          engineering_result_for_moneye: "",
          engineering_text: "",
        },
        {
          number: 2,
          engineering_type_name: "合计",
          engineering_type: 5,
          engineering_name: "",
          engineering_rmb: "元",
          engineering_sign_num: "",
          engineering_sign_num_price: "",
          engineering_sign_money: "0.00",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "0.00",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "",
          engineering_result_nowmonth_money: "0.00",
          engineering_result_for_numc: "",
          engineering_result_for_moneyc: "0.00",
          engineering_result_for_nume: "",
          engineering_result_for_moneye: "0.00",
          engineering_text: "",
        },
        {
          number: 3,
          engineering_type_name: "本期计量金额构成",
          engineering_type: 6,
          engineering_name: "",
          engineering_rmb: "元",
          engineering_sign_num: "人工费",
          engineering_sign_num_price: "",
          engineering_sign_money: "材料费",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "机械费",
          engineering_result_nowmonth_money: "",
          engineering_result_for_numc: "其它",
          engineering_result_for_moneyc: "",
          engineering_result_for_nume: "合计",
          engineering_result_for_moneye: "0.00",
          engineering_text: "",
        },
        {
          number: 4,
          engineering_type_name: "累计计量金额构成",
          engineering_type: 7,
          engineering_name: "",
          engineering_rmb: "元",
          engineering_sign_num: "人工费",
          engineering_sign_num_price: "",
          engineering_sign_money: "材料费",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "机械费",
          engineering_result_nowmonth_money: "",
          engineering_result_for_numc: "其它",
          engineering_result_for_moneyc: "",
          engineering_result_for_nume: "合计",
          engineering_result_for_moneye: "0.00",
          engineering_text: "",
        },
        {
          number: 5,
          engineering_type_name: "班组施工人员数量",
          engineering_type: 8,
          engineering_name: "",
          engineering_rmb: "人",
          engineering_sign_num: "本月",
          engineering_sign_num_price: "",
          engineering_sign_money: "累计",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "平均",
          engineering_result_nowmonth_money: "",
          engineering_result_for_numc: "",
          engineering_result_for_moneyc: "",
          engineering_result_for_nume: "",
          engineering_result_for_moneye: "",
          engineering_text: "",
        },
      ],
      // 工程扣款情况
      tableList3: [
        {
          rowspan: 5,
          list: [
            {
              number: 1,
              engineering_type_name: "工程扣款情况",
              engineering_type: 9,
              engineering_name: "保留金",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 2,
              engineering_type_name: "工程扣款情况",
              engineering_type: 9,
              engineering_name: "其他扣款",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 3,
              engineering_type_name: "工程扣款情况",
              engineering_type: 9,
              engineering_name: "变更工程扣款",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 4,
              engineering_type_name: "工程扣款情况",
              engineering_type: 9,
              engineering_name: "",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
            {
              number: 5,
              engineering_type_name: "工程扣款情况",
              engineering_type: 9,
              engineering_name: "合计",
              engineering_rmb: "元",
              engineering_sign_num: "",
              engineering_sign_num_price: "",
              engineering_sign_money: "",
              engineering_sign_change_num: "",
              engineering_sign_change_price: "",
              engineering_sign_change_money: "",
              engineering_result_price: "",
              engineering_result_nowmonth_num: "",
              engineering_result_nowmonth_money: "0.00",
              engineering_result_for_numc: "",
              engineering_result_for_moneyc: "0.00",
              engineering_result_for_nume: "",
              engineering_result_for_moneye: "0.00",
              engineering_text: "",
            },
          ],
        },
      ],
      importData: {}, //导入数据
      contractArr: [], //通过审批的合同名称
      mainTeamArr: [], //班组名称
      from: Number(this.$route.query.from), //1-来自合同台账 2-来自班组计量
      engineeringNameArr: [[], [], []], //工程费用名称历史记录
      contract_id_un:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //合同id
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {
    if (this.contract_id_un) {
      // 查询合同详情
      this.queryOAContractApproval();
    } else {
      // 查询通过审批的合同
      this.queryOAContractApprovalList();
    }
    [1, 2, 3].forEach(async (item) => {
      // 获取M每个类型对应的工程费用名称历史记录
      await this.getEngineeringNameArr(item);
    });
  },
  methods: {
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      let that = this;
      that.fileList = [file];
    },
    httprequest() {
      let that = this;
      that.importData.uploadFile = that.fileList[0].raw;
      that
        .uploadFile([], that.importData, "ImportProjectReportEngineeringMain")
        .then((res) => {
          that.rebackTable(res.result);
        });
    },
    rebackTable(list) {
      let arr1 = list.filter((item) => item.engineering_type == 1); //合同工程完成情况
      let arr2 = list.filter((item) => item.engineering_type == 2); //补充合同
      let arr3 = list.filter((item) => item.engineering_type == 3); //变更工程
      let arr4 = list.filter(
        (item) =>
          item.engineering_type == 4 ||
          item.engineering_type == 5 ||
          item.engineering_type == 6 ||
          item.engineering_type == 7 ||
          item.engineering_type == 8
      ); //4:扣除领用材料
      let arr5 = list.filter((item) => item.engineering_type == 9); //工程扣款情况
      this.filterDataFun(arr1, 1);
      this.filterDataFun(arr2, 2);
      this.filterDataFun(arr3, 3);
      this.filterDataFun(arr4, 4, true);
      this.filterDataFun(arr5, 5, true);
      this.tableList[0].list = arr1.length ? arr1 : this.tableList[0].list;
      this.tableList[1].list = arr2.length ? arr2 : this.tableList[1].list;
      this.tableList[2].list = arr3.length ? arr3 : this.tableList[2].list;
      this.tableList[0].rowspan = arr1.length || this.tableList[0].rowspan;
      this.tableList[1].rowspan = arr2.length || this.tableList[1].rowspan;
      this.tableList[2].rowspan = arr3.length || this.tableList[2].rowspan;
      this.tableList2 = arr4.length ? arr4 : his.tableList2;
      this.tableList3[0].list = arr5.length ? arr5 : this.tableList3[0].list;
      this.tableList3[0].rowspan = arr5.length || this.tableList3[0].rowspan;
    },
    filterDataFun(arr, type, bool) {
      let nameArr = [
        "engineering_sign_num",
        "engineering_sign_num_price",
        "engineering_sign_money",
        "engineering_sign_change_num",
        "engineering_sign_change_price",
        "engineering_sign_change_money",
        "engineering_result_price",
        "engineering_result_nowmonth_num",
        "engineering_result_nowmonth_money",
        "engineering_result_for_numc",
        "engineering_result_for_moneyc",
        "engineering_result_for_nume",
        "engineering_result_for_moneye",
      ];
      let fixedNameArr = [
        "不含增值税金额合计",
        "增值税税金金额（13%）",
        "含增值税金额合计",
        "小计",
      ];
      let fixedNameArr2 = ["变更工程扣款", "其他扣款", "保留金（5%）", "小计"];
      if (arr.length) {
        let n = 0;
        arr.forEach((item, index) => {
          if (type == 1 || type == 2 || type == 3) {
            index == 0 && !bool && (item.isBlock = true);
            if (
              fixedNameArr.indexOf(
                item.engineering_name.replace(/(^\s*)|(\s*$)/g, "")
              ) == -1
            ) {
              item.number = 1;
              n++;
            } else {
              item.number = index + 1 - (n - 1);
            }
          } else if (type == 4) {
            //中间扣除领用材料部分
            item.number = index + 1;
          } else {
            //工程扣款情况
            if (
              fixedNameArr2.indexOf(
                item.engineering_name.replace(/(^\s*)|(\s*$)/g, "")
              ) == -1
            ) {
              item.number = 4;
            } else {
              item.number = index + 1;
            }
          }

          // 将所有输入数字的字段四舍五入保留2位小数
          for (let key in item) {
            if (nameArr.indexOf(key) != -1) {
              if (this.isNumber(item[key])) {
                item[key] = Number(item[key]).toFixed(2);
              } else {
                item[key] = item[key];
              }
            }
          }
        });
      }
    },
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg =
        /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    chooseOrgan(val) {
      this.queryOAContractApprovalList();
    },
    // 查询通过审批的合同
    async queryOAContractApprovalList() {
      let { result } = await api.queryOAContractApprovalList({
        revise_info_state: 3,
        organ_node: this.ruleforms.organ_id_un
          ? this.ruleforms.organ_id_un
          : "",
      });
      this.contractArr = result;
    },
    // 选择日期判断
    chooseDate() {
      if (
        this.ruleforms.engineering_main_start_time &&
        this.ruleforms.engineering_main_end_time
      ) {
        let startTime = new Date(this.ruleforms.engineering_main_start_time);
        let endTime = new Date(this.ruleforms.engineering_main_end_time);
        if (startTime - endTime > 0) {
          this.$tip({
            isTip: true,
            message: "开始日期不能大于结束日期",
          });
          this.ruleforms.engineering_main_start_time = "";
          this.ruleforms.engineering_main_end_time = "";

          return;
        }
      }
    },
    async queryOAContractApproval() {
      let { result } = await api.queryOAContractApproval({
        contract_approval_id: this.contract_id_un,
      });
      let json = {
        contract_approval_id: "contract_id_un",
        contract_approval_organ_id_union: "organ_id_un",
        contract_approval_name: "contract_name",
        contract_approval_number: "contract_number",
        contract_approval_supplier: "engineering_main_team",
      };
      for (var key in json) {
        this.$set(this.ruleforms, json[key], result[0][key]);
      }
    },
    // 选择合同名称
    chooseContract(val) {
      let json = this.contractArr.filter(
        (item) => item.contract_approval_id == val
      );
      this.ruleforms.contract_number = json[0].contract_approval_number;
      this.ruleforms.engineering_main_team = json[0].contract_approval_supplier;
    },
    // 选择工程或费用名称
    chooseEngineeringName(val, index, ind) {
      let nameArr = [
        "不含增值税金额合计",
        "增值税税金金额",
        "增值税税金金额（13%）",
        "含增值税金额合计",
        "小计",
      ];
      if (nameArr.indexOf(val) == -1) {
        let inds = this.engineeringNameArr[index + 1].findIndex(
          (item) => item.engineering_name.replace(/(^\s*)|(\s*$)/g, "") == val
        );
        if (inds != -1) {
          let currentData = this.engineeringNameArr[index + 1][inds];
          // 选择后后面的类目自动填充
          let jsonArr = [
            "engineering_rmb",
            "engineering_sign_num",
            "engineering_sign_num_price",
            "engineering_sign_change_num",
            "engineering_sign_change_price",
            "engineering_result_price",
            "engineering_result_for_numc",
            "engineering_result_for_nume",
          ];
          jsonArr.forEach((item) => {
            this.tableList[index].list[ind][item] = currentData[item];
          });
        }
      } else {
        this.$tip({
          isTip: true,
          message: "不能输入此名字！",
        });
        this.tableList[index].list[ind].engineering_name = "";
        return;
      }
    },
    async getEngineeringNameArr(item) {
      let { result } = await api.QueryProjectReportEngineeringMainHistory({
        contract_id_un: this.contract_id_un,
        engineering_type: item,
      });
      let nameArr = [
        "不含增值税金额合计",
        "增值税税金金额",
        "含增值税金额合计",
        "小计",
      ];
      result = result.filter(
        (item) =>
          item.engineering_name.replace(/(^\s*)|(\s*$)/g, "") &&
          nameArr.indexOf(item.engineering_name) == -1
      );
      this.$set(this.engineeringNameArr, item, result);
    },
    addBlock(ind, ind2) {
      if (ind2 == 1) {
        let json = {
          number: 1,
          engineering_type_name: "合同工程完成情况",
          engineering_type: ind + 1,
          engineering_name: "",
          engineering_rmb: "",
          engineering_sign_num: "",
          engineering_sign_num_price: "",
          engineering_sign_money: "0.00",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "0.00",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "",
          engineering_result_nowmonth_money: "0.00",
          engineering_result_for_numc: "",
          engineering_result_for_moneyc: "0.00",
          engineering_result_for_nume: "",
          engineering_result_for_moneye: "0.00",
          engineering_text: "",
        };
        this.tableList[ind].list.splice(1, 0, json);
        this.tableList[ind].rowspan++;
      } else {
        let json = {
          number: 4,
          engineering_type_name: "工程扣款情况",
          engineering_type: 9,
          engineering_name: "",
          engineering_rmb: "元",
          engineering_sign_num: "",
          engineering_sign_num_price: "",
          engineering_sign_money: "",
          engineering_sign_change_num: "",
          engineering_sign_change_price: "",
          engineering_sign_change_money: "",
          engineering_result_price: "",
          engineering_result_nowmonth_num: "",
          engineering_result_nowmonth_money: "",
          engineering_result_for_numc: "",
          engineering_result_for_moneyc: "",
          engineering_result_for_nume: "",
          engineering_result_for_moneye: "0.00",
          engineering_text: "",
        };
        this.tableList3[ind].list.splice(4, 0, json);
        this.tableList3[ind].rowspan++;
      }
    },
    // 移除添加项
    removeBlock(ind, ind1, ind2) {
      if (ind2 == 1) {
        this.tableList[ind].list.splice(ind1, 1);
        this.tableList[ind].rowspan--;
      } else {
        this.tableList3[ind].list.splice(ind1, 1);
        this.tableList3[ind].rowspan--;
      }
    },
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
        return;
      }
      let file_obj = { uploadFileModule: "ProjectReportEngineeringMain" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.engineering_main_pic = picsjson.file;
      this.ruleforms.engineering_main_file = filejson.file;
      this.ruleforms.engineering_main_pic_json = picsjson.file_json;
      this.ruleforms.engineering_main_file_json = filejson.file_json;
      this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdata = {
        ...data,
        ...this.ruleforms,
      };
      // this.tableList[0].list = this.tableList[0].list.filter(
      //   (item) => item.engineering_name
      // );
      // this.tableList[1].list = this.tableList[0].list.filter(
      //   (item) => item.engineering_name
      // );
      // this.tableList[2].list = this.tableList[0].list.filter(
      //   (item) => item.engineering_name
      // );
      let arr = [
        ...this.tableList[0].list,
        ...this.tableList[1].list,
        ...this.tableList[2].list,
        ...this.tableList2,
        ...this.tableList3[0].list,
      ];
      subdata.list = arr;
      // return;
      let res = await api.UploadProjectReportEngineeringMain(subdata);
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
.color-tr {
  background-color: lightblue;
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
