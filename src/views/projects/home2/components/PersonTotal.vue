<template>
  <div class="position-relative h-100 w-100 d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-between mb-1 clear" style="height:48.2%;">
      <div class="bg-white d-flex justify-content-between position-relative rounded flex-fill w-50">
        <img class="per-img" src="@/assets/images/bg_home_01.png" />
        <div class="position-absolute per-right-box">
          <p>管理人员</p>
          <div class="vertical-middle d-inline-block ml-1 mt-1">
            <span class="font-30 font-weight-bold">{{ staff_count }}</span
            >人
          </div>
        </div>
      </div>
      <div class="bg-white d-flex justify-content-between position-relative rounded flex-fill ml-1 w-50">
        <img class="per-img" src="@/assets/images/bg_home_02.png" />
        <div class="position-absolute per-right-box">
          <p>施工人员</p>
          <div class="vertical-middle d-inline-block ml-1 mt-1">
            <span class="font-30 font-weight-bold">{{ worker_count }}</span
            >人
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between clear" style="height:48.2%;">
      <div class="bg-white d-flex justify-content-between position-relative rounded flex-fill w-50">
        <img class="per-img" src="@/assets/images/bg_home_03.png" />
        <div class="position-absolute per-right-box">
          <p>自有设备</p>
          <div class="vertical-middle d-inline-block ml-1 mt-1">
            <span class="font-30 font-weight-bold">{{ equip_own }}</span
            >台
          </div>
        </div>
      </div>
      <div class="bg-white d-flex justify-content-between position-relative rounded flex-fill ml-1 w-50">
        <img class="per-img" src="@/assets/images/bg_home_04.png" />
        <div class="position-absolute per-right-box">
          <p>租赁设备</p>
          <div class="vertical-middle d-inline-block ml-1 mt-1">
            <span class="font-30 font-weight-bold">{{ equip_rent }}</span
            >台
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      staff_count: 0,
      worker_count: 0,
      equip_own: 0,
      equip_rent: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getData();
    }, 60);
  },
  methods: {
    getData() {
      api
        .queryAccountStat({
          organ_node: this.$organ_id_en_or_pro(this),
          advice: 2,
        })
        .then(res => {
          this.staff_count = res.result[0].staff_count;
          this.worker_count = res.result[0].worker_count;
        });
      api
        .QueryEquipmentStat({
          organ_node: this.$organ_id_en_or_pro(this),
        })
        .then(res => {
          this.equip_own = res.result[0] ? res.result[0].count_stand : 0;
          this.equip_rent = res.result[0] ? res.result[0].count_book : 0;
        });
    },
    changeDate(val) {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.per-img {
  height: 100%;
}
.per-right-box {
  left: 50%;
  top: 20%;
}
.chart-item {
  left: 10px;
  right: 10px;
  position: absolute;
  top: 35px;
  bottom: 0;
}

.legendgreen1 {
  background: linear-gradient(to bottom, #67b6fd, #5a5efd);
}

.legendgreen2 {
  background: linear-gradient(to bottom, #ffe99d, #f8971f);
}
</style>
