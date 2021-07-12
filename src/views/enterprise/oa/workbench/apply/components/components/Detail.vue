<template>
  <el-drawer
    :append-to-body="true"
    :visible.sync="drawer"
    direction="rtl"
    :modal="false"
    size="90%"
    style="height: 100%"
  >
    <template>
      <div class="ml-4 pt-2 d-flex justify-content-between">
        <span class="text-hover-primary font-20 ml-1">劳务班组详情</span>
      </div>
      <div style="height: calc(100% - 80px)" class="p-2">
        <n-scroll>
          <labour-info :infoData="infoData"></labour-info>
        </n-scroll>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import LabourInfo from "@/components/LabourInfo";
import axios from "axios";
export default {
  components: {
    LabourInfo,
  },
  data() {
    return {
      infoData: {}, //详情
      drawer: false,
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    id: {
      handler: function () {
        this.querydetail();
      },
      deep: true,
    },
  },
  methods: {
    show() {
      this.drawer = true;
    },
    hide() {
      this.drawer = false;
    },
    querydetail() {
      axios
        .get("https://dev.cninct.com/labour/labourInfo", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          //   注意response.data就已经是后端传过来的数据对象了，我之所以response.data.data是因为我的后端对象的一个属性字段叫做data
          this.infoData = response.data.ext.data;
        })
        .catch((error) => {
          this.$tip({
            isTip: true,
            message: `网络错误`,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 0 !important;
  padding: 0 !important;
  position: absolute;
  left: 20px;
  top: 20px;
}
.detail-label {
  width: 80px;
}
.pic-box {
  width: 24%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(51, 119, 255, 0.1) 3px 18px 16px 0px;
  margin-right: 10px;
}
</style>
