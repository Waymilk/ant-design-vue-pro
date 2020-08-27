import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import NProgress from 'nprogress'

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
        meta:{icon:'form',title:'表单'},
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
            name: 'StepForm',
            meta:{title:'分步表单'},
            hideInChildrenMenu:true,
            component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm'),
            children:[
              {
                path:'form/step-form',
                redirect:'form/step-form/info'
              },
              {
                path:'form/step-form/info',
                redirect:'info',
                component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm/step1'),
              },
              {
                path:'form/step-form/confirm',
                redirect:'confirm',
                component: () => import(/* webpackChunkName: "form" */  '../views/Forms/stepForm/step2'),
              },
              {
                path:'form/step-form/result',
                redirect:'result',
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
  next()
})

router.afterEach(()=>{
  NProgress.done()
})

export default router
