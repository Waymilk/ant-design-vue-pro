import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import Forbidden from '../views/403.vue'
import NProgress from 'nprogress'
import findLast from 'lodash/findLast'
import {check,isLogin} from '../utils/auth'
import {notification} from 'ant-design-vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/user',
    redirect:'/user/login',
    hideInMenu:true,
    component:() => import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children:[
      {
        name:'login',
        path:'/user/login',
        component: () =>  import(/* webpackChunkName: "user" */ '../views/User/Login.vue')
      },
      {
        name:'register',
        path:'/user/register',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Register.vue')
      }
    ]
  },
  {
    path: '/',
    meta:{authority:['user','admin']},
    component:() => import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout'),
    children: [
      {
        path:'/',
        redirect:'dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta:{icon:'dashboard',title:'仪表盘'},
        component: { render: h => h('router-view') },
        children:[
          {
            path:'/dashboard/analysis',
            name:'analysis',
            meta:{title:'分析页'},
            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Analysis')
          }
        ]
      },
          // forms
      {
        path: '/form',
        name: 'form',
        meta:{icon:'form',title:'表单',authority:['admin']},
        component: {render: h => h('router-view')},
        children: [
          {
            path: '/form/basic-form',
            name: 'basicForm',
            meta:{title:'基础表单'},
            component: () => import(/* webpackChunkName: "form" */  '../views/Forms/BasicForm'),
          },
          {
            path: '/form/step-form',
            name: 'stepForm',
            meta:{title:'分步表单'},
            hideInChildrenMenu:true,
            component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm'),
            children:[
              {
                path:'/form/step-form',
                redirect:'/form/step-form/info'
              },
              {
                path:'/form/step-form/info',
                name:'info',
                component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm/step1'),
              },
              {
                path:'/form/step-form/confirm',
                name:'confirm',
                component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm/step2'),
              },
              {
                path:'/form/step-form/result',
                name:'result',
                component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm/step3'),
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: '*',
    name:'404',
    hideInMenu:true,
    component: NotFound
  },
  {
    path: '/403',
    name:'403',
    hideInMenu:true,
    component: Forbidden
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record=> record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path:'/user/login'
      })
    }else if(to.path !== '/403'){
      notification.error({
        message: '403',
        description:
          '您无权限访问该页面，请联系管理员',
      });
      next({
        path:'/403'
      })
    }
    NProgress.done()
  }
  next()
})

router.afterEach(()=>{
  NProgress.done()
})

export default router
