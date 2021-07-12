<template>
  <div class="container-all" style="padding-top: 0">
    <div class="rounded-1 bg-secondary">
      <nBackTop title="基础模块表" />
    </div>
    <n-dialog ref="dialog" :diaTit="'基础模块详情'" :diaWidth="'40%'">
      <template slot="diaSlot">
        <div class="mgl10 basic-dialog">
          <p class="detail-item">
            <span class="detail-label">功能名称</span>
            <span>：</span>
            <span class="detail-value">{{ infoData.basis_chn }}</span>
          </p>
          <p class="detail-item mgb10">
            <span class="detail-label">英文名称</span>
            <span>：</span>
            <span class="detail-value">{{ infoData.basis_eng }}</span>
          </p>
        </div>
        <div class="mgl10 basic-dialog">
          <div class="mgb10 f15 fwb">操作行为</div>
          <div>
            <p
              class="detail-item"
              v-for="(item, i) in infoData.action_list"
              :key="i"
            >
              <span class="detail-label">{{ item.basis_action_chn }}</span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span class="detail-value">{{ item.basis_action_eng }}</span>
            </p>
          </div>
        </div>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <n-search
            ref="serch"
            class="d-inline-block search-box"
            :isInput="true"
            :placeholder="'输入名称搜索'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="deleteFun(true, '', 'basis_id', 'delBasisAndAction')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'新增'"
            @buttonClick="$router.linkTo('enterprise_backstage_handle')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cusp-table checkbox-group-box"
        :data="tableData"
        ref="table"
        style="width: 100%"
        height="calc(100% - 80px)"
        @selection-change="handleSelectionChange"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="功能名称" prop="basis_chn"></el-table-column>
        <el-table-column label="英文名称" prop="basis_eng"></el-table-column>
        <el-table-column label="操作行为" prop="account_job">
          <template slot-scope="scope">
            <span
              v-for="(item, i) in scope.row.action_list"
              :key="item.basis_action_id"
            >
              {{ item.basis_action_chn }}
              <span v-if="i < scope.row.action_list.length - 1">、</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              @click.stop="
                $router.linkTo('enterprise_backstage_handle', {
                  id: scope.row.basis_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              @click.stop="
                deleteFun(false, scope.row, 'basis_id', 'delBasisAndAction')
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-show="totalcount > 0"
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
      postURL: "queryBasisAndAction",
      listQuery: {
        page: 0,
        page_size: 20,
      }, //筛选条件
      infoData: {},
      deleData: {}, //删除模块的id
      basis_id: 0, //编辑的id
    };
  },
  methods: {
    searchFun(val) {
      this.listQuery.basis_search = val;
      this.refreshData();
    },
  },
};
</script>
<style lang="scss"></style>
