<template>
  <div class="h-100">
    <Detail ref="detailDialog" :infoData="infoData" />
    <el-table
      :data="tableDatas"
      width="100%"
      height="100%"
      @row-click="rowclick"
      class="cursor-p-table special-work-box table-no-padding"
    >
      <template slot="empty">
        <span>真是不巧，暂时没有数据呢~</span>
      </template>
      <el-table-column prop="index" label="序号" width="80" align="center">
        <template slot-scope="scope">
          <label>{{ (currentPages - 1) * 20 + (scope.$index + 1) }}</label>
        </template>
      </el-table-column>
      <el-table-column
        label="工程名称"
        align="center"
        prop="organ"
      ></el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <div class="flexcen">
            <span class="text-left">{{ scope.row.credentials_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="特殊作业类型" align="center">
        <template slot-scope="scope">
          <div class="card-group-left" v-if="scope.row.list">
            <div
              class="card-item"
              v-for="(item, index) of scope.row.list"
              :key="index"
            >
              <span
                :class="{
                  red:
                    item.credentials_valid_date &&
                    $utils.timeDiff(
                      item.credentials_valid_date,
                      $utils.getCurrentTime()
                    ),
                }"
              >
                {{ item.credentials_type }}
              </span>
            </div>
          </div>
          <div class="card-item card-group-left" v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column label="证件等级" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.list">
            <div
              class="card-item"
              v-for="(item, index) of scope.row.list"
              :key="index"
            >
              <span
                :class="{
                  red:
                    item.credentials_valid_date &&
                    $utils.timeDiff(
                      item.credentials_valid_date,
                      $utils.getCurrentTime()
                    ),
                }"
              >
                {{ item.credentials_grade }}
              </span>
            </div>
          </div>
          <div class="card-item" v-else>/</div>
        </template></el-table-column
      >
      <el-table-column label="证件有效期" align="center" width="320">
        <template slot-scope="scope">
          <div class="card-group-right" v-if="scope.row.list">
            <div
              class="d-flex-cen card-item pr-1"
              v-for="(item, index) in scope.row.list"
              :key="index"
            >
              <div class="card-pic-wrapper flex-fill d-flex align-items-center">
                <div
                  class="pic mr-1 position-relative"
                  v-for="(items, ind) in item.credentials_pic.split(',')"
                  :key="ind + 'c'"
                >
                  <img
                    v-if="items"
                    class="w-100 h-100"
                    :src="scope.row.server + items"
                    alt=""
                  />
                </div>
                <span
                  :class="{
                    red:
                      item.credentials_valid_date &&
                      $utils.timeDiff(
                        item.credentials_valid_date,
                        $utils.getCurrentTime()
                      ),
                  }"
                >
                  {{ item.credentials_valid_date }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-group-right card-item" v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column
        label="劳务公司"
        prop="credentials_unit"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="120" v-if="isShow">
        <template slot-scope="scope">
          <i
            class="iconfont btn-btn_list_edit edit-icon-btn"
            @click.stop="
              $router.linkTo(
                'enterprise_oa_account_labourRealName_handleSpecial',
                {
                  id: scope.row.account_id,
                }
              )
            "
          ></i>
          <i
            v-permission="['StaffWorker-delete']"
            @click.stop="deletefun(scope.row)"
            class="iconfont btn-btn_list_trash trash-icon-btn ml-2 table-trash-icon"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import Detail from "../special/components/Detail";
export default {
  components: { Detail },
  mixins: [table, confirm],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      infoData: { pic_list: [] }, //详情
    };
  },
  props: {
    tableDatas: {
      type: Array,
      default: () => [],
    },
    currentPages: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  methods: {
    async rowclick(row) {
      let res = await api.QueryWorkerAccount({
        account_id: row.account_id,
      });
      this.infoData = res.result[0];
      this.$refs.detailDialog.show();
    },
    // 删除附件
    deletefun(row) {
      this.confirm(null, null, "确认是否删除？").then(() => {
        let data = {};
        data.account_id = row.account_id;
        api.DelWorkerAccount(data);
        this.$parent.getList();
        this.$parent.QueryWorkerAccountOverdue();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.special-work-box {
  .user-avator {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  .common-choose-box {
    padding: 15px 30px;

    .personinfo-top-count {
      text-align: center;
      border-radius: 4px;
      padding: 10px 0;
      width: 150px;
      color: white;
      font-size: 13px;
    }

    .out {
      background: linear-gradient(to right, #ff6e72, #ff7490);
    }
  }

  .whalf {
    width: 50%;
  }

  .card-group-left {
    border-left: 1px solid #dcdfe6;
  }

  .card-group-right {
    border-right: 1px solid #dcdfe6;
  }

  .card-item {
    height: 55px;
    line-height: 45px;
    padding: 5px 0;
    border-bottom: 1px solid #dcdfe6;

    &:last-child {
      border-bottom: 0;
    }
  }

  .card-pic-wrapper {
    .pic {
      width: 60px;
      height: 40px;

      .delete-wrapper {
        visibility: hidden;
      }

      &:hover {
        transform: scale(1.25);

        .delete-wrapper {
          background-color: rgba($color: #283c79, $alpha: 0.5);
          visibility: visible;
        }
      }
    }
  }
}
</style>
