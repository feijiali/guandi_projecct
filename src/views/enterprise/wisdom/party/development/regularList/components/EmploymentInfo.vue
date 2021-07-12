<template>
  <n-dialog
    ref="dialog"
    :diaTit="'转正通知单详情'"
    :diaWidth="'50%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <div @click="doPrint()" class="print-btn position-absolute cursor-p">
        <img src="@/assets/images/btn_view_print.png" />
      </div>
      <n-scroll>
        <div
          :id="'print' + index"
          style="
            background-color: #f5f7fa;
            page-break-after: always;
            margin-bottom: 20px;
            margin-right: 20px;
            border-radius: 20px;
            padding: 20px;
          "
          v-for="index in 2"
          :key="index"
        >
          <p
            style="
              font-size: 18px;
              text-align: center;
              font-weight: bold;
              color: #131d36;
              letter-spacing: 1px;
            "
          >
            预备党员转正通知书{{ index == 1 ? "(存根)" : "" }}
          </p>
          <div
            style="
              display: flex;
              justify-content: space-between;
              line-height: 30px;
              margin-top: 20px;
            "
          >
            <div>
              <span style="color: #131d36">{{
                infoData.pd_official_company
              }}</span
              >党支部：
            </div>
            <div>
              <span style="color: #131d36">{{
                infoData.pd_official_number
              }}</span>
            </div>
          </div>
          <div
            style="line-height: 30px; margin-top: 10px"
            v-if="infoData.pd_official_meeting_time"
          >
            <span style="text-indent: 35px; display: inline-block"
              >经县直机关工委</span
            >
            <span style="color: #131d36">{{
              infoData.pd_official_meeting_time.split("-")[0]
            }}</span
            >年
            <span style="color: #131d36">{{
              infoData.pd_official_meeting_time.split("-")[1]
            }}</span
            >月
            <span style="color: #131d36">{{
              infoData.pd_official_meeting_time.split("-")[2]
            }}</span>
            日会议研究，同意{{
              infoData.account_name
            }}同志按期转为中共正式党员，党龄从
            <span style="color: #131d36">{{
              infoData.pd_official_start_time.split("-")[0]
            }}</span
            >年
            <span style="color: #131d36">{{
              infoData.pd_official_start_time.split("-")[1]
            }}</span
            >月
            <span style="color: #131d36">{{
              infoData.pd_official_start_time.split("-")[2]
            }}</span
            >日起计算。
          </div>
          <div style="text-indent: 35px; margin-top: 10px">特此通知。</div>
          <div
            style="text-align: right; margin-top: 10px"
            v-if="infoData.pd_official_time"
          >
            <div style="display: inline-block">
              {{ infoData.pd_official_time.split("-")[0] }}年{{
                infoData.pd_official_time.split("-")[1]
              }}月{{ infoData.pd_official_time.split("-")[2].split(" ")[0] }}日
            </div>
          </div>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
export default {
  data() {
    return {
      infoData: {},
    };
  },
  methods: {
    sendFile(row) {
      this.infoData = row;
      this.$refs.dialog.show();
    },
    doPrint(content) {
      var myWindow = window.open("", "打印");
      for (var i = 1; i < 3; i++) {
        var htmlToPrint = document.getElementById("print" + i); //将要被打印的图片
        myWindow.document.write(htmlToPrint.outerHTML); //将图片添加进新的窗口
      }
      myWindow.document.close(); //在IE浏览器中使用必须添加这一句
      myWindow.focus();
      setTimeout(function () {
        myWindow.print(); //打印
      }, 100);
      //   return myWindow
    },
  },
};
</script>

<style lang="scss" scoped>
</style>