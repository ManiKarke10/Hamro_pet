export default {
  addProfile(state, payload) {
    state.caretakers.push(payload);
  },
  setCaretakers(state, payload) {
    state.caretakers = payload;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
  removeInitial(state) {
    state.caretakers = [];
    state.profile = null;
  }
};
