<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="考勤设置" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">打卡规则：</label>
            <el-radio-group
              @change="refreshData"
              v-model="listQuery.basic_type"
              class="vtt"
              style="vertical-align: text-top"
            >
              <el-radio :label="2">两次</el-radio>
              <el-radio :label="4">四次</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['StaffPunchBasic-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('enterprise_oa_accounts_attendance2_configureadd')
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
        <el-table-column label="班次名称" prop="basic_name"></el-table-column>
        <el-table-column
          label="班次次数(天/次)"
          prop="basic_type"
        ></el-table-column>
        <el-table-column label="所属机构及部门" prop="organ"></el-table-column>
        <el-table-column label="周末是否打卡" prop="basic_allow_weekend">
          <template slot-scope="scope">{{
            ["", "是", "否"][scope.row.basic_allow_weekend]
          }}</template>
        </el-table-column>
        <el-table-column label="提交人" prop="account_name"></el-table-column>
        <el-table-column
          label="提交时间"
          prop="basic_sub_time"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <i
              v-permission="['StaffPunchBasic-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_oa_accounts_attendance2_configureadd',
                  {
                    id: scope.row.basic_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['StaffPunchBasic-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'basic_id', 'delStaffPunchBasic')
              "
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
      postURL: "queryStaffPunchBasicList",
      title: "打卡设置",
      deleData: {},
      infoData: {},
      //筛选条件
      listQuery: {
        basic_type: 2,
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      defaultProps: {
        value: "tag",
        children: "leaves",
        label: "organ",
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      // 查询此部门考勤配置
      this.queryStaffPunchBasic(node.tag);
    },
    // 查询此部门考勤配置
    async queryStaffPunchBasic(data) {
      let res = await api.queryStaffPunchBasic({ organ_id: Number(data) });
      res.result[0] && (this.listQuery.basic_type = res.result[0].basic_type);
      this.refreshData();
    },
    // 点击详情回填数据
    async backfillEditData(row) {
      let res = await api.queryStaffPunchBasic({
        basic_id: row.basic_id,
      });
      this.infoData = res.result[0];
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    // 改变条件，重新获取列表
    changeListQuery(key, data) {
      this.$set(this.listQuery, key, data);
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
