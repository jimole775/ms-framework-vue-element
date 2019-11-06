import { loginByUsername, logout, getAccount } from '@/api/login'
import { setToken, removeToken, removeUserCode } from '@/utils/auth'

const user = {
  // state: {
  //   user: '',
  //   status: '',
  //   code: '',
  //   token: getToken(),
  //   name: '',
  //   avatar: '',
  //   introduction: '',
  //   roles: [],
  //   setting: {
  //     articlePlatform: []
  //   }
  // },
  state: {
    activated: false,
    authorities: [],
    createdBy: '',
    createdDate: null,
    userCode: null,
    roles: [],
    userType: null,
    email: '',
    firstName: '',
    id: -1,
    imageUrl: '',
    langKey: 'en',
    lastModifiedBy: '',
    lastModifiedDate: null,
    lastName: '',
    login: ''
  },

  mutations: {
    set_userCode: (state, userCode) => {
      localStorage.setItem('user', userCode)
      state.userCode = userCode
    },
    set_activated: (state, activated) => {
      state.activated = activated
    },
    set_authorities: (state, authorities) => {
      state.authorities = authorities
    },
    set_createdBy: (state, createdBy) => {
      state.createdBy = createdBy
    },
    set_roles: (state, roles) => {
      state.roles = roles
    },
    set_userType: (state, userType) => {
      state.userType = userType
    },
    set_createdDate: (state, createdDate) => {
      state.createdDate = createdDate
    },
    set_email: (state, email) => {
      state.email = email
    },
    set_firstName: (state, firstName) => {
      state.firstName = firstName
    },
    set_id: (state, id) => {
      state.id = id
    },
    set_imageUrl: (state, imageUrl) => {
      state.imageUrl = imageUrl
    },
    set_langKey: (state, langKey) => {
      state.langKey = langKey
    },
    set_lastModifiedBy: (state, lastModifiedBy) => {
      state.lastModifiedBy = lastModifiedBy
    },
    set_lastModifiedDate: (state, lastModifiedDate) => {
      state.lastModifiedDate = lastModifiedDate
    },
    set_lastName: (state, lastName) => {
      state.lastName = lastName
    },
    set_login: (state, login) => {
      state.login = login
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetAccount({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAccount().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          // const data = response.data.data
          commit('set_userCode', response.data.data.userCode)
          commit('set_login', 'test')
          commit('set_lastName', 'test')
          commit('set_userType', response.data.data.userType)
          const rolesList = response.data.data.roles.map(item => item.roleCode)
          commit('set_roles', rolesList)
          commit('set_authorities', ['admin'])
          resolve({})
        //   commit('set_activated', data.activated)
        //   commit('set_authorities', data.authorities)
        //   commit('set_createdBy', data.createdBy)
        //   commit('set_createdDate', data.createdDate)
        //   commit('set_email', data.email)
        //   commit('set_firstName', data.firstName)
        //   commit('set_id', data.id)
        //   commit('set_imageUrl', data.imageUrl)
        //   commit('set_langKey', data.langKey)
        //   commit('set_lastModifiedBy', data.lastModifiedBy)
        //   commit('set_lastModifiedDate', data.lastModifiedDate)
        //   commit('set_lastName', data.lastName)
        //   commit('set_login', data.login)
        //
        //   resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo().then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data
    //
    //       if (data.authorities && data.authorities.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.authorities)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('set_authorities', [])
          removeToken()
          removeUserCode()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        removeUserCode()
        resolve()
      })
    }
  }
}

export default user
