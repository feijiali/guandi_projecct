<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 15:05:26
-->
<template>
  <div class="position-relative h-100 w-100">
    <div class="position-absolute left-box rounded-1 bg-white px-2 py-1">
      <n-scroll>
        <div>
          <nBackTop title="我的收文详情" />
        </div>
        <div class="d-flex">
          <n-button
            class="mr-2"
            :btnText="'处理回复'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="reply"
            v-if="info.receive_file_id_un == 0"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_edit mr-1"></i> </template
          ></n-button>
          <n-button
            :colorBtn="'green'"
            :btnText="'打印'"
            :width="'150px'"
            v-print="printObj"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-icon_homepage_menu_17 mr-1"></i> </template
          ></n-button>
        </div>
        <el-form ref="ruleform" id="print" class="el-form-box pt-2">
          <table class="table-box1" border="1">
            <thead>
              <tr>
                <td colspan="2">
                  <div
                    class="
                      font-20
                      text-hover-danger
                      font-weight-bold
                      text-center
                    "
                  >
                    广东冠迪建设有限公司文件
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long" label="发文字号：">
                    {{ info.receive_num }}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item
                    class="form-item-long must"
                    label="缓急："
                    label-width="114px"
                  >
                    {{
                      [
                        "",
                        "特急公文(特急)",
                        "紧急公文(急件)",
                        "常规公文(平件)",
                      ][info.receive_urgent]
                    }}
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long must" label="密级：">
                    {{
                      ["", "绝密", "机密", "秘密", "普通", "此件不公开"][
                        info.receive_secret
                      ]
                    }}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="签发：">
                    <div class="w-100 text-overflow-ellipsis">
                      {{
                        info.sign_list &&
                        info.sign_list.map((item) => item.account_name).join()
                      }}
                    </div>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="会签：">
                    <div class="w-100 text-overflow-ellipsis">
                      {{
                        info.hq_list &&
                        info.hq_list.map((item) => item.account_name).join()
                      }}
                    </div>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long must pd" label="主送：">
                    <div class="w-100 text-overflow-ellipsis">
                      {{
                        info.main_list &&
                        info.main_list.map((item) => item.account_name).join()
                      }}
                    </div>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="抄送：">
                    <div class="w-100 text-overflow-ellipsis">
                      {{
                        info.copy_list &&
                        info.copy_list.map((item) => item.account_name).join()
                      }}
                    </div>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item
                    class="form-item-long"
                    label="拟稿单位："
                    label-width="114px"
                  >
                    {{ info.organ }}
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long" label="拟稿人：">
                    {{ info.creat_name && info.creat_name.account_name }}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item
                    class="form-item-long"
                    label="份数："
                    label-width="114px"
                  >
                    {{ info.receive_c }}
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long" label="印刷：">
                    {{ info.receive_print }}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="校对：">
                    {{ info.check_name && info.check_name.account_name }}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long must" label="标题：">
                    {{ info.receive_title }}
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
          <el-form-item
            class="form-item-long mt-1 file-node"
            label="附件："
            label-width="104px"
          >
            <nFileInfo :fileList="info.file_list" :showTitle="false" />
          </el-form-item>
          <h2>正文内容</h2>
          <div class="mt-1" v-html="info.receive_content"></div>
        </el-form>
      </n-scroll>
    </div>
    <div class="position-absolute right-box rounded-1 bg-white">
      <n-scroll>
        <nApprovalProcess style="width: 100%" :reviseArr="process_list" />
      </n-scroll>
    </div>
  </div>
</template>

<script>
import DynamicEditor from "@/components/QillEditor";
import confirm from "@/mixins/confirm";

export default {
  mixins: [confirm],
  components: {
    DynamicEditor,
  },
  data() {
    return {
      printObj: {
        id: "#print",
        popTitle: "发文明细", //打印标题
      },
      process_list: [],
      edit_id: 0,
      info: {},
    };
  },
  created() {
    // 默认登录者
    this.edit_id = parseInt(this.Base64.decode(this.$route.query.id));
    this.account_name = this.$route.query.send_name;
    this.receive_create = this.$route.query.receive_id;
    this.QueryReceiveFile(this.edit_id);
  },
  methods: {
    reply() {
      this.linkTo("enterprise_oa_document_addressee_reply", {
        id: this.edit_id,
        send_name: this.account_name,
        receive_id: this.receive_create,
      });
    },
    async QueryReceiveFile(id) {
      let { result } = await api.QueryReceiveReceiveFile({
        receive_file_id: id,
      });
      this.info = result[0];
      this.queryProcess(result[0].revise_info_id);
    },
    //查询审批
    async queryProcess(id) {
      let { result } = await api.queryApproveReviseRecordWithProcess({
        revise_info_id: id,
      });
      this.process_list = result;
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
//自定义表格
.table-box1 {
  width: 100%;
  height: 40px;
  table-layout: fixed;
  line-height: 40px;
  text-align: left;
  border-color: #fc3e3e;
  border-collapse: collapse;
  tr,
  td {
    border: 1px solid #fc3e3e;
    padding-left: 6px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
.el-form-box ::v-deep {
  .el-form-item__label {
    color: #fc3e3e;
  }
  .el-input__inner {
    border: none;
  }
}

.left-box {
  width: 59.4%;
  top: 0px;
  bottom: 0px;
  left: 0px;
}
.right-box {
  width: 40%;
  top: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
