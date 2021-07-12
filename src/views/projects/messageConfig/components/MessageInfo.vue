<template>
  <div v-if="showInfo">
    <div class="px-1">
      <nInfoItem
        :lable_width="90"
        :width="'32%'"
        :colorString="item.Colorfun ? item.Colorfun(showInfo[item.key]) : ''"
        :data="{
          name: item.name,
          value: item.fun ? item.fun(showInfo[item.key]) : showInfo[item.key],
          unit: item.unit
        }"
        :isPic="item.isPic"
        :islong="item.islong ? true : false"
        v-for="(item, index) in dataInfoList"
        :key="index"
      />
    </div>
    <div class="ml-1 mt-1 w-100 account-list rounded-1" v-for="(item, i) in showInfo.desc_list" :key="i">
      <nInfoItem
        :lable_width="90"
        :width="'32%'"
        :colorString="items.Colorfun ? items.Colorfun(item[items.key]) : ''"
        :data="{
          name: items.name,
          value: items.fun ? items.fun(item[items.key]) : item[items.key],
          unit: items.unit
        }"
        :isPic="items.isPic"
        :islong="items.islong ? true : false"
        v-for="(items, indexs) in dataInfoList2"
        :key="indexs"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showInfo: {
      type: Object,
      default: () => ({ desc_list: [] }),
      required: false
    }
  },
  data() {
    return {
      dataInfoList2: [
        {
          name: '来源项目',
          key: 'organ_list',
          fun: val => {
            return val ? val.map(organ => organ.organ).join(',') : '全部项目';
          }
        },
        {
          name: '接收对象',
          key: 'account_list',
          fun: val => {
            return val ? val.map(account => account.account_name).join(',') : '所有人员';
          }
        }
      ],
      dataInfoList: [
        { name: '所属模块', key: 'module_chn' },
        {
          name: '消息类型',
          key: 'msg_type',
          fun: val => {
            return ['', '通知', '待办'][val];
          }
        },
        {
          name: '消息名称',
          key: 'msg_config'
        },
        {
          name: '消息状态',
          key: 'msg_config_status',
          fun: val => {
            return ['', '关闭', '启用'][val];
          }
        },
        {
          name: '推送内容',
          key: 'msg_config_content',
          islong: true
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.detail-item .detail-label {
  width: 100px;
  text-align: left;
}
.account-list {
  margin-left: 0;
  padding: 5px 10px;
  background: $greybg !important;
}
</style>
