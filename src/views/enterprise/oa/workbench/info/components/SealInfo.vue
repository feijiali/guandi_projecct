<template>
  <div class="w-100 h-100">
    <n-scroll>
      <nInfoItem
        :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
        :data="{
          name: item.fun_name ? item.fun_name() : item.name,
          value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
          unit: item.unit,
        }"
        :lable_width="90"
        :width="'30%'"
        :islong="item.islong"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />
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
      dataInfoList: [
        { name: "所属机构", islong: false, key: "organ_area" },
        { name: "申请人", islong: false, key: "apply_account_name" },
        {
          name: "申请时间",
          islong: false,
          key: "stamp_approval_apply_date",
          fun: (val) => {
            return val ? this.$utils.formatDate(val) : "";
          },
        },
        { name: "文件名称", islong: false, key: "stamp_approval_name" },
        { name: "文件类型", islong: false, key: "stamp_approval_file_type" },
        {
          name: "文件份数",
          islong: false,
          key: "stamp_approval_count",
          unit: "份",
        },
        { name: "加盖印章", islong: false, key: "stamp_approval_stamp_type" },
        // { name: "用章部门", islong:false, key: "stamp_approval_use_department" },
        { name: "使用人", islong: false, key: "stamp_approval_user_name" },
        {
          name: "使用日期",
          islong: false,
          key: "stamp_approval_use_date",
          fun: (val) => {
            return String(val).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
          },
        },
        { name: "用章公司", islong: true, key: "stamp_approval_use_company" },
        { name: "用章事由", islong: true, key: "stamp_approval_reason" },
      ],
      infoData: { file_list: [], pic_list: [] },
      isCancel: false, //是否是销假详情
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOAStampApproval({
        stamp_approval_id: id,
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
