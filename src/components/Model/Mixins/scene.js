export default {
  data() {
    return {
      isTunnelShow: false,
      isBridgeShow: false
    };
  },
  methods: {
    // 返回全线
    backToGis(flag) {
      if (flag) {
        if (this.$route.name != 'project_bim' && this.$route.name != 'enterprise_engineering_bim') {
          this.$router.linkTo('enterprise_engineering_bim');
        }
      } else {
        APIUtility.SendCommand(APIUtility.APICommand.BackToGis, '', this);
      }
      this.isBridgeShow = false;
      this.isTunnelShow = false;
    },
    ShowBedDetail(data) {
      let obj = JSON.parse(data);
      let bedType = obj.bedType;
      let bz_num =
        obj[['', 'daily_progress_info_bz_num', 'daily_progress_info_lm_num', 'daily_progress_info_cl_num'][bedType]];
      this.$router.linkTo('enterprise_beamField_qrcode', { bedType, bz_num });
    },
    InitializeBIMBeam(data) {
      let beam = this.$refs.projectList.beam;
      let num = Number(data);
      this.$refs.beamPanel.init(num, beam);
      this.isBeamShow = true;
    },
    inspectionInfo(data) {
      // 安全检查和质量检查的详情:0 安全 1： 质量
      // let ins_id = parseInt(data[1]);
      // this.inspectionType = data[0];
      // if (this.inspectionType != 0) {
      //   this.$refs.qualityIns.showDialog(ins_id);
      // } else {
      //   this.$refs.safeIns.showDialog(ins_id);
      // }
    },
    // 进入桥梁场景的回调
    bridgeCompleted(data) {
      if (!this.isBridgeShow) {
        this.$refs.bridgePanel.$refs.log.eyeOn = false;
        this.$refs.bridgePanel.initPanel(parseInt(data[1]));
      } else {
        this.$refs.bridgePanel.cameraSwitch();
      }
      this.isBridgeShow = true;
      this.is_all_line = false;
    }, // 进入隧道场景的回调
    tunnelCompleted(data) {
      if (!this.isTunnelShow) {
        this.$refs.tunnelPanel.initPanel(Number(data[1]), Number(data[2]));
      }
      this.isTunnelShow = true;
      this.is_all_line = false;
    },
    tunnelTerrainSwitchOn(data) {
      if (this.$refs.tunnelPanel) {
        this.$refs.tunnelPanel.$refs.log.eyeOn = data == 1 ? false : true;
      } else {
        this.$nexTick(() => {
          this.$refs.tunnelPanel.$refs.log.eyeOn = data == 1 ? false : true;
        });
      }
    },
    changePrediction(data) {
      if (this.isAdvancedGeology) {
        this.$bus.$emit('changePrediction', Number(data));
      }
    }
  }
};
