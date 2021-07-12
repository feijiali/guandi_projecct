<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'导入材料信息'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <div class="mb-2">
          <span>材料信息模板</span>
          <a
            :href="GLOBAL.baseurl + '/MOULD/material_import.xlsx'"
            download="材料信息模板.xlsx"
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
            :btnText="'导入材料信息表'"
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
      </template>
    </n-dialog>
    <div class="container-div-s">
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
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="[
                'MaterialManagementMaterialInformation_TJSTC-import',
              ]"
              @buttonClick="exportInfo"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
          </div>
          <div class="d-inline-block ml-2">
            <n-button
              :btnText="'导出'"
              v-permission="[
                'MaterialManagementMaterialInformation_TJSTC-export',
              ]"
              @buttonClick="
                $utils.handleExport(
                  'exportMaterialManagementSupplyUnit',
                  listQuery,
                  '供应商信息'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
          </div>
          <div class="d-inline-block ml-2">
            <n-button
              :btnText="'新增'"
              v-permission="[
                'MaterialManagementMaterialInformation_TJSTC-upload',
              ]"
              @buttonClick="handleUpdate"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
      >
        <template slot="empty">
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
          label="材料名称"
          prop="material_information_name"
        ></el-table-column>
        <el-table-column
          label="规格型号"
          prop="material_information_specification"
        ></el-table-column>
        <el-table-column
          label="单位"
          prop="material_information_Unit"
        ></el-table-column>
        <el-table-column
          label="添加日期"
          prop="material_information_submit_time"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
              v-permission="[
                'MaterialManagementMaterialInformation_TJSTC-update',
              ]"
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
  name: "",
  mixins: [table, confirm, upload],
  data() {
    return {
      postURL: "queryMaterialManagementMaterialInformation",
      listQuery: {
        material_information_start: "",
        material_information_end: "",
        material_information_name: "",
        material_information_specification: "",
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 20,
      },
      MaterialList: [],
      SpecList: [],
      dateRange: [],
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
      this.listQuery.material_information_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.material_information_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },
    handleUpdate(row) {
      if (!row) {
        this.linkTo(
          "project_material1_materialSupply_materialInformation_handle"
        );
        return;
      }
      this.linkTo(
        "project_material1_materialSupply_materialInformation_handle",
        { id: row.material_information_id }
      );
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
      this.$refs.dialog.show();
      this.fileList = [];
      this.ruleform = {};
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
        "ImportMaterialManagementMaterialInformation_TJSTC"
      );
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          // 更新列表
          this.refreshData();
        },
      });
    },
    // 获取材料和规格选择项
    async getSelectList() {
      let res1 = await api.queryMaterialManagementMaterialInformationNameSelect(
        {
          page: -1,
        }
      );
      this.MaterialList = res1.result;
      let res2 = await api.queryMaterialManagementMaterialInformationSpecSelect(
        {
          page: -1,
        }
      );
      this.SpecList = res2.result;
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.organ_id_un = node.tag;
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-title-abso {
  position: absolute;
  top: 0px;
  height: 80px;
  padding: 20px 10px;
  left: 260px;
  right: 0;
}
</style>
