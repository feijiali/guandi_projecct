
<template>
  <div class="w-100 h-100 d-flex flex-column position-relative">
    <Detail ref="detailDialog" :infoData="infoData" :title="title" />
    <div
      class="position-relative news-box bg-white rounded-1 mb-1"
      v-if="$route.name.includes('wisdom_party_construction')"
    >
      <ul class="rounded-1 nav-bar d-flex">
        <li
          class="nav-item cursor-p"
          @click="switchMenu(index)"
          :class="[active == index ? 'active' : '']"
          v-for="(item, index) in menuArr"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="bg-white rounded-1 flex-fill d-flex flex-column">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <label class="text-secondary">工程项目：</label>
            <el-select
              @change="refreshData"
              v-model="listQuery.organ_node"
              placeholder="请选择"
            >
              <el-option
                label="全部"
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
          <div class="d-inline-block ml-2" v-if="active == 0">
            <label class="text-secondary">党建管理子类型：</label>
            <el-select
              v-model="listQuery.faction_manage_three_type"
              placeholder="请选择"
              @change="chooseMenu"
            >
              <el-option
                :label="item"
                :value="index + 1"
                v-for="(item, index) in subMenuArr"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">日期：</label>
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
            v-permission="['UnionPartyFactionManage-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="
              deleteFun(
                true,
                '',
                'faction_manage_id',
                'delUnionPartyFactionManage'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartyFactionManage-export']"
            class="ml-2"
            :btnText="'导出'"
            @buttonClick="
              $utils.handleExport(
                'exportUnionPartyFactionManage',
                listQuery,
                menuArr[Number(listQuery.faction_manage_two_type) - 1] + '表'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['UnionPartyFactionManage-upload']"
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="linkTo"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        ref="table"
        class="cursor-p-table"
        style="width: 100%"
        height="100%"
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope" width="80">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="工程项目" prop="organ"></el-table-column>
        <el-table-column
          label="标题"
          prop="faction_manage_title"
        ></el-table-column>
        <el-table-column label="发布人" prop="account_name"></el-table-column>
        <el-table-column
          label="发布时间"
          prop="faction_manage_release_time"
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <i
              v-permission="['UnionPartyFactionManage-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['UnionPartyFactionManage-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'faction_manage_id',
                  'delUnionPartyFactionManage'
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
import Detail from "./components/Detail";

export default {
  components: {
    Detail,
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryUnionPartyFactionManageList", //表格请求接口
      active: 0,
      menuArr: [
        "三会一课",
        "党建主题活动",
        "企地联建共建",
        "主题党日活动",
        "组织生活会",
        "民主评议党员",
        "公司领导班子成员",
        "党建联系点工作",
      ],
      subMenuArr: ["党员大会", "支部委员会", "党小组会", "党课"],
      listQuery: {
        page: 0,
        page_size: 20,
        start_time: "",
        end_time: "",
        faction_manage_type: 1,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      dateRange: [],
      infoData: { pic_list: [], video_list: [], file_list: [] }, //详情
      manageTypes: {},
      manageTypes1: {
        enterprise_wisdom_party_construction: {
          type: 1,
          name: "组织建设",
        },
        enterprise_wisdom_party_propaganda: {
          type: 2,
          name: "宣传工作",
        },
        enterprise_wisdom_party_unionWork: {
          type: 3,
          name: "工会工作",
        },
        enterprise_wisdom_party_triple: {
          type: 4,
          name: "三重一大",
        },
      },
      manageTypes2: {
        project_wisdom_party_construction: {
          type: 1,
          name: "组织建设",
        },
        project_wisdom_party_propaganda: {
          type: 2,
          name: "宣传工作",
        },
        project_wisdom_party_unionWork: {
          type: 3,
          name: "工会工作",
        },
        project_wisdom_party_triple: {
          type: 4,
          name: "三重一大",
        },
      },
      type: this.$route.name.includes("project") ? 2 : 1,
      title: "",
      getListBool: false,
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  created() {
    // this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    this.paramsFun();
  },
  watch: {
    "$route.name": {
      handler: function (val, oldval) {
        // 四个页面切换需要监听 路由的变化
        if (val !== oldval) {
          this.listQuery.organ_node = this.$organ_id_en_or_pro(this);
          this.listQuery.start_time = "";
          this.listQuery.end_time = "";
          if (!val.includes("wisdom_party_construction")) {
            delete this.listQuery.faction_manage_three_type;
            delete this.listQuery.faction_manage_two_type;
          }
          this.paramsFun();
        }
      },
    },
  },
  methods: {
    paramsFun() {
      this.manageTypes = this[
        "manageTypes" + (this.$route.name.includes("project") ? 2 : 1)
      ];
      let name = this.$route.name;
      let t = name.includes("project") ? 2 : 1;
      this.listQuery.faction_manage_type = this["manageTypes" + t][name].type;
      if (this.$route.query.t1) {
        this.active = Number(this.$route.query.t1) - 1;
        this.listQuery.faction_manage_two_type = Number(this.$route.query.t1);
        this.listQuery.faction_manage_three_type = Number(this.$route.query.t2);
      } else {
        this.active = 0;
        this.listQuery.faction_manage_type == 1 &&
          (this.listQuery.faction_manage_two_type = 1);
        this.listQuery.faction_manage_two_type == 1 &&
          (this.listQuery.faction_manage_three_type = 1);
      }
      this.getList();
    },
    // 切换组织建设菜单
    switchMenu(ind) {
      this.active = ind;
      this.listQuery.organ_node = this.$organ_id_en_or_pro(this);
      this.listQuery.faction_manage_two_type = this.active + 1;
      this.active > 0 && delete this.listQuery.faction_manage_three_type;
      this.active == 0 && (this.listQuery.faction_manage_three_type = 1);
      this.refreshData();
    },
    // 选择党建管理-子类型
    chooseMenu(val) {
      this.listQuery.faction_manage_two_type == 1 &&
        (this.listQuery.faction_manage_three_type = val);
      this.refreshData();
    },
    async rowclick(row) {
      let res = await api.queryUnionPartyFactionManage({
        faction_manage_id: row.faction_manage_id,
      });
      this.infoData = res.result[0];
      this.title = this.listQuery.faction_manage_three_type
        ? this.subMenuArr[Number(this.listQuery.faction_manage_three_type) - 1]
        : this.listQuery.faction_manage_two_type
        ? this.menuArr[Number(this.listQuery.faction_manage_two_type) - 1]
        : this.manageTypes[this.$route.name].name;
      this.$refs.detailDialog.show();
    },
    linkTo() {
      // let params =this.listQuery.faction_manage_two_type == 1? {t: this.listQuery.faction_manage_two_type,t2: this.listQuery.faction_manage_three_type,}: { t: this.listQuery.faction_manage_two_type };
      let params = {
        t1: this.listQuery.faction_manage_two_type,
        t2: this.listQuery.faction_manage_three_type,
      };
      this.$router.linkTo(this.$route.name + "_handle", params);
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
      this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      this.currentPage = 1;
      this.getList();
    },
    handleUpdate(row) {
      let params =
        this.listQuery.faction_manage_two_type == 1
          ? {
              t: this.listQuery.faction_manage_two_type,
              t2: this.listQuery.faction_manage_three_type,
            }
          : { t: this.listQuery.faction_manage_two_type };
      this.$router.linkTo(this.$route.name + "_handle", {
        id: row.faction_manage_id,
        ...params,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content-arc ::v-deep img {
  max-width: 100%;
}
</style>
