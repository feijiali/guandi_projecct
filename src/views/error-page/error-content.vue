<!--
 * @Author: 郭海林
 * @Date: 2020-06-04 11:37:07
 * @LastEditors: 郭海林
 * @LastEditTime: 2020-06-08 14:22:10
 * @FilePath: \项目管家AI云平台\src\views\error-page\error-content.vue
--> 
<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>

    </div>
  </div>
</template>

<script>
import './error.scss'

export default {
  name: 'error_content',
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>