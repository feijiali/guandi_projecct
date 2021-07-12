<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="info" class="el-form-box" :model="info">
          <!-- <el-form-item label="所属工区：" class="form-item-long-small d-inline-block must">
           <el-select v-model="info.unit_project_organ_id_un" placeholder="请选择">
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in areaArr"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item
            label="是否互通："
            class="form-item-long-small d-inline-block must"
          >
            <el-radio-group class="radio-box" v-model="info.unit_project_ht">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="单位工程："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              v-model="info.unit_project_name"
              class="input-m"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <br />
          <!-- <el-form-item label="起止日期：" class="form-item-long-small d-inline-block must">
            <el-date-picker
              v-model="time"
              @change="changeTimeFun"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="工期：" class="form-item-long-small d-inline-block">
            <span>
              {{ info.unit_proj_duration ? `${info.unit_proj_duration}月` : "系统计算..." }}
            </span>
          </el-form-item> -->
          <el-form-item
            label="起始桩号："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              style="width: 80px !important"
              placeholder="请输入"
              v-model="unit"
            ></el-input>
            <div
              class="stake-no-input d-inline-block ml-1"
              style="width: calc(100% - 130px)"
            >
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 1)"
                v-model="pile_starta"
                :fixedNum="2"
              ></num-input>
              <span class="text-secondary">+</span>
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 2)"
                v-model="pile_startb"
                :fixedNum="2"
              ></num-input>
            </div>
          </el-form-item>
          <el-form-item
            label="终止桩号："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              style="width: 80px !important"
              placeholder="请输入"
              v-model="unit"
            ></el-input>
            <div
              class="stake-no-input d-inline-block ml-1"
              style="width: calc(100% - 130px)"
            >
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 3)"
                v-model="pile_enda"
                :fixedNum="2"
              ></num-input>
              <span class="text-secondary">+</span>
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 4)"
                v-model="pile_endb"
                :fixedNum="2"
              ></num-input>
            </div>
          </el-form-item>
          <el-form-item
            label="桥梁长度："
            class="form-item-long-small d-inline-block must"
          >
            <span>
              {{
                !info.unit_proj_pile_length
                  ? "系统计算..."
                  : info.unit_proj_pile_length + "米"
              }}
            </span>
          </el-form-item>
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
              v-model="info.unit_project_is_bim"
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
              v-model="info.unit_project_is_show"
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
      title: "新增单位工程-桥梁",
      unit: "XJ1K",
      pile_starta: "",
      pile_startb: "",
      pile_enda: "",
      pile_endb: "",
      info: {
        unit_project_id: 0,
        unit_project_organ_id_un: this.$organ_id_en_or_pro(this),
        unit_project_name: "",
        unit_proj_duration: null,
        unit_project_time_s: null,
        unit_project_time_e: null,
        unit_proj_pile_prefix: "",
        unit_proj_pile_start_string: "",
        unit_proj_pile_end_string: "",
        unit_proj_pile_start: null,
        unit_proj_pile_end: null,
        unit_proj_pile_length: null,
        unit_proj_longitude: "",
        unit_proj_latitude: "",
        unit_project_bim_pic: "",
        unit_project_bim_pic_json: "",
        unit_project_tag: "",
        unit_project_is_show: null,
        unit_project_is_bim: null,
        unit_project_ht: null,
        create_time: null,
        unit_project_times_s: "",
        unit_project_times_e: "",
      },
      item: {},
      rules: {
        // unit_project_organ_id_un: [
        //   {
        //     required: true,
        //     message: "请选择所属工区",
        //   },
        // ],
        unit_project_ht: [
          {
            required: true,
            message: "请选择是否互通",
          },
        ],
        unit_project_name: [
          {
            required: true,
            message: "请输入单位工程名称",
          },
        ],
        // unit_project_times_s: [
        //   {
        //     required: true,
        //     message: "请选择起止日期",
        //   },
        // ],
        // unit_project_times_e: [
        //   {
        //     required: true,
        //     message: "请选择工期结束时间",
        //   },
        // ],
        unit_proj_pile_start: [
          {
            required: true,
            message: "请输入起始桩号",
          },
        ],
        unit_proj_pile_end: [
          {
            required: true,
            message: "请输入终止桩号",
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
      form: {
        build_list: [],
      },
      time: [],
      areaArr: [], //所属工区
      reportArr: {},
      unit_project_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  created() {
    this.queryAreaFun();
    if (this.unit_project_id) {
      this.title = "编辑单位工程-桥梁";
      this.info.unit_project_id = this.unit_project_id;
      this.queryBridgeUnitProject();
    } else {
      this.title = "新增单位工程-桥梁";
    }
  },
  methods: {
    //获取工区数据
    async queryAreaFun() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.areaArr = res.result;
    },
    //时间改变触发函数
    changeTimeFun(val) {
      this.$set(
        this.info,
        "unit_proj_duration",
        val ? String(this.computedTimeFun()) : ""
      );
      this.info.unit_project_times_s = this.time ? this.time[0] : "";
      this.info.unit_project_times_e = this.time ? this.time[1] : "";
    },
    // 桩号改变时触发
    changeLengthFun() {
      if (
        this.pile_starta !== "" &&
        this.pile_startb !== "" &&
        this.pile_enda !== "" &&
        this.pile_endb !== ""
      ) {
        // 大里程--小到大； 小里程--大到小
        let length = Math.abs(
          project.conputedMileFun(
            this,
            1,
            "pile_starta",
            "pile_startb",
            "pile_enda",
            "pile_endb"
          )
        ).toFixed(3);
        if (length.indexOf("NaN") !== -1) {
          return;
        }
        this.$set(this.info, "unit_proj_pile_length", Number(length));
      }
    },
    //获取详情数据
    queryBridgeUnitProject() {
      api
        .queryBridgeUnitProject({ unit_project_id: this.unit_project_id })
        .then((res) => {
          var data = res.result[0];
          var start = data.unit_proj_pile_start_string.split("+");
          var end = data.unit_proj_pile_end_string.split("+");
          this.info = data;
          this.time.push(data.unit_project_times_s, data.unit_project_times_e);
          this.pile_starta = start[0];
          this.pile_startb = start[1];
          this.pile_enda = end[0];
          this.pile_endb = end[1];
          this.$refs.pic_upload.setPicList(data.pic_list);
          // if (data.url != "") {
          //   this.$refs.pic_upload.setPicList([
          //     {
          //       url: data.url,
          //       file_name: data.unit_project_bim_pic,
          //     },
          //   ]);
          // }
          this.unit = data.unit_proj_pile_prefix;
        });
    },

    //提交所有数据
    async submitFun() {
      this.info.unit_proj_pile_prefix = this.unit;
      if (
        (this.pile_starta && this.pile_startb) ||
        (this.pile_enda && this.pile_endb)
      ) {
        this.info.unit_proj_pile_start_string = `${this.pile_starta}+${this.pile_startb}`;
        this.info.unit_proj_pile_end_string = `${this.pile_enda}+${this.pile_endb}`;
        this.info.unit_proj_pile_start = this.pile_starta
          ? Number(this.pile_starta * 1000) + Number(this.pile_startb)
          : null;
        this.info.unit_proj_pile_end = this.pile_enda
          ? Number(this.pile_enda * 1000) + Number(this.pile_endb)
          : null;
      }
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
        ? "updateBridgeUnitProject"
        : "uploadBridgeUnitProject";
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
      var start = this.time[0].split("-");
      var end = this.time[1].split("-");
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
    width: 200px !important;
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
