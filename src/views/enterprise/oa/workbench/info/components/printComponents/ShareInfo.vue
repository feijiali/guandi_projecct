<template>
  <div class="w-100 position-relative">
    <div class="div-use">
      <div class="div-date d-flex justify-content-between mx-2">
        <span>项目名称：{{ infoData.organ }}</span>
        <span>申请日期: {{ infoData.invoice_share_sub_time }}</span>
        <span>申请人: {{ infoData.sub_account_name }}</span>
      </div>
      <div class="div-table">
        <table class="table-origin">
          <tbody>
            <tr>
              <td class="gray">发票张数</td>
              <td class="td" colspan="3">
                {{ infoData.invoice_share_num }}
              </td>
            </tr>
            <tr>
              <td class="gray">发票金额</td>
              <td class="td">{{ infoData.invoice_share_amount }}</td>
              <td class="gray">总积分</td>
              <td class="td">
                {{ infoData.invoice_share_points }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
