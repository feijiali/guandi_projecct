<template>
  <div class="position-relative h-100 cursor-p">
    <div class="d-flex align-items-center">
      <div class="">
        <div class="font-20">电流波动统计</div>
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
              v-model="listQuery.leakage_protect_realtime_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            />
          </div>
          <div class="align-items-center d-inline-flex ml-4">
            <span class="grey2">漏电保护器：</span>
            <el-select
              v-model="listQuery.leakage_protect_id"
              placeholder=""
              @change="getSum"
              class="electrical-select"
            >
              <el-option
                v-for="item in caveats"
                :key="item.leakage_protect_id"
                :value="item.leakage_protect_id"
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
    <div @click.stop="linkTo()">
      <n-LineChart
        @click="linkTo"
        ref="charts"
        class="chart-item"
        :smooth="true"
        :textArr="textArr"
        :dataList="dataList"
        :id="'cl_1'"
      ></n-LineChart>
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
  computed: {
    leakage_protect() {
      return (
        this.caveats.find(
          (item) => item.leakage_protect_id == this.listQuery.leakage_protect_id
        ) || {}
      );
    },
  },
  data() {
    return {
      textArr: [],
      dataList: [
        {
          data: [],
          color: "#FF74C7",
          areaColor: ["#ffffff", "#ffffff"],
        },
      ],
      organID: this.$organ_id_en_or_pro(this),
      organ_node: this.organID,
      listQuery: {
        leakage_protect_id: 0,
        leakage_protect_realtime_date: this.$utils.getCurrentTime(),
      },
      types: ["", "circuit_220", "circuit_380"],
      caveats: [],
    };
  },
  created() {
    this.organ_node = this.organID;
    this.getCaveats(this.organ_node);
  },
  methods: {
    linkTo() {
      let leakage_protect = this.caveats.find(
        (item) => item.leakage_protect_id == this.listQuery.leakage_protect_id
      );
      if (leakage_protect.leakage_protect_id) {
        this.$router.linkTo("enterprise_safety3_safeManage_operation_acquisitionInfo", {
          leakage_protect_id: leakage_protect.leakage_protect_id,
          code: leakage_protect.leakage_protect_code,
          name:
            leakage_protect.leakage_protect_device_name +
            "-" +
            leakage_protect.leakage_protect_code,
        });
      }
    },
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
            this.listQuery.leakage_protect_id = this.caveats[0].leakage_protect_id;
            this.getSum();
          } else {
            this.textArr = [];
            this.listQuery.leakage_protect_id = null;
            this.$set(this.dataList[0], "data", []);
          }
        });
    },
    getSum() {
      if (!this.listQuery.leakage_protect_realtime_date) {
        this.listQuery.leakage_protect_realtime_date = this.$utils.getCurrentTime();
      }
      let data = {
        query_type: 1,
        leakage_protect_realtime_date: this.listQuery.leakage_protect_realtime_date,
        leakage_protect_id: this.listQuery.leakage_protect_id,
      };
      api.queryIoTLeakageProtectRealtime(data).then((res) => {
        this.textArr = res.result.map(
          (item) => item.leakage_protect_realtime_sub_date.split(" ")[1]
        );
        let data = res.result.map((item) => {
          return item[this.types[item.leakage_protect_realtime_type]].current;
        });
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
