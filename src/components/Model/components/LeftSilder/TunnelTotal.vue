<template>
  <vLeftPanel :defaultShow="false">
    <div class="select-top el-form-box">
      <div class="mb-1">
        <el-select
          placeholder="请选择"
          v-model="parent_id"
          @change="changeParent"
        >
          <template v-for="(item, index) of unitList">
            <el-option
              v-if="item && item.unit_project_is_show == 1"
              :key="index + 'b'"
              :label="item.unit_proj_name"
              :value="item.unit_proj_id"
            ></el-option>
          </template>
        </el-select>
      </div>
      <div class="mb-1">
        <el-select
          placeholder="请选择"
          v-model="child_id"
          @change="changeChild"
        >
          <el-option
            v-for="(item, index) of subUnitList"
            :key="index + 'a'"
            :label="item.sub_unit_name"
            :value="item.sub_unit_id"
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
        height: activeIn == 0 ? 'calc(100% - 228px)' : 'calc(100% - 178px)',
      }"
    >
      <vScroll>
        <ul>
          <li class="p-1 text-white" v-for="(item, index) in list" :key="index">
            <p>{{ types[item.build_part] }}</p>
            <div class="d-flex py-1 px-2">
              <canvas
                class="lt canvas vtm"
                :id="'tunnel-canvas-' + index"
                width="64"
                height="64"
              ></canvas>
              <div class="d-felx flex-column align-content-center p-1">
                <div class="flex-fill">
                  计划进度
                  <span class="text-hover-primary" style="max-width: 56px">{{
                    $utils.float_point(item.plan_length, 2)
                  }}</span>
                  <span>米</span>
                </div>
                <div class="flex-fill">
                  实际进度
                  <span class="red" style="max-width: 56px">{{
                    $utils.float_point(item.build_length, 2)
                  }}</span>
                  <span>米</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </vScroll>
    </div>
    <div @click="backToGis">
      <vBacktoGis />
    </div>
  </vLeftPanel>
</template>

<script>
import api from "@api";
import vScroll from "@/components/common/Scroll";
import vLeftPanel from "../common/LeftPanel";
import vBacktoGis from "../common/BacktoGis";
import tools from "../../Mixins/tools";
import dayjs from "dayjs";
export default {
  mixins: [tools],
  props: {
    unitList: {
      type: Array,
      default: () => [],
    },
    subUnitList: {
      type: Array,
      default: () => [],
    },
    unit_id: {
      type: Number,
      default: 0,
    },
    sub_unit_id: {
      type: Number,
      default: 0,
    },
    types: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    vScroll,
    vLeftPanel,
    vBacktoGis,
  },
  data() {
    return {
      parent_id: 0,
      child_id: 0,
      navs: ["日进度", "总进度"],
      activeIn: 0,
      dateRange: [],
      list: [],
    };
  },
  watch: {
    unit_id() {
      this.parent_id = this.unit_id;
    },
    sub_unit_id() {
      this.child_id = this.sub_unit_id;
    },
  },
  created() {
    this.dateRange = [
      dayjs().format("YYYYMM") + "01",
      dayjs().subtract(1, "day").format("YYYYMMDD"),
    ];
  },
  mounted() {},
  methods: {
    // 切换 进度类型
    handelSwitchChange(ind) {
      this.activeIn = ind;
      this.getTotalData();
    },
    initTotal(parent_id, child_id) {
      this.parent_id = parent_id;
      this.child_id = child_id;
      this.getTotalData();
    },
    changeParent() {
      this.$emit("changeUnit", this.parent_id);
    },
    changeChild() {
      this.$emit("changeSubUnit", this.child_id);
      this.getTotalData();
    },
    // 返回全线
    backToGis() {
      this.$emit("backToGis");
    },
    // 获取详细统计
    getTotalData() {
      let params = {
        sub_unit_id: this.child_id,
        page: -1,
      };
      if (this.activeIn == 0) {
        params.start_time = parseInt(this.dateRange[0]);
        params.end_time = parseInt(this.dateRange[1]);
      }
      api
        .tunnelProgressDetail(params)
        .then(({ result }) => {
          if (result[0]) {
            this.list = result[0].inner_list.map((item) => ({
              ...item,
              percent: Number(item.ration.split("%")[0]),
            }));
            this.canvasFun(this.list, "tunnel-canvas-");
          } else {
            this.list = [];
          }
        })
        .catch((error) => {
          this.list = [];
        });
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
