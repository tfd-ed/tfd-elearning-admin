import { updateField } from "vuex-map-fields";

export default {
  SET_USERS(state, { users, length }) {
    state.users = users;
    state.totalRecord = length;
  },
  ADD_USER(state, user) {
    state.users = state.users.unshift(user);
  },
  updateField,
};
