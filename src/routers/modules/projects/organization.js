export default [
  {
    path: '/project/organization',
    name: 'project_organization',
    meta:{
      title: "组织机构",
      prolevel: 0,
      isProject:true,
      permission: ['Organ'],
    },
    component: () =>
      import(
        /* webpackChunkName: "project_organization" */ "@/views/projects/organization"
      )
  }
]