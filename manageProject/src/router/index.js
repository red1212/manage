import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// export default 
const router = new Router({
  mode:'history',
  fallback:true,  //如果浏览器不识别history模式自动转为hash模式
  routes: [
    {
      path: '/',
      component: () => import('@/page/index'),
      redirect:'/user',
      children: [
        {path: '/user',
        // meta:{
        //   requireAuth: true
        // },需要登录
        component: () => import('@/page/user/tab')},
        {path:'/order',component:() => import('@/page/order/tab')},
        {path:'/company',component:() => import('@/page/company/tab')},
        {path:'/companyAdd',component:() => import('@/page/company/companyAdd')},
        {path:'/strategy',component:() => import('@/page/strategy/tab')},
        {path:'/itemChild',component:() => import('@/page/strategy/itemChild')}                  
      ]
    },
    {
      path: '*',  //*号表示匹配任意内容
      component: () => import('@/page/index'),
      redirect:'/user'
  }

  ]
})
//  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//     if (localStorage.getItem('username')) {// 判断是否登录
//       next()
//     } else {// 没登录则跳转到登录界面
//       next({
//         path: '/Login'//,
//        // query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })
export default router