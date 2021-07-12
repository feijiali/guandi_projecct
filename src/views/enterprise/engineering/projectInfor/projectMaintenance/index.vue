<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" />
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">项目状态：</label>
            <el-select
              v-model="listQuery.project_state"
              @change="changePage(1)"
            >
              <el-option
                v-for="(item, i) in state_list"
                :key="i"
                :value="i"
                :label="item"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="listQuery.project_classify"
              placeholder="请选择 "
              @change="changePage(1)"
            >
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="自营项目"></el-option>
              <el-option :value="2" label="合作项目"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">项目类别：</label>
            <el-select v-model="listQuery.project_type" @change="changePage(1)">
              <el-option :value="''" label="全部"></el-option>
              <el-option
                :value="item.project_type"
                :label="item.project_typ"
                v-for="(item, index) in projectTypeArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <n-search
              class="search-box"
              :isInput="true"
              :placeholder="'请输入关键词'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['ProjectInfoProject-upload']"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_engineering_projectMaintenance_handle')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'导出'"
            v-permission="['ProjectInfoProject-export']"
            @buttonClick="
              $utils.handleExport(
                'ExportProjectInfoProject',
                listQuery,
                '项目维护表'
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
        <!-- <el-table-column
          label="项目简称"
          prop="project_simple"
        ></el-table-column> -->
        <el-table-column label="项目名称" prop="project"></el-table-column>
        <el-table-column label="项目分类">
          <template slot-scope="scope">
            <label>{{
              ["", "自营项目", "合作项目"][scope.row.project_classify]
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="项目类型" prop="project_type">
        </el-table-column>
        <el-table-column label="隶属机构" prop="project_subordinate">
        </el-table-column>
        <el-table-column label="负责人" prop="project_principal">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <label>{{
              ["", "在建项目", "完工项目", "停工项目"][scope.row.project_state]
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="项目工期" min-width="90px">
          <template slot-scope="scope">
            <label>
              {{ scope.row.project_start }}
              <span v-if="scope.row.project_start && scope.row.project_end"
                >-</span
              >
              {{ scope.row.project_end }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="总造价（万元）">
          <template slot-scope="scope">
            <label class="pink2 fwb">{{
              scope.row.project_total_value | parseFormat
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" width="220">
          <template slot-scope="scope">
            <div @click.stop class="d-inline-block">
              <nStatusButton
                @buttonClick="infoFun(scope.row)"
                :changeColor="'#fd5571'"
                :btnText="'查看'"
              />
            </div>
            <i
              v-permission="['ProjectInfoProject-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_engineering_projectMaintenance_handle',
                  {
                    id: scope.row.project_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn ml-1"
            ></i>
            <i
              v-permission="['ProjectInfoProject-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'project_id',
                  'delProjectInfoProject',
                  () => {
                    deleteCallbackFun();
                  }
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
import Detail from "./components/Detail";

import { parseFormatNum } from "@/plugins/utils_parse";
export default {
  components: {
    Detail,
  },
  filters: {
    parseFormat(val) {
      return val ? parseFormatNum(val) : "";
    },
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryProjectInfoProject", //表格请求接口
      projectTypeArr: [],
      state_list: ["全部项目", "在建项目", "完工项目", "停工项目"],
      infoData: { pic_list: [], file_list: [] },
      listQuery: {
        project: "",
        project_state: 0,
        project_type: "",
        project_classify: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
      },
    };
  },
  mounted() {
    // 查询项目类型
    this.queryProjectInfoProjectType();
  },
  methods: {
    async queryProjectInfoProjectType() {
      let { result } = await api.queryProjectInfoProjectType({});
      this.projectTypeArr = result;
    },
    // 查看详情
    infoFun(row) {
      this.infoData = row;
      this.$refs.detailDialog.show();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.changePage(1);
    },
    // 删除后回调函数
    deleteCallbackFun() {
      this.queryProjectInfoProjectType();
    },
    // 点击行跳转项目级
    async rowclick(row) {
      await this.queryAccountProject(row);
      // this.$store.dispatch("app/set_project_id", row.project_id);
      // this.$store.dispatch("app/set_project_name", row.project_simple);
    },
    // 查询项目信息
    async queryAccountProject(item) {
      let data = await api.queryAccountProject({
        organ_id: item.organ_id_union,
      });
      // await this.$store.dispatch("user/GetPermissionList", {
      //   id: data.result[0] ? data.result[0].organ_id : "",
      // });
      if (data.result[0]) {
        // this.$store.dispatch("app/set_organid", data.result[0].organ_id);
        // this.$store.dispatch(
        //   "app/set_organ_rns_id",
        //   data.result[0].organ_rns_id
        // );
        // const news = this.$router.resolve({ name: "project_summary" });
        // let obj = window.open(news.href, "_blank");
        // obj.document.title = data.result[0].project;
        let code = this.Base64.encode(
          JSON.stringify({
            organ_id_union: item.organ_id_union,
            project_id: item.project_id,
            project_simple: item.project_simple,
            project_logo: item.project_logo_list[0]
              ? item.project_logo_list[0].url
              : "",
            project_classify: item.project_classify,
          })
        );
        const news = this.$router.resolve({
          name: "project_summary",
          query: {
            code,
          },
        });
        let obj = window.open(news.href, "_blank");
      } else {
        // 判断图片大小
        this.$tip({
          isTip: true,
          message: "该项目还未开通项目级管理平台权限！",
        });
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
