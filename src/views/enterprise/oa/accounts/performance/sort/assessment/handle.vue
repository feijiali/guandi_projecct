<template>
  <div class="h-100 w-100 table-list-wrap">
    <n-dialog
      ref="dialog1"
      :diaTit="'选择考核责任人'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose1"
          class="single-choose-person"
          :isSingle="true"
          :personID="ruleform.basic_principal_account_id_union"
          :section="this.$organ_id_en_or_pro(this)"
          @choosePersonFun="choosePersonFun1"
        ></n-choose-person>
      </template>
    </n-dialog>

    <n-dialog
      ref="dialog2"
      :diaTit="'选择直属上级'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose2"
          :personIDsArr="personIDsArr2"
          :isAllSections="true"
          @choosePersonNodes="(data) => choosePersonFun(data, 2)"
        ></n-choose-person>
      </template>
    </n-dialog>

    <n-dialog
      ref="dialog3"
      :diaTit="'选择考核组'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose3"
          :personIDsArr="personIDsArr3"
          :isAllSections="true"
          @choosePersonNodes="(data) => choosePersonFun(data, 3)"
        ></n-choose-person>
      </template>
    </n-dialog>

    <n-dialog
      ref="dialog4"
      :diaTit="'选择上级领导'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose4"
          :personIDsArr="personIDsArr4"
          :isAllSections="true"
          @choosePersonNodes="(data) => choosePersonFun(data, 4)"
        ></n-choose-person>
      </template>
    </n-dialog>

    <n-dialog
      ref="dialog5"
      :diaTit="'选择不参与的考核人员'"
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose5"
          :personIDsArr="personIDsArr5"
          :sections="organ_ids"
          @choosePersonNodes="(data) => choosePersonFun(data, 5)"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <nInfoTitle class="mb-2" title="绩效考核明细" />
          <div class="layer-table-box">
            <table
              class="w-100"
              border="1"
              cellspacing="0"
              bordercolor="#dcdfe6"
            >
              <thead>
                <tr>
                  <th></th>
                  <th>考核指标具体描述及评分标准</th>
                  <th>设置分值（分）</th>
                  <th>增减项</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, i) in ration">
                  <tr :key="i + 'a'">
                    <td
                      v-if="i == 0"
                      :rowspan="ration.length"
                      class="text-center"
                    >
                      <div class="d-flex-cen">
                        <el-popover
                          placement="bottom"
                          title
                          width="140"
                          trigger="hover"
                          content
                          @hide="(val) => hideFun(1)"
                        >
                          <div class="d-flex align-items-center">
                            <el-input-number
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.evaluation_weight"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            定量指标
                            <span>（{{ item.evaluation_weight }}%）</span>
                          </div>
                        </el-popover>
                        <div
                          class="d-inline-block add-circle-btn"
                          @click.stop="addlist(1, i)"
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="table-w">
                        <div class="table-wl">{{ i + 1 }}、</div>
                        <div class="table-wt">
                          <el-input
                            class="table-wt"
                            rows="1"
                            v-model="item.evaluation_desc"
                            type="textarea"
                          />
                          <!-- <vDivEditor class="table-wt" v-model="item.evaluation_desc" /> -->
                        </div>
                      </div>
                    </td>
                    <td>
                      <el-input-number
                        :precision="0"
                        v-model="item.evaluation_score"
                        controls-position="right"
                        :min="0"
                        :max="maxNumber"
                      ></el-input-number>
                    </td>
                    <td class="text-center">
                      <el-button
                        v-if="i != 0"
                        size="small"
                        type="info"
                        icon="el-icon-close"
                        circle
                        @click.stop="removelist(1, i)"
                      />
                    </td>
                  </tr>
                </template>
                <template v-for="(item, i) in qualitative">
                  <tr :key="i + 'b'">
                    <td
                      v-if="i == 0"
                      :rowspan="qualitative.length"
                      class="text-center"
                    >
                      <div class="dis-flex d-flex-cen">
                        <el-popover
                          placement="bottom"
                          title
                          width="140"
                          trigger="hover"
                          content
                          @hide="(val) => hideFun(2)"
                        >
                          <div class="d-flex align-items-center">
                            <el-input-number
                              style="width: 120px; margin-left: 10px"
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.evaluation_weight"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            定性指标
                            <span>（{{ item.evaluation_weight }}%）</span>
                          </div>
                        </el-popover>
                        <div
                          class="d-inline-block add-circle-btn"
                          @click.stop="addlist(2, i)"
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="table-w">
                        <div class="table-wl">{{ i + 1 }}、</div>
                        <div class="table-wt">
                          <el-input
                            class="table-wt"
                            rows="1"
                            v-model="item.evaluation_desc"
                            type="textarea"
                          />
                          <!-- <vDivEditor
                              class="table-wt"
                              v-model="item.evaluation_desc"
                            /> -->
                        </div>
                      </div>
                    </td>
                    <td>
                      <el-input-number
                        :precision="0"
                        v-model="item.evaluation_score"
                        controls-position="right"
                        :min="0"
                        :max="maxNumber"
                      ></el-input-number>
                    </td>
                    <td class="text-center">
                      <el-button
                        v-if="i != 0"
                        size="small"
                        type="info"
                        icon="el-icon-close"
                        circle
                        @click.stop="removelist(2, i)"
                      />
                    </td>
                  </tr>
                </template>

                <template v-for="(item, i) in superiorRating">
                  <tr :key="i + 'c'">
                    <td
                      v-if="i == 0"
                      :rowspan="superiorRating.length"
                      class="text-center"
                    >
                      <div class="dis-flex d-flex-cen">
                        <el-popover
                          placement="bottom"
                          title
                          width="140"
                          trigger="hover"
                          content
                          @hide="(val) => hideFun(3)"
                        >
                          <div class="d-flex align-items-center">
                            <el-input-number
                              style="width: 120px; margin-left: 10px"
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.evaluation_weight"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            上级评分
                            <span>（{{ item.evaluation_weight }}%）</span>
                          </div>
                        </el-popover>
                        <div
                          class="d-inline-block add-circle-btn"
                          @click.stop="addlist(3, i)"
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="table-w">
                        <div class="table-wl">{{ i + 1 }}、</div>
                        <div class="table-wt">
                          <el-input
                            class="table-wt"
                            rows="1"
                            v-model="item.evaluation_desc"
                            type="textarea"
                          />
                          <!-- <vDivEditor
                              class="table-wt"
                              v-model="item.evaluation_desc"
                            /> -->
                        </div>
                      </div>
                    </td>
                    <td>
                      <el-input-number
                        :precision="0"
                        v-model="item.evaluation_score"
                        controls-position="right"
                        :min="0"
                        :max="maxNumber"
                      ></el-input-number>
                    </td>
                    <td class="text-center">
                      <el-button
                        v-if="i != 0"
                        size="small"
                        type="info"
                        icon="el-icon-close"
                        circle
                        @click.stop="removelist(3, i)"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div class="clear">
            <div class="w-50 float-right pl-05 pr-05">
              <nInfoTitle class="m-2" title="考核人员信息设置" />
              <div class="clear mb-1 d-flex align-items-center">
                <el-form-item class="form-item-long must" label="考核责任人：">
                  <el-input
                    readonly
                    class="el-input-person"
                    v-model="ruleform.basic_principal_account_name"
                    placeholder="请选择"
                  ></el-input>
                  <div
                    class="d-inline-block add-circle-btn ml-1"
                    @click="showTargerAddLayer(1)"
                  >
                    +
                  </div>
                </el-form-item>
              </div>
              <el-form-item
                class="form-item-long"
                label="直属上级："
                v-if="reviewer_types.includes(1)"
              >
                <nAddItemContent @addFun="showTargerAddLayer(2)">
                  <template slot="content-add">
                    <div v-if="personArr2.length == 0" class="pl-05 pr-05">
                      <span class="grey2">选择直属上级</span>
                    </div>
                    <template v-else>
                      <div
                        class="content-item"
                        v-for="(item, index) in personArr2"
                        :key="index"
                      >
                        <el-popover
                          class="popover-assessment"
                          placement="bottom"
                          title
                          width="200"
                          trigger="click"
                          content
                        >
                          <div class="d-flex align-items-center">
                            权重:
                            <el-input-number
                              style="width: 140px; margin-left: 10px"
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.reviewer_weights"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            {{ item.reviewer_account_name }}
                            <span>权重:【{{ item.reviewer_weights }}%】</span>
                            <i
                              class="iconfont btn-btn_detail_minus_02 font-20"
                              @click="removeReviewer(2, index, item)"
                            ></i>
                          </div>
                        </el-popover>
                      </div>
                    </template>
                  </template>
                </nAddItemContent>
              </el-form-item>
              <el-form-item
                class="form-item-long"
                label="考核组："
                v-if="reviewer_types.includes(2)"
              >
                <nAddItemContent @addFun="showTargerAddLayer(3)">
                  <template slot="content-add">
                    <div v-if="personArr3.length == 0" class="pl-05 pr-05">
                      <span class="grey2">选择考核组</span>
                    </div>
                    <template v-else>
                      <div
                        class="content-item"
                        v-for="(item, index) in personArr3"
                        :key="index"
                      >
                        <el-popover
                          placement="bottom"
                          title
                          width="200"
                          trigger="hover"
                          content
                        >
                          <div class="d-flex align-items-center">
                            权重:
                            <el-input-number
                              style="width: 120px; margin-left: 10px"
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.reviewer_weights"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            {{ item.reviewer_account_name }}
                            <span>权重:【{{ item.reviewer_weights }}%】</span>
                            <i
                              class="iconfont btn-btn_detail_minus_02 font-20"
                              @click="removeReviewer(3, index, item)"
                            ></i>
                          </div>
                        </el-popover>
                      </div>
                    </template>
                  </template>
                </nAddItemContent>
              </el-form-item>
              <el-form-item
                class="form-item-long"
                label="上级领导："
                v-if="reviewer_types.includes(2)"
              >
                <nAddItemContent @addFun="showTargerAddLayer(4)">
                  <template slot="content-add">
                    <div v-if="personArr4.length == 0" class="pl-05 pr-05">
                      <span class="grey2">选择上级领导</span>
                    </div>
                    <template v-else>
                      <div
                        class="content-item"
                        v-for="(item, index) in personArr4"
                        :key="index"
                      >
                        <el-popover
                          placement="bottom"
                          title
                          width="200"
                          trigger="hover"
                          content
                        >
                          <div class="d-flex align-items-center">
                            权重:
                            <el-input-number
                              style="width: 120px; margin-left: 10px"
                              :precision="0"
                              controls-position="right"
                              :min="0"
                              :max="100"
                              v-model="item.reviewer_weights"
                            ></el-input-number>
                          </div>
                          <div slot="reference">
                            {{ item.reviewer_account_name }}
                            <span>权重:【{{ item.reviewer_weights }}%】</span>
                            <i
                              class="iconfont btn-btn_detail_minus_02 font-20"
                              @click="removeReviewer(4, index, item)"
                            ></i>
                          </div>
                        </el-popover>
                      </div>
                    </template>
                  </template>
                </nAddItemContent>
              </el-form-item>
            </div>
            <div class="w-50 float-left pl-05 pr-05">
              <nInfoTitle class="m-2" title="考核基础设置" />
              <el-form-item class="form-item-long must" label="考核类型：">
                <el-select v-model="ruleform.basic_type" placeholder="请选择">
                  <el-option :value="1" label="年度考核"></el-option>
                  <el-option :value="2" label="季度考核"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-item-long must" label="年份：">
                <el-date-picker
                  v-model="ruleform.basic_year"
                  value-format="yyyy"
                  type="year"
                  placeholder="选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                class="form-item-long must"
                label="季度："
                v-if="ruleform.basic_type == 2"
              >
                <el-select v-model="ruleform.basic_quarter">
                  <el-option :value="1" label="第一季度"></el-option>
                  <el-option :value="2" label="第二季度"></el-option>
                  <el-option :value="3" label="第三季度"></el-option>
                  <el-option :value="4" label="第四季度"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-item-long must" label="考核有效期：">
                <el-date-picker
                  v-model="ruleform.basic_end_time"
                  :clearable="false"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="请选择考核有效期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="form-item-long must" label="考核范围：">
                <n-treeselect
                  :show-sure="true"
                  ref="treeselect"
                  @check-change="handleCheckedChange"
                  :default-expand-all="true"
                  :multiValue="ruleform.organ_ids"
                  :showNodeName="false"
                  :treeData="treeData"
                  :show-checkbox="true"
                  :checkStrictly="false"
                  :Isvalue="true"
                  :defaultExpandAll="false"
                />
              </el-form-item>
              <el-form-item
                class="form-item-long form-item-long-height"
                label="其他选择："
              >
                <nAddItemContent @addFun="showTargerAddLayer(5)">
                  <template slot="content-add">
                    <div v-if="personArr5.length == 0" class="pl-05 pr-05">
                      <span class="grey2">选择不参与的考核人员</span>
                    </div>
                    <template v-else>
                      <div
                        class="content-item"
                        v-for="(item, index) in personArr5"
                        :key="index"
                      >
                        <span>{{ item.account_name }}</span>
                        <i
                          class="iconfont btn-btn_detail_minus_02 font-20"
                          @click="removeReviewer(5, index, item)"
                        ></i>
                      </div>
                    </template>
                  </template>
                </nAddItemContent>
                <!-- </template> -->
              </el-form-item>
              <nInfoTitle class="m-2" title="考评规则设置" />
              <div>
                <div class="mb-1">
                  <div class="border rounded-2 d-inline-block px-2 py-1">
                    100 分
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div
                    class="d-flex flex-column text-center"
                    style="width: 50px"
                  >
                    <div>
                      <img
                        src="@/assets/images/enterprise/icon_score_high.png"
                        alt
                        srcset
                      />
                    </div>
                    <div>
                      <img
                        src="@/assets/images/enterprise/icon_score_arrowdown.png"
                        alt
                        srcset
                      />
                    </div>
                    <div>
                      <img
                        src="@/assets/images/enterprise/icon_score_low.png"
                        alt
                        srcset
                      />
                    </div>
                  </div>
                  <div class="flex-fill input-number-w">
                    <template v-for="(item, i) in ruleform.rank_rules">
                      <div
                        :class="[
                          'd-flex justify-content-between align-items-center',
                          { 'mb-2': i != 3 },
                        ]"
                        :key="i"
                      >
                        <el-input
                          :value="item.rank_rules_level"
                          readonly
                        ></el-input>
                        <span class="pl-05 pr-05">=</span>
                        <el-input-number
                          :precision="0"
                          :min="
                            ruleform.rank_rules[i + 1]
                              ? ruleform.rank_rules[i + 1].rank_rules_max
                                ? ruleform.rank_rules[i + 1].rank_rules_max + 1
                                : 0
                              : 0
                          "
                          v-model="item.rank_rules_min"
                          :disabled="item.rank_rules_level == 'D'"
                          controls-position="right"
                          @change="changeMin(i)"
                          :max="item.rank_rules_max ? item.rank_rules_max : 100"
                        >
                          <span slot="append">分</span>
                        </el-input-number>
                        <span class="pl-05 pr-05">~</span>
                        <el-input-number
                          :precision="0"
                          class="input-append"
                          :min="
                            item.rank_rules_min ? item.rank_rules_min + 1 : 0
                          "
                          :disabled="item.rank_rules_level == 'A'"
                          :max="
                            ruleform.rank_rules[i - 1]
                              ? ruleform.rank_rules[i - 1].rank_rules_min
                                ? ruleform.rank_rules[i - 1].rank_rules_min - 1
                                : 100
                              : 100
                          "
                          controls-position="right"
                          v-model="item.rank_rules_max"
                        >
                          <span slot="append">分</span>
                        </el-input-number>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
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
import throttle from "@/mixins/throttle";
export default {
  mixins: [confirm, throttle],
  data() {
    return {
      defaultProps: {
        value: "tag",
        children: "leaves",
        label: "organ",
        partentLabel: "organ_parent_node_name",
      },
      title: "",
      reviewer_type: null,
      reviewer_types: [1, 2, 3],
      organ_ids: [],
      ruleform: {
        basic_type: null,
        basic_year: "",
        basic_quarter: null,
        basic_end_time: "",
        organ_ids: "",
        basic_principal_account_id_union: null,
        basic_total_num: 0,
        basic_finish_num: 0,
        basic_avg_score: 0,
        basic_not_join_account_ids: "",
        basic_state: 0,
        basic_sub_account_id_union: 0,
        basic_sub_time: "",
        basic_principal_account_name: "",
        evaluation: [],
        rank_rules: [
          {
            rank_rules_id: 0,
            rank_rules_basic_id_union: 0,
            rank_rules_level: "A",
            rank_rules_min: 0,
            rank_rules_max: 100,
          },
          {
            rank_rules_id: 0,
            rank_rules_basic_id_union: 0,
            rank_rules_level: "B",
            rank_rules_min: 0,
            rank_rules_max: 0,
          },
          {
            rank_rules_id: 0,
            rank_rules_basic_id_union: 0,
            rank_rules_level: "C",
            rank_rules_min: 0,
            rank_rules_max: 0,
          },
          {
            rank_rules_id: 0,
            rank_rules_basic_id_union: 0,
            rank_rules_level: "D",
            rank_rules_min: 0,
            rank_rules_max: 0,
          },
        ],
        reviewer: [],
      },
      rules: {
        basic_type: [
          {
            required: true,
            message: "请选择考核类型",
          },
        ],
        basic_year: [
          {
            required: true,
            message: "请选择年份",
          },
        ],
        basic_end_time: [
          {
            required: true,
            message: "请选择考核有效期",
          },
        ],
        organ_ids: [
          {
            required: true,
            message: "请选择考核范围",
          },
        ],
        basic_principal_account_id_union: [
          {
            required: true,
            message: "请选择考核责任人",
          },
        ],
      },
      ration: [
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 1,
          evaluation_weight: 60,
          evaluation_desc: "工作质量",
          evaluation_score: 50,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 1,
          evaluation_weight: 60,
          evaluation_desc: "工作计划完成率",
          evaluation_score: 20,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 1,
          evaluation_weight: 60,
          evaluation_desc: "工程进度",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 1,
          evaluation_weight: 60,
          evaluation_desc: "安全指标",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 1,
          evaluation_weight: 60,
          evaluation_desc: "预算资金使用率",
          evaluation_score: 10,
        },
      ],
      qualitative: [
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "思想政治学习及业务学习情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "工作态度和能力情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "团队合作情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "岗位职责履行情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "日常工作出勤情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "沟通协调情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "内务管理情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "临时性工作完成情况",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "廉洁自律",
          evaluation_score: 10,
        },
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 2,
          evaluation_weight: 20,
          evaluation_desc: "民主测评情况",
          evaluation_score: 10,
        },
      ],
      superiorRating: [
        {
          evaluation_id: 0,
          evaluation_basic_id_union: 0,
          evaluation_type: 3,
          evaluation_weight: 20,
          evaluation_desc: "上级评分",
          evaluation_score: 100,
        },
      ],
      checkedNodes: [],
      personList: [],
      active: 0,
      type: "",
      personIDsArr2: [],
      personArr2: [],
      personIDsArr3: [],
      personID3: 0, // 部门领导 id
      personArr3: [],
      personIDsArr4: [],
      personID4: 0, // 上级领导 id
      personArr4: [],
      personIDsArr5: [], // 上级领导 id
      personArr5: [],
      personListAll: [], // 查询所有人
    };
  },
  computed: {
    maxNumber() {
      return 100;
    },
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    if (this.$route.query.id) {
      this.title = "编辑绩效考核规则";
    } else {
      this.title = "新增绩效考核规则";
    }
  },
  methods: {
    changeMin(ind) {
      if (ind == 3) {
        return;
      }
      this.ruleform.rank_rules[ind + 1].rank_rules_max = isNaN(
        this.ruleform.rank_rules[ind].rank_rules_min - 1
      )
        ? 0
        : this.ruleform.rank_rules[ind].rank_rules_min - 1;
    },
    queryPerformanceBasicList(organ_id) {
      if (!organ_id) {
        return;
      }
      api
        .queryPerformanceBasicInfo({
          page_size: 1,
          basic_organ_id_union: Number(organ_id),
        })
        .then((res) => {
          this.info = res.result[0];
          if (this.info) {
            this.ruleform.rank_rules = this.info.rank_rules.map((item) => ({
              ...item,
              rank_rules_id: 0,
              rank_rules_basic_id_union: 0,
            }));
            this.personIDsArr2 = this.info.reviewer
              .filter((item) => item.reviewer_type == 1)
              .map((item) => item.reviewer_account_id_union);
            this.personIDsArr3 = this.info.reviewer
              .filter((item) => item.reviewer_type == 2)
              .map((item) => item.reviewer_account_id_union);
            this.personIDsArr4 = this.info.reviewer
              .filter((item) => item.reviewer_type == 3)
              .map((item) => item.reviewer_account_id_union);
            this.personArr2 = this.info.reviewer
              .filter((item) => item.reviewer_type == 1)
              .map((item) => ({
                ...item,
                reviewer_id: 0,
                reviewer_basic_id_union: 0,
              }));

            this.personArr3 = this.info.reviewer
              .filter((item) => item.reviewer_type == 2)
              .map((item) => ({
                ...item,
                reviewer_id: 0,
                reviewer_basic_id_union: 0,
              }));
            this.personArr4 = this.info.reviewer
              .filter((item) => item.reviewer_type == 3)
              .map((item) => ({
                ...item,
                reviewer_id: 0,
                reviewer_basic_id_union: 0,
              }));
          } else {
            this.ruleform.rank_rules = [
              {
                rank_rules_id: 0,
                rank_rules_basic_id_union: 0,
                rank_rules_level: "A",
                rank_rules_min: 0,
                rank_rules_max: 100,
              },
              {
                rank_rules_id: 0,
                rank_rules_basic_id_union: 0,
                rank_rules_level: "B",
                rank_rules_min: 0,
                rank_rules_max: 0,
              },
              {
                rank_rules_id: 0,
                rank_rules_basic_id_union: 0,
                rank_rules_level: "C",
                rank_rules_min: 0,
                rank_rules_max: 0,
              },
              {
                rank_rules_id: 0,
                rank_rules_basic_id_union: 0,
                rank_rules_level: "D",
                rank_rules_min: 0,
                rank_rules_max: 0,
              },
            ];
            this.personIDsArr2 = [];
            this.personIDsArr3 = [];
            this.personIDsArr4 = [];
            this.personArr2 = [];

            this.personArr3 = [];
            this.personArr4 = [];
          }
        });
    },
    // 勾选参与单位
    handleCheckedChange(checkedNodes) {
      this.checkedNodes = checkedNodes.checkedNodes;
      if (this.checkedNodes.length == 0) {
        this.$refs.treeselect.valueTitle = "";
        this.ruleform.organ_ids = "";
      } else if (this.checkedNodes.length == 1) {
        this.$refs.treeselect.valueTitle = this.checkedNodes[0].node.organ;
        this.organ_ids = this.checkedNodes.map((item) => item.tag).join(",");
        this.ruleform.organ_ids = this.checkedNodes
          .map((item) => item.tag)
          .join(",");
      } else {
        this.$refs.treeselect.valueTitle = `${this.checkedNodes[0].node.organ}等${this.checkedNodes.length}个单位`;
        let nodes = this.checkedNodes
          .filter((item) => {
            return item.node.organ_child_node == item.tag;
          })
          .map((item) => item.tag);
        this.organ_ids = this.checkedNodes.map((item) => item.tag).join(",");
        this.ruleform.organ_ids = nodes.join(",");
      }
      let arr = this.ruleform.organ_ids.split(",");
      if (arr[0]) {
        this.queryPerformanceBasicList(arr[0]);
      }
      this.personIDsArr5 = this.personIDsArr5.filter(
        (item) => arr.indexOf(item) > -1
      );
      this.personArr5 = this.personArr5.filter(
        (item) => arr.indexOf(item.account_id_union) > -1
      );
    },
    // removeTargerLayer(ind) {
    //   let index = this.reviewer_types.indexOf(ind);
    //   this["personIDsArr" + (ind + 1)] = [];
    //   this["personArr" + (ind + 1)] = [];
    //   this.reviewer_types.splice(index, 1);
    // },
    addReviewer_type() {
      if (this.reviewer_type) {
        let arr = [...this.reviewer_types, this.reviewer_type];
        this.reviewer_types = Array.from(new Set(arr));
      }
    },
    dialogClose(ind) {
      this.$refs["singlechoose" + ind].choosePersonIDsArr =
        this["personIDsArr" + ind];
    },
    dialogClose2() {
      this.$refs.singlechoose5.choosePersonIDsArr = this.personIDsArr5;
    },
    // 点击➕展示人员选择弹框
    showTargerAddLayer(ind) {
      if (ind == 5 && this.ruleform.organ_ids == "") {
        this.$tip({
          isTip: true,
          message: "请先选择考核范围",
        });
        return;
      }
      this.$refs["dialog" + ind].show();
      // if (this.$refs["singlechoose" + ind]) {
      //   this.$refs["singlechoose" + ind].setSelectPerson(
      //     this["personArr" + ind]
      //   );
      // } else {
      //   this.$nextTick(() => {
      //     this.$refs["singlechoose" + ind].setSelectPerson(
      //       this["personArr" + ind]
      //     );
      //   });
      // }
    },
    // 选择了考核对象后点击确认
    async choosePersonFun1(data) {
      this.ruleform.basic_principal_account_id_union = data;
      await this.queryAccount({ account_ids: String(data) });
      let person = this.personListAll.filter((item) => {
        return data == item.account_id;
      });
      this.$set(
        this.ruleform,
        "basic_principal_account_name",
        person[0].account_name
      );
      this.$refs.dialog1.cancel();
    },
    // 查询人员
    async queryAccount(obj) {
      let data = await api.queryAccount(obj);
      this.personListAll = data.result;
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(nodes, ind) {
      this["personIDsArr" + ind] = nodes.map((item) => item.account_id);
      let personList = [...nodes];
      let arr = personList.map((item) => ({
        account_id_union: item.account_id,
        account_name: item.account_name,
        reviewer_id: 0,
        reviewer_basic_id_union: 0,
        reviewer_type: ind - 1,
        reviewer_account_id_union: item.account_id,
        reviewer_account_name: item.account_name,
        reviewer_weights: 0,
      }));
      this["personArr" + ind] = arr;
      this.$refs["dialog" + ind].cancel();
    },

    // 删除人员
    removeReviewer(ind, index, data) {
      this["personArr" + ind].splice(index, 1);
      let indID = this["personIDsArr" + ind].indexOf(data.account_id);
      this["personIDsArr" + ind].splice(indID, 1);
    },
    // 确认提交
    async submitFun() {
      this.throttle();
      this.ruleform.evaluation = [
        ...this.ration,
        ...this.qualitative,
        ...this.superiorRating,
      ];
      let sum_evaluation_weight =
        this.ration[0].evaluation_weight +
        this.qualitative[0].evaluation_weight +
        this.superiorRating[0].evaluation_weight;
      if (sum_evaluation_weight != 100) {
        this.$tip({
          isTip: true,
          message: "定量/定性/上级指标所占百分比相加应为100",
        });
        return;
      }
      // 明细的分数
      let sum1 = this.ration.reduce((acc, next) => {
        return acc + next.evaluation_score;
      }, 0);
      let sum2 = this.qualitative.reduce((acc, next) => {
        return acc + next.evaluation_score;
      }, 0);
      let sum3 = this.superiorRating.reduce((acc, next) => {
        return acc + next.evaluation_score;
      }, 0);
      if (sum1 != 100) {
        this.$tip({
          isTip: true,
          message: "绩效考核明细定量指标分值相加应为100",
        });
        return;
      }
      if (sum2 != 100) {
        this.$tip({
          isTip: true,
          message: "绩效考核明细定性指标分值相加应为100",
        });
        return;
      }
      if (sum3 != 100) {
        this.$tip({
          isTip: true,
          message: "绩效考核明细上级评分分值相加应为100",
        });
        return;
      }
      if (this.personArr2.length == 0) {
        this.$tip({
          isTip: true,
          message: "请添加直属上级",
        });
        return;
      }
      if (this.personArr3.length == 0) {
        this.$tip({
          isTip: true,
          message: "请添加考核组",
        });
        return;
      }
      if (this.personArr4.length == 0) {
        this.$tip({
          isTip: true,
          message: "请添加上级领导",
        });
        return;
      }
      // 考评人的权重
      let psum1 = this.personArr2.reduce((acc, next) => {
        return acc + next.reviewer_weights;
      }, 0);
      if (psum1 != 100 && this.personArr4.length > 0) {
        this.$tip({
          isTip: true,
          message: "直属上级的权重相加应为100%",
        });
        return;
      }
      let psum2 = this.personArr3.reduce((acc, next) => {
        return acc + next.reviewer_weights;
      }, 0);
      if (psum2 != 100 && this.personArr4.length > 0) {
        this.$tip({
          isTip: true,
          message: "考核组的权重相加应为100%",
        });
        return;
      }
      let psum3 = this.personArr4.reduce((acc, next) => {
        return acc + next.reviewer_weights;
      }, 0);
      if (psum3 != 100 && this.personArr4.length > 0) {
        this.$tip({
          isTip: true,
          message: "上级领导的权重相加应为100%",
        });
        return;
      }
      this.ruleform.reviewer = [
        ...this.personArr2,
        ...this.personArr3,
        ...this.personArr4,
      ];
      this.ruleform.basic_not_join_account_ids = this.personArr5
        .map((item) => item.account_id_union)
        .join(",");
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let rules_min = Array.from(
        new Set(this.ruleform.rank_rules.map((item) => item.rank_rules_min))
      );
      let rules_max = Array.from(
        new Set(this.ruleform.rank_rules.map((item) => item.rank_rules_max))
      );
      if (rules_min.length < 4 || rules_max.length < 4) {
        this.$tip({
          isTip: true,
          message: "考评规则不同等级的分数不能相同",
        });
        return;
      } else {
        for (let i = 1; i < 4; i++) {
          if (rules_min[i] == undefined || rules_max[i] == undefined) {
            this.$tip({
              isTip: true,
              message: "请填写分数范围",
            });
            return;
          }
          if (rules_min[i - 1] <= rules_min[i]) {
            this.$tip({
              isTip: true,
              message: "A-D分数范围应该是从大到小",
            });
            return;
          }
          if (rules_max[i - 1] <= rules_max[i]) {
            this.$tip({
              isTip: true,
              message: "A-D分数范围应该是从大到小",
            });
            return;
          }
        }
      }
      // this.ruleform = {
      //   basic_type: 1,
      //   basic_year: "2021",
      //   basic_quarter: 1,
      //   basic_end_time: "2021-03-31 00:00:00",
      //   organ_ids: "669,676",
      //   basic_principal_account_id_union: 161,
      //   basic_total_num: 0,
      //   basic_finish_num: 0,
      //   basic_avg_score: 0,
      //   basic_not_join_account_ids: "",
      //   basic_state: 0,
      //   basic_sub_account_id_union: 0,
      //   basic_sub_time: "",
      //   basic_principal_account_name: "张梦婷",
      //   evaluation: [
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 1,
      //       evaluation_weight: 60,
      //       evaluation_desc: "工作质量",
      //       evaluation_score: 50,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 1,
      //       evaluation_weight: 60,
      //       evaluation_desc: "工作计划完成率",
      //       evaluation_score: 20,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 1,
      //       evaluation_weight: 60,
      //       evaluation_desc: "工程进度",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 1,
      //       evaluation_weight: 60,
      //       evaluation_desc: "安全指标",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 1,
      //       evaluation_weight: 60,
      //       evaluation_desc: "预算资金使用率",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "思想政治学习及业务学习情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "工作态度和能力情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "团队合作情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "岗位职责履行情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "日常工作出勤情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "沟通协调情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "内务管理情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "临时性工作完成情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "廉洁自律",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 2,
      //       evaluation_weight: 20,
      //       evaluation_desc: "民主测评情况",
      //       evaluation_score: 10,
      //     },
      //     {
      //       evaluation_id: 0,
      //       evaluation_basic_id_union: 0,
      //       evaluation_type: 3,
      //       evaluation_weight: 20,
      //       evaluation_desc: "上级评分",
      //       evaluation_score: 100,
      //     },
      //   ],
      //   rank_rules: [
      //     {
      //       rank_rules_id: 0,
      //       rank_rules_basic_id_union: 0,
      //       rank_rules_level: "A",
      //       rank_rules_min: 90,
      //       rank_rules_max: 100,
      //     },
      //     {
      //       rank_rules_id: 0,
      //       rank_rules_basic_id_union: 0,
      //       rank_rules_level: "B",
      //       rank_rules_min: 69,
      //       rank_rules_max: 89,
      //     },
      //     {
      //       rank_rules_id: 0,
      //       rank_rules_basic_id_union: 0,
      //       rank_rules_level: "C",
      //       rank_rules_min: 40,
      //       rank_rules_max: 68,
      //     },
      //     {
      //       rank_rules_id: 0,
      //       rank_rules_basic_id_union: 0,
      //       rank_rules_level: "D",
      //       rank_rules_min: 0,
      //       rank_rules_max: 39,
      //     },
      //   ],
      //   reviewer: [
      //     {
      //       account_id_union: 2,
      //       account_name: "李承益",
      //       reviewer_id: 0,
      //       reviewer_basic_id_union: 0,
      //       reviewer_type: 1,
      //       reviewer_account_id_union: 2,
      //       reviewer_account_name: "李承益",
      //       reviewer_weights: 100,
      //     },
      //     {
      //       account_id_union: 12,
      //       account_name: "考核人-C",
      //       reviewer_id: 0,
      //       reviewer_basic_id_union: 0,
      //       reviewer_type: 2,
      //       reviewer_account_id_union: 12,
      //       reviewer_account_name: "考核人-C",
      //       reviewer_weights: 100,
      //     },
      //     {
      //       account_id_union: 33,
      //       account_name: "ios",
      //       reviewer_id: 0,
      //       reviewer_basic_id_union: 0,
      //       reviewer_type: 3,
      //       reviewer_account_id_union: 33,
      //       reviewer_account_name: "ios",
      //       reviewer_weights: 100,
      //     },
      //   ],
      // };
      api.uploadPerformanceBasic(this.ruleform).then(() => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
      });
    },
    // 修复指标百分比
    hideFun(t) {
      this[["", "ration", "qualitative", "superiorRating"][t]].forEach(
        (val, index) => {
          val.evaluation_weight =
            this[
              ["", "ration", "qualitative", "superiorRating"][t]
            ][0].evaluation_weight;
        }
      );
    },
    addlist(type, ind) {
      this[["", "ration", "qualitative", "superiorRating"][type]].push({
        evaluation_id: 0,
        evaluation_basic_id_union: 0,
        evaluation_type: type,
        evaluation_desc: "",
        evaluation_weight:
          this[["", "ration", "qualitative", "superiorRating"][type]][0]
            .evaluation_weight,
        evaluation_score: 0,
      });
    },
    removelist(type, ind) {
      this[["", "ration", "qualitative", "superiorRating"][type]].splice(
        ind,
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input-number {
  ::v-deep .el-input {
    width: 100%;
  }
}
.el-input-number .el-button--small.is-circle {
  padding: 5px;
}
.person-list {
  padding: 10px 0;
}
.person-list-item {
  padding: 5px 10px;
}

.layer-table-box {
  table {
    .table-w {
      max-width: 360px;
    }
  }
}
</style>
