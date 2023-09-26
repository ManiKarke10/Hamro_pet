export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  setAdmin(state, payload) {
    state.admins = payload;
  },
};
