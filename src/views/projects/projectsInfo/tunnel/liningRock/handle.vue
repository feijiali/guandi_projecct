<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="info" class="el-form-box" :model="info">
          <el-form-item class="form-item-long-small" label="单位工程：">
            <el-select
              v-model="info.unit_proj_id_union"
              class="wall"
              @change="changeUnit"
              placeholder="请选择"
            >
              <el-option
                :label="item.unit_proj_name"
                :value="item.unit_proj_id"
                v-for="item in unitData"
                :key="item.unit_proj_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="参考范围：">
            <span v-show="pile.pile_start">
              {{ unit }}{{ pile.pile_start + "-" + unit + pile.pile_end }}
            </span>
          </el-form-item>
          <br />
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="起始桩号："
          >
            <div class="stake-no-input d-inline-block">
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 1)"
                v-model="pile_starta"
                :fixedNum="2"
                :unit="unit"
              ></num-input>
              <span class="text-secondary">+</span>
              <num-input
                class="input-number-small"
                @change="(val) => changeLengthFun(val, 2)"
                @emitInput="(val) => queryLining(val, 1)"
                v-model="pile_startb"
                :fixedNum="2"
              ></num-input>
            </div>
          </el-form-item>
          <el-form-item
            class="form-item-long-small d-inline-block must"
            label="终止桩号："
          >
            <div class="stake-no-input d-inline-block">
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
                @emitInput="(val) => queryLining(val, 2)"
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
                !info.lining_pile_length
                  ? "系统计算..."
                  : info.lining_pile_length + "米"
              }}
            </span>
          </el-form-item>
          <el-form-item
            label="衬砌类型："
            class="form-item-long-small d-inline-block must"
          >
            <el-select
              ref="select"
              v-model="info.lining_type"
              filterable
              allow-create
              default-first-option
              placeholder="请选择/输入"
            >
              <el-option
                v-for="item in liningType"
                :key="item.lining_type"
                :label="item.lining_type"
                :value="item.lining_type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="辅助工程措施："
            class="form-item-long-small d-inline-block"
          >
            <el-select
              class="el-select"
              ref="select"
              v-model="info.lining_assist"
              filterable
              allow-create
              default-first-option
              placeholder="请选择/输入"
            >
              <el-option
                v-for="item in liningAssist"
                :key="item.lining_assist"
                :label="item.lining_assist"
                :value="item.lining_assist"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" class="form-item-long d-inline-block">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入"
              v-model="info.lining_text"
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
import project from "@/plugins/project";
import upload from "@/mixins/upload";

export default {
  mixins: [confirm, upload],
  filters: {
    checkDisable: function (val, checkArr, checkOptions) {
      return (
        (checkArr.indexOf(checkOptions[1].build_part_type) > -1 && val == 3) ||
        (checkArr.indexOf(checkOptions[3].build_part_type) > -1 && val == 1)
      );
    },
    placeName: function (val, placeArr) {
      let check = placeArr.filter((ele) => val == ele.tunnel_dig_method);
      return check[0] ? check[0].dig_part_names : null;
    },
    partName: function (val, checkOptions) {
      let arr = [];
      val.split(",").forEach((item) => {
        let check = checkOptions.filter((ele) => item == ele.build_part_type);
        check[0] ? arr.push(check[0].build_part) : null;
      });
      return arr.join(",");
    },
  },
  data() {
    return {
      title: "",
      flag: false,
      unit: "",
      pile_starta: "",
      pile_startb: "",
      pile_enda: "",
      pile_endb: "",
      unitData: [], //单位工程
      liningAssist: [],
      liningType: [],
      pile: { pile_start: "", pile_end: "" }, //记录预报范围
      info: {
        unit_proj_id_union: null,
        rock_pile_prefix: "",
        rock_pile_start_string: "",
        rock_pile_end_string: "",
        rock_pile_start: null,
        rock_pile_end: null,
        rock_pile_length: null,
        rock: "",
        lining_type: "",
        tunnel_assist: "",
        rock_desc: "",
      },
      rules: {
        unit_proj_id_union: [
          {
            required: true,
            message: "请选择单位工程",
          },
        ],
        rock_pile_start: [
          {
            required: true,
            message: "请输入起始桩号",
          },
        ],
        rock_pile_end: [
          {
            required: true,
            message: "请输入终止桩号",
          },
        ],
        lining_type: [
          {
            required: true,
            message: "请选择衬砌类型",
          },
        ],
      },
      lining_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  async created() {
    await this.QueryUnit();
    // await this.QueryLining();
    // await this.QueryLiningAssist();
    if (this.lining_id) {
      this.title = "编辑衬砌类型";
      this.info.lining_id = this.lining_id;
      this.getUnitDetailFun();
    } else {
      this.title = "新增衬砌类型";
    }
  },
  methods: {
    //判断桩号是否在已有记录的区间中
    queryLining(type) {
      if (!this.info.unit_proj_id_union) {
        this.$tip({
          isTip: true,
          message: "请先选择单位工程",
        });
        this.pile_starta = "";
        this.pile_startb = "";
        this.pile_enda = "";
        this.pile_endb = "";
        return;
      }
      if (type == 1 && this.pile_starta && this.pile_startb) {
        let params = {
          unit_proj_id: this.info.unit_proj_id_union,
          pile: `${this.pile_starta}+${this.pile_startb}`,
        };
        api.QueryTunnelLining(params).then((res) => {
          if (res.result.length != 0) {
            this.$tip({
              isTip: true,
              message: "当前桩号范围内已设置衬砌类型",
            });
            this.pile_starta = "";
            this.pile_startb = "";
            return;
          }
        });
      }
      if (type == 2 && this.pile_enda && this.pile_endb) {
        let params = {
          unit_proj_id: this.info.unit_proj_id_union,
          pile: `${this.pile_enda}+${this.pile_endb}`,
        };
        api.QueryTunnelRock(params).then((res) => {
          if (res.result.length != 0) {
            this.$tip({
              isTip: true,
              message: "当前桩号范围内已设置衬砌类型",
            });
            this.pile_enda = "";
            this.pile_endb = "";
            return;
          }
        });
      }
    },
    //单位工程
    async QueryUnit() {
      let data = await api.queryTunnelUnitProj({});
      this.unitData = data.result;
    },
    // 衬砌类型
    async QueryLining() {
      let data = await api.QueryTunnelLiningSort({});
      this.liningType = data.result;
    },
    // 衬砌辅助工程措施(
    async QueryLiningAssist() {
      let data = await api.QueryTunnelLiningAssist({});
      this.liningAssist = data.result;
    },
    //选择单位工程
    changeUnit(e) {
      let data = this.unitData.find((item) => item.unit_proj_id == e);
      this.unit = data.unit_proj_pile_prefix;
      this.pile.pile_start = data.unit_proj_pile_start_string;
      this.pile.pile_end = data.unit_proj_pile_end_string;
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
          project.conputedRangeFun(
            this,
            "lining_pile_length",
            "pile_starta",
            "pile_startb",
            "pile_enda",
            "pile_endb",
            this.pile.pile_start,
            this.pile.pile_end,
            1
          )
        ).toFixed(3);

        if (length.indexOf("NaN") !== -1) {
          return;
        }
        this.$set(this.info, "lining_pile_length", Number(length));
      }
    },
    //获取详情数据
    getUnitDetailFun() {
      api.QueryTunnelLining({ lining_id: this.lining_id }).then((res) => {
        var data = res.result[0];
        var start = data.lining_pile_start_string.split("+");
        var end = data.lining_pile_end_string.split("+");
        this.info = data;
        this.changeUnit(data.unit_proj_id_union);
        this.pile_starta = start[0];
        this.pile_startb = start[1];
        this.pile_enda = end[0];
        this.pile_endb = end[1];
        this.unit = data.unit_proj_pile_prefix;
      });
    },
    //提交所有数据
    async submitFun() {
      if (this.pile_starta || this.pile_endb) {
        this.info.lining_pile_start_string = `${this.pile_starta}+${this.pile_startb}`;
        this.info.lining_pile_end_string = `${this.pile_enda}+${this.pile_endb}`;
        this.info.lining_pile_start =
          Number(this.pile_starta * 1000) + Number(this.pile_startb);
        this.info.lining_pile_end =
          Number(this.pile_enda * 1000) + Number(this.pile_endb);
      }
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.info)) {
        return;
      }
      this.submitAllData();
    },
    //提交请求函数
    async submitAllData() {
      if (this.flag) {
        return;
      }
      this.flag = true;
      var url = this.info.lining_id
        ? "UpdateTunnelLining"
        : "UploadTunnelLining";
      await api[url](this.info);
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
<style scoped lang="scss">
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
.pile-box {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 100px;
  padding: 0 15px;
  input {
    flex: 1;
  }
}
.formitem-box {
  width: 80%;
}
.formitem-box1 {
  ::v-deep .el-input__inner {
    border: none;
  }
}
</style>
