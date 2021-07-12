<template>
  <div class="w-100 h-100 pt-1 clear">
    <div class="content-info-box h-100 position-relative">
      <div
        class="
          content-info-box-left
          bg-white
          rounded-1
          h-100
          p-1
          position-relative
          d-flex
          flex-column
        "
      >
        <div class="d-inline-block">
          <span class="grey2">工区：</span>
          <el-select
            v-model="listQuery.organ_node"
            placeholder=""
            @change="refreshData"
            style="width: 90px"
          >
            <el-option :value="organID" :label="'全部'">全部</el-option>
            <el-option
              v-for="item in work_areas"
              :key="item.organ_id"
              :value="item.organ_id"
              :label="
                item.organ_parent_node_name
                  .split(',')
                  .slice(1, item.organ_parent_node_name.split(',').length)
                  .join('/')
              "
            >
              {{
                item.organ_parent_node_name
                  .split(",")
                  .slice(1, item.organ_parent_node_name.split(",").length)
                  .join("/")
              }}
            </el-option>
          </el-select>
        </div>
        <div class="font-weight-bold mt-1">漏电保护器预警</div>
        <div style="height: calc(100% - 120px)" class="mt-1">
          <div class="top-select-box" style="padding: 0">
            <div>
              <div class="d-inline-block" v-if="listQuery.delivery_type != 3">
                <span class="grey2">日期：</span>
                <el-date-picker
                  :clearable="false"
                  class="el-date-editor-m"
                  @change="refreshData"
                  v-model="listQuery.leakage_protect_caveat_time"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择"
                />
              </div>
              <div class="d-inline-block mt-2">
                <span class="grey2">状态：</span>
                <el-select
                  v-model="listQuery.leakage_protect_caveat_type"
                  placeholder="请选择"
                  @change="refreshData"
                >
                  <el-option :value="1" label="预警"></el-option>
                  <el-option :value="2" label="告警"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <n-scroll
            style="height: calc(100% - 150px)"
            class="mt-2"
            v-if="tableData.length > 0"
          >
            <template v-for="(item, i) in tableData">
              <div
                :key="i"
                class="pb-1 position-relative cursor-p"
                :class="{ 'border-bottom': i != tableData.length - 1 }"
                @click="rowclick(item)"
              >
                <div class="title font-weight-bold mt-1">
                  {{ item.leakage_protect_device_name }}-{{
                    item.leakage_protect_code
                  }}
                </div>
                <div class="mt-05">
                  所在位置：{{ item.leakage_protect_location }}
                </div>
                <div class="mt-05">
                  异常时间：{{ item.leakage_protect_caveat_time }}
                </div>
                <nStatusButton
                  class="list-item-label"
                  :changeColor="
                    item.leakage_protect_caveat_type == 1
                      ? '#fdb855'
                      : '#fd5571'
                  "
                  :btnText="item.leakage_protect_caveat_type_code_string"
                />
              </div>
            </template>
          </n-scroll>
          <n-nodata
            v-if="tableData.length == 0"
            style="margin-top: 50px"
          ></n-nodata>
        </div>
        <el-pagination
          background
          class="text-right"
          layout="prev, pager, next"
          :page-size="listQuery.page_size"
          @current-change="getList"
          :current-page.sync="currentPage"
          :total="totalcount"
        ></el-pagination>
      </div>
      <div
        class="
          content-info-box-right
          rounded-1
          h-100
          flex-column
          d-flex
          justify-content-between
        "
      >
        <div
          class="right-item-box flex-fill mb-1"
          v-permission="['IoTLeakageProtectCaveat']"
        >
          <waringBar ref="waringBar" :work_areas="work_areas" />
        </div>
        <div
          class="right-item-box flex-fill mb-1"
          v-permission="['IoTLeakageProtectCaveat']"
        >
          <currentLine ref="currentLine" :work_areas="work_areas" />
        </div>
        <div
          class="right-item-box flex-fill"
          v-permission="['IoTLeakageProtectCaveat']"
        >
          <temperatureLine ref="temperatureLine" :work_areas="work_areas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import currentLine from "./OPChart/currentLine";
import temperatureLine from "./OPChart/temperatureLine";
import waringBar from "./OPChart/waringBar";
export default {
  mixins: [table, confirm],
  components: {
    currentLine,
    temperatureLine,
    waringBar,
  },
  data() {
    return {
      postURL: "queryIoTLeakageProtectCaveat",
      listQuery: {
        page: 1,
        page_size: 20,
        leakage_protect_caveat_type: null,
        leakage_protect_caveat_time: this.$utils.getCurrentTime(),
        organ_node: this.$organ_id_en_or_pro(this),
      },
      first_list: true,
      work_areas: [],
      organID: this.$organ_id_en_or_pro(this),
    };
  },
  async activated() {
    let flag = sessionStorage.getItem("refresh");
    if (flag) {
      this.$refs.waringBar.getCaveats();
      this.$refs.currentLine.getCaveats();
      this.$refs.temperatureLine.getCaveats();
      sessionStorage.removeItem("refresh");
    }
  },
  async created() {
    this.queryWorkArea();
  },
  methods: {
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
    rowclick(row) {
      this.$router.linkTo(
        "enterprise_safety3_safeManage_operation_acquisitionInfo",
        {
          leakage_protect_id: row.leakage_protect_id,
          code: row.leakage_protect_code,
        }
      );
    },
    // 获取工区
    async queryWorkArea() {
      let res = await api.queryOrgan({
        organ_node: this.$organ_id_en_or_pro(this),
        organ_type: 50,
      });
      this.work_areas = res.result;
      this.listQuery.organ_node = this.$organ_id_en_or_pro(this);
      this.refreshData();
    },
  },
};
</script>

<style lang="scss" scoped>
.content-info-box {
  .content-info-box-left {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 400px;
  }

  .content-info-box-right {
    position: absolute;
    left: 410px;
    right: 0;
    bottom: 0;
    top: 0;
    .right-item-box {
      background-color: white;
      border-radius: 10px;
      padding: 0 10px 10px 10px;
    }
  }
  .list-item-label {
    position: absolute;
    top: 10px;
    right: 10px;
    &.color-2 {
      color: #ff86cd;
      background: #ffebf7;
    }
    &.color-1 {
      color: #ffc578;
      background: #fff7ed;
    }
  }
}
</style>
