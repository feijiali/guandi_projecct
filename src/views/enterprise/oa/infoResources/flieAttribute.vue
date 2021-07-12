<template>
  <div class="container-all">
    <div
      class="container-div flex-column justify-content-between d-flex pr-2 pb-2"
      style="margin: 0"
    >
      <div class="p-1" style="height: calc(100% - 70px)">
        <nBackTop title="文件属性" />
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <div class="pd mb-1">
            <el-form-item class="form-item-long must" label="文件名称：">
            </el-form-item>
            <el-input
              disabled
              placeholder="请输入"
              style="width: 500px"
              v-model="ruleform.information_resources_name"
            >
            </el-input>
          </div>
          <div class="pd mb-1">
            <el-form-item class="form-item-long must" label="当前路径">
            </el-form-item>
            <el-input
              style="width: 500px"
              disabled
              placeholder="请输入"
              v-model="pathName"
            >
            </el-input>
          </div>
        </el-form>
        <div class="mt-2">
          <n-button
            class="mb-1 mt-1"
            :btnText="'替换文件'"
            v-if="$route.query.isBtn"
            @buttonClick="uploadFile"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_upload mr-1"></i>
            </template>
          </n-button>
          <n-new-file-upload
            ref="fileUpload"
            file-module="Resources"
            :length="1"
          />
        </div>
      </div>
      <div class="d-flex justify-content-end" v-if="$route.query.isBtn">
        <n-button
          class="mt-1"
          :btnText="'确认提交'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFun"
        ></n-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
export default {
  mixins: [table, confirm, upload],
  data() {
    return {
      ruleform: {},
      pathName: "",
    };
  },
  created() {
    this.$route.query.id && this.queryInformationResources();
  },
  methods: {
    // 查询详情
    async queryInformationResources(obj) {
      let data = await api.queryInformationResources({
        information_resources_id: Number(
          this.Base64.decode(this.$route.query.id)
        ),
      });
      this.ruleform = data.result[0];
      this.pathName =
        this.ruleform.information_resources_parent_node_name.split(",");
      this.pathName.pop();
      this.pathName = this.pathName.join("/") + "/";
      let file_json = JSON.parse(
        this.ruleform.information_resources_file_json
      )[0];
      this.$refs.fileUpload.setFileList([
        {
          file_json: JSON.stringify(file_json),
          org_name: this.ruleform.information_resources_name,
          file_name: this.ruleform.information_resources_file,
          file_size: this.ruleform.information_resources_file_size,
          url: "",
        },
      ]);
    },
    // 重命名提交
    async submitFun() {
      let subData = {
        resources_list: [],
      };
      subData.resources_list[0] = this.ruleform;
      let filejson = this.$refs.fileUpload.getFileObj();
      subData.resources_list[0].information_resources_file = filejson.file;
      subData.resources_list[0].information_resources_file_json =
        filejson.file_json;
      subData.operation_type = 4;
      let d = JSON.parse(filejson.file_json)[0];
      subData.resources_list[0].information_resources_name = d.org_name
        ? d.org_name
        : d[0].org_name;
      await api.updateInformationResources(subData);
      this.$bus.$emit("refresh", "");
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    //取消
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.notice:hover {
  background: $color-2;
  color: #3377ff;
}
</style>
