import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
         userId: '',
         login: '',
         role: ''
   },
   mutations: {
      SAVE_USER_IN_STORE(state, {userId, login, role}) {
         state.userId = userId;
         state.login = login;
         state.role = role;
      }
   },
   actions: {
      defineUser({ commit }) {
         const tokenFromStorage = localStorage.getItem('token');
         if (tokenFromStorage) {
            const base64Payload = tokenFromStorage.split('.')[1];
            const {userId, login, role} = (JSON.parse(window.atob(base64Payload)));
            commit('SAVE_USER_IN_STORE', {userId, login, role});
         } else {
            return 'pas de token dans le localStorage';
         }
      }
   }
})
