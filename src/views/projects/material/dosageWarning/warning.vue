<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'预警比例设置'" />
    </div>
    <div class="rounded-1 bg-white flex-fill">
      <el-form ref="ruleform" class="el-form-box px-2 pt-2" :model="ruleform">
        <el-form-item class="form-item-long-small must" label="工区：">
          <n-treeselect
            ref="treeselect"
            @getSelectNode="getSelectValue"
            :treeData="treeData"
            :Isvalue="true"
            :value="ruleform.dosage_warning_organ_id_union"
          />
        </el-form-item>
        <el-form-item class="form-item-long-small must" label="预警等级：">
          <el-select
            v-model="ruleform.dosage_warning_level"
            placeholder="请选择"
          >
            <el-option label="Ⅰ级" value="Ⅰ级"></el-option>
            <el-option label="Ⅱ级" value="Ⅱ级"></el-option>
            <el-option label="Ⅲ级" value="Ⅲ级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item-long-small must" label="预警比例：">
          <num-input v-model="ruleform.dosage_warning_percent"> </num-input>
        </el-form-item>
        <el-form-item class="form-item-long-small">
          <n-button
            btnText="确认提交"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </el-form-item>
      </el-form>
      <el-table
        class="cusp-table"
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 140px)"
      >
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{ (currentPage - 1) * 10 + (scope.$index + 1) }}</label>
          </template>
        </el-table-column>
        <el-table-column label="工区" prop="organ"></el-table-column>
        <el-table-column label="预警等级" prop="dosage_warning_level">
          <template slot-scope="scope">
            <span
              :class="
                'levelcolor' +
                waringlevel.indexOf(scope.row.dosage_warning_level)
              "
            >
              {{ scope.row.dosage_warning_level }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="预警比例">
          <template slot-scope="scope">
            {{ scope.row.dosage_warning_percent + "%" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              v-permission="['MaterialManagementDosageWarning_TJSTC-delete']"
              class="ml-2 iconfont btn-btn_list_trash trash-icon-btn"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'dosage_warning_id',
                  'delMaterialManagementDosageWarning'
                )
              "
            ></span>
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
import confirm from "@/mixins/confirm";
import table from "@/mixins/table";
export default {
  mixins: [confirm, table],
  data() {
    let checknumber = (rule, value, callback) => {
      if (value >= 0 && value <= 100) {
        return;
      } else {
        return callback(new Error(rule.message));
      }
    };
    return {
      waringlevel: ["Ⅰ级", "Ⅱ级", "Ⅲ级"],
      ruleform: {
        dosage_warning_organ_id_union: null,
        dosage_warning_level: null,
        dosage_warning_percent: 0,
      },
      postURL: "queryMaterialManagementDosageWarning",
      listQuery: {
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        page_size: 20,
      },
      deleData: {},
      rules: {
        dosage_warning_organ_id_union: [
          { required: true, message: "请选择工区" },
        ],
        dosage_warning_level: [{ required: true, message: "请选择预警等级" }],
        dosage_warning_percent: [
          { required: true, message: "请输入预警比例" },
          {
            message: "预警比例为0-100%，请输入重新预警比例",
            validator: checknumber,
          },
        ],
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.subject;
    },
  },
  async created() {},

  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.ruleform.dosage_warning_organ_id_union = node.tag;
    },
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let res = await api.queryMaterialManagementDosageWarning({
        ...this.ruleform,
      });
      if (res.result.length > 0) {
        this.$tip({
          isTip: true,
          message: `当前工区下，已经设置了${this.ruleform.dosage_warning_level}的预警比例`,
        });
        return;
      }
      await api.uploadMaterialManagementDosageWarning({
        ...this.ruleform,
      });
      this.listQuery.page = 0;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item-long-small {
  width: 24%;
}
.levelcolor0 {
  color: #ed3f76;
}
.levelcolor1 {
  color: #f89b2f;
}
.levelcolor2 {
  color: #ffd347;
}
</style>
