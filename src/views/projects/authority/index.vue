<template>
  <div class="container-all">
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
          <n-search
            ref="serch"
            class="ml-2 search-box"
            :isInput="true"
            :placeholder="'请输入关键字'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            :btnText="'新增'"
            @buttonClick="handleUpdate"
            v-permission="['Authority-upload']"
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
        style="width: 100%"
        height="calc(100% - 80px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="role"></el-table-column>
        <el-table-column
          label="创建时间"
          prop="role_submit_time"
        ></el-table-column>
        <el-table-column label="提交人" prop="account_name"></el-table-column>
        <el-table-column label="是否开启">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.role_staus"
              :active-value="1"
              :inactive-value="2"
              class="table-switch"
              v-permission="['Authority-update']"
              @change="stausChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['Authority-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['Authority-delete']"
              @click.stop="deleteFun(false, scope.row, 'role_id', 'delRole')"
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryRole",
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 20,
        role_type: 2,
        role_search: "",
      },
      tableData: [],
      currentPage: 1,
      deleData: {},
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getSelectValue(node) {
      this.listQuery.organ_node = node.node.organ_id;
      this.currentPage = 1;
      this.getList();
    },
    // 条件筛选
    handleFilter() {
      this.currentPage = 1;
      this.getList();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.role_search = val;
      this.handleFilter();
    },
    // 编辑
    handleUpdate(row) {
      if (row) {
        this.$router.linkTo("enterprise_authority_handle", {
          id: row.role_id,
        });
      } else {
        this.$router.linkTo("enterprise_authority_handle");
      }
    },
    stausChange(row) {
      let msg = "是否确认开启该角色";
      if (row.role_staus == 2) {
        msg = "是否关闭该角色";
      }
      this.confirm(null, null, msg)
        .then(() => {
          this.roleStausSubmit(row);
        })
        .catch(() => {
          if (row.role_staus == 2) {
            row.role_staus = 1;
          } else {
            row.role_staus = 2;
          }
        });
    },
    async roleStausSubmit(row) {
      await api.updateRoleStatus({
        role_id: row.role_id,
        role_staus: row.role_staus,
      });
      this.getList();
    },
  },
};
</script>
