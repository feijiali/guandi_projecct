<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'变更更新明细'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">变更类型：</label>
            <el-select
              v-model="listQuery.parameter_info_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="已上报已批复" :value="3"></el-option>
              <el-option label="已上报未批复" :value="2"></el-option>
              <el-option label="未上报" :value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['ChangeParameterParameterInfo-export']"
            class="ml-2"
            :btnText="'批量导出'"
            @buttonClick="
              handleExportFromSelected(
                'ExportChangeParameterParameterInfo',
                'parameter_info_id',
                tableSelectList.length ? {} : listQuery,
                '变更更新明细表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ChangeParameterParameterInfo-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_update_updateHandle',
                {
                  id: parameter_id,
                }
              )
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
        height="calc(100% - 85px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="更新日期"
          prop="parameter_info_time"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.parameter_info_time.split(" ")[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="变更名称"
          align="center"
          prop="parameter_info_name"
        >
        </el-table-column>
        <el-table-column
          label="变更类型"
          align="center"
          prop="parameter_info_type"
        >
          <template slot-scope="scope">
            {{
              ["未上报", "已上报未批复", "已上报已批复"][
                scope.row.parameter_info_type - 1
              ]
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="承包人批复金额（元）"
          prop="parameter_info_contractor_money"
        ></el-table-column>
        <el-table-column
          align="center"
          label="监理批复金额（元）"
          prop="parameter_info_supervisor_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="业主批复金额（元）"
          prop="parameter_info_owner_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="上级单位批复金额（元）"
          prop="parameter_info_superior_money"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="设计批复金额（元）"
          prop="parameter_info_design_money"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i
              v-permission="['ChangeParameterParameterInfo-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'parameter_info_id',
                  'DelChangeParameterParameterInfo'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2"
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
      postURL: "QueryChangeParameterParameterInfoList",
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: "",
        end_time: "",
        parameter_info_type: 0,
        parameter_info_parameter_id_un:
          this.$route.query.id &&
          parseInt(this.Base64.decode(this.$route.query.id)),
      },
      dateRange: [], //日期
      keyID: "parameter_info_id",
      parameter_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //变更台账列表id
    };
  },
  methods: {
    rowclick(row) {
      this.$router.linkTo(
        "enterprise_engineering_changeStanding_list_update_updateInfo",
        {
          parameter_info_id: row.parameter_info_id,
        }
      );
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.parameter_info_start_time = this.dateRange[0];
        this.listQuery.parameter_info_end_time = this.dateRange[1];
      } else {
        this.listQuery.parameter_info_start_time = "";
        this.listQuery.parameter_info_end_time = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }

  .label-l {
    width: 110px;
  }
}
.grey-button {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 0 50px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  color: #fff;
  background: #d9dadc;
}
</style>
