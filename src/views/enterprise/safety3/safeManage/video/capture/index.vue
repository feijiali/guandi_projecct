<template>
  <div class="w-100 h-100">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'智能抓拍详情'" />
    </div>
    <div style="height: calc(100% - 80px)" class="rounded-1 bg-white">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <div class="d-inline-block">
              <span class="grey2">工程项目：</span>
              <el-select
                v-model="listQuery.organ_node"
                @change="change"
                placeholder="请选择"
              >
                <el-option
                  label="全部"
                  v-if="!isShow"
                  :value="this.$organ_id_en_or_pro(this)"
                ></el-option>
                <el-option
                  v-for="item in projectListSelect"
                  :key="item.organ_id"
                  :label="item.organ"
                  :value="item.organ_id"
                ></el-option>
              </el-select>
            </div>
            <div class="d-inline-block ml-2">
              <span class="grey2">所属位置：</span>
              <el-select
                v-model="listQuery.organ_id_union"
                placeholder="请选择"
                @change="refreshData"
              >
                <el-option label="全部" :value="0"></el-option>
                <el-option
                  v-for="item in organArr"
                  :key="item.organ_id"
                  :label="item.organ"
                  :value="item.organ_id"
                >
                </el-option>
              </el-select>
            </div>
            <span class="grey2 ml-2">日期：</span>
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
            <span class="grey2">违章类型：</span>
            <el-select
              v-model="listQuery.snapshot_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="安全帽" :value="1"></el-option>
              <el-option label="手机" :value="2"></el-option>
              <el-option label="抽烟" :value="3"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-if="isShow"
            class="ml-1"
            :btnText="'批量删除'"
            v-permission="['SafeSmartCapture-delete']"
            @buttonClick="
              deleteFun(true, '', 'smart_capture_id', 'delSafeSmartCapture')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 80px)"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          type="selection"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="违章截图" align="center" header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic_url" alt="" class="capture-img" />
          </template>
        </el-table-column>
        <el-table-column label="抓拍类型" align="center">
          <template slot-scope="scope">
            <span>{{ snapshotTypeArr[scope.row.snapshot_type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="抓拍时间"
          prop="snapshot_time"
          align="center"
        ></el-table-column>
        <el-table-column
          label="内容"
          prop="snapshot_content"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" v-if="isShow" width="80">
          <template slot-scope="scope">
            <i
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'smart_capture_id',
                  'delSafeSmartCapture'
                )
              "
              v-permission="['SafeSmartCapture-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn"
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
      postURL: "querySafeSnapshotList", //表格请求接口
      dateRange: [
        this.$utils.fun_date(-30),
        this.$utils.getCurrentTime("", "", "day"),
      ], //日期范围
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: Number(this.$utils.fun_date(-30).replace(/-/g, "")),
        end_time: Number(
          this.$utils.getCurrentTime("", "", "day").replace(/-/g, "")
        ),
        snapshot_types: "1,2,3",
        organ_node: this.$organ_id_en_or_pro(this),
        organ_id_union: 0,
      },
      organArr: [], //所属位置
      infoData: {},
      snapshotTypeArr: ["", "安全帽", "手机", "抽烟", "周界"],
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {
    // 查询所属位置
    this.queryYsyVideoOrgan();
  },
  methods: {
    change(val) {
      this.listQuery.organ_node = val;
      this.queryYsyVideoOrgan();
      this.listQuery.organ_id_union = 0,
      this.currentPage = 1;
      this.getList();
    },
    async queryYsyVideoOrgan() {
      let data = await api.queryYsyVideoOrgan({
        organ_node: this.listQuery.organ_node,
      });
      this.organArr = data.result;
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange
        ? Number(this.dateRange[0].replace(/-/g, ""))
        : null;
      this.listQuery.end_time = this.dateRange
        ? Number(this.dateRange[1].replace(/-/g, ""))
        : null;
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.capture-img {
  width: 100px;
  height: 50px;
}

.status-btn {
  color: white;
  display: inline-block;
  background-color: #ffbf71;
  border-radius: 5px;
}

.status-color {
  color: #ffbf71;
}

.line {
  display: block;
  height: 1px;
  border-top: 1px dashed $color-1;
  margin: 20px 0;
}

.ticket-dialog .el-dialog {
  min-width: 420px;
  height: 78%;
  background-color: transparent;
  box-shadow: none;
  padding: 20px;
  background-image: url("../../../../../../assets/images/bg_sefe_violation.png");
  border-radius: 0;
  background-size: contain;

  .el-dialog__header {
    display: none;
  }

  .ticket-img {
    max-height: 200px;
  }

  .amount-box {
    width: 300px;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;

    .amount-input {
      width: 100px;
      height: 35px;
    }

    .unit {
      right: 15px;
    }
  }
}
</style>
