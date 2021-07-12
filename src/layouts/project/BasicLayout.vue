<template>
  <el-container
    class="position-absolute w-100 h-100 container-div"
    :class="{
      filterIn: isFilter,
      filterOut: !isFilter,
      'select-none': isModelShow,
    }"
  >
    <sidermenu-layout></sidermenu-layout>
    <el-container class="container clear">
      <el-header class="header pds1" style="height: 40px; padding: 0">
        <v-header />
      </el-header>
      <el-main v-if="isReady" class="position-relative">
        <div
          v-show="isModelShow"
          class="p-1 w-100 h-100 bim-model"
          :class="{ dvanced: isAdvancedGeology }"
        >
          <model
            ref="model"
            :path="path"
            :isAdvancedGeology="isAdvancedGeology"
            :isField="isField"
          ></model>
        </div>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vHeader from "./Header";
import SidermenuLayout from "./SidermenuLayout";
import Model from "@/components/Model";
import api from "@/api";
import setSubject from "@/mixins/setSubject";
import setOrganTreedata from "@/mixins/setOrganTreedata";
import setOrganProject from "@/mixins/setOrganProject";
export default {
  mixins: [setSubject, setOrganTreedata, setOrganProject],
  provide() {
    return {
      // app: this,
      app: this,
    };
  },
  components: {
    vHeader,
    SidermenuLayout,
    Model,
  },
  data() {
    return {
      isFilter: false, //是否展示弹框背景模糊
      isCollapse: false, //是否折叠菜单
      isModelShow: false, //是否展示模型
      isAdvancedGeology: false, // 超前地质预报
      isField: false,
      isReady: false,
      path: [
        "/project/bim",
        "/project/advancedGeology",
        "/project/beamField/model",
      ],
    };
  },
  async created() {
    document.title = this.$store.getters.projectName;
    if (!this.$store.state.app.projectName && !this.$route.query.code) {
      this.$router.linkTo("login");
    }
    await this.getProjectData();
    await this.queryOrganTree();
    this.getOrganProjectData();
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.isFilter = false; //当弹框出现时，路由变化时，就不显示模糊背景
        // 判断是否展示模型
        if (this.path.indexOf(this.$route.fullPath) != -1) {
          this.isModelShow = true;
          this.isAdvancedGeology = false;
          this.isField = false;
          if (this.$route.fullPath == "/project/advancedGeology") {
            this.isAdvancedGeology = true;
          } else if (this.$route.fullPath == "/project/beamField/model") {
            this.isField = true;
          }
        } else {
          this.isModelShow = false;
          this.isAdvancedGeology = false;
        }
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getProjectData() {
      let organ_id = this.$store.state.app.organID;
      let title = this.$store.state.app.projectName;
      // 从企业端跳转到项目端
      if (this.$route.query.code) {
        let query = JSON.parse(this.Base64.decode(this.$route.query.code));
        this.$store.dispatch("app/set_project_id", query.project_id);
        this.$store.dispatch("app/set_project_name", query.project_simple);
        this.$store.dispatch("app/set_project_logo", query.project_logo);
        this.$store.dispatch(
          "app/set_project_classify",
          query.project_classify
        );
        title = query.project_simple;
        let data = await api.queryAccountProject({
          organ_id: query.organ_id_union,
        });
        if (data.result[0]) {
          organ_id = data.result[0].organ_id;
          this.$store.dispatch("app/set_organid", organ_id);
          this.$store.dispatch(
            "app/set_organ_rns_id",
            data.result[0].organ_rns_id
          );
        }
        // 清理url上的code
        this.$router.push({ query: {} });
      }
      // 设置地址栏的图标
      var link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = this.$store.getters.projectLogoUrl;
      document.getElementsByTagName("head")[0].appendChild(link);
      document.title = title + "智慧管理云平台";
      this.isReady = true;
      // 获取项目下的工区
      this.getSubjectData(organ_id);
      this.$store.commit("app/SET_SUBJECT_LABEL", "工区");
      this.queryOrganTree(organ_id);
    },
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
  min-width: 1460px;
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
.bim-model {
  position: absolute;
  width: 100%;
  right: 0;
  &.dvanced {
    width: calc(100% - 358px) !important;
  }
}
.filterIn {
  animation: filterChange 0.3s;
  -moz-animation: filterChange 0.3s;
  -webkit-animation: filterChange 0.3s;
  -o-animation: filterChange 0.3s;
  filter: blur(30px);
}
@keyframes filterChange {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(30px);
  }
}

@-moz-keyframes filterChange /* Firefox */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(30px);
  }
}

@-webkit-keyframes filterChange /* Safari 和 Chrome */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(30px);
  }
}

@-o-keyframes filterChange /* Opera */ {
  from {
    filter: blur(0);
  }
  to {
    filter: blur(30px);
  }
}
.filterOut {
  animation: filterOutChange 0.3s;
  -moz-animation: filterOutChange 0.3s;
  -webkit-animation: filterOutChange 0.3s;
  -o-animation: filterOutChange 0.3s;
  filter: blur(0);
}
@keyframes filterOutChange {
  from {
    filter: blur(30px);
  }
  to {
    filter: blur(0);
  }
}

@-moz-keyframes filterOutChange /* Firefox */ {
  from {
    filter: blur(30px);
  }
  to {
    filter: blur(0);
  }
}

@-webkit-keyframes filterOutChange /* Safari 和 Chrome */ {
  from {
    filter: blur(30px);
  }
  to {
    filter: blur(0);
  }
}

@-o-keyframes filterOutChange /* Opera */ {
  from {
    filter: blur(30px);
  }
  to {
    filter: blur(0);
  }
}
</style>
