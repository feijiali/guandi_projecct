<template>
  <vLeftPanel :defaultShow="false">
    <div class="select-top el-form-box">
      <div class="mb-1">
        <el-select
          placeholder="请选择"
          v-model="beam_field_id"
          @change="changebeam"
        >
          <el-option
            v-for="(item, index) of beams"
            :key="index + 'a'"
            :label="item.unit_name"
            :value="item.unit_id"
          ></el-option>
        </el-select>
      </div>
      <div class="mb-1">
        <ul class="sub-nav-ul">
          <li
            v-for="(item, index) of 2"
            @click="handelSwitchChange(index)"
            :key="index"
            class="sub-nav-li-item"
            :class="[activeIn == index ? 'active' : '']"
          >
            {{ navs[index] }}
          </li>
        </ul>
      </div>
      <div class="mb-1" v-if="activeIn == 0">
        <el-date-picker
          @change="getTotalData"
          class="el-date-picker-range-box"
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          format="yyyy-MM-dd"
          :editable="false"
          :clearable="false"
          value-format="yyyyMMdd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <div
      class="select-list"
      :style="{
        height: activeIn == 0 ? 'calc(100% - 128px)' : 'calc(100% - 79px)',
      }"
    >
      <vScroll>
        <div v-show="activeIn == 1" class="position-relative text-white">
          <div class="text-center f12 line25 clear">
            <n-DoubleRing
              :id="'chart_total_progress'"
              :title="'全部'"
              :dataList="totalProgress"
              :fontSize="'24px'"
              :titleSize="'18px'"
              :titleColor="'#fff'"
            ></n-DoubleRing>
          </div>
          <p class="text-white font-20 text-center">
            计划进度：{{ $utils.float_point(totalList.beam_field_preset, 2) }}
          </p>
          <p class="mt-2 text-white font-20 text-center">
            实际进度：{{ $utils.float_point(totalList.built_counts, 2) }}
          </p>

          <template>
            <p class="f16 text-center mt-3">
              未搭建：<span class="ml-2"
                >{{
                  totalList.beam_field_preset - totalList.prog_counts
                }}片</span
              >
            </p>
            <p class="f16 text-center mt-2 cursor-p" @click="linkTo(7)">
              预制完：<span class="ml-2">{{ totalList.built_counts }}片</span>
              <span class="text-hover-primary cusp ml-2">查看</span>
            </p>
            <p class="f16 text-center mt-2 cursor-p" @click="linkTo(8)">
              架设完：<span class="ml-2">{{ totalList.span_counts }}片</span>
              <span class="text-hover-primary cusp ml-2">查看</span>
            </p>
          </template>
        </div>
        <!-- 梁场的日进度 -->
        <div
          class="text-center text-white p-1"
          v-show="activeIn == 0"
          style="height: 250px"
        >
          <p class="font-14 text-left">单位：片</p>
          <div
            id="lc1"
            v-show="activeIn == 0"
            style="width: 100%; height: 280px"
          ></div>
          <canvas
            class="canvas canvastotal disi"
            id="lc2"
            width="160"
            height="160"
          ></canvas>
          <p class="mt-2 font-14">实际占计划百分比</p>
        </div>
      </vScroll>
    </div>
  </vLeftPanel>
</template>

<script>
import api from "@api";
import vScroll from "@/components/common/Scroll";
import vLeftPanel from "../common/LeftPanel";
import tools from "../../Mixins/tools";
import dayjs from "dayjs";
import echarts from "echarts";
export default {
  mixins: [tools],
  components: {
    vScroll,
    vLeftPanel,
  },
  data() {
    return {
      beams: [],
      beam_field_id: 0,
      navs: ["日进度", "总进度"],
      activeIn: 0,
      dateRange: [],
      totalProgress: {
        data: [0],
        color: ["#55e7e7", "#4ADAE8"],
        showValue: "0%",
      },
      lc1: null,
      totalList: [],
    };
  },
  created() {
    this.dateRange = [
      dayjs().format("YYYYMM") + "01",
      dayjs().subtract(1, "day").format("YYYYMMDD"),
    ];
  },
  mounted() {},
  methods: {
    changebeam() {
      let beam = this.beams.find(
        (item) => item.beam_field_id == this.beam_field_id
      );

      beam &&
        APIUtility.SendCommand(
          APIUtility.APICommand.InitializeBIMBeam,
          beam.unit_project_tag,
          this
        );
    },
    linkTo(t) {
      this.$router.linkTo("enterprise_beamField_qrcode", { type: t });
    },
    init(data, beams) {
      if (this.beams.length == 0) {
        this.beams = beams;
      }
      this.beam_field_id = data;
      this.getTotalData();
    },
    getTotalData() {
      this.lc1 && this.lc1.clear();
      // 查询梁场计划和进度汇总
      this.queryStat();
      // 查询梁场生产统计
      this.queryPieceStat();
    },
    // 切换 进度类型
    handelSwitchChange(ind) {
      this.activeIn = ind;
      this.getTotalData();
    },
    async queryPieceStat() {
      let params = {
        beam_field_id: this.beam_field_id,
        noloading: true,
      };
      if (this.activeIn == 0) {
        // 日进度
        params.start_date = this.startTime;
        params.end_date = this.endTime;
      }
      let data = await api.queryWisdomBeamFieldPieceStat(params);
      this.totalList = data.result[0];
      if (this.activeIn == 1) {
        //总进度
        this.$set(this.totalProgress, "data", [
          parseFloat(
            data.result[0].built_counts / data.result[0].beam_field_preset
          ) * 100,
        ]);
        this.$set(
          this.totalProgress,
          "showValue",
          parseFloat(
            data.result[0].built_counts / data.result[0].beam_field_preset
          ).toFixed(2) *
            100 +
            "%"
        );
      }
    },
    // 获取详细统计
    async queryStat() {
      if (this.activeIn == 1) {
        return;
      }
      let params = {
        is_all_count: 0,
        beam_field_id: this.beam_field_id,
        noloading: true,
      };
      // 日进度
      params.start_date = this.dateRange ? this.dateRange[0] : "";
      params.end_date = this.dateRange ? this.dateRange[1] : "";
      let data = await api.queryWisdomBeamPlanAndProgStat(params);

      this.lc1 = echarts.init(document.getElementById("lc1"), "default");
      let option = {
        grid: {
          top: "11%",
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          data: ["计划", "实际"],
          axisLine: {
            lineStyle: {
              color: "#557dfd",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 0,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2D4B6B",
            },
          },
          minInterval: 1,
        },
        series: {
          type: "bar",
          name: ["计划", "实际"],
          data: [data.result[0].plan_counts, data.result[0].prog_counts],
          label: {
            normal: {
              show: true,
              position: "top",
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              barCategoryGap: 200,
              color: function (params) {
                var b = params.dataIndex == 0;
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: b ? "#15D7FA" : "#FF89C1",
                  },
                  {
                    offset: 1,
                    color: b ? "#0E99EE" : "#FE7786",
                  },
                ]);
              },
            },
          },
          barWidth: 25,
        },
      };
      this.lc1.setOption(option, true);
      let canvas = document.getElementById("lc2");
      this.draw(
        canvas.getContext("2d"),
        canvas.width / 2,
        data.result[0].prog_counts == 0 || data.result[0].plan_counts == 0
          ? 0
          : (
              (Math.ceil(data.result[0].prog_counts) /
                Math.ceil(data.result[0].plan_counts)) *
              100
            ).toFixed(0),
        0,
        true
      );
    },
  },
};
</script>

<style scoped lang="scss">
.select-top {
  text-align: center;
  padding: 10px 0;
  margin-bottom: 1px;
  background: rgba(12, 4, 105, 0.7);
  .sub-nav-li-item {
    color: white;
  }
}
.select-list {
  background: rgba(12, 4, 105, 0.7);
}
</style>
