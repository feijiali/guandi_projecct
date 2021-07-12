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
      prop="equipment_lease_standing_book_depart"
    ></el-table-column>
    <el-table-column
      label="自编编号"
      align="center"
      prop="equipment_lease_standing_book_no"
    ></el-table-column>
    <el-table-column
      label="设备名称"
      align="center"
      prop="equipment_lease_standing_book_name"
    ></el-table-column>
    <el-table-column
      label="型号规格"
      align="center"
      prop="equipment_lease_standing_book_spec"
    ></el-table-column>
    <el-table-column
      label="生产厂家"
      align="center"
      prop="equipment_lease_standing_book_factor"
    ></el-table-column>
    <el-table-column
      label="出租公司"
      align="center"
      prop="equipment_lease_standing_book_lease"
    ></el-table-column>
    <el-table-column
      label="价格说明"
      align="center"
      prop="equipment_lease_standing_book_lease_info"
    ></el-table-column>
    <el-table-column
      label="登记姓名"
      align="center"
      prop="equipment_lease_standing_book_username"
    ></el-table-column>
    <el-table-column
      label="登记电话"
      align="center"
      prop="equipment_lease_standing_book_phone"
    ></el-table-column>
    <el-table-column
      label="状态"
      align="center"
      prop="equipment_lease_standing_book_state"
    ></el-table-column>
    <el-table-column
      label="起租日期"
      align="center"
      prop="equipment_lease_standing_book_start_time"
    ></el-table-column>
    <el-table-column
      label="终租日期"
      align="center"
      prop="equipment_lease_standing_book_end_time"
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
          @click.stop="deleteFun(scope.row)"
          v-permission="['EquipmentStandingBook-delete']"
          class="iconfont btn-btn_list_trash trash-icon-btn ml-1"
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
      idKey: "equipment_lease_standing_book_id",
      deleteURL: "DelEquipmentLeaseStandingBook",
    };
  },
};
</script>
