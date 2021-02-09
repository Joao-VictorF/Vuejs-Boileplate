<template>
  <v-container class="background">
    <v-row v-if="loading">
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="i in 4"
            :key="i"
            lg="6"
            md="12"
            sm="12"
            cols="12"
          >
            <v-skeleton-loader
              class="mx-auto"
              type="card"
              height="110"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      v-else
      justify="center"
    >
      <v-col cols="12">
        <panel-group
          :x="1000"
          :y="2000"
          :z="3000"
          :w="4000"
          @panel-click="handlePanelClick"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup: () => import('./components/PanelGroup')
  },
  data() {
    return {
      loading: true,
      dashboardData: {},
      pageIndex: 1
    }
  },
  mounted() {
    this.getDashboard()
  },
  methods: {
    getDashboard() {
      request({
        url: '/admin-dashboard',
        method: 'get'
      })
        .then((res) => {
          this.loading = false
          this.dashboardData = res.data.data
        })
        .catch((err) => {
          this.$notify.error({
            title: 'Algo de errado aconteceu!',
            message: err.response.data.message,
            position: 'bottom-right'
          })
        })
    },
    handlePanelClick(index) {
      this.pageIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
