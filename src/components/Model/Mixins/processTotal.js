import api from '@api';
import { TimelineItem } from 'element-ui';
export default {
  data() {
    return {
      bridge_types: {
        '1': '桩基',
        '2': '系梁',
        '3': '承台',
        '4': '墩柱',
        '5': '盖梁',
        '6': '台身',
        '7': '现浇段',
        '8': '预制梁',
        '9': '钢箱梁',
        '10': '耳背墙',
        '11': '台帽',
        '12': '扩大基础',
        '13': '湿接缝',
        '14': '预制板',
        '15': '斜拉索',
        '16': '拱圈',
        '17': '牛腿背墙',
        '18': '肋板',
        '19': '架梁',
        '20': '桥面系'
      },
      bridge_units: {
        '0': '',
        '1': '根',
        '2': '根',
        '3': '座',
        '4': '根',
        '5': '根',
        '6': '座',
        '7': '段',
        '8': '片',
        '9': '跨',
        '10': '个',
        '11': '个',
        '12': '座',
        '13': '跨',
        '14': '片',
        '15': '组',
        '16': '段',
        '17': '个',
        '18': '个',
        '19': '片',
        '20': '㎡'
      },
      tunnel_types: {
        '1': '全断面',
        '2': '上台阶',
        '3': '上台阶左侧',
        '4': '上台阶右侧',
        '5': '中台阶',
        '6': '中台阶左侧',
        '7': '中台阶右侧',
        '8': '下台阶',
        '9': '下台阶左侧',
        '10': '下台阶右侧',
        '11': '二衬',
        '12': '仰拱',
        '13': '回填',
        '14': '整平层',
        '15': '中央排水沟',
        '16': '电缆沟',
        '17': '初支',
        '18': '',
        '19': '',
        '20': '防水层',
        '21': '路面'
      },
      progressList: [
        // {
        //   title: '隧道总进度',
        //   color: blue_libg,
        //   percentage: '0',
        //   data: [],
        //   icon: require('../images/icon_bim_map_tunnel.png')
        // },
        // {
        //   title: '桥梁总进度',
        //   color: pink_libg,
        //   percentage: '0',
        //   data: [],
        //   icon: require('../images/icon_bim_map_bridge.png')
        // }
        // {
        //   title: '梁场总进度',
        //   color: orage_libg,
        //   percentage: '20',
        //   data: [],
        //   icon: require('../images/icon_bim_map_yard.png')
        // },
        // {
        //   title: '路基总进度',
        //   color: cyan_libg,
        //   percentage: '20',
        //   data: [],
        //   icon: require('../images/icon_bim_map_road.png')
        // }
      ]
    };
  },
  methods: {
    getTotalAll() {
      return api
        .queryUnitUnionProcess({
          organ_nodes: this.organNode
        })
        .then(({ result }) => {
          let info = result;
          this.progressList = info.map(item => ({
            ...item,
            ration: Number(item.ration.toFixed(2))
          }));
        });
    },
    // 隧道统计
    getTunnelTotal() {
      // organNode 来自 bimUtils
      return api
        .tunnelProgressProject({
          organ_node: this.organNode
        })
        .then(({ result }) => {
          if (result[0]) {
            let info = result[0];
            this.$set(this.progressList[0], 'percentage', info.ration);
            let list = info.balance.map(item => ({
              name: item.tunnel_build_name,
              plan: item.plan_length,
              unit: 'm',
              finish: item.build_length
            }));

            this.$set(this.progressList[0], 'data', list);
          }
        });
    },
    // 桥梁统计
    getBridgeTotal() {
      return api
        .bridgeProgressProject({
          organ_nodes: this.organNode
        })
        .then(({ result }) => {
          if (result[0]) {
            let info = result[0];
            this.$set(this.progressList[1], 'percentage', info.ration);
            let list = info.balance.map(item => ({
              name: item.bridge_build_name,
              plan: item.plan_number,
              unit: this.bridge_units[item.build_type],
              finish: item.build_number
            }));

            this.$set(this.progressList[1], 'data', list);
          }
        });
    }
  }
};
