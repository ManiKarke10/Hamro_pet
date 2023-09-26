export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  admins(state) {
    return state.admins;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
  isAdmin(_, getters, _2, rootGetters) {
    const admins = getters.admins;
    console.log(admins);
    const userId = rootGetters.userId;
    console.log(userId);

    return admins.some((admin) => admin.userId === userId);
  },
};
