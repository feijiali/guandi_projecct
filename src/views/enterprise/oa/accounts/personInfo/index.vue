<template>
  <div class="w-100 h-100 clear">
    <n-dialog
      ref="dialog2"
      :diaTit="'导入人员'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>人员模板</p>

            <a
              :href="GLOBAL.baseurl + '/MOULD/person.xlsx'"
              download="人员模板.xlsx"
            >
              <n-button
                class="mt-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
            <n-button
              class="ml-2"
              :btnText="'导出组织架构'"
              :colorBtn="'blue'"
              @buttonClick="
                $utils.handleExport('exportOrganizationOrgan', {}, '组织架构表')
              "
            ></n-button>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx, .doc, .docx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="'导入人员表'"
            />
          </el-upload>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <PersonInfo
      ref="detailDialog"
      :infoData="infoData"
      :transferInfo="transferInfo"
    ></PersonInfo>
    <div class="content-info-box h-100 position-relative">
      <div
        class="content-info-box-left bg-white rounded-1 h-100 py-2 position-relative d-flex flex-column"
      >
        <div class="grey2 px-2">
          温馨提示：单击选中机构或部门，右侧展示对应人员信息
        </div>
        <div style="height: calc(100% - 60px)">
          <n-scroll class="mt-2">
            <n-tree
              :organize="false"
              :highlight-current="false"
              :treeData="treeData"
              ref="treeNode"
              @leftClick="leftClick"
            >
              <template v-slot:default="slotProps">
                <span v-if="slotProps.node.account_counts"
                  >【{{ slotProps.node.account_counts }}人】</span
                >
              </template>
            </n-tree>
          </n-scroll>
        </div>
      </div>
      <div class="content-info-box-right rounded-1 h-100 table-list-wrap">
        <div class="rounded-1 bg-white px-1 py-1 d-flex position-relative">
          <div
            @click="chooseFun(index + 1)"
            class="statistics-box-item d-flex align-items-center cursor-p"
            v-for="(item, index) in statisticsArr"
            :key="index"
          >
            <div class="ml-1">
              <span class="font-15">{{ item.name }}</span>
              <span
                class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
              >
                {{ accountCounts[index + 1 + ""]
                }}<span class="font-14 font-weight-normal">人</span>
              </span>
            </div>
          </div>
        </div>
        <div
          class="top-select-box mt-1 bg-white d-flex justify-content-between align-items-center"
        >
          <div>
            <div class="d-inline-block">
              <label class="text-secondary">入职时间：</label>
              <el-date-picker
                @change="chooseDate"
                class="el-date-picker-range-box"
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                format="yyyy-MM-dd"
                :editable="false"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="ml-2 d-inline-block">
              <n-search
                ref="serch"
                class="search-box"
                :isInput="true"
                :placeholder="'请输入人员姓名或联系电话'"
                :width="250"
                @searchFun="searchFun"
              ></n-search>
            </div>
          </div>
          <div>
            <n-button
              v-permission="['Account-delete']"
              class="ml-2"
              :btnText="'批量删除'"
              @buttonClick="
                deleteFun(true, '', 'account_id', 'delAccount', () => {
                  deleteFunAfter();
                })
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
              </template>
            </n-button>
            <n-button
              class="ml-2"
              v-permission="['Account-export']"
              v-if="itemNode.node.organ_type != 70"
              :btnText="'导出'"
              @buttonClick="
                $utils.handleExport('exportAccount', listQuery, '人员信息表')
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
            <n-button
              v-if="itemNode.node.organ_type != 70"
              class="ml-2"
              :btnText="'导入'"
              v-permission="['Account-upload']"
              @buttonClick="exportFun"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
            <n-button
              v-if="itemNode.node.organ_type != 70"
              class="ml-2"
              :btnText="'新增'"
              v-permission="['Account-upload']"
              @buttonClick="handleUpdate()"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
        <el-table
          class="cursor-p-table"
          :data="tableData"
          ref="table"
          style="width: 100%"
          height="100%"
          @row-click="rowclick"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          ><template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column prop="index" label="序号" width="80">
            <template slot-scope="scope">
              <label>
                {{
                  (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
                }}
              </label>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="account_name"
            :key="8"
          ></el-table-column>
          <el-table-column
            :label="itemNode.node.organ_type != 70 ? '部门' : '工程项目'"
            prop="organ"
            :key="7"
          ></el-table-column>
          <el-table-column
            :label="itemNode.node.organ_type != 70 ? '职位' : '工种'"
            prop="account_job"
            :key="6"
          ></el-table-column>
          <el-table-column
            v-if="itemNode.node.organ_type == 70"
            label="班组名称"
            prop="team"
            :key="5"
          ></el-table-column>
          <el-table-column label="电话 " prop="account" :key="4">
            <!-- <template slot-scope="scope">
              {{($store.getters.organ_child_node.indexOf(scope.row.organ_id)!=-1||$store.getters.account_id==scope.row.account_id)?scope.row.account:$utils.hidePartOfPhoneNum(scope.row.account)}}
            </template> -->
          </el-table-column>
          <el-table-column
            :key="3"
            :label="itemNode.node.organ_type != 70 ? '入职时间' : '进场时间'"
            prop="account_service_time"
          ></el-table-column>
          <el-table-column
            label="工作内容"
            prop="account_job"
            v-if="itemNode.node.organ_type != 70"
            :key="2"
          >
            <template slot-scope="scope">
              <span
                @click.stop="
                  $router.linkTo('enterprise_oa_workbench_weekPlan', {
                    id: scope.row.account_id,
                  })
                "
                >周计划</span
              ></template
            >
          </el-table-column>
          <el-table-column
            label="操作"
            v-if="itemNode.node.organ_type !== 70"
            :key="1"
          >
            <template slot-scope="scope">
              <i
                v-if="scope.row.organ_type != 70"
                v-permission="['Account-update']"
                @click.stop="handleUpdate(scope.row)"
                class="iconfont btn-btn_list_edit edit-icon-btn"
              ></i>
              <i
                v-permission="['Account-delete']"
                @click.stop="
                  deleteFun(
                    false,
                    scope.row,
                    'account_id',
                    'delAccount',
                    () => {
                      deleteFunAfter();
                    }
                  )
                "
                class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              ></i>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import PersonInfo from "./components/PersonInfo";
import { hasPermissionArr } from "@/plugins/permission_tools";

export default {
  mixins: [table, confirm, upload],
  components: {
    PersonInfo,
  },
  data() {
    return {
      title: "人员信息列表",
      postURL: "queryAccountRole", //表格请求接口
      statisticsArr: [
        {
          name: "正式员工",
        },
        {
          name: "离职员工",
        },
        {
          name: "实习员工",
        },
        {
          name: "试用员工",
        },
        {
          name: "三类人员",
        },
      ],
      treeData: [], //人员组织架构数据
      itemNode: { node: {} }, //当前左侧组织架构中的节点对象
      ruleform: {},
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        account_search: "",
        organ_node: this.$organ_id_en_or_pro(this),
        account_service_start_time: "",
        account_service_end_time: "",
        staff_status: 1, //账号状态,1:正常,2:隐藏,3:删除
      },
      infoData: { role_list: [] }, //详情
      transferInfo: [], //人员调动列表

      accountCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, //人员状态统计 0:合计 1:在职2:离职 	3:实习 4:试用
      account_id: 0, //当前编辑的人员id
      allowAddPeronArr: [60, 70], // 机构类型是部门或班组的时候才可以新增人员
      dateRange: [],
      getListBool: false,
    };
  },
  activated() {
    // 获取人员组织架构图
    this.getTreeData();
    // 查询人员状态统计
    this.queryAccountStatusCounts();
    // 查询三类人员统计
    this.QueryStaffAccountThreeStat();
    this.getList();
  },
  methods: {
    chooseDate(val) {
      this.listQuery.account_service_start_time = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.account_service_end_time = this.dateRange
        ? this.dateRange[1]
        : "";
      this.refreshData();
    },
    // 获取组织架构
    async getTreeData() {
      let data = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.treeData = data.result;
      // 重新拿到数据后设置当前选中的节点
      if (data.result[0] && JSON.stringify(this.itemNode) == "{}") {
        this.$nextTick(() => {
          this.$refs.treeNode.defaultExpandedKeys = [
            this.treeData[0] && this.treeData[0].tag,
          ];
          this.$refs.treeNode.$refs.tree.setCurrentKey(
            this.$store.getters.organTreeData[0].tag
          );
        });
        this.itemNode = data.result[0];
        this.listQuery.organ_node = this.itemNode.tag;
      }
      if (JSON.stringify(this.itemNode) != "{}") {
        this.$nextTick(() => {
          this.$refs.treeNode.defaultExpandedKeys = [this.itemNode.tag];
          this.$refs.treeNode.$refs.tree.setCurrentKey(this.itemNode.tag);
        });
      }
    },
    // 筛选人员状态
    chooseFun(t) {
      if (t == 5) {
        if (hasPermissionArr(["StaffAccountThree"])) {
          this.$router.linkTo("enterprise_oa_account_personInfo_threePerson");
        } else {
          this.$tip({
            isTip: true,
            message: "抱歉，您没有权限查看",
          });
          return;
        }
      } else {
        this.listQuery.organ_node = this.itemNode.node.organ_id
          ? this.itemNode.node.organ_id
          : this.$organ_id_en_or_pro(this);
        this.listQuery.account_status = t;
        this.$refs.serch.searchObj = "";
        this.listQuery.account_search = "";
        this.refreshData();
      }
    },
    async QueryStaffAccountThreeStat() {
      let data = await api.QueryStaffAccountThreeStat({
        organ_node: this.listQuery.organ_node,
      });
      let count_arr = [
        data.result[0].count_a,
        data.result[0].count_b,
        data.result[0].count_c,
      ];
      count_arr = count_arr.reduce((n, m) => n + m);
      this.accountCounts[5] = count_arr;
    },
    // 查询人员状态统计
    async queryAccountStatusCounts() {
      let data = await api.queryAccountStatusCounts({
        staff_status: 1,
        organ_node: this.listQuery.organ_node,
      });
      let _this = this;
      data.result.forEach((ele) => {
        _this.accountCounts[ele.account_status + ""] = ele.account_counts | 0;
      });
    },
    //   点击导入
    exportFun() {
      this.$refs.dialog2.show();
    },
    // 删除数据后回调
    deleteFunAfter() {
      // 获取人员组织架构图
      this.getTreeData();
      // 查询人员状态统计
      this.queryAccountStatusCounts();
      // 查询三类人员统计
      this.QueryStaffAccountThreeStat();
    },
    // 提交
    async submitFun() {
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择导入文件",
        });
        return;
      }
      await this.$utils.uploadFile.call(this, ["fileList"], {
        uploadFileModule: "Account",
      });
      let fileListArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
      }
      this.ruleform.file_name = fileListArr.join(",");
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      subdata;
      let res = await api.importAccount(subdata);
      this.fileList = [];
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog2.cancel();
          this.getTreeData();
          // 查询人员状态统计
          this.queryAccountStatusCounts();
          // 更新列表
          this.refreshData();
        },
      });
    },
    //单击左侧组织架构
    leftClick(obj) {
      let { item, value, element } = obj;
      this.itemNode = item;
      this.listQuery.account_status = 0;
      this.listQuery.organ_node = item.node.organ_id;
      delete this.listQuery.noOrganNodes;
      this.listQuery.account_search = "";
      this.listQuery.account_search == "" && (this.$refs.serch.searchObj = "");
      this.refreshData();
      // 查询人员状态统计
      this.queryAccountStatusCounts();
      //   查询三类人员统计
      this.QueryStaffAccountThreeStat();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.account_status = 0;
      this.listQuery.account_search = val;
      this.refreshData();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 编辑
    handleUpdate(row) {
      //新增要判断当前左侧选中的组织架构的几个类型是部门或者班组的时候才可以新增人员
      if (this.itemNode) {
        row && (this.account_id = row.account_id);
        let query = row
          ? {
              id: this.account_id,
            }
          : {
              organ_id: this.itemNode.tag,
              isTeam:
                this.itemNode.node.organ_type == 70 ||
                this.itemNode.node.organ_type == 60
                  ? 1
                  : 0,
            };
        this.linkTo("enterprise_oa_account_personInfo_handle", query);
      } else {
        this.$tip({
          isTip: true,
          message: "请先添加组织机构",
        });
        return;
      }
    },
    // 点击详情回填数据
    async rowclick(row) {
      if (hasPermissionArr(["Account-query"])) {
        this.queryAccountRole(row.account_id);
      } else {
        if (row.account_id == this.$store.getters.account_id) {
          this.queryAccountRole(row.account_id);
        }
      }
    },
    // 查询人员详情
    async queryAccountRole(id) {
      let data = await api.queryAccountRole({
        account_id: id,
      });
      this.infoData = data.result[0];
      await this.queryStaffMobilize(id);
      this.$refs.detailDialog.show();
    },
    // 查询人员调动
    async queryStaffMobilize(id) {
      let data = await api.queryStaffMobilize({
        mobilize_account_id_union: id,
        revise_info_state: 3,
      });
      this.transferInfo = data.result;
    },
    // 已离职那条显示为灰色
    tableRowClassName({ row, rowIndex }) {
      if (row.account_status == 2) {
        return "noread-row";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.top-select-box {
  border-radius: 10px 10px 0 0 !important;
}
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 300px;
  }

  .content-info-box-right {
    position: absolute;
    left: 308px;
    right: 0;
    bottom: 0;
    top: 0;
    .statistics-box-item {
      width: 15%;
    }
  }
}
</style>
