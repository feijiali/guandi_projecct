<template>
  <error-content code="500" :desc="desc" :src="src" />
</template>

<script>
import error404 from '@/assets/images/error-page/error-500.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_500',
  components: {
    errorContent
  },
  data () {
    return {
      src: error404,
      desc:"Oh~~鬼知道服务器经历了什么~"
    }
  },
  mounted(){
    this.desc = this.$route.query.msg;
  }
}
</script>