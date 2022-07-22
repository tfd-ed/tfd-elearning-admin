import { getField } from "vuex-map-fields";

export default {
  getCourse: (state) => (id) => {
    return state.courses.find((course) => course.id === id);
  },
  getField,
};
