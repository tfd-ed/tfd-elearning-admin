import paramsConverter from "../../plugins/utils/paramsConverter";
import api from "@/plugins/utils/api";
export default {
  // eslint-disable-next-line no-unused-vars
  async fetchUsers({ dispatch, commit, getters, rootGetters }, { params }) {
    const join = [
      {
        field: "purchases",
        select: ["id"],
      },
    ];
    let response = await this.$axios.$get(api().users, {
      params: {},
      paramsSerializer: (param) => {
        return paramsConverter({ params: params, join: join }).convertedParams;
      },
    });
    response.data.forEach((item) => {
      item.purchases = item.purchases.length;
    });
    commit("SET_USERS", {
      users: response.data,
      length: response.total,
    });
  },
};
