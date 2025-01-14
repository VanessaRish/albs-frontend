import { boot } from 'quasar/wrappers'
import axios from 'axios'
import store from '../store/index'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.request.use(config => {
  if (!config.headers['authorization']) {
    config.headers['authorization'] = `Bearer ${store.getters.accessToken}`;
  }
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api }
