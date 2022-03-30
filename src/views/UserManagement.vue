<template>
  <div>
    <v-card outlined>
      <v-container>
        <v-tabs class="mb-2">
          <v-tab v-if="isSuperAdmin" :to="{name: 'Dashboard'}">Dashboard</v-tab>
          <v-tab v-if="isSuperAdmin" :to="{name: 'AdminManagement'}">Admin</v-tab> 
          <v-tab :to="{name: 'DatasetManagement'}">Dataset</v-tab>
          <v-tab :to="{name: 'ManageUser'}">Users</v-tab> 
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
    created() {
      //check super admin
      this.$store.dispatch('checkSuperAdmin')
    },
    computed: {
      isSuperAdmin: function() {
        return this.$store.getters.isSuperAdmin
      }
    }
  }
</script>
