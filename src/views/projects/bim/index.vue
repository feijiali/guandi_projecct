<template> </template>

<script>
export default {
  mounted() {
    if (window.bim_model && window.bim_model.advanced) {
      APIUtility.SendCommand(APIUtility.APICommand.BackToGis, 0, this);
      window.bim_model.advanced = false;
      window.bim_model.isBridgeShow = false;
      window.bim_model.isTunnelShow = false;
    }
  }
};
</script>

<style></style>
