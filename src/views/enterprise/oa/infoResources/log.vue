<template>
  <div class="container-all">
    <div
      class="container-div flex-column justify-content-between d-flex pr-2 pb-2"
      style="margin: 0"
    >
      <div class="p-1" style="height: calc(100% - 70px)">
        <nBackTop title="文件日志" />
        <p class="mt-2 ml-2 font-20">{{ tip }}</p>
        <div class="h-100">
          <el-table
            class="cursor-p-table flex-fill ml-2 mt-2"
            :data="tableData"
            height="calc(100% - 120px)"
          >
            <template slot="empty">
              <span>真是不巧，暂时没有数据呢~</span>
            </template>
            <el-table-column label="用户" prop="account_name"></el-table-column>
            <el-table-column label="时间" prop="resources_log_create_time">
            </el-table-column>
            <el-table-column label="操作" prop="resources_log_type">
              <template slot-scope="scope">
                <span>{{
                  ["", "编辑", "下载", "转存", "修改属性", "删除"][
                    scope.row.resources_log_type
                  ]
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryInformationResourcesLogList", //表格请求接口
      listQuery: {
        //列表查询参数
        page: 0,
        page_size: 20,
        information_resources_id_un: Number(
          this.Base64.decode(this.$route.query.id)
        ),
        // material_node: this.$organ_id_en_or_pro(this),
      },
      tip: this.$route.query.logName,
    };
  },
  methods: {
    // 查询详情
    async queryInformationResources(obj) {
      let data = await api.queryInformationResources({
        information_resources_id: Number(
          this.Base64.decode(this.$route.query.id)
        ),
      });
      this.ruleform = data.result[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.container-all {
  background-color: white;
  .table-log {
    background-color: white;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
  }
}
</style>
