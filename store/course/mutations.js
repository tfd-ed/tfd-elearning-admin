import { updateField } from "vuex-map-fields";

export default {
  SET_COURSES(state, { course, length }) {
    state.courses = course;
    state.totalRecord = length;
  },
  ADD_COURSES(state, course) {
    state.courses = state.courses.unshift(course);
  },
  PUBLISHED_COURSE(state, id) {
    let courses = state.courses.find((item) => {
      return item.id === id;
    });
    courses.status = "PUBLISHED";
  },
  updateField,
};
