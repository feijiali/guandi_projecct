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
              v-if="proj_detail_main_type != 1"
              ref="serch"
              :isInput="true"
              :placeholder="'请输入子目号/子目名称搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div v-if="proj_detail_main_type != 1">
          <n-button
            class=""
            :btnText="'变更新增'"
            v-permission="['ProjDetailListProjDetailMain-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_handle',
                {
                  t: 6,
                  type: 4,
                  organ_node: parseInt($route.query.origin_node),
                  main_id: parseInt($route.query.proj_detail_main_ls_id),
                }
              )
            "
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'新增'"
            v-permission="['ProjDetailListProjDetailMain-upload']"
            @buttonClick="
              $router.linkTo('enterprise_engineering_projectList_addProject', {
                proj_detail_main_id_un: parseInt(
                  $route.query.proj_detail_main_ls_id
                ),
              })
            "
          >
          </n-button>
        </div>
      </div>
      <n-scroll>
        <el-table
          v-if="proj_detail_main_type == 1"
          :data="tableData"
          style="width: 100%"
          height="calc(100% - 110px)"
          :span-method="arraySpanMethod"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column prop="index" label="序号" align="center" width="80">
            <template slot-scope="scope">
              <label>{{
                (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
              }}</label>
            </template>
          </el-table-column>
          <el-table-column label="章次" align="left" prop="detail_main_ls_num">
          </el-table-column>
          <el-table-column
            label="科目名称"
            align="left"
            prop="detail_main_ls_name"
          ></el-table-column>
          <el-table-column
            label="金额"
            width="200"
            align="left"
            prop="detail_main_ls_money"
          ></el-table-column>
          <el-table-column label="操作" width="200" align="center"
            ><i
              v-permission="['ProjDetailListProjDetailMain-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'proj_detail_main_ls_id',
                  'DelProjDetailListProjDetailMainLs'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn table-trash-icon"
            ></i
          ></el-table-column>
        </el-table>
        <el-table
          v-if="proj_detail_main_type != 1"
          :data="tableData"
          class="cursor-p-table"
          style="width: 100%"
          height="calc(100% - 130px)"
        >
          <template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column prop="index" label="序号" align="center" width="80">
            <template slot-scope="scope">
              <label>{{
                (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
              }}</label>
            </template>
          </el-table-column>
          <el-table-column
            label="子目号"
            align="center"
            prop="detail_main_ls_num"
          >
          </el-table-column>
          <el-table-column
            label="子目名称"
            align="left"
            prop="detail_main_ls_name"
          ></el-table-column>
          <el-table-column
            label="单位"
            width="200"
            align="center"
            prop="detail_main_ls_unit"
          ></el-table-column>
          <el-table-column
            label="数量"
            width="200"
            align="center"
            prop="detail_main_ls_number"
          >
          <template slot-scope="scope">
              {{
                scope.row.detail_main_ls_number == "undefined"
                  ? ""
                  : scope.row.detail_main_ls_number
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="单价（元）"
            width="200"
            align="center"
            prop="detail_main_ls_price"
          >
            <template slot-scope="scope">
              {{
                scope.row.detail_main_ls_price == "undefined"
                  ? ""
                  : scope.row.detail_main_ls_price
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="合价（元）"
            width="200"
            align="center"
            prop="detail_main_ls_money"
          >
            <template slot-scope="scope">
              {{
                scope.row.detail_main_ls_money == "NaN" ||
                scope.row.detail_main_ls_money == "undefined"
                  ? ""
                  : scope.row.detail_main_ls_money
              }}
            </template></el-table-column
          >
          <el-table-column
            label="备注"
            width="200"
            align="center"
            prop="detail_main_ls_text"
          ></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <span
                class="attendance-btn"
                v-permission="['ProjDetailListProjDetailMain-update']"
                @click.stop="
                  $router.linkTo(
                    'enterprise_engineering_projectList_addProject',
                    {
                      proj_detail_main_ls_id: scope.row.proj_detail_main_ls_id,
                    }
                  )
                "
                >编辑</span
              >
              <span
                class="attendance-btn ml-2"
                v-permission="['ProjDetailListProjDetailMain-upload']"
                @click.stop="
                  $router.linkTo(
                    'enterprise_engineering_projectList_addProject',
                    {
                      proj_detail_main_ls_id: scope.row.proj_detail_main_ls_id,
                      type: 1,
                    }
                  )
                "
                >添加</span
              >
              <span
                class="attendance-btn ml-2"
                v-permission="['ProjDetailListProjDetailMain-delete']"
                @click.stop="
                  deleteFun(
                    false,
                    scope.row,
                    'proj_detail_main_ls_id',
                    'DelProjDetailListProjDetailMainLs'
                  )
                "
                >删除</span
              >
            </template></el-table-column
          >
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
      postURL: "QueryProjDetailListProjDetailMainLsList", //表格请求接口
      tableData: [],
      listQuery: {
        page: 0,
        page_size: 20,
        proj_detail_main_id_un: parseInt(
          this.$route.query.proj_detail_main_ls_id
        ),
      },
      title: "",
      proj_detail_main_type: parseInt(this.$route.query.proj_detail_main_type),
    };
  },
  async created() {
    this.title = "工程量清单汇总表";
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.detail_main_ls_num == row.detail_main_ls_name) {
        if (columnIndex === 1) {
          return [1, 2];
        } else if (columnIndex === 2) {
          return [0, 0];
        } else {
          return [1, 1];
        }
      }
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.search_key = val;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.attendance-btn {
  font-size: 14px;
  color: #4f44f1;
}
</style>
