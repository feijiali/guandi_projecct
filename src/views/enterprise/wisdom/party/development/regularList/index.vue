<template>
  <div class="container-all">
    <!-- 正式党员详情 -->
    <Detail
      ref="detailDialog"
      :infoData="infoData"
      :pd_prepare_table="pd_prepare_table"
    ></Detail>
    <!--补充资料  -->
    <FileAdd ref="fileAddDialog"></FileAdd>
    <!--下发转正通知单  -->
    <SendEmployment ref="sendEmploymentDialog"></SendEmployment>
    <!--转正通知单详情  -->
    <EmploymentInfo ref="EmploymentInfoDialog"></EmploymentInfo>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title + '列表'" />
    </div>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              v-model="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">确认状态：</label>
            <el-select
              v-model="listQuery.pd_states"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="待确认" :value="7"></el-option>
              <el-option label="已确认" :value="9"></el-option>
              <el-option label="已取消" :value="8"></el-option>
              <el-option label="已转正" :value="10"></el-option>
            </el-select>
          </div>
          <n-search
            class="d-inline-block ml-2"
            :isInput="true"
            :placeholder="'请输入所属机构搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['UnionPartyPersonnelDevelop-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'personnel_develop_id',
                'delUnionPartyPersonnelDevelop'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartyPersonnelDevelop-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportUnionPartyPersonnelDevelop',
                listQuery,
                '正式党员表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        ref="table"
        class="cursor-p-table"
        style="width: 100%"
        height="calc(100% - 150px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope" width="80">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="所属机构"
          prop="organ_area_name"
        ></el-table-column>
        <el-table-column label="申请名称" prop="pd_title"></el-table-column>
        <el-table-column label="申请人" prop="account_name"></el-table-column>
        <el-table-column
          label="确认人"
          prop="faction_account_name"
        ></el-table-column>
        <el-table-column
          label="下发转正通知人"
          prop="official_account_name"
        ></el-table-column>
        <el-table-column
          label="确认时间"
          prop="pd_faction_time"
          width="180"
        ></el-table-column>
        <el-table-column label="确认正式党员">
          <template slot-scope="scope">
            <div @click.stop>
              <nStatusButton
                v-permission="['UnionPartyPersonnelDevelop-formal']"
                @buttonClick="
                  scope.row.pd_states == 7 &&
                    linkTo(
                      'enterprise_wisdom_party_development_activistList_handle',
                      { id: scope.row.personnel_develop_id, type: 7 }
                    )
                "
                :changeColor="'#fd5571'"
                :btnText="pdStateArr[scope.row.pd_states]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">
            <div class="text-center d-inline-block">
              <nStatusButton
                v-permission="['UnionPartyPersonnelDevelop-update']"
                @buttonClick="
                  scope.row.pd_states == 8 &&
                    linkTo(
                      'enterprise_wisdom_party_development_activistList_handle',
                      { id: scope.row.personnel_develop_id, type: 7 }
                    )
                "
                :changeColor="scope.row.pd_states == 8 ? '#fd5571' : '#D6DAE4'"
                :btnText="'编辑'"
              />
              <div @click.stop class="d-inline-block ml-2">
                <nStatusButton
                  v-permission="['UnionPartyPersonnelDevelop-formal']"
                  @buttonClick="addFile(scope.row)"
                  :changeColor="
                    scope.row.pd_states == 7 ||
                    scope.row.pd_states == 9 ||
                    scope.row.pd_states == 10
                      ? '#fd5571'
                      : '#D6DAE4'
                  "
                  :btnText="'补充资料'"
                />
              </div>
              <div @click.stop class="d-inline-block ml-2">
                <nStatusButton
                  v-permission="['UnionPartyPersonnelDevelop-formal']"
                  @buttonClick="sendFile(scope.row)"
                  :changeColor="
                    scope.row.pd_states == 10 || scope.row.pd_states == 9
                      ? '#fd5571'
                      : '#D6DAE4'
                  "
                  :btnText="
                    scope.row.pd_states == 8 ||
                    scope.row.pd_states == 9 ||
                    scope.row.pd_states == 7
                      ? '下发通知'
                      : '查看通知'
                  "
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="totalcount > 0"
        background
        class="text-right mt-1 mr-1"
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
import upload from "@/mixins/upload";

import { hasPermissionArr } from "@/plugins/permission_tools.js";
import Detail from "./components/Detail";
import FileAdd from "./components/FileAdd";
import SendEmployment from "./components/SendEmployment";
import EmploymentInfo from "./components/EmploymentInfo";

export default {
  components: {
    Detail,
    FileAdd,
    SendEmployment,
    EmploymentInfo,
  },
  mixins: [table, confirm, upload],
  data() {
    return {
      colorArr: [
        "",
        "orange",
        "orange",
        "main",
        "pink2",
        "orange",
        "main",
        "orange",
        "pink2",
        "main",
        "main",
      ],
      pdStateArr: [
        "",
        "申请中",
        "待确认",
        "非积极分子",
        "积极分子",
        "资料未补全",
        "资料已补全",
        "待确认",
        "已取消",
        "已确认",
        "已转正",
      ],
      postURL: "queryUnionPartyPersonnelDevelopList", //表格请求接口
      title: "",
      listQuery: {
        page: 0,
        page_size: 20,
        end_time: "",
        pd_states: 0, //确认状态
        organ_search: "",
        pd_states_start: this.$route.query.range
          ? this.$route.query.range.split(",").map(Number)[0]
          : null,
        pd_states_end: this.$route.query.range
          ? this.$route.query.range.split(",").map(Number)[1]
          : null,
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
      },
      title: ["", "个人申请", "入党积极分子", "预备党员", "正式党员"][
        parseInt(this.$route.query.type)
      ],
      //详情
      infoData: { file_list: [], pic_list: [] },
      // 撤销
      revokeDate: {
        revise_info_id: "",
        revise_info_undo_reason: "",
      },
      prepareTableArr: [
        { name: "入党申请书", val: 128 },
        { name: "谈话记录表", val: 64 },
        { name: "党支部委员会会议记录", val: 32 },
        { name: "党支部党员大会会议记录", val: 16 },
        { name: "政治审查相关资料", val: 8 },
        { name: "入党积极分子培养考察表", val: 4 },
        { name: "入党志愿书", val: 2 },
        { name: "批准预党员转正通知书", val: 1 },
      ], //类目数组
      pd_prepare_table: [], //要上传的类目
      getListBool: false,
    };
  },
  activated() {
    this.listQuery.organ_node = parseInt(this.$route.query.organ_id)
      ? parseInt(this.$route.query.organ_id)
      : this.$organ_id_en_or_pro(this);
    this.getList();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.organ_search = val;
      this.refreshData();
    },
    // 点击详情回填数据
    async rowclick(row) {
      await this.queryUnionPartyPersonnelDevelop(row);
    },
    async queryUnionPartyPersonnelDevelop(row) {
      let res = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: row.personnel_develop_id,
      });
      this.infoData = res.result[0];
      var num = parseInt(this.infoData.pd_prepare_table, 2);
      !this.infoData.pd_prepare_table && (this.pd_prepare_table = []);
      this.prepareTableArr.forEach((item) => {
        (item.val & num) != 0 && this.pd_prepare_table.push(item.val);
      });
      this.$refs.detailDialog.show();
    },
    linkTo(name, query) {
      if (!hasPermissionArr(["UnionPartyPersonnelDevelop-formal"])) {
        return;
      }
      this.$router.linkTo(name, query ? query : null);
    },
    // 点击补充资料
    async addFile(row) {
      this.$refs.fileAddDialog.addFile(row);
    },
    // 下发通知单
    sendFile(row) {
      if (row.pd_states == 7 || row.pd_states == 8 || row.pd_states == 9) {
        //下发通知单
        this.$refs.sendEmploymentDialog.sendFile(row);
      } else {
        //查看通知单详情
        this.$refs.EmploymentInfoDialog.sendFile(row);
      }
    },
    changeFun(row) {
      this.confirm("", "", "是否转正？").then(async () => {
        let data = await api.updateUnionPartyPersonnelDevelopStates({
          pd_states: 7, //7:正式党员-未确认
          personnel_develop_id: row.personnel_develop_id,
        });
        this.refreshData();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-item {
  width: 50%;
  .detail-label {
    width: 80px;
  }
}
body .detail-item .detail-value {
  color: auto;
}
.notice-box {
  line-height: 30px;
}
.contenteditable-p {
  padding: 0 8px;
  display: inline-block;
  min-width: 60px;
  height: 25px;
  border-bottom: 0.5px solid black;
  color: $color-1;
}
.active-box {
  width: 25%;
  margin-bottom: 10px;
}
</style>
