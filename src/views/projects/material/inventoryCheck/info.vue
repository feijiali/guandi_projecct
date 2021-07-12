<!--
 * @Autor: 邓易
 * @Date: 2021-01-19 10:07:10
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-04 09:47:16
-->
<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'盘点明细'" />
    </div>
    <div class="rounded-1 bg-white pt-2 flex-fill">
      <el-table class="bdr10" :data="info.inventory_detail" style="width: 100%;" height="calc(100% - 80px)">
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{ scope.$index + 1 }}</label>
          </template>
        </el-table-column>
        <el-table-column label="物资名称" prop="inventory_details_name"></el-table-column>
        <el-table-column label="规格型号" prop="material_information_specification"></el-table-column>
        <el-table-column label="计量单位" prop="material_information_Unit"></el-table-column>
        <el-table-column label="数量" prop="inventory_details_quantity"></el-table-column>
        <el-table-column label="原材料" prop="material_information_name"></el-table-column>
        <el-table-column label="半成品" prop="inventory_details_semi"></el-table-column>
        <el-table-column label="存放地点" prop="inventory_details_location"></el-table-column>
        <el-table-column label="说明" prop="inventory_details_remark"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      examine_id: 0,
      info: [],
    };
  },
  created() {
    this.examine_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.getList();
  },
  methods: {
    async getList() {
      let res = await api.queryMaterialManagementInventoryCheckInfo({
        inventory_check_id: this.examine_id,
      });
      this.info = res.result[0];
    },
  },
};
</script>

<style lang="scss">
.el-button-add-posa {
  position: absolute;
  top: -55px;
  right: 28px;
}
</style>
