<template>
  <div class="container-all">
    <Detail ref="DetailDialog" :types="type"></Detail>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="subsidy_type_arr[type] + '列表'" />
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
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2" v-if="type == 1">
            <label class="text-secondary">困难等级：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.subsidy_hard_level"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="(item, index) in subsidy_hard_level_arr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
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
        </div>
        <div>
          <n-button
            v-permission="[
              [
                'UnionPartySubsidyStudy-delete',
                'UnionPartySubsidySick-delete',
                'UnionPartySubsidyCompensate-delete',
              ][type - 1],
            ]"
            class="ml-2"
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
            v-permission="[
              [
                'UnionPartySubsidyStudy-export',
                'UnionPartySubsidySick-export',
                'UnionPartySubsidyCompensate-export',
              ][type - 1],
            ]"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportUnionPartySubsidy',
                listQuery,
                subsidy_type_arr[type] + '表'
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
        class="cursor-p-table"
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 90px)"
        @row-click="infoClick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
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
          v-if="type == 0 || type == 1"
          label="困难等级"
          prop="subsidy_hard_level_string"
        ></el-table-column>
        <el-table-column
          label="通过审核日期"
          prop="subsidy_pass_time"
        ></el-table-column>
        <el-table-column
          label="审批状态"
          prop="approve_state_string"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              v-permission="[
                [
                  'UnionPartySubsidyStudy-delete',
                  'UnionPartySubsidySick-delete',
                  'UnionPartySubsidyCompensate-delete',
                ][type - 1],
              ]"
              class="iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'subsidy_id',
                  'delUnionPartySubsidy'
                )
              "
            ></span>
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
import Detail from "./components/Detail";

export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "queryUnionPartySubsidyList",
      subsidy_hard_level_arr: ["特困职工", "重困职工", "一般困难职工"],
      subsidy_type_arr: ["困难职工", "金秋助学", "生病住院", "补偿申请"],
      type: Number(this.$route.query.t),
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: "",
        end_time: "",
        // 1:审批中2:公示-未提出异议3:已提出异议-已提出异议4:已提出异议-未通过5:已确认-解除6:已确认-已解除

        subsidy_hard_level: 0,
        subsidy_type: Number(this.$route.query.t) + 1, //2:金秋助学3:生病住院慰问4:补偿申请
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
      },
      dateRange: [],
      getListBool: false,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    if (this.type == 1) {
      this.listQuery.subsidy_state_start = 5;
      this.listQuery.subsidy_state_end = 5;
    } else {
      this.listQuery.revise_info_state = 3;
    }
    this.getList();
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 查看详情
    infoClick(row) {
      // return;
      this.$refs.DetailDialog.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.DetailDialog.$refs[
          ["", "helpStudyInfo", "SickCondolenceInfo", "CompensateInfo"][
            this.type
          ]
        ].infoFun(row.subsidy_id);
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
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
