<template>
  <section class="signature">
    <div class="signatureBox position-relative">
      <div class="canvasBox" ref="canvasHW">
        <canvas
          ref="canvasF"
          style="min-height: 100%; min-width: 100%"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp"
        ></canvas>
      </div>
    </div>
    <!-- <img class="imgCanvas" :src="imgUrl" /> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#000",
      linewidth: 3,
      isDraw: false, //签名标记
    };
  },
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 10;
    canvas.width = this.$refs.canvasHW.offsetWidth - 10;
    this.canvasTxt = canvas.getContext("2d");
    this.canvasTxt.fillStyle = "#fff";
    this.canvasTxt.fillRect(0, 0, canvas.width, canvas.height);
    this.canvasTxt.strokeStyle = this.color;
    this.canvasTxt.lineWidth = this.linewidth;
  },
  methods: {
    //电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath(); //开始作画
      this.points.push(obj); //记录点
      this.isDown = true;
    },
    //移动设备事件
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        this.isDraw = true; //签名标记
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1),
        }; //y的计算值中：document.body.offsetHeight*0.5代表的是除了整个画板signatureBox剩余的高，this.$refs.canvasHW.offsetHeight*0.1是画板中标题的高
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath(); //开始作画
        this.points.push(obj); //记录点
      }
    },
    //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    },
    //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1),
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    },
    //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1),
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 }); //记录点
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
    },
    //提交签名
    commit() {
      this.imgUrl = this.$refs.canvasF.toDataURL();
    },
  },
};
</script>

<style lang="scss" scoped>
.signatureBox {
  width: 100%;
  height: calc(100% - 250px);
  min-height: 200px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.canvasBox {
  box-sizing: border-box;
  flex: 1;
}
canvas {
  border: 1px solid #dcdfe6;
}
.btnBox {
  padding: 5px 15px 5px 25px;
  top: -5px;
  right: 0px;
  background-color: $main;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 25% 100%);
  color: #fff;
}
.btnBox button:first-of-type {
  background: transparent;
  border-radius: 2px;
  height: 40px;
  width: 80px;
  font-size: 14px;
}
.btnBox button:last-of-type {
  background: #71b900;
  color: #fff;
  border-radius: 2px;
  height: 40px;
  width: 80px;
  font-size: 14px;
}
</style>
