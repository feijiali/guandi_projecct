<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="标题：">
            <el-input
              class="input-m"
              v-model="ruleform.faction_manage_title"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="工程项目：">
            <el-select
              v-model="ruleform.faction_manage_organ_id_union"
              placeholder="请选择"
            >
              <el-option
                :label="item.organ"
                :value="item.organ_id"
                v-for="item in projectListSelect"
                :key="item.organ_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-long-small" label="来源：">
            <el-input
              class="input-m"
              v-model="ruleform.faction_manage_source"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long-small must" label="发布时间：">
            <el-date-picker
              v-model="ruleform.faction_manage_release_time"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="datetime"
              placeholder="选择发布时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="form-item-long" label="发布人：">
            {{ $store.getters.userName }}
          </el-form-item>
          <el-form-item class="form-item-long" label="附件视频：">
            <nVideoUpload ref="video_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件图片：">
            <nPicUpload ref="pic_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long" label="附件文稿：">
            <nFileUpload ref="file_upload" :length="4" />
          </el-form-item>
          <el-form-item class="form-item-long must" label="文本内容：">
            <DynamicEditor
              class="flex"
              ref="qill"
              :word="ruleform.faction_manage_content"
            />
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import upload from "@/mixins/upload";
import api from "@/api";
export default {
  mixins: [upload],
  components: {
    DynamicEditor: () => import("@/components/QillEditor/index"), // 富文本编辑器
  },
  data() {
    return {
      title: "",
      menuArr: [
        "三会一课",
        "党建主题活动",
        "企地联建共建",
        "主题党日活动",
        "组织生活会",
        "民主评议党员",
        "公司领导班子成员",
        "党建联系点工作",
      ],
      subMenuArr: ["党员大会", "支部委员会", "党小组会", "党课"],
      manageTypes1: {
        enterprise_wisdom_party_construction_handle: {
          type: 1,
          name: "组织建设",
        },
        enterprise_wisdom_party_propaganda_handle: {
          type: 2,
          name: "宣传工作",
        },
        enterprise_wisdom_party_unionWork_handle: {
          type: 3,
          name: "工会工作",
        },
        enterprise_wisdom_party_triple_handle: {
          type: 4,
          name: "三重一大",
        },
      },
      manageTypes2: {
        project_wisdom_party_construction_handle: {
          type: 1,
          name: "组织建设",
        },
        project_wisdom_party_propaganda_handle: {
          type: 2,
          name: "宣传工作",
        },
        project_wisdom_party_unionWork_handle: {
          type: 3,
          name: "工会工作",
        },
        project_wisdom_party_triple_handle: {
          type: 4,
          name: "三重一大",
        },
      },
      manageTypes: {},
      ruleform: {
        faction_manage_organ_id_union: null,
        faction_manage_type: null,
        faction_manage_title: "",
        faction_manage_release_time: this.$utils.getCurrentTime(
          "",
          "",
          "",
          "sf",
          "m"
        ),
        faction_manage_source: "",
        faction_manage_content: "",
        faction_manage_file: "",
        faction_manage_video: "",
        faction_manage_pic: "",
        faction_manage_two_type: this.$route.query.t1
          ? Number(this.$route.query.t1)
          : 0,
        faction_manage_three_type: this.$route.query.t2
          ? Number(this.$route.query.t2)
          : 0,
      },
      rules: {
        faction_manage_title: [
          {
            required: true,
            message: "请填写标题",
          },
        ],
        faction_manage_organ_id_union: [
          {
            required: true,
            message: "请选择工程项目",
          },
        ],
        faction_manage_release_time: [
          {
            required: true,
            message: "请选择发布时间",
          },
        ],
        faction_manage_content: [
          {
            required: true,
            message: "请填写文本内容",
          },
        ],
      },
      info: {},
    };
  },
  computed: {
    projectListSelect() {
      return this.$store.getters.organProject;
    },
  },
  created() {
    this.manageTypes =
      this["manageTypes" + (this.$route.name.includes("project") ? 2 : 1)];
    let route_name = this.$route.name;
    let title = this.$route.query.t2
      ? this.subMenuArr[Number(this.$route.query.t2) - 1]
      : this.$route.query.t1
      ? this.menuArr[Number(this.$route.query.t1) - 1]
      : this.manageTypes[route_name].name;
    this.ruleform.faction_manage_type = this.manageTypes[route_name].type;
    if (this.$route.query.id) {
      this.title = "编辑" + title;
      this.queryInfo(parseInt(this.Base64.decode(this.$route.query.id)));
    } else {
      this.title = "新增" + title;
    }
  },
  methods: {
    async queryInfo(id) {
      let res = await api.queryUnionPartyFactionManage({
        faction_manage_id: id,
      });
      this.info = res.result[0];
      for (let key in this.ruleform) {
        this.ruleform[key] = this.info[key];
      }
      this.$refs.pic_upload.setPicList(this.info.pic_list);
      this.$refs.video_upload.setVideoList(this.info.video_list);
      this.$refs.file_upload.setFileList(this.info.file_list);
    },
    async submitFun() {
      this.ruleform.faction_manage_content = this.$refs.qill.content;
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      let file_obj = { uploadFileModule: "UnionPartyFactionManage" };
      this.ruleform.faction_manage_pic = await this.$refs.pic_upload.submitFun(
        false,
        file_obj
      );
      this.ruleform.faction_manage_video =
        await this.$refs.video_upload.submitFun(false, file_obj);
      this.ruleform.faction_manage_file =
        await this.$refs.file_upload.submitFun(false, file_obj);
      this.submitAllData();
    },
    async submitAllData() {
      let name = "uploadUnionPartyFactionManage";
      if (this.info && this.info.faction_manage_id) {
        name = "updateUnionPartyFactionManage";
      }
      await api[name]({
        ...this.info,
        ...this.ruleform,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          if (this.$route.query.t1) {
            this.$router.linkTo("enterprise_wisdom_party_construction", {
              t1: this.$route.query.t1,
              t2: this.$route.query.t2,
            });
          } else {
            this.$router.go(-1);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  ::v-deep .ql-container.ql-snow {
    height: 335px !important;
    overflow-y: auto;
  }
}
</style>
