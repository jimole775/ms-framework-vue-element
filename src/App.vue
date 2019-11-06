<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import store from './store'
export default {
  name: 'App',
  components: {
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    store.dispatch('updateWidth')
    setTimeout(() => {
      store.dispatch('updateWidth')
    }, 100)
    window.addEventListener('resize', () => {
      store.dispatch('updateWidth')
    })
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
/*公共样式库*/
body{
 font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
.max-w {
  width: 100% !important;
  float: left;
}

.max-h {
  height: 100% !important;
  float: left;
}

.f-l {
  float: left !important;
}

.f-r {
  float: right !important;
}

.gray {
  color: #878787 !important;
}

.color-gray-5 {
  color: #848c99;
}

.color-gray-7 {
  color: #666666;
}

.color-green-5 {
  color: #519983;
}

.color-yellow-5 {
  color: #fbdc71;
}

.color-black-7 {
  color: #292d33;
}

.color-black-5 {
  color: #444;
}

.color-black {
  color: black;
}

.color-red-5 {
  color: #ff7575;
}

.color-white {
  color: #ffffff;
}

.background-gray-2 {
  background-color: #f3f5f9;
}

.background-gray-3 {
  background-color: #eef0f4;
}

.background-gray-4 {
  background-color: #e8eaee;
}

.background-gray-5 {
  background-color: #d0d0d0;
}

.background-green-5 {
  background-color: #519983;
}

.background-yellow-5 {
  background-color: #fbdc71;
}

.background-red-5 {
  background-color: #ff7575;
}

.background-white {
  background-color: #ffffff;
}

.cen-box {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.cen-box {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.cen-left {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}

.cen-right {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}

.cen-down {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: flex-end;
  align-items: flex-end;
  -webkit-justify-content: center;
  justify-content: center;
}

.cen-up {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
}

.font-size-2 {
  font-size: 12px;
}

.font-size-4 {
  font-size: 14px;
}

.font-size-6 {
  font-size: 16px;
}

.font-size-7 {
  font-size: 17px;
}

.font-size-8 {
  font-size: 18px;
}

.font-size-9 {
  font-size: 19px;
}

.font-size-10 {
  font-size: 20px;
}

.font-size-25 {
  font-size: 25px;
}

.font-size-30 {
  font-size: 30px;
}

.font-size-40 {
  font-size: 40px;
}

.font-size-50 {
  font-size: 50px;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: bold;
}

.m-24 {
  margin: 24px;
}

.m-l-12 {
  margin-left: 12px;
}

.m-l-24 {
  margin-left: 24px;
}

.m-l-48 {
  margin-left: 48px;
}

.m-r-12 {
  margin-right: 12px;
}

.m-r-24 {
  margin-right: 24px;
}

.m-r-48 {
  margin-right: 48px;
}

.m-t-6 {
  margin-top: 6px;
}

.m-t-12 {
  margin-top: 12px;
}

.m-t-24 {
  margin-top: 24px;
}

.m-t-48 {
  margin-top: 48px;
}

.m-b-12 {
  margin-bottom: 12px;
}

.m-b-24 {
  margin-bottom: 24px;
}

.m-b-48 {
  margin-bottom: 48px;
}

.p-l-12 {
  padding-left: 12px;
}

.p-l-24 {
  padding-left: 24px;
}

.p-l-48 {
  padding-left: 12px;
}

.p-r-12 {
  padding-right: 12px;
}

.p-r-24 {
  padding-right: 24px;
}

.p-r-48 {
  padding-right: 48px;
}

.p-t-12 {
  padding-top: 12px;
}

.p-t-24 {
  padding-top: 24px;
}

.p-t-48 {
  padding-top: 48px;
}

.p-b-12 {
  padding-bottom: 12px;
}

.p-b-24 {
  padding-bottom: 24px;
}

.p-b-48 {
  padding-bottom: 48px;
}

.p-12 {
  padding: 12px;
}

.p-24 {
  padding: 24px;
}

.span-1 {
  width: 4.1666%;
  float: left;
}

.span-2 {
  width: 8.3333%;
  float: left;
}

.span-3 {
  width: 12.5%;
  float: left;
}

.span-4 {
  width: 16.6666%;
  float: left;
}

.span-5 {
  width: 20.8333%;
  float: left;
}

.span-6 {
  width: 25%;
  float: left;
}

.span-7 {
  width: 29.1666%;
  float: left;
}

.span-8 {
  width: 33.3333%;
  float: left;
}

.span-9 {
  width: 37.5%;
  float: left;
}

.span-10 {
  width: 41.6666%;
  float: left;
}

.span-11 {
  width: 45.8333%;
  float: left;
}

.span-12 {
  width: 50%;
  float: left;
}

.span-13 {
  width: 54.1666%;
  float: left;
}

.span-14 {
  width: 58.3333%;
  float: left;
}

.span-15 {
  width: 62.5%;
  float: left;
}

.span-16 {
  width: 66.6666%;
  float: left;
}

.span-17 {
  width: 70.8333%;
  float: left;
}

.span-18 {
  width: 75%;
  float: left;
}

.span-19 {
  width: 79.1666%;
  float: left;
}

.span-20 {
  width: 83.3333%;
  float: left;
}

.span-21 {
  width: 87.5%;
  float: left;
}

.span-22 {
  width: 91.6666%;
  float: left;
}

.span-23 {
  width: 95.8333%;
  float: left;
}

.span-24 {
  width: 100%;
  float: left;
}

.m-t-not {
  margin-top: 0 !important;
}

/*公共样式库，以上*/

.container {
  width: calc(100% - 24px);
  margin: 12px;
  padding: 12px;
  background-color: #ffffff;
  float: left;
}

.block {
  width: calc(100% - 24px);
  margin: 12px;
  padding: 12px;
  background-color: #ffffff;
  float: left;
}

.data-col-title {
  text-align: right;
  padding-right: 6px;
  height: 40px;
}

.data-col-content {
  font-weight: bold;
  height: 40px;
}

.el-button [class*="fa-"] + span {
  margin-left: 5px;
}

.el-dialog {
  margin-bottom: 24px;
}

.el-form-item__content .el-input {
  display: block;
}

.el-pagination .el-pagination__editor {
  display: inline-block;
}

.el-table th {
  background-color: #f4f3f5;
}

.el-table--medium td {
  padding: 1px 0;
}

.el-table__header-wrapper th,
.el-table--medium th {
  padding: 0;
}

.el-table th > .cell {
  font-size: 13px;
}

.el-input.is-disabled .el-input__inner {
  color: #606266;
}
.el-input__inner {
  padding: 0 10px;
}
.el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.el-input--suffix .el-input__inner {
  padding-right: 10px;
}
/* 禁止双击选中 */
/* body {
    -moz-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    -khtml-user-select:none;
    user-select:none;
  } */

.el-input__inner {
  padding: 0 6px;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 12px;
}

.el-textarea__inner {
  padding: 5px 6px;
}
/* 调整页面文字颜色 */
/* input::-webkit-input-placeholder { */
  /* placeholder颜色  */
  /* color: #333333 !important; */
/* } */
/* .el-form-item__label,
.el-table,
.el-dialog__title,
.el-dialog__body,
.el-button--default,
.el-select-dropdown__item,
.el-alert__title,
.el-dropdown,
.el-breadcrumb__item .el-breadcrumb__inner,
.no-redirect,
.el-tabs__item .is-top,
.el-pagination__total,
.el-pagination__jump,
.el-input__inner,
.el-tabs--border-card > .el-tabs__header .is-top,
.el-table thead {
  color: #333333 !important;
} */
.el-table {
  color: #3c4353;
}
.el-table thead {
  color: #313235;
}
.el-tabs--border-card > .el-tabs__header .is-active {
  color: #409eff !important;
}
/* 使左侧导航栏就算是最小化时能够显示出文字，而不是只有 icon */
#app .hideSidebar .el-menu--collapse .el-submenu > .el-submenu__title > span {
  height: auto;
  width: auto;
  overflow: auto;
  visibility: inherit;
}
#app .hideSidebar .sidebar-container {
  width: 138px !important;
}
#app .hideSidebar .main-container {
  margin-left: 138px;
}
/* 设置导航菜单颜色 */
#app .sidebar-container .is-active > .el-submenu__title {
  color: white !important;
  background-color: #409EFF !important;
}
#app .sidebar-container .is-active > .el-submenu__title:hover {
  color: white !important;
  background-color: #409EFF !important;
}
.el-submenu__title:hover {
  color: white !important;
  background-color: #409EFF !important;
}
.el-menu-item.is-active {
  color: white !important;
  background-color: #409EFF !important;
}
.el-menu-item:hover {
  color: white !important;
  background-color: #409EFF !important;
}
/* 一级目录激活色 */
#app .el-menu--collapse .is-opened .el-submenu__title {
  color: white !important;
  background-color: #409EFF !important;
}
/* #app .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #cccccc !important;
  border-color: #cccccc !important;
} */
/* 中间激活菜单样式 */
.el-menu--vertical .el-menu .menu-wrapper .is-active .el-submenu__title {
  color: white !important;
  background-color: #409EFF !important;
}
.el-menu--vertical .el-menu .menu-wrapper:hover .el-submenu__title {
  color: white !important;
  background-color: #409EFF !important;
}
.el-menu--vertical {
  max-height:90% !important;
  overflow:auto !important;
}
/* 主要兼容某些浏览器下边滚动条遮盖文本的情况 */
table.el-table__body{
  padding-bottom: 1rem;
}
/* 工作提醒样式统一 */
#app .el-badge__content.is-fixed {
  right: 0px !important;
  position: absolute;
  top: 10.8px !important;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
/* tr.el-table__row td {
    height: 45px;
    line-height: 45px;
    min-height: 45px;
} */
.el-form-item {
  margin-bottom: 0.8rem;
}
.el-form-item__error {
  padding-top: 0;
}
</style>
