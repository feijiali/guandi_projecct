<!--
 * @Autor: 王天文
 * @Date: 2020-10-20 16:01:43
 * @LastEditors: 王天文
 * @LastEditTime: 2021-01-28 09:52:29
-->
<template>
  <div class="w-100 px-2" style="height: calc(100% - 10px)">
    <div class="w-100 py-2">
      <div class="d-inline-block">
        <span class="grey2">工程项目：</span>
        <el-select
          @change="getSelectValue"
          v-model="listQuery.organ_node"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectListSelect"
            :key="item.organ_id"
            :label="item.organ"
            :value="item.organ_id"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">工程部位：</span>
        <el-select
          class="el-select"
          v-model="listQuery.mo_me_part"
          @change="refreshDataPart"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in mo_me_part_arr"
            :key="index"
            :label="item.mo_me_part"
            :value="item.mo_me_part"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">点号：</span>
        <el-select
          class="el-select"
          @change="choose"
          v-model="listQuery.mo_me_point"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in mo_me_point_arr"
            :key="index"
            :label="item.mo_me_point"
            :value="item.mo_me_point"
          ></el-option>
        </el-select>
      </div>
      <div class="d-inline-block ml-2">
        <span class="grey2">月份：：</span>
        <div class="d-inline-block rounded-1">
          <el-date-picker
            v-model="listQuery.mo_me_month"
            format="yyyy-MM"
            @change="choosedate"
            value-format="yyyy-MM"
            type="month"
            placeholder="请选择"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div
      class="bg-white flex-column w-100 d-flex"
      style="height: calc(100% - 100px)"
    >
      <div class="common-choose-box clear">
        <div
          v-for="(item, index) in stateBox"
          :key="index"
          class="float-left ml-4"
        >
          <div class="d-flex">
            <div :class="colorArr[item.id]" class="mr-1"></div>
            <span class="grey2">{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="wall position-relative" style="height: calc(100% - 160px)">
        <n-LineChart
          class="chart-item"
          :smooth="true"
          :textArr="textArr"
          :dataList="data"
          :id="'lq_3'"
          :showNegative="true"
        ></n-LineChart>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";

export default {
  data() {
    return {
      stateBox: [
        { label: "X", id: 0 },
        { label: "Y", id: 1 },
        { label: "平面位移", id: 2 },
        { label: "Z沉降", id: 3 },
      ],
      colorArr: ["x_color", "y_color", "m_color", "z_color"],
      textArr: ["周一", "周二"],
      data: [
        {
          data: [23, 450],
          color: "#5a5efd",
          name: "X",
        },
        {
          data: [-78, -450],
          color: "#fd5571",
          areaColor: ["#B7F1F0", "#fff"],
          name: "Y",
        },
        {
          data: [44, 550],
          color: "#67e6fd",
          name: "平面位移",
        },
        {
          data: [-48, -220],
          color: "#fdb855",
          areaColor: ["#B7F1F0", "#fff"],
          name: "Z沉降",
        },
      ],
      queryPartorPoint: {}, //精确查询部位和节点
      mo_me_part_arr: [], //部位多选数组
      mo_me_point_arr: [], //测点多选数组
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      listQuery: {
        mo_me_part: "",
        mo_me_point: "",
        order_type: 1,
        mo_me_month: "",
        organ_node: this.$organ_id_en_or_pro(this),
      },
      // 精确查询工程项目下的测点和部位参数
      queryOne: {
        mo_me_organ_id_un: "",
        query_type: "",
        mo_me_part: "",
        mo_me_point: "",
        page: -1,
        order_type: 2,
      },
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async created() {
    this.listQuery.organ_node = this.projectListSelect[0].organ_id;
    await this.querySafeMonitorMeasure(this.listQuery, 1);
    // 查询工程部位
    await this.querySafeMonitorMeasurePartOrPoint({
      mo_me_organ_id_un: this.listQuery.mo_me_organ_id_un
        ? this.listQuery.mo_me_organ_id_un
        : this.projectListSelect[0].organ_id,
      query_type: 2,
    });
    await this.querySafeMonitorMeasurePartOrPoint({
      mo_me_organ_id_un: this.listQuery.mo_me_organ_id_un
        ? this.listQuery.mo_me_organ_id_un
        : this.projectListSelect[0].organ_id,
      mo_me_part: this.listQuery.mo_me_part,
      query_type: 1,
    });
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.mo_me_point_arr = [];
      this.listQuery.mo_me_part = "";
      this.listQuery.mo_me_point = "";
      this.queryOne.mo_me_part = "";
      this.listQuery.organ_node = node;
      this.queryOne.mo_me_organ_id_un = node;
      this.queryOne.query_type = 2;
      this.querySafeMonitorMeasure(this.listQuery);
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
    },
    // 筛选工程部位后后重新请求数据
    refreshDataPart(val) {
      this.listQuery.mo_me_point = "";
      this.queryOne.mo_me_part = val;
      this.queryOne.query_type = 1;
      this.querySafeMonitorMeasure(this.listQuery);
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
    },
    // 选择点号
    choose(val) {
      this.querySafeMonitorMeasure(this.listQuery);
    },
    //选择日期
    choosedate(val) {
      !val && this.listQuery.mo_me_month == "";
      this.querySafeMonitorMeasure(this.listQuery);
    },
    // 查询所有工程部位,点号
    async querySafeMonitorMeasurePartOrPoint(param) {
      param.mo_me_organ_id_un = Number(param.mo_me_organ_id_un);
      let data = await api.querySafeMonitorMeasurePartOrPoint(param);
      if (param.query_type == 1) {
        this.mo_me_point_arr = data.result;
      }
      if (param.query_type == 2) {
        this.mo_me_part_arr = data.result;
      }
    },
    async querySafeMonitorMeasure(param, type) {
      this.data[0].data = [];
      this.data[1].data = [];
      this.data[2].data = [];
      this.data[3].data = [];
      this.textArr = [];
      if (type == 1) {
        param = { ...param, page: 0 };
      }
      let data = await api.querySafeMonitorMeasure(param);
      if (type == 1) {
        if (data.result[0]) {
          this.listQuery.mo_me_part =
            data.result[data.result.length - 1].mo_me_part;
          this.listQuery.mo_me_point =
            data.result[data.result.length - 1].mo_me_point;
          this.listQuery.organ_node =
            data.result[data.result.length - 1].mo_me_organ_id_un;
          this.querySafeMonitorMeasure(this.listQuery);
          return;
        }
      }
      if (data.result[0]) {
        data.result.forEach((item) => {
          this.textArr.push(item.mo_me_time);
          this.data[0].data.push(item.mo_me_total_x);
          this.data[1].data.push(item.mo_me_total_y);
          this.data[2].data.push(item.mo_me_total_m);
          this.data[3].data.push(item.mo_me_total_z);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.common-choose-box {
  border-radius: 10px 10px 0 0;
  padding: 20px 35px;
}
.chart-item {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 10px;
  bottom: 0;
  padding: 10px;
}
.x_color {
  background-color: #5a5efd;
  width: 20px;
  height: 20px;
}
.y_color {
  background-color: #fd5571;
  width: 20px;
  height: 20px;
}
.m_color {
  background-color: #67e6fd;
  width: 20px;
  height: 20px;
}
.z_color {
  background-color: #fdb855;
  width: 20px;
  height: 20px;
}
</style>
