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

            <v-alert v-show="answer.length>=5" dismissible color="red" text type="info"
              >Max set of answer is 5 !!!</v-alert
            >
            <v-text-field
            placeholder="Answer set for dataset"
              label="Answer (max 5)"
              v-model="textchip"
              v-on:keyup.enter="addChips()"
              required
            >
              <template v-slot:prepend-inner>
                <div v-for="(chipText, index) in answer" :key="index">
                  <v-chip @click="delChips(chipText)" class="ma-1">
                    {{ chipText }}
                  </v-chip>
                </div>
              </template>
            </v-text-field>
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
export default {
  name: 'KeyForm',
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
      let DatasetFormData = new FormData();
      DatasetFormData.append('dataset_image_upload', this.files);
      DatasetFormData.append('dataset_question', this.question);
      DatasetFormData.append('dataset_reply', this.answer);

      //create key
      if (this.isCreate) {
        this.$store.dispatch('createDataset', DatasetFormData).then(() => {
          this.cancel();
        });
      }
      //edit key
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
    addChips() {
      if (this.textchip.length && this.answer.length < 5) {
        this.answer.push(this.textchip);
        this.textchip = '';
      }
    },
    delChips(chip) {
      var index = this.answer.indexOf(chip);
      if (index !== -1) {
        this.answer.splice(index, 1);
      }
    },
  },
  mounted() {
    this.id = this.dataset_id;
    this.url = this.datasetAPI + this.dataset_img;
    this.question = this.dataset_question;
    if (this.dataset_reply) {
      this.answer = this.dataset_reply;
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
