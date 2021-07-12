<template>
  <div class="container-all">
    <n-dialog ref="dialog" :diaTit="'消息配置详情'" :diaWidth="'50%'">
      <template slot="diaSlot">
        <MessageInfo :showInfo="showInfo"></MessageInfo>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div class="flex-fill">
          <div class="d-inline-block">
            <label class="text-secondary">所属模块：</label>
            <el-select
              v-model="listQuery.module_eng_union"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, i) in module"
                :key="i"
                :label="item.module_chn"
                :value="item.module_eng"
              ></el-option>
            </el-select>
          </div>
          <div class="ml-2 d-inline-block">
            <label class="text-secondary">消息类型：</label>
            <el-select
              v-model="listQuery.msg_type"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="通知" :value="1"></el-option>
              <el-option label="待办" :value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div v-permission="['MessageMsgConfig-upload']">
          <n-button
            :btnText="'新增'"
            @buttonClick="linkTo('enterprise_messageConfig_handle')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_detail_plus_01 mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        class="cursor-p-table flex-fill"
        :data="tableData"
        style="width: 100%"
        @row-click="showMessageInfo"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="消息名称" prop="msg_config"></el-table-column>
        <el-table-column
          label="消息内容"
          prop="msg_config_content"
        ></el-table-column>
        <el-table-column label="消息状态">
          <template slot-scope="scope">
            <label>{{
              scope.row.msg_config_status == 1 ? "关闭" : "启用"
            }}</label>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['MessageMsgConfig-update']"
              @click.stop="
                linkTo('enterprise_messageConfig_handle', {
                  id: scope.row.msg_config_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['MessageMsgConfig-delete']"
              @click.stop="
                deleteFun(
                  false,
                  scope.row,
                  'msg_config_id',
                  'delMessageMsgConfig'
                )
              "
              class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
            ></i>
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
import MessageInfo from "./components/MessageInfo";
export default {
  name: "",
  mixins: [table, confirm],
  components: {
    MessageInfo,
  },
  data() {
    return {
      postURL: "queryMessageMsgConfig",
      listQuery: {
        module_eng_union: "",
        msg_type: 0,
        page: 0,
        page_size: 20,
      },
      showInfo: null,
      module: [],
      deleData: {
        msg_config_id: 0,
      },
    };
  },
  created() {
    this.getmodule();
    this.getList();
  },
  methods: {
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    async getmodule() {
      let res = await api.queryRelation({
        module_type: 2,
        page: -1,
      });
      this.module = res.result;
    },
    refreshData() {
      this.getList();
    },
    showMessageInfo(row) {
      this.showInfo = row;
      this.$refs.dialog.show();
    },
  },
};
</script>

<style></style>
