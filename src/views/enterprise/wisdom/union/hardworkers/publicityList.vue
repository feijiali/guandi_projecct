<template>
  <div class="container-all">
    <Objection ref="ObjectionDialog"></Objection>
    <Confirm ref="ConfirmDialog"></Confirm>
    <Detail ref="DetailDialog" :infoData="infoData"></Detail>

    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'困难职工公示'" />
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
            <label class="text-secondary">异议状态：</label>
            <el-select
              v-model="hard_worker_hard_state"
              placeholder="请选择"
              @change="changeState"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                :label="item"
                :value="index + 1"
                v-for="(item, index) in statesArr"
                :key="index"
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
                '困难职工表'
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
        <el-table-column
          label="公示天数"
          prop="publicity_day"
        ></el-table-column>
        <el-table-column
          label="异议状态"
          prop="hard_worker_publicity_state_string"
        >
          <template slot-scope="{ row }">
            <span
              class="status-btn"
              :style="{
                backgroundColor: backgroundColorArr[row.hard_worker_hard_state],
                color: colorArr[row.hard_worker_hard_state],
              }"
              >{{ row.hard_worker_publicity_state_string }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="txc">
              <div class="d-inline-block" @click.stop>
                <nStatusButton
                  v-if="
                    scope.row.hard_worker_hard_state == 2 &&
                    scope.row.publicity_day < 5
                  "
                  @buttonClick="raiseObjection(scope.row)"
                  :changeColor="'#fd5571'"
                  :btnText="'提出异议'"
                />
              </div>
              <div class="d-inline-block" @click.stop>
                {{ scope.row.subsidy_state }}
                <nStatusButton
                  v-permission="['UnionPartyHardWorker-confirm']"
                  v-if="
                    scope.row.hard_worker_hard_state == 3 ||
                    (scope.row.hard_worker_hard_state == 2 &&
                      scope.row.publicity_day >= 5)
                  "
                  @buttonClick="confirmFun(scope.row)"
                  :changeColor="'#fd5571'"
                  :btnText="'处理'"
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
import Objection from "./components/Objection";
import Confirm from "./components/Confirm";
import Detail from "./components/Detail";

export default {
  components: {
    Objection,
    Confirm,
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      postURL: "queryUnionPartyHardWorkerList",
      colorArr: [
        "",
        "#FF8F2A",
        "#3377FF",
        "#3377FF",
        "#FD5672",
        "#3377FF",
        "#3377FF",
      ],
      backgroundColorArr: [
        "",
        "#FFF4DE",
        "#FFE4E4",
        "#DEE9FF",
        "#FFE4E4",
        "#DEE9FF",
        "#DEE9FF",
      ],
      statesArr: ["待提出", "已提出", "已退回", "公示通过"],
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: "",
        end_time: "",
        // 1:审批中2:公示-未提出异议3:已提出异议-已提出异议4:已提出异议-未通过5:已确认-解除6:已确认-已解除
        hard_worker_hard_state_start: 2,
        hard_worker_hard_state_end: 6,
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
      },
      hard_worker_hard_state: 0,
      dateRange: [],
      infoData: {},
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
    async infoClick(row) {
      // 查询工会管理公示
      this.$refs.DetailDialog.$refs.dialog.show();
      await this.queryUnionPartyPublicity(row.hard_worker_id);
      this.$nextTick(async () => {
        await this.$refs.DetailDialog.$refs.hardworkers.infoFun(
          row.hard_worker_id
        );
        this.$nextTick(() => {
          this.$set(
            this.infoData,
            "hard_worker_publicity_remark",
            this.$refs.DetailDialog.$refs.hardworkers.infoData
              .hard_worker_publicity_remark
          );
        });
      });
    },
    // 查询工会管理公示
    async queryUnionPartyPublicity(id) {
      let data = await api.queryUnionPartyPublicity({
        publicity_assess_id_un: id,
        publicity_assess_type: 1,
      });
      this.infoData = data.result[0] ? data.result[0] : { objectionNo: true };
    },
    //   筛选状态
    changeState(val) {
      let startEndArr = {
        0: [2, 6],
        1: [2, 2],
        2: [3, 3],
        3: [4, 4],
        4: [5, 6],
      };
      this.listQuery.hard_worker_hard_state_start = startEndArr[val][0];
      this.listQuery.hard_worker_hard_state_end = startEndArr[val][1];
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },

    // 点击处理
    confirmFun(row) {
      this.$refs.ConfirmDialog.confirmFun(row);
    },
    //   提出异议
    raiseObjection(row) {
      this.$refs.ObjectionDialog.raiseObjection(row);
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
