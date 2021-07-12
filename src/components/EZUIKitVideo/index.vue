<template>
  <div class="minitor-video" :class="'grid-' + grid">
    <div
      class="float-lt minitor-video-item-box"
      :class="{
        active: active === i,
        'video-item-full': isfull && active === i
      }"
      v-for="(item, i) in videoList"
      :key="i"
    >
      <EZUIKitVideoItem
        :ref="'VideoItem' + i"
        :v_key="i"
        :grid="grid"
        :authToken="authToken"
        :item="item"
        :sensor="!isfull || active === i"
        v-show="!isfull || active === i"
        @s-click="sClick"
        @fullScreen="fullScreen"
      />
    </div>
  </div>
</template>

<script>
import EZUIKitVideoItem from "./item";
export default {
  components: {
    EZUIKitVideoItem
  },
  props: {
    grid: {
      type: Number,
      default: 4 // 4,9,16
    },
    authToken: {
      type: String,
      required: true
    },
    videoList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      active: null,
      isfull: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    fullScreen(ind) {
      this.active = ind;
      this.isfull = !this.isfull;
      this.$emit('changefull',this.isfull)
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs["VideoItem" + ind][0].autoResize();
        });
      });
    },
    sClick(ind) {
      this.active = ind;
    }
  },
};
</script>

<style scoped>
.minitor-video {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  box-sizing: border-box;
}
.minitor-video:after {
  content: "";
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
.minitor-video-item-box {
  overflow: hidden;
  border-radius: 10px;
  margin-top: 10px;
  box-sizing: border-box;
}
.video-item-full .minitor-video-item {
  width: 100% !important;
  height: calc(100% - 20px) !important;
  top: 10px;
  left: 0;
  position: absolute;
}
.grid-4 .minitor-video-item-box {
  width: calc(50% - 5px);
  height: calc(50% - 10px);
  margin-top: 10px;
  padding: 3px;
}
.grid-4 .minitor-video-item-box:nth-child(2n) {
  margin-left: 10px;
}

.grid-9 .minitor-video-item-box {
  width: calc(33.1% - 5px);
  height: calc(33.33% - 10px);
}
.grid-9 .minitor-video-item-box:nth-child(3n + 2) {
  margin-left: 10px;
  margin-right: 10px;
}

.grid-16 .minitor-video-item-box {
  width: calc(20% - 5px);
  height: calc(20% - 10px);
  margin-top: 10px;
}
.grid-16 .minitor-video-item-box {
  margin-left: 10px;
}
.grid-16 .minitor-video-item-box:nth-child(4n + 1) {
  margin-left: 0px;
}
</style>
