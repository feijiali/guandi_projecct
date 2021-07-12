<template>
  <div class="w-100 d-flex h-100">
    <n-scroll>
      <div class="w-50">
        <nInfoTitle :title="'销假详情'" class="mb-1" />
        <div v-if="infoData.leave_cancel_mark == 1">
          <nInfoItem
            :colorString="
              item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
            "
            :data="{
              name: item.name,
              value: item.fun
                ? item.fun(infoData[item.key])
                : infoData[item.key],
              unit: item.unit,
            }"
            :lable_width="70"
            :islong="true"
            v-for="(item, index) in dataInfoList2"
            :key="index + 'lev'"
          />
          <nPicInfo :picList="infoData.cancel_pic_list" />
        </div>
        <nInfoTitle
          v-if="infoData.leave_cancel_mark == 1"
          :title="'请假详情'"
          class="mb-1 mt-2"
        />
        <nInfoItem
          :colorString="item.Colorfun ? item.Colorfun(infoData[item.key]) : ''"
          :data="{
            name: item.name,
            value: item.fun ? item.fun(infoData[item.key]) : infoData[item.key],
            unit: item.unit,
          }"
          :lable_width="70"
          :islong="true"
          v-for="(item, index) in dataInfoList"
          :key="index"
        />
        <nPicInfo :picList="infoData.pic_list" />
      </div>
      <div class="w-50">
        <nApprovalProcess
          :title="'销假'"
          style="width: 40%; min-width: 520px"
          class="ml-1"
          :reviseArr="process_list"
        />
      </div>
    </n-scroll>
  </div>
</template>

<script>
import api from "@/api/index";
import dayjs from "dayjs";
export default {
  data() {
    const appply_type = {
      1: "事假",
      2: "病假",
      3: "婚假",
      4: "产假",
      5: "工伤假",
      6: "䘮假",
      7: "公假",
      8: "年休假",
      9: "其他",
    };
    return {
      dataInfoList: [
        { name: "人员姓名", key: "sub_account_name" },
        {
          name: "请假类型",
          key: "leave_type",
          fun: (val) => {
            return appply_type[val];
          },
        },
        {
          name: "请假时间",
          key: "apply_time",
          fun: () => {
            return `${this.infoData.leave_start_date} ${this.infoData.leave_start_time}-${this.infoData.leave_end_date} ${this.infoData.leave_end_time}`;
          },
        },
        { name: "请假事由", key: "leave_reason" },
      ],
      dataInfoList2: [
        {
          name: "销假开始时间",
          key: "leave_cancel_start_date",
          fun: () => {
            return `${this.infoData.leave_cancel_start_date} ${this.infoData.leave_cancel_start_time}`;
          },
        },
        {
          name: "销假结束时间",
          key: "leave_cancel_end_date",
          fun: () => {
            return `${this.infoData.leave_cancel_end_date} ${this.infoData.leave_cancel_end_time}`;
          },
        },
        {
          name: "销假时长",
          key: "leave_cancel",
          fun: () => {
            let start = new Date(
              `${this.infoData.leave_cancel_start_date} ${this.infoData.leave_cancel_start_time}`
            ).getTime();
            let end = new Date(
              `${this.infoData.leave_cancel_end_date} ${this.infoData.leave_cancel_end_time}`
            ).getTime();
            return this.getTimefun(start, end);
          },
        },
        { name: "销假原因", key: "leave_cancel" },
      ],
      infoData: { file_list: [], pic_list: [] },
      isCancel: false, //是否是销假详情
      process_list: [], //审批流程数组
    };
  },
  methods: {
    infoDraftFun(data) {
      this.infoData = data;
    },
    async infoFun(id) {
      let { result } = await api.queryOALeaveCancel({
        leave_cancel_id: id,
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
        if (this.infoData.leave_cancel_mark == 1) {
          this.$emit("changeTitle", "销假申请详情");
        }
      }
      this.queryApproveReviseRecordWithProcess();
    },
    async queryApproveReviseRecordWithProcess() {
      let res = await api.queryApproveReviseRecordWithProcess({
        revise_info_id: this.infoData.leave_cancel_revise_id_union,
      });
      this.process_list = res.result;
    },
    getTimefun(start, end) {
      let usedTime = end - start; // 相差的毫秒数
      let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
      let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
      if (hours <= 0) {
        return minutes + "分";
      }

      if (days <= 0) {
        if (minutes <= 0) {
          return hours + "小时";
        }
        return hours + "小时" + minutes + "分";
      }
      return days + "天" + hours + "小时" + minutes + "分";
    },
  },
};
</script>

<style lang="scss" scoped>
.layer-info-img {
  height: 100px;
}
</style>
