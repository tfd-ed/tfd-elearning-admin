import paramsConverter from "../../plugins/utils/paramsConverter";
import api from "@/plugins/utils/api";
export default {
  async fetchCourses({ dispatch, commit, getters, rootGetters }, { params }) {
    const join = [
      {
        field: "purchases",
        select: ["id"],
      },
      {
        field: "instructor",
        select: ["id", "name"],
      },
    ];
    let response = await this.$axios.$get(api().courses, {
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
