<template>
  <div
    class="model-box w-100 h-100 overflow-hidden"
    :class="{ isFull: isFullScreen }"
  >
    <div
      id="gameContainer"
      style="width: 100%; height: 100%; border-radius: 10px"
    ></div>
    <!-- 加载动画 -->
    <vLoading v-if="isLoading" :widthset="widthset" />
    <!-- 全线左侧单位工程选择 -->
    <vUnitProjectList
      :path="path"
      :projectList="projectList"
      ref="projectList"
      @setProject="setProject"
      v-show="
        UnityAllReady &&
        is_all_line &&
        type == 0 &&
        !isAdvancedGeology &&
        !isField
      "
    />

    <!-- 全线右侧菜单 -->
    <vMenu
      @changeScreen="changeScreen"
      @showAllTotal="showAllTotal"
      :isFullScreen="isFullScreen"
      v-if="
        UnityAllReady &&
        is_all_line &&
        type == 0 &&
        !isAdvancedGeology &&
        !isField
      "
    />
    <vProgressArr
      v-if="show_total"
      :progressList="progressList"
      @hidenTotal="hidenTotal"
    />

    <!-- 桥梁 -->
    <vBridgePanel
      ref="bridgePanel"
      :organNode="organNode"
      :path="path"
      :types="bridge_types"
      :units="bridge_units"
      :isFullScreen="isFullScreen"
      @changeScreen="changeScreen"
      @backToGis="backToGis()"
      v-show="isBridgeShow && !isAdvancedGeology && !isField"
    />
    <!-- 隧道 -->
    <vTunnelPanel
      @backToGis="backToGis()"
      :organNode="organNode"
      ref="tunnelPanel"
      :path="path"
      :types="tunnel_types"
      :isFullScreen="isFullScreen"
      @changeScreen="changeScreen"
      v-show="isTunnelShow && !isAdvancedGeology && !isField"
    />
    <!-- 梁场 -->
    <vBeamTotal ref="beamPanel" v-show="isBeamShow && isField" />

    <div v-if="advanced" class="bim-top-btn d-flex-cen">
      <img
        @click="changeScreen()"
        v-if="!isFullScreen"
        src="./images/bim_max.png"
        alt=""
        srcset=""
      />
      <img
        @click="changeScreen()"
        v-else
        src="./images/bim_min.png"
        alt=""
        srcset=""
      />
    </div>
  </div>
</template>

<script>
import vLoading from "./components/Loading";
import vUnitProjectList from "./components/LeftSilder/UnitProjectList";
import vBridgePanel from "./components/BridgePanel";
import vTunnelPanel from "./components/TunnelPanel";
import vMenu from "./components/Menu";
import vProgressArr from "./components/Layer/ProgressArr";
import bimUtils from "./Mixins/bimUtils";
import scene from "./Mixins/scene";
import processTotal from "./Mixins/processTotal";
import vBeamTotal from "./components/LeftSilder/BeamTotal";
export default {
  mixins: [bimUtils, processTotal, scene],
  props: {
    path: {
      type: Array,
      default: ["/project/bim"],
    },
    isAdvancedGeology: {
      type: Boolean,
      default: false,
    },
    isField: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    vBeamTotal,
    vLoading,
    vUnitProjectList,
    vBridgePanel,
    vTunnelPanel,
    vMenu,
    vProgressArr,
  },
  data() {
    return {
      is_all_line: false,
      type: 0,
      isFullScreen: false,
      InitedData: false,
      show_total: false,
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 判断是否展示模型
        if (
          this.path.indexOf(this.$route.fullPath) != -1 &&
          !this.gameInstance
        ) {
          APIUtility.initBim(this);
        } else if (
          this.path.indexOf(this.$route.fullPath) != -1 &&
          this.gameInstance
        ) {
          //  禁止键盘输入
          this.prohibitInput();
          if (
            this.$store.getters.bim_select_organ !=
            this.$refs.projectList.organ_node
          ) {
            this.$refs.projectList.organ_node = this.$store.getters.bim_select_organ;
            this.$refs.projectList.changeNode();
            this.backToGis();
          }
        } else if (
          this.path.indexOf(this.$route.fullPath) == -1 &&
          this.gameInstance
        ) {
          //  启用键盘输入
          APIUtility.SendCommand(
            APIUtility.APICommand.CaptureAllKeyboardInput,
            "0",
            this
          );
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  created() {
    window.bim_model = this;
  },
  beforeDestroy() {
    if (this.gameInstance) {
      // 启用键盘输入
      APIUtility.SendCommand(
        APIUtility.APICommand.CaptureAllKeyboardInput,
        "0",
        this
      );
    }
  },
  mounted() {
    if (this.path.indexOf(this.$route.fullPath) != -1 && !this.gameInstance) {
      setTimeout(() => {
        this.path.indexOf(this.$route.fullPath) != -1 &&
          APIUtility.initBim(this);
      }, 500);
    } else if (
      this.path.indexOf(this.$route.fullPath) != -1 &&
      this.gameInstance
    ) {
      // 禁用键盘输入
      this.prohibitInput();
    }
  },
  methods: {
    prohibitInput() {
      setTimeout(() => {
        if (this.path.indexOf(this.$route.fullPath) == -1) return;
        APIUtility.SendCommand(
          APIUtility.APICommand.CaptureAllKeyboardInput,
          "1",
          this
        );
      });
    },

    getProjectInfo() {
      // api.queryProjectInfoProject({});
    },
    /**
     * bim 全屏
     */
    changeScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    /**
     * 显示 汇总进度统计
     */
    async showAllTotal() {
      await this.getTotalAll();
      if (this.progressList.length == 0) {
        this.$tip({
          isTip: true,
          message: "暂无信息",
        });
        return;
      }
      // await this.getTunnelTotal();
      // await this.getBridgeTotal();
      this.show_total = true;
    },
    /**
     * 隐藏 汇总进度统计
     */
    hidenTotal() {
      this.show_total = false;
    },

    /**
     * 全线加载完成
     */
    initializeGIS() {
      this.is_all_line = true;
      APIUtility.SendCommand(
        APIUtility.APICommand.ShowGisTunnelProgress,
        "1",
        this
      );
    },
    /**
     * 进入小场景
     */
    changeSceneType(type) {
      this.type == type;
      if (type != 0) {
        this.is_all_line = false;
      }
    },
    unitProjectID() {},
  },
};
</script>

<style lang="scss" scoped>
.model-box {
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  transition: 3s all;
  ::v-deep {
    .el-select,
    .el-select-long.el-select,
    .top-select-box .el-select-long.el-select .el-input,
    .el-input,
    .el-date-editor.el-input,
    .el-textarea,
    .el-input-number {
      width: 260px;
    }
  }
  &.isFull {
    left: 0;
    top: 0;
    z-index: 999;
    border-radius: 0;
    position: fixed;
  }
}

.bim-top-btn {
  position: absolute;
  right: 20px;
  top: 15px;
  border-radius: 8px;
  background: $main;
  padding: 10px;
  z-index: 99;

  div {
    margin: 5px 10px;

    img {
      cursor: pointer;
    }
  }
}
</style>
