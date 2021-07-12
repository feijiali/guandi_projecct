export default [{
  path: '/enterprise/engineering/bim',
  name: 'enterprise_engineering_bim',
  meta: {
    title: 'BIM+GIS',
    level: 2,
    secondAlive: true,
    icon: 'iconfont btn-icon_homepage_menu_13',
    permission: ['BIMGIS']
  },
  component: () => import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/bim')
}]