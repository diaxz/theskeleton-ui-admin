import Vue from 'vue';

const state = {
  loggedInUser: {}
};

const mutations = {
  setLoggedInUser(state, user) {
    state.loggedInUser = { ...user };
  }
};

const getters = {
  loggedInUser(state) {
    return state.loggedInUser;
  }
};

const actions = {
  findCurrentUser({commit, dispatch}) {
    return Vue.axios.get('/api/profile').then(response => {
      commit('setLoggedInUser', response.data);
      return response.data;
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch('deleteSession');
      }
      return error.response.data;
    });
  },
  updateCurrentUser({commit}, user) {
    return Vue.axios.put('/api/profile', user).then(response => {
      commit('setLoggedInUser', response.data);
      return response.data;
    });
  },
  updateCurrentUserPassword({commit}, password) {
    return Vue.axios.put('/api/profile/password', { password: password.newPassword }).then(response => {
      return response.data;
    });
  }
};

export default { actions, getters, mutations, state };
