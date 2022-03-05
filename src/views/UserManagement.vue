<template>
  <div>
    <v-card outlined>
      <v-container>
        <v-tabs class="mb-2">
          <v-tab :to="{name: 'Dashboard'}">Dashboard</v-tab>
          <v-tab :to="{name: 'KeyManagement'}">Admin</v-tab> <!-- ***must replace to Admin module*** -->
          <v-tab :to="{name: 'DatasetManagement'}">Dataset</v-tab>
          <v-tab :to="{name: 'KeyManagement'}">Users</v-tab> <!-- ***must replace to Users module*** -->
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
  }
</script>
