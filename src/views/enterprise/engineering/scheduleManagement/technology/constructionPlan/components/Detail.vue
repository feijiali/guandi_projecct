<template>
  <n-dialog
    ref="dialog"
    :diaTit="'施工方案详情'"
    :diaWidth="'50%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoItem
            :class="[index == 0 ? 'mt-2' : '']"
            :lable_width="96"
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
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList"
            :key="index"
          />
          <div class="detail-item" style="width: 100%">
            <span class="detail-label" style="width: 96px">参与人员</span>：
            <span class="detail-value flex-fill text-primary">
              <span
                class="d-inline-block handle-btn main-btn name-span"
                v-for="items in infoData.join_account_list"
                :key="items.join_account_id"
                >{{ items.join_account_name }}</span
              >
            </span>
          </div>
          <nFileInfo :fileList="infoData.file_list" />
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import api from "@/api/index";

export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({ join_account_list: [{}] }),
      required: false,
    },
  },
  data() {
    return {
      dataInfoList: [
        { name: "工程项目", key: "organ" },
        { name: "台账类型", key: "technology_type_string" },
        { name: "上传人", key: "sub_account_name" },
        { name: "参与单位", key: "join_organ_area" },
        { name: "提交时间", key: "technology_sub_time" },
        { name: "方案主题", key: "technology_title", islong: true },
        { name: "备注", key: "technology_remark", islong: true },
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
.name-span {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
