import paramsConverter from "../../plugins/utils/paramsConverter";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
export default {
  async fetchCourses({ dispatch, commit, getters, rootGetters }, { params }) {
    const response = await this.$axios.$get(`/v1/course`, {
      params: {},
      paramsSerializer: (param) => {
        return paramsConverter({ params: params }).convertedParams;
      },
    });
    commit("SET_COURSES", { course: response.data, length: response.total });
  },
};
