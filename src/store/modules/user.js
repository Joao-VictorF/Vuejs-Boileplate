import { removeToken } from '@/utils/auth'

const state =
  JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE)) ||
  {
    accessToken: '',
    isAdmin: '',
    firstAccess: ''
  }

const mutations = {
  SET_USER: (state, user) => {
    state = user
  }
}

const actions = {
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  saveUser({ commit }, data) {
    localStorage.setItem(process.env.LOCALSTORAGE, JSON.stringify(data.value))

    commit('SET_USER', data.value)
  },
  logout({ commit, state, dispatch }) {
    var json = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE)) || {}

    json = {
      selected_therapist: json.selected_therapist ?? 0
    }
    console.log(json)

    localStorage.setItem(process.env.LOCALSTORAGE, JSON.stringify(json))

    state = {
      accessToken: '',
      isAdmin: '',
      firstAccess: ''
    }
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
