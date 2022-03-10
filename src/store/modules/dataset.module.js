import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL


export const dataset = {
  state: {
    dataset: []
  },
  mutations: {
    key_success(state, key) {
      state.dataset = key
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
            resolve(dataset);
          }
          if(res.data.message === "key does not exist"){
            resolve("key does not exist")
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
    createKey({commit}, key) {
      return new Promise((resolve, reject) => {

        axios.post(API_URL+'/keys', key)
        .then(res => {
          if(res.data.message === "create key successfully") {
            let payload = {
              text: "Create key sucess",
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
    editKey({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch(API_URL+'/keys/'+data.id, data.key).then(res => {
          if(res.data.message === "edit key successfully") {
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
    deleteKey({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.delete(API_URL+'/keys/'+id)
        .then(res => {
          if(res.data.message === "delete key successfully") {
            let payload = {
              text: "Delete key sucess",
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