### 公共方法
```
/**
* 根据页面名称来关闭子页面
* @param function name 方法名
* @param 被删除页面名称
*/
window.eventBus.$emit('closePage', 'FinancingRegistration') 

/**
* 根据页面路径来关闭子页面
* @param function name 方法名
* @param 被删除页面路径
*/
window.eventBus.$emit('closePagePath', '/financing-registration/edit/1') 
```


### 公共组件

ShipmentNoticeSelectPopup 出货预告的多选弹窗
