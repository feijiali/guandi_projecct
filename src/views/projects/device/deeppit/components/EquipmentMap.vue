<template>
  <div class="heiall wall map-view">
    <amapView :map.sync="map" @complete="complete">
      <!-- 功能按钮 -->
      <div class="posa zoomax flexsta panel white pd10 bdr20">
        <div class="mgr5">电子围栏：</div>
        <div class="mgr10 cusp" @click="setListener(0)">
          <i class="el-icon-plus"></i>
          新增
        </div>
        <div class="mgr10 cusp" @click="setListener(1)"><i class="el-icon-edit-outline"></i>编辑</div>
        <div class="cusp" @click="deleteCircle"><i class="el-icon-delete"></i>删除</div>
      </div>
      <!-- 设备选择 -->
      <div class="posa zoomax devdselet white">
        <el-select v-model="device_id" placeholder="请选择设备">
          <el-option label="全部设备" :value="''"></el-option>
          <el-option
            v-for="(item, i) in devList"
            :key="i + 'a'"
            :label="item.device_name"
            :value="item.device_id"
          ></el-option>
        </el-select>
      </div>
      <!-- 设备定位 -->
      <devPoint v-for="(item, i) in devpoint" :key="i + 'd'" :map="map" :item="item" :icon="icons[i]" />

      <!-- 电子围栏 -->
      <devCircle v-for="(item, i) in devCircle" :key="i + 'c'" :map="map" :item="item" />

      <!-- 电子围栏 -->
      <div v-if="type == 1">
        <devCircle :map="map" :item="addCircle" :type="type" />
      </div>
    </amapView>
  </div>
</template>

<script>
import amapView from "@/components/MapComponents/amapView.vue";
import devPoint from "./devPoint.vue";
import devCircle from "./devCircle.vue";
import api from "@/api/index";
export default {
  data() {
    return {
      map: null,
      mapEquipIcon: [],
      devpoint: [
        {
          pos: [109.765236, 19.856463],
        },
        {
          pos: [109.772275, 19.855373],
        },
        {
          pos: [109.765451, 19.850005],
        },
        {
          pos: [109.759338, 19.864708],
        },
      ],
      devCircle: [
        {
          pos: [109.76731, 19.871089],
          scale: 300,
        },
      ],
      addCircle: {
        pos: [109.76731, 19.871089],
        scale: 300,
      },
      type: 0, // 1 新增  2 编辑
      devList: [],
      device_id: null,
      icons: [],
      clickListener: null,
    };
  },
  components: {
    amapView,
    devPoint,
    devCircle,
  },
  created() {
    this.mapEquipIcon = this.GLOBAL.mapEquipIcon;
    this.mapEquipIcon.forEach(item => {
      let icon = new AMap.Icon({
        size: new AMap.Size(66, 94), // 图标尺寸
        image: item,
        imageOffset: new AMap.Pixel(-22.9, -42), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(66, 94), // 根据所设置的大小拉伸或压缩图片
      });
      this.icons.push(icon);
    });
    this.getdevList();    
  },
  methods: {
    complete() {
      this.map.setCenter(new AMap.LngLat(109.759338, 19.864708));
      this.map.setZoom(14);
      this.getCircle();
      window.map = this.map;
    },
    // 获取设备
    async getdevList() {
      let res = await api.queryEquipmentDevice({
        page: -1,
      });
      this.devList = res.result;
    },
    // 添加电子围栏方法监听
    setListener(type) {
      if (type == 0) {
        this.clickListener = AMap.event.addListener(this.map, "click", e => {
          this.addCircle.pos = [e.lnglat.lng, e.lnglat.lat];
          this.type = 1;
        });
      } else if (type == 1) {
        this.removeListener();
      }
    },
    getCircle() {},
    removeListener() {
      if (this.clickListener) {
        this.type = 0;
        AMap.event.removeListener(this.clickListener);
        this.Listener = null;
      }
    },
    deleteCircle() {
      this.removeListener();
    },
  },
};
</script>

<style scoped lang="scss">
.zoomax {
  z-index: 999;
}

.panel {
  top: 20px;
  left: 20px;
  background: $linear-b;
}

.devdselet {
  top: 20px;
  left: 280px;
}
</style>
