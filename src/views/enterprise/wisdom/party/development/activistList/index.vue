<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData"></Detail>
    <FileAdd ref="fileAddDialog"></FileAdd>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title + '列表'" />
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
              v-model="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">确认状态：</label>
            <el-select
              v-model="listQuery.pd_states"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="待确认" :value="2"></el-option>
              <el-option label="已确认" :value="4"></el-option>
              <el-option label="已取消" :value="3"></el-option>
            </el-select>
          </div>
          <n-search
            class="d-inline-block ml-2"
            :isInput="true"
            :placeholder="'请输入所属机构搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['UnionPartyPersonnelDevelop-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'personnel_develop_id',
                'delUnionPartyPersonnelDevelop'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartyPersonnelDevelop-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportUnionPartyPersonnelDevelop',
                listQuery,
                '入党积极分子表'
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
        :data="tableData"
        ref="table"
        class="cursor-p-table"
        style="width: 100%"
        height="calc(100% - 150px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope" width="80">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="所属机构"
          prop="organ_area_name"
        ></el-table-column>
        <el-table-column label="申请名称" prop="pd_title"></el-table-column>
        <el-table-column label="申请人" prop="account_name"></el-table-column>
        <el-table-column
          label="确认人"
          prop="activists_account_name"
        ></el-table-column>
        <el-table-column
          label="确认时间"
          prop="pd_activists_time"
          width="180"
        ></el-table-column>
        <el-table-column label="确认状态">
          <template slot-scope="scope">
            <div @click.stop class="ml-2 d-inline-block">
              <nStatusButton
                v-permission="['UnionPartyPersonnelDevelop-positive']"
                @buttonClick="
                  scope.row.pd_states == 2 &&
                    linkTo(
                      'enterprise_wisdom_party_development_activistList_handle',
                      { id: scope.row.personnel_develop_id }
                    )
                "
                :changeColor="'#fd5571'"
                :btnText="pdStateArr[scope.row.pd_states]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <i
              v-if="scope.row.pd_states == 3"
              v-permission="['UnionPartyPersonnelDevelop-positive']"
              @click.stop="
                linkTo(
                  'enterprise_wisdom_party_development_activistList_handle',
                  { id: scope.row.personnel_develop_id }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <div @click.stop class="ml-2 d-inline-block">
              <nStatusButton
                v-permission="['UnionPartyPersonnelDevelop-positive']"
                v-if="scope.row.pd_states == 4"
                @buttonClick="addFile(scope.row)"
                :changeColor="'#fd5571'"
                :btnText="'补充资料'"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="totalcount > 0"
        background
        class="text-right mt-1 mr-1"
        layout="prev, pager, next"
        :page-size="listQuery.page_size"
        @current-change="getList"
        :current-page.sync="currentPage"
        :total="totalcount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import Detail from "./components/Detail";
import FileAdd from "./components/FileAdd";

import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  components: {
    Detail,
    FileAdd,
  },
  mixins: [table, confirm, upload],
  data() {
    return {
      colorArr: [
        "",
        "orange",
        "orange",
        "main",
        "pink2",
        "orange",
        "main",
        "orange",
        "main",
        "pink2",
        "orange",
      ],
      pdStateArr: [
        "",
        "申请中",
        "待确认",
        "非积极分子",
        "积极分子",
        "资料未补全",
        "资料已补全",
        "待确认",
        "非正式党员",
        "正式党员",
        "已转正",
      ],
      postURL: "queryUnionPartyPersonnelDevelopList", //表格请求接口
      title: "",
      listQuery: {
        page: 0,
        page_size: 20,
        end_time: "",
        pd_states: 0, //确认状态
        organ_search: "",
        pd_states_start: this.$route.query.range
          ? this.$route.query.range.split(",").map(Number)[0]
          : null,
        pd_states_end: this.$route.query.range
          ? this.$route.query.range.split(",").map(Number)[1]
          : null,
        organ_node: this.$route.query.organ_id
          ? parseInt(this.$route.query.organ_id)
          : this.$organ_id_en_or_pro(this),
      },
      title: ["", "个人申请", "入党积极分子", "预备党员", "正式党员"][
        parseInt(this.$route.query.type)
      ],
      //详情
      infoData: { file_list: [], pic_list: [] },
      ruleform: {},
      getListBool: false,
    };
  },
  activated() {
    this.listQuery.organ_node = this.$route.query.organ_id
      ? parseInt(this.$route.query.organ_id)
      : this.$organ_id_en_or_pro(this);
    this.getList();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 搜索关键词
    searchFun(val) {
      this.listQuery.organ_search = val;
      this.refreshData();
    },
    // 点击详情回填数据
    async rowclick(row) {
      await this.queryUnionPartyPersonnelDevelop(row);
    },
    async queryUnionPartyPersonnelDevelop(row) {
      let res = await api.queryUnionPartyPersonnelDevelop({
        personnel_develop_id: row.personnel_develop_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.refreshData();
    },
    linkTo(name, query) {
      if (!hasPermissionArr(["UnionPartyPersonnelDevelop-positive"])) {
        return;
      }
      this.$router.linkTo(name, query ? query : null);
    },
    // 点击补充资料
    async addFile(row) {
      this.$refs.fileAddDialog.addFile(row);
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-item {
  width: 50%;
  .detail-label {
    width: 80px;
  }
}
</style>
