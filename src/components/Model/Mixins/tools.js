export default {
  methods: {
    draw(ctx, w, per, _per, font) {
      var b = per == 0;
      if (_per < per || b) {
        b && (per = -1);
        ctx.clearRect(0, 0, 500, 500);
        _per += per / 20;
        var deg = _per * ((Math.PI * 2) / 100),
          g2 = ctx.createLinearGradient(0, 0, w, w);
        var bg = ctx.createLinearGradient(0, 0, w, w);
        // 画背景圆
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = font ? 12 : 8;
        ctx.translate(w, w);
        ctx.rotate((Math.PI / 2) * 3 - deg);
        ctx.translate(-w, -w);
        bg.addColorStop(0, "#fff");
        bg.addColorStop(0.4, "#ddd");
        bg.addColorStop(1, "#ccc");
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.arc(w, w, w - 5, 0, 360);
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        if (!b) {
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = font ? 12 : 8;
          ctx.translate(w, w);
          ctx.rotate((Math.PI / 2) * 3 - deg);
          ctx.translate(-w, -w);
          g2.addColorStop(0, "#FAC45A");
          g2.addColorStop(0.4, "#F9766D");
          g2.addColorStop(1, "#F85775");
          ctx.strokeStyle = g2;
          ctx.arc(w, w, w - 5, 0, deg);
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.font = (font ? 40 : 12) + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText((b ? 0 : per) + "%", w, w + (font ? 15 : 7));
        ctx.closePath();
        let that = this;
        window.requestAnimationFrame(function() {
          that.draw(ctx, w, per, _per, font);
        });
      }
    }
    /**
     *
     * list Array 列表 [{percent:10,plan_num:100,finsh_num:10,unit:""}]
     * name String
     */,
    canvasFun(list, name) {
      this.$nextTick(() => {
        for (var i = 0; i < list.length; i++) {
          let canvas = document.getElementById(name + i);
          this.draw(
            canvas.getContext("2d"),
            canvas.width / 2,
            list[i].percent,
            0,
            false
          );
        }
      });
    },
  },
};
