<template>
  <div>
    <!-- 左侧隧道统计 -->
    <vTunnelTotal
      :unitList="unitList"
      :subUnitList="subUnitList"
      :unit_id="unit_id"
      :sub_unit_id="sub_unit_id"
      :types="types"
      @changeUnit="changeUnit"
      @changeSubUnit="changeSubUnit"
      ref="total"
      @backToGis="backToGis()"
    />
    <!-- 右侧隧道日志 -->
    <vTunnelLog
      ref="log"
      :sub_unit_id="sub_unit_id"
      :types="types"
      :selectChild="selectChild"
      :lengInfo="lengInfo"
      @changeScreen="changeScreen()"
      :isFullScreen="isFullScreen"
    />
  </div>
</template>

<script>
import vTunnelTotal from "./LeftSilder/TunnelTotal";
import vTunnelLog from "./RightSider/TunnelLog";
import api from "@api";
export default {
  props: {
    isFullScreen: {
      type: Boolean,
    },
    path: {
      type: Array,
      default: ["/project/bim"],
    },
    types: {
      type: Object,
      default: () => ({}),
    },
    organNode: {
      type: String,
    },
  },
  components: {
    vTunnelTotal,
    vTunnelLog,
  },
  data() {
    return {
      tunnel_id: 0,
      start_time: 0,
      end_time: 0,
    };
  },
  data() {
    return {
      unitList: [],
      subUnitList: [],
      unit_id: 0,
      sub_unit_id: 0,
      isInit: true,
      lengInfo: {},
    };
  },
  computed: {
    selectChild() {
      return this.subUnitList.find(
        (item) => item.sub_unit_id == this.sub_unit_id
      );
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 判断是否展示模型
        if (this.path && this.path.indexOf(this.$route.fullPath) != -1) {
          // this.getUnitList();
        } // 深度观察监听
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    changeScreen() {
      this.$emit("changeScreen");
    },
    // 初始化 面板
    async initPanel(unit_id, sub_unit_id) {
      this.unit_id = unit_id;
      this.sub_unit_id = sub_unit_id;
      await this.getUnitList();
      await this.getSubUnitList();
    },
    // 切换单位工程
    async changeUnit(id) {
      this.unit_id = id;
      this.sub_unit_id = 0;
      await this.getSubUnitList();
      APIUtility.SendCommand(
        APIUtility.APICommand.TunnelProgress,
        this.unit_id + "#@" + this.sub_unit_id,
        this
      );
    },
    // 切换子单位工程
    changeSubUnit(id) {
      this.sub_unit_id = id;
      this.$refs.log.getLogList(id);
      this.getLeftlength();
      APIUtility.SendCommand(
        APIUtility.APICommand.TunnelProgress,
        this.unit_id + "#@" + this.sub_unit_id,
        this
      );
    },
    // 获取隧道单位工程
    getUnitList() {
      api
        .queryTunnelUnitProj({
          organ_nodes: this.organNode,
          page: -1,
        })
        .then(({ result }) => {
          this.unitList = result;
          if (this.unit_id == 0 && result.length > 0) {
            this.unit_id = result[0].unit_proj_id;
          }
          this.getSubUnitList();
        });
    },
    getLeftlength() {
      api
        .tunnelProgressLeft({
          unit_proj_id: this.unit_id,
          sub_unit_id: this.sub_unit_id,
        })
        .then((res) => {
          this.lengInfo = res.result[0];
        });
    },
    // 获取隧道子单位工程
    getSubUnitList() {
      return api
        .queryTunnelSubUnit({
          unit_proj_id: this.unit_id,
          page: -1,
        })
        .then(({ result }) => {
          this.subUnitList = result;
          if (this.sub_unit_id == 0 && result.length > 0) {
            this.sub_unit_id = result[0].sub_unit_id;
          }
          this.$refs.log.getLogList(this.sub_unit_id);
          this.$refs.total.initTotal(this.unit_id, this.sub_unit_id);
          this.getLeftlength();
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
