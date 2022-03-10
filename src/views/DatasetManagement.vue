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
            <td>
          <v-img
  lazy-src="https://picsum.photos/id/11/10/6"
  max-width="80"
  v-bind:src="'https://dataset.vcaptcha.work/'+dataset.dataset_img"
></v-img>  
            </td>
            <td>{{ dataset.dataset_question }}</td>
            <td><v-chip  class="mr-1" color="blue" link outlined pill v-for=" datasets in dataset.dataset_reply" :key="datasets.dataset_reply" >{{datasets}}</v-chip></td>
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
    <DatasetForm 
      title="Create Dataset" 
      v-if="createBoxIsShow" 
      :isCreate="true"
      :cancel="closeCreateBox" 
    />

    <!-- Edit key -->
    <DatasetForm 
      title="Edit Dataset" 
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
import DatasetForm from '../components/DatasetForm.vue';

export default {
  name: 'DatasetManagement',
  metaInfo: {
    title: 'Dataset Management | VCAPTCHA '
  },
  components: {
    DatasetForm,
  },
  data() {
    return {
      id: '',
      image: '',
      question: '',
      answer: '',
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
    showEditBox: function(id, image, question, answer) {
      this.id = id;
      this.image = image;
      this.question = question;
      this.answer = answer;
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
</style>