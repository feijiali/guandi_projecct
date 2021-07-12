<template>
  <div class="container-all position-relative">
    <n-dialog
      ref="import"
      :diaTit="'导入分项工程量清单'"
      :diaWidth="'500px'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <span>分项工程量清单导入模板：</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/projDiffModule.xlsx'"
              download="分项工程量清单.xlsx"
            >
              <n-button
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
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
                :btnText="'导入分项工程量清单'"
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
            <label class="text-secondary">编制范围：</label>
            <el-select
              class="select-long"
              v-model="listQuery.proj_detail_diff_range"
              @change="change"
              placeholder="请选择"
            >
              <el-option
                v-for="item in formationArr"
                :key="item.proj_detail_diff_range"
                :label="item.proj_detail_diff_range"
                :value="item.proj_detail_diff_range"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <n-search
              ref="serch"
              style="width: 330px"
              :isInput="true"
              :placeholder="'请输入项目细目号/工程或费用名称搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
          <n-button
            :btnText="'变更新增'"
            v-permission="['ProjDetailListProjDetailDiff-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_handle',
                {
                  t: 6,
                  organ_node: listQuery.proj_detail_diff_organ,
                  range: listQuery.proj_detail_diff_range,
                  type: 3,
                }
              )
            "
          ></n-button>
          <n-button
            class="ml-1"
            :btnText="'上传'"
            v-permission="['ProjDetailListProjDetailDiff-upload']"
            @buttonClick="handleImport"
          >
          </n-button>
          <n-button
            class="ml-1"
            :btnText="'下载'"
            v-permission="['ProjDetailListProjDetailDiff-export']"
            @buttonClick="downloadsub"
          ></n-button>
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
          label="项目细目号"
          align="center"
          prop="proj_detail_diff_item"
        ></el-table-column>
        <el-table-column
          label="项目子目号"
          align="center"
          prop="proj_detail_diff_num"
        ></el-table-column>
        <el-table-column
          label="工程或费用名称"
          align="left"
          prop="proj_detail_diff_name"
        ></el-table-column>
        <el-table-column
          label="单位"
          align="center"
          prop="proj_detail_diff_unit"
        >
        </el-table-column>
        <el-table-column
          label="清单数量"
          align="center"
          prop="proj_detail_diff_number"
        >
          <template slot-scope="scope">
            {{
              scope.row.proj_detail_diff_number == "undefined"
                ? ""
                : scope.row.proj_detail_diff_number
            }}
          </template>
        </el-table-column>
        <el-table-column label="设计数量" align="center">
          <el-table-column
            label="数量1"
            align="center"
            prop="proj_detail_diff_number1"
          >
            <template slot-scope="scope">
              {{
                scope.row.proj_detail_diff_number1 == "undefined"
                  ? ""
                  : scope.row.proj_detail_diff_number1
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量2"
            align="center"
            prop="proj_detail_diff_number2"
          >
            <template slot-scope="scope">
              {{
                scope.row.proj_detail_diff_number2 == "undefined"
                  ? ""
                  : scope.row.proj_detail_diff_number2
              }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="单价"
          align="center"
          prop="proj_detail_diff_price"
        >
          <template slot-scope="scope">
            {{
              scope.row.proj_detail_diff_price == "undefined"
                ? ""
                : scope.row.proj_detail_diff_price
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="合价"
          align="center"
          prop="proj_detail_diff_money"
        >
          <template slot-scope="scope">
            {{
              scope.row.proj_detail_diff_money == "undefined"
                ? ""
                : scope.row.proj_detail_diff_money
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="proj_detail_diff_text"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <i
              @click.stop="
                $router.linkTo('enterprise_engineering_subitemList_edit', {
                  id: scope.row.proj_detail_diff_id,
                })
              "
              v-permission="['ProjDetailListProjDetailDiff-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['ProjDetailListProjDetailDiff-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'proj_detail_diff_id',
                  'DelProjDetailListProjDetailDiff',
                  () => {
                    QueryProjDetailListProjDetailDiffHis();
                  }
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
      isShow: this.$route.meta.isProject,
      postURL: "QueryProjDetailListProjDetailDiffList",
      listQuery: {
        page: 0,
        page_size: 20,
        proj_detail_diff_organ: null,
        proj_detail_diff_range: "",
      }, //筛选条件
      formationArr: [],
      ruleform: {
        proj_detail_diff_organ: "",
        uploadFile: {},
      },
      getListBool: false,
      flag: false,
      showbutton: true,
    };
  },
  beforeDestroy() {
    this.$bus.$off("select_list");
  },
  async mounted() {
    this.$router.push({
      query: {
        id:
          this.$route.query.id &&
          Number(this.Base64.decode(this.$route.query.id)),
      },
    });
    this.listQuery.proj_detail_diff_organ = Number(this.$route.query.id);
    if (
      this.listQuery.proj_detail_diff_organ == 0 ||
      this.listQuery.proj_detail_diff_organ == 1 ||
      this.listQuery.proj_detail_diff_organ == 2
    ) {
      this.tableData = [];
      this.showbutton = false;
    } else {
      await this.QueryProjDetailListProjDetailDiffHis();
      this.showbutton = true;
    }
    this.$bus.$on("select_list", (item) => {
      if (item.tag == 0 || item.tag == 1 || item.tag == 2) {
        this.tableData = [];
        this.showbutton = false;
      } else {
        this.listQuery.proj_detail_diff_organ = item.tag;
        this.QueryProjDetailListProjDetailDiffHis();
        this.showbutton = true;
      }
    });
  },

  methods: {
    downloadsub() {
      if (this.flag) {
        return;
      }
      if (this.tableData.length) {
        this.flag = true;
        let a = document.createElement("a");
        a.href = this.tableData[0].proj_detail_diff_file;
        a.click();
        setTimeout(() => {
          this.flag = false;
        }, 2000);
      } else {
        this.$tip({
          isTip: true,
          message: "暂无数据!",
        });
      }
    },
    //查询编制范围
    async QueryProjDetailListProjDetailDiffHis() {
      let { result } = await api.QueryProjDetailListProjDetailDiffHis({
        proj_detail_diff_organ: this.listQuery.proj_detail_diff_organ,
      });
      this.listQuery.proj_detail_diff_range = "";
      this.formationArr = [];
      this.tableData = [];
      if (result.length) {
        this.formationArr = result;
        this.listQuery.proj_detail_diff_range = this.formationArr[0].proj_detail_diff_range;
        this.getList();
      }
    },
    // 提交
    async submitFun() {
      this.ruleform.proj_detail_diff_organ = this.listQuery.proj_detail_diff_organ;
      if (this.ruleform.proj_detail_diff_organ == null) {
        this.$tip({
          isTip: true,
          message: "请选择工程项目!",
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
      for (const key in this.ruleform) {
        FD.append(key, this.ruleform[key]);
      }
      FD.append("uploadFile", this.fileList[0].raw);
      let res = await api.UploadProjDetailListProjDetailDiff(FD);
      this.fileList = [];
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          // 更新列表
          this.$refs.import.cancel();
          this.QueryProjDetailListProjDetailDiffHis();
          this.getList();
        },
      });
    },
    change(val) {
      this.listQuery.proj_detail_diff_range = val;
      this.currentPage = 1;
      this.getList();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.search_key = val;
      this.currentPage = 1;
      this.getList();
    },
    handleImport() {
      this.$refs.import.show();
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
</style>
