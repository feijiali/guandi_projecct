<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" @doPrint="doPrint" />
    <Print
      ref="printDialog"
      :printDataArr="printDataArr"
      @clearData="clearData"
    />
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
                $router.linkTo('enterprise_quality_inspection_handle', {
                  type: 1,
                });
                $refs.dialog.cancel();
              "
            ></n-button>
            <n-button
              class="ml-5"
              :btnText="'否'"
              @buttonClick="
                $router.linkTo('enterprise_quality_inspection_handle', {
                  type: 0,
                });
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
          <div class="d-inline-block ml-2">
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
            <span class="grey2">日期：</span>
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
            <span class="grey2">隐患类型：</span>
            <el-select
              @change="refreshData"
              class="el-select"
              ref="select"
              v-model="listQuery.trouble_type"
              placeholder="请选择/输入"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="无" :value="1"></el-option>
              <el-option label="一般隐患" :value="2"></el-option>
              <el-option label="较大隐患" :value="3"></el-option>
              <el-option label="重大隐患" :value="4"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">巡检状态：</span>
            <el-select
              @change="refreshData"
              class="el-select"
              ref="select"
              v-model="listQuery.daily_inspection_status"
              placeholder="请选择/输入"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="通过" :value="1"></el-option>
              <el-option label="口头警告" :value="2"></el-option>
              <el-option label="待整改" :value="3"></el-option>
              <!-- <el-option label="已整改" :value="4"></el-option> -->
              <el-option label="待复检" :value="5"></el-option>
              <el-option label="复检通过" :value="6"></el-option>
              <el-option label="复检不通过" :value="7"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['QuantityDailyInspection-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'daily_inspection_id',
                'delQuantityDailyInspection'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['QuantityDailyInspection-upload']"
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
          label="巡检主题"
          align="center"
          prop="daily_inspection_title"
        ></el-table-column>
        <el-table-column label="隐患类型" align="center">
          <template slot-scope="scope">
            {{
              ["", "无", "一般隐患", "较大隐患", "重大隐患"][
                scope.row.trouble_type
              ]
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="巡检地点"
          align="center"
          prop="daily_inspection_position"
        >
        </el-table-column>
        <el-table-column
          label="巡检人"
          align="center"
          prop="account_name_check"
        ></el-table-column>
        <el-table-column label="巡检状态" align="center"
          ><template slot-scope="scope">
            {{
              [
                "",
                "通过",
                "口头警告",
                "待整改",
                "已整改",
                "待复检",
                "复检通过",
                "复检不通过",
              ][scope.row.daily_inspection_status]
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="巡检日期"
          align="center"
          prop="check_attend_time"
        >
          <template slot-scope="scope">
            {{
              scope.row.daily_inspection_date +
              " " +
              scope.row.daily_inspection_time
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" v-if="isShow">
          <template slot-scope="scope">
            <i
              v-permission="['QuantityDailyInspection-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'daily_inspection_id',
                  'delQuantityDailyInspection'
                )
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
import select from "@/mixins/select";
import Detail from "./components/Detail";
import Print from "./components/Print";
import { mapGetters } from "vuex";

export default {
  components: {
    Detail,
    Print,
  },
  mixins: [table, confirm, select],
  data() {
    return {
      postURL: "queryQuantityDailyInspection",
      dateRange: [], //日期范围
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        start: "",
        end: "",
        trouble_type: 0,
        daily_inspection_status: 0,
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      allProject: "", //全部项目
      infoData: {
        account_name_copy: "",
        pic_list: [],
        video_list: [],
        content_list: [{}],
      }, //详情
      printDataArr: [], //批量打印的详情列表
      projectListSelect: [], //工程项目
      projectClassifyArr: [], //项目分类
    };
  },

  mounted() {
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
    // 选择项目分类
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
    changeOrgan(val) {
      this.listQuery.organ_node = val;
      this.currentPage = 1;
      this.getList();
    },
    async rowclick(row) {
      let res = await api.queryQuantityDailyInspection({
        daily_inspection_id: row.daily_inspection_id,
      });
      this.infoData = res.result[0];
      this.printDataArr = res.result;
      this.infoData.account_name_copy = this.infoData.list
        ? this.infoData.list.map((item) => item.account_name_copy).join()
        : "";
      this.fileFun("daily_inspection_pic");
      this.fileFun("daily_inspection_video");
      this.fileFun("rec_pic");
      this.fileFun("rec_video");
      this.fileFun("return_pic");
      this.fileFun("return_video");
      this.$refs.detailDialog.show();
    },
    fileFun(name) {
      if (this.infoData[name]) {
        this.infoData[name + "_list"] = this.infoData[name]
          .split(",")
          .map((items) => ({
            url: this.infoData.server + items,
            file_name: items,
          }));
      }
    },
    //批量查询
    async queryQuantityDailyInspection(daily_inspection_ids) {
      let res = await api.querySafeDailyInspection({
        daily_inspection_ids: daily_inspection_ids.join(","),
      });
      this.printDataArr = res.result;
    },
    // 批量打印
    printFun() {
      this.selectionChoose("daily_inspection_id", "打印", (chooseids) => {
        this.queryQuantityDailyInspection(chooseids);
        this.confirm("", "", "是否确认打印？").then(() => {
          this.doPrint();
        });
      });
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.daily_inspection_search = val;
      this.refreshData();
    },
    // 打印
    doPrint() {
      this.$refs.printDialog.doPrint();
    },
    // 清空数据，初始化弹框
    clearData() {
      this.selectionArr = [];
      this.printDataArr = [];
      this.$refs.detailDialog.cancel();
      this.$refs.table.clearSelection();
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
