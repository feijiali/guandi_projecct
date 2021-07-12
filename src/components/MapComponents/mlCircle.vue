<template></template>

<script>
export default {
  props: ["map", "item", "option"],
  data() {
    return {
      marker: null,
      circle: null
    };
  },
  mounted() {
    this.initCircle();
  },
  methods: {
    /**
     * 画圆
     */
    initCircle() {
      this.circle = new AMap.Circle({
        center: new AMap.LngLat(...this.item.pos), // 圆心位置
        radius: this.item.scale, // 圆半径
        ...this.option.option
      });
      // 绑定事件
      if (this.option.events) {
        for (let event in this.option.events) {
          this.circle.on(event,e =>{
            this.option.events[event](this.item,e)
          });
        }
      }
      this.map.add(this.circle);
    },
    remove() {
      this.circle.setMap(null)
    }
  },
  beforeDestroy() {
    this.remove();
  },
  watch: {
    "item.pos": function() {
      this.remove();
      this.initCircle();
    }
  }
};
</script>

<style>
</style>