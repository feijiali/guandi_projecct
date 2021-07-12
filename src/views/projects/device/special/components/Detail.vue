<template>
  <n-dialog
    ref="dialog"
    :diaTit="'特种设备详情'"
    :diaWidth="'80%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div>
          <div style="width:42%" class="float-left">
            <img :src="item.url" class="w-100 mb-1 br-1"
              v-for="(item,index) in infoData.device_pic_list" :key="index">
          </div>
          <div style="width:52%" class="float-right">
            <div v-for="(item, index) in dataInfoList" :key="index">
            <nInfoTitle title="基础信息" class="mb-1" v-if="index == 0"/>
            <nInfoTitle title="操作人信息" class="mb-1" v-if="index == 8"/>
            <nInfoItem
              :lable_width="item.lable_width ? item.lable_width : 70"
              :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
              :data="{
                name: item.name,
                value: item.fun
                  ? item.fun(infoData[item.key])
                  : infoData[item.key],
                unit: item.unit,
              }"
              :islong="item.islong ? true : false"
            />
            </div>
          </div>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
      required: false,
    },
    rectifyReplyInfo: {
      type: Array,
      default: () => [{}],
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "所属工区", key: "organ", islong: true },
        {
          name: "编号",
          key: "device_serial",
          islong: true,
        },
        { name: "厂家", key: "device_manufacturer", islong: true },
        {
          name: "设备型号",
          key: "device_model",
          islong: true,
        },
        { name: "进场时间", key: "device_in_date", islong: true },
        {
          name: "出场时间",
          key: "device_out_date",
          islong: true,
        },
        {
          name: "设备标定时间",
          key: "device_calibration_date",
          islong: true,
        },
        {
          name: "证书到期时间",
          key: "device_expired_date",
          islong: true,
        },
        {
          name: "操作人",
          key: "operator_list",
          fun: (val) => {
            let str='';
            if(val&&val.length) {
             val.forEach(item => {
                 str+= item.account_name+','+item.account+'<br/>'
              })
            }
            return str 
          },
          islong: true,
        }
      ],
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    cancel() {
      this.$refs.dialog.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>