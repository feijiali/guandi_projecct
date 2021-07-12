<!--
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:54
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-12 16:14:48
-->
<template>
  <n-dialog ref="dialog" :diaTit="'定位地址选择'" :diaWidth="'50%'">
    <template slot="diaSlot">
      <n-scroll>
        <div class="w-100 mt-1">
          <span class="grey2 d-inline-block label-l must">获取定位：</span>
          <el-input
            id="autoInput"
            v-model="ruleform.approach_location"
            placeholder="请输入"
          ></el-input>
          <span class="font-14 ml-2"
            >地址：{{ ruleform.approach_location }}</span
          >
        </div>
        <div class="v-map rounded-1 mt-2">
          <div class="w-100 h-100" id="mapProject"></div>
          <div class="map-box justify-content-between d-flex position-absolute">
            <div class="map-text text-center">拖拽地图获取经纬度</div>
          </div>
        </div>
      </n-scroll>
      <div class="d-flex justify-content-end mb-08">
        <n-button
          class="mt-1"
          :btnText="'确认提交'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFunMap"
        ></n-button>
      </div>
    </template>
  </n-dialog>
</template>

<script>
import api from "@/api/index";
const amapUrl =
  "https://webapi.amap.com/maps?v=1.4.15&key=a420b02e3f8387ad0973443c446dc3a8";
export default {
  props: {},
  data() {
    return {
      ruleform: {
        approach_location: "",
        approach_lng: "",
        approach_lat: "",
      },
      jsready: false,
      map: null,
      marker: null,
      jsready: false,
      autocomplete: null,
    };
  },
  methods: {
    show() {
      this.ruleform = {};
      window.getaMapjs = () => {
        this.initMap();
      };
      this.initAmapJs();
      this.$refs.dialog.show();
    },
    // 定位地址选择后提交
    submitFunMap() {
      this.$refs.dialog.cancel();
      this.$emit("getAddress", this.ruleform);
    },
    //初始化地图
    initAmapJs() {
      let url = amapUrl + "&callback=getaMapjs";
      let jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.id = "aMapjs";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      //
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
            this.ruleform.approach_location = e.poi.name + e.poi.address;
            this.ruleform.approach_lat = "";
            this.ruleform.approach_lng = "";
            this.handleKeyDown();
          } else {
            this.ruleform.approach_lng = e.poi.location.lng + "";
            this.ruleform.approach_lat = e.poi.location.lat + "";
            this.ruleform.approach_location = e.poi.name + e.poi.address;
            this.handleKeyDown(e.poi.location.lng, e.poi.location.lat);
          }
        });
      });
    },
    // 根据输入地点定位
    handleKeyDown(lng, lat) {
      let location = this.ruleform.approach_location;
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
      this.ruleform.approach_lng = lng + "";
      this.ruleform.approach_lat = lat + "";
      // 新建点标记并添加到地图上
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(
          this.ruleform.approach_lng,
          this.ruleform.approach_lat
        ),
      });
      this.map.add(this.marker);
      this.map.setZoom(12);
      this.map.setCenter([
        this.ruleform.approach_lng,
        this.ruleform.approach_lat,
      ]);
    },
    //点击地图上某个点
    chooseLocation(e) {
      this.markerFun(e.lnglat.lng, e.lnglat.lat);
      // 根据经纬度获取地点
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder();
        let lnglat = [this.ruleform.approach_lng, this.ruleform.approach_lat];
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            this.$set(
              this.ruleform,
              "approach_location",
              result.regeocode.formattedAddress
            );
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-map {
  width: 100%;
  height: 360px;
}
</style>
