<template>
</template>
<script>
export default {
  props: ["map", "item", "option"],
  data() {
    return {
      circle: null
    };
  },
  mounted() {
    this.initMarket();
  },
  methods: {
    /**
     * 画标记点
     */
    initMarket() {
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(...this.item.pos),
        ...this.option.option
      });
      // 绑定事件
      if (this.option.events) {
        for (let event in this.option.events) {
          this.marker.on(event,e =>{
            this.option.events[event](this.item,e)
          });
        }
      }
      this.map.add(this.marker);
    },
    remove() {
      if(this.map && this.marker){
        this.map.remove(this.marker);
      }
    }
  },
  beforeDestroy() {
    this.remove();
  },
  watch: {
    "item.pos": function() {
      this.remove();
      this.initMarket();
    }
  }
};
</script>