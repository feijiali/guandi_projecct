<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="`导入${importInfo.name}`"
      :diaWidth="'32%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll>
          <div class="mb-2">
            <span>{{ importInfo.name }}模板</span>
            <a
              :href="GLOBAL.baseurl + '/MOULD/' + importInfo.path + '.xlsx'"
              :download="`${importInfo.name}模板.xlsx`"
            >
              <n-button
                class="ml-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <div>
            <span class="grey2">单位工程：</span>
            <el-select
              v-model="importObj.lining_unit_proj_id_un"
              placeholder="请选择"
            >
              <el-option
                :label="item.unit_proj_name"
                :value="item.unit_proj_id"
                v-for="item in unitData"
                :key="item.unit_proj_id"
              ></el-option>
            </el-select>
          </div>
          <el-upload
            class="mt-3 mb-2 w-50"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :limit="1"
            :multiple="false"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx, .doc, .docx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="`导入${importInfo.name}`"
            />
          </el-upload>
          <div class="d-flex justify-content-end mb-08">
            <n-button
              class="my-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="container-div-s nested-table">
      <div class="top-select-box">
        <div class="d-flex">
          <ul class="sub-nav-ul nav-box">
            <li
              v-for="item of navs"
              @click="handelSwitchChange(item)"
              :key="item.type"
              class="sub-nav-li-item"
              :class="{ active: item.type == listQuery.lining_type }"
            >
              {{ item.name }}
            </li>
          </ul>
          <div class="d-inline-block ml-2">
            <span class="grey2">单位工程：</span>
            <el-select
              v-model="listQuery.lining_unit_proj_id_un"
              @change="getList"
              placeholder="请选择"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option
                :label="item.unit_proj_name"
                :value="item.unit_proj_id"
                v-for="item in unitData"
                :key="item.unit_proj_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="['TunnelUnitProj-update']"
              @buttonClick="exportFun"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
          </div>
          <div class="d-inline-block ml-2">
            <n-button
              :btnText="'导出'"
              v-permission="['TunnelUnitProj-export']"
              @buttonClick="exportExel"
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
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
      postURL: "QueryMaterialExcessLining", //表格请求接口
      importInfo: {
        name: "二衬钢筋表",
        type: 11,
        path: "MaterialExcessSecondLiner_import",
      },
      importObj: {
        lining_unit_proj_id_un: null,
      },
      navs: [
        {
          name: "二衬钢筋表",
          type: 11,
          path: "MaterialExcessSecondLiner_import",
        },
        {
          name: "仰拱钢筋表",
          type: 12,
          path: "MaterialExcessInverterArch_import",
        },
        {
          name: "中央排水沟钢筋表",
          type: 15,
          path: "MaterialExcessCenterDrain_import",
        },
        {
          name: "电缆沟钢筋表",
          type: 16,
          path: "MaterialExcessCableTrench_import",
        },
        { name: "钢架材料表", type: 50, path: "MaterialExcessSteel_import" },
      ],
      listQuery: {
        page: -1,
        lining_type: 11,
        lining_unit_proj_id_un: null,
      },
      currentPage: 0,
      unitData: [], //单位工程
      cols: [],
    };
  },
  watch: {
    tableData(val) {
      this.$store.commit("app/set_out_bound_info", val);
    },
  },
  created() {
    this.queryTunnelUnitProj();
  },
  methods: {
    //   点击导入
    exportFun() {
      this.fileList = [];
      this.importObj.lining_unit_proj_id_un = null;
      this.$refs.dialog.show();
    },
    // 提交
    async submitFun() {
      if (!this.importObj.lining_unit_proj_id_un) {
        this.$tip({
          isTip: true,
          message: "请选择单位工程",
        });
        return;
      }
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择导入文件",
        });
        return;
      }
      this.importObj.uploadFile = this.fileList[0].raw;
      this.importObj.lining_type = this.importInfo.type;
      await this.uploadFile([], this.importObj, "ImportMaterialExcessLining");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          // 更新列表
          this.getList();
          this.$refs.dialog.cancel();
        },
      });
    },
    async exportExel() {
      if (!this.listQuery.lining_unit_proj_id_un) {
        this.$tip({
          isTip: true,
          message: "请选择单位工程",
        });
        return;
      }
      let { result } = await api.QueryMaterialExcessLiningExcel(this.listQuery);
      if (result.length == 0) {
        this.$tip({
          isTip: true,
          message: "该单位工程没有表格信息",
        });
        return;
      }
      let url = result[0].file_list[0].url;
      let alink = document.createElement("a");
      alink.href = url;
      alink.target = "_blank";
      alink.download = "衬砌材料表.xlsx"; //图片名
      alink.click();
    },
    // 切换消息类型
    async handelSwitchChange(item) {
      this.listQuery.lining_type = item.type;
      this.importInfo = item;
      await this.getList();
      if (item.type == 50) {
        this.linkTo("project_projectsInfo_tunnel_liningMaterial_list2");
      } else {
        this.linkTo("project_projectsInfo_tunnel_liningMaterial_list1", {
          type: item.type,
        });
      }
    },
    //删除事件
    async queryTunnelUnitProj() {
      let { result } = await api.queryTunnelUnitProj({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = result;
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped></style>
