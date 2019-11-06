import router from './router'
import store from './store'
import { Message } from 'element-ui'
import request from '@/utils/request'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, setToken } from '@/utils/auth' // getToken from cookie
import access from '@/access-middleware'
import { getAccount } from '@/api/login'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach(async(to, from, next) => {
  if (!access.sniffExternalAccess()) return
  NProgress.start() // start progress bar

  // 由于双 '//' 路由无法访问, 在这里进行拦截，重定向
  if (to.path === '//todo-pool') {
    return next('/todo-pool')
  }
  
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not triggestorer	afterEach hook, so manually handle it
    } else {
      if (store.getters.authorities.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetAccount').then(res => { // 拉取user_info
          // const authorities = res.data.authorities // note: roles must be a array! such as: ['editor','develop']
          const authorities = ['admin']
          store.dispatch('GenerateRoutes', { authorities }).then(() => { // 根据roles权限生成可访问的路由表
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            
            const dataPost = {
              config: 'ACT_AUX_MENU_002'
            }
            request({
              url: '/superback/api/1.0.0/base/selectList',
              method: 'post',
              data: dataPost
            }).then(res => {
              const menuList = getMenuList(res.data.data)
              renderMenu(menuList[0].children)
            }).catch(error => {
              console.log(error)
            })

            NProgress.done()
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
          NProgress.done()
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //  next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
        /** 如果url带有token,替换本地token,并使用GetAccount从服务器换取用户数据*/
        if (to.query && to.query.token) {
          setToken(to.query.token)
          getAccount().then(response => {
            if (!response || !response.data || !response.data.data) {
              next(`/login?redirect=${to.path}`)
            }
            // 登录成功，经营单位默认设置为家电组织
            store.commit('SET_ENTID', to.query.entid || 101)
            store.commit('set_userCode', response.data.data.userCode)
            store.commit('set_userType', response.data.data.userType)
            const rolesList = response.data.data.roles.map(item => item.roleCode)
            store.commit('set_roles', rolesList)
            const dataPost = {
              config: 'ACT_AUX_MENU_002'
            }
            request({
              url: '/superback/api/1.0.0/base/selectList',
              method: 'post',
              data: dataPost
            }).then(res => {       
              /**
               * 如果没有菜单的数据（当前用户没有任何权限）
               * 直接置空左侧菜单栏
               * 这种情况一般出现在直接用token顶掉当前用户
               * 两个用户之间权限不一样，需要重刷左侧菜单
              **/
              if (res && res.data && res.data.data) {
                const menuList = getMenuList(res.data.data)
                renderMenu(menuList[0].children)
              } else {
                store.dispatch('GenerateMeun', [])
              }
            }).catch(error => {
              console.log(error)
            })
            next(to.path) // 重定向
            NProgress.done()
          })
        } else {
          next()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      if (to.query && to.query.token) {
        setToken(to.query.token)
        getAccount().then(response => {
          if (!response || !response.data || !response.data.data) {
            next(`/login?redirect=${to.path}`)
          }
          // 登录成功，经营单位默认设置为家电组织
          store.commit('SET_ENTID', to.query.entid || 101)
          store.commit('set_userCode', response.data.data.userCode)
          store.commit('set_userType', response.data.data.userType)
          const rolesList = response.data.data.roles.map(item => item.roleCode)
          store.commit('set_roles', rolesList)
          const dataPost = {
            config: 'ACT_AUX_MENU_002'
          }
          request({
            url: '/superback/api/1.0.0/base/selectList',
            method: 'post',
            data: dataPost
          }).then(res => {
            /**
             * 如果没有菜单的数据（当前用户没有任何权限）
             * 直接置空左侧菜单栏
             * 这种情况一般出现在直接用token顶掉当前用户
             * 两个用户之间权限不一样，需要重刷左侧菜单
            **/
            if (res && res.data && res.data.data) {
              const menuList = getMenuList(res.data.data)
              renderMenu(menuList[0].children)
            } else {
              store.dispatch('GenerateMeun', [])
            }
          }).catch(error => {
            console.log(error)
          })
          next(to.path) // 重定向
          NProgress.done()
        })
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 将菜单分级
function getMenuList(list) {  
  const menu = [
    {
      menuCode: '',
      label: '系统菜单',
      children: []
    }
  ]
  // 获取二级菜单
  list.forEach(element => {
    menu.forEach(item => {
      if (item.menuCode === element.menuPcode) {
        item.children.push(
          {
            ...element,
            children: []
          }
        )
      }
    })
  })
  // 获取三级菜单
  list.forEach(element => {
    menu.forEach(item2 => {
      item2.children.forEach(item => {
        const menuUrlBase = item.menuUrl
        if (item.menuCode === element.menuPcode) {
          item.children.push(
            {
              ...element,
              menuUrl: menuUrlBase + '/' + element.menuUrl,
              children: []
            }
          )
        }
      })
    })
  })
  // 获取四级菜单
  list.forEach(element => {
    menu.forEach(item2 => {
      item2.children.forEach(item3 => {
        item3.children.forEach(item => {
          const menuUrlBase = item.menuUrl
          if (item.menuCode === element.menuPcode) {
            item.children.push(
              {
                ...element,
                menuUrl: menuUrlBase + '/' + element.menuUrl,
                children: []
              }
            )
          }
        })
      })
    })
  })
  // 获取五级菜单
  list.forEach(element => {
    menu.forEach(item2 => {
      item2.children.forEach(item3 => {
        item3.children.forEach(item4 => {
          item4.children.forEach(item => {
            const menuUrlBase = item.menuUrl
            if (item.menuCode === element.menuPcode) {
              item.children.push(
                {
                  ...element,
                  menuUrl: menuUrlBase + '/' + element.menuUrl,
                  children: []
                }
              )
            }
          })
        })
      })
    })
  })
  return menu
}

function renderMenu(result) {  
  let uuid = 1
  const menuList = []
  result.forEach(data => getMenuData(data, null))

  function getMenuData(data, parent) {
    let node
    if (data.children && data.children.length > 0) {
      node = {
        path: (++uuid).toString(),
        key: uuid.toString(),
        name: data.menuName,
        fq: data.fq,
        children: [],
        meta: {
          title: data.menuName,
          icon: data.menuIcon
        }
      }
      data.children.forEach(item => getMenuData(item, node))
    } else {
      // 首页路径配置
      if (data.menuUrl === '///') {
        data.menuUrl = '/'
      }
      node = {
        path: data.menuUrl,
        key: data.menuUrl,
        name: data.menuName,
        fq: data.fq,
        children: null,
        meta: {
          title: data.menuName,
          icon: data.menuIcon
        }
      }
    }
    if (parent) {
      parent.children.push(node)
    } else {
      menuList.push(node)
    }
  }
  store.dispatch('GenerateMeun', menuList)
}
