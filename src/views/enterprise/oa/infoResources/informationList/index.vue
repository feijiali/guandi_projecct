<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="resetType == 1 ? '文件夹重命名' : '文件重命名'"
      :diaWidth="'30%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll>
          <div class="px-1">
            <el-form
              ref="ruleform"
              class="el-form-box"
              :model="ruleform"
              label-width="108px"
            >
              <el-form-item class="form-item-long must" label="新名称：">
                <el-input
                  placeholder="请输入"
                  v-model="ruleform.information_resources_name"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="d-flex justify-content-center">
              <n-button
                class="mt-5 ml-3"
                :btnText="'确认提交'"
                :width="'150px'"
                :colorBtn="'blue'"
                @buttonClick="submitFun"
              ></n-button>
            </div>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog2"
      :diaTit="'上传文件'"
      :diaWidth="'30%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="justify-content-between d-flex align-items-center">
            <div class="w-100">
              <n-button
                class="mb-1 mt-1"
                :btnText="'上传文件'"
                @buttonClick="uploadFile"
              >
                <template v-slot:button-slot>
                  <i class="iconfont btn-btn_list_upload mr-1"></i>
                </template>
              </n-button>
              <n-new-file-upload
                ref="fileUpload"
                :length="1"
                file-module="Resources"
              />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFile"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div" style="margin: 0">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <n-search
              ref="serch"
              :isInput="true"
              :placeholder="'请输入名称搜索'"
              @searchFun="searchFun"
            ></n-search>
          </div>
        </div>
        <div>
          <el-dropdown trigger="click" :hide-on-click="false">
            <span class="el-dropdown-link">
              <el-button size="small"
                >其它操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown @command="handleCommand" placement="right-start">
                  <span class="el-dropdown-link">
                    {{ "所选文件发送至"
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="enterprise_oa_email_write">{{
                      "电子邮箱"
                    }}</el-dropdown-item>
                    <el-dropdown-item command="enterprise_oa_newAnnouncement">{{
                      "通知公告"
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>

              <el-dropdown-item
                v-permission="['InformationResources-archived']"
              >
                <el-dropdown placement="right-start">
                  <span class="el-dropdown-link">
                    {{ "转存至"
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <n-tree
                        :organize="true"
                        :highlight-current="false"
                        :treeData="treeData"
                        :defaultProps="defaultProps"
                        ref="treeNode"
                        @leftClick="leftClick"
                        :defaultExpandedKeys="defaultExpandedKeySingle"
                        :defaultNodeKey="defaultNodeKey"
                      ></n-tree>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <n-button
            class="ml-2"
            :btnText="'上传文件'"
            colorBtn="blue"
            v-permission="['InformationResources-upload']"
            @buttonClick="handleAdd"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :btnText="'批量删除'"
            colorBtn="orange"
            @buttonClick="
              deleteFun(
                true,
                '',
                'information_resources_id',
                'updateInformationResourcesState',
                refresh,
                '',
                getPermission()
              )
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table"
        ref="table"
        :data="tableArr"
        height="calc(100% - 80px)"
        @row-click="rowLinkTo"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column
          type="selection"
          width="60"
          :selectable="selectInit"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="information_resources_name"
          width="380"
        >
          <template slot-scope="scope">
            <i
              v-show="scope.row.information_resources_type == 1"
              class="orange iconfont btn-icon_leftbar_folder mr-1"
            ></i>
            <span>{{ scope.row.information_resources_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <div v-show="scope.row.information_resources_type == 2">
              <span
                @click.stop="preview(scope.row.file_list[0].url)"
                class="main border-right pr-1"
                >查看</span
              >
              <span
                @click="
                  downloadFile(
                    {
                      url: scope.row.file_list[0].url,
                      name: scope.row.information_resources_name,
                    },
                    scope.row
                  )
                "
                class="main pl-1"
                >下载</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="大小" sortable>
          <template slot-scope="scope">
            <span>{{
              scope.row.file_list && scope.row.file_list.length
                ? scope.row.file_list[0].file_size + "KB"
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下载次数" prop="download_count" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.information_resources_type == 2">{{
              scope.row.download_count
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后更新"
          prop="information_resources_create_time"
          sortable
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.information_resources_create_time
                ? scope.row.information_resources_create_time.slice(0, 10)
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="material_unit">
          <template slot-scope="scope">
            <div v-show="scope.row.information_resources_name != '..'">
              <div
                class="d-inline"
                v-if="scope.row.information_resources_type == 1"
              >
                <span
                  v-show="
                    scope.row.controlPermission || scope.row.modifyPermission
                  "
                  @click.stop="resetName(scope.row)"
                  class="main pr-1 border-right"
                  >重命名</span
                >
                <span
                  v-show="
                    scope.row.controlPermission || scope.row.modifyPermission
                  "
                  @click.stop="
                    attributeBtn(
                      scope.row,
                      scope.row.controlPermission || scope.row.modifyPermission
                    )
                  "
                  class="border-right pr-1 pl-1 main"
                  >属性</span
                >
              </div>
              <div class="d-inline" v-else>
                <span
                  v-show="fileAccess"
                  @click.stop="resetName(scope.row)"
                  class="main pr-1 border-right"
                  >重命名</span
                >
                <span
                  v-show="fileAccess"
                  @click.stop="
                    attributeBtn(
                      scope.row,
                      scope.row.controlPermission || scope.row.modifyPermission
                    )
                  "
                  class="border-right pr-1 pl-1 main"
                  >属性</span
                >
              </div>
              <span
                v-show="scope.row.information_resources_type == 2"
                @click.stop="logBtn(scope.row)"
                class="main pl-1"
                >日志</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      class="text-right bg-secondary"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      tags: [], // 树形结构默认节点
      postURL: "queryInformationResourcesList", // 表格请求接口
      listQuery: {
        // 列表查询参数
        page: 0,
        page_size: 20,
        information_resources_pid: -1,
        size_order: 0,
        download_order: 0,
        create_order: 0,
      },
      resetType: 1, // 1：文件夹命名  2：文件命名,
      ruleform: {},
      tableArr: [], // 列表数据
      backfloder: {
        // 返回文件夹
        information_resources_type: 1,
        information_resources_name: "..",
        information_resources_pid: -1,
      },
      deleData: {}, // 删除项的id
      infoData: {}, // 列表项
      fileRuleform: {}, // 文件上传有关当前层级的权限信息
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "information_resources_name",
      },
      defaultExpandedKeySingle: [], // 默认展开的单选树节点的 key 的数组
      defaultNodeKey: 0, // 当前选中的节点
      treeData: [], // 人员组织架构数据
      controlPermission: true, // 是否有控制权限
      accessPermission: true, // 是否有访问权限
      modifyPermission: true, // 是否有修改权限
      id: null,
      fileAccess: true, // 文件访问权限
      fileDel: true, // 文件删除权限
    };
  },

  mounted() {
    // 获取材料树
    this.queryInformationResourcesTree();
    this.$bus.$on("refreshList", this.refreshListFun);
    this.$bus.$on("changeTag", this.queryInformationResourcesTree);
  },
  activated() {
    this.tableSelectList = [];
  },
  beforeDestroy() {
    this.$bus.$off("refreshList");
    this.$bus.$off("changeTag");
  },
  watch: {
    tableData: function (val, newVal) {
      const userId = this.$store.state.user.account_id;
      if (this.listQuery.information_resources_pid != -1) {
        // 直接改变监听数据会产生无限循环bug，所以这里重新声明新的列表数据数组进行赋值
        this.tableArr = this.$utils.cloneObj(val);
        this.tableArr.unshift(this.backfloder);
        this.tableArr.forEach((item, index) => {
          if (index != 0) {
            if (item.information_resources_type == 2) {
              item.controlPermission = this.fileDel;
            } else {
              item.controlPermission =
                item.information_resources_full_contro == "*"
                  ? true
                  : item.information_resources_full_contro
                      .split(",")
                      .findIndex((item) => item == userId) != -1;
              item.accessPermission =
                item.information_resources_access_contro == "*"
                  ? true
                  : item.information_resources_access_contro
                      .split(",")
                      .findIndex((item) => item == userId) != -1;
              item.modifyPermission =
                item.information_resources_update_contro == "*"
                  ? true
                  : item.information_resources_update_contro
                      .split(",")
                      .findIndex((item) => item == userId) != -1;
            }
          }
        });
      } else {
        this.tableArr = val;
        this.tableArr.forEach((item) => {
          if (item.information_resources_type == 2) {
            item.controlPermission = item.information_resources_full_contro =
              this.fileDel;
          } else {
            item.controlPermission =
              item.information_resources_full_contro == "*"
                ? true
                : item.information_resources_full_contro
                    .split(",")
                    .findIndex((item) => item == userId) != -1;
            item.accessPermission =
              item.information_resources_access_contro == "*"
                ? true
                : item.information_resources_access_contro
                    .split(",")
                    .findIndex((item) => item == userId) != -1;
            item.modifyPermission =
              item.information_resources_update_contro == "*"
                ? true
                : item.information_resources_update_contro
                    .split(",")
                    .findIndex((item) => item == userId) != -1;
          }
        });
      }
    },
  },
  methods: {
    refreshListFun(val) {
      this.$router.linkTo("enterprise_oa_infoResources_informationList");
      if (!val) {
        this.id = null;
        this.listQuery.information_resources_pid = -1;
        this.getList();
        return;
      }
      this.fileDel = val.fileDel;
      this.id = val.tag;
      this.fileAccess = val.fileAccess;
      this.listQuery.information_resources_pid = val.tag;
      this.getList();
      this.queryInformationResources(val.tag);
    },
    // 获取信息资源树
    async queryInformationResourcesTree() {
      const data = await api.queryInformationResourcesTree({
        material_type: 10,
      });
      this.treeData = data.result;
    },
    // 查询详情
    async queryInformationResources(id) {
      const data = await api.queryInformationResources({
        information_resources_id: id,
      });
      if (id == -1) {
        return;
      }
      this.fileRuleform.information_resources_full_contro =
        data.result[0].information_resources_full_contro;
      this.fileRuleform.information_resources_access_contro =
        data.result[0].information_resources_access_contro;
      this.fileRuleform.information_resources_update_contro =
        data.result[0].information_resources_update_contro;
      this.fileRuleform.information_resources_parent_node =
        data.result[0].information_resources_parent_node;
      this.fileRuleform.information_resources_parent_node_name =
        data.result[0].information_resources_parent_node_name;
      this.fileRuleform.information_resources_state =
        data.result[0].information_resources_state;
      this.backfloder.information_resources_pid =
        data.result[0].information_resources_pid;
    },
    sortChange(val) {
      this.$refs.table.clearSort();
      switch (val.column.label) {
        case "大小":
          this.listQuery.size_order = this.listQuery.size_order == 0 ? 1 : 0;
          this.listQuery.download_order = 0;
          this.listQuery.create_order = 0;
          this.getList();
          break;
        case "下载次数":
          this.listQuery.download_order =
            this.listQuery.download_order == 0 ? 1 : 0;
          this.listQuery.size_order = 0;
          this.listQuery.create_order = 0;
          this.getList();
          break;
        case "最后更新":
          this.listQuery.create_order =
            this.listQuery.create_order == 0 ? 1 : 0;
          this.listQuery.download_order = 0;
          this.listQuery.size_order = 0;
          this.getList();
      }
    },
    // 转存
    async leftClick(obj) {
      if (this.fileAccess) {
        const arr = this.tableSelectList.flat();
        if (!arr.length) {
          this.$tip({
            isTip: true,
            message: "请选择转存的文件或文件夹",
          });
          return;
        }
        const { item } = obj;
        this.confirm("", "", "", "确认转存？")
          .then(async () => {
            const subData = {};
            subData.resources_list = this.$utils.cloneObj(arr);
            subData.resources_list.forEach((items) => {
              items.information_resources_pid = item.tag;
            });
            subData.operation_type = 3;
            await api.updateInformationResources(subData);
            this.$bus.$emit("changeTag", "");
            this.getList();
          })
          .catch(() => {});
      } else {
        this.$tip({
          isTip: true,
          message: "您没有权限",
        });
      }
    },
    // 发送文件
    handleCommand(url) {
      const fileList = [];
      const arr = this.tableSelectList.flat();
      const fileLists = arr.filter(
        (item) => item.information_resources_type == 2
      );
      if (!fileLists.length) {
        this.$tip({
          isTip: true,
          message: "请选择发送的文件",
        });
        return;
      }
      this.confirm("", "", "", "确认发送文件？").then(async () => {
        fileLists.forEach((item) => {
          return fileList.push(item.file_list[0]);
        });
        this.$router.linkTo(url, { filelist: fileList });
      });
    },
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    // 上传文件
    handleAdd() {
      if (this.listQuery.information_resources_pid == -1) {
        this.$tip({
          isTip: true,
          message: "不能在根目录下上传",
        });
        return;
      }
      // 请先选择文件夹并且具备权限
      if (!this.id || !this.fileAccess) {
        this.$tip({
          isTip: true,
          message: "您无权限上传",
        });
        return;
      }
      this.queryInformationResources(this.listQuery.information_resources_pid);
      this.$refs.dialog2.show();
    },
    // 删除权限
    getPermission() {
      let selecList = [];
      const arr = this.tableSelectList.flat();
      const h = arr.length;
      selecList = arr.filter((item) => item.controlPermission);
      const w = selecList.length;
      if (h > w) {
        this.$tip({
          isTip: true,
          message: "您无权限删除",
        });
        return true;
      } else {
        return false;
      }
    },
    // 删除后刷新目录
    refresh() {
      this.$bus.$emit("changeTag", "");
      this.queryInformationResourcesTree();
    },
    // 重命名
    resetName(row) {
      this.ruleform = {};
      this.infoData = row;
      this.resetType = row.information_resources_type;
      this.$refs.dialog.show();
    },
    // 点击日志
    logBtn(row) {
      this.$router.linkTo("enterprise_oa_infoResources_log", {
        id: row.information_resources_id,
        logName: row.information_resources_name,
      });
    },
    // 点击属性
    attributeBtn(row, bool) {
      if (row.information_resources_type == 1) {
        this.$router.linkTo("enterprise_oa_infoResources_newHolder", {
          id: row.information_resources_id,
        });
      } else {
        this.$router.linkTo("enterprise_oa_infoResources_flieAttribute", {
          id: row.information_resources_id,
          isBtn: bool,
        });
      }
    },
    // 上传文件
    async submitFile() {
      const subData = {};
      const filejson = this.$refs.fileUpload.getFileObj();
      const fileData = filejson.file.split(",");
      subData.resources_list = JSON.parse(filejson.file_json).map(
        (item, index) => {
          return {
            information_resources_pid: this.id ? this.id : -1,
            information_resources_type: 2,
            information_resources_file: fileData[index],
            information_resources_file_json: JSON.stringify([item]),
            information_resources_name: item.org_name,
            information_resources_file_size: item.file_size,
            ...this.fileRuleform,
          };
        }
      );
      await api.uploadInformationResources(subData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getList();
          this.$bus.$emit("changeTag", "");
          this.$refs.dialog2.cancel();
        },
      });
    },
    // 重命名提交
    async submitFun() {
      if (!this.ruleform.information_resources_name) {
        this.$tip({
          isTip: true,
          message: "请输入新名称",
        });
        return;
      }
      const subData = {
        resources_list: [],
      };
      subData.resources_list[0] = this.infoData;
      subData.resources_list[0].information_resources_type = this.resetType;
      subData.operation_type = 1;
      subData.resources_list[0].information_resources_name =
        this.ruleform.information_resources_name;
      this.resetType == 2 &&
        (subData.resources_list[0].information_resources_full_contro = "");

      await api.updateInformationResources(subData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.getList();
          this.$bus.$emit("changeTag", "");
          this.$refs.dialog.cancel();
        },
      });
    },
    // 查看
    preview(url) {
      const date = new Date();
      if (/\.(word|docx|xls|doc|xlsx)$/.test(url)) {
        window.open(
          "https://view.officeapps.live.com/op/view.aspx?src=" +
            url +
            "?" +
            date.getTime(),
          "_blank"
        );
      } else if (/\.(pdf|txt|png|jpg|gif)$/.test(url)) {
        window.open(url + "?" + date.getTime());
      } else {
        this.$tip({
          isTip: true,
          message: "该文件不支持预览",
        });
      }
    },
    // 下载文件、
    async downloadFile(file, row) {
      const subData = {
        resources_list: [row],
        operation_type: 2,
      };
      subData.resources_list[0].information_resources_full_contro = "";
      await api.updateInformationResources(subData);
      this.getList();
      const alink = document.createElement("a");
      alink.href = file.url;
      alink.target = "_blank";
      const urlName = file.url.split("/")[file.url.split("/").length - 1]; // 文件名
      alink.download = file.name
        ? file.name.split(".")[0] + "-" + urlName
        : file.url; // 图片名
      alink.click();
    },
    // 搜索关键词
    searchFun(val) {
      this.listQuery.information_resources_name = val;
      this.refreshData();
    },
    // controlPermission: true, //是否有控制权限
    // accessPermission: true, //是否有访问权限
    // modifyPermission: true, //是否有修改权限
    // 点击列表
    async rowLinkTo(row) {
      if (row.information_resources_name == "..") {
        this.tags = [];
        this.getTagNode(this.treeData, row.information_resources_pid);
        this.$bus.$emit("Tag", this.tags.length ? this.tags[0] : "{}");
        this.listQuery.information_resources_pid =
          row.information_resources_pid;
        if (row.information_resources_pid) {
          this.fileAccess = false;
        }
        await this.getList();
        this.queryInformationResources(row.information_resources_pid);
      } else if (
        row.information_resources_type == 1 &&
        row.information_resources_id
      ) {
        if (
          !row.controlPermission &&
          !row.accessPermission &&
          !row.modifyPermission
        ) {
          this.$tip({
            isTip: true,
            message: "您没有权限查看",
          });
          return;
        }
        this.fileAccess = !!(row.controlPermission || row.modifyPermission);
        this.fileDel = !!row.controlPermission;
        this.listQuery.information_resources_pid = row.information_resources_id;
        this.id = this.listQuery.information_resources_pid;
        this.backfloder.information_resources_pid =
          row.information_resources_pid;
        await this.getList();
        this.tags = [];
        await this.queryInformationResourcesTree();
        await this.getTagNode(this.treeData, row.information_resources_id);
        this.$bus.$emit("Tag", this.tags[0]);
      }
    },
    // 获取节点
    getTagNode(arr, tag) {
      for (const val of arr) {
        if (val.tag === tag) {
          this.tags.push(val);
        }
        if (val.leaves.length) {
          this.getTagNode(val.leaves, tag);
        }
      }
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    // 返回文件夹禁止选中
    selectInit(row) {
      if (!row.information_resources_id) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
