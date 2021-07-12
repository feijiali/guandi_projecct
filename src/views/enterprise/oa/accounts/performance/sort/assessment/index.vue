<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'延长时间'"
      :diaWidth="'25%'"
      :isForm="true"
    >
      <template slot="diaSlot">
        <n-scroll>
          <div class="px-1">
            <el-form ref="ruleform" class="el-form-box" :model="ruleform">
              <el-form-item class="form-item-long" label="选择延长到：">
                <el-date-picker
                  :clearable="false"
                  v-model="ruleform.basic_end_time"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :default-value="defaultTime"
                  :picker-options="pickerOptions"
                  placeholder="请选择"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <div class="d-flex justify-content-center">
              <n-button
                class="mt-5 ml-3"
                :btnText="'确认提交'"
                :width="'150px'"
                :colorBtn="'blue'"
                @buttonClick="submitFun"
              ></n-button>
            </div>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop title="绩效考核表" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">所属机构：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectValue="handleFilterChange"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">考核类型：</label>
            <el-select v-model="listQuery.basic_type" @change="basicTypeChange">
              <el-option :value="1" label="年度考核"></el-option>
              <el-option :value="2" label="季度考核"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">年份：</label>
            <el-date-picker
              v-model="listQuery.basic_year"
              type="year"
              value-format="yyyy"
              placeholder="选择年份"
              @change="changePage(1)"
            >
            </el-date-picker>
            <el-select
              class="ml-2"
              v-if="listQuery.basic_type == 2"
              v-model="listQuery.basic_quarter"
              @change="changePage(1)"
            >
              <el-option :value="1" label="第一季度"></el-option>
              <el-option :value="2" label="第二季度"></el-option>
              <el-option :value="3" label="第三季度"></el-option>
              <el-option :value="4" label="第四季度"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <!-- v-if="$store.getters.account_character_type > 10" -->
          <n-button
            v-permission="['PerformanceBasic-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_oa_account_performance_sort_assessment_handle'
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
        height="calc(100% - 80px)"
        @row-click="linkTo"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="考核类型" prop="project">
          <template slot-scope="scope">
            <label>{{
              ["", "年度考核", "季度考核"][scope.row.basic_type]
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="organ"></el-table-column>
        <el-table-column
          label="考核负责人"
          prop="performance_basic_principal"
        ></el-table-column>
        <el-table-column
          label="考核截至日期"
          prop="basic_end_time"
        ></el-table-column>
        <el-table-column
          label="考核人数（人）"
          prop="basic_total_num"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <div
              @click.stop
              class="d-inline-block"
              v-if="
                hasPermissionArr(['PerformanceBasic-delayTime']) ||
                scope.row.basic_principal_account_id_union ==
                  $store.getters.account_id
              "
            >
              <nStatusButton
                @buttonClick="delayFun(scope.row)"
                :changeColor="'#3377FF'"
                :btnText="'延长时间'"
              />
            </div> -->
            <i
              v-permission="['PerformanceBasic-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'basic_id', 'delPerformanceBasic')
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
import api from "@/api/enterprise/oa/account/performance";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import { hasPermissionArr } from "@/plugins/permission_tools";
import dayjs from "dayjs";

export default {
  mixins: [confirm, table],
  data() {
    return {
      postURL: "queryPerformanceBasicList",
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        basic_year: this.$utils.getCurrentTime("", "year"),
        basic_quarter: 1,
        basic_type: 1,
        page_size: 20,
        page: 0,
      },
      ruleform: { basic_id: 0, basic_end_time: "" }, //延长时间
      defaultTime: "", //延长时间默认时间
      pickerOptions: {},
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async activated() {
    let res = await api.queryPerformanceBasicList({
      organ_node: this.$organ_id_en_or_pro(this),
      page: 0,
      page_size: 1,
      order_by: 2,
    });
    let data = res.result;
    if (data.length) {
      this.listQuery.basic_type = data[0].basic_type;
      this.listQuery.basic_quarter = data[0].basic_quarter;
      this.listQuery.basic_year = data[0].basic_year;
    }
    this.refreshData();
  },
  async created() {
    let res = await api.queryPerformanceBasicList({
      organ_node: this.$organ_id_en_or_pro(this),
      page: 0,
      page_size: 1,
      order_by: 2,
    });
    let data = res.result;
    if (data.length) {
      this.listQuery.basic_type = data[0].basic_type;
      this.listQuery.basic_quarter = data[0].basic_quarter;
      this.listQuery.basic_year = data[0].basic_year;
    }
    this.refreshData();
  },
  methods: {
    hasPermissionArr,
    // 延长时间
    delayFun(item) {
      this.ruleform.basic_id = item.basic_id;
      this.ruleform.basic_end_time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.defaultTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.pickerOptions = {
        // 不能选择超过今天的时间
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      };
      this.$refs.dialog.show();
    },
    // 延长时间确认提交
    async submitFun() {
      if (!this.ruleform.basic_end_time) {
        this.$tip({
          isTip: true,
          message: "请选择延长时间",
        });
        return;
      }
      await api.updatePerformanceBasicTime(this.ruleform);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getList();
          this.$refs.dialog.cancel();
        },
      });
    },
    basicTypeChange() {
      this.listQuery.basic_quarter = this.listQuery.basic_type == 1 ? 0 : 1;
      this.refreshData();
    },
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.currentPage = 1;
      this.getList();
    },
    linkTo(row) {
      this.$router.linkTo(
        "enterprise_oa_account_performance_sort_assessment_info",
        { id: row.basic_id }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
