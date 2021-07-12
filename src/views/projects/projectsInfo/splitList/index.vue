<template>
  <div class="container-all position-relative">
    <n-dialog
      ref="dialog"
      :diaTit="'拆分工程量清单导入'"
      :diaWidth="'40%'"
      class="stretch-dialog"
      @beforeClose="beforeClose()"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <span>拆分工程量清单导入模板：</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/projSplitDetailModule.xlsx'"
              download="拆分工程量清单模板.xlsx"
            >
              <n-button
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <el-form ref="ruleform" class="el-form-box" :model="params">
            <el-form-item class="must position-relative" label="章节：">
              <el-select
                v-model="params.proj_detail_split_type_name"
                placeholder="请选择"
                value-key="id"
                @change="selectsplit"
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
                v-model="params.proj_detail_split_name"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="mb-2">
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
                :btnText="'导入拆分工程量清单'"
              />
            </el-upload>
          </div>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              @buttonClick="submitFun"
              :colorBtn="'blue'"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
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
            v-permission="['ProjDetailListProjDetailSplit-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_handle',
                {
                  t: 6,
                  organ_node: listQuery.proj_detail_split_organ,
                  type: 2,
                }
              )
            "
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'上传'"
            v-permission="['ProjDetailListProjDetailSplit-upload']"
            @buttonClick="uploadproject"
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
          prop="proj_detail_split_type_name"
        ></el-table-column>
        <el-table-column
          label="章节名称"
          align="left"
          prop="proj_detail_split_name"
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
              @click.stop="Comdetail(scope.row.proj_detail_split_id)"
              >详情</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailSplit-upload']"
              @click.stop="downloadsplit(scope.row.proj_detail_split_file)"
              >下载</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailSplit-upload']"
              @click.stop="reuploadsplit(scope.row)"
              >重新上传</span
            >
            <span
              class="attendance-btn ml-2"
              v-permission="['ProjDetailListProjDetailSplit-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'proj_detail_split_id',
                  'DelProjDetailListProjDetailSplit'
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
      isShow: this.$route.meta.isProject,
      postURL: "QueryProjDetailListProjDetailSplitList",
      listQuery: {
        page: 0,
        page_size: 20,
        proj_detail_split_organ: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      params: {
        proj_detail_split_organ: this.$organ_id_en_or_pro(this),
        proj_detail_split_type: null,
        proj_detail_split_type_name: "",
        proj_detail_split_id: null,
        proj_detail_split_name: "",
      },
      projectList: [
        // {
        //   id: 1,
        //   name: "总则",
        // },
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
      getListBool: false,
      flag: false,
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    beforeClose() {
      this.params.proj_detail_split_organ = this.$organ_id_en_or_pro(this);
      this.params.proj_detail_split_type = null;
      this.params.proj_detail_split_type_name = "";
      this.params.proj_detail_split_id = null;
      this.params.proj_detail_split_name = "";
      this.fileList = [];
    },
    downloadsplit(data) {
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
      this.params.proj_detail_split_type = data.id;
      this.params.proj_detail_split_type_name = data.name;
    },
    Comdetail(id) {
      this.linkTo("project_projectsInfo_splitList_projectInfo", {
        proj_detail_split_id: id,
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.proj_detail_split_name = val;
      this.currentPage = 1;
      this.getList();
    },
    uploadproject() {
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.params.proj_detail_split_organ =
          this.listQuery.proj_detail_split_organ;
      });
    },
    reuploadsplit(data) {
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.params.proj_detail_split_organ = data.proj_detail_split_organ;
        this.params.proj_detail_split_type = data.proj_detail_split_type;
        this.params.proj_detail_split_type_name =
          data.proj_detail_split_type_name;
        this.params.proj_detail_split_id = data.proj_detail_split_id;
        this.params.proj_detail_split_name = data.proj_detail_split_name;
      });
    },
    // 提交
    async submitFun() {
      if (this.params.proj_detail_split_organ == null) {
        this.$tip({
          isTip: true,
          message: "请选择工程项目!",
        });
        return;
      }
      if (this.params.proj_detail_split_type == null) {
        this.$tip({
          isTip: true,
          message: "请选择章节!",
        });
        return;
      }
      if (this.params.proj_detail_split_name == "") {
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
      let res = await api.UploadProjDetailListProjDetailSplit(FD);
      this.fileList = [];
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          // 更新列表
          this.$refs.dialog.cancel();
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
