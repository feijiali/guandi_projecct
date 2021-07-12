<template>
  <div
    class="
      pt-2
      pb-2
      pl-3
      pr-3
      h-100
      position-relative
      bg-white
      rounded-1
      home-index-box
      bgc
    "
  >
    <n-scroll>
      <n-dialog
        ref="dialog"
        :diaTit="diaTit"
        :diaWidth="'35%'"
        :isForm="true"
        class="stretch-dialog"
      >
        <template slot="diaSlot">
          <el-form ref="ruleform" class="el-form-box" :model="ruleform">
            <el-form-item class="form-item-long" label="机构名称：">
              <el-input
                placeholder="请输入"
                v-model="ruleform.organ"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-long" label="所属上级：">
              <n-treeselect
                ref="treeselect"
                @getSelectNode="getSelectValue"
                :treeData="isAdd ? treeData2 : treeDataFilter"
                :Isvalue="true"
                :value="ruleform.organ_pid"
              />
            </el-form-item>
            <el-form-item
              class="form-item-long"
              label="机构类型："
              v-if="itemNode.node || (itemNode.node && !isAdd)"
            >
              <el-radio-group
                @change="chooseOrganType"
                v-model="ruleform.organ_type"
                class="el-radio-form"
              >
                <el-radio
                  v-for="(item, index) in isAdd
                    ? GLOBAL.organTypeArr[itemNode.node.organ_type]
                    : GLOBAL.organTypeArrs"
                  :key="index"
                  :label="item.type"
                  >{{ item.name }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long" label="访问限定：">
              <el-radio-group
                v-model="ruleform.organ_token"
                class="el-radio-form"
              >
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item-long" label="显示排序：">
              <num-input
                placeholder="请输入"
                v-model="ruleform.organ_order"
                :fixedNum="0"
              ></num-input>
            </el-form-item>
            <!-- <el-form-item class="form-item-long" label="单位公司：">
              <el-select
                v-model="ruleform.organ_company"
                filterable
                allow-create
                default-first-option
                placeholder="请选择/输入"
              >
                <el-option
                  v-for="(item, index) in organCompanyArr"
                  :key="index"
                  :label="item.organ_company"
                  :value="item.organ_company"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </template>
      </n-dialog>
      <div style="padding-bottom: 46px">
        <n-tree
          class="pr-2 font-15 mt-3"
          :highlight-current="false"
          :treeData="treeData"
          ref="treeNode"
          :btnIsShow="btnIsShow"
          @rightClick="rightClick"
          @leftClick="leftClick"
          @handleFun="handleFun"
          :isRightClick="isRightClick"
        ></n-tree>
      </div>
    </n-scroll>
  </div>
</template>
<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import { hasPermissionArr } from "@/plugins/permission_tools";
import setSubject from "@/mixins/setSubject";
import setOrganProject from "@/mixins/setOrganProject";
import setOrganTreedata from "@/mixins/setOrganTreedata";
export default {
  mixins: [confirm, setSubject, setOrganProject, setOrganTreedata],
  data() {
    return {
      treeData: [], //人员组织架构数据
      itemNode: {}, //鼠标左击/右击节点获取的节点数据
      isAdd: false, //显示新增下级弹框
      diaTit: "插入子集", //弹框标题
      defaultExpandedKeySingle: [], //默认展开的单选树节点的 key 的数组
      ruleform: {
        organ_token: 0,
        organ_order: 0,
        organ_pid: null,
      },
      formValidation: [
        {
          must: ["organ", "organ_type"],
          tip: ["请输入机构名称", "请选择机构类型"],
        },
      ],
      organCompanyArr: [], //单位公司
      treeDataFilter: this.$store.getters.organTreeData, //编辑时对所属机构进行过滤
      isShowSonTree: false, //判断是否显示所属上级
      btnIsShow: { isAdd: true, isEdit: true, isDel: true }, //是否展示编辑按钮
      isRightClick: hasPermissionArr(["Organ"]), //是否能新增
    };
  },
  computed: {
    treeData2() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      let data = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.treeData = data.result;
    },
    // 选择所属上级
    getSelectValue(node) {
      this.ruleform.organ_pid = node.tag;
    },
    // 获取组织架构
    async getTreeDataSon() {
      let data = await api.queryOrganAccountCountTree({
        organ_self: this.itemNode.tag, //过滤自己
        organ_child: this.itemNode.tag, //过滤自己的child
      });
      this.treeDataFilter = data.result;
    },
    //处理树形数据默认展开节点
    expandedKeysData() {
      this.treeData[0].leaves.forEach((item) => {
        this.defaultExpandedKeySingle.push(item.tag);
      });
    },
    // 鼠标右击事件
    rightClick({ event, item, node, element }) {
      this.btnIsShow = {
        isAdd:
          (hasPermissionArr(["Organ-upload"]) && item.node.organ_type <= 50) ||
          item.node.organ_type == 60
            ? true
            : false,
        isEdit:
          hasPermissionArr(["Organ-update"]) && item.node.organ_type !== 70
            ? true
            : false,
        isDel:
          hasPermissionArr(["Organ-delete"]) &&
          item.node.organ_type != 70 &&
          item.node &&
          item.node.account_counts == 0 &&
          item.leaves.length == 0
            ? true
            : false,
      };
      this.itemNode = item;
      if (this.itemNode.node.organ_type == 60) {
        this.formValidation = [
          {
            must: ["organ"],
            tip: ["请输入组织机构名称"],
          },
        ];
      }
    },
    // 选择所属机构
    chooseOrganType(val) {
      // 新增项目下的部门organ_project_depart传1否则传2
      if (val == 60) {
        if (this.itemNode.node.organ_type == 30) {
          //部门
          this.ruleform.organ_project_depart = 1;
        } else {
          this.ruleform.organ_project_depart = 0;
        }
      }
    },
    //鼠标左击事件
    leftClick(item, value, element) {
      // this.menuVisible = false;
    },
    /**
     * @param {Object} type:0——插入子集；1——编辑名称；2——删除
     */
    async handleFun(item) {
      if (item.type === 1 || item.type === 2) {
        this.$refs.dialog.show(); //显示弹框
        this.ruleform = {
          organ_token: 0,
        };
        this.queryOrganCompany();
        this.isAdd = item.type === 1 ? true : false;
        this.diaTit = item.type === 1 ? "插入子集" : "编辑名称";
        if (item.type == 2) {
          if (this.itemNode.tag == this.$organ_id_en_or_pro(this)) {
            //说明当前编辑的事用户所在的最高层级，则不显示所属上级
            this.isShowSonTree = false;
          } else {
            this.isShowSonTree = true;
            await this.getTreeDataSon();
          }
          //修改
          // 数据回填
          var json = [
            "organ",
            "organ_type",
            "organ_company",
            "organ_id",
            "organ_pid",
            "organ_token",
            "organ_order",
          ];
          this.$utils.renderRuleForm(
            this,
            json,
            this.ruleform,
            this.itemNode.node
          );
          if (this.ruleform.organ_token == "") {
            this.ruleform.organ_token = 0;
          } else if (this.ruleform.organ_token == "1") {
            this.ruleform.organ_token = 1;
          }
        } else {
          //新增
          this.ruleform.organ_token = 0;
          this.ruleform.organ_pid = this.itemNode.node.organ_id;
        }
      } else {
        this.confirm().then(async () => {
          let data = await api.delOrgan({
            organ_id: this.itemNode.tag,
          });
          this.renderTreeFun(true);
        });
      }
    },
    // 查询单位公司
    async queryOrganCompany() {
      let data = await api.queryOrganCompany({});
      this.organCompanyArr = data.result;
    },
    // 确认提交
    async submitFun() {
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        if (this.ruleform.organ_token == 0) {
          this.ruleform.organ_token = "";
        } else if (this.ruleform.organ_token == 1) {
          this.ruleform.organ_token = "1";
        }
        if (!this.isAdd) {
          if (this.ruleform.organ_type == 60) {
            this.ruleform.organ_project_depart = 1;
          } else {
            this.ruleform.organ_project_depart = 0;
          }
        }
        let res = await api[`${this.isAdd ? "uploadOrgan" : "updateOrgan"}`](
          this.ruleform
        );
        if (res) {
          this.$refs.dialog.cancel();
          this.$tip({
            isTip: false,
            func: () => {
              //拿到展开的节点数组和选中的节点重新绘制树形组件
              this.renderTreeFun(true);
            },
          });
        }
      }
    },

    renderTreeFun(bool) {
      this.getTreeData();
      this.getOrganProjectData();
      this.getSubjectData();
    },
  },
};
</script>
<style lang="scss" scoped>
.home-index-box {
  background-image: url("../../../assets/images/bg_gridtable.png");
  background-color: white;
}
</style>

