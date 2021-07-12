<template>
  <div id="amap-view" class="amap-view h-100 w-100 position-relative">
    <slot v-if="mapslot"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    map: Object,
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState(['safe'])
  },
  data() {
    return {
      mapslot: false,
      jsready: true,
      echartmap: null,
      layer: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = new AMap.Map('amap-view', this.option);
      map.on('complete', () => {
        this.mapslot = true;
        this.$emit('complete');
      });
      this.$emit('update:map', map);
    }
  },
  beforeDestroy() {
    // this.echartmap.dispose();
    this.$emit('update:map', null);
  },
  destroyed() {
    if (window.getaMapjs) {
      window.getaMapjs = null;
    }
  },
  watch: {
    jsready() {
      this.initMap();
    }
  }
};
</script>

<style scoped>
.amap-view {
  z-index: 1;
}
</style>
