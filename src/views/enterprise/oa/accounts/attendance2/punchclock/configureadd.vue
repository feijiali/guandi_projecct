<template>
  <div class="h-100 w-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <nInfoTitle title="班次设置" />
          <el-form-item
            class="form-item-long-small must mt-2"
            label="班次名称："
          >
            <el-input
              maxlength="8"
              class="input-m mgr10"
              v-model="ruleform.basic_name"
              placeholder="请输入"
            ></el-input
            ><span class="pl-2">注：最多输入8个字（支持英文或数字）</span>
          </el-form-item>
          <el-form-item class="form-item-long must" label="班次规则：">
            <el-radio-group
              v-model="ruleform.basic_type"
              class="vtt"
              style="vertical-align: text-top"
            >
              <el-radio :label="2">两次</el-radio>
              <el-radio :label="4">四次</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="ruleform.basic_type == 4">
            <div
              class="
                shift-setting-item
                rounded-1
                d-inline-flex
                align-items-center
              "
            >
              <div class="d-flex-cen shift-setting-item-left h-100">上午</div>
              <div
                class="d-flex-cen flex-fill shift-setting-item-right h-100 pr-2"
              >
                <div>
                  <el-form-item class="form-item-long must" label="上班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      @change="(val) => chooseTime(val, '2')"
                      style="width: 170px"
                      v-model="ruleform.class_list[0].class_in_time"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                  <el-form-item class="form-item-long must" label="下班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      @change="(val) => chooseTime(val, '3')"
                      style="width: 170px"
                      v-model="ruleform.class_list[0].class_out_time"
                      :picker-options="selectableRange2"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div
              class="
                shift-setting-item
                rounded-1
                d-inline-flex
                align-items-center
              "
            >
              <div class="d-flex-cen shift-setting-item-left h-100">下午</div>
              <div
                class="d-flex-cen flex-fill shift-setting-item-right h-100 pr-2"
              >
                <div>
                  <el-form-item class="form-item-long" label="上班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      @change="(val) => chooseTime(val, '4')"
                      style="width: 170px"
                      v-model="ruleform.class_list[1].class_in_time"
                      :picker-options="selectableRange3"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                  <el-form-item class="form-item-long" label="下班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      style="width: 170px"
                      v-model="ruleform.class_list[1].class_out_time"
                      :picker-options="selectableRange4"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
          </template>
          <template v-if="ruleform.basic_type == 2">
            <div
              class="
                shift-setting-item
                rounded-1
                d-inline-flex
                align-items-center
              "
            >
              <div class="d-flex-cen shift-setting-item-left h-100">上班</div>
              <div
                class="d-flex-cen flex-fill shift-setting-item-right h-100 pr-2"
              >
                <div>
                  <el-form-item class="form-item-long" label="上班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      @change="(val) => chooseTime(val, '5')"
                      style="width: 170px"
                      v-model="ruleform.class_list[0].class_in_time"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div
              class="
                shift-setting-item
                rounded-1
                d-inline-flex
                align-items-center
              "
            >
              <div class="d-flex-cen shift-setting-item-left h-100">下班</div>
              <div
                class="d-flex-cen flex-fill shift-setting-item-right h-100 pr-2"
              >
                <div>
                  <el-form-item class="form-item-long" label="下班时间：">
                    <el-time-picker
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                      style="width: 170px"
                      v-model="ruleform.class_list[0].class_out_time"
                      :picker-options="selectableRange5"
                      placeholder="任意时间点"
                    ></el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
          </template>
          <nInfoTitle class="mt-2" title="其他设置" />
          <el-form-item class="form-item-long must mt-2" label="所属机构：">
            <n-treeselect
              v-if="!basic_id"
              :show-sure="true"
              ref="treeselect"
              @check-change="handleCheckedChange"
              :default-expand-all="true"
              :multiValue="ruleform.organ_ids"
              :showNodeName="false"
              :treeData="treeData"
              :show-checkbox="true"
              :checkStrictly="false"
              :Isvalue="true"
              :defaultExpandAll="false"
            />
            <n-treeselect
              v-if="basic_id"
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.basic_organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small" label="特殊设置：">
            <el-checkbox-group
              v-model="ruleform.special"
              class="checkbox-group-box vertical-top"
            >
              <div class="active-box">
                <el-checkbox :label="1">允许迟到</el-checkbox>
                <el-input
                  style="width: 80px"
                  class="input-m ml-1"
                  v-model.number="ruleform.basic_allow_late"
                  placeholder="请输入"
                ></el-input>
                <span class="ml-1">分钟</span>
              </div>
              <div class="active-box mt-1">
                <el-checkbox :label="2">允许早退</el-checkbox>
                <el-input
                  style="width: 80px"
                  class="input-m ml-1"
                  v-model.number="ruleform.basic_allow_early"
                  placeholder="请输入"
                ></el-input>
                <span class="ml-1">分钟</span>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="周末打卡：">
            <el-radio-group
              v-model="ruleform.basic_allow_weekend"
              class="vertical-top"
              style="vertical-align: text-top"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <nInfoTitle class="mt-2" title="位置设置" />
          <el-form-item
            class="form-item-long-small must mt-2"
            label="获取定位："
          >
            <el-input
              id="autoInput"
              v-model="ruleform.basic_location"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must mt-2"
            label="设置半径："
          >
            <num-input
              :isString="true"
              :fixedNum="2"
              unit="米"
              v-model="ruleform.basic_radius"
              placeholder="请输入"
            >
            </num-input>
          </el-form-item>
          <div class="v-map rounded-2">
            <!-- <vMap v-model="map" @ready="mapReady" /> -->
            <div class="w-100 h-100" id="mapProject"></div>
            <div
              class="map-box d-flex justify-content-between position-absolute"
            >
              <!-- <div class="map-text text-center">拖拽地图获取经纬度</div> -->
            </div>
          </div>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
const amapUrl =
  "https://webapi.amap.com/maps?v=1.4.15&key=a420b02e3f8387ad0973443c446dc3a8";

export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        basic_name: "",
        basic_allow_weekend: 2,
        basic_allow_late: 0,
        basic_allow_early: 0,
        basic_location: "",
        basic_lng: "",
        basic_lat: "",
        basic_radius: null,
        class_list: [
          { class_in_time: "", class_out_time: "" },
          { class_in_time: "", class_out_time: "" },
        ],
        basic_type: 2,
        special: [],
        organ_ids: "",
        basic_organ_id_union: null,
      },
      organ_ids: [],
      rules: {
        basic_name: [
          {
            required: true,
            message: "请输入班次名称",
          },
        ],
        basic_type: [
          {
            required: true,
            message: "请选择班次规则",
          },
        ],
        class_list: {
          validator: this.checkliable,
        },
        organ_ids: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        basic_allow_weekend: [
          {
            required: true,
            message: "请选择周末打卡",
          },
        ],
        basic_location: [
          {
            required: true,
            message: "请选择打卡位置",
          },
        ],
        basic_radius: [
          {
            required: true,
            message: "请选择打卡半径",
          },
        ],
      },
      basic_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      selectableRange2: { selectableRange: "00:00:00 - 23:59:59" },
      selectableRange3: { selectableRange: "00:00:00 - 23:59:59" },
      selectableRange4: { selectableRange: "00:00:00 - 23:59:59" },
      selectableRange5: { selectableRange: "00:00:00 - 23:59:59" },
      // treeData:this.$store.getters.organTreeData

      map: null,
      marker: null,
      jsready: false,
      autocomplete: null,
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  watch: {
    jsready() {
      this.initMap();
    },
  },
  async created() {
    if (this.basic_id) {
      this.title = "编辑人员打卡设置规则";
      delete this.rules.organ_ids;
      this.rules.basic_organ_id_union = [
        {
          required: true,
          message: "请选择所属机构",
        },
      ];
      this.queryStaffPunchBasic();
    } else {
      this.title = "新增人员打卡设置规则";
    }
  },
  mounted() {
    if (document.getElementById("aMapjs")) {
      this.jsready = true;
    } else {
      window.getaMapjs = () => {
        this.jsready = true;
      };
      this.initAmapJs();
    }
  },
  methods: {
    checkliable(rule, liable, callback) {
      if (!liable) {
        return callback(new Error("请选择上班时间"));
      }
      let length = liable.length;
      for (let i = 0; i < length; i++) {
        if (
          liable[i].class_in_time == "" &&
          ((i == 0 && this.ruleform.basic_type == 2) ||
            (i == 1 && this.ruleform.basic_type == 4))
        ) {
          return callback(new Error(`请选择上班时间`));
        }
        if (
          liable[i].class_out_time == "" &&
          ((i == 0 && this.ruleform.basic_type == 2) ||
            (i == 1 && this.ruleform.basic_type == 4))
        ) {
          return callback(new Error(`请选择下班时间`));
        }
      }
    },
    async queryStaffPunchBasic() {
      let res = await api.queryStaffPunchBasic({ basic_id: this.basic_id });
      const json = [
        "basic_id",
        "basic_name",
        "basic_allow_weekend",
        "basic_allow_late",
        "basic_allow_early",
        "basic_location",
        "basic_lng",
        "basic_lat",
        "basic_radius",
        "class_list",
        "basic_type",
        "basic_organ_id_union",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, res.result[0]);
      if (this.ruleform.basic_allow_late) {
        this.ruleform.special.push(1);
      }
      if (this.ruleform.basic_allow_early) {
        this.ruleform.special.push(2);
      }
      this.handleKeyDown(this.ruleform.basic_lng, this.ruleform.basic_lat);
    },
    //初始化地图
    initAmapJs() {
      let url = amapUrl + "&callback=getaMapjs";
      let jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.id = "aMapjs";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      // this.initMap();
    },
    initMap(type) {
      this.map = new AMap.Map("mapProject", {
        center: [104.505188, 37.355138],
        zoom: 4,
        minZoom: 4,
        resizeEnable: true,
      });
      this.map.on("click", (e) => {
        this.chooseLocation(e);
      });
      //输入提示
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        var autoOptions = {
          city: "", //城市，默认全国
          input: "autoInput", //使用联想输入的input的id（也就是上边那个唯一的id）
        };
        let autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          city: "",
          map: this.map,
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          if (e.poi.location == "") {
            this.ruleform.basic_location = e.poi.name + e.poi.address;
            this.ruleform.basic_lat = "";
            this.ruleform.basic_lng = "";
            this.handleKeyDown();
          } else {
            this.ruleform.basic_lng = e.poi.location.lng + "";
            this.ruleform.basic_lat = e.poi.location.lat + "";
            this.ruleform.basic_location = e.poi.name + e.poi.address;
            this.handleKeyDown(e.poi.location.lng, e.poi.location.lat);
          }
        });
      });
    },
    // 根据输入地点定位
    handleKeyDown(lng, lat) {
      let location = this.ruleform.basic_location;
      let that = this;
      AMap.plugin("AMap.Geocoder", function () {
        let geocoder = new AMap.Geocoder();
        geocoder.getLocation(location, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            let position = [
              result.geocodes[0].location.lng,
              result.geocodes[0].location.lat,
            ];
            // that.map.setZoom(12);
            if (lng && lat) {
              that.markerFun(lng, lat);
            } else {
              that.map.setCenter(position);
              that.markerFun(
                result.geocodes[0].location.lng,
                result.geocodes[0].location.lat
              );
            }
          } else {
          }
        });
      });
    },
    markerFun(lng, lat) {
      // 删除原有的点标记
      this.marker && this.map.remove(this.marker);
      this.ruleform.basic_lng = lng + "";
      this.ruleform.basic_lat = lat + "";

      // 新建点标记并添加到地图上
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(
          this.ruleform.basic_lng,
          this.ruleform.basic_lat
        ),
      });
      this.map.add(this.marker);
      this.map.setZoom(12);
      this.map.setCenter([this.ruleform.basic_lng, this.ruleform.basic_lat]);
    },
    //点击地图上某个点
    chooseLocation(e) {
      console.log(e.lnglat.lng, e.lnglat.lat, 3333);
      this.markerFun(e.lnglat.lng, e.lnglat.lat);
      // 根据经纬度获取地点
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder();
        let lnglat = [this.ruleform.basic_lng, this.ruleform.basic_lat];
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            this.$set(
              this.ruleform,
              "basic_location",
              result.regeocode.formattedAddress
            );
          }
        });
      });
    },
    // 选择时间
    chooseTime(val, t) {
      if (t == 2) {
        //四次——选择上午上班打卡时间
        this.$set(
          this.selectableRange2,
          "selectableRange",
          `${val} - 23:59:59`
        );
      } else if (t == 3) {
        //四次——选择上午下班打卡时间
        this.$set(
          this.selectableRange3,
          "selectableRange",
          `${val} - 23:59:59`
        );
      } else if (t == 4) {
        //四次——选择下午上班打卡时间
        this.$set(
          this.selectableRange4,
          "selectableRange",
          `${val} - 23:59:59`
        );
      } else if (t == 5) {
        //两次——上班打卡时间
        this.$set(
          this.selectableRange5,
          "selectableRange",
          `${val} - 23:59:59`
        );
      }
    },
    // 树形下拉选择
    getSelectValue(id) {
      this.ruleform.basic_organ_id_union = id;
    },
    // 所属机构
    handleCheckedChange(checkedNodes) {
      this.checkedNodes = checkedNodes.checkedNodes;
      if (this.checkedNodes.length == 0) {
        this.$refs.treeselect.valueTitle = "";
        this.ruleform.organ_ids = "";
      } else if (this.checkedNodes.length == 1) {
        this.$refs.treeselect.valueTitle = this.checkedNodes[0].node.organ;
        this.organ_ids = this.checkedNodes.map((item) => item.tag).join(",");
        this.ruleform.organ_ids = this.checkedNodes
          .map((item) => item.tag)
          .join(",");
      } else {
        this.$refs.treeselect.valueTitle = `${this.checkedNodes[0].node.organ}等${this.checkedNodes.length}个单位`;
        let nodes = this.checkedNodes
          .filter((item) => {
            return item.node.organ_child_node == item.tag;
          })
          .map((item) => item.tag);
        this.organ_ids = this.checkedNodes.map((item) => item.tag).join(",");
        this.ruleform.organ_ids = nodes.join(",");
      }
    },
    getSelectValue(checkedNodes) {
      this.ruleform.basic_organ_id_union = checkedNodes.tag;
    },
    selectFun() {
      this.$refs.treeselect.$refs.selectTreeBox.handleClose();
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        this.submitAllData();
      }
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      if (subdata.basic_type == 2) {
        subdata.class_list = [
          {
            class_in_time:
              subdata.class_list[0].class_in_time.split(":").length == 3
                ? subdata.class_list[0].class_in_time
                : subdata.class_list[0].class_in_time + ":00",
            class_out_time:
              subdata.class_list[0].class_out_time.split(":").length == 3
                ? subdata.class_list[0].class_out_time
                : subdata.class_list[0].class_out_time + ":00",
          },
        ];
      } else {
        subdata.class_list = [
          {
            class_in_time:
              subdata.class_list[0].class_in_time.split(":").length == 3
                ? subdata.class_list[0].class_in_time
                : subdata.class_list[0].class_in_time + ":00",
            class_out_time:
              subdata.class_list[0].class_out_time.split(":").length == 3
                ? subdata.class_list[0].class_out_time
                : subdata.class_list[0].class_out_time + ":00",
          },
          {
            class_in_time:
              subdata.class_list[1].class_in_time.split(":").length == 3
                ? subdata.class_list[1].class_in_time
                : subdata.class_list[1].class_in_time + ":00",
            class_out_time:
              subdata.class_list[1].class_out_time.split(":").length == 3
                ? subdata.class_list[1].class_out_time
                : subdata.class_list[1].class_out_time + ":00",
          },
        ];
      }
      subdata.special.includes(1)
        ? (subdata.basic_allow_late = subdata.basic_allow_late)
        : delete subdata.basic_allow_late;
      subdata.special.includes(2)
        ? (subdata.basic_allow_early = subdata.basic_allow_early)
        : delete subdata.basic_allow_early;
      delete subdata.special;
      let res = await api[
        `${this.basic_id ? "updateStaffPunchBasic" : "uploadStaffPunchBasic"}`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shift-setting-item {
  width: 380px !important;
}
.shift-setting-item {
  display: inline-flex;
  // width: 380px;
  height: 140px;
  margin-right: 20px;
  .shift-setting-item-left {
    padding: 0 10px;
    border-radius: 10px 0 0 10px;
    background-color: #eaebff;
  }
  .shift-setting-item-right {
    border-radius: 0 10px 10px 0;
    background-color: #f7f7ff;
    padding: 25px;
    .label-l {
      width: 70px;
    }
  }
}
.v-map {
  width: 100%;
  height: 400px;
}
</style>
