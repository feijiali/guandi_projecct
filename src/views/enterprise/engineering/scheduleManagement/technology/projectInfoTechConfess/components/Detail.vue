<template>
  <n-dialog
    ref="dialog"
    :diaTit="'技术交底详情'"
    :diaWidth="'50%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1 text-center">
          <h2 class="mb-1">技术交底书</h2>
          <table border="1" cellspacing="0" cellpadding="4">
            <tr>
              <td>项目名称</td>
              <td colspan="3">{{ infoData.organ }}</td>
              <td>编号</td>
              <td colspan="2">{{ infoData.tech_confess_serial }}</td>
            </tr>
            <tr>
              <td>施工单位</td>
              <td colspan="3">{{ infoData.tech_confess_serial }}</td>
              <td>日期</td>
              <td colspan="2">{{ infoData.tech_confess_time }}</td>
            </tr>
            <tr>
              <td>工程名称</td>
              <td colspan="2">{{ infoData.tech_confess_engine_name }}</td>
              <td>交底内容</td>
              <td colspan="3">{{ infoData.tech_confess_desc }}</td>
            </tr>
            <tr>
              <td>编制人</td>
              <td>{{ infoData.pre_account_name }}</td>
              <td>复核人</td>
              <td>{{ infoData.review_account_name }}</td>
              <td>技术负责人</td>
              <td colspan="2">{{ infoData.response_account_name }}</td>
            </tr>
            <tr>
              <td
                class="text-left"
                colspan="7"
                v-html="infoData.tech_confess_content"
              ></td>
            </tr>
          </table>

          <nPicInfo :picList="infoData.pic_list" />
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
        { name: "方案主题", key: "technology_title" },
        { name: "上传人", key: "sub_account_name" },
        { name: "参与单位", key: "join_organ_area" },
        {
          name: "参与人员",
          key: "join_account_list",
          islong: true,
          fun: function (val) {
            return val ? val : "";
          },
        },
        { name: "提交时间", key: "technology_sub_time" },
        { name: "备注", key: "technology_remark", islong: true },
      ],
    };
  },
  created() {},
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
table tr td {
  padding: 10px;
}
</style>
