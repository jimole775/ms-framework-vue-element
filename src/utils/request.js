import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken, removeUserCode } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['x-frame-options'] = 'SAMEORIGIN'
    // Do something before request is sent
    const token = getToken()
    if (token && token.length > 0) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Token'] = token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    let pagination
    if (response.config.url.indexOf('/_search/') > -1) {
      const page = response.headers['x-page'] || 1
      const size = response.headers['x-size'] || 10
      const count = response.headers['x-total-count'] || response.headers['X-Total-Count'] || 0
      pagination = {
        page: page ? parseInt(page) : 1,
        size: size ? parseInt(size) : 10,
        count: count ? parseInt(count) : 0
      }
    }
    const res = response.data
    if (res.code !== 200 && (res.code === 50008 || res.code === 50012 || res.code === 1707)) {
      // 50008:非法的token; 50012:其他客户端登录了;  1707:Token 过期了;
      localStorage.removeItem('entid')
      removeToken()
      console.log('请求异常，清除登陆信息')
      removeUserCode()
      window.location.hash = '#/login?redirect=' + encodeURIComponent(window.location.hash.substr(1))
    } else if (res.code !== 200) {
      Message({
        message: res.msg.length > 256 ? '服务器发生未知错误，请联系管理员' : res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.msg) {
        throw new Error(JSON.stringify(res.msg))
      } else {
        throw new Error(JSON.stringify(res))
      }
    } else {
      return {
        ...response,
        pagination
      }
    }
  },
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    const status = error.response.status
    if (status >= 500) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (status === 401 && window.location.hash.indexOf('#/login') !== 0) {
      window.location.hash = '#/login?redirect=' + encodeURIComponent(window.location.hash.substr(1))
    } else if (status === 403) {
      Message({
        message: '抱歉您的权限不足',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.warn(error)
    }
    return Promise.reject(error)
  }
)

export default service
