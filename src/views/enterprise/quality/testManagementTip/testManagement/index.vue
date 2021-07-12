<template>
  <div class="container-all">
    <Detail
      v-if="infoData.quality_tech_confess_theme"
      ref="detailDialog"
      :infoData="infoData"
    />
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">选择时间：</span>
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
          <n-search
            class="d-inline-block ml-2"
            ref="serch"
            :isInput="true"
            :placeholder="'输入关键字'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'test_control_id', 'delQualityTestControl')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-1"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_quality_testManagementTip_testManagement_handle'
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
        ref="table"
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 100px)"
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
          label="文件名称"
          :show-overflow-tooltip="true"
          prop="test_control_file_name"
        ></el-table-column>
        <el-table-column
          label="上传时间"
          prop="test_control_upload_time"
        ></el-table-column>
        <el-table-column
          label="上传人"
          prop="sub_account_name"
        ></el-table-column>
        <el-table-column label="累计温度">
          <template slot-scope="scope">
            <span
              :class="
                scope.row.test_control_total_temperature >= 600 ? 'red' : ''
              "
              >{{
                scope.row.test_control_is_temperature == 1
                  ? scope.row.test_control_total_temperature + "℃"
                  : "--"
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="累计天数">
          <template slot-scope="scope">
            <span
              :class="
                scope.row.test_control_total_temperature >= 600 ? 'red' : ''
              "
              >{{
                scope.row.test_control_is_temperature == 1
                  ? scope.row.test_control_total_day + "天"
                  : "--"
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          :show-overflow-tooltip="true"
          prop="test_control_remark"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <i
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo(
                  'enterprise_quality_testManagementTip_testManagement_handle',
                  {
                    id: scope.row.quality_tech_confess_id,
                    test_control_is_temperature:
                      scope.row.test_control_is_temperature,
                  }
                )
              "
            ></i>
            <i
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'test_control_id',
                  'delQualityTestControl'
                )
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
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryQualityTestControlList",
      dateRange: [], //日期范围
      isShow: this.$route.meta.isProject,
      listQuery: {
        start_time: null,
        end_time: null,
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        quality_test_control_type: 1,
      }, //筛选条件
      infoData: {
        video_list: [],
        pic_list: [],
        file_list: [],
      }, //详情
    };
  },
  methods: {
    searchFun(val) {
      this.listQuery.search = val;
      this.getList();
    },
    rowclick(row) {
      this.infoData = row;
      this.$nextTick(() => {
        this.$refs.detailDialog.show();
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange
        ? Number(this.dateRange[0])
        : null;
      this.listQuery.end_time = this.dateRange
        ? Number(this.dateRange[1])
        : null;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
