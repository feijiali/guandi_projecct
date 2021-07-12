<template>
  <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
</template>
<script>
// 视频组件
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components:{
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: this.src //url地址
          }
        ],
        poster: this.poster, //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    poster:{
      type: String,
      default: ''
    }
  },
};
</script>
<style lang='scss'>
.video-player {
  width: 360px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
  border-radius: 5px;
}
.video-js .vjs-tech,
.vjs-custom-skin > .video-js {
  border-radius: 5px;
}
.video-player.vjs-custom-skin > .video-js .vjs-big-play-button {
  background: transparent;
  border: 5px solid white;
  height: 50px !important;
  line-height: 40px !important;
  border-radius: 100% !important;
  width: 50px;
  margin-left: -25px;
  left: 50%;
  top:50%;
  margin-top:-25px;
}
.video-player .video-js:hover .vjs-big-play-button,
.video-player.vjs-custom-skin > .video-js .vjs-big-play-button:focus,
.video-player.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background: transparent;
}
.vjs-icon-play:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control .vjs-icon-placeholder:before{font-size: 30px;}
</style>