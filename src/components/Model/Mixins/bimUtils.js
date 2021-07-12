import config from '@/common/config';
import api from '@api';
export default {
  data() {
    return {
      organNode: String(this.$organ_id_en_or_pro(this)),
      gameInstance: null,
      UnityAllReady: null,
      screenWidth: '',
      screenHeight: '',
      isLoading: false,
      widthset: 0,
      loadTime: null,
      projectList: [],
      advanced: false,
      is_resize: null,
      old_node: null,
      isBeamShow: false
    };
  },
  methods: {
    /**
     * 设置当前bim的运行环境
     */
    settingServer() {
      APIUtility.SendCommand(APIUtility.APICommand.SettingServer, config.baseUrl, this);
    },
    /**
     * 设置 bim请求资源的参数
     */
    async initializeSuccees() {
      // 获取 单位工程列表
      this.getProjectList();
    },
    /**
     * 获取项目列表
     */
    async getProjectList() {
      let { result } = await api.queryProjectInfoProject({
        organ_node: this.$organ_id_en_or_pro(this),
        page: -1
      });
      this.projectList = result.filter(item => item.project_config_gis);
      if (this.projectList.length == 0) {
        this.$tip({
          isTip: true,
          message: '请初始化项目的bim名称'
        });
        return;
      }
      setTimeout(() => {
        this.$refs.projectList.init();
      });
    },
    /**
     * 切换项目
     * @param {Object} project
     */
    setProject(project) {
      let userid = this.$store.getters.token;
      this.organNode = String(project.organ_id_union);
      if (this.organNode == this.old_node) {
        return;
      } else {
        this.old_node = this.organNode;
      }
      var info = {
        userid: userid,
        platform: 2,
        config_gis: project.project_config_gis,
        organ_node: project.organ_id_union
      };
      APIUtility.SendCommand(APIUtility.APICommand.SetUserData, JSON.stringify(info), this);
      this.prohibitInput();
    },
    /**
     * bim 初始化完成，进入全线还是进入 超前地质
     */
    bimCompeleted() {
      this.UnityAllReady = true;
      if (this.isAdvancedGeology) {
        this.$bus.$emit('advancedSwicth');
      } else if (this.isField) {
        let beam = this.$refs.projectList.beam;
        if (beam[0]) {
          APIUtility.SendCommand(APIUtility.APICommand.InitializeBIMBeam, beam[0].unit_project_tag, this);
        } else {
          this.$tip({
            isTip: true,
            message: `暂无梁场信息`
          });
          setTimeout(() => {
            this.$router.go(-1);
          });
        }
      } else {
        APIUtility.SendCommand(APIUtility.APICommand.InitializeGIS, 0, this);
      }
    },
    InitTunnelPrediction() {
      if (this.isAdvancedGeology) {
        this.$bus.$emit('advancedSwicthEnd');
      }
    },
    /**
     * 适应大小
     */
    resize() {
      if (!this.gameInstance) {
        return;
      }
      if (this.is_resize) {
        clearTimeout(this.is_resize);
        this.is_resize = null;
      }
      if (!this.is_resize) {
        this.is_resize = setTimeout(() => {
          var width = $('#gameContainer').width();
          var height = $('#gameContainer').height();
          if (this.screenWidth == width && this.screenHeight == height) {
            this.is_resize = null;
            return;
          }
          this.screenWidth = width;
          this.screenHeight = height;
          APIUtility.SendCommand(
            APIUtility.APICommand.ChangeScreenResolution,
            Math.ceil(width) + '#@' + Math.ceil(height),
            this
          );
          this.is_resize = null;
        }, 500);
      }
    },
    /**
     * 加载动画
     */
    load_animation() {
      this.isLoading = true;
      let intervalT = 240;
      let step = parseInt(Math.random() * 5 + 1, 10);
      if (this.widthset < 89) {
        if (this.UnityAllReady) {
          intervalT = 10;
        } else {
          intervalT = 240;
        }
        this.widthset = this.widthset + step;
      } else {
        //进度条在89%左右开始每次+1
        step = 1;
        if (this.UnityAllReady) {
          intervalT = 10;
        } else {
          //如果进度条到了89%还是没有收到加载好的信息，就不再继续增加长度了， 一直等到收到unity的反馈。
          step = 0;
        }
        if (this.widthset == 100) {
          clearTimeout(this.loadTime);
          this.isLoading = false;
          this.widthset = 0;
          return false;
        }
        this.widthset = this.widthset + step;
        this.loadTime = setTimeout(this.load_animation, intervalT);
        return false;
      }
      this.loadTime = setTimeout(this.load_animation, intervalT);
    }
  }
};
