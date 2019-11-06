/**
 * 这个模块主要用于访问的中转功能
 * 创建这个模块的用意在于：
 * 1. 可以在webpack中配置类似于 "主机地址" 这种敏感信息
 * 2. 可以使用ES6等高级语法
 * 不过，由于这个模块必须在main.js中加载，
 * 这样会导致，每次跳转的时候都不可避免的加载了一次主页（虽然时间比较短）
 */
import request from '@/utils/request'
class AccessMiddleware {
  sniffExternalAccess() {
    return new Promise((s, j) => {
      // fullPath: "/?from=singlemessage&isappinstalled=0#/DZ-manage/submit-amend/order-notice/edit/73&b=170306119/"
      // hash: "#/DZ-manage/submit-amend/order-notice/edit/73&b=170306119/"
      // 如果有 url 包含 &b= ，就是OA跳转页    
      if (/[\?\&]+b\=/.test(location.href)) {            
        const { hash, origin } = this.compatibleURI()
        const WAP_HOST = process.env.WAP_HOST
        const spillSign = /\?/.test(hash) ? '&' : '?'
        // const { data: { data: token, code }} = await this.gotToken()
        this.gotToken().then(({ data: { data: token, code }}) => {
          if (Number.parseInt(code) === 200) {
            localStorage.clear()
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
              window.open(`${WAP_HOST}/${hash}${spillSign}token=${token}`, '_self')
            } else {
              window.open(`${origin}/${hash}${spillSign}token=${token}`, '_self')
            }                    
            return s(false)
          } else {
            return s(true)
          }
        }).catch(() => {
          return s(true)
        })        
      } else {
        return s(true)
      }
    })   
  }

  gotToken() {
    const { hash } = location
    const matchSign = hash.match(/[\&|\?]+b\=/)[0]
    const userCode = hash.split(matchSign)[1].replace(/\//g, '')
    return request({
      url: '/superback/api/1.0.0/auxUser/getTokenByUserCode',
      method: 'POST',
      data: {
        params: { userCode }
      }
    })
  }

  compatibleURI() {
    let { hash, origin } = location
    // fullPath: "/?from=singlemessage&isappinstalled=0#/DZ-manage/submit-amend/order-notice/edit/73&b=170306119/"
    // 首先，把 &b=170306119 截取出来, 拼接到 search 字段
    const matchSign = hash.match(/[\&|\?]+b\=/)[0]
    // fullPath: "/?from=singlemessage&isappinstalled=0#/DZ-manage/submit-amend/order-notice/edit/73&b=170306119/"
    // 重新调整 hash 值
    hash = hash.split(matchSign)[0]
    origin = origin + ''
    return { hash, origin }
  }
}

export default new AccessMiddleware()
