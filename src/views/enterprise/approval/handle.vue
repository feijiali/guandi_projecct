<!--
 * @Autor: 邓易
 * @Date: 2020-10-23 14:55:56
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-31 11:00:02
-->
<template>
  <div class="h-100 w-100 bg-secondary table-list-wrap">
    <n-dialog
      ref="dialog2"
      :diaTit="'选择绑定人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          class="single-choose-person"
          :isSingle="true"
          :personID="personID"
          @choosePersonFun="choosePersonFun"
        ></n-choose-person>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog"
      :diaTit="'选择绑定人'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="chooseperson"
          :personIDsArr="personIDsArr[currentIndex]"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="bg-white rounded-1 flex-fill px-1 py-2">
      <n-scroll>
        <el-form
          ref="ruleform"
          class="el-form-box d-flex justify-content-between align-items-start"
          :model="ruleform"
        >
          <div class="w-50 d-inline-block">
            <el-form-item class="form-item-long-small must" label="所属机构：">
              <n-treeselect
                ref="treeselect"
                @getSelectNode="getSelectValue"
                :treeData="treeData"
                :Isvalue="true"
                :value="ruleform.process_organ_id_un"
              />
            </el-form-item>
            <br />
            <el-form-item class="form-item-long-small must" label="单据名称：">
              <el-input
                v-model="ruleform.process_name"
                placeholder="审批路径-XXX"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item
              class="form-item-long must form-item-long-height"
              label="流程归属："
            >
              <el-checkbox-group
                @change="chooseBelong"
                class="checkbox-group-box d-inline-block"
                v-model="process_belong_arr"
              >
                <div
                  v-for="(item, i) in processBelongArr"
                  :key="i"
                  class="active-box d-inline-block mr-2"
                >
                  <el-checkbox class="font-14" :label="item.val">{{
                    item.name
                  }}</el-checkbox>
                </div>
              </el-checkbox-group>
              <span class="text-danger ml-2 font-14">注：可多选</span>
            </el-form-item>
            <el-form-item
              class="dis-flex-form-item form-item-long must"
              label="审批流程："
            >
              <div class="flex-fill">
                <nAddItemContent
                  :height="'240px'"
                  :isApproval="true"
                  class="mb-2"
                  :isAdd="j == 0"
                  :isReduce="j != 0"
                  :isShow="havingProcess ? false : true"
                  @addFun="addBlockFun(j + 1)"
                  @reduce="deletefromto(j)"
                  v-for="(fromItem, j) in ruleform.process_list"
                  :key="j"
                  @choosePersonClick="choosePersonClick(j)"
                >
                  <template slot="content-add">
                    <div>
                      <p
                        class="
                          w-100
                          text-hover-primary
                          font-14 font-weight-bold
                        "
                      >
                        {{ fromItem.process_detail_name }}
                      </p>
                      <el-form-item
                        style="width: 90%; display: inline-block"
                        class="form-item-long must form-item-long-height"
                        v-if="!fromItem.isHide"
                        label="处理规则："
                      >
                        <el-radio-group
                          v-model="fromItem.process_detail_type"
                          class="el-radio-group-home vertical-top"
                        >
                          <el-radio :label="1">单人审批</el-radio>
                          <el-radio :label="2">多人审批</el-radio>
                          <!-- <el-radio :label="4">单人固定审批</el-radio>
                          <el-radio :label="5">多人固定审批</el-radio> -->
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item
                        class="form-item-long must"
                        label="绑定人员："
                        v-if="fromItem.process_detail_type == 4"
                      >
                        <el-input
                          class="el-input-person"
                          readonly
                          v-model="account_name"
                          placeholder="请选择"
                        ></el-input>
                        <div
                          class="d-inline-block add-circle-btn"
                          @click="showTargerAddLayer(j, -1)"
                        >
                          +
                        </div>
                      </el-form-item>
                      <el-form-item
                        class="form-item-long mus"
                        label="绑定人员："
                        v-else
                      >
                        <el-input
                          readonly
                          v-model="fromItem.process_detail_account_num"
                          placeholder="请选择"
                        ></el-input>
                        <i
                          class="
                            iconfont
                            btn-btn_detail_plus_02
                            font-24
                            cursor-p
                            text-hover-primary
                            ml-1
                            mt-2
                          "
                          @click="showTargerAddLayer(j)"
                        ></i>
                      </el-form-item>
                    </div>
                  </template>
                </nAddItemContent>
              </div>
            </el-form-item>
          </div>
          <div class="w-50 d-inline-block position-relative">
            <div class="dis-flex text-hover-primary">
              单人审批：
              <span class="flex f14"
                >每一个节点上绑定多人，由上一节点审核完成，再指定下一节点的人。</span
              >
            </div>
            <div class="dis-flex text-hover-primary">
              多人审批：
              <span class="flex-fill f14"
                >多人审批节点上，需要指定特定的人选。A发送到B，B节点上有n个人可以处理。这n个人都可以去处理，由最后一个处理人发送到下一个节点上去，这n个人的处理不分顺序。</span
              >
            </div>
            <div
              class="clear mt-2 position-fixed"
              style="top: 167px; right: 20px; left: 50%"
            >
              <el-form-item class="form-item-long" label="绑定人员：">
                <div
                  class="
                    shift-setting-item
                    flex-fill
                    rounded-1
                    d-flex
                    w-100
                    mt-1
                  "
                >
                  <div class="flex-fill shift-setting-item-left h-100">
                    <n-scroll>
                      <div v-if="personArr.length == 0" class="p-1">
                        <span class="grey2">选择绑定人员{{ personArr }}</span>
                      </div>
                      <div
                        v-else
                        class="align-items-center d-flex flex-wrap person-list"
                      >
                        <template v-for="(item, i) in personArr[currentIndex]">
                          <div class="content-item" :key="i + 'e'">
                            <span
                              >{{ item.account_name }}【{{
                                item.account_job
                              }}】</span
                            >
                            <i
                              class="iconfont btn-btn_detail_minus_02 font-20"
                              @click.stop="removeReviewer(i, item)"
                            ></i>
                          </div>
                        </template>
                      </div>
                    </n-scroll>
                  </div>
                </div>
              </el-form-item>
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
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        process_name: "", //流程名称
        process_total_level: 1, //总层级
        process_organ_id_un: Number(this.$organ_id_en_or_pro(this)),
        process_belong: null, //111 百位：公司 十位：管理部 各位：项目部
        process_modules_union: null,
        process_list: [
          {
            process_detail_name: "第1级审批", //处理规则
            process_detail_account_num: 0, //人数
            process_detail_account_ids: "", //审批人员集合
            process_detail_type: 1, //1 单人审批(多个指定人) 2：多人审批 3:公示(隐藏类型) 4：单人审批（单个自定人）
            process_detail_child_type: 0, //不进入公示
            process_level: 1,
          },
        ],
        special: [], //流程归属
      },
      account_name: "", //公示绑定人员
      subMenuArr1: [
        { name: "请假申请", key: "OALeave" },
        { name: "出差申请", key: "OAEvection" },
        { name: "加班申请", key: "OAOvertime" },
        { name: "人员调动", key: "StaffMobilize" },
        { name: "采购申请", key: "OAPurchaseApproval" },
        { name: "合同申请", key: "OAContractApproval" },
        { name: "用款申请", key: "OAMoneyApproval" },
        { name: "用章申请", key: "OAStampApproval" },
        // { name: "投票比选", key: "UnionPartyHardWorker" },
        { name: "发票共享", key: "OAInvoiceShare" },
        { name: "入党申请", key: "UnionPartyPersonnelDevelop" },
        { name: "困难职工", key: "UnionPartyHardWorker" },
        { name: "金秋助学", key: "UnionPartySubsidyStudy" },
        { name: "生病慰问", key: "UnionPartySubsidySick" },
        { name: "补偿申请", key: "UnionPartySubsidyCompensate" },
        { name: "方案审批", key: "OAScheme" },
        { name: "内部文件", key: "OAInternalDocument" },
        // { name: "调拨申请", key: "OAAllocation" },
        { name: "发文申请", key: "ReceiveReceiveFile" },
      ],
      subMenuArr2: [
        // { name: "申购单", key: "Applyment" },
        // { name: '采购合同', key: 'PurchaseContract' },
        // { name: "报损单", key: "Loss" },
        { name: "合同计量", key: "ProjectReportEngineeringMain" },
        { name: "合同付款", key: "ProjectReportEngineeringPay" },
        { name: "变更台账", key: "ChangeParameterParameter" },
      ],
      subMenuArr3: [
        { name: "购置单", key: "Apply" },
        { name: "租赁单", key: "Lease" },
      ],
      process_belong_arr: [], //要上传的类目
      processBelongArr: [
        { name: "公司总部", val: 4 },
        // { name: '管理部', val: 2 },
        { name: "项目部", val: 1 },
      ], //类目数组
      formValidation: [
        {
          must: ["process_name", "process_belong"],
          tip: ["请输入审批名称", "请选择流程归属"],
        },
      ],
      editData: {}, //编辑人员的数据
      type: parseInt(this.$route.query.t), //OA/材料/设备类型
      type2: parseInt(this.$route.query.t2), //子类型
      isPublic: this.$route.query.isPublic, //子类型
      process_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)),
      personID: null,
      personArr: [[]],
      personIDsArr: [[]],
      currentIndex: 0, //当前的审批流程
      isPublicity: false, //是否选择了公示"
      havingProcess: false, //表示当前编辑的审批流程已在审批了
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    if (this.process_id) {
      this.title = "编辑审批流程";
    } else {
      this.title = "新增审批流程";
      this.ruleform.process_modules_union =
        this["subMenuArr" + this.type][this.type2].key;
    }
    this.process_id && (await this.queryApproveProcess());
    this.process_id && this.queryApproveReviseInfo();
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.linkTo("enterprise_approval", {
        t: this.type - 1,
        t2: this.type2,
      });
    },
    // 选择审批流程
    chooseBelong(val) {
      let number;
      this.process_belong_arr.forEach((item, index) => {
        number = number | item;
      });
      this.ruleform.process_belong = Number(number.toString(2));
    },
    // 点击选择绑定人
    showTargerAddLayer(ind, t) {
      this.currentIndex = ind;
      if (t == -1) {
        //审批公示绑定人员-担单人
        this.$refs.dialog2.show();
      } else {
        this.$refs.dialog.show();
        this.$nextTick(() => {
          this.$refs.chooseperson.choosePersonIDsArr = this.personIDsArr[
            this.currentIndex
          ]
            ? this.personIDsArr[this.currentIndex]
            : [];
        });
      }
    },
    // 添加审批流程
    addBlockFun(ind) {
      let json = {
        process_detail_name: "第" + Number(ind + 1) + "级审批",
        process_level: this.ruleform.process_list.length + 1,
        process_detail_account_ids: "",
        process_detail_account_num: 0,
        process_detail_type: 1,
        process_detail_child_type: 0,
      };
      this.ruleform.process_list.splice(ind, 0, json);

      this.ruleform.process_list.forEach((item, i) => {
        item.process_detail_name = `第${i + 1}级审批`;
      });
      // this.$set(this.ruleform.process_list, ind, json);
      // this.ruleform.process_list.push();
      this.personArr.splice(ind, 0, []);
      this.personIDsArr.splice(ind, 0, []);
      this.ruleform.process_total_level++;
      // this.choosePerson.push(1);
    },
    // 移除审批流程
    deletefromto(ind) {
      this.currentIndex = ind;
      if (this.ruleform.process_list[ind].process_detail_child_type == 1) {
        this.isPublicity = false;
        //如果移除的是审批完成公示则需要同时清除下面两个子节点
        let res = this.ruleform.process_list.filter(function (item, index) {
          //元素值，元素的索引，原数组。
          return !item.isHide;
        });
        this.ruleform.process_list = JSON.parse(JSON.stringify(res));
      }
      this.ruleform.process_list.splice(ind, 1);
      this.ruleform.process_list.forEach((item, index) => {
        item.process_level = index + 1;
        item.process_detail_name = `第${index + 1}级审批`;
      });
      this.personIDsArr.splice(ind, 1);
      this.personArr.splice(ind, 1);
      this.ruleform.process_total_level--;
    },
    choosePersonClick(ind, t) {
      this.currentIndex = ind;
    },
    choosePersonNodes(nodes) {
      this.personIDsArr[this.currentIndex] = nodes.map(
        (item) => item.account_id
      );
      this.ruleform.process_list[this.currentIndex].process_detail_account_ids =
        this.personIDsArr[this.currentIndex].join(",");
      this.$set(this.personArr, this.currentIndex, [...nodes]);
      this.$set(
        this.ruleform.process_list[this.currentIndex],
        "process_detail_account_num",
        this.personIDsArr[this.currentIndex].length
      );
      this.$refs.dialog.cancel();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data, ind) {
      this.personID = data;
      this.ruleform.process_list[this.currentIndex].process_detail_account_ids =
        String(data);
      let result = await this.queryAccount([data]);
      this.account_name = result[0].account_name;
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      return data.result;
    },
    // 删除人员
    removeReviewer(index, data) {
      this.personArr[this.currentIndex].splice(index, 1);
      let indID = this.personIDsArr[this.currentIndex].indexOf(data.account_id);
      this.personIDsArr[this.currentIndex].splice(indID, 1);
      this.$set(
        this.ruleform.process_list[this.currentIndex],
        "process_detail_account_num",
        this.personIDsArr[this.currentIndex].length
      );
      this.$set(
        this.ruleform.process_list[this.currentIndex],
        "process_detail_account_ids",
        String(this.personIDsArr[this.currentIndex])
      );
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.process_organ_id_un = node.tag;
    },
    async queryApproveReviseInfo() {
      let res = await api.queryApproveReviseInfo({
        page: -2,
        revise_info_state: 2, //2:正在审批
        revise_info_process_id_union: this.ruleform.process_id,
        page_size: 0,
      });
      if (res.total_count) {
        this.havingProcess = true; //表示当前审批流程正在进行审批，则不能新增删减流程，只能修改人员
        this.$tip({
          isTip: true,
          closeTime: 2000,
          message: "当前审批流程正在进行审批，您不能新增删减流程",
        });
        return;
      }
    },
    // 查询流程详情
    async queryApproveProcess() {
      let res = await api.queryApproveProcess({
        process_id: this.process_id,
      });
      this.editData = res.result[0];
      const json = [
        "process_organ_id_un",
        "process_id",
        "process_name",
        "process_total_level",
        "process_modules_union",
        "process_belong",
        "process_list",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, this.editData);
      let list = res.result[0].process_list;
      for (let i = 0; i < list.length; i++) {
        let jsons = {
          process_detail_name: list[i].process_detail_name,
          process_detail_process_id_union:
            list[i].process_detail_process_id_union,
          process_level: list[i].process_level,
          process_detail_account_ids: list[i].process_detail_account_ids,
          process_detail_account_num: list[i].process_detail_account_num,
          process_detail_type: list[i].process_detail_type,
          process_detail_child_type: list[i].process_detail_child_type,
          isLast: false,
          isHide: false,
        };
        this.$set(this.ruleform.process_list, i, jsons);
        this.personIDsArr[i] = list[i].process_detail_account_ids
          .split(",")
          .map(Number);
        let arr = await this.queryAccount(this.personIDsArr[i]);
        if (arr[0]) {
          this.$set(this.personArr, i, arr);
        }
        // this.$set(
        //   this.ruleform.process_list[i],
        //   'process_detail_account_num',
        //   this.personIDsArr[this.currentIndex].length
        // );
        if (list[i].process_detail_type == 4) {
          this.isPublicity = true;
          if (list[i].process_detail_type == 4) {
            let personarr = this.personListAll.find(
              (item) => item.account_id == list[i].process_detail_account_ids
            );
            this.personID = Number(list[i].process_detail_account_ids);
            this.account_name = personarr.account_name;
          }
        }
      }
      // 渲染流程归属
      let num = parseInt(this.editData.process_belong, 2);
      let process_belong_arr = [];
      !this.editData.process_belong && (process_belong_arr = []);
      this.processBelongArr.forEach((item) => {
        (item.val & num) != 0 && process_belong_arr.push(item.val);
      });
      this.$set(this, "process_belong_arr", process_belong_arr);
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        let ischoosePublicity = false;
        let list = this.ruleform.process_list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].process_detail_type == 3) {
            ischoosePublicity = true;
          }
          if (!list[i].process_detail_type) {
            this.$tip({
              isTip: true,
              message: "请选择处理规则",
            });
            return;
          }
          // if (!list[i].process_detail_name) {
          //   this.$tip({
          //     isTip: true,
          //     message: "请输入路径名称",
          //   });
          //   return;
          // }
          if (
            (!list[i].process_detail_account_ids && !list[i].isHide) ||
            (!list[i].process_detail_account_ids &&
              list[i].isHide &&
              list[i].isLast)
          ) {
            this.$tip({
              isTip: true,
              message: "请选择绑定人员",
            });
            return;
          }
        }
        // if (!ischoosePublicity && (this.isPublic)) {
        //   this.$tip({
        //     isTip: true,
        //     message: "流程设置不完整",
        //   });
        //   return;
        // }
        this.submitAllData();
      }
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      let res = await api[
        `${this.process_id ? "updateApproveProcess" : "uploadApproveProcess"}`
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
.person-list {
  padding: 10px 0;
}
.person-list-item {
  padding: 5px 10px;
}

.shift-setting-item {
  min-height: 400px;
  background-color: $lightgrey;
  border-radius: 10px;
  .shift-setting-item-left {
    background-color: $lightgrey;
    border-radius: 10px 10px 10px 10px;
  }
}

.iconfont {
  font-size: 26px !important;
}
</style>
