<template>
  <div class="content-info-box position-relative h-100">
    <div class="content-info-box-left bg-white rounded-1 p-1">
      <div
        v-permission="[item.permission]"
        v-for="(item, index) in titArr"
        :key="index"
        :class="colorId == index ? 'active' : ''"
        class="notice cursor-p p-1"
        @click="noticeBtn(item)"
      >
        <i :class="item.iconfont" class="iconfont mr-1"></i>
        {{ item.name + `${item.count ? "(" + item.count + ")" : ""}` }}
      </div>
    </div>
    <!-- <i class="iconfont btn-btn_detail_plus_01 mr-1"></i> -->
    <div class="content-info-box-right rounded-1">
      <keep-alive>
        <router-view v-if="$route.meta.secondAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.secondAlive"></router-view>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      colorId: 0,
      titArr: [],
    };
  },
  computed: {
    show() {
      return hasPermissionArr(["OaPublic-upload"]);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.show) {
        vm.colorId = 1;
        vm.$router.linkTo("enterprise_oa_allAnnouncement");
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("refresh");
    this.$bus.$off("toList");
  },
  mounted() {
    // 如果从消息跳转过来，就应该为1
    if (this.$route.query.type == "所有公告") {
      this.colorId = 1;
    }
    this.$bus.$on("toList", () => {
      this.colorId = 1;
    });
    this.$bus.$on("refresh", () => {
      this.queryOaOaPublicType();
    });
    this.queryOaOaPublicType();
  },
  methods: {
    //查询公告类型
    async queryOaOaPublicType() {
      let data = await api.queryOaOaPublicType();
      this.titArr = data.result.map((item, index) => {
        return {
          id: index + 2,
          name: item.oa_public_type,
          path: "enterprise_oa_allAnnouncement",
          count: item.count,
        };
      });
      let allCount = 0;
      this.titArr.forEach((item) => {
        allCount += item.count;
        item.permission = "OaPublic";
      });
      this.titArr.unshift(
        {
          id: 0,
          name: "发布公告",
          path: "enterprise_oa_newAnnouncement",
          iconfont: "btn-icon_note",
          permission: "OaPublic-upload",
        },
        {
          id: 1,
          name: "所有公告",
          path: "enterprise_oa_allAnnouncement",
          count: allCount,
          iconfont: "btn-icon_leftbar_layer",
          permission: "OaPublic",
        }
      );
    },
    noticeBtn(item) {
      // this.$nextTick(()=> {
      sessionStorage.removeItem("addLog");
      this.colorId = item.id;
      this.$router.linkTo(
        item.path,
        item.name != "发布公告" ? { type: item.name } : null
      );
      // })
    },
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.notice:hover {
  color: #3377ff;
  background: #f1f0f5;
}
.active {
  color: #3377ff;
  background: #f1f0f5;
}
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0px;
    top: 0px;
    width: 300px;
    .grey2 {
      line-height: 22px;
    }

    .tip-icon {
      width: 15px;
    }
  }
  .content-info-box-right {
    position: absolute;
    left: 314px;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
