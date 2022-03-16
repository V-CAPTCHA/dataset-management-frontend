<template>
  <div class="key-form">
    <v-card width="640" class="form-box">
      <v-card-title>
        {{title}}
      </v-card-title>

      <v-card-text>
        <!-- Email -->
        <v-text-field
          id="email"
          v-model="email"
          label="Email"
          :rules="[rules.required]"
          counter="50"
          required
          outlined
          dense
        ></v-text-field>

        <!-- First Name -->
        <v-text-field
          id="first_name"
          v-model="first_name"
          label="First Name"
          :rules="[rules.required]"
          counter="50"
          required
          outlined
          dense
        ></v-text-field>

        <!-- Last Name -->
        <v-text-field
          id="last_name"
          v-model="last_name"
          label="Last Name"
          :rules="[rules.required]"
          counter="50"
          required
          outlined
          dense
        ></v-text-field>
      </v-card-text>

      <v-container class="pt-0 buttonContainer">
          <!-- Confirm btn -->
          <v-btn 
            id="confirmBtn" 
            color="#1a73e8" 
            depressed dark text
            @click="confirm()"
          >
            Confirm
          </v-btn>

          <!-- Cancel btn -->
          <v-btn 
            id="cancleBtn" 
            color="red" 
            depressed dark text
            @click="cancel()" 
          >
            Cancel
          </v-btn>
        </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AdminForm",
  props: {
    cancel: Function,
    title: String,
    admin_id: Number,
    admin_email: String,
    admin_first_name: String,
    admin_last_name: String,
    isCreate: Boolean,
    isEdit: Boolean,
  },
  data() {
    return {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      rules: {
        required: value => !!value || 'Required.',
      }
    }
  },
  methods: {
    confirm: function() {
      const admin = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
      }

      //create key
      if(this.isCreate) {
        this.$store.dispatch("createAdmin", admin)
        .then(() => {
          this.cancel();
        })
      }
      //edit key
      else if(this.isEdit) {
        const data = {
          id: this.id,
          admin: admin
        }
        this.$store.dispatch("editAdmin", data)
        .then(() => {
          this.cancel();
        })
      }
    }
  },
  mounted() {
    this.id = this.admin_id;
    this.email = this.admin_email;
    this.first_name = this.admin_first_name;
    this.last_name = this.admin_last_name;
  },
}
</script>

<style scoped>
.key-form {
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.form-box {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
</style>