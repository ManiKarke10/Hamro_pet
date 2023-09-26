export default {
  getUsers(state) {
    return state.users;
  },
  getProfiles(state) {
    return state.profiles;
  },
  getCounts(state) {
    console.log(state.counts);
    return state.counts;
  },
  getMonths(state) {
    return state.months;
  },
};
