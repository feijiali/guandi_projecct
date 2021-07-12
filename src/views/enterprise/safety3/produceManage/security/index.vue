<template>
  <div class="container-all">
    <Detail ref="detailDialog" :infoData="infoData" />
    <div class="container-div clear">
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
            <span class="grey2">文件类型：</span>
            <el-select
              @change="refreshData"
              class="el-select"
              ref="select"
              v-model="listQuery.drill_file_type"
              placeholder="请选择/输入"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="演练图片" :value="1"></el-option>
              <el-option label="演练视频" :value="2"></el-option>
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
          <n-search
            class="ml-2"
            ref="serch"
            :isInput="true"
            :placeholder="'请输入关键字搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-if="isShow"
            v-permission="['SafeDrill-delete']"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(true, '', 'drill_id', 'delSafeDailyInspection')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-if="isShow"
            class="ml-1"
            :btnText="'新增'"
            v-permission="['SafeDrill-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_safety3_produceManage_security_Handlesecurity'
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
        ref="table"
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 100px)"
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
        <el-table-column prop="index" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          label="工区"
          align="center"
          prop="organ"
        ></el-table-column>
        <el-table-column
          label="文件名称"
          align="center"
          prop="drill_file_name"
        ></el-table-column>
        <el-table-column
          label="上传人"
          align="center"
          prop="account_name"
        ></el-table-column>
        <el-table-column label="文件类型" align="center">
          <template slot-scope="scope">{{
            ["", "演练图片", "演练视频"][scope.row.drill_file_type]
          }}</template>
        </el-table-column>
        <el-table-column
          label="上传时间"
          align="center"
          prop="drill_sub_time"
        ></el-table-column>
        <el-table-column label="操作" align="center" v-if="isShow" width="80">
          <template slot-scope="scope">
            <i
              v-permission="['SafeDrill-update']"
              @click.stop="
                $router.linkTo(
                  'enterprise_safety3_produceManage_security_Handlesecurity',
                  {
                    id: scope.row.drill_id,
                  }
                )
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['SafeDrill-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'drill_id',
                  'delSafeDailyInspection'
                )
              "
              class="
                iconfont
                btn-btn_list_trash
                trash-icon-btn
                ml-2
                table-trash-icon
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
import Detail from "./components/Detail";
export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "querySafeDrillList", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        start_time: "",
        end_time: "",
        drill_file_type: 0,
      },
      dateRange: [],
      infoData: {
        video_list: [],
        pic_list: [],
      },
      tableData: [],
      deleData: {}, //删除的id
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {},
  methods: {
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    change(val) {
      this.listQuery.organ_node = val;
      this.currentPage = 1;
      this.getList();
    },
    async rowclick(row) {
      let res = await api.querySafeDrill({ drill_id: row.drill_id });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    searchFun(val) {
      this.listQuery.search = val;
      this.refreshData();
    },
  },
};
</script>

<style lang="scss"></style>
