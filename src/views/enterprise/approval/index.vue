<template>
  <div class="container-all">
    <div
      class="container-div d-flex flex-column"
      style="background-color: transparent"
    >
      <div class="position-relative news-box bg-white rounded-1">
        <div
          class="
            common-top-function-btn common-top-function-btn-position-absolute
            z-index-1
          "
          style="top: 5px; right: 20px"
        >
          <n-button
            :btnText="'新增'"
            v-permission="['ApproveProcess-upload']"
            @buttonClick="
              linkTo('enterprise_approval_handle', {
                t: active + 1,
                t2: subActive,
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
        <ul class="rounded-1 nav-bar d-flex">
          <li
            class="nav-item cursor-p"
            @click="switchMenu(index, item.key)"
            :class="[active == index ? 'active' : '']"
            v-for="(item, index) in menuArr"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div
        class="
          rounded-1
          position-relative
          news-box
          d-flex
          align-items-center
          mb-1
          pdl10
          bg-white
          mt-1
        "
      >
        <div class="ml-2 cursor-p operateMenu position-relative z-index-2">
          <i
            @click="leftMenuFun"
            v-if="left < 0 && subMenuArr.length > 10"
            class="
              iconfont
              btn-btn_arrow_left
              text-white
              font-24
              back_icon
              d-inline-block
              cursor-p
            "
          ></i>
          <i
            v-else
            class="
              iconfont
              btn-btn_arrow_left
              text-white
              font-24
              back_icon
              d-inline-block
              cursor-not
            "
          ></i>
        </div>
        <div class="news-box-top-contain position-relative h-100">
          <ul
            :style="{
              minWidth: subMenuArr.length * 132 + 'px',
              left: left + 'px',
            }"
            class="
              bg-white
              rounded-1
              nav-bar
              d-flex
              position-absolute
              news-box-top
              h-100
            "
          >
            <li
              class="nav-item cursor-p"
              :class="[subActive == index ? 'active' : '']"
              v-for="(item, index) in subMenuArr"
              :key="index"
              @click="switchFun(item.key, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div
          class="mr-2 cursor-p operateMenu position-relative z-index-2"
          v-if="
            left > -((subMenuArr.length * 126) / 2) &&
            left <= 0 &&
            subMenuArr.length > 10
          "
        >
          <i
            @click="rightMenuFun"
            v-if="left > borLeft && left <= 0 && subMenuArr.length > 10"
            class="
              iconfont
              btn-btn_arrow_right
              text-white
              font-24
              back_icon
              d-inline-block
              cursor-p
            "
          ></i>
          <i
            v-else
            class="
              iconfont
              btn-btn_arrow_right
              text-white
              font-24
              back_icon
              d-inline-block
              cursor-not
            "
          ></i>
        </div>
      </div>
      <div class="bg-white rounded-1 position-relative flex-fill">
        <el-table class="cursor-p-table" :data="tableData" style="width: 100%">
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column prop="index" label="序号" width="100">
            <template slot-scope="scope">
              <label>
                {{
                  (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
                }}
              </label>
            </template>
          </el-table-column>
          <el-table-column
            label="流程名称"
            prop="process_name"
          ></el-table-column>
          <el-table-column label="流程归属" prop="organ">
            <template slot-scope="scope">
              <span
                v-for="(item, index) in belongFun(scope.row.process_belong)"
                :key="index"
                >{{ item
                }}{{
                  index == belongFun(scope.row.process_belong).length - 1
                    ? ""
                    : "，"
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="所属模块" prop="basis_chn"></el-table-column>
          <el-table-column
            label="设置时间"
            prop="process_sub_time"
          ></el-table-column>
          <el-table-column label="启用状态" prop="process_state">
            <template slot-scope="scope">
              <el-switch
                v-permission="['ApproveProcess-update']"
                @change="(data) => changeState(data, scope.row)"
                v-model="scope.row.process_state"
                active-color="#5a5efd"
                inactive-color="#c0c4cc"
                :active-value="1"
                :inactive-value="2"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <i
                v-permission="['ApproveProcess-update']"
                @click="
                  linkTo('enterprise_approval_handle', {
                    id: scope.row.process_id,
                    t: active + 1,
                    t2: subActive,
                  })
                "
                class="iconfont btn-btn_list_edit edit-icon-btn"
              ></i>
              <i
                v-permission="['ApproveProcess-delete']"
                @click.stop="
                  deleteFun(false, scope.row, 'process_id', 'delApproveProcess')
                "
                class="
                  iconfont
                  btn-btn_list_trash
                  trash-icon-btn
                  ml-2
                  table-trash-icon
                "
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      postURL: "queryApproveProcessList",
      deleData: {},
      active: 0,
      menuArr: [
        { name: "OA管理", key: "OALeave" },
        { name: "工程管理", key: "ProjectReportEngineeringMain" },
        // { name: "材料管理", key: "StaffMobilize" },
        // { name: "设备管理", key: "UnionPartyHardWorker" },
      ],
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      key: [], //所属模块
      subMenuArr: [],
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
        { name: "合同计量", key: "ProjectReportEngineeringMain" },
        { name: "合同付款", key: "ProjectReportEngineeringPay" },
        { name: "变更台账", key: "ChangeParameterParameter" },
      ],
      subMenuArr3: [
        { name: "购置单", key: "Apply" },
        { name: "租赁单", key: "Lease" },
      ],
      subActive: 0, //子分类
      left: 0,
      borLeft: 0,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  created() {
    this.tableData = [];
  },
  mounted() {
    this.getListBool = false;
  },
  created() {
    if (this.$route.query.subActive) {
      this.subActive = Number(this.$route.query.subActive);
      this.active = Number(this.$route.query.active);
      this.subMenuArr = this["subMenuArr" + (this.active + 1)];
    } else {
      this.subMenuArr = this.subMenuArr1;
      this.subActive = 0;
      this.active = 0;
    }
    this.listQuery.process_modules_union =
      this["subMenuArr" + (this.active + 1)][this.subActive].key;
    this.borLeft = -((this.subMenuArr.length * 126) / 2);
    this.getList();
  },
  methods: {
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.refreshData();
    },
    belongFun(belong) {
      let arr = [];
      let belongString = (Array(3).join(0) + belong).slice(-3);
      arr = [
        String(belongString)[0] == 1 ? "公司总部" : "",
        String(belongString)[1] == 1 ? "管理部" : "",
        String(belongString)[2] == 1 ? "项目部" : "",
      ];
      return arr.filter((item) => item);
    },
    leftMenuFun() {
      this.left += 135;
    },
    rightMenuFun() {
      this.left -= 135;
    },
    // 切换消息模块标题
    switchFun(item, ind) {
      this.subActive = ind;
      this.refreshData();
      this.$router.push({
        query: { subActive: this.subActive, active: this.active },
      });
    },
    // 切换组织建设菜单
    switchMenu(ind) {
      this.left = 0;
      this.subMenuArr = this["subMenuArr" + (ind + 1)];
      this.active = ind;
      this.subActive = 0;
      this.refreshData();
      this.$router.push({
        query: { subActive: this.subActive, active: this.active },
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 改变状态
    async changeState(val, row) {
      let res = await api.updateApproveProcessState({
        process_id: row.process_id,
        process_state: Number(val),
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.process_modules_union =
        this["subMenuArr" + (this.active + 1)][this.subActive].key;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.back_icon {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 100%;
  background: $linear-c;
}
</style>
