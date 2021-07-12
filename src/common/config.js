/*
 * @Autor: 邓易
 * @Date: 2021-02-05 17:38:38
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-05 11:38:05
 */

const APP_MODEL = {
    guandi_dev: 'https://dev.cninct.com/GUANDI_DEV',
    guandi: 'https://build.cninct.com/GUANDI',
    mixin_dev: 'https://dev.cninct.com/STD2021_DEV',
    mixin: 'https://build.cninct.com/STD2021_DEV',
    pmai_dev: 'https://dev.cninct.com/PMAI_DEV',
    pmai: 'https://build.cninct.com/PMAI'
}
let config = {
    env: process.env.NODE_ENV,
    baseUrl: APP_MODEL[process.env.VUE_APP_MODE],
    baseUrl_design: 'https://dev.cninct.com/DESIGN_DEV'
}
export default config
