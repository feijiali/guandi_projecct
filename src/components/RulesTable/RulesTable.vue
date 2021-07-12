<template>
  <div class="el-table bg-secondary">
    <table class="w-100" border="0" cellspacing="0" cellpadding="4">
      <thead>
        <tr>
          <th class="is-leaf text-center" width="40">序号</th>
          <th class="is-leaf text-center" width="20">
            <el-checkbox
              v-model="checkedAll"
              @change="e => selectList(e, tableData, null)"
            ></el-checkbox>
          </th>
          <th class="is-leaf text-center">{{ title }}</th>
        </tr>
      </thead>
      <tbody class="el-table--border">
        <tr v-for="(item, i) in tableData" :key="i">
          <td class="text-center">
            {{ i + 1 }}
          </td>
          <td class="text-center">
            <el-checkbox
              v-model="item[propLable.checked]"
              @change="e => selectList(e, item, null)"
            ></el-checkbox>
          </td>
          <td class="flexsta">
            <div class="flex-fill">
              <span :title="item[propLable.name]">{{
                item[propLable.name]
              }}</span>
            </div>
            <div
              v-if="item[propLable.children] && item[propLable.children].length"
              class=" flex-fill"
            >
              <div
                v-for="(itm, j) in item[propLable.children]"
                :key="`${i}-${j}`"
                class="flexsta"
                style="padding:5px;"
                :class="{
                  'border-bottom': j != item[propLable.children].length - 1
                }"
              >
                <el-checkbox
                  v-model="itm[propLable.checked]"
                  @change="e => selectList(e, itm, item)"
                ></el-checkbox>
                <span class="ml-1" :title="itm[propLable.name]">{{
                  itm[propLable.name]
                }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "表头名称"
    },
    propLable: {
      type: Object,
      default: () => ({
        name: 'name',
        checked: 'checked',
        children: 'children'
      })
    }
  },
  data() {
    return {
      checkedAll: false,
      tableData: []
    };
  },
  watch: {
    list: {
      handler(val) {
        this.tableData = [...val];
        this.checkedAll = this.checkTree(this.tableData);
      },
      immediate: true 
    }
  },
  methods: {
    getCheck(){
      return this.tableData
    },
    selectList(isChecked, node, parent) {
      let list = Array.isArray(node) ? node : [node];
      this.deepCheck(list, isChecked);
      setTimeout(() => {
        // 子=>父
        if (parent) {
          parent[this.propLable.checked] = this.checkTreeTrue(parent[this.propLable.children]);
        }
        // 全部
        this.checkedAll = this.checkTree(this.tableData);
      });
    },
    // 递归选择
    deepCheck(tree, isChecked) {
      tree.forEach(item => {
        item[this.propLable.checked] = isChecked;
        if (
          item[this.propLable.children] &&
          item[this.propLable.children].length
        ) { 
          // 父=>子
          this.deepCheck(item[this.propLable.children], isChecked);
        }
      });
    },
    // 判断是否全选
    checkTree(tree) {
      for (let i = 0; i < tree.length; i++) {
        let item = tree[i];
        if (!item[this.propLable.checked]) {
          return false;
        }
        if (
          item[this.propLable.children] &&
          item[this.propLable.children].length
        ) {
          if (!this.checkTree(item[this.propLable.children])) {
            return false;
          }
        }
      }
      return true;
    },
    checkTreeTrue(tree) {
      for (let i = 0; i < tree.length; i++) {
        let item = tree[i];
        if (item[this.propLable.checked]) {
          return true;
        }
        if (
          item[this.propLable.children] &&
          item[this.propLable.children].length
        ) {
          if (this.checkTreeTrue(item[this.propLable.children])) {
            return true;
          }
        }
      }
      return false;
    },
  }
};
</script>

<style lang="scss" scoped>
td {
	padding: 5px;
}
.text-center {
	text-align: center;
}
</style>
