<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 14:50:04
-->
<template>
  <div class="position-relative h-100 w-100 d-flex flex-column bg-white rounded-1 p-2">
    <nBackTop title="草稿箱编辑" />
    <edit class="flex-fill" :is-edit="true" :editType="2"></edit>
  </div>
</template>

<script>
import Edit from "../write/components/edit";
export default {
  components: {
    Edit,
  },
};
</script>
