<template>
  <div class="container-all position-relative">
    <PreDetail ref="detailDialog" :infoData="infoData" />
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">工程项目：</label>
            <el-select
              v-model="listQuery.organ_node"
              @change="change"
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
          <div class="d-inline-block ml-2">
            <span class="grey2">工区：</span>
            <el-select
              v-model="listQuery.organ_id"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="item in organArr"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
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
        </div>
        <div>
          <n-button
            class="ml-1"
            v-if="isShow"
            :btnText="'批量删除'"
            v-permission="['SafeEducation-delete']"
            @buttonClick="
              deleteFun(true, '', 'education_id', 'delSafeEducation')
            "
          ></n-button>
          <n-button
            class="ml-1"
            v-if="isShow"
            :btnText="'新增'"
            v-permission="['SafeEducation-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_safety3_produceManage_safeEducation_HandlePreEducation'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 50px)"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          type="selection"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column prop="index" label="序号" align="center" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="教育主题"
          align="center"
          prop="education_theme"
        ></el-table-column>
        <el-table-column
          label="教育对象"
          align="center"
          prop="education_target"
        ></el-table-column>
        <el-table-column
          label="教育者"
          align="center"
          prop="account_name"
        ></el-table-column>
        <el-table-column label="教育时间" align="center" prop="education_time">
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="isShow" width="120">
          <template slot-scope="scope">
            <i
              @click.stop="
                $router.linkTo(
                  'enterprise_safety3_produceManage_safeEducation_HandlePreEducation',
                  {
                    id: scope.row.education_id,
                  }
                )
              "
              v-permission="['SafeEducation-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['SafeEducation-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'education_id', 'delSafeEducation')
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
import PreDetail from "./components/PreDetail";
export default {
  components: {
    PreDetail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "querySafeEducation",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_id: 0,
        education_start: "",
        education_end: "",
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
      //所属机构
      organArr: [],
      dateRange: [], //日期范围
      infoData: { video_list: [], pic_list: [], file_list: [] }, //详情
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {
    // this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    this.queryType();
  },

  methods: {
    //查询详情
    async rowclick(row) {
      let res = await api.querySafeEducation({
        education_id: row.education_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.education_start = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.education_end = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    change(val) {
      this.listQuery.organ_node = val;
      this.queryType();
      this.listQuery.organ_id = 0,
      this.currentPage = 1;
      this.getList();
    },
    // 查询项目下的工区
    async queryType() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.listQuery.organ_node,
      });
      this.organArr = res.result;
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
