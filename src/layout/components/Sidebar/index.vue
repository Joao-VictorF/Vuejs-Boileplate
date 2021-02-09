<template>
  <div :class="{'has-logo':showLogo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <div
          v-for="route in navItens"
          :key="route.path"
        >
          <!-- v-if="showItem(route.meta.role)" -->
          <sidebar-item
            :item="route"
            :base-path="route.path"
          />
        </div>
      </el-menu>
    </el-scrollbar>
    <logo
      v-if="showLogo"
      logo="/mini-logo.png"
      title="Vuejs Boilerplate"
      style="background-color: #284761"
      :collapse="isCollapse"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'role',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    navItens() {
      var navRoutes = []
      this.$router.options.routes.forEach(route => {
        var auxRoute = route
        if (auxRoute.meta.navItem === true) {
          if (auxRoute.children.length > 1) {
            var children = []
            auxRoute.children.forEach(child => {
              if (child.meta.navItem === true) {
                children.push(child)
              }
            })
            auxRoute.children = children
          }
          navRoutes.push(auxRoute)
        }
      })
      return navRoutes
    }
  },
  methods: {
    showItem(item_role) {
      if (item_role.localeCompare('any') === 0) {
        return true
      }
      return item_role.localeCompare(this.role) === 0
    }
  }
}
</script>
