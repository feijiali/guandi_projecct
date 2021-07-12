<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 15:40:34
-->
<template>
  <div
    class="
      position-relative
      h-100
      w-100
      d-flex
      flex-column
      bg-white
      rounded-1
      px-2
      py-1
    "
  >
    <edit :editType="1"></edit>
  </div>
</template>

<script>
import Edit from "./components/edit";
export default {
  components: {
    Edit,
  },
};
</script>
