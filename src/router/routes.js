/* eslint-disable no-undef */
// 生产/测试环境，使用路由懒加载
const view =
  process.env.NODE_ENV === 'development'
    ? file => require(`@/pages/${file}.vue`).default
    : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: view('login') },
  { path: '/login', component: view('login') },
  {
    path: '/main',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/dashboard',
        name: '首页',
        component: view('dashboard'),
        meta: { title: '首页' }
      },
      {
        path: '/list',
        name: '列表功能',
        component: view('list'),
        meta: { title: '列表功能' }
      },
      {
        path: '/create',
        name: '新增功能',
        component: view('create'),
        meta: { title: '新增功能' }
      }
    ]
  }
]
