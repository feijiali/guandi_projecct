export default [
  {
    path: '/enterprise/organization',
    name: 'enterprise_organization',
    meta: {
      title: "组织机构",
      permission: ['Organ'],
      level: 0,
      notmenu: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_organization" */ "@/views/projects/organization"
      )
  }
]