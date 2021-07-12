<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="工 区：">
            <el-select
              @change="chooseAreas"
              v-model="ruleform.team_work_organ_id_union"
              placeholder="请选择工区"
            >
              <el-option
                v-for="item in work_areas"
                :key="item.organ_id"
                :value="item.organ_id"
                :label="
                  item.organ_parent_node_name
                    .split(',')
                    .slice(1, item.organ_parent_node_name.split(',').length)
                    .join('/')
                "
              >
                {{
                  item.organ_parent_node_name
                    .split(",")
                    .slice(1, item.organ_parent_node_name.split(",").length)
                    .join("/")
                }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="子单位工程：">
            <n-treeselect
              :show-sure="true"
              ref="treeselect2"
              @check-change="handleCheckedChange"
              :defaultProps="defaultPropsOrgan"
              :showSure="false"
              :default-expand-all="true"
              :multiValue="projectSon"
              :showNodeName="false"
              :treeData="projectSonArr"
              :show-checkbox="true"
              :checkStrictly="checkStrictly"
              :Isvalue="true"
              :defaultExpandAll="false"
            />
            <!-- <el-cascader
              v-model="projectSon"
              @change="chooseProject"
              :options="projectSonArr"
              :props="{ multiple: true, checkStrictly: true }"
              clearable
            ></el-cascader> -->
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="劳务单位：">
            <el-select
              @change="chooselabour"
              v-model="ruleform.team_labour"
              placeholder="请选择/输入"
              filterable
              :allow-create="election_option_id ? false : true"
              :disabled="election_option_id ? true : false"
            >
              <el-option
                v-for="item in labourData"
                :key="item.team_labour"
                :label="item.team_labour"
                :value="item.team_labour"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="班组名称：">
            <el-select
              v-model="ruleform.team"
              placeholder="请选择/输入"
              filterable
              allow-create
              :disabled="$route.query.election_id ? true : false"
            >
              <el-option
                v-for="item in teamData"
                :key="item.team"
                :label="item.team"
                :value="item.team"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="班组负责人：">
            <el-input
              class="input-m"
              v-model="ruleform.team_leader"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="联系电话：">
            <el-input
              class="input-m"
              v-model="ruleform.team_phone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must position-relative"
            label="进场时间："
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.team_time"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item class="form-item-long-middle must" label="是否比选：">
            <el-radio-group class="radio-box" v-model="ruleform.team_source">
              <el-radio :label="2">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="4" />
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
import upload from "@/mixins/upload";
import setOrganTreedata from "@/mixins/setOrganTreedata";

export default {
  mixins: [confirm, upload, setOrganTreedata],
  data() {
    return {
      title: "",
      isShow: this.$route.meta.isProject,
      defaultPropsOrgan: {
        value: "value", // ID字段名
        children: "children",
        label: "label",
      },
      checkStrictly: true,

      ruleform: {
        team_source: 1, //班组来源1:直接录入2:比选录入
        team_id: null,
        team_work_organ_id_union: null,
        team_proj_organ_id_un: this.$organ_id_en_or_pro(this),
        team_labour: "",
        team: "",
        team_leader: "",
        team_phone: "",
        team_time: null,
        team_pics: "",
        team_pics_json: "",
        team_files: "",
        team_files_json: "",
        sub_unit_list: [],
      },
      teamData: [], //班组
      labourData: [], //劳务单位
      projectSonArr: [{ leaves: [], node: { organ_area: "" }, tag: 0 }], //子单位工程
      projectSon: "", //子单位工程选中的值
      rules: {
        team_work_organ_id_union: [
          {
            required: true,
            message: "请选择工区",
          },
        ],
        team_labour: [
          {
            required: true,
            message: "请选择劳务单位",
          },
        ],
        team: [
          {
            required: true,
            message: "请选择班组名称",
          },
        ],
        team_time: [
          {
            required: true,
            message: "请选择进场时间",
          },
        ],
        team_leader: [
          {
            required: true,
            message: "请输入班组负责人",
          },
        ],
        // team_source: [
        //   {
        //     required: true,
        //     message: "请选择是否比选",
        //   },
        // ],
      },
      work_areas: [], //工区
      sub_unit_list: [], //要上传的子单位工程
      team_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      election_option_id:
        this.$route.query.election_option_id &&
        parseInt(this.Base64.decode(this.$route.query.election_option_id)), //编辑的id
    };
  },
  async mounted() {
    // 查询工程项目
    this.queryOrgan();
    //查询所有子单元工程及施工部位
    await this.querySubUnitUnionAndPart(this.$organ_id_en_or_pro(this));
    if (this.team_id) {
      this.title = "编辑班组信息";
      await this.QueryStaffTeamDetail();
      // 查询劳务单位和班组信息
      this.QueryLabour();
      this.QueryStaffTeamName();
    } else {
      this.title = "新增班组信息";
      if (this.$route.query.election_id) {
        // 获取投票信息
        let election_id = parseInt(
          this.Base64.decode(this.$route.query.election_id)
        );
        this.getElectionInfo(election_id);
      }
    }
  },
  methods: {
    // 获取投票信息
    async getElectionInfo(id) {
      let res = await api.queryOaElectionElection({ election_id: id });
      let info = res.result[0];
      if (info) {
        this.ruleform.team = info.election_team_name;
        this.ruleform.team_proj_organ_id_un = info.organ_id;
        this.$set(this.ruleform, "staff_team_election_id_un", info.election_id);
        // 回填劳务单位
        // 获取最大值
        // let maxRation = Math.max(...info.option_list.map(item => item.ration));
        // 获取最大值的列表
        let list = info.option_list.filter(
          (item) => item.election_option_id == this.election_option_id
        );
        // 默认选择第一个
        this.ruleform.team_labour = list[0].election_option_name;
        this.labourData = [{ team_labour: list[0].election_option_name }];
        this.ruleform.team_leader = list[0].election_option_labour_name;
        this.ruleform.team_phone = list[0].election_option_labour_phone;
        // 将查询的列表插入劳务单位数组
        // let labourArr = this.labourData.map(item => item.team_labour);
        // labourArr=list.map(item => item.election_option_name);
        // labourArr = Array.from(new Set(labourArr));
        // this.labourData = labourArr.map(item => ({
        //   team_labour: item
        // }));
        // 回填子单位工程
        //查询所有子单元工程及施工部位
        await this.querySubUnitUnionAndPart(
          this.ruleform.team_proj_organ_id_un
        );
        info.sub_list.forEach((item, index) => {
          this.projectSon =
            this.projectSon +
            (item.election_subunit_name
              ? item.election_subunit_id_un +
                "-" +
                item.election_subunit_type +
                "*" +
                item.election_subunit_part_type +
                "," +
                (item.election_subunit_id_un + "-" + item.election_subunit_type)
              : item.election_subunit_id_un +
                "-" +
                item.election_subunit_type) +
            (info.sub_list.length == index + 1 ? "" : ",");
        });
      }
    },
    // 查询项目下的项目
    async queryOrgan() {
      let res = await api.queryOrgan({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_type: 50,
      });
      this.work_areas = res.result;
    },
    //查询所有子单元工程及施工部位
    async querySubUnitUnionAndPart(val) {
      let data = await api.querySubUnitUnionAndPart({
        organ_node: val,
      });
      let arrTotal = [];
      data.result.forEach((item, index) => {
        let json = {},
          arr = [];
        json.value = Number(item.sub_unit_id) + "-" + item.sub_unit_proj_type;
        json.node = { label: item.sub_unit_name, ...item };
        item.part_list.forEach((items) => {
          let json2 = {};
          json2.value =
            Number(item.sub_unit_id) +
            "-" +
            item.sub_unit_proj_type +
            "*" +
            items.part_type_value;
          json2.node = {
            label: items.part_type_name,
            ...items,
            parentNode: {
              ...item,
              parentVal:
                Number(item.sub_unit_id) + "-" + item.sub_unit_proj_type,
            },
          };
          json2.children = [];
          arr.push(json2);
        });
        json.children = arr;
        arrTotal.push(json);
      });
      this.projectSonArr = arrTotal;
    },
    // 选择所属机构
    handleCheckedChange(json) {
      if (json.data.node.part_type_value && json.checked) {
        //说明选中的是子级-部位，那么需要手动将他对应的上级勾选上
        let parent_sub_unit_id = json.data.node.parentNode.parentVal;
        let chooseKeys =
          this.$refs.treeselect2.$refs.selectTree.getCheckedKeys();
        this.$refs.treeselect2.$refs.selectTree.setCheckedKeys(
          [...chooseKeys, parent_sub_unit_id],
          true
        );
      } else {
        // 取消父级的时候，将下面的子级都取消选中
        // json.data.value
        if (!json.checked) {
          let children = json.checkedNodes;
          let value = json.data.value;
          for (let i in children) {
            if (children[i].value.indexOf("*") != -1) {
              if (children[i].value.split("*")[0] == value) {
                let chooseKeys =
                  this.$refs.treeselect2.$refs.selectTree.getCheckedKeys();
                let index = chooseKeys.indexOf(children[i].value);
                if (index > -1) {
                  chooseKeys.splice(index, 1);
                }
                this.$refs.treeselect2.$refs.selectTree.setCheckedKeys(
                  chooseKeys,
                  true
                );
              }
            }
          }
        }
      }

      this.sub_unit_list = json.checkedNodes;
      this.checkedNodes = json.checkedNodes;
      if (this.checkedNodes.length == 0) {
        this.$refs.treeselect2.valueTitle = "";
      } else if (this.checkedNodes.length == 1) {
        this.$refs.treeselect2.valueTitle = this.checkedNodes[0].node.label;
      } else {
        this.$refs.treeselect2.valueTitle = `${this.checkedNodes[0].node.label}等${this.checkedNodes.length}个单位`;
      }
    },
    // 选择工区
    chooseAreas(val) {
      // 查询劳务单位
      this.QueryLabour();
      // 选择班组
      this.QueryStaffTeamName();
    },
    // 劳务人员筛选劳务单位
    chooselabour(val) {
      this.ruleform.team = "";
      // 查询班组
      this.QueryStaffTeamName();
    },
    //查询班组
    async QueryStaffTeamName() {
      let data = await api.QueryStaffTeamName({
        team_labour: this.ruleform.team_labour,
        team_work_organ_id_union: this.ruleform.team_work_organ_id_union,
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.teamData = data.result;
    },
    //查询劳务单位
    async QueryLabour() {
      let data = await api.QueryStaffTeamLabour({
        organ_node: this.$organ_id_en_or_pro(this),
        team_work_organ_id_union: this.ruleform.team_work_organ_id_union,
      });
      this.labourData = data.result;
    },
    // 选择工程项目
    async chooseProjectParent(val) {
      this.$refs.treeselect2.valueTitle = "";
      this.$refs.treeselect2.$refs.selectTree.setCheckedKeys([]);

      this.ruleform.team_proj_organ_id_un = val;
    },
    // 查询人员详情
    async QueryStaffTeamDetail() {
      let data = await api.QueryStaffTeamDetail({
        team_id: this.team_id,
      });
      let info = data.result[0];
      info.team_time = this.$utils.parseDate2Str(
        info.team_time + "000",
        "YYYYMMDD"
      );
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
      }
      //查询所有子单元工程及施工部位
      await this.querySubUnitUnionAndPart(this.ruleform.team_proj_organ_id_un);
      info.sub_unit_list.forEach((item, index) => {
        this.projectSon =
          this.projectSon +
          (item.tsu_part_type_name
            ? item.tsu_sub_unit_id_un +
              "-" +
              item.tsu_sub_unit_type +
              "*" +
              item.tsu_part_type +
              "," +
              (item.tsu_sub_unit_id_un + "-" + item.tsu_sub_unit_type)
            : item.tsu_sub_unit_id_un + "-" + item.tsu_sub_unit_type) +
          (info.sub_unit_list.length == index + 1 ? "" : ",");
      });
      this.$refs.pic_upload.setPicList(info.pic_list);
      this.$refs.file_upload.setFileList(info.file_list);
    },
    // 确认提交
    async submitFun() {
      let sub_unit_list_arr = [];
      let valueArr = this.sub_unit_list.map((item) => item.value).join();
      this.sub_unit_list.forEach((item) => {
        if (
          item.value.indexOf("*") == -1 &&
          valueArr.indexOf(item.value + "*") == -1
        ) {
          sub_unit_list_arr.push(item);
        }
        if (item.value.indexOf("*") != -1) {
          sub_unit_list_arr.push(item);
        }
      });
      let subArr = [];
      sub_unit_list_arr.forEach((item) => {
        let json = {};
        json.tsu_sub_unit_id_un = item.node.sub_unit_id
          ? item.node.sub_unit_id
          : item.node.parentNode.sub_unit_id;
        json.tsu_sub_unit_type = item.node.sub_unit_proj_type
          ? item.node.sub_unit_proj_type
          : item.node.parentNode.sub_unit_proj_type;
        json.tsu_part_type = item.node.part_type_value
          ? item.node.part_type_value
          : "";
        json.tsu_part_type_name = item.node.part_type_name
          ? item.node.part_type_name
          : "";
        json.sub_unit_organ_id_un = item.node.sub_unit_organ_id_un
          ? item.node.sub_unit_organ_id_un
          : item.node.parentNode.sub_unit_organ_id_un;
        subArr.push(json);
      });
      this.ruleform.sub_unit_list = subArr;
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      // if (!this.ruleform.sub_unit_list.length) {
      //   this.$tip({
      //     isTip: true,
      //     message: "请选择子单位工程",
      //   });
      //   return;
      // }
      let file_obj = { uploadFileModule: "StaffTeam" };
      let picsjson = await this.$refs.pic_upload.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.team_pics = picsjson.file;
      this.ruleform.team_pics_json = picsjson.file_json;
      this.ruleform.team_files = filejson.file;
      this.ruleform.team_files_json = filejson.file_json;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
      };
      subdata.team_time = Number(subdata.team_time);
      this.election_option_id &&
        (subdata.staff_team_election_option_id_un = this.election_option_id);
      let res = await api[
        `${this.team_id ? "UpdateStaffTeam" : "UploadStaffTeam"}`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: async () => {
          await this.queryOrganTree();
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>
