<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'三类人员'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
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
          <div class="ml-2 d-inline-block">
            <n-search
              ref="serch"
              class="search-box"
              :isInput="true"
              :placeholder="'请输入人员姓名'"
              @searchFun="searchFun"
            ></n-search>
          </div>
          <div class="d-inline-flex ml-2">
            <div
              @click="chooseFun(index + 1)"
              class="statistics-box-item d-flex align-items-center cursor-p ml-1"
              v-for="(item, index) in statisticsArr"
              :key="index"
            >
              <div class="ml-1">
                <span class="font-15">{{ item.label }}</span>
                <span
                  class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
                >
                  {{ statistics[item.key] }} </span
                ><span class="font-14 font-weight-normal">人</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['Account-export']"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'ExportStaffAccountThree',
                listQuery,
                '三类人员表'
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
        height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="所属机构" prop="organ">
          <template slot-scope="scope">
            {{
              scope.row.project_organ +
              (scope.row.project_organ
                ? "-" + scope.row.organ
                : scope.row.organ)
            }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="account_name"></el-table-column>
        <el-table-column
          label="证书编号"
          prop="account_three_number"
        ></el-table-column>
        <el-table-column label="证书类型" prop="account_three_type">
          <template slot-scope="scope">
            {{
              [
                "",
                "企业主要负责人(A证)",
                "项目负责人(B证)",
                "专职安全生产管理人员(C证)",
              ][scope.row.account_three_type]
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="发证时间"
          prop="account_three_start"
        ></el-table-column>
        <el-table-column
          label="证书到期时间"
          prop="account_three_end"
        ></el-table-column>
        <el-table-column
          label="证件图"
          prop="account_name"
          align="center"
          width="140"
          header-align="center"
        >
          <template slot-scope="scope">
            <viewer
              :images="scope.row.urlList"
              class="lookPic"
              v-if="scope.row.urlList.length"
            >
              <template v-for="(item, index) in scope.row.urlList.slice(0, 4)">
                <img
                  v-show="index == 0"
                  class="capture-img"
                  :key="index + 'image'"
                  :src="item"
                />
              </template>
            </viewer>
            <span v-else>暂无证件</span>
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
      postURL: "QueryStaffAccountThreeList",
      statisticsArr: [
        {
          label: "企业主要负责人(A证)",
          key: "count_a",
        },
        {
          label: "项目负责人(B证)",
          key: "count_b",
        },
        {
          label: "专职安全生产管理人员(C证)",
          key: "count_c",
        },
      ],
      statistics: {
        count_a: 0,
        count_b: 0,
        count_c: 0,
      },
      //筛选条件
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        account_name: "",
        account_three_type: 0, //三类人员 1:A证,2:B证,3:C证
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    // 查询三类人员统计
    this.QueryStaffAccountThreeStat();
  },
  methods: {
    // 筛选人员状态
    chooseFun(t) {
      this.listQuery.account_three_type = t;
      this.$refs.serch.searchObj = "";
      this.listQuery.account_search = "";
      this.refreshData();
    },
    // 请求表格数据
    async getList() {
      if (!this.postURL) {
        return;
      }
      this.listQuery.page =
        this.listQuery.page == -1 ? -1 : this.currentPage - 1;
      this.listLoading = true;
      let data = await api[this.postURL]({
        ...this.listQuerys,
        ...this.listQuery,
      });
      this.tableData = data.result;
      this.tableData.forEach((data, idx) => {
        const list = data.file_list.map((data) => {
          return data.url;
        });
        this.$set(this.tableData[idx], "urlList", list);
      });
      this.totalcount = data.total_count;
      this.listLoading = false;
      document.getElementsByClassName("el-table__body-wrapper")[0]
        ? (document.getElementsByClassName(
            "el-table__body-wrapper"
          )[0].scrollTop = 0)
        : (document.getElementsByClassName(
            "el-scrollbar__wrap"
          )[0].scrollTop = 0);

      // 避免表格合计不显示的问题
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout();
      });
    },
    async QueryStaffAccountThreeStat() {
      let data = await api.QueryStaffAccountThreeStat({
        organ_node: this.listQuery.organ_node,
      });
      this.statistics = data.result[0];
    },
    // 切换是否关联字节点
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      // 查询三类人员统计
      this.QueryStaffAccountThreeStat();
      this.refreshData();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.account_name = val;
      this.refreshData();
    },
  },
};
</script>

<style lang="scss" scoped>
.capture-img {
  margin-right: 5px;
  height: 50px;
}
</style>
