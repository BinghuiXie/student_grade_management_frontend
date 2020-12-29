import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signin from '@/components/signin';
import Main from '@/components/main';
import Home from '@/components/home';
import GradeSearch from '@/components/home/gradeSearch';
import GradeManage from '@/components/home/gradeManage';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'search', component: GradeSearch },
      { path: 'manage', component: GradeManage },
      { path: 'teacher-manager', component: GradeManage },
      { path: 'student-manager', component: GradeManage },
      { path: 'lesson-manager', component: GradeManage },
    ]
  },
  {
    path: '/',
    redirect: '/main',
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.requireAuth) {
    console.log('需要验证')
    // TODO: 路由守卫
  }
  next();
})

export default router
