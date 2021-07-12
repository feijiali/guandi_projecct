export default [{
  path: '/project/bim',
  name: 'project_bim',
  meta: {
    title: 'BIM+GIS',
    prolevel: 1,
    icon: 'iconfont btn-icon_homepage_menu_13',
    isProject: true,
    permission: ['BIMGIS']
  },
  component: () => import(/* webpackChunkName: "project_summary" */ '@/views/projects/bim/index.vue')
}]