<template>
  <el-table :data="tableDatas" width="100%" height="100%">
    <template slot="empty">
      <span>真是不巧，暂时没有数据呢~</span>
    </template>
    <el-table-column prop="index" label="序号" width="80">
      <template slot-scope="scope">
        <label>{{ (currentPages - 1) * 20 + (scope.$index + 1) }}</label>
      </template>
    </el-table-column>
    <el-table-column prop="organ" label="工程项目"></el-table-column>
    <el-table-column prop="team_organ" label="工区"></el-table-column>
    <el-table-column prop="team" label="班组名称"></el-table-column>
    <!-- <el-table-column prop="team" label="子单位工程"></el-table-column> -->
    <el-table-column prop="worker_counts" label="班组人数"></el-table-column>
    <el-table-column prop="team_leader" label="班组负责人"></el-table-column>
    <el-table-column prop="team_phone" label="负责人联系方式"></el-table-column>
    <el-table-column prop="team_labour" label="劳务单位"></el-table-column>
    <!-- <el-table-column prop="team_labour" label="是否比选">
      <template slot-scope="scope">
        {{ ["否", "是"][scope.row.team_source - 1] }}
      </template>
    </el-table-column> -->
    <!-- <el-table-column prop="team_labour" label="状态">
      <template slot-scope="scope">
        {{ scope.row.team_time ? "在场" : "离场" }}
      </template>
    </el-table-column> -->
    <el-table-column prop="team_time" label="中标/添加日期" width="120">
      <template slot-scope="scope">
        {{ $utils.parseDate2Str(scope.row.team_time + "000", "YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="下载二维码" prop="worker_type">
      <template slot-scope="scope">
        <a :href="scope.row.url" download="">
          <img style="width:50px;" :src="scope.row.url" />
        </a>
      </template>
    </el-table-column> -->
    <el-table-column label="操作" width="200" v-if="isShow">
      <template slot-scope="scope">
        <!-- <nStatusButton
          @buttonClick="scope.row.team_time && quitFun()"
          :changeColor="scope.row.team_time ? '#fd5571' : '#D6DAE4'"
          :btnText="'退场'"
        /> -->
        <i
          v-permission="['StaffWorker-update']"
          class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
          @click.stop="
            $router.linkTo('enterprise_oa_account_labourRealName_handleTeam', {
              id: scope.row.team_id,
            })
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
</template>

<script>
import confirm from "@/mixins/confirm";
import api from "@/api/index";
import setOrganTreedata from "@/mixins/setOrganTreedata";
export default {
  mixins: [confirm, setOrganTreedata],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      deleData: {},
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
  created() {},
  methods: {
    // 删除附件
    deletefun(row) {
      this.confirm(null, null, "确认是否删除？").then(() => {
        let data = {};
        data.team_id = row.team_id;
        api.DelStaffTeam(data);
        this.queryOrganTree();
        this.$parent.getList();
      });
    },
    // 退场
    quitFun() {
      this.confirm(null, null, "确认是否退场？").then(() => {
        let data = {};
        // data.team_id = row.team_id;
        // api.DelStaffTeam(data);
        // this.$parent.getList();
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
