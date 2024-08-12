import { createStore } from 'vuex';

export default createStore({
  state: {
    language: 'en',
    activeLink: 'home'
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setActiveLink(state, link) {
      state.activeLink = link;
    }
  },
  actions: {
    changeLanguage({ commit }, language) {
      commit('setLanguage', language);
    },
    changeActiveLink({commit}, link){
      commit('setActiveLink', link)
    }
  },
});
