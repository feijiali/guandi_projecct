<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="info" class="el-form-box" :model="info">
          <el-form-item
            label="所属工区："
            class="form-item-long-small d-inline-block must"
          >
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="info.unit_project_organ_id_un"
            />
          </el-form-item>
          <el-form-item
            label="单位工程："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              v-model="info.unit_project"
              class="input-m"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="填方："
            class="form-item-long-small d-inline-block must"
          >
            <num-input
              placeholder="请输入"
              v-model="info.unit_project_fill"
              :fixedNum="2"
              unit="m³"
            ></num-input>
          </el-form-item>
          <el-form-item
            label="挖方："
            class="form-item-long-small d-inline-block must"
          >
            <num-input
              placeholder="请输入"
              v-model="info.unit_project_dig"
              :fixedNum="2"
              unit="m³"
            ></num-input>
          </el-form-item>
          <el-form-item
            label="起止日期："
            class="form-item-long-small d-inline-block must"
          >
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.unit_project_start_time"
              type="date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            >
            </el-date-picker>
            至
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.unit_project_end_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
              style="width: 150px"
            >
            </el-date-picker>
            <!-- <el-date-picker
              v-model="time"
              @change="changeTimeFun"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker> -->
          </el-form-item>
          <el-form-item
            label="工期："
            class="form-item-long-small d-inline-block"
          >
            <span>
              {{
                info.unit_project_during
                  ? `${info.unit_project_during}月`
                  : "系统计算..."
              }}
            </span>
          </el-form-item>
          <br />
          <el-form-item
            label="经度："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              v-model="info.unit_proj_longitude"
              class="input-m"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="纬度："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              v-model="info.unit_proj_latitude"
              class="input-m"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="BIM名称："
            class="form-item-long-small d-inline-block"
          >
            <el-input
              v-model="info.unit_project_tag"
              class="input-m"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否包含BIM模型："
            class="form-item-long-small d-inline-block"
          >
            <el-radio-group
              class="radio-box"
              v-model="info.unit_project_is_show"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否在GIS中显示："
            class="form-item-long-small d-inline-block"
          >
            <el-radio-group
              class="radio-box"
              v-model="info.unit_project_is_bim"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="BIM预览图：">
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
import project from "@/plugins/project";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "新增单位工程-路基",
      info: {
        unit_project_id: null,
        unit_project: "",
        unit_project_organ_id_un: null,
        unit_project_start_time: "",
        unit_project_end_time: "",
        unit_project_during: "",
        unit_proj_longitude: "",
        unit_proj_latitude: "",
        unit_project_dig: null,
        unit_project_fill: null,
        unit_project_bim_pic: "",
        unit_project_bim_pic_json: "",
        unit_project_tag: "",
        unit_project_is_show: null,
        unit_project_is_bim: null,
        road_unit_project_sub_account_id_un: null,
        road_unit_project_sub_time: "",
        road_unit_project_sub_time_int: null,
      },
      rules: {
        unit_project_organ_id_un: [
          {
            required: true,
            message: "请选择所属工区",
          },
        ],
        unit_project: [
          {
            required: true,
            message: "请输入单位工程名称",
          },
        ],
        unit_project_fill: [
          {
            required: true,
            message: "请输入填方",
          },
        ],
        unit_project_dig: [
          {
            required: true,
            message: "请输入挖方",
          },
        ],
        unit_project_start_time: [
          {
            required: true,
            message: "请选择起止日期",
          },
        ],
        unit_project_end_time: [
          {
            required: true,
            message: "请选择起止日期",
          },
        ],
        unit_proj_longitude: [
          {
            required: true,
            message: "请输入经度",
          },
        ],
        unit_proj_latitude: [
          {
            required: true,
            message: "请输入纬度",
          },
        ],
      },
      time: [],
      unit_project_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  created() {
    if (this.unit_project_id) {
      this.title = "编辑单位工程-路基";
      this.info.unit_project_id = this.unit_project_id;
      this.queryRoadUnitProject();
    } else {
      this.title = "新增单位工程-路基";
    }
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.info.unit_project_organ_id_un = node.tag;
    },
    //时间改变触发函数
    changeTimeFun(val) {
      if (
        this.info.unit_project_start_time &&
        this.info.unit_project_end_time
      ) {
        this.$set(
          this.info,
          "unit_project_during",
          val ? String(this.computedTimeFun()) : ""
        );
      }
    },
    //获取详情数据
    async queryRoadUnitProject() {
      let res = await api.queryRoadUnitProjectList({
        unit_project_id: this.unit_project_id,
      });
      let data = res.result[0];
      this.info = data;
      this.time.push(data.unit_project_start_time, data.unit_project_end_time);
      this.$refs.pic_upload.setPicList(data.pic_list);
    },

    //提交所有数据
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.info)) {
        return;
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.info.unit_project_bim_pic = picsjson.file;
      this.info.unit_project_bim_pic_json = picsjson.file_json;
      this.submitAllData();
    },
    //提交请求函数
    async submitAllData() {
      if (this.flag) {
        return;
      }
      this.flag = true;
      var url = this.info.unit_project_id
        ? "updateRoadUnitProject"
        : "uploadRoadUnitProject";
      await api[url](this.info);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.time = [];
          this.$router.go(-1);
        },
      });
    },
    //计算时间
    computedTimeFun() {
      var start = this.info.unit_project_start_time.split("-");
      var end = this.info.unit_project_end_time.split("-");
      var duration = (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
      return duration;
    },
  },
};
</script>

<style lang="scss" scoped>
.stake-no-input {
  border: 1px solid $color-3 !important;
  border-radius: 5px !important;
  ::v-deep .el-input {
    width: 123px !important;
  }
  ::v-deep .el-input__inner {
    border: none !important;
  }
  ::v-deep .el-input-group__prepend {
    border: none !important;
    padding: 0 4px 0 8px !important;
    font-size: 14px;
    background-color: transparent !important;
  }
}
</style>
