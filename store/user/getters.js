import { getField } from "vuex-map-fields";

export default {
  getUser: (state) => (id) => {
    return state.users.find((user) => user.id === id);
  },
  getField,
};
