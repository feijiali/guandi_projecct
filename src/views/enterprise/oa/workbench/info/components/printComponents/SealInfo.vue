<template>
  <div class="w-100 position-relative">
    <div class="div-use">
      <div class="div-date d-flex justify-content-between mx-2">
        <span>项目名称：{{ infoData.organ }}</span>
        <span
          >申请日期:
          {{
            infoData.stamp_approval_apply_date
              ? this.$utils.formatDate(infoData.stamp_approval_apply_date)
              : ""
          }}</span
        >
        <span>申请人: {{ infoData.apply_account_name }}</span>
      </div>
      <div class="div-table">
        <table class="table-origin">
          <tbody>
            <tr>
              <td class="gray">盖章文件名称</td>
              <td class="td" colspan="5">{{ infoData.stamp_approval_name }}</td>
            </tr>
            <tr>
              <td class="gray">印章种类</td>
              <td class="td">{{ infoData.stamp_approval_stamp_type }}</td>
              <td class="gray">文件份数</td>
              <td class="td">{{ infoData.stamp_approval_count }}份</td>
              <td class="gray">文件类型</td>
              <td class="td">{{ infoData.stamp_approval_file_type }}</td>
            </tr>
            <tr>
              <td class="gray">需用章公司名称</td>
              <td class="td" colspan="5">
                {{ infoData.stamp_approval_use_company }}
              </td>
            </tr>
            <tr>
              <td class="gray">用章事由</td>
              <td class="td" colspan="5">
                {{ infoData.stamp_approval_reason }}
              </td>
            </tr>
            <tr>
              <td class="gray">使用日期</td>
              <td class="td">
                {{
                  String(infoData.stamp_approval_use_date).replace(
                    /^(\d{4})(\d{2})(\d{2})$/,
                    "$1-$2-$3"
                  )
                }}
              </td>
              <td class="gray">使&nbsp;用&nbsp;人</td>
              <td class="td" colspan="3">
                {{ infoData.stamp_approval_user_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template
        v-if="
          isFilePrint && (infoData.pic_list.length || infoData.file_list.length)
        "
      >
        <div style="page-break-after: always"></div>
        <div class="d-flex justify-content-between flex-wrap">
          <div style="page-break-after: always">
            <img
              style="width: 100%"
              class="mb-1 d-block"
              v-for="(item, index) in infoData.pic_list"
              :key="index"
              :src="item.url"
            />
          </div>
        </div>
        <p style="page-break-after: always"></p>
        <nFileInfo :fileList="infoData.file_list" />
        <p style="page-break-after: always"></p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
    },
    isFilePrint: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
