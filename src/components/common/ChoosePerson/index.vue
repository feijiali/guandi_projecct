<template>
  <div>
    <div class="tree-dialog-box">
      <div
        class="el-form-item-radio position-relative z-index-1"
        style="padding: 20px 35px 0 20px"
      >
        <el-radio-group
          v-if="!section && !sections"
          v-model="chooseAll"
          class="el-radio-group-home vertical-top"
          @change="chooseAllfun"
        >
          <el-radio class="w-100" :label="true">全选</el-radio>
          <el-radio v-if="checkAllPerson" class="w-100" :label="2"
            >全体人员</el-radio
          >
        </el-radio-group>
        <slot></slot>
      </div>
      <n-scroll :native="false" class="content-tree-box pb-2 flex-fill">
        <n-tree
          :expandAll="false"
          :organize="false"
          class="el-tree-w-100 choose-person-tree pl-2 pt-1 background-tree"
          :highlight-current="false"
          :treeData="treeDataPerson"
          :defaultProps="defaultProps"
          ref="treeNode"
          @leftClick="leftClick"
          :defaultNodeKey="section"
          :defaultExpandedKeys="defaultExpandedKeySingle"
          ><template v-slot:default="slotProps">
            <span v-if="slotProps.node.account_counts != 0"
              >({{ slotProps.node.account_counts }}人)</span
            ></template
          ></n-tree
        >
      </n-scroll>
    </div>
    <div class="tree-right-dialog-box bg-white p-3">
      <n-search
        style="width: 250px !important"
        ref="serch"
        :width="240"
        :isInput="true"
        :placeholder="'请输入人员姓名或联系电话'"
        @searchFun="searchFun"
      ></n-search>
      <div
        class="pl-2 mt-2 el-form-item-radio"
        style="height: calc(100% - 80px)"
      >
        <n-scroll
          style="height: calc(100% - 48px)"
          :native="false"
          v-if="personList.length"
        >
          <template>
            <template v-if="!isSingle">
              <el-checkbox
                class="mb-1"
                :label="'false'"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="choosePersonIDsArr"
                class="checkbox-group-box vertical-top checkbox-group-box-video"
                @change="choosePerson"
              >
                <el-checkbox
                  :label="item.account_id"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  {{ item.account_name }}
                  <span class="text-secondary-2"
                    >【{{ item.account_job }}】</span
                  >
                </el-checkbox>
              </el-checkbox-group>
            </template>
            <el-radio-group
              v-if="isSingle"
              v-model="choosePersonID"
              class="el-radio-group-home vertical-top"
              @change="choosePersonSingle"
            >
              <el-radio
                class="d-inline-block"
                :label="item.account_id"
                v-for="(item, index) in personList"
                :key="index"
              >
                {{ item.account_name }}
                <span class="text-secondary-2">【{{ item.account_job }}】</span>
              </el-radio>
            </el-radio-group>
          </template>
        </n-scroll>
        <el-pagination
          v-if="totalcount > listQuery.page_size"
          small
          background
          class="text-right"
          layout="prev, pager, next"
          :pager-count="5"
          :page-size="listQuery.page_size"
          @current-change="queryOrganAccount"
          :current-page.sync="currentPage"
          :total="totalcount"
        ></el-pagination>
        <p class="ml-2 mr-2" v-if="totalcount == 0">
          暂无数据， 请在左侧选择机构
        </p>
      </div>

      <div class="d-flex justify-content-center">
        <n-button
          class="mt-1"
          :btnText="'确认提交'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFun"
        ></n-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      defaultExpandedKeySingle: [],
      chooseAll: false,
      personList: [], //组织架构筛选的人员
      choosePersonIDsArr: this.personIDsArr, //选中的人员id数组
      choosePersonID: this.personID, //若是单选的时候选中的值
      treeDataPerson: [], //左边树状组织架构
      checkAll: false,
      listQuery: {
        account_search: "",
        account_status_not: 2, //人员状态 != ：1在职 2离职 3实习 4试用
        page: 0,
        page_size: 20,
      },
      currentPage: 1,
      totalcount: 0,
      selectPerson: [], // 选中的人的对象
      treeDataPersonAll: [], //所有人
    };
  },
  props: {
    personIDsArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    personID: {
      type: Number,
      default: 0,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
    // 是否是人员考勤配置页面
    isAttendance: {
      type: Boolean,
      default: false,
    },
    // 默认是筛选所有人，若传了section则表示筛选该工区下的人
    section: {
      type: String,
      default: "",
    },
    sections: {
      type: String,
      default: "",
    },
    organ_type: {
      type: Number,
      default: null,
    },
    isAllSections: {
      type: Boolean,
      default: false,
    },
    // 是否显示全体人员
    checkAllPerson: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    personIDsArr() {
      this.choosePersonIDsArr = this.personIDsArr;
    },
    personID() {
      this.choosePersonID = this.personID;
    },
    section() {
      this.getTreeData();
    },
    sections() {
      this.getTreeData();
    },
    choosePersonIDsArr: {
      handler: function (newArr, oldArr) {
        if (newArr.length > oldArr.length) {
          // 获取以前选中的id
          let oldSelIds = this.selectPerson.map((item) => {
            return item.account_id;
          });
          // 获取本次选中的人
          let newArrs = this.personList.filter(
            (item) => oldSelIds.indexOf(item.account_id) == -1
          );
          newArrs = newArrs.filter(
            (item) => newArr.indexOf(item.account_id) != -1
          );
          // 保存本次选中的人
          this.selectPerson.push(...newArrs);
        } else if (newArr.length < oldArr.length) {
          // 获取取消选中的人的ids
          let ids = oldArr.filter((item) => newArr.indexOf(item) == -1);
          // 过滤掉 取消选中的人的ids
          this.selectPerson = this.selectPerson.filter(
            (item) => ids.indexOf(item.account_id) == -1
          );
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getTreeData();
  },
  methods: {
    // 获取组织架构
    async getTreeData() {
      let params = {};
      if (this.section) {
        params = { organ_node: this.section, organ_type: this.organ_type };
        this.personList = [];
        this.$refs.treeNode.$refs.tree.setCurrentKey(this.section);
      } else if (this.sections) {
        params = { organ_ids: this.sections };
      } else {
        params = {
          organ_node: this.isAllSections ? "" : this.$organ_id_en_or_pro(this),
        };
      }
      let data = await api.queryOrganAccountCountTree(params);
      this.treeDataPerson = data.result;
      if (this.treeDataPerson.length == 1) {
        this.defaultExpandedKeySingle = [this.treeDataPerson[0].tag];
      }
      if (this.section) {
        this.chooseAll = false;
        this.checkAll = false;
        this.listQuery.organ_node = this.section;
        this.listQuery.account_search = "" && this.$refs.serch.searchObj == "";
        this.listQuery.account_search == "" &&
          (this.$refs.serch.searchObj = "");
        this.queryOrganAccount();
        // 如果是人员考勤配置需要将已选择选中状态改为未选中
        this.isAttendance && (this.$parent.isChoose = false);
      }
    },
    // 单选勾选人员
    choosePersonSingle(val) {},
    // 组织架构全选
    chooseAllfun(val) {
      if (this.chooseAll == 2) {
        this.choosePersonIDsArr = [];
      }
      this.checkAll = false;
      this.listQuery.organ_node = this.section
        ? this.section
        : this.$organ_id_en_or_pro(this);
      this.listQuery.organ_id_union = 0;
      this.treeDataPersonAll.length
        ? (this.personList = this.treeDataPersonAll)
        : this.queryOrganAccount();
      this.isAttendance && (this.$parent.isChoose = false);
      this.$refs.treeNode.$refs.tree.setCurrentKey(null);
    },
    // 组织架构选择
    leftClick(obj) {
      this.chooseAll = false;
      this.checkAll = false;
      this.currentPage = 1;
      this.listQuery.organ_node = obj.item.node.organ_id;
      this.listQuery.account_search = "" && this.$refs.serch.searchObj == "";
      this.listQuery.account_search == "" && (this.$refs.serch.searchObj = "");
      this.queryOrganAccount();
      // 如果是人员考勤配置需要将已选择选中状态改为未选中
      this.isAttendance && (this.$parent.isChoose = false);
    },
    // 查询人员
    async queryOrganAccount(obj = {}) {
      this.listQuery.page = this.currentPage - 1;
      let data = await api.queryOrganAccount({
        ...this.listQuery,
        ...{},
      });
      this.personList = data.result;
      this.totalcount = data.total_count;
      //   以下是解决人员是全选的时候，全选按钮没有自动变为选中状态
      this.checkAll = true;
      this.personList.forEach((item) => {
        if (!this.choosePersonIDsArr.includes(item.account_id)) {
          this.checkAll = false;
        }
      });
      this.listQuery.organ_node == 0 &&
        (this.treeDataPersonAll = JSON.parse(JSON.stringify(data.result)));
    },
    // 复选框选择人员
    choosePerson(ids) {
      this.chooseAll = false;
      let arr = this.personList.filter(
        (item) => ids.indexOf(item.account_id) == -1
      );
      this.checkAll = arr.length == 0;
    },
    // 人员全选
    handleCheckAllChange(val) {
      let arr = this.personList.map((item) => {
        return item.account_id;
      });
      if (val) {
        // 获取以前选中的id
        let oldSelIds = this.selectPerson.map((item) => {
          return item.account_id;
        });
        // 获取本次选中的人
        let newArr = this.personList.filter(
          (item) => oldSelIds.indexOf(item.account_id) == -1
        );
        // 保存本次选中的人
        this.selectPerson.push(...newArr);
      } else {
        // 过滤掉 取消选中的人
        this.selectPerson = this.selectPerson.filter(
          (item) => arr.indexOf(item.account_id) == -1
        );
      }
      this.choosePersonIDsArr = this.selectPerson.map(
        (item) => item.account_id
      );
    },
    // 筛选人员姓名
    searchFun(val) {
      this.checkAll = false;
      this.listQuery.account_search = val;
      this.listQuery.organ_node = this.isAllSections
        ? 0
        : this.$organ_id_en_or_pro(this);
      this.queryOrganAccount(this.listQuery);
    },
    // 设置当前选中的人
    setSelectPerson(arr) {
      this.selectPerson = JSON.parse(JSON.stringify(arr));
    },
    // 确认提交
    submitFun() {
      if (
        !this.choosePersonID &&
        !this.choosePersonIDsArr.length &&
        this.chooseAll != 2
      ) {
        this.$tip({
          isTip: true,
          message: "请选择人员",
        });
        return;
      }
      if (this.isSingle) {
        this.$emit("choosePersonFun", this.choosePersonID);
      }
      // 当多选时，将保存的人员传递给父组件
      if (!this.isSingle) {
        // 如果已经选择了全体人员，又选择单个人员，需要过滤掉全体人员
        if (this.selectPerson.length > 2) {
          this.selectPerson = this.selectPerson.filter(
            (item) => item.account_id
          );
        }
        this.$emit(
          "choosePersonNodes",
          this.chooseAll != 2
            ? JSON.parse(JSON.stringify(this.selectPerson))
            : [{ account_name: "全体人员" }]
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-box {
  z-index: 20;
  position: absolute !important;
  top: 12px;
  left: 26px;
}
.tree-dialog-box,
.tree-right-dialog-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 50%;
  background: $lightgrey;
  z-index: 10px;
  border-radius: 8px 0 0 8px;
  padding-top: 55px;
  display: flex;
  flex-direction: column;
}

.tree-right-dialog-box {
  right: 0;
  left: 50%;
  background: white;
  border-radius: 0 8px 8px 0;
}

.el-tree.el-tree-w-100 {
  width: 100%;
}
.choose-person-tree.el-tree.el-tree-w-100 {
  padding: 0 20px !important;
}
.el-form-item-radio {
  ::v-deep .el-radio {
    display: block !important;
  }
}
</style>
