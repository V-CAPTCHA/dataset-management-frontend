<template>
  <div class="dataset-management">     
    <div class="header">
      <v-btn text color="#1a73e8" class="mb-2" @click="showCreateBox()">
        + CREATE DATASET
        </v-btn>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <!-- Headers -->
        <thead>
          <tr>
            <th class="text-left" style="color: white;">ID</th>
            <th class="text-left" style="color: white;">Image</th>
            <th class="text-left" style="color: white;">Question</th>
            <th class="text-left" style="color: white;">Answer</th>
            <th class="text-left" style="color: white;"></th>
          </tr>
        </thead>
        
        <!-- Body -->
        <tbody v-if="!!datasets">
          <tr v-for="dataset in datasets" :key="dataset.dataset_id">
            <td>{{ dataset.dataset_id }}</td>
            <td><img class="imgdataset" v-bind:src="'https://dataset.vcaptcha.work/'+dataset.dataset_img"> </td>
            <td>{{ dataset.dataset_question }}</td>
            <td>{{ dataset.dataset_reply }}</td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs}">
                  <v-btn icon text v-on="on" v-bind="attrs">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-btn plain color="#1a73e8" @click="showEditBox(dataset.dataset_id, key.key_name, key.domain)">Edit</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn plain color="red" @click="deleteDataset(dataset.dataset_id)">Delete</v-btn>
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

    <!-- Create key -->
    <KeyForm 
      title="Create Key" 
      v-if="createBoxIsShow" 
      :isCreate="true"
      :cancel="closeCreateBox" 
    />

    <!-- Edit key -->
    <KeyForm 
      title="Edit Key" 
      v-if="editBoxIsShow" 
      :isEdit="true"
      :cancel="closeEditBox"
      :key_id="id"
      :key_name="name" 
      :key_domain="domain" 
    />

  </div>
</template>

<script>
import KeyForm from '../components/KeyForm.vue';

export default {
  name: 'DatasetManagement',
  metaInfo: {
    title: 'Dataset Management | VCAPTCHA '
  },
  components: {
    KeyForm,
  },
  data() {
    return {
      id: '',
      name: '',
      domain: '',
      datasets: [],
      createBoxIsShow: false,
      editBoxIsShow: false,
    }
  },
  methods: {
    getAllDataset: function() {
      this.$store.dispatch('getAllDataset')
      .then((dataset) => {
        if(dataset === "Dataset does not exist") {
          this.datasets = [];
        }
        else {
          this.datasets = dataset
        }
      })
    },
    showCreateBox: function() {
      this.createBoxIsShow = true;
    },
    closeCreateBox: function() {
      this.createBoxIsShow = false;
    },
    showEditBox: function(id, name, domain) {
      this.id = id;
      this.name = name;
      this.domain = domain;
      this.editBoxIsShow = true;
    },
    closeEditBox: function() {
      this.editBoxIsShow = false;
    },
    confirmCreate: function() {
      console.log('create');
    },
    deleteDataset(id) {
      this.$store.dispatch('deleteDataset', id)
      .then(() => this.getAllDataset())
      
    },
  },
  beforeUpdate() {
    this.getAllDataset();
  },
  mounted() {
    this.getAllDataset();
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
.imgdataset{
  width: 65px;
  padding-top: 8px;
}
</style>