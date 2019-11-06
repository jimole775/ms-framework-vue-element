<template>
  <div class="navbar">
    <!--<hamburger :toggle-click="toggleSideBar" :is-active="sidebar && sidebar.opened" class="hamburger-container"/>-->

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>

        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
        <el-dropdown class="entid-select" @command="handleCommand">
          <span class="el-dropdown-link" >
            {{ section }}
            <i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in entidData"
              :key="item.id"
              :command="item.id"
            >{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-tooltip :content="$t('navbar.goodRate')" effect="dark" placement="bottom">
          <a :href="asyncGoodRateUrl" target="_blank"><img :src="goodRateIcon"></a>
        </el-tooltip>

        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip> -->

        <!-- <lang-select class="international right-menu-item"/> -->

        <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <div class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="imageUrl ? imageUrl : defaultAvatar" class="user-avatar">
        </div>
      </div>
      <el-dropdown class="entid-select right-menu-item">
        <span class="el-dropdown-link" >
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <router-link to="/change-password">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import operateUnitServer from './../../../api/operateUnitServer'
import { removeToken, removeUserCode } from '@/utils/auth'
import defaultAvatar from '@/assets/avatar.png'
import goodRateIcon from '@/assets/sat.png'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      entidData: [],
      defaultAvatar,
      goodRateIcon,
      goodRateUrl: '',
      section: null,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'imageUrl',
      'device'
    ]),
    userName() {
      return this.$store.getters.userCode
    },
    asyncGoodRateUrl() {
      return this.goodRateUrl
    }
  },
  created() {
    this.getEntid()
  },
  methods: {
    async getEntid() {
      const type = {
        type: 'ent'
      }
      const res = await operateUnitServer.search(type)
      this.entidData = []
      Object.keys(res.data.data).forEach(key => {
        this.entidData.push({
          id: parseInt(key),
          name: res.data.data[key]
        })
      })
      const sectionKey = parseInt(window.localStorage.getItem('entid'))
      for (var item of this.entidData) {
        if (sectionKey === item.id) {
          this.section = item.name
        }
      }

      // 获取好评率url
      const { data: { data: url }} = await operateUnitServer.getGoodRateUrl() || {}
      this.goodRateUrl = url
    },
    handleCommand(command) {
      // 设置经营单位
      location.href = '/'
      this.$store.commit('SET_ENTID', command)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      localStorage.removeItem('entid')
      removeToken()
      removeUserCode()
      console.log('登出，清除登陆信息')
      location.href = '/'
      // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .entid-select {
      cursor: pointer;
      vertical-align: top;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
