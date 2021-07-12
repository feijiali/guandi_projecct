<template>
  <div class="w-100 h-100">
    <n-scroll>
      <template v-for="(item, index) in dataInfoList">
        <nInfoItem
          v-if="item.show ? item.show() : true"
          :colorString="item.colorString"
          :data="{
            name: item.fun_name ? item.fun_name() : item.name,
            value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
            unit: item.unit,
          }"
          :lable_width="90"
          :width="'30%'"
          :islong="item.islong"
          :key="index"
        />
      </template>
      <nPicInfo :picList="infoData.pic_list" />
      <nFileInfo :fileList="infoData.file_list" />
      <template v-for="(detail, i) in infoData.detail_list">
        <NormalCard
          :key="'card-' + i"
          class="mt-1"
          width="80%"
          :title="'第 ' + (i + 1) + ' 张'"
        >
          <template v-for="(item, index) in cardInfoList">
            <nInfoItem
              v-if="item.show ? item.show() : true"
              :data="{
                name: item.fun_name ? item.fun_name() : item.name,
                value: item.fun ? item.fun(detail[item.key]) : detail[item.key],
                unit: item.unit,
              }"
              :lable_width="90"
              :width="'30%'"
              :islong="item.islong"
              :key="'card-' + i + '-' + index"
            >
              <template
                slot="appenddiv"
                v-if="item.key == 'invoice_share_detail_amount'"
              >
                <viewer :images="detail.pic_list" class="lookPic">
                  <img
                    style="height: 30px; width: auto"
                    :src="itm.url"
                    v-for="(itm, ind) in detail.pic_list"
                    :key="ind + 'image'"
                    class="layer-info-img"
                  />
                  <!-- <div class="text-white bg-primary pl-1 pr-1 pt pb rounded cursor-p d-flex  align-items-center" style="margin-top:-5px;">查看发票</div> -->
                </viewer>
              </template>
              <!-- <template v-if="item.key=='invoice_share_detail_amount'"></template -->
              ></nInfoItem
            >
          </template>
        </NormalCard>
      </template>
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
import NormalCard from "@comp/NormalCard";
export default {
  components: {
    NormalCard,
  },
  data() {
    const invoice_share_type_arr = {
      1: "餐费",
      2: "差旅费/滴滴发票",
      3: "电子产品",
      4: "家用电器/家具",
      5: "加油/过路/维修/保养",
      6: "生活用品/食品",
      7: "培训费/书籍",
      8: "装修费用",
      9: "办公费/网费",
    };
    const share_detail_type_arr = {
      1: "增值税发票",
      2: "定额发票",
      3: "通用机打发票",
      4: "火车票",
      5: "出租车票",
      6: "行程单",
      7: "汽车票",
    };
    return {
      dataInfoList: [
        { name: "所属机构", islong: false, key: "organ_area" },
        { name: "发票种类", islong: false, key: "invoice_share_type_string" },
        { name: "提供人", islong: false, key: "provider_account_name" },
        {
          name: "发票张数",
          islong: false,
          key: "invoice_share_num",
          unit: "张",
        },
        {
          name: "发票金额",
          islong: false,
          key: "invoice_share_amount",
          unit: "元",
        },
        {
          name: "总积分",
          islong: false,
          key: "invoice_share_points",
          unit: "分",
        },
      ],
      cardInfoList: [
        { name: "开票日期", islong: false, key: "invoice_share_detail_time" },
        {
          name: "发票类型",
          islong: false,
          key: "invoice_share_detail_type",
          fun: (val) => {
            return share_detail_type_arr[val];
          },
        },
        {
          name: "税率",
          islong: false,
          key: "invoice_share_detail_tax_percent",
          unit: "%",
        },
        { name: "发票代码", islong: false, key: "invoice_share_detail_code" },
        { name: "发票号码", islong: false, key: "invoice_share_detail_serial" },
        {
          name: "税金",
          islong: false,
          key: "invoice_share_detail_tax_amount",
          unit: "元",
        },
        {
          name: "积分",
          islong: false,
          key: "invoice_share_detail_amount_points",
          unit: "分",
        },
        { name: "购买方", islong: false, key: "invoice_share_detail_buyer" },
        { name: "销售方", islong: false, key: "invoice_share_detail_seller" },
        {
          name: "发票金额",
          islong: false,
          key: "invoice_share_detail_amount",
          unit: "元",
        },
      ],
      infoData: { detail_list: [] },
      isCancel: false, //是否是销假详情
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOAInvoiceShare({
        invoice_share_id: id,
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