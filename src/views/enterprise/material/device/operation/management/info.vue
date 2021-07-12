<!--
 * @Autor: 邓易
 * @Date: 2020-12-16 14:38:31
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-28 17:46:51
-->
<template>
  <div class="w-100 h-100 ">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'设备维养详情'" />
    </div>
    <div class="summary-box w-100 rounded-1 bg-white d-flex align-items-center">
      <div class="text-white  summary-title">累计汇总</div>
      <div class="ml-10 summary-content">
        <div>累计维修金额（元）</div>
        <div class="mt-05 text-hover-danger mr-3">
          {{ moneyInfo.approach_maintenance_a_money ? moneyInfo.approach_maintenance_a_money : "0.00" }}
        </div>
      </div>
      <div class="ml-10 summary-content">
        <div>累计保养金额（元）</div>
        <div class="mt-05 text-hover-danger mr-3">
          {{ moneyInfo.approach_maintenance_b_money ? moneyInfo.approach_maintenance_b_money : "0.00" }}
        </div>
      </div>

      <div class="ml-10 summary-content">
        <div>累计其他消费金额（元）</div>
        <div class="mt-05 text-hover-danger mr-3">
          {{ moneyInfo.approach_maintenance_other_money ? moneyInfo.approach_maintenance_other_money : "0.00" }}
        </div>
      </div>
    </div>
    <div class="w-100 rounded-1 bg-white mt-2" style="height:calc(100% - 160px)">
      <n-scroll>
        <nInfoItem
          :lable_width="100"
          width="24%"
          :class="[index == 0 ? 'mt-2' : '']"
          :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
          :data="{
            name: item.name,
            value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
            unit: item.unit,
          }"
          :islong="item.islong ? true : false"
          v-for="(item, index) in dataInfoList"
          :key="index + 'a'"
        />
        <div class="content-box rounded-1 position-relative ml-2 mb-2" v-for="(items, index) in list" :key="index">
          <div class="state-box position-absolute text-white font-14 cursor-p ">
            {{ ["", "保养", "维修"][items.approach_maintenance_type] }}
          </div>
          <div class="edit-box position-absolute" v-if="$route.showEdit">
            <i
              v-permission="['ApproachMaintenance-update']"
              class="iconfont btn-btn_list_edit cursor-p text-white font-20"
              @click.stop="handleAdd(items.approach_maintenance_id)"
            ></i>
          </div>

          <nInfoItem
            :lable_width="100"
            width="31%"
            :class="[index == 0 ? 'mt-2' : '']"
            :colorString="item.Colorfun ? item.Colorfun(items[item.key]) : ''"
            :data="{
              name: item.name,
              value: item.fun ? item.fun(items) : items[item.key],
              unit: item.unit,
            }"
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList1"
            :key="index + 'b'"
          />
          <nPicInfo :picList="items.pic_list" />
          <nFileInfo :fileList="items.file_list" />
        </div>
      </n-scroll>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      dataInfoList: [
        { name: "工程项目", key: "organ_area" },
        {
          name: "设备类型",
          key: "approach_equip_type",
          fun: val => {
            return ["", "普通设备", "特种设备"][val];
          },
        },
        { name: "设备名称", key: "approach_name" },
        { name: "设备品牌", key: "approach_brand" },
        { name: "设备型号", key: "approach_spec" },
        { name: "设备编号", key: "approach_no" },
        { name: "进场时间", key: "approach_start_time" },
        { name: "当前负责人", key: "account_name" },
      ],
      dataInfoList1: [
        {
          name: "维养时间",
          fun: val => {
            return `${val.approach_maintenance_start_date}~${val.approach_maintenance_end_date}`;
          },
        },
        { name: "维养人", key: "approach_maintenance_account" },
        { name: "下次维养时间", key: "approach_maintenance_last_date" },
        { name: "维养费用", key: "approach_maintenance_money" },
        { name: "其他消耗费用", key: "approach_maintenance_other_money" },
        { name: "维养内容", key: "approach_maintenance_content" },
      ],
      infoData: {},
      moneyInfo: {},
      list: [],
    };
  },

  async created() {
    let approach_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.QueryMaintenance(approach_id);
    this.QueryMoney(approach_id);
  },
  methods: {
    handleAdd(id) {
      this.linkTo("enterprise_material_device_operation_management_handle", { id: id });
    },
    async QueryMaintenance(id) {
      let res = await api.QueryApproachMaintenance({ approach_id: id });
      this.infoData = res.result[0];
      this.list = res.result[0].lists;
    },
    async QueryMoney(id) {
      let res = await api.QueryApproachMaintenanceMoney({ maintenance_approach_id_un: id });
      this.moneyInfo = res.result[0] ? res.result[0] : {};
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>

<style lang="scss" scoped>
.warning {
  left: 10px;
  bottom: 10px;
}
.form-item-long-small {
  width: 24%;
}

.content-box {
  width: 60%;
  background: #eef1fb;
  .state-box {
    right: 0;
    top: 0;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background: #ff8a21;
    padding: 6px 30px;
  }
  .edit-box {
    right: 0;
    bottom: 0;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #ff8a21;
    padding: 6px;
  }
}
</style>
