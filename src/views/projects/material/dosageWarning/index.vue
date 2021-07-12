<template>
  <div class="container-all">
    <n-dialog ref="dialog" :diaTit="title" :diaWidth="'50%'">
      <template v-if="info" slot="diaSlot">
        <n-scroll>
          <el-form ref="ruleform" v-if="type" class="el-form-box">
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
              @change="refreshData"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="(item, i) in MaterialList"
                :key="i"
                :label="item.material_information_name"
                :value="item.material_information_name"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">预警等级：</span>
            <el-select
              v-model="listQuery.usage_statistics_waring_level"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option label="Ⅰ级" value="Ⅰ级"></el-option>
              <el-option label="Ⅱ级" value="Ⅱ级"></el-option>
              <el-option label="Ⅲ级" value="Ⅲ级"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <n-button
            btnText="预警比例设置"
            @buttonClick="handleUpdateWaring"
            v-permission="['MaterialManagementDosageWarning_TJSTC-upload']"
          >
          </n-button>

          <n-button
            btnText="填写实际用量"
            @buttonClick="handleUpdate"
            class="ml-2"
            v-permission="['MaterialManagementDosageWarning_TJSTC-upload']"
          >
          </n-button>
          <n-button
            v-permission="['MaterialManagementDosageWarning_TJSTC-export']"
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
        </div>
      </div>
      <el-table
        class="cusp-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 140px)"
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
          label="领用日期"
          prop="usage_statistics_time"
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
          prop="usage_statistics_quantity"
        ></el-table-column>
        <el-table-column label="预警等级" prop="usage_statistics_waring_level">
          <template slot-scope="scope">
            <span
              :class="
                'levelcolor' +
                waringlevel.indexOf(scope.row.usage_statistics_waring_level)
              "
            >
              {{
                scope.row.usage_statistics_waring_level == ""
                  ? "暂无"
                  : scope.row.usage_statistics_waring_level
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="领用单位" prop="use_organ"></el-table-column>
        <el-table-column
          label="备注"
          prop="usage_statistics_remark"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              v-permission="['MaterialManagementDosageWarning_TJSTC-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'usage_statistics_id',
                  'delMaterialManagementUsageStatistics'
                )
              "
            ></span>
            <i
              @click.stop="handledupload(scope.row)"
              class="iconfont btn-btn_list_upload edit-icon-btn ml-2"
              v-permission="['MaterialManagementDosageWarning_TJSTC-update']"
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
  name: "",
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryMaterialManagementUsageStatistics",
      listQuery: {
        usage_statistics_start: "",
        usage_statistics_end: "",
        usage_statistics_waring_level: "",
        material_information_name: "",
        organ_node: this.$organ_id_en_or_pro(this),
        page_size: 0,
        page_size: 20,
      },
      waringlevel: ["Ⅰ级", "Ⅱ级", "Ⅲ级"],
      MaterialList: [],
      info: null,
      fileList: [],
      picList: [],
      title: "",
      type: false,
      dateRange: [],
    };
  },
  created() {
    this.getSelectList();
  },

  methods: {
    // 获取材料和规格选择项
    async getSelectList() {
      let res1 = await api.queryMaterialManagementMaterialInformationNameSelect(
        {
          organ_node: this.$organ_id_en_or_pro(this),
          page: -1,
        }
      );
      this.MaterialList = res1.result;
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.usage_statistics_start = this.dateRange
        ? this.dateRange[0]
        : "";
      this.listQuery.usage_statistics_end = this.dateRange
        ? this.dateRange[1]
        : "";
      this.currentPage = 1;
      this.getList();
    },

    rowclick(row) {
      this.info = row;
      this.type = false;
      this.fileList = [];
      this.picList = [];
      this.title = "实际用量资料查看";
      this.picList = row.pic_list;
      this.fileList = row.file_list;
      this.$refs.dialog.show();
    },
    handleUpdate(row) {
      if (!row) {
        this.linkTo("project_material1_dosageWarning_handle");
        return;
      }
      this.linkTo("project_material1_dosageWarning_handle", {
        id: row.usage_statistics_id,
      });
    },
    handleUpdateWaring() {
      this.linkTo("project_material1_dosageWarning_warning");
    },
    handledupload(row) {
      this.info = row;
      this.type = true;
      this.fileList = [];
      this.picList = [];
      this.title = "上传实际用量资料";
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.pic_upload.setPicList(row.pic_list);
        this.$refs.file_upload.setFileList(row.file_list);
      });
    },
    async submitFun() {
      let file_obj = {
        uploadFileModule: "MaterialManagementDosageWarning_TJSTC",
      };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.info.usage_statistics_pic = picsjson.file;
      this.info.usage_statistics_file = filejson.file;
      await api.updateMaterialManagementUsageStatistics({
        ...this.info,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$refs.dialog.cancel();
          this.getList();
        },
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss">
.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
</style>
<style lang="scss" scoped>
.UsageStatistics {
  background: $orange;
}

.levelcolor0 {
  color: #ed3f76;
}

.levelcolor1 {
  color: #f89b2f;
}

.levelcolor2 {
  color: #ffd347;
}
</style>
