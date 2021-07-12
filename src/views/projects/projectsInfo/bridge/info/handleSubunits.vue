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
            <el-select v-model="info.sub_unit_organ_id_un" placeholder="请选择">
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in areaArr"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="桥梁类型："
            class="form-item-long-small d-inline-block must"
          >
            <el-select
              v-model="info.sub_unit_type"
              placeholder="请选择"
              multiple
              collapse-tags
              @change="chooseType"
            >
              <el-option
                :label="item.name"
                :value="item.val"
                v-for="item in subUnitTypeArr"
                :key="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item
            label="子单位工程："
            class="form-item-long-small d-inline-block must"
          >
            <el-input
              class="input-m"
              v-model="info.sub_unit_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="参考范围："
            class="form-item-long-small d-inline-block"
          >
            <span v-show="pile.pile_start">
              {{ unit }}{{ pile.pile_start + "-" + unit + pile.pile_end }}
            </span>
          </el-form-item>
          <br />
          <el-form-item
            label="附属选项："
            class="form-item-long-small d-inline-block must"
          >
            <el-radio-group class="radio-box" v-model="info.sub_unit_ext">
              <el-radio :label="1">单幅</el-radio>
              <el-radio :label="2">左幅</el-radio>
              <el-radio :label="3">右幅</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="起止日期："
            class="form-item-long-small d-inline-block must"
          >
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.sub_unit_times_s"
              type="date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            >
            </el-date-picker>
            至
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.sub_unit_times_e"
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
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker> -->
          </el-form-item>
          <el-form-item
            label="工期："
            class="form-item-long-small d-inline-block must"
          >
            <span>
              {{
                info.sub_unit_duration
                  ? `${info.sub_unit_duration}月`
                  : "系统计算..."
              }}
            </span>
          </el-form-item>

          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="起始桩号："
          >
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
            class="form-item-long-small d-inline-block must"
            label="终止桩号："
          >
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
                !info.sub_proj_pile_length
                  ? "系统计算..."
                  : info.sub_proj_pile_length + "米"
              }}
            </span>
          </el-form-item>
          <el-form-item
            label="BIM名称："
            class="form-item-long-small d-inline-block"
          >
            <el-input
              class="input-m"
              v-model="info.sub_unit_bim_name"
              placeholder="请输入"
            ></el-input>
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
import upload from "@/mixins/upload";
export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      isEdit: false,
      editIndex: 0,
      flag: false,
      unit: "K",
      pile_starta: "",
      pile_startb: "",
      pile_enda: "",
      pile_endb: "",
      info: {
        sub_unit_id: null,
        sub_unit_organ_id_un: null,
        unit_project_id_un: null,
        sub_unit_ext: null,
        sub_unit_type: [],
        sub_unit_time_s: null,
        sub_unit_time_e: null,
        sub_unit_duration: "",
        sub_unit_bim_name: "",
        sub_unit_bim_pic: "",
        sub_unit_bim_pic_json: "",
        sub_proj_pile_prefix: "",
        sub_proj_pile_start_string: "",
        sub_proj_pile_end_string: "",
        sub_proj_pile_start: null,
        sub_proj_pile_end: null,
        sub_proj_pile_length: null,
        create_user: null,
        create_at: null,
        sub_unit_times_s: "",
        sub_unit_times_e: "",
      },
      rules: {
        sub_unit_organ_id_un: [
          {
            required: true,
            message: "请选择所属工区",
          },
        ],
        sub_unit_ext: [
          {
            required: true,
            message: "请选择附属选项",
          },
        ],
        sub_unit_type: [
          {
            required: true,
            message: "请选择桥梁类型",
          },
        ],
        sub_unit_times_s: [
          {
            required: true,
            message: "请选择起止日期",
          },
        ],
        sub_unit_times_e: [
          {
            required: true,
            message: "请选择工期结束时间",
          },
        ],
        sub_proj_pile_start: [
          {
            required: true,
            message: "请输入起始桩号",
          },
        ],
        sub_proj_pile_end: [
          {
            required: true,
            message: "请输入终止桩号",
          },
        ],
      },
      areaArr: [], //所属工区
      subUnitTypeArr: [
        { name: "梁式桥", val: 1 },
        { name: "拱桥", val: 2 },
        { name: "刚构桥", val: 3 },
        { name: "悬索桥", val: 4 },
        { name: "连续刚构桥", val: 5 },
        { name: "斜拉桥", val: 6 },
      ], //桥梁类型
      time: [], //起止日期
      pickerOptions: {},
      pile: { pile_start: "", pile_end: "" }, //记录预报范围
      sub_unit_id: Number(this.$route.query.sub_id), //编辑的子单位工程id
      unit_project_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //单位工程id
    };
  },
  created() {
    if (this.sub_unit_id) {
      this.title = "编辑子单位工程";
    } else {
      this.title = "新增子单位工程";
    }
    this.queryAreaFun();
    if (this.unit_project_id && !this.sub_unit_id) {
      //新增子单位工程
      this.info.unit_project_id_un = this.unit_project_id;
      this.unit = this.$route.query.name;
      this.info.sub_proj_pile_prefix = this.unit;
      this.queryBridgeUnitProject(); //查询桥梁单位工程信息
    } else if (this.sub_unit_id && this.unit_project_id) {
      this.getUnitDetailFun();
    }
  },
  methods: {
    // 选择桥梁类型
    chooseType(val) {},
    //查询单位工程
    async queryBridgeUnitProject() {
      let res = await api.queryBridgeUnitProject({
        unit_project_id: this.unit_project_id,
      });
      this.pile.pile_start = res.result[0].unit_proj_pile_start_string;
      this.pile.pile_end = res.result[0].unit_proj_pile_end_string;
    },
    //获取工区数据
    async queryAreaFun() {
      let res = await api.queryOrgan({
        organ_type: 50,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.areaArr = res.result;
    },
    //计算时间
    computedTimeFun() {
      var start = this.info.sub_unit_times_s.split("-");
      var end = this.info.sub_unit_times_e.split("-");
      var duration = (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
      return duration;
    },
    //时间改变触发函数
    changeTimeFun(val) {
      if (this.info.sub_unit_times_s && this.info.sub_unit_times_e) {
        this.$set(
          this.info,
          "sub_unit_duration",
          val ? String(this.computedTimeFun()) : ""
        );
      }
      // this.info.sub_unit_times_s = this.time ? this.time[0] : "";
      // this.info.sub_unit_times_e = this.time ? this.time[1] : "";
    },
    // 桩号改变时触发
    changeLengthFun() {
      if (
        this.pile_starta !== "" &&
        this.pile_startb !== "" &&
        this.pile_enda !== "" &&
        this.pile_endb !== ""
      ) {
        let length = Math.abs(
          project.conputedRangeFun(
            this,
            "sub_proj_pile_length",
            "pile_starta",
            "pile_startb",
            "pile_enda",
            "pile_endb",
            this.pile.pile_start,
            this.pile.pile_end,
            1
          )
        ).toFixed(3);
        // 大里程--小到大； 小里程--大到小
        if (length.indexOf("NaN") !== -1) {
          return;
        }
        this.$set(this.info, "sub_proj_pile_length", Number(length));
      }
    },
    //获取详情数据
    async getUnitDetailFun() {
      let res = await api.queryBridgeSubUnit({
        sub_unit_id: this.sub_unit_id,
      });
      var data = res.result[0];
      var start = data.sub_proj_pile_start_string.split("+");
      var end = data.sub_proj_pile_end_string.split("+");
      this.info = data;
      this.queryBridgeUnitProject();
      this.time.push(data.sub_unit_times_s, data.sub_unit_times_e);
      this.info.sub_unit_type = this.info.sub_unit_type.split(",").map(Number);
      this.pile_starta = start[0];
      this.pile_startb = start[1];
      this.pile_enda = end[0];
      this.pile_endb = end[1];
      this.unit = data.sub_proj_pile_prefix;
      this.$refs.pic_upload.setPicList(data.pic_list);
    },
    //提交所有数据
    async submitFun() {
      if (
        (this.pile_starta && this.pile_startb) ||
        (this.pile_enda && this.pile_endb)
      ) {
        this.info.sub_proj_pile_start_string = `${this.pile_starta}+${this.pile_startb}`;
        this.info.sub_proj_pile_end_string = `${this.pile_enda}+${this.pile_endb}`;
        this.info.sub_proj_pile_start = this.pile_starta
          ? Number(this.pile_starta * 1000) + Number(this.pile_startb)
          : null;
        this.info.sub_proj_pile_end = this.pile_enda
          ? Number(this.pile_enda * 1000) + Number(this.pile_endb)
          : null;
      }
      let temp = this.info.sub_unit_type;
      this.info.sub_unit_type = temp.join(",");
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.info)) {
        this.info.sub_unit_type = temp;
        return;
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.info.sub_unit_bim_pic = picsjson.file;
      this.info.sub_unit_bim_pic_json = picsjson.file_json;
      this.submitAllData();
    },
    //提交请求函数
    async submitAllData() {
      // if (this.flag) {
      //   return;
      // }
      // this.flag = true;
      this.info.sub_proj_pile_prefix = this.unit;
      let url = this.info.sub_unit_id
        ? "updateBridgeSubUnit"
        : "uploadBridgeSubUnit";
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
  },
};
</script>

<style scoped lang="scss">
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
    padding: 0 4px 0 8px !important;
    border: none !important;
    background-color: transparent !important;
    font-size: 14px;
  }
}
.material {
  width: 1024px;
  height: 300px;
  background-color: #f2f3fc;
  .add {
    right: 0;
    top: 0;
    border-bottom-left-radius: 10px;
    width: 50px;
    height: 50px;
    background: $main;
    img {
      margin-left: 14px;
      margin-top: 14px;
      width: 20px;
      height: 20px;
    }
  }

  .material_box {
    width: 40%;
    .edit {
      right: 0;
      top: 0;
      border-top-right-radius: 10px;
      width: 48px;
      height: 40px;
      img {
        position: absolute;
        left: 6px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 18px;
      }
    }
    .del {
      right: 40px;
      top: 0;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      width: 40px;
      height: 40px;
      background-color: #f85376;
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 24px;
      }
    }
  }
}
</style>
