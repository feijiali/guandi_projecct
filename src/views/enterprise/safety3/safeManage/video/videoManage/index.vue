<template>
  <div class="w-100 h-100">
    <n-dialog
      ref="dialog"
      :diaTit="'摄像头详情'"
      :diaWidth="'50%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="wall">
          <div class="mgl10">
            <nInfoItem
              :class="[index == 0 ? 'mt-2' : '']"
              :lable_width="item.lable_width ? item.lable_width : 92"
              :colorString="
                item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
              "
              :data="{
                name: item.name,
                value: item.fun
                  ? item.fun(infoData[item.key])
                  : infoData[item.key],
                unit: item.unit,
              }"
              :islong="item.islong ? true : false"
              v-for="(item, index) in dataInfoList"
              :key="index"
            />
            <nPicInfo
              :label_width="92"
              :title="'缩略图'"
              :picList="infoData.picList"
            />
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'摄像头管理'" />
    </div>
    <div style="height: calc(100% - 80px)" class="rounded-1 bg-white">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">所属位置：</span>
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
        </div>
        <div>
          <n-button
            v-if="isShow"
            class="ml-1"
            :btnText="'新增'"
            v-permission="['YsyVideo-upload']"
            @buttonClick="
              $router.linkTo(
                'enterprise_safety3_safeManage_video_videoManage_handle'
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" align="center" width="80">
          <template slot-scope="scope">
            <label>{{
              (currentPage - 1) * listQuery.page_size + (scope.$index + 1)
            }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="摄像头名称"
          align="center"
          prop="camera"
        ></el-table-column>
        <el-table-column
          label="所属位置"
          align="center"
          prop="organ"
        ></el-table-column>
        <el-table-column
          label="添加时间"
          align="center"
          prop="camera_submit_time"
        ></el-table-column>
        <el-table-column label="设备状态" align="center" prop="camera_status">
          <template slot-scope="scope">
            {{
              [
                "正常",
                "设备不在线",
                "设备开启视频加密",
                "设备删除",
                "失效",
                "未绑定",
                "账户下流量已超出",
                "设备接入限制",
              ][scope.row.camera_status]
            }}
          </template>
        </el-table-column>
        <el-table-column label="缩略图" align="center" prop="education_time">
          <template slot-scope="scope">
            <div @click.stop>
              <viewer :images="[scope.row.url]" class="lookPic">
                <img
                  class="bdr5"
                  style="width: 100px"
                  v-for="(item, index) in [scope.row.url]"
                  :key="index + 'image'"
                  :src="item"
                />
              </viewer>
            </div>
            <!-- <img :src="scope.row.url" class="bdr5" style="width:100px;" @click.stop="bigImg(0, [scope.row.url])"> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="isShow" width="120">
          <template slot-scope="scope">
            <i
              @click.stop="
                $router.linkTo(
                  'enterprise_safety3_safeManage_video_videoManage_handle',
                  {
                    id: scope.row.video_id,
                  }
                )
              "
              v-permission="['YsyVideo-update']"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              @click.stop="
                deleteFun(false, scope.row, 'video_id', 'delYsyVideo')
              "
              v-permission="['YsyVideo-delete']"
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      class="text-right bg-secondary"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryYsyVideoList", //表格请求接口
      isShow: this.$route.meta.isProject,
      listQuery: {
        page: 0,
        page_size: 20,
        organ_id_union: 0,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      organArr: [], //所属位置
      infoData: {},
      dataInfoList: [
        { name: "名称", key: "camera" },
        { name: "所在位置", key: "organ" },
        { name: "提交时间", key: "camera_submit_time" },
        { name: "rtmp", key: "video_rtmp", islong: true },
        { name: "rtsp", key: "video_rtsp", islong: true },
        { name: "ezopen", key: "video_ezopen", islong: true },
        { name: "deviceSerial", key: "camera_dev_serial", islong: true },
        { name: "channelNo", key: "camera_channel", islong: true },
      ],
    };
  },
  mounted() {
    // 查询所属位置
    this.queryYsyVideoOrgan();
  },
  methods: {
    async queryYsyVideoOrgan() {
      let data = await api.queryYsyVideoOrgan({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.organArr = data.result;
    },
    rowclick(row) {
      row.picList = [{ url: row.url }];
      this.infoData = row;
      this.$refs.dialog.show();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.organ_search = val;
      this.refreshData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
