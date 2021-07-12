<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'生病慰问'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">审批状态：</span>
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
        <div>
          <n-button
            v-permission="['UnionPartySubsidySick-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'UnionPartySubsidySick',
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartySubsidySick-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'subsidy_id', 'delUnionPartySubsidy')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartySubsidySick-export']"
            class="ml-2"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'exportUnionPartySubsidy',
                'subsidy_id',
                tableSelectList.length
                  ? { subsidy_type: 3 }
                  : { ...listQuery, subsidy_type: 3 },
                '生病慰问表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartySubsidySick-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_apply', {
                t: $route.query.t,
              })
            "
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
        height="calc(100% - 80px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="所属机构"
          prop="organ_area_name"
        ></el-table-column>
        <el-table-column label="姓名" prop="subsidy_name"></el-table-column>
        <el-table-column label="职务" prop="subsidy_job"></el-table-column>
        <el-table-column label="联系方式" prop="subsidy_tel"></el-table-column>
        <el-table-column
          label="家庭成员姓名"
          prop="subsidy_family_members"
        ></el-table-column>
        <el-table-column
          label="提交人"
          prop="sub_account_name"
        ></el-table-column>
        <el-table-column label="申请时间" prop="subsidy_sub_time" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.subsidy_sub_time.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态" prop="revise_info_state">
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
        <el-table-column label="操作" header-align="center" width="80">
          <template slot-scope="scope">
            <i
              v-permission="['UnionPartySubsidySick-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'subsidy_id',
                  'delUnionPartySubsidy'
                )
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryUnionPartySubsidyList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
        subsidy_type: 3, //2:金秋助学3:生病住院慰问4:补偿申请
        revise_info_sub_account_id_union: 0,
      },
      dateRange: [],
      keyID: "subsidy_id",
      getListBool: false,
    };
  },
  activated() {
    this.listQuery.organ_node = this.$route.query.organ_id
      ? parseInt(this.$route.query.organ_id)
      : this.$organ_id_en_or_pro(this);
    if (hasPermissionArr(["UnionPartySubsidySick-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.revise_info_sub_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.revise_info_sub_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
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
    // 点击详情跳转
    rowclick(row) {
      // 如果是请假
      this.$router.linkTo("enterprise_oa_workbench_info", {
        // process_id: row.revise_info_process_id_union,
        t: 4,
        types: "UnionPartySubsidySick",
        id: row.revise_info_accessory_id,
        // info_id: row.revise_info_id
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = this.dateRange[0];
        this.listQuery.end_time = this.dateRange[1];
      } else {
        this.listQuery.start_time = "";
        this.listQuery.end_time = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
