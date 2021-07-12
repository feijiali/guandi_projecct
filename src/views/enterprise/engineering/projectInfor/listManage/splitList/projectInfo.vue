<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <n-search
              ref="serch"
              :isInput="true"
              :placeholder="'请输入子目号/子目名称搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
      </div>
      <n-scroll>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100% - 130px)"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <label>{{
                (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
              }}</label>
            </template>
          </el-table-column>
          <el-table-column
            label="子目号"
            align="center"          
            prop="split_ls_num"
          ></el-table-column>
          <el-table-column
            label="子目名称"
            align="left"
            prop="split_ls_name"
          ></el-table-column>
          <el-table-column label="单位" align="center" prop="split_ls_unit"></el-table-column>
          <el-table-column label="数量" align="center" prop="split_ls_number">
            <template slot-scope="scope">
              {{
                scope.row.split_ls_number == "undefined"
                  ? ""
                  : scope.row.split_ls_number
              }}
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" align="center" prop="split_ls_price">
            <template slot-scope="scope">
              {{
                scope.row.split_ls_price == "undefined"
                  ? ""
                  : scope.row.split_ls_price
              }}
            </template>
          </el-table-column>
          <el-table-column label="合价(元)" align="center" prop="split_ls_money">
            <template slot-scope="scope">
              {{
                scope.row.split_ls_money == "undefined"
                  ? ""
                  : scope.row.split_ls_money
              }}
            </template>
          </el-table-column>
          <el-table-column
          width="200"
            label="扣除管理费及交公司利润等，按0.091下浮后合价"
            align="center"
            prop="split_ls_sum"
          >
          <template slot-scope="scope">
              {{
                scope.row.split_ls_sum == "undefined"
                  ? ""
                  : scope.row.split_ls_sum
              }}
            </template>
          </el-table-column>
          <el-table-column label="劳务费" align="center">
            <el-table-column label="人工费" align="center" prop="split_ls_person">
              <template slot-scope="scope">
              {{
                scope.row.split_ls_person == "undefined"
                  ? ""
                  : scope.row.split_ls_person
              }}
            </template>
            </el-table-column>
            <el-table-column
              label="初定分包合同价"
              align="center"
              prop="split_ls_contract1"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_contract1 == "undefined"
                  ? ""
                  : scope.row.split_ls_contract1
              }}
            </template></el-table-column>
            <el-table-column
              label="人工费合计"
              align="center"
              prop="split_ls_person_total"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_person_total == "undefined"
                  ? ""
                  : scope.row.split_ls_person_total
              }}
            </template></el-table-column>
          </el-table-column>
          <el-table-column label="材料费" align="center">
            <el-table-column label="材料费" align="center" prop="split_ls_material">
              <template slot-scope="scope">
              {{
                scope.row.split_ls_material == "undefined"
                  ? ""
                  : scope.row.split_ls_material
              }}
            </template>
            </el-table-column>
            <el-table-column
              label="初定分包合同价"
              align="center"
              prop="split_ls_contract2"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_contract2 == "undefined"
                  ? ""
                  : scope.row.split_ls_contract2
              }}
            </template></el-table-column>
            <el-table-column
              label="材料费合计"
              align="center"
              prop="split_ls_material_total"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_material_total == "undefined"
                  ? ""
                  : scope.row.split_ls_material_total
              }}
            </template></el-table-column>
          </el-table-column>
          <el-table-column label="机械费" align="center">
            <el-table-column label="机械费" align="center" prop="split_ls_match">
              <template slot-scope="scope">
              {{
                scope.row.split_ls_match == "undefined"
                  ? ""
                  : scope.row.split_ls_match
              }}
            </template>
            </el-table-column>
            <el-table-column
              label="初定分包合同价"
              align="center"
              prop="split_ls_contract3"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_contract3 == "undefined"
                  ? ""
                  : scope.row.split_ls_contract3
              }}
            </template></el-table-column>
            <el-table-column
              label="机械费合计"
              align="center"
              prop="split_ls_match_total"
            >
            <template slot-scope="scope">
              {{
                scope.row.split_ls_match_total == "undefined"
                  ? ""
                  : scope.row.split_ls_match_total
              }}
            </template></el-table-column>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
            <i
              @click.stop="$router.linkTo('enterprise_engineering_splitList_edit', {proj_detail_split_id:scope.row.proj_detail_split_id_un})"
              v-permission="['ProjDetailListProjDetailSplit-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['ProjDetailListProjDetailSplit-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'proj_detail_split_ls_id', 'DelProjDetailListProjDetailSplitLs')
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
            ></i>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="text-right bg-secondary"
          layout="prev, pager, next"
          :page-size="listQuery.page_size"
          @current-change="getList"
          :current-page.sync="currentPage"
          :total="totalcount"
        ></el-pagination>
      </n-scroll>
    </div>
  </div>
</template>
</template>

<script>
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";

export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryProjDetailListProjDetailSplitLsList", //表格请求接口
      tableData: [],
      listQuery: {
        page: 0,
        page_size: 20,
        proj_detail_split_id_un: parseInt(this.$route.query.proj_detail_split_id),
      },
      title: "",
    };
  },
  async created() {
    this.title = "拆分清单汇总表";
  },
  methods: {
    // 搜索关键词
    searchFun(val) {
      this.listQuery.search_key = val;
      this.currentPage = 1;
      this.getList();
    },
    changedate(val) {
      this.listQuery.cost_info_date = val;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
// 拾取经纬度
.lnglat-dialog {
  .lonlat-text {
    min-width: 140px;
    height: 40px;
  }
  .v-map {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    position: relative;
    #lnglat {
      min-height: 500px;
    }
    .map-box {
      bottom: 20px;
      right: calc(50% - 80px);
      z-index: 999;
      .map-text {
        width: 190px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .ant-modal-body {
    padding-right: 0;
    padding-left: 0;
  }
}
.v-map {
  width: 100%;
  height: 400px;
}
</style>
