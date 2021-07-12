<template>
  <table class="table-origin">
    <tr>
      <template v-for="(item,index) in headers">
        <td :key="index"
            :width="item.width?item.width:70">
          {{item.name}}
          <div @click="addBlock()"
               v-if="index==0"
               class="d-inline-block add-circle-btn">
            +
          </div>
        </td>
      </template>
      <td width="40">操作</td>
    </tr>
    <tr v-for="(item,index) in value"
        :key="index">

      <template v-for="(hItem,hIndex) in headers">
        <td :key="hIndex"
            v-if="!hItem.type||hItem.type==0">
          <num-input :negative="true"
                     :isInputChange="true"
                     :fixedNum="2"
                     :isString="true"
                     class="short-input"
                     @emitInput="(val)=>$emit('inputChange',hItem.key,val,index)"
                     v-model="value[index][hItem.key]"
                     :placeholder="hItem.placeholder">
          </num-input>
        </td>
        <td :key="hIndex"
            v-if="hItem.type==1">
          <el-input class="short-input"
                    v-model="value[index][hItem.key]"
                    @change="(val)=>$emit('inputChange',hItem.key,val,index)"
                    :placeholder="hItem.placeholder"></el-input>
        </td>
        <td :key="hIndex"
            v-if="hItem.type==2">
          <el-select class="short-input"
                     ref="select"
                     v-model="value[index][hItem.key]"
                     @change="(val) => $emit('selectChange',hItem.key,val,index)"
                     :placeholder="hItem.placeholder"
                     filterable
                     allow-create>
            <el-option v-for="(itms, inds) in hItem.historyArr"
                       :key="inds"
                       :label="itms"
                       :value="itms"></el-option>
          </el-select>
        </td>
        <td :key="hIndex"
            v-if="hItem.type==3">

          <el-date-picker class="el-date-editor-m"
                          :clearable="false"
                          :editable="false"
                          type="date"
                          v-model="value[index][hItem.key]"
                          @change="(val) => $emit('selectChange',hItem.key,val,index)"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :placeholder="hItem.placeholder"></el-date-picker>

        </td>
      </template>
      <td>
        <div v-if="index!=0"
             @click="removeBlock(index)"
             class="d-inline-block add-circle-btn">
          -
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
/**
 * author:段家兴
 * lastData:2021.7.6
 * use:材料表格封装
 * param: headers 表格属性  - name头部名称,
 *                            width宽度、默认70,
 *                            type 0-数字输入、1-文本 2-选择 
 *                            isauto  - 序号是否自增
 * **/
import measurement from "@/mixins/measurement.js";

export default {

  name: "MaterialTable",
  mixins: [measurement],
  props: {
    "value": [],
    headers: {
      default: []
    },

  },
  data () {
    return {
      autoKeyList: []
    }
  },
  mounted () {
    this.addBlock()
  },
  methods: {
    addBlock () {
      let json = {
      };
      this.headers.forEach((item) => {

        if (item.isauto) {
          if (this.value.length < 1) {
            json[item.key] = 1
          } else {
            json[item.key] = parseInt(this.value[this.value.length - 1][item.key]) + 1
          }
          this.autoKeyList.indexOf(item.key) == -1 && this.autoKeyList.push(item.key)

        } else
          json[item.key] = ""
      })

      this.value.push(json)
      this.$emit('input', this.value);
    },
    // 移除添加项
    removeBlock (ind) {


      this.value.splice(ind, 1);
      if (ind != this.value.length) {
        for (var i = ind; i < this.value.length; i++) {
          this.autoKeyList.forEach((item) => {
            this.value[i][item] = parseInt(this.value[i - 1][item]) + 1
          })
        }
      }

    },
  }
}
</script>

<style lang="scss" scope>
.add-circle-btn {
  width: 25px;
  height: 25px;
  line-height: 3px;
  padding: 9px 3px;
}
table.table-origin {
  td {
    padding: 5px 0;
    height: 35px;
  }
}

.short-input {
  width: 100% !important;

  .el-input__inner {
    border: none !important;
  }
}

.el-date-editor-m {
  .el-input__inner {
  }
}
</style>