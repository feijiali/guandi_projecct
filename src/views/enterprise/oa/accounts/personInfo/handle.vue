<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="p-2 rounded-1 bg-white flex-fill">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <nInfoTitle :title="'人员基础信息'" class="mb-2" />
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
              v-model="ruleform.account_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="人员性别：">
            <el-select v-model="ruleform.account_sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="身份证号：">
            <el-input
              class="input-m"
              v-model="ruleform.account_id_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="职位：">
            <el-input
              class="input-m"
              v-model="ruleform.account_job"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="联系电话：">
            <el-input
              class="input-m"
              v-model="ruleform.account"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small position-relative"
            label="入职时间："
          >
            <el-date-picker
              @change="chooseServiceTime"
              :clearable="false"
              v-model="ruleform.account_service_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              :picker-options="pickerOptions"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="工龄：">
            <el-input
              class="input-m"
              readonly
              v-model.number="ruleform.account_service_length"
              placeholder="自动计算"
              ><template slot="append">年</template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="职位状态：">
            <el-select v-model="ruleform.account_status" placeholder="请选择">
              <el-option
                v-for="(item, index) in statusArr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="离职时间："
            v-if="ruleform.account_status == 2"
          >
            <el-date-picker
              :clearable="false"
              v-model="ruleform.account_quit_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="试用期限：">
            <el-input
              class="input-m"
              v-model="ruleform.account_trial_time"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="基本工资：">
            <num-input
              v-model="ruleform.account_basic_wage"
              :fixedNum="2"
              unit="元"
            ></num-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="学历：">
            <el-select
              v-model="ruleform.account_education"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in printDataArr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="毕业院校：">
            <el-input
              class="input-m"
              v-model="ruleform.account_education_final"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="专业：">
            <el-input
              class="input-m"
              v-model="ruleform.account_education_major"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="毕业时间：">
            <el-date-picker
              :clearable="false"
              v-model="ruleform.account_education_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="社保公司：">
            <el-select
              filterable
              allow-create
              v-model="ruleform.account_ledger"
              placeholder="请选择/输入"
            >
              <el-option
                v-for="item in organCompanyArr"
                :key="item.account_ledger"
                :label="item.account_ledger"
                :value="item.account_ledger"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="家庭住址：">
            <el-input
              class="input-m"
              v-model="ruleform.account_from"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="邮箱：">
            <el-input
              class="input-m"
              v-model="ruleform.account_email"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="是否需要登录：">
            <el-radio-group
              v-model="ruleform.account_is_need_login"
              class="el-radio-group-home vertical-top"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="权限角色：">
            <el-select
              v-model="ruleform.account_project_role"
              placeholder="请选择"
            >
              <el-option
                v-for="item in authArr"
                :key="item.val"
                :label="item.name"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="权限设置：">
            <el-select
              v-model="ruleform.account_roles"
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleArr"
                :key="item.role_id"
                :label="item.role"
                :value="item.role_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="应用范围：">
            <el-select
              @change="chooseRangeType"
              v-model="ruleform.account_range_type"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in rangeTypeArr"
                :key="index + 1 + '0'"
                :label="item.name"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="管理项目："
            v-if="ruleform.account_range_type == 30"
          >
            <el-select
              @change="handleCheckedChange"
              collapse-tags
              multiple
              filterable
              v-model="account_project_ids"
              placeholder="请选择"
            >
              <el-option key="全选" label="全选" value="全选"></el-option>
              <el-option
                v-for="item in projectListSelect"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long" label="上传头像：">
            <nPicUpload ref="pic_upload1" :length="1" :multiple="false" />
          </el-form-item>
          <el-form-item
            class="form-item-long position-relative"
            label="资料图片："
          >
            <span
              class="position-absolute font-12 pink2"
              style="left: -100px; top: 65px"
              >(身份证、毕业证等)</span
            >
            <nPicUpload ref="pic_upload3" :length="4" />
          </el-form-item>
          <el-form-item
            class="form-item-long position-relative"
            label="附件图片："
          >
            <span
              class="position-absolute font-12 pink2"
              style="left: -100px; top: 65px"
              >(职称、注册资格等)</span
            >
            <nPicUpload ref="pic_upload2" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="4" />
          </el-form-item>

          <nInfoTitle :title="'三类人员'" class="mb-2" />
          <el-form-item class="form-item-long-small must" label="证书类型：">
            <el-select
              clearable
              v-model.number="ruleform.account_three_type"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in employmentArr"
                :key="index"
                :label="item"
                :value="index + 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="证书编号：">
            <el-input
              class="input-m"
              v-model="ruleform.account_three_number"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="发证时间：">
            <el-date-picker
              @change="chooseTime"
              :clearable="false"
              v-model="ruleform.account_three_start"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must"
            label="证书到期时间："
          >
            <el-date-picker
              @change="chooseTime"
              :clearable="false"
              v-model="ruleform.account_three_end"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            class="form-item-long position-relative"
            label="上传证书："
          >
            <nPicUpload ref="pic_upload4" :length="4" />
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
import dayjs from "dayjs";
import setOrganProject from "@/mixins/setOrganProject";
export default {
  mixins: [confirm, upload, setOrganProject],

  data() {
    return {
      title: "",
      isShow: this.$route.meta.isProject,
      statusArr: ["在职", "离职", "实习", "试用"],
      printDataArr: ["小学", "初中", "高中", "大专", "本科", "硕士", "博士"],
      employmentArr: [
        "企业主要负责人(A证)",
        "项目负责人(B证)",
        "专职安全生产管理人员(C证)",
      ],
      authArr: [
        { name: "普通用户", val: 1 },
        { name: "项目人员", val: 2 },
        { name: "管理人员", val: 3 },
        { name: "风控中心人员", val: 4 },
        { name: "领导", val: 5 },
      ],
      rangeTypeArr: this.$route.meta.isProject
        ? [{ name: "项目", key: 10 }]
        : [
            { name: "项目", key: 10 },
            { name: "总部", key: 30 },
          ], //角色数组
      organCompanyArr: [], //社保公司
      isAll: false, //所属机构是否点击了全选
      account_project_ids: [], //管理项目
      ruleform: {
        account_id: null,
        account: "",
        account_name: "",
        account_from: "",
        account_email: "",
        account_basic_wage: null,
        // account_character_type: null,
        account_range_type: null,
        range_projects: [], //配置项目
        account_project_ids: "",
        account_job: "",
        account_status: null,
        account_quit_time: this.$utils.parseDate2Str(new Date(), "YYYY-MM-DD"),
        account_sign: "",
        account_pic: "",
        organ_id_union: null,
        account_is_need_login: 1,
        account_special: null,
        account_id_card: "",
        account_sex: "",
        account_ledger: "",
        account_attend_method: null,
        service_company_id_union: null,
        account_sub_title: "",
        account_sub_title_subsidy: null,
        account_service_length: null,
        account_service_time: "",
        account_trial_time: "",
        account_education: null,
        account_education_final: "",
        account_education_major: "",
        account_education_time: "",
        account_sub_time: "",
        account_sub_account_id_union: null,
        account_project_role: null,
        account_roles: [],
        account_three_type: null,
        account_three_number: "",
        account_three_start: "",
        account_three_end: "",
        account_three_file: "",
        account_three_file_json: "",
      },
      roleArr: [], //角色权限名称数组
      rules: {
        organ_id_union: [
          {
            required: true,
            message: "请选择所属机构",
          },
        ],
        account_name: [
          {
            required: true,
            message: "请输入人员姓名",
          },
        ],

        account_job: [
          {
            required: true,
            message: "请输入职位",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入联系电话",
          },
          {
            pattern: /^1[0-9]{10}$/,
            message: "联系电话格式错误",
          },
        ],

        account_status: [
          {
            required: true,
            message: "请选择职位状态",
          },
        ],
        account_project_role: [
          {
            required: true,
            message: "请选择权限角色",
          },
        ],
        account_range_type: [
          {
            required: true,
            message: "请输入应用范围",
          },
        ],
      },
      rules2: {
        account_three_type: [
          {
            required: true,
            message: "请选择证书类型",
          },
        ],
        account_three_number: [
          {
            required: true,
            message: "请输入证书编号",
          },
        ],
        account_three_start: [
          {
            required: true,
            message: "请选择发证时间",
          },
        ],
        account_three_end: [
          {
            required: true,
            message: "请选择证书到期时间",
          },
        ],
      },
      projectListSelect: [], //管理项目
      treeData: [],
      account_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      organ_id: parseInt(this.$route.query.organ_id), //编辑人员所在组织架构的id
      isTeam: Number(this.$route.query.isTeam), //是否为班组
      role_organ_id: 0, //查询权限时根据选择的所属机构找到他的第一个上级organ_type为20或30的节点id作为权限的过滤参数
      parentIDs: "", //当前所属机构选中节点的所有父节点
      rootID: 0, //根节点ID
      // 不能选择超过今天的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      organ_pid: null, //项目级pid
      departmentIDs: "", //与项目同级的部门属性id
    };
  },
  async mounted() {
    this.ruleform.account_range_type = this.isShow ? 10 : 30;
    await this.getTreeData();
    await this.getOrganProjectAllData();
    // 获取与项目同级的部门
    this.getPartmentIDFun();
    if (this.isTeam === 0) {
      this.ruleform.organ_id_union = null;
      this.$refs.treeselect.valueTitle = "";
      this.$refs.treeselect.$refs.selectTree.setCurrentKey(null);
    } else if (this.isTeam === 1) {
      this.ruleform.organ_id_union = parseInt(this.$route.query.organ_id);
      let node = this.$refs.treeselect.$refs.selectTree.getNode(
        this.ruleform.organ_id_union
      );
      this.getSelectValue(node.data);
    }
    if (this.isShow) {
      this.ruleform.account_range_type = 10;
    }
    // 查询社保公司
    this.queryAccountLedger();
    if (this.account_id) {
      this.title = "编辑人员";
      await this.queryAccountRole();
    } else {
      this.title = "新增人员";
    }
  },
  methods: {
    // 获取与项目同级的部门
    async getPartmentIDFun() {
      let { result } = await api.queryOrgan({
        organ_type: 60,
        organ_pid: this.organ_pid,
      });
      this.departmentIDs = result.map((item) => item.organ_id).join(",");
    },
    // 获取组织架构
    async getTreeData() {
      let data1 = await api.queryOrganAccountCountTree({});
      let data2 = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.treeData = data2.result;
      this.rootID = String(data1.result[0].tag);
    },
    // 查询节点下的项目
    async getOrganProjectAllData() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_node: this.$organ_id_en_or_pro(this),
        noOrganNodes: true,
      });
      this.organ_pid = result[0] ? result[0].organ_pid : null; //获取项目的父级organ_id
      this.projectListSelect = result;
    },
    // 到期时间要大于发证时间
    chooseTime(val) {
      if (
        this.ruleform.account_three_start &&
        this.ruleform.account_three_end
      ) {
        if (
          new Date(this.ruleform.account_three_start) >
          new Date(this.ruleform.account_three_end)
        ) {
          this.$tip({
            isTip: true,
            message: "到期时间要大于发证时间",
          });
          this.ruleform.account_three_end = "";
          return;
        }
      }
    },
    findRoleOranID(data) {
      let arr = data.filter((item) => item.organ_type == 30);
      let organ_id = arr.length ? arr[0].organ_id : 0;
      if (organ_id) {
        this.role_organ_id = organ_id;
        this.queryRole();
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].organ_type == 20) {
            //公司
            this.role_organ_id = data[i].organ_id;
            this.queryRole();
          }
        }
      }
    },
    async getParentNodes(ids) {
      let { result } = await api.queryOrgan({
        organ_ids: ids,
        organ_type_node: "20,30",
      });
      // 找出第一个organ_type为20或者30的节点
      this.findRoleOranID(result);
    },
    // 树形下拉选择
    async getSelectValue(node) {
      if (node.node.organ_type == 60 || node.node.organ_type == 61) {
        if (this.isShow) {
          this.rangeTypeArr = [
            // { name: "项目", key: 10 },
            { name: "总部", key: 30 },
          ];
        } else {
          this.rangeTypeArr = [
            { name: "项目", key: 10 },
            { name: "总部", key: 30 },
          ];
        }
        if (node.node.organ_project_depart == 1) {
          //表示选择的是项目下的部门，则应用范围不显示总部
          // this.rangeTypeArr = [{ name: "项目", key: 10 }];
          this.ruleform.account_range_type = 10;
        } else {
          // this.rangeTypeArr = [
          //   { name: "总部", key: 30 },
          // ];
          this.ruleform.account_range_type = 30;
        }
        this.ruleform.organ_id_union = node.node.organ_id;
        await this.getParentNodes(node.node.organ_parent_node);
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
    // 选择入职时间计算工龄
    chooseServiceTime(val) {
      if (val) {
        this.ruleform.account_service_length = dayjs(
          this.$utils.parseDate2Str(new Date(), "YYYY-MM-DD")
        ).diff(dayjs(val), "years");
      }
    },
    // 查询社保公司
    async queryAccountLedger() {
      let data = await api.queryAccountLedger({});
      this.organCompanyArr = data.result;
    },
    // 查询列表
    async queryRole() {
      let data = await api.queryRole({
        organ_node: this.role_organ_id,
      });
      this.roleArr = data.result;
    },
    // 选择应用范围
    chooseRangeType(val) {
      if (val == 10) {
        this.account_project_ids = [];
        this.ruleform.account_project_ids = "";
      }
    },
    // 查询人员详情
    async queryAccountRole() {
      let data = await api.queryAccountRole({
        account_id: this.account_id,
      });
      let info = data.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = info[key];
        if (
          (key == "account_education" || key == "account_three_type") &&
          info[key] == 0
        ) {
          this.ruleform[key] = null;
        }
      }
      if (this.rootID == info.account_project_ids) {
        let project_id = this.projectListSelect.map((item) => item.organ_id);
        this.account_project_ids = project_id.concat(["全选"]);
        this.isAll = true;
      } else {
        let account_project_ids = info.account_project_ids
          .split(",")
          .map(Number)
          .filter((item) => this.departmentIDs.indexOf(item) == -1);
        this.account_project_ids = account_project_ids;
      }
      info.pic_list && this.$refs.pic_upload2.setPicList(info.pic_list);
      info.doc_list && this.$refs.pic_upload3.setPicList(info.doc_list);
      info.three_file && this.$refs.pic_upload4.setPicList(info.three_file);
      info.file_list && this.$refs.file_upload.setFileList(info.file_list);
      if (info.url) {
        this.$refs.pic_upload1.setPicList([
          {
            url: info.url,
            file_name: info.account_pic,
          },
        ]);
      }

      this.ruleform.account_roles = info.role_list.map((item) => item.role_id);
      // 递归查找当前节点
      this.getCheckedNodes(this.treeData, this.ruleform.organ_id_union);
      // 查询当前选中的所属机构的所有父节点信息
      this.getParentNodes(this.parentIDs);

      // this.$utils.renderFile(
      //   this.editData.id_pic_list,
      //   this.picListCard,
      //   "pic",
      //   this.editData.account_id_pic.split(",")
      // );
    },
    getCheckedNodes(data, value) {
      data.forEach((item) => {
        if (value === item.tag) {
          this.parentIDs = item.node.organ_parent_node;
        } else {
          if (item.leaves && item.leaves.length > 0) {
            this.getCheckedNodes(item.leaves, value);
          }
        }
      });
    },
    // 选择所属机构
    handleCheckedChange(val) {
      let ids = this.projectListSelect.map((item) => item.organ_id);
      if (this.isAll) {
        //表示全选了，就需要取消全选
        this.isAll = false;
        // 取消任意一个选项，但是没有取消全选
        if (val.indexOf("全选") > -1) {
          // filter过滤，把已经勾选的除了“全选”的项都存下
          this.account_project_ids = val.filter((p) => p != "全选");
        } else {
          //直接取消全选
          this.account_project_ids = [];
        }
      } else {
        //由于默认是false,当你开始选择时，走的时这步
        // 选项中是否有"全选"，是否点击了"全选"按钮
        if (val.indexOf("全选") > -1) {
          //如果有就将"全选"和所有单选项合在一起
          // filter过滤，把已经勾选的除了“全选”的项都存下
          this.account_project_ids = ids.concat(["全选"]);
          this.isAll = true;
        } else {
          //如果选择的选项的长度和原本选项长度一致，那证明也是全选
          if (val.length == this.projectListSelect.length) {
            this.account_project_ids = ids.concat(["全选"]);
            this.isAll = true;
          } else {
            this.account_project_ids = val;
          }
        }
      }
    },
    // 确认提交
    async submitFun() {
      let ind = this.account_project_ids.indexOf("全选");
      let project_ids = this.account_project_ids
        .filter((item) => item !== "全选")
        .join(",");
      this.ruleform.account_project_ids =
        ind > -1
          ? this.rootID
          : project_ids +
            (project_ids ? "," + this.departmentIDs : this.departmentIDs);
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (this.ruleform.account_range_type == 30) {
        if (this.account_project_ids.length == 0) {
          this.$tip({
            isTip: true,
            message: "请选择管理项目",
          });
          return;
        }
      }
      // 资料图片必填是项目管家的需求,冠迪不需要必填
      // if (this.$refs.pic_upload3.picList.length == 0) {
      //   this.$tip({
      //     isTip: true,
      //     message: "请上传资料图片",
      //   });
      //   return;
      // }
      let threeRules = [
        "account_three_type",
        "account_three_number",
        "account_three_start",
        "account_three_end",
      ];
      // 判断三类人员输入框是否有输入,若有-全部必填,若没有-一个都不填
      let bool = threeRules.some((item) => {
        return this.ruleform[item];
      });
      if (bool) {
        if (!this.$utils.ruleFormPro(this, this.rules2, this.ruleform)) {
          return;
        }
      }
      this.ruleform.account_three_type = !this.ruleform.account_three_type
        ? null
        : this.ruleform.account_three_type;
      // 判断资料图片是否上传
      let file_obj = { uploadFileModule: "Account" };
      this.ruleform.account_pic = await this.$refs.pic_upload1.submitFun(
        false,
        file_obj
      );
      let picsjson = await this.$refs.pic_upload2.submitFun(true, file_obj);
      let picsjson2 = await this.$refs.pic_upload3.submitFun(true, file_obj);
      let picsjson4 = await this.$refs.pic_upload4.submitFun(true, file_obj);
      let filejson = await this.$refs.file_upload.submitFun(true, file_obj);
      this.ruleform.account_files_pic = picsjson.file;
      this.ruleform.account_files = filejson.file;
      this.ruleform.account_documents_files_pic = picsjson2.file;
      this.ruleform.account_documents_files_pic_json = picsjson2.file_json;

      this.ruleform.account_three_file = picsjson4.file;
      this.ruleform.account_three_file_json = picsjson4.file_json;

      this.ruleform.account_files_pic_json = picsjson.file_json;
      this.ruleform.account_files_json = filejson.file_json;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = {
        ...this.ruleform,
        account_quit_time:
          this.ruleform.account_status == 2
            ? this.ruleform.account_quit_time
            : "",
      };
      subdata.account_roles = subdata.account_roles.join(",");
      // subdata.account_character_type = Number(subdata.account_character_type);
      // if (subdata.account_password) {
      //   if (subdata.account_password == "*") {
      //     subdata.account_password = "*";
      //   } else {
      //     if (subdata.account_password.length < 6) {
      //       this.$tip({
      //         isTip: true,
      //         message: "请输入至少6位字符的密码！"
      //       });
      //       this.ruleform.account_password = "";
      //       return;
      //     } else {
      //       subdata.account_password = this.$utils.calcuMD5(
      //         subdata.account_password
      //       );
      //     }
      //   }
      // }
      subdata.account_range_type == 10
        ? (subdata.account_project_ids = "")
        : subdata.account_project_ids;
      let res = await api[
        `${this.account_id ? "updateAccountRole" : "uploadAccountRole"}`
      ](subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          if (this.account_id == this.$store.getters.account_id) {
            //表示编辑的自己，则需要更新store数据
            this.$store.dispatch(
              "user/set_acount_project_ids",
              this.ruleform.account_project_ids
            );
            this.getOrganProjectData();
          }
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>
