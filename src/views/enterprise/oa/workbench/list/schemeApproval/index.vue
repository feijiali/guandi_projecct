<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'方案审批'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block ml-2">
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
            <span class="grey2">项目类型：</span>
            <el-select
              v-model="listQuery.scheme_project_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                :label="item.scheme_project_type"
                :value="item.scheme_project_type"
                v-for="(item, index) in projectType"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">方案类型：</span>
            <el-select
              v-model="listQuery.scheme_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                :label="item"
                :value="index + 1"
                v-for="(item, index) in schemeType"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">审批状态：</span>
            <el-select
              v-model="listQuery.revise_info_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正在审批" :value="2"></el-option>
              <el-option label="已通过" :value="3"></el-option>
              <el-option label="未通过" :value="4"></el-option>
              <el-option label="已撤销" :value="5"></el-option>
            </el-select>
          </div>
          <!-- <div class="d-inline-block ml-2">
            <n-search
              ref="serch"
              :isInput="true"
              :placeholder="'请输入关键字搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div> -->
        </div>
        <div>
          <n-button
            v-permission="['OAScheme-upload']"
            :btnText="'草稿箱'"
            class="mr-2"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_draft', {
                name: 'OAScheme',
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OAScheme-delete']"
            :btnText="'批量删除'"
            @buttonClick="deleteFun(true, '', 'scheme_id', 'DelOAScheme')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OAScheme-export']"
            class="ml-2"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'ExportOAScheme',
                'scheme_id',
                tableSelectList.length ? {} : listQuery,
                '方案审请表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['OAScheme-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_apply', {
                t: $route.query.t,
              })
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 80px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="所属机构" prop="organ_area"></el-table-column>
        <el-table-column
          label="项目总工"
          prop="scheme_project_account_name"
        ></el-table-column>
        <el-table-column
          label="项目类型"
          prop="scheme_project_type"
        ></el-table-column>
        <el-table-column label="方案类型" prop="scheme_type">
          <template slot-scope="scope">
            {{ schemeType[scope.row.scheme_type - 1] }}
          </template>
        </el-table-column>
        <el-table-column label="方案名称" prop="scheme_name"></el-table-column>
        <!-- <el-table-column label="项目部" prop="organ"></el-table-column> -->
        <el-table-column
          label="提交时间"
          prop="scheme_create_time"
        ></el-table-column>
        <el-table-column label="审批状态" prop="revise_info_state">
          <template slot-scope="scope">
            <span
              class="status-btn"
              :style="{
                backgroundColor:
                  GLOBAL.backgroundColorArr[scope.row.revise_info_state],
                color: GLOBAL.colorArr[scope.row.revise_info_state],
              }"
              >{{ GLOBAL.reviseStateArr[scope.row.revise_info_state] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" width="80">
          <template slot-scope="scope">
            <i
              v-permission="['OAScheme-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'scheme_id', 'DelOAScheme')
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
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryOASchemeList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        revise_info_sub_account_id_union: 0,
        scheme_project_type: "", //项目类型
        scheme_type: 0, //方案类型
      },
      projectType: [], //项目类型
      schemeType: ["全线", "一般", "重大"],
      keyID: "scheme_id",
      getListBool: false,
    };
  },
  activated() {
    if (hasPermissionArr(["OAScheme-query"])) {
      //如果勾选查看权限，则能看所有的
      this.listQuery.revise_info_sub_account_id_union = 0; //如果没有勾选权限，则只能查看自己的
    } else {
      //如果没有勾选权限，则只能查看自己的
      this.listQuery.revise_info_sub_account_id_union = Number(
        this.$store.getters.account_id
      );
    }
    this.getList();
    // 查询方案项目类型
    this.QueryOASchemeProjectType();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 查询项目类型
    async QueryOASchemeProjectType() {
      let { result } = await api.QueryOASchemeProjectType({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.projectType = result;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    // 点击详情跳转
    rowclick(row) {
      this.$router.linkTo("enterprise_oa_workbench_info", {
        t: 4,
        types: "OAScheme",
        id: row.revise_info_accessory_id,
      });
    },
    searchFun(val) {
      this.listQuery.organ_search = val;
      this.refreshData();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
