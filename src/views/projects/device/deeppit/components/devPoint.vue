<template>
  <div v-if="option && item">
    <mlMarket :map="map" :item="item" :option="option" />
    <div class="devinfoViewbox">
      <div ref="infoView" class="devinfoview bg-white posr wrap">
        <div class="heiall wall d-flex-cen infoView-text">
          <div class="infoView-title">
            压路机 cs20211
          </div>
          <div class="infoView-content grey3">
            <div class="d-flex align-items-center mgt5">
              <div class="panel-title">厂家</div>
              <span>:</span>
              <div class="flex">小松</div>
            </div>
            <div class="d-flex align-items-center mgt5">
              <div class="panel-title">进场时间</div>
              <span>:</span>
              <div class="flex">2019-10-21</div>
            </div>
            <div class="d-flex align-items-center mgt5">
              <div class="panel-title">操作人</div>
              <span>:</span>
              <div class="flex">杨七五</div>
            </div>
            <div class="d-flex align-items-center mgt5">
              <div class="panel-title">当前状态</div>
              <span>:</span>
              <div class="flex red">检养预警</div>
            </div>
          </div>
        </div>
        <div class="view-rtopbtn posa mainbg pd5 d-flex-cen">
          <div class="btn cusp" @click="todevTrack"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mlMarket from "@/components/MapComponents/mlMarket";
import api from "@/api/index";
export default {
  props: ["map", "item", "icon"],
  data() {
    return {
      option: null,
      infoWindow: null,
    };
  },
  computed: {},
  components: {
    mlMarket,
  },
  created() {
    this.option = {
      option: {
        icon: this.icon,
      },
      events: {
        click: () => {
          this.showInfo();
        },
      },
    };
  },
  mounted() {
    this.infoWindow = new AMap.InfoWindow({
      closeWhenClickMap: true,
      content: this.$refs.infoView,
      offset: new AMap.Pixel(0, -66),
    });
  },
  methods: {
    showInfo() {
      this.infoWindow.open(this.map, new AMap.LngLat(...this.item.pos));
      //this.$router.linkTo( "EquipmentTrack")
    },
    todevTrack() {
      this.$router.linkTo( "EquipmentTrack");
    },
  },
};
</script>

<style lang="scss">
.devinfoview {
  width: 180px;
  min-height: 130px;
  .view-rtopbtn {
    top: -10px;
    right: -18px;
    border-radius: 0 10px 0 10px;
    img {
      width: 18px;
      height: 12px;
    }
  }
  .infoView-text {
    align-items: baseline;
    flex-direction: column;
  }
  .infoView-title {
    max-width: 170px;
    flex: 1;
    font-weight: 600;
  }
  .infoView-content {
    height: 110px;
    .d-flex align-items-center {
      align-items: baseline;
    }
    .panel-title {
      width: 60px;
      text-align-last: justify;
    }
    span {
      padding: 0 5px 0 3px;
    }
  }
}

.devinfoViewbox {
  display: none;
}
</style>
