<template>
  <div @mouseenter="show_btns = true" @mouseleave="show_btns = false" class="minitor-video-item" :class="v_id">
    <div :id="v_id" class="minitor-video-main"></div>
    <div
      class="minitor-video-btns"
      v-if="!show_preview"
      :class="show_btns ? 'btns-show-animation' : 'btns-hiden-animation'"
    >
      <div class="float-lt">
        <!-- 播放，停止播放 -->
        <i class="iconfont btn-btn_video_stop float-lt" v-if="!is_playing" @click="playStop"> </i>
        <i class="iconfont btn-btn_video_play float-lt" v-else @click="playPlayer"> </i>

        <!-- 截图 -->
        <i v-if="!is_playing" class="iconfont btn-btn_video_cut float-lt" @click="cutPicture"></i>

        <!-- 录制 -->
        <i v-if="!is_save && !is_playing" class="iconfont btn-btn_video_record float-lt" @click="startSave"></i>
        <div v-if="is_save && !is_playing" class="float-lt video_record">
          <i style="color:red" class="iconfont btn-btn_video_record float-lt" @click="stopSave"></i>
          <span style="color:#fff;">{{ saveTimes }}</span>
        </div>
      </div>
      <!-- 放大缩小 -->
      <div class="float-rt" style="font-size: 22px;">
        <i v-if="!is_fulll" @click="fullScreen" class="iconfont btn-btn_max"></i>
        <i v-else class="iconfont btn-btn_min" @click="fullScreen"></i>
      </div>
    </div>
    <div class="video-mask" @click.stop="$emit('s-click', v_key)" @dblclick.stop="fullScreen">
      <img v-if="show_preview || is_playing" style="width:100%;height: 100%;" :src="item.url" alt="" srcset="" />
    </div>
    <div
      v-if="show_preview"
      class="video-mask-loading"
      @click.stop="$emit('s-click', v_key)"
      @dblclick.stop="fullScreen"
    >
      <img :src="loading_img" alt="" srcset="" />
    </div>
    <ControlArrowBtn v-show="is_fulll && item.camera_control == 1 && !is_playing" :item="item" :authToken="authToken" />
  </div>
</template>

<script>
import EZUIKit from './ezuikit.js';
import ControlArrowBtn from './ControlArrowBtn';
export default {
  components: {
    ControlArrowBtn
  },
  props: {
    v_key: {
      type: [String, Number],
      required: true
    },
    authToken: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    sensor: {
      type: Boolean,
      default: true
    },
    grid: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      v_id: 'video_',
      player: null,
      autoSize: null,
      is_playing: false,
      show_btns: false,
      show_preview: true,
      width: 0,
      height: 0,
      is_fulll: false,
      is_save: false,
      save_times: 0,
      interval: null,
      loading_img: require('./loading_web.gif')
    };
  },
  created() {
    this.v_id = this.v_id + this.v_key;
    this.autoSize = () => {
      this.autoResize();
    };
  },
  watch: {
    sensor(val, old) {
      if (val == old) {
        return;
      }
      if (val) {
        this.playPlayer();
      } else {
        this.playStop();
      }
    },
    grid(val, old) {
      if (val == old) {
        return;
      }
      this.autoResize();
    },
    item(val, old) {
      if (val === old) {
        return;
      }
      this.init();
    }
  },
  computed: {
    saveTimes() {
      if (this.save_times < 60) {
        return '00:' + this.isTen(this.save_times);
      } else if (this.save_times >= 60 && this.save_times < 60 * 60) {
        let minute = parseInt(this.save_times / 60);
        let seconds = this.save_times % 60;
        return this.isTen(minute) + ':' + this.isTen(seconds);
      } else {
        let hours = parseInt(this.save_times / 3600);
        let minute = parseInt((this.save_times - hours * 3600) / 60);
        let seconds = this.save_times % 60;
        return this.isTen(hours) + ':' + this.isTen(minute) + ':' + this.isTen(seconds);
      }
    }
  },
  mounted() {
    let vodeo_box = document.querySelector('.' + this.v_id);
    this.width = vodeo_box.clientWidth;
    this.height = vodeo_box.clientHeight;
    this.init();
  },
  methods: {
    init() {
      if (this.player) {
        this.show_preview = true;
        let dom = document.getElementById(this.v_id);
        dom.innerHTML = '';
        this.player.destroy();
      }
      window.removeEventListener('resize', this.autoSize);
      this.player = new EZUIKit.EZUIKitPlayer({
        autoplay: true,
        id: this.v_id,
        accessToken: this.authToken,
        url: this.item.video_ezopen,
        template: 'simple',
        width: this.width,
        height: this.height,
        handleSuccess: () => {
          setTimeout(() => {
            this.show_preview = false;
          }, 1000);
        }
      });
      window.addEventListener('resize', this.autoSize);
    },
    isTen(num) {
      return num < 10 ? '0' + num : num;
    },
    startSave() {
      this.interval = setInterval(() => {
        this.save_times += 1;
      }, 1000);
      this.player.startSave(this.item.camera + '_' + Date.now());
      this.is_save = true;
    },
    stopSave() {
      this.player.stopSave();
      clearInterval(this.interval);
      this.is_save = false;
      this.save_times = 0;
    },
    // 截图
    cutPicture() {
      this.player.capturePicture(this.item.camera + '_' + Date.now());
    },
    // 放大
    fullScreen() {
      this.$emit('fullScreen', this.v_key);
      this.is_fulll = !this.is_fulll;
    },
    // 停止播放
    playStop() {
      this.is_playing = true;
      this.$nextTick(() => {
        this.player.stop(0);
      });
    },
    // 播放
    playPlayer() {
      this.show_preview = true;
      this.player.play({
        url: this.item.video_ezopen,
        accessToken: this.authToken
      });
      this.is_playing = false;
    },
    // 视频自适应大小
    autoResize() {
      let vodeo_box = document.querySelector('.' + this.v_id);
      var width = vodeo_box.clientWidth;
      var height = vodeo_box.clientHeight;
      if (this.width == width && this.height == height) {
        return;
      }
      this.width = width;
      this.height = height;
      let iframe = document.getElementById('EZUIKitPlayer-' + this.v_id);
      iframe.width = width;
      iframe.height = height;
      setTimeout(() => {
        this.player.autoResize();
      }, 100);
    }
  },
  beforeDestroy() {
    this.player.destroy();
    window.removeEventListener('resize', this.autoSize);
  }
};
</script>

<style scoped>
.minitor-video-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.minitor-video-main {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.video-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 98;
  cursor: pointer;
  top: 0;
}
.video-mask-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  cursor: pointer;
  top: 0;
}
.video-mask-loading img {
  position: absolute;
  width: 100px;
  height: 100px;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
.minitor-video-btns {
  height: 40px;
  width: 100%;
  z-index: 100;

  position: absolute;
  bottom: 10px;
  left: 0px;
  box-sizing: border-box;
  padding: 10px 10px;
  line-height: 20px;
}
.minitor-video-btns i {
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 30px;
  border-radius: 15px;
  margin-right: 12px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
}
.minitor-video-btns i:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
.video_record {
  border-radius: 15px;
  line-height: 30px;
  padding-right: 12px;
  background-color: rgba(0, 0, 0, 0.5);
}
.video_record i {
  margin-right: 8px;
}
.video_record:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
.float-rt i {
  margin-right: 0px;
}
.minitor-video-btn:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.float-lt {
  float: left;
}
.float-rt {
  float: right;
}
.btns-show-animation {
  bottom: 10px;
  animation: showbtns 0.5s;
  -moz-animation: showbtns 0.5s;
  -webkit-animation: showbtns 0.5s;
  -o-animation: showbtns 0.5s;
}
.btns-hiden-animation {
  bottom: -40px;
  animation: hidenbtns 0.5s;
  -moz-animation: hidenbtns 0.5s;
  -webkit-animation: hidenbtns 0.5s;
  -o-animation: hidenbtns 0.5s;
}
@keyframes showbtns {
  from {
    bottom: -40px;
  }
  to {
    bottom: 0px;
  }
}

@-moz-keyframes showbtns /* Firefox */ {
  from {
    bottom: -40px;
  }
  to {
    bottom: 0px;
  }
}

@-webkit-keyframes showbtns /* Safari 和 Chrome */ {
  from {
    bottom: -40px;
  }
  to {
    bottom: 0px;
  }
}

@-o-keyframes showbtns /* Opera */ {
  from {
    bottom: -40px;
  }
  to {
    bottom: 0px;
  }
}

@keyframes hidenbtns {
  from {
    bottom: 0px;
  }
  to {
    bottom: -40px;
  }
}

@-moz-keyframes hidenbtns /* Firefox */ {
  from {
    bottom: 0px;
  }
  to {
    bottom: -40px;
  }
}

@-webkit-keyframes hidenbtns /* Safari 和 Chrome */ {
  from {
    bottom: 0px;
  }
  to {
    bottom: -40px;
  }
}

@-o-keyframes hidenbtns /* Opera */ {
  from {
    bottom: 0px;
  }
  to {
    bottom: -40px;
  }
}
</style>
