<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" :id="editId" />
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">制度来源：</span>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">日期：</span>
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
            <n-search
              title="请输入制度主题/制度概要关键词搜索"
              ref="serch"
              :isInput="true"
              class="search-box-des"
              :placeholder="'请输入制度主题/制度概要关键词搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="制度来源"
          width="220"
          :show-overflow-tooltip="true"
          prop="organ_area"
        ></el-table-column>
        <el-table-column
          label="制度主题"
          width="220"
          :show-overflow-tooltip="true"
          prop="system_release"
        ></el-table-column>
        <el-table-column
          label="制度类型"
          prop="system_release_type"
        ></el-table-column>
        <el-table-column
          label="已浏览人员（人）"
          prop="system_release_count"
        ></el-table-column>
        <el-table-column label="发布人员" prop="account_name"></el-table-column>
        <el-table-column
          label="发布日期"
          prop="system_release_time"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['OASystemRelease-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'system_release_id',
                  'delOASystemRelease'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn"
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
import Detail from "../components/Detail";
import confirm from "@/mixins/confirm";
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryOASystemRelease", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        search: "",
        system_release_comment_query_type: 1,
      },
      dateRange: [],
      infoData: {},
      editId: 0,
      treeData: this.$store.getters.organTreeData,
      getListBool: false,
    };
  },
  computed: {
    // treeData() {
    //   return this.$store.getters.organTreeData;
    // }
  },
  activated() {
    this.getTreeData();
  },
  methods: {
    // 获取组织架构
    async getTreeData() {
      let data = await api.queryOrganAccountCountTree({});
      this.treeData = data.result;
      this.listQuery.organ_node = this.treeData[0].tag;
      this.getList();
    },
    rowclick(row) {
      this.queryOASystemRelease(row.system_release_id);
      this.editId = row.system_release_id;
    },
    isDownLoadFun() {
      let arr = this.infoData.system_release_account_ids.split(",");
      arr.indexOf(this.$store.getters.account_id) == -1
        ? (this.$refs.detailDialog.isDownLoad = false)
        : (this.$refs.detailDialog.isDownLoad = true);
    },
    async queryOASystemRelease(id) {
      let res = await api.queryOASystemRelease({ system_release_id: id });
      this.infoData = res.result[0];
      this.isDownLoadFun();
      this.$refs.detailDialog.show();
      this.refreshData();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
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
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-select-box .search-box-des {
  ::v-deep .el-input {
    width: 300px !important;
  }
}
</style>
