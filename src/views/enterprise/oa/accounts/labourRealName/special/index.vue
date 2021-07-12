<template>
  <div class="container-all position-relative">
    <div
      class="
        statistics-box-item
        d-flex
        align-items-center
        cursor-p
        position-absolute
      "
      style="top: -55px; left: 370px"
    >
      <div class="ml-1">
        <span class="font-15">已经过期证件</span>
        <span
          class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
        >
          {{ countOutOfDate }}
        </span>
      </div>
      <div class="ml-3">
        <span class="font-15">特殊工种</span>
        <span
          class="text-hover-primary font-24 font-weight-bold mt-05 langdon-font"
        >
          {{ totalcount }}<span class="font-14 font-weight-normal">人</span>
        </span>
      </div>
    </div>
    <n-dialog
      ref="dialog"
      :diaTit="'导入特殊工种'"
      :diaWidth="'32%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <el-form ref="ruleform" class="el-form-box" :model="ruleform">
            <el-form-item class="form-item-long" label="工程项目：">
              <el-select
                @change="refreshData"
                v-model="ruleform.organ_id_union"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in projectListSelect"
                  :key="item.organ_id"
                  :label="item.organ"
                  :value="item.organ_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="mb-2">
            <p>特殊工种导入模板</p>
            <a
              :href="GLOBAL.baseurl + '/MOULD/SpecialWorker.xlsx'"
              download="人员模板.xlsx"
            >
              <n-button
                class="mt-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :limit="1"
            :multiple="false"
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
              :btnText="'导入模板'"
            />
          </el-upload>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <!-- 特殊工种筛选 -->
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
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
          <div class="ml-2 d-inline-block">
            <n-search
              ref="serch"
              class="search-box"
              :isInput="true"
              :placeholder="'请输入关键词搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['StaffWorker-upload']"
            :btnText="'导入'"
            v-if="isShow"
            @buttonClick="exportFun"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_import mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['StaffWorker-upload']"
            v-if="isShow"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo(
                'enterprise_oa_account_labourRealName_handleSpecial'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['StaffWorker-export']"
            :btnText="'导出'"
            class="ml-2"
            @buttonClick="
              $utils.handleExport(
                'ExportWorkerAccount',
                listQuery,
                '特殊证件人员表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <div style="height: calc(100% - 100px)">
        <specialTable :tableDatas="tableData" :currentPages="currentPage" />
      </div>
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
import table from "@/mixins/table";
import upload from "@/mixins/upload";
import api from "@/api/index";
import specialTable from "../compenents/specialTable";
export default {
  components: { specialTable },
  mixins: [table, upload],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      activeIn: 0,
      countOutOfDate: 0, //已经过期证件
      postURL: "QueryWorkerAccount",
      listQuery: {
        //特殊工种参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this), //工程项目
        credentials_name: "",
      }, //筛选条件
      fileList: [],
      ruleform: { organ_id_union: null },
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  activated() {
    this.QueryWorkerAccountOverdue();
  },
  methods: {
    // 获取已过期证件数量
    async QueryWorkerAccountOverdue() {
      const requestData = {
        organ_node: this.listQuery.organ_node,
      };
      let data = await api.QueryWorkerAccountOverdue(requestData);
      this.countOutOfDate = data.result[0].c;
    },
    //   点击导入
    exportFun() {
      this.fileList = [];
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      if (!this.ruleform.organ_id_union) {
        this.$tip({
          isTip: true,
          message: "请选择工程项目",
        });
        return;
      }
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入特殊工种人员表",
        });
        return;
      }
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      this.ruleform.uploadFile = this.fileList[0].raw;
      this.uploadFile([], this.ruleform, "ImportWorkerAccount").then((res) => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$refs.dialog.cancel();
            this.currentPage = 1;
            this.getList();
          },
        });
      });
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.credentials_name = val;
      this.changePage(1);
    },
  },
};
</script>

<style scoped lang="scss">
.personinfo-top-count {
  text-align: center;
  border-radius: 4px;
  padding: 10px 0;
  width: 150px;
  color: white;
  font-size: 13px;
}
.short-selelect {
  ::v-deep .el-input {
    width: 100% !important;
  }
}
</style>
