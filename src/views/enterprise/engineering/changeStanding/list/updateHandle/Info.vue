<template>
  <div class="bg-white rounded-1 px-2 pt-1 pb-2">
    <div class="font-20 font-weight-bold mb-1 d-block">
      工程变更增减费用计算表
    </div>
    <table class="table-origin">
      <tr>
        <td colspan="2">工程名称</td>
        <td colspan="2">{{ info.organ }}</td>
        <td colspan="2">编号</td>
        <td colspan="2">{{ info.parameter_no }}</td>
        <td colspan="2">合同段</td>
        <td>{{ info.parameter_contract_period }}</td>
      </tr>
      <tr>
        <td colspan="2">桩号</td>
        <td colspan="2">{{ info.parameter_pile_no }}</td>
        <td colspan="2">工程名称</td>
        <td colspan="5">{{ info.parameter_name }}</td>
      </tr>
      <tr>
        <td>序号</td>
        <td>清单编号</td>
        <td>工程项目名称</td>
        <td>单位</td>
        <td>合同单价(元)</td>
        <td>新增单价(元)</td>
        <td>工程数量(原设计)</td>
        <td>工程数量(变更后)</td>
        <td>数量增减</td>
        <td>金额增减(元)</td>
        <td>附注</td>
      </tr>
      <template v-for="(itm, ind) in info.list">
        <tr :key="ind + 's'">
          <td>
            {{ ind + 1 }}
          </td>
          <td>
            {{ itm.parameter_detail_no }}
          </td>
          <td>
            {{ itm.parameter_detail_name }}
          </td>
          <td>
            {{ itm.parameter_detail_unit }}
          </td>
          <td>{{ itm.parameter_detail_contract_price }}</td>
          <td>{{ itm.parameter_detail_price }}</td>
          <td>{{ itm.parameter_detail_num }}</td>
          <td>{{ itm.parameter_detail_para_num }}</td>
          <td>
            {{ itm.parameter_detail_change_num }}
          </td>
          <td>{{ itm.parameter_detail_change_money }}</td>
          <td>{{ itm.parameter_detail_remark }}</td>
        </tr>
      </template>
      <tr v-if="info.list">
        <td>
          {{ info.list.length }}
        </td>
        <td>合计</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ info.parameter_money }}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>