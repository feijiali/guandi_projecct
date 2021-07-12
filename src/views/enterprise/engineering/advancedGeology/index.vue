<template>
  <div class="h-100 advan-box p-1">
    <div class="advan h-100">
      <div class="advan-sel">
        <n-scroll>
          <div class="p-1">
            <div class="d-flex align-items-center mb-1" v-if="projectList.length >= 1">
              <el-select style="width:100% !important;" placeholder="请选择" v-model="organ_node" @change="changeNode">
                <el-option
                  v-for="(item, index) of projectList"
                  :key="index + 'a'"
                  :label="item.project"
                  :value="item.organ_id_union"
                ></el-option>
              </el-select>
            </div>
            <!-- <div class="text-center mb-1">
              <el-select
                style="width:100% !important;"
                placeholder="请选择"
                v-model="unit_id_un"
                @change="changeUnit"
              >
                <el-option
                  v-for="(item, index) of unitList"
                  :key="index + 'b'"
                  :label="item.unit_proj_name"
                  :value="item.unit_proj_id"
                ></el-option>
              </el-select>
            </div> -->
            <div class="text-center mb-1">
              <el-select
                style="width:100% !important;"
                placeholder="请选择"
                v-model="sub_unit_id"
                @change="changeSubUnit"
              >
                <el-option
                  v-for="(item, index) of subUnitList"
                  :key="index + 'b'"
                  :label="item.sub_unit_name"
                  :value="item.sub_unit_id"
                ></el-option>
              </el-select>
            </div>
            <div class="text-center mb-1">
              <el-select
                style="width:100% !important;"
                placeholder="请选择"
                v-model="predict_id"
                @change="changePredict"
              >
                <el-option
                  v-for="(item, index) of predictList"
                  :key="index + 'c'"
                  :label="item.sub_unit_pile_prefix + item.predict_start + item.sub_unit_pile_prefix + item.predict_end"
                  :value="item.predict_id"
                ></el-option>
              </el-select>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-secondary">预报方法：</span>
              <div>{{ predict ? predict.predict_method : '' }}</div>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-secondary">掌子面里程：</span>
              <div>
                {{ predict ? predict.sub_unit_pile_prefix + predict.predict_tunnel_face : '' }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-secondary">预报时间：</span>
              <div>
                {{ predict ? predict.predict_date : '' }}
              </div>
            </div>

            <template v-if="predict">
              <div
                v-for="(item, i) in predict.predict_situations"
                :key="i + 'd'"
                class="mb-1 bg-secondary p-1 rounded-1 situations-box"
                @click="setActive(item)"
                :class="{
                  'border-primary': active == item.predict_situation_id
                }"
              >
                <div class="d-flex justify-content-between mb-1">
                  <span class="text-secondary">预报里程：</span>
                  <div>
                    {{
                      predict.sub_unit_pile_prefix +
                        item.predict_situation_start +
                        '-' +
                        predict.sub_unit_pile_prefix +
                        item.predict_situation_end
                    }}
                  </div>
                </div>

                <div class="d-flex justify-content-between mb-1">
                  <span class="text-secondary">推断围岩级别：</span>
                  <div>
                    {{ item.predict_situation_rock_dst ? item.predict_situation_rock_dst + '级' : '' }}
                  </div>
                </div>

                <div class="d-flex justify-content-between mb-1">
                  <span class="text-secondary">原设计围岩级别：</span>
                  <div>
                    {{ item.predict_situation_rock_src ? item.predict_situation_rock_src + '级' : '' }}
                  </div>
                </div>
                <div class="mb-1">
                  <span class="text-secondary">预报结果：</span>
                  <div>
                    {{ item.predict_situation_result }}
                  </div>
                </div>
                <div class="mb-1">
                  <span class="text-secondary">施工建议：</span>
                  <div>
                    {{ item.predict_situation_advice }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </n-scroll>
      </div>
      <div class="text-center">
        <n-button class="mt-1" :btnText="'管理'" :width="'100px'" :colorBtn="'blue'" @buttonClick="linkTo"></n-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@api';
export default {
  data() {
    return {
      projectList: [],
      subUnitList: [],
      predictList: [],
      organ_node: null,
      predict_id: null,
      sub_unit_id: null,
      active: null,
      tunnelReady: false,
      bimReady: false
    };
  },
  mounted() {
    this.$bus.$on('advancedSwicth', () => {
      this.bimReady = true;
      this.switchTunnel();
      window.bim_model.advanced = true;
    });
    this.$bus.$on('advancedSwicthEnd', () => {
      this.tunnelReady = true;
      this.switchPredict();
      window.bim_model.advanced = true;
    });
    this.$bus.$on('changePrediction', data => {
      this.active = data;
      window.bim_model.advanced = true;
    });
    // Unity已经准备好了
    if (window.bim_model && window.bim_model.UnityAllReady) {
      this.bimReady = true;
    }
    if (this.$route.meta.isProject) {
      setTimeout(() => {
        this.organ_node = this.$organ_id_en_or_pro(this);
        if (this.$store.getters.bim_select_organ) {
          this.organ_node = this.$store.getters.bim_select_organ;
        }
        this.getProjectList();
      });
    }
  },
  beforeDestroy() {
    this.$bus.$off('advancedSwicth');
    this.$bus.$off('advancedSwicthEnd');
    this.$bus.$off('changePrediction');
  },
  activated() {
    if (!this.$route.meta.isProject) {
      this.organ_node = this.$organ_id_en_or_pro(this);
      if (this.$store.getters.bim_select_organ) {
        this.organ_node = this.$store.getters.bim_select_organ;
      }
      this.getProjectList();
      this.switchTunnel();
    }
  },
  computed: {
    predict() {
      if (this.predict_id) {
        return this.predictList.find(item => item.predict_id == this.predict_id);
      } else {
        return null;
      }
    },
    project() {
      if (this.organ_node) {
        return this.projectList.find(item => item.organ_id_union == this.organ_node);
      } else {
        return null;
      }
    }
  },
  methods: {
    // 设置切换bim项目
    switchProject() {
      if (
        window.bim_model &&
        window.bim_model.UnityAllReady &&
        this.organ_node != window.bim_model.organNode &&
        window.bim_model.isAdvancedGeology
      ) {
        window.bim_model.setProject(this.project);
        this.bimReady = false;
      }
    },
    // 隧道地质超前预报
    switchTunnel() {
      if (
        window.bim_model &&
        window.bim_model.UnityAllReady &&
        this.sub_unit_id &&
        window.bim_model.isAdvancedGeology
      ) {
        let subUnit = this.subUnitList.find(item => item.sub_unit_id == this.sub_unit_id);
        this.tunnelReady = false;
        APIUtility.SendCommand(APIUtility.APICommand.InitTunnelPrediction, subUnit.sub_unit_tag, this);
        window.bim_model.advanced = true;
      }
    },
    // 根据桩号切换地质预报
    switchPredict() {
      if (window.bim_model && this.tunnelReady && this.predict_id && window.bim_model.isAdvancedGeology) {
        APIUtility.SendCommand(APIUtility.APICommand.ChangePerdictionPile, this.predict_id, this);
        this.changePredict();
        window.bim_model.advanced = true;
      }
    },
    // 切换地质预报
    switchSituation() {
      if (window.bim_model && this.tunnelReady && this.active && window.bim_model.isAdvancedGeology) {
        APIUtility.SendCommand(APIUtility.APICommand.ChangePrediction, this.active, this);
        window.bim_model.advanced = true;
      }
    },
    async getProjectList() {
      let { result } = await api.queryProjectInfoProject({
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1
      });
      this.projectList = result.filter(item => item.project_config_gis);
      this.sub_unit_id = null;
      this.predict_id = null;
      this.subUnitList = [];
      this.predictList = [];
      let ind = this.projectList.findIndex(item => item.organ_id_union == this.organ_node);
      // 设置选中第一个
      if (this.projectList.length >= 1 && ind == -1) {
        this.organ_node = this.projectList[0].organ_id_union;
        this.switchProject();
        this.getSubUnitList(true);
      } else if (this.projectList.length >= 1 && ind != -1) {
        this.organ_node = this.projectList[ind].organ_id_union;
        this.switchProject();
        this.getSubUnitList(true);
      }
      this.$store.dispatch('app/set_bim_organ', this.organ_node);
    },
    changeNode(val) {
      this.sub_unit_id = null;
      this.predict_id = null;
      this.subUnitList = [];
      this.predictList = [];
      this.$store.dispatch('app/set_bim_organ', val);
      this.switchProject();
      this.getSubUnitList(true);
    },
    changeSubUnit() {
      this.predict_id = null;
      this.switchTunnel();
      this.getPredictList(true);
    },
    changePredict() {
      APIUtility.SendCommand(APIUtility.APICommand.ChangePerdictionPile, this.predict_id, this);
      if (this.predict.predict_situations[0]) {
        this.setActive(this.predict.predict_situations[0]);
      }
    },
    // 获取子单位工程
    getSubUnitList(flag) {
      api
        .queryTunnelSubUnit({
          organ_node: this.organ_node,
          page: -1
        })
        .then(({ result }) => {
          this.subUnitList = result;
          if (flag && result[0]) {
            this.sub_unit_id = result[0].sub_unit_id;
            if (this.bimReady) {
              this.switchTunnel();
            }
            this.getPredictList(flag);
          }else{
            this.$tip({
              isTip: true,
              message: "该单位工程暂无场景资源",
            });
          }
        });
    },
    getPredictList(flag) {
      api
        .queryTunnelGeologyPredictList({
          predict_sub_unit_id_un: this.sub_unit_id,
          page: -1
        })
        .then(({ result }) => {
          this.predictList = result;
          if (flag && result[0]) {
            this.predict_id = result[0].predict_id;
            this.switchPredict();
            if (result[0].predict_situations.lenth > 0) {
              this.switchSituation();
              this.active = result[0].predict_situations[0].predict_situation_id;
            }
          }
        });
    },
    linkTo() {
      this.$router.linkTo('enterprise_engineering_advancedGeology_list');
    },
    setActive(item) {
      this.active = item.predict_situation_id;
      this.switchSituation();
    }
  }
};
</script>

<style scoped lang="scss">
.advan-box {
  width: 358px;
  .advan {
    border-radius: 10px;
    background-color: #fff;
    .advan-sel {
      height: calc(100% - 60px);
    }
  }
  .situations-box {
    border: 1px solid transparent;
    &.border-primary {
      border-color: #007bff;
    }
  }
}
</style>
<style lang="scss">
.advan-sel {
  .el-input {
    width: 100% !important;
  }
}
</style>
