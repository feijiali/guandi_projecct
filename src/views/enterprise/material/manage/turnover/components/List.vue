<template>
  <el-table
    :data="data"
    ref="table"
    show-summary
    style="width: 100%"
    height="calc(100% - 80px)"
    :row-class-name="tableRowClassName"
  >
    <template slot="empty">
      <span>真是不巧，暂时没有数据呢~</span>
    </template>
    <el-table-column prop="index" align="center" label="序号" width="60">
      <template slot-scope="scope">
        <label class="d-inline-block text-center w-100" style="width: 100%">{{
          (currentPage - 1) * pageSize + (scope.$index + 1)
        }}</label>
      </template>
    </el-table-column>
    <el-table-column label="工程项目" align="center" prop="organ">
    </el-table-column>
    <el-table-column
      label="项目部"
      align="center"
      prop="material_money_standing_book_depart"
    ></el-table-column>
    <el-table-column
      label="原值(元)"
      width="200"
      align="center"
      prop="material_money_standing_book_money"
    ></el-table-column>
    <el-table-column
      label="本期使用费(元)"
      align="center"
      prop="material_money_standing_book_use_money"
    ></el-table-column>
    <el-table-column
      label="本期摊销费(元)"
      align="center"
      prop="material_money_standing_book_amortize_money"
    ></el-table-column>
    <el-table-column
      label="净值(元)"
      align="center"
      prop="material_money_standing_book_worth_money"
    ></el-table-column>
    <el-table-column
      label="备注"
      align="center"
      prop="material_money_standing_book_remark"
    >
      <template slot-scope="scope">
        <div
          class="text-overflow-ellipsis"
          :title="scope.row.material_money_standing_book_remark"
        >
          {{ scope.row.material_money_standing_book_remark }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="82">
      <template slot-scope="scope">
        <i
          @click.stop="editFun(scope.row)"
          class="iconfont btn-btn_list_edit edit-icon-btn"
          v-permission="['MaterialStandingBook-update']"
        ></i>
        <i
          @click.stop="deleteFun(scope.row)"
          class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
          v-permission="['MaterialStandingBook-delete']"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { tableMixin } from "@/mixins/material.js";
export default {
  mixins: [tableMixin],
  data() {
    return {
      idKey: "material_money_standing_book_id",
      deleleURL: "DelMaterialMoneyStandingBook",
    };
  },
};
</script>
<style lang="scss" scoped></style>
