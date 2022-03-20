import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL


export const admin = {
  state: {
    admin: []
  },
  mutations: {
    admin_success(state, admin) {
      state.admin = admin
    }
  },
  actions: {
    //get all admin
    getAllAdmin({commit}) {
      return new Promise((resolve, reject) => {

        axios.get(API_URL+'/admin/all')
        .then(res => {
          if(res.data.message === "get all admin successfully") {
            let admins = res.data.data;
            resolve(admins);
          }
          if(res.data.message === "admin does not exist"){
            resolve("admin does not exist")
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
    //get admin data 
    getAdminData({commit}) {
      return new Promise((resolve, reject) => {
        
        axios.get(API_URL+'/admin')
        .then(res => {
          if(res.data.message === "get admin successfully") {
            let userData = res.data.data;
            resolve(userData);
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
    //change password
    changePassword({commit}, password) {
      return new Promise((resolve, reject) => {

        axios.put(API_URL+'/admin/password', password)
        .then(res => {
          if(res.data.message === "change password successfully"){
            let payload = {
              text: "Change password success",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            resolve(res)
          }
          else {
            let payload = {
              text: "Change password failed",
              snackbar: true
            }
            commit('updateSnackbar', payload, {root: true})
            resolve(res.data.message)
          }
        })
        .catch(err => {
          let payload = {
            text: "Change password failed",
            snackbar: true
          }
          commit('updateSnackbar', payload, {root: true})
          reject(err)
        })
      })
    },
    //create admin
    createAdmin({commit}, admin) {
      return new Promise((resolve, reject) => {

        axios.post(API_URL+'/admin', admin)
        .then(res => {
          if(res.data.message === "create admin successfully") {
            let payload = {
              text: "Create admin success",
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
    //edit admin
    editAdmin({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch(API_URL+'/admin/'+data.id, data.admin).then(res => {
          if(res.data.message === "edit admin successfully") {
            let payload = {
              text: "Edit admin success",
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
    //delete admin
    deleteAdmin({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.delete(API_URL+'/admin/'+id)
        .then(res => {
          if(res.data.message === "delete admin successfully") {
            let payload = {
              text: "Delete admin success",
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