<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <nInfoTitle :title="'基本信息'" class="mb-2" />
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <el-select
              @change="getSelectValue($event, 2)"
              v-model="ruleform.mo_me_organ_id_un"
              placeholder="请选择"
            >
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工程部位：">
            <el-select
              class="el-select"
              ref="select"
              v-model="ruleform.mo_me_part"
              filterable
              allow-create
              default-first-option
              @change="choosePart"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in mo_me_part_arr"
                :key="index"
                :label="item.mo_me_part"
                :value="item.mo_me_part"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="点号名称：">
            <el-select
              class="el-select"
              ref="select"
              v-model="ruleform.mo_me_point"
              @change="choosePoint"
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in mo_me_point_arr"
                :key="index"
                :label="item.mo_me_point"
                :value="item.mo_me_point"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="测量日期：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.mo_me_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              @change="chooseDate"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="测量天气：">
            <el-select
              class="input-m"
              v-model="ruleform.mo_me_weather"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in mo_me_weather_arr"
                :key="index"
                :label="item.mo_me_weather"
                :value="item.mo_me_weather"
              ></el-option>
            </el-select>
          </el-form-item>
          <nInfoTitle :title="'观测值'" class="mb-2" />
          <el-form-item class="form-item-long-small must" label="X：">
            <el-input
              @change="queryLast"
              class="input-m input-append"
              v-model="ruleform.mo_me_x"
              placeholder="请输入"
            >
              <span slot="append">m</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="Y：">
            <el-input
              @change="queryLast"
              class="input-m input-append"
              v-model="ruleform.mo_me_y"
              placeholder="请输入"
            >
              <span slot="append">m</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="Z：">
            <el-input
              @change="queryLast"
              class="input-m input-append"
              v-model="ruleform.mo_me_z"
              placeholder="请输入"
            >
              <span slot="append">m</span>
            </el-input>
          </el-form-item>
          <nInfoTitle :title="'日偏差值'" class="mb-2" />
          <el-form-item class="form-item-long-mini" label="X：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_dif_x"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="Y：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_dif_y"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="平面位移：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_dif_m"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="Z：">
            <el-input
              class="input-m input-append"
              disabled
              v-model="ruleform.mo_me_dif_z"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <nInfoTitle :title="'累计差值'" class="mb-2" />
          <el-form-item class="form-item-long-mini" label="X：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_total_x"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="Y：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_total_y"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="平面位移：">
            <el-input
              disabled
              class="input-m input-append"
              v-model="ruleform.mo_me_total_m"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-mini" label="Z：">
            <el-input
              class="input-m input-append"
              disabled
              v-model="ruleform.mo_me_total_z"
              placeholder="待系统计算"
            >
              <span slot="append">mm</span>
            </el-input>
          </el-form-item>
          <!-- <el-form-item class="form-item-long" label="附件照片：">
            <nPicUpload ref="pic_upload" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" />
          </el-form-item> -->
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
      title: "新增监控量测",
      fileList: [],
      ruleform: {
        mo_me_weather: "", //天气
        mo_me_x: "", //监控量测-X
        mo_me_y: "", //监控量测-y
        mo_me_z: "", //监控量测-z
        mo_me_dif_x: "", //日偏差-X
        mo_me_dif_y: "", //日偏差-y
        mo_me_dif_z: "", //日偏差-z
        mo_me_dif_m: "", //日偏差-平面位移
        mo_me_total_x: "", //累计偏差-X
        mo_me_total_y: "", //累计偏差-y
        mo_me_total_z: "", //累计偏差-z
        mo_me_total_m: "", //累计偏差-平面位移
        mo_me_part: this.$route.query.mo_me_part, //项目部位
        mo_me_point: this.$route.query.mo_me_point, //项目点号
        mo_me_organ_id_un: this.$route.query.mo_me_organ_id_un, // 工程项目
        mo_me_seq: "", //量测次序
        mo_me_month: "", //月份
        mo_me_time: "", //时间
      },
      formValidation: [
        {
          must: [
            "mo_me_organ_id_un",
            "mo_me_part",
            "mo_me_point",
            "mo_me_weather",
            "mo_me_x",
            "mo_me_y",
            "mo_me_z",
          ],
          tip: [
            "请选择工程项目",
            "请选择或输入工程部位",
            "请选择或输入点号名称",
            "请选择测量天气",
            "请输入观测值X",
            "请输入观测值Y",
            "请输入观测值Z",
          ],
        },
      ],
      editData: [],
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      // 查询上次测量数据参数
      lastQuery: {},
      mo_me_part_arr: [],
      mo_me_point_arr: [],
      mo_me_weather_arr: [
        { mo_me_weather: "晴" },
        { mo_me_weather: "雨" },
        { mo_me_weather: "阴" },
      ],
      // 精确查询工程项目下的测点和部位参数
      queryOne: {
        mo_me_part: "",
        mo_me_organ_id_un: this.$route.query.mo_me_organ_id_un,
        query_type: 2,
      },
    };
  },
  async created() {
    this.ruleform.mo_me_organ_id_un = this.projectListSelect[0].organ_id;
    this.ruleform.mo_me_time = this.getNowFormatDate;
    if (this.$route.query.monitor_measure_id) {
      this.title = "修改监控量测";
      this.querySafeMonitorMeasureInfo();
    } else {
      this.title = "新增监控量测";
      let res = await this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
      this.queryOne.mo_me_part = this.$route.query.mo_me_part;
      this.queryOne.query_type = 1;
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
    }
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
  },
  methods: {
    // 日期选择
    chooseDate(val) {
      this.ruleform.mo_me_time = val;
      this.queryCompute();
    },
    // 树形下拉选择
    getSelectValue(node) {
      this.mo_me_point_arr = [];
      this.ruleform.mo_me_part = "";
      this.ruleform.mo_me_point = "";
      this.queryOne.mo_me_part = "";
      this.ruleform.mo_me_organ_id_un = node.node.organ_id;
      this.queryOne.mo_me_organ_id_un = node.node.organ_id;
      this.queryOne.query_type = 2;
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
      this.queryCompute();
    },
    // 工程部位多选框选择事件
    choosePart(val) {
      this.ruleform.mo_me_point = "";
      this.queryOne.mo_me_point = "";
      this.queryOne.mo_me_part = val;
      this.queryOne.query_type = 1;
      this.querySafeMonitorMeasurePartOrPoint(this.queryOne);
      this.queryCompute();
    },
    choosePoint(val) {
      this.queryOne.mo_me_point = val;
      this.queryCompute();
    },
    // 输入框失焦事件
    queryLast() {
      this.queryCompute();
    },
    queryCompute() {
      if (
        this.ruleform.mo_me_organ_id_un &&
        this.ruleform.mo_me_point &&
        this.ruleform.mo_me_part &&
        this.ruleform.mo_me_x &&
        this.ruleform.mo_me_y &&
        this.ruleform.mo_me_z
      ) {
        this.querySafeMonitorMeasure();
      } else {
        this.ruleform.mo_me_dif_x = "";
        this.ruleform.mo_me_dif_y = "";
        this.ruleform.mo_me_dif_z = "";
        this.ruleform.mo_me_dif_m = "";
        (this.ruleform.mo_me_total_x = ""),
          (this.ruleform.mo_me_total_y = ""),
          (this.ruleform.mo_me_total_z = ""),
          (this.ruleform.mo_me_total_m = "");
      }
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (!this.$utils.vailNumber(this.ruleform.mo_me_x)) {
          this.$tip({
            isTip: true,
            message: "监控量测-X为数值",
          });
          this.ruleform.mo_me_x = "";
          return;
        }
        this.submitAllData();
      }
    },
    async submitAllData() {
      this.ruleform.mo_me_dif_x = String(this.ruleform.mo_me_dif_x);
      this.ruleform.mo_me_dif_y = String(this.ruleform.mo_me_dif_y);
      this.ruleform.mo_me_dif_z = String(this.ruleform.mo_me_dif_z);
      this.ruleform.mo_me_dif_m = String(this.ruleform.mo_me_dif_m);
      this.ruleform.mo_me_total_x = String(this.ruleform.mo_me_total_x);
      this.ruleform.mo_me_total_y = String(this.ruleform.mo_me_total_y);
      this.ruleform.mo_me_total_z = String(this.ruleform.mo_me_total_z);
      this.ruleform.mo_me_total_m = String(this.ruleform.mo_me_total_m);
      this.ruleform.mo_me_month = this.ruleform.mo_me_time.slice(0, 7);
      if (!this.$route.query.monitor_measure_id) {
        this.ruleform.mo_me_seq = this.ruleform.mo_me_seq + 1;
        let res = await api.uploadSafeMonitorMeasure(this.ruleform);
      } else {
        this.ruleform.mo_me_seq = this.$route.query.mo_me_seq;
        this.ruleform.monitor_measure_id = this.$route.query.monitor_measure_id;
        let res = await api.updateSafeMonitorMeasure(this.ruleform);
      }
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    // 查询所有工程部位,点号
    async querySafeMonitorMeasurePartOrPoint(param) {
      param.mo_me_organ_id_un = Number(param.mo_me_organ_id_un);
      let data = await api.querySafeMonitorMeasurePartOrPoint(param);
      if (param.query_type == 1) {
        this.mo_me_point_arr = data.result;
      }
      if (param.query_type == 2) {
        this.mo_me_part_arr = data.result;
      }
    },
    async querySafeMonitorMeasureInfo() {
      let data = await api.querySafeMonitorMeasure({
        monitor_measure_id: this.$route.query.monitor_measure_id,
      });
      this.editData = data.result[0];
      const json = [
        "mo_me_weather",
        "mo_me_x",
        "mo_me_y",
        "mo_me_z",
        "mo_me_dif_x",
        "mo_me_dif_y",
        "mo_me_dif_z",
        "mo_me_dif_m",
        "mo_me_total_x",
        "mo_me_total_y",
        "mo_me_total_z",
        "mo_me_total_m",
        "mo_me_part",
        "mo_me_point",
        "mo_me_organ_id_un",
        "mo_me_time",
      ];
      this.$utils.renderRuleForm(this, json, this.ruleform, this.editData);
    },
    // 查询上次观测值和累计差值
    async querySafeMonitorMeasure(type) {
      let data = await api.querySafeMonitorMeasure({
        mo_me_organ_id_un: Number(this.ruleform.mo_me_organ_id_un),
        mo_me_point: this.ruleform.mo_me_point,
        mo_me_part: this.ruleform.mo_me_part,
        query_type: 2,
        page: 0,
        page_size: 1,
      });
      let ping = Math.sqrt(
        (this.ruleform.mo_me_dif_x * 1000 * this.ruleform.mo_me_dif_x * 1000 +
          this.ruleform.mo_me_dif_y * 1000 * this.ruleform.mo_me_dif_y * 1000) *
          1000
      );
      let ping2 = Math.sqrt(
        (this.ruleform.mo_me_total_x *
          1000 *
          (this.ruleform.mo_me_total_x * 1000) +
          this.ruleform.mo_me_total_y *
            1000 *
            (this.ruleform.mo_me_total_y * 1000)) *
          1000
      );
      if (!data.result[0]) {
        this.ruleform.mo_me_seq = 0;
        this.ruleform.mo_me_dif_x = 0;
        this.ruleform.mo_me_dif_y = 0;
        this.ruleform.mo_me_dif_z = 0;
        this.ruleform.mo_me_dif_m = 0;
        this.ruleform.mo_me_total_x = 0;
        this.ruleform.mo_me_total_y = 0;
        this.ruleform.mo_me_total_z = 0;
        this.ruleform.mo_me_total_m = 0;
      } else {
        this.ruleform.mo_me_seq = data.result[0].mo_me_seq;
        this.ruleform.mo_me_dif_x = (
          (this.ruleform.mo_me_x - JSON.parse(data.result[0].mo_me_x)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_dif_y = (
          (this.ruleform.mo_me_y - JSON.parse(data.result[0].mo_me_y)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_dif_z = (
          (this.ruleform.mo_me_z - JSON.parse(data.result[0].mo_me_z)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_dif_m = ping.toFixed(1);
        this.ruleform.mo_me_total_x = (
          (parseFloat(this.ruleform.mo_me_dif_x) +
            parseFloat(data.result[0].mo_me_total_x)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_total_y = (
          (parseFloat(this.ruleform.mo_me_dif_y) +
            parseFloat(data.result[0].mo_me_total_y)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_total_z = (
          (parseFloat(this.ruleform.mo_me_dif_z) +
            parseFloat(data.result[0].mo_me_total_z)) *
          1000
        ).toFixed(1);
        this.ruleform.mo_me_total_m = ping2.toFixed(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-map {
  width: 100%;
  height: 360px;
}
.form-item-long-small {
  width: 33%;
}
</style>
