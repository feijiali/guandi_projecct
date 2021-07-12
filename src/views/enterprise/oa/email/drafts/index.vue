<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 14:00:12
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
        <!-- <el-dropdown @command="changeState">
          <el-button size="small"
            >标记为<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="4">星标邮件</el-dropdown-item>
            <el-dropdown-item :command="5">取消星标</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <n-button
          class="ml-2"
          :btnText="'删除草稿'"
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
      <!-- <el-table-column label="星标" width="100">
        <template slot-scope="{ row }">
          <i
            v-if="row.email_star == 0"
            class="iconfont btn-btn_save"
            @click.stop="changeStrt(4, row.email_id)"
          ></i>
          <i
            v-else
            class="iconfont btn-btn_save_pre text-warning"
            @click.stop="changeStrt(5, row.email_id)"
          ></i>
        </template>
      </el-table-column> -->
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
import api from "@/api";
import table from "@/mixins/table";
import start from "@/mixins/emailStart";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm, start],
  data() {
    return {
      postURL: "QueryOaEmailList",
      listQuery: {
        page: 0,
        query_type: 4,
        page_size: 20,
      },
      tableData: [{}],
    };
  },
  created() {
    this.tableSelectList = [];
    if (this.$route.meta.isProject) {
      this.navs.forEach((item) => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
  },
  methods: {
    changeState(del_type) {
      this.selectionArr = this.tableSelectList.flat();
      if (this.selectionArr.length > 0) {
        let email_ids = [];
        this.selectionArr.forEach((ele) => {
          email_ids.push(ele.email_id);
        });
        this.confirm("", "", "是否确认操作").then(async () => {
          this.tableSelectList = [];
          this.deleData.email_ids = email_ids.join(",");
          this.deleData.del_type = del_type;
          await api.DelOaEmail(this.deleData);
          this.refreshData();
          this.$bus.$emit("refresh_email", "");
        });
      } else {
        this.$tip({
          isTip: true,
          message: `请勾选要标记的项`,
        });
      }
    },
    rowclick(row) {
      this.linkTo("enterprise_oa_email_drafts_info", { id: row.email_id });
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
