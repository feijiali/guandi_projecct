<template>
  <div class="container-all position-relative">
    <n-dialog
      ref="dialog"
      :diaTit="'汇总表导入'"
      :diaWidth="'40%'"
      class="stretch-dialog"
      @beforeClose="beforeClose()"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <span>汇总表导入模板：</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/mainListTotalModule.xlsx'"
              download="汇总表模板.xlsx"
            >
              <n-button
                :btnText="'下载汇总表'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-form ref="ruleform" class="el-form-box" :model="params">
            <el-form-item class="must position-relative" label="章节：">
              <el-select
                v-model="params.proj_detail_main_type_name"
                placeholder="请选择"
                value-key="id"
                :disabled="selectchapter"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form ref="ruleform" class="el-form-box" :model="params">
            <el-form-item class="must position-relative" label="科目名称：">
              <el-input
                placeholder="请输入"
                class="input-m"
                v-model="params.proj_detail_main_name"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="mb-2 d-inline-flex">
            <el-upload
              :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
              :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
              ref="uploadFile"
              :file-list="fileList"
              action="xxxx"
              :auto-upload="false"
              :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
              :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
              accept=".xls, .xlsx, .doc, .docx"
            >
              <nStatusButton
                v-show="fileList.length < 1"
                :changeColor="'#3377FF'"
                :btnText="'导入汇总表'"
              />
            </el-upload>
          </div>
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
    <n-dialog
      ref="dialog2"
      :diaTit="'工程量清单导入'"
      :diaWidth="'40%'"
      class="stretch-dialog"
      @beforeClose="beforeClose()"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <span>工程量清单导入模板：</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/mainListModule.xlsx'"
              download="工程量清单模板.xlsx"
            >
              <n-button
                class="ml-2"
                :btnText="'下载工程量清单'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-form ref="ruleform" class="el-form-box" :model="params">
            <el-form-item class="must position-relative" label="章节：">
              <el-select
                v-model="params.proj_detail_main_type_name"
                placeholder="请选择"
                value-key="id"
                @change="selectsplit"
              >
                <el-option
                  v-for="item in projectList2"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form ref="ruleform" class="el-form-box" :model="params">
            <el-form-item class="must position-relative" label="科目名称：">
              <el-input
                placeholder="请输入"
                class="input-m"
                v-model="params.proj_detail_main_name"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="mb-2 d-inline-flex">
            <el-upload
              class="ml-2"
              :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
              :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
              ref="uploadFile"
              :file-list="fileList"
              action="xxxx"
              :auto-upload="false"
              :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
              :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
              accept=".xls, .xlsx, .doc, .docx"
            >
              <nStatusButton
                v-show="fileList.length < 1"
                :changeColor="'#3377FF'"
                :btnText="'导入工程量清单'"
              />
            </el-upload>
          </div>
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
      <div class="top-select-box" v-if="showbutton">
        <div>
          <div class="d-inline-block">
            <n-search
              ref="serch"
              :isInput="true"
              :placeholder="'请输入章节名称搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
          <n-button
            class=""
            :btnText="'变更新增'"
            v-permission="['ProjDetailListProjDetailMain-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_handle',
                {
                  t: 6,
                  organ_node: listQuery.proj_detail_main_organ,
                  type: 1,
                }
              )
            "
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'上传汇总表'"
            v-permission="['ProjDetailListProjDetailMain-upload']"
            @buttonClick="uploadproject"
          >
          </n-button>
          <n-button
            class="ml-1"
            :btnText="'上传工程量清单'"
            v-permission="['ProjDetailListProjDetailMain-upload']"
            @buttonClick="uploadproject1"
          >
          </n-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 50px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" align="center" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="项目编号"
          align="left"
          prop="proj_detail_main_type_name"
        ></el-table-column>
        <el-table-column
          label="章节名称"
          align="left"
          prop="proj_detail_main_name"
        ></el-table-column>
        <el-table-column
          label="导入表格"
          align="left"
          prop="org_name"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <span
              class="attendance-btn"
              @click.stop="
                Comdetail(
                  scope.row.proj_detail_main_id,
                  scope.row.proj_detail_main_type,
                  listQuery.proj_detail_main_organ
                )
              "
              >详情</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailMain-upload']"
              @click.stop="downloadprj(scope.row.proj_detail_main_file)"
              >下载</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailMain-upload']"
              @click.stop="reuploadprj(scope.row)"
              >重新上传</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailMain-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'proj_detail_main_id',
                  'DelProjDetailListProjDetailMain'
                )
              "
              >删除</span
            >
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
      postURL: "QueryProjDetailListProjDetailMainList",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        proj_detail_main_organ: null,
      }, //筛选条件
      params: {
        proj_detail_main_organ: null,
        proj_detail_main_type: null,
        proj_detail_main_type_name: "",
        proj_detail_main_id: null,
        proj_detail_main_name: "",
      },
      selectchapter: true,
      projectList: [
        {
          id: 1,
          name: "汇总表",
        },
      ],
      projectList2: [
        {
          id: 100,
          name: "100章",
        },
        {
          id: 200,
          name: "200章",
        },
        {
          id: 300,
          name: "300章",
        },
        {
          id: 400,
          name: "400章",
        },
        {
          id: 500,
          name: "500章",
        },
        {
          id: 600,
          name: "600章",
        },
        {
          id: 700,
          name: "700章",
        },
        {
          id: 800,
          name: "800章",
        },
        {
          id: 900,
          name: "900章",
        },
      ],
      flag: false,
      getListBool: false,
      showbutton: true,
    };
  },
  beforeDestroy() {
    this.$bus.$off("select_list");
  },
  mounted() {
    if (this.$route.query.id) {
      this.$router.push({
        query: {
          id:
            this.$route.query.id &&
            Number(this.Base64.decode(this.$route.query.id)),
        },
      });
      this.listQuery.proj_detail_main_organ = Number(this.$route.query.id);
    }
    this.$bus.$on("select_list", (item) => {
      if (item.tag == 0 || item.tag == 1 || item.tag == 2) {
        this.tableData = [];
        this.showbutton = false;
      } else {
        this.listQuery.proj_detail_main_organ = item.tag;
        this.getList();
        this.showbutton = true;
      }
    });
    if (
      this.listQuery.proj_detail_main_organ == 0 ||
      this.listQuery.proj_detail_main_organ == 1 ||
      this.listQuery.proj_detail_main_organ == 2
    ) {
      this.tableData = [];
      this.showbutton = false;
    } else {
      this.getList();
      this.showbutton = true;
    }
  },
  methods: {
    beforeClose() {
      this.params.proj_detail_main_type = null;
      this.params.proj_detail_main_type_name = "";
      this.params.proj_detail_main_id = null;
      this.params.proj_detail_main_name = "";
      this.fileList = [];
    },
    downloadprj(data) {
      if (this.flag) {
        return;
      }
      this.flag = true;
      let a = document.createElement("a");
      a.href = data;
      a.click();
      setTimeout(() => {
        this.flag = false;
      }, 2000);
    },
    selectsplit(data) {
      this.params.proj_detail_main_type = data.id;
      this.params.proj_detail_main_type_name = data.name;
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.proj_detail_main_name = val;
      this.currentPage = 1;
      this.getList();
    },
    uploadproject() {
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.params.proj_detail_main_organ =
          this.listQuery.proj_detail_main_organ;
        this.params.proj_detail_main_type_name = this.projectList[0].name;
        this.params.proj_detail_main_type = this.projectList[0].id;
      });
    },
    uploadproject1() {
      this.$refs.dialog2.show();
      this.$nextTick(() => {
        this.params.proj_detail_main_organ =
          this.listQuery.proj_detail_main_organ;
      });
    },
    reuploadprj(data) {
      this.$nextTick(() => {
        if (data.proj_detail_main_type == 1) {
          this.$refs.dialog.show();
        } else {
          this.$refs.dialog2.show();
        }
        this.params.proj_detail_main_organ = data.proj_detail_main_organ;
        this.params.proj_detail_main_type = data.proj_detail_main_type;
        this.params.proj_detail_main_type_name =
          data.proj_detail_main_type_name;
        this.params.proj_detail_main_id = data.proj_detail_main_id;
        this.params.proj_detail_main_name = data.proj_detail_main_name;
      });
    },
    Comdetail(id, type, orgin) {
      this.linkTo("enterprise_engineering_projectList_info", {
        proj_detail_main_ls_id: id,
        proj_detail_main_type: type,
        origin_node: orgin,
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 提交
    async submitFun() {
      if (this.params.proj_detail_main_organ == null) {
        this.$tip({
          isTip: true,
          message: "请选择工程项目!",
        });
        return;
      }
      if (this.params.proj_detail_main_type == null) {
        this.$tip({
          isTip: true,
          message: "请选择章节!",
        });
        return;
      }
      if (this.params.proj_detail_main_name == "") {
        this.$tip({
          isTip: true,
          message: "请输入科目名称!",
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
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      const FD = new FormData();
      for (const key in this.params) {
        FD.append(key, this.params[key]);
      }
      FD.append("uploadFile", this.fileList[0].raw);
      let res = await api.UploadProjDetailListProjDetailMain(FD);
      this.fileList = [];
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          // 更新列表
          this.$refs.dialog.cancel();
          this.$refs.dialog2.cancel();
          this.getList();
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.top-title-abso {
  position: absolute;
  top: -70px;
  left: 0;
  right: 0;
}
.attendance-btn {
  font-size: 14px;
  color: #4f44f1;
}
</style>
