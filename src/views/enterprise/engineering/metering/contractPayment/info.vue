<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'合同付款详情'" />
      <n-button
        class="position-absolute"
        style="top: -2px; right: 8px; z-index: 20"
        :btnText="'打印'"
        @buttonClick="printFuns()"
      >
      </n-button>
    </div>
    <div class="p-2 rounded-1 bg-white flex-fill">
      <n-scroll>
        <div class="p-inf-main text-center w-100 h-100">
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

        <nPicInfo :picList="infoData.pic_list" />
        <nFileInfo :fileList="infoData.file_list" />
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
      engineering_pay_id: parseInt(this.$route.query.engineering_pay_id), //合同ID
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
        url + "/h5/contractInfo/index2.html?id=" + this.engineering_pay_id + "";
      let { result } = await api.QueryProjectReportEngineeringPay({
        engineering_pay_id: this.engineering_pay_id,
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
