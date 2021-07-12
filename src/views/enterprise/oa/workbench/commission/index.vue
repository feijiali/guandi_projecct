<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:55
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-23 17:48:18
-->
<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'填写撤销原因'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <div class="d-flex w-100">
          <span
            class="text-secondary d-inline-block label-l"
            style="width: 60px"
            >原因：</span
          >
          <el-input
            v-model="revokeDate.revise_record_remark"
            type="textarea"
            placeholder="请输入"
            rows="8"
            class="flex-fill"
          ></el-input>
        </div>
        <div class="d-flex justify-content-end mb-08">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="sureRevoke"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop
        :title="title"
        :selfControl="true"
        @back="
          linkTo(isShow ? 'project_oa_workbench' : 'enterprise_oa_workbench')
        "
      />
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">审批名称：</label>
            <el-select
              v-model="listQuery.revise_info_accessory_module"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                :label="item.name"
                :value="item.key"
                v-for="(item, index) in GLOBAL.applyArrChoose"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2" v-if="$route.query.t != 1">
            <label class="text-secondary">审批状态：</label>
            <el-select
              v-model="listQuery.revise_info_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正在审批" :value="2"></el-option>
              <el-option label="已通过" :value="3"></el-option>
              <el-option label="未通过" :value="4"></el-option>
              <el-option label="已撤销" :value="5"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 90px)"
        @row-click="infoClick"
        align="center"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="单据名称" prop="revise_info_title" width="260">
          <template slot-scope="scope"
            >{{ scope.row.revise_info_title }}_{{
              scope.row.revise_info_sub_time.split(" ")[0]
            }}</template
          >
        </el-table-column>
        <el-table-column label="发起部门" prop="organ"></el-table-column>
        <el-table-column
          label="发起人"
          prop="sub_account_name"
        ></el-table-column>
        <el-table-column
          width="180"
          label="发起日期"
          prop="revise_info_sub_time"
        ></el-table-column>
        <el-table-column
          label="当前节点"
          prop="revise_info_now_name"
        ></el-table-column>
        <el-table-column
          label="待办人员"
          prop="revise_info_now_name"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-for="(itm, ind) in scope.row.account_list" :key="ind"
              >{{ itm.account_name
              }}{{ ind != scope.row.account_list.length - 1 ? "," : "" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="审批状态" width="200">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :style="{
                backgroundColor:
                  GLOBAL.backgroundColorArr[scope.row.revise_info_state],
                color: GLOBAL.colorArr[scope.row.revise_info_state],
              }"
              >{{ GLOBAL.reviseStateArr[scope.row.revise_info_state] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" v-if="type == 1">
          <template slot-scope="scope">
            <div @click.stop class="d-inline-block">
              <nStatusButton
                @buttonClick="
                  linkTos('enterprise_oa_workbench_copy', scope.row)
                "
                :changeColor="'#3377FF'"
                :btnText="'抄送'"
              />
            </div>
            <div @click.stop class="d-inline-block ml-2">
              <nStatusButton
                class="mr-2"
                @buttonClick="
                  linkTos('enterprise_oa_workbench_approval', scope.row)
                "
                :changeColor="'#fd5571'"
                :btnText="'审批'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380" align="left" v-if="type == 4">
          <template slot-scope="scope">
            <div class="text-left">
              <div
                @click.stop
                class="d-inline-block"
                v-if="
                  scope.row.revise_info_state == 2 ||
                  scope.row.basis_eng == 'Applyment' ||
                  scope.row.basis_eng == 'Loss' ||
                  (scope.row.basis_eng == 'OAMoneyApproval' &&
                    scope.row.revise_info_state == 3)
                "
              >
                <nStatusButton
                  @buttonClick="revoke(scope.row)"
                  :changeColor="'#fd5571'"
                  :btnText="'撤销'"
                />
              </div>
              <div
                @click.stop
                class="d-inline-block"
                v-if="
                  scope.row.basis_eng == 'OALeave' &&
                  scope.row.revise_info_state == 3
                "
              >
                <nStatusButton
                  class="ml-2"
                  @buttonClick="
                    linkTo(
                      'enterprise_oa_workbench_cancelLeave',
                      {
                        id: scope.row.revise_info_accessory_id,
                        process_id: scope.row.revise_info_process_id_union,
                      },
                      true,
                      scope.row
                    )
                  "
                  :changeColor="'#3377FF'"
                  :btnText="'销假'"
                />
              </div>
              <div
                @click.stop
                class="d-inline-block"
                v-if="scope.row.revise_info_state == 2"
              >
                <nStatusButton
                  class="ml-2"
                  @buttonClick="faseSend(scope.row)"
                  :changeColor="'#3377FF'"
                  :btnText="'催办'"
                />
              </div>
              <div
                @click.stop
                class="d-inline-block"
                v-if="
                  scope.row.revise_info_state == 2 &&
                  scope.row.revise_info_now_level == 1
                "
              >
                <nStatusButton
                  class="ml-2"
                  @buttonClick="editFun(scope.row)"
                  :changeColor="'#3377FF'"
                  :btnText="'编辑'"
                />
              </div>
              <div
                @click.stop
                class="d-inline-block"
                v-if="
                  scope.row.revise_info_state == 3 ||
                  scope.row.revise_info_state == 4 ||
                  scope.row.revise_info_state == 5
                "
              >
                <nStatusButton
                  class="ml-2"
                  @buttonClick="reAddFun(scope.row)"
                  :changeColor="'#3377FF'"
                  :btnText="'重新发起'"
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      class="text-right bg-secondary"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "queryApproveReviseInfo",
      title: "",
      titleArr: this.GLOBAL.titleArr,
      listQuery: {
        page: 0,
        page_size: 20,
        revise_info_state: 0,
        revise_info_accessory_module: "", //审批流程
      },
      type: Number(this.$route.query.t),
      types: this.$route.query.types, //8大类型
      index: 0, //当前类型的索引

      // 撤销
      revokeDate: {
        revise_info_id: "", //审批信息中间表id
        revise_record_remark: "", //审批信息中间表-撤销原因
        revise_record_sign_pic: this.$store.getters.account_sign_name, //审批记录表-审批签名图
      },
    };
  },
  created() {
    this.tableData = [];
  },
  mounted() {
    this.getListBool = false;
  },
  activated() {
    this.title = ["", "我的待办", "我的已办", "我的待阅", "我的申请"][
      Number(this.$route.query.t)
    ];
    this.type = Number(this.$route.query.t);
    this.listQuery = {
      page: 0,
      page_size: 20,
      revise_info_state: 0,
      revise_info_accessory_module: "", //审批流程
    };
    this.$set(
      this.listQuery,
      [
        "",
        "revise_account_review_account_ids",
        "revise_account_reviewed_account_ids",
        "revise_account_read_account_ids",
        "revise_info_sub_account_id_union",
      ][this.type],
      this.type == 4
        ? Number(this.$store.getters.account_id)
        : String(this.$store.getters.account_id)
    );
    this.type == 1 && (this.listQuery.revise_info_state = 2);
    this.getList();
  },
  methods: {
    // 重新发起
    reAddFun(row) {
      let url = "",
        params = {};
      if (row.basis_eng == "ProjectReportEngineeringPay") {
        url = "enterprise_engineering_metering_payment";
        params = {
          id: row.revise_info_accessory_id,
          isAdd: true,
          t: 2,
          from: row.basis_eng == "ProjectReportEngineeringPay" ? 2 : 0,
        };
      } else if (row.basis_eng == "ChangeParameterParameter") {
        url = "enterprise_engineering_changeStanding_list_handle";
        params = {
          id: row.revise_info_accessory_id,
          isAdd: true,
          t: 6,
        };
      } else {
        url = "enterprise_oa_workbench_apply";
        params = {
          id: row.revise_info_accessory_id,
          isAdd: true,
          t: this.indexFun(row.basis_eng),
        };
      }
      this.$router.linkTo(url, params);
    },
    // 编辑跳转
    editFun(row) {
      let url = "",
        params = {};
      if (row.basis_eng == "ProjectReportEngineeringPay") {
        url = "enterprise_engineering_metering_payment";
        params = {
          id: row.revise_info_accessory_id,
          t: 2,
          from: row.basis_eng == "ProjectReportEngineeringPay" ? 2 : 0,
        };
      } else if (row.basis_eng == "ChangeParameterParameter") {
        url = "enterprise_engineering_changeStanding_list_handle";
        params = {
          id: row.revise_info_accessory_id,
          t: 6,
        };
      } else if (row.basis_eng == "OALeaveCancel") {
        console.log(row.basis_eng);
        url = "enterprise_oa_workbench_cancelLeave";
        params = {
          cancel_id: row.revise_info_accessory_id,
          process_id: row.revise_info_process_id_union,
        };
      } else {
        url = "enterprise_oa_workbench_apply";
        params = {
          id: row.revise_info_accessory_id,
          t: this.indexFun(row.basis_eng),
        };
      }
      this.$router.linkTo(url, params);
    },
    indexFun(name) {
      let ind = this.titleArr.findIndex((item) => item.key == name) + 1;
      return ind > 1 ? ind - 1 : ind;
    },
    // 撤销申请
    revoke(row) {
      if (row.basis_eng == "OAMoneyApproval") {
        //如果是用款申请,则需要判断是否已经付款了,如果是的话则不能撤销,否则可以撤销
        this.queryOAMoneyApproval(row);
      } else {
        this.revokeDate.revise_record_remark = "";
        this.revokeDate.revise_info_id = row.revise_info_id;
        this.$refs.dialog.show();
      }
    },
    // 查询用款申请详情
    async queryOAMoneyApproval(row) {
      let { result } = await api.queryOAMoneyApproval({
        money_approval_id: row.revise_info_accessory_id,
      });
      if (result[0].money_approval_state == 3) {
        //说明未付款
        this.$tip({
          isTip: true,
          message: "该申请已付款,不能撤销！",
        });
      } else {
        this.revokeDate.revise_record_remark = "";
        this.revokeDate.revise_info_id = row.revise_info_id;
        this.$refs.dialog.show();
      }
    },
    //详情
    linkTos(name, row) {
      this.$router.linkTo(name, {
        t: this.type,
        types: row.basis_eng,
        id: row.revise_info_id,
      });
    },
    // 催办
    faseSend(row) {
      this.confirm("", "", "是否确认催办！").then(async () => {
        await api.noticeReviewerToReview({
          revise_info_accessory_id: row.revise_info_accessory_id,
          revise_info_accessory_module: row.revise_info_accessory_module,
          revise_account_review_account_ids:
            row.revise_account_review_account_ids,
        });
        this.$tip({
          isTip: true,
          message: "已催办！",
        });
      });
    },
    //撤销
    async sureRevoke() {
      if (!this.revokeDate.revise_record_remark) {
        this.$tip({
          isTip: true,
          message: "请输入撤销原因",
        });
        return;
      }
      let res = await api.undoApproveReviseInfo(this.revokeDate);
      this.$refs.dialog.cancel();
      this.getList();
    },
    linkTo(name, query, bool, row) {
      if (bool) {
        //销假跳转，判断是否已经销假，是--直接跳转到请假详情，否----跳转到销假页面
        this.queryOALeave(name, query, bool, row);
      } else {
        this.$router.linkTo(name, query ? query : null);
      }
    },
    //   查询请假
    async queryOALeave(name, query, bool, row) {
      let { result } = await api.queryOALeave({
        leave_id: row.revise_info_accessory_id,
      });
      if (result[0].leave_cancel_mark == 0) {
        //0——未销假 ；1——已销假
        this.$router.linkTo(name, query ? query : null);
      } else {
        this.infoClick(row);
      }
    },
    // 点击详情跳转
    infoClick(row) {
      //如果是公文管理
      if (row.revise_info_accessory_module == "ReceiveReceiveFile") {
        let linkName = "";
        if (this.type == 1) {
          linkName = "enterprise_oa_document_commission_info";
        } else if (this.type == 2) {
          linkName = "enterprise_oa_document_done_info";
        } else if (this.type == 3) {
          linkName = "enterprise_oa_document_addressee";
        } else if (this.type == 4) {
          linkName = "enterprise_oa_document_myPost_info";
        }
        this.$router.linkTo(linkName, {
          id: row.revise_info_accessory_id,
        });
        return;
      }
      this.$router.linkTo("enterprise_oa_workbench_info", {
        t: this.type,
        types: row.basis_eng,
        id: row.revise_info_accessory_id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }

  .label-l {
    width: 110px;
  }
}
</style>
