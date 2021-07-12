<template>
  <div class="container-all">
    <div class="container-div-s nested-table">
      <div class="top-select-box">
        <div>
          <div class="d-inline-block">
            <span class="grey2">子单位工程：</span>
            <el-select
              v-model="listQuery.sub_unit_id"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option
                :label="item.sub_unit_name"
                :value="item.sub_unit_id"
                v-for="item in unitData"
                :key="item.sub_unit_id"
              ></el-option>
            </el-select>
          </div>
          <div class="d-inline-block ml-2">
            <span class="grey2">部位类型：</span>
            <el-select
              v-model="listQuery.qtti_build_type"
              @change="refreshData"
              placeholder="请选择"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="(item, i) in materialArr"
                :key="i"
                :label="item.qtti_build_type_string"
                :value="item.qtti_build_type"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="d-inline-block">
            <n-button
              :btnText="'导入'"
              v-permission="['BridgeUnitProject-import']"
              @buttonClick="
                $router.linkTo(
                  'project_projectsInfo_bridge_unitQuantity_handle'
                )
              "
            >
              <template v-slot:button-slot>
                <i class="iconfont btn-btn_nav_import mr-1"></i>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 80px)"
        border
      >
        <template slot="empty">
          <span>真是不巧，暂时没有数据呢~</span>
        </template>
        <el-table-column prop="index" label="序号" width="100">
          <template slot-scope="scope">
            <label>
              {{ scope.$index + 1 }}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          label="子单位工程"
          prop="sub_unit_name"
        ></el-table-column>
        <el-table-column label="部位">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div
                class="card-item"
                v-for="(item, index) of row.type_list"
                :key="index"
                :style="item.num_list | computeNum"
              >
                {{ item.qtti_build_type_name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="构件编号">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div
                    class="card-item"
                    v-for="(ele, i) of item.num_list"
                    :key="i"
                    :style="{
                      height: 40 * ele.item_list.length + 'px',
                      lineHeight: 40 * ele.item_list.length + 'px',
                    }"
                  >
                    {{ ele.qtti_build_type_num }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="细目编号">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_num }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" width="200">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_unit }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_price }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_counts }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="延米量">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_metres }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="材料名称">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_material }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格型号">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_material_spec }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="设计量">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_design }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="高度/面积">
          <template slot-scope="{ row }">
            <div v-if="row.type_list">
              <div class="" v-for="(item, index) of row.type_list" :key="index">
                <div v-if="item.num_list">
                  <div v-for="(ele, i) of item.num_list" :key="i">
                    <div v-if="ele.item_list">
                      <div
                        class="card-item1"
                        v-for="(item1, i) of ele.item_list"
                        :key="i"
                      >
                        {{ item1.qtti_area }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
export default {
  filters: {
    computeNum(list) {
      let sum = 0;
      list.forEach((item) => {
        sum += item.item_list.length;
      });
      return {
        height: sum * 40 + "px",
        lineHeight: sum * 40 + "px",
      };
    },
  },
  mixins: [table, confirm],
  data() {
    return {
      postURL: "QueryBridgeQuantitiesItem", //表格请求接口
      listQuery: {
        page: 0,
      },
      currentPage: 0,
      tableData: [],
      materialArr: [],
      unitData: [],
    };
  },
  created() {
    this.QueryTunnelUnit();
    this.QuerySelect();
  },
  methods: {
    //子单位工程
    async QueryTunnelUnit() {
      let { result } = await api.queryBridgeSubUnit({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.unitData = result;
    },
    //分类
    async QuerySelect() {
      let { result } = await api.QueryBridgeQuantitiesItemSelect({
        organ_node: this.$organ_id_en_or_pro(this),
      });
      this.materialArr = result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
