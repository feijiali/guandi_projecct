<template>
  <div class="container-all">
    <n-dialog ref="dialog" :diaTit="title" :diaWidth="'50%'">
      <template v-if="info" slot="diaSlot">
        <n-scroll>
          <el-form v-if="type" class="el-form-box">
            <el-form-item class="form-item-long" label="附件照片：">
              <nPicUpload ref="pic_upload" />
            </el-form-item>
            <el-form-item class="form-item-long" label="附件文稿：">
              <nFileUpload ref="file_upload" />
            </el-form-item>
          </el-form>
          <div v-else>
            <nPicInfo :picList="picList" />
            <nFileInfo :fileList="fileList" />
          </div>
        </n-scroll>
        <div class="w-100 text-center mt-1" v-if="type">
          <n-button
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog2"
      :diaTit="'导入进场材料信息'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll>
          <div class="mb-2">
            <span>进场材料信息模板</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/approachCount_import.xlsx'"
              download="进场材料信息模板.xlsx"
            >
              <n-button
                class="ml-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <div>
            <span class="disi label-l must">工区：</span>
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.organ_id_un"
            />
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
              :btnText="'导入进场材料信息表'"
            />
          </el-upload>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitExport"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
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
            <span class="grey2">材料：</span>
            <el-select
              v-model="listQuery.material_information_name"
              placeholder="请选择"
              @change="materChange"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, i) in MaterialList"
                :key="i"
                :label="item.material_information_name"
                :value="item.material_information_name"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">规格型号：</span>
            <el-select
              v-model="listQuery.material_information_specification"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, i) in SpecList"
                :key="i"
                :label="item.material_information_specification"
                :value="item.material_information_specification"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            btnText="导入"
            @buttonClick="exportInfo"
            v-permission="['MaterialManagementApproachCount_TJSTC-import']"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['MaterialManagementApproachCount_TJSTC-export']"
            :btnText="'导出'"
            class="ml-2"
            @buttonClick="
              $utils.handleExport(
                'exportMaterialManagementApproachCount',
                listQuery,
                '进场统计'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['MaterialManagementApproachCount_TJSTC-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="handleUpdate"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table flex-fill"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
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
        <el-table-column label="工区" prop="organ"></el-table-column>
        <el-table-column
          label="入库日期"
          prop="approach_count_time"
        ></el-table-column>
        <el-table-column
          label="材料名称"
          prop="material_information_name"
        ></el-table-column>
        <el-table-column
          label="规格型号"
          prop="material_information_specification"
        ></el-table-column>
        <el-table-column
          label="数量"
          prop="approach_count_num"
        ></el-table-column>
        <el-table-column
          label="入库单号"
          prop="approach_count_serial"
        ></el-table-column>
        <el-table-column label="供应商" prop="supply_unit"></el-table-column>
        <el-table-column
          label="备注"
          prop="approach_count_remark"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['MaterialManagementApproachCount_TJSTC-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['MaterialManagementApproachCount_TJSTC-update']"
              @click.stop="handledupload(scope.row)"
              class="iconfont btn-btn_list_upload edit-icon-btn ml-2"
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
import upload from "@/mixins/upload";
import confirm from "@/mixins/confirm";
export default {
  name: "",
  mixins: [table, confirm, upload],
  data() {
    return {
      postURL: "queryMaterialManagementApproachCount",
      listQuery: {
        approach_count_start: "",
        approach_count_end: "",
        material_information_name: "",
        material_information_specification: "",
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 20,
      },
      MaterialList: [],
      SpecList: [],
      dateRange: [],
      title: "",
      info: null,
      fileList: [],
      picList: [],
      type: false,
      ruleform: {},
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  created() {
    this.getSelectList();
  },
  methods: {
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.approach_count_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.approach_count_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
    async materChange(val) {
      this.listQuery.material_information_specification = "";
      let res = await api.queryMaterialManagementMaterialInformationSpecSelect({
        material_information_name: val,
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1,
      });
      this.SpecList = res.result;
      this.refreshData();
    },
    //导入
    exportInfo() {
      this.$refs.dialog2.show();
      this.fileList = [];
      this.ruleform = {};
    },
    rowclick(row) {
      this.info = row;
      this.type = false;
      this.fileList = [];
      this.picList = [];
      this.title = "进场统计文件查看";
      this.picList = row.pic_list;
      this.fileList = row.file_list;
      this.$refs.dialog.show();
    },
    handledupload(row) {
      this.info = row;
      this.type = true;
      this.title = "上传进场统计文件";
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.pic_upload.setPicList(row.pic_list);
        this.$refs.file_upload.setFileList(row.file_list);
      });
    },
    handleUpdate(row) {
      this.$router.linkTo("project_material1_approachCount_handle", {
        id: row ? row.approach_count_id : null,
      });
    },
    async getSelectList() {
      let res1 = await api.queryMaterialManagementMaterialInformationNameSelect(
        {
          organ_node: this.$organ_id_en_or_pro(this),
          page: -1,
        }
      );
      this.MaterialList = res1.result;
      let res2 = await api.queryMaterialManagementMaterialInformationSpecSelect(
        {
          organ_node: this.$organ_id_en_or_pro(this),
          page: -1,
        }
      );
      this.SpecList = res2.result;
    },
    // 导入提交
    async submitExport() {
      if (!this.ruleform.organ_id_un) {
        this.$tip({
          isTip: true,
          message: "请选择工区",
        });
        return;
      }
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择导入文件",
        });
        return;
      }
      let param = {};
      param.upload_file = this.fileList[0].raw;
      param.organ_id_un = this.ruleform.organ_id_un;
      await this.uploadFile(
        [],
        param,
        "ImportMaterialManagementApproachCount_TJSTC"
      );
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog2.cancel();
          // 更新列表
          this.refreshData();
        },
      });
    },
    // 确认提交
    async submitFun() {
      let file_obj = {
        uploadFileModule: "MaterialManagementApproachCount_TJSTC",
      };

      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.info.approach_count_file_pic = picsjson.file;
      this.info.approach_count_file = filejson.file;

      await api.updateMaterialManagementApproachCount({
        ...this.info,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          this.refreshData();
        },
      });
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.organ_id_un = node.tag;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
</style>
