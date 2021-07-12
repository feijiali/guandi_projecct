<template>
  <div class="w-100 h-100">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div style="height: calc(100% - 90px)" class="p-2 rounded-1 bg-white">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="所属位置：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="名称：">
            <el-input
              class="input-m"
              v-model="ruleform.camera"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="rtmp：">
            <el-input
              class="input-m"
              v-model="ruleform.video_rtmp"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="rtsp：">
            <el-input
              class="input-m"
              v-model="ruleform.video_rtsp"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="ezopen：">
            <el-input
              class="input-m"
              v-model="ruleform.video_ezopen"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-label"
            label="deviceSerial："
          >
            <el-input
              class="input-m"
              v-model="ruleform.camera_dev_serial"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-label"
            label="channelNo："
          >
            <el-input
              class="input-m"
              v-model="ruleform.camera_channel"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-label"
            label="摄像头本地IP地址："
          >
            <el-input
              class="input-m"
              v-model="ruleform.camera_ip"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-label"
            label="摄像头关联的设备imei："
          >
            <el-input
              class="input-m"
              v-model="ruleform.camera_imei"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small form-item-long-label"
            label="视频序号："
          >
            <el-input
              class="input-m"
              v-model="ruleform.camera_no"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must form-item-long-label"
            label="是否可转动："
          >
            <el-radio-group
              v-model="ruleform.camera_control"
              class="el-radio-group-home vtt"
            >
              <el-radio :label="0">未知</el-radio>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long must" label="缩略图：">
            <nPicUpload ref="pic_upload" :length="1" />
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        video_id: 0,
        camera: "",
        video_rtmp: "",
        video_rtsp: "",
        video_http: "",
        video_ezopen: "",
        camera_pic: "",
        camera_dev_serial: "",
        camera_channel: "",
        camera_ip: "",
        camera_imei: "",
        camera_control: 2,
        organ_id_union: null,
        camera_no: null,
        camera_status: null,
        account_id_union: null,
        camera_submit_time: "",
      },
      rules: {
        organ_id_union: [
          {
            required: true,
            message: "请选择所属位置",
          },
        ],
        camera: [
          {
            required: true,
            message: "请输入名称",
          },
        ],
        video_rtmp: [
          {
            required: true,
            message: "请输入rtmp地址",
          },
        ],
        video_rtsp: [
          {
            required: true,
            message: "请输入rtsp地址",
          },
        ],
        video_ezopen: [
          {
            required: true,
            message: "请输入ezopen地址",
          },
        ],
        camera_control: [
          {
            required: true,
            message: "请选择是否可转动",
          },
        ],
      },
      video_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async created() {
    if (this.video_id) {
      this.title = "编辑摄像头";
      this.queryYsyVideo();
    } else {
      this.title = "新增摄像头";
    }
  },
  methods: {
    // 查询详情
    async queryYsyVideo() {
      let data = await api.queryYsyVideo({
        video_id: this.video_id,
      });
      let info = data.result[0];
      let arr = [];
      for (let j = 0; j < info.video_list.length; j++) {
        let jsonIn = { ...info, ...info.video_list[j] };
        arr.push(jsonIn);
      }
      delete info.video_list;
      for (let key in this.ruleform) {
        this.ruleform[key] = arr[0][key];
      }
      if (arr[0].url) {
        this.$refs.pic_upload.setPicList([
          {
            url: arr[0].url,
            file_name: arr[0].camera_pic,
          },
        ]);
      }
    },
    // 选择所属机构
    getSelectValue(node) {
      this.ruleform.organ_id_union = node.node.organ_id;
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      this.ruleform.camera_pic = await this.$refs.pic_upload.submitFun(
        false,
        file_obj
      );
      if (!this.ruleform.camera_pic) {
        this.$tip({
          isTip: true,
          message: "请选择缩略图",
        });
      }
      this.submitAllData();
    },
    //提交所有数据接口
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      await api[`${this.video_id ? "updateYsyVideo" : "uploadYsyVideo"}`](
        subdata
      );
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont.iconfont-add {
  font-size: 26px !important;
}
.inspection-content {
  display: inline-block;
  width: 500px;
  vertical-align: text-top;
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
