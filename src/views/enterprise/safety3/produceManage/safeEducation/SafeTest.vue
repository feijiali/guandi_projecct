<template>
  <div class="container-all position-relative">
    <SaTDetail ref="detailDialog" :infoData="infoData" />
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
            <span class="grey2">考核类型：</span>
            <el-select
              v-model="listQuery.examine_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="item in typeArr"
                :key="item.examine_type"
                :label="item.examine_type"
                :value="item.examine_type"
              ></el-option>
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
            v-permission="['SafeExamine-delete']"
            @buttonClick="deleteFun(true, '', 'examine_id', 'delSafeExamine')"
          ></n-button>
          <n-button
            v-if="isShow"
            class="ml-1"
            :btnText="'新增'"
            v-permission="['SafeExamine-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_safety3_produceManage_safeEducation_HandleSafeTest'
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
          label="工区"
          align="center"
          prop="organ"
        ></el-table-column>
        <el-table-column
          label="考核主题"
          align="center"
          prop="examine_name"
        ></el-table-column>
        <el-table-column
          label="考核时间"
          align="center"
          prop="examine_time"
        ></el-table-column>
        <el-table-column
          label="考核对象"
          align="center"
          prop="parters"
        ></el-table-column>
        <el-table-column
          label="考核类型"
          align="center"
          prop="examine_type"
        ></el-table-column>
        <el-table-column label="操作" v-if="isShow" align="center" width="120">
          <template slot-scope="scope">
            <i
              v-permission="['SafeExamine-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_safety3_produceManage_safeEducation_HandleSafeTest',
                  {
                    id: scope.row.examine_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['SafeExamine-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'examine_id', 'delSafeExamine')
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
import SaTDetail from "./components/SaTDetail";
export default {
  components: {
    SaTDetail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "querySafeExamine",
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        examine_start: "",
        examine_end: "",
        examine_type: "",
        organ_node: this.$organ_id_en_or_pro(this),
        organ_id: 0,
      }, //筛选条件
      //所属标段
      organArr: [],
      typeArr: [], //类型
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
    // 查询所属标段
    this.queryType();
    // 查询考核类型
    this.querySafeExamineType();
  },
  methods: {
    //查询详情
    async rowclick(row) {
      let res = await api.querySafeExamine({
        examine_id: row.examine_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    async querySafeExamineType() {
      let data = await api.querySafeExamineType({});
      this.typeArr = data.result;
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.examine_start = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.examine_end = this.dateRange ? this.dateRange[1] : "";
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
