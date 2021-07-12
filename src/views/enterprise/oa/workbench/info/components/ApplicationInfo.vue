<!--
 * @Autor: 邓易
 * @Date: 2020-11-26 18:29:33
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-28 11:29:46
-->
<template>
  <div class="w-100">
    <nInfoTitle title="基本信息" />
    <template v-if="infoData">
      <nInfoItem
        :class="[index == 0 ? 'mt-2' : '']"
        :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
        :data="{
          name: item.name,
          value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
            unit: item.unit,
        }"
        :lable_width="70"
        :width="'33%'"
        :islong="item.islong"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />
      <nPicInfo :picList="infoData.pic_list" />
      <nFileInfo :fileList="infoData.file_list" />
      <nInfoTitle title="材料信息" />
      <el-table :data="infoData.materials" height="250px" class="mt-2">
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{ scope.$index + 1 }}</label>
          </template>
        </el-table-column>
        <el-table-column label="材料名称" prop="material_name" ></el-table-column>
        <el-table-column
          v-if="infoData.applyment_type == 3"
          label="材料别名"
          prop="material_nick_name"
        ></el-table-column>
        <el-table-column label="材料型号" prop="material_spec" ></el-table-column>
        <el-table-column label="材料单位" prop="material_unit" ></el-table-column>
        <el-table-columnlabel="预算单价(元)" prop="applyment_material_budget_unit_price"></el-table-columnlabel=>
        <el-table-column label="需求数量" prop="applyment_material_amount"></el-table-column>
        <el-table-column  label="金额(元)" prop="applyment_material_price"></el-table-column>
        <el-table-column label="是否加急" >
          <span slot-scope="scope">
            {{ ["", "加急", "不加急"][scope.row.applyment_material_is_urgent] }}
          </span>
        </el-table-column>
        <el-table-column width="130" label="计划使用日期" prop="applyment_material_plan_use_date"></el-table-column>
        <el-table-column width="130" label="是否通过审批">
          <template slot-scope="scope">
            <label v-if="!infoData.revise_account_reviewed_account_ids">正常</label>
                <label class="pink2" v-else-if="infoData.revise_info_state == 4">拒绝</label>
            <label v-else :class="[scope.row.applyment_material_state == 1 ? 'main' : 'pink']">{{
              ["", "通过", "拒绝", "正常"][scope.row.applyment_material_state]
            }}</label>
          </template></el-table-column
        >
        <el-table-column label="供应商" prop="applyment_material_supplier_name" width="100"></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      infoData: { file_list: [], pic_list: [], applyment_type: null },
      dataInfoList: [
        {
          name: "材料类型",
          key: "applyment_type",
          fun: (val) => {
            return ["", "拌合站", "钢材", "其他材料"][val];
          },
        },
        {
          name: "付款方式",
          key: "applyment_pay_type",
          fun: (val) => {
            return ["", "现金", "挂账"][val];
          },
        },
        { name: "工程项目", key: "organ_area" },
        { name: "用途/备注", key: "applyment_remark", islong: true },
      ],
    };
  },
  methods: {
    //详情
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let res = await api.QueryPurchaseApplyment({
        applyment_id: id,
      });
      if (!res.result[0]) {
        this.$tip({
          isTip: true,
          message: "该数据已被删除！",
        });
        setTimeout(() => {
          this.$router.linkTo("enterprise_oa_workbench_commission", {
            t: 1,
          });
        }, 1000);
      } else {
        this.infoData = res.result[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
.detail-item {
  .detail-label {
    width: 70px;
  }
}
</style>
