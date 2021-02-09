<template>
  <v-container>
    <admin-dashboard v-if="role.localeCompare('Admin') == 0" />
    <therapist-dashboard v-if="role.localeCompare('Therapist') == 0" />
    <client-dashboard v-if="role.localeCompare('Client') == 0" />
  </v-container>
</template>

<script>
export default {
  components: {
    AdminDashboard: () => import('./admin/dashboard')
  },
  data() {
    return {
      role: ''
    }
  },
  mounted() {
    this.role = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE)).__t
  }
}
</script>
