<!--
 * @Autor: 邓易
 * @Date: 2021-03-03 10:24:51
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 11:46:40
-->
<template>
  <div class="bg-white w-100 h-100 rounded-1 p-1">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <ul class="sub-nav-ul nav-box">
          <li
            v-for="(item, index) of navs"
            @click="handelSwitchChange(index, item)"
            :key="index"
            class="sub-nav-li-item"
            :class="[activeIn == index ? 'active' : '']"
          >
            {{ item.name }}({{ item.num }})
          </li>
        </ul>
        <div class="d-inline-block ml-2">
          <n-search
            :isInput="true"
            :placeholder="'请输入主题搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
      </div>
      <div>
        <el-dropdown @command="changeState">
          <el-button size="small"
            >标记为<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="7">已读邮件</el-dropdown-item>
            <el-dropdown-item :command="6">未读邮件</el-dropdown-item>
            <el-dropdown-item :command="4">星标邮件</el-dropdown-item>
            <el-dropdown-item :command="5">取消星标</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <n-button
          class="ml-2"
          :btnText="'回复'"
          colorBtn="green"
          @buttonClick="handleAdd"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-icon_leftbar_notice mr-1"></i>
          </template>
        </n-button>
        <n-button
          class="ml-2"
          :btnText="'删除'"
          colorBtn="orange"
          @buttonClick="
            deleteFun(true, '', 'email_id', 'DelOaEmail', refresh, {
              del_type: 1,
            })
          "
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_list_trash mr-1"></i>
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
      ref="table"
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
      <el-table-column label="星标" width="100">
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
      </el-table-column>
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
        query_type: 1,
        page_size: 20,
      },
      tableData: [{}],
      activeIn: 0,
      navs: [
        { name: "全部", num: 0 },
        { name: "未读", num: 0 },
        { name: "已读", num: 0 },
      ],
    };
  },
  created() {
    this.tableSelectList = [];
    if (this.$route.meta.isProject) {
      this.navs.forEach((item) => {
        item.path = item.path.replace("enterprise", "project");
      });
    }
    this.QueryOaEmailReadStat();
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
          this.QueryOaEmailReadStat();
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
      this.linkTo("enterprise_oa_email_inbox_info", { id: row.email_id });
    },
    searchFun(val) {
      this.listQuery.email_title = val;
      this.refreshData();
    },
    refresh() {
      this.$bus.$emit("refresh_email", "");
    },
    handleAdd() {
      this.selectionArr = this.tableSelectList.flat();
      if (this.selectionArr.length == 1) {
        this.linkTo("enterprise_oa_email_inbox_reply", {
          id: this.selectionArr[0].email_id,
        });
      } else {
        this.$tip({
          isTip: true,
          message: `请勾选要回复的一项`,
        });
      }
    },
    //查询已读未读数量
    async QueryOaEmailReadStat() {
      let { result } = await api.QueryOaEmailReadStat();
      this.$set(this.navs, 0, { name: "全部", num: result[0].total });
      this.$set(this.navs, 1, { name: "已读", num: result[0].read });
      this.$set(this.navs, 2, { name: "未读", num: result[0].no_read });
    },
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      if (item.name.indexOf("已读") != -1) {
        this.listQuery.email_read = 2;
      } else if (item.name.indexOf("未读") != -1) {
        this.listQuery.email_read = 1;
      } else {
        this.listQuery.email_read = 0;
      }
      this.refreshData();
    },
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
