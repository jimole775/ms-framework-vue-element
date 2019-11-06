<template>
  <el-scrollbar :view-style="{overflow: 'hidden'}" wrap-class="scrollbar-wrapper">
    <div class="cen-box" style="height: 50px">
      <img src="../../../../assets/aux_log.png" width="100%" height="18px">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="true"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in meunRouters" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'meunRouters',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
