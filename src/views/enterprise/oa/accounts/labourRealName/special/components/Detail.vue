<template>
  <n-dialog
    ref="dialog"
    :diaTit="'特殊工种详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoTitle title="人员基础信息" />
          <nInfoItem
            :lable_width="90"
            :width="'24%'"
            :colorString="
              item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
            "
            :data="{
              name: item.name,
              value: item.fun
                ? item.fun(infoData[item.key])
                : infoData[item.key],
              unit: item.unit,
            }"
            :isPic="item.isPic"
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList"
            :key="index"
          />
          <template v-for="(item, index) in infoData.list">
            <div :key="index + 'b'" class="mt-2">
              <nInfoTitle :title="'证件' + (index + 1)" />
              <nInfoItem
                :lable_width="110"
                :width="'24%'"
                :colorString="
                  items.Colorfun ? items.Colorfun(item[items.key]) : ''
                "
                :data="{
                  name: items.name,
                  value: items.fun
                    ? items.fun(item[items.key])
                    : item[items.key],
                  unit: items.unit,
                }"
                :isPic="items.isPic"
                :islong="items.islong ? true : false"
                v-for="(items, indexs) in dataInfoList2"
                :key="indexs + 'a'"
              />
              <nPicInfo
                v-if="item.pic_list && item.pic_list.length"
                :title="'证件照'"
                :picList="item.pic_list"
              />
            </div>
          </template>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import temperatureLine from "../../../../../safety/safeManage/electricity/operation/OPChart/temperatureLine.vue";
export default {
  components: { temperatureLine },
  props: {
    infoData: {
      type: Object,
      default: () => ({ content_list: [{}] }),
      required: false,
    },
  },
  watch: {
    infoData: {
      handler: function () {
        this.infoData.list.forEach((item, index) => {
          if (item.credentials_pic) {
            item.pic_list = item.credentials_pic.split(",").map((items) => {
              return {
                url: this.infoData.server + items,
                file_name: items,
              };
            });
          }
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "工程项目", key: "organ" },
        { name: "人员姓名", key: "credentials_name" },
        { name: "联系电话", key: "credentials_phone" },
        { name: "身份证号", key: "credentials_id_card" },
        { name: "劳务单位", key: "credentials_unit" },
      ],
      dataInfoList2: [
        { name: "特殊作业类型", key: "credentials_type" },
        { name: "证件等级", key: "credentials_grade" },
        { name: "操作证号", key: "credentials_num" },
        { name: "初次领证日期", key: "credentials_date" },
        { name: "证件有效期", key: "credentials_valid_date" },
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

<style lang="scss" scoped></style>
