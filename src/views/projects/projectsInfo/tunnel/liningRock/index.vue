<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'导入围岩衬砌表'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>围岩衬砌模板</p>
            <a
              :href="GLOBAL.baseurl + '/MOULD/tunnelRock_import.xlsx'"
              download="围岩衬砌模板.xlsx"
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
              <span class="grey2">单位工程：</span>
              <div class="disi rounded-1 time-choose-single-box">
                <el-select
                  v-model="ruleform.unit_proj_id_union"
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.unit_proj_name"
                    :value="item.unit_proj_id"
                    v-for="item in unitData"
                    :key="item.unit_proj_id"
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
              :btnText="'导入围岩衬砌表'"
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
            <span class="grey2">单位工程：</span>
            <el-select
              v-model="listQuery.unit_proj_id_union"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                :label="item.unit_proj_name"
                :value="item.unit_proj_id"
                v-for="item in unitData"
                :key="item.unit_proj_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">衬砌类型：</span>
            <el-select
              v-model="listQuery.lining_type"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, i) in rockAndLiningArr"
                :key="i"
                :label="item.lining_type"
                :value="item.lining_type"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">围岩等级：</span>
            <el-select
              @change="refreshData"
              v-model="listQuery.rock"
              placeholder="请选择"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="item in rockArr"
                :key="item.rock"
                :label="item.rock"
                :value="item.rock"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="['TunnelUnitProj-upload']"
              @buttonClick="importFun"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
            <!-- <n-button
              class="ml-2"
              :btnText="'新增'"
              v-permission="['TunnelUnitProj-upload']"
              @buttonClick="
                $router.linkTo('project_projectsInfo_tunnel_liningRock_handle')
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
        <el-table-column
          prop="unit_proj_name"
          label="单位工程"
        ></el-table-column>
        <el-table-column prop="rock_pile_start_string" label="起始桩号">
          <template slot-scope="scope">
            {{ scope.row.rock_pile_prefix + scope.row.rock_pile_start_string }}
          </template>
        </el-table-column>
        <el-table-column prop="rock_pile_end_string" label="终止桩号"
          ><template slot-scope="scope">
            {{ scope.row.rock_pile_prefix + scope.row.rock_pile_end_string }}
          </template></el-table-column
        >
        <el-table-column
          label="长度（m）"
          prop="rock_pile_length"
        ></el-table-column>
        <el-table-column prop="lining_type" label="衬砌类型"></el-table-column>
        <el-table-column prop="rock" label="围岩等级"></el-table-column>
        <el-table-column
          prop="tunnel_assist"
          label="辅助工程措施"
        ></el-table-column>
        <el-table-column prop="rock_desc" label="备注"></el-table-column>
        <el-table-column label="操作" header-align="center" width="140">
          <template slot-scope="scope">
            <!-- <i
              v-permission="['TunnelUnitProj-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="
                $router.linkTo(
                  'project_projectsInfo_tunnel_liningRock_handle',
                  {
                    id: scope.row.rock_id,
                  }
                )
              "
            ></i> -->
            <i
              v-permission="['TunnelUnitProj-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(false, scope.row, 'rock_id', 'DelTunnelRock')
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
      postURL: "QueryTunnelRock", //表格请求接口
      listQuery: {
        page: 0,
        page_size: 20,
        unit_proj_id_union: 0,
        organ_node: this.$organ_id_en_or_pro(this),
        lining_type: "", //衬砌类型
        rock: "", //围岩等级
      },
      fileList: [],
      ruleform: { unit_proj_id_union: null },
      unitData: [], //单位工程
      rockAndLiningArr: [], //衬砌类型
      rockArr: [], //围岩等级
    };
  },
  mounted() {
    // 查询衬砌类型
    this.QueryTunnelRockAndLining(2);
    // 查询围岩等级
    this.QueryTunnelRockAndLining(1);
    this.queryTunnelUnitProj();
  },
  methods: {
    async QueryTunnelRockAndLining(val) {
      let res = await api.QueryTunnelRockAndLining({
        query_type: val,
        organ_node: this.listQuery.unit_proj_id_union,
      });
      val == 2 &&
        (this.rockAndLiningArr = res.result.filter((item) => item.lining_type));
      val == 1 && (this.rockArr = res.result.filter((item) => item.rock));
    },
    //   点击导入
    importFun() {
      this.ruleform.unit_proj_id_union = null;
      this.fileList = [];
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      if (!this.ruleform.unit_proj_id_union) {
        this.$tip({
          isTip: true,
          message: "请选择单位工程",
        });
        return;
      }
      if (!this.fileList.length) {
        this.$tip({
          isTip: true,
          message: "请导入围岩衬砌表",
        });
        return;
      }

      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let param = {};
      param.unit_proj_id_union = this.ruleform.unit_proj_id_union;
      param.upload_file = this.fileList[0].raw;
      this.uploadFile([], param, "ImportTunnelRock").then((res) => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$refs.dialog.cancel();
            this.getList();
            // 查询衬砌类型
            this.QueryTunnelRockAndLining(2);
            // 查询围岩等级
            this.QueryTunnelRockAndLining(1);
          },
        });
      });
    },
    // 查询隧道单位工程
    async queryTunnelUnitProj() {
      let res = await api.queryTunnelUnitProj({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = res.result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
