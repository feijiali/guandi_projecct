<template>
  <div>
    <!-- 左侧桥梁统计 -->
    <vBridgeTotal
      :unitList="unitList"
      :subUnitList="subUnitList"
      :unit_id="unit_id"
      :sub_unit_id="sub_unit_id"
      @changeUnit="changeUnit"
      @changeSubUnit="changeSubUnit"
      ref="total"
      :types="types"
      :units="units"
      @backToGis="backToGis()"
    />
    <!-- 右侧桥梁日志 -->
    <vBridgeLog
      ref="log"
      :types="types"
      :units="units"
      :selectChild="selectChild"
      @changeScreen="changeScreen()"
      :isFullScreen="isFullScreen"
    />
  </div>
</template>

<script>
import vBridgeLog from "./RightSider/BridgeLog";
import vBridgeTotal from "./LeftSilder/BridgeTotal";
import api from "@api";

export default {
  props: {
    isFullScreen: {
      type: Boolean,
    },
    organNode: {
      type: String,
    },
    path: {
      type: Array,
      default: ["/project/bim"],
    },
    types: {
      type: Object,
      default: () => ({}),
    },
    units: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    vBridgeLog,
    vBridgeTotal,
  },
  data() {
    return {
      unitList: [],
      subUnitList: [],
      unit_id: 0,
      sub_unit_id: 0,
      isInit: true,
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 判断是否展示模型
        if (this.path.indexOf(this.$route.fullPath) != -1) {
          // this.getUnitList();
        } // 深度观察监听
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    selectChild() {
      return this.subUnitList.find(
        (item) => item.sub_unit_id == this.sub_unit_id
      );
    },
    selectParent() {
      return this.unitList.find((item) => item.unit_project_id == this.unit_id);
    },
  },
  methods: {
    changeScreen() {
      this.$emit("changeScreen");
    },
    // 初始化 面板
    async initPanel(id) {
      this.unit_id = id;
      this.sub_unit_id = 0;
      await this.getUnitList();
      await this.getSubUnitList();
      this.cameraSwitch();
    },
    // 切换单位工程
    changeUnit(id) {
      this.unit_id = id;
      this.subUnitList.find((item) => item.sub_unit_id == this.sub_unit_id);
      this.$refs.log.eyeOn = false;
      setTimeout(() => {
        APIUtility.SendCommand(
          APIUtility.APICommand.BridgeProgress,
          this.selectParent.unit_project_tag,
          this
        );
      });

      this.sub_unit_id = 0;
      this.getSubUnitList();
    },
    // 切换子单位工程
    changeSubUnit(id) {
      this.sub_unit_id = id;
      this.$refs.log.getLogList(id);
      if (id) {
        this.cameraSwitch();
      }
    },
    cameraSwitch() {
      APIUtility.SendCommand(
        APIUtility.APICommand.BridgeCameraSwitch,
        this.sub_unit_id,
        this
      );
    },
    // 获取桥梁单位工程
    getUnitList() {
      api
        .queryBridgeUnitProject({
          organ_nodes: this.organNode,
          page: -1,
        })
        .then(({ result }) => {
          this.unitList = result;
          if (this.unit_id == 0 && result.length > 0) {
            this.unit_id = result[0].unit_project_id;
          }
          this.getSubUnitList();
        });
    },
    // 获取桥梁子单位工程
    getSubUnitList() {
      return api
        .queryBridgeSubUnit({
          unit_project_id: this.unit_id,
          page: -1,
        })
        .then(({ result }) => {
          this.subUnitList = result;
          if (this.sub_unit_id == 0 && result.length > 0) {
            this.sub_unit_id = result[0].sub_unit_id;
            this.changeSubUnit(this.sub_unit_id);
          }
          this.$refs.log.getLogList(this.sub_unit_id);
          this.$refs.total.initTotal(this.unit_id, this.sub_unit_id);
        });
    },
    // 返回全线
    backToGis() {
      this.$emit("backToGis");
    },
  },
};
</script>

<style></style>
