<template>
  <el-table
    :data="data"
    ref="table"
    show-summary
    style="width: 100%"
    height="calc(100% - 80px)"
    :row-class-name="tableRowClassName"
  >
    class="fixed-show"

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
    <el-table-column label="工程项目" align="center" width="160" prop="organ">
    </el-table-column>
    <el-table-column
      label="材料名称"
      align="center"
      width="200"
      prop="material_standing_book_name"
    ></el-table-column>
    <el-table-column
      label="规格型号"
      width="200"
      align="center"
      prop="material_standing_book_spec"
    ></el-table-column>
    <el-table-column
      label="单位"
      width="100"
      align="center"
      prop="material_standing_book_unit"
    ></el-table-column>

    <el-table-column label="上月结存" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_last_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        align="center"
        prop="material_standing_book_last_money"
      ></el-table-column>
    </el-table-column>
    <el-table-column label="本月收入" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_receive_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        align="center"
        prop="material_standing_book_receive_money"
      ></el-table-column> </el-table-column
    ><el-table-column label="本月发出" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_out_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        prop="material_standing_book_out_money"
        align="center"
      ></el-table-column> </el-table-column
    ><el-table-column label="累计收入" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_receive_total_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        align="center"
        prop="material_standing_book_receive_total_money"
      ></el-table-column> </el-table-column
    ><el-table-column label="累计发出" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_out_total_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        align="center"
        prop="material_standing_book_out_total_money"
      ></el-table-column>
    </el-table-column>
    <el-table-column label="本月结存" align="center">
      <el-table-column
        label="数量"
        min-width="100"
        align="center"
        prop="material_standing_book_month_num"
      ></el-table-column>
      <el-table-column
        label="金额(元)"
        min-width="100"
        align="center"
        prop="material_standing_book_month_money"
      ></el-table-column>
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
      idKey: "material_standing_book_id",
      deleleURL: "DelMaterialStandingBook",
    };
  },
};
</script>
<style lang="scss" scoped></style>
