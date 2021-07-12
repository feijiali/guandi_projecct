<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'项目动态详情'"
      :diaWidth="'50%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <el-scrollbar :native="false" class="wall">
          <div class="mgl10">
            <p class="f20 txc">{{ infoData.news_title }}</p>
            <p class="f16 mgt10 txc">
              <span>{{ infoData.news_time }}</span>
              <span class="mgl20">{{ infoData.account_name }}</span>
              <span class="mgl20">来源：{{ infoData.news_from }}</span>
            </p>
            <div
              v-if="infoData.news_type == 1"
              class="bdt10 mgt10 pd content-arc"
              style="height: 500px; border-top: 10px solid #f0f5fb"
            >
              <iframe
                frameborder="no"
                border="0"
                :src="infoData.news"
                class="wall heiall"
              ></iframe>
            </div>
            <div
              v-if="infoData.news_type == 2"
              class="bdt10 mgt10 pd content-arc"
              v-html="infoData.news"
              style="border-top: 10px solid #f0f5fb"
            ></div>
            <div v-if="infoData.file_list && infoData.file_list.length > 0">
              <h2 class="f17">附件文档</h2>
              <div
                v-for="(item, index) of infoData.file_list"
                :key="index + 'f'"
                class="d-flex align-items-center mgb10"
              >
                <span>{{ item.org_name }}</span>
                <a class="mgl20 download" :href="item.url">下载</a>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </template>
    </n-dialog>
    <!-- 搜索、删除、新增 -->
    <div class="container-div">
      <div class="top-select-box">
        <div class="d-flex align-items-center">
          <n-search
            class="d-inline-block"
            :isInput="true"
            :placeholder="'请输入关键词'"
            @searchFun="searchFun"
          ></n-search>
        </div>
        <div>
          <n-button
            v-permission="['ArticleNews-upload']"
            :btnText="'新增'"
            @buttonClick="
              $router.linkTo('project_projectsInfo_projectDynamic_handle')
            "
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
          <n-button
            v-permission="['ArticleNews-delete']"
            class="ml-2"
            :btnText="'批量删除'"
            @buttonClick="deleteFun(true, '', 'news_ids', 'delArticleNews')"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_trash trash-icon-btn mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        class="cursor-p-table"
        :data="tableData"
        ref="table"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="calc(100% - 80px)"
        @row-click="rowclick"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <span>
              {{ (currentPage - 1) * listQuery.page_size + (scope.$index + 1) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="news_title"></el-table-column>
        <el-table-column label="发布时间" prop="news_time"></el-table-column>
        <el-table-column label="发布人" prop="account_name"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i
              v-permission="['ArticleNews-update']"
              @click.stop="
                $router.linkTo('project_projectsInfo_projectDynamic_handle', {
                  id: scope.row.news_id,
                })
              "
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
            <i
              v-permission="['ArticleNews-delete']"
              @click.stop="
                deleteFun(false, scope.row, 'news_id', 'delArticleNews')
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
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryArticleNews",
      deleData: {},
      listQuery: {
        page: 0,
        page_size: 20,
        news_search: "",
        organ_node: this.$organ_id_en_or_pro(this),
      },
      infoData: {},
    };
  },
  methods: {
    searchFun(value) {
      this.currentPage = 1;
      this.listQuery.news_search = value;
      this.getList();
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
    // 点击详情回填数据
    backfillEditData(row) {
      this.infoData = row;
    },
  },
};
</script>

<style scoped lang="scss">
.download {
  background-color: $main;
  color: white;
  border-radius: 4px;
  padding: 2px 10px;
}
</style>
