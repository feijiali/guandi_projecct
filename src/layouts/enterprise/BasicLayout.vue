<template>
  <el-container
    class="position-absolute w-100 h-100 container-div"
    :class="{
      filterIn: isFilter,
      filterOut: !isFilter,
      'select-none': isModelShow,
    }"
  >
    <el-header class="header" style="height: 80px; padding: 0">
      <v-header />
    </el-header>
    <el-main class="position-relative">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import vHeader from "./Header";

export default {
  provide() {
    return {
      app: this,
    };
  },
  components: {
    vHeader,
  },

  data() {
    return {
      isFilter: false, //是否展示弹框背景模糊
      isCollapse: false, //是否折叠菜单
      isModelShow: false,
      path: ["/enterprise/engineering/bim"],
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.isFilter = false; //当弹框出现时，路由变化时，就不显示模糊背景
        let ind = this.path.indexOf(this.$route.fullPath);
        if (ind != -1) {
          this.isModelShow = true;
        } else {
          this.isModelShow = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    document.title = "冠迪建设智慧管理云平台";
    // 展示模型
    // this.$bus.$on("showBIM", bool => {
    //   this.isModelShow = bool;
    // });
    // this.$bus.$on("fullScreen", bool => {
    //   this.fullScreen = bool;
    // });
    // if (
    //   this.$route.fullPath == "/project/bimgis" ||
    //   this.$route.fullPath == "/enterprise/engineering/schedule/BIM" ||
    //   this.$route.fullPath == "/project/safety/advancedPrediction"
    // ) {
    //   this.isModelShow = true;
    // } else {
    //   this.isModelShow = false;
    // }
  },
  methods: {
    changeFilter(bool) {
      this.isFilter = bool;
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped lang="scss">
.el-main {
  padding: 0 !important;
}
.header {
  background-color: $greybg;
}
.container-div {
  position: relative;
  &::before {
    position: absolute;
    z-index: -1;
    content: "";
    width: 100%;
    height: 100%;
  }
}
.filterIn {
  // animation: filterChange 0.3s;
  // -moz-animation: filterChange 0.3s;
  // -webkit-animation: filterChange 0.3s;
  // -o-animation: filterChange 0.3s;
  filter: blur(4px);
}
@keyframes filterChange {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(4px);
  }
}

@-moz-keyframes filterChange /* Firefox */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(4px);
  }
}

@-webkit-keyframes filterChange /* Safari 和 Chrome */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(4px);
  }
}

@-o-keyframes filterChange /* Opera */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(4px);
  }
}
.filterOut {
  // animation: filterOutChange 0.3s;
  // -moz-animation: filterOutChange 0.3s;
  // -webkit-animation: filterOutChange 0.3s;
  // -o-animation: filterOutChange 0.3s;
  filter: blur(0);
}
@keyframes filterOutChange {
  from {
    filter: blur(4px);
  }
  to {
    filter: blur(0);
  }
}

@-moz-keyframes filterOutChange /* Firefox */ {
  from {
    filter: blur(4px);
  }
  to {
    filter: blur(0);
  }
}

@-webkit-keyframes filterOutChange /* Safari 和 Chrome */ {
  from {
    filter: blur(4px);
  }
  to {
    filter: blur(0);
  }
}

@-o-keyframes filterOutChange /* Opera */ {
  from {
    filter: blur(4px);
  }
  to {
    filter: blur(0);
  }
}
</style>
