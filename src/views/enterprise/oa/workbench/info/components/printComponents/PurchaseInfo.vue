<template>
  <div class="w-100 position-relative">
    <div class="div-use">
      <div class="div-date d-flex justify-content-between mx-2">
        <span>项目名称：{{ infoData.organ }}</span>
        <span>申请日期: {{ infoData.purchase_approval_sub_time }}</span>
        <span>申请人: {{ infoData.sub_account_name }}</span>
      </div>
      <div class="div-table">
        <table class="table-origin">
          <tbody>
            <tr>
              <td>材料名称</td>
              <td class="td" colspan="3">
                {{ infoData.purchase_approval_name }}
              </td>
            </tr>
            <tr>
              <td>型号</td>
              <td class="td">{{ infoData.purchase_approval_spec }}</td>
              <td>数量</td>
              <td class="td">{{ infoData.purchase_approval_num }}</td>
            </tr>
            <tr>
              <td>项目预算单价</td>
              <td class="td">{{ infoData.purchase_approval_price }}元</td>
              <td>单位</td>
              <td class="td">{{ infoData.purchase_approval_unit }}</td>
            </tr>
            <tr>
              <td>总价</td>
              <td class="td">
                {{ infoData.purchase_approval_total_amount }}元
              </td>
              <td>进场日期</td>
              <td class="td">{{ infoData.purchase_approval_in_time }}</td>
            </tr>
            <tr>
              <td>用途</td>
              <td class="td" colspan="3">
                {{ infoData.purchase_approval_use_for }}
              </td>
            </tr>
            <tr>
              <td>项目结算方式</td>
              <td class="td" colspan="3">
                {{ infoData.purchase_approval_settlement }}
              </td>
            </tr>
            <tr>
              <td>合同签约单位</td>
              <td class="td" colspan="3">
                {{ infoData.purchase_approval_sign_company }}
              </td>
            </tr>
            <tr>
              <td>具体说明</td>
              <td class="td" colspan="3" style="text-align: left">
                {{ infoData.purchase_approval_remark }}
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
