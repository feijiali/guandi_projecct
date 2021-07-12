<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="info" class="el-form-box" :model="info">
          <!-- <el-form-item
            label="所属工区："
            class="form-item-long-small d-inline-block must"
          >
            <el-select v-model="info.organ_id_union" placeholder="请选择">
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in areaArr"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item
            label="附属选项："
            class="form-item-long-small d-inline-block must"
          >
            <el-radio-group
              class="radio-box"
              v-model="info.unit_proj_type"
              @change="changeUnit"
            >
              <el-radio :label="1">斜井</el-radio>
              <el-radio :label="2">左洞</el-radio>
              <el-radio :label="3">右洞</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="单位工程："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              v-model="info.unit_proj_name"
              class="input-m"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="起止日期："
            class="form-item-long-small d-inline-block must"
          >
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
          </el-form-item> -->
          <!-- <el-form-item
            label="工期："
            class="form-item-long-small d-inline-block"
          >
            <span>
              {{
                info.unit_proj_duration
                  ? `${info.unit_proj_duration}月`
                  : "系统计算..."
              }}
            </span>
          </el-form-item> -->
          <br />
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
            label="隧道长度："
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
            label="是否分前后段："
            class="form-item-long-small d-inline-block must"
          >
            <el-radio-group
              class="radio-box"
              v-model="info.unit_proj_is_segment"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <br />

          <template v-if="info.unit_proj_is_segment == 1">
            <el-form-item
              label="前段里程："
              class="form-item-long d-inline-block must"
            >
              <div class="d-inline-block">
                <el-input
                  readonly
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
                    @change="(val) => changeLengthSegmentFun(val, 5)"
                    v-model="before_segment_pile_starta"
                    :fixedNum="2"
                  ></num-input>
                  <span class="text-secondary">+</span>
                  <num-input
                    class="input-number-small"
                    @change="(val) => changeLengthSegmentFun(val, 6)"
                    v-model="before_segment_pile_startb"
                    :fixedNum="2"
                  ></num-input>
                </div>
              </div>
              <span class="p-2">至</span>
              <div class="d-inline-block">
                <el-input
                  readonly
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
                    @change="(val) => changeLengthSegmentFun(val, 7)"
                    v-model="before_segment_pile_enda"
                    :fixedNum="2"
                  ></num-input>
                  <span class="text-secondary">+</span>
                  <num-input
                    class="input-number-small"
                    @change="(val) => changeLengthSegmentFun(val, 8)"
                    v-model="before_segment_pile_endb"
                    :fixedNum="2"
                  ></num-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="后段里程："
              class="form-item-long d-inline-block must"
            >
              <div class="d-inline-block">
                <el-input
                  readonly
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
                    @change="(val) => changeLengthSegmentFun(val, 9)"
                    v-model="after_segment_pile_starta"
                    :fixedNum="2"
                  ></num-input>
                  <span class="text-secondary">+</span>
                  <num-input
                    class="input-number-small"
                    @change="(val) => changeLengthSegmentFun(val, 10)"
                    v-model="after_segment_pile_startb"
                    :fixedNum="2"
                  ></num-input>
                </div>
              </div>
              <span class="p-2">至</span>
              <div class="d-inline-block">
                <el-input
                  readonly
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
                    @change="(val) => changeLengthSegmentFun(val, 11)"
                    v-model="after_segment_pile_enda"
                    :fixedNum="2"
                  ></num-input>
                  <span class="text-secondary">+</span>
                  <num-input
                    class="input-number-small"
                    @change="(val) => changeLengthSegmentFun(val, 12)"
                    v-model="after_segment_pile_endb"
                    :fixedNum="2"
                  ></num-input>
                </div>
              </div>
            </el-form-item>
          </template>

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
      title: "新增单位工程-隧道",
      unit: "",
      pile_starta: "",
      pile_startb: "",
      pile_enda: "",
      pile_endb: "",

      before_segment_pile_starta: "",
      before_segment_pile_startb: "",
      before_segment_pile_enda: "",
      before_segment_pile_endb: "",

      after_segment_pile_starta: "",
      after_segment_pile_startb: "",
      after_segment_pile_enda: "",
      after_segment_pile_endb: "",
      info: {
        organ_id_union: this.$organ_id_en_or_pro(this),
        unit_proj_name: "",
        unit_proj_type: null,
        unit_proj_start: "",
        unit_proj_end: "",
        unit_proj_duration: "",
        unit_proj_pile_prefix: "",
        unit_proj_pile_start_string: "",
        unit_proj_pile_end_string: "",
        unit_proj_pile_start: null,
        unit_proj_pile_end: null,
        unit_proj_pile_length: null,
        unit_proj_longitude: "",
        unit_proj_latitude: "",
        unit_project_bim_pic: "",
        unit_project_tag: "",
        unit_project_is_show: null,
        unit_project_is_bim: null,
      },
      item: {},
      rules: {
        // organ_id_union: [
        //   {
        //     required: true,
        //     message: "请选择所属工区",
        //   },
        // ],
        unit_proj_type: [
          {
            required: true,
            message: "请选择附属选项",
          },
        ],
        unit_proj_name: [
          {
            required: true,
            message: "请输入单位工程名称",
          },
        ],
        // unit_proj_start: [
        //   {
        //     required: true,
        //     message: "请选择起止日期",
        //   },
        // ],
        // unit_proj_end: [
        //   {
        //     required: true,
        //     message: "请选择起止日期",
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
        unit_proj_is_segment: [
          {
            required: true,
            message: "请选择是否分前后段",
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
      areaArr: [], //工区
      unit_proj_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  created() {
    this.queryAreaFun();
    if (this.unit_proj_id) {
      this.title = "编辑单位工程-隧道";
      this.info.unit_proj_id = this.unit_proj_id;
      this.getUnitDetailFun();
    } else {
      this.title = "新增单位工程-隧道";
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

    changeUnit(e) {
      if (e == 1) {
        this.unit = "XJ1K";
      } else if (e == 2) {
        this.unit = "ZK";
      } else {
        this.unit = "YK";
      }
    },
    //时间改变触发函数
    changeTimeFun(val) {
      if (this.info.unit_proj_start && this.info.unit_proj_end) {
        this.$set(
          this.info,
          "unit_proj_duration",
          val ? String(this.computedTimeFun()) : ""
        );
      }
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
    // 前后段桩号改变时
    changeLengthSegmentFun(ind) {
      // if (ind < 9) {
      //   if (
      //     this.before_segment_pile_starta !== "" &&
      //     this.before_segment_pile_startb !== "" &&
      //     this.before_segment_pile_enda !== "" &&
      //     this.before_segment_pile_endb !== ""
      //   ) {
      //     project.conputedMileFun(
      //       this,
      //       1,
      //       "before_segment_pile_starta",
      //       "before_segment_pile_startb",
      //       "before_segment_pile_enda",
      //       "before_segment_pile_endb"
      //     );
      //   }
      // } else {
      //   if (
      //     this.after_segment_pile_starta !== "" &&
      //     this.after_segment_pile_startb !== "" &&
      //     this.after_segment_pile_enda !== "" &&
      //     this.after_segment_pile_endb !== ""
      //   ) {
      //     project.conputedMileFun(
      //       this,
      //       1,
      //       "after_segment_pile_starta",
      //       "after_segment_pile_startb",
      //       "after_segment_pile_enda",
      //       "after_segment_pile_endb"
      //     );
      //   }
      // }
    },
    //获取详情数据
    getUnitDetailFun() {
      api
        .queryTunnelUnitProj({ unit_proj_id: this.unit_proj_id })
        .then((res) => {
          let data = res.result[0];
          this.info = data;
          this.unit = this.info.unit_proj_pile_prefix;
          this.time.push(data.unit_proj_start, data.unit_proj_end);
          // 起始桩号
          let start = data.unit_proj_pile_start_string.split("+");
          let end = data.unit_proj_pile_end_string.split("+");
          this.pile_starta = start[0];
          this.pile_startb = start[1];
          this.pile_enda = end[0];
          this.pile_endb = end[1];

          // 前段起始桩号
          let pile_start_before = [
            parseInt(data.unit_proj_before_segment_pile_start / 1000),
            data.unit_proj_before_segment_pile_start % 1000,
          ];
          let pile_end_before = [
            parseInt(data.unit_proj_before_segment_pile_end / 1000),
            data.unit_proj_before_segment_pile_end % 1000,
          ];
          this.before_segment_pile_starta = pile_start_before[0];
          this.before_segment_pile_startb = pile_start_before[1];
          this.before_segment_pile_enda = pile_end_before[0];
          this.before_segment_pile_endb = pile_end_before[1];

          // 后段起始桩号
          let pile_start_after = [
            parseInt(data.unit_proj_after_segment_pile_start / 1000),
            data.unit_proj_after_segment_pile_start % 1000,
          ];
          let pile_end_after = [
            parseInt(data.unit_proj_after_segment_pile_end / 1000),
            data.unit_proj_after_segment_pile_end % 1000,
          ];
          this.after_segment_pile_starta = pile_start_after[0];
          this.after_segment_pile_startb = pile_start_after[1];
          this.after_segment_pile_enda = pile_end_after[0];
          this.after_segment_pile_endb = pile_end_after[1];
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
      // 前后段数据处理
      if (
        (this.before_segment_pile_starta && this.before_segment_pile_startb) ||
        (this.before_segment_pile_enda && this.before_segment_pile_endb)
      ) {
        this.info.unit_proj_before_segment_pile_start = this
          .before_segment_pile_starta
          ? Number(this.before_segment_pile_starta * 1000) +
            Number(this.before_segment_pile_startb)
          : null;
        this.info.unit_proj_before_segment_pile_end = this
          .before_segment_pile_enda
          ? Number(this.before_segment_pile_enda * 1000) +
            Number(this.before_segment_pile_endb)
          : null;
      }
      if (
        (this.after_segment_pile_starta && this.after_segment_pile_startb) ||
        (this.after_segment_pile_enda && this.after_segment_pile_endb)
      ) {
        this.info.unit_proj_after_segment_pile_start = this
          .after_segment_pile_starta
          ? Number(this.after_segment_pile_starta * 1000) +
            Number(this.after_segment_pile_startb)
          : null;
        this.info.unit_proj_after_segment_pile_end = this
          .after_segment_pile_enda
          ? Number(this.after_segment_pile_enda * 1000) +
            Number(this.after_segment_pile_endb)
          : null;
      }
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.info)) {
        return;
      }
      let rules2;
      if (this.info.unit_proj_is_segment == 1) {
        rules2 = {
          unit_proj_before_segment_pile_start: [
            {
              required: true,
              message: "请输入前段起始桩号",
            },
          ],
          unit_proj_before_segment_pile_end: [
            {
              required: true,
              message: "请输入前段终止桩号",
            },
          ],
          unit_proj_after_segment_pile_start: [
            {
              required: true,
              message: "请输入后段起始桩号",
            },
          ],
          unit_proj_after_segment_pile_end: [
            {
              required: true,
              message: "请输入后段终止桩号",
            },
          ],
        };
      }
      // 判断是否输入前后段
      if (!this.$utils.ruleFormPro(this, rules2, this.info)) {
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
      var url = this.info.unit_proj_id
        ? "UpdateTunnelUnitProj"
        : "UploadTunnelUnitProj";
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
      var start = this.info.unit_proj_start.split("-");
      var end = this.info.unit_proj_end.split("-");
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
