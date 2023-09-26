export default {
  caretakers(state) {
    return state.caretakers;
  },
  hasCaretakers(state) {
    return state.caretakers && state.caretakers.length > 0;
  },
  isCaretaker(_, getters, _2, rootGetters) {
    const caretakers = getters.caretakers;
    const userId = rootGetters.userId;

    return caretakers.some((caretaker) => caretaker.userId === userId);
  },

  myProfile(state) {
    return state.profile;
  },
  hasProfile(state) {
    return !!state.profile;
  },
  isVerified(_, getters, _2, rootGetters) {
    const caretaker = getters.myProfile;
    const userId = rootGetters.userId;

    if (
      caretaker[0].verificationStatus == "verified" ||
      caretaker[0].verificationStatus == "pending"
    ) {
      return true;
    }
    return false;
  },
};
