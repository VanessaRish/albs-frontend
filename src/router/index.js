import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '../store/index'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory = process.env.SERVER
? createMemoryHistory
: (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
})

Router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if (!store.getters.isAuthenticated && !to.path.startsWith('/auth')) {
    next({ path: '/auth/login' })
  } else {
    next()
  }
})

export default route(Router)
