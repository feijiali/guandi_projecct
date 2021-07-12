<template>
  <div class="content-info-box w-100 h-100 rounded-1 clear position-relative">
    <div
      class="common-choose-box bg-white d-flex justify-content-between lign-items-center"
      style="width: 98%"
    >
      <div style="width: 90%">
        <div class="d-inline-block">
          <label class="text-secondary">工程项目：</label>
          <el-select
            v-model="listQuery.organ_node"
            @change="change"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              v-if="!isShow"
              :value="this.$organ_id_en_or_pro(this)"
            ></el-option>
            <el-option
              v-for="item in projectListSelect"
              :key="item.organ_id"
              :label="item.organ"
              :value="item.organ_id"
            ></el-option>
          </el-select>
        </div>
        <div class="d-inline-block ml-2">
          <span class="grey2">工区：</span>
          <el-select
            v-model="listQuery.organ_id_union"
            placeholder="请选择"
            @change="refreshData"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="item in organArr"
              :key="item.organ_id"
              :label="item.organ"
              :value="item.organ_id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="d-inline-block ml-3">
          <span class="grey2">抓拍时间：</span>
          <el-date-picker
            @change="refreshData"
            class="el-date-picker-range-box"
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="d-inline-block ml-3">
          <span class="grey2">监控位置：</span>
          <el-select
            v-model="listQuery.camera_location"
            placeholder="请选择"
            @change="changeLocation"
          >
            <el-option label="全部" :value="''"></el-option>
            <el-option
              v-for="(item, index) in DeviceArr"
              :key="index"
              :label="item.device_location"
              :value="item.device_location"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <n-button
          v-if="isShow"
          class="ml-1"
          :btnText="'批量删除'"
          v-permission="['Weekpolice-delete']"
          @buttonClick="deleteFun(true, '', 'snapshot_id', 'delSafeSnapshot')"
        >
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
          </template>
        </n-button>
      </div>
    </div>
    <div class="content-info-box bg-white rounded-1 clear h-100">
      <div
        class="content-info-box-left bg-white rounded-1 float-left h-100 d-flex"
      >
        <div
          class="content-info-box-left-main bg-white rounded-1 float-left h-100 d-flex disf"
        >
          <div class="left-width">
            <div class="bg-white rounded-1 device-tz-box w-100 p-2 mb-1">
              <div
                class="content-info-box-left bg-white rounded-1"
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
                class="text-right mt-2 mr-1 content-info-box-bottom"
                layout="prev, pager, next"
                :page-size="grid"
                :current-page.sync="page"
                :total="videoList.length"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="content-info-box-right rounded-1 d-flex align-items-center justify-content-between flex-column"
        style="height: 90%"
      >
        <div class="bg-white rounded-1" style="width: 99%">
          <div class="container-b w-100 position-absolute">
            <el-table
              class="cursor-p-table"
              ref="table"
              :data="tableData"
              style="width: 100%"
              height="calc(100% - 30px)"
              @selection-change="handleSelectionChange"
              ><template slot="empty">
                <span>真是不巧，暂时没有数据呢~</span>
              </template>
              <el-table-column
                type="selection"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="index"
                label="序号"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <label>{{
                    (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
                  }}</label>
                </template>
              </el-table-column>
              <el-table-column label="违章截图" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.pic_url" alt="" class="capture-img" />
                </template>
              </el-table-column>
              <el-table-column
                label="监控位置"
                align="center"
                prop="camera"
              ></el-table-column>
              <el-table-column
                label="抓拍内容"
                align="center"
                prop="snapshot_content"
              ></el-table-column>
              <el-table-column
                label="抓拍时间"
                align="center"
                prop="snapshot_sub_time"
              ></el-table-column>
              <el-table-column
                label="操作"
                v-if="isShow"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <i
                    @click.stop="
                      deleteFun(
                        false,
                        scope.row,
                        'snapshot_id',
                        'delSafeSnapshot'
                      )
                    "
                    v-permission="['Weekpolice-delete']"
                    class="iconfont btn-btn_list_trash trash-icon-btn"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-show="totalcount > 0"
              background
              class="text-right mt-1 mr-1"
              layout="prev, pager, next"
              :page-size="listQuery.page_size"
              @current-change="getList"
              :current-page.sync="currentPage"
              :total="totalcount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import EZUIKitVideo from "@/components/EZUIKitVideo";
export default {
  mixins: [table, confirm],
  components: {
    EZUIKitVideo,
  },
  data() {
    return {
      hardware_imei: "",
      month: this.$utils.getCurrentTime("", "", "month"),
      isShow: this.$route.meta.isProject,
      postURL: "querySafeSnapshotList",
      dateRange: [], //日期范围
      deleData: {},
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        start_time: Number(this.$utils.fun_date(-30).replace(/-/g, "")),
        end_time: Number(
          this.$utils.getCurrentTime("", "", "day").replace(/-/g, "")
        ),
        snapshot_type: 4,
        organ_node: this.$organ_id_en_or_pro(this),
        organ_id_union: 0,
        camera_location: "",
      },
      start_time: this.$utils.fun_date(-30),
      end_time: this.$utils.getCurrentTime("", "", "day"),
      snapshotTypeArr: ["", "安全帽", "手机", "抽烟", "周界"],
      isfull: false,
      defaultNodeKey: "0x", //当前选中的节点
      treeData: [], //人员组织架构数据
      videoList: [], //左侧中间区域视频列表
      isActive: 0, //当前选中的视频
      grid: 4,
      accessToken: "", //视频授权码
      videoLength: 0, //所有视频的个数
      videoArr: [],
      page: 1,
      organArr: [], //标段
      DeviceArr: [],
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async mounted() {
    await this.queryYsyToken();
    await this.querySafeSnapshotDeviceLocation();
    this.getTreeData();
    this.queryYsyVideoOrgan();
    // 获取视频授权码
  },
  methods: {
    change(val) {
      this.listQuery.organ_node = val;
      this.queryYsyVideoOrgan();
      this.currentPage = 1;
      this.getTreeData();
      this.listQuery.organ_id_union = 0,
      this.querySafeSnapshotDeviceLocation();
      this.getList();
    },
    async querySafeSnapshotDeviceLocation() {
      let data = await api.querySafeSnapshotDeviceLocation({
        organ_node: this.listQuery.organ_node
          ? this.listQuery.organ_node
          : this.projectListSelect[0].organ_id,
      });
      this.DeviceArr = data.result;
    },
    async queryYsyVideoOrgan() {
      let data = await api.queryYsyVideoOrgan({
        organ_node: this.listQuery.organ_node
          ? this.listQuery.organ_node
          : this.projectListSelect[0].organ_id,
      });
      this.organArr = data.result;
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
      let res = await api.queryYsyVideo({
        organ_node: this.listQuery.organ_node,
        camera_type: 10,
      });
      let arr = [],
        exparr = [],
        data = res.result;
      this.videoArr = [];
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
            camera: "全部",
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
      this.videoList = videoarr;
    },

    //选择监控位置
    changeLocation() {
      this.currentPage = 1;
      this.getList();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.listQuery.start_time = this.dateRange
        ? Number(this.dateRange[0])
        : null;
      this.listQuery.end_time = this.dateRange
        ? Number(this.dateRange[1])
        : null;
      this.currentPage = 1;
      this.getList();
    },
    // 删除
    /**
     * @param {Object} t:1-批量删除 2-表格行删除
     * @param {Object} row:删除的数据
     */
    handleDelete(t, row) {
      let snapshot_ids = [];
      if (t == 1) {
        if (this.selectionDeleteArr.length > 0) {
          this.selectionDeleteArr.forEach((ele) => {
            snapshot_ids.push(ele.snapshot_id);
          });
          this.confirm().then(() => {
            this.deleData.snapshot_ids = snapshot_ids.join(",");
            this.sureDelete("delSafeSnapshot");
          });
        } else {
          this.$tip({
            isTip: true,
            message: "请勾选要删除的项",
          });
        }
      } else {
        this.confirm().then(() => {
          this.deleData.snapshot_id = row.snapshot_id;
          this.sureDelete("delSafeSnapshot");
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nodata {
  position: absolute;
  top: 30%;
  left: 20%;
}
.capture-img {
  width: 100px;
  height: 50px;
}
.common-choose-box {
  position: absolute;
  top: 15px;
  left: 20px;
}
.content-info-box {
  .content-info-box-left {
    height: 95%;
    width: 49%;
    .left-width {
      width: 100%;
    }
  }
  .content-info-box-left-main {
    width: 100%;
    height: 100%;
    .device-tz-box {
      position: absolute;
      right: 0;
      bottom: 0;
      top: 60px;
    }
  }
  .content-info-box-right {
    position: absolute;
    right: 10px;
    top: 70px;
    bottom: 10px;
    &.full {
      bottom: 10px;
    }
  }
  .intel_item {
    background-size: 100% 100%;
    padding: 0;
    border-radius: 8px;
    border: 2px solid transparent;

    .videoZ {
      user-select: none;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 52px;
      z-index: 3;
      top: 0;
      &::before {
        content: "";
        display: block;
        width: 52px;
        height: 52px;
        position: absolute;
        right: 0;
        bottom: -52px;
      }
    }
  }
  .intel_item_choose {
    border: 2px solid #557dfd;
    box-shadow: 0 1px 8px #c0c4cc;
  }
  .content-info-box-right {
    height: 95%;
    width: 49.5%;
  }
}
.content-info-box-bottom {
  position: absolute;
  bottom: 0;
  right: 68%;
}
.container-b {
  bottom: 10px;
  height: calc(100% - 30px);
}
.container-all {
  margin: 0 10px;
  padding-bottom: 10px;
}
</style>
