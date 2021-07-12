<template>
  <div style="display: none">
    <div
      :id="'print' + index"
      class="print-box"
      v-for="(item, index) in printDataArr"
      :key="index + 'w'"
      style="page-break-after: always"
    >
      <p style="padding: 20px; text-align: center; font-size: 20px">
        日常巡检详情
      </p>
      <div style="margin-left: 10px; margin-top: 20px">
        <p style="color: #557dfd; font-size: 24px; font-weight: bold">
          巡检内容
        </p>
        <p style="margin-bottom: 10px">所属机构：{{ item.organ }}</p>
        <p style="margin-bottom: 10px">
          巡检主题：{{ item.daily_inspection_title }}
        </p>
        <p style="margin-bottom: 10px">
          隐患类型：{{
            ["", "无", "一般隐患", "较大隐患", "重大隐患"][item.trouble_type]
          }}
        </p>
        <p style="margin-bottom: 10px">巡检人：{{ item.account_name_check }}</p>
        <p style="margin-bottom: 10px">
          巡检日期：{{ item.daily_inspection_date }}
        </p>
        <p style="margin-bottom: 10px">
          巡检地点：{{ item.organ ? item.organ : "其他"
          }}{{
            item.daily_inspection_position
              ? "-" + item.daily_inspection_position
              : ""
          }}
        </p>
        <p style="margin-bottom: 10px">
          巡检内容：{{ item.daily_inspection_content }}
        </p>
        <p style="margin-bottom: 10px">
          备注：{{ item.daily_inspection_remark }}
        </p>
        <!-- <div style="margin-bottom: 10px" v-if="item.video_list.length">
          附件视频：
          <div style="margin-top: 10px">
            <n-video
              v-for="item in item.video_list"
              :key="item.url"
              class="video_tag w-100"
              :src="item.url"
            ></n-video>
          </div>
        </div>
        <div style="margin-bottom: 10px" v-if="item.pic_list.length">
          附件照片：
          <div style="margin-top: 10px">
            <img
              style="
                  width: 600px;
                  height: auto;
                  border-radius: 5px;
                  margin-right: 15px;
                  margin-bottom: 15px;
                "
              :src="items.url"
              v-for="(items, indexs) in item.pic_list"
              :key="indexs + 'image'"
            />
          </div>
        </div> -->
      </div>
      <p
        v-if="[4, 5, 6, 7].indexOf(item.daily_inspection_status) != -1"
        style="
          margin-top: 20px;
          color: #557dfd;
          font-size: 24px;
          font-weight: bold;
        "
      >
        整改详情
      </p>
      <div
        v-if="[4, 5, 6, 7].indexOf(item.daily_inspection_status) != -1"
        style="
          margin-left: 10px;
          margin-top: 10px;
          border: 2px dashed #557dfd;
          padding: 10px;
        "
      >
        <p style="margin-bottom: 10px">整改人：{{ item.account_name_rec }}</p>
        <p style="margin-bottom: 10px">整改时间：{{ item.rec_time }}</p>
        <p style="margin-bottom: 10px">
          复检人：{{ item.account_name_return }}
        </p>
        <p style="margin-bottom: 10px">
          完成时间：{{ item.daily_inspection_limit }}
        </p>
        <p style="margin-bottom: 10px">抄送人：{{ item.account_name_copy }}</p>
        <p style="margin-bottom: 10px">整改要求：{{ item.rec_require }}</p>
      </div>
      <div
        v-if="[4, 5, 6, 7].indexOf(item.daily_inspection_status) != -1"
        style="
          margin-left: 10px;
          margin-top: 10px;
          border: 2px dashed #557dfd;
          padding: 10px;
        "
      >
        <p style="color: #557dfd; font-size: 18px; margin-bottom: 10px">
          整改回复
        </p>
        <p style="margin-bottom: 10px">整改人：{{ item.account_name_rec }}</p>
        <p style="margin-bottom: 10px">整改时间：{{ item.rec_reply_time }}</p>
        <p style="margin-bottom: 10px">回复内容：{{ item.rec_reply }}</p>
      </div>
      <div
        v-if="[6, 7].indexOf(item.daily_inspection_status) != -1"
        class="mt-1 layer-border"
        style="
          margin-left: 10px;
          margin-top: 10px;
          border: 2px dashed #557dfd;
          padding: 10px;
        "
      >
        <p style="color: #557dfd; font-size: 18px; margin-bottom: 10px">
          复检回复
        </p>
        <p style="margin-bottom: 10px">
          复检人：{{ item.account_name_return }}
        </p>
        <p style="margin-bottom: 10px">复检时间：{{ item.return_time }}</p>
        <p style="margin-bottom: 10px">回复内容：{{ item.return_reply }}</p>
        <p style="margin-bottom: 10px">
          复检结果：{{
            ["", "", "", "", "", "", "复检通过", "复检不通过"][
              item.daily_inspection_status
            ]
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    printDataArr: {
      type: Array,
      default: () => [{}],
      required: false,
    },
  },
  methods: {
    doPrint() {
      // 加载完成后截图
      let newWin = window.open("", "打印");
      for (let i = 0; i < this.printDataArr.length; i++) {
        var htmlToPrint = document.getElementById("print" + i); //将要被打印的图片
        var style = `<style type='text/css'>
                        @page{size:auto;margin:0}
                        .video-player > div div,.video-player > div button{display:none}
                        </style>`;
        newWin.document.write(htmlToPrint.outerHTML + style); //将图片添加进新的窗口
      }
      newWin.document.close(); //在IE浏览器中使用必须添加这一句
      newWin.focus(); //在IE浏览器中使用必须添加这一句

      setTimeout(function () {
        newWin.print(); //打印
      }, 100);
      this.$emit("clearData");
    },
    print(content) {
      let myWindow = window.open("", "打印");
      myWindow.document.write(content);
      myWindow.focus();
      myWindow.document.close(); //关闭document的输出流, 显示选定的数据
      myWindow.print(); //打印当前窗口
      return myWindow;
    },
  },
};
</script>

<style lang="scss" scoped></style>
