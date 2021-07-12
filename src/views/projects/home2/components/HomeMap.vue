<template>
  <div class="position-relative w-100 h-100 homemap" :class="{ 'is-fexed': fixactive }" v-if="!ismodel">
    <amapView :map.sync="map" @complete="complete"></amapView>
    <div v-show="infoList.length > 0" class="panel position-absolute h-100 text-white" :class="{ 'is-active': active }">
      <div class="project-content h-100 w-100 p-1">
        <div class="text-white text-left lets">
          <h3>项目概况</h3>
        </div>
        <div class="content text-left mt-1 lets">
          <el-scrollbar :native="false" class="h-100 wrap">
            <div v-for="(item, i) in infoList" class="mb-2" :key="i">
              <h3 class="mb-05">{{ item.project }}</h3>
              <div class="letsauto font-15">
                {{ item.project_desc }}
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div
        class="close position-absolute d-flex justify-content-between align-items-center"
        :class="{ 'is-active': active }"
      >
        <i class="el-icon-arrow-right font-30 cursor-p" @click="active = !active" style="margin-left: -5px"></i>
      </div>
    </div>

    <div class="position-absolute zoomIn d-flex justify-content-between align-items-center rounded-1">
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
  </div>
</template>

<script>
import axios from 'axios';
import api from '@/api/index';
import amapView from '@/components/MapComponents/amapView';
export default {
  components: {
    amapView
  },
  data() {
    return {
      map: null,
      active: false,
      fixactive: false,
      iconList: [
        require('@/assets/images/360project/icon_home_map_bridge.png'), //大桥
        require('@/assets/images/360project/icon_home_map_field.png'), // 梁场
        require('@/assets/images/360project/icon_home_map_interchange.png'), //互通
        require('@/assets/images/360project/icon_home_map_road.png'), //路基
        require('@/assets/images/360project/icon_home_map_tunnel.png') //隧道
      ],
      infoList: [],
      ismodel: false, //是否展示模型
      markers: [],
      kml_url: '', //mkl文件
      project_lat: 0, //当前项目所在的经纬度
      project_lng: 0 //当前项目所在的经纬度
    };
  },
  async mounted() {
    // this.$bus.$emit("showBIM", false);
    this.getinfoList();
    // 查询项目详情
    this.queryProjectInfoProject();
  },
  methods: {
    // 查询项目详情
    async queryProjectInfoProject() {
      let { result } = await api.queryProjectInfoProject({
        project_id: this.$store.getters.projectId
      });
      this.kml_url = result[0].kml_url;
      this.project_lat = result[0].project_lat;
      this.project_lng = result[0].project_lng;
    },
    getinfoList() {
      setTimeout(async () => {
        let datas = await api.queryProjectInfoProject({
          organ_node: this.$organ_id_en_or_pro(this),
          page: -1
        });
        this.infoList = datas.result;
      }, 1000);
    },
    async parsinglml() {
      axios({
        url: this.kml_url,
        method: 'get',
        responseType: 'document'
      }).then(res => {
        const xmlDoc = res.data;
        let points = [],
          styles = [],
          result = [],
          stylesres = [];
        const objNodeList = xmlDoc.getElementsByTagName('LineString');
        const styleList = xmlDoc.getElementsByTagName('LineStyle');
        for (var i = 0; i < objNodeList.length; i++) {
          var arr = objNodeList[i].children;
          points.push(arr);
        }
        for (var i = 0; i < styleList.length; i++) {
          var brr = styleList[i].children;
          styles.push(brr);
        }
        points.forEach(item => {
          styles.push(item.children);
          let resArr = [];
          let tempArr = this.$utils.trimFun(item[0].textContent).split(' ');
          tempArr.forEach(arr => {
            resArr.push(arr.split(','));
          });
          result.push(resArr);
        });
        styles.forEach(item => {
          if (!item) {
            return;
          }
          let color =
            item[0].innerHTML.substring(6, 8) +
            item[0].innerHTML.substring(4, 6) +
            item[0].innerHTML.substring(2, 4) +
            item[0].innerHTML.substring(0, 2);
          stylesres.push({
            color: `#${color}`,
            width: Number(item[1].innerHTML)
          });
        });
        let resultArr = [];
        result.forEach(item => {
          let temp = [];
          let lnglats = [];
          item.forEach(itm => {
            arr = [Number(itm[0]), Number(itm[1])];
            temp.push(arr);
          });
          resultArr.push(temp);
        });
        for (let i = 0; i < resultArr.length; i++) {
          let path = resultArr[i];
          let polyline = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: stylesres[i].color,
            strokeOpacity: 1,
            strokeWeight: stylesres[i].width,
            // 折线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50
          });
          polyline.setMap(this.map);
        }
      });
    },
    async complete() {
      window.map = this.map;
      this.map.setCenter(new AMap.LngLat(this.project_lng, this.project_lat));
      this.map.setZoom(14);
      // this.list.forEach(point => {
      //   this.addmark(point)
      // })
      this.parsinglml();
      // 查询桥梁单位工程
      await this.queryBridgeUnitProject();
      // 查询隧道单位工程
      await this.queryTunnelUnitProj();
      // 查询路基单位工程
      await this.queryRoadUnitProjectList();
    },
    async queryTunnelUnitProj() {
      let res = await api.queryTunnelUnitProj({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this)
      });
      let arr = res.result.filter(item => item.unit_project_is_show == 1);
      let newarr = arr.map(item => {
        return {
          pos: [item.unit_proj_longitude, item.unit_proj_latitude],
          txt: item.unit_proj_name,
          type: 5
        };
      });
      if (newarr.length) {
        newarr.forEach(point => {
          this.markers.push(this.addmark(point));
        });
      }
    },
    async queryRoadUnitProjectList() {
      let res = await api.queryRoadUnitProjectList({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this)
      });
      let arr = res.result.filter(item => item.unit_project_is_show == 1);
      let newarr = arr.map(item => {
        return {
          pos: [item.unit_proj_longitude, item.unit_proj_latitude],
          txt: item.unit_project,
          type: 4
        };
      });
      if (newarr.length) {
        newarr.forEach(point => {
          this.markers.push(this.addmark(point));
        });
      }
    },
    async queryBridgeUnitProject() {
      let res = await api.queryBridgeUnitProject({
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this)
      });
      let arr = res.result.filter(item => item.unit_project_is_show == 1);
      let newarr = arr.map(item => {
        return {
          pos: [item.unit_proj_longitude, item.unit_proj_latitude],
          txt: item.unit_project_name,
          type: 1
        };
      });
      if (newarr.length) {
        newarr.forEach(point => {
          this.markers.push(this.addmark(point));
        });
      }
    },
    addmark(point) {
      let that = this;
      let Content = `<div class="custom-content-marker justify-content-start align-items-center d-flex position-absolute">
          <img src="${that.iconList[point.type - 1]}" />
          <div class="d-flex text-overflow-ellipsis" title="${point.txt}">${point.txt}</div>
          <div class="amap-info-sharp"></div>
          </div>`;
      let marker = new AMap.Marker({
        position: point.pos,
        // 将 html 传给 content
        content: Content,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-90, -48)
      });
      marker.on('click', e => {
        // this.ismodel = !this.ismodel;
        // that.$bus.$emit("showBIM", true);
        // let sceneType = localStorage.getItem("sceneType");
        // // 如果没有初始化BIM，则先初始化
        // if (!that.GLOBAL.gameInstance) {
        //   APIUtility.initBim(that);
        // } else {
        //   if (
        //     sceneType == 1 ||
        //     sceneType == 2 ||
        //     sceneType == 3 ||
        //     sceneType == 4 ||
        //     sceneType == 5
        //   ) {
        //     that.$bus.$emit("showBIM", true);
        //   } else {
        //     APIUtility.SendCommand(APIUtility.APICommand.InitializeGIS,1,that);
        //   } //进入过保通预案
        //   that.$bus.$emit("showBIM", true);
        // }
      });
      // 将 markers 添加到地图
      that.map.add(marker);
      return marker;
    }
  }
};
</script>

<style lang="scss">
.homemap {
  z-index: 877;
  .letsauto {
    letter-spacing: 4px;
  }
  .project-content {
    overflow: hidden;
    .content {
      height: calc(100% - 20px);
      .el-scrollbar {
        .el-scrollbar__wrap {
          padding-right: 17px;
        }
      }
    }
  }

  &.is-fexed {
    position: fixed !important;
    top: 0;
    left: 0;
  }

  .custom-content-marker {
    background-color: #fff;
    box-shadow: 0 2px 4px #a2d0fd69, 0 0 6px #a2d0fd69;
    border-radius: 20px;
    width: 180px;

    .amap-info-sharp {
      bottom: -8px;
      left: 50%;
      margin-left: -8px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #fff;

      &:after {
        position: absolute;
        content: '';
        margin-left: -8px;
        margin-top: -7px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(0, 0, 0, 0.3);
        filter: blur(2px);
        z-index: -1;
      }
    }
  }

  .zoomIn {
    right: 10px;
    bottom: 10px;
    z-index: 888;
    width: 40px;
    height: 40px;
    text-align: center;
  }

  .panel {
    background: rgba(131, 132, 166, 0.6);
    width: calc(100% - 50px);
    top: 0;
    left: calc(50px - 100%);
    z-index: 888;
    transition: all 0.3s;

    &.is-active {
      left: 0px;
      i {
        transform: rotate(180deg);
      }
    }

    $size: 30px;

    .close {
      width: $size;
      height: $size * 2;
      right: $size * (-1);
      top: 50%;
      margin-top: $size * (-1);
      border-radius: 0 $size $size 0;
      background: rgba(131, 132, 166, 0.6);
    }
  }
}
</style>
