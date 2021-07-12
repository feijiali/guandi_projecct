<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'获取经纬度'"
      :diaWidth="'800px'"
      class="lnglat-dialog"
    >
      <template slot="diaSlot">
        <div class="v-map">
          <el-input
            id="autoInput"
            v-model="ruleform.project_pos"
            placeholder="请输入"
          ></el-input>
          <div class="w-100 h-100 mt-2" id="mapProject"></div>
          <!-- <vMap v-model="map" @ready="mapReady" /> -->
          <div class="map-box fsb posa">
            <div class="map-text text-center">拖拽地图获取经纬度</div>
          </div>
        </div>
        <div class="d-flex align-items-center p-1">
          <div class="mr-1">经纬度坐标</div>
          <div class="lonlat-text rounded-1 d-flex align-items-center p-1">
            <div>
              {{
                ruleform.project_lng !== null ? ruleform.project_lng + "，" : ""
              }}
            </div>

            <div>{{ ruleform.project_lat }}</div>
          </div>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="mt-5 ml-3"
              :btnText="'确认'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="handleOk"
            ></n-button>
          </div>
        </div>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="项目名称：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="项目ID：">
            <el-select
              v-model="ruleform.project_no"
              placeholder="搜索/请选择/输入 "
              filterable
              allow-create
            >
              <el-option
                :value="item.project_no"
                :label="item.project_no"
                v-for="(item, index) in projectIDsArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="隶属机构：">
            <el-select
              v-model="ruleform.project_subordinate"
              placeholder="搜索/请选择/输入 "
              filterable
              allow-create
            >
              <el-option
                :value="item.project_subordinate"
                :label="item.project_subordinate"
                v-for="(item, index) in organArrHistory"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="项目简称：">
            <el-input
              :maxlength="12"
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project_simple"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="负责人：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project_principal"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="总造价：">
            <num-input
              v-model="ruleform.project_total_value"
              :fixedNum="2"
              unit="万元"
            ></num-input>
          </el-form-item>

          <el-form-item class="form-item-long-small must" label="联系电话：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project_tel"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small el-date-picker-singgle"
            style="padding: 0"
            label="项目工期："
          >
            <el-date-picker
              v-model="ruleform.project_start"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="开始日期"
              style="width: 44.5%"
            >
            </el-date-picker>
            至
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="ruleform.project_end"
              type="date"
              placeholder="结束日期"
              style="width: 44.5%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="项目类别：">
            <el-select
              v-model="ruleform.project_type"
              placeholder="请选择/输入"
              filterable
              allow-create
            >
              <el-option
                :value="item.project_type"
                :label="item.project_type"
                v-for="(item, index) in projectTypeArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="项目分类：">
            <el-select v-model="ruleform.project_classify" placeholder="请选择">
              <el-option :value="1" label="自营项目"></el-option>
              <el-option :value="2" label="合作项目"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="项目地址：">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project_pos"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="项目状态：">
            <el-select v-model="ruleform.project_state" placeholder="请选择">
              <el-option :value="1" label="在建项目"></el-option>
              <el-option :value="2" label="完工项目"></el-option>
              <el-option :value="3" label="停工项目"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="所属机构：">
            <el-select v-model="ruleform.organ_id_union" placeholder="请选择">
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
            <!-- <n-treeselect
              ref="treeselect"
              @getSelectNode="(val) => handleFilterChange(val)"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.organ_id_union"
            /> -->
          </el-form-item>
          <el-form-item class="form-item-long must" label="经纬度：">
            <el-input
              placeholder="请输入"
              style="width: 150px !important"
              v-model="ruleform.project_lng"
            ></el-input>
            <span class="d-inline-block ml-05 mr-05">-</span>
            <el-input
              placeholder="请输入"
              style="width: 150px !important"
              v-model="ruleform.project_lat"
            ></el-input>
            <div class="d-inline-block ml-1">
              <span>注：若无具体经纬度，请</span>
              <nStatusButton
                class="ml-1"
                @buttonClick="getLnglatshow"
                :changeColor="'#fd5571'"
                :btnText="'点击此处'"
              />
            </div>
          </el-form-item>

          <el-form-item label="BIM名称：" class="form-item-long-small">
            <el-input
              placeholder="请输入"
              class="input-m"
              v-model="ruleform.project_config_gis"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="项目logo：">
            <nPicUpload ref="pic_upload" :length="1" :multiple="false" />
          </el-form-item>
          <el-form-item class="form-item-long" label="KML文件：">
            <el-upload
              class="upload download-item position-relative useMoney-upload"
              action="xxxx"
              :multiple="false"
              name="UploadFile"
              :on-change="fileChange"
              :on-remove="fileRemove"
              :file-list="fileList"
              accept=".kml, .KML"
              :ref="'newupload'"
            >
              <div class="upload">
                <nStatusButton :changeColor="'#fd5571'" :btnText="'点击上传'" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item class="form-item-long" label="项目简介：">
            <el-input
              class="el-textarea-box-long"
              :autosize="{ minRows: 10, maxRows: 10 }"
              type="textarea"
              placeholder="请输入"
              v-model="ruleform.project_desc"
            ></el-input>
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
// import vMap from "@/components/Map";
const amapUrl =
  "https://webapi.amap.com/maps?v=1.4.15&key=a420b02e3f8387ad0973443c446dc3a8";

// import {
//   clickgetPoistion,
//   createMarker,
//   setPosition,
//   getAddress,
//   CreateIcon,
//   ampSize,
//   ampPixel,
// } from "@/plugins/mapUtils";
export default {
  // components: {
  //   vMap,
  // },
  mixins: [confirm],
  data() {
    return {
      title: "",
      info: {},
      dateRange: [],
      ruleform: {
        organ_id_union: null,
        project: "",
        project_no: "",
        project_simple: "",
        project_principal: "",
        project_tel: "",
        project_type: "",
        project_classify: 1, //1-自营；2-合作
        project_state: null,
        project_total_value: "",
        project_pos: "",
        project_lng: "",
        project_lat: "",
        project_start: "",
        project_end: "",
        project_desc: "",
        project_kml: "",
        project_config_gis: "",
      },
      // map: null,
      // lat: null,
      // lng: null,
      // market: null,
      map: null,
      marker: null,
      jsready: false,
      autocomplete: null,
      project_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //
      rules: {
        project: [
          {
            required: true,
            message: "请填写项目名称",
          },
        ],
        project_no: [
          {
            required: true,
            message: "请填写项目ID",
          },
        ],
        project_subordinate: [
          {
            required: true,
            message: "请输入/选择隶属机构",
          },
        ],

        project_principal: [
          {
            required: true,
            message: "请填写负责人",
          },
        ],
        // project_simple: [
        //   {
        //     required: true,
        //     message: '请填写项目简称'
        //   }
        // ],
        project_total_value: [
          {
            required: true,
            message: "请填写总造价",
          },
        ],
        project_tel: [
          {
            required: true,
            message: "请填写联系电话",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
        // project_start: [
        //   {
        //     required: true,
        //     message: "请选择开始日期",
        //   },
        // ],
        // project_end: [
        //   {
        //     required: true,
        //     message: "请选择结束日期",
        //   },
        // ],
        project_type: [
          {
            required: true,
            message: "请选择/输入项目类别",
          },
        ],
        project_classify: [
          {
            required: true,
            message: "请选择项目分类",
          },
        ],
        project_pos: [
          {
            required: true,
            message: "请选择项目地址",
          },
        ],
        project_state: [
          {
            required: true,
            message: "请选择项目状态",
          },
        ],
        organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        project_lat: [
          {
            required: true,
            message: "请填写或通过按钮获取经纬度",
          },
        ],
      },
      fileList: [],
      projectTypeArr: [], //项目类别
      projectIDsArr: [], //项目ID
      organArrHistory: [], //隶属机构
    };
  },
  watch: {
    jsready() {
      this.initMap();
    },
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  async created() {
    if (this.project_id) {
      this.title = "编辑单位项目";
      await this.queryInfo();
    } else {
      this.title = "新增单位项目";
    }
    // 查询项目类型
    this.queryProjectInfoProjectType();
    // 查询项目编号(唯一性)
    this.queryProjectInfoProjectNo();
    // 查询项目隶属机构
    this.QueryProjectInfoProjectSubordinate();
  },
  methods: {
    async queryProjectInfoProjectType() {
      let { result } = await api.queryProjectInfoProjectType({});
      this.projectTypeArr = result;
    },

    async QueryProjectInfoProjectSubordinate() {
      let { result } = await api.QueryProjectInfoProjectSubordinate({});
      this.organArrHistory = result;
    },
    async queryProjectInfoProjectNo() {
      let { result } = await api.queryProjectInfoProjectNo({});
      this.projectIDsArr = result;
    },
    async queryInfo() {
      let res = await api.queryProjectInfoProject({
        project_id: this.project_id,
      });
      this.info = res.result[0];
      for (let val in this.ruleform) {
        this.ruleform[val] = this.info[val];
      }
      if (this.info.project_kml) {
        this.fileList = [
          {
            name: this.info.project_kml,
            file_name: this.info.project_kml,
            url: this.info.kml_url,
          },
        ];
      }
      // 回填项目logo
      this.info.project_logo_list &&
        this.$refs.pic_upload.setPicList(this.info.project_logo_list);
    },
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.$refs.pic_upload.picList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请上传项目logo",
        });
        return;
      }
      // 判断资料图片是否上传
      let file_obj = { uploadFileModule: "ProjectInfoProject" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.ruleform.project_logo = picsjson.file;
      this.ruleform.project_logo_json = picsjson.file_json;
      if (this.fileList) {
        await this.$utils.uploadFile.call(this, ["fileList"], {
          uploadFileModule: "ProjectInfoProject",
        });
        // 拼装上传参数
        let fileListArr = [];
        //   let file_jsonArr = [];
        for (let value of this.fileList) {
          fileListArr.push(value.file_name);
          //   file_jsonArr.push(value.file_json);
        }
        this.ruleform.project_kml = fileListArr.join();
        // this.ruleforms.money_approval_file_json = JSON.stringify(file_jsonArr);
      }
      let name = "uploadProjectInfoProject";
      if (this.info.project_id) {
        name = "updateProjectInfoProject";
      }
      let subdata = { ...this.info, ...this.ruleform };
      subdata.project_total_value = String(subdata.project_total_value);
      // subdata.project_simple = subdata.project; //项目简称传项目名称
      await api[name](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          // 在layout中更新顶部项目名称
          this.$bus.$emit("prject-edit", "");
          this.$router.go(-1);
        },
      });
    },
    // 获取位置弹窗
    getLnglatshow() {
      this.$refs.dialog.show();
      if (document.getElementById("aMapjs")) {
        this.jsready = true;
        this.initMap();
        this.handleKeyDown(
          this.ruleform.project_lng,
          this.ruleform.project_lat
        );
      } else {
        window.getaMapjs = () => {
          this.jsready = true;
        };
        this.initAmapJs();
      }
    },
    //初始化地图
    initAmapJs() {
      let url = amapUrl + "&callback=getaMapjs";
      let jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.id = "aMapjs";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      // this.initMap();
    },
    initMap(type) {
      this.map = new AMap.Map("mapProject", {
        center: [104.505188, 37.355138],
        zoom: 4,
        minZoom: 4,
        resizeEnable: true,
      });
      this.map.on("click", (e) => {
        this.chooseLocation(e);
      });
      //输入提示
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        var autoOptions = {
          city: "", //城市，默认全国
          input: "autoInput", //使用联想输入的input的id（也就是上边那个唯一的id）
        };
        let autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          city: "",
          map: this.map,
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          if (e.poi.location == "") {
            this.ruleform.project_pos = e.poi.name + e.poi.address;
            this.ruleform.project_lat = "";
            this.ruleform.project_lng = "";
            this.handleKeyDown();
          } else {
            this.ruleform.project_lng = e.poi.location.lng + "";
            this.ruleform.project_lat = e.poi.location.lat + "";
            this.ruleform.project_pos = e.poi.name + e.poi.address;
            this.handleKeyDown(e.poi.location.lng, e.poi.location.lat);
          }
        });
      });
    },
    // 根据输入地点定位
    handleKeyDown(lng, lat) {
      let location = this.ruleform.project_pos;
      let that = this;
      AMap.plugin("AMap.Geocoder", function () {
        let geocoder = new AMap.Geocoder();
        geocoder.getLocation(location, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            let position = [
              result.geocodes[0].location.lng,
              result.geocodes[0].location.lat,
            ];
            // that.map.setZoom(12);
            if (lng && lat) {
              that.markerFun(lng, lat);
            } else {
              that.map.setCenter(position);
              that.markerFun(
                result.geocodes[0].location.lng,
                result.geocodes[0].location.lat
              );
            }
          } else {
          }
        });
      });
    },
    markerFun(lng, lat) {
      // 删除原有的点标记
      this.marker && this.map.remove(this.marker);
      this.ruleform.project_lng = lng + "";
      this.ruleform.project_lat = lat + "";

      // 新建点标记并添加到地图上
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(
          this.ruleform.project_lng,
          this.ruleform.project_lat
        ),
      });
      this.map.add(this.marker);
      this.map.setZoom(12);
      this.map.setCenter([
        this.ruleform.project_lng,
        this.ruleform.project_lat,
      ]);
    },
    //点击地图上某个点
    chooseLocation(e) {
      this.markerFun(e.lnglat.lng, e.lnglat.lat);
      // 根据经纬度获取地点
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder();
        let lnglat = [this.ruleform.project_lng, this.ruleform.project_lat];
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            this.ruleform.project_pos = result.regeocode.formattedAddress;
          }
        });
      });
    },
    handleOk() {
      this.$refs.dialog.cancel();
    },
    getLnglat(e) {
      this.lat = e.lnglat.lat;
      this.lng = e.lnglat.lng;
      if (this.marker) {
        setPosition(this.marker, [e.lnglat.lng, e.lnglat.lat]);
        return;
      }
      let icon = CreateIcon({
        size: ampSize(41, 66), // 图标尺寸
        image: require("@/assets/images/icon_map_pin.png"),
        imageOffset: ampPixel(-11, -32), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: ampSize(41, 66), // 根据所设置的大小拉伸或压缩图片
      });
      this.marker = createMarker(this.map, [e.lnglat.lng, e.lnglat.lat], {
        icon: icon,
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      let that = this;
      that.fileList = [file];
    },
    fileRemove(file, fileList, name) {
      this.fileList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
// 拾取经纬度
.lnglat-dialog {
  .lonlat-text {
    min-width: 140px;
    height: 40px;
  }
  .v-map {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    position: relative;
    #lnglat {
      min-height: 500px;
    }
    .map-box {
      bottom: 20px;
      right: calc(50% - 80px);
      z-index: 999;
      .map-text {
        width: 190px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .ant-modal-body {
    padding-right: 0;
    padding-left: 0;
  }
}
.v-map {
  width: 100%;
  height: 400px;
}
</style>
