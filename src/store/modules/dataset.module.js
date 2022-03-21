import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL


export const dataset = {
  state: {
    dataset: []
  },
  mutations: {
    key_success(state, dataset) {
      state.dataset = dataset
    }
  },
  actions: {
    //get all key
    getAllDataset({commit}) {
      return new Promise((resolve, reject) => {
        
        axios.get(API_URL+'/dataset')
        .then(res => {
          if(res.data.message === "get all dataset successfully") {
            let dataset = res.data.data;
            for(let i = 0; i < dataset.length; i++){
              dataset[i].dataset_reply = dataset[i].dataset_reply.split(",");
            }
            
            resolve(dataset);
          }
          if(res.data.message === "Dataset does not exist"){
            resolve("Dataset does not exist")
          }
        })
        .catch(err => {
          let payload = {
            text: "Something wrong please try again",
            snackbar: true
          }
          commit('updateSnackbar', payload, {root: true})
          reject(err)
        })
      }) 
    },
    //create key
    createDataset({commit}, dataset) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL+'/dataset', dataset ,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if(res.data.message === "create dataset successfully") {
            let payload = {
              text: "Create dataset sucess",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            resolve(res)
          }
          else {
            let payload = {
              text: "Something wrong please try again",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            reject(res.data.message);
          }
        })
        .catch(err => {
          let payload = {
              text: "Something wrong please try again",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
          reject(err)
        })
      })
    },
    //edit key
    editDataset({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch(API_URL+'/dataset/'+data.get('id'), data).then(res => {
          console.log(data)
          if(res.data.message === "edit dataset successfully") {
            let payload = {
              text: "Edit key sucess",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            resolve(res)
          }
          else {
            let payload = {
              text: "Something wrong please try again",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            reject(res.data.message)
          }
        }).catch(err => {
          let payload = {
            text: "Something wrong please try again",
            snackbar: true
          }
          commit('updateSnackbar', payload, {root: true})
          reject(err)
        })
      })
    },
    //delete key
    deleteDataset({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.delete(API_URL+'/dataset/'+id)
        .then(res => {
          if(res.data.message === "delete dataset successfully") {
            let payload = {
              text: "Delete dataset sucess",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            resolve(res)
          }
          else {
            let payload = {
              text: "Something wrong please try again",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            reject(res.data.message)
          }
        })
        .catch(err => {
          let payload = {
            text: "Something wrong please try again",
            snackbar: true
          }
          commit('updateSnackbar', payload, {root: true})
          reject(err)
        })
      })
    }
  },
}