<template>
  <div class="container-all">
    <div class="container-div-s special-work-box1">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">单位工程：</span>
            <el-select
              v-model="listQuery.engineer_info_unit_project_id_un"
              @change="refreshData"
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
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="['TunnelUnitProj-upload']"
              @buttonClick="
                $router.linkTo('project_projectsInfo_tunnel_liningUnit_handle')
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100% - 110px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          prop="engineer_info_build"
          label="部位"
          width="80"
        ></el-table-column>
        <el-table-column label="字目名称" width="150">
          <template slot-scope="{ row }">
            <div class="card-group-left" v-if="row.build_list">
              <div
                class="card-item"
                v-for="(item, index) of row.build_list"
                :key="index"
              >
                {{ item.engineer_info_item_num }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="工程名称" width="300">
          <template slot-scope="{ row }">
            <div class="card-group-left" v-if="row.build_list">
              <div
                class="card-item"
                v-for="(item, index) of row.build_list"
                :key="index"
                :title="item.engineer_info_name"
              >
                {{ item.engineer_info_name.slice(0, 18) }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="{ row }">
            <div class="card-group-left" v-if="row.build_list">
              <div
                class="card-item"
                v-for="(item, index) of row.build_list"
                :key="index"
              >
                {{ item.engineer_info_pcs }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="延米工程量">
          <el-table-column
            :label="ele"
            width="100"
            v-for="ele in cols"
            :key="ele"
          >
            <template slot-scope="{ row }">
              <div class="card-group-left" v-if="row.build_list">
                <div
                  class="card-item"
                  v-for="(item, index) of row.build_list"
                  :key="index"
                >
                  {{ item.lining_list | getNum(ele) }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="材料名称" width="250"> 
          <template slot-scope="{ row }">
            <div class="card-group-left" v-if="row.build_list">
              <div
                class="card-item"
                v-for="(item, index) of row.build_list"
                :key="index"
              >
                {{ item.engineer_info_material_name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格型号">
          <template slot-scope="{ row }">
            <div class="card-group-left" v-if="row.build_list">
              <div
                class="card-item"
                v-for="(item, index) of row.build_list"
                :key="index"
              >
                {{ item.engineer_info_material_spec }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";

export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryTunnelEngineerInfo", //表格请求接口
      listQuery: {
        page: -1,
        engineer_info_unit_project_id_un: null,
      },
      currentPage: 0,
      unitData: [], //单位工程
      cols: [],
      getListBool: false,
    };
  },
  filters: {
    getNum(list, key) {
      let obj = list.find((item) => item.engineer_lining == key);
      return obj ? obj.engineer_lining_num : "";
    },
  },
  watch: {
    tableData(val) {
      this.cols = val[0] ? val[0].lining_col : [""];
    },
  },
  async activated() {
    this.queryTunnelUnitProj();
    this.getList();
  },
  methods: {
    //删除事件
    async queryTunnelUnitProj() {
      let { result } = await api.queryTunnelUnitProj({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = result;
      this.listQuery.engineer_info_unit_project_id_un = this.unitData[0].unit_proj_id;
    },
  },
};
</script>

<style lang="scss" scoped></style>
