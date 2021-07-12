<template>
  <div class="container-all">
    <!-- <Import ref="ImportDialog" :type="Number($route.query.t) + 1"></Import> -->
    <Detail ref="DetailDialog"></Detail>
    <div class="rounded-1 bg-secondary">
      <nBackTop
        :title="
          ['特困职工', '重困职工', '一般困难职工'][$route.query.t] + '列表'
        "
      />
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
            v-permission="['UnionPartyHardWorker-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'hard_worker_id', 'delUnionPartyHardWorker')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartyHardWorker-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportUnionPartyHardWorker',
                listQuery,
                ['特困职工', '重困职工', '一般困难职工'][$route.query.t] + '表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <!-- <n-button
            class="ml-2"
            :btnText="'导入'"
            @buttonClick="importFun"
            v-permission="['UnionPartyHardWorker-import']"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button> -->
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
        <el-table-column label="姓名" prop="account_name"></el-table-column>
        <el-table-column label="职务" prop="hard_worker_job"></el-table-column>
        <el-table-column
          label="联系方式"
          prop="hard_worker_tel"
        ></el-table-column>
        <el-table-column
          label="困难档案编号"
          prop="hard_worker_number"
        ></el-table-column>
        <el-table-column
          label="通过审核日期"
          prop="hard_pass_time"
        ></el-table-column>
        <el-table-column label="是否解除困难状态" prop="hard_worker_hard_state">
          <template slot-scope="scope">
            <div class="d-inline-block" @click.stop>
              <nStatusButton
                v-permission="['UnionPartyHardWorker-cancel']"
                @buttonClick="
                  scope.row.hard_worker_hard_state == 5 && cancelFun(scope.row)
                "
                :changeColor="'#fd5571'"
                :btnText="
                  scope.row.hard_worker_hard_state == 5 ? '待解除' : '已解除'
                "
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              v-permission="['UnionPartyHardWorker-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'hard_worker_id',
                  'delUnionPartyHardWorker'
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
// import Import from "./components/Import";
import Detail from "./components/Detail";

export default {
  components: {
    // Import,
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "queryUnionPartyHardWorkerList",
      colorArr: ["", "orange", "main", "blue", "grey2", "main", "main"],
      statesArr: ["待提出", "已提出", "已退回", "公示通过"],
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: "",
        end_time: "",
        hard_worker_hard_state_start: 5,
        hard_worker_hard_state_end: 6,
        hard_worker_hard_type: Number(this.$route.query.t) + 1,
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
      },
      hard_worker_hard_state: 0,
      dateRange: [],
    };
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
    // 查看详情
    infoClick(row) {
      this.$refs.DetailDialog.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.DetailDialog.$refs.hardworkers.infoFun(row.hard_worker_id);
      });
    },
    cancelFun(row) {
      this.confirm("", "", "是否解除困难状态？").then(async () => {
        let data = await api.updateUnionPartyHardWorkerSTATE({
          hard_worker_id: row.hard_worker_id,
          hard_worker_hard_state: 6,
        });
        this.getList();
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    // 点击导入
    importFun() {
      this.$refs.ImportDialog.show();
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
