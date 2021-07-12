<template>
  <vRightPanel :defaultShow="false">
    <div class="h-100 text-white" style="background: rgba(12, 4, 105, 0.7);">
      <div class="log-top px-1 d-flex align-items-center">
        <div>
          起止桩号:
          <div v-if="!!selectChild">
            <div>
              {{ selectChild.sub_proj_pile_prefix
              }}{{ selectChild.sub_proj_pile_start_string }}——
              {{ selectChild.sub_proj_pile_prefix
              }}{{ selectChild.sub_proj_pile_end_string }}
            </div>
            <div class="d-flex justify-content-between">
              <div>
                总长度：{{ selectChild.sub_proj_pile_length | deltailNum }}米
              </div>
              <!-- <div style="margin-left:10px;">
                剩余长度：{{ selectChild.unit_proj_pile_length }}米
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="p-1">
        施工日志
      </div>
      <div class="log-list px-1">
        <vScroll>
          <ul v-if="list && list.length > 0">
            <li v-for="(item, i) in list" :key="i" class="mb-1">
              <div>
                <span>{{ types[item.d_r_d_build_type] }}</span>
                <!-- 日进度 -->
                <!-- <span>{{ item.d_r_d_dig_num }}</span>
                <span>m</span> -->
              </div>
              <div v-if="item.d_r_d_build_type == 1">
                <div class="d-flex flex-wrap">
                  <div class="flex-grow-1 tip-width">
                    <span class="line-width d-inline-block detail-item"
                      >编号：</span
                    >
                    <span class="d-inline-block line-width">{{
                      item.d_r_d_number
                    }}</span>
                  </div>
                  <div class="flex-grow-1 tip-width">
                    <span class="line-width d-inline-block detail-item"
                      >挖孔：</span
                    >
                    <span class="d-inline-block line-width"
                      >{{ item.d_r_d_dig_num }}米</span
                    >
                  </div>
                </div>
               
              </div>
              <div
                v-else-if="
                  item.d_r_d_build_type == 4 || item.d_r_d_build_type == 20
                "
              >
                <div class="d-flex flex-wrap">
                  <div class="flex-grow-1 tip-width">
                    <span class="line-width d-inline-block detail-item"
                      >编号：</span
                    >
                    <span class="d-inline-block line-width">{{
                      item.d_r_d_number
                    }}</span>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="flex-grow-1 tip-width">
                    <span class="line-width d-inline-block detail-item"
                      >浇筑：</span
                    >
                    <span class="d-inline-block line-width"
                      >{{ item.d_r_d_dig_num }}米</span
                    >
                  </div>
                </div>
              </div>
              <div v-else class="d-flex  flex-wrap">
                <div class="flex-grow-1 tip-width">
                  <span class="line-width d-inline-block detail-item"
                    >编号：</span
                  >
                  <span class="d-inline-block line-width">{{
                    item.d_r_d_number
                  }}</span>
                </div>
              </div>
            </li>
          </ul>
          <div v-else>
            暂无数据
          </div>
        </vScroll>
      </div>
    </div>

    <div class="bim-top-btn d-flex-cen">
      <div>
        <img
          @click="changeEye()"
          v-if="!eyeOn"
          src="../../images/bim_eye_on.png"
          alt=""
          srcset=""
        />
        <img
          @click="changeEye()"
          v-else
          src="../../images/bim_eye_off.png"
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
import api from '@/api';
import vScroll from '@/components/common/Scroll';
import vRightPanel from '../common/RightPanel';
export default {
  props: {
    isFullScreen: {
      type: Boolean,
      default: false
    },
    types: {
      type: Object,
      default: () => ({})
    },
    units: {
      type: Object,
      default: () => ({})
    },
    selectChild: {
      type: Object,
      default: null
    }
  },
  components: {
    vScroll,
    vRightPanel
  },
  filters: {
    deltailNum(num) {
      let length = num + '';
      let splitArr = length.split('.');
      if (splitArr[1] && splitArr[1].length > 3) {
        return num.toFixed(3);
      } else {
        return length;
      }
    }
  },
  data() {
    return {
      eyeOn: false,
      list: []
    };
  },
  methods: {
    changefull() {
      this.$emit('changeScreen');
    },
    changeEye() {
      APIUtility.SendCommand(
        APIUtility.APICommand.BridgeTerrainSwitchOn,
        this.eyeOn ? '1' : '0',
        this
      );
      this.eyeOn = !this.eyeOn;
    },
    // 获取日志
    getLogList(id) {
      api
        .queryBridgeDailyRecordLast({
          sub_unit_id: id
        })
        .then(({ result }) => {
          if (result[0]) {
            this.list = result[0].list;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.log-top {
  height: 80px;
  color: white;
  background: rgba(20, 6, 175, 0.7);
}
.log-list {
  height: calc(100% - 124px);
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
