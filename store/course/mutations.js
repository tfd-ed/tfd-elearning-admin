import { updateField } from "vuex-map-fields";

export default {
  SET_COURSES(state, { course, length }) {
    state.courses = course;
    state.totalRecord = length;
  },
  ADD_COURSES(state, course) {
    course.purchases = 0;
    state.courses = state.courses.unshift(course);
  },
  PUBLISHED_COURSE(state, id) {
    let courses = state.courses.find((item) => {
      return item.id === id;
    });
    courses.status = "PUBLISHED";
  },
  MAKE_DRAFTED_COURSE(state, id) {
    let courses = state.courses.find((item) => {
      return item.id === id;
    });
    courses.status = "DRAFTED";
  },
  updateField,
};
