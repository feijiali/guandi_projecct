<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" />
    <n-dialog
      ref="dialog"
      :diaTit="''"
      :diaWidth="'30%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <div>
          <div class="mt-2 add-title">是否获取最近一次填写的记录？</div>
          <div class="mt-2 add-button">
            <n-button
              :btnText="'是'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_quality_takecoverEngineering_handle',
                  {
                    type: 1,
                  }
                );
                $refs.dialog.cancel();
              "
            ></n-button>
            <n-button
              class="ml-5"
              :btnText="'否'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_quality_takecoverEngineering_handle',
                  {
                    type: 0,
                  }
                );
                $refs.dialog.cancel();
              "
            >
            </n-button>
          </div>
        </div>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block" v-if="!isShow">
            <label class="text-secondary">项目分类：</label>
            <el-select
              v-model="listQuery.project_classify"
              @change="chooseProjectClassify"
              placeholder="请选择"
            >
              <el-option
                :value="item.val"
                :label="item.name"
                v-for="(item, index) in projectClassifyArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block" :class="[isShow ? '' : 'ml-2']">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                v-if="!isShow"
                label="全部"
                :value="allProject"
              ></el-option>
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">检查时间：</span>
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
            <span class="grey2">验收结果：</span>
            <el-select
              class="el-select"
              v-model="listQuery.process_inspection_state"
              eplaceholder="请选择"
              @change="refreshData"
            >
              <el-option
                v-for="item in resultArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">是否为隐蔽工程：</span>
            <el-select
              class="el-select"
              v-model="listQuery.process_inspection_is_hide"
              eplaceholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['QualityProcessInspection-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'process_inspection_id',
                'delQualityProcessInspection'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['QualityProcessInspection-upload']"
            v-if="isShow"
            class="ml-1"
            :btnText="'新增'"
            @buttonClick="addInspection()"
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
          label="所属机构"
          align="center"
          prop="organ"
        ></el-table-column>
        <el-table-column
          label="工程名称"
          prop="process_inspection_project_name"
        >
        </el-table-column>
        <el-table-column
          label="检查描述"
          prop="process_inspection_content"
        ></el-table-column>
        <el-table-column
          label="检查时间"
          prop="process_inspection_check_time"
        ></el-table-column>
        <el-table-column label="验收结果">
          <template slot-scope="scope">
            <span
              :class="{
                isblue: scope.row.process_inspection_state == 1,
                isred: scope.row.process_inspection_state == 2,
              }"
            >
              {{
                scope.row.process_inspection_state == 1
                  ? "质量合格"
                  : "质量不合格"
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="审批人"
          prop="daily_inspection_approval_account_name"
        ></el-table-column>
        <el-table-column label="是否为隐蔽工程">
          <template slot-scope="scope">
            <span>{{
              scope.row.process_inspection_is_hide == 1 ? "是" : "否"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态" width="120">
          <template slot-scope="{ row }">
            <!-- 1：未审批 2：审批通过 3：审批拒绝 -->
            <span
              class="status-btn"
              :style="{
                backgroundColor: ['#FFF4DE', '#DEE9FF', '#FFE4E4'][
                  row.process_inspection_approval_state - 1
                ],
                color: ['#FF8F2A', '#3377FF', '#FD5672'][
                  row.process_inspection_approval_state - 1
                ],
              }"
              >{{
                ["待审批", "审批通过", "审批不通过"][
                  row.process_inspection_approval_state - 1
                ]
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.process_inspection_remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" v-if="isShow">
          <template slot-scope="scope">
            <i
              v-if="scope.row.process_inspection_approval_state == 1"
              v-permission="['QualityProcessInspection-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo(
                  'enterprise_quality_takecoverEngineering_handle',
                  {
                    id: scope.row.process_inspection_id,
                  }
                )
              "
            ></i>
            <i
              v-permission="['QualityProcessInspection-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'process_inspection_id',
                  'delQualityProcessInspection'
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
import { mapGetters } from "vuex";
import Detail from "./components/Detail";
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryQualityProcessInspection",
      dateRange: [], //日期范围
      isShow: this.$route.meta.isProject,
      listQuery: {
        process_inspection_start: null,
        process_inspection_end: null,
        process_inspection_state: null,
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      allProject: "", //全部项目
      resultArr: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "质量合格",
          value: 1,
        },
        {
          label: "质量不合格",
          value: 2,
        },
      ],
      tenders: [],
      info: null,
      infoData: {
        pic_list: [],
      }, //详情
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
      id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //单位工程id
    };
  },

  mounted() {
    if (this.id) {
      this.rowclick({ process_inspection_id: this.id });
    }
    this.projectClassifyArr = this.isShow
      ? this.$store.getters.project_classify == 1
        ? [{ name: "自营项目", val: 1 }]
        : [{ name: "合作项目", val: 2 }]
      : [
          { name: "全部", val: 0 },
          { name: "自营项目", val: 1 },
          { name: "合作项目", val: 2 },
        ];
    this.listQuery.project_classify = this.isShow
      ? Number(this.$store.getters.project_classify)
      : 0;
    this.getOrganProjectData();
  },
  methods: {
    chooseProjectClassify(val) {
      this.getOrganProjectData();
    },
    // 查询节点下的项目
    async getOrganProjectData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        project_classify: this.isShow
          ? Number(this.$store.getters.project_classify)
          : this.listQuery.project_classify,
      });
      this.projectListSelect = result;
      this.allProject = this.projectListSelect.length
        ? this.projectListSelect.map((item) => item.organ_id).join(",")
        : "";
      this.listQuery.organ_node = this.isShow
        ? Number(this.allProject)
        : this.allProject;
      this.listQuery.organ_node ? this.refreshData() : (this.tableData = []);
    },
    addInspection() {
      this.$refs.dialog.show();
    },
    async rowclick(row) {
      let res = await api.queryQualityProcessInspectionInfo({
        process_inspection_ids: row.process_inspection_id + "",
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.process_inspection_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.process_inspection_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.add-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.add-button {
  text-align: center;
}
</style>
