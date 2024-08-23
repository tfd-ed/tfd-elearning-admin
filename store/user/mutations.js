import { updateField } from "vuex-map-fields";

export default {
  SET_USERS(state, { users, length }) {
    state.users = users;
    state.totalRecord = length;
  },
  SET_ADMINS(state, { admins, length }) {
    state.admins = admins;
    state.totalRecord = length;
  },
  ADD_USER(state, user) {
    state.users = state.users.unshift(user);
  },
  BAN_USER(state, id) {
    let user = state.users.find((item) => {
      return item.id === id;
    });
    user.status = "BANNED";
  },
  ACTIVATE_USER(state, id) {
    let user = state.users.find((item) => {
      return item.id === id;
    });
    user.status = "ACTIVE";
  },
  updateField,
};
