<template>
  <div class="carousel-box">
    <el-carousel
      height="700px"
      :autoplay="false"
      indicator-position="none"
      :loop="false"
      arrow="always"
    >
      <el-carousel-item v-for="(item, i) in list" :key="i">
        <div class="progress_item_box">
          <div
            class="progress_item"
            v-for="(itm, inx) in item"
            in
            :key="i + '-' + inx"
          >
            <div class="w-100 h-100 progress_item_content">
              <div class="d-flex align-items-center mb-1">
                <!-- <img style="width:50px;" :src="itm.icon" /> -->
                <span class="text-white ml-1">{{ itm.project_name }}</span>
              </div>
              <n-progerss
                :color="inx % 2 == 0 ? libg[0] : libg[1]"
                :percentage="itm.ration"
                :height="20"
              ></n-progerss>
              <div class="place_box">
                <vScroll>
                  <div
                    class="place_item d-flex"
                    v-for="(ele, index) in itm.list"
                    :key="i + '-' + inx + '-' + index"
                  >
                    <div class="white place letter">{{ ele.build_name }}</div>
                    <div class="flex-fill d-flex">
                      <div class="white ml-1 flex-fill">
                        总共
                        <span class="blue1 mgl5">{{ ele.plan }}</span>
                        {{ ele.build_unit }}
                      </div>
                      <div class="white flex-fill">
                        完成
                        <span class="blue1 mgl5">{{ ele.build }}</span>
                        {{ ele.build_unit }}
                      </div>
                    </div>
                  </div>
                </vScroll>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="close d-flex-cen" @click="hiden">
      <i class="el-icon-close font-14"></i>
    </div>
  </div>
</template>

<script>
import nProgerss from "@/components/common/Chart/progerssBar";
import vScroll from "@/components/common/Scroll";

export default {
  props: {
    progressList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    nProgerss,
    vScroll,
  },
  data() {
    return {
      libg: [
        "linear-gradient(to right, #67b6fd, #5a5efd)",
        "linear-gradient(to right, #FF88C0, #F73F69)",
      ],
    };
  },
  computed: {
    list() {
      let list = [],
        sliceList = [...this.progressList];
      let num = Math.ceil(sliceList.length / 3);
      for (let i = 0; i < num; i++) {
        list.push(sliceList.slice(0, 3));
        sliceList = sliceList.slice(3);
      }
      if (sliceList.length > 0) {
        list.push(sliceList.slice(0, 3));
      }
      return list;
    },
  },
  methods: {
    hiden() {
      this.$emit("hidenTotal");
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  .close {
    border-radius: 100%;
    border: solid 2px $color-3;
    width: 36px;
    height: 36px;
    position: absolute;
    bottom: 70px;
    left: 50%;
    margin-left: -18px;
    z-index: 100;
    cursor: pointer;
  }
  .el-carousel {
    position: absolute;
    margin: auto;
    top: calc(50% - 350px);
    right: 0;
    left: 0;
    bottom: 0;
  }
}
.progress_item_box {
  width: 80%;
  display: flex;
  margin: auto;
  .progress_item {
    width: 33%;
    min-height: 400px;
    padding: 30px 20px;
    box-sizing: border-box;
    height: 700px;
    overflow: auto;
    .progress_item_content {
      background: rgba(12, 4, 105, 0.7);
      padding: 30px 20px;
      border-radius: 6px;
      .place_box {
        height: calc(100% - 50px);
        .place_item {
          padding: 10px 0;
        }
        .letter {
          width: 100px;
        }
      }
    }
  }
}
</style>
