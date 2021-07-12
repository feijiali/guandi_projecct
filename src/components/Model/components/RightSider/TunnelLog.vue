<template>
  <vRightPanel :defaultShow="false">
    <div class="h-100 text-white" style="background: rgba(12, 4, 105, 0.7)">
      <div class="log-top">
        <div class="p-1">
          起止桩号:
          <div v-if="!!lengInfo">
            <div>
              {{ lengInfo.sub_unit_pile_prefix
              }}{{ lengInfo.sub_unit_pile_start_string }}——
              {{ lengInfo.sub_unit_pile_prefix
              }}{{ lengInfo.sub_unit_pile_end_string }}
            </div>
            <div class="d-flex justify-content-between">
              <div>
                总长度：{{ lengInfo.sub_unit_pile_length | deltailNum }}米
              </div>
              <div style="margin-left: 10px">
                剩余长度：{{ lengInfo.tunnel_left | deltailNum }}米
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-1">施工日志</div>
      <div class="log-list px-1">
        <vScroll>
          <ul v-if="list && list.length > 0">
            <li v-for="(item, i) in list" :key="i">
              <div>
                <span>{{ types[item.d_r_d_build_type] }}：</span>
                日进度
                <span>{{ item.d_r_d_length }}米</span>
              </div>
              <div>
                {{ item.d_r_d_prefix }}{{ item.d_r_d_start_string }}——
                {{ item.d_r_d_prefix }}{{ item.d_r_d_end_string }}
              </div>
            </li>
          </ul>
          <div v-else>暂无数据</div>
        </vScroll>
      </div>
    </div>

    <div class="bim-top-btn d-flex-cen">
      <div>
        <img
          @click="changeEye()"
          style="width: 21px"
          v-if="!eyeOn"
          src="../../images/btn_bim_tunnel_left.png"
          alt=""
          srcset=""
        />
        <img
          @click="changeEye()"
          v-else
          style="width: 21px"
          src="../../images/btn_bim_tunnel_right.png"
          alt=""
          srcset=""
        />
      </div>

      <div>
        <img
          @click="changefull()"
          v-if="!isFullScreen"
          src="../../images/bim_max.png"
          alt=""
          srcset=""
        />
        <img
          @click="changefull()"
          v-else
          src="../../images/bim_min.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </vRightPanel>
</template>

<script>
import api from "@/api";
import vScroll from "@/components/common/Scroll";
import vRightPanel from "../common/RightPanel";
import vBacktoGis from "../common/BacktoGis";
export default {
  props: {
    isFullScreen: {
      type: Boolean,
      default: false,
    },
    selectChild: {
      type: Object,
      default: null,
    },
    types: {
      type: Object,
      default: () => ({}),
    },
    lengInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    vScroll,
    vRightPanel,
  },
  filters: {
    deltailNum(num) {
      let length = num + "";
      let splitArr = length.split(".");
      if (splitArr[1] && splitArr[1].length > 3) {
        return num.toFixed(2);
      } else {
        return length;
      }
    },
  },
  data() {
    return {
      eyeOn: true,
      list: [],
    };
  },
  methods: {
    changefull() {
      this.$emit("changeScreen");
    },
    changeEye() {
      APIUtility.SendCommand(
        APIUtility.APICommand.TunnelTerrainSwitchOn,
        this.eyeOn ? "1" : "0",
        this
      );
      this.eyeOn = !this.eyeOn;
    },
    // 获取日志
    async getLogList(id) {
      let { result } = await api.queryTunnelDailyRecordLast({
        sub_unit_id: id,
      });
      if (result[0]) {
        this.list = result[0].list;
      } else {
        this.list = [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.log-top {
  height: 90px;
  color: white;
  background: #1406af87;
}
.log-list {
  height: calc(100% - 90px);
}
.bim-top-btn {
  position: absolute;
  left: -120px;
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
