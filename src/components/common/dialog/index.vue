<template>
  <el-dialog
    :custom-class="hideHeader ? 'custom-dialog hide-dialog' : 'custom-dialog'"
    @close="cancel"
    :visible.sync="dialogVisible"
    :top="diaTop"
    :width="diaWidth"
    :append-to-body="true"
    :modal-append-to-body="true"
    :modal="true"
    :show-close="false"
    :destroy-on-close="destroyOnClose"
  >
    <div
      v-if="showTitle"
      slot="title"
      class="font-20 position-relative font-weight-bold text-hover-primary letter-s-1"
    >
      <div class="position-absolute dialog-title-box">
        <span class="dialog-title-span title-span-l d-inline-block"></span>
        <span
          class="dialog-title-span title-span-r d-inline-block ml-05"
        ></span>
      </div>
      <div class="position-absolute bg-primary dialog-edit-btn d-flex-cen">
        <div class="cancel-icon cursor-p d-flex-cen" @click.stop="cancel()">
          <span class="d-inline-block"></span>
        </div>
      </div>
      {{ diaTit }}
    </div>
    <slot ref="scroll" name="diaSlot"></slot>
  </el-dialog>
</template>
<style lang="scss">
.custom-dialog {
  &.hide-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      overflow-y: initial;
    }
  }
}
.el-dialog {
  min-width: 400px;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  margin: 0;
  margin-top: 0 !important;
  .el-dialog__body {
    color: $color-1;
    padding: 10px 20px 20px 20px;
    overflow-y: auto;
    // 设置弹窗里面滚动条组件的最大高度
    .__vuescroll {
      & > .__panel {
        max-height: calc(80vh - 180px);
      }
    }
  }
  .el-dialog__header {
    padding: 35px 35px 20px;
    z-index: 20;
    // height: 137px;
    .dialog-close {
      font-size: 40px;
      color: white;
      right: -110px;
      top: -110px;
    }
  }
  .dialog-title-box {
    left: 2px;
    top: -25px;

    .dialog-title-span {
      background-color: $main;
      height: 5px;
      border-radius: 10px;
    }

    .title-span-l {
      width: 25px;
    }

    .title-span-r {
      width: 15px;
      background-color: $blue;
    }
  }
  .dialog-edit-btn {
    border-radius: 0 8px 0 8px;
    right: -36px;
    top: -36px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 34px;

    .cancel-icon {
      width: 24px;
      height: 24px;
      border: 3px solid white;
      border-radius: 100%;
      text-align: center;
      span {
        background-color: white;
        border-radius: 100%;
        width: 8px;
        height: 8px;
      }
    }
  }
}
.stretch-dialog .el-dialog__body {
  padding: 10px 35px 35px 35px;
  flex: 1;
  // display: flex;
  // align-items: stretch;
}
.person-dialog .el-dialog .el-dialog__body {
  // overflow: hidden;
  min-height: 600px;
}
.rectify-dialog .el-dialog__body {
  position: relative;
  top: -88px;
  padding-top: 80px;
}
</style>
<script>
export default {
  inject: ["app"],
  data() {
    return {
      dialogVisible: false,
    };
  },
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    isForm: {
      type: Boolean,
      default: false,
    },
    diaTit: {
      type: String,
      default: "",
    },
    diaWidth: {
      type: String,
      default: "40%",
    },
    diaTop: {
      type: String,
      default: "auto",
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.$refs.scroll) {
    } else {
      this.$nextTick(() => {});
    }
  },
  methods: {
    handleDrag() {
      this.$refs.select.blur();
    },
    show() {
      this.dialogVisible = true;
      this.app.changeFilter(true);
    },
    cancel() {
      this.$emit("beforeClose");
      this.dialogVisible = false;
      this.app.changeFilter(false);
    },
    // // 点击编辑按钮
    // handleUpdate() {
    // 	this.$emit('handleUpdate');
    // 	this.dialogVisible = false;
    // }
  },
};
</script>
