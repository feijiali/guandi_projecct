<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex align-items-center">
      <div class="">
        <div class="font-20">漏电保护器预警次数统计</div>
      </div>
      <div class="d-flex ml-2 mt-1 top-select-box" style="padding: 0">
        <div>
          <div class="align-items-center d-inline-flex">
            <span class="grey2">工区：</span>
            <el-select
              v-model="organ_node"
              placeholder=""
              @change="getCaveats"
              style="width: 140px"
            >
              <el-option :value="organID" :label="'全部'">全部</el-option>
              <el-option
                v-for="item in work_areas"
                :key="item.organ_id"
                :value="item.organ_id"
                :label="
                  item.organ_parent_node_name
                    .split(',')
                    .slice(1, item.organ_parent_node_name.split(',').length)
                    .join('/')
                "
              >
                {{
                  item.organ_parent_node_name
                    .split(",")
                    .slice(1, item.organ_parent_node_name.split(",").length)
                    .join("/")
                }}
              </el-option>
            </el-select>
          </div>
          <div class="align-items-center d-inline-flex ml-4">
            <span class="grey2">日期：</span>
            <el-date-picker
              style="width: 140px"
              :clearable="false"
              class="el-date-editor-m"
              @change="getSum"
              v-model="listQuery.month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            />
          </div>
          <div class="align-items-center d-inline-flex ml-4">
            <span class="grey2">漏电保护器：</span>
            <el-select
              v-model="listQuery.leakage_protect_caveat_imei"
              placeholder=""
              @change="getSum"
              class="electrical-select"
            >
              <el-option
                v-for="item in caveats"
                :key="item.leakage_protect_device_imei"
                :value="item.leakage_protect_device_imei"
                :label="
                  item.leakage_protect_device_name + '-' + item.leakage_protect_code
                "
              >
                {{ item.leakage_protect_device_name }}-{{ item.leakage_protect_code }}
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div>
      <n-BarChart
        class="chart-item"
        :textArr="textArr"
        :catagetryNum="31"
        :dataList="dataList"
        :colUnit="'次'"
        :minInterval="1"
        ref="wb_1"
        :id="'wb_1'"
        :barWidth="'20%'"
        :mixLine="false"
      ></n-BarChart>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  props: {
    work_areas: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textArr: [],
      dataList: [
        {
          data: [],
          color: ["#0063F1", "#0063F1"],
        },
      ],
      organID: this.$organ_id_en_or_pro(this),
      organ_node: this.$organ_id_en_or_pro(this),
      listQuery: {
        leakage_protect_caveat_imei: "",
        month: this.$utils.getCurrentTime("", "", "month"),
      },
      caveats: [],
    };
  },
  created() {
    this.organ_node = this.$organ_id_en_or_pro(this);
    this.getCaveats(this.organ_node);
  },
  methods: {
    getCaveats(val) {
      if (val == undefined) {
        val = this.organ_node;
      }
      api
        .queryIoTLeakageProtect({
          organ_node: val,
        })
        .then((res) => {
          this.caveats = res.result;
          if (this.caveats[0]) {
            this.listQuery.leakage_protect_caveat_imei = this.caveats[0].leakage_protect_device_imei;
            this.getSum();
          } else {
            this.textArr = [];
            this.listQuery.leakage_protect_caveat_imei = null;
            this.$set(this.dataList[0], "data", []);
          }
        });
    },
    getSum() {
      let data = {
        query_type: 1,
        month: this.listQuery.month
          ? this.listQuery.month
          : this.$utils.getCurrentTime("", "", "month"),
        leakage_protect_caveat_imei: this.listQuery.leakage_protect_caveat_imei,
      };
      api.queryIoTLeakageProtectCaveatSummary(data).then((res) => {
        this.textArr = res.result.map((item) => item.index + "日");
        let data = res.result.map((item) => item.number);
        this.$set(this.dataList[0], "data", data);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chart-item {
  left: 0;
  right: 0;
  position: absolute !important;
  top: 50px;
  bottom: 0;
}
::v-deep .electrical-select .el-input {
  width: 200px !important;
}
</style>
