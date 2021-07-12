<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary pl-1">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="所属机构：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :Isvalue="true"
              :value="ruleform.organ_id_union"
            />
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="人员姓名：">
            <el-input
              class="input-m"
              v-model="ruleform.credentials_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="身份证号：">
            <el-input
              class="input-m"
              v-model="ruleform.credentials_id_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="联系电话：">
            <el-input
              class="input-m"
              v-model="ruleform.credentials_phone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="劳务单位：">
            <el-select
              v-model="ruleform.credentials_unit"
              placeholder="请选择/输入"
              filterable
              allow-create
            >
              <el-option
                v-for="item in labourData"
                :key="item.team_labour"
                :label="item.team_labour"
                :value="item.team_labour"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="flexsta">
            <nInfoTitle :title="'证件信息'" class="mb-2" />
            <img
              style="width: 30px; margin-bottom: 20px"
              class="cursor-p"
              @click="addList"
              src="@/assets/images/material/btn_input_add.png"
              alt=""
              srcset=""
            />
          </div>

          <template v-for="(item, i) in ruleform.list">
            <div class="position-relative" :key="item.date + '' + i">
              <el-form-item
                class="form-item-long-small must"
                label="特殊作业类型："
              >
                <el-input
                  class="input-m"
                  v-model="item.credentials_type"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="form-item-long-small must"
                label="证件等级："
              >
                <el-input
                  class="input-m"
                  v-model="item.credentials_grade"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="form-item-long-small must"
                label="操作证号："
              >
                <el-input
                  class="input-m"
                  v-model="item.credentials_num"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="form-item-long-small must"
                label="初次领证日期："
              >
                <el-date-picker
                  :clearable="false"
                  v-model="item.credentials_date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择"
                  @change="calculateTime"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                class="form-item-long-small must"
                label="证件有效日期："
              >
                <el-date-picker
                  :clearable="false"
                  v-model="item.credentials_valid_date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择"
                  @change="calculateTime"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item class="form-item-long-small1" label="上传证件照：">
                <nPicUpload ref="pic_upload" :length="2" />
              </el-form-item>
              <div
                class="position-absolute flexcen"
                style="right: 100px; top: 0; width: 40px; height: 100%"
              >
                <img
                  v-if="i != 0"
                  style="width: 30px"
                  class="cusp"
                  @click="removeList(i)"
                  src="@/assets/images/btn_input_decrease.png"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </template>
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
import upload from "@/mixins/upload";
export default {
  mixins: [confirm, upload],
  data() {
    return {
      title: "",
      labourData: [], //劳务单位
      ruleform: {
        account_id: null,
        credentials_unit: "",
        organ_id_union: null,
        credentials_name: "",
        credentials_id_card: "",
        credentials_phone: "",
        list: [
          {
            credentials_type: "",
            credentials_grade: "",
            credentials_num: "",
            credentials_date: "",
            credentials_valid_date: "",
            credentials_pic: "",
            // date: Date.now(),
            // picList: [],
          },
        ],
      },
      rules: {
        organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        credentials_name: [
          {
            required: true,
            message: "请输入人员姓名",
          },
        ],
        credentials_id_card: [
          {
            required: true,
            message: "请输入身份证号",
          },
          {
            pattern:
              /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
            message: "身份证号格式错误",
          },
        ],
        credentials_phone: [
          {
            required: true,
            message: "请输入联系电话",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],
        credentials_unit: [
          {
            required: true,
            message: "请选择/输入劳务单位",
          },
        ],
        list: [
          {
            validator(rule, list, callback) {
              let credentials_type = list.findIndex(
                (item) => !item.credentials_type
              );
              if (credentials_type != -1) {
                callback(new Error("请填写特殊作业类型"));
              }
              let credentials_grade = list.findIndex(
                (item) => !item.credentials_grade
              );
              if (credentials_grade != -1) {
                callback(new Error("请填写证件等级"));
              }
              let credentials_num = list.findIndex(
                (item) => !item.credentials_num
              );
              if (credentials_num != -1) {
                callback(new Error("请填写操作证号"));
              }
              let credentials_date = list.findIndex(
                (item) => !item.credentials_date
              );
              if (credentials_date != -1) {
                callback(new Error("请选择初次领证日期"));
              }
              let credentials_valid_date = list.findIndex(
                (item) => !item.credentials_valid_date
              );
              if (credentials_valid_date != -1) {
                callback(new Error("请选择证件有效日期"));
              }
              callback();
            },
          },
        ],
      },
      info: {},
      account_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  async mounted() {
    //查询劳务单位
    this.QueryLabour();
    if (this.account_id) {
      this.title = "编辑特殊工种";
      await this.QueryWorkerAccount();
    } else {
      this.title = "新增特殊工种";
    }
  },
  methods: {
    //判断领证时间
    calculateTime() {
      this.ruleform.list.forEach((item) => {
        let credentials_date = item.credentials_date;
        let credentials_valid_date = item.credentials_valid_date;
        var result = this.timeDiff(credentials_date, credentials_valid_date);
        if (!result.state) {
          this.$tip({
            isTip: true,
            message: result.message,
          });
          item.credentials_valid_date = "";
        }
      });
    },
    timeDiff(startTime, endTime) {
      var start = new Date(startTime).getTime();
      var end = new Date(endTime).getTime();
      if (start > end) {
        return { state: false, message: "证件有效日期应大于领证日期" };
      }
      return { state: true, message: "" };
    },
    addList() {
      this.ruleform.list.push({
        credentials_type: "",
        credentials_grade: "",
        credentials_num: "",
        credentials_date: "",
        credentials_valid_date: "",
        credentials_pic: "",
        // date: Date.now(),
        // picList: [],
      });
    },
    removeList(ind) {
      this.ruleform.list.splice(ind, 1);
    },
    //组织机构下拉选择
    getSelectValue(node) {
      if (node.node.organ_type == 60 || node.node.organ_type == 61) {
        this.ruleform.organ_id_union = node.node.organ_id;
      } else {
        this.$tip({
          isTip: true,
          message: `新增人员只能选择部门`,
        });
        this.ruleform.organ_id_union = null;
        this.$refs.treeselect.valueTitle = "";
        this.$refs.treeselect.$refs.selectTree.setCurrentKey(null);
      }
    },
    //查询劳务单位
    async QueryLabour() {
      let data = await api.QueryStaffTeamLabour({});
      this.labourData = data.result;
    },
    // 查询劳务人员详情
    async QueryWorkerAccount() {
      let data = await api.QueryWorkerAccount({
        account_id: this.account_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      this.ruleform.list = info.list.map((item, index) => {
        if (item.credentials_pic) {
          item.credentials_pic.split(",").map((items) => {
            this.$nextTick(() => {
              this.$refs.pic_upload[index].setPicList([
                {
                  url: info.server + items,
                  file_name: items,
                },
              ]);
            });
          });
        }
        return {
          ...item,
        };
      });
      this.info = info;
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = { uploadFileModule: "WorkerAccount" };
      for (let i = 0; i < this.ruleform.list.length; i++) {
        this.ruleform.list[i].credentials_pic = await this.$refs.pic_upload[
          i
        ].submitFun(false, file_obj);
      }
      this.submitAllData();
    },
    async submitAllData() {
      let res = await api[
        `${
          this.info.account_id ? "UpdateWorkerAccount" : "UploadWorkerAccount"
        }`
      ]({
        ...this.info,
        ...this.ruleform,
      });
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

<style lang="scss" scoped></style>
