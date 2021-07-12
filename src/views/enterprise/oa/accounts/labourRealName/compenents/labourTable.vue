<template>
  <div class="h-100">
    <Detail ref="detailDialog" :infoData="infoData" />
    <el-table
      :data="tableDatas"
      style="width: 100%"
      height="100%"
      @row-click="rowclick"
      class="cursor-p-table"
      ><template slot="empty">
        <span>真是不巧，暂时没有数据呢~</span>
      </template>
      <el-table-column prop="index" label="序号" width="100">
        <template slot-scope="scope">
          <label>{{ (currentPages - 1) * 20 + (scope.$index + 1) }}</label>
        </template>
      </el-table-column>
      <el-table-column label="工程项目" prop="organ"></el-table-column>
      <el-table-column label="工区" prop="organ_area"></el-table-column>
      <el-table-column label="姓名" prop="account_name"></el-table-column>
      <el-table-column label="联系电话" prop="account"></el-table-column>
      <el-table-column
        label="身份证"
        prop="account_id_card"
        width="180"
      ></el-table-column>
      <el-table-column label="性别" prop="account_sex"></el-table-column>
      <el-table-column label="工种" prop="account_job"></el-table-column>
      <el-table-column label="劳务公司" prop="worker_labour"></el-table-column>
      <el-table-column label="班组名称" prop="team"></el-table-column>
      <el-table-column label="是否公司发放工资" prop="worker_public"
        ><template slot-scope="scope">
          {{ ["是", "否"][scope.row.worker_public - 1] }}
        </template></el-table-column
      >
      <el-table-column label="人员状态" prop="account_status">
        <template slot-scope="scope">
          {{ ["在场", "离场"][scope.row.account_status - 1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="进场时间"
        width="120"
        prop="worker_enter_time_start"
        ><template slot-scope="scope">
          {{
            $utils.parseDate2Str(
              scope.row.worker_enter_time + "000",
              "YYYY-MM-DD"
            )
          }}
        </template></el-table-column
      >
      <el-table-column
        label="操作"
        header-align="center"
        width="140"
        v-if="isShow"
      >
        <template slot-scope="scope">
          <i
            v-permission="['StaffWorker-update']"
            class="iconfont btn-btn_list_edit edit-icon-btn"
            @click.stop="
              $router.linkTo(
                'enterprise_oa_account_labourRealName_handleLabour',
                {
                  id: scope.row.worker_id,
                }
              )
            "
          ></i>
          <i
            v-permission="['StaffWorker-delete']"
            @click.stop="deletefun(scope.row)"
            class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import confirm from "@/mixins/confirm";
import api from "@/api/index";
import Detail from "../labour/components/Detail";
export default {
  components: { Detail },
  mixins: [confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      infoData: { pic_list: [], file_list: [] },
    };
  },
  props: {
    tableDatas: {
      type: Array,
      default: () => [],
    },
    currentPages: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  methods: {
    async rowclick(row) {
      let res = await api.QueryStaffWorker({
        worker_id: row.worker_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    // 删除附件
    deletefun(row) {
      this.confirm(null, null, "确认是否删除？").then(() => {
        let data = {};
        data.worker_id = row.worker_id;
        api.DelStaffWorker(data);
        this.$parent.getList();
      });
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style scoped lang="scss"></style>
