<template>
  <div class="key-form">
    <v-card width="840" class="form-box">
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text>
        <!-- Image -->

        <v-row>
          <v-col cols="4">
            <v-img
              lazy-src="../assets/banner.jpg"
              max-height="100%"
              :src="url"
            ></v-img>
            <v-file-input
              v-model="files"
              accept="image/png, image/jpeg, image/gif"
              placeholder="Select an image"
              prepend-icon="mdi-file-image"
              label="Click here for select image"
              show-size
              @change="onFileChange"
            ></v-file-input>
          </v-col>

          <v-col cols="8">
            <!-- Question -->

            <v-text-field
              id="question"
              v-model="question"
              :rules="[rules.required]"
              label="Question"
              required
              placeholder="Question for dataset"
              outlined
              dense
            ></v-text-field>
            <!-- textchip -->

            <vue-tags-input
              v-model="textchip"
              id="taginput"
              :tags="tags"
              @tags-changed="(newTags) => (tags = newTags)"
              :placeholder="'Enter set of answers'"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <span class="d-flex flex-wrap">
        <v-container class="pt-0 buttonContainer">
          <!-- Confirm btn -->
          <v-btn
            id="confirmBtn"
            color="#1a73e8"
            depressed
            dark
            text
            @click="confirm()"
          >
            Confirm
          </v-btn>

          <!-- Cancel btn -->
          <v-btn
            id="cancleBtn"
            color="red"
            depressed
            dark
            text
            @click="cancel()"
          >
            Cancel
          </v-btn>
        </v-container>
      </span>
    </v-card>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: 'KeyForm',
  components: {
    VueTagsInput,
  },
  props: {
    cancel: Function,
    title: String,
    dataset_id: Number,
    dataset_img: String,
    dataset_question: String,
    dataset_reply: Array,
    isCreate: Boolean,
    isEdit: Boolean,
  },
  data() {
    return {
      id: '',
      files: [],
      question: '',
      textchip: '',
      tags: [],
      answer: [],
      url: null,
      datasetAPI: process.env.VUE_APP_DATASET_URL,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  methods: {
    confirm: function() {
      this.answer = []
        this.tags.map((tag) => {
        this.answer.push(tag.text)
        })
      let DatasetFormData = new FormData();
      DatasetFormData.append('dataset_image_upload', this.files);
      DatasetFormData.append('dataset_question', this.question);
      DatasetFormData.append('dataset_reply', this.answer);

      //create dataset
      if (this.isCreate) {
        this.$store.dispatch('createDataset', DatasetFormData).then(() => {
          this.cancel();
        });
      }
      //edit dataset
      else if (this.isEdit) {
        let DatasetFormData = new FormData();
        DatasetFormData.append('id', this.id);
        DatasetFormData.append('dataset_image_upload', this.files);
        DatasetFormData.append('new_dataset_question', this.question);
        DatasetFormData.append('new_dataset_reply', this.answer);
        
        this.$store.dispatch('editDataset', DatasetFormData).then(() => {
          this.cancel();
        });
      }
    },
    onFileChange: function(e) {
      this.url = URL.createObjectURL(this.files);
    },
  },
  mounted() {
    this.id = this.dataset_id;
    this.url = this.datasetAPI + this.dataset_img;
    this.question = this.dataset_question;
    if (this.dataset_reply) {
      this.answer = this.dataset_reply;
      this.answer.map((item) => {
        var data = {
          text: item ,
          tiClasses:
            'ti-valid' ,
        };
        this.tags.push(data);
      });
    } else {
      this.answer = [];
      this.question = '';
    }
  },
};
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
