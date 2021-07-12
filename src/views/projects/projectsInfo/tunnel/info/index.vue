<template>
  <div class="container-all">
    <div class="container-div-s">
      <div class="top-select-box">
        <div></div>
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'新增'"
              v-permission="['TunnelUnitProj-upload']"
              @buttonClick="
                $router.linkTo('project_projectsInfo_tunnel_info_handle')
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        row-key="key"
        :tree-props="{ children: 'sub_unit_proj_list' }"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          width="200"
          prop="unit_proj_name"
          label="单元工程名称"
        ></el-table-column>
        <el-table-column prop="organ" label="工区">
          <template slot-scope="scope">
            {{ scope.row.sub_unit_proj_list ? "" : scope.row.organ }}
          </template>
        </el-table-column>
        <el-table-column prop label="起始桩号">
          <template slot-scope="scope">
            <span>
              {{ scope.row.unit_proj_pile_prefix
              }}{{ scope.row.unit_proj_pile_start_string }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop label="终止桩号">
          <template slot-scope="scope">
            <span>
              {{ scope.row.unit_proj_pile_prefix
              }}{{ scope.row.unit_proj_pile_end_string }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="长度（米）">
          <template slot-scope="scope">
            <span>{{ Math.abs(scope.row.unit_proj_pile_length) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit_proj_start"
          label="开工时间"
        ></el-table-column>
        <el-table-column
          prop="unit_proj_end"
          label="完工时间"
        ></el-table-column>
        <el-table-column
          prop="unit_proj_duration"
          label="工期（月）"
        ></el-table-column>
        <el-table-column label="操作" header-align="center" width="240">
          <template slot-scope="scope">
            <i
              v-permission="['TunnelUnitProj-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
              @click.stop="handleEdit(scope.row)"
            ></i>
            <i
              v-permission="['TunnelUnitProj-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="handleDelete(scope.row)"
            ></i>
            <div @click.stop class="d-inline-block">
              <nStatusButton
                class="ml-2"
                v-if="scope.row.sub_unit_proj_list"
                v-permission="['TunnelUnitProj-upload']"
                @buttonClick="addSubUnit(scope.row)"
                :changeColor="'#3377FF'"
                :btnText="'添加'"
              />
            </div>
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryTunnelUnitAndSubUnit", //表格请求接口
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      dateRange: [],
    };
  },
  watch: {
    tableData(val) {
      this.tableData.forEach((item, index) => {
        item.key = Math.random();
        item.sub_unit_proj_list.forEach((items, indexs) => {
          items.key = Math.random();
          items.parentIndex = index;
        });
      });
    },
  },
  methods: {
    handleEdit(row) {
      if (row.sub_unit_proj_list) {
        this.$router.linkTo("project_projectsInfo_tunnel_info_handle", {
          id: row.unit_proj_id,
        });
      } else {
        let parentRow = this.tableData[row.parentIndex];
        this.$router.linkTo("project_projectsInfo_tunnel_info_handleSubunits", {
          sub_id: row.unit_proj_id,
          id: parentRow.unit_proj_id,
        });
      }
    },
    addSubUnit(row) {
      this.$router.linkTo("project_projectsInfo_tunnel_info_handleSubunits", {
        id: row.unit_proj_id,
        name: row.unit_proj_pile_prefix,
      });
    },
    //删除事件
    handleDelete(row) {
      this.confirm().then(() => {
        if (row.sub_unit_proj_list) {
        }
        let url = row.sub_unit_proj_list
          ? "DelTunnelUnitProj"
          : "DelTunnelSubUnitAndBuildPart";
        let params = {};
        if (row.sub_unit_proj_list) {
          params.unit_proj_id = row.unit_proj_id;
        } else {
          params.sub_unit_id = row.unit_proj_id;
        }
        api[url](params).then(() => {
          this.getList();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
