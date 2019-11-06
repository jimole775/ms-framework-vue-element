import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getAccount() {
  return request({
    url: '/superback/api/1.0.0/auxUser/getLoginUserInfo',
    method: 'get'
  })
}

export function authenticate(param) {
  const data = {
    params: { ...param }
  }
  return request({
    url: '/sso/api/1.0.0/auto/userLogin',
    method: 'post',
    data
  })
}
