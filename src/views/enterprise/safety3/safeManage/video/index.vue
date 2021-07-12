<template>
  <div class="content-info-box w-100 h-100 clear position-relative">
    <div
      class="content-info-box-left bg-white rounded-1 h-100 p-2 position-relative"
    >
      <div class="content-info-box-left-tree">
        <n-tree
          :isVideo="true"
          :organize="true"
          class="single-tree pr-2 mt-2 el-tree-wall-video w-100"
          style="max-height: 90%"
          :highlight-current="false"
          :treeData="treeData"
          :defaultProps="defaultProps"
          ref="treeNode"
          @leftClick="leftClick"
          :expandAll="true"
          :defaultNodeKey="defaultNodeKey"
        >
        </n-tree>
        <div class="text-hover-primary position-absolute switch-icon cursor-p">
          <img
            class="mr-1 cursor-p"
            src="@/assets/images/btn_safemanage_playing_four.png"
            @click="changeFun(4)"
          />
          <img
            class="mr-1 cursor-p"
            src="@/assets/images/btn_safemanage_playing_nine.png"
            @click="changeFun(9)"
          />
          <img
            class="mr-1 cursor-p"
            src="@/assets/images/btn_safemanage_playing_sixteen.png"
            @click="changeFun(16)"
          />
        </div>
      </div>
    </div>
    <div class="bg-white rounded-1 content-info-box-right-contain">
      <div class="top-select-box">
        <div class="text-hover-danger d-flex">
          <div v-if="this.warningArr">
            <img height="20px" src="@/assets/images/guandi_JG.png" />{{
              this.warningArr.snapshot_time
            }}
            {{ this.warningArr.organ + this.warningArr.snapshot_content }}
          </div>
        </div>
        <div>
          <n-button
            class="ml-1"
            :btnText="'摄像头管理'"
            v-if="isShow"
            @buttonClick="
              $router.linkTo('enterprise_safety3_safeManage_video_videoManage')
            "
          >
          </n-button>
          <n-button
            :btnText="'智能抓拍'"
            class="ml-1"
            @buttonClick="
              $router.linkTo('enterprise_safety3_safeManage_video_capture')
            "
          >
          </n-button>
        </div>
      </div>
      <div
        class="content-info-box-right rounded-1"
        :class="isfull ? 'full' : ''"
      >
        <EZUIKitVideo
          ref="eZUIKitVideo"
          @changefull="changefull"
          :grid="grid"
          :authToken="accessToken"
          :videoList="
            videoList.slice((page - 1) * grid, (page - 1) * grid + grid)
          "
        />
        <n-nodata v-if="!videoList.length" class="nodata"></n-nodata>
      </div>
      <el-pagination
        v-show="videoList.length > 0 && !isfull"
        background
        class="text-right mt-1 mr-1 content-info-box-bottom"
        layout="prev, pager, next"
        :page-size="grid"
        :current-page.sync="page"
        :total="videoList.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import EZUIKitVideo from "@/components/EZUIKitVideo";

let time;
import { mapGetters } from "vuex";
export default {
  components: {
    EZUIKitVideo,
  },
  data() {
    return {
      defaultProps: {
        value: "tag", // ID字段名
        children: "video_list",
        label: "camera",
      },
      isShow: this.$route.meta.isProject,
      isfull: false,
      defaultExpandedKeySingle: [], //默认展开的单选树节点的 key 的数组
      defaultNodeKey: 0, //当前选中的节点
      treeData: [], //人员组织架构数据
      videoList: [], //左侧中间区域视频列表
      isActive: 0, //当前选中的视频
      grid: 4,
      accessToken: "", //视频授权码
      organ_node: this.$organ_id_en_or_pro(this), //点击左侧树状结构选中的节点的id
      videoLength: 0, //所有视频的个数
      videoArr: [],
      page: 1,
      warningArr: [], //警告
    };
  },
  async mounted() {
    // this.accessToken = 'at.5fwzzez12tqajolr3dd5fetobs394lho-3ut8tkjrqe-0xpzhcx-mcta7awfh';
    // 获取视频授权码
    await this.queryYsyToken();
    this.QuerySafeSnapshotList();
    this.getTreeData();
  },
  methods: {
    async QuerySafeSnapshotList() {
      let data = await api.querySafeSnapshotList({
        page: 0,
        page_size: 1,
        snapshot_type: 0,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.warningArr = data.result[0];
    },
    changefull(flag) {
      this.isfull = flag;
    },
    async queryYsyToken() {
      let data = await api.queryYsyToken({});
      if (data.result.length) {
        this.accessToken = data.result[0].token;
      } else {
        this.$tip({
          isTip: true,
          message: "没有获取到token！",
        });
      }
    },

    async getTreeData() {
      let res = await api.queryYsyVideo2({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      let arr = [],
        exparr = [],
        data = res.result[0] ? res.result[0].ysy_video_list : [];
      this.videoArr = [];
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.videoArr.push(
            data[i].video_list.map((item) => ({
              ...item,
              organ: data[i].organ,
            }))
          );
          exparr.push(i + 1 + "x");
          arr.push({
            tag: i + 1 + "x",
            node: {
              list: i,
              organ: data[i].organ,
              organ_id: data[i].organ_id,
              video_id: i + 1 + "x",
              camera: data[i].organ,
            },
            video_list: data[i].video_list.map((item) => {
              return {
                tag: item.video_id,
                node: {
                  video_id: item.video_id,
                  camera: item.camera,
                  organ: data[i].organ,
                  ...item,
                },
              };
            }),
          });
        }
        this.treeData = [
          {
            tag: "0x",
            node: {
              organ_id: this.$organ_id_en_or_pro(this),
              video_id: 0,
              camera: res.result[0].pid_organ_name,
            },
            video_list: arr,
          },
        ];
        exparr.push("0x");
        // this.defaultExpandedKeySingle = exparr;
        // 重新拿到数据后设置当前选中的节点
        let videoarr = [];
        for (let i = 0; i < this.videoArr.length; i++) {
          videoarr = [...videoarr, ...this.videoArr[i]];
        }
        videoarr.sort((acc, next) => {
          return acc.video_id - next.video_id;
        });
        this.videoList = videoarr;
      }
    },
    // 单击左侧组织架构
    leftClick(obj) {
      if (obj.item.tag == "0x") {
        if (obj.item.video_list.length == 0) {
        } else {
          let arr = [];
          for (let i = 0; i < this.videoArr.length; i++) {
            arr = [...arr, ...this.videoArr[i]];
          }
          this.$set(this, "videoList", arr);
        }
        // 大屏时切换时将大屏返回小屏列表
      } else if (
        obj.item.tag != "0x" &&
        (obj.item.node.list || obj.item.node.list == 0)
      ) {
        this.isfull = false;
        //说明点击的是第二层级，部位
        this.$set(this, "videoList", this.videoArr[obj.item.node.list]);
        // 大屏时切换时将大屏返回小屏列表
      } else {
        this.switchVideo(obj.item.node);
      }
    },
    switchVideo(node) {
      this.$set(
        this.videoList,
        this.$refs.eZUIKitVideo.active != null
          ? this.$refs.eZUIKitVideo.active
          : 0,
        node
      );
    },
    // 切换分屏
    changeFun(num) {
      this.grid = num;
      // 大屏时切换时将大屏返回小屏列表
      let ind = this.$refs.eZUIKitVideo.active;
      if (this.isfull) {
        this.$refs.eZUIKitVideo.$refs["VideoItem" + ind][0].fullScreen();
      }
    },
    linkTo(name) {
      this.$router.linkTo(name);
    },
  },
};
</script>

<style scoped lang="scss">
.nodata {
  position: absolute;
  top: 50%;
  left: 50%;
}
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 230px;
    .content-info-box-left-tree {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      background-color: #f0f4fd;
      height: 100%;
    }

    .content-info-box-left-video {
      padding: 20px;
      position: absolute;
      top: 0;
      left: 55%;
      right: 0;
      bottom: 0;
      border-radius: 0 10px 10px 0;
      height: 100%;
    }

    .content-tree-box {
      left: 0;
      right: 0;
      top: 0;
      bottom: 50px;
    }

    .switch-icon {
      left: 50px;
      bottom: 10px;
    }
  }
  .content-info-box-right-contain {
    position: absolute;
    left: 240px;
    right: 0;
    bottom: 0;
    top: 0;

    .content-info-box-right {
      position: absolute;
      right: 20px;
      top: 65px;
      left: 20px;
      bottom: 60px;
      &.full {
        bottom: 10px;
      }
    }
  }
  .content-info-box-bottom {
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
}
</style>
