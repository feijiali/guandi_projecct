<template>
  <div class="container-all">
    <n-dialog ref="dialogTwo" :diaTit="'导入监控量测'" :diaWidth="'32%'">
      <template slot="diaSlot">
        <el-scrollbar :native="false" class="w-100">
          <div class="mb-2">
            <p>监控量测</p>
            <a
              href="https://std.cninct.com/AISHOW_2/MOULD/SafeMonitorMeasure_exporter.xlsx"
              download="监控量测模板"
            >
              <div class="handle-btn cursor-p mr-1 mt-2">下载模板</div>
            </a>
            <!-- <n-button
              class="mt-2"
              :btnText="'下载模板'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="
                $utils.handleExport(
                  'ExportAssessmentCashFlow',
                  {},
                  '监控量测模板'
                )
              "
            ></n-button> -->
          </div>
          <div class="d-flex justify-content-start align-items-center mt-3">
            <span class="grey2">工程项目：</span>
            <el-select
              @change="getSelectValue($event, 2)"
              v-model="ruleform.mo_me_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="mt-2">
            <span class="grey2 d-inline-block label-l must">工程部位：</span>
            <el-select
              class="el-select"
              ref="select"
              v-model="ruleform.mo_me_part"
              filterable
              allow-create
              default-first-option
              @change="choosePart"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in mo_me_part_arr"
                :key="index"
                :label="item.mo_me_part"
                :value="item.mo_me_part"
              ></el-option>
            </el-select>
          </div>
          <div class="mt-2">
            <span class="grey2 d-inline-block label-l must">点号名称：</span>
            <el-select
              class="el-select"
              ref="select"
              v-model="ruleform.mo_me_point"
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in mo_me_point_arr"
                :key="index"
                :label="item.mo_me_point"
                :value="item.mo_me_point"
              ></el-option>
            </el-select>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="'导入监控量测'"
            />
          </el-upload>
          <div class="d-flex justify-content-end" style="margin-bottom: 5px">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </el-scrollbar>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">工程项目：</span>
            <el-select
              @change="getSelectValue($event)"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">工程部位：</span>
            <el-select
              v-model="listQuery.mo_me_part"
              placeholder="请选择"
              @change="refreshDataPart"
            >
              <el-option
                v-for="(item, index) in mo_me_part_arr"
                :key="index"
                :label="item.mo_me_part"
                :value="item.mo_me_part"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">点号：</span>
            <el-select
              v-model="listQuery.mo_me_point"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option
                v-for="(item, index) in mo_me_point_arr"
                :key="index"
                :label="item.mo_me_point"
                :value="item.mo_me_point"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">月份：</span>
            <div class="d-inline-block rounded-1">
              <el-date-picker
                :clearable="false"
                v-model="listQuery.mo_me_month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                @change="refreshData"
                placeholder="请选择"
              ></el-date-picker>
            </div>
            <div
              class="grey2 float-right d-flex flex-shrink-0 align-items-end ml-2"
              style="height: 40px; line-height: 40px"
            >
              <div>备注：(沉降：”-“为下沉，”+“为上升)</div>
            </div>
          </div>
        </div>

        <div>
          <n-button
            v-permission="['SafeMonitorMeasure-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportSafeMonitorMeasure',
                listQuery,
                '监控量测表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-if="isShow"
            v-permission="['SafeMonitorMeasure-import']"
            class="ml-2"
            :btnText="'导入'"
            @buttonClick="add"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-if="isShow"
            v-permission="['SafeMonitorMeasure-upload']"
            :btnText="'新增'"
            class="ml-2"
            @buttonClick="handleAdd(1)"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="日期" prop="mo_me_time"></el-table-column>
        <el-table-column
          label="观测次序"
          prop="mo_me_seq_string"
        ></el-table-column>
        <el-table-column label="观测值（m）">
          <el-table-column label="X" prop="mo_me_x">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_x < 0" class="red">{{
                scope.row.mo_me_x
              }}</span>
              <span v-else>{{ scope.row.mo_me_x }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Y" prop="mo_me_y">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_y < 0" class="red">{{
                scope.row.mo_me_y
              }}</span>
              <span v-else>{{ scope.row.mo_me_y }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Z" prop="mo_me_z">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_z < 0" class="red">{{
                scope.row.mo_me_z
              }}</span>
              <span v-else>{{ scope.row.mo_me_z }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="日偏差值（mm)" prop="smart_capture_content">
          <el-table-column label="X" prop="mo_me_dif_x">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_dif_x < 0" class="red">{{
                scope.row.mo_me_dif_x
              }}</span>
              <span v-else>{{ scope.row.mo_me_dif_x }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Y" prop="mo_me_dif_y">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_dif_y < 0" class="red">{{
                scope.row.mo_me_dif_y
              }}</span>
              <span v-else>{{ scope.row.mo_me_dif_y }}</span>
            </template>
          </el-table-column>
          <el-table-column label="平面位移" prop="mo_me_dif_m">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_dif_m < 0" class="red">{{
                scope.row.mo_me_dif_m
              }}</span>
              <span v-else>{{ scope.row.mo_me_dif_m }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Z沉降" prop="mo_me_dif_z">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_dif_z < 0" class="red">{{
                scope.row.mo_me_dif_z
              }}</span>
              <span v-else>{{ scope.row.mo_me_dif_z }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="累计差值（mm)" prop="smart_capture_content">
          <el-table-column label="X" prop="mo_me_total_x">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_total_x < 0" class="red">{{
                scope.row.mo_me_total_x
              }}</span>
              <span v-else>{{ scope.row.mo_me_total_x }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Y" prop="mo_me_total_y">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_total_y < 0" class="red">{{
                scope.row.mo_me_total_y
              }}</span>
              <span v-else>{{ scope.row.mo_me_total_y }}</span>
            </template>
          </el-table-column>
          <el-table-column label="平面位移" prop="mo_me_total_m">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_total_m < 0" class="red">{{
                scope.row.mo_me_total_m
              }}</span>
              <span v-else>{{ scope.row.mo_me_total_m }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Z沉降" prop="mo_me_total_z">
            <template slot-scope="scope">
              <span v-if="scope.row.mo_me_total_z < 0" class="red">{{
                scope.row.mo_me_total_z
              }}</span>
              <span v-else>{{ scope.row.mo_me_total_z }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="天气" prop="mo_me_weather"></el-table-column>
        <el-table-column
          v-if="isShow"
          label="操作"
          prop="account_name"
          header-align="center"
          width="160px"
        >
          <template slot-scope="scope">
            <i
              v-permission="['SafeMonitorMeasure-update']"
              @click.stop="handleAdd(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
            ></i>
            <i
              v-permission="['SafeMonitorMeasure-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'monitor_measure_id',
                  'delSafeMonitorMeasure'
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
import upload from "@/mixins/upload";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      postURL: "querySafeMonitorMeasure", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        //列表查询参数
        page: 0,
        mo_me_part: "",
        mo_me_point: "",
        order_type: 1,
        mo_me_month: "",
        organ_node: this.$organ_id_en_or_pro(this),
      },
      //导入中表单数据
      ruleform: {
        mo_me_organ_id_un: "",
        mo_me_part: "",
        mo_me_point: "",
      },
      mo_me_part_arr: [],
      mo_me_point_arr: [],
      fileList: [],
      // 精确查询工程项目下的测点和部位参数
      queryOne: {
        mo_me_organ_id_un: "",
        query_type: "",
        page: -1,
      },
      getListBool: false,
    };
  },
  async mounted() {
    this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    this.queryOne.mo_me_organ_id_un = this.listQuery.organ_node;
    // 查询最新的数据
    await this.querySafeMonitorMeasure(this.listQuery);
    // 查询工程部位
    await this.querySafeMonitorMeasurePartOrPoint({
      mo_me_organ_id_un: this.listQuery.mo_me_organ_id_un
        ? this.listQuery.mo_me_organ_id_un
        : this.projectListSelect[0].organ_id,
      query_type: 2,
    });
    await this.querySafeMonitorMeasurePartOrPoint({
      mo_me_organ_id_un: this.listQuery.mo_me_organ_id_un
        ? this.listQuery.mo_me_organ_id_un
        : this.projectListSelect[0].organ_id,
      mo_me_part: this.listQuery.mo_me_part,
      query_type: 1,
    });
    this.getList();
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  methods: {
    // 筛选工程部位后后重新请求数据
    refreshDataPart(val) {
      this.listQuery.mo_me_point = "";
      this.queryOne.mo_me_part = val;
      this.queryOne.query_type = 1;
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
    },

    // 查询所有工程部位,点号
    async querySafeMonitorMeasurePartOrPoint(param) {
      param.mo_me_organ_id_un = Number(param.mo_me_organ_id_un);
      let data = await api.querySafeMonitorMeasurePartOrPoint(param);
      if (param.query_type == 2) {
        this.mo_me_part_arr = data.result;
      }
      if (param.query_type == 1) {
        this.mo_me_point_arr = data.result;
      }
    },
    // 获取最新的数据
    async querySafeMonitorMeasure(param) {
      let data = await api.querySafeMonitorMeasure(param);
      if (data.result[0]) {
        this.listQuery.mo_me_part =
          data.result[data.result.length - 1].mo_me_part;
        this.listQuery.mo_me_point =
          data.result[data.result.length - 1].mo_me_point;
        this.listQuery.organ_node =
          data.result[data.result.length - 1].mo_me_organ_id_un;
        this.listQuery.page_size = 20;
        this.getList();
      }
    },
    // 树形下拉选择
    getSelectValue(node, type) {
      this.mo_me_point_arr = [];
      if (type == 2) {
        //导入筛选
        this.ruleform.mo_me_part = "";
        this.ruleform.mo_me_point = "";
        this.queryOne.mo_me_part = "";
        this.ruleform.organ_node = node;
        this.queryOne.mo_me_organ_id_un = node;
        this.queryOne.query_type = 2;
        this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
      } else {
        //筛选列表
        this.listQuery.mo_me_part = "";
        this.listQuery.mo_me_point = "";
        this.queryOne.mo_me_part = "";
        this.listQuery.organ_node = node;
        this.queryOne.mo_me_organ_id_un = node;
        this.queryOne.query_type = 2;
        this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
      }
    },
    //   新增和修改
    handleAdd(val) {
      let query =
        val !== 1
          ? {
              monitor_measure_id: val.monitor_measure_id,
              mo_me_seq: val.mo_me_seq,
            }
          : {
              mo_me_part: this.listQuery.mo_me_part,
              mo_me_point: this.listQuery.mo_me_point,
              mo_me_organ_id_un: this.listQuery.organ_node,
            };
      this.$router.linkTo(
        "enterprise_engineering_monitoringMeasure_statistical_handle",
        query
      );
    },
    // 工程部位多选框选择事件
    choosePart(val) {
      this.queryOne.mo_me_part = val;
      this.queryOne.query_type = 1;
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
    },
    // 点击导入
    add() {
      this.ruleform.mo_me_organ_id_un = this.listQuery.organ_node;
      this.ruleform.mo_me_part = this.listQuery.mo_me_part;
      this.ruleform.mo_me_point = this.listQuery.mo_me_point;
      this.fileList = [];
      this.$refs.dialogTwo.show();
    },
    // 提交
    async submitFun() {
      if (!this.ruleform.mo_me_organ_id_un) {
        this.$tip({
          isTip: true,
          message: "请选择工程项目",
        });
        return;
      }
      if (!this.ruleform.mo_me_part) {
        this.$tip({
          isTip: true,
          message: "请选择或输入工程部位",
        });
        return;
      }
      if (!this.ruleform.mo_me_point) {
        this.$tip({
          isTip: true,
          message: "请选择或输入点号",
        });
        return;
      }
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入监控量测信息表",
        });
        return;
      }
      await this.$utils.uploadFile.call(this, ["fileList"], {
        uploadFileModule: "SafeMonitorMeasure",
      });
      let fileListArr = [];
      for (let value of this.fileList) {
        fileListArr.push(value.file_name);
      }
      this.ruleform.file_name = fileListArr.join(",");
      this.submitAllData();
    },
    //导入中提交所有数据接口
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.importSafeMonitorMeasure(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialogTwo.cancel();
          this.refreshData();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.handle-btn {
  background-color: #3377ff;
  color: white;
  box-shadow: 5px 5px 20px #8e95a7;
  position: relative;
  z-index: 0;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 0 30px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  width: 150px;
  font-size: 16px;
}
// .orange-btn {
//   background-color: #fdb855;
// }
</style>
