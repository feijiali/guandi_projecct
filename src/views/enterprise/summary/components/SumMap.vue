<template>
  <div
    class="w-100 h-100 position-relative overflow-hidden sum-map"
    :class="{ 'is-fexed': fixactive }"
  >
    <!-- 左上角统计 -->
    <div class="position-absolute sum-left-total">
      <div class="statistical-div-left pr-1">
        <p class="text-white text-left pl-1">
          在建<span class="font-20 font-weight-bold orange pl-1">{{
            Number(totalProject.building)
          }}</span>
        </p>
        <p class="text-white text-left pl-1 mt-1 font-14">
          {{ Number(totalProject.building_value).toFixed(2) }}万
        </p>
      </div>
      <div class="statistical-div-right pr-1">
        <p class="text-white text-left pl-1">
          完工<span class="font-20 font-weight-bold orange pl-1">{{
            Number(totalProject.finished)
          }}</span>
        </p>
        <p class="text-white text-left pl-1 mt-1 font-14">
          {{ Number(totalProject.finished_value).toFixed(2) }}万
        </p>
      </div>
      <div class="statistical-div-right pr-1">
        <p class="text-white text-left pl-1">
          停工<span class="font-20 font-weight-bold orange pl-1">{{
            Number(totalProject.stop)
          }}</span>
        </p>
        <p class="text-white text-left pl-1 mt-1 font-14">
          {{ Number(totalProject.stop_value).toFixed(2) }}万
        </p>
      </div>
    </div>
    <vMap v-model="map" @ready="mapReady" :option="option" />
    <div
      v-if="list_hiden"
      class="position-absolute list-btn d-flex justify-content-center align-items-center rounded p"
    >
      <img
        class="cursor-p"
        src="@/assets/images/enterprise/icon_homepage_map_projectlist.png"
        alt
        @click.stop="list_hiden = !list_hiden"
      />
    </div>
    <div
      v-if="list_hiden"
      class="position-absolute zoomIn d-flex justify-content-center align-items-center bdr5 pd5"
    >
      <img
        class="cursor-p"
        v-if="fixactive"
        src="@/assets/images/enterprise/btn_safe_narrow.png"
        alt
        @click="fixactive = !fixactive"
      />
      <img
        class="cursor-p"
        v-if="!fixactive"
        src="@/assets/images/enterprise/btn_safe_enlarge_normal.png"
        alt
        @click="fixactive = !fixactive"
      />
    </div>

    <div
      class="position-absolute project-list p-1 cursor-p"
      :class="{ 'list-hiden': list_hiden }"
      @click.stop
    >
      <el-scrollbar :native="false" class="h-100">
        <div class="p-1">
          <template v-for="(item, i) in project_list">
            <vProjectItem :info="item" :key="i" />
          </template>
        </div>
      </el-scrollbar>
      <div
        class="position-absolute list-back cursor-p"
        @click.stop="list_hiden = !list_hiden"
      >
        <img
          class="cursor-p"
          src="@/assets/images/enterprise/btn_homepage_map_list_arrowright.png"
          alt
          @click.stop="list_hiden = !list_hiden"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vMap from "@/components/Map";
import { Drawer } from "element-ui";
import api from "@/api/enterprise/engineering/engineering";
import vProjectItem from "./ProjectItem";
import { clustererIcon } from "@/constants/imgIcon";
export default {
  name: "",
  data() {
    return {
      fixactive: false,
      drawer: false,
      icon: require("@/assets/images/icon_map_project.png"),
      map: null,
      project_list: [],
      marker_list: [],
      MarkerClusterer: null,
      list_hiden: true,
      infoWindow: null,
      option: {
        center: [107.166626, 35.994386],
        zoom: 5,
      },
      totalProject: {}, //项目统计数据
    };
  },
  computed: {},
  components: {
    vMap,
    vProjectItem,
    ElDrawer: Drawer,
  },
  async created() {
    await this.queryProject();
    // 查询项目统计
    this.queryProjectInfoProjectSummary();
  },
  mounted() {},
  watch: {},
  methods: {
    async queryProjectInfoProjectSummary() {
      let { result } = await api.queryProjectInfoProjectSummary({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.totalProject = result[0];
    },
    queryProject() {
      return api
        .queryProjectInfoProject({
          page: -1,
          organ_node: this.$organ_id_en_or_pro(this),
        })
        .then((res) => {
          this.project_list = res.result;
        });
    },
    mapReady() {
      window.map = this.map;
      this.map.setZoom(5);
      var styles = clustererIcon.map((item) => ({
        url: item,
        size: new AMap.Size(95, 95),
        offset: new AMap.Pixel(-55, -55),
        textColor: "#ffffff",
        fontSize: 26,
      }));
      AMap.plugin("AMap.MarkerClusterer", () => {
        // 创建点聚合对象
        this.MarkerClusterer = new AMap.MarkerClusterer(this.map, [], {
          gridSize: 100,
          fontSize: 26,
          minClusterSize: 9,
          maxZoom: 16,
          styles: styles,
        });
        // 遍历项目创建标记点位加入点聚合对象
        this.project_list.map((project) => {
          let marker = this.createMark(project);
          this.MarkerClusterer.addMarker(marker);
        });
      });
    },
    createMark(point) {
      let _this = this;
      let Content = `<div class="pr-1 custom-content-marker custom-content-marker1 d-flex justify-content-start align-items-center position-absolute">
          <div class="mr-1 position-relative marker-img-box">
           <img src="${_this.icon}" class="marker-img" />
          </div>
          <div class="d-flex font-15" title="${point.project}">${point.organ}</div>
          <div class="amap-info-sharp"></div>
          </div>`;
      // 经纬度
      let lnglat = new AMap.LngLat(
        Number(point.project_lng),
        Number(point.project_lat)
      );
      // this.map.add(new AMap.Marker({position: lnglat}))
      // 创建标记
      let marker = new AMap.Marker({
        position: lnglat,
        // 将 html 传给 content
        content: Content,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-90, -71),
      });
      let infoWindow = null;
      marker.on("click", (e) => {
        if (infoWindow) {
          // 利用闭包来避免重复创建窗体
          if (!infoWindow.getIsOpen()) {
            infoWindow.open(this.map, lnglat);
          }
          return;
        }
        let infoContent = `<div class="infowindow p-1 rounded-1">
          <div class="d-flex justify-content-start align-items-center font-weight-bold">
            <div class="mr-1 marker-img-box position-relative">
              <img src="${_this.icon}" class="mr-1 marker-img" />
            </div>
            <div class="flex text-hover-primary f16 font-weight-bold" title="${
              point.project
            }">${point.project}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">项目类别</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_type}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">负责人</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_principal}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">联系电话</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_tel}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">总造价</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_total_value}万元</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">开工日期</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_start}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">计划完工</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_end}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">项目地址</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${point.project_pos}</div>
          </div>
          <div class="d-flex justify-content-start align-items-center line-txt">
            <div class="d-flex justify-content-start align-items-center grey2">
              <div class=" label-txt">项目状态</div>
              <span>：</span>
            </div>
            <div class="flex-fill title">${
              ["", "在建项目", "完工项目", "停工项目"][point.project_state]
            }</div>
          </div>
          <div class="amap-info-sharp"></div>
          </div>`;
        infoWindow = new AMap.InfoWindow({
          closeWhenClickMap: true,
          isCustom: true,
          content: infoContent,
          offset: new AMap.Pixel(0, -18),
        });
        infoWindow.open(this.map, lnglat);
      });
      // 将 markers 添加到地图
      return marker;
    },
  },
};
</script>

<style scoped lang="scss">
.sum-left-total {
  padding: 15px 0;
  text-align: center;
  background-color: rgba(33, 128, 255, 0.7);
  position: absolute;
  left: 3%;
  top: 3%;
  border-radius: 10px;
  z-index: 1000;
  .statistical-div-left {
    border-right: 1px solid #fff;
  }
  .statistical-div-left,
  .statistical-div-right {
    float: left;
    min-width: 100px;
  }
}
.is-fexed {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 999;
}
.project-list {
  width: 320px;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 889;
  background: rgba($color: #8384a6, $alpha: 0.6);
  transition: all 0.5s;
  .list-back {
    width: 20px;
    height: 50px;
    left: -22px;
    top: 100px;
  }
  &.list-hiden {
    right: -342px;
  }
}
.zoomIn {
  right: 10px;
  bottom: 10px;
  z-index: 888;
  img {
    width: 40px;
  }
}
.list-btn {
  right: 10px;
  top: 10px;
  z-index: 888;
  background: rgba($color: #5a5efd, $alpha: 1);
}
</style>
<style lang="scss">
.custom-content-marker {
  word-break: break-all;
  background-color: #fff;
  box-shadow: 0 2px 4px #a2d0fd69, 0 0 6px #a2d0fd69;
  border-radius: 20px;
  width: 180px;
  .marker-img-box {
    width: 46px;
    height: 46px;
    .marker-img {
      position: absolute;
      width: 36px;
      // height: 54px;
      top: 4px;
      left: 5px;
    }
  }
}
.amap-info-sharp {
  bottom: -26px;
  left: 50%;
  margin-left: -8px;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 30px solid #fff;
  &:after {
    position: absolute;
    content: "";
    margin-left: -8px;
    margin-top: -7px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.3);
    filter: blur(2px);
    z-index: -1;
  }
}

.infowindow {
  word-break: break-all;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 2px 4px #a2d0fd69, 0 0 6px #a2d0fd69;
  width: 280px;
  min-height: 200px;
  color: red;
  .amap-info-sharp {
    bottom: -22px;
    left: 50%;
    border-top: 30px solid #fff;
  }
  .marker-img-box {
    width: 46px;
    height: 46px;
    .marker-img {
      position: absolute;
      width: 41px;
      // height: 61px;
      top: 0;
      left: 0;
    }
  }
  .label-txt {
    width: 68px;
    text-align-last: justify;
  }
  .line-txt {
    margin: 5px 0;
    align-items: baseline;
  }
}
.custom-content-marker1 {
  box-shadow: 0 10px 20px #22247838, 0 6px 10px #22247838;
}
.sum-map {
  .project-list {
    .el-scrollbar__view {
      padding-right: 5px;
    }
  }
}
.title {
  color: $color-1;
}
</style>
