export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  role(state) {
    return state.role;
  },
  admins(state) {
    return state.admins;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
  isAdmin(_, getters, _2, rootGetters) {
    const admins = getters.admins;
    const userId = rootGetters.userId;

    return admins.some((admin) => admin.userId === userId);
  },
};
