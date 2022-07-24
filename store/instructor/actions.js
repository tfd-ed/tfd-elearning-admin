import paramsConverter from "../../plugins/utils/paramsConverter";
import api from "@/plugins/utils/api";
export default {
  // eslint-disable-next-line no-unused-vars
  async fetchInstructors(
    { dispatch, commit, getters, rootGetters },
    { params }
  ) {
    const join = [
      {
        field: "profile",
        select: ["path"],
      },
      {
        field: "instructedCourses",
        select: ["id"],
      },
    ];
    let response = await this.$axios.$get(api().instructors, {
      params: {},
      paramsSerializer: (param) => {
        return paramsConverter({ params: params, join: join }).convertedParams;
      },
    });
    response.data.forEach((item) => {
      item.courses = item.instructedCourses.length;
    });
    commit("SET_INSTRUCTORS", {
      instructors: response.data,
      length: response.total,
    });
  },
};
