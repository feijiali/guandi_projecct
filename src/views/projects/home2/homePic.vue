<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'现场资料'" />
    </div>
    <div class="rounded-1 bg-white table-list-wrap flex-fill">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">资料类型：</span>
            <el-select
              v-model="listQuery.module_eng_union"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                label="质量巡检"
                :value="'QuantityDailyInspection'"
              ></el-option>
              <el-option
                label="安全巡检"
                :value="'SafeDailyInspection'"
              ></el-option>
              <el-option
                label="工序检查"
                :value="'ConcealedWorkAcceptance'"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">日期：</span>
            <el-date-picker
              @change="refreshData"
              v-model="dateRange"
              type="monthrange"
              format="yyyy-MM"
              value-format="yyyy-MM"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :clearable="false"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <template v-if="tableData.length">
        <div class="flex-fill">
          <n-scroll>
            <div class="home-pic-box d-flex flex-wrap">
              <div
                class="rounded-1 home-pic-box-item position-relative cursor-p"
                v-for="item in tableData"
                :key="item.site_info_id"
                :style="{ backgroundImage: 'url(' + item.url + ')' }"
              >
                <viewer
                  :images="[item.url]"
                  class="lookPic d-inline-block w-100 h-100"
                >
                  <img
                    :src="items"
                    alt
                    v-for="(items, indexs) in [item.url]"
                    :key="indexs + 'image'"
                    class="layer-info-img w-100 h-100"
                  />
                </viewer>
                <div class="home-pic-foot clear position-absolute font-14">
                  <span class="float-left font-14"
                    >上传人：{{ item.account_name }}</span
                  >
                  <span class="float-right font-14">{{
                    item.site_info_date
                  }}</span>
                </div>
              </div>
              <template v-if="tableData.length % row > 0">
                <div
                  class="list"
                  v-for="(item, index) in row - (tableData.length % row)"
                  :key="index + 's'"
                ></div>
              </template>
            </div>
          </n-scroll>
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
      </template>
      <n-nodata
        v-else
        class="nodata d-flex align-items-center flex-column"
        style="height: calc(100% - 110px)"
      ></n-nodata>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
import table from "@/mixins/table";
export default {
  mixins: [table],
  data() {
    return {
      postURL: "queryFilesSiteInfo",
      row: 5,
      dateRange: [],
      picList: [], //所有图片
      listQuery: {
        page: 0,
        page_size: 20,
        module_eng_union: "",
        organ_node: this.$organ_id_en_or_pro(this),
      }, //筛选条件
    };
  },
  // watch: {
  //   tableData(val) {
  //     this.picList=this.tableData.map(item=>item.url)
  //   },
  // },
  methods: {
    // 筛选条件后重新请求数据
    refreshData(name) {
      if (this.dateRange.length) {
        this.listQuery.site_info_start = this.dateRange[0] + "-01";
        this.listQuery.site_info_end =
          this.dateRange[1] + "-" + this.$utils.getMonthDays(this.dateRange[1]);
      }
      this.currentPage = 1;
      this.getList();
    },
    backFun() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped lang="scss">
.home-pic-box {
  padding: 0 20px;

  .home-pic-box-item {
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 19%;
    height: 200px;
    margin-right: 10px;
    margin-bottom: 20px;
    border-radius: 10px;

    .home-pic-foot {
      bottom: 0;
      width: 100%;
      color: white;
      padding: 10px;
      border-radius: 0 0 10px 10px;
      background: linear-gradient(
        -180deg,
        rgba(22, 15, 106, 0.2) 0%,
        rgba(22, 15, 106, 0.6) 70%
      );
    }
  }

  .list {
    width: 19%;
  }
}
</style>
