import { updateField } from "vuex-map-fields";

export default {
  SET_INSTRUCTORS(state, { instructors, length }) {
    state.instructors = instructors;
    state.totalRecord = length;
  },
  ADD_USER(state, instructor) {
    state.instructors = state.instructors.unshift(instructor);
  },
  updateField,
};
