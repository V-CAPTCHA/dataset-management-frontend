<template>
  <div class="manage-user">
    <div class="header">
      <h3>Manage Users</h3>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <!-- Headers -->
        <thead>
          <tr>
            <th class="text-left" style="color: white;">User ID</th>
            <th class="text-left" style="color: white;">Email</th>
            <th class="text-left" style="color: white;">First Name</th>
            <th class="text-left" style="color: white;">Last Name</th>
            <th class="text-left" style="color: white;">Status</th>
            <th class="text-left" style="color: white;"></th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody v-if="!!users">
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.email.split("::")[0] }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td >
              <v-switch
                color="#1a73e8" 
                inset 
                :input-value="user.email.split('::').length === 1"
                @click="changeStatus(user.user_id)"
              ></v-switch>
            </td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs}">
                  <v-btn icon text v-on="on" v-bind="attrs">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-btn plain color="#1a73e8" @click="showEditBox(admin.admin_id, admin.email,admin.first_name, admin.last_name)">Edit</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn plain color="red" @click="deleteAdmin(admin.admin_id)">Delete</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>         
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td></td>
            <td></td>
            <td>User does not exist</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>


<script>
export default {
  name: 'ManageUser',
  metaInfo: {
    title: 'Manage User | VCAPTCHA '
  },
  data() {
    return {
      users: false
    }
  },
  methods: {
    getAllUser: function() {
      this.$store.dispatch('getAllUser')
      .then((users) => {
        if(users === "user does not exist") {
          this.users = [];
        }
        else {
          this.users = users
        }
      })
    },
    changeStatus: function(id) {
      this.$store.dispatch('changeStatus', id)
      .then(() => this.getAllUser())
    }
  },
  beforeUpdate() {
    this.getAllUser();
  },
  mounted() {
    this.getAllUser();
  },
  created() {
    if(!this.isSuperAdmin) 
      this.$router.replace('/DatasetManagement')
  },
  computed: {
    isSuperAdmin: function() {
      return this.$store.getters.isSuperAdmin
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  padding-bottom: 1rem;
}

thead {
  background-color: #1a73e8;
}
</style>