import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export const user = {
  state: {
    user: "",
  },
  mutations: {
    user_request(state) {
      state.status = 'loading'
    },
    user_success(state, user) {
      state.user = user
    },
    user_error(state) {
      state.status = 'error'
    },
  },
  actions: {
    //get all user data
    getAllUser({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL+'/users')
        .then(res => {
          if(res.data.message === "get all users successfully") {
            let users = res.data.data;
            resolve(users);
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
    //change status user
    changeStatus({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.put(API_URL+'/users/status/'+id)
        .then(res => {
          if(res.data.message === 'user has deactivated' || res.data.message === 'user has activate') {
            let payload = {
              text: "Change status user success",
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
      }
    )},
    //edit User
    editUser({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch(API_URL+'/users/'+data.id, data.user).then(res => {
          if(res.data.message === "change user information successfully") {
            let payload = {
              text: "Edit user success",
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
    //delete User
    deleteUser({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.delete(API_URL+'/users/'+id)
        .then(res => {
          if(res.data.message === "delete user successfully") {
            let payload = {
              text: "Delete user success",
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
  getters: {
    userData: state => state.user
  }
}