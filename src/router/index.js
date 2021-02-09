import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import anotherRoutes from './modules/xyzw'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

function firstAccess(to, from, next) {
  var data = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE)) || {}

  if (data.firstAccess === null || data.firstAccess === undefined) {
    next('/login') // go to '/login';
  }

  if (data.firstAccess === true) {
    next()
  } else if (data.firstAccess) {
    next('/login') // go to '/login';
  }
}

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: { navItem: false },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: () => import('../views/home/Home.vue'),
    hidden: true,
    meta: { navItem: false }
  },

  //  Login
  {
    path: '/login',
    component: () => import('@/views/auth/login'),
    hidden: true,
    meta: { navItem: false }
  },

  // Primeiro acesso
  {
    path: '/primeiro-acesso',
    component: () => import('@/views/auth/first_access'),
    hidden: true,
    beforeEnter: firstAccess,
    meta: { navItem: false }
  },

  // Recuperar senha
  {
    path: '/recuperar-senha',
    component: () => import('@/views/auth/recovery_pwd'),
    hidden: true,
    meta: { navItem: false }
  },

  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'Dashboard', icon: 'mdi-view-dashboard', role: 'any', navItem: true },
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'mdi-view-dashboard', role: 'any', navItem: true }
      }
    ]
  },

  // Not found
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: { navItem: false }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
    meta: { navItem: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
    meta: { navItem: false }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // tableRouter,
  // 404 page must be placed at the end !!!
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
