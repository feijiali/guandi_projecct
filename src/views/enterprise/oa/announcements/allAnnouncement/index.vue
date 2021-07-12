<template>
  <div class="container-all">
    <div class="container-div" style="margin: 0">
      <div class="d-flex align-items-center p-2">
        <div class="justify-content-start d-inline-flex align-items-center">
          <ul class="sub-nav-ul">
            <li
              v-for="(item, index) of 3"
              @click="handelSwitchChange(index)"
              :key="index"
              class="sub-nav-li-item"
              :class="[activeIn == index ? 'active' : '']"
            >
              {{ navs[index] }}
            </li>
          </ul>
        </div>
        <div class="d-inline-block ml-2">
          <n-search
            ref="serch"
            :isInput="true"
            :placeholder="'请输入标题搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
      </div>
      <el-table
        class="cursor-p-table flex-fill"
        :data="tableData"
        height="calc(100% - 80px)"
        @row-click="rowLinkTo"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="oa_public_title"></el-table-column>
        <el-table-column
          label="公告类别"
          prop="oa_public_type"
        ></el-table-column>
        <el-table-column label="公告状态" prop="oa_public_stat">
          <template slot-scope="scope">
            <span :class="scope.row.oa_public_stat == 2 ? 'red' : ''">{{
              scope.row.oa_public_stat == 2 ? "未读" : "已读"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已读人数"
          prop="oa_public_read_count"
        ></el-table-column>
        <el-table-column label="发布人" prop="account_name"></el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{
              (scope.row.oa_public_time + "").slice(0, 4) +
              "-" +
              (scope.row.oa_public_time + "").slice(4, 6) +
              "-" +
              (scope.row.oa_public_time + "").slice(6) +
              " " +
              scope.row.oa_public_hour_str.slice(0, 2) +
              ":" +
              scope.row.oa_public_hour_str.slice(2, 4) +
              ":" +
              scope.row.oa_public_hour_str.slice(4)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="material_unit">
          <template slot-scope="scope">
            <i @click.stop="seeFun(scope.row)" class="el-icon-view mr-2"></i>
            <i
              v-permission="['OaPublic-update']"
              @click.stop="
                linkTo('enterprise_oa_newAnnouncement', {
                  id: scope.row.oa_public_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['OaPublic-delete']"
              @click.stop="delFun(scope.row)"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
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
import upload from "@/mixins/upload";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      postURL: "queryOaOaPublicList", //表格请求接口
      activeIn: 0,
      navs: ["全部", "未读", "已读"],
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        search_type: 1,
      },
    };
  },
  //第一次进入时触发
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      if (to.query.type == "所有公告") {
        vm.listQuery.oa_public_type = "";
        await vm.getList();
      } else {
        vm.listQuery.oa_public_type = to.query.type;
        await vm.getList();
      }
      vm.getReadCount();
    });
  },
  //同一路由跳转触发
  watch: {
    async $route(to, from) {
      if (to.query.type == "所有公告") {
        this.listQuery.oa_public_type = "";
        await this.getList();
      } else {
        this.listQuery.oa_public_type = to.query.type;
        await this.getList();
      }
      this.getReadCount();
    },
  },
  methods: {
    //获取已读、未读、全部的人数
    async getReadCount() {
      let data = await api.queryOaOaPublicList({
        //列表查询参数
        page: 0,
        page_size: 20,
        search_type: 1,
        oa_public_type: this.listQuery.oa_public_type,
      });
      let info = data.result;
      let allRead = info.length,
        notRead = 0,
        read = 0;
      info.forEach((item) => {
        if (item.oa_public_stat == 2) {
          notRead += 1;
        } else {
          read += 1;
        }
      });
      this.navs = [
        "全部（" + allRead + "）",
        "未读（" + notRead + "）",
        "已读（" + read + "）",
      ];
    },
    //删除
    delFun(row) {
      this.confirm().then(async () => {
        this.deleData.oa_public_id = row.oa_public_id;
        await this.sureDelete("delOaOaPublic", () => {}, this.selectionArr);
        this.getReadCount();
        this.$bus.$emit("refresh", "");
      });
    },
    // 切换 全部 已读 未读
    handelSwitchChange(ind) {
      this.activeIn = ind;
      this.listQuery.search_type = ind + 1;
      this.getList();
    },
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.search_key = val;
      this.refreshData();
    },
    // 点击跳转公告详情
    rowLinkTo(row) {
      this.$router.linkTo("enterprise_oa_announcementDetails", {
        id: row.oa_public_id,
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 点击确认
    seeFun(row) {
      this.confirm(
        "",
        "",
        `${
          (row.oa_public_hide == 1 ? "隐藏" : "显示") +
          "后，该公告将" +
          (row.oa_public_hide == 1 ? "不" : "") +
          "显示在工作台"
        }`,
        `${"确认" + (row.oa_public_hide == 1 ? "隐藏?" : "显示?")}`
      )
        .then(() => {
          let subData = this.$utils.cloneObj(row);
          subData.update_type = row.oa_public_hide == 1 ? 2 : 1;
          subData.oa_public_hide = row.oa_public_hide == 1 ? 2 : 1;
          api.updateOaOaPublic(subData).then(() => {
            this.getList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.notice:hover {
  background: $color-2;
  color: #3377ff;
}
.btn {
  display: inline-block;
  border-radius: 25px;
  border: 1px solid;
  color: white;
  height: 40px;
  cursor: pointer;
}
.orange-btn {
  background-color: $orange;
}
</style>
