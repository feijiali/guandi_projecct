<!--
 * @Autor: 邓易
 * @Date: 2020-11-26 18:29:33
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-25 16:33:26
-->
<template>
  <div class="w-100 h-100">
    <n-scroll>
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
          :islong="item.islong ? true : false"
          v-for="(item, index) in dataInfoList"
          :key="index"
        />
        <nPicInfo :picList="infoData.pic_lists" />
        <nFileInfo :fileList="infoData.file_lists" />
        <nInfoTitle title="设备信息" />
        <el-table
          class="cursor-p-table flex-fill mt-2"
          :data="infoData.lease_details"
          ><template slot="empty">
            <span>真是不巧，暂时没有数据呢~</span>
          </template>
          <el-table-column prop="index" label="序号" width="80">
            <template slot-scope="scope">
              <label>{{ scope.$index + 1 }}</label>
            </template>
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="lease_detail_name"
          ></el-table-column>
          <el-table-column
            label="设备型号"
            prop="lease_detail_spec"
          ></el-table-column>
          <el-table-column
            label="设备品牌"
            prop="lease_detail_bound"
          ></el-table-column>
          <el-table-column
            label="预算单价(元)"
            prop="lease_detail_price"
          ></el-table-column>
          <el-table-column
            label="需求数量"
            prop="lease_detail_num"
          ></el-table-column>
          <el-table-column
            label="金额(元)"
            prop="lease_detail_money"
          ></el-table-column>
          <el-table-column label="是否加急">
            <span slot-scope="scope">
              {{ ["", "加急", "不加急"][scope.row.lease_detail_is_urgent] }}
            </span>
          </el-table-column>
          <el-table-column
            label="计划使用时间"
            prop="lease_detail_plan_use_time"
            width="150"
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
      infoData: null,
      dataInfoList: [
        {
          name: "设备类型",
          key: "lease_type",
          fun: (val) => {
            return ["", "普通设备", "特种设备"][val];
          },
        },
        {
          name: "付款方式",
          key: "lease_pay_method",
          fun: (val) => {
            return ["", "现金", "挂账"][val];
          },
        },
        { name: "工程项目", key: "organ_area" },
        { name: "供应商", key: "supply_unit" },
        { name: "发起单位", key: "launch_organ" },
        { name: "备注", key: "lease_remark", islong: true },
      ],
    };
  },
  methods: {
    //详情
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.QueryLease({
        lease_id: id,
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
