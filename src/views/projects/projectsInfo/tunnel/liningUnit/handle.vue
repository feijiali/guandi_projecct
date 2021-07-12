<!--
 * @Autor: 邓易
 * @Date: 2020-11-17 10:21:42
 * @LastEditors: 邓易
 * @LastEditTime: 2020-12-10 09:42:41
-->
<template>
  <div class="w-100 h-100 table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'导入单位工程量'"
      :diaWidth="'40%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll :native="false" class="w-100">
          <div class="mb-2">
            <p>单位工程量模板</p>
            <a
              :href="GLOBAL.baseurl + '/MOULD/TunnelEngineerTable_import.xlsx'"
              download="单位工程量模板.xlsx"
            >
              <n-button
                class="mt-2"
                :btnText="'下载模板'"
                :width="'150px'"
                :colorBtn="'blue'"
              ></n-button>
            </a>
          </div>
          <div class="justify-content-between d-flex align-items-center">
            <div class="w-100">
              <span class="grey2">单位工程：</span>
              <el-select
                v-model="ruleform.engineer_table_unit_project_id_un"
                placeholder="选择单位工程"
              >
                <el-option
                  :label="item.unit_proj_name"
                  :value="item.unit_proj_id"
                  v-for="item in unitData"
                  :key="item.unit_proj_id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-upload
            class="mt-3 mb-2"
            :on-exceed="(f1, f2) => handleExceed(f1, f2, 1)"
            :before-upload="(f1) => beforeAvatarUpload(f1, 'file')"
            ref="uploadFile"
            :file-list="fileList"
            action="xxxx"
            :auto-upload="false"
            :on-change="(f, fs) => fileChange(f, fs, 'fileList', 'file')"
            :on-remove="(f, fs) => fileRemove(f, fs, 'fileList')"
            accept=".xls, .xlsx"
          >
            <nStatusButton
              v-show="fileList.length < 1"
              :changeColor="'#3377FF'"
              :btnText="'导入单位工程量'"
            />
          </el-upload>
          <div class="d-flex justify-content-end">
            <n-button
              class="mt-1"
              :btnText="'确认提交'"
              :width="'150px'"
              :colorBtn="'blue'"
              @buttonClick="submitFun"
            ></n-button>
          </div>
        </n-scroll>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop title="单位工程量" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <div class="d-flex justify-content-end p-2">
        <n-button :btnText="'上传'" @buttonClick="importDialog">
          <template v-slot:button-slot>
            <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
          </template>
        </n-button>
      </div>
      <el-table :data="tableData" style="width: 100%" height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>
              {{ scope.$index + 1 }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit_proj_name"
          label="单位工程"
        ></el-table-column>
        <el-table-column
          prop="engineer_table_name"
          label="表格"
        ></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="{ row }">
            <span
              class="text-hover-primary ml-2 cursor-p"
              @click="handleDelete(row)"
              >删除</span
            >
            <span
              class="text-hover-primary ml-2 cursor-p"
              @click="importDialog(row)"
              >重新上传</span
            >
            <span
              class="text-hover-primary ml-2 cursor-p"
              @click="
                $utils.downloadfile(
                  row.file_list[0].url,
                  row.engineer_table_name
                )
              "
              >下载</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import upload from "@/mixins/upload";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";

export default {
  mixins: [upload, table, confirm],
  data() {
    return {
      postURL: "QueryTunnelEngineerTableList", //表格请求接口
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
      },
      unitData: [], //单位工程
      tableData: [],
      ruleform: {
        engineer_table_unit_project_id_un: null,
      },
      rules: {
        engineer_table_unit_project_id_un: [
          {
            required: true,
            message: `请选择单位工程`,
          },
        ],
      },
    };
  },
  created() {
    this.queryTunnelUnitProj();
  },
  methods: {
    handleDelete(row) {
      this.confirm("", "", "删除会清除产值和材料计算的结果").then(() => {
        let url = "DelTunnelEngineerTable";
        let params = { engineer_table_id: row.engineer_table_id };
        api[url](params).then(() => {
          this.getList();
        });
      });
    },
    importDialog(row) {
      this.ruleform.engineer_table_unit_project_id_un = row
        ? row.engineer_table_unit_project_id_un
        : null;
      this.ruleform.engineer_table_id = row ? row.engineer_table_id : null;
      this.$refs.dialog.show();
    },
    //删除事件
    async queryTunnelUnitProj() {
      let { result } = await api.queryTunnelUnitProj({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = result;
    },
    // 提交
    async submitFun() {
      if (this.fileList.length == 0) {
        this.$tip({
          isTip: true,
          message: "请选择导入文件",
        });
        return;
      }
      this.ruleform.uploadFile = this.fileList[0].raw;
      let url = this.ruleform.engineer_table_id
        ? "ReImportTunnelEngineerTable"
        : "ImportTunnelEngineerTable";
      this.uploadFile([], this.ruleform, url).then((res) => {
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.getList();
            this.$refs.dialog.cancel();
          },
        });
      });
    },
  },
};
</script>
<style scoped lang="scss"></style>
