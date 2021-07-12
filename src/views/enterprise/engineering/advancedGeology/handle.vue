<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box">
          <div>
            <el-form-item class="form-item-long-small must" label="工程项目：">
              <el-select
                v-model="ruleform.predict_organ_id_un"
                placeholder="请选择"
                @change="changeNode"
              >
                <el-option
                  v-for="(item, index) of projectList"
                  :key="index + 'a'"
                  :label="item.project"
                  :value="item.organ_id_union"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="form-item-long-small must"
              label="子单位工程："
            >
              <el-select
                v-model="ruleform.predict_sub_unit_id_un"
                placeholder="请选择"
                @change="setPlie"
              >
                <el-option
                  v-for="(item, index) of subUnitList"
                  :key="index + 'c'"
                  :label="item.sub_unit_name"
                  :value="item.sub_unit_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item class="form-item-long-small must" label="预报方法：">
            <el-input
              class="input-m"
              v-model="ruleform.predict_method"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="预报时间：" class="form-item-long-small must">
            <el-date-picker
              class="el-date-editor-m"
              v-model="ruleform.predict_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            class="stake-no-input form-item-long must"
            label="预报范围："
          >
            <div class="">
              <span class="text-secondary">{{ unit }}</span>
              <div class="d-inline-block">
                <num-input
                  class="input-number-small"
                  @change="changePreLengthFun"
                  v-model="pre_start_l"
                  :fixedNum="2"
                ></num-input>
                <span class="text-secondary">+</span>
                <num-input
                  class="input-number-small"
                  @change="changePreLengthFun"
                  v-model="pre_start_r"
                  :fixedNum="2"
                ></num-input>
              </div>
              <span class="text-secondary ml-2">至</span>
              <span class="text-secondary ml-1">{{ unit }}</span>
              <div class="d-inline-block ml-1">
                <num-input
                  class="input-number-small"
                  @change="changePreLengthFun"
                  v-model="pre_end_l"
                  :fixedNum="2"
                ></num-input>
                <span class="text-secondary">+</span>
                <num-input
                  class="input-number-small"
                  @change="changePreLengthFun"
                  v-model="pre_end_r"
                  :fixedNum="2"
                ></num-input>
              </div>
            </div>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small" label="参考范围：">
            <div style="height: 40px; line-height: 40px">
              <span v-show="pile.pile_start"
                >{{ unit
                }}{{ pile.pile_start + "-" + unit + pile.pile_end }}</span
              >
            </div>
          </el-form-item>
          <el-form-item class="form-item-long-small">
            <div style="height: 40px; line-height: 40px">
              <span class="text-secondary">长度：</span>
              <span>{{
                info.pre_length === 0 ? "系统计算..." : info.pre_length + "米"
              }}</span>
            </div>
          </el-form-item>
          <br />
          <el-form-item
            class="stake-no-input form-item-long-small must"
            label="掌子面里程："
          >
            <div class="">
              <span class="text-secondary">{{ unit }}</span>
              <div class="d-inline-block">
                <num-input
                  class="input-number-small"
                  v-model="tunnel_face_start"
                  :fixedNum="2"
                ></num-input>
                <span class="text-secondary">+</span>
                <num-input
                  class="input-number-small"
                  v-model="tunnel_face_end"
                  :fixedNum="2"
                ></num-input>
              </div>
            </div>
          </el-form-item>

          <el-form-item
            label="预报情况："
            class="w-100 d-flex align-items-start"
          >
            <div>
              <div
                class="circulate-add-box mb-2"
                v-for="(item, index) in ruleform.predict_situations"
                :key="index + 'c'"
              >
                <div
                  class="circulate-add-icon cursor-p"
                  @click="addBlock(index)"
                >
                  <i
                    class="iconfont text-white font-24"
                    :class="[
                      index == 0
                        ? ' btn-btn_detail_plus_01'
                        : ' btn-btn_detail_minus_01',
                    ]"
                  ></i>
                </div>
                <el-form-item
                  class="stake-no-input w-100 must"
                  label="预报范围："
                >
                  <div class="">
                    <span class="text-secondary">{{ unit }}</span>
                    <div class="d-inline-block">
                      <num-input
                        class="input-number-small"
                        @change="(val) => changeLengthFun(val, index, item)"
                        v-model="item.situation_start_l"
                        :fixedNum="2"
                      ></num-input>
                      <span class="text-secondary">+</span>
                      <num-input
                        class="input-number-small"
                        @change="(val) => changeLengthFun(val, index, item)"
                        v-model="item.situation_start_r"
                        :fixedNum="2"
                      ></num-input>
                    </div>
                    <span class="text-secondary ml-2">至</span>
                    <span class="text-secondary ml-1">{{ unit }}</span>
                    <div class="d-inline-block ml-1">
                      <num-input
                        class="input-number-small"
                        @change="(val) => changeLengthFun(val, index, item)"
                        v-model="item.situation_end_l"
                        :fixedNum="2"
                      ></num-input>
                      <span class="text-secondary">+</span>
                      <num-input
                        class="input-number-small"
                        @change="(val) => changeLengthFun(val, index, item)"
                        v-model="item.situation_end_r"
                        :fixedNum="2"
                      ></num-input>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item class="form-item-long-middle">
                  <div style="height: 40px; line-height: 40px">
                    <span class="text-secondary">长度：</span>
                    <span>{{
                      item.predict_situation_length
                        ? item.predict_situation_length + "米"
                        : "系统计算..."
                    }}</span>
                  </div>
                </el-form-item>
                <el-form-item
                  class="form-item-long-middle must"
                  label="是否设置预警："
                >
                  <el-radio-group
                    class="radio-box"
                    v-model="item.predict_situation_warn_switch"
                  >
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  class="form-item-long-middle must"
                  label="推断围岩级别："
                >
                  <el-select
                    v-model="item.predict_situation_rock_dst"
                    placeholder="请选择"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.name"
                      v-for="(item, index) in rockArr"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="form-item-long-middle must"
                  label="原设计围岩级别："
                >
                  <el-select
                    v-model="item.predict_situation_rock_src"
                    placeholder="请选择"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.name"
                      v-for="(item, index) in rockArr"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  class="form-item-long-middle"
                  label="预警距离(米)："
                >
                  <num-input
                    class="input-number-small"
                    @change="(val) => changeLengthFun(val, index, item)"
                    v-model="item.predict_situation_warn_length"
                    :fixedNum="2"
                  ></num-input>
                </el-form-item>

                <el-form-item label="预报结果：" class="w-100 must">
                  <el-input
                    type="textarea"
                    class="textarea w-100"
                    :rows="4"
                    placeholder="请输入"
                    v-model="item.predict_situation_result"
                  ></el-input>
                </el-form-item>
                <el-form-item label="施工建议：" class="w-100 must">
                  <el-input
                    type="textarea"
                    class="textarea w-100"
                    :rows="4"
                    placeholder="请输入"
                    v-model="item.predict_situation_advice"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="地质灾害："
                  cclass="w-100 must d-flex align-items-start"
                >
                  <el-checkbox-group
                    class="check-box"
                    v-model="item.disastersList"
                    @change="checkBoxChange(item)"
                  >
                    <el-checkbox label="无"></el-checkbox>
                    <el-checkbox
                      :disabled="
                        item.disastersList.indexOf('无') != -1 ? true : false
                      "
                      :label="ele"
                      v-for="(ele, ind) in disasterArr"
                      :key="ind + 'a'"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <div class="addGelogy" v-if="item.isShowGeology">
                    <el-input v-model="item.inputName" placeholder="请输入" />

                    <n-button
                      class="mr-1"
                      :btnText="'新增'"
                      :width="'100px'"
                      :colorBtn="'blue'"
                      @buttonClick="inputSubmit(item)"
                    ></n-button>
                  </div>
                </el-form-item>
              </div>
            </div>
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
import api from "@/api";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import project from "@/plugins/project.js";
import initData from "./initData";
import dayjs from "dayjs";
export default {
  mixins: [confirm, upload, initData],
  data() {
    return {
      title: "",
      ruleform: {
        predict_id: 0,
        predict_organ_id_un: null,
        predict_sub_unit_id_un: null,
        predict_method: "",
        predict_date: dayjs().format("YYYY-MM-DD"),
        predict_start: "",
        predict_end: "",
        predict_tunnel_face: "",
        predict_length: 0,
        predict_situations: [
          {
            predict_situation_id: 0,
            predict_situation_predict_id_un: 0,
            predict_situation_result: "",
            predict_situation_advice: "",
            predict_situation_rock_dst: "",
            predict_situation_rock_src: "",
            predict_situation_warn_length: null,
            predict_situation_disasters: "",
            predict_situation_start: "",
            predict_situation_end: "",
            predict_situation_length: 0,
            predict_situation_warn_switch: 0,
            isShowGeology: false,
            inputName: "",
            disastersList: [],
          },
        ],
      },
      rules: {
        predict_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        predict_sub_unit_id_un: [
          {
            required: true,
            message: "请选择子单位工程",
          },
        ],
        predict_method: [
          {
            required: true,
            message: "请输入预报方法",
          },
        ],
        predict_date: [
          {
            required: true,
            message: "请选择预报时间",
          },
        ],
      },
      list_rules: {
        situation_start_l: [
          {
            required: true,
            message: "请输入预报范围",
          },
        ],
        situation_start_r: [
          {
            required: true,
            message: "请输入预报范围",
          },
        ],
        situation_end_l: [
          {
            required: true,
            message: "请输入预报范围",
          },
        ],
        situation_end_r: [
          {
            required: true,
            message: "请输入预报范围",
          },
        ],
        predict_situation_rock_dst: [
          {
            required: true,
            message: "请选择推断围岩级别",
          },
        ],
        predict_situation_rock_src: [
          {
            required: true,
            message: "请选择原设计围岩级别",
          },
        ],
        predict_situation_result: [
          {
            required: true,
            message: "请输入预报结果",
          },
        ],
        predict_situation_advice: [
          {
            required: true,
            message: "请输入施工建议",
          },
        ],
      },
      unit_id_un: null,
      projectList: [],
      unitList: [],
      subUnitList: [],
      rockArr: [
        {
          name: "Ⅴ",
        },
        {
          name: "Ⅳ",
        },
        {
          name: "Ⅲ",
        },
        {
          name: "Ⅱ",
        },
        {
          name: "Ⅰ",
        },
      ],
      unit: "",
      pre_start_l: "",
      pre_start_r: "",
      pre_end_l: "",
      tunnel_face_start: "",
      tunnel_face_end: "",
      pre_end_r: "",
      info: {
        situation_list: [{ warn_switch: 0, disastersList: [] }],
        pre_length: 0,
      },
      pile: { pile_start: "", pile_end: "" },
      disasterArr: [],
      predict_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  created() {
    this.getProjectList();
    // this.getRockFun();
    this.getDisasters();
    if (this.predict_id) {
      this.getInfo();
      this.title = "编辑预报台账";
    } else {
      this.title = "新增预报台账";
    }
  },
  methods: {
    // 获取地质预报表信息
    async getInfo() {
      let { result } = await api.queryTunnelGeologyPredict({
        predict_id: this.predict_id,
      });
      let info = result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }

      await this.getSubUnitList();
      this.setPlie(this.ruleform.predict_sub_unit_id_un);
      // this.getUnitList();

      // 显示范围
      let predict_start = this.ruleform.predict_start.split("+");
      let predict_end = this.ruleform.predict_end.split("+");
      let predict_tunnel_face = this.ruleform.predict_tunnel_face.split("+");
      this.pre_start_l = predict_start[0];
      this.pre_start_r = predict_start[1];
      this.pre_end_l = predict_end[0];
      this.pre_end_r = predict_end[1];
      this.tunnel_face_start = predict_tunnel_face[0];
      this.tunnel_face_end = predict_tunnel_face[1];
      this.changePreLengthFun();
      this.getListInfo();
    },
    // 获取详情列表信息
    async getListInfo() {
      let res = await api.queryTunnelGeologyPredictSituationList({
        predict_situation_predict_id_un: this.predict_id,
      });
      this.ruleform.predict_situations = res.result.map((item) => {
        let situation_start = item.predict_situation_start.split("+");
        let situation_end = item.predict_situation_end.split("+");
        return {
          ...item,
          isShowGeology: false,
          inputName: "",
          predict_situation_length: item.predict_situation_length.toFixed(2),
          situation_end_l: situation_end[0],
          situation_end_r: situation_end[1],
          situation_start_l: situation_start[0],
          situation_start_r: situation_start[1],
          disastersList: item.predict_situation_disasters
            ? item.predict_situation_disasters.split(",")
            : ["无"],
        };
      });
    },
    checkBoxChange(item) {
      if (item.disastersList.length == 0) {
        this.$set(item, "isShowGeology", false);
      }
      item.disastersList.forEach((ele, index) => {
        if (ele == "其它") {
          this.$set(item, "isShowGeology", true);
        } else if (ele == "无") {
          this.$set(item, "isShowGeology", false);
          this.$set(item, "disastersList", ["无"]);
        } else {
          this.$set(item, "isShowGeology", false);
        }
      });
    },
    inputSubmit(item) {
      if (item.inputName == "") {
        this.$tip({
          isTip: true,
          message: "请输入要新增的地址灾害",
        });
        return;
      }
      api
        .uploadTunnelGeologyPredictDisaster({ disaster: item.inputName })
        .then((res) => {
          let ind = item.disastersList.indexOf("其它");
          let arr = item.disastersList;
          arr.push(item.inputName);
          arr.splice(ind, 1);
          this.$set(item, "disastersList", arr);
          item.inputName = "";
          this.getDisasters();
          this.$set(item, "isShowGeology", false);
        });
    },
    addBlock(index) {
      if (index === 0) {
        this.ruleform.predict_situations.push({
          predict_situation_id: 0,
          predict_situation_predict_id_un: 0,
          predict_situation_result: "",
          predict_situation_advice: "",
          predict_situation_rock_dst: "",
          predict_situation_rock_src: "",
          predict_situation_warn_length: null,
          predict_situation_disasters: "",
          predict_situation_start: "",
          predict_situation_end: "",
          predict_situation_length: 0,
          predict_situation_warn_switch: 0,
          disastersList: [],
          isShowGeology: false,
          inputName: "",
          disastersList: [],
        });
      } else {
        this.ruleform.predict_situations.splice(index, 1);
      }
    },
    //选择单位工程
    setPlie(sub_unit_id) {
      let node = this.subUnitList.find(
        (item) => item.sub_unit_id == sub_unit_id
      );
      this.pile.pile_start = node.sub_unit_pile_start_string;
      this.pile.pile_end = node.sub_unit_pile_end_string;
      this.unit = node.sub_unit_pile_prefix;
      this.sub_unit_type = node.sub_unit_type;
    },
    changePreLengthFun() {
      if (
        (this.pre_start_l || this.pre_start_l === 0) &&
        (this.pre_start_r || this.pre_start_r === 0) &&
        (this.pre_end_l || this.pre_end_l === 0) &&
        (this.pre_end_r || this.pre_end_r === 0)
      ) {
        // 判断起始和结束桩号是否在参考范围内
        let length = Math.abs(
          project.conputedRangeFunFromK3(
            this,
            "pre_length",
            "pre_start_l",
            "pre_start_r",
            "pre_end_l",
            "pre_end_r",
            this.pile.pile_start,
            this.pile.pile_end,
            this.sub_unit_type
          )
        ).toFixed(2);
        this.$set(this.info, "pre_length", String(length));
      }
    },
    // 桩号改变时触发
    changeLengthFun(val, ind, item) {
      if (
        (item.situation_start_l || item.situation_start_l === 0) &&
        (item.situation_start_r || item.situation_start_r === 0) &&
        (item.situation_end_l || item.situation_end_l === 0) &&
        (item.situation_end_r || item.situation_end_r === 0)
      ) {
        let length = Math.abs(
          project.conputedRangeFunFromK3(
            this,
            "predict_situation_length",
            "situation_start_l",
            "situation_start_r",
            "situation_end_l",
            "situation_end_r",
            this.pre_start_l + "+" + this.pre_start_r,
            this.pre_end_l + "+" + this.pre_end_r,
            this.sub_unit_type,
            0,
            item,
            ind
          )
        ).toFixed(2);
        this.$set(item, "predict_situation_length", String(length));
      }
    },

    // 确认提交
    async submitFun() {
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        this.ruleform.predict_start = `${this.pre_start_l}+${this.pre_start_r}`;
        this.ruleform.predict_end = `${this.pre_end_l}+${this.pre_end_r}`;
        this.ruleform.predict_tunnel_face = `${this.tunnel_face_start}+${this.tunnel_face_end}`;
        if (
          (this.pre_start_l || this.pre_start_l === 0) &&
          (this.pre_start_r || this.pre_start_r === 0) &&
          (this.pre_end_l || this.pre_end_l === 0) &&
          (this.pre_end_r || this.pre_end_r === 0)
        ) {
        } else {
          this.$tip({
            isTip: true,
            message: "请输入预报范围",
          });
          return;
        }
        if (this.tunnel_face_start == "" || this.tunnel_face_end == "") {
          this.$tip({
            isTip: true,
            message: "请输入掌子面里程",
          });
          return;
        }
        let list = this.ruleform.predict_situations;
        for (let i = 0; i < list.length; i++) {
          if (!this.$utils.ruleFormPro(this, this.list_rules, list[i])) {
            return;
          }
          if (list[i].disastersList.length == 0) {
            this.$tip({
              isTip: true,
              message: "请选择地质灾害",
            });
            return;
          }
          list[i].predict_situation_disasters =
            list[i].disastersList.indexOf("无") != -1
              ? ""
              : list[i].disastersList.join(",");
          list[
            i
          ].predict_situation_start = `${list[i].situation_start_l}+${list[i].situation_start_r}`;
          list[
            i
          ].predict_situation_end = `${list[i].situation_end_l}+${list[i].situation_end_r}`;
          list[i].predict_situation_length = Number(
            list[i].predict_situation_length
          );

          list[i].predict_situation_warn_length = Number(
            list[i].predict_situation_warn_length
          );
        }
        this.submitAllData(this.ruleform);
      }
    },
    async submitAllData(params) {
      if (isNaN(this.predict_id)) {
        await api.uploadTunnelGeologyPredict(this.ruleform);
      } else {
        await api.updateTunnelGeologyPredict({
          ...this.ruleform,
          predict_id: this.predict_id,
        });
      }
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
.stake-no-input {
  border: 0px !important;
  border-radius: 5px !important;
  ::v-deep .el-input {
    width: 150px !important;
  }
  ::v-deep .el-input__inner {
    // border: none !important;
  }
  ::v-deep .el-input-group__prepend {
    // border: none !important;
    padding: 0 4px 0 8px !important;
    font-size: 14px;
    background-color: transparent !important;
  }
}
.circulate-add-box {
  position: relative;
  padding: 15px 15px 0 15px;
  border-radius: 8px;
  background-color: #eef1fb;
  width: 1200px;
  min-height: 300px;
  .circulate-add-icon {
    background-color: $main;
    border-radius: 0 8px 0 8px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 20px;
    z-index: 20;
  }
}
.form-item-long-middle {
  width: 50%;
}
</style>
