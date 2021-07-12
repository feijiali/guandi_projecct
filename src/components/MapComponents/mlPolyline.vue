<template></template>

<script>
export default {
  props: ["map", "item", "option"],
  data() {
    return {
      polyline: null
    };
  },
  mounted() {
    this.initPolyline();
  },
  methods: {
    /**
     * 画标记点
     */
    initPolyline() {
      let path = [];
      for (let i = 0; i < this.item.path.length; i++) {
        path[i] = new AMap.LngLat(...this.item.path[i]);
      }
      this.polyline = new AMap.Polyline({
        path: path,
        ...this.option.option
      });
      this.polyline.setMap(this.map);
    },
    remove() {
      this.polyline.setMap(null);
    }
  },
  beforeDestroy() {
    this.remove();
  },
  watch: {
    "item.pos": function() {
      this.remove();
      this.initPolyline();
    }
  }
};
</script>

<style>
</style>