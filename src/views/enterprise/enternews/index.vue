<template>
  <div class="container-all">
    <div
      class="container-div d-flex flex-column"
      style="background-color: transparent"
    >
      <div
        class="rounded-1 position-relative news-box d-flex align-items-center pr-2 pl-2 bg-white"
      >
        <div class="mgr20 cursor-p operateMenu position-relative z-index-2">
          <i
            @click="leftMenuFun"
            v-if="left < 0 && menuArr.length > 10"
            class="iconfont btn-btn_arrow_left text-white font-24 back_icon d-inline-block cursor-p"
          ></i>
          <i
            v-else
            class="iconfont btn-btn_arrow_left text-white font-24 back_icon d-inline-block cursor-not"
          ></i>
        </div>
        <div class="news-box-top-contain position-relative h-100">
          <ul
            :style="{
              minWidth: menuArr.length * 132 + 'px',
              left: left + 'px',
            }"
            class="bg-white rounded-1 nav-bar d-flex position-absolute news-box-top h-100"
          >
            <li
              class="nav-item cursor-p"
              :class="[active == index ? 'active' : '']"
              v-for="(item, index) in menuArr"
              :key="index"
              @click="switchFun(item.module_eng, index)"
            >
              {{ item.module_chn }}
            </li>
          </ul>
        </div>
        <div class="ml-2 cursor-p operateMenu position-relative z-index-2">
          <i
            @click="rightMenuFun"
            v-if="left > borLeft && left <= 0 && menuArr.length > 10"
            class="iconfont btn-btn_arrow_right text-white font-24 back_icon d-inline-block cursor-p"
          ></i>
          <i
            v-else
            class="iconfont btn-btn_arrow_right text-white font-24 back_icon d-inline-block cursor-not"
          ></i>
        </div>
      </div>
      <div class="bg-white rounded-1 position-relative flex-fill mt-1">
        <div class="top-select-box">
          <div class="d-flex align-items-center">
            <el-select
              placeholder="请选择"
              @change="refreshData"
              v-model="listQuery.msg_type"
            >
              <el-option
                :label="item"
                :value="index"
                v-for="(item, index) in navs"
                :key="index"
              ></el-option>
            </el-select>
            <div class="d-inline-block ml-2">
              <label class="text-secondary">消息模块：</label>
              <el-select
                v-model="relation_root"
                placeholder="请选择"
                @change="getSelectNode"
              >
                <el-option label="全部类型" value></el-option>
                <el-option
                  :label="item.module_chn"
                  :value="item.module_eng"
                  v-for="(item, index) in treeData"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="d-inline-block ml-2">
              <label class="text-secondary">状态：</label>
              <el-select
                v-model="listQuery.msg_status"
                placeholder="请选择"
                @change="refreshData"
              >
                <el-option label="全部" :value="0"></el-option>
                <el-option label="已读" :value="2"></el-option>
                <el-option label="未读" :value="1"></el-option>
              </el-select>
            </div>
          </div>
          <div>
            <n-button
              :btnText="'批量已读'"
              @buttonClick="handleUpdate(3)"
              :width="'150px'"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_password_on mr-1"></i>
              </template>
            </n-button>
            <n-button
              class="ml-2"
              :btnText="'批量删除'"
              @buttonClick="deleteFun(true, '', 'msg_id', 'delMessageMsg')"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
        <el-table
          class="cursor-p-table"
          :data="tableData"
          style="width: 100%"
          height="calc(100% - 140px)"
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column prop="index" label="序号" width="100">
            <template slot-scope="scope">
              <label>
                {{
                  (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
                }}
              </label>
            </template>
          </el-table-column>
          <el-table-column label="消息名称" prop="msg_title"></el-table-column>
          <el-table-column
            label="主要内容"
            width="460"
            prop="msg"
            align="left"
          ></el-table-column>
          <el-table-column label="推送时间" prop="account_name">
            <template slot-scope="scope">{{
              $utils.getDateDiff(scope.row.msg_time + "000")
            }}</template>
          </el-table-column>
          <el-table-column label="状态" width="160" prop="education_time">
            <template slot-scope="scope">{{
              scope.row.msg_status == 2 ? "已读" : "未读"
            }}</template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <template v-if="activeIn == 0">
                <!-- 已读 -->
                <div @click.stop class="d-inline-block">
                  <nStatusButton
                    @buttonClick="handleFun(scope.row)"
                    v-if="
                      scope.row.msg_status === 2 &&
                      scope.row.msg_type == 2 &&
                      scope.row.module_eng_union != 'StoreIssue'
                    "
                    :changeColor="'#fd5571'"
                    :btnText="'去处理'"
                  />
                </div>

                <!-- 未读 -->
                <div @click.stop class="d-inline-block">
                  <nStatusButton
                    class="ml-2"
                    @buttonClick="handleFun(scope.row)"
                    v-if="
                      scope.row.msg_status === 1 &&
                      scope.row.msg_type == 2 &&
                      scope.row.module_eng_union != 'StoreIssue'
                    "
                    :changeColor="'#fd5571'"
                    :btnText="'去处理'"
                  />
                </div>
                <i
                  :class="[activeIn == 0 ? 'mgl20' : '']"
                  @click.stop="
                    deleteFun(false, scope.row, 'msg_id', 'delMessageMsg')
                  "
                  class="iconfont btn-btn_list_trash trash-icon-btn ml-2"
                ></i>
              </template>
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
      postURL: "queryMessageMsg",
      deleData: {},
      listQuery: {
        page: 0,
        page_size: 20,
        msg_type: 0,
        relation_root: "",
        msg_status: 0,
        account_id_union: Number(this.$store.getters.account_id),
      }, //筛选条件
      getListBool: false,
      treeData: [],
      active: 0,
      activeIn: 0,
      navs: ["全部", "通知", "待办"],
      menuArr: [],
      relation_root: "",
      left: 0,
      borLeft: 0,
    };
  },
  created() {
    //获取顶部一级菜单(查询模块关系(列表+分页)(QueryRelation))
    this.queryRelation();
    // this.getList();
  },
  methods: {
    leftMenuFun() {
      this.left += 135;
    },
    rightMenuFun() {
      this.left -= 135;
    },
    // 切换消息模块标题
    switchFun(item, ind) {
      this.active = ind;
      this.activeIn = 0;
      this.relation_root = "";
      this.listQuery.msg_type = 2;
      this.queryRelationTree(item);
    },
    // 树形下拉选择
    getSelectNode(val) {
      this.listQuery.relation_root = val;
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    // 查询模块关系(列表+分页)(QueryRelation)
    async queryRelation() {
      let data = await api.queryRelation({
        relation_level: 1,
        relation_msg_type: 1,
      });
      this.menuArr = data.result;
      // 查询一级模块下面的子模块
      this.queryRelationTree(this.menuArr[0].module_eng);
      this.borLeft = -((this.menuArr.length * 126) / 2);
    },
    async queryRelationTree(name) {
      let data = await api.queryRelation({
        module_type: 2,
        relation_upper: name,
        relation_msg_type: 1,
        page: -1,
      });
      this.treeData = data.result;
      if (data.result[0]) {
        this.listQuery.relation_root = name;
        // this.relation_root = data.result[0].module_eng;
        this.refreshData();
      } else {
        this.listQuery.relation_root = name;
        // this.relation_root = null;
        this.refreshData();
      }
    },
    // 已读那条显示为灰色
    tableRowClassName({ row, rowIndex }) {
      if (row.msg_status == 2) {
        return "noread-row";
      }
      return "";
    },
    // 删除
    /**
     * @param {Object} t:1-批量删除 2-表格行删除
     * @param {Object} row:删除的数据
     */
    handleUpdate(t, row) {
      let msg_ids = [];
      if (t == 1 || t == 3) {
        if (this.selectionArr.length > 0) {
          this.selectionArr.forEach((ele) => {
            msg_ids.push(ele.msg_id);
          });
          if (t == 3) {
            this.deleData.msg_ids = msg_ids.join(",");
            this.deleData.msg_status = 2;
            this.deleData.status = 1;
            this.deleData.account_id = Number(this.$store.getters.account_id);
            this.sureDelete("updateMessageMsg", () => {
              this.$store.dispatch(
                "app/set_read",
                Number(this.$store.getters.account_id)
              );
            });
          }
        }
      } else {
        //批量标记已读
      }
    },
    // 点击去处理
    handleFun(row) {
      if (row.msg_status == 1) {
        //若是未处理，点击去处理时，要改成已读状态
        this.deleData.msg_id = row.msg_id;
        this.deleData.msg_status = 2;
        this.deleData.status = 1;
        this.deleData.account_id = Number(this.$store.getters.account_id);
        this.sureDelete("updateMessageMsg", () => {
          this.$store.dispatch(
            "app/set_read",
            Number(this.$store.getters.account_id)
          );
        });
      }
      this.handleNews(row);
    },
    // 处理去处理跳转页面逻辑
    handleNews(row) {
      let module_eng_union = row.module_eng_union;
      let msg_ext = row.msg_ext.split(",").map(Number);
      let linkName = "";
      let query = {};
      let OAModule = [
        "OALeave",
        "OALeaveCancel",
        "OAEvection",
        "OAOvertime",
        "StaffMobilize",
        "OAPurchaseApproval",
        "OAContractApproval",
        "OAMoneyApproval",
        "OAStampApproval",
        "OAInvoiceShare",
        "OaElectionElection",
        "UnionPartyPersonnelDevelop",
        "UnionPartyHardWorker",
        "UnionPartySubsidyStudy",
        "UnionPartySubsidySick",
        "UnionPartySubsidyCompensate",
        "OAScheme",
        "OAInternalDocument",
        "OAScheme",
        "ChangeParameterParameter",
        // "Loss",
        // "Apply",
        // "Lease",
      ];
      //绩效考核
      if (OAModule.indexOf(module_eng_union) != -1) {
        //人员请假
        query = { t: 1, id: msg_ext, types: module_eng_union };
        linkName =
          module_eng_union == "OaElectionElection"
            ? "enterprise_oa_voted_info"
            : "enterprise_oa_workbench_info";
      } else if (module_eng_union == "ReceiveReceiveFile") {
        //发文
        query = { id: msg_ext[0] };
        linkName = "enterprise_oa_document_commission_info";
      } else if (module_eng_union == "OaEmail") {
        //邮箱管理
        linkName = "enterprise_oa_email_inbox";
      } else if (module_eng_union == "OaPublic") {
        //通知公告
        query = { type: "所有公告" };
        linkName = "enterprise_oa_allAnnouncement";
      } else if (module_eng_union == "PerformanceBasic") {
        if (msg_ext[0] == 2) {
          //2-绩效考核的考核人(跳转到成员考评)；3-绩效考核的负责人(跳转到智能考核)
          linkName = "enterprise_oa_account_performance_member";
        } else if (msg_ext[0] == 3) {
          //2-绩效考核的考核人(跳转到成员考评)；3-绩效考核的负责人(跳转到智能考核)
          linkName = "enterprise_oa_account_performance_assessment";
        }
      } else if (module_eng_union == "PerformanceAssessor") {
        //绩效自评
        query = { id: msg_ext[0] };
        linkName = "enterprise_oa_account_performance_mine";
      } else if (module_eng_union == "OASystemRelease") {
        //公司制度
        linkName = "enterprise_oa_release_companySystem";
      } else if (module_eng_union == "OAPlanWeek") {
        //OA周计划
        linkName = "enterprise_oa_workbench_weekPlan";
      } else if (module_eng_union == "ReceiveFileReceiveReply") {
        //公文管理
        linkName = "enterprise_oa_document_addressee";
      } else if (module_eng_union == "SafePreClassEducation") {
        //班前教育-跳新增
        query = { id: msg_ext[0] };
        linkName = "enterprise_safety_safeManage_preEducation_handle";
      } else if (module_eng_union == "SafeDailyInspection") {
        //安全巡检-跳新增
        query = { id: msg_ext[0] };
        linkName = "enterprise_safety3_produceManage_inspection";
      } else if (module_eng_union == "SafeRectify") {
        query = { id: msg_ext[0] };
        //安全整改-跳详情
        query = { id: msg_ext[0] };
        linkName = "enterprise_safety_safeManage_rectification";
      } else if (module_eng_union == "SafePreClassEducationFine") {
        //安全教育罚款
        linkName = "enterprise_safety_safeManage_preEducation";
      } else if (module_eng_union == "SafeSmartCapture") {
        //智能抓拍
        query = { id: msg_ext[0] };
        linkName = "enterprise_safety_safeManage_video_capture";
      } else if (module_eng_union == "SafeRectifyReply") {
        //安全整改回复
        linkName = "enterprise_safety_safeManage_rectification";
      } else if (module_eng_union == "StoreIssue") {
        //发料单
        query = { id: msg_ext[0] };
        linkName = "enterprise_material_manage_store_inventory_newOutboundOne";
      } else if (module_eng_union == "LoadometerWeight") {
        //地磅数据
        query = { id: msg_ext[0] };
        linkName = "enterprise_material_manage_loadometer";
      } else if (module_eng_union == "TunnelGeologyPredict") {
        //超前地质预报
        linkName = "enterprise_engineering_advancedGeology_list";
      } else if (module_eng_union == "ProcessConvergeBuild") {
        //工序施工
        linkName = "enterprise_engineering_processConnection_processTime";
      } else if (module_eng_union == "QuantityDailyInspection") {
        //质量巡检
        query = { id: msg_ext[0] };
        linkName = "enterprise_quality_inspection";
        ProjectInfoProjectLinkageRr;
      } else if (module_eng_union.includes("ProjectInfoProjectLinkage")) {
        //联动月报表
        query = { id: msg_ext[0] };
        linkName = "enterprise_engineering_monthReport_detail";
      } else if (module_eng_union == "QualityProcessInspection") {
        //隐蔽工程验收
        query = { id: msg_ext[0] };
        linkName = "enterprise_quality_takecoverEngineering";
      }
      this.$router.linkTo(linkName, query);
    },
  },
};
</script>
<style scoped lang="scss">
.back_icon {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 100%;
  background: $linear-c;
}
</style>
