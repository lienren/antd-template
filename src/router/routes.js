/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:52
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-02-28 14:57:38
 */
'use strict'

/* eslint-disable no-undef */
const view =
  process.env.NODE_ENV === 'development'
    ? file => require(`@/pages/${file}.vue`).default
    : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: view('Login') },
  { path: '/login', component: view('Login') },
  {
    path: '/main',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/DashBoard',
        name: '首页',
        component: view('DashBoard')
      },
      {
        path: '/list',
        name: '列表功能',
        component: view('demo/list')
      },
      {
        path: '/create',
        name: '新增功能',
        component: view('demo/create')
      }
    ]
  },
  {
    path: '/manage',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/managelist',
        name: '管理员管理',
        component: view('manage/ManageList')
      },
      {
        path: '/rolelist',
        name: '角色管理',
        component: view('manage/RoleList')
      },
      {
        path: '/menulist',
        name: '菜单管理',
        component: view('manage/MenuList')
      },
      {
        path: '/logs',
        name: '日志查看',
        component: view('manage/Logs')
      }
    ]
  }
]
