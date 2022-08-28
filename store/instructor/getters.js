import { getField } from "vuex-map-fields";

export default {
  getInstructor: (state) => (id) => {
    return state.instructors.find((instructor) => instructor.id === id);
  },
  getField,
};
