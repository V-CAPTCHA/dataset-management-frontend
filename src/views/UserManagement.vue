<template>
  <div>
    <v-card outlined>
      <v-container>
        <v-tabs class="mb-2">
          <v-tab v-if="isSuperAdmin" :to="{name: 'Dashboard'}">Dashboard</v-tab>
          <v-tab v-if="isSuperAdmin" :to="{name: 'AdminManagement'}">Admin</v-tab> <!-- ***must replace to Admin module*** -->
          <v-tab :to="{name: 'DatasetManagement'}">Dataset</v-tab> <!-- ***must replace to Dataset module*** -->
          <v-tab :to="{name: 'ManageUser'}">Users</v-tab> <!-- ***must replace to Users module*** -->
        </v-tabs>

        <router-view></router-view>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'VCAPTCHA'
    },
    computed: {
      isSuperAdmin: function() {
        return this.$store.getters.isSuperAdmin
      }
    }
  }
</script>
