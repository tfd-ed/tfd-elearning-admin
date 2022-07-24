import paramsConverter from "../../plugins/utils/paramsConverter";
import api from "@/plugins/utils/api";
export default {
  async fetchPurchases({ dispatch, commit, getters, rootGetters }, { params }) {
    const join = [
      {
        field: "byUser",
        select: ["id", "username"],
      },
      {
        field: "course",
        select: ["id", "title"],
      },
    ];
    let response = await this.$axios.$get(api().purchases, {
      params: {},
      paramsSerializer: (param) => {
        return paramsConverter({ params: params, join: join }).convertedParams;
      },
    });
    commit("SET_PURCHASES", {
      purchase: response.data,
      length: response.total,
    });
  },
};
