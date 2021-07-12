import api from '@/api';
export default {
  methods: {
    //查询围岩等级
    getRockFun() {
      api.queryTunnelRockType({}).then(res => {
        this.rockArr = res.result;
      });
    },
    changeNode() {
      // this.unit_id_un = null;
      this.ruleform.predict_sub_unit_id_un = null;
      this.getSubUnitList(true);
    },
    // changeUnit() {
    //   this.ruleform.predict_sub_unit_id_un = null;
    //   this.getSubUnitList(true);
    // },
    // 获取项目工程
    async getProjectList() {
      let { result } = await api.queryProjectInfoProject({
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1
      });
      this.projectList = result;
    },
    // // 获取单位工程
    // getUnitList(flag) {
    //   api
    //     .queryTunnelUnitProj({
    //       organ_node: this.ruleform.predict_organ_id_un,
    //       page: -1
    //     })
    //     .then(({ result }) => {
    //       this.unitList = result;
    //       if (flag && result[0]) {
    //         this.unit_id_un = result[0].unit_proj_id;
    //         this.getSubUnitList(flag);
    //       }
    //     });
    // },
    // 获取子单位工程
    getSubUnitList(flag) {
      return api
        .queryTunnelSubUnit({
          organ_node: this.ruleform.predict_organ_id_un,
          page: -1
        })
        .then(({ result }) => {
          this.subUnitList = result;
          if (flag && result[0]) {
            this.ruleform.predict_sub_unit_id_un = result[0].sub_unit_id;
            this.setPlie(result[0].sub_unit_id);
          }
        });
    },
    //查询地址灾害
    getDisasters() {
      api.queryTunnelGeologyPredictDisasterList({}).then(res => {
        this.disasterArr = res.result.map(item => item.disaster);
        this.disasterArr.push('其它');
      });
    }
  }
};
