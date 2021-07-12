<!--
 * @Autor: 邓易
 * @Date: 2021-02-01 14:51:16
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-01 15:17:18
-->
<template>
  <el-table :data="tableData" border style="width: 100%" height="calc(100% - 110px)">
    <template slot="empty">
      <span>真是不巧，暂时没有数据呢~</span>
    </template>
    <el-table-column
      prop="lining_support"
      label="支护类型"
      width="100"
      v-if="type == 11 || type == 12"
    ></el-table-column>
    <el-table-column label="材料名称">
      <template slot-scope="{ row }">
        <div v-if="row.material_list">
          <div
            class="card-item "
            v-for="(item, index) of row.material_list"
            :key="index"
            :style="item.spec_list | compute"
          >
            {{ item.me_material_name }}
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="规格型号">
      <template slot-scope="{ row }">
        <div v-if="row.material_list">
          <div v-for="(item, index) of row.material_list" :key="index">
            <div v-if="item.spec_list">
              <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                {{ ele.me_material_spec }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <template>
      <el-table-column label="钢筋编号">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_steel_num }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="直径(mm)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_material_diameter }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位数量(kg/m)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_unit_count }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="每根长度(mm)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_unit_length }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="根数(根)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_material_counts }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总长(m)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_total_length }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总重(Kg)">
        <template slot-scope="{ row }">
          <div v-if="row.material_list">
            <div v-for="(item, index) of row.material_list" :key="index">
              <div v-if="item.spec_list">
                <div class="card-item1" style="height:40px" v-for="(ele, i) of item.spec_list" :key="i">
                  {{ ele.me_total_weight }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </template>

    <el-table-column label="小计(Kg)">
      <template slot-scope="{ row }">
        <div v-if="row.material_list">
          <div
            class="card-item "
            v-for="(item, index) of row.material_list"
            :key="index"
            :style="item.spec_list | compute"
          >
            {{ item.me_material_total }}
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  filters: {
    compute(list) {
      let sum = list.length;
      return {
        height: sum * 40 + "px",
        lineHeight: sum * 40 + "px",
      };
    },
  },
  data() {
    return {
      type: this.$route.query.type ? this.$route.query.type : 11,
    };
  },
  watch: {
    $route(route) {
      this.type = route.query.type ? route.query.type : 11;
    },
  },
  computed: {
    tableData() {
      return this.$store.getters.out_bound_info;
    },
  },
};
</script>
