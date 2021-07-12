<template>
  <div>
    <el-form ref="firstModel" class="el-form-box" :model="firstModel">
      <el-form-item class="form-item-long must" label="模块名称：">
        <el-input
          class="input-m"
          v-model="firstModel.module_chn"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long must" label="英文名称：">
        <el-input
          class="input-m"
          v-model="firstModel.module_eng"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-long must" label="是否为消息：">
        <el-radio-group
          v-model="firstModel.relation_msg_type"
          class="el-radio-group"
        >
          <el-radio :label="0">无消息</el-radio>
          <el-radio :label="1">消息</el-radio>
          <el-radio :label="2">其它消息</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFirstModel"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      firstModel: {
        module_chn: "",
        module_eng: "",
        module_type: 1,
        module_parent_eng: "",
        relation_msg_type: 0,
        relation_level: 1,
      },
      firstModelrules: {
        module_chn: [
          {
            required: true,
            message: "请输入模块名称",
          },
        ],
        module_eng: [
          {
            required: true,
            message: "请输入英文名称",
          },
        ],
      },
    };
  },
  methods: {
    // 确认新增一级
    async submitFirstModel() {
      if (
        !this.$utils.ruleFormPro(this, this.firstModelrules, this.firstModel)
      ) {
        return;
      }
      let res = await api.uploadRelation(this.firstModel);
      if (res) {
        this.firstModel.module_chn = "";
        this.firstModel.module_eng = "";
        this.firstModel.relation_msg_type = 0;
        this.$emit("addFirstafter");
      }
    },
  },
};
</script>

<style>
</style>
