<template>
  <div>
    <n-dialog
      ref="dialog2"
      :diaTit="'分数考核详情'"
      :diaWidth="'500px'"
      class="stretch-dialog rectify-dialog"
    >
      <template slot="diaSlot">
        <div class="mgl10">
          <div class="detail-item detail-item-long">
            <span class="detail-label">工区</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.organ
            }}</span>
          </div>
          <div class="detail-item detail-item-long">
            <span class="detail-label">考核内容</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.daily_inspection_title
            }}</span>
          </div>
          <div class="detail-item detail-item-long">
            <span class="detail-label">考核时间</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.report_date
            }}</span>
          </div>
          <div class="detail-item detail-item-long">
            <span class="detail-label">考核人</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.account_name
            }}</span>
          </div>
          <div class="detail-item detail-item-long">
            <span class="detail-label">被惩罚对象</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.report_new
            }}</span>
          </div>

          <div class="detail-item detail-item-long">
            <span class="detail-label">目前分数</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi red"
              >{{ info.report_score_his }}分</span
            >
          </div>

          <div class="detail-item detail-item-long">
            <span class="detail-label">扣除分数</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi yellow"
              >{{ info.report_sub_score }}分</span
            >
          </div>

          <div class="detail-item detail-item-long">
            <span class="detail-label">剩余分数</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi red"
              >{{
                $utils.float_point(
                  Number(info.report_score_his) - Number(info.report_sub_score),
                  2
                )
              }}分</span
            >
          </div>

          <div class="detail-item detail-item-long">
            <span class="detail-label">扣分原因</span><span>：</span
            ><span class="detail-value detail-value-long vtt disi">{{
              info.report_because
            }}</span>
          </div>
        </div>
      </template>
    </n-dialog>
    <n-dialog
      ref="dialog"
      @beforeClose="beforeClose"
      :diaTit="'质量检查详情'"
      :diaWidth="'700px'"
      class="stretch-dialog rectify-dialog"
    >
      <template slot="diaSlot">
        <!-- <div @click="doPrint()" class="print-btn posa cusp">
          <img src="@/assets/images/btn_view_print.png" />
        </div> -->
        <div v-if="[1, 2, 6].indexOf(infoData.daily_inspection_status) != -1">
          <div
            v-if="
              infoData.daily_inspection_activity == 2 &&
              (infoData.copy_union
                .split(',')
                .indexOf($store.getters.account_id) != -1 ||
                show2)
            "
            @click="handleTest"
            class="el-button-add el-button-add-layer mgl20 posa cusp"
          >
            质量考核
          </div>
          <div
            v-if="infoData.daily_inspection_activity == 1"
            @click="TestInfo"
            class="el-button-add el-button-add-layer mgl20 posa cusp"
          >
            考核详情
          </div>
        </div>

        <el-scrollbar :native="false" class="wall">
          <div id="print1" class="mgl10">
            <div class="layer-title-blue posr mgb15">发起检查<span></span></div>
            <div class="ovh">
              <div class="detail-item detail-item-long">
                <span class="detail-label">工区</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.organ
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">工程名称</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.inspection_project_name
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">里程桩号</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi"
                  >{{ infoData.inspection_project_pile_prefix
                  }}{{ infoData.inspection_project_pile }}</span
                >
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查主题</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.daily_inspection_title
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">隐患类型</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  ["", "无", "一般隐患", "较大隐患", "重大隐患"][
                    infoData.trouble_type
                  ]
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">发起人</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.account_name
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查人</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.account_name_check
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查时间</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.daily_inspection_date
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查地点</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.daily_inspection_position
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">是否为风险源</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  ["否", "是"][infoData.daily_inspection_danger_area]
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查内容</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.daily_inspection_content
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">检查备注</span><span>：</span
                ><span class="detail-value detail-value-long vtt disi">{{
                  infoData.daily_inspection_remark
                }}</span>
              </div>
              <div class="detail-item detail-item-long">
                <span class="detail-label">验收结果</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt disi main"
                  :class="
                    ['', 'green', 'yellow', 'red'][
                      infoData.daily_inspection_result
                    ]
                  "
                  >{{
                    ["", "通过", "口头警告", "排查整改"][
                      infoData.daily_inspection_result
                    ]
                  }}</span
                >
              </div>
              <div
                v-if="infoData.daily_inspection_pic"
                class="detail-item detail-item-long"
              >
                <span class="detail-label">附件照片</span><span>：</span>
                <div class="detail-value detail-value-long vtt">
                  <img
                    :src="infoData.server + item"
                    alt=""
                    v-for="(item, index) in infoData.daily_inspection_pic.split(
                      ','
                    )"
                    :key="index"
                    class="layer-info-img"
                    @click="
                      bigImg(index, infoData.daily_inspection_pic.split(','))
                    "
                  />
                </div>
              </div>
              <div
                v-if="infoData.daily_inspection_video"
                class="detail-item detail-item-long"
              >
                <span class="detail-label">附件视频</span><span>：</span>
                <div class="detail-value detail-value-long vtt">
                  <div
                    v-for="(
                      item, index
                    ) in infoData.daily_inspection_video.split(',')"
                    :key="'a' + index"
                  >
                    <n-video
                      class="video_tag"
                      :src="infoData.server + item + '?v=' + Math.random()"
                    ></n-video>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="
                [3, 4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
              "
              class="layer-title-blue posr mgb15"
            >
              整改内容<span></span>
            </div>
            <div
              v-if="
                [3, 4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
              "
              class="ovh"
            >
              <div class="clear mgb10">
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">整改人</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.account_name_rec
                    }}</span>
                  </div>
                </div>
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">整改时间</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.rec_time
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="clear mgb10">
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">整改要求</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.rec_require
                    }}</span>
                  </div>
                </div>
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">复检人</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.account_name_return
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="clear mgb10">
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">抄送人</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.list
                        ? infoData.list
                            .map((item) => item.account_name_copy)
                            .join()
                        : ""
                    }}</span>
                  </div>
                </div>
                <div class="lt whalf">
                  <div class="detail-item detail-item-long">
                    <span class="detail-label">完成时间</span><span>：</span
                    ><span class="detail-value detail-value-long vtt disi">{{
                      infoData.daily_inspection_limit
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="
                [4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
              "
              class="layer-title-blue posr mgb15"
            >
              整改详情<span></span>
            </div>
            <div
              v-if="
                [4, 5, 6, 7].indexOf(infoData.daily_inspection_status) != -1
              "
              class="ovh"
            >
              <div class="layer-border mgb10">
                <div class="fwb">整改回复</div>
                <div class="clear mgb10">
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">整改人</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.account_name_rec
                      }}</span>
                    </div>
                  </div>
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">整改时间</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.rec_time
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="clear mgb10">
                  <div class="disi">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">回复内容</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.rec_reply
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="clear mgb10">
                  <div
                    v-if="infoData.rec_pic"
                    class="detail-item detail-item-long"
                  >
                    <span class="detail-label">附件照片</span><span>：</span>
                    <div class="detail-value detail-value-long vtt">
                      <img
                        :src="infoData.server + item"
                        alt=""
                        v-for="(item, index) in infoData.rec_pic.split(',')"
                        :key="index"
                        class="layer-info-img"
                        @click="bigImg(index, infoData.rec_pic.split(','))"
                      />
                    </div>
                  </div>
                  <div
                    v-if="infoData.rec_video"
                    class="detail-item detail-item-long"
                  >
                    <span class="detail-label">附件视频</span><span>：</span>
                    <div class="detail-value detail-value-long vtt">
                      <div
                        v-for="(item, index) in infoData.rec_video.split(',')"
                        :key="'b' + index"
                      >
                        <n-video
                          class="video_tag"
                          :src="infoData.server + item + '?v=' + Math.random()"
                        ></n-video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="[6, 7].indexOf(infoData.daily_inspection_status) != -1"
                class="layer-border mgb10"
              >
                <div class="fwb">复检回复</div>
                <div class="clear mgb10">
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">复检人</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.account_name_return
                      }}</span>
                    </div>
                  </div>
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">复检时间</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.return_time
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="clear mgb10">
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">回复内容</span><span>：</span
                      ><span class="detail-value detail-value-long vtt disi">{{
                        infoData.return_reply
                      }}</span>
                    </div>
                  </div>
                  <div class="disi whalf">
                    <div class="detail-item detail-item-long">
                      <span class="detail-label">复检结果</span><span>：</span
                      ><span
                        class="detail-value detail-value-long vtt disi"
                        :class="
                          infoData.daily_inspection_status == 6
                            ? 'green'
                            : 'red'
                        "
                        >{{
                          infoData.daily_inspection_status == 6
                            ? "复检通过"
                            : "复检不通过"
                        }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="clear mgb10">
                  <div
                    v-if="infoData.return_pic"
                    class="detail-item detail-item-long"
                  >
                    <span class="detail-label">附件照片</span><span>：</span>
                    <div class="detail-value detail-value-long vtt">
                      <img
                        :src="infoData.server + item"
                        alt=""
                        v-for="(item, index) in infoData.return_pic.split(',')"
                        :key="index"
                        class="layer-info-img"
                        @click="bigImg(index, infoData.return_pic.split(','))"
                      />
                    </div>
                  </div>
                  <div
                    v-if="infoData.return_video"
                    class="detail-item detail-item-long"
                  >
                    <span class="detail-label">附件视频</span><span>：</span>
                    <div class="detail-value detail-value-long vtt">
                      <div
                        v-for="(item, index) in infoData.return_video.split(
                          ','
                        )"
                        :key="'c' + index"
                      >
                        <n-video
                          class="video_tag"
                          :src="infoData.server + item"
                        ></n-video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </template>
    </n-dialog>
  </div>
</template>

<script>
import api from "@/api";
import { hasPermissionArr } from "@/plugins/permission_tools";
export default {
  computed: {
    show() {
      return hasPermissionArr(["QualityInspectionReport"]);
    },
    show2() {
      return hasPermissionArr(["QualityInspectionReport-upload"]);
    },
  },
  name: "",
  components: {},
  data() {
    return {
      infoData: {},
      info: {},
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    async showDialog(id) {
      let res = await api.queryQualityDailyInspection({
        daily_inspection_id: id,
      });
      this.infoData = res.result[0];
      this.$refs.dialog.show();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    async TestInfo() {
      let res = await api.queryQualityInspectionReport({
        inspection_id_union: this.infoData.daily_inspection_id,
      });
      this.info = res.result[0];
      this.$refs.dialog2.show();
    },
    handleTest() {
      this.$refs.dialog.cancel();
      this.$router.linkTo("handleQualityTest", {
        inId: this.infoData.daily_inspection_id,
        organId: this.infoData.organ_id,
        year: this.infoData.daily_inspection_date.split("-")[0],
      });
    },
    // 打印
    doPrint() {
      var windows = this.print(document.getElementById("print1").innerHTML);
    },
    print(content) {
      var myWindow = window.open("", "打印");
      var style = `
        <style type='text/css'>
          .ovh{
            overflow: hidden;
          }
          .detail-item .detail-label::after {
            display: inline-block;
            color: #333;
            padding-right: 10px;
          }
          .layer-title-blue {
            color: #557dfd;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 1px;
            padding-left: 5px;
          }
          .layer-title-blue span {
            position: absolute;
            left: -5px;
            bottom: 0;
            width: 3px;
            height: 20px;
            background-color: #557dfd;
            z-index: -1;
          }
          .clear {
            zoom: 1;
            }
          .clear:after {
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }
          .posr {
            position: relative;
          }
          .mgb10 {
            margin-bottom: 10px;
          }
          .mgb15{
            margin-bottom: 15px;
          }
          .detail-item {
            line-height: 25px;
            display: flex;
          }
          .detail-label {
            color: hsl(220, 4%, 58%);
            text-align: justify;
            vertical-align: top;
          }
          .detail-label::after {
            display: inline-block;
            width: 100%;
            content: "";
            height: 0;
          }
          .detail-label-special {
            color: hsl(220, 4%, 58%);
            display: inline-block;
            width: 85px;
            text-align: justify;
            vertical-align: top;
          }
          .detail-label-special::after {
            display: inline-block;
            width: 100%;
            content: "";
            height: 0;
          }
          .detail-value {
            display: inline-block;
            color: #333;
            padding-right: 10px;
          }
          .detail-item-long {
            display: flex;
          }
          
          .detail-value-long {
            flex: 1;
          }
          
          .detail-item-half {
            width: 50%;
            display: inline-block;
          }
          .vtt {
            vertical-align: top;
          }
          .disi {
            display: inline-block;
          }
          .layer-info-img {
            max-height: 205px;
            max-width: 200px;
            border-radius: 5px;
            margin-right: 15px;
            margin-bottom: 15px;
            cursor: pointer;
          }
          .lt {
            float: left;
          }
          .wall {
            width: 100%;
          }
          .whalf {
            width: 50%;
          }
          .layer-border{
            border:2px dashed #557dfd;
            padding: 10px;
          }
          .fwb {
            font-weight: 600;
          }
          .video-player > div div,.video-player > div button{
            display:none
          }
          .yellow{
            color: rgba(248, 147, 29, 0.8) !important;
          }
          .green{
            color: #84d945 !important;
          }
          .red{
            color: red !important;
          }
        </style>
      `;
      let title = `<div style="
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
">${this.infoData.daily_inspection_title}</div>`;
      myWindow.document.write(title + content + style);
      myWindow.focus();
      myWindow.document.close(); //关闭document的输出流, 显示选定的数据
      setTimeout(() => {
        myWindow.print(); //打印当前窗口
      }, 100);
      return myWindow;
    },
  },
};
</script>

<style scoped lang="scss">
.el-button-add-layer,
.el-button-deny {
  top: 20px;
  left: 130px;
  background-color: $blue;
  z-index: 40;
}

.el-button-deny {
  background-color: $orange;
}
</style>
