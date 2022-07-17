import paramsConverter from "../../plugins/utils/paramsConverter";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
export default {
  async fetchCourses({ dispatch, commit, getters, rootGetters }, { params }) {
    const join = [
      {
        field: "purchases",
        select: ["id"],
      },
    ];
    let response = await this.$axios.$get(`/v1/course`, {
      params: {},
      paramsSerializer: (param) => {
        return paramsConverter({ params: params, join: join }).convertedParams;
      },
    });
    response.data.forEach((item) => {
      item.purchases = item.purchases.length;
    });
    commit("SET_COURSES", { course: response.data, length: response.total });
  },
};
