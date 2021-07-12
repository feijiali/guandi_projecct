<template>
  <div class="w-100 position-relative h-100">
    <n-scroll>
      <n-button
        class="position-absolute"
        style="right: 0px; top: 0px"
        :btnText="'审批信息'"
        @buttonClick="showDialog"
      >
      </n-button>
      <nInfoTitle title="基本信息" />
      <template>
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
        <nInfoTitle title="材料信息" />
        <el-table class="cursor-p-table mt-2" :data="materialArr"
          ><template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column prop="index" label="序号" width="80">
            <template slot-scope="scope">
              <label>{{ scope.$index + 1 }}</label>
            </template>
          </el-table-column>
          <el-table-column
            label="材料名称"
            prop="material_name"
          ></el-table-column>
          <el-table-column
            label="所在仓库"
            prop="storeroom_name"
          ></el-table-column>
          <el-table-column label="材料类别" v-if="infoData.inventory_type == 1">
            <template slot-scope="scope">
              {{ ["", "原材料", "半成品"][scope.row.material_category] }}
            </template>
          </el-table-column>
          <el-table-column
            label="材料规格"
            prop="material_spec"
          ></el-table-column>
          <el-table-column label="单位" prop="material_unit"></el-table-column>
          <el-table-column
            label="单价(元)"
            prop="loss_material_warehouse_stock_price"
          ></el-table-column>
          <el-table-column
            label="账面应存数量"
            prop="loss_material_warehouse_stock_total_amount"
          ></el-table-column>
          <el-table-column
            label="实际库存"
            prop="loss_material_inventory_amount"
          ></el-table-column>
          <el-table-column
            label="报损数量"
            prop="loss_material_loss_amount"
          ></el-table-column>
          <el-table-column
            label="报损金额(元)"
            prop="loss_material_money"
          ></el-table-column>
          <el-table-column
            label="报损原因"
            prop="loss_material_reason"
          ></el-table-column>
          <el-table-column
            label="备注"
            prop="loss_material_remark"
          ></el-table-column>
        </el-table>
      </template>
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      infoData: {},
      materialArr: [],
      dataInfoList: [
        {
          name: "期号",
          key: "inventory_no",
        },
        {
          name: "类型",
          key: "inventory_type",
          fun: (val) => {
            return ["", "拌合站", "钢材", "其他材料", "拌合站和钢材"][val];
          },
        },
        {
          name: "报损状态",
          key: "revise_info_state",
          fun: (val) => {
            return this.GLOBAL.reviseStateArr[val];
          },
        },
        { name: "报损人", key: "account_name" },
      ],
    };
  },
  methods: {
    showDialog() {
      this.$emit("show");
    },
    //详情
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.QueryLossDesc({
        loss_id: id,
      });
      if (!result[0]) {
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
        this.infoData = result[0];
        this.materialArr = result[0].loss_material_lists;
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
