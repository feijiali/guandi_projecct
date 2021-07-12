<template>
  <div class="w-100">
    <el-form class="el-form-box" ref="ruleforms">
      <el-form-item class="form-item-long-small must" label="工程项目：">
        <el-select
          @change="chooseOrgan"
          v-model="ruleforms.parameter_organ_id_un"
          placeholder="请选择"
        >
          <el-option
            :label="item.organ"
            :value="item.organ_id"
            v-for="item in projectListSelect"
            :key="item.organ_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item class="form-item-long-small">
        <a
          :href="GLOBAL.baseurl + downLoadURL"
          download="工程变更增减费用计算表.xlsx"
        >
          <n-button
            :btnText="'下载模板'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </a>
        <el-upload
          class="
            upload
            download-item
            position-relative
            useMoney-upload
            d-inline-block
            ml-2
          "
          action="xxxx"
          :show-file-list="false"
          :multiple="false"
          name="UploadFile"
          :http-request="httprequest"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :file-list="fileList"
          :auto-upload="true"
          accept=".xls, .xlsx"
          :ref="'newupload'"
        >
          <n-button
            :btnText="'导入数据'"
            :width="'120px'"
            :colorBtn="'blue'"
          ></n-button>
        </el-upload>
      </el-form-item>
      <table class="table-origin">
        <tr>
          <td colspan="2">编号</td>
          <td>
            <el-input
              class="short-input"
              v-model="ruleforms.parameter_no"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>合同段</td>
          <td>
            <el-select
              @change="chooseHistoryArr1"
              class="short-input"
              ref="select"
              v-model="ruleforms.parameter_contract_period"
              placeholder="自动获取/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="(itms, inds) in historyArr1"
                :key="inds"
                :label="itms.parameter_contract_period"
                :value="itms.parameter_contract_period"
              ></el-option>
            </el-select>
          </td>
          <td>桩号</td>
          <td>
            <el-select
              @change="chooseHistoryArr2"
              class="short-input"
              ref="select"
              v-model="ruleforms.parameter_pile_no"
              placeholder="自动获取/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="(itms, inds) in historyArr2"
                :key="inds"
                :label="itms.parameter_pile_no"
                :value="itms.parameter_pile_no"
              ></el-option>
            </el-select>
          </td>
          <td>工程名称</td>
          <td colspan="4" class="long-td">
            <el-select
              class="short-input"
              ref="select"
              v-model="ruleforms.parameter_name"
              placeholder="自动获取/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="(itms, inds) in historyArr3"
                :key="inds"
                :label="itms.parameter_name"
                :value="itms.parameter_name"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>序号</td>
          <td>清单编号</td>
          <td>工程项目名称</td>
          <td>单位</td>
          <td>合同单价(元)</td>
          <td>新增单价(元)</td>
          <td>工程数量(原设计)</td>
          <td>工程数量(变更后)</td>
          <td>数量增减</td>
          <td>金额增减(元)</td>
          <td>附注</td>
          <td>
            操作
            <div @click="addBlock()" class="d-inline-block add-circle-btn">
              +
            </div>
          </td>
        </tr>
        <!-- 表格主体区域 -->
        <template v-for="(itm, ind) in ruleforms.list">
          <tr :key="ind">
            <td>
              {{ ind + 1 }}
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <el-select
                  @change="(val) => chooseParameterDetailNo(val, ind)"
                  class="short-input"
                  ref="select"
                  v-model="itm.parameter_detail_no"
                  placeholder="请输入/选择"
                  filterable
                  allow-create
                >
                  <el-option
                    v-for="(itms, inds) in parameterDetailNoArr"
                    :key="inds"
                    :label="
                      itms[
                        [
                          'parameter_detail_no',
                          'detail_main_ls_num',
                          'split_ls_num',
                          'proj_detail_diff_num',
                          'detail_main_ls_num',
                        ][types]
                      ]
                    "
                    :value="
                      itms[
                        [
                          'parameter_detail_no',
                          'detail_main_ls_num',
                          'split_ls_num',
                          'proj_detail_diff_num',
                          'detail_main_ls_num',
                        ][types]
                      ]
                    "
                  ></el-option>
                </el-select>
              </template>
              <template v-else>
                {{ itm.parameter_detail_no }}
              </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <el-select
                  @change="(val) => chooseParameterDetailName(val, ind)"
                  class="short-input"
                  ref="select"
                  v-model="itm.parameter_detail_name"
                  placeholder="请输入/选择"
                  filterable
                  allow-create
                >
                  <el-option
                    v-for="(itms, inds) in parameterDetailNameArr"
                    :key="inds"
                    :label="
                      itms[
                        [
                          'parameter_detail_name',
                          'detail_main_ls_name',
                          'split_ls_name',
                          'proj_detail_diff_name',
                          'detail_main_ls_name',
                        ][types]
                      ]
                    "
                    :value="
                      itms[
                        [
                          'parameter_detail_name',
                          'detail_main_ls_name',
                          'split_ls_name',
                          'proj_detail_diff_name',
                          'detail_main_ls_name',
                        ][types]
                      ]
                    "
                  ></el-option>
                </el-select>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <el-input
                  class="short-input"
                  v-model="itm.parameter_detail_unit"
                  placeholder="自动获取/输入"
                ></el-input>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="(val) => calMoneyFun(ind)"
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="itm.parameter_detail_contract_price"
                  placeholder="自动获取/请输入"
                >
                </num-input>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="(val) => calMoneyFun(ind)"
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="itm.parameter_detail_price"
                  placeholder="请输入"
                >
                </num-input>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="
                    (val) => calNumFun(ind, 'parameter_detail_change_num')
                  "
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="itm.parameter_detail_num"
                  placeholder="自动获取/输入"
                >
                </num-input>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <num-input
                  :negative="true"
                  :isInputChange="true"
                  @emitInput="
                    (val) => calNumFun(ind, 'parameter_detail_change_num')
                  "
                  :fixedNum="2"
                  :isString="true"
                  class="short-input"
                  v-model="itm.parameter_detail_para_num"
                  placeholder="请输入"
                >
                </num-input>
              </template>
              <template> </template>
            </td>
            <td>
              {{ itm.parameter_detail_change_num }}
            </td>
            <td>{{ itm.parameter_detail_change_money }}</td>
            <td>
              <template v-if="ind != ruleforms.list.length - 1">
                <el-input
                  class="short-input"
                  v-model="itm.parameter_detail_remark"
                  placeholder="请输入"
                ></el-input>
              </template>
              <template> </template>
            </td>
            <td>
              <template v-if="ind == 0 || ind == ruleforms.list.length - 1">
              </template>
              <template v-else>
                <div
                  @click="removeBlock(ind)"
                  class="d-inline-block add-circle-btn"
                >
                  -
                </div>
              </template>
            </td>
          </tr>
        </template>
      </table>
      <el-form-item class="form-item-long mt-2" label="附件图片：">
        <nPicUpload ref="pic_upload" :length="9" />
      </el-form-item>
      <el-form-item class="form-item-long" label="附件文档：">
        <nFileUpload ref="file_upload" :length="9" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
export default {
  props: {
    types: {
      type: Number,
      default: 0,
    },
    range: {
      type: String,
      default: "",
    },
    organ_node: {
      type: Number,
      default: 0,
      required: true,
    },
    main_id: {
      type: Number,
      default: 0,
    },
  },
  mixins: [upload],
  data() {
    return {
      downLoadURL: "/MOULD/ChangeParameterParameter_import.xlsx",
      ruleforms: {
        parameter_id: 0,
        parameter_revise_info_id_un: null,
        parameter_organ_id_un: null,
        parameter_no: "",
        parameter_contract_period: "",
        parameter_pile_no: "",
        parameter_name: "",
        parameter_state: 0,
        parameter_money: "",
        parameter_pic: "",
        parameter_pic_json: "",
        parameter_file: "",
        parameter_file_json: "",
        parameter_create_time: this.$utils.getCurrentTime(),
        list: [
          {
            parameter_detail_no: "",
            parameter_detail_name: "",
            parameter_detail_unit: "",
            parameter_detail_contract_price: "",
            parameter_detail_price: "",
            parameter_detail_num: "",
            parameter_detail_para_num: "",
            parameter_detail_change_num: "",
            parameter_detail_change_money: "",
            parameter_detail_state: 0, //变更清单金额状态,1-正变更,2-负变更

            parameter_detail_remark: "",
          },
          {
            last: true,
            parameter_detail_no: "合计",
            parameter_detail_name: "",
            parameter_detail_unit: "",
            parameter_detail_contract_price: "",
            parameter_detail_price: "",
            parameter_detail_num: "",
            parameter_detail_para_num: "",
            parameter_detail_change_num: "",
            parameter_detail_change_money: "0.00",
            parameter_detail_state: 0,
            parameter_detail_remark: "",
          },
        ],
      },
      fileList: [],
      rules: {
        parameter_organ_id_un: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
      },
      parameterDetailNoArr: [], //清单编号
      parameterDetailNameArr: [], //工程项目名称
      historyArr1: [], //合同段
      historyArr2: [], //桩号
      historyArr3: [], //工程名称

      importData: {}, //导入数据
      parameter_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //计量合同付款id
      isAdd: Boolean(this.$route.query.isAdd),
    };
  },
  watch: {
    types: {
      handler(val) {
        if (this.organ_node) {
          this.ruleforms.parameter_name = this.projectListSelect.filter(
            (item) => item.organ_id == this.organ_node
          )[0].organ;
        }

        if (this.types == 1) {
          //工程量清单
          this.queryHistoryList("QueryProjDetailListProjDetailMainLsChange", {
            organ_node: this.organ_node,
          });
        } else if (this.types == 2) {
          //拆分清单
          this.queryHistoryList("QueryProjDetailListProjDetailSplitLsChange", {
            organ_node: this.organ_node,
          });
        } else if (this.types == 3) {
          //分项清单
          this.queryHistoryList("QueryProjDetailListProjDetailDiffList", {
            proj_detail_diff_range: this.range,
            proj_detail_diff_organ: this.organ_node,
          });
        } else if (this.types == 4) {
          //工程量清单汇总表
          this.queryHistoryList("QueryProjDetailListProjDetailMainLsList", {
            proj_detail_main_id_un: this.main_id,
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  mounted() {
    if (this.parameter_id) {
      //编辑
      this.QueryChangeParameterParameter();
    }
    if (!this.types) {
      this.types = 0;
      //从变更台账进入
      // 查询历史变更详情列表
      this.QueryChangeParameterParameterHistoryList();
    }
    this.ruleforms.parameter_organ_id_un = this.organ_node
      ? this.organ_node
      : null;
  },
  methods: {
    async QueryChangeParameterParameter() {
      let { result } = await api.QueryChangeParameterParameter({
        parameter_id: this.parameter_id,
      });
      let info = result[0];

      this.infoReFun(info);
    },
    async infoReFun(info) {
      // 编辑式渲染图片
      for (let key in this.ruleforms) {
        this.ruleforms[key] = info[key];
      }
      this.ruleforms.organ_id_un = info.contract_approval_organ_id_union;
      this.ruleforms.list.push({
        last: true,
        parameter_detail_no: "合计",
        parameter_detail_name: "",
        parameter_detail_unit: "",
        parameter_detail_contract_price: "",
        parameter_detail_price: "",
        parameter_detail_num: "",
        parameter_detail_para_num: "",
        parameter_detail_change_num: "",
        parameter_detail_change_money: "0.00",
        parameter_detail_state: 0,
        parameter_detail_remark: "",
      });
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
      this.ruleforms.file_list = info.file_list;
      this.ruleforms.pic_list = info.pic_list;
    },
    // 选择合同段
    chooseHistoryArr1(val) {
      this.ruleforms.parameter_pile_no = "";
      this.ruleforms.parameter_name = "";
      this.ruleforms.parameter_pile_no = this.historyArr2.filter(
        (item) => item.parameter_contract_period == val
      )[0].parameter_pile_no;
      this.chooseHistoryArr2(this.ruleforms.parameter_pile_no);
    },
    // 选择桩号
    chooseHistoryArr2(val) {
      this.ruleforms.parameter_name = "";
      this.ruleforms.parameter_name = this.historyArr3.filter(
        (item) => item.parameter_pile_no == val
      )[0].parameter_name;
    },
    chooseOrgan(val) {
      this.ruleforms.parameter_contract_period = "";
      this.ruleforms.parameter_pile_no = "";
      this.ruleforms.parameter_name = "";
      this.QueryChangeParameterParameterList();
      this.QueryChangeParameterParameterHistoryList();
    },
    async QueryChangeParameterParameterList() {
      let { result } = await api.QueryChangeParameterParameterList({
        organ_node: this.ruleforms.parameter_organ_id_un,
        page: -1,
      });
      this.historyArr1 = result.filter(
        (item) => item.parameter_contract_period
      );
      this.historyArr1 = this.unique(
        this.historyArr1,
        "parameter_contract_period"
      );
      this.historyArr2 = result.filter((item) => item.parameter_pile_no);
      this.historyArr2 = this.unique(this.historyArr2, "parameter_pile_no");
      this.historyArr3 = result.filter((item) => item.parameter_name);
      this.historyArr3 = this.unique(this.historyArr3, "parameter_name");
    },
    unique(list, name) {
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        let b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j][name] == list[i][name]) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    async queryHistoryList(url, obj) {
      let params = { ...obj, page: -1 };
      let { result } = await api[url](params);
      this.parameterDetailNoArr = result;
      if (
        url == "QueryProjDetailListProjDetailDiffList" &&
        this.parameterDetailNoArr[0]
      ) {
        this.ruleforms.parameter_pile_no =
          this.parameterDetailNoArr[0].proj_detail_diff_range;
      }
    },
    //选择清单编号
    chooseParameterDetailNo(val, ind) {
      this.ruleforms.list[ind].parameter_detail_unit = "";
      this.ruleforms.list[ind].parameter_detail_contract_price = "";
      this.ruleforms.list[ind].parameter_detail_num = "";
      this.ruleforms.list[ind].parameter_detail_name = "";
      this.ruleforms.list[ind].parameter_detail_price = "";

      this.parameterDetailNameArr = this.parameterDetailNoArr.filter(
        (item) =>
          item[
            [
              "parameter_detail_no",
              "detail_main_ls_num",
              "split_ls_num",
              "proj_detail_diff_num",
              "detail_main_ls_num",
            ][this.types]
          ] == val
      );
    },
    // 选择工程项目名称
    chooseParameterDetailName(val, ind) {
      let filterArr = this.parameterDetailNameArr.filter(
        (item) =>
          item[
            [
              "parameter_detail_name",
              "detail_main_ls_name",
              "split_ls_name",
              "proj_detail_diff_name",
              "detail_main_ls_name",
            ][this.types]
          ] == val
      );
      this.ruleforms.list[ind].parameter_detail_unit = "";
      this.ruleforms.list[ind].parameter_detail_contract_price = "";
      this.ruleforms.list[ind].parameter_detail_num = "";
      this.ruleforms.list[ind].parameter_detail_price = "";
      if (filterArr[0]) {
        // 单位
        this.ruleforms.list[ind].parameter_detail_unit =
          filterArr[0][
            [
              "parameter_detail_unit",
              "detail_main_ls_unit",
              "split_ls_unit",
              "proj_detail_diff_unit",
              "detail_main_ls_unit",
            ][this.types]
          ];
        // 单价
        this.ruleforms.list[ind].parameter_detail_contract_price =
          filterArr[0][
            [
              "parameter_detail_contract_price",
              "detail_main_ls_price",
              "split_ls_price",
              "proj_detail_diff_price",
              "detail_main_ls_price",
            ][this.types]
          ];
        // 数量
        this.ruleforms.list[ind].parameter_detail_num =
          filterArr[0][
            [
              "parameter_detail_num",
              "detail_main_ls_number",
              "split_ls_number",
              "proj_detail_diff_number",
              "detail_main_ls_number",
            ][this.types]
          ];
      }
    },
    // 查询历史变更详情列表
    async QueryChangeParameterParameterHistoryList() {
      let { result } = await api.QueryChangeParameterParameterHistoryList({
        organ_node: this.ruleforms.parameter_organ_id_un || "",
      });
      this.parameterDetailNoArr = result;
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      let that = this;
      that.fileList = [file];
    },
    httprequest() {
      let that = this;
      that.importData.uploadFile = that.fileList[0].raw;
      that
        .uploadFile([], that.importData, "ImportChangeParameterParameter")
        .then((res) => {
          that.rebackTable(res.result);
        });
    },
    rebackTable(list) {
      let parameter_organ_id_un = this.ruleforms.parameter_organ_id_un;
      this.ruleforms = list[0];
      this.ruleforms.parameter_organ_id_un = parameter_organ_id_un;
      let len = this.ruleforms.list.length;
      this.ruleforms.list[len] = {
        last: true,
        parameter_detail_no: "合计",
        parameter_detail_name: "",
        parameter_detail_unit: "",
        parameter_detail_contract_price: "",
        parameter_detail_price: "",
        parameter_detail_num: "",
        parameter_detail_para_num: "",
        parameter_detail_change_num: "",
        parameter_detail_change_money: "0.00",
        parameter_detail_state: 0,
        parameter_detail_remark: "",
      };
    },
    // 金额增减=数量增减*合同单价（如果有新增单价就用新增单价计算）
    calMoneyFun(ind) {
      let val1 = Number(this.ruleforms.list[ind].parameter_detail_price);
      let val2 = Number(
        this.ruleforms.list[ind].parameter_detail_contract_price
      );
      let val3 = Number(this.ruleforms.list[ind].parameter_detail_change_num);
      let val4 = val1 ? val1 : val2;
      if ((val1 || val2) && val3) {
        this.ruleforms.list[ind].parameter_detail_change_money = String(
          (val3 * val4).toFixed(2)
        );
        this.ruleforms.list[ind].parameter_detail_state =
          Number(this.ruleforms.list[ind].parameter_detail_change_money) >= 0
            ? 1
            : 2;
      } else {
        this.ruleforms.list[ind].parameter_detail_change_money = "";
        this.ruleforms.list[ind].parameter_detail_state = 1;
      }
      // 计算小计
      this.totalFun(ind);
    },
    // 计算数量增减=工程数量（变更后）-工程数量（原设计）可为负数
    calNumFun(ind, name) {
      let val1 = this.ruleforms.list[ind].parameter_detail_num,
        val2 = this.ruleforms.list[ind].parameter_detail_para_num;
      if (val1 && val2) {
        this.ruleforms.list[ind][name] = String((val2 - val1).toFixed(2));
        this.calMoneyFun(ind);
      }
    },
    // 计算小计
    totalFun() {
      let totalNum = 0;
      let length = this.ruleforms.list.length;
      this.ruleforms.list.forEach((item, index) => {
        if (index != length - 1) {
          totalNum += item.parameter_detail_change_money
            ? Number(item.parameter_detail_change_money)
            : 0;
        } else {
          this.ruleforms.list[length - 1].parameter_detail_change_money =
            String(totalNum.toFixed(2));
        }
      });
      this.ruleforms.parameter_money =
        this.ruleforms.list[length - 1].parameter_detail_change_money;
      this.ruleforms.parameter_state =
        Number(this.ruleforms.parameter_money) >= 0 ? 1 : 2;
    },
    addBlock() {
      let json = {
        parameter_detail_no: "",
        parameter_detail_name: "",
        parameter_detail_unit: "",
        parameter_detail_contract_price: "",
        parameter_detail_price: "",
        parameter_detail_num: "",
        parameter_detail_para_num: "",
        parameter_detail_change_num: "",
        parameter_detail_change_money: "",
        parameter_detail_state: 0,
        parameter_detail_remark: "",
      };
      this.ruleforms.list.splice(1, 0, json);
    },
    // 移除添加项
    removeBlock(ind) {
      this.ruleforms.list.splice(ind, 1);
      this.calNumFun(ind, "parameter_detail_change_num");
    },
    async submitFun(isSave) {
      if (!isSave) {
        // 先判断是否填写必填信息
        if (!this.$utils.ruleFormPro(this, this.rules, this.ruleforms)) {
          return;
        }
      }
      let file_obj = { uploadFileModule: "ChangeParameterParameter" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleforms.parameter_pic = picsjson.file;
      this.ruleforms.parameter_file = filejson.file;
      if (!isSave) {
        this.ruleforms.parameter_pic_json = picsjson.file_json;
        this.ruleforms.parameter_file_json = filejson.file_json;
      } else {
        if (picsjson.file) {
          let pic_json = JSON.parse(picsjson.file_json);
          let urls_pic = picsjson.urls.split(",");
          let pic_list = urls_pic.map((item, index) => {
            return {
              ...pic_json[index],
              file_json: pic_json[index],
              url: item,
            };
          });
          this.ruleforms.pic_list = pic_list;
        } else {
          this.ruleforms.pic_list = [];
        }

        if (filejson.file) {
          let file_json = JSON.parse(filejson.file_json);
          let urls_file = filejson.urls.split(",");
          let file_list = urls_file.map((item, index) => {
            return {
              ...file_json[index],
              file_json: file_json[index],
              url: item,
            };
          });
          this.ruleforms.file_list = file_list;
        } else {
          this.ruleforms.file_list = [];
        }
      }
      let subdatas = JSON.parse(JSON.stringify(this.ruleforms));
      let json = {
        parameter_detail_no: "",
        parameter_detail_name: "",
        parameter_detail_unit: "",
        parameter_detail_contract_price: "",
        parameter_detail_price: "",
        parameter_detail_num: "",
        parameter_detail_para_num: "",
        parameter_detail_change_num: "",
        parameter_detail_change_money: "",
        parameter_detail_remark: "",
      };
      // 移除json数组中所有字段都为空的项
      this.ruleforms.list = subdatas.list.filter((item) => {
        if (this.parameter_id && this.isAdd) {
          //要去掉parameter_detail_id detail_parameter_id_un字段
          item.parameter_detail_id = 0;
          item.detail_parameter_id_un = 0;
        }
        let num = 0;
        for (let key in json) {
          if (!item[key]) {
            num++;
          }
        }
        if (num == 10) {
          return false;
        }
        return true;
      });
      this.ruleforms.list.splice(this.ruleforms.list.length - 1, 1);
      !isSave && this.$emit("submitAllData", this.ruleforms);
    },
    async submitAllData(data) {
      let subdatas = {
        ...data,
        ...this.ruleforms,
      };

      this.isAdd && (subdatas.parameter_id = 0);
      await api[
        `${
          this.parameter_id && !this.isAdd
            ? "UpdateChangeParameterParameter"
            : "UploadChangeParameterParameter"
        }`
      ](subdatas);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.goBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-circle-btn {
  width: 25px;
  height: 25px;
  line-height: 3px;
  padding: 9px 3px;
}
table.table-origin {
  td {
    padding: 2px 10px;
    height: 35px;
  }
}
.short-input {
  ::v-deep .el-input {
    width: 120px !important;
  }
}
.long-td {
  ::v-deep .long-short-input {
    width: 80% !important;
    ::v-deep .el-input {
      width: 100% !important;
    }
  }
}

.short-input {
  ::v-deep .el-input .el-input__icon {
    line-height: 30px !important;
  }
  ::v-deep .el-input-group__append {
    right: 4px !important;
    top: 4px !important;
  }
}
.short-input,
.short-input-small {
  width: 100px !important;
  .short-input .el-input,
  .short-input-small .el-input {
    width: 100px !important;
    ::v-deep .el-input__inner {
      padding: 0 5px !important;
      border: none !important;
      height: 30px;
      line-height: 30px;
      background-color: transparent !important;
    }
  }
  ::v-deep .el-input__inner {
    padding: 0 5px !important;
    border: none !important;
    height: 30px;
    line-height: 30px;
    background-color: transparent !important;
  }
}

.short-input-small {
  width: 80px !important;
  ::v-deep .el-input {
    width: 80px !important;
  }
  ::v-deep .el-input .el-input__icon {
    line-height: 30px !important;
  }
  ::v-deep .el-input-group__append {
    right: 0 !important;
    top: 4px !important;
  }
}

.el-form-box .el-date-editor.el-input {
  ::v-deep .el-input__inner {
    padding-right: 5px !important;
  }
}
</style>
