<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 11:47:41
-->
<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-04 10:23:42
-->
<template>
  <div class="bg-white w-100 h-100 rounded-1 p-1">
    <div class="d-flex justify-content-between">
      <div>
        <n-search
          :isInput="true"
          :placeholder="'请输入主题搜索'"
          @searchFun="searchFun"
        ></n-search>
      </div>
      <div>
        <n-button
          :btnText="'还原'"
          colorBtn="green"
          @buttonClick="changeState()"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_refresh_02 mr-1"></i>
          </template>
        </n-button>
        <n-button
          class="ml-2"
          :btnText="'永久删除'"
          colorBtn="blue"
          @buttonClick="
            deleteFun(true, '', 'email_id', 'DelOaEmail', refresh, {
              del_type: 2,
            })
          "
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_list_trash mr-1"></i>
          </template>
        </n-button>
      </div>
    </div>
    <el-table
      class="cursor-p-table mt-1"
      :data="tableData"
      height="calc(100% - 100px)"
      @row-click="rowclick"
      @selection-change="handleSelectionChange"
      ><template slot="empty">
        <span>真是不巧，暂时没有数据呢~</span>
      </template>
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column prop="index" label="序号" width="80">
        <template slot-scope="scope">
          <label>{{
            (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
          }}</label>
        </template>
      </el-table-column>
      <el-table-column label="发件人" prop="account_name"></el-table-column>
      <el-table-column label="主题">
        <template slot-scope="{ row }">
          <i
            v-if="row.email_other_urgent"
            class="iconfont btn-icon_lightning text-hover-danger"
          ></i>
          <i
            v-if="row.email_other_necess"
            class="iconfont btn-icon_notice text-warning"
          ></i>
          <i
            v-if="row.email_other_reply"
            class="iconfont btn-icon_leftbar_notice text-success"
          ></i>
          <span>{{ row.email_title ? row.email_title : "无主题" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        prop="oa_email_time"
        width="200"
      ></el-table-column>
    </el-table>
    <el-pagination
      background
      class="text-right"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryOaEmailList",
      listQuery: {
        page: 0,
        query_type: 5,
        page_size: 20,
      },
      tableData: [{}],
    };
  },
  created() {
    if (this.$route.meta.isProject) {
      this.navs.forEach((item) => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
  },
  methods: {
    changeState() {
      this.selectionArr = this.tableSelectList.flat();
      if (this.selectionArr.length > 0) {
        let email_ids = [];
        this.selectionArr.forEach((ele) => {
          email_ids.push(ele.email_id);
        });
        this.confirm("", "", "是否确认还原").then(async () => {
          this.deleData.email_ids = email_ids.join(",");
          this.deleData.del_type = 3;
          await api.DelOaEmail(this.deleData);
          this.refreshData();
          this.$bus.$emit("refresh_email", "");
        });
      } else {
        this.$tip({
          isTip: true,
          message: `请勾选要还原的项`,
        });
      }
    },
    rowclick(row) {
      this.linkTo("enterprise_oa_email_dustbin_info", { id: row.email_id });
    },
    searchFun(val) {
      this.listQuery.email_title = val;
      this.refreshData();
    },
    refresh() {
      this.$bus.$emit("refresh_email", "");
    },
    handleAdd() {},
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-div-s {
  width: 100%;
  height: 100%;
}
</style>
