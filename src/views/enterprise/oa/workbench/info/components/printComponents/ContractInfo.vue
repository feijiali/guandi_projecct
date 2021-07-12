<template>
  <div class="w-100 position-relative">
    <div class="div-use">
      <div class="div-table">
        <table class="table-origin">
          <tbody>
            <tr>
              <td>申请单位或部门</td>
              <td class="td">
                {{ infoData.organ }}
              </td>
              <td>合同分类</td>
              <td class="td">
                {{ infoData.contract_approval_type_str }}
              </td>
            </tr>
            <tr>
              <td>合同名称</td>
              <td class="td">{{ infoData.contract_approval_name }}</td>
              <td>合同编号</td>
              <td class="td">{{ infoData.contract_approval_number }}</td>
            </tr>
            <tr>
              <td>合同甲方</td>
              <td class="td">{{ infoData.contract_approval_department }}</td>
              <td>合同乙方</td>
              <td class="td">{{ infoData.contract_approval_supplier }}</td>
            </tr>
            <tr>
              <td>合同总价/单价</td>
              <td class="td">{{ infoData.contract_approval_money }}元</td>
              <td>经办部门/人员</td>
              <td class="td">
                {{
                  infoData.organ +
                  "/" +
                  infoData.contract_approval_due_person +
                  "/" +
                  infoData.contract_approval_time
                }}
              </td>
            </tr>
            <tr>
              <td class="p-1" colspan="4">
                <p class="text-left">{{ infoData.sub_account_name }}意见：</p>
                <p style="text-indent: 2em" class="text-left mt-1">
                  {{ infoData.contract_approval_advice }}
                </p>
              </td>
            </tr>
            <template v-for="(item, index) in reviseArr">
              <tr v-if="item.revise_record_state != 1" :key="index">
                <td class="p-1" colspan="4">
                  <p class="text-left">{{ item.sub_account_name }}意见：</p>
                  <p style="text-indent: 2em" class="text-left mt-1">
                    {{
                      item.revise_record_remark
                        ? item.revise_record_remark
                        : "暂无"
                    }}
                  </p>
                  <div class="text-right mt-1">
                    <div class="d-inline-block">
                      签名：<img
                        class="signature d-inine-block ml-1"
                        v-if="item.sign_url && item.revise_record_state != -1"
                        :src="item.sign_url"
                      />
                    </div>
                    <span class="ml-1"
                      >日期：{{ item.revise_record_time }}</span
                    >
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviseArr: {
      type: Array,
      default: () => [],
    },
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
.signature {
  position: relative;
  vertical-align: middle;
  width: 80px;
  height: 40px;
  left: 0px;
}
</style>
