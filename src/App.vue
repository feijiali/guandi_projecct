<!--
 * @Autor: 邓易
 * @Date: 2020-11-03 16:17:48
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-03 16:35:44
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            imgList: []
        }
    }
}
</script>

<style lang="scss">
// @import "./assets/css/element.scss";
@import './assets/css/reset.scss';
@import './assets/css/custom.scss';
@import './assets/css/common.scss';
@import './assets/css/newCommon.scss';
@import './assets/css/tree.scss';
@import './assets/fonts/font.css';

#app {
    word-break: break-all;
}
html,
body {
    word-break: break-all;
}
</style>
