<template>
  <div class="w-100 position-relative h-100">
    <n-scroll>
      <div
        class="p-inf-main text-center w-100"
        style="height: calc(100% - 350px)"
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

      <nPicInfo :picList="infoData.pic_list" />
      <nFileInfo :fileList="infoData.file_list" />
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      infoData: { file_list: [], pic_list: [] },
      src: "",
    };
  },

  mounted() {},
  methods: {
    printFuns() {
      var iframeWin = document.getElementById("mainFrame").contentWindow;
      iframeWin.postMessage("print", "*");
    },
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let url = this.GLOBAL.baseurl + "/web";
      this.src = url + "/h5/contractInfo/index3.html?id=" + id + "";
      let { result } = await api.QueryChangeParameterParameter({
        parameter_id: id,
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
