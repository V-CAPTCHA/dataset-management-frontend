<template>
  <div class="changePassword">
    <v-card outlined elevation="0" width="720" class="mx-auto pb-6">
      <!-- Profile -->
      <v-container>
        <h3 class="mb-3">Profile</h3>
        <p class="text-caption" id="name-hint">
          *Admin's first name and last name cannot be edited
        </p>

        <v-text-field
          id="firstName"
          v-model="firstName"
          label="First Name"
          outlined
          dense
          disabled
        ></v-text-field>

        <v-text-field
          id="lastName"
          v-model="lastName"
          label="Last Name"
          outlined
          dense
          disabled
        ></v-text-field>

      </v-container>
      
      <!--Change Password-->
      <v-form>
        <v-container>
          <h3 class="mb-3">Change Password</h3>
          
          <!-- Current password -->
          <v-text-field
            id="currentPassword"
            v-model="currentPassword"
            :rules="[rules.required, rules.minimum]"
            label="Current Password"
            outlined
            dense
            :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showCurrentPassword ? 'text' : 'password'"
            @click:append="showCurrentPassword = !showCurrentPassword"
          ></v-text-field>

          <!-- New password -->
          <v-text-field
            id="newPassword"
            v-model="newPassword"
            :rules="[rules.required, rules.minimum]"
            label="New Password"
            outlined
            dense
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            @click:append="showNewPassword = !showNewPassword"
          ></v-text-field>

          <!-- Password confirmation -->
          <v-text-field
            id="passwordConfirmation"
            v-model="confirmationPassword"
            :rules="[rules.required, rules.minimum, rules.confirm]"
            label="Password Confirmation"
            outlined
            dense
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <div class="buttonContainer">
            <!-- Save password btn -->
            <v-btn
              class="saveBtn" 
              color="#1a73e8" 
              depressed dark
              @click="changePassword()"
            >Save</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'EditProfile',
    metaInfo: {
      title: 'Edit Profile | VCAPTCHA '
    },
    data() {
      return {
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmationPassword: "",
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 50 || 'Max 50 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          minimum: value => value.length >= 8 || 'Min 8 characters.',
          confirm: value => value === this.newPassword || 'Password confirmation does not match.'
        },
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
      }
    },
    methods: {
      //Change password
      changePassword: function() {
        const password = {
          current_password: this.currentPassword,
          new_password: this.newPassword,
        }
        this.$store.dispatch('changePassword', password)
        .then(() => {
          this.currentPassword = ''
          this.newPassword = ''
          this.confirmationPassword = ''
        })
      },
    },
    created() {
      //check expire token
      this.$store.dispatch('checkTokenExp')
      .catch(err => {
        if(err === "expired") {
          this.$store.dispatch('logout')
          this.$router.replace('/login')
        }
      })

      if(!this.$store.getters.isLoggedIn) {
        this.$router.replace('/login')
      }

      //Get admin data on created
      this.$store.dispatch('getAdminData')
      .then((user) => {
        this.firstName = user.first_name;
        this.lastName = user.last_name;
      })
    },
    computed: {
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn
      }
    }
  }
</script>


<style scope>
.changePassword h3 {
  border-bottom: 1px solid lightgrey;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
}

#name-hint {
  color: gray;
  margin-bottom: 1rem;
  cursor: context-menu;
}

#firstName:hover, #lastName:hover {
  cursor: context-menu;
}
</style>