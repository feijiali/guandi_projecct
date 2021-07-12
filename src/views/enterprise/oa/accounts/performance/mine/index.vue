<template>
  <div class="container-all">
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">考核类型：</label>
            <el-select v-model="listQuery.basic_type" @change="basicTypeChange">
              <el-option :value="1" label="年度考核"></el-option>
              <el-option :value="2" label="季度考核"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">年份：</label>
            <el-date-picker
              format="yyyy"
              value-format="yyyy"
              @change="refreshData"
              v-model="listQuery.basic_year"
              type="year"
              placeholder="选择年份"
            >
            </el-date-picker>
          </div>
          <div class="d-inline-block ml-2" v-if="listQuery.basic_type == 2">
            <label class="text-secondary">季度：</label>
            <el-select v-model="listQuery.basic_quarter" @change="refreshData">
              <el-option :value="1" label="第一季度"></el-option>
              <el-option :value="2" label="第二季度"></el-option>
              <el-option :value="3" label="第三季度"></el-option>
              <el-option :value="4" label="第四季度"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="100%"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="考核等级" prop="project">
          <template slot-scope="scope">
            <div>
              <img
                v-if="levelIcon[scope.row.assessor_level]"
                :src="levelIcon[scope.row.assessor_level]"
                alt
                srcset
              />
              <span v-else class="f22"> -- </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="project">
          <template slot-scope="scope">
            <div class="avatar">
              <viewer
                :images="[
                  scope.row.pic_url ? scope.row.pic_url : avatorDefault,
                ]"
                class="lookPic"
              >
                <img
                  class="cusp"
                  :src="pic"
                  v-for="(pic, ides) of [
                    scope.row.pic_url ? scope.row.pic_url : avatorDefault,
                  ]"
                  :key="ides + 'c'"
                />
              </viewer>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="assessor_name"></el-table-column>
        <el-table-column label="部门" prop="organ"></el-table-column>
        <el-table-column label="职位" prop="assessor_job"></el-table-column>
        <el-table-column label="考核截至日期" prop="basic_end_time" width="160">
        </el-table-column>
        <el-table-column label="考核类型" prop="basic_type">
          <template slot-scope="scope">
            {{ ["", "年度", "季度"][scope.row.basic_type] }}
          </template>
        </el-table-column>
        <el-table-column
          label="考核周期"
          prop="performance_basic_type_cycle"
        ></el-table-column>
        <el-table-column
          label="考核负责人"
          prop="performance_basic_principal"
        ></el-table-column>
        <el-table-column
          label="是否完成自我考评"
          prop="assessor_is_self_assess"
        >
          <template slot-scope="scope">
            {{ ["", "是", "否"][scope.row.assessor_is_self_assess] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="project" width="160">
          <template slot-scope="scope">
            <nStatusButton
              v-if="
                (scope.row.assessor_is_self_assess == 2 &&
                  scope.row.assessor_account_id_union ==
                    $store.getters.account_id &&
                  $utils.timeDiff(timeNow, scope.row.basic_end_time, false)) ||
                (scope.row.assessor_is_self_assess == 1 &&
                  scope.row.assessor_account_id_union ==
                    $store.getters.account_id &&
                  $utils.timeDiff(timeNow, scope.row.basic_end_time, false) &&
                  scope.row.assessor_any_assess == 2)
              "
              @buttonClick="linkTo(scope.row)"
              :changeColor="'#fd5571'"
              :btnText="
                scope.row.assessor_is_self_assess == 1 &&
                scope.row.assessor_account_id_union ==
                  $store.getters.account_id &&
                $utils.timeDiff(timeNow, scope.row.basic_end_time, false) &&
                scope.row.assessor_any_assess == 2
                  ? '编辑自评'
                  : '去自评'
              "
            />
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
import api from "@/api/enterprise/oa/account/performance";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import { levelIcon } from "@/constants/imgIcon";
export default {
  mixins: [table, confirm],
  name: "",
  data() {
    return {
      levelIcon,
      postURL: "queryPerformanceAssessorList",
      avatorDefault: require("@/assets/images/bg_mine_grey.png"),
      listQuery: {
        assessor_account_id_union: Number(this.$store.getters.account_id),
        basic_year: this.$utils.getCurrentTime("", "year"),
        basic_quarter: 1,
        page_size: 20,
        page: 0,
        basic_type: 1,
        organ_node: this.$organ_id_en_or_pro(this),
        assessor_is_assess: 0, // 1-是 2-否 是否完成考评
        assessor_level: "", // 考核等级
        order_by: 4, // 1-按分数排序 2-默认
        basic_id:
          this.$route.query.id &&
          parseInt(this.Base64.decode(this.$route.query.id)),
      },
      getListBool: false,
      timeNow: this.$utils.getCurrentTime("", "", "", "sf", "m"),
    };
  },
  async activated() {
    let res = await api.queryPerformanceBasicList({
      organ_node: this.$organ_id_en_or_pro(this),
      page: 0,
      page_size: 1,
      order_by: 2,
    });
    let data = res.result;
    if (data.length) {
      this.listQuery.basic_type = data[0].basic_type;
      this.listQuery.basic_quarter = data[0].basic_quarter;
      this.listQuery.basic_year = data[0].basic_year;
    }
    this.refreshData();
  },
  methods: {
    basicTypeChange() {
      this.listQuery.basic_quarter = this.listQuery.basic_type == 1 ? 0 : 1;
      this.refreshData();
    },
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    linkTo(row) {
      this.$router.linkTo(
        "enterprise_oa_account_performance_mine_assessment",
        row.assessor_any_assess == 2 && row.assessor_is_self_assess == 1
          ? { id: row.assessor_id, edit: true }
          : {
              id: row.assessor_id,
            }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
}
</style>
