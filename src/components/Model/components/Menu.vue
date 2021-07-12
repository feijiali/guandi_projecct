<template>
  <div class="bim-top-btn d-flex-cen">
    <div>
      <img
        @click="showAllTotal()"
        src="../images/bim_menu.png"
        alt=""
        srcset=""
      />
    </div>
    <!-- <div>
      <img
        @click="changeEye()"
        style="width: 21px;"
        v-if="!eyeOn"
        src="../images/bim_eye_on.png"
        alt=""
        srcset=""
      />
      <img
        @click="changeEye()"
        v-else
        style="width: 21px;"
        src="../images/bim_eye_off.png"
        alt=""
        srcset=""
      />
    </div> -->
    <div>
      <img
        @click="changefull()"
        v-if="!isFullScreen"
        src="../images/bim_max.png"
        alt=""
        srcset=""
      />
      <img
        @click="changefull()"
        v-else
        src="../images/bim_min.png"
        alt=""
        srcset=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eyeOn: false
    };
  },
  methods: {
    changefull() {
      this.$emit('changeScreen');
    },
    showAllTotal() {
      this.$emit('showAllTotal');
    },
    changeEye() {
      APIUtility.SendCommand(
        APIUtility.APICommand.ShowBridgeUnitDetail,
        this.eyeOn ? '1' : '0',
        this
      );
      this.eyeOn = !this.eyeOn;
    }
  }
};
</script>

<style lang="scss" scoped>
.bim-top-btn {
  position: absolute;
  right: 20px;
  top: 15px;
  border-radius: 8px;
  background: $main;
  padding: 10px;
  z-index: 99;
  div {
    margin: 5px 10px;
    img {
      cursor: pointer;
    }
  }
}
</style>
