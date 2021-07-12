<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'变更更新详情'" />
      <n-button
        class="position-absolute"
        style="top: -2px; right: 8px; z-index: 20"
        :btnText="'打印'"
        @buttonClick="printFuns()"
      >
      </n-button>
      <n-button
        v-permission="['ChangeParameterParameterInfo-export']"
        class="position-absolute"
        style="top: -2px; right: 120px; z-index: 20"
        :btnText="'导出数据'"
        @buttonClick="
          $utils.handleExport(
            'ExportChangeParameterParameterInfoDetail',
            {
              parameter_info_id: parameter_info_id,
            },
            '工程变更增减费用计算表'
          )
        "
      >
      </n-button>
    </div>
    <div class="p-2 rounded-1 bg-white flex-fill">
      <n-scroll>
        <div
          class="p-inf-main text-center w-100"
          style="height: calc(100% - 330px)"
        >
          <iframe
            width="100%"
            height="100%"
            scrolling="auto"
            id="mainFrame"
            frameborder="no"
            border="0"
            :src="src"
            class="w-100 iframe"
          ></iframe>
        </div>

        <nPicInfo
          :label_width="100"
          :title="'施工前图片'"
          :picList="infoData.parameter_info_before_file_list"
        />
        <nPicInfo
          :label_width="100"
          :title="'施工中图片'"
          :picList="infoData.parameter_info_file_list"
        />
        <nPicInfo
          :label_width="100"
          :title="'完工后图片'"
          :picList="infoData.parameter_info_after_file_list"
        />
        <nFileInfo
          :label_width="100"
          :isFlex="true"
          :title="'工程资料'"
          :fileList="infoData.parameter_info_project_file_list"
        />
        <nFileInfo
          :label_width="100"
          :isFlex="true"
          :title="'四方联测资料'"
          :fileList="infoData.parameter_info_four_file_list"
        />
        <nFileInfo
          :label_width="100"
          :isFlex="true"
          :title="'其他资料'"
          :fileList="infoData.parameter_info_other_file_list"
        />
      </n-scroll>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      infoData: { file_list: [], pic_list: [] },
      src: "",
      parameter_info_id: parseInt(this.$route.query.parameter_info_id), //合同ID
    };
  },

  mounted() {
    this.infoFun();
  },
  methods: {
    printFuns() {
      var iframeWin = document.getElementById("mainFrame").contentWindow;
      iframeWin.postMessage("print", "*");
    },
    async infoFun() {
      let url = this.GLOBAL.baseurl + "/web";
      this.src =
        url + "/h5/contractInfo/index4.html?id=" + this.parameter_info_id + "";
      let { result } = await api.QueryChangeParameterParameterInfo({
        parameter_info_id: this.parameter_info_id,
      });
      if (!result[0]) {
        this.$tip({
          isTip: true,
          message: "该数据已被删除！",
        });
        setTimeout(() => {
          this.$router.linkTo("enterprise_oa_workbench_commission", {
            t: 1,
          });
        }, 1000);
      } else {
        this.infoData = result[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
</style>
