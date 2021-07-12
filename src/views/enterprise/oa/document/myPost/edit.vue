<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-29 15:01:28
-->
<template>
  <div
    class="position-relative h-100 w-100 d-flex flex-column bg-white rounded-1 px-2 py-1"
  >
    <nBackTop title="我的发文编辑" />
    <n-scroll>
      <edit class="flex-fill" :is-edit="true" :editType="3"></edit>
    </n-scroll>
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
