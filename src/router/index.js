import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/login' //登录页面
import index from '@/views/index' //首页
import more from '@/views/look_compony' //公司详情
import zhiwei_list from '@/views/zhiwei_list'; //职位详情
import pass from '@/views/pass'; // 投递记录
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Login, //登录页面
    meta: {
      title: '欢迎访问大学生招聘系统'
    },
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      title: '首页'
    },
  },
  {
    path: '/more',
    name: 'more',
    component: more,
    meta: {
      title: '企业岗位'
    },
    //props: true

  },
  {
    path: '/zhiwei_list',
    name: 'zhiwei_list',
    component: zhiwei_list,
    meta: {
      title: '岗位详情'
    },
    //props: true

  },{
    path: '/pass',
    name: 'pass',
    component: pass,
    meta: {
      title: '我的投递'
    },
    //props: true
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router