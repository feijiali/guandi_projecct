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
    <!-- 新增子集 -->
    <n-dialog ref="dialog" :diaTit="diaTit" :diaWidth="'30%'" :isForm="true">
      <template slot="diaSlot">
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item
            class="form-item-long"
            label="模块类型："
            v-if="type == 1"
          >
            <el-radio-group
              v-model="ruleform.module_type"
              @change="changeModuleType"
            >
              <el-radio
                :label="1"
                v-if="!(parentNode && parentNode.module_type == 2)"
                >功能</el-radio
              >
              <el-radio
                :label="2"
                v-if="!(parentNode && parentNode.module_type == 2)"
                >基础</el-radio
              >
              <el-radio
                :label="3"
                v-if="parentNode && parentNode.module_type == 2"
                >行为</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            class="form-item-long"
            label="所属模块："
            v-if="type == 1"
          >
            <el-input
              readonly
              v-model="relation_chn"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="所属层级：">
            <el-input
              readonly
              v-model="relation_level"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long"
            label="父级模块："
            v-if="type != 1 && ruleform.module_type != 3"
          >
            <n-treeselect
              ref="treeselect3"
              @getSelectNode="getSelectValue3"
              :treeData="treeData"
              :defaultProps="defaultProps"
              :Isvalue="true"
              :value="ruleform.relation_pid"
            />
          </el-form-item>
          <el-form-item
            class="form-item-long"
            label="是否为消息："
            v-if="type != 1 && ruleform.module_type != 3"
          >
            <el-radio-group v-model="ruleform.relation_msg_type">
              <el-radio :label="0">无消息</el-radio>
              <el-radio :label="1">消息</el-radio>
              <el-radio :label="2">其它消息</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="功能名称：">
            <el-input
              v-if="ruleform.module_type != 2 || type == 2"
              v-model="ruleform.module_chn"
              placeholder="请输入"
            ></el-input>

            <el-select
              v-else
              v-model="ruleform.module_chn"
              filterable
              placeholder="请选择"
              @change="chooseOrganCompany"
            >
              <el-option
                v-for="item in functionArr"
                :key="item.basis_id"
                :label="item.basis_chn + '(' + item.basis_eng + ')'"
                :value="item.basis_chn"
              >
                <span>{{ item.basis_chn }}</span>
                <span class="ml-05 d-inline-block"
                  >（{{ item.basis_eng }}）</span
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long" label="英文名称：">
            <el-input
              v-if="ruleform.module_type != 3"
              v-model="ruleform.module_eng"
              placeholder="请输入"
            ></el-input>
            <el-input
              v-else
              v-model="ruleform.module_action_eng"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="所属机构：">
            <el-select
              @change="handleCheckedChange"
              multiple
              collapse-tags
              v-model="relation_organ_ids_change"
              placeholder="请选择"
            >
              <el-option key="全选" label="全选" value="全选"></el-option>
              <el-option
                v-for="item in treeData2"
                :key="item.organ_id"
                :label="item.organ"
                :value="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
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
    <!-- 新增一级 -->
    <n-dialog
      ref="firstModeldialog"
      :diaTit="'新增一级模块'"
      :diaWidth="'25%'"
      :isForm="true"
    >
      <template slot="diaSlot">
        <firstModeldialog @addFirstafter="addFirstafter"></firstModeldialog>
      </template>
    </n-dialog>
    <nInfoTitle title="功能清单配置" class="my-1" />
    <n-button
      class="position-absolute z-index-2"
      style="right: 20px; top: 40px"
      :btnText="'基础模块'"
      @buttonClick="$router.linkTo('enterprise_backstage_list')"
    >
    </n-button>
    <n-button
      class="position-absolute z-index-2"
      style="right: 20px; top: 90px"
      :btnText="'新增一级模块'"
      @buttonClick="addFirstModel('enterprise_backstage_list')"
    >
    </n-button>
    <div class="backstage-tree" style="height: calc(100% - 100px)">
      <n-scroll>
        <n-tree
          class="pr-2"
          style="padding-bottom: 30px"
          :highlight-current="false"
          :treeData="treeData"
          ref="treeNode"
          :defaultProps="defaultProps"
          :btnIsShow="btnIsShow"
          @rightClick="rightClick"
          @leftClick="leftClick"
          :isRightClick="true"
          @handleFun="handleFun"
        >
          <template v-slot:default="slotProps">
            <span>-{{ slotProps.node.module_eng }}</span>
          </template>
        </n-tree>
      </n-scroll>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";

import confirm from "@/mixins/confirm";
import firstModeldialog from "./components/firstModeldialog";
export default {
  mixins: [confirm],
  components: {
    firstModeldialog,
  },
  data() {
    return {
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "module_chn",
      },
      defaultPropsOrgan: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      defaultExpandedKeySingle: [], //默认展开的单选树节点的 key 的数组
      treeData: [],
      itemNode: {}, //鼠标左击/右击节点获取的节点数据
      isAdd: false, //显示新增下级弹框
      diaTit: "插入子集", //弹框标题
      ruleform: {
        module_type: 1,
        relation_msg_type: 0,
        relation_organ_ids_change: "",
      },
      relation_organ_ids_change: [], //记录编辑时候本身的数据
      isAll: false, //所属机构是否点击了全选
      // this.ruleform.module_type==1?'请输入功能名称':'请选择功能名称'
      formValidation: [
        {
          must: ["module_type", "module_chn"],
          tip: ["请选择模块类型", "请输入功能名称"],
        },
      ],
      treeData2: [],
      functionArr: [], //功能名称
      relation_chn: "", //所属模块
      parentNode: null,
      relation_level: "", //所属层级
      type: 4, //新增一级模块
      btnIsShow: { isAdd: true, isEdit: true, isDel: true }, //是否展示编辑按钮
    };
  },
  mounted() {
    this.getTreeData();
    this.QueryOrgan();
  },
  methods: {
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 切换模块类型
    changeModuleType(val) {
      this.$set(this.ruleform, "module_chn", "");
      this.$set(this.ruleform, "module_eng", "");
    },
    //获取组织架构下面的项目
    async QueryOrgan() {
      let data = await api.queryOrgan({ organ_type: 30 });
      this.treeData2 = data.result;
    },
    // 获取模块树
    async getTreeData() {
      let node = this.$refs.treeNode.$refs.tree.getCurrentNode();
      let data = await api.queryRelationAll({});
      this.treeData = data.result;
      // 重新拿到数据后设置当前选中的节点
      this.$nextTick(() => {
        this.$refs.treeNode.$refs.tree.setCurrentKey(this.itemNode.tag);
      });
      this.expandedKeysData(node);
    },
    //处理树形数据默认展开节点
    expandedKeysData(node) {
      if (node) {
        this.defaultExpandedKeySingle = node.node.relation_id_upper
          .split(",")
          .map((item) => Number(item));
      }
    },
    // 选择功能名称
    chooseOrganCompany(val) {
      let ind = this.functionArr.findIndex((item) => item.basis_chn == val);
      this.ruleform.module_eng = this.functionArr[ind].basis_eng;
    },
    // 鼠标右击事件
    rightClick({ event, item, node, element }) {
      this.itemNode = item;
      this.btnIsShow = {
        isAdd: true,
        isEdit: true,
        isDel: true,
      };
    },
    //鼠标左击事件
    leftClick(item, value, element) {},
    /**
     * @param {Object} type:0——插入子集；1——编辑名称；2——删除
     */
    async handleFun(item) {
      this.type = item.type;
      if (item.type === 1 || item.type == 2) {
        this.$refs.dialog.show(); //显示弹框
        this.ruleform.relation_organ_ids_change = "";
        this.ruleform = {
          module_type: 1,
        };
        this.queryBasis();
        this.isAdd = item.type === 1 ? true : false;
        this.diaTit = item.type === 1 ? "插入子集" : "编辑";
        // 编辑的时候所属模块也就是当前节点的父节点名字；不能直接拿到，需要通过接口去拿
        this.relation_level =
          this.itemNode.node.relation_level + (item.type === 1 ? 1 : 0) + "级";
        this.parentNode = null;
        if (item.type == 2) {
          let data = await api.queryRelationAll({
            module_eng: this.itemNode.node.module_eng,
          });
          this.relation_chn = data.result[0].node.module_chn;
          // 数据回填
          var json = [
            "module_action_eng",
            "relation_id",
            "module_chn",
            "module_eng",
            "module_type",
            "relation_id_lower",
            "relation_id_upper",
            "relation_pid",
            "relation_level",
            "relation_upper",
            "relation_lower",
            "relation_msg_type",
          ];
          this.$utils.renderRuleForm(
            this,
            json,
            this.ruleform,
            this.itemNode.node
          );
          this.ruleform.relation_msg_type = this.itemNode.node.relation_msg_type
            ? this.itemNode.node.relation_msg_type
            : 0;
          this.ruleform.relation_organ_ids_change =
            data.result[0].node.relation_organ_ids;
          this.relation_organ_ids_change = data.result[0].node
            .relation_organ_ids
            ? data.result[0].node.relation_organ_ids.split(",").map(Number)
            : [];
          let ids = this.treeData2.map((item) => item.organ_id);

          //如果选择的选项的长度和原本选项长度一致，那证明也是全选
          if (this.relation_organ_ids_change.length == this.treeData2.length) {
            this.relation_organ_ids_change = ids.concat(["全选"]);
            this.isAll = true;
          }
        } else {
          this.ruleform.relation_msg_type = 0;
          this.relation_chn = this.itemNode.node.module_chn;
          this.ruleform.relation_pid = this.itemNode.node.relation_id;
          this.parentNode = this.itemNode.node;
          if (this.parentNode.module_type == 2) {
            this.ruleform.module_type = 3;
          }
          this.ruleform.relation_level = this.itemNode.node.relation_level + 1;
        }
      } else {
        this.confirm().then(async () => {
          await api.delRelation({
            relation_ids: this.itemNode.node.relation_id_lower,
          });
          this.renderTreeFun();
        });
      }
    },
    // 查询基本模块
    async queryBasis() {
      let data = await api.queryUnusedBasis({});
      this.functionArr = data.result;
    },
    getSelectValue3({ tag }) {
      this.ruleform.relation_pid = tag;
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (this.$utils.ruleFormTip(this, this.formValidation, this.ruleform)) {
        this.relation_organ_ids_change = this.relation_organ_ids_change.filter(
          (item) => item !== "全选"
        );
        this.ruleform.relation_organ_ids_change =
          this.relation_organ_ids_change.join(",");
        this.ruleform.module_type == 3 &&
          (this.ruleform.module_eng = this.ruleform.module_eng);
        if (this.ruleform.relation_pid == this.ruleform.relation_id) {
          this.$tip({
            isTip: true,
            message: "父级不能选择自己",
          });
          return;
        }
        if (
          this.ruleform.relation_id_lower &&
          this.ruleform.relation_id_lower
            .split(",")
            .indexOf(this.ruleform.relation_pid + "") != -1
        ) {
          this.$tip({
            isTip: true,
            message: "父级不能选择自己的子级",
          });
          return;
        }
        if (
          !this.isAdd &&
          this.ruleform.relation_pid != this.itemNode.node.relation_pid
        ) {
          let node = this.$refs.treeselect3.$refs.selectTree.getCurrentNode();
          this.ruleform.relation_id_lower =
            this.ruleform.relation_id + "," + node.node.relation_id_lower;
        }
        let res = await api[
          `${this.isAdd ? "uploadRelation" : "updateRelation"}`
        ](this.ruleform);
        if (res) {
          this.$refs.dialog.cancel();
          this.$tip({
            isTip: false,
            func: () => {
              //拿到展开的节点数组和选中的节点重新绘制树形组件
              this.renderTreeFun();
            },
          });
        }
      }
    },
    renderTreeFun() {
      this.getTreeData();
      // 获取展开的节点数组
      //this.defaultExpandedKeySingle = this.$refs.treeNode.nodeExpandArr;
    },
    addFirstModel() {
      this.type = 4;
      this.ruleform.relation_msg_type = 0;
      this.$refs.firstModeldialog.show();
    },
    addFirstafter() {
      this.$refs.firstModeldialog.cancel();
      this.$tip({
        isTip: false,
        func: () => {
          //拿到展开的节点数组和选中的节点重新绘制树形组件
          this.renderTreeFun();
        },
      });
    },
    // 选择所属机构
    handleCheckedChange(val) {
      let ids = this.treeData2.map((item) => item.organ_id);
      if (this.isAll) {
        //表示全选了，就需要取消全选
        this.isAll = false;
        // 取消任意一个选项，但是没有取消全选
        if (val.indexOf("全选") > -1) {
          // filter过滤，把已经勾选的除了“全选”的项都存下
          this.relation_organ_ids_change = val.filter((p) => p != "全选");
        } else {
          //直接取消全选
          this.relation_organ_ids_change = [];
        }
      } else {
        //由于默认是false,当你开始选择时，走的时这步
        // 选项中是否有"全选"，是否点击了"全选"按钮
        if (val.indexOf("全选") > -1) {
          //如果有就将"全选"和所有单选项合在一起
          // filter过滤，把已经勾选的除了“全选”的项都存下
          this.relation_organ_ids_change = ids.concat(["全选"]);
          this.isAll = true;
        } else {
          //如果选择的选项的长度和原本选项长度一致，那证明也是全选
          if (
            this.account_project_ids.length == this.projectListSelect.length
          ) {
            this.relation_organ_ids_change = ids.concat(["全选"]);
            this.isAll = true;
          }
          if (val.length == this.treeData2.length) {
            this.relation_organ_ids_change = ids.concat(["全选"]);
            this.isAll = true;
          } else {
            this.relation_organ_ids_change = val;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-index-box {
  background-image: url("../../../assets/images/bg_gridtable.png");
  background-color: white;
  padding: 0 20px;

  .menu-tree {
    .title-span {
      background-color: $main;
      height: 5px;
      border-radius: 10px;
    }

    .title-span-box {
      top: 12px;
      left: 10px;
    }

    .title-span-l {
      width: 25px;
    }

    .title-span-r {
      width: 15px;
    }
  }

  .home-index-right-box {
    background: #fff;
    box-shadow: 0 0 20px #dae5f0;
    padding: 10px;

    .arrow {
      position: absolute;
      left: -16px;
      top: 30%;
      font-size: 26px;
      color: #fff;
      text-shadow: 0 0 20px #dae5f0;
    }

    .home-right-item-btn {
      border-radius: 5px;
      line-height: 28px;
      padding: 0 10px;
      cursor: pointer;
      position: relative;

      &:hover {
        background-color: $main;
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
.home-index-box {
  .backstage-tree {
    ::selection {
      color: #fff;
      background: #1ad910;
    }
  }
}
</style>
