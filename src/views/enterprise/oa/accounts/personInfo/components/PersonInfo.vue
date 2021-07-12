<template>
  <n-dialog
    ref="dialog"
    :diaTit="'人员信息详情'"
    :diaWidth="'70%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <div class="px-1">
          <nInfoTitle :title="'人员基础信息'" class="mb-2" />
          <nInfoItem
            :lable_width="90"
            :width="'24%'"
            :colorString="
              item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
            "
            :isShowItem="item.isShowItem ? item.isShowItem() : true"
            :data="{
              name: item.name,
              value: item.fun
                ? item.fun(infoData[item.key])
                : infoData[item.key],
              unit: item.unit,
            }"
            :isPic="item.isPic"
            :islong="item.islong ? true : false"
            v-for="(item, index) in dataInfoList"
            :key="index"
          />
          <nPicInfo :title="'资料图片'" :picList="infoData.doc_list" />
          <nPicInfo :title="'附件图片'" :picList="infoData.pic_list" />
          <nFileInfo :title="'附件文稿'" :fileList="infoData.file_list" />
          <template v-if="infoData.account_three_type">
            <nInfoTitle :title="'三类人员'" class="mb-2" />
            <nInfoItem
              :lable_width="90"
              :width="'24%'"
              :colorString="
                item.Colorfun ? item.Colorfun(infoData[item.key]) : ''
              "
              :data="{
                name: item.name,
                value: item.fun
                  ? item.fun(infoData[item.key])
                  : infoData[item.key],
                unit: item.unit,
              }"
              :isPic="item.isPic"
              :islong="item.islong ? true : false"
              v-for="(item, index) in dataInfoList2"
              :key="index + 's'"
            />
            <nPicInfo :title="'证书照片'" :picList="infoData.three_file" />
          </template>
          <template v-if="transferInfo.length">
            <nInfoTitle :title="'人员调动'" class="mb-2" />
            <div class="detail-item" style="width: 100%">
              <span class="detail-label" style="width: 90px">调动信息</span>：
              <div class="detail-value flex-fill text-primary">
                <template v-for="(item, index) in transferInfo">
                  <div :key="index">
                    <span>第{{ transferInfo.length - index }}次调动</span>
                    <div class="detail-item">
                      <span class="detail-label" style="width: 90px"
                        >调出单位</span
                      >：
                      <div class="detail-value flex-fill text-primary">
                        <p>{{ item.before_organ_name }}</p>
                      </div>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label" style="width: 90px"
                        >调离时间</span
                      >：
                      <div class="detail-value flex-fill text-primary">
                        <p>{{ item.mobilize_time }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import vApprovalProcess from "@/components/common/ApprovalProcess";
import api from "@/api/index";

export default {
  components: {
    vApprovalProcess,
  },
  props: {
    infoData: {
      type: Object,
      default: () => ({ role_list: [{}] }),
      required: false,
    },
    transferInfo: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  mounted() {
    this.getTreeData();
  },
  watch: {
    infoData: {
      handler() {
        this.queryOrgan();
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      rootID: 0,
      projectName: "", //人员该你了项目名字拼接
      dataInfoList: [
        {
          name: "人员头像",
          key: "url",
          isPic: true,
          islong: true,
        },
        { name: "人员姓名", key: "account_name" },
        { name: "人员性别", key: "account_sex" },
        {
          name: "身份证号",
          // key: "organ_id",
          key: "account_id_card",
          // fun: (val) => {
          //   return this.$store.getters.organ_child_node.indexOf(val) != -1||
          //     this.$store.getters.account_id == this.infoData.account_id
          //     ? this.infoData.account_id_card
          //     : "*";
          // },
        },
        { name: "职位", key: "account_job" },
        {
          name: "联系电话",
          // key: "organ_id",
          key: "account",
          // fun: (val) => {
          //   return this.$store.getters.organ_child_node.indexOf(val) != -1||
          //     this.$store.getters.account_id == this.infoData.account_id
          //     ? this.infoData.account
          //     : this.$utils.hidePartOfPhoneNum(
          //         this.infoData.account ? this.infoData.account : ""
          //       );
          // },
        },
        { name: "入职时间", key: "account_service_time" },
        { name: "工龄", key: "account_service_length", unit: "年" },
        {
          name: "职位状态",
          key: "account_status",
          fun: (val) => {
            return ["", "在职", "离职", "实习", "试用"][val];
          },
        },
        {
          name: "离职时间",
          key: "account_quit_time",
        },
        { name: "试用期限", key: "account_trial_time" },
        {
          name: "基本工资",
          key: "account_basic_wage",
          unit: "元",
          // fun: (val) => {
          //   return this.$store.getters.organ_child_node.indexOf(val) != -1 ||
          //     this.$store.getters.account_id == this.infoData.account_id
          //     ? this.infoData.account_base_salary
          //     : "*";
          // },
        },

        {
          name: "学历",
          key: "account_education",
          fun: (val) => {
            return ["", "小学", "初中", "高中", "大专", "本科", "硕士", "博士"][
              val
            ];
          },
        },
        { name: "毕业院校", key: "account_education_final" },
        { name: "专业", key: "account_education_major" },
        { name: "毕业时间", key: "account_education_time" },
        { name: "社保公司", key: "account_ledger" },
        {
          name: "权限角色",
          key: "account_project_role",
          fun: (val) => {
            return [
              "无",
              "普通用户",
              "项目人员",
              "管理人员",
              "风控中心人员",
              "领导",
            ][val];
          },
        },
        {
          name: "权限设置",
          key: "role_list",
          fun: (val) => {
            return val.map((item) => item.role).join(",");
          },
        },
        { name: "应用范围", key: "account_range_type_string" },

        { name: "邮箱", key: "account_email" },
        { name: "家庭住址", key: "account_from", islong: true },
        {
          name: "管理项目",
          key: "project_organ",
          islong: true,
          isShowItem: () => {
            return this.infoData.account_project_ids ? true : false;
          },
          fun: (val) => {
            if (this.rootID == this.infoData.account_project_ids) {
              return "全部项目";
            } else {
              return this.projectName;
            }
          },
        },
      ],
      dataInfoList2: [
        {
          name: "证书类型",
          key: "account_three_type",
          fun: (val) => {
            return [
              "",
              "企业主要负责人(A证)",
              "项目负责人(B证)",
              "专职安全生产管理人员(C证)",
            ][val];
          },
        },
        { name: "证书编号", key: "account_three_number" },
        { name: "发证时间", key: "account_three_start" },
        { name: "证书到期时间", key: "account_three_end" },
      ],
    };
  },
  methods: {
    // 获取组织架构
    async getTreeData() {
      let data = await api.queryOrganAccountCountTree({});
      this.rootID = String(data.result[0].tag);
    },
    async queryOrgan() {
      let { result } = await api.queryOrgan({
        organ_type: 30,
        organ_ids: this.infoData.account_project_ids,
      });
      this.projectName = result.map((item) => item.organ).join(",");
    },
    show() {
      this.$refs.dialog.show();
    },
  },
};
</script>
