<template>
  <vLeftPanel>
    <div class="select-top d-flex-cen el-form-box">
      <div class="search-show">
        <el-select
          placeholder="请选择"
          v-model="organ_node"
          @change="changeNode"
          v-if="projectList.length > 1"
        >
          <el-option
            v-for="(item, index) of projectList"
            :key="index + 'a'"
            :label="item.project"
            :value="item.organ_id"
          ></el-option>
        </el-select>
        <span v-else class="text-white">
          {{ projectList[0] ? projectList[0].project : "" }}
        </span>
      </div>
    </div>
    <div class="select-list">
      <vScroll>
        <ul>
          <template v-for="(item, index) in unit">
            <li
              v-if="item && item.unit_project_is_show == 1"
              @click="setActive(item)"
              class="d-flex justify-content-between px-2 py-2"
              :class="{
                active: active == item.unit_id + '-' + item.unit_proj_type,
              }"
              :key="index"
            >
              <span
                class="text-white flex-fill text-overflow-ellipsis"
                :title="item.unit_name"
                >{{ item.unit_name }}</span
              >
              <img v-if="item.unit_project_is_bim == 1" :src="bim_img" alt="" />
            </li>
          </template>
        </ul>
      </vScroll>
    </div>
  </vLeftPanel>
</template>

<script>
import api from "@/api";
import vScroll from "@/components/common/Scroll";
import { mapGetters } from "vuex";
import vLeftPanel from "../common/LeftPanel";
export default {
  props: {
    projectList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    ...mapGetters(["organID", "rootOrganID"]),
  },
  components: {
    vScroll,
    vLeftPanel,
  },
  data() {
    return {
      bim_img: require("../../images/icon_bim_tips.png"),
      unit: [],
      active: "",
      is_search: false,
      organ_node: null,
      project_unit_name: "",
      beam: [],
    };
  },
  async mounted() {},
  methods: {
    search() {
      this.project_unit_name = "";
      this.is_search = !this.is_search;
      if (!this.is_search) {
        this.getList();
      }
    },
    init() {
      // this.organ_node = this.$organ_id_en_or_pro(this);
      if (this.$store.getters.bim_select_organ) {
        this.organ_node = Number(this.$store.getters.bim_select_organ);
      }
      let ind = this.projectList.findIndex(
        (item) => item.organ_id_union == this.organ_node
      );
      // 设置选中第一个
      if (this.projectList.length >= 1 && ind == -1) {
        this.organ_node = Number(this.projectList[0].organ_id_union);
        ind = 0;
      }
      this.getList();
      this.$emit("setProject", this.projectList[ind]);
      this.$store.dispatch("app/set_bim_organ", this.organ_node);
    },
    changeNode() {
      let project = this.projectList.find(
        (item) => item.organ_id_union == this.organ_node
      );
      this.$store.dispatch("app/set_bim_organ", this.organ_node);
      this.$emit("setProject", project);
      this.getList();
    },
    // 获取单位工程列表
    async getList() {
      let { result } = await api.queryUnitUnion({
        organ_nodes: String(this.organ_node),
        page: -1,
      });
      this.unit = result ? result : [];
      this.beam = result.filter((item) => item.scene_type == 4);
    },
    // 设置当前选中单位工程
    setActive(item) {
      this.active = item.unit_id + "-" + item.unit_proj_type;
      // 拉近 选中的单位工程
      APIUtility.SendCommand(
        APIUtility.APICommand.FocusToTarget,
        item.unit_project_tag,
        this
      );
    },
  },
};
</script>

<style scoped lang="scss">
.select-list {
  background-color: rgba(12, 4, 105, 0.7);
  height: calc(100% - 80px);
  margin-top: 2px;

  ul {
    padding: 10px 5px;
    width: 300px;

    li {
      font-size: 18px;
      color: white;
      padding: 10px 5px;

      span {
        text-align: center;
      }
    }
  }
}

.select-top {
  position: relative;
  padding: 0 25px;
  background-color: rgba(12, 4, 105, 0.7);
  height: 80px;

  .el-icon-search,
  .el-icon-close {
    position: absolute;
    left: 5px;
    top: 5px;
    cursor: pointer;
    font-size: 20px;
    color: white;
  }
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 6px;
  font-size: 18px;
  background-color: rgba(156, 154, 191, 0.1);
  border-radius: 20px;

  .el-input-group__append {
    background: transparent;
    border: none;
  }
}

.active {
  background: linear-gradient(to right, #fd7e5a, #9632f2);
}
</style>
<style lang="scss">
.search-input {
  .el-input-group__append {
    background: transparent;
    padding: 0 10px;
    border: none;
    color: white;
  }
}

.select-top {
  .el-select {
    width: 100%;
    background-color: rgba(156, 154, 191, 0.1);
    border-radius: 20px;
  }

  .el-input {
    input {
      color: white;
      background-color: transparent;
      border-color: transparent;
      font-size: 18px;
      text-align: center;
      border: none;
    }
  }

  .el-select .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner,
  .el-textarea__inner:focus {
    border: none !important;
  }

  .el-input__suffix {
    .el-icon-arrow-up:before {
      color: white !important;
    }
  }
}
</style>
