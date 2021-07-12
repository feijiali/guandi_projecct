<template>
  <div class="control-arrow">
    <i
      style="font-size: 90px !important"
      class="iconfont btn-btn_video_contrl_arrow_left contrl_arrow contrl_arrow_left"
      @click.stop="start({ direction: 2, speed: 0 })"
    ></i>
    <i
      style="font-size: 90px !important"
      class="iconfont btn-btn_video_contrl_arrow_right contrl_arrow contrl_arrow_right"
      @click.stop="start({ direction: 3, speed: 0 })"
    ></i>
    <i
      style="font-size: 90px !important"
      class="iconfont btn-btn_video_contrl_arrow_up contrl_arrow contrl_arrow_up"
      @click.stop="start({ direction: 0, speed: 0 })"
    ></i>
    <i
      style="font-size: 90px !important"
      class="iconfont btn-btn_video_contrl_arrow_down contrl_arrow contrl_arrow_down"
      @click.stop="start({ direction: 1, speed: 0 })"
    ></i>
    <i
      style="font-size: 39px !important"
      class="iconfont btn-btn_detail_plus_01 plus_minus plus_minus_plus"
      @click.stop="start({ direction: 8, speed: 0 })"
    ></i>
    <i
      style="font-size: 39px !important"
      class="iconfont btn-btn_detail_minus_01 plus_minus plus_minus_minus"
      @click.stop="start({ direction: 9, speed: 0 })"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    authToken: {
      type: String,
      required: true
    }
  },
  methods: {
    //开始转动
    start(obj) {
      var _this = this;
      if (!this.item.camera_dev_serial && !this.item.camera_channel) {
        return;
      }
      let data = `deviceSerial=${this.item.camera_dev_serial}&channelNo=${Number(this.item.camera_channel)}&direction=${
        obj.direction
      }&speed=${obj.speed}&accessToken=${this.authToken}`;
      fetch('https://open.ys7.com/api/lapp/device/ptz/start', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function(d) {
          return d.text();
        })
        .then(function(d) {
          let res2 = JSON.parse(d);
          if (res2.code == '200') {
            setTimeout(() => {
              fetch('https://open.ys7.com/api/lapp/device/ptz/stop', {
                method: 'POST',
                body: `deviceSerial=${_this.item.camera_dev_serial}&channelNo=${Number(
                  _this.item.camera_channel
                )}&direction=${obj.direction}&accessToken=${_this.authToken}`,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              });
            }, 1000);
          } else {
            _this.$tip({
              isTip: true,
              message: res2.msg
            });
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.control-arrow {
  position: absolute;
  right: 60px;
  bottom: 80px;
  color: #fff;
  width: 70px;
  height: 70px;
  z-index: 100;
}
.control-arrow i {
  position: absolute;
  cursor: pointer;
}
.control-arrow i:active {
  color: #4c7cff;
}
.control-arrow i.contrl_arrow {
  font-size: 90px;
}
.contrl_arrow_left {
  left: -65px;
  top: -33px;
}
.contrl_arrow_right {
  left: 46px;
  top: -31px;
}
.contrl_arrow_up {
  left: -10px;
  top: -88px;
}
.contrl_arrow_down {
  left: -8px;
  top: 24px;
}
.control-arrow .plus_minus {
  font-size: 39px !important;
  position: absolute;
  top: -3px;
}
.plus_minus_plus {
  left: -6px;
}
.plus_minus_minus {
  left: 39px;
}
</style>
