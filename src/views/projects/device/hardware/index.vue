<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="'设备 详情'"
      :diaWidth="'50%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <el-scrollbar :native="false" class="w-100">
          <div class="clear p-2 mb-2 w-100">
            <div style="width: 42%" class="float-left">
              <img
                :src="item.url"
                class="w-100 mb-1 br-1"
                v-for="(item, index) in infoData.device_pic_list"
                :key="index"
              />
            </div>
            <div style="width: 52%" class="float-right">
              <div class="layer-title-blue2 position-relative mb-1">
                基础信息<span></span>
              </div>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">所属工区</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.organ }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">编号</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_serial }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">厂家</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_manufacturer }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">设备型号</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_model }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">进场时间</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_in_date }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">出场时间</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_out_date }}</span
                >
              </p>

              <div class="layer-title-blue2 position-relative mb-1">
                操作人信息<span></span>
              </div>
              <div class="detail-item mb-1 detail-item-long">
                <span class="detail-label">操作人</span><span>：</span>
                <div class="detail-value vtt d-inline-block detail-value-long">
                  <p
                    class="detail-value detail-value-long vtt disb mb-1"
                    style="display: block"
                    v-for="(itm, ind) in infoData.operator_list"
                    :key="ind"
                  >
                    {{ itm.account_name + "&emsp;&emsp;" + itm.account }}
                  </p>
                </div>
              </div>
              <div class="layer-title-blue2 position-relative mb-1">
                检养信息<span></span>
              </div>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">检养时间</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.maintain_check_time }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">检养人</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.maintain_checker }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">下次检养时间</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.device_next_check_time }}</span
                >
              </p>
              <p class="detail-item mb-1 detail-item-long">
                <span class="detail-label">检养内容</span><span>：</span
                ><span
                  class="detail-value detail-value-long vtt d-inline-block"
                  >{{ infoData.maintain_check_content }}</span
                >
              </p>
            </div>
          </div>
        </el-scrollbar>
      </template>
    </n-dialog>
    <div class="container-div">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">当前状态：</span>
            <el-select
              v-model="listQuery.hardware_state"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="运行" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
              <el-option label="异常" :value="3"></el-option>
              <el-option label="断网" :value="4"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">设备类型：</label>
            <el-select
              v-model="listQuery.hardware_type"
              placeholder="请选择"
              @change="changeType"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="深基坑" :value="1"></el-option>
              <el-option label="塔吊" :value="2"></el-option>
              <el-option label="烟感" :value="3"></el-option>
              <el-option label="环境" :value="4"></el-option>
              <el-option label="人脸闸机" :value="5"></el-option>
              <el-option label="用电" :value="6"></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">设备名称：</label>
            <el-select
              v-model="listQuery.hardware"
              placeholder="请选择"
              @change="refreshData"
            >
              <el-option label="全部" :value="''"></el-option>
              <el-option
                v-for="(item, index) in deviceArr"
                :key="index"
                :label="item.hardware"
                :value="item.hardware"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <label class="text-secondary">进场日期：</label>
            <el-date-picker
              @change="refreshData"
              class="el-date-picker-range-box"
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div>
          <n-button
            v-permission="['EquipmentHardware_TJSTC-upload']"
            :btnText="'新增'"
            class="ml-2"
            @buttonClick="handleUpdate"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_nav_export mr-1"></i>
            </template>
          </n-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        ><template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column label="设备类型" prop="hardware_type"
          >hardwareType
          <template slot-scope="scope">
            <span class="disi pd15">{{
              hardwareType[scope.row.hardware_type]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" prop="hardware"></el-table-column>
        <el-table-column
          label="厂家"
          prop="hardware_produce_unit"
        ></el-table-column>
        <el-table-column
          label="设备型号"
          prop="hardware_version"
        ></el-table-column>
        <el-table-column
          label="设备识别号"
          prop="hardware_imei"
        ></el-table-column>
        <el-table-column
          label="所在位置"
          prop="hardware_location"
        ></el-table-column>
        <el-table-column
          label="进场日期"
          prop="hardware_entrance"
        ></el-table-column>
        <el-table-column label="设备负责人">
          <template slot-scope="scope">
            <span
              class="disi pd15"
              v-for="(item, index) in scope.row.account_list"
              :key="index"
              >{{
                item.control_account_name +
                (index != scope.row.account_list.length - 1 ? "，" : "")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="hardware_state">
          <template slot-scope="scope">
            <span>{{ stateType[scope.row.hardware_state] }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否出场" prop="daily_inspection_account_name">
        <template slot-scope="scope">
          <span class="disi pd15"
            v-if="scope.row.device_out_date&&$utils.timeDiff(scope.row.device_out_date,$utils.getCurrentTime(),false)">已出场</span>
          <span class="disi pd15 grey3" v-else>未出场</span>
        </template>

      </el-table-column> -->
        <el-table-column label="禁用/启用" prop="hardware_state">
          <template slot-scope="scope">
            <el-switch
              v-permission="['EquipmentHardware_TJSTC-update']"
              @change="
                changeState(scope.row.hardware_id, scope.row.hardware_state)
              "
              :active-value="1"
              :inactive-value="2"
              v-model="scope.row.hardware_state"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-permission="['EquipmentHardware_TJSTC-update']"
              @click.stop="handleUpdate(scope.row)"
              class="iconfont btn-btn_list_edit edit-icon-btn"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      class="text-right bg-secondary"
      layout="prev, pager, next"
      :page-size="listQuery.page_size"
      @current-change="getList"
      :current-page.sync="currentPage"
      :total="totalcount"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  mixins: [table, confirm],
  data() {
    return {
      postURL: "queryEquipmentHardware",
      dateRange: [], //日期范围
      deleData: {},
      listQuery: {
        page: 0,
        page_size: 20,
        organ_node: this.$organ_id_en_or_pro(this),
        need_account: 1,
      }, //筛选条件
      infoData: {}, //详情
      hardwareType: ["", "深基坑", "塔吊", "烟感", "环境", "人脸闸机", "用电"],
      stateType: ["", "运行", "禁用", "异常", "断网"],
      deviceArr: [],
    };
  },
  created() {
    this.queryEquipmentName();
  },
  methods: {
    async changeState(id, state) {
      this.confirm(
        "",
        "",
        state == 2
          ? "请确认是否禁用该设备，禁用后将无法接收设备数据请慎重！！"
          : "请确认是否启用该设备？"
      )
        .then(async () => {
          let data = await api.updateEquipmentHardwareState({
            hardware_id: id,
            hardware_state: state == 1 ? 1 : 2,
          });
        })
        .catch(() => {
          this.getList();
        });
    },
    //设备名称
    async queryEquipmentName() {
      let data = await api.queryEquipmentHardware({
        organ_node: this.$organ_id_en_or_pro(this),
        hardware_type: this.listQuery.hardware_type,
      });
      this.deviceArr = data.result;
    },
    changeType() {
      this.listQuery.hardware = "";
      this.refreshData();
      this.queryEquipmentName();
    },
    // 编辑
    handleUpdate(row) {
      this.$router.linkTo(
        "project_device1_hardware_handle",
        row
          ? {
              id: row.hardware_id,
              device_type: 5,
            }
          : {
              device_type: 5,
            }
      );
    },
    // 筛选条件后重新请求数据
    refreshData() {
      if (this.dateRange) {
        this.listQuery.start_time = this.dateRange ? this.dateRange[0] : "";
        this.listQuery.end_time = this.dateRange ? this.dateRange[1] : "";
      } else {
        this.listQuery.start_time = "";
        this.listQuery.end_time = "";
      }
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
