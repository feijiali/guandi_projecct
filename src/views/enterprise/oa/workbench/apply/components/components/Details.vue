<template>
  <el-drawer
    :append-to-body="true"
    :visible.sync="drawer"
    direction="rtl"
    :modal="false"
    size="90%"
    style="height: 100%"
  >
    <template>
      <div class="ml-4 pt-2 d-flex justify-content-between">
        <span class="text-hover-primary font-20 ml-1">供应商详情</span>
      </div>
      <div style="height: calc(100% - 80px)" class="p-2">
        <n-scroll>
          <supply-info :infoData="infoData"></supply-info>
        </n-scroll>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import SupplyInfo from "@/components/SupplyInfo";
import api from "@/api/index";

export default {
  components: {
    SupplyInfo,
  },
  data() {
    return {
      infoData: { pic_list: [], file_list: [] }, //详情
      drawer: false,
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    id: {
      handler: function () {
        this.querydetail();
      },
      deep: true,
    },
  },
  methods: {
    show() {
      this.drawer = true;
    },
    hide() {
      this.drawer = false;
    },
    async querydetail(page, val) {
      let { result } = await api.queryMaterialManagementSupplyUnit({
        supply_unit_id: this.id,
      });
      if (result[0]) {
        //查询地址
        let data = await api.queryInfoMaintainSupplyUnitLocationList({
          supply_unit_location_supply_unit_id_un: this.id,
        });
        //查询经营内容
        let data1 = await api.queryInfoMaintainSupplyUnitBusinessMaterialList({
          supply_unit_business_supply_unit_id_un: this.id,
        });
        let business_name;
        if (result[0].supply_unit_type != 100) {
          business_name = data1.result
            .map((item) => item.supply_unit_business_name)
            .join();
        } else {
          data1.result.forEach((item) => {
            item.supply_unit_business_name += `(${item.material_spec})`;
          });
          business_name = data1.result
            .map((item) => item.supply_unit_business_name)
            .join();
        }
        let location = data.result
          .map((item) => item.supply_unit_location_name)
          .join();
        this.infoData = {
          ...result[0],
          location: location,
          business_name: business_name,
        };
      } else {
        this.$tip({
          isTip: true,
          message: "暂无详情",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 0 !important;
  padding: 0 !important;
  position: absolute;
  left: 20px;
  top: 20px;
}
.detail-label {
  width: 80px;
}
.pic-box {
  width: 24%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(51, 119, 255, 0.1) 3px 18px 16px 0px;
  margin-right: 10px;
}
</style>
