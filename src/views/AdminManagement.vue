<template>
  <div class="admin-management">     
    <div class="header">
      <v-btn text color="#1a73e8" class="mb-2" @click="showCreateBox()">
        + CREATE ADMIN
        </v-btn>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <!-- Headers -->
        <thead>
          <tr>
            <th class="text-left" style="color: white;">ID</th>
            <th class="text-left" style="color: white;">Email</th>
            <th class="text-left" style="color: white;">First Name</th>
            <th class="text-left" style="color: white;">Last Name</th>
            <th class="text-left" style="color: white;"></th>
          </tr>
        </thead>
        
        <!-- Body -->
        <tbody v-if="!!admins">
          <tr v-for="admin in admins" :key="admin.admin_id">
            <td>{{ admin.admin_id }}</td>
            <td>{{ admin.email }}</td>
            <td>{{ admin.first_name }}</td>
            <td>{{ admin.last_name }}</td>
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
            <td>ไม่มี</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- Create admin -->
    <AdminForm 
      title="Create Admin" 
      v-if="createBoxIsShow" 
      :isCreate="true"
      :cancel="closeCreateBox" 
    />

    <!-- Edit admin -->
    <AdminForm 
      title="Edit Admin" 
      v-if="editBoxIsShow" 
      :isEdit="true"
      :cancel="closeEditBox"
      :admin_id="admin_id"
      :admin_email="email"
      :admin_first_name="first_name" 
      :admin_last_name="last_name" 
    />

  </div>
</template>

<script>
import AdminForm from '../components/AdminForm.vue';

export default {
  name: 'Home',
  metaInfo: {
    title: 'Admin Management | VCAPTCHA '
  },
  components: {
    AdminForm,
  },
  data() {
    return {
      admin_id: '',
      email: '',
      first_name: '',
      last_name: '',
      admins: [],
      createBoxIsShow: false,
      editBoxIsShow: false,
    }
  },
  methods: {
    getAllAdmin: function() {
      this.$store.dispatch('getAllAdmin')
      .then((admins) => {
        if(admins === "admin does not exist") {
          this.admins = [];
        }
        else {
          this.admins = admins
        }
      })
    },
    showCreateBox: function() {
      this.createBoxIsShow = true;
    },
    closeCreateBox: function() {
      this.createBoxIsShow = false;
    },
    showEditBox: function(admin_id, email, first_name, last_name) {
      this.admin_id = admin_id;
      this.email = email;
      this.first_name = first_name;
      this.last_name = last_name;
      this.editBoxIsShow = true;
    },
    closeEditBox: function() {
      this.editBoxIsShow = false;
    },
    confirmCreate: function() {
      console.log('create');
    },
    deleteAdmin(id) {
      this.$store.dispatch('deleteAdmin', id)
      .then(() => this.getAllAdmin())
      
    },
  },
  beforeUpdate() {
    this.getAllAdmin();
  },
  mounted() {
    this.getAllAdmin();
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
}

thead {
  background-color: #1a73e8;
}

</style>