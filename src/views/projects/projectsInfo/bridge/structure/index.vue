<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'导入构件信息表'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>构件信息模板</p>
            <a
              :href="GLOBAL.baseurl + '/MOULD/bridgeBuild_import.xlsx'"
              download="构件信息模板.xlsx"
            >
              <n-button
                class="mt-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <!-- <div class="justify-content-between d-flex   align-items-center">
            <div class="w-100">
              <span class="grey2">所属机构：</span>
              <n-treeselect
                ref="treeselect"
                @getSelectNode="val => getSelectValue(val, 1)"
                :treeData="treeData2"
                :Isvalue="true"
                :value="ruleform.attendance_wage_organ_id_union"
              />
            </div>
          </div> -->
          <div class="justify-content-between d-flex align-items-center mt-2">
            <div class="justify-content-start d-flex align-items-center w-100">
              <span class="grey2">子单位工程：</span>
              <div class="disi rounded-1 time-choose-single-box">
                <el-select v-model="ruleform.sub_unit_id" placeholder="请选择">
                  <el-option
                    :label="item.sub_unit_name"
                    :value="item.sub_unit_id"
                    v-for="item in subunitData"
                    :key="item.sub_unit_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
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
              :btnText="'导入构件信息表'"
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
    <div class="container-div-s">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block ml-2">
            <span class="grey2">子单位工程：</span>
            <el-select
              v-model="listQuery.build_sub_unit"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                :label="item.sub_unit_name"
                :value="item.sub_unit_id"
                v-for="item in subunitData"
                :key="item.sub_unit_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">部位类型：</span>

            <el-select
              v-model="listQuery.build_type"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="(item, i) in buildTypeArr"
                :key="i"
                :label="item"
                :value="i + 1"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="['BridgeBuild-upload']"
              @buttonClick="importFun"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
            <!-- <n-button
              class="ml-2"
              :btnText="'新增'"
              v-permission="['BridgeBuild-upload']"
              @buttonClick="
                $router.linkTo('project_projectsInfo_bridge_structure_handle')
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button> -->
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
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          prop="sub_unit_name"
          label="子单位工程"
        ></el-table-column>
        <el-table-column prop="build_type" label="部位类型">
          <template slot-scope="scope">
            {{ buildTypeArr[scope.row.build_type - 1] }}
          </template>
        </el-table-column>
        <el-table-column prop="build_number" label="构件编号"></el-table-column>
        <el-table-column prop="bridge_build_num" label="长度(m)或面积(㎡)">
          <template slot-scope="scope">
            {{ scope.row.bridge_build_num.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" width="140">
          <template slot-scope="scope">
            <!-- <i
              v-permission="['BridgeBuild-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo('project_projectsInfo_bridge_structure_handle', {
                  id: scope.row.build_id,
                })
              "
            ></i> -->
            <i
              v-permission="['BridgeBuild-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(false, scope.row, 'build_id', 'delBridgeBuild')
              "
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
      postURL: "queryBridgeBuild", //表格请求接口
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        build_sub_unit: 0,
        build_type: 0, //构件类型
      },
      ruleform: { sub_unit_id: null },
      buildTypeArr: [
        "桩基",
        "系梁",
        "承台",
        "墩柱",
        "盖梁",
        "台身",
        "现浇段",
        "预制梁:梁板架设",
        "钢箱梁",
        "耳墙",
        "台帽",
        "扩大基础",
        "湿接缝",
        "预制板",
        "斜拉索",
        "拱圈",
        "牛腿背墙",
        "肋板",
      ],
      unitData: [], //桥梁单位工程
      subunitData: [], //桥梁子单位工程
      fileList: [],
      partArr: [], //部位类型
    };
  },
  mounted() {
    // 查询子单位工程
    this.queryBridgeSubUnit();
    // this.queryBridgeUnitProject();
  },
  methods: {
    //   点击导入
    importFun() {
      this.ruleform.sub_unit_id = null;
      this.fileList = [];
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      if (!this.ruleform.sub_unit_id) {
        this.$tip({
          isTip: true,
          message: "请选择子单位工程",
        });
        return;
      }
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入构件信息表",
        });
        return;
      }
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let param = {};
      param.sub_unit_id = this.ruleform.sub_unit_id;
      param.upload_file = this.fileList[0].raw;
      this.uploadFile([], param, "ImportBridgeBuild").then((res) => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.getList();
            this.$refs.dialog.cancel();
          },
        });
      });
    },
    // 子单位工程
    async queryBridgeSubUnit() {
      let res = await api.queryBridgeSubUnit({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.subunitData = res.result;
    },
    // 单位工程
    async queryBridgeUnitProject() {
      let res = await api.queryBridgeUnitProject({
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1,
      });
      this.unitData = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
