<template>
  <div class="w-100 h-100 clear">
    <div class="content-info-box h-100 position-relative d-flex">
      <div v-if="!isShow"
           class="
          content-info-box-left
          bg-white
          rounded-1
          h-100position-relative
          d-flex
          flex-column
          top-select-box
        "
           style="display: block !important; border-radius: 10px !important">
        <div class="text-secondary mt-1 font-14 px-2">
          <img class="tip-icon vertical-middle mr-1"
               src="@/assets/images/icon_personal_tips.png" />温馨提示：单击选中项，右侧展示对应项目工程量清单信息
        </div>
        <div class="person-tree-box position-absolute pb-2 mt-1">
          <n-scroll>
            <n-tree class="pr-2 mt-2"
                    style="padding-bottom: 30px"
                    :highlight-current="false"
                    :treeData="treeData"
                    @leftClick="leftClick"
                    ref="treeNode"
                    :defaultProps="defaultProps"
                    :expandAll="true"></n-tree>
          </n-scroll>
        </div>
      </div>
      <div class="content-info-box-right rounded-1 h-100 bg-white p-1 flex-fill">
        <div class="top-select-box mt-1 bg-white">
          <div>
            <n-search ref="serch"
                      class="search-box"
                      :isInput="true"
                      v-model="listQuery.search_key"
                      :placeholder="queryApi.placeholder"
                      @searchFun="searchFun"></n-search>
            <div class="d-inline-block ml-2"
                 v-if="dataType==0">
              <label class="text-secondary">月份：</label>
              <el-date-picker @change="refresh"
                              class="el-date-editor-m"
                              :clearable="false"
                              :editable="false"
                              v-model="listQuery.search_time"
                              format="yyyy-MM"
                              value-format="yyyy-MM"
                              type="month"
                              placeholder="请选择"></el-date-picker>
            </div>
            <div class="d-inline-block ml-2"
                 v-if="dataType==1">
              <label class="text-secondary">日期：</label>
              <el-date-picker @change="refresh"
                              class="el-date-editor-m"
                              :clearable="false"
                              :editable="false"
                              v-model="listQuery.search_time"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              type="daterange"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              placeholder="请选择"></el-date-picker>
            </div>
          </div>
          <div>
            <n-button class="ml-2"
                      :btnText="'新增'"
                      @buttonClick="
              $router.linkTo(addApi.url,{
                 'organ_node':listQuery.organ_node
              })
            ">
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
              </template>
            </n-button>
            <n-button v-permission="exportApi.permission"
                      class="ml-2"
                      :btnText="'导出'"
                      @buttonClick="
                $utils.handleExport(
                  exportApi.url,
                  {
                    [iframe.key]: tableData[0][iframe.key],
                    tag: 1,
                  },
                  exportApi.name
                )
              ">
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_export mr-1"></i>
              </template>
            </n-button>
            <n-button class="ml-2"
                      :btnText="'打印'"
                      @buttonClick="printFuns()">
            </n-button>
            <n-button class="ml-2"
                      :btnText="'删除'">
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_list_trash mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
        <div class="p-inf-main text-center w-100"
             style="height: calc(100% - 90px)">
          <n-scroll>
            <iframe id="iframe"
                    frameborder="no"
                    border="0"
                    :src="iframe.src+'?id='+(tableData[0] ? tableData[0][iframe.key] : 1)"
                    class="w-100 h-100"></iframe>
          </n-scroll>
        </div>
        <el-pagination background
                       class="text-right bg-secondary"
                       layout="prev, pager, next"
                       :page-size="listQuery.page_size"
                       @current-change="getList"
                       :current-page.sync="currentPage"
                       :total="totalcount"></el-pagination>
      </div>

    </div>

  </div>
</template>
<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import table from "@/mixins/table";
export default {
  mixins: [confirm, table],
  props: {
    iframe: {
      default: () => {
        return {
          src: "",
          key: ""
        }
      }
    },
    addApi: {
      default: () => {
        return {
          url: ""
        }
      }
    },
    exportApi: {
      default: () => {
        return {
          permission: [],
          url: "",
          query: {},
          name: ""
        }
      }
    },
    queryApi: {
      default: () => {
        return {
          placeholder: "请输入"
        }
      }
    },
    dataType: {
      default: 0
    }
  },
  data () {
    return {
      postURL: "QueryProjectReportEngineeringMainList", //表格请求接口
      isShow: this.$route.meta.isProject,
      treeData: [], //人员组织架构数据
      project1: [], //自营项目
      project2: [], //合作项目
      defaultProps: {
        value: "tag", // ID字段名
        children: "leaves",
        label: "organ",
      },
      listQuery: {
        page: 0,
        page_size: 1,
        search_key: "",
        organ_node: null,
        tag: 1, //详情传1,web端列表页传1
        search_time: this.$utils.parseDate2Str(new Date(), "YYYY-MM")
      },

      getListBool: false,

    };
  },
  watch: {
    tableData: function (val, newVal) {
      let iframeWin = document.getElementById("iframe").contentWindow;
      iframeWin.postMessage(
        this.tableData[0] ? this.tableData[0].engineering_main_id : 0,
        "*"
      );
    },
  },

  async activated () {
    await this.getOrganProjectData();
    await this.getTreeData();

  },
  methods: {
    searchFun () {

    },

    printFuns () {
      var iframeWin = document.getElementById("iframe").contentWindow;
      iframeWin.postMessage("print", "*");
    },
    // 查询节点下的项目
    async getOrganProjectData () {
      let { result } = await api.QueryOrganProjectTree({
        organ_type_node: "30",
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.project1 = result.filter((item) => item.node.project_classify == 1);
      this.project2 = result.filter((item) => item.node.project_classify == 2);
    },
    // 获取组织架构
    async getTreeData () {
      let { result } = await api.queryOrganAccountCountTree({
        organ_node: this.$organ_id_en_or_pro(this),
        noOrganNodes: true,
      });
      console.log(result)
      let d = result[0];
      let arr = [];
      arr[0] = {
        tag: 1,
        leaves: [
          {
            tag: 0,
            leaves: this.project2,
            node: {
              organ: "合作项目",
              organ_id: 0,
            },
          },
          {
            tag: 2,
            leaves: this.project1,
            node: {
              organ: "自营项目",
              organ_id: 2,
            },
          },
        ],
        node: {
          organ: d.node.organ,
          organ_id: d.node.organ_id,
        },
      };
      this.treeData = arr;
      if (this.project2[0]) {
      }
      if (!this.isShow) {
        this.$nextTick(() => {
          this.$refs.treeNode.defaultExpandedKeys = [
            this.project2[0] ? this.project2[0].tag : this.project1[0].tag,
          ];
          this.$refs.treeNode.$refs.tree.setCurrentKey(
            this.project2[0] ? this.project2[0].tag : this.project1[0].tag
          );
        });
      }

      if (this.contract_id_un) {
        this.$nextTick(() => {
          this.$refs.treeNode.defaultExpandedKeys = [this.organ_id_union];
          this.$refs.treeNode.$refs.tree.setCurrentKey(this.organ_id_union);
        });

        this.listQuery.contract_id_un = this.contract_id_un;
        this.listQuery.organ_node = this.organ_id_union;
        // await this.getList();
      } else {
        this.listQuery.organ_node = this.project2[0]
          ? this.project2[0].tag
          : this.project1[0].tag;
        //await this.getList();
      }


    },
    //单击左侧组织架构
    async leftClick (obj) {
      if (obj.item.node.organ_type == 30) {
        this.$refs.serch.searchObj = "";
        this.listQuery.search_key = "";
        this.listQuery.organ_node = obj.item.tag;

        this.refreshData();
      } else {
        this.tableData = [];
      }
    },
    refresh () {

      this.refreshData();
    },
  }

};
</script>
<style scoped lang="scss">
.top-select-box {
  border-radius: 10px 10px 0 0 !important;
  padding: 0;
}

.person-tree-box {
  top: 30px;
  right: 0;
  left: 10px;
  bottom: 0;
}
.content-info-box {
  .content-info-box-left {
    width: 300px;
  }

  .content-info-box-right {
    margin-left: 10px;
  }
}
</style>
