<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" :visible.sync="visible" />
    <n-dialog
      ref="dialog"
      :diaTit="'导入租赁设备'"
      :diaWidth="'32%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll>
          <div class="mb-2">
            <label class="text-secondary">{{ subject_label }}：</label>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => getSelectValue(val, 2)"
              :treeData="treeData1"
              :Isvalue="true"
              :value="tab_exam_organ_id"
            />
          </div>
          <div class="mb-2">
            <span>设备信息模板</span>
            <a
              :href="
                GLOBAL.baseurl + '/MOULD/EquipmentApproachLease_import.xlsx'
              "
              download="设备信息模板.xlsx"
            >
              <n-button
                class="ml-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-upload
            class="mt-3 mb-2 w-50"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :limit="1"
            :multiple="false"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx, .doc, .docx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="'导入设备信息表'"
            />
          </el-upload>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="my-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div-s">
      <div class="top-select-box" style="margin-left: 250px">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">{{ subject_label }}：</label>
            <n-treeselect
              @getSelectNode="(val) => getSelectValue(val, 1)"
              :treeData="treeData"
              :Isvalue="true"
              :value="listQuery.organ_node"
            />
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">状态：</label>
            <el-select
              v-model="listQuery.approach_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="(item, index) in leaseStateArr"
                :key="index"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
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
            <label class="text-secondary">名称：</label>
            <el-select
              filterable
              v-model="listQuery.approach_name"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in ApproachName"
                :key="item.approach_name"
                :label="item.approach_name"
                :value="item.approach_name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            :btnText="'导出'"
            v-permission="['ApproachStatistical-export']"
            @buttonClick="
              $utils.handleExport('ExportApproach', listQuery, '租赁设备')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            @buttonClick="exportFun"
            :btnText="'导入'"
            class="ml-2"
            v-permission="['ApproachStatistical-import']"
            v-if="isShow"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'新增'"
            v-permission="['ApproachStatistical-upload']"
            @buttonClick="handleAdd"
            v-if="isShow"
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
        style="width: 100%"
        height="calc(100% - 110px)"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="工程项目" prop="organ_area"></el-table-column>
        <el-table-column label="设备类型">
          <span slot-scope="{ row }">{{
            ["", "普通设备", "特种设备"][row.approach_equip_type]
          }}</span>
        </el-table-column>
        <el-table-column
          label="设备名称"
          prop="approach_name"
        ></el-table-column>
        <el-table-column label="设备编号" prop="approach_no"></el-table-column>
        <el-table-column
          label="设备厂家"
          prop="approach_factory"
        ></el-table-column>
        <el-table-column
          label="设备型号"
          prop="approach_spec"
        ></el-table-column>
        <el-table-column label="设备状态">
          <template slot-scope="{ row }">
            <span
              class="status-btn"
              :style="{
                backgroundColor: bgColorArr[row.approach_state],
                color: colorArr[row.approach_state],
              }"
              >{{ stateArr[row.approach_state - 1] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="使用地点">
          <span slot-scope="{ row }" :title="row.approach_location">{{
            row.approach_location.slice(0, 10)
          }}</span>
        </el-table-column>
        <el-table-column
          label="进场时间"
          prop="approach_start_time"
        ></el-table-column>
        <el-table-column label="操作" header-align="center" width="220">
          <template slot-scope="{ row }">
            <template v-if="row.approach_state != 11 && isShow">
              <el-popover
                placement="bottom"
                width="60"
                trigger="hover"
                v-if="showMore"
              >
                <div class="mt-1">
                  <div
                    class="bg-white pay-box w-100 text-center cursor-p"
                    v-permission="['ApproachExeunt-update']"
                    @click.stop="exit(row.approach_id)"
                  >
                    退场
                  </div>
                  <div
                    class="bg-white pay-box w-100 text-center cursor-p"
                    v-permission="['AllocateRental-upload']"
                    @click.stop="idle(row.approach_id)"
                  >
                    闲置
                  </div>
                  <div
                    class="bg-white pay-box w-100 text-center cursor-p"
                    v-permission="['ApproachMaintenance-upload']"
                    @click.stop="
                      linkTo(
                        'enterprise_material_device_operation_management_handle',
                        { related_id: row.approach_id }
                      )
                    "
                  >
                    维养
                  </div>
                </div>
                <span slot="reference" class="grey2 more">更多</span>
              </el-popover>
              <i
                v-permission="['ApproachStatistical-update']"
                class="iconfont btn-btn_list_edit edit-icon-btn ml-1"
                @click.stop="handleAdd(row.approach_id)"
              ></i>
              <i
                v-permission="['ApproachStatistical-delete']"
                class="iconfont btn-btn_list_trash trash-icon-btn ml-1"
                @click.stop="
                  deleteFun(false, row, 'approach_id', 'DelApproach')
                "
              ></i>
            </template>
            <i
              class="iconfont btn-btn_list_code trash-icon-btn ml-1"
              @click.stop="qrcode"
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
import { hasPermissionArr } from "@/plugins/permission_tools";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import Detail from "./components/Detail";
import { mapGetters } from "vuex";
import {
  stateArr,
  colorArr,
  bgColorArr,
  leaseStateArr,
} from "@/constants/deviceState";

export default {
  components: {
    Detail,
  },
  mixins: [table, confirm, upload],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      visible: false,
      tab_exam_organ_id: null,
      leaseStateArr,
      stateArr,
      colorArr,
      bgColorArr,
      postURL: "QueryApproachList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        approach_equip_type: null,
        approach_type: 2, //1自有设备,2租赁设备
        approach_state: null, //状态
        organ_node: this.$organ_id_en_or_pro(this),
      },
      ApproachName: [],
      dateRange: [],
    };
  },
  computed: {
    ...mapGetters({
      treeData: "subject_list",
      treeData1: "subject",
      subject_label: "subject_label",
    }),
    showMore() {
      return (
        hasPermissionArr(["ApproachExeunt-update"]) ||
        hasPermissionArr(["AllocateRental-upload"]) ||
        hasPermissionArr(["ApproachMaintenance-upload"])
      );
    },
  },
  activated() {
    this.QueryApproachName();
  },
  methods: {
    async submitFun() {
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择导入文件",
        });
        return;
      }
      let param = {};
      param.uploadFile = this.fileList[0].raw;
      param.tab_exam_organ_id = this.tab_exam_organ_id;
      param.tab_exam_type = 2;
      await this.uploadFile([], param, "ImportEquipApproachLease");
      this.fileList = [];
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          // 获取材料树
          // 更新列表
          this.getList();
        },
      });
    },
    //   点击导入
    exportFun() {
      this.fileList = [];
      this.tab_exam_organ_id = null;
      this.$refs.dialog.show();
      if (this.$refs.treeselect) {
        this.$refs.treeselect.valueTitle = "";
      }
    },
    //退场
    exit(id) {
      this.confirm("", "", "是否确认退场！").then(async () => {
        await api.UpdateApproachState({ approach_id: id, approach_state: 10 });
        this.linkTo("enterprise_material_device_late_exit");
      });
    },
    //闲置
    idle(id) {
      this.confirm("", "", "是否确认闲置！").then(async () => {
        await api.UpdateApproachState({ approach_id: id, approach_state: 4 });
        this.linkTo("enterprise_material_device_late_Idle_self");
      });
    },
    qrcode() {
      this.$tip({
        isTip: true,
        message: "设备二维码正在开发中。。。。。。",
      });
    },
    handleAdd(id) {
      this.linkTo(
        "enterprise_material_device_operation_statistical_rental_handle",
        { id: id }
      );
    },
    // 树形下拉选择
    getSelectValue(node, type) {
      if (type == 1) {
        this.listQuery.organ_node = node.tag;
        this.listQuery.approach_name = "";
        this.QueryApproachName();
        this.refreshData();
      } else {
        this.tab_exam_organ_id = node.tag;
      }
    },
    //查询设备名称
    async QueryApproachName() {
      let res = await api.QueryApproachName({
        approach_type: 2,
        organ_ids: String(this.listQuery.organ_node),
      });
      this.ApproachName = res.result;
    },
    async rowclick(row) {
      await this.QueryApproach(row.approach_id, row);
      this.visible = true;
    },
    async QueryApproach(id, row) {
      let url =
        row.approach_state == 11 ? "QueryApproachExeunt" : "QueryApproach";
      let res = await api[url]({ approach_id: id });
      this.infoData = res.result[0];
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.approach_date_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.approach_date_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.more:hover {
  color: $main;
}
.pay-box {
  height: 40px;
  line-height: 40px;
  &:hover {
    background: $main;
    color: white;
  }
}
</style>
