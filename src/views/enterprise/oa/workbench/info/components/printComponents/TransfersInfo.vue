<template>
  <div class="w-100" v-if="infoData.organ">
    <nInfoItem
      :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
      :data="{
        name: item.fun_name ? item.fun_name() : item.name,
        value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
        unit: item.unit,
      }"
      :lable_width="90"
      :width="'25%'"
      :islong="item.islong"
      v-for="(item, index) in dataInfoList"
      :key="index"
    />
    <div class="d-flex flex-column pl-1">
      <el-table
        :data="infoData.details_list"
        style="width: 100%"
        height="calc(100% - 80px)"
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="80">
          <template slot-scope="scope">
            <label>{{ scope.$index + 1 }}</label>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          prop="allocation_detail_date"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="allocation_detail_name"
        ></el-table-column>
        <el-table-column
          label="规格型号"
          prop="allocation_detail_spec"
        ></el-table-column>
        <el-table-column
          label="单位"
          prop="allocation_detail_unit"
        ></el-table-column>
        <el-table-column
          label="数量"
          prop="allocation_detail_num"
        ></el-table-column>
        <el-table-column
          label="调出金额(元)"
          prop="allocation_detail_money"
        ></el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <label>{{ scope.row.allocation_detail_remark || "--" }}</label>
          </template>
        </el-table-column>
      </el-table>
      <span class="main font-weight-bold mt-2"
        >发料总金额：{{ infoData.allocation_total_money }}元</span
      >
      <label class="mt-2">
        <span class="detail-item">备注：</span>
        <span>{{ infoData.allocation_remark }}</span>
      </label>
    </div>
    <label class="d-inline-block mt-2">
      <span class="detail-item">备注说明：</span>
      <span
        >调拨数量以调出单位的实际调出数量为准，收料单位应指派人员现场考察，若未参与，视为认可。</span
      >
    </label>
    <template v-if="isFilePrint && infoData.pics_list.length">
      <div style="page-break-after: always"></div>
      <div class="d-flex justify-content-between flex-wrap">
        <div style="page-break-after: always">
          <img
            style="width: 100%"
            class="mb-1 d-block"
            v-for="(item, index) in infoData.pics_list"
            :key="index"
            :src="item.url"
          />
        </div>
      </div>
      <p style="page-break-after: always"></p>
      <nFileInfo :fileList="infoData.files_list" />
      <p style="page-break-after: always"></p>
    </template>
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
    return {
      dataInfoList: [
        { name: "调出单位", islong: true, key: "organ" },
        { name: "调入单位", islong: true, key: "receive_organ" },
        {
          name: "发料日期",
          islong: false,
          key: "allocation_date",
          fun: (val) => {
            return val ? this.$utils.formatDate(val) : "";
          },
        },
        { name: "发料人", islong: false, key: "allocation_account_name" },
        {
          name: "收料日期",
          islong: false,
          key: "allocation_receive_date",
          fun: (val) => {
            return val ? this.$utils.formatDate(val) : "";
          },
        },
        {
          name: "收料人",
          islong: false,
          key: "allocation_receive_account_name",
        },
        {
          name: "发料内容",
          islong: true,
          key: "allocation_type",
          fun: (val) => {
            return val == 1
              ? `材料类(${this.infoData.details_list.length}种)`
              : `设备类(${this.infoData.details_list.length}种)`;
          },
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
</style>
