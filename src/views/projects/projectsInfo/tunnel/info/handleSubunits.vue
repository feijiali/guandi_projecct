<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <n-dialog
      ref="dialog"
      :diaTit="dialogTitle"
      :diaWidth="'30%'"
      :isForm="true"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <el-form class="el-form-box">
          <el-form-item class="form-item-long" label="添加时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              class="el-date-editor-m"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              v-model="build_part_date"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long" label="施工工艺：">
            <el-select v-model="build_part_tech" placeholder="请选择">
              <el-option
                :label="item"
                :value="index + 1"
                v-for="(item, index) in ['钻爆法施工', 'TBM法施工']"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long" label="开挖部位：">
            <el-select v-model="build_part_dig_method" placeholder="请选择">
              <el-option
                :label="item.dig_part_names"
                :value="item.tunnel_dig_method"
                v-for="(item, index) in placeArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long" label="其他部位：">
            <el-checkbox-group class="check-box" v-model="checkArr">
              <!-- :disabled="index | checkDisable(checkArr, checkOptions)" -->
              <el-checkbox
                class="checkbox"
                style="width: 100px"
                :label="item.build_part_type"
                v-for="(item, index) in checkOptions"
                :key="'name' + index"
                >{{ item.build_part }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end mb-08">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitPileFun"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="info" class="el-form-box" :model="info">
          <el-form-item
            label="所属工区："
            class="form-item-long-small d-inline-block must"
          >
            <el-select
              v-model="info.sub_unit_organ_id_union"
              placeholder="请选择"
            >
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in areaArr"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
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

          <el-form-item
            label="附属选项："
            class="form-item-long-small d-inline-block must"
          >
            <el-radio-group class="radio-box" v-model="info.sub_unit_type">
              <el-radio :label="1">大里程方向</el-radio>
              <el-radio :label="2">小里程方向</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="起止日期："
            class="form-item-long-small d-inline-block must"
          >
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.sub_unit_start"
              type="date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            >
            </el-date-picker>
            至
            <el-date-picker
              @change="changeTimeFun"
              v-model="info.sub_unit_end"
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
            label="起始桩号："
            class="form-item-long-small d-inline-block must"
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
            label="终止桩号："
            class="form-item-long-small d-inline-block must"
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
            label="隧道长度："
            class="form-item-long-small d-inline-block must"
          >
            <span>
              {{
                !info.sub_unit_pile_length
                  ? "系统计算..."
                  : info.sub_unit_pile_length + "米"
              }}
            </span>
          </el-form-item>
          <el-form-item
            label="BIM名称："
            class="form-item-long-small d-inline-block"
          >
            <el-input
              class="input-m"
              v-model="info.sub_unit_tag"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="BIM预览图：">
            <nPicUpload ref="pic_upload" :length="1" />
          </el-form-item>
          <el-form-item class="form-item-long must" label="上报部位：">
            <nAddItemContent
              @addFun="handleAddFun"
              :width="'800px'"
              :height="'300px'"
            >
              <template slot="content-add">
                <n-scroll>
                  <div class="d-flex flex-wrap p-2">
                    <div
                      class="
                        rounded-1
                        bg-white
                        posr
                        material_box
                        py-1
                        px-1
                        mr-16
                        mb-2
                      "
                      v-for="(item, index) in reportArr"
                      :key="index"
                    >
                      <div class="line-height-20">
                        <span class="grey2">添加时间：</span>
                        <span>{{ item.build_part_date }}</span>
                      </div>
                      <div class="line-height-20">
                        <span class="grey2">施工工艺：</span>
                        <span>{{
                          ["", "钻爆法施工", "TBM法施工"][item.build_part_tech]
                        }}</span>
                      </div>
                      <div class="line-height-20">
                        <span class="grey2">开挖部位：</span>
                        <span>{{
                          item.build_part_dig_method | placeName(placeArr)
                        }}</span>
                      </div>
                      <div class="line-height-20 d-flex align-items-start">
                        <span class="grey2">其他部位：</span>
                        <span class="flex-fill">{{
                          item.build_parts | partName(checkOptions)
                        }}</span>
                      </div>
                      <!-- <div class="posa edit mainbg p-1 cursor-p" @click="handleEditFun(item,index)">
                      <img src="@/assets/images/btn_windows_eidt.png" alt />
                    </div>
                    <div class="posa del mainbg p-1 cursor-p" @click="handleDeleteFun(index)">
                      <img src="@/assets/images/btn_list_delete.png" alt />
                    </div>-->
                    </div>
                  </div>
                </n-scroll>
              </template>
            </nAddItemContent>
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
      isEdit: false,
      editIndex: 0,
      flag: false,
      unit: "K",
      pile_starta: "",
      pile_startb: "",
      pile_enda: "",
      pile_endb: "",
      info: {
        unit_proj_id_union: null,
        sub_unit_organ_id_union: null,
        sub_unit_name: "",
        sub_unit_type: null,
        sub_unit_start: "",
        sub_unit_end: "",
        sub_unit_duration: "",
        sub_unit_pile_prefix: "",
        sub_unit_pile_start_string: "",
        sub_unit_pile_end_string: "",
        sub_unit_pile_start: null,
        sub_unit_pile_end: null,
        sub_unit_pile_length: null,
        sub_unit_bim_pic: "",
        sub_unit_tag: "",
        sub_unit_is_show: null,
        sub_unit_is_bim: null,
        build_parts: [
          {
            build_part_date: "",
            build_part_dig_method: null,
            build_part_tech: null,
            build_parts: "",
          },
          {
            build_part_date: "",
            build_part_dig_method: null,
            build_part_tech: null,
            build_parts: "",
          },
        ],
      },
      rules: {
        sub_unit_organ_id_union: [
          {
            required: true,
            message: "请选择所属工区",
          },
        ],
        sub_unit_name: [
          {
            required: true,
            message: "请输入子单位工程名称",
          },
        ],
        sub_unit_type: [
          {
            required: true,
            message: "请选择附属选项",
          },
        ],
        sub_unit_start: [
          {
            required: true,
            message: "请选择起止日期",
          },
        ],
        sub_unit_end: [
          {
            required: true,
            message: "请选择起止日期",
          },
        ],
        sub_unit_pile_start: [
          {
            required: true,
            message: "请输入起始桩号",
          },
        ],
        sub_unit_pile_end: [
          {
            required: true,
            message: "请输入终止桩号",
          },
        ],
      },
      areaArr: [],
      picList: [],
      checkArr: [],
      build_part_dig_method: "",
      checkOptions: [],
      placeArr: [],
      dialogTitle: "新增上报部位",
      build_part_date: "",
      build_part_tech: null, //施工工艺
      time: [],
      reportArr: [],
      areaArr: [], //工区
      pickerOptions: {},
      pile: { pile_start: "", pile_end: "" }, //记录预报范围
      sub_unit_id: Number(this.$route.query.sub_id), //编辑的子单位工程id
      unit_proj_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //单位工程id
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  created() {
    if (this.sub_unit_id) {
      this.title = "编辑子单位工程";
    } else {
      this.title = "新增子单位工程";
    }
    this.queryAreaFun();
    if (this.unit_proj_id && !this.sub_unit_id) {
      //新增子单位工程
      this.info.unit_proj_id_union = this.unit_proj_id;
      this.unit = this.$route.query.name;
      this.info.sub_unit_pile_prefix = this.unit;
      this.queryTunnelUnitProj();
    } else if (this.sub_unit_id && this.unit_proj_id) {
      this.getUnitDetailFun();
    }
    this.QueryTunnelBuild();
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
    //查询单位工程
    async queryTunnelUnitProj(id) {
      let res = await api.queryTunnelUnitProj({
        unit_proj_id: this.unit_proj_id,
      });
      this.pile.pile_start = res.result[0].unit_proj_pile_start_string;
      this.pile.pile_end = res.result[0].unit_proj_pile_end_string;
    },
    //查询施工部位
    async QueryTunnelBuild() {
      let data = await api.QueryTunnelBuild({});
      this.checkOptions = data.result[0].nondig_build_parts;
      this.placeArr = data.result[0].dig_methods;
    },
    submitFancel() {
      this.$refs.dialog.cancel();
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //新增上报部位
    handleAddFun() {
      this.isEdit = false;
      this.checkArr = [];
      this.dialogTitle = "新增上报部位";
      this.build_part_date = "";
      this.build_part_dig_method = "";
      this.$refs.dialog.show();
    },
    //编辑上报部位
    handleEditFun(item, index) {
      this.isEdit = true;
      this.editIndex = index;
      this.checkArr = item.build_parts.split(",");
      this.checkArr = this.checkArr.map(Number);
      this.build_part_dig_method = item.build_part_dig_method;
      this.$set(this, "build_part_date", item.build_part_date);
      this.dialogTitle = "修改上报部位";
      this.$refs.dialog.show();
    },
    //提交上传部位
    submitPileFun() {
      let obj = {};
      if (!this.build_part_date) {
        this.$tip({
          isTip: true,
          message: "请选择添加时间",
        });
        return;
      }
      if (!this.build_part_tech) {
        this.$tip({
          isTip: true,
          message: "请选择施工工艺",
        });
        return;
      }
      if (!this.build_part_dig_method) {
        this.$tip({
          isTip: true,
          message: "请选择开挖部位",
        });
        return;
      }
      if (!this.checkArr.length) {
        this.$tip({
          isTip: true,
          message: "请选择其他部位",
        });
        return;
      }
      if (this.reportArr.length != 0) {
        let ind = this.isEdit ? this.editIndex : this.reportArr.length - 1;
        if (
          new Date(this.build_part_date) <
          new Date(this.reportArr[ind].build_part_date)
        ) {
          this.$tip({
            isTip: true,
            message: "时间需大于上个部位的时间",
          });
          return;
        }
      }
      obj.build_part_date = this.build_part_date;
      obj.build_part_tech = this.build_part_tech;
      obj.build_parts = this.checkArr.join(",");
      obj.build_part_dig_method = this.build_part_dig_method;
      if (this.isEdit) {
        this.reportArr.splice(this.editIndex, 1, obj);
      } else {
        this.reportArr.push(obj);
      }
      this.$refs.dialog.cancel();
    },
    //删除上报部位
    handleDeleteFun(index) {
      this.confirm("", "", "确认删除当前部位？").then(() => {
        this.reportArr.splice(index, 1);
      });
    },
    //计算时间
    computedTimeFun() {
      var start = this.info.sub_unit_start.split("-");
      var end = this.info.sub_unit_end.split("-");
      var duration = (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
      return duration;
    },
    //时间改变触发函数
    changeTimeFun(val) {
      if (this.info.sub_unit_start && this.info.sub_unit_end) {
        this.$set(
          this.info,
          "sub_unit_duration",
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
        let length = Math.abs(
          project.conputedRangeFun(
            this,
            "sub_unit_pile_length",
            "pile_starta",
            "pile_startb",
            "pile_enda",
            "pile_endb",
            this.pile.pile_start,
            this.pile.pile_end,
            this.info.sub_unit_type
          )
        ).toFixed(3);
        // 大里程--小到大； 小里程--大到小
        if (length.indexOf("NaN") !== -1) {
          return;
        }
        this.$set(this.info, "sub_unit_pile_length", Number(length));
      }
    },
    //获取详情数据
    async getUnitDetailFun() {
      let res = await api.QueryTunnelSubUnitAndBuildPart({
        sub_unit_id: this.sub_unit_id,
      });
      var data = res.result[0];
      var start = data.sub_unit_pile_start_string.split("+");
      var end = data.sub_unit_pile_end_string.split("+");
      this.info = data;
      this.queryTunnelUnitProj();
      this.time.push(data.sub_unit_start, data.sub_unit_end);
      this.pile_starta = start[0];
      this.pile_startb = start[1];
      this.pile_enda = end[0];
      this.pile_endb = end[1];
      this.unit = data.unit_proj_pile_prefix;
      this.reportArr = data.build_parts;
      this.$refs.pic_upload.setPicList(data.pic_list);
    },

    //提交所有数据
    async submitFun() {
      if (this.reportArr.length == 0) {
        this.$tip({
          isTip: true,
          message: "请填写上报部位",
        });
        return;
      }
      if (
        (this.pile_starta && this.pile_startb) ||
        (this.pile_enda && this.pile_endb)
      ) {
        this.info.sub_unit_pile_start_string = `${this.pile_starta}+${this.pile_startb}`;
        this.info.sub_unit_pile_end_string = `${this.pile_enda}+${this.pile_endb}`;
        this.info.sub_unit_pile_start = this.pile_starta
          ? Number(this.pile_starta * 1000) + Number(this.pile_startb)
          : null;
        this.info.sub_unit_pile_end = this.pile_enda
          ? Number(this.pile_enda * 1000) + Number(this.pile_endb)
          : null;
      }
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.info)) {
        return;
      }
      let file_obj = { uploadFileModule: "OASystemRelease" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      this.info.sub_unit_bim_pic = picsjson.file;
      this.info.sub_unit_bim_pic_json = picsjson.file_json;
      this.info.build_parts = this.reportArr;
      this.submitAllData();
    },
    //提交请求函数
    async submitAllData() {
      // if (this.flag) {
      //   return;
      // }
      // this.flag = true;
      let url = this.info.sub_unit_id
        ? "UpdateTunnelSubUnitAndBuildPart"
        : "UploadTunnelSubUnitAndBuildPart";
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
    border: none !important;
    padding: 0 4px 0 8px !important;
    font-size: 14px;
    background-color: transparent !important;
  }
}
.material {
  background-color: #f2f3fc;
  height: 300px;
  width: 1024px;
  .add {
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    border-bottom-left-radius: 10px;
    background: $main;
    img {
      width: 20px;
      height: 20px;
      margin-top: 14px;
      margin-left: 14px;
    }
  }

  .material_box {
    width: 40%;
    .edit {
      right: 0;
      top: 0;
      width: 48px;
      height: 40px;
      border-top-right-radius: 10px;
      img {
        position: absolute;
        top: 0;
        right: 0;
        left: 6px;
        bottom: 0;
        margin: auto;
        width: 18px;
      }
    }
    .del {
      background-color: #f85376;
      width: 40px;
      height: 40px;
      right: 40px;
      top: 0;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      img {
        width: 24px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
