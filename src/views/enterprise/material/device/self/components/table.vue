<template>
  <el-table
    :data="tableData"
    ref="table"
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
      prop="equipment_standing_book_depart"
    ></el-table-column>
    <el-table-column
      label="资产编号"
      width="200"
      align="center"
      prop="equipment_standing_book_no"
    ></el-table-column>
    <el-table-column
      label="资产名称"
      align="center"
      prop="equipment_standing_book_name"
    ></el-table-column>
    <el-table-column
      label="型号规格"
      align="center"
      prop="equipment_standing_book_spec"
    ></el-table-column>
    <el-table-column
      label="生产能力"
      align="center"
      prop="equipment_standing_book_level"
    ></el-table-column>
    <el-table-column
      label="生产厂家"
      align="center"
      prop="equipment_standing_book_factor"
    ></el-table-column>
    <el-table-column
      label="出厂编号"
      align="center"
      prop="equipment_standing_book_factor_no"
    ></el-table-column>
    <el-table-column
      label="购置年限"
      align="center"
      prop="equipment_standing_book_year"
    ></el-table-column>
    <el-table-column
      label="停放地点"
      align="center"
      prop="equipment_standing_book_addr"
    ></el-table-column>
    <el-table-column
      label="导入时间"
      align="center"
      prop="equipment_standing_book_date"
    ></el-table-column>
    <el-table-column label="操作" align="center" width="100" fixed="right">
      <template slot-scope="scope">
        <i
          @click.stop="showCode(scope.row)"
          class="iconfont btn-btn_list_code edit-icon-btn"
        ></i>
        <i
          @click.stop="editFun(scope.row)"
          v-permission="['EquipmentStandingBook-update']"
          class="iconfont btn-btn_list_edit edit-icon-btn ml-1"
        ></i>
        <i
          v-permission="['EquipmentStandingBook-delete']"
          @click.stop="deleteFun(scope.row)"
          class="iconfont btn-btn_list_trash trash-icon-btn ml-1 table-trash-icon"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { tableMixin } from "@/mixins/device.js";
export default {
  mixins: [tableMixin],
  data() {
    return {
      idKey: "equipment_standing_book_id",
      deleteURL: "DelEquipmentStandingBook",
    };
  },
};
</script>
