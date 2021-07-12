<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="top-select-box" style="padding: 0 0 10px 0">
      <div>
        <div class="d-inline-block">
          <label class="text-secondary">工程项目：</label>
          <el-select v-model="listquery.organ_node" placeholder="请选择">
            <el-option
              label="全部"
              v-if="!isShow"
              :value="this.$organ_id_en_or_pro(this)"
            ></el-option>
            <el-option
              v-for="item in projectListSelect"
              :key="item.organ_id"
              :label="item.organ"
              :value="item.organ_id"
            ></el-option>
          </el-select>
        </div>
        <div class="d-inline-block ml-2">
          <span class="grey2">年份：</span>
          <el-date-picker
            v-model="listquery.year"
            :clearable="false"
            format="yyyy"
            value-format="yyyy"
            type="year"
            placeholder="请选择"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div
      class="safe-chart-home position-relative d-flex flex-fill safe-chart-home-5"
    >
      <template>
        <div
          class="safe-chart-item chart-item5"
          :class="'safe-chart' + item"
          v-for="item in 5"
          :key="item"
        >
          <component
            :permission="componentsArr[item - 1].permission"
            :listquery="listquery"
            :is="componentsArr[item - 1].name"
          ></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import PreEducationTotal from "./components/safeIndex/PreEducationTotal"; //班前教育
import InspectionTotal from "./components/safeIndex/InspectionTotal"; //日常巡检
import CaptureTotal from "./components/safeIndex/CaptureTotal"; //违章抓拍
import RectificationTotal from "./components/safeIndex/RectificationTotal"; //周界预警
import ElectricityTotal from "./components/safeIndex/ElectricityTotal"; //临电检测
export default {
  components: {
    PreEducationTotal,
    InspectionTotal,
    CaptureTotal,
    RectificationTotal,
    ElectricityTotal,
  },
  data() {
    return {
      num: 5,
      isShow: this.$route.meta.isProject,
      componentsArr: [
        {
          name: "PreEducationTotal",
          permission: ["SafeExamine", "SafeCommunicate", "SafeEducation"],
        },
        {
          name: "ElectricityTotal",
          permission: ["IoTLeakageProtectCaveat"],
        },
        {
          name: "CaptureTotal",
          permission: ["Video"],
        },
        {
          name: "InspectionTotal",
          permission: ["SafeDailyInspection"],
        },
        {
          name: "RectificationTotal",
          permission: ["Weekpolice"],
        },
      ],
      componentSafe: [],
      listquery: {
        organ_node: this.$organ_id_en_or_pro(this),
        year: this.$utils.parseDate2Str(new Date(), "YYYY"),
      },
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.safe-chart-home {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .safe-chart-item {
    border-radius: 10px;
    background-color: white;
  }
  &.safe-chart-home-5 {
    .chart-item5 {
      &.safe-chart1,
      &.safe-chart2,
      &.safe-chart3 {
        width: 32.9%;
        height: 50%;
      }
      &.safe-chart4,
      &.safe-chart5 {
        width: 49.6%;
        height: 48%;
      }
    }
  }
}

.safe-chart-home-1 {
  .safe-chart-item {
    width: 100%;
  }
}
.safe-chart-home-2 {
  .safe-chart-item {
    width: 49%;
  }
}
.safe-chart-home-3 {
  .safe-chart-item {
    width: 32.8%;
  }
}
.safe-chart-home-4 {
  .safe-chart-item {
    width: 49.5%;
    height: 49%;
  }
}
</style>
<style lang="scss"></style>
